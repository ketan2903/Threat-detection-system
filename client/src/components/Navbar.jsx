import { Link, useNavigate } from "react-router-dom";
import Tools from "../pages/Tools";
const Navbar = () => {
     const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center px-10 py-4 border-b border-gray-800">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-cyan-400 text-black p-2 rounded-lg font-bold">🛡</div>
        <h1 className="text-lg font-semibold">AegisScan</h1>
      </div>

      {/* Menu */}
      <div className="hidden md:flex gap-8 text-gray-400">
        <Link to="/" className="hover:text-white">Home</Link>
        <Link to="/Tools" className="hover:text-white">Tools</Link>
        <Link to="/activity" className="hover:text-white">Activity</Link> 
    </div>

      {/* Button */}
      <button className="glow-btn" onClick={() => navigate("/Tools")}>
        Start Scanning
      </button>
    </div>
  );
};

export default Navbar;