import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import { getElement } from './lib/dom';
import init from './lib/experiment';
import pubSub from './lib/PublishSubscribe';
import settings from './lib/settings';
import { isUserLoggedIn } from './lib/user';
  
// ---------------------------------------------------
// Subscribers
// ---------------------------------------------------
pubSub.subscribe('experiment-init', () => {
  events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
});

pubSub.subscribe('experiment-init', () => {
  fullStory(settings.ID, `Variation ${settings.VARIATION}`);
});

pubSub.subscribe('did-toggle-create-account', (isChecked) => {
  document.body.classList.add(`${settings.ID}-create-account-active`);

  events.send(settings.ID, `Variation ${settings.VARIATION}`, 'did-toggle-create-account', {
    sendOnce: true  
  });
});

pubSub.subscribe('clicked-already-got-account', () => {
  document.body.classList.remove(`${settings.ID}-create-account-active`);

  events.send(settings.ID, `Variation ${settings.VARIATION}`, 'clicked-already-got-account', {
    sendOnce: true  
  });
});

pubSub.subscribe('did-click-gift-recipient', () => {
  events.send(settings.ID, `Variation ${settings.VARIATION}`, 'did-click-gift-recipient', {
    sendOnce: true  
  });
});

pubSub.subscribe('did-click-place-order', () => {
  events.send(settings.ID, `Variation ${settings.VARIATION}`, 'did-click-place-order', {
    sendOnce: true  
  });
});

pubSub.subscribe('did-click-manual-address-link', () => {
  events.send(settings.ID, `Variation ${settings.VARIATION}`, 'did-click-manual-address-link', {
    sendOnce: true  
  });
});

pubSub.subscribe('did-click-step-button', (step) => {
  events.send(settings.ID, `Variation ${settings.VARIATION}`, `did-click-step-button--tostep=${step}`, {
    sendOnce: true  
  });
});

// ----------------------------------------------
// Generic Poller
//
// - Rules for across all variations
// - Rules for across all combinations
// ----------------------------------------------
pollerLite([
  '#deliveryServiceList [name="deliveryOptions"]',
  () => (((window || {}).navigator || {}).userAgent) && window.navigator.userAgent.indexOf('MSIE ') === -1,
  () => {
    // Not IE11
    const result = (((window || {}).navigator || {}).userAgent) &&
    !(window.navigator.userAgent.indexOf('Trident') > -1 && !!window.navigator.userAgent.match(/rv[: ]11/i));
    return result;
  },
  () => !!(window.Signet || {}).checkout && window.Signet.checkout.hasOwnProperty('ifcPayment') && window.Signet.checkout.ifcPayment === false, // don't run for IFC payments
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
      if(!getElement(item[0], item[1])) {
        allExist = false;
      } 
    });

    return allExist;
  }
], init);
