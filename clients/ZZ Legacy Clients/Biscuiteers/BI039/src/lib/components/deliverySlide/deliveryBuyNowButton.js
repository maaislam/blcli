export default () => {
  // if personalise delivery is clicked check the personalised message
  const deliveryPersonalMessage = document.querySelector('.BI039-personalised_message');
  const personalisedLabel = document.querySelector('[ng-switch-when="field|area"]');
  const personalisedMessageBox = document.querySelector('[ng-switch-when="field|area"] input');
  const buyNowButton = document.querySelector('.BI039_deliveryTab .BI039-tabContent .BI039-buyButton');

  const productPageAdd = document.querySelector('.BI039-button.BI039-buyButton');

  // if message box exists
  if (personalisedMessageBox && personalisedLabel) {
    if (personalisedMessageBox.value === '') {
      deliveryPersonalMessage.classList.add('BI039-showMessage');
      buyNowButton.classList.add('BI039-disabled');
      document.querySelector('.BI039-personalised_message label').textContent = personalisedLabel.querySelector('label').textContent;

      // add the value to actual input from delivery input
      deliveryPersonalMessage.querySelector('input').addEventListener('keyup', () => {
        personalisedMessageBox.value = deliveryPersonalMessage.querySelector('input').value;
        personalisedMessageBox.dispatchEvent(new Event('change'));
        buyNowButton.classList.remove('BI039-disabled');
        if (deliveryPersonalMessage.querySelector('input').value === '') {
          buyNowButton.classList.add('BI039-disabled');
        } else {
          buyNowButton.classList.remove('BI039-disabled');
        }
      }, false);
    }
  }


  buyNowButton.addEventListener('click', () => {
    // if personalised box is showing
    if (deliveryPersonalMessage.classList.contains('BI039-showMessage')) {
      if (deliveryPersonalMessage.querySelector('input').value === '') {
        deliveryPersonalMessage.classList.add('BI039-input_error');
      } else if (!buyNowButton.classList.contains('BI039-disabled')) { // validation passed on input box
        productPageAdd.click();
      }
    } else {
      productPageAdd.click();
    }
  });
};
