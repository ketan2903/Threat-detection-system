from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routes (we will create them next)
from app.routes import phishing
# , qr, pdf, steganography
app = FastAPI()

# ✅ CORS (important for React connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all (for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Register all modules
app.include_router(phishing.router)
# app.include_router(qr.router)
# app.include_router(pdf.router)
# app.include_router(steganography.router)

# ✅ Default route
@app.get("/")
def home():
    return {"message": "Thread Detection Backend Running 🚀"}