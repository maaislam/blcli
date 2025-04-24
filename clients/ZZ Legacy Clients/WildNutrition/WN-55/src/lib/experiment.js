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

  if(VARIATION != 'control') {
    const existing = document.querySelectorAll('.clc-List_Item-promotion');
    [].forEach.call(existing, i => i.remove());
  }

  const markup = `
  <li class="clc-List_Item clc-List_Item-promotion js-LoadMore_Item ${ID}-dc" 
      data-type="promo"
  >
    <a class="${ID}-link clc-Promotion clc-Promotion-light" href="/pages/quiz-1">
      <div class="${ID}-dc__img" data-expand="-1"></div>

      <div class="clc-Promotion_Inner">
        <div class="clc-Promotion_Body clc-Promotion_Body-left clc-Promotion_Body-top">
          <div class="clc-Promotion_Content">
            <h2 class="clc-Promotion_Title">Wondering which supplements are right for you?</h2>
            <div class="clc-Promotion_Button btn-Primary btn-Primary-white">Take our 60-second Quiz</div>
          </div>
        </div>
      </div>
    </a>
  </li>
  `;
  
  const render = () => {
  
    const w = window.innerWidth;

    const card = document.querySelector('.clc-List_Item-infoCard');

    let posAfter = 2;
    if(!card) {
      posAfter = 1;
    }
    if(768 < w && w <= 900) {
      posAfter = 1;
    } else if(900 < w && w < 1200) {
      posAfter = 1;
    } else if(w >= 1200 && w < 1600) {
      posAfter = 3;
      if(!card) {
        posAfter = 2;
      }
    } else if(w >= 1600) {
      posAfter = 2;
      if(!card) {
        posAfter = 1;
      }
    }

    const items = document.querySelectorAll('.clc-List_Item');

    if(VARIATION != 'control') {
      if(items && items[posAfter]) {
        items[posAfter].insertAdjacentHTML('afterend', markup);
      } else {
        items[items.length - 1].insertAdjacentHTML('afterend', markup);
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
        
        dc.querySelector(`.${ID}-link`).addEventListener('click', e => {
          fireEvent('Clicked CTA');
        });
      }
    } else {
      // -------------------------
      // Control tracking scroll
      // -------------------------
      const dc = items[posAfter+1] || items[items.length - 1];

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

  if(VARIATION != 'control') {
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        [].forEach.call(document.querySelectorAll(`.${ID}-dc`), d => {
          d.remove();
        });

        render();
      }, 1000);
    });
  }
};
