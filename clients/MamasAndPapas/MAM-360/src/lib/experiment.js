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
import debounce from 'lodash/debounce';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

let version = "uk";

const startExperiment = () => {

  pollerLite([() => { return document.readyState == "complete"; }], () => {
    let takeoverHTML = `
    
      <div class="grid__item ${ID}-takeover-element" id="${ID}-takeover-element">
        <a href="${version == "uk" ? 'https://www.mamasandpapas.com/pages/black-friday' : 'https://www.mamasandpapas.ie/pages/black-friday' }" class="${ID}-takeover-element--link" id="${ID}-takeover-element--link"> 
          <img src="https://cdn-eu.dynamicyield.com/api/9877216/images/140d799a75a26__content_slot_-_desktop_2x.jpeg" alt="black friday image" />
        </a>
      </div>
      
    `;

    let insertionPoint = document.querySelector('#bc-sf-filter-products .grid__item:nth-of-type(8)');
    insertionPoint.insertAdjacentHTML('afterend', takeoverHTML);
    let takeoverElement = document.getElementById(`${ID}-takeover-element`);
    let gridItemHeight = insertionPoint.offsetHeight;
    takeoverElement.style.height = gridItemHeight + "px";

    // 320 x 495

    window.addEventListener('resize', debounce(() => {
      gridItemHeight = insertionPoint.offsetHeight;
      takeoverElement.style.height = gridItemHeight + "px";
    }, 100));

    takeoverElement.addEventListener('click', (e) => {
      fireEvent('Click - user clicked on element to go to black friday sale');
    });


  })

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

  startExperiment();
  
};
