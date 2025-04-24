/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  // Write experiment code here
  const images = {
    desktop: 'https://editor-assets.abtasty.com/45268/5ef358aba3d111593006251.jpg',
    mobile: 'https://editor-assets.abtasty.com/45268/5ef358c5433101593006277.jpg',
  };

  const mainContent = document.querySelector('#main-content');
  if(mainContent) {
    mainContent.insertAdjacentHTML('afterbegin', `
      <a class="${shared.ID}-creed-banner" href="/creed">
        <div class="ImgButWrap ${shared.ID}-creed-banner__btnwrap">
          <span class="${shared.ID}-creed-banner__btn">Shop Now</span>
        </div>
      </a>
    `);

    const btn = document.querySelector(`.${shared.ID}-creed-banner`);
    if(btn) {
      btn.addEventListener('click', () => {
        events.send(ID, `${shared.ID} Variation 1`, `Did Click CTA`);    
      });
    }
  }
};
