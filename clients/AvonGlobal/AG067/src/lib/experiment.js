/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite } from "../../../../../lib/uc-lib";
import { events } from '../../../../../lib/utils';

const runChanges = () => {
  pollerLite([
    '#container',
  ], () => {
    const header = document.querySelector('#container');
    const markup = `
      <div class="${shared.ID}__overlay">
        <div class="${shared.ID}__main">
          <div class="${shared.ID}__main__close">x</div>
          <div class="${shared.ID}__main__title">
            How would you like to shop today?
          </div>
          <div class="${shared.ID}__main__option-wrap">
            <div class="${shared.ID}__main__option-wrap__option">
              <img class="${shared.ID}__main__option-wrap__option__img" src="https://service.maxymiser.net/cm/images-eu/avon-mas/3278B9C376BB91387FE842C90FCEBFF06D4A5D2E20446F3164A7CA235779EAA2.png?meta=/AG067---Brochure-Scrollshop-choice/avon-brochure.png" />

              <p class="${shared.ID}__main__option-wrap__option__text">
                I want to flick through a digital version of the brochure
              </p>

              <img class="${shared.ID}__main__option-wrap__option__icon" src="https://service.maxymiser.net/cm/images-eu/avon-mas/6B71CC4FED712BEAEF13DEF39C23B0A295D7A4D73558BE5483AC1055A28CF339.png?meta=/AG067---Brochure-Scrollshop-choice/avon-pages.png" />

            </div>
            <div class="${shared.ID}__main__option-wrap__option">
              <img class="${shared.ID}__main__option-wrap__option__img" src="https://service.maxymiser.net/cm/images-eu/avon-mas/C6F98CD15875A8CB8A46A688F92638EB47313BED13E2CC372357B37B4F1B2C0C.png?meta=/AG067---Brochure-Scrollshop-choice/avon-phone.png" />

              <p class="${shared.ID}__main__option-wrap__option__text">
                I want to see the brochure products in a scrollable list
              </p>

              <img class="${shared.ID}__main__option-wrap__option__icon" src="https://service.maxymiser.net/cm/images-eu/avon-mas/0256B225E35EE09543913D7A76F70D31C3E5507F59AD1AC6CB129697D5BB7144.png?meta=/AG067---Brochure-Scrollshop-choice/avon-scrollshop.png" />

            </div>
          </div>
        </div>
      </div>
    `;
    header.insertAdjacentHTML('afterend', markup);
    sessionStorage.setItem(`${shared.ID}`, 'seen-modal');

    // Add logic to buttons
    const overlay = document.querySelector(`.${shared.ID}__overlay`);
    const buttons = document.querySelectorAll(`.${shared.ID}__main__option-wrap__option`);
    buttons[0].addEventListener('click', () => {
      const pagesBtn = document.querySelector('[data-item-id="diaporamaBtn"]');
      pagesBtn.dispatchEvent(new Event('mousedown'));
      pagesBtn.dispatchEvent(new Event('mouseup'));
      events.send(`${shared.ID}`, 'clicked-pages');
      overlay.style.display="none";
    })
    buttons[1].addEventListener('click', () => {
      const pagesBtn = document.querySelector('[data-item-id="menuBtn"]');
      pagesBtn.dispatchEvent(new Event('mousedown'));
      pagesBtn.dispatchEvent(new Event('mouseup'));
      events.send(`${shared.ID}`, 'clicked-scrollshop');
      overlay.style.display="none";
    })

    
    if (overlay) {
      overlay.addEventListener('click', () => {
        overlay.style.display="none";
        events.send(`${shared.ID}`, 'closed-overlay');
      })
    }
  })
}

export default () => {
  setup();
  const { rootScope, ID } = shared;

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    if(!sessionStorage.getItem(`${shared.ID}`)) {
      runChanges();
    }
  };

  // Make device specific changes when layout changes

  init();
};
