/**
 * NH063 - More dates iteration (NH023)
 * @author User Conversion
 */
import { setup, generateLightbox, variation1, variation2 } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { eventFire } from './../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

const activate = () => {
  setup();

  // Experiment code
  // Remove session storage item
  if (sessionStorage.getItem(`NH063-data`) !== null) {
    sessionStorage.removeItem(`NH063-data`);
  }
  if (VARIATION === '1') {
    // Add New Lightbox
    const mainContainer = document.querySelector('.main-content');
    const newLightbox = `<div class="NH063-lightbox__wrapper hidden">
      <div class="NH063-lightbox__container-top">
        <div class="NH063-lightbox__title">Choose another date</div>
        <div class="NH063-lightbox__close"></div>
      </div>
      <div class="NH063-lightbox__container">
        <ul></ul>
      </div>
    </div>`;

    mainContainer.insertAdjacentHTML('afterbegin', newLightbox);
  }

  // Results
  const results = document.querySelectorAll('.result-item');
  [].forEach.call(results, (item) => {
    const btn = item.querySelector('button.tour-list-btn');
    if (btn) {
      btn.innerText = 'Click for more dates';
      btn.addEventListener('click', () => {
        observer.connect([item.querySelector('select.tour-list')], () => {
          if (VARIATION === '1') {
            variation1(item, btn);
          } else {
            variation2(item, btn);
          }
          
        }, {
          throttle: 200,
          config: {
            attributes: true,
            childList: false,
            // subtree: true,
          },
        });
      });
    }    
  });
};

export default activate;
