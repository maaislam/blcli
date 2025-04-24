export const deduplicateAndSort = (offers) => {
  return [...new Map(offers.map((item) => [item.code, item])).values()].sort((a, b) => a.priority - b.priority);
};

export const formatExpiryDate = (dateString) => {
  if (!dateString || dateString.length !== 8) return 'Invalid Date';

  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);

  return `${day}/${month}/${year}`;
};
