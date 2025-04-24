/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import extraInfo from './components/extraInfo';
import modalInfo from './components/modalInfo';

const { ID, VARIATION } = shared;

const incrementCheckOut = (url) => {
  // Extract the checkOut date from the URL using a regular expression
  const checkOutRegex = /checkOut=(\d{2}\/\d{2}\/\d{2})/;
  const match = url.match(checkOutRegex);

  if (!match) {
    return url; // Return the original URL if no checkOut date is found
  }

  // Parse the current checkOut date
  const currentDate = match[1].split('/');
  const day = parseInt(currentDate[0]);
  const month = parseInt(currentDate[1]) - 1; // Month is 0-based in JavaScript Date
  const year = 2000 + parseInt(currentDate[2]); // Assuming '24' is '2024'

  // Create a new Date object and add one day
  const date = new Date(year, month, day);
  date.setDate(date.getDate() + 1);

  // Format the new date as DD/MM/YY
  const newDay = String(date.getDate()).padStart(2, '0');
  const newMonth = String(date.getMonth() + 1).padStart(2, '0'); // Month is 1-based
  const newYear = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year

  const newCheckOut = `${newDay}/${newMonth}/${newYear}`;

  // Replace the old checkOut date with the new one in the URL
  return url.replace(checkOutRegex, `checkOut=${newCheckOut}`);
};

const renderModal = (extraCost, totalWithAdditionalNight) => {
  pollerLite([() => document.querySelector('#modal') && document.querySelector('#modal').classList.contains('show')], () => {
    const modalWrapper = document.querySelector('#modal');
    modalWrapper.classList.add(`${ID}__show`);
    const modalTitle = modalWrapper.querySelector('.modal-header .title1');
    modalTitle.textContent = 'Extend your stay';
    const formAcionURL = modalWrapper.querySelector('form#frmCheckout');
    const updatedUrl = incrementCheckOut(formAcionURL.action);
    formAcionURL.action = updatedUrl;
    //console.log(updatedUrl);
    const modalContent = modalWrapper.querySelector('.modal-body .modalExtras');
    if (!document.querySelector(`.${ID}__modalInfo`)) {
      modalContent.insertAdjacentHTML('beforeend', modalInfo(ID, extraCost, totalWithAdditionalNight));
    }
  });
};

const init = (extraCost) => {
  const bookingListConatiner = document.querySelector('#main .checkout-booking-summary-container');
  const bookingList = bookingListConatiner.querySelectorAll('.checkout-booking-summary');

  bookingList.forEach((booking) => {
    const bookingSummeryList = booking.querySelectorAll('.checkout-summary-box > div');

    bookingSummeryList.forEach((info) => {
      if (info.innerText.toLowerCase().includes('sunday') && info.innerText.includes(`Check-out`)) {
        info.classList.add(`${ID}__addExtraInfo`);
      }
    });

    const newInfo = booking.querySelector(`.${ID}__addExtraInfo`);

    newInfo && newInfo.insertAdjacentHTML('beforeend', extraInfo(ID, extraCost));
  });
};

export default () => {
  const data = window.globalDataLayer;

  const { totalToPay, totalWithAdditionalNight, basketCheckOutDay, basketTotalRooms } = data;

  const extraCost = Number(totalWithAdditionalNight) - Number(totalToPay);

  if (extraCost <= 0 || extraCost >= 50 || basketCheckOutDay !== 'Sunday' || basketTotalRooms !== '1') return;

  setup();
  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}__date`) || target.closest(`.${ID}__extraPrice`)) {
      const clickedItem = target.closest(`.${ID}__infoWrapper`);
      const wrapper = clickedItem.closest('.checkout-booking-summary');
      const roomsContainer = wrapper.querySelector('.rooms-container');
      const amendExtraButton = roomsContainer.querySelector('.amend-extras > button');
      amendExtraButton.click();
      renderModal(extraCost, totalWithAdditionalNight);
    } else if ((target.closest('.btnCancel') || target.closest('.close')) && target.closest(`.${ID}__show`)) {
      setTimeout(() => {
        document.getElementById('modal').classList.remove(`${ID}__show`);
      }, 500);
    } else if (target.closest(`.${ID}__extendButton`)) {
      const controlSaveButton = document.querySelector('.btnSaveExtraSummary');
      controlSaveButton.click();
      //const cancelBtn = document.querySelector('.btnCancel');
      //cancelBtn.click();
    } else if (target.closest(`.${ID}__cancelButton`)) {
      const cancelBtn = document.querySelector('.btnCancel');
      cancelBtn.click();
    }
  });

  if (VARIATION == 'control') {
    return;
  }


  init(extraCost);
};
