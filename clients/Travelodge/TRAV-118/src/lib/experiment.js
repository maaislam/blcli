/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, observer, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;
let allAvailableHotels;
let currentCurrency = 'GBP';
let currentCurrencyCode = '£';

if(window.location.href.indexOf('/search/') > -1) {
  currentCurrency = window.globalDataLayer.searchResultHotelCode.toLowerCase().indexOf('ie') > -1 ? 'EUR' : 'GBP';
  currentCurrencyCode = currentCurrency == 'GBP' ? '£' : '€';
} else {
  currentCurrency = window.globalDataLayer.hotelCode.toLowerCase().indexOf('ie') > -1 ? 'EUR' : 'GBP';
  currentCurrencyCode = currentCurrency == 'GBP' ? '£' : '€';
}

const processPrice = (thePrice) => {

  
  let thePriceArray = thePrice.split('.');
  thePrice = parseFloat(thePrice);

  let displayRounded = true;
  let theFirstNumeral = thePriceArray[0].split('').shift();
  let theFinalNumeral = thePriceArray[0].split('').pop();


  if(theFinalNumeral == 9) {

    let theNewPrice = Math.round(thePrice);
    let theNewPriceArray = theNewPrice.toString().split('.');
    let theNewFirstNumeral = theNewPriceArray[0].split('').shift();

    if(theNewFirstNumeral != theFirstNumeral) {
      displayRounded = false;
    }

  }

  return { "theUpdatedPrice": displayRounded == false ? thePriceArray : Math.round(thePrice), "displayRounded": displayRounded, "theRoundedPrice": Math.round(thePrice) };

}

const checkCurrentList = () => {

  let currNights = parseInt(window.globalDataLayer.night);

  allAvailableHotels = document.querySelectorAll('.search-page .qa-hotel.hotel-card');
  [].slice.call(allAvailableHotels).forEach((hotel) => {

    if (!hotel.classList.contains(`${ID}-priceupdated`)) {

      let currentCurrencyCode = '£';
      if (hotel.querySelector('.qa-now-price span').innerText.indexOf('€') > -1) {
        currentCurrencyCode = '€';
      }

      let thePrice = hotel.querySelector('.qa-now-price span').innerText.replace('£', '').replace('€', '').replace(',', '');
      let priceArray = processPrice(thePrice);
      hotel.classList.add(`${ID}-priceupdated`);

      hotel.querySelector('a.qa-book-now-url > span').innerText = "See availability";

      if(priceArray['displayRounded'] == true) {
        hotel.classList.add(`${ID}-rounded`);
        if(VARIATION == 1) {
          hotel.querySelector('.qa-now-price span').innerText = currentCurrencyCode + priceArray['theUpdatedPrice'];
        } else if(VARIATION == 2) {

          if(currNights > 1) {
            let fullPrice = priceArray['theUpdatedPrice'] / currNights;
            hotel.querySelector('.qa-now-price').classList.add(`${ID}-oneline`);
            hotel.querySelector('.qa-now-price span').innerHTML = `<span class="${ID}-originalprice">${currentCurrencyCode}${Math.round(fullPrice)}</span> <span class="${ID}-nightstext"> night</span><span class="${ID}-dot"></span><span class="${ID}-totalprice">${currentCurrencyCode}${priceArray['theUpdatedPrice']} total</span>`;
          } else {
            hotel.querySelector('.qa-now-price span').innerText = currentCurrencyCode + priceArray['theUpdatedPrice'];
          }

        }
        
      } else {
        hotel.classList.add(`${ID}-notrounded`);
        if (VARIATION == 1) {
          hotel.querySelector('.qa-now-price span').innerHTML = `${currentCurrencyCode}<span class="${ID}-numerals">${priceArray['theUpdatedPrice'][0]}</span><span class="${ID}-decimals">.${priceArray['theUpdatedPrice'][1]}</span>`;
        } else if (VARIATION == 2) {

          if (currNights > 1) {
            let fullPriceFloated = parseFloat(priceArray['theUpdatedPrice'][0] + '.' + priceArray['theUpdatedPrice'][1]); 
            let fullPrice = fullPriceFloated / currNights;
            fullPrice = fullPrice.toFixed(2);
            hotel.querySelector('.qa-now-price').classList.add(`${ID}-oneline`);
            hotel.querySelector('.qa-now-price span').innerHTML = `<span class="${ID}-originalprice">${currentCurrencyCode}${fullPrice}</span> <span class="${ID}-nightstext">/ night</span><span class="${ID}-dot"></span><span class="${ID}-totalprice">${currentCurrencyCode}${fullPriceFloated} total</span>`;
          } else {
            hotel.querySelector('.qa-now-price span').innerHTML = `${currentCurrencyCode}<span class="${ID}-numerals">${priceArray['theUpdatedPrice'][0]}</span><span class="${ID}-decimals">.${priceArray['theUpdatedPrice'][1]}</span>`;
          }

        }

        
      }
    } 

  });

  fireEvent('Interaction - prices were rounded on this search page', true);

}

