/**
 * PL017 - Returning User Homepage - Recently Viewed
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { setCookie, getCookie, deleteCookie } from '../../../../../lib/utils';
import settings from './settings';
import variation1 from './variation1';
import variation2 from './variation2';
import variation3 from './variation3';
import initiateSlick from './initiateSlick';
import brandsContent from './brands_data';
import getDataFromPDP from './getDataFromPDP';
import { getDimension, topReached, whenBottomWithinBounds } from './sticky';

const activate = () => {

  // Experiment code
  /**
   * @desc Check for Returning User
   */
  if (localStorage.getItem("PL017-returningUser") !== null && sessionStorage.getItem("PL017-returningUser") === null) {
    /**
     * ///////////// Returning user //////////////
     */
    // Homepage
    if (window.location.pathname === '/' && localStorage.getItem("recentlyViewedProducts")) {
      if (settings.VARIATION === '1') {
        setup();
        variation1();
      } else if ((settings.VARIATION === '2')) {
        setup();
        variation2();
      }
      else if ((settings.VARIATION === '3')) {
        variation3();
      }
      /**
       * @desc Make Search Box sticky on scroll
       */
      const elmToStick = document.querySelector('#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_pnlTopFilter .left');
      const elmTop = getDimension(elmToStick, 'top') + window.scrollY;
      const boundingDiv = document.querySelector('.filter-container.search');
      const lightboxContainer = document.querySelector('.filter-menu.filter-type.product_filter#pnlFilterType');
      const panelFilterProductType = document.querySelector('#pnlFilterProdType');
      const panelFilterBrands = document.querySelector('#pnlFilterBrands');
      const panelFeatures = document.querySelector('#pnlFeatures');

      window.addEventListener('scroll', (e) => {
        if(topReached(elmTop)) {
          elmToStick.classList.add(`${settings.ID}-sticky`);
          if (lightboxContainer) {
            lightboxContainer.classList.add(`PL017-stickyLightbox`);
            lightboxContainer.style.top = whenBottomWithinBounds(elmToStick, boundingDiv) + 'px';
          }
          if (panelFilterProductType) {
            panelFilterProductType.classList.add(`PL017-stickyLightbox`);
            panelFilterProductType.style.top = whenBottomWithinBounds(elmToStick, boundingDiv) + 'px';
          }
          if (panelFilterBrands) {
            panelFilterBrands.classList.add(`PL017-stickyLightbox`);
            panelFilterBrands.style.top = whenBottomWithinBounds(elmToStick, boundingDiv) + 'px';
          }
          if (panelFeatures) {
            panelFeatures.classList.add(`PL017-stickyLightbox`);
            panelFeatures.style.top = whenBottomWithinBounds(elmToStick, boundingDiv) + 'px';
          }
          elmToStick.style.top = whenBottomWithinBounds(elmToStick, boundingDiv) + 'px';
        } else {
          elmToStick.classList.remove(`${settings.ID}-sticky`);
          if (lightboxContainer) {
            lightboxContainer.classList.remove(`PL017-stickyLightbox`);
            lightboxContainer.style.top = '0';
          }
          if (panelFilterProductType) {
            panelFilterProductType.classList.remove(`PL017-stickyLightbox`);
            panelFilterProductType.style.top = '0';
          }
          if (panelFilterBrands) {
            panelFilterBrands.classList.remove(`PL017-stickyLightbox`);
            panelFilterBrands.style.top = '0';
          }
          if (panelFeatures) {
            panelFeatures.classList.remove(`PL017-stickyLightbox`);
            panelFeatures.style.top = '0';
          }
          elmToStick.style.top = '0';
        }
      });

    // Product Page
    } else if (window.location.href.indexOf('/product/') > -1) {
      setup();
      getDataFromPDP();
    }
  } else {
    /**
     * ///////////// First Visit on page //////////////
     */
    if (window.location.href.indexOf('/product/') > -1) {
      setup();
      getDataFromPDP();

      localStorage.setItem("PL017-returningUser", true);
      sessionStorage.setItem("PL017-returningUser", true);
    }
  }

  /**
   * @desc When content is reloaded, then re-run the experiment
   */
  pollerLite(['#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_updateFilter'], () => {
    observer.connect([document.querySelector('#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_updateFilter')], () => {
      activate();
    }, {
      throttle: 200,
      config: {
        attributes: true,
        childList: false,
        // subtree: true,
      },
    });
  });
};

export default activate;
