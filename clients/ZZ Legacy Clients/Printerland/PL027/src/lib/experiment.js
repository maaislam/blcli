/**
 * PL027 - PDP Running Cost Suggestions
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, generateLightbox } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();
  // Write experiment code here
  let widgetSize = '';
  // --- Hide Widget on Window size below 1366px
  if (window.innerWidth < 1366) {
    widgetSize = 'hide';
  }

  const mainContainer = document.querySelector('.content__wrapper.product_main__body');
  const stickyWidgetContainer = `<div class="${shared.ID}-widget__wrapper animate ${widgetSize}">
    <div class="${shared.ID}-widget__content">
      <span class="${shared.ID}-close__icon"></span>
      <div class="${shared.ID}-content">
        <p>Compare</br>similar printers</p>
        <span class="${shared.ID}-printer__icon"></span>
        <span class="${shared.ID}-btn__wrapper">
          <p class="${shared.ID}-btn">View printers</p>
        </span>
      </div>
    </div>
  </div>`;
  mainContainer.insertAdjacentHTML('beforebegin', stickyWidgetContainer);

  generateLightbox();

  
  const widgetEl = document.querySelector(`.${shared.ID}-widget__wrapper`);
  if (widgetEl && widgetEl.classList.contains('animate')) {
    function event() {
      if (widgetEl.classList.contains('animate')) {
        for (let i = 0; i < 10; i += 1) {
          widgetEl.animate([
            // keyframes
            { transform: 'translateX(0px)' }, 
            { transform: 'translateX(-20px)' },
            { transform: 'translateX(0px)' }, 
            { transform: 'translateX(-20px)' },
            { transform: 'translateX(0px)' }, 
            { transform: 'translateX(-20px)' },
            { transform: 'translateX(0px)' }, 
          ], { 
            // timing options
            duration: 2500,
          });
        }
      }
    };
    window.setInterval(event, 30000);
  }

  // --- Hide Widget on Window re-size below 1366px
  window.addEventListener('resize', (e) => {
    if (window.innerWidth < 1366) {
      widgetEl.classList.add('hide');
    }
  });

};

export default activate;
