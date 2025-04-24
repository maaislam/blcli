/**
 * BO057 - GP Linkage Brought Forward
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, gpEventListeners, medicineSearch, gpSearch } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import data from './data';

const { ID, VARIATION } = shared;

/**
 * Entry point for experiment
 */
const activate = () => {
  setup();

  // -------------------------------------
  // On pharm, manually build the search
  // -------------------------------------
  const run = () => {
    if(sessionStorage.getItem('recipientGPLinked') && sessionStorage.getItem('recipientGPLinked') != 'Not linked') {
      return;
    }

    if(window.location.pathname.match(/online\/pharmacy\/search/) !== null) {
      medicineSearch();
    } else if (window.location.pathname.match(/online\/pharmacy\/gpsearch/)) {
      gpSearch();
    }
  }

  let oldHref = document.location.href;
  const bodyList = document.querySelector("body");

  const observerUrl = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if(oldHref != document.location.href) {
        oldHref = document.location.href;

        // ----------------------------
        // Remove data on linkage button click (different journey)
        // ----------------------------
        const linkageBtn = document.querySelector('#transparentButtonOrderprescriptionusingLinkageKey');
        if(linkageBtn) {
          linkageBtn.addEventListener('click', () => {
            sessionStorage.removeItem(`${shared.ID}-user-data`);
          });
        }

        // ----------------------------
        // Pharm search / gp search behaviours
        // ----------------------------
        if(window.location.pathname.match(/online\/pharmacy\/search/) !== null) {
          run();
        } else if(window.location.pathname.match(/online\/pharmacy\/gpsearch/)) {
          run();
        }
      }
    });
  });

  const config = {
    childList: true,
    subtree: true
  };

  observerUrl.observe(bodyList, config);
  
  run();
};


export default activate;
