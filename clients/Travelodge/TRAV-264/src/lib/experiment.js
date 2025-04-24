/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/utils';


const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {

  pollerLite(['.fixedButton .fixedButton-wrapper .room-type'], () => {
    let pageBookings = document.querySelectorAll('.fixedButton-wrapper #bookingSummary .row .well');

    let summaryButton = 
    `
    <div class="sticky-rebase stickyButton ${ID}-stay-summary-container">
      <div class="${ID}-stay-summary-closed">
          <div class="${ID}-stay-summary-title">
              Stay summary
          </div>
          <div class="${ID}-stay-summary-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 20 20" class="${ID}-up-arrow">
          <line x1="2" y1="16" x2="10" y2="3" stroke="black" stroke-width="2" />
          <line x1="18" y1="16" x2="10" y2="3" stroke="black" stroke-width="2" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 20 20" class="${ID}-down-arrow ${ID}-display-none">
            <line x1="3" y1="4" x2="10" y2="16" stroke="black" stroke-width="2" />
            <line x1="17" y1="4" x2="10" y2="16" stroke="black" stroke-width="2" />
          </svg>          
          </div>
      </div>
    </div>
    `

    let targetContainer = document.querySelector('.fixedButton-wrapper .u-text-center .sticky-rebase');

    let screenWidth = window.screen.width;

    if (screenWidth < 769) {
      targetContainer.insertAdjacentHTML('beforebegin', summaryButton);
    }

    let totalPrice = 0;

    pageBookings.forEach((booking) => {
      //all of this needs observing depending on options selected
      let roomType = booking.querySelector('.fixedButton-wrapper .basic-info .room-type').innerHTML
      let rateType = booking.querySelector('#bookingSummary .basic-info .rate-type').innerHTML;
      let nightBreakdown = booking.querySelectorAll('.night-breakdown .u-clearfix');
      let stickyContainer = document.querySelector(`.${ID}-stay-summary-container`);

      let bookingSummary = `
        <div class="${ID}-stay-summary-open ${ID}-display-none">
          <div class="${ID}-room-type ${ID}-summary-open-line ${ID}-bold">
            <p>${roomType}</p>
            <p>${rateType}</p>
          </div>
          <div class="${ID}-date-price">
          ${Array.from(nightBreakdown).map((night) => {
            const duration = night.querySelector('.label').textContent;
            const roomPrice = night.querySelector('.value').textContent;
    
            totalPrice = totalPrice + parseFloat(roomPrice.split('£')[1]);

            return `
              <div class="${ID}-date-price-item ${ID}-summary-open-line">
                <p>${duration}</p>
                <p class="${ID}-bold">${roomPrice}</p>
              </div>
            `;
          }).join('')}
          </div>
          <div class="${ID}-extra-container">
            <div class="${ID}-extra-option ${ID}-summary-open-line ${ID}-extras-title">
            <p class="${ID}-bold">Extras:</p>
            </div>
            <div class="${ID}-extra-option ${ID}-summary-open-line">
              
            </div>
            <div class="${ID}-add-extra ${ID}-summary-open-line">
              <button type="submit" class="bookNow ${ID}-add-extra-button">Add extras</button>
            </div>
          </div>
          </div>
        </div>
      `

      
      stickyContainer.insertAdjacentHTML('beforeend', bookingSummary);
    })

    let totalPriceHTML = `
    <div class="${ID}-summary-open-line ${ID}-total-price ${ID}-display-none">
      <p>Total:</p>
      <p class="${ID}-bold">£${totalPrice.toFixed(2)}</p>
    </div>
    `
    const staySummaryButton = document.querySelector(`.${ID}-stay-summary-container`);
    staySummaryButton.insertAdjacentHTML('beforeend', totalPriceHTML);



    //watch for mutations and update
    const observedElement = document.querySelector('#bookingSummary');
    const summaryContainer = document.querySelector(`.${ID}-stay-summary-container`);

    const mutationCallback = function(mutationsList, observer) {
      console.log('mutation happened')
      let updatedBookings = document.querySelectorAll('.fixedButton-wrapper #bookingSummary .row .well');
      //remove old bookings
      let oldBookings = document.querySelectorAll(`.${ID}-stay-summary-container .${ID}-stay-summary-open`);
      oldBookings.forEach((oldBooking) => {oldBooking.remove();})
      //remove old total
      document.querySelector(`.${ID}-stay-summary-container .${ID}-total-price`).remove();
      //new price
      let totalPrice = 0;
      //check for open container
      let containerOpen = false;
      if(document.querySelector(`.${ID}-stay-summary-container`).classList.contains(`${ID}-open-container`)){
        containerOpen = true;
      } else {
        containerOpen = false;
      }
      
      updatedBookings.forEach((booking) => {
        let roomType = booking.querySelector('.fixedButton-wrapper .basic-info .room-type').innerHTML
        let rateType = booking.querySelector('#bookingSummary .basic-info .rate-type').innerHTML;
        let nightBreakdown = booking.querySelectorAll('.night-breakdown .u-clearfix');
        let stickyContainer = document.querySelector(`.${ID}-stay-summary-container`);

  
        let bookingSummary = `
          <div class="${ID}-stay-summary-open ${containerOpen ? '' : `${ID}-display-none`}">
            <div class="${ID}-room-type ${ID}-summary-open-line ${ID}-bold">
              <p>${roomType}</p>
              <p>${rateType}</p>
            </div>
            <div class="${ID}-date-price">
            ${Array.from(nightBreakdown).map((night) => {
              const duration = night.querySelector('.label').textContent;
              const roomPriceElement = night.querySelector('.value');
              let roomPrice = night.querySelector('.value').textContent;
              let wifi = false;

              if(roomPriceElement.classList.contains('line-through')){
                wifi = true;
              } else { 
                totalPrice = totalPrice + parseFloat(roomPrice.split('£')[1]);  
              }
              
              return `
                <div class="${ID}-date-price-item ${ID}-summary-open-line">
                  <p>${duration}</p>
                  <p class="${ID}-bold">${wifi ? 'FREE' : roomPrice}</p>
                </div>
              `;
            }).join('')}
            </div>
            <div class="${ID}-extra-container">
              <div class="${ID}-extra-option ${ID}-summary-open-line ${ID}-extras-title">
              <p class="${ID}-bold">Extras:</p>
              </div>
              <div class="${ID}-extra-option ${ID}-summary-open-line">
                
              </div>
              <div class="${ID}-add-extra ${ID}-summary-open-line">
                <button type="submit" class="bookNow ${ID}-add-extra-button">Add extras</button>
              </div>
            </div>
            </div>
          </div>
        `
  
        
        stickyContainer.insertAdjacentHTML('beforeend', bookingSummary);
      })
  
      let newPriceHTML = `
      <div class="${ID}-summary-open-line ${ID}-total-price ${containerOpen ? '' : `${ID}-display-none`}">
        <p>Total:</p>
        <p class="${ID}-bold">£${totalPrice.toFixed(2)}</p>
      </div>
      `

      staySummaryButton.insertAdjacentHTML('beforeend', newPriceHTML);
    };

    const config = {
      attributes: true,
      childList: true,
      subtree: true,
    };

    const observer = new MutationObserver(mutationCallback);

    observer.observe(observedElement, config);

    const staySummaryOpenButton = document.querySelector(`.${ID}-stay-summary-container .${ID}-stay-summary-closed`);
    const upArrow = document.querySelector(`.${ID}-stay-summary-container .${ID}-up-arrow`);
    const downArrow = document.querySelector(`.${ID}-stay-summary-container .${ID}-down-arrow`);



    staySummaryOpenButton.addEventListener('click', () => {
      fireEvent(`Click - user has clicked to expand stay summary`, true);
      const staySummaryOpen =  document.querySelectorAll(`.${ID}-stay-summary-open`);
      const totalPriceElement = document.querySelector(`.${ID}-total-price`);

      staySummaryOpen.forEach(div => {
        div.classList.toggle(`${ID}-display-none`);
      })
      staySummaryButton.classList.toggle(`${ID}-open-container`);
      upArrow.classList.toggle(`${ID}-display-none`);
      downArrow.classList.toggle(`${ID}-display-none`);
      totalPriceElement.classList.toggle(`${ID}-display-none`);
    })

  })
}


export default () => {

  setup();

  logMessage(ID + " Variation: " + VARIATION);

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
