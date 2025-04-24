/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const addEventTracking = () => {

  console.log("event tracking on both");

  // Event Tracking on Nursery Furniture Collection Page

  if(window.location.href.indexOf('nursery-furniture-collection') > -1) {

    pollerLite(['.shogun-image-link', '.page-container .classic-link'], () => {

      let allTopLinks = document.querySelectorAll('.page-container .classic-link');

      [].slice.call(allTopLinks).forEach((link) => {

        link.addEventListener('click', (e) => {

          let rangeName = e.currentTarget.innerText;

          let linkClickEventMessage = "Click - user clicked links at the top of the nursery furniture collection page - link clicked: "+rangeName;
          logMessage(linkClickEventMessage);
          fireEvent(linkClickEventMessage, true);

        });

      })

      let allInPageImageLinks = document.querySelectorAll('.shogun-image-link');

      [].slice.call(allInPageImageLinks).forEach((link) => {

        link.addEventListener('click', (e) => {

          let rangeURL = e.currentTarget.href;

          let linkClickEventMessage = "Click - user clicked image link on nursery furniture collection page - link clicked: "+rangeURL;
          logMessage(linkClickEventMessage);
          fireEvent(linkClickEventMessage, true);

        });

      })

      let allInPageButtonLinks = document.querySelectorAll('.csc_width.btn.btn--secondary');

      [].slice.call(allInPageButtonLinks).forEach((link) => {

        link.addEventListener('click', (e) => {

          let rangeURL = e.currentTarget.href;

          let linkClickEventMessage = "Click - user clicked button link on nursery furniture collection page - link clicked: "+rangeURL;
          logMessage(linkClickEventMessage);
          fireEvent(linkClickEventMessage, true);

        });

      })

    });

  }

  // Event tracking on nav

  if(VARIATION == "control") {

    pollerLite(['button[data-target="furniture-collections-3-3"]'], () => {

      let furnitureCollectionButton = document.querySelector('button[data-target="furniture-collections-3-3"]');


      furnitureCollectionButton.addEventListener('click', (e) => {

        let linkClickEventMessage = "Click - user clicked furniture collection button to show child links";
        logMessage(linkClickEventMessage);
        fireEvent(linkClickEventMessage, true);


      }, false);


      let furnitureCollectionChildLinkUl = furnitureCollectionButton.nextElementSibling;

      let allFCChildLinks = furnitureCollectionChildLinkUl.querySelectorAll('.btn-short-level-3');

      [].slice.call(allFCChildLinks).forEach((link) => {
        link.addEventListener('click', (e) => {

          let childLinkHref = e.currentTarget.querySelector('a').href;

          let childLinkClickEventMessage = "Click - user clicked furniture collection child link to go to: "+childLinkHref;
          logMessage(childLinkClickEventMessage);
          fireEvent(childLinkClickEventMessage, true);

        })
      });


    });


  }





}

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  addEventTracking();

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  pollerLite(['button[data-target="furniture-collections-3-3"]'], () => {

    let furnitureCollectionButton = document.querySelector('button[data-target="furniture-collections-3-3"]');
    

    let newButtonHTML = `
      
      <button type="button" id="${ID}-furniture-collection-button" class="${ID}-furniture-collection-button btn--link js-toggle-submenu mobile-nav__link mobile-nav__sublist-link border-bottom contextual-return-level-2" data-target="furniture-collections-3-3" data-level="2" aria-expanded="false">
        <span class="mobile-nav__label">Furniture Collections</span>
        <div class="mobile-nav__icon">
        <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-chevron-right icon--full-color" width="8.121px" height="13.414px" viewBox="0 0 8.121 13.414">
        <g transform="translate(0.707 0.707)">
        <path class="st0" d="M0,12l6-6L0,0" fill="none" stroke="#323232" stroke-width="2"></path>
        </g>
        </svg>
        </div>
      </button>
    
    
    `;

    furnitureCollectionButton.insertAdjacentHTML('afterend', newButtonHTML);

    furnitureCollectionButton.remove();

    let newFurnitureCollectionButton = document.getElementById(`${ID}-furniture-collection-button`);

    let variationShownMessage = "Visible - link has been amended in the nav";
    logMessage(variationShownMessage);
    fireEvent(variationShownMessage, true);

    newFurnitureCollectionButton.addEventListener('click', (e) => {

      e.preventDefault();
      e.stopPropagation();

      window.location.href = "/pages/nursery-furniture-collection";

      let linkClickEventMessage = "Click - user clicked updated furniture collection button to go to /pages/nursery-furniture-collection";
      logMessage(linkClickEventMessage);
      fireEvent(linkClickEventMessage, true);


    }, false);



  })

  
};
