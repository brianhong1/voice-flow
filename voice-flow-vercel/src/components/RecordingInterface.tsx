// src/components/RecordingInterface.tsx
import React, { useState, useEffect, useRef } from 'react';
import { audioService } from '../services/audioService';

interface RecordingInterfaceProps {
  onTranscriptReady: (transcript: string) => void;
  isProcessing: boolean;
}

export const RecordingInterface: React.FC<RecordingInterfaceProps> = ({
  onTranscriptReady,
  isProcessing
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const recordingStartRef = useRef<Date | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      interval = setInterval(() => {
        if (recordingStartRef.current) {
          const duration = Math.floor((new Date().getTime() - recordingStartRef.current.getTime()) / 1000);
          setRecordingDuration(duration);
        }
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl+Shift+V: Hold to record
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.code === 'KeyV') {
        e.preventDefault();
        if (!isRecording && !isProcessing) {
          startRecording();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.code === 'KeyV') {
        if (isRecording) {
          stopRecording();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isRecording, isProcessing]);

  const startRecording = async () => {
    try {
      await audioService.initAudio();
      setIsRecording(true);
      recordingStartRef.current = new Date();
      setRecordingDuration(0);
      setTranscript('');
      setError('');

      audioService.startRecording({
        onTranscriptUpdate: (text) => setTranscript(text),
        onTranscriptComplete: (text) => {
          setTranscript(text);
          setIsRecording(false);
          if (text.trim()) {
            onTranscriptReady(text);
          }
        },
        onError: (err) => {
          setError(err);
          setIsRecording(false);
        }
      });
    } catch (err: any) {
      setError(err.message);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    audioService.stopRecording();
    setIsRecording(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">🎙️ Recording Interface</h2>
        {isRecording && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-red-500">
              Recording ({recordingDuration}s)
            </span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          {isRecording 
            ? 'Hold Cmd+Shift+V to record or release to stop' 
            : 'Press and hold Cmd+Shift+V (Mac) or Ctrl+Shift+V (Windows) to start recording'}
        </p>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      {transcript && (
        <div className="bg-gray-50 rounded p-4 mb-4 border-l-4 border-blue-500">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Real-time Transcript:</h3>
          <p className="text-gray-800 leading-relaxed text-base">{transcript}</p>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={startRecording}
          disabled={isRecording || isProcessing}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isRecording ? '◉ Recording...' : '● Start Recording'}
        </button>
        {isRecording && (
          <button
            onClick={stopRecording}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            ◾ Stop Recording
          </button>
        )}
      </div>
    </div>
  );
};