const checkHotelPage = () => {

  let currNights = parseInt(window.globalDataLayer.night);

  let roundPrice = false;

  pollerLite(['#rebase .selectPrice'], () => {

    let allPriceElements = document.querySelectorAll('#rebase .selectPrice');

    // checking array
    [].slice.call(allPriceElements).forEach((element) => {

      let thePriceArray = element.innerText.replace(currentCurrencyCode, '').replace(',','').split('.');

      let theFirstNumeral = thePriceArray[0].split('').shift();
      let theFinalNumeral = thePriceArray[0].split('').pop();


      if (theFinalNumeral == 9) {

        let theNewPrice = Math.round(element.innerText.replace(currentCurrencyCode, '').replace(',', ''));
        let theNewPriceArray = theNewPrice.toString().split('.');
        let theNewFirstNumeral = theNewPriceArray[0].split('').shift();

        if (theNewFirstNumeral != theFirstNumeral) {
          roundPrice = true;
        }

      }
    
    });
    
    if (roundPrice == false) {

      fireEvent(`Interaction - prices were rounded on this hotel detail page`, true);
      // processing array
      [].slice.call(allPriceElements).forEach((element) => {
        let thePrice = element.innerText.replace(currentCurrencyCode, '').replace(',', '');
        let thePriceArray = processPrice(thePrice);
        if (roundPrice == false && !element.classList.contains(`${ID}-priceupdated`)) {

          if(VARIATION == 1) {
            let theNewPrice = thePriceArray['theUpdatedPrice'];
            element.classList.add(`${ID}-priceupdated`);
            element.innerText = currentCurrencyCode + theNewPrice;
          } else if(VARIATION == 2) {

            if(currNights > 1) {
              let currPricePerNightRate = element.innerText;
              let thePrice = currPricePerNightRate.replace(currentCurrencyCode, '').replace(',', '');
              let theAverageRate = thePrice / currNights;
              theAverageRate = Math.round(theAverageRate.toFixed(2));
              if(!element.closest('.row').querySelector(`.${ID}-ppn`)) {
                element.closest('.row').querySelector('.textarea > span').innerHTML += `&nbsp;&nbsp;<span class="${ID}-ppn">${currentCurrencyCode}${theAverageRate} per night</span>`;
              }

              element.classList.add(`${ID}-priceupdated`);
              element.classList.add(`${ID}-selectbox`);
              element.innerText = 'Select';

            } else {
              let theNewPrice = thePriceArray['theUpdatedPrice'];
              element.classList.add(`${ID}-priceupdated`);
              element.innerText = currentCurrencyCode + theNewPrice;
            }
            

          }

          
        } 
        
      });

    

      pollerLite(['#bookingSummary .total-price', '.js-room-total-amount'], () => {


        let allPricesWithinBookingSummary = document.querySelectorAll('#bookingSummary .value');

        [].slice.call(allPricesWithinBookingSummary).forEach((element) => {
          if(element.innerText.trim().toLowerCase() !== "free") {
            let thePrice = element.innerText.replace(currentCurrencyCode, '').replace(',', '');
            let thePriceArray = processPrice(thePrice);
            let theNewPrice = thePriceArray['theRoundedPrice'];
            element.classList.add(`${ID}-priceupdated`);
            element.innerText = currentCurrencyCode + theNewPrice;
          }
          


        });

        if(VARIATION == 2) {
          
          let totalPrice = document.querySelector('.js-room-total-amount').innerText.replace(currentCurrencyCode, '').replace(',', '');
          let fullPriceFloated = parseFloat(totalPrice);
          let fullPrice = fullPriceFloated / currNights;

          if (!document.querySelector(`.${ID}-avgprice`)) {
            document.querySelector('.night-breakdown').classList.add(`${ID}-hidden`);
            document.querySelector('.night-breakdown').insertAdjacentHTML('beforebegin', `
              <div class="${ID}-avgprice">
                <span class= "${ID}-originalprice">${currentCurrencyCode}${Math.round(fullPrice)} x ${currNights} nights</span> <span class="${ID}-totalprice">${currentCurrencyCode}${Math.round(fullPriceFloated)}</span>
              </div>
              <button id="${ID}-show-night-breakdown" class="${ID}-show-night-breakdown">View Night Breakdown</button>
            `);

            document.querySelector(`#${ID}-show-night-breakdown`).addEventListener('click', () => {
              document.querySelector(`.${ID}-avgprice`).remove();
              document.querySelector('.night-breakdown').classList.remove(`${ID}-hidden`);
              document.querySelector(`#${ID}-show-night-breakdown`).remove();
            });

          }
          


        }

      });


      if (window.globalDataLayer.adultsPerRoom.indexOf(';')) {


        // multiple rooms so process the total price

        pollerLite(['.js-room-total-amount'], () => {
          let totalPrice = document.querySelector('.js-room-total-amount')
          let thePrice = totalPrice.innerText.replace(currentCurrencyCode, '').replace(',', '');
          let thePriceArray = processPrice(thePrice);
          if (roundPrice == false) {
            let theNewPrice = thePriceArray['theUpdatedPrice'];
            totalPrice.classList.add(`${ID}-priceupdated`);
            totalPrice.innerText = theNewPrice;
          } 

        });
      }

    } else {
      fireEvent(`Interaction - prices were not rounded on this hotel detail page`, true);
    }
    
  });


}

