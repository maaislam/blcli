/**
 * PL018 - Returning user homepage - Recently viewed | Mobile
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import settings from './settings';
import variation1 from './variation1';
import variation2 from './variation2';
import variation3 from './variation3';
// import initiateSlick from './initiateSlick';
// import brandsContent from './brands_data';
import getDataFromPDP from './getDataFromPDP';

const activate = () => {
  // Experiment code
  /**
   * @desc Check for Returning User
   */
  if (localStorage.getItem("PL018-returningUser") !== null && sessionStorage.getItem("PL018-returningUser") === null) {
    /**
     * ///////////// Returning user //////////////
     */
    // Homepage
    if (window.location.pathname === '/' && localStorage.getItem("recentlyViewedProducts")) {
      if (settings.VARIATION === '1') {
        setup();
        variation1();
      } else if (settings.VARIATION === '2') {
        setup();
        variation2();
      } else if (settings.VARIATION === '3') {
        variation3();
      }

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

      localStorage.setItem("PL018-returningUser", true);
      sessionStorage.setItem("PL018-returningUser", true);
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
