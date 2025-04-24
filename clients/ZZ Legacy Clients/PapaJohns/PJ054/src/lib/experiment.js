/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import PJ023 from './components/PJ023';
import AnimatedAdd from '././components/AnimatedAdd';
import { pollerLite } from '../../../../../lib/uc-lib';
import settings from './settings';
// import { cacheDom } from './../../../../../lib/cache-dom';

const activate = () => {
  function runTest() {
    setup();
    PJ023();

    pollerLite(['.PJ023_StoreDetails'], () => {
      const storeDetails = document.querySelector('.PJ023_StoreDetails .PJ023_StoreDetailsInner');
      const addIcon = document.createElement('div');
      addIcon.classList.add('PJ054-icon');
      storeDetails.insertBefore(addIcon, storeDetails.firstChild);

      if(storeDetails.innerText.trim().match(/collection/ig)) {
        addIcon.classList.add('PJ054-icon--collection');
      }
    });

    // animated add
    if (settings.VARIATION === '2') {
      AnimatedAdd();
    }
  }

  window.prm.add_pageLoaded(function (sender, error) {
    try {
      runTest();
    } catch (e) {
    } 
  });
  // Experiment code
};

export default activate;
