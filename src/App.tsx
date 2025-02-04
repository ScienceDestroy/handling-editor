import React, { useState } from 'react';
import { HandlingEditor } from './components/HandlingEditor';
import { parseHandlingFile, buildHandlingFile } from './utils/xmlParser';
import { Upload } from 'lucide-react';

function App() {
  const [handlingData, setHandlingData] = useState(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const parsed = parseHandlingFile(content);
        setHandlingData(Array.isArray(parsed) ? parsed : [parsed]);
      };
      reader.readAsText(file);
    }
  };

  const handleSave = (data: any) => {
    const xmlContent = buildHandlingFile(data);
    const blob = new Blob([xmlContent], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'handling.meta';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!handlingData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Vehicle Handling Editor</h1>
          <p className="text-gray-600 mb-6">Upload your handling.meta file to begin editing</p>
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".meta,.xml"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Upload size={20} />
              <span>Upload handling.meta</span>
            </div>
          </label>
        </div>
      </div>
    );
  }

  return <HandlingEditor handlingData={handlingData} onSave={handleSave} />;
}

export default App;