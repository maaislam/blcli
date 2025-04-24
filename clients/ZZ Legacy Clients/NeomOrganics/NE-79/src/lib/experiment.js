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
    const colPosPod = window.innerWidth < winCutoff ? 4 : 6;
    const colPosGift = window.innerWidth < winCutoff ? cols.length - 1 : cols.length - 3;

    [].forEach.call(cols, (col, idx) => {
      if(idx == colPosPod - 1) {
        col.insertAdjacentHTML('afterend', `
          <div class="${shared.ID}-pod"></div>
        `);
      } else if(colPosGift == idx) {
        col.insertAdjacentHTML('afterend', `
          <div class="${shared.ID}-gift"></div>
        `);
      }
    });
  }

  // -----------------------
  // Control and Variation Tracking
  // -----------------------
  const pod = document.querySelector(`.${shared.ID}-pod`);
  const gift = document.querySelector(`.${shared.ID}-gift`);

  if(pod) {
    checkIntersection(pod).then(() => {
      events.send(`${shared.ID} V-Day PLP Ad Blocks`, 'View Wellbeing Pod', `V-${shared.VARIATION}`);
    });
  }

  if(gift) {
    checkIntersection(gift).then(() => {
      events.send(`${shared.ID} V-Day PLP Ad Blocks`, 'View Gift Finder', `V-${shared.VARIATION}`);
    });
  }

  // -----------------------
  // Variant specific code
  // -----------------------
  if(shared.VARIATION != 'control') {
    if(pod && gift) {
      pod.insertAdjacentHTML('afterbegin', `
        <a href="https://www.neomorganics.com/pages/wellbeing-pod" class="${shared.ID}-pod__inner">
          <h3><span>Give the</span> <strong>Ultimate Gift</strong></h3>
          <button href="https://www.neomorganics.com/pages/wellbeing-pod">Shop Wellbeing Pod</button>
        </a>
      `);

      gift.insertAdjacentHTML('afterbegin', `
        <a class="${shared.ID}-gift__inner" href="https://www.neomorganics.com/pages/find-a-feel-good-gift">
          <h3><div><span>Gift</span> Finder</div></h3>
          <h4>Not sure what gift to give?</h4>
          <p>
            Answer 4 questions and we'll help you find the
            <strong>Perfect Gift</strong> with true wellbeing purpose
            (it only takes 2 minutes)
          </p>

          <div>
            <button href="https://www.neomorganics.com/pages/wellbeing-pod">Start Now</button>
          </div>
        </div>
      `);

      // Events
      pod.addEventListener('click', e => {
        events.send(`${shared.ID} V-Day PLP Ad Blocks`, 'Click Wellbeing Pod', `V-${shared.VARIATION}`);
      });
      gift.addEventListener('click', e => {
        events.send(`${shared.ID} V-Day PLP Ad Blocks`, 'Click Gift Finder', `V-${shared.VARIATION}`);
      });
    }
  }
};
