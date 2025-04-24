export default () => {
  const basketItems = window.universal_variable.basket.line_items.length;
  const basketIcon = document.querySelector('.header_icon .basket_badge');
  if (basketItems > 0) {
    basketIcon.classList.add('MP145-hasItem');
  } else {
    basketIcon.classList.remove('MP145-hasItem');
  }
};
