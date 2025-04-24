const formatPrice = (price) => {
  const countryStr = 'en-GB'; //'en-GB';//${market}
  const currency = 'ZAR'; //GBP;//${currency}
  const priceFormatted = new Intl.NumberFormat(`${countryStr}`, { style: 'currency', currency: `${currency}` }).format(price);

  return priceFormatted.split('A')[1];
};
export default formatPrice;
