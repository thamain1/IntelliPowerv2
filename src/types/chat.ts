export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface SolarProjectData {
  location?: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  acreage?: number;
  entityType?: 'non-profit' | 'for-profit';
  energyConsumption?: number;
}

export interface SolarCalculations {
  annualOutput: number; // kWh
  systemCost: number;
  incentives: {
    itc: number;
    additionalIncentives: string[];
  };
  roi: number;
  paybackPeriod: number;
}