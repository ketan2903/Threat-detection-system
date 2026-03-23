import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Tools from "./pages/Tools";
import Activity from "./pages/Activity";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Phishing from "./Tools/Phishing";
import ScanImage from "./Tools/ScanImage";
import ScanPDF from "./Tools/ScanPDF";
import ScanQR from "./Tools/ScanQR";
import LoginPage from "./pages/LoginPage";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Tools" element={<Tools />} />
          <Route path="/Activity" element={<Activity />} />
          <Route path="/tools/url" element={<Phishing />} />
          <Route path="/tools/qr" element={<ScanQR />} />
          <Route path="/tools/pdf" element={<ScanPDF />} />
          <Route path="/tools/image" element={<ScanImage />} />
        </Routes>
      
    </BrowserRouter>
  );
}

export default App;
