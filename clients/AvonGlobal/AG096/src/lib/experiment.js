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

    const getTrendingCategoryData = () => {
      const trendingCat = document.querySelectorAll('a#mainlink');
      return [...trendingCat]
        .map((item) => {
          return `<a class="${ID}__btn-${item.innerText} ${ID}__trending-btn" rel="nofollow noopener" href="${item.href}">
          ${item.innerText}
        </a>`;
        })
        .join('\n');
    };

    const htmlStr = `<div class="${ID}__trendings">
      <div class="${ID}__trending-category">
          <div class="${ID}__mobile-backimage"></div>
          <div class="${ID}__text-wrapper">
          <div class="title">Shop with 135 years of experience behind you</div>
          <div class="subTitle">By shopping online with your Avon representative today, you are helping transform women’s lives for the better</div>
          <div class="btn-container">
                ${getTrendingCategoryData()}
          </div>
          </div>
      </div>
  </div>`;
    document.querySelectorAll(`.${ID}__trendings`).forEach((item) => {
      item.remove();
    });
    const anchorElm = document.getElementById('mainlink').closest('.StackContainer');
    anchorElm.querySelector('.ContentStack').classList.add(`${ID}__hide`);
    anchorElm.insertAdjacentHTML('afterbegin', htmlStr);
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
