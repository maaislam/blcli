/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
const { ID, VARIATION } = shared;

const moveCarousel = (carouselID) => {

  let rec1 = document.getElementById(carouselID);
  rec1.classList.add(`${ID}-moved-carousel`);
  rec1.classList.add(`${ID}-cloned-carousel`);
  let insertionPoint = document.getElementById('estore_pdp_image').closest('.row');
  insertionPoint.insertAdjacentElement('afterend', rec1);

  if(carouselID == 'item_page.rec1') {
    document.getElementById('item_page.rec2').classList.add(`${ID}-hidden`);
    document.getElementById('item_page.rec3').classList.add(`${ID}-hidden`);
  } else if(carouselID == 'item_page.rec2') {
    document.getElementById('item_page.rec1').classList.add(`${ID}-hidden`);
    document.getElementById('item_page.rec3').classList.add(`${ID}-hidden`);
  } else if(carouselID == 'item_page.rec3') {
    document.getElementById('item_page.rec1').classList.add(`${ID}-hidden`);
    document.getElementById('item_page.rec2').classList.add(`${ID}-hidden`);
  }

  let allHiddenCarousels = document.querySelectorAll(`.${ID}-hidden`);
  allHiddenCarousels.forEach((carousel) => {

    if(carousel.querySelector('.rrContainer > h3').innerText.toLowerCase().indexOf('sponsored') > -1) {
      carousel.classList.remove(`${ID}-hidden`);
      carousel.classList.add(`${ID}-sponsored`);
    }

  });

  fireEvent('Interaction - carousel moved', true);

}

