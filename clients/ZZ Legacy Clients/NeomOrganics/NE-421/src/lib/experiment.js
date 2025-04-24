/**
 * NE-421 - Christmas: PLP Ad Blocks
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { checkScrollUntilElIntoView } from './helpers';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  if (!document.querySelector(`body.${ID}-fire-event-sent`)) {
    console.log('>>>SEND EVENT');
    fireEvent('Conditions Met');
    document.querySelector(`body`).classList.add(`${ID}-fire-event-sent`);
  }
  

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
  
  // const pod = document.querySelector(`.${ID}-pod`);
  // const gift = document.querySelector(`.${ID}-gift`);

  // if(first) {
  //   checkIntersection(first).then(() => {
  //     // events.send(`${ID} V-Day PLP Ad Blocks`, 'View Wellbeing Pod', `V-${shared.VARIATION}`);
  //   });
  // }

  // if(second) {
  //   checkIntersection(second).then(() => {
  //     // events.send(`${ID} V-Day PLP Ad Blocks`, 'View Gift Finder', `V-${shared.VARIATION}`);
  //   });
  // }

  // -----------------------
  // Variant specific code
  // -----------------------
  // -----------------------
  // Create target container divs
  // -----------------------
  const cols = document.querySelectorAll('#MainContent .columns.is-multiline.is-mobile.has-padding-top-tiny .column');
  if(cols.length) {
    const winCutoff = 769;
    let colPosPod = null;
    // let colPosGift = null;

    // Indices for Target Elements
    if (window.innerWidth > 1087) {
      colPosPod = window.innerWidth < winCutoff ? 2 : 4;
      // colPosGift = window.innerWidth < winCutoff ? cols.length - 1 : cols.length - 9;
    } else if (window.innerWidth <= 1087 && window.innerWidth > 768)  {
      colPosPod = window.innerWidth < winCutoff ? 2 : 3;
      // colPosGift = window.innerWidth < winCutoff ? cols.length - 1 : cols.length - 7;
    } else {
      colPosPod = window.innerWidth < winCutoff ? 4 : 6;
      // colPosGift = window.innerWidth < winCutoff ? cols.length - 5 : cols.length - 7;
    }
    

    [].forEach.call(cols, (col, idx) => {
      if(idx == colPosPod - 1) {
        col.insertAdjacentHTML('afterend', `
          <div class="${ID}-first"></div>
        `);
      } 
      // else if(colPosGift == idx) {
      //   col.insertAdjacentHTML('afterend', `
      //     <div class="${ID}-second"></div>
      //   `);
      // }
    });
  }

  const christmasRange = `<a data-banner="Christmas Range" class="banner__inner christmas_range" href="https://www.neomorganics.com/collections/gift-a-moment-of-wellbeing" style="background: #FFF url('https://ucds.ams3.digitaloceanspaces.com/NE-422/Hero%20Xmas%20Candles%20Portrait%202%20%282%29.png');">
    <h3><span>Gift a moment of</span> <strong>Wellbeing</strong> <span>this christmas</span> </h3>
    <button href="https://www.neomorganics.com/collections/gift-a-moment-of-wellbeing">Shop christmas gifts</button>
  </a>`;
  const christmasBestsellers = `<a data-banner="Christmas Best Sellers" class="banner__inner christmas_bestsellers" href="https://www.neomorganics.com/pages/wellbeing-pod-luxe" style="background: #FFF url('https://ucds.ams3.digitaloceanspaces.com/NE-422/Pod%20Luxe.gif');">
    <h3><span>New Wellbeing</span> <div style="display: flex;justify-content: center;align-items: baseline;"><span>Pod</span> <strong>Luxe</strong></div> <span class="small">Larger and More Luxurious</span> </h3>
    <button href="https://www.neomorganics.com/pages/wellbeing-pod-luxe">Shop Pod Luxe</button>
  </a>`;

  let bannerOne = '';
  // let bannerTwo = '';
  if (VARIATION == '1') {
    bannerOne = christmasRange;
    // bannerTwo = christmasBestsellers;
  } else if (VARIATION == '2') {
    bannerOne = christmasBestsellers;
    // bannerTwo = christmasRange;
  }

  const first = document.querySelector(`.${ID}-first`);
  // const second = document.querySelector(`.${ID}-second`);
  
  const allProducts = document.querySelectorAll('section.section .container .column.is-3-desktop.is-4-tablet.is-6-mobile');
  if(shared.VARIATION != 'control') {
    if(first) {
      first.insertAdjacentHTML('afterbegin', bannerOne);

      // second.insertAdjacentHTML('afterbegin', bannerTwo);

      // Events
      checkScrollUntilElIntoView(first, 'First banner');
      // checkScrollUntilElIntoView(second, 'Second banner');

      first.addEventListener('click', e => {
        fireEvent(`Click - First banner - ${first.querySelector('a').getAttribute('data-banner')}`);
      });
      // second.addEventListener('click', e => {
      //   fireEvent(`Click - Second banner - ${second.querySelector('a').getAttribute('data-banner')}`);
      // });
    }
  }

};
