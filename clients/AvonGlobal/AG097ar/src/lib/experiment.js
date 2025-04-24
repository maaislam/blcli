/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import getRepData from './getRepData';

export default () => {
  setup();
  const { rootScope, ID, VARIATION } = shared;

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    // -----------------------------
    // Add events that apply to both variant and control
    // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
    // -----------------------------
    // ...
    fireEvent('Conditions Met');
    document.getElementById('MainContentWrapper').addEventListener('click', (e) => {
      const target = e.target;
      const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);
      if (targetMatched('#mainlink') || targetMatched(`.${ID}__trending-btn`)) {
        fireEvent(`User clicked trending item ${target.innerText}`);
      }
    });

    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if (VARIATION == 'control') {
      return;
    }

    // -----------------------------
    // Write experiment code here
    // -----------------------------

    const htmlStrV2 = `<div class="${ID}__trendings category-var-${VARIATION}">
        <div class="${ID}__trending-category trend_category-var-${VARIATION}">
          
            <div class="${ID}__text-wrapper text-wrapper-${VARIATION}">
            <div class="title">Link up with the original influencers</div>
            <div class="subTitle">With over 135 years of experience, our Avon Reps have mastered beauty recommendations.<br /> <br /> 
            Now you can shop online with a personal touch.</div>
            <div class="btn-container">
              <a class="${ID}__btn-findrep ${ID}__trending-btn" rel="nofollow noopener" href="/representative">
                Find A Rep
              </a>
            </div>
            </div>
        </div>
      </div>`;

    const htmlStr = `<div class="${ID}__trendings caregory-var-${VARIATION}">
      <div class="${ID}__trending-category ">
          <div class="${ID}__mobile-backimage"></div>
          <div class="${ID}__text-wrapper">
          <div class="title">Shop with 135 years of experience behind you</div>
          <div class="subTitle">Our Reps are the heart of what we do, giving you the personal touch to find the perfect products.<br /><br /> 
          Nowadays, we have extra digital tools to help you connect.<br /> <br /> 
          Shop on the go with our website whilst still supporting your local community.</div>
          <div class="btn-container">
            <a class="${ID}__btn-findrep ${ID}__trending-btn" rel="nofollow noopener" href="/representative">
              Find A Rep
            </a>
          </div>
          </div>
      </div>
  </div>`;
    document.querySelectorAll(`.${ID}__trendings`).forEach((item) => {
      item.remove();
    });
    const anchorElm = document.getElementById('mainlink').closest('.StackContainer');
    anchorElm.querySelector('.ContentStack').classList.add(`${ID}__hide`);
    anchorElm.insertAdjacentHTML('afterbegin', VARIATION == 2 ? htmlStrV2 : htmlStr);
  };
  // Make device specific changes when layout changes
  rootScope.$on('App_LayoutChanged', () => {
    location.reload();
  });

  getRepData().then((repData) => {
    console.log(repData);
    if (!repData.Data.FullName) return;
    init();
  });
};
