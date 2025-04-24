export default () => {
  // const subtotal = window.universal_variable.basket.total
  // - window.universal_variable.basket.shipping_cost;

  const miniBasketPrice = () => {
    const outstandingAmount = document.querySelector('.basket_productPrice strong').textContent.trim().replace('£', '');
    const miniBasketTotal = parseFloat(outstandingAmount).toFixed(2);

    const leftToPay = 50 - miniBasketTotal;

    if (miniBasketTotal < 50) {
      const miniBasketHeader = document.createElement('div');
      miniBasketHeader.classList.add('MP128-freeDelivery_banner');
      miniBasketHeader.innerHTML = `<p>
      <span>Free delivery over £50</span> 
      - spend 
      <span class="MP128-deliveryAmount">£${leftToPay.toFixed(2)}</span>
      or more to qualify
      </p>
      <p>(Standard delivery £4.95, excludes Selected Cots & Furniture Collections)</p>`;
      document.querySelector('#miniCartSlider #basket .basket_strap').insertAdjacentElement('beforebegin', miniBasketHeader);
    }
  };
  miniBasketPrice();

  const addToBagButton = document.querySelector('.addToCartButton');
  if (addToBagButton) {
    addToBagButton.addEventListener('click', () => {
      if (document.querySelector('.MP128-freeDelivery_banner')) {
        document.querySelector('.MP128-freeDelivery_banner').remove();
      }
    });
  }
};
