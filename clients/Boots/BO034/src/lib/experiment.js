/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID } = shared;

    let gridBlock1;

    if(window.location.href.indexOf('ordinary') > -1) {
      gridBlock1 = 
        `<li class="${ID}-ordinaryBlock ${ID}-block">
          <div class="${ID}-gridBlock estore_product_container">
          <h3>How to use skincare acids with The Ordinary</h3>
          
           
          <div class="${ID}-innerText">
            <div class="${ID}-logo"></div>
            <a href="https://www.boots.com/skincare-basics/how-to-use-skincare-acids" class="${ID}-button">Find out more</a>
          </div>
        </div>
        </li>`;
    }

    if(window.location.href.indexOf('mascara') > -1) {
      gridBlock1 = 
      `<li class="${ID}-mascaraBlock ${ID}-block ${ID}-gridBlock estore_product_container">
        <h3>How to find the right mascara for you</h3>
        <div class="${ID}-innerText">
          <p>Pepper perfection is only a read away</p>
          <a href="https://www.boots.com/eye-looks/types-of-mascara" class="${ID}-button">Read More</a>
        </div>
      </li>`;
    }


  const addMessage = () => {
    let products;
    if(window.location.href.indexOf('ordinary') > -1) {
      products = document.querySelectorAll('.product_listing_container .grid_mode li'); } 
    else {
      products = document.querySelectorAll('.product_listing_container .grid_mode .estore_product_container'); 
    }

    for (let index = 0; index < products.length; index += 1) {
      const element = products[index];

        if(index === 4) {
          element.insertAdjacentHTML('afterend', gridBlock1);
        }
        if(index === 15) {
          element.insertAdjacentHTML('afterend', gridBlock1);
          element.nextElementSibling.classList.add(`${ID}-bottom`);
        }
      }
  }

  addMessage();
};
