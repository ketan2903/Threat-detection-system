import ScanLayout from "../components/ScanLayout";

const ScanQR = () => {
  return (
    <ScanLayout
      title="QR Code Scanner"
      placeholder="Upload or paste QR data"
      type="QR Code"
    />
  );
};

export default ScanQR;