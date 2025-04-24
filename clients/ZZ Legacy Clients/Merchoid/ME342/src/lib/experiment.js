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
  

  pollerLite(['.messages .message.message-success.success'], () => {
    const productName = document.querySelector('.messages .message.message-success.success').innerText.replace('You added','').replace('to your shopping cart.','').trim();

    const xmasBanner = document.createElement('div');
    xmasBanner.classList.add(`${ID}-added`);
    xmasBanner.innerHTML = `
    <div class="added-container">
      <p><span class="g-tick"></span>Your <span class="prodname">${productName}</span> has been added to your cart.</p>
      <p class="stand-out">Great choice! Get ready to stand out at the Christmas party!</p>
    </div>`;
    
    document.querySelector('#maincontent').insertAdjacentElement('afterbegin', xmasBanner);

    setTimeout(() => {
      xmasBanner.remove();
    }, 5000)
  });

  const changeSizesAndUSPs = () => {
    const allProducts = document.querySelectorAll(".cart.item");

    for (let index = 0; index < allProducts.length; index += 1) {
      const element = allProducts[index];
      const sizeSelected = element.querySelector(".item-options dd");
      const sizeTxt = sizeSelected.textContent.trim();
      const sizeMeasure = sizeTxt.match(/\(([^)]+)\)/)[1];
      const chosenSize = sizeTxt.match(/^[^\(]+/)[0];

      let jumperTerm;
      if(window.location.href.indexOf('/uk/') > -1) {
        jumperTerm = 'Jumper';
      } else {
        jumperTerm = 'Sweater';
      }

      let returns;
      if(window.location.href.indexOf('/uk/') > -1) {
        returns = 'Free Returns & Exchanges';
      } else {
        returns = 'Easy Returns and Exchanges';
      }

      if(sizeMeasure && chosenSize) {
        if(sizeTxt.indexOf('Chest') > -1) {
          sizeSelected.textContent = `Unisex - Male (${sizeMeasure}) Selected - ${chosenSize}`;
        } else {
          sizeSelected.textContent = `Unisex - Female (${sizeMeasure}) Selected - ${chosenSize}`;
        }
      }

      if(element.querySelector('.product-item-name').textContent.indexOf('Christmas Jumper') > -1 || element.querySelector('.product-item-name').textContent.indexOf('Christmas Sweater') > -1) {
        element.insertAdjacentHTML('beforeend', `<div class="${ID}-usps"></div>`);

        let usps;

        if(VARIATION === '1') {
          usps = [
            'Officially licensed product',
            '100% knitted to keep you warm this year!',
            'Guaranteed to be unique and charming'
          ];
        }

        if(VARIATION === '2') {
          usps = [
            '100% Money Back Guarantee',
            'Stand Out at your Christmas Party'
          ];
        }
        if(VARIATION === '3') {
          usps = [
            `100% Knitted Christmas ${jumperTerm}`,
            'Stand Out at your Christmas Party'
          ];
        }
        if(VARIATION === '4') {
          usps = [
            returns
          ];
        }
    
        for (let index = 0; index < usps.length; index += 1) {
          const uspEl = usps[index];
          const el = document.createElement('div');
          el.classList.add(`${ID}-usp`);
          el.innerHTML = `<span></span><p>${uspEl}</p>`;
    
          element.querySelector(`.${ID}-usps`).appendChild(el);
        }
      }

    }
  }
  changeSizesAndUSPs();
};
