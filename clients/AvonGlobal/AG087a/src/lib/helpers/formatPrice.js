const formatPrice = (amount, code = 'en-GB', currency = 'GBP') => {
  return new Intl.NumberFormat(code, {
    style: 'currency',
    currency,
  }).format(amount);
};

export default formatPrice;
