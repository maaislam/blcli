/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    //var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    var isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}


  const fixedButton = () => {

    const productPrice = document.querySelector('.product-price .price-sales');
    const productName = document.querySelector('#page_heading h1');
    const productDesc = document.querySelector('#page_heading h3');

    const stickyCTA = document.createElement('div');
    stickyCTA.classList.add(`${ID}-stickyCTA`);
    stickyCTA.innerHTML = `
    <div class="${ID}-container">
      <div class="${ID}-details">
        <div class="${ID}-name">
          <h3 class="${ID}-productName">${productName.textContent.trim()}</h3>
          <p>${productDesc.textContent.trim()}</p>
        </div>
        <span class="${ID}-productprice">${productPrice.textContent.trim()}</span>
      </div>
      <div class="${ID}-button">Add to bag</div>
    </div>`;

    document.body.appendChild(stickyCTA);

    if(VARIATION === '1' || VARIATION === '3') {

      window.addEventListener("scroll", function() {
        const elementTarget = document.querySelector('.product-add-to-cart #add-to-cart');
        const mainPage = document.querySelector('#main');
        const pdpForm = document.querySelector('.product-add-to-cart');
        
        if(window.innerWidth >= 767) {
        
          if (isScrolledIntoView(pdpForm)){
            stickyCTA.classList.remove(`${ID}-fixed`);
            document.body.classList.remove(`${ID}-stickyShow`);
          }
           else if (isScrolledIntoView(mainPage) && isScrolledIntoView(elementTarget)){
            stickyCTA.classList.remove(`${ID}-fixed`);
            document.body.classList.remove(`${ID}-stickyShow`);
          } else if (isScrolledIntoView(mainPage) && !isScrolledIntoView(elementTarget)){
            stickyCTA.classList.add(`${ID}-fixed`);
            //stickyCTA.classList.remove(`${ID}-hidden`);
            document.body.classList.add(`${ID}-stickyShow`);
          } 


        } else {
          if(!isScrolledIntoView(elementTarget)) {
            stickyCTA.classList.add(`${ID}-fixed`);
            stickyCTA.classList.remove(`${ID}-hidden`);
            document.body.classList.add(`${ID}-stickyShow`);
          } else {
            stickyCTA.classList.remove(`${ID}-fixed`);
            stickyCTA.classList.add(`${ID}-hidden`);
            document.body.classList.remove(`${ID}-stickyShow`);
          }
        }
      });
    }

    stickyCTA.addEventListener('click', () => {
      document.querySelector('.product-add-to-cart #add-to-cart').click();
    });


    // click event
    /*document.querySelector(`.${ID}-stickyCTA`).querySelector('a').addEventListener('click', () => {
      events.send(`CTA Clicks`, 'click', 'Sticky CTA Clicks');
    });*/
  }

  fixedButton();

};
