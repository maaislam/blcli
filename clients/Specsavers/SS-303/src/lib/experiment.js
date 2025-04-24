/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import { checkIntersection } from '../../../../../evelyn/scrolling';
import { elementIsInView } from '../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

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
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  let varText = '';
  let varTitle = '';
  switch(VARIATION) {
    case '1':
      varTitle = 'Is your prescription up to date?';
      varText = 'Your prescription needs to be less than 2 years old to be able to buy new frames';
      break;
    case '2':
      varTitle = 'Did you know?';
      varText = 'Your prescription needs to be less than 2 years old to be able to buy new frames';
      break;
    case '3':
      varTitle = 'Did you know?';
      varText = '6/10 people have the wrong prescription';
      break;
  }
  
  const markup = `
    <div class="${ID}-dc">
      <div class="${ID}-dc__inner">
        <h2 class="h-sm">${varTitle}</h2>
        <p>${varText}</p>

        <div class="${ID}-dc__buttons">
          <a href="/book/location" class="${ID}-book">Book an eye test</a>
        </div>
      </div>
    </div>
  `;

  const render = () => {
  
    const w = window.innerWidth;

    let posAfter = 0;
    if(480 < w && w < 992) {
      posAfter = 1;
    } else if(w >= 992) {
      posAfter = 2;
    }

    const items = document.querySelectorAll('.ss-plp-frames__container--frame');
    if(items && items[posAfter]) {
      items[posAfter].insertAdjacentHTML('afterend', markup);
    }
  
    // -----------------------------
    // Other Event Tracking
    // -----------------------------
    const book = document.querySelector(`.${ID}-book`);
    if(book) {
      book.addEventListener('click', e => {
        fireEvent('Clicked Book Button');
      });
    }

    const dc = document.querySelector(`.${ID}-dc`);
    if(dc) {
      if(elementIsInView(dc)) {
        fireEvent('In View', true);
      } else {
        checkIntersection(dc).then(e => {
          fireEvent('In View', true);
        });
      }
    }
  }

  render();

  window.addEventListener('orientationchange', () => {
    [].forEach.call(document.querySelectorAll(`.${ID}-dc`), d => {
      d.remove();
    });

    setTimeout(() => {
      render();
    }, 2000);
  });
};
