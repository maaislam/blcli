/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import debounce from 'lodash/debounce';
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { elementIsInView, events, observer, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;
let theStickyWrapper;

const isInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)

  );
}


const startExperiment = () => {

  pollerLite(['#buttonWrapperMobile', '#TotalValue'], () => {
    let totalBagValue = document.getElementById('TotalValue').innerText;

    let newButtonWrapperHTML = `
  
    <div class="${ID}-sticky-wrapper ${ID}-hidden">

      <div class="${ID}-sticky--header">
        <div class="${ID}-sticky--headertitle">
          <h2>Total:</h2>
          <p id="${ID}-value">${totalBagValue}</p>
        </div>
      </div>
      <div class="${ID}-sticky--button">
        
      </div>

    </div>
  
  
  `;

    if (VARIATION !== "control") {
      let insertionPoint = document.querySelector('#CartPanel');
      let insertionPosition = 'afterbegin';
      if (VARIATION == 2) {
        insertionPoint = document.getElementById('buttonWrapperMobile');
        insertionPosition = 'beforebegin';
      }
      insertionPoint.insertAdjacentHTML(insertionPosition, newButtonWrapperHTML);

      theStickyWrapper = document.querySelector(`.${ID}-sticky-wrapper`);

      let newWrapperButton = document.getElementById('buttonWrapperMobile').querySelector('a');
      newWrapperButton.id = `${ID}-sticky--button`;
      theStickyWrapper.querySelector(`.${ID}-sticky--button`).appendChild(newWrapperButton);

      newWrapperButton.addEventListener('click', () => {
        fireEvent(`Click - user has clicked on the sticky cart button to continue to checkout`, true);
      });
      document.documentElement.classList.add(`${ID}-experiment-started`);
      theStickyWrapper.classList.remove(`${ID}-hidden`);

      // get price & num items 

      if (VARIATION == 1) {
        window.addEventListener('scroll', () => {
          if (document.getElementById('BodyWrap').classList.contains('menu-search-shown') || window.scrollY < 50) {
            theStickyWrapper.classList.remove('header-hidden');
          } else if (document.getElementById('BodyWrap').classList.contains('menu-search-hidden')) {
            theStickyWrapper.classList.add('header-hidden');
          }
        }, 100);

      }


      observer.connect(document.getElementById('TotalValue'), () => {

        let theTotalPrice = document.getElementById('TotalValue').innerText;
        let theTotalItems = document.getElementById('SubtotalLabel').innerText;

        let theStickyTotalPrice = document.getElementById(`${ID}-sticky--totalbasketprice`);
        let theAlteredButton = document.getElementById(`${ID}-sticky--button`).querySelector('span');

        if (VARIATION !== "control") {
          theStickyTotalPrice.innerText = theTotalPrice;
          theAlteredButton.innerText = `Continue Securely (${theTotalItems})`;
        }


      },
        { attributes: false, childList: true, subtree: false });

      window.addEventListener('scroll', debounce(() => {

        let isInView = isInViewport(document.querySelector('#divContinueSecurely'));

        if (isInView == true && !document.documentElement.classList.contains(`${ID}-stickywrapperhidden`)) {
          document.documentElement.classList.add(`${ID}-stickywrapperhidden`);
        } else if (isInView == false && document.documentElement.classList.contains(`${ID}-stickywrapperhidden`)) {
          document.documentElement.classList.remove(`${ID}-stickywrapperhidden`);
        }

      }, 50));


    }


    fireEvent(`Visible - sticky cart wrapper ${VARIATION == "control" ? 'would have been added' : 'added'} to the page`, true);


    // Apple Pay
    if(VARIATION !== "control") {
      pollerLite(['.buy-now-button-wrapper'], () => {

        const apiKey = document.getElementById('buyNowData').getAttribute('data-stripe-key')
        const stripe = Stripe(apiKey);

        const paymentRequest = stripe.paymentRequest({
          country: 'GB',
          currency: 'gbp',
          total: {
            label: 'Sports Direct',
            amount: 1
          }
        });

        paymentRequest.canMakePayment().then(function (result) {
          if (result && result.applePay) {

            // Do stuff here
            document.querySelector(`.${ID}-sticky-wrapper`).classList.add(`${ID}-applepayavailable`);
            let buyNowButtonWrapper = document.querySelector('.buy-now-button-wrapper');
            buyNowButtonWrapper.classList.add(`${ID}-applepay`);
            document.querySelector(`.${ID}-sticky--button`).insertAdjacentElement('afterbegin', buyNowButtonWrapper)

            fireEvent('Interaction - Apple Pay is available & the sticky area has been updated', true);

            document.body.addEventListener('click', (e) => {
              if (e.target.closest(`${ID}-applepay`)) {
                fireEvent(`Click - user has clicked on the apple pay button`, true);
              }
            });


          } else {
            fireEvent('Interaction - Apple Pay is NOT available', true);
          }
        });

      });
    }
    


    document.body.addEventListener('click', (e) => {

      if (e.target.closest('.ContinueOn')) {
        fireEvent(`Click - user has clicked on the continue shopping button`, true);
      } else if (e.target.closest('a[data-action="update"]')) {
        fireEvent(`Click - user has clicked on the update basket button`, true);
      } else if (e.target.closest('.s-basket-minus-button') || e.target.closest('.s-basket-plus-button')) {
        fireEvent(`Click - user has clicked on one of the basket quantity buttons`, true);
      } else if (e.target.closest('a[data-action="remove"]')) {
        fireEvent(`Click - user has clicked on the remove item from basket button`, true);
      }

      if (e.target.closest('.PromoCodeInput')) {
        fireEvent(`Click - user has clicked within the promo code section`, true);
      }



    });
  });

  

}

export default () => {

  events.analyticsReference = window.ga ? 'ga' : '_gaUAT';

  setup();

  fireEvent('Conditions Met');

  // Write experiment code here
  // ...

  if (!document.querySelector('#BasketWarningsDiv')) {
    startExperiment();
  } else {
    fireEvent('Interaction - there were issues with the cart, so the experiment was not started', true);
  }
  
  


};
