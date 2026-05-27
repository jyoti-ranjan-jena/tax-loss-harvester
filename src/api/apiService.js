import { mockHoldingsData, mockCapitalGainsData } from './mockData';

// Simulates a GET request to /api/v1/holdings
export const fetchHoldings = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockHoldingsData);
    }, 1200);
  });
};

// Simulates a GET request to /api/v1/capital-gains
export const fetchCapitalGains = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCapitalGainsData);
    }, 1200);
  });
};