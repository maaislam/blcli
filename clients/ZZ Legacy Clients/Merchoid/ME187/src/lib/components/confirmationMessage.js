import settings from '../settings';

export const createMessage = () => {
  const productNameText = document.querySelector('.woocommerce-message.message-success').textContent.match(/“((?:\\.|[^"\\])*)”/)[1];

  const stepMessage = document.querySelector('.ucbaskettext');
  const topContent = document.createElement('div');
  topContent.classList.add(`${settings.ID}-top_content`);
  topContent.innerHTML = `
  <div class="${settings.ID}-basketMessage">
    <span>Phew! You’ve managed to snag one of the final ${productNameText}</span>
  </div>
  <a class="${settings.ID}-continue" href="https://www.merchoid.com/">Continue Shopping</a>`;
  stepMessage.insertAdjacentElement('beforebegin', topContent);

  const continueShoppingButton = document.querySelector(`.${settings.ID}-continue`);
  stepMessage.insertAdjacentElement('afterend', continueShoppingButton);
};

export const confirmMessage = () => {
  const productName = document.querySelector('.woocommerce-message.message-success');
  if (productName && productName.textContent.match(/“((?:\\.|[^"\\])*)”/)) {
    createMessage();
    const basketMessage = document.querySelector(`.${settings.ID}-basketMessage`);
    setTimeout(() => {
      basketMessage.classList.add(`${settings.ID}-basketMessage_hidden`);
    }, 4000);
  }
};
