const getProductCurrencyRatio = (item) => {
    // Get the current ratio for current currency format within the current currency rates
    const currencyRatio = window.currentCurrencyRates[item.product.currency];
    return currencyRatio;
};

export default getProductCurrencyRatio;