/**
 * NE-548 - V-day PLP dead-end Gift Finder
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { checkIntersection } from '../../../../../evelyn/scrolling';
import { checkScrollUntilElIntoView } from './helpers';
// import data from './data';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

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
    /**
     * @desc Check if Pagination CTA is visible in viewport
     */
    pollerLite([`.collection-section .columns .column`], () => {
      const lastElement = document.querySelector(`.collection-section .columns`).lastElementChild;
      checkScrollUntilElIntoView(lastElement, '');
    });
    

    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...


  // -----------------------
  // Variant specific code
  // -----------------------
  // -----------------------
  // Create target container divs
  // -----------------------
  const cols = document.querySelectorAll('#MainContent .columns.is-multiline.is-mobile.has-padding-top-tiny .column');
  if(cols.length) {
    const winCutoff = 769;

    // Indices for Target Elements
    const colPosPod = window.innerWidth < winCutoff ? 12 : 24;
    const colPosGift = window.innerWidth < winCutoff ? cols.length - 1 : cols.length - 13;
    
    [].forEach.call(cols, (col, idx) => {
      
      if(idx == cols.length - 1) {
        col.insertAdjacentHTML('afterend', `
          <div class="${ID}-banner"></div>
        `);
      } 
      
    });
    
  }

  const banner = document.querySelector(`.${ID}-banner`);
  // const gift = document.querySelector(`.${ID}-gift`);
  
  const allProducts = document.querySelectorAll('section.section .container .column.is-3-desktop.is-4-tablet.is-6-mobile');
  if(shared.VARIATION != 'control') {
    if(banner) {
      banner.insertAdjacentHTML('afterbegin', `
        <a href="https://www.neomorganics.com/pages/find-a-feel-good-gift" class="${ID}-banner__inner">
          <h3><strong>Gift Finder</strong> <span>Unsure what to gift?</span> <span class="small">In just 4 questions we’ll help you find the <b style="font-weight: 500;">perfect gift</b> with true wellbeing purpose (it only takes 2 minutes)...</span></h3>
          <button href="https://www.neomorganics.com/pages/find-a-feel-good-gift">Start Now</button>
        </a>
      `);

      // Events
      // console.log(`>>>Call - PLP dead-end Gift Finder banner event -> Visible`);
      checkScrollUntilElIntoView(banner, 'PLP dead-end Gift Finder banner');

      banner.addEventListener('click', e => {
        fireEvent(`Click - PLP dead-end Gift Finder banner`);
      });

    }
  }

};
