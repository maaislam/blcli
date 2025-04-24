/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

const changeHandler = (event) => {
  const modifiedValue = event.target.value.split('_')[0];
  fireEvent(
    `User select ${parseInt(modifiedValue) === 1 ? `${modifiedValue} month` : `${modifiedValue} months`} subscription option`
  );
};

const init = () => {
  const targetPoint = document.querySelector('.cart-items-form');
  const subscribeElements = targetPoint.querySelectorAll('.og-widget > .og-option-row:last-child');

  subscribeElements.forEach((subscribeElement) => {
    const toolTipElement = subscribeElement.querySelector('[data-og-event="showSeeDetails"]');
    const labelElement = subscribeElement.querySelector('label.og-label');
    labelElement.innerHTML = `<strong>Free delivery.&nbsp;</strong> Set up a subscription`;
    toolTipElement.childNodes[0].nodeValue = 'i';

    const subscriptionOptionWrapper = document.createElement('div');
    subscriptionOptionWrapper.classList.add(`${ID}__subscriptionOptionWrapper`);
    labelElement.insertAdjacentElement('beforebegin', subscriptionOptionWrapper);

    //insert label and tooltip
    subscriptionOptionWrapper.append(labelElement, toolTipElement);

    const selectElement = subscribeElement.querySelector('select');
    const eventListener = (event) => changeHandler(event);

    // Remove previous event listener (if exists)
    selectElement.removeEventListener('change', eventListener);
    selectElement.addEventListener('change', eventListener);
  });
};

export default () => {
  setup();

  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-B37NQR1RWZ';

  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    const targetPoint = document.querySelector('.cart-items-form');
    const subscribeElements = targetPoint.querySelectorAll('.og-widget > .og-option-row:last-child');

    subscribeElements.forEach((subscribeElement) => {
      const selectElement = subscribeElement.querySelector('select');
      const eventListener = (event) => changeHandler(event);
      // Remove previous event listener (if exists)
      selectElement.removeEventListener('change', eventListener);
      selectElement.addEventListener('change', eventListener);
    });

    return;
  }

  init();
};
