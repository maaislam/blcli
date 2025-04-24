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


  /**
   * Message to be shown based on variation
   */
  const bottomContent = () => {
    let message;

    let deliveryText;

    if(window.location.pathname.indexOf('/uk/') > -1) {
      deliveryText = 'delivery';
    } else {
      deliveryText = 'shipping';
    } 

    if(shared.VARIATION === '1') {
      message = `Buy today and secure <span>free ${deliveryText}</span>`;
    }

    if(shared.VARIATION === '2' || shared.VARIATION === '3') {
      if(window.location.pathname.indexOf('/uk/') > -1) {
        message = `Buy today and secure <span>free ${deliveryText} </span><span class="${ID}-worthPrice">worth £5.99</span>`;
      } else if(window.location.pathname.indexOf('/eu/') > -1) {
        message = `Buy today and secure <span>free ${deliveryText} </span><span class="${ID}-worthPrice">worth €7,99</span>`;
      } else {
        message = `Buy today and secure <span>free ${deliveryText} </span><span class="${ID}-worthPrice">worth $7.99</span>`;
      }
    }

    if(shared.VARIATION === '4') {
      message = 
      `<div class="${ID}-priceMessages">
        <span>Buy today and secure <b>free ${deliveryText}</b></span>
        <span>Buy today risk free with <b>100 day hassle free returns</b></span>
      </div>`;
    }

    return message;
  }


  const createPriceBox = () => {

    const currentPrice = document.querySelector('.page-main .product-info-main .price-box.price-final_price [data-price-type=finalPrice]');
    const oldPrice = document.querySelector('.page-main .product-info-main .price-box.price-final_price [data-price-type=oldPrice]');

    // create new price box
    const priceBox = document.createElement('div');
    priceBox.classList.add(`${ID}-priceContainer`);
    priceBox.innerHTML = `
      <div class="${ID}-priceWrapper">
        <p>Only <b>${currentPrice.textContent}</b></p>
        ${oldPrice ? `<span>${oldPrice.textContent}</span>` : ''}
      </div>
      <div class="${ID}-contentBottom">${bottomContent()}</div>`;

    document.querySelector('.product-info-main .product-info-price').insertAdjacentElement('beforebegin', priceBox);

  
    // move official product to the price box
    if(shared.VARIATION === '3' || shared.VARIATION === '4') {
      const officalBox = document.querySelector('.official-licensed');
      if(officalBox) {
        priceBox.insertAdjacentElement('afterbegin', officalBox);
      }
    }
  }

  const animateText = () => {
    // get the element to animate
    const element = document.querySelector(`.${ID}-priceContainer`);
    const elementHeight = element.clientHeight;

    // listen for scroll event and call animate function
    document.addEventListener('scroll', animate);

    // check if element is in view
    function inView() {
      // get window height
      const windowHeight = window.innerHeight;
      // get number of pixels that the document is scrolled
      const scrollY = window.scrollY || window.pageYOffset;
      
      // get current scroll position (distance from the top of the page to the bottom of the current viewport)
      const scrollPosition = scrollY + windowHeight;
      // get element position (distance from the top of the page to the bottom of the element)
      const elementPosition = element.getBoundingClientRect().top + scrollY + elementHeight;
      
      // is scroll position greater than element position? (is element in view?)
      if (scrollPosition > elementPosition) {
        return true;
      }
      
      return false;
    }

    function animate() {
      if (inView()) {
          document.querySelector(`.${ID}-contentBottom`).classList.add('animated');
      }
    }

  }


  createPriceBox();

  if(shared.VARIATION === '4') {
    animateText();
  }
};
