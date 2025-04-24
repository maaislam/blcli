import { events } from '../../../../../../lib/utils';

export default () => {
  let productInfo;
  if (window.innerWidth < 767) {
    productInfo = document.querySelector('.js-detailPane');
  } else {
    productInfo = document.querySelector('.productDetail');
  }
  const checkoutButton = document.createElement('a');
  checkoutButton.setAttribute('href', '/en-gb/cart/checkout');
  checkoutButton.classList.add('MP145-checkoutButton');
  checkoutButton.innerHTML = '<span>Proceed to checkout</span>';
  if (!document.querySelector('.MP145-checkoutButton')) {
    productInfo.appendChild(checkoutButton);
  }

  checkoutButton.addEventListener('click', () => {
    events.send('MP145 V2', 'Clicked', 'Proceed to basket');
  });
};
