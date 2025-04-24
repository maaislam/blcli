/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const closeSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
  <path d="M15.8143 16.6357L9 10.2L2.18574 16.6357C1.9286 16.8786 1.67144 17 1.28573 17C0.5143 17 1.57005e-05 16.5143 1.57005e-05 15.7857C1.57005e-05 15.4214 0.128571 15.1786 0.385714 14.9357L7.20001 8.5L0.385714 2.06429C-0.128571 1.57857 -0.128571 0.85 0.385714 0.364286C0.899998 -0.121429 1.67146 -0.121429 2.18574 0.364286L9 6.8L15.8143 0.364286C16.3285 -0.121429 17.1 -0.121429 17.6143 0.364286C18.1286 0.85 18.1286 1.57857 17.6143 2.06429L10.8 8.5L17.6143 14.9357C18.1286 15.4214 18.1286 16.15 17.6143 16.6357C17.1 17.1214 16.3285 17.1214 15.8143 16.6357Z" fill="black"/>
</svg>`;

const startExperiment = () => {
  pollerLite(['.pt_product-details #product-detail-wrapper #add-to-cart'], () => {
    console.log('Product details page loaded');

    const waysToPayHtml = `
      <div class="${ID}-ways-to-pay-container">
        <div class="${ID}-ways-to-pay">
          <img src="https://blcro.fra1.digitaloceanspaces.com/HOT-666/cardSVG.svg" alt="Card">
          <p class="${ID}-more-ways">Multiple payment options available.</p>
          <p class="${ID}-learn-more">Learn More</p>
        </div>
      </div>`;

      const targetContainer = document.querySelector('.pt_product-details #product-detail-wrapper #add-to-cart');
      targetContainer.insertAdjacentHTML('afterend', waysToPayHtml);

      const waysToPaySlide = `
        <div class="${ID}-ways-to-pay-slide">
          <div class="${ID}-ways-to-pay-slide-close">
            ${closeSVG}
          </div>
          <div class="${ID}-ways-to-pay-slide-content">
            <h2>There's more than one way to pay</h2>
            <div class="${ID}-payment-options">
              <img src="https://blcro.fra1.digitaloceanspaces.com/HOT-666/Klarna_updatedSVG.svg" alt="Klarna">
              <img src="https://blcro.fra1.digitaloceanspaces.com/HOT-666/PayPal_updatedSVG.svg" alt="PayPal">
              <img src="https://blcro.fra1.digitaloceanspaces.com/HOT-666/Visa_updatedSVG.svg" alt="Visa">
              <img src="https://blcro.fra1.digitaloceanspaces.com/HOT-666/mastercard_updatedSVG.svg" alt="Mastercard">
              <img src="https://blcro.fra1.digitaloceanspaces.com/HOT-666/Maestro_updatedSVG.svg" alt="Maestro">
              <img src="https://blcro.fra1.digitaloceanspaces.com/HOT-666/AE_updatedSVG.svg" alt="American Express">
              <img src="https://blcro.fra1.digitaloceanspaces.com/HOT-666/amazonPay.svg" alt="Amazon Pay">
              <img src="https://blcro.fra1.digitaloceanspaces.com/HOT-666/applePay.svg" alt="Apple Pay">
              <img src="https://blcro.fra1.digitaloceanspaces.com/HOT-666/giftcardSVG.svg" alt="HotelChocolat Gift Card">
            </div>
            <p class="${ID}-following-options">For online orders, you can pay by the following payment options:</p>
            <ul>
              <li>Visa, Mastercard, Maestro, American Express</li>
              <li>Klarna</li>
              <li>PayPal</li>
              <li>Apple Pay</li>
              <li>Amazon Pay</li>
            </ul>
            <p>For orders over the telephone, you can pay by Visa, Mastercard, Maestro and American Express.</p>
            <div class="${ID}-continue-shopping">
              <p>Continue Shopping</p>
            </div>
          </div>
        </div>`;

        // <h3>How do I add a voucher to my order?</h3>
        // <p>When you first enter the online checkout, you will see ‘Your Shopping Bag’. 
        // Here, at the bottom of the left-hand side of the page, you will see a section that says ‘Got a Discount Code?’. 
        // This is where you should enter your voucher code.</p>

      const overlay = `<div class="${ID}-overlay"></div>`
      const targetContainerSlide = document.querySelector('body');
      targetContainerSlide.insertAdjacentHTML('afterbegin', waysToPaySlide);
      targetContainerSlide.insertAdjacentHTML('afterbegin', overlay);

      const slideOutContainer = document.querySelector(`.${ID}-ways-to-pay-slide`);
      // const learnMoreDOM = document.querySelector(`.${ID}-learn-more`);
      const waysToPayDOM = document.querySelector(`.${ID}-ways-to-pay-container`);
      const closeDOM = document.querySelector(`.${ID}-ways-to-pay-slide-close`);
      const overlayDOM = document.querySelector(`.${ID}-overlay`);
      const continueShoppingDOM = document.querySelector(`.${ID}-continue-shopping`);
      const screenWidth = window.innerWidth;

      waysToPayDOM.addEventListener('click', () => {
        fireEvent('Click - User clicks “Learn more” CTA');
        const isVisible = slideOutContainer.style.right === '0px';
        if(screenWidth < 678) {
          slideOutContainer.style.right = isVisible ? '-550px' : '0px';
        } else {
        slideOutContainer.style.right = isVisible ? '-640px' : '0px';
        }
        overlayDOM.style.display = isVisible ? 'none' : 'block';
      });

      closeDOM.addEventListener('click', () => {
        fireEvent('Click - User clicks close CTA in slide out');
        if(screenWidth < 678) {
          slideOutContainer.style.right = '-550px';
        } else {
        slideOutContainer.style.right = '-640px';
        }
        overlayDOM.style.display = 'none';
      });

      continueShoppingDOM.addEventListener('click', () => {
        fireEvent('Click - User clicks “Continue Shopping” CTA in slide out');
        if(screenWidth < 678) {
          slideOutContainer.style.right = '-550px';
        } else {
        slideOutContainer.style.right = '-640px';
        }
        overlayDOM.style.display = 'none';
      });

  });
}

export default () => {

  newEvents.initiate = true;
  newEvents.method = ['ga4'];
  newEvents.property = 'G-B37NQR1RWZ';

  setup();

  logMessage(ID + " Variation: "+VARIATION);

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
  startExperiment();
};
