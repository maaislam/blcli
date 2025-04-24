/**
 * n.b. note logic runs on control, with variation conditional checks
 */
import { setup } from './services';
import shared from './shared';
import { events, pollerLite } from '../../../../../lib/utils';
import { checkIntersection } from '../../../../../evelyn/scrolling';
import data from './data';

const { ID, VARIATION } = shared;

/**
 * Entry point for experiment
 */
export default () => {
  setup();

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
      events.send(`${shared.ID} Mothers-Day PLP Ad Blocks`, 'View Block', `V-${shared.VARIATION}`);
    });
  }

  // -----------------------
  // Variant specific code
  // -----------------------
  if(shared.VARIATION != 'control') {
    if(gift) {
      gift.insertAdjacentHTML('afterbegin', `
        <a class="${shared.ID}-gift__inner" href="/pages/mothers-day">
          <h3><div>Scent With <span>Love</span></div></h3>
          <p>
            Feel-good gifts for all the women out there nailing it!
          </p>

          <div>
            <button href="/pages/mothers-day">Shop Mother's Day Gifts</button>
          </div>
        </div>
      `);

      // Events
      gift.addEventListener('click', e => {
        events.send(`${shared.ID} Mothers-Day PLP Ad Blocks`, 'Click Block', `V-${shared.VARIATION}`);
      });
    }
  }
};
