import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import { isUserLoggedIn } from '../../EJ023/src/lib/user';
import settings from '../../EJ023/src/lib/settings';

pollerLite([
  '#deliveryServiceList [name="deliveryOptions"]',
  () => (((window || {}).navigator || {}).userAgent) && window.navigator.userAgent.indexOf('MSIE ') === -1,
  () => !!(window.Signet || {}).checkout,
  () => !!window.digitalData,
  () => {
    // The reason we put these checks inside this function is that
    // calls to getElement() can be cached, so future calls to this function
    // as part of the polling process won't have to constantly query the dom
    // and they're available in cache later in our experiment
    // NB:
    // These fields differ when a user is logged in
    const elms = [
      ['checkout-form', '#checkout'],
      ['delivery-options-container', '#checkout [data-formname="deliveryOptions"]'],
      ['payment-container', '#checkout [data-group="cardPayment"]'],
      ['basket-summary-container', '#checkout .js-basketSummary'],
      [
        'gift-recipient-container',
        '#checkout [data-formname="deliveryOptions"] fieldset:nth-of-type(1)'
      ],
      [
        'address-options-container',
        '#checkout [data-formname="deliveryOptions"] fieldset:nth-of-type(2)'
      ],
      [
        'delivery-method-container',
        '#checkout [data-formname="deliveryOptions"] .js-deliveryMethod'
      ],
    ];

    if(isUserLoggedIn()) {
      elms.push(
        ['details-container', '#checkout fieldset:nth-of-type(1)'],
        ['billing-address-container', '#checkout fieldset:nth-of-type(2)'],
      );
    } else {
      elms.push(
        ['guest-selector-container', '#checkout fieldset:nth-of-type(1)'],
        ['details-container', '#checkout fieldset:nth-of-type(2)'],
        ['billing-address-container', '#checkout fieldset:nth-of-type(3)'],
      );
    }

    let allExist = true;

    elms.forEach((item) => {
      if(!document.querySelector(item[1])) {
        allExist = false;
      } 
    });

    return allExist;
  }
], () => {
  events.send(settings.ID, 'View', `${settings.ID} activated - Control`);
});
