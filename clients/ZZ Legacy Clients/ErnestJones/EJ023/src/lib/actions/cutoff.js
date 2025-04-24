import settings from '../settings';
import cache from '../cache';
import { countdown } from '../../../../../../lib/uc-lib';
import { parsePrice } from '../prices';
import { qualifiesForFreeDelivery } from '../delivery';

/**
 * Helper
 */
const generateFreeDeliveryMessage = (methodText, deliveryText = '') => {
  let msg = '';
  if(deliveryText) {
    msg = '<p>' + deliveryText + '</p>';
  }
  const txt = `
    <div class="${settings.ID}-cutoff-message">
      <p>Your order qualifies for FREE ${methodText}</p>
      ${msg}
      <p>
        Order in next
        <span id="${settings.ID}-countdown-container"></span>
      </p>
    </div>
  `;

  return txt;
};

/**
 * Show cutoff
 */
export const showCutoff = () => {
  // Current cheapest delivery method
  const basketSubtotal = Signet.checkout.basketValue;

  if(qualifiesForFreeDelivery(basketSubtotal)) {
    let currentDeliveryText = null;
    const firstDeliveryMethod = document.querySelector(`.${settings.ID}-new-delivery-options .${settings.ID}-text span`);

    if(firstDeliveryMethod) {
      currentDeliveryText = firstDeliveryMethod.innerText.trim();
    }

    let currentDeliveryTextDate = '';
    const firstDeliveryMethodDate = document.querySelector(`.${settings.ID}-new-delivery-options .${settings.ID}-text--desc`);

    if(firstDeliveryMethodDate) {
      currentDeliveryTextDate = firstDeliveryMethodDate.innerText.trim();
    }

    if(currentDeliveryText) {
      cache.get('checkout-form').insertAdjacentHTML(
        'afterbegin', 
        generateFreeDeliveryMessage(currentDeliveryText, currentDeliveryTextDate)
      );

      countdown({
        cutoff: +((new Date()).setHours(settings.DELIVERY_CUTOFF_HOURS, 0, 0)),
        element: `#${settings.ID}-countdown-container`,
        labels: {
            d: 'days',
            h: 'hrs',
            m: 'mins',
            s: 'secs'
        },
        delivery: {
          excludeDays: ['Sunday'],
          deliveryDays: 1,
          tomorrowLabel: false
        },
      });
    }
  }
};
