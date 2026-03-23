import { useNavigate } from "react-router-dom";
const ScanLayout = ({ title, placeholder, type }) => {
    const navigate = useNavigate();

  return (
    <div className="px-10 py-16 max-w-4xl mx-auto">
      
       {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/tools")}
        className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white"
      >
        ← Back
      </button>
      
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-cyan-500 p-2 rounded-lg">🔗</div>
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>

      {/* Input Box */}
      <div className="bg-[#0B1220] p-6 rounded-xl border border-gray-800">
        <h2 className="mb-4 font-medium">Analyze {type}</h2>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder={placeholder}
            className="flex-1 p-3 rounded-lg bg-transparent border border-cyan-500 outline-none"
          />

          <button className="bg-cyan-400 text-black px-5 rounded-lg">
            Run
          </button>
        </div>
      </div>

      {/* Recent Section */}
      <div className="bg-[#0B1220] p-6 mt-6 rounded-xl border border-gray-800">
        <div className="flex justify-between mb-3">
          <h3 className="text-gray-300">Recent</h3>
          <button className="text-sm text-gray-400">Clear</button>
        </div>

        <p className="text-sm text-gray-400">
          https://example.com — low (0)
        </p>
        <p className="text-sm text-gray-400">
          https://google.com — low (0)
        </p>
      </div>
    </div>
  );
};

export default ScanLayout;