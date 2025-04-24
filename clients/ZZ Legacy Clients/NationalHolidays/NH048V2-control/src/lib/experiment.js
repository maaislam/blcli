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

export default () => {
  setup();
  const URL = window.location.href;

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
    }

    return scarcityMessage;
  }


  if (URL.indexOf('/search-results') > -1) {
      document.addEventListener('NHXXX-quickview-data-saved', () => {
        pollerLite(['#divQuickviewPopup .shortlist'], () => {
          const numberOfSeatsAvailable = getNumberOfSeats(getRefNo('quickview'));
          if(numberOfSeatsAvailable < 15) {
            events.send('NH048v2 control', 'view', 'Scarcity Message on quickview');
          }
        });
      });
  }

  if(URL.indexOf('itineraries') > -1) {
    document.addEventListener('NHXXX-itineraries-data-saved', () => {
      const numberOfSeatsAvailable = getNumberOfSeats(getRefNo('itinery'));
      if(numberOfSeatsAvailable < 15) {
        if(!document.querySelector('.NH047-itineraries-title-wrap')) {
          events.send('NH048v2 control', 'view', 'Scarcity Message on itinerary');
        }
      }
    });
  }

  if(URL.indexOf('OrderProcess/SeatPlan.aspx') > -1) {
    bookingForm();
  }
};
