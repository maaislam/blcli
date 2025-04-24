/**
 * FL080 - Free delivery option
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events, setCookie, getCookie, deleteCookie } from '../../../../../lib/utils';
import { observer, pollerLite } from '../../../../../lib/uc-lib';

events.analyticsReference = '_gaUAT';

const activate = () => {
  setup();

  const { ID, VARIATION } = settings;
  
  if (VARIATION == 2) {
    events.send(ID, 'FL080 Control', 'FL080 Control is active');
    return false;
  } else {
    events.send(ID, 'FL080 Variation 1', 'FL080 test active');
  }


  // Cache elements
  const stdDel = cacheDom.get('li.DeliveryOptionsItem_STD');
  const bodyWrap = cacheDom.get('#BodyWrap');
  

  const showOption = () => {
    // Hide standard Delivery option
    stdDel.classList.add('hide');

    // Show message
    bodyWrap.insertAdjacentHTML('beforeend', `
      <div class="FL080-freeDelMessage">
        <p>Congratulations, you have qualified for free delivery!</p>
      </div>
    `);

    const message = document.querySelector('.FL080-freeDelMessage');
    if (message && !getCookie('FL080Shown')) {
      setTimeout(() => {
        message.parentNode.removeChild(message);

        setCookie('FL080Shown', 'true', 99);
      }, 3000);
    }
  };

  const hideOption = () => {
    // Show standard Delivery option
    stdDel.classList.remove('hide');

    deleteCookie('FL080Shown');
  };

  let totalVal = 0;

  // Get basket total
  pollerLite(['#TotalValue'], () => {
    const totalEl = document.querySelector('#TotalValue');
    const totalText = totalEl.textContent;
    totalVal = parseInt(totalText.replace(/^\D/, ''), 10);
  });

  // If over £201
  if (totalVal > 201) {
    showOption();
  } else if (totalVal < 199) {
    hideOption();
  }
  

};

export default activate;
