import settings from '../settings';

export default () => {
  const newStockDeliveryMessage = document.createElement('div');
  newStockDeliveryMessage.classList.add(`${settings.ID}-deliveryStock`);

  const isInStock = document.querySelector('.stock-level__item.stockLevel.inStock');
  const productPrice = window.digitalData.product[0].price.currentPrice;

  // if it's in stock and price is over 10
  if (isInStock && productPrice >= 100) {
    newStockDeliveryMessage.innerHTML = `<p class="${settings.ID}-delivery">In Stock - Available for Free Delivery</p>`;
  } else if (isInStock && productPrice < 100) {
    newStockDeliveryMessage.innerHTML = `<p class="${settings.ID}-delivery">In Stock</p>`;
  } else {
    return;
  }

  const buyOptions = document.querySelector('.tableContainer .buying-info');
  buyOptions.appendChild(newStockDeliveryMessage);
};
