import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const isPdpPage = window.dataLayer.find((item) => item['event'] === 'productDetails');

const changeHandler = (event) => {
  const modifiedValue = event.target.value.split('_')[0];
  fireEvent(
    `User select ${parseInt(modifiedValue) === 1 ? `${modifiedValue} month` : `${modifiedValue} months`} subscription option`
  );
};

const init = () => {
  //PDP page...
  pollerLite([() => typeof isPdpPage === 'object', '[data-og-module="pdp"] .og-widget > .og-option-row:last-child'], () => {
    fireEvent('Conditions Met');
    const targetPoint = document.querySelector('[data-og-module="pdp"]');
    const subscribeElement = targetPoint.querySelector('.og-widget > .og-option-row:last-child');

    if (VARIATION !== 'control') {
      const toolTipElement = subscribeElement.querySelector('[data-og-event="showSeeDetails"]');
      const labelElement = subscribeElement.querySelector('label.og-label');
      labelElement.innerHTML = `<strong>Free delivery.&nbsp;</strong> Set up a subscription`;
      toolTipElement.childNodes[0].nodeValue = 'i';
      labelElement.insertAdjacentElement('beforeend', toolTipElement);
    }

    const selectElement = subscribeElement.querySelector('select');
    const eventListener = (event) => changeHandler(event);

    // Remove previous event listener (if exists)
    selectElement.removeEventListener('change', eventListener);
    selectElement.addEventListener('change', eventListener);
  });

  //Basket page...
  if (window.location.pathname.includes('/basket')) {
    pollerLite(['.og-offer', '.og-widget > .og-option-row:last-child'], () => {
      fireEvent('Conditions Met');
      const targetPoint = document.querySelector('.cart-items-form');
      const subscribeElements = targetPoint.querySelectorAll('.og-widget > .og-option-row:last-child');

      subscribeElements.forEach((subscribeElement) => {
        const toolTipElement = subscribeElement.querySelector('[data-og-event="showSeeDetails"]');
        const labelElement = subscribeElement.querySelector('label.og-label');

        if (VARIATION !== 'control') {
          labelElement.innerHTML = `<strong>Free delivery.&nbsp;</strong> Set up a subscription`;
          toolTipElement.childNodes[0].nodeValue = 'i';

          const subscriptionOptionWrapper = document.createElement('div');
          subscriptionOptionWrapper.classList.add(`${ID}__subscriptionOptionWrapper`);
          labelElement.insertAdjacentElement('beforebegin', subscriptionOptionWrapper);

          //insert label and tooltip
          subscriptionOptionWrapper.append(labelElement, toolTipElement);
        }

        const selectElement = subscribeElement.querySelector('select');
        const eventListener = (event) => changeHandler(event);

        // Remove previous event listener (if exists)
        selectElement.removeEventListener('change', eventListener);
        selectElement.addEventListener('change', eventListener);
      });
    });
  }
};

export default () => {
  setup();

  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-B37NQR1RWZ';

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest('#add-to-cart')) {
      fireEvent('Add to cart button clicked');
    }
  });

  init();
};
