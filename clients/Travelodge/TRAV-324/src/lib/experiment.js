/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const cancelSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M11.339 14.5715C12.2611 12.9744 13.607 11.6634 15.2277 10.7834C16.8484 9.90338 18.6809 9.48872 20.5226 9.58524C22.3643 9.68176 24.1435 10.2857 25.6633 11.3303C27.1832 12.3749 28.3846 13.8194 29.1347 15.5042M9.03906 11.4657L9.95083 15.4152C10.1061 16.0878 10.7773 16.5072 11.45 16.3519L15.3994 15.4402M28.6596 24.5714C27.7375 26.1685 26.3917 27.4796 24.7709 28.3596C23.1502 29.2396 21.3177 29.6542 19.476 29.5577C17.6343 29.4612 15.8551 28.8572 14.3353 27.8127C12.8154 26.7681 11.614 25.3235 10.8639 23.6388M30.9596 27.6772L30.0478 23.7278C29.8925 23.0551 29.2213 22.6357 28.5486 22.791L24.5992 23.7028" stroke="#2B3F6C" stroke-width="2" stroke-linecap="round"/>
</svg>
`;

const refundSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24" fill="none">
  <path d="M18.75 4.125C18.75 5.85089 14.8325 7.25 10 7.25C5.16751 7.25 1.25 5.85089 1.25 4.125M18.75 4.125C18.75 2.39911 14.8325 1 10 1C5.16751 1 1.25 2.39911 1.25 4.125M18.75 4.125V19.125C18.75 20.8509 14.8325 22.25 10 22.25C5.16751 22.25 1.25 20.8509 1.25 19.125V4.125M18.75 9.125C18.75 10.8509 14.8325 12.25 10 12.25C5.16751 12.25 1.25 10.8509 1.25 9.125M18.75 14.125C18.75 15.8509 14.8325 17.25 10 17.25C5.16751 17.25 1.25 15.8509 1.25 14.125" stroke="#2B3F6C" stroke-width="1.875"/>
</svg>
`;

const lockSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="22" height="26" viewBox="0 0 22 26" fill="none">
  <rect x="1" y="9.25" width="20" height="15" rx="5" stroke="#2B3F6C" stroke-width="1.875"/>
  <path d="M11 18L11 15.5" stroke="#2B3F6C" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14.3334 4.42786C14.6294 4.85271 15.2137 4.95719 15.6385 4.66123C16.0634 4.36528 16.1679 3.78095 15.8719 3.35611L14.3334 4.42786ZM6.34774 3.06078C6.02603 3.46647 6.09411 4.05614 6.4998 4.37786C6.90549 4.69957 7.49516 4.63149 7.81687 4.2258L6.34774 3.06078ZM6.9375 9.25V6.75H5.0625V9.25H6.9375ZM6.9375 6.75C6.9375 4.50634 8.75634 2.6875 11 2.6875V0.8125C7.72081 0.8125 5.0625 3.47081 5.0625 6.75H6.9375ZM15.8719 3.35611C15.1638 2.33962 14.1555 1.57008 12.9882 1.15526L12.3603 2.92202C13.159 3.20584 13.8489 3.73237 14.3334 4.42786L15.8719 3.35611ZM12.9882 1.15526C11.8209 0.740445 10.553 0.701132 9.36229 1.04283L9.87946 2.84509C10.6942 2.6113 11.5616 2.6382 12.3603 2.92202L12.9882 1.15526ZM9.36229 1.04283C8.17153 1.38453 7.11747 2.09012 6.34774 3.06078L7.81687 4.2258C8.34353 3.56166 9.06473 3.07889 9.87946 2.84509L9.36229 1.04283Z" fill="#2B3F6C"/>
