const formatPrice = (price) => {
  const countryStr = '${market}'; //'en-GB';//${market}
  const currency = '${currency}'; //GBP;//${currency}
  const priceFormatted = new Intl.NumberFormat(`${countryStr}`, { style: 'currency', currency: `${currency}` }).format(price);
  //console.log(priceFormatted);
  // if (currency == 'ZAR') {
  //   return priceFormatted.split('A')[1];
  //   //priceFormatted.split('RUB')[1] + '₽';
  // }
  //return priceFormatted.split('A')[1]; //.split('RUB')[1] + '₽';
  return priceFormatted;
};
export default formatPrice;
