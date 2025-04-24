/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { boxData } from './boxdata';
import { initCarousel } from './helpers';

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

  if(VARIATION == '2' || VARIATION === '3') {
    document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);
  }

   const addBoxes = () => {
    const boxMarkup = `
    <div class="${ID}-box-container">
      <h3>Reasons to shop with merchoid</h3>
        <div class="${ID}-boxes">
          <div class="swiper-wrapper"></div>
          <div class="${ID}-swiperPrev swiper-button-prev"></div>
          <div class="${ID}-swiperNext swiper-button-next"></div>
        </div>
    </div>`;

    if(VARIATION === '3') {
      if(window.innerWidth >= 1024) {
        document.querySelector('.merchoid-product-reasons').insertAdjacentHTML('beforebegin', boxMarkup);
      } else {
        document.querySelector('.product-secondary-tabs-wrapper').insertAdjacentHTML('beforebegin', boxMarkup);
      }
    } else {
      document.querySelector('.merchoid-product-reasons').insertAdjacentHTML('beforebegin', boxMarkup);
    }

    
    boxData.forEach(element => {
    const box = document.createElement('div');
    box.className = `${ID}-box swiper-slide`;
    box.setAttribute('content-target', element.front.attr);
    box.innerHTML = 
    `<div class="box-content">
      <div class="box-front">
        <div class="box-icon" style="background-image:url(${VARIATION === '1' ? element.front.icon : element.front.icon2})"></div>
        <h4>${element.front.title}</h4>
        ${VARIATION !== '1' ? ` <p>${element.front.text}</p>` : ''}
        <div class="box-link">Learn more</div>
      </div>
      <div class="box-inner-content ${element.front.attr}">
        <div class="box-close"></div>
        <div class="box-inner-title">
          <div class="box-icon" style="background-image:url(${VARIATION === '1' ? element.front.icon : element.front.icon2})"></div>
            <h4>${element.front.title}</h4>
          </div>
        ${(VARIATION == '1') ? `<p>${element.front.text}</p>` : (VARIATION === '3') ? `<p>${element.content.v3Text}</p>` : `<p>${element.content.text}</p>` }
      </div>`


      document.querySelector(`.${ID}-boxes .swiper-wrapper`).appendChild(box);
    });
  }

  const boxEvents = () => {
    // // box events
    const allBoxes = document.querySelectorAll(`.${ID}-box`);
    for (let index = 0; index < allBoxes.length; index += 1) {
      const boxEl = allBoxes[index];
      boxEl.addEventListener('click', (e) => {
        
        if(e.currentTarget.classList.contains('open')) {
          e.currentTarget.classList.remove('open');

          if(VARIATION === '2') {
            document.querySelector(`.${ID}-overlay`).classList.remove('open');
          }
          if(VARIATION === '3' && window.innerWidth < 1024) {
            document.querySelector(`.${ID}-overlay`).classList.remove('open');
          }

        } else {

          if(document.querySelector(`.${ID}-box.open`)) {
           document.querySelector(`.${ID}-box.open`).classList.remove('open');
          }

          if(VARIATION === '2' || VARIATION === '3') {
            if(VARIATION === '2') {
              document.querySelector(`.${ID}-overlay`).classList.add('open');
            }
            if(VARIATION === '3' && window.innerWidth < 1024) {
              document.querySelector(`.${ID}-overlay`).classList.add('open');
            }
          }
          e.currentTarget.classList.add('open');
        }

      });
    }

    if(VARIATION === '2' || VARIATION === '3') {
      document.querySelector(`.${ID}-overlay`).addEventListener('click', (e) => {
        if(VARIATION === '3' && window.innerWidth >= 1024) {
          return;
        }
        e.currentTarget.classList.remove('open');

        if(document.querySelector(`.${ID}-box.open`)) {
          document.querySelector(`.${ID}-box.open`).classList.remove('open');
         }
      });
    }
  }

  addBoxes();
  if(VARIATION === '1' || VARIATION === '3') {
    initCarousel(document.querySelector(`.${ID}-boxes`));
  }
  boxEvents();
};
