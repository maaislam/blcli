import { fullStory } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

const buildElement = (ref) => {
  if (ref) {
    ref.insertAdjacentHTML('beforeend', `
      <div class="FL-BF">
        <a href="https://www.flannels.com/customerservices/termsandconditions/websitetermsandconditions" target="_blank">
          <h2>BLACK FRIDAY £50 VOUCHER</h2>
          <p><strong>SENT VIA EMAIL WITH EVERY £250 SPENT<sup>*</sup></strong></p>
        </a>
      </div>
    `);
  }
};

export { setup, buildElement }; // eslint-disable-line
