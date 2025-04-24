export const getNumber = (currencyString) => {
  if (!currencyString) return;
  return parseFloat(currencyString.replace(/^\D+/g, '').replaceAll('.', '').replace(',', '.'));
};

export const formatPrice = (amount, code = 'nl-NL', currency = 'EUR') => {
  return new Intl.NumberFormat(code, {
    style: 'currency',
    currency,
  }).format(amount);
};
