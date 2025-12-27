
export interface VaultItem {
  id: string;
  data: string; // Base64
  name: string;
  timestamp: number;
  type: 'image' | 'video';
  isEncrypted: boolean;
}

export type AppView = 'calculator' | 'vault' | 'logs' | 'deploy' | 'billing';

export interface AppSettings {
  pin: string;
  recoveryQuestion: string;
  recoveryAnswer: string;
  isSetupComplete: boolean;
  stealthMode: boolean;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
}

export interface VideoData {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  views: string;
  duration?: string;
}

export const FREQUENCIES = ['32Hz', '64Hz', '125Hz', '250Hz', '500Hz', '1kHz', '2kHz', '4kHz', '8kHz', '16kHz'];
