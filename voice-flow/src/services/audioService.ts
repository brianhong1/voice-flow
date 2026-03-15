// src/services/audioService.ts

interface AudioServiceConfig {
  onTranscriptUpdate: (transcript: string) => void;
  onTranscriptComplete: (transcript: string) => void;
  onError: (error: string) => void;
}

let mediaStream: MediaStream | null = null;
let recognition: any = null;
let originalVolumes: Map<HTMLMediaElement, number> = new Map();

const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

export const audioService = {
  async initAudio(): Promise<void> {
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (error) {
      throw new Error(`Microphone access denied: ${error}`);
    }
  },

  muteSystemAudio(): void {
    const mediaElements = Array.from(document.querySelectorAll('audio, video')) as HTMLMediaElement[];
    mediaElements.forEach(el => {
      originalVolumes.set(el, el.volume);
      el.volume = 0;
    });
  },

  unmuteSystemAudio(): void {
    originalVolumes.forEach((volume, el) => {
      el.volume = volume;
    });
    originalVolumes.clear();
  },

  startRecording(config: AudioServiceConfig, mode: 'hold' | 'toggle' = 'hold'): void {
    if (!SpeechRecognition) {
      config.onError('Speech Recognition not supported in this browser');
      return;
    }

    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    this.muteSystemAudio();

    let finalTranscript = '';

    recognition.onstart = () => {
      console.log('Recording started');
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      config.onTranscriptUpdate((finalTranscript + interimTranscript).trim());
    };

    recognition.onerror = (event: any) => {
      config.onError(`Recognition error: ${event.error}`);
    };

    recognition.onend = () => {
      this.unmuteSystemAudio();
      config.onTranscriptComplete(finalTranscript.trim());
    };

    recognition.start();
  },

  stopRecording(): void {
    if (recognition) {
      recognition.stop();
    }
    this.unmuteSystemAudio();
  },

  isRecognitionSupported(): boolean {
    return !!SpeechRecognition;
  },

  cleanup(): void {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      mediaStream = null;
    }
  }
};
