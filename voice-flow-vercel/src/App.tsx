// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Recording, UsageStats } from './types';
import { RecordingInterface } from './components/RecordingInterface';
import { ToneSelector } from './components/ToneSelector';
import { RewrittenOutput } from './components/RewrittenOutput';
import { CostTracker } from './components/CostTracker';
import { SettingsPanel } from './components/SettingsPanel';
import { storageService } from './services/storageService';
import { claudeService } from './services/claudeService';
import { costService } from './services/costService';

export const App: React.FC = () => {
  const [selectedTone, setSelectedTone] = useState('Professional');
  const [transcript, setTranscript] = useState('');
  const [rewrittenText, setRewrittenText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cost, setCost] = useState(0);
  const [processingTime, setProcessingTime] = useState(0);
  const [error, setError] = useState('');
  
  const settings = storageService.getSettings();
  const [usageStats, setUsageStats] = useState<UsageStats>(storageService.getUsageStats());

  // Check if API key is set on mount
  useEffect(() => {
    if (!settings.apiKey) {
      setError('⚠️ API key not configured. Please set it in Settings first.');
    }
  }, [settings.apiKey]);

  const handleTranscriptReady = async (text: string) => {
    if (!text.trim()) return;
    
    if (!settings.apiKey) {
      setError('API key not configured. Please set it in Settings.');
      return;
    }

    setError('');
    setTranscript(text);
    setIsProcessing(true);
    setRewrittenText('');

    const startTime = performance.now();

    try {
      const result = await claudeService.rewrite(text, selectedTone, settings.apiKey);
      const processingTimeMs = performance.now() - startTime;
      const recordingCost = costService.calculateTokenCost(result.inputTokens, result.outputTokens);
      
      setRewrittenText(result.rewrittenText);
      setCost(recordingCost);
      setProcessingTime(processingTimeMs);
      
      // Update usage stats
      const updatedStats: UsageStats = {
        totalRecordings: usageStats.totalRecordings + 1,
        totalCost: usageStats.totalCost + recordingCost,
        totalInputTokens: usageStats.totalInputTokens + result.inputTokens,
        totalOutputTokens: usageStats.totalOutputTokens + result.outputTokens,
        totalProcessingTime: usageStats.totalProcessingTime + processingTimeMs,
        recordingsByTone: {
          ...usageStats.recordingsByTone,
          [selectedTone]: (usageStats.recordingsByTone[selectedTone] || 0) + 1
        },
        errorCount: usageStats.errorCount,
        errorRate: 0
      };

      setUsageStats(updatedStats);
      storageService.updateUsageStats(updatedStats);

      // Save recording
      const recording: Recording = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        originalTranscript: text,
        rewrittenText: result.rewrittenText,
        tone: selectedTone,
        model: 'claude',
        inputTokens: result.inputTokens,
        outputTokens: result.outputTokens,
        cost: recordingCost,
        processingTime: processingTimeMs
      };

      storageService.saveRecording(recording);
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to rewrite text';
      setError(`Error: ${errorMessage}`);
      
      // Log error for Phase 2
      console.error('Recording error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const todayCost = usageStats.totalCost;
  const monthCost = usageStats.totalCost;
  const avgCost = usageStats.totalRecordings > 0 
    ? usageStats.totalCost / usageStats.totalRecordings 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Voice Flow</h1>
            <p className="text-gray-600 mt-1">Transform voice into polished text</p>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition duration-200 font-semibold"
          >
            ⚙️ Settings
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-800">
            {error}
          </div>
        )}

        {/* Main Content */}
        <RecordingInterface 
          onTranscriptReady={handleTranscriptReady}
          isProcessing={isProcessing}
        />

        {transcript && (
          <>
            <ToneSelector 
              selectedTone={selectedTone}
              onToneChange={setSelectedTone}
            />

            <RewrittenOutput
              text={rewrittenText}
              tone={selectedTone}
              cost={cost}
              processingTime={processingTime}
              isProcessing={isProcessing}
            />
          </>
        )}

        <CostTracker
          todayCost={todayCost}
          monthCost={monthCost}
          recordingCount={usageStats.totalRecordings}
          avgCost={avgCost}
        />

        {/* Info Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">💡 Tip:</span> Press and hold <span className="bg-white px-2 py-1 rounded font-mono text-xs">Cmd+Shift+V</span> (Mac) or <span className="bg-white px-2 py-1 rounded font-mono text-xs">Ctrl+Shift+V</span> (Windows) to start recording. Release to stop and process.
          </p>
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <SettingsPanel
            settings={settings}
            onSettingsSave={(updatedSettings) => {
              storageService.saveSettings(updatedSettings);
              setShowSettings(false);
              setError('');
            }}
            onClose={() => setShowSettings(false)}
          />
        )}
      </div>
    </div>
  );
};
