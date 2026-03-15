// src/components/SettingsPanel.tsx
import React, { useState } from 'react';
import { AppSettings } from '../types';

interface SettingsPanelProps {
  settings: AppSettings;
  onSettingsSave: (settings: AppSettings) => void;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsSave,
  onClose
}) => {
  const [apiKey, setApiKey] = useState(settings.apiKey);
  const [mode1Shortcut, setMode1Shortcut] = useState(settings.recordingMode1Shortcut);
  const [mode2Shortcut, setMode2Shortcut] = useState(settings.recordingMode2Shortcut);
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSave = () => {
    onSettingsSave({
      ...settings,
      apiKey,
      recordingMode1Shortcut: mode1Shortcut,
      recordingMode2Shortcut: mode2Shortcut
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">⚙️ Settings</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Claude API Key *
            </label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-ant-..."
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showApiKey ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Get your key from{' '}
              <a
                href="https://console.anthropic.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                console.anthropic.com
              </a>
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Recording Mode 1 (Hold to Record)
            </label>
            <input
              type="text"
              value={mode1Shortcut}
              onChange={(e) => setMode1Shortcut(e.target.value)}
              placeholder="Cmd+Shift+V"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Hold key to record, release to stop</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Recording Mode 2 (Toggle)
            </label>
            <input
              type="text"
              value={mode2Shortcut}
              onChange={(e) => setMode2Shortcut(e.target.value)}
              placeholder="Cmd+Shift+B"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Tap to start, tap again to stop</p>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 font-semibold"
          >
            Save Settings
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200 font-semibold"
          >
            Cancel
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-200">
          * Required: API key must be set to use the app
        </p>
      </div>
    </div>
  );
};
