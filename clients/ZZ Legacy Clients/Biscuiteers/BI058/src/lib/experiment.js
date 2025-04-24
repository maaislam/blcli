import { setup, isLoggedIn, getPressiePoints } from './services';
import { addPoller, addEventListener, addObserver } from './winstack';
import { events } from '../../../../../lib/utils';
import settings from './shared';

const createPressieBox = (title, text, overlayValue = '') => {
  const markup = `
    <div class="${settings.ID}-pp-wrap ${settings.ID}-DOD">
      <div class="${settings.ID}-pp">
        <div class="${settings.ID}-pp__parcel">
          <span class="${settings.ID}-pp__parcel-overlay ${overlayValue > 9 ? 
            `${settings.ID}-pp__parcel-overlay--bigval"` : ``}"
           >${overlayValue ? `£${overlayValue}` : ''}</span>
        </div>

        <div class="${settings.ID}-pp__body">
          <div class="${settings.ID}-pp__title">${title}</div>
          <div class="${settings.ID}-pp__text">${text}</div>
        </div>
      </div>
    </div>
  `;

  return markup;
};

/**
 * Entry point for experiment
 */
export default () => {

  const localPrice = document.querySelector('local-product-view price');

  if(localPrice) {
    const priceVal = parseFloat(localPrice.innerText.replace('£', ''));

    events.send(`${settings.ID}`, isLoggedIn() ? 'Logged In' : 'Not Logged In');
    if(isLoggedIn()) {
      events.send(`${settings.ID}`, 'Balance: ' + getPressiePoints());
    }

    if(priceVal < 10) {
      events.send(`${settings.ID}`, 'price-too-low-for-points');
    }

    if(settings.VARIATION == 'control') {
      events.send(`${settings.ID}`, 'Control', 'Initialised');
      return;
    }

    setup();

    events.send(`${settings.ID}`, 'Variation', 'Initialised');
    
    // -------------------------------------
    // Tidy up [in case of test fire twice]
    // -------------------------------------
    const ppWrap = document.querySelector(`.${settings.ID}-pp-wrap`);
    if(ppWrap) {
      ppWrap.parentNode.removeChild(ppWrap);
    }

    // -------------------------------------
    // Generate box depending on whether signed in or not
    // and whether user has points
    // -------------------------------------
    let html = '';

    const potentialEarnings = Math.min(Math.floor(priceVal / 10), 10); // T&Cs limit to 10 points per day

    const balance = getPressiePoints();
    const newCost = Math.max(0, priceVal - balance);

    if(isLoggedIn() && balance > 0) {
      const newCostText = newCost > 0 ? ('£' + newCost.toFixed(2)) : 'Free'; 
      html += createPressieBox(
        `<a class="${settings.ID}-link" data-ident="pressiepoints" href="/pressie-points">Pressie Points</a>`,
        `If you use your available Pressie Points at the payment stage of checkout, this item will
          ${newCostText == 'Free' ? 'be' : 'cost just'}
          <strong class="col-11">${newCostText}</strong>`,
      );

      events.send(`${settings.ID}`, 'Use Points Messaging');
    } else if(potentialEarnings > 0) {
      html += createPressieBox(
        `Pressie Points`,
        `This item would earn you £${potentialEarnings} in Pressie Points to spend on future orders<br><a class="xmore ${settings.ID}-link" data-ident="findoutmore" href="/pressie-points">Find out more</a>`,
        potentialEarnings
      );

      events.send(`${settings.ID}`, 'Potential Earnings Messaging');
    }

    if(window.innerWidth < 960) {
      const localAddToBasket = document.querySelector('local-add-to-basket');
      if(localAddToBasket) {
        localAddToBasket.insertAdjacentHTML('afterend', html);
      }
    } else {
      localPrice.insertAdjacentHTML('afterend', html);
    }
  }

  [].forEach.call(document.querySelectorAll(`.${settings.ID}-link`), (link) => {
    addEventListener(link, 'click', (e) => {
      const ident = e.currentTarget.getAttribute('data-ident');
      
      events.send(`${settings.ID}`, 'Clicked Link', ident);
    });
  });

};
