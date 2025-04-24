/**
 * PL024 - Price match & offers on product title select - V2
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, generateLightbox, plpPopulateLightbox, pdpPopulateLightbox, closeLightbox } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();
  const urlPathname = window.location.pathname;
  let pageType = '';
  if (urlPathname.indexOf('product') > -1) {
    pageType = 'pdp';
  } else if (urlPathname.indexOf('/printers') > -1
  || urlPathname.indexOf('/scanners') > -1
  || urlPathname.indexOf('/consumables') > -1) {
    pageType = 'plp';
  } else {
    pageType = 'home';
  }
  // --- Call generate lightbox function
  if (!document.querySelector(`.${shared.ID}-lightbox__wrapper`)) {
    generateLightbox();
  }
  
  const lightboxEl = document.querySelector(`.${shared.ID}-lightbox__wrapper`);

  if (pageType === 'plp' || pageType === 'home') {
    plpPopulateLightbox(pageType, lightboxEl);
  } else if (pageType === 'pdp') {
    pdpPopulateLightbox(pageType, lightboxEl);
  }
  

  // --- Show 14-day trial badge
  pollerLite([`.${shared.ID}-product__specialOffers li`], () => {
    const lightboxSpecialOffers = document.querySelectorAll(`.${shared.ID}-product__specialOffers li`);
    for (let i = 0; i < lightboxSpecialOffers.length; i += 1) {
      const offer = lightboxSpecialOffers[i];
      const offerText = offer.querySelector('span').innerText.trim().toLowerCase();
      if (offerText.indexOf('14 day trial') > -1) {
        if (document.querySelector(`.${shared.ID}-badge__wrapper`)) {
          document.querySelector(`.${shared.ID}-badge__wrapper`).classList.remove('hide');
        }

        break;
      }
    };
  });
  
  // --- Call close lightbox function
  closeLightbox(lightboxEl, pageType); 


  /**
   * @desc When content is reloaded, then re-run the experiment
   */
  pollerLite(['#ctl00_ctl00_pnlUpdatestaticWrapper'], () => {
    observer.connect(document.querySelector('#ctl00_ctl00_pnlUpdatestaticWrapper'), () => {
      activate();
    }, {
      throttle: 200,
      config: {
        attributes: false,
        childList: true,
        // subtree: true,
      },
    });
  });
};

export default activate;
