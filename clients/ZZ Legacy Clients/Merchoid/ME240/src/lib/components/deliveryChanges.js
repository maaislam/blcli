import settings from '../settings';

const { ID } = settings;

export default () => {

  const addDeliverySection = () => {
    const currentDeliveryBox = document.querySelector('.cart-sidebar .shipping');
    // get selected delivery option
    const selectedDelivery = document.querySelector('#shipping_method input:checked');

    let headingTitle;
    let deliveryDesc;

    if (selectedDelivery) {
      headingTitle = selectedDelivery.parentNode.querySelector('label').textContent.trim();
      deliveryDesc = selectedDelivery.parentNode.querySelector(`span:not(.woocommerce-Price-amount):not(.woocommerce-Price-currencySymbol):not(.${ID}-radio_box)`).textContent.trim();
    } else {
      headingTitle = 'Free Delivery';
      deliveryDesc = 'Delivered by Royal Mail';
    }


    // add the new delivery option
    const newDelivery = document.createElement('div');
    newDelivery.classList.add(`${ID}-deliveryArea`);
    currentDeliveryBox.insertAdjacentElement('beforebegin', newDelivery);
    newDelivery.innerHTML = `
    <span class="${ID}-deliveryIcon"></span>
    <div class="${ID}-deliveryText">
      <h3>${headingTitle}</h3>
      <p>${deliveryDesc}</p>
    </div>
    ${selectedDelivery ? `<div class="${ID}-changeDelivery">Change</div>` : ''}`;

    // move the radio buttons to the new container
    newDelivery.appendChild(currentDeliveryBox);
  };

  if (document.querySelector('.cart-sidebar .shipping')) {
    addDeliverySection();
  }


  // add the new styled radio buttons
  // show hide the delivery when change is clicked
  const showHideDelivery = () => {
    const radioButtons = document.querySelectorAll('#shipping_method li');

    for (let index = 0; index < radioButtons.length; index += 1) {
      const element = radioButtons[index];
      const newRadioButton = document.createElement('span');
      newRadioButton.classList.add(`${ID}-radio_box`);
      element.insertAdjacentElement('afterbegin', newRadioButton);

      if (element.querySelector('input:checked')) {
        newRadioButton.classList.add(`${ID}-checked`);
      }


      const shippingContainer = document.querySelector('.cart_totals .shipping');
      // click the hidden inputs
      element.addEventListener('click', () => {
        if (element.querySelector('input:checked')) {
          shippingContainer.classList.remove(`${ID}-deliveryActive`);
        }
        element.querySelector('input').click();
      });
    }

    const changeDelivery = document.querySelector(`.${ID}-changeDelivery`);
    changeDelivery.addEventListener('click', () => {
      const shippingContainer = document.querySelector('.cart_totals .shipping');
      shippingContainer.classList.add(`${ID}-deliveryActive`);
    });
  };

  if (document.querySelector('#shipping_method input:checked')) {
    showHideDelivery();
  }
};
