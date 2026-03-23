from fastapi import APIRouter
from pydantic import BaseModel
import os
import re
import math
import requests
import joblib
import pandas as pd
from urllib.parse import urlparse
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

router = APIRouter(prefix="/phishing", tags=["Phishing"])

# =========================
# CONFIG
# =========================
DATASET_PATH = "malicious_phish.csv"
MODEL_PATH = "app/models/phishing_model.pkl"
PHISHING_THRESHOLD = 0.80

# 🔐 Add your API keys here
GOOGLE_API_KEY = "AIzaSyCmKNsk0wkE4f6ZmPieOn4O3EbETq54QMA"
VT_API_KEY = "3eb67f69c80e3e685cd7056144014a4167b49ad74de51360cb6b3c61c598418bY"

# =========================
# REQUEST MODEL
# =========================
class URLRequest(BaseModel):
    url: str

# =========================
# FEATURE EXTRACTION
# =========================
def extract_features(url):
    parsed = urlparse(url)
    domain = parsed.netloc.lower()
    path = parsed.path

    return [
        len(url),
        len(domain),
        len(path),
        url.count('.'),
        url.count('-'),
        url.count('@'),
        url.count('?'),
        url.count('%'),
        url.count('/'),
        sum(c.isdigit() for c in url),
        int(url.startswith("https")),
        int(bool(re.search(r'\d+\.\d+\.\d+\.\d+', url))),
        domain.count('-')
    ]

# =========================
# ENTROPY
# =========================
def shannon_entropy(s):
    probs = [s.count(c) / len(s) for c in set(s)]
    return -sum(p * math.log2(p) for p in probs)

# =========================
# TRAIN MODEL
# =========================
def train_model():
    print("📂 Training model...")

    data = pd.read_csv(DATASET_PATH)
    data["label"] = data["type"].apply(lambda x: 0 if x == "benign" else 1)

    X = data["url"].apply(extract_features).tolist()
    y = data["label"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.25, stratify=y, random_state=42
    )

    model = RandomForestClassifier(
        n_estimators=300,
        max_depth=25,
        random_state=42
    )

    model.fit(X_train, y_train)

    os.makedirs("app/models", exist_ok=True)
    joblib.dump(model, MODEL_PATH)

    print("✅ Model created successfully")

    return model

# =========================
# LOAD MODEL
# =========================
def get_model():
    if not os.path.exists(MODEL_PATH):
        return train_model()
    return joblib.load(MODEL_PATH)

model = get_model()

# =========================
# GOOGLE SAFE BROWSING
# =========================
def check_google_safe_browsing(url):
    try:
        api_url = f"https://safebrowsing.googleapis.com/v4/threatMatches:find?key={GOOGLE_API_KEY}"

        payload = {
            "client": {"clientId": "thread-detector", "clientVersion": "1.0"},
            "threatInfo": {
                "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING"],
                "platformTypes": ["ANY_PLATFORM"],
                "threatEntryTypes": ["URL"],
                "threatEntries": [{"url": url}]
            }
        }

        response = requests.post(api_url, json=payload, timeout=5)

        if response.status_code == 200:
            return bool(response.json().get("matches"))

    except:
        return False

    return False

# =========================
# VIRUSTOTAL
# =========================
def check_virustotal(url):
    try:
        domain = urlparse(url).netloc
        headers = {"x-apikey": VT_API_KEY}

        response = requests.get(
            f"https://www.virustotal.com/api/v3/domains/{domain}",
            headers=headers,
            timeout=5
        )

        if response.status_code == 200:
            stats = response.json()["data"]["attributes"]["last_analysis_stats"]

            return stats["malicious"] > 0 or stats["suspicious"] > 0

    except:
        return False

    return False

# =========================
# PREDICTION LOGIC
# =========================
def predict_url(url):
    parsed = urlparse(url)
    domain = parsed.netloc.lower()
    full_url = url.lower()

    # 🚨 Trusted domains
    trusted_domains = [
        "google.com", "youtube.com", "gmail.com",
        "github.com", "openai.com"
    ]

    if any(domain == td or domain.endswith("." + td) for td in trusted_domains):
        return "SAFE (Trusted Domain)", 1.0

    # 🚨 Suspicious keywords
    suspicious_keywords = [
        "login", "verify", "paypal", "bank", "secure",
        "account", "update", "webscr", "signin"
    ]

    if any(k in full_url for k in suspicious_keywords):
        return "PHISHING (Keyword)", 0.90

    # 🚨 Too many dots
    if url.count('.') > 5:
        return "PHISHING (Too many dots)", 0.85

    # 🚨 IP address URL
    if re.search(r'\d+\.\d+\.\d+\.\d+', url):
        return "PHISHING (IP URL)", 0.90

    # 🔐 Google Safe Browsing
    if GOOGLE_API_KEY and check_google_safe_browsing(url):
        return "PHISHING (Google Safe Browsing)", 0.99

    # 🦠 VirusTotal
    if VT_API_KEY and check_virustotal(url):
        return "PHISHING (VirusTotal)", 0.98

    # 🤖 ML fallback
    prob = model.predict_proba([extract_features(url)])[0][1]

    if prob >= PHISHING_THRESHOLD:
        return "PHISHING (ML)", prob

    return "SAFE", 1 - prob

# =========================
# API ROUTE
# =========================
@router.post("/predict")
def predict(data: URLRequest):
    result, confidence = predict_url(data.url)

    return {
        "url": data.url,
        "result": result,
        "confidence": round(confidence * 100, 2)
    }