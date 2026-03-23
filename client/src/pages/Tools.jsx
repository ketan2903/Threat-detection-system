import { useNavigate } from "react-router-dom";

const Tools = () => {
  const navigate = useNavigate();

  return (
    <div className="px-10 py-20 text-center">
      <h1 className="text-4xl font-bold mb-2">
        Unified tools. One platform.
      </h1>
      <p className="text-gray-400 mb-10">
        Start with any module below.
      </p>

      <div className="grid md:grid-cols-4 gap-6">
        
        <ToolCard 
          title="Phishing Detection"
          desc="Analyze URLs and detect threats"
          btn="Scan URL"
          onClick={() => navigate("/tools/url")}
        />

        <ToolCard 
          title="QR Scanner"
          desc="Scan QR safely"
          btn="Scan QR"
          onClick={() => navigate("/tools/qr")}
        />

        <ToolCard 
          title="PDF Malware"
          desc="Detect malicious PDFs"
          btn="Scan PDF"
          onClick={() => navigate("/tools/pdf")}
        />

        <ToolCard 
          title="Steganography"
          desc="Detect hidden data in images"
          btn="Scan Image"
          onClick={() => navigate("/tools/image")}
        />

      </div>
    </div>
  );
};

const ToolCard = ({ title, desc, btn, onClick }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-cyan-400 transition">
      <h2 className="font-semibold text-lg">{title}</h2>
      <p className="text-gray-400 text-sm mt-2">{desc}</p>

      <button 
        onClick={onClick}
        className="mt-6 w-full bg-gray-800 hover:bg-gray-700 py-2 rounded-lg"
      >
        {btn}
      </button>
    </div>
  );
};

export default Tools;