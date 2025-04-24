import settings from '../settings';

export default () => {
  const addStockMessage = () => {
    const stockMessage = document.createElement('div');
    stockMessage.classList.add(`${settings.ID}-stock_message`);
    stockMessage.innerHTML = '<span>Less than 3 available! 2 people have this in their basket</span>';
    return stockMessage;
  };

  // change the basket items
  const basketItems = document.querySelectorAll('.cart_item');
  for (let index = 0; index < basketItems.length; index += 1) {
    const element = basketItems[index];
    const productQTY = element.querySelector('.product-quantity .input-text.qty').value;
    const productNameText = element.querySelector('.product-name a').textContent;
    const productLink = element.querySelector('.product-name a').getAttribute('href');
    const productPrice = element.querySelector('.product-price span').textContent;

    const removeItem = element.querySelector('.mobile-remove-item');

    // create new product details
    const newProductDetails = document.createElement('div');
    newProductDetails.classList.add(`${settings.ID}-product-content`);
    newProductDetails.innerHTML = `
    <div class="${settings.ID}-product-details">
      <div class="${settings.ID}-product_name"><a href="${productLink}">${productNameText}</a></div>
      <div class="${settings.ID}-product_price">${productPrice}</div>
      <div class="${settings.ID}-product_size"></div>
      <div class="${settings.ID}-product_qty">Quantity: ${productQTY} <span>Edit</span> <div class="${settings.ID}-removeItem"></div></div>
    </div>`;

    element.querySelector('.product-name').insertAdjacentElement('beforebegin', newProductDetails);

    // add remove item
    const newRemoveWrapper = element.querySelector(`.${settings.ID}-removeItem`);
    newRemoveWrapper.appendChild(removeItem);

    // Move qty to new wrapper
    const qty = element.querySelector('.product-quantity');
    element.querySelector(`.${settings.ID}-product_qty`).appendChild(qty);

    // show, hide qty
    const editQTY = element.querySelector(`.${settings.ID}-product_qty span`);
    editQTY.addEventListener('click', () => {
      if (qty.classList.contains(`${settings.ID}-product_qty_show`)) {
        qty.classList.remove(`${settings.ID}-product_qty_show`);
      } else {
        qty.classList.add(`${settings.ID}-product_qty_show`);
      }
    });

    // add the stock message to the first and if any match
    const firstItemName = basketItems[0].querySelector('.product-name a').textContent;
    if (firstItemName === productNameText) {
      element.appendChild(addStockMessage());
    } else if (index === 0) {
      element.appendChild(addStockMessage());
    }

    // add the sizes
    const newSize = element.querySelector(`.${settings.ID}-product_size`);
    if (element.querySelector('dd.variation-Size')) {
      newSize.textContent = `Size: ${element.querySelector('dd.variation-Size').textContent}`;
    } else {
      newSize.style.display = 'none';
    }
  }
};
