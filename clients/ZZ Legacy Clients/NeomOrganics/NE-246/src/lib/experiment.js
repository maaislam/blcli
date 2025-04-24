/**
 * n.b. note logic runs on control, with variation conditional checks
 */
import { setup } from './services';
import shared from './shared';
import { events, pollerLite } from '../../../../../lib/utils';
import { checkIntersection } from '../../../../../evelyn/scrolling';
import carousel from './carousel';

const { ID, VARIATION } = shared;

/**
 * Create plp ad blocks (empty)
 */
const createAdBlocks = () => {
  // -----------------------
  // Create target container divs
  // -----------------------
  const cols = document.querySelectorAll('#MainContent .columns .column');
  if(cols.length) {
    const winCutoff = 769;

    // Indices for Target Elements
    const colPosGift = window.innerWidth < winCutoff ? Math.min(cols.length, 6) - 1 : (
      cols.length >= 6 ? 5 : Math.min(cols.length - 1, 1)
    );

    [].forEach.call(cols, (col, idx) => {
      if(colPosGift == idx) {
        col.insertAdjacentHTML('afterend', `
          <div class="${shared.ID}-gift"></div>
        `);
      }
    });
  }

  // -----------------------
  // Control and Variation Tracking
  // -----------------------
  const gift = document.querySelector(`.${shared.ID}-gift`);
  if(gift) {
    checkIntersection(gift).then(() => {
      events.send(`${shared.ID} F-day Components`, 'View Gift Finder', `V-${shared.VARIATION}`);
    });
  }
};

/**
 * Populate ad blocks (variation)
 */
const populateAdBlocks = () => {

  const gift = document.querySelector(`.${shared.ID}-gift`);

  if(gift) {

    gift.insertAdjacentHTML('afterbegin', `
      <a class="${shared.ID}-gift__inner" href="https://www.neomorganics.com/collections/feel-good-gifts-for-dad">
        <h3><div><span>Feel Good</span> Father's Day</div></h3>
        <p>For your dad or the one who feels like dad, treat them with some FEEL GOOD.</p>

        <div>
          <button href="https://www.neomorganics.com/collections/feel-good-gifts-for-dad">Shop Now</button>
        </div>
      </div>
    `);

    // Events
    gift.addEventListener('click', e => {
      events.send(`${shared.ID} F-day Components`, 'Click Gift Finder', `V-${shared.VARIATION}`);
    });
  }
};

/**
 * Entry point for experiment
 */
export default () => {
  setup();

  // -----------------------
  // All variations
  // -----------------------
  createAdBlocks();
  
  // -----------------------
  // V1
  // -----------------------
  if(shared.VARIATION == '1') {
    carousel();
  }

  // -----------------------
  // V2
  // -----------------------
  if(shared.VARIATION == '2') {
    populateAdBlocks();
  }

};
