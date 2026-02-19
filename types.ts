
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
