const updateMiniCart = (newProdCount) => {
  const miniCartElem = document.querySelector('[data-qaid="miniBasket-quantity"]');
  if (miniCartElem) {
    miniCartElem.textContent = newProdCount;
  }
};

export default updateMiniCart;
