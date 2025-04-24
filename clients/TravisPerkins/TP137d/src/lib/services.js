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

/**
 * @desc Adds a brochure after an element.
 * @param {Element} ref 
 */
function addBrochure(ref) {
  if (ref) {
    if (!document.querySelector('.TP137d-brochure')) {
      ref.insertAdjacentHTML('afterend', `
        <div class="TP137d-brochure">
          <div class="TP137d-brochure--img" style="background: url('https://prod1-tp01-prod02-aws-travisperkins-com-public.s3.amazonaws.com/sys-master/images/ha2/hf6/8886665871390/Gardens%20Brochure.png') no-repeat center center;">
          <a href="https://prod1-tp01-prod02-aws-travisperkins-com-public.s3.amazonaws.com/sys-master/images/h3a/hf3/8886665773086/1424114%20TP%20Landscaping%20Brochure_LR.pdf" target="_blank" title="Opens brochure in a new window."></a>
          </div>
          <div class="TP137d-brochure--cta">
            <a href="https://prod1-tp01-prod02-aws-travisperkins-com-public.s3.amazonaws.com/sys-master/images/h3a/hf3/8886665773086/1424114%20TP%20Landscaping%20Brochure_LR.pdf" target="_blank" title="Opens brochure in a new window.">Download Brochure</a>
          </div>
        </div>
      `);
    }
  }
}

export { setup, addBrochure }; // eslint-disable-line
