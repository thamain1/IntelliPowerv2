import { SolarProjectData, SolarCalculations } from '../types/chat';

export const calculateSolarMetrics = (data: SolarProjectData): SolarCalculations | null => {
  if (!data.acreage) return null;

  // Average solar irradiance (kWh/m²/day) - this should be fetched from an API based on location
  const avgSolarIrradiance = 5.0; 
  const systemEfficiency = 0.80; // 20% system inefficiency
  const acreToSquareMeters = 4046.86;
  
  // Calculate annual energy output
  const annualOutput = data.acreage * acreToSquareMeters * avgSolarIrradiance * 365 * systemEfficiency;
  
  // Calculate system cost ($1.5M per acre)
  const systemCost = data.acreage * 1500000;
  
  // Calculate incentives
  const itcRate = data.entityType === 'non-profit' ? 0.30 : 0.30; // 30% ITC for both
  const itc = systemCost * itcRate;
  
  // Simplified ROI calculation (20-year period)
  const electricityRate = 0.12; // Average electricity rate per kWh
  const annualRevenue = annualOutput * electricityRate;
  const roi = (annualRevenue * 20 - systemCost + itc) / systemCost * 100;
  
  // Simplified payback period calculation
  const paybackPeriod = (systemCost - itc) / annualRevenue;

  return {
    annualOutput,
    systemCost,
    incentives: {
      itc,
      additionalIncentives: [],
    },
    roi,
    paybackPeriod,
  };
};