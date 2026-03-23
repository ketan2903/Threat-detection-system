import ScanLayout from "../components/ScanLayout";

const ScanPDF = () => {
  return (
    <ScanLayout
      title="Malicious PDF Scanner"
      placeholder="Upload PDF file"
      type="PDF"
    />
  );
};

export default ScanPDF;