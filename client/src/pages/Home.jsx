import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>

      <div className="px-10 py-20 grid md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT */}
        <div>
          

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            One platform for phishing, QR, PDF malware and steganography detection
          </h1>

          <p className="text-gray-400 mt-6">
            Enterprise-grade security scans for links, files and images.
          </p>

          <div className="flex gap-4 mt-6">
            <button className="glow-btn" onClick={() => navigate("/Tools")}>
                  Start Scanning
            </button>
            <button className="border border-gray-700 px-5 py-2 rounded-lg hover:bg-gray-800">
              Explore Features
            </button>
          </div>
        </div>

        {/* RIGHT CARDS */}
        <div className="grid grid-cols-2 gap-6">
          <FeatureCard title="Phishing Detection" />
          <FeatureCard title="QR Scanner" />
          <FeatureCard title="PDF Malware" />
          <FeatureCard title="Steganography" />
        </div>

      </div>
    </div>
  );
};

const FeatureCard = ({ title }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-cyan-400 transition">
      <div className="mb-3 text-cyan-400">⬢</div>
      <h2 className="font-semibold">{title}</h2>
      <p className="text-gray-400 text-sm mt-2">
        Advanced detection and analysis
      </p>
    </div>
  );
};

export default Home;