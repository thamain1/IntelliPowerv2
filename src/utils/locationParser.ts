interface ParsedLocation {
  address: string;
  city: string;
  state: string;
  zip: string;
}

export const parseLocation = (text: string): ParsedLocation | null => {
  // Match pattern: address, city, state zip
  const locationRegex = /([^,]+),\s*([^,]+),\s*([A-Z]{2})\s*(\d{5})/i;
  const match = text.match(locationRegex);

  if (match) {
    return {
      address: match[1].trim(),
      city: match[2].trim(),
      state: match[3].toUpperCase(),
      zip: match[4]
    };
  }

  return null;
};