/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events } from '../../../../../lib/utils';
 import { fetchMaleFemaleKids } from './fetchAffinity';

// Force set analytics reference
events.analyticsReference = '_gaUAT';

const startExperiment = () => {


  let elementToBeMoved = document.querySelector('.popularLinks');
  let destination = document.querySelector('.SD-HOME2.heroSection');

  let topCategories = document.querySelector('.SD-HOME1.topCategories');
  topCategories.classList.add(`${shared.ID}-initial-strip`);
  let newPlacement = document.querySelector('.SD-HOME4.featuredSection.newSeason');

  newPlacement.insertAdjacentElement('afterend', topCategories);
  destination.insertAdjacentElement('beforebegin', elementToBeMoved);
  fireEvent(`Interaction - sale page has had quicklinks moved from bottom to top`);

  // Call DY Affinity API
  let brandsPromise = fetchMaleFemaleKids();
  brandsPromise.then((value) => {
    if(value !== "none") {
      if(value == "male") {
        document.querySelector('.popularLinksTabBtn[href="#tab1"]').click();
      } else if(value == "female") {
        document.querySelector('.popularLinksTabBtn[href="#tab2"]').click();
      } else if(value == "kids") {
        document.querySelector('.popularLinksTabBtn[href="#tab3"]').click();
      }

      fireEvent(`Interaction - based on affinity data the ${value} tab title will be displayed`);
    }
    
  });

}

const addEvents = () => {

  let allPLHeaders = document.querySelectorAll('.popularLinksTabBtn');
  [].slice.call(allPLHeaders).forEach((header) => {
    header.addEventListener('click', (e) => {
      fireEvent(`Click - user clicked on the category button ${e.currentTarget.innerText} to change category`, true);
    });
  });

  let allPLButtons = document.querySelectorAll('.popularLinks .categorySlider a');
  [].slice.call(allPLButtons).forEach((button) => {
    button.addEventListener('click', (e) => {

      let qlCategoryId = e.currentTarget.closest('.popularLinksTab').id;
      let qlCategoryTitle = document.querySelector(`.popularLinks .popularLinksTabsWrapper .popularLinksTabBtn[href="${qlCategoryId}"]`).innerText;

      fireEvent(`Click - user clicked on the quicklink button: ${e.currentTarget.querySelector('.slideName').innerText} within category: ${qlCategoryTitle} to go to: ${e.currentTarget.href}`, true);
    });
  });



}

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  addEvents();

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  startExperiment();
};
