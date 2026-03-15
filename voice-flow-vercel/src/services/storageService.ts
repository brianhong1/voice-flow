// src/services/storageService.ts
import { Recording, ErrorLog, AppSettings, UsageStats } from '../types';

const STORAGE_KEYS = {
  RECORDINGS: 'vf_recordings',
  ERROR_LOGS: 'vf_error_logs',
  SETTINGS: 'vf_settings',
  USAGE_STATS: 'vf_usage_stats',
  SESSION_START: 'vf_session_start'
};

export const storageService = {
  // Recordings
  getRecordings: (): Recording[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECORDINGS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveRecording: (recording: Recording) => {
    try {
      const recordings = storageService.getRecordings();
      recordings.push(recording);
      localStorage.setItem(STORAGE_KEYS.RECORDINGS, JSON.stringify(recordings));
    } catch (e) {
      console.error('Failed to save recording', e);
    }
  },

  // Error Logs
  getErrorLogs: (): ErrorLog[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ERROR_LOGS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  logError: (error: ErrorLog) => {
    try {
      const logs = storageService.getErrorLogs();
      logs.push(error);
      localStorage.setItem(STORAGE_KEYS.ERROR_LOGS, JSON.stringify(logs));
    } catch (e) {
      console.error('Failed to log error', e);
    }
  },

  // Settings
  getSettings: (): AppSettings => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : {
        apiKey: '',
        recordingMode1Shortcut: 'Cmd+Shift+V',
        recordingMode1Type: 'hold',
        recordingMode2Shortcut: 'Cmd+Shift+B',
        recordingMode2Type: 'toggle',
        audioDevice: 'default'
      };
    } catch {
      return {
        apiKey: '',
        recordingMode1Shortcut: 'Cmd+Shift+V',
        recordingMode1Type: 'hold',
        recordingMode2Shortcut: 'Cmd+Shift+B',
        recordingMode2Type: 'toggle',
        audioDevice: 'default'
      };
    }
  },

  saveSettings: (settings: AppSettings) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  },

  // Usage Stats
  getUsageStats: (): UsageStats => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USAGE_STATS);
      return data ? JSON.parse(data) : {
        totalRecordings: 0,
        totalCost: 0,
        totalInputTokens: 0,
        totalOutputTokens: 0,
        totalProcessingTime: 0,
        recordingsByTone: {},
        errorCount: 0,
        errorRate: 0
      };
    } catch {
      return {
        totalRecordings: 0,
        totalCost: 0,
        totalInputTokens: 0,
        totalOutputTokens: 0,
        totalProcessingTime: 0,
        recordingsByTone: {},
        errorCount: 0,
        errorRate: 0
      };
    }
  },

  updateUsageStats: (stats: UsageStats) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USAGE_STATS, JSON.stringify(stats));
    } catch (e) {
      console.error('Failed to update usage stats', e);
    }
  },

  // Export data
  exportRecordingsAsJSON: (): string => {
    const recordings = storageService.getRecordings();
    return JSON.stringify(recordings, null, 2);
  },

  exportErrorLogsAsJSON: (): string => {
    const logs = storageService.getErrorLogs();
    return JSON.stringify(logs, null, 2);
  },

  exportErrorsAsCSV: (): string => {
    const logs = storageService.getErrorLogs();
    const headers = 'Timestamp,Error Type,Severity,Message,Action,Model,HTTP Status,Processing Time (ms)\n';
    const rows = logs.map(log => 
      `"${new Date(log.timestamp).toISOString()}","${log.errorType}","${log.severity}","${log.errorMessage}","${log.action}","${log.model}",${log.httpStatus || 'N/A'},${log.processingTime}`
    ).join('\n');
    return headers + rows;
  },

  clearAllData: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    } catch (e) {
      console.error('Failed to clear data', e);
    }
  }
};