const startExperiment = () => {


  if(window.location.href.indexOf('search') > -1) {
    checkCurrentList();
  } else {
    checkHotelPage();
  }
  

  if (window.location.href.indexOf('search') > -1) {

    setInterval(() => {
      if (document.querySelectorAll('.search-page .qa-hotel.hotel-card').length !== allAvailableHotels.length) {
        checkCurrentList();
      }

    }, 100);

  } else {

    setInterval(() => {
      if(document.querySelector('.total-price .value').innerText.indexOf('.') > -1) {
        checkHotelPage();
      }
      
    }, 100);
  }
  
}

const addTracking = () => {

  if (window.location.href.indexOf('search') > -1) {
    
    document.body.addEventListener('click', (e) => {

      if (e.target.closest('.qa-book-now-url') || e.target.classList.contains('qa-book-now-url')) {
        let wasRounded = e.target.closest('.qa-hotel.hotel-card').classList.contains(`${ID}-rounded`) ? true : false;
        fireEvent(`Click - see availability link clicked, price ${wasRounded == true ? 'rounded' : 'not rounded'}`, true);
      }
 
    });

  } else {
    
    //hotel detail page tracking

    document.body.addEventListener('click', (e) => {

      if (e.target.closest('.bookNow')) {
        fireEvent(`Click - Book Now button clicked with the user choosing: ${document.querySelector('.rate-btn.selected') ? document.querySelector('.rate-btn.selected').getAttribute('data-room-rate') : document.querySelector('.disc-rate-btn.selected').getAttribute('data-room-rate')} ${document.querySelector('.rate-btn.selected') ? document.querySelector('.rate-btn.selected').getAttribute('data-roomname') : document.querySelector('.disc-rate-btn.selected').getAttribute('data-roomname')} room with the ${document.querySelector('.rate-btn.selected') ? document.querySelector('.rate-btn.selected').getAttribute('data-rate-plan-code') : document.querySelector('.disc-rate-btn.selected').getAttribute('data-rate-plan-code')} rate`, true);
      }

      if (e.target.closest('.rate-btn')) {
        fireEvent(`Click - Rate button clicked, user has selected a ${e.target.closest('.rate-btn').getAttribute('data-room-rate')} ${e.target.closest('.rate-btn').getAttribute('data-roomname')} room with the ${e.target.closest('.rate-btn').getAttribute('data-rate-plan-code')} rate`, true);
      }

    });


  }



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

  addTracking();

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