</svg>
`;

const startExperiment = () => {
  pollerLite(['.pgHotel .main .c-section .bookNow'], () => {
    const originalBookNow = document.querySelector('.pgHotel .main .c-section .db-view .bookNow');
    const originalBookNowMobile = document.querySelector('.pgHotel .main .c-section .fixedButton-wrapper .bookNow');

    //Desktop
    const newBookNowHtml = `
    <button class="${ID}-bookNow">Proceed to Extras</button>`;
    if (!document.querySelector(`.${ID}-bookNow`)) {
      originalBookNow.insertAdjacentHTML('afterend', newBookNowHtml);
    }
    //originalBookNow.insertAdjacentHTML('afterend', newBookNowHtml);
    const newBookNowDOM = document.querySelector(`.db-view  .${ID}-bookNow`);

    originalBookNow.style.display = 'none';

    //Mobile
    const newBookNowMobileHtml = `
    <button class="${ID}-bookNow">Proceed to Extras</button>`;
    if (!document.querySelector(`.${ID}-bookNow`)) {
      originalBookNowMobile.insertAdjacentHTML('afterend', newBookNowMobileHtml);
    }
    const newBookNowMobileDOM = document.querySelector(`.fixedButton-wrapper .${ID}-bookNow`);

    originalBookNowMobile.style.display = 'none';

    const calcRateDifference = () => {
      //if called then no flexible rate selected
      // look for each currently selected rate, get the flexi rate for that roomType and calculate the difference

      const allSelectedRates = document.querySelectorAll('.roomRates .card-pad button.selected');
      let total = 0;

      allSelectedRates.forEach((rate) => {
        const flexiPrice = rate
          .closest('.card-pad')
          .querySelector('button[data-ratename="Flexible rate"]')
          .innerText.split('£')[1];
        const ratePrice = rate.innerText.split('£')[1];

        total += flexiPrice - ratePrice;
      });

      return total.toFixed(2);
    };

    const flexiHtml = (rateDifference, currTotal) => {
      // let flexiDifference = 18;
      // const currTotalDummy = 100;

      return `
      <div class="${ID}-flexi-container-overlay">
      </div>
      <div class="${ID}-flexi-container">
        <div class="${ID}-flexi-container-head">
          <h2>Before you move on, did you know we offer flexible rates?</h2>
          <button class="${ID}-flexi-container-head-skip">Skip</button>
        </div>
        <div class="${ID}-flexi-container-body">
          <div class="${ID}-flexi-container-body-left ${ID}-flexi-container-body-section">
            <h3>Don’t risk losing money if plans change!</h3>
            <p>${cancelSVG} Cancel until 12pm on arrival day</p>
            <p>${refundSVG} Get a total refund or amend for FREE</p>
            <p>${lockSVG} Rates fluctuate daily - lock them in now</p>
            <button class="${ID}-add-flexi">Continue with flexible rate | + £${rateDifference}</button>
          </div>
          <div class="${ID}-flexi-container-body-right ${ID}-flexi-container-body-section">
            <img src="https://media.travelodge.co.uk/image/upload/Testing/travelodge-flexi-rate.png" alt="Travelodge flexible rate">
          </div>
        </div>
      </div>
    `;
    };

    const clickAllNearestFlexi = () => {
      console.log('clickAllNearestFlexi');
      const allSelectedRates = document.querySelectorAll('.roomRates .card-pad button.selected');
      allSelectedRates.forEach((rate) => {
        console.log(rate.closest('.card-pad'), 'nearest card pad');
        rate.closest('.card-pad').querySelector('button[data-ratename="Flexible rate"]').click();
      });
    };

    newBookNowDOM.addEventListener('click', (e) => {
      e.preventDefault();
      fireEvent('Book Now Clicked');

      const allFlexiButtons = document.querySelectorAll('.roomRates .card-pad button[data-ratename="Flexible rate"]');
      console.log(allFlexiButtons);
      let flexiRateSelected = false;

      allFlexiButtons.forEach((button) => {
        if (button.classList.contains('selected')) {
          flexiRateSelected = true;
        }
      });

      if (flexiRateSelected) {
        originalBookNow.click();
      } else {
        const rateDifference = calcRateDifference();
        const currTotal = document.querySelector('.rebaseFixedButton .js-room-total-amount').innerText.trim();

        const flexRate = flexiHtml(rateDifference, currTotal);

        const body = document.querySelector('body');
        body.classList.add(`${ID}-fix-background`);
        const html = document.querySelector('html');
        html.classList.add(`${ID}-fix-background`);

        const target = document.querySelector('.pgHotel');
        const overlay = document.querySelector(`.${ID}-flexi-container-overlay`);
        const flexiContainer = document.querySelector(`.${ID}-flexi-container`);

        if (!overlay && !flexiContainer) {
          target.insertAdjacentHTML('beforeend', flexRate);
          // const proceedButton = document.querySelector(`.${ID}-proceed-button`);
          const addFlexiButton = document.querySelector(`.${ID}-add-flexi`);
          const skipButton = document.querySelector(`.${ID}-flexi-container-head-skip`);

          addFlexiButton.addEventListener('click', (e) => {
            // allFlexiButtons.forEach((button) => {
            //   button.click();
            // });
            clickAllNearestFlexi();
            originalBookNow.click();

            // addFlexiButton.innerText = 'Flexible rate added';
            // addFlexiButton.disabled = true;
            // // addFlexiButton.style.backgroundColor = '#61bc40';

            // // document.querySelector(`.${ID}-flexi-container-body`).style.border = `2px solid #61bc40`;

            // const newTotal = document.querySelector('.rebaseFixedButton .js-room-total-amount').innerText;
            // document.querySelector(`.${ID}-flexi-container-footer-left p span`).innerText = `£${newTotal}`;
          });

          // proceedButton.addEventListener('click', (e) => {
          //   e.preventDefault();
          //   fireEvent('Proceed to Extras Clicked');
          //   originalBookNow.click();
          // });

          skipButton.addEventListener('click', (e) => {
            e.preventDefault();
            fireEvent('Skip Flexi Rate Clicked');
            originalBookNow.click();
          });
        }
      }
    });

    newBookNowMobileDOM.addEventListener('click', (e) => {
      e.preventDefault();
      //hide mbl order summary
      document.querySelector('.fixedButton-wrapper .sticky-summary-container').style.display = 'none';
      fireEvent('Book Now Clicked');

      const allFlexiButtons = document.querySelectorAll('.roomRates .card-pad button[data-ratename="Flexible rate"]');
      console.log(allFlexiButtons);
      let flexiRateSelected = false;

      allFlexiButtons.forEach((button) => {
        if (button.classList.contains('selected')) {
          flexiRateSelected = true;
        }
      });

      if (flexiRateSelected) {
        originalBookNow.click();
      } else {
        const rateDifference = calcRateDifference();
        const currTotal = document.querySelector('.rebaseFixedButton .js-room-total-amount').innerText.trim();

        const flexRate = flexiHtml(rateDifference, currTotal);

        const body = document.querySelector('body');
        body.classList.add(`${ID}-fix-background`);
        const html = document.querySelector('html');
        html.classList.add(`${ID}-fix-background`);

        const target = document.querySelector('.pgHotel');
        const overlay = document.querySelector(`.${ID}-flexi-container-overlay`);
        const flexiContainer = document.querySelector(`.${ID}-flexi-container`);

        if (!overlay && !flexiContainer) {
          target.insertAdjacentHTML('beforeend', flexRate);
          // const proceedButton = document.querySelector(`.${ID}-proceed-button`);
          const addFlexiButton = document.querySelector(`.${ID}-add-flexi`);
          const skipButton = document.querySelector(`.${ID}-flexi-container-head-skip`);

          addFlexiButton.addEventListener('click', (e) => {
            // allFlexiButtons.forEach((button) => {
            //   button.click();
            // });
            clickAllNearestFlexi();
            originalBookNow.click();

            // addFlexiButton.innerText = 'Flexible rate added';
            // addFlexiButton.disabled = true;
            // // addFlexiButton.style.backgroundColor = '#61bc40';

            // // document.querySelector(`.${ID}-flexi-container-body`).style.border = `2px solid #61bc40`;

            // const newTotal = document.querySelector('.rebaseFixedButton .js-room-total-amount').innerText;
            // document.querySelector(`.${ID}-flexi-container-footer-left p span`).innerText = `£${newTotal}`;
          });

          // proceedButton.addEventListener('click', (e) => {
          //   e.preventDefault();
          //   fireEvent('Proceed to Extras Clicked');
          //   originalBookNow.click();
          // });

          skipButton.addEventListener('click', (e) => {
            e.preventDefault();
            fireEvent('Skip Flexi Rate Clicked');
            originalBookNow.click();
          });
        }
      }
    });
  });
};

export default () => {
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
  // if (VARIATION == 'control') {
  //   return;
  // }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  startExperiment();
};
