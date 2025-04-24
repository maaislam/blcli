import { fullStory, events } from '../../../../../lib/utils';
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

function addIcon(ref) {
  if (ref) {
    if (!document.querySelector('.BV004-sizes')) {
      ref.insertAdjacentHTML('beforeend', `
        <div class="BV004-sizes">
          <a href="/bra-fitting-guide/">
            <span></span>
            <p>Unsure of your size?</p>
          </a>
        </div>
      `);
    }
  }
}

function backToProduct(ref) {
  if (ref) {
    if (!document.querySelector('.BV004-back')) {
      ref.insertAdjacentHTML('afterbegin', `
        <div class="BV004-back">
          <button id="BV004-back-link">Back to product</button>
        </div>
      `);
      const addedButton = document.querySelector('#BV004-back-link');
      if (addedButton) {
        addedButton.addEventListener('click', () => {
          events.send(settings.ID, 'Click', 'User clicks "back to product"');
          window.history.back();
        });
      }
    }
  }
}

function clickTracking(el, message) {
  if (el) {
    el.addEventListener('click', (e) => {
      events.send(settings.ID, 'Click', message);
    });
  }
}

export { setup, addIcon, backToProduct, clickTracking }; // eslint-disable-line
