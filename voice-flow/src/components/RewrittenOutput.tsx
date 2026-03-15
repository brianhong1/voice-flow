// src/components/RewrittenOutput.tsx
import React, { useState } from 'react';

interface RewrittenOutputProps {
  text: string;
  tone: string;
  cost: number;
  processingTime: number;
  isProcessing: boolean;
}

export const RewrittenOutput: React.FC<RewrittenOutputProps> = ({
  text,
  tone,
  cost,
  processingTime,
  isProcessing
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `voiceflow-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (isProcessing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 Rewriting...</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!text) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-gray-800">📝 Rewritten Output</h2>
        <div className="text-right">
          <p className="text-sm text-gray-600">
            Tone: <span className="font-bold text-blue-500">{tone}</span>
          </p>
          <p className="text-sm text-gray-600">
            Cost: <span className="font-bold text-green-500">${cost.toFixed(4)}</span>
          </p>
          <p className="text-sm text-gray-600">
            Time: <span className="font-bold">{(processingTime / 1000).toFixed(2)}s</span>
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded p-4 mb-4 min-h-32 border-l-4 border-green-500">
        <p className="text-gray-800 leading-relaxed text-base">{text}</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
        >
          {copied ? '✓ Copied!' : '📋 Copy to Clipboard'}
        </button>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-200"
        >
          📥 Export as Text
        </button>
      </div>
    </div>
  );
};