const startExperiment = () => {


  if(VARIATION == 1) {
    pollerLite([
      () => document.getElementById('item_page.rec1'),
    ], () => {
      moveCarousel('item_page.rec1');
    })

  } else if(VARIATION == 2) {

    pollerLite([
      () => document.getElementById('item_page.rec2'),
    ], () => {
      moveCarousel('item_page.rec2');
    })

  } else if(VARIATION == 3) {

    pollerLite([
      () => document.getElementById('item_page.rec3'),
    ], () => {
      moveCarousel('item_page.rec3');
    })

  } else if(VARIATION == 4) {


    pollerLite([
      () => document.getElementById('item_page.rec1'),
      () => document.getElementById('item_page.rec2'),
      () => document.getElementById('item_page.rec3'),
    ], () => {

      let carouselOne = document.getElementById('item_page.rec1');
      let carouselTwo = document.getElementById('item_page.rec2');
      let carouselThree = document.getElementById('item_page.rec3');

      

      if (carouselOne.querySelector('.rrContainer > h3').innerText.toLowerCase().indexOf('sponsored') > -1
        || carouselTwo.querySelector('.rrContainer > h3').innerText.toLowerCase().indexOf('sponsored') > -1
        || carouselThree.querySelector('.rrContainer > h3').innerText.toLowerCase().indexOf('sponsored') > -1) {


        let carouselOneClone = carouselOne.cloneNode(true);
        let carouselTwoClone = carouselTwo.cloneNode(true);
        let carouselThreeClone = carouselThree.cloneNode(true);
        let insertionPoint = document.getElementById('estore_pdp_image').closest('.row');
        let showCarouselHTML = `
          <button class="${ID}-show-carousel" id="${ID}-show-carousel">
            View all recommended products <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        `;

        if(carouselOne.querySelector('.rrContainer > h3').innerText.toLowerCase().indexOf('sponsored') > -1) {

          carouselOneClone.classList.add(`${ID}-moved-carousel`);
          carouselOneClone.classList.add(`${ID}-cloned-carousel`);

          carouselTwoClone.classList.add(`${ID}-cloned-carousel`);
          carouselTwoClone.classList.add(`${ID}-initially-hidden`);

          carouselThreeClone.classList.add(`${ID}-cloned-carousel`);
          carouselThreeClone.classList.add(`${ID}-initially-hidden`);

          insertionPoint.insertAdjacentElement('afterend', carouselThreeClone);
          insertionPoint.insertAdjacentElement('afterend', carouselTwoClone);
          insertionPoint.insertAdjacentElement('afterend', carouselOneClone);

          carouselOneClone.insertAdjacentHTML('afterend', showCarouselHTML);


        } else if(carouselTwo.querySelector('.rrContainer > h3').innerText.toLowerCase().indexOf('sponsored') > -1) {

          carouselOneClone.classList.add(`${ID}-cloned-carousel`);
          carouselOneClone.classList.add(`${ID}-initially-hidden`);

          carouselTwoClone.classList.add(`${ID}-moved-carousel`);
          carouselTwoClone.classList.add(`${ID}-cloned-carousel`);

          carouselThreeClone.classList.add(`${ID}-cloned-carousel`);
          carouselThreeClone.classList.add(`${ID}-initially-hidden`);

          insertionPoint.insertAdjacentElement('afterend', carouselThreeClone);
          insertionPoint.insertAdjacentElement('afterend', carouselOneClone);
          insertionPoint.insertAdjacentElement('afterend', carouselTwoClone);

          carouselTwoClone.insertAdjacentHTML('afterend', showCarouselHTML);

        } else if (carouselThree.querySelector('.rrContainer > h3').innerText.toLowerCase().indexOf('sponsored') > -1) {

          carouselOneClone.classList.add(`${ID}-cloned-carousel`);
          carouselOneClone.classList.add(`${ID}-initially-hidden`);

          carouselTwoClone.classList.add(`${ID}-cloned-carousel`);
          carouselTwoClone.classList.add(`${ID}-initially-hidden`);

          carouselThreeClone.classList.add(`${ID}-moved-carousel`);
          carouselThreeClone.classList.add(`${ID}-cloned-carousel`);

          insertionPoint.insertAdjacentElement('afterend', carouselOneClone);
          insertionPoint.insertAdjacentElement('afterend', carouselTwoClone);
          insertionPoint.insertAdjacentElement('afterend', carouselThreeClone);

          carouselThreeClone.insertAdjacentHTML('afterend', showCarouselHTML);

        }       

        fireEvent('Interaction - carousels copied, sponsored promoted to the top, show all button added', true);

      } else {

        let carouselOneClone = carouselOne.cloneNode(true);
        carouselOneClone.classList.add(`${ID}-moved-carousel`);
        carouselOneClone.classList.add(`${ID}-cloned-carousel`);
        let carouselTwoClone = carouselTwo.cloneNode(true);
        carouselTwoClone.classList.add(`${ID}-cloned-carousel`);
        carouselTwoClone.classList.add(`${ID}-initially-hidden`);
        let carouselThreeClone = carouselThree.cloneNode(true);
        carouselThreeClone.classList.add(`${ID}-cloned-carousel`);
        carouselThreeClone.classList.add(`${ID}-initially-hidden`);

        let insertionPoint = document.getElementById('estore_pdp_image').closest('.row');

        insertionPoint.insertAdjacentElement('afterend', carouselThreeClone);
        insertionPoint.insertAdjacentElement('afterend', carouselTwoClone);
        insertionPoint.insertAdjacentElement('afterend', carouselOneClone);

        let showCarouselHTML = `
          <button class="${ID}-show-carousel" id="${ID}-show-carousel">
            View all recommended products <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        `;

        carouselOneClone.insertAdjacentHTML('afterend', showCarouselHTML);

        fireEvent('Interaction - carousels copied, show all button added', true);

      }

      
      carouselOne.classList.add(`${ID}-hidden`);
      carouselTwo.classList.add(`${ID}-hidden`);
      carouselThree.classList.add(`${ID}-hidden`);

      // section to show hidden carousels

      

      

      document.getElementById(`${ID}-show-carousel`).addEventListener('click', () => {

        let clonedCarousels = document.getElementsByClassName(`${ID}-cloned-carousel`);
        for (let i = 0; i < clonedCarousels.length; i++) {
          clonedCarousels[i].classList.remove(`${ID}-initially-hidden`);
        }

        document.getElementById(`${ID}-show-carousel`).remove();

        fireEvent('Click - show all button clicked to display extra carousels', true);

      });


    })


  } else if (VARIATION == 5) {

    pollerLite([
      () => document.getElementById('item_page.rec1'),
      () => document.getElementById('item_page.rec2'),
      () => document.getElementById('item_page.rec3'),
    ], () => {

      let carouselOne = document.getElementById('item_page.rec1');
      let carouselTwo = document.getElementById('item_page.rec2');
      let carouselThree = document.getElementById('item_page.rec3');



      if (carouselOne.querySelector('.rrContainer > h3').innerText.toLowerCase().indexOf('sponsored') > -1
        || carouselTwo.querySelector('.rrContainer > h3').innerText.toLowerCase().indexOf('sponsored') > -1
        || carouselThree.querySelector('.rrContainer > h3').innerText.toLowerCase().indexOf('sponsored') > -1) {



        carouselOne.classList.add(`${ID}-initially-hidden`);
        carouselTwo.classList.add(`${ID}-initially-hidden`);

        let showCarouselHTML = `
          <button class="${ID}-show-carousel" id="${ID}-show-carousel">
            View all recommended products <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        `;

        carouselThree.insertAdjacentHTML('afterend', showCarouselHTML);

        fireEvent('Interaction - carousels left in place, sponsored promoted to the top, show all button added', true);

      } else {

        carouselTwo.classList.add(`${ID}-initially-hidden`);
        carouselThree.classList.add(`${ID}-initially-hidden`);

        let showCarouselHTML = `
          <button class="${ID}-show-carousel" id="${ID}-show-carousel">
            View all recommended products <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        `;

        carouselOne.insertAdjacentHTML('afterend', showCarouselHTML);

        fireEvent('Interaction - carousels left in place, show all button added', true);

      }

      document.getElementById(`${ID}-show-carousel`).addEventListener('click', () => {

        let clonedCarousels = document.querySelectorAll(`.${ID}-initially-hidden`);
        for (let i = 0; i < clonedCarousels.length; i++) {
          clonedCarousels[i].classList.remove(`${ID}-initially-hidden`);
        }

        document.getElementById(`${ID}-show-carousel`).remove();

        fireEvent('Click - show all button clicked to display extra carousels', true);

      });

    });

  }

}

const addTracking = () => {

  document.body.addEventListener('click', (e) => {

    if (e.target.closest('.rrItemContainer')) {

      let closestA = e.target.closest('.rrItemContainer').querySelector('a');
      let closestAHref = closestA.getAttribute('href');
      let closestATitle = closestA.getAttribute('title');
      let carouselTitle = e.target.closest('.rrContainer').querySelector('h3').innerText;
      let isSponsoredCarousel = e.target.closest('.rrContainer').classList.contains(`${ID}-sponsored`) ? true : false;
      let isDuplicatedCarousel = e.target.closest('.rrPlacements').classList.contains(`${ID}-cloned-carousel`) ? true : false;

      fireEvent(`Click - item clicked to go to href: [${closestAHref}] with title: [${closestATitle}] from carousel: [${carouselTitle}] which ${isDuplicatedCarousel == true ? `is a cloned carousel` : `is not a cloned carousel`} and ${isSponsoredCarousel == true ? `is a sponsored carousel` : `is not a sponsored carousel`}`, true);

    }

  });


}

export default () => {

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  addTracking();

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
