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

const obsIntersection = (target, threshold, callback) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // if (entry.intersectionRatio > 0 && entry.isIntersecting && entry.boundingClientRect.y > 0) {

        // }
        callback(entry);
      });
    },
    { threshold: threshold }
  );
  if (!target) {
    return;
  }

  observer?.observe(target);
};

const startExperiment = () => {
  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  // const stickySubmitButton = `
  // <div class=${ID}-sticky-container>
  //   <button class=${ID}-sticky-container-button>Checkout securely</button>
  //   <div class="${ID}-express-checkout">
  //     <p>Or Express Checkout</p>
  //   </div>
  //   <div id="paypal-button-container" class="paypal-button-container">
  //     <button>Pay with PayPal</button>
  //     <p>The safer, easier way to pay</p>
  //   </div>
  //   <div class="${ID}-express-checkout-paypal">
  //     <button>Pay with PayPal</button>
  //     <p>The safer, easier way to pay</p>
  //   </div>
  //   <div class="${ID}-express-checkout-amazon">
  //     <button>Pay with Amazon</button>
  //     <p>Use your Amazon account</p>
  //   </div>
  // <div>`;

  const padlockIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="14" viewBox="0 0 10 14" fill="none">
  <rect y="0.5" width="10" height="13" fill="url(#pattern0_51_44)"/>
  <defs>
  <pattern id="pattern0_51_44" patternContentUnits="objectBoundingBox" width="1" height="1">
  <use xlink:href="#image0_51_44" transform="scale(0.1 0.0769231)"/>
  </pattern>
  <image id="image0_51_44" width="10" height="13" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAANCAYAAACQN/8FAAAAk0lEQVQokY2QMQ6CQBBFH4REqSwt7G29D3g3b2DNOaw8hIV2GKLPgjGuiOJLfmbz589OdlEJrdS9eg3tw0PlGSrVo9qpu1AXXpkGK3vqZEMdXqWS07OO2vCiSXs579y+nMlUgHnoAvjsAQugBdoiafxkuJoY/BguRoKbqIep4Ay4/3PjFjgPzcx4dsKJ/muWU8FRHvrZgJyAVUoJAAAAAElFTkSuQmCC"/>
  </defs>
  </svg>`;

  const stickySubmitButtonNewIteration = `
  <div class=${ID}-sticky-container>
    <button class=${ID}-sticky-container-button>${padlockIcon} <span>&nbsp;CHECKOUT SECURELY</span></button>
    <div class="${ID}-express-checkout">
      <p>Or Express Checkout</p>
    </div>
    <div class="${ID}-express-checkout-paypal">
      
    </div>
  <div>`;

  pollerLite(['.pt_cart #main .express-checkout-button-container'], () => {
    console.log('Poller found the element');

    const originalSubmitButton = document.querySelector('#main form.cart-action-checkout button[type="submit"]');

    const target = document.querySelector('#wrapper.pt_cart');
    target.insertAdjacentHTML('beforeend', stickySubmitButtonNewIteration);
    fireEvent('Viewed - user sees the place order bar');

    const submitDOM = document.querySelector(`.${ID}-sticky-container-button`);
    submitDOM.addEventListener('click', () => {
      originalSubmitButton.click();
    });

    const paypal = window.paypal;

    if (paypal) {
      //const paypalButton = document.querySelector(`.${ID}-express-checkout-paypal button`);
      //paypal.render(`#paypal-button-container.${ID}-express-checkout-paypal`);

      paypal
        .Buttons({
          style: {
            label: 'checkout',
            disableMaxWidth: true,
          },
        })
        .render(`.${ID}-express-checkout-paypal`);
    }
  });

  const intersectionTarget = document.querySelectorAll('.cart-action-checkout')[1];
  obsIntersection(intersectionTarget, 1, (entry) => {
    //console.log('🚀 ~ obsIntersection ~ entry:', entry);
    const stickyAtc = document.querySelector(`.${ID}-sticky-container`);
    if (entry.isIntersecting) {
      //stickyAtc.style.display = 'none';
      stickyAtc.classList.remove('slide-in-bottom');
      stickyAtc.classList.add('slide-out-bottom');
    } else {
      stickyAtc.classList.remove('slide-out-bottom');
      stickyAtc.classList.add('slide-in-bottom');
    }
  });
};

export default () => {
  newEvents.initiate = true;
  newEvents.method = ['ga4'];
  newEvents.property = 'G-B37NQR1RWZ';

  setup();

  logMessage(ID + ' Variation: ' + VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  startExperiment();
};
