// src/components/ToneSelector.tsx
import React from 'react';
import { TONES, TONE_DESCRIPTIONS } from '../types';

interface ToneSelectorProps {
  selectedTone: string;
  onToneChange: (tone: string) => void;
}

export const ToneSelector: React.FC<ToneSelectorProps> = ({
  selectedTone,
  onToneChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 Select Tone</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {TONES.map((tone) => (
          <button
            key={tone}
            onClick={() => onToneChange(tone)}
            className={`p-3 rounded text-sm font-semibold transition duration-200 ${
              selectedTone === tone
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            title={TONE_DESCRIPTIONS[tone]}
          >
            {tone}
          </button>
        ))}
      </div>
      {selectedTone && (
        <p className="text-xs text-gray-600 mt-3">
          <span className="font-semibold">{selectedTone}:</span> {TONE_DESCRIPTIONS[selectedTone]}
        </p>
      )}
    </div>
  );
};
