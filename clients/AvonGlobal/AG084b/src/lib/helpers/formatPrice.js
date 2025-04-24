const formatPrice = (price) => {
  const toCurrency = (n, curr, LanguageFormat = undefined) =>
    Intl.NumberFormat(LanguageFormat, { style: 'currency', currency: curr }).format(n);
  // console.log(priceFormatted);
  // if (currency == 'ZAR') {
  //   return priceFormatted.split('A')[1];
  //   //priceFormatted.split('RUB')[1] + '₽';
  // }
  return toCurrency(price, 'RUB', 'Ru-ru'); //.split('RUB')[1] + '₽';
  //return priceFormatted.split('A')[1];
};
export default formatPrice;
