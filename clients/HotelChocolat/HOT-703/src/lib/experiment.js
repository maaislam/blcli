import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { minusIcon, plusIcon } from './assets/icon';
import getCartItemQuantity from './helpers/getCartItemQuantity';
import { cloneElementWithShadowDOM, editShadowRootCSS } from './helpers/utils';

const { ID, VARIATION } = shared;

const obsIntersection = (target, threshold, callback) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
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
    <div class="${ID}-express-checkout-buttons">
      <div class="${ID}-express-checkout-paypal">
        
      </div>
    </div>
  <div>`;

  const amazonPayButton = cloneElementWithShadowDOM('#AmazonPayButtonCheckout');
  amazonPayButton.classList.add(`${ID}__amazonPayBtn`);

  // const amazonPayButton = `<div class='${ID}__amazonPayBtn'>${amazonPayIcon}</div>`;

  pollerLite(['.pt_cart #main .express-checkout-button-container'], () => {
    const originalSubmitButton = document.querySelector('#main form.cart-action-checkout button[type="submit"]');

    const target = document.querySelector('#wrapper.pt_cart');
    target.insertAdjacentHTML('beforeend', stickySubmitButtonNewIteration);
    fireEvent('Viewed - user sees the place order bar');

    const submitDOM = document.querySelector(`.${ID}-sticky-container-button`);
    submitDOM.addEventListener('click', () => {
      originalSubmitButton.click();
    });

    const paypal = window.paypal;
    const amazon = window.amazon;

    if (paypal) {
      paypal
        .Buttons({
          style: {
            label: '',
            disableMaxWidth: true,
            maxWidth: '170px'
          },
        })
        .render(`.${ID}-express-checkout-paypal`);
    }

    if (amazon) {
      document.querySelector(`.${ID}-express-checkout-paypal`).insertAdjacentElement('afterend', amazonPayButton);
      const amazonBtnCSS = `
        .amazonpay-button-container-rows {
          grid-template-rows: 90% !important;
        }
        .amazonpay-button-microtext {
          display: none !important;
        }
      `;
      editShadowRootCSS(`.${ID}__amazonPayBtn`, amazonBtnCSS);
    }

    const stickyContainer = document.querySelector(`.${ID}-sticky-container`);
    if (VARIATION === '1') {
      const orderTotalElem = document.querySelector('tr.order-total');
      const newOrderTotalElem = orderTotalElem.cloneNode(true);
      const orderTotalTable = `<table class="${ID}-order-total-table">${newOrderTotalElem.outerHTML}</table>`;
      stickyContainer.insertAdjacentHTML('afterbegin', orderTotalTable);
    }

    if (VARIATION === '2') {
      const totalItem = getCartItemQuantity();
      const orderTableCtrl = document.querySelector('.order-totals-table');
      const newOrderTotalElem = orderTableCtrl.cloneNode(true);

      const orderSummery = `<div class="${ID}__orderSummary">
        <div class="${ID}__orderSummary-header">
          <span class='${ID}__title'>Order summary (${totalItem} items)</span>
          <span class='${ID}__plusIcon'>${plusIcon}</span>
          <span class='${ID}__minusIcon'>${minusIcon}</span>
        </div>
        <div class='${ID}__content'>
          ${newOrderTotalElem.outerHTML}
        </div>
      </div>`;
      stickyContainer.insertAdjacentHTML('afterbegin', orderSummery);
    }
  });

  const intersectionTarget = document.querySelectorAll('.cart-action-checkout')[1];
  obsIntersection(intersectionTarget, 1, (entry) => {
    const stickyAtc = document.querySelector(`.${ID}-sticky-container`);
    if (entry.isIntersecting) {
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

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}__amazonPayBtn`)) {
      const amazonBtnCtrl = document.getElementById('AmazonPayButtonCheckout');
      amazonBtnCtrl.click();
    } else if (target.closest(`.${ID}__orderSummary-header`)) {
      const orderSummaryCtrl = document.querySelector(`.${ID}__content`);
      orderSummaryCtrl.classList.toggle('active');
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  startExperiment();
};
