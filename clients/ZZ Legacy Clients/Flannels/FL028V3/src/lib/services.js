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

function sizeChosen(sizeOptions) {
  let hasSize = false;
  if (sizeOptions) {
    for (let i = 1; sizeOptions.length > i; i += 1) {
      if (sizeOptions[i].getAttribute('selected') === 'selected') {
        hasSize = true;
      }
    }
  }
  return hasSize;
}

function renderMessage(ref) {
  if (ref) {
    if (!document.querySelector('.FL028-message')) {
      ref.insertAdjacentHTML('beforeend', `
        <div class="FL028-message">
          <p>Item added <br />You can find this item in your bag.</p>
        </div>
      `);
    }
  }
}

function removeMessage(messgaeEl) {
  if (messgaeEl) {
    messgaeEl.parentElement.removeChild(messgaeEl);
  }
}

function addToBag(atbEl) {
  if (atbEl) {
    atbEl.click();
  }
}

export { setup, renderMessage, removeMessage, sizeChosen, addToBag }; // eslint-disable-line
