/**
 * NH067 - Search Wizard POC
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';
import { getUrlParameter } from '../../../../../lib/utils';
import NH067_content from './NH067_content';
import toggleSteps from './toggleSteps';
import buildNewTabs from './buildNewTabs';
import stepOneTab from './stepOneTab';
import stepTwoTab from './stepTwoTab';
import stepThreeTab from './stepThreeTab';
import queryData from './queryData';

const activate = () => {
  let url = window.location.href;

  if (window.location.pathname === '/' && document.querySelector('#ctl00_RightPane .holiday-search.smaller')) {
    setup();
    /**
     * /////////////// Returning User ////////////////////
     */
    if (localStorage.getItem("NH067-returningUser") !== null && sessionStorage.getItem("NH067-returningUser") === null) {
      buildNewTabs(true);
    } else {
      /**
       * ///////////// First Visit on page //////////////
       */
      buildNewTabs(false);
      
      localStorage.setItem("NH067-returningUser", true);
      sessionStorage.setItem("NH067-returningUser", true);
    }
    // Toggle Steps
    toggleSteps();
    // ---------------- Step 1 ----------------
    stepOneTab();
    // ---------------- Step 2 ----------------
    stepTwoTab();
    // ---------------- Step 3 ----------------
    stepThreeTab();
  /**
   * User in Results Page
   */
  } else if (url.indexOf('search-results?') > -1 && localStorage.getItem('NH067-search') !== null) {
    setup();
    // Add Loader Content
    const mainContainer = document.querySelector('.page-wrapper');
    mainContainer.classList.add('NH067-blur');
    mainContainer.insertAdjacentHTML('beforebegin', `<div class='NH067-loader__wrapper popup-wrap'><div class="searching"><p>Searching for holidays...</p><img src="/images/loader-01.gif"></div></div>`);
    
    const minDate = getUrlParameter('min', url);
    const maxDate = getUrlParameter('max', url);
    const newQueryData = JSON.parse(localStorage.getItem('NH067-search'));

    if (newQueryData.minDate !== '' && newQueryData.maxDate !== '') {
      const newMinDate = newQueryData.minDate;
      const newMaxDate = newQueryData.maxDate;
      url = url.replace(minDate, newMinDate);
      url = url.replace(maxDate, newMaxDate);
      url = url + newQueryData.category;
    } else {
      url = url + newQueryData.category;
    }
    
    setTimeout(function(){ 
      localStorage.removeItem('NH067-search');
      window.location.href = url;
    }, 2000);
  }
  
};

export default activate;
