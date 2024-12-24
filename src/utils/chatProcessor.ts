import { Message, SolarProjectData } from '../types/chat';
import { calculateSolarMetrics } from './solarCalculations';
import { parseLocation } from './locationParser';

const extractProjectData = (messages: Message[]): SolarProjectData => {
  const data: SolarProjectData = {};
  let lastUserMessage = '';
  
  // Process messages in reverse to get the most recent information
  for (const message of messages.reverse()) {
    if (message.role === 'user') {
      lastUserMessage = message.content.toLowerCase();
      
      // Extract entity type if not already set
      if (!data.entityType) {
        if (lastUserMessage.includes('non-profit')) {
          data.entityType = 'non-profit';
        } else if (lastUserMessage.includes('for-profit')) {
          data.entityType = 'for-profit';
        }
      }
      
      // Extract acreage if not already set
      if (!data.acreage) {
        const acreageMatch = lastUserMessage.match(/(\d+(\.\d+)?)\s*(acre|acres)/i);
        if (acreageMatch) {
          data.acreage = parseFloat(acreageMatch[1]);
        }
      }
      
      // Extract location if not already set
      if (!data.location) {
        const parsedLocation = parseLocation(message.content);
        if (parsedLocation) {
          data.location = parsedLocation;
        }
      }
    }
  }
  
  return data;
};

export const processChat = (messages: Message[]): string => {
  const projectData = extractProjectData(messages);
  const lastMessage = messages[messages.length - 1];
  
  // Only ask for missing information if it's a user message
  if (lastMessage.role === 'user') {
    if (!projectData.entityType) {
      return "Are you a non-profit or for-profit organization?";
    }
    
    if (!projectData.location) {
      return "Please provide your location in this format: Address, City, State ZIP (Example: 123 Main St, Springfield, IL 12345)";
    }
    
    if (!projectData.acreage) {
      return "How many acres will be used for the solar farm?";
    }
    
    const calculations = calculateSolarMetrics(projectData);
    if (!calculations) {
      return "I apologize, but I couldn't calculate the solar metrics with the provided information. Please ensure all required information is provided.";
    }
    
    return `Based on your ${projectData.acreage} acre solar farm in ${projectData.location.city}, ${projectData.location.state}, here are the calculations:

Annual Energy Output: ${Math.round(calculations.annualOutput).toLocaleString()} kWh
Total System Cost: $${Math.round(calculations.systemCost).toLocaleString()}
Investment Tax Credit (ITC): $${Math.round(calculations.incentives.itc).toLocaleString()}
ROI (20-year period): ${calculations.roi.toFixed(2)}%
Estimated Payback Period: ${calculations.paybackPeriod.toFixed(1)} years

Would you like more detailed information about available incentives or financing options?`;
  }
  
  return lastMessage.content;
};