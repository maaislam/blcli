const updateDiscountBlock = (cart) => {
  const cartCountValue = cart.item_count;
  cartCount(cartCountValue);
  //find number of Samples in basket
  const basketItems = cart.items;
  const samplesInCart = basketItems.filter((item) => item.title.split(' ').includes('Sample'));

  const samplesCostWithoutDisc = samplesInCart.reduce((acc, currentItem) => {
    const price = currentItem.price;

    acc = acc + price;

    return acc;
  }, 0);

  const sampleFinalCost = samplesInCart.length >= 3 ? samplesCostWithoutDisc - 50 : samplesCostWithoutDisc;
  const cartTotalCost = slate.Currency.formatMoney(sampleFinalCost, theme.moneyFormat);

  updateDiscountMsg(samplesInCart.length, cartTotalCost);
};

const updateDiscountMsg = (quantity, totalPrice) => {
  const showThree = quantity > 3 ? ' ' : `/3`;

  const content = `
  ${quantity}${showThree} Added (${totalPrice})
  `;

  document.querySelectorAll('.AV095-pg-header__discount--msg').forEach((discountMsg) => {
    discountMsg.innerHTML = content;
  });
};

export default updateDiscountBlock;
