/**
 * Formats standard fiat values into Indian Rupees cleanly
 */
export const formatCurrency = (value) => {
  if (value === undefined || value === null) return '₹0.00';

  // If the asset gain/loss is an microscopic decimal, treat it as clean zero
  if (Math.abs(value) < 0.00001) {
    return '₹0.00';
  }

  // Check if it's a small value requiring slightly more precision, but limit to 4 decimals max
  const isTiny = Math.abs(value) > 0 && Math.abs(value) < 0.01;

  let formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: isTiny ? 4 : 2,
    maximumFractionDigits: isTiny ? 4 : 2,
  }).format(value);

  // Safeguard against negative-zero strings like "-₹0.00"
  if (formatted === '-₹0.00' || formatted === '-₹0.0000') {
    return '₹0.00';
  }

  return formatted;
};

/**
 * Cleanly formats crypto token quantities, eliminating trailing scientific notation noise
 */
export const formatCrypto = (value, ticker = '') => {
  if (value === undefined || value === null) return `0 ${ticker}`.trim();
  
  // Clean up floating point scientific residue (e.g., 3.46e-17 becomes a clean 0)
  if (Math.abs(value) < 1e-9) {
    return `0 ${ticker}`.trim();
  }

  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 6,
  }).format(value) + (ticker ? ` ${ticker}` : '');
};

/**
 * Returns a Tailwind text color class based on whether the number is positive or negative
 */
export const getColorClass = (value) => {
  if (!value || Math.abs(value) < 0.00001) return 'text-white';
  return value > 0 ? 'text-successGreen' : 'text-red-500';
};