import ScanLayout from "../components/ScanLayout";

const Phishing = () => {
  return (
    <ScanLayout
      title="Phishing URL Analysis"
      placeholder="Paste, drop, or type a URL"
      type="URL"
    />
  );
};

export default Phishing;