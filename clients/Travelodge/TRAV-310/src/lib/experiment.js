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

const startExperiment = () => {

  pollerLite(['#bookingSummary .total-price .value'], () => {
    const addMerchandising = (roomType) => {

      let rateDifference = 0;
      let euros = false;
      if(document.querySelector('#bookingSummary .total-price .value').innerText.includes('€')) {
        euros = true;
      }

      console.log(roomType, 'roomType');
      const standardSaver = document.querySelector('.main-price-col .rateGroups button.rate-btn[data-room-rate="standard"]');
      const standardPlusSaver = document.querySelector('.main-price-col .rateGroups button.rate-btn[data-room-rate="standardroomplus"]');
      const superSaver = document.querySelector('.main-price-col .rateGroups button.rate-btn[data-room-rate="super"]');
      // const standardRoom = document.querySelector('.main-price-col .rateGroups button.rate-btn[data-room-rate="standard"]');

      let target;
      if (roomType === "SuperRoom" || roomType === "Single SuperRoom" || roomType === "SuperRoom Single" || roomType == "SuperRoom Plus") {
        console.log('SUPERROOM');
        const superSaverPrice = parseFloat(superSaver.innerText.split('£')[1]) ? parseFloat(superSaver.innerText.split('£')[1]) : parseFloat(superSaver.innerText.split('€')[1]);
        const standardSaverPrice = parseFloat(standardSaver.innerText.split('£')[1]) ? parseFloat(standardSaver.innerText.split('£')[1]) : parseFloat(standardSaver.innerText.split('€')[1]);
        // const standardSaverPrice = parseFloat(standardSaver.querySelector('.rate-int').innerText + '.' + standardSaver.querySelector('.rate-dec').innerText);
        // const superSaverPrice = parseFloat(superSaver.querySelector('.rate-int').innerText + '.' + superSaver.querySelector('.rate-dec').innerText);
        rateDifference = (superSaverPrice - standardSaverPrice).toFixed(0);
        console.log(rateDifference, 'rateDifference');
        target = superSaver.closest('.row.card-bg-color .card-pad');
      } else if (roomType === "Standard Room Plus") {
        const standardPlusSaverPrice = parseFloat(standardPlusSaver.innerText.split('£')[1]) ? parseFloat(standardPlusSaver.innerText.split('£')[1]) : parseFloat(standardPlusSaver.innerText.split('€')[1]);
        const standardSaverPrice = parseFloat(standardSaver.innerText.split('£')[1]) ? parseFloat(standardSaver.innerText.split('£')[1]) : parseFloat(standardSaver.innerText.split('€')[1]);
        rateDifference = (standardPlusSaverPrice - standardSaverPrice).toFixed(0);
        target = standardPlusSaver.closest('.row.card-bg-color');
      }
      

      // console.log(rateDifference, 'rateDifference');
      if(rateDifference <= 0) {
        return;
      }

      const roomHyphen = roomType.toLowerCase().replaceAll(' ', '-');
      const bannerHtml = `
        <div class="${ID}-merchandising-banner ${ID}-${roomHyphen}">
          <div class="merchandising-banner-inner">
            <p>Only ${euros ? '€' : '£'}${rateDifference} more than Standard</p>
          </div>
        </div>
        `;

        // setTimeout(() => {
          const roomsBooked = document.querySelectorAll('.main-price-col .rateGroups');

          roomsBooked.forEach((container) => {
              console.log(container, 'container');
              let secondContainer
              if(container.querySelector('.extra-beds-container')){
                secondContainer = container.querySelector('.card-border:nth-child(4)');
              } else {
                secondContainer = container.querySelector('.card-border:nth-child(3)');
              }
              // secondContainer = container.querySelector('.card-border:nth-child(3)');
              if (secondContainer) {
                // console.log(secondContainer, 'secondContainer');
                  const target = secondContainer.querySelector('.card-pad');
                  if (target) {
                    // console.log(target, 'target');
                      target.insertAdjacentHTML('afterbegin', bannerHtml);
                  } else {
                      console.error("Target element not found.");
                  }
              } else {
                  console.error("Second container not found.");
              }
          });
          
    }


    const soldOutRoom = document.querySelector('.main-price-col .rateGroups .sold-out-room');
    let soldOutStandard;
    if(soldOutRoom) {
      soldOutStandard = soldOutRoom.innerText;
    }
    // console.log(soldOutStandard);
    if(soldOutStandard === "Our Standard Rooms are sold out") {
      console.log('Standard Rooms are sold out');
      return;
    } else {
      const roomTypes = document.querySelectorAll('.main-price-col .rateGroups .img-pad');
      if(roomTypes.length > 1) {
      const roomType = roomTypes[1].querySelector('.room-details').innerText.trim();
      // console.log(roomType, 'roomType');
      addMerchandising(roomType);
      }
    }


  });
}

export default () => {

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
