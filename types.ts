
export interface Dataset {
  id: string;
  title: string;
  category: 'MTN' | 'Telecel' | 'AirtelTigo' | 'All-Network';
  price: number;
  licensesRemaining: number;
  totalLicenses: number;
  hypeVelocity: { name: string; value: number }[];
  description: string;
  // Added 'Exclusive' to match the usage in constants.tsx and styling in DatasetCard.tsx
  rarity: 'Standard' | 'Premium' | 'Unlimited' | 'Exclusive';
  viewingCount: number;
}

export interface User {
  id: string;
  rank: 'Seeker' | 'Analyst' | 'Oracle';
  xp: number;
  balance: number;
}

export interface CartItem extends Dataset {
  quantity: number;
}
