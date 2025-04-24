/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import {
  cookieOpt,
  setup
} from './services';
import shared from './shared';

export default () => {
  const {
    ID,
    VARIATION
  } = shared;

  setup();
  cookieOpt();

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  /*  ----------------
    Experiment code 
    ------------------ */

  window.cmCreateManualLinkClickTag(`/BO106?cm_sp=MaxymiserEventBO106-_-BO106${VARIATION}-_-BO106Started`);
   
    // stop cross path domain error
    var bootsIframe = document.querySelector('*[id^="iFrameResizer"]')

    if (bootsIframe.src.indexOf("boots.com") > -1) {
      const iframe = document.querySelector('*[id^="iFrameResizer"]')
      var innerDoc = (iframe && iframe.contentDocument) ?
        iframe.contentDocument :
        iframe.contentWindow.document;

      setTimeout(() => {
        const ulObj = innerDoc.getElementById("hnresultscontainer");
        if (ulObj) {
          if (VARIATION === '1') {
            ulObj.querySelector('.for-mobile.filter-label').click();
          }

          // loop through main links
          const allResults = ulObj.querySelectorAll('.col-12.cards-wrapper-new');
          for (let index = 0; index < allResults.length; index += 1) {
            const result = allResults[index];
            result.querySelector('.btn.get-started-new').addEventListener('click', () => {
              window.cmCreateManualLinkClickTag(`/BO106?cm_sp=MaxymiserEventBO106-_-BO106${VARIATION}-_-BO106resultclick`);
            });
          }

          // loop through filters for click event
          const filters = ulObj.querySelectorAll(`.facets .facet.filter-back`);
          for (let index = 0; index < filters.length; index += 1) {
            const element = filters[index];
            element.addEventListener('click', () => {
              if (element.classList.contains('selected')) {
                // do nothing
              } else {
                window.cmCreateManualLinkClickTag(`/BO106?cm_sp=MaxymiserEventBO106-_-BO106${VARIATION}-_-BO106filterclick`);
                if (VARIATION === '1') {
                  const element = ulObj.querySelector('.facets');
                  element.scrollIntoView({
                    block: 'center',
                    behavior: 'smooth'
                  });
                }

              }
            });
          }
        }
      }, 2000);
    }

};
