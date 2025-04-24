/**
 * PL016 - Comparison Tool Makeover
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import settings from './settings';
import changeRecentlyViewedElements from './changeRecentlyViewedElements';
import changeCompareProductsElements from './changeCompareProductsElements';
import IdsToCompare from './IdsToCompare';

const activate = () => {
  setup();

  // Experiment code
  const productNameEl = document.querySelector('h1#pageTitle');
  let productName = null;
  if (productNameEl) {
    productName = productNameEl.innerText.trim();
  }
  const addToCompareBtn = document.querySelector('a#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_lnkCompare.btn.btn-outline-secondary');
  if (addToCompareBtn) {
    addToCompareBtn.addEventListener('click', (e) => {
      // GA Event
      events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Compare button`, { sendOnce: true });
    });
  }
  pollerLite(['#ctl00_ctl00_recentItems_pnlRecentItems'], () => {
    changeRecentlyViewedElements();

    observer.connect([document.querySelector('#ctl00_ctl00_pnlUpdatestaticWrapper')], () => {
      if (document.querySelector('#ctl00_ctl00_lnkRecentlyViewd.active')) {
        // GA Event
        events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - View button in recently view`, { sendOnce: true });
        changeRecentlyViewedElements();

        // Flash 'Compare' button when product is added/removed
        const pIds = document.querySelector('input#ctl00_ctl00_hdnCompareIds').value;
        if (pIds !== IdsToCompare.ids) {
          // Update IDs
          IdsToCompare.ids = pIds;
          const compareBtn = document.querySelector('a#ctl00_ctl00_lnkCompare');
          compareBtn.classList.add('flash');

          compareBtn.addEventListener('animationend', (e) => {
            e.currentTarget.classList.remove('flash');
          });
        }
      }
    }, {
      throttle: 200,
      config: {
        attributes: false,
        childList: true,
        nodeTree: true,
      },
    });
  });

  pollerLite(['#ctl00_ctl00_compareProducts_pnlProducts'], () => {
    changeCompareProductsElements(productName);
    observer.connect([document.querySelector('#ctl00_ctl00_pnlUpdatestaticWrapper')], () => {
      if (document.querySelector('#ctl00_ctl00_lnkCompare.active')) {
        // GA Event
        events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - View button in compare products`, { sendOnce: true });
        changeCompareProductsElements(productName);
      }
    }, {
      throttle: 200,
      config: {
        attributes: false,
        childList: true,
        nodeTree: true,
      },
    });
  });

  // Blue Bar Closed
  observer.connect([document.querySelector('body.PL016')], () => {
    const bodyElement = document.querySelector('body.PL016');

    if (!bodyElement.classList.contains('compare-table-open') ) {
      // Recently Viewed Button (closed)
      const recentlyViewedBtnClosed = document.querySelector('#ctl00_ctl00_lnkRecentlyViewd');
      if (recentlyViewedBtnClosed) {
        recentlyViewedBtnClosed.addEventListener('click', () => {
          // GA Event
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - The blue bar when closed on the recently viewed button`, { sendOnce: true }); 
        });
      }
      // Compare Button (closed)
      const compareBtnClosed = document.querySelector('#ctl00_ctl00_lnkCompare');
      if (compareBtnClosed) {
        compareBtnClosed.addEventListener('click', () => {
          // GA Event
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - The blue bar when closed on the compare products button`, { sendOnce: true }); 
        });
      }
    }
  }, {
    throttle: 200,
    config: {
      attributes: true,
      childList: false,
    },
  });
};

export default activate;
