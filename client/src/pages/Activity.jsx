const Activity = () => {
  return (
    <div>
      <h2 className="text-xl mb-4">Scan History</h2>

      <table className="w-full bg-gray-800 rounded">
        <thead>
          <tr className="text-left">
            <th className="p-3">Input</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3">example.com</td>
            <td className="text-green-400">Safe</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Activity;