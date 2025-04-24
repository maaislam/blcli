/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);

  const addBoxes = () => {
    const boxMarkup = `
    <div class="${ID}-box-container">
      <h3>Reasons to shop with merchoid</h3>
      <div class="${ID}-boxes">
        <div class="${ID}-boxes-inner"></div>
      </div>
    </div>`;

    document.querySelector('.merchoid-product-reasons').insertAdjacentHTML('beforebegin', boxMarkup);

    
    window.uspData.forEach(element => {
      const box = document.createElement('div');
      box.className = `${ID}-box`;
      box.setAttribute('content-target', element.usp.attr);
      box.innerHTML = 
      `<div class="box-content">
        <div class="box-front">
          <div class="box-icon" style="background-image:url(${element.usp.icon})"></div>
          <h4>${element.usp.title}</h4>
          <p>${element.usp.text}</p>
          <div class="box-link">Learn more</div>
        </div>
        <div class="box-inner-content ${element.usp.attr}">
          <div class="box-close"></div>
          <div class="box-inner-title">
            <div class="box-icon" style="background-image:url(${element.usp.icon})"></div>
              <h4>${element.usp.title}</h4>
            </div>
            <p>${element.uspPopup.text}</p>
        </div>`


      document.querySelector(`.${ID}-boxes .${ID}-boxes-inner`).appendChild(box);
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

          document.querySelector(`.${ID}-overlay`).classList.remove('open');

        } else {

          if(document.querySelector(`.${ID}-box.open`)) {
           document.querySelector(`.${ID}-box.open`).classList.remove('open');
          }

          document.querySelector(`.${ID}-overlay`).classList.add('open');
          e.currentTarget.classList.add('open');
        }

      });
    }

    document.querySelector(`.${ID}-overlay`).addEventListener('click', (e) => {
      e.currentTarget.classList.remove('open');

      if(document.querySelector(`.${ID}-box.open`)) {
        document.querySelector(`.${ID}-box.open`).classList.remove('open');
        }
    });
    
  }

  addBoxes();
  boxEvents();
  
};
