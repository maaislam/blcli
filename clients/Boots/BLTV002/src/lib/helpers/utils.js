export const calculatePoints = (amount) => Math.round(amount * 100);
export const extractNumber = (str) => parseFloat(str.replace(/[^\d.]/g, ''));