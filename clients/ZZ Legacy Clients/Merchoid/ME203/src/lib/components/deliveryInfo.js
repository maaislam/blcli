export default () => {
  const deliveryMethod = document.querySelector('#shipping_method');
  if (deliveryMethod) {
    const cartWrapper = document.querySelector('.cart-sidebar');
    const deliveryTitle = document.createElement('div');
    deliveryTitle.classList.add('ME203-delivery_title');
    deliveryTitle.innerHTML = 'Choose your delivery method';

    cartWrapper.insertAdjacentElement('beforebegin', deliveryTitle);

    document.querySelector('.shipping th').style.display = 'none';
  }

  // move gift voucher link
  const giftVoucherBox = document.querySelector('#cartCouponField');
  document.querySelector('.cart-sidebar').insertAdjacentElement('afterend', giftVoucherBox);


  // change payment text
  document.querySelector('#choose_payment h2').textContent = 'Choose your payment method';
};
