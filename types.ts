
export interface Dataset {
  id: string;
  title: string;
  category: 'MTN' | 'Telecel' | 'AirtelTigo' | 'All-Network';
  price: number;
  licensesRemaining: number;
  totalLicenses: number;
  hypeVelocity: { name: string; value: number }[];
  description: string;
  rarity: 'Standard' | 'Premium' | 'Unlimited' | 'Exclusive';
  viewingCount: number;
  isFlashSale?: boolean;
}

export interface User {
  id: string;
  name?: string;
  email?: string;
  rank: 'Seeker' | 'Analyst' | 'Oracle' | 'Master' | 'Legend';
  xp: number;
  balance: number;
}

export interface WalletTransaction {
  id: string;
  type: 'Top-up' | 'Transfer' | 'Purchase';
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
  description: string;
}

export interface CartItem extends Dataset {
  quantity: number;
}

// Added AnalysisMode enum to define Gemini models for codebase analysis
export enum AnalysisMode {
  Fast = 'gemini-3-flash-preview',
  Deep = 'gemini-3-pro-preview'
}

// Added ProjectFile interface for workspace file management
export interface ProjectFile {
  name: string;
  path: string;
  content: string;
  size: number;
  type: string;
}

// Added ChatMessage interface for structured assistant interactions
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
