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

const arrowSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none" class="${ID}-up-arrow">
  <path d="M13.9999 6.98674C13.9999 7.10674 13.9533 7.22674 13.8599 7.32008C13.6799 7.50008 13.3799 7.50008 13.1999 7.32008L7.19993 1.31341L1.19326 7.32008C1.01326 7.50008 0.71993 7.50008 0.533263 7.32008C0.346597 7.14008 0.353263 6.84008 0.533263 6.66008L7.19993 7.82013e-05L13.8666 6.66008C13.9533 6.75341 13.9999 6.87341 13.9999 6.98674Z" fill="black"/>
</svg>
`

const startExperiment = () => {

  pollerLite(['.fixedButton .fixedButton-wrapper .room-type'], () => {
    let pageBookings = document.querySelectorAll('.fixedButton-wrapper #bookingSummary .row .well');
    

    let roomType = '';
    let roomTypesNode = document.querySelectorAll('.fixedButton-wrapper #bookingSummary .room-type'); 
    let roomTypes = Array.from(roomTypesNode).map((room) => {
      return room.innerHTML;
    });
    let rateType = ''  
    let rateTypesNode = document.querySelectorAll('.fixedButton-wrapper #bookingSummary .rate-type');
    let rateTypes = Array.from(rateTypesNode).map((rate) => {
      return rate.innerHTML;
    });
    // console.log(roomTypes);
    // console.log(rateTypes);
    let numberRooms = document.querySelectorAll('.fixedButton-wrapper #bookingSummary .row div .well').length;

    function areItemsEqual(arr) {
      if(arr.length === 1){
        return true;
      }
      // console.log(arr)
      // console.log(new Set(arr).size !== arr.length);
      // console.log(new Set(arr).size, arr.length);
      return new Set(arr).size !== arr.length;
    }

    if(areItemsEqual(roomTypes)){
      // console.log('room types are equal')
      roomType = roomTypes[0];
    }else{
      if(numberRooms > 1){
      roomType = 'Rooms';
      } else {
        roomType = 'Room';
      }
    }

    if(areItemsEqual(rateTypes)){
      // console.log('rate types are equal')
      rateType = `(${rateTypes[0]})`;
    }else{
      rateType = '';
    }


    let lastFew = window.globalDataLayer.availabilityStatus;
    if(lastFew === "low-availability"){
      lastFew = true;
    } else {
      lastFew = false;
    }


    const createSummaryButton = (number, roomtype, rate) => {
      return `
      <div class="sticky-rebase stickyButton ${ID}-stay-summary-container">
        <div class="${ID}-stay-summary-closed">
            <div class="${ID}-stay-summary-title">
                Selected: ${number} ${roomtype} ${rate}
            </div>
            <div class="${ID}-stay-summary-arrow">
              ${arrowSVG}          
            </div>
        </div>
        ${lastFew ? `<div class="${ID}-last-few-container ${ID}-last-few-button">
        <p>Last few rooms remaining for your dates</p>
        </div>` : ''}
      </div>
      `
    }

    let summaryButton = createSummaryButton(numberRooms, roomType, rateType);


    let targetContainer = document.querySelector('.fixedButton-wrapper .u-text-center .sticky-rebase');

    let screenWidth = window.screen.width;

    if (screenWidth < 769) {
      targetContainer.insertAdjacentHTML('beforebegin', summaryButton);
    

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
    ${lastFew ? `<div class="${ID}-last-few-container ${ID}-last-few-total ${ID}-display-none">
    <p>Last few rooms remaining for your dates</p>
    </div>` : ''}
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
      `;

      staySummaryButton.insertAdjacentHTML('beforeend', newPriceHTML);

      //UPDATE ROOM SUMMARY
      // let roomType = document.querySelector('.fixedButton-wrapper #bookingSummary .room-type').innerHTML;
      // let rateType = document.querySelector('.fixedButton-wrapper #bookingSummary .rate-type').innerHTML;
      let numberRooms = document.querySelectorAll('.fixedButton-wrapper #bookingSummary .row div .well').length;

      let roomType = '';
      let roomTypesNode = document.querySelectorAll('.fixedButton-wrapper #bookingSummary .room-type'); 
      let roomTypes = Array.from(roomTypesNode).map((room) => {
        return room.innerHTML;
      });
      let rateType = ''  
      let rateTypesNode = document.querySelectorAll('.fixedButton-wrapper #bookingSummary .rate-type');
      let rateTypes = Array.from(rateTypesNode).map((rate) => {
        return rate.innerHTML;
      });

      if(areItemsEqual(roomTypes)){
        // console.log('room types are equal')
        roomType = roomTypes[0];
      }else{
        if(numberRooms > 1){
          roomType = 'Rooms';
          } else {
            roomType = 'Room';
          }
      }
  
      if(areItemsEqual(rateTypes)){
        // console.log('rate types are equal')
        rateType = `(${rateTypes[0]})`;
      }else{
        rateType = '';
      }
      // console.log(roomTypes);
      // console.log(rateTypes);

      const staySummaryString = `Selected: ${numberRooms} ${roomType} ${rateType}`;
      const staySummaryTitle = document.querySelector(`.${ID}-stay-summary-title`);
      staySummaryTitle.innerHTML = staySummaryString;
    };

    const config = {
      attributes: true,
      childList: true,
      subtree: true,
    };

    const observer = new MutationObserver(mutationCallback);

    observer.observe(observedElement, config);

    // const staySummaryOpenButton = document.querySelector(`.${ID}-stay-summary-container .${ID}-stay-summary-closed`);
    const staySummaryOpenButton = document.querySelector(`.${ID}-stay-summary-container`);
    const upArrow = document.querySelector(`.${ID}-stay-summary-container .${ID}-up-arrow`);



    staySummaryOpenButton.addEventListener('click', (e) => {
      //stop all the open container from toggling
      if(e.target.closest(`.${ID}-stay-summary-open`) || e.target.closest(`.${ID}-open-line`)){
        return;
      }
      fireEvent(`Click - user has clicked to expand stay summary`, true);
      const staySummaryOpen =  document.querySelectorAll(`.${ID}-stay-summary-open`);
      const totalPriceElement = document.querySelector(`.${ID}-total-price`);

      staySummaryOpen.forEach(div => {
        div.classList.toggle(`${ID}-display-none`);
      })
      staySummaryButton.classList.toggle(`${ID}-open-container`);
      if(upArrow.classList.contains('rotated')){
        upArrow.style['transform'] = 'rotate(0deg)';
        upArrow.classList.remove('rotated');
      } else {
      upArrow.style['transform'] = 'rotate(180deg)';
      upArrow.style['transition'] = 'transform 0.3s ease-in-out';
      upArrow.classList.add('rotated');
      }

      totalPriceElement.classList.toggle(`${ID}-display-none`);

      const lastFewContainerTotal = document.querySelector(`.${ID}-last-few-total`);
      console.log(lastFewContainerTotal)
      if(lastFewContainerTotal){
        lastFewContainerTotal.classList.toggle(`${ID}-display-none`);
      }

      const lastFewContainerButton = document.querySelector(`.${ID}-last-few-button`);
      console.log(lastFewContainerButton)
      if(lastFewContainerButton){
        lastFewContainerButton.classList.toggle(`${ID}-display-none`);
      }
    })
  }


    if(lastFew){
      pollerLite(['#formBookRoom #bookingSummary'], () => {
      const desktopTarget = document.querySelector('#formBookRoom #bookingSummary');
      const lastFewHTML = `
      <div class="${ID}-last-few-container ${ID}-last-few-container-mobile">
        <p class="${ID}-last-few-text">Last few rooms remaining for your dates</p>
      </div>`;

      desktopTarget.insertAdjacentHTML('afterend', lastFewHTML);
      });
    }
  
  })
}

const startExperiment230 = () => {
  pollerLite(['.fixedButton .fixedButton-wrapper .room-type'], () => {
    // console.log('230')
    //Check for TRAV-319-1
    const isTRAV319 = document.querySelector('html.TRAV-319-1');
    const isTRAV320 = document.querySelector('html.TRAV-320-1');

    if(isTRAV319){
      document.querySelector('.fixedButton-wrapper button.stickyButton').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.TRAV-319-booknow').click();
      });
    } else if(isTRAV320){
      document.querySelector('.fixedButton-wrapper button.stickyButton').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.TRAV-320-booknow').click();
      });
    }
  });
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
  startExperiment230();
};
