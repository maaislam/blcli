/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import bookingForm from './bookingForm';
import { pollerLite, events } from '../../../../../lib/utils';
import shared from '../../../NH048V2-control/src/lib/shared';

export default () => {
  setup();
  const URL = window.location.href;

  const { ID } = shared;

  /**
     * get the reference number
     * 
     * @param {String} seatType
     * @return {String}
     */
    const getRefNo = (seatType) => {
      let tourID;

      if (seatType === 'booking') {
          tourID = localStorage.getItem('NHXXXTrackedTourRef');
      } else if (seatType === 'quickview') {
          tourID = document.querySelector('#divQuickviewPopup .shortlist').getAttribute('data-tourref');
      } else if (seatType === 'itinery') {
        tourID = document.querySelector('.buttons .shortlist').getAttribute('data-tourref');
      }
      return tourID;
  }


  /**
   * get the number of seats
   * 
   * @param {String} tourRef
   * @return {number}
   */
  const getNumberOfSeats = (tourRef) => {
    const userData = JSON.parse(localStorage.getItem('NHXXXUserData'));
    const availableSeat = userData.available_seats[tourRef].seat_availability_as_seen;
    const obj = Object.keys(availableSeat);
    const lastKey = obj[obj.length -1];
    return availableSeat[lastKey];
  }

  const removeMessaging = () => {
    const seatMessage = document.querySelector('.NH048V2-scarcity_message');
    if(seatMessage) {
      seatMessage.remove();
    }
  }

  /**
   * Create the scarity messgae
   * 
   * @param {String} tourRef
   * @return {number}
   */
  const addMessaging = () => {
    const scarcityMessage = document.createElement('div');
    scarcityMessage.classList.add('NH048V2-scarcity_message');

    let numberOfSeats;
    if (URL.indexOf('search-results') > -1) {
      numberOfSeats = getNumberOfSeats(getRefNo('quickview'));
    } else if(URL.indexOf('itineraries') > -1) {
      numberOfSeats = getNumberOfSeats(getRefNo('itinery'));
    } else if(URL.indexOf('/OrderProcess') > -1) {
      numberOfSeats = getNumberOfSeats(getRefNo('booking'));
    }
  
    if(numberOfSeats < 15 && numberOfSeats !== 0) {
      if(numberOfSeats === 1) {
        scarcityMessage.innerHTML = `Hurry! Only ${numberOfSeats} seat left!`;
      } else {
        scarcityMessage.innerHTML = `Hurry! Only ${numberOfSeats} seats left!`;
      }
    }

    return scarcityMessage;
  }


  const availableSeatsRequest = (tourRef) => {
    return new Promise((res, rej) => {
      $.ajax({
        url:"/WebServices/SeatplanService.asmx/GetSeatplan?ref=UC",
        data: JSON.stringify({
          tourRef: tourRef
        }),
        type:"POST",
        contentType:"application/json",
        dataType:"json",
      }).success((data) => {
        const rows = ((data || {}).d || {}).Rows;
  
        if(rows) {
          let numAvailable = 0;
          rows.forEach((row) => {
            row.Seats.forEach((seat) => {
              if(seat && seat.Object == 1) {
                numAvailable += 1;
              }
            });
          });
  
          res(numAvailable);
        }
      });
    });
  };

  const onScrollOfEachResult = () => {
    const results = document.querySelectorAll('.result-item');
    for (let index = 0; index < results.length; index += 1) {
      const element = results[index];
      const productHeight = element.clientHeight;

      // check when each element comes in to view
      const inView = () => {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY || window.pageYOffset;

        const scrollPosition = scrollY + windowHeight;
        const ElPosition = element.getBoundingClientRect().top + scrollY + productHeight;

        if (scrollPosition > ElPosition) {
          return true;
        }
        return false;
      }

      if (!element.classList.contains(`${ID}-inView`) && inView()) {
        element.classList.add(`${ID}-inView`);
        const tourReference = element.querySelector('.result-content .buttons .shortlist').getAttribute('data-tourref');
        availableSeatsRequest(tourReference).then((numAvailable) => {
          if(numAvailable < 15 && numAvailable !== 0) {
            const scarcityMessage = document.createElement('div');
            scarcityMessage.classList.add('NH048V2-scarcity_message');
            scarcityMessage.innerHTML = `Hurry! Only ${numAvailable} seats left!`;
            element.querySelector('.itin-title').insertAdjacentElement('afterend', scarcityMessage);
            // add the messaging here
            // add a throttle to the scroll
            console.log(tourReference, numAvailable);
            }
        })
      } 
    } 
  }

   // trigger the scroll event for V2
   if(shared.VARIATION === '2') {
    document.addEventListener('scroll', onScrollOfEachResult); 
   }
  

  /* Itineries */
  if(URL.indexOf('itineraries') > -1) {
    document.addEventListener('NHXXX-itineraries-data-saved', () => {
      const numberOfSeatsAvailable = getNumberOfSeats(getRefNo('itinery'));
      const topSection = document.querySelector('.container .destination-box .clearfix');
      const seatArea = document.querySelector('.book-seats');
      const seatTitle = document.querySelector('.main-content .content .availability-wrap');  
      if(numberOfSeatsAvailable < 15  && numberOfSeatsAvailable !== 0) {
        if(!document.querySelector('.NH047-itineraries-title-wrap')) {
          if(!document.querySelector(`.NH048V2-scarcity_message`)){
            if(shared.VARIATION === '1') {
              if(window.innerWidth > 767) {
                seatTitle.insertAdjacentElement('beforebegin', addMessaging());
              } else {
                seatArea.insertAdjacentElement('beforebegin', addMessaging());
              }
            } else if (shared.VARIATION === '2') {
              topSection.insertAdjacentElement('afterend', addMessaging());
            }
            events.send(`NH048v2 v${shared.VARIATION}`, 'view', 'Scarcity Message on itinerary');
          }
        }
      }
    });
  }

  /* Search results */
  if (URL.indexOf('/search-results') > -1) {
    document.addEventListener('NHXXX-quickview-data-saved', () => {
        
        pollerLite(['#divQuickviewPopup .shortlist'], () => {

          const roomTypes = document.querySelector('.room-types');
          const bodyText = document.querySelector('.middle .itin-bodytext');
          const quickViewSeatArea = document.querySelector('#divQuickviewPopup .middle');
          const numberOfSeatsAvailable = getNumberOfSeats(getRefNo('quickview'));

          if(numberOfSeatsAvailable < 15 && numberOfSeatsAvailable !== 0) {
            if(!document.querySelector(`#divQuickviewPopup  .NH048V2-scarcity_message`)){
              if(shared.VARIATION === '1') {
                if(window.innerWidth > 767) {
                  quickViewSeatArea.insertAdjacentElement('afterbegin', addMessaging());
                } else {
                  roomTypes.insertAdjacentElement('afterend',  addMessaging());
                }
              } else if(shared.VARIATION === '2') {
                bodyText.insertAdjacentElement('beforebegin', addMessaging());
              }
              
              events.send(`NH048v2 v${shared.VARIATION}`, 'view', 'Scarcity Message on quickview');
            }
          } 
        });
      });

      // if box is closed, remove the message
      pollerLite(['#divQuickviewPopup .close-btn'], () => {
        const closeBox = document.querySelector('#divQuickviewPopup .close-btn');
        closeBox.addEventListener('click', () => {
          removeMessaging();
        });
      });

      // show the seats on the actual result
      if(shared.VARIATION === '2') {
        onScrollOfEachResult();
      }

  }
  
  /* Booking Form */
  if(shared.VARIATION === '1') {
    if(URL.indexOf('OrderProcess/SeatPlan.aspx') > -1) {
      bookingForm();
    }
  }

  if(shared.VARIATION === '2') {
    if(URL.indexOf('OrderProcess') > -1) {
      const numberOfSeatsAvailable = getNumberOfSeats(getRefNo('booking'));

      if(numberOfSeatsAvailable < 15 && numberOfSeatsAvailable !== 0) {
        if(!document.querySelector('.NH047-booking-title-wrap')) {
          if(window.innerWidth > 767) {
            const bookingSummary = document.querySelector('.right .box-with-border.white');
            bookingSummary.insertAdjacentElement('afterbegin', addMessaging());
          } else {
            const mainContent = document.querySelector('.main-content');
            mainContent.insertAdjacentElement('afterbegin', addMessaging());
          }
          events.send(`NH048v2 v${shared.VARIATION}`, 'view', 'Scarcity Message on booking process', {sendOnce: true});
        }
      }

    }
  }
};
