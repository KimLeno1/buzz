
import { Dataset } from './types';

export const DATASETS: Dataset[] = [
  // MTN PLANS
  {
    id: 'mtn-001',
    title: 'MTN 6GB Unlimited',
    category: 'MTN',
    price: 27,
    licensesRemaining: 45,
    totalLicenses: 1000,
    rarity: 'Unlimited',
    viewingCount: 1204,
    description: '4G/LTE High-speed Data; 2GB Night Data Bonus; Data Rollover Support',
    hypeVelocity: [{ name: '1h', value: 10 }, { name: '2h', value: 45 }, { name: '3h', value: 180 }, { name: '4h', value: 540 }]
  },
  {
    id: 'mtn-002',
    title: 'MTN 2GB Unlimited',
    category: 'MTN',
    price: 9.3,
    licensesRemaining: 150,
    totalLicenses: 2000,
    rarity: 'Standard',
    viewingCount: 842,
    description: 'Premium High-speed Connectivity; 24/7 Dedicated Support; Instant Activation',
    hypeVelocity: [{ name: '1h', value: 20 }, { name: '2h', value: 60 }, { name: '3h', value: 120 }, { name: '4h', value: 300 }]
  },
  {
    id: 'mtn-003',
    title: 'MTN 3GB Unlimited',
    category: 'MTN',
    price: 13.4,
    licensesRemaining: 90,
    totalLicenses: 1500,
    rarity: 'Standard',
    viewingCount: 930,
    description: 'High-speed Data Bundle; Optimized for Social Media; Valid for 30 Days',
    hypeVelocity: [{ name: '1h', value: 15 }, { name: '2h', value: 40 }, { name: '3h', value: 90 }, { name: '4h', value: 210 }]
  },
  {
    id: 'mtn-004',
    title: 'MTN 100GB Unlimited',
    category: 'MTN',
    price: 380,
    licensesRemaining: 5,
    totalLicenses: 50,
    rarity: 'Exclusive',
    viewingCount: 450,
    description: 'Enterprise 4G/LTE Speeds; 5GB Extra Night Data; Priority Network Access',
    hypeVelocity: [{ name: '1h', value: 5 }, { name: '2h', value: 10 }, { name: '3h', value: 25 }, { name: '4h', value: 80 }]
  },
  // TELECEL PLANS
  {
    id: 'tc-001',
    title: 'Telecel 10GB (60 Days)',
    category: 'Telecel',
    price: 38,
    licensesRemaining: 65,
    totalLicenses: 500,
    rarity: 'Premium',
    viewingCount: 1105,
    description: 'Unlimited WhatsApp Access; Social Media Data Included; Extended 60-Day Validity',
    hypeVelocity: [{ name: '1h', value: 30 }, { name: '2h', value: 80 }, { name: '3h', value: 150 }, { name: '4h', value: 400 }]
  },
  {
    id: 'tc-002',
    title: 'Telecel 20GB (60 Days)',
    category: 'Telecel',
    price: 72,
    licensesRemaining: 30,
    totalLicenses: 200,
    rarity: 'Premium',
    viewingCount: 650,
    description: 'Unlimited Social Media; 24/7 Priority Support; High Capacity Streaming',
    hypeVelocity: [{ name: '1h', value: 10 }, { name: '2h', value: 30 }, { name: '3h', value: 70 }, { name: '4h', value: 150 }]
  },
  // AIRTELTIGO PLANS
  {
    id: 'at-001',
    title: 'AirtelTigo 3GB Non-Expiry',
    category: 'AirtelTigo',
    price: 12,
    licensesRemaining: 200,
    totalLicenses: 2000,
    rarity: 'Standard',
    viewingCount: 1560,
    description: 'No Expiry Date; High-speed YouTube Streaming; Reliable Connection',
    hypeVelocity: [{ name: '1h', value: 100 }, { name: '2h', value: 300 }, { name: '3h', value: 600 }, { name: '4h', value: 1200 }]
  },
  {
    id: 'at-002',
    title: 'AirtelTigo 10GB Non-Expiry',
    category: 'AirtelTigo',
    price: 38,
    licensesRemaining: 40,
    totalLicenses: 500,
    rarity: 'Premium',
    viewingCount: 890,
    description: 'Data Carry-over Support; Free YouTube Access; Permanent Data Balance',
    hypeVelocity: [{ name: '1h', value: 50 }, { name: '2h', value: 120 }, { name: '3h', value: 250 }, { name: '4h', value: 500 }]
  }
];
