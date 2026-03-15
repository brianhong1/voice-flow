// src/types/index.ts

export interface Recording {
  id: string;
  timestamp: Date;
  originalTranscript: string;
  rewrittenText: string;
  tone: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  cost: number;
  processingTime: number;
}

export interface ErrorLog {
  id: string;
  timestamp: Date;
  errorType: string;
  errorMessage: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  action: string;
  recordingLength: number;
  tone: string;
  model: string;
  apiEndpoint: string;
  httpStatus?: number;
  inputTokens?: number;
  outputTokens?: number;
  processingTime: number;
  userAgent: string;
  browserInfo: {
    name: string;
    version: string;
  };
  consoleLog: string;
  stackTrace: string;
}

export interface UsageStats {
  totalRecordings: number;
  totalCost: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalProcessingTime: number;
  recordingsByTone: { [key: string]: number };
  errorCount: number;
  errorRate: number;
}

export interface AppSettings {
  apiKey: string;
  recordingMode1Shortcut: string;
  recordingMode1Type: 'hold' | 'toggle';
  recordingMode2Shortcut: string;
  recordingMode2Type: 'hold' | 'toggle';
  audioDevice: string;
  budgetLimit?: number;
}

export const TONES = [
  'Professional',
  'Casual',
  'Formal',
  'Sales-Focused',
  'Technical',
  'Conversational'
];

export const TONE_DESCRIPTIONS: { [key: string]: string } = {
  Professional: 'Formal, polished, C-suite ready',
  Casual: 'Relaxed, conversational, approachable',
  Formal: 'Structured, precise, business-appropriate',
  'Sales-Focused': 'Persuasive, revenue-driven, action-oriented',
  Technical: 'Detailed, architecture-focused, Salesforce-specific',
  Conversational: 'Storytelling, audience-focused, keeps readers engaged'
};
