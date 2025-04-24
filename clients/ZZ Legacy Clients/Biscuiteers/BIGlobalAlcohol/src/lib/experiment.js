/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { addPoller, addEventListener, addObserver } from './winstack';
import { events } from '../../../../../lib/utils';
import settings from './shared';

const alcoholProds = [
  /^wimbledon brewery beer$/i,
  /^personalised birthday cake$/i,
  /^gusbourne sparkling rose 2013$/i,
  /^birthday in a box$/i,
  /^happy birthday luxury gift box$/i,
  /^congratulations luxury gift box$/i,
  /^happy birthday gift box$/i,
  /^congratulations gift box$/i,
  /^engagement gift box$/i,
  /^new home gift box$/i,
  /^thank you gift box$/i,
  /^wedding gift box$/i,
  /^new baby luxury gift box$/i,
  /^new home luxury gift box$/i,
  /^thank you luxury gift box$/i,
  /^wedding luxury gift box$/i,
  /^macarons$/i,
  /^prosecco$/i,
  /^sipsmith london dry gin$/i,
  /^triple mini sipsmith gin$/i,
  /^rhubarb cosmopolitan letterbox cocktail$/i,
  /^strawberry and basil daiquiri letterbox cocktail$/i,
  /^espresso martini letterbox cocktail$/i,
  /^bordeaux cask aged negroni letterbox cocktail$/i,
  /^engagement luxury gift box$/i,
  /^gin selection gift box$/i,
  /^winter wonderland christmas hamper$/i,
  /^christmas luxury gift box$/i,
  /^handmade biscuiteers mince pies$/i,
  /^giant tin personalised happy birthday chocolates$/i,
  /^giant tin personalised happy christmas chocolates$/i,
  /^giant tin personalised well done chocolates$/i,
  /^personalised happy birthday medium tin chocolates$/i,
  /^medium tin happy christmas chocolates$/i,
  /^medium tin well done chocolates$/i,
  /^personalised thank you chocolates medium tin$/i,
  /^say cheese! biscuit tin$/i,
  /^rhubarb cosmo letterbox cocktail$/i,
  /^salted caramel martini letterbox cocktail$/i,
  /^negroni letterbox cocktail$/i,
  /^pineapple mojito letterbox cocktail$/i,
  /^christmas biscuits and prosecco gift box$/i,
  /^christmas luxury gift box$/i,
  /^winter wonderland christmas hamper$/i,
  /^christmas biscuits and gin selection gift box$/i,

];

const basketContainsAlcoholProducts = () => {
  const prods = document.querySelectorAll('.checkout-minibasket [ng-bind="::vm.product.data.name"]');

  let result = false;
  [].forEach.call(prods, (p) => {
    const name = p.innerText.trim();
    if(name && alcoholProds.some(r => !!name.match(r))) {
      result = true;
    }
  });

  return result;
};

export default () => {
  addPoller([
    () => {
      const checkoutDeliveryStatus = document.querySelectorAll('checkout-delivery-status');

      if(checkoutDeliveryStatus.length >= 1) {
        return true;
      }
    }
  ], () => {
    setup();
  
    // Non-US Country, check if alcohol products and show messaging
    if(basketContainsAlcoholProducts()) {
      const messaging = `<p class="${settings.ID}-messaging"
        >Sorry, some items in your basket can only be shipped UK wide</p>`;

      if(window.innerWidth <= 519) {
        const checkoutDelivery = document.querySelector('checkout-delivery');
        if(checkoutDelivery) {
          checkoutDelivery.insertAdjacentHTML('afterbegin', messaging);
        }
      } else {
        const checkoutDeliveryStatus = document.querySelectorAll('checkout-delivery-status');
        if(checkoutDeliveryStatus.length) {
          [].forEach.call(checkoutDeliveryStatus, (c) => {
            c.insertAdjacentHTML('beforebegin', messaging);
          });
        }
      }
    }
  }, {
    multiplier: 1,
    wait: 200
  });
};
