import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import calendarInput from './components/calendarInput';
import modal from './components/modal/modal';
import roomSelector from './components/rooms/roomSelector';
import searchButton from './components/searchButton/searchButton';
import searchContainer from './components/searchContainer/searchContainer';
import modalOpenHandler from './handlers/modalOpenHandler';
import roomControlHandler from './handlers/roomControlHandler';
import roomInputHandler from './handlers/roomInputHandler';
import roomQuantityHandler from './handlers/roomQuantityHandler';
import searchButtonHandler from './handlers/searchButtonHandler';
import searchInputHanlder from './handlers/searchInputHanlder';
import populateFieldsBasedOnPage from './helpers/populateSearch/populateFieldsBasedOnPage';
import renderStayAgain from './helpers/renderStayAgain';
import resetAllRooms from './helpers/resetAllRooms';
import updateRoomLabel from './helpers/updateRoomLabel';
import { convertTimestampToDate, getCheckInOutDates, getDateWithOffset, loggedIn } from './helpers/utils';

const { ID, VARIATION } = shared;

const { pathname } = window.location;
if (pathname.includes('/search/results')) {
  document.body.classList.add('searchResultsPage');
} else if (pathname.includes('/hotels')) {
  document.body.classList.add('hotelDetailsPage');
}

//insert all necessary HTML

const disableBubbles = () => {
  const checkinSelected = document.querySelector('.datepicker__month-day--first-day-selected');
  const allBubbles = document.querySelectorAll(`[data-type="checkout"] .${ID}__bic-nightBubbles--bubble`);
  if (!checkinSelected) {
    //add disabled class to all bubbles
    allBubbles.forEach((bubble) => {
      bubble.classList.add('disabled');
    });
    return;
  }
  //else remove disabled class from all bubbles
  allBubbles.forEach((bubble) => {
    bubble.classList.remove('disabled');
  });
};

const setSelectedBubble = (numberOfNights) => {
  //add selected class to the bubble
  const matchingBubble = document.querySelector(`.${ID}__bic-nightBubbles--bubble[data-value="${numberOfNights}"]`);
  const allBubbles = document.querySelectorAll(`.${ID}__bic-nightBubbles--bubble`);
  console.log(' ~ setSelectedBubble ~ matchingBubble:', matchingBubble);
  allBubbles.forEach((bubble) => {
    bubble.classList.remove('disabled');
    bubble.classList.remove('selected');
  });
  if (matchingBubble) {
    matchingBubble.classList.add('selected');
  }
};
const updateDateInput = (formatedDates) => {
  const checkinDate = document.querySelector(`.${ID}-checkin`);
  const checkoutDate = document.querySelector(`.${ID}-checkout`);

  checkinDate.textContent = formatedDates.checkIn;
  checkoutDate.textContent = formatedDates.checkOut;
};

const init = () => {
  const attachPoint = document.querySelector('#main');
  //search container

  const container = () => `
    <div class="${ID}__wrapper">
      <div class="${ID}__container">
        ${searchContainer(ID)}
        ${calendarInput(ID)}
        ${roomSelector(ID)}
        ${searchButton(ID)}
      </div>
    </div>
  `;

  if (!document.querySelector(`.${ID}__searchContainer`)) {
    attachPoint.insertAdjacentHTML('afterbegin', container());
    //search input handler
    const searchInput = document.querySelector(`.${ID}__search-input`);
    searchInputHanlder(ID, searchInput);

    //stay again rendering if user logged in
    const isLoggedIn = loggedIn();

    if (isLoggedIn) {
      renderStayAgain(ID);
    }
  }
  if (!window.HotelDatepicker) return;

  // const attachPoint = document.querySelector('.formSearchWidget');

  // attachPoint.insertAdjacentHTML('afterend', calendarInput(ID));
  //room selector
  // attachPoint.insertAdjacentHTML('afterend', roomSelector(ID));

  const input = document.getElementById('calendar-input');
  const datepicker = new window.HotelDatepicker(input, {
    startOfWeek: 'monday',
    clearButton: true,
    selectForward: true,
    submitButton: true,
    submitButtonName: 'Next',
    topbarPosition: 'bottom',
    maxNights: 28,
    endDate: '04-11-2025 ',
    format: 'DD-MM-YYYY',
    onOpenDatepicker: function () {
      const selectedVal = this.getValue();
      console.log(' ~ init ~ selectedVal:', selectedVal);
      if (!selectedVal) {
        disableBubbles();
        return;
      }
      const formatedDates = getCheckInOutDates(selectedVal);
      console.log(' ~ init ~ formatedDates:', selectedVal, formatedDates);
      setSelectedBubble(this.getNights());
    },
    onSelectRange: function () {
      const formatedDates = getCheckInOutDates(this.getValue());
      updateDateInput(formatedDates);
      setSelectedBubble(this.getNights());
    },
    onDayClick: function () {
      console.log('Day clicked!');
      disableBubbles();
    },
  });

  window.datepicker = datepicker;
  console.log(' ~ init ~ datepicker:', datepicker.getValue());

  const datePickerElem = window.datepicker.getDatePicker();
  datePickerElem.insertAdjacentElement('afterbegin', document.querySelector(`.${ID}__bic-nightBubbles`));

  const fuseOptions = {
    minMatchCharLength: 2,
    shouldSort: false,
    ignoreLocation: true,
    threshold: 0.1,
    useExtendedSearch: true,
    keys: ['Option'],
  };
  const fuse = new window.Fuse(window.autoCompleteData, fuseOptions);
  console.log(' ~ init ~ fuse:', fuse);

  window.fuse = fuse;

  //add modal
  if (!document.querySelector(`.${ID}__modal`)) {
    document.body.insertAdjacentHTML('beforeend', modal(ID));
  }
};

export default () => {
  setup();

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    console.log('target: ', target);

    if (target.closest(`.${ID}___bic-datepicker--daterange`) && !window.datepicker.isOpen) {
      modalOpenHandler(ID, target);
      window.datepicker.open();
    } else if (target.closest(`.${ID}___bic-datepicker--daterange`) && window.datepicker.isOpen) {
      window.datepicker.close();
    } else if (target.closest(`.${ID}__bic-nightBubbles--bubble`) && target.closest('[data-type="checkout"]')) {
      const value = Number(target.getAttribute('data-value'));
      const checkinSelected = document.querySelector('.datepicker__month-day--first-day-selected');
      if (checkinSelected) {
        //get check in date
        const checkinDateTimestamp = Number(checkinSelected.getAttribute('time'));

        const chekInDate = convertTimestampToDate(checkinDateTimestamp);

        const checkOutDate = getDateWithOffset(checkinDateTimestamp, value);
        // console.log('clicked data', chekInDate, checkOutDate);

        window.datepicker.setRange(chekInDate, checkOutDate);
        const formatedDates = getCheckInOutDates(window.datepicker.getValue());
        updateDateInput(formatedDates);
      }
    } else if (target.closest(`.${ID}__bic-nightBubbles--bubble`) && target.closest('[data-type="checkin"]')) {
      const value = Number(target.getAttribute('data-value'));
      if (value === 0) {
        const todayElem = document.querySelector('.datepicker__month-day--today');
        todayElem.click();
      } else if (value === 1) {
        const todayElem = document.querySelector('.datepicker__month-day--today + .datepicker__month-day');
        todayElem.click();
      }
    } else if (target.closest(`.${ID}__roomAccordionHeader`)) {
      const roomAccordionHeaderElem = target.closest(`.${ID}__roomAccordionHeader`);
      const roomContent = roomAccordionHeaderElem.nextElementSibling;
      roomContent.classList.toggle(`${ID}__content-active`);
    } else if (target.closest(`.${ID}__plusBtn`) || target.closest(`.${ID}__minusBtn`)) {
      //quantity control
      const isPlus = target.closest(`.${ID}__plusBtn`);
      const singleRoomControlElem = target.closest(`.${ID}__control`);
      const roomControlElem = target.closest(`.${ID}__roomsControl`);

      if (singleRoomControlElem) {
        roomQuantityHandler(ID, isPlus, singleRoomControlElem); //this is for adult and children
      } else {
        roomQuantityHandler(ID, isPlus, roomControlElem); //this is for Rooms control
        roomControlHandler(ID, isPlus);
      }

      updateRoomLabel(ID);
    } else if (target.closest(`.${ID}__resetBtn`)) {
      //reset button
      resetAllRooms(ID);
    } else if (target.closest(`.${ID}__addNewRoomLink`)) {
      //reset button
      const addNewRoomLinkElem = target.closest(`.${ID}__addNewRoomLink`);
      const contentElem = target.closest(`.${ID}__content`);
      const roomTooltipWrapperElem = addNewRoomLinkElem.closest(`.${ID}__roomTooltipWrapper`);
      roomTooltipWrapperElem.style.display = 'none';
      contentElem.classList.remove(`${ID}__content--tooltip`);
      roomControlHandler(ID, true);
    } else if (target.closest(`.${ID}__roomInput`)) {
      modalOpenHandler(ID, target);
      roomInputHandler(ID, target);
    } else if (target.closest(`.${ID}__searchResults-item`)) {
      const searchResultItemElem = target.closest(`.${ID}__searchResults-item`);
      const searchInputElem = document.querySelector(`.${ID}__search-input`);
      searchInputElem.value = searchResultItemElem.textContent;
    } else if (target.closest(`.${ID}__closeWrapper`)) {
      const modal = document.querySelector(`.${ID}__modal`);
      const searchWrapperWithinModal = modal.querySelector(`.${ID}__container`);
      const searchWrapper = document.querySelector(`.${ID}__wrapper`);
      modal.classList.remove(`${ID}__open`);
      modal.classList.add(`${ID}__closing`);
      searchWrapper.insertAdjacentElement('beforeend', searchWrapperWithinModal);
    } else if (target.closest(`.${ID}__mainSearchBtn`)) {
      searchButtonHandler(ID);
    } else if (target.closest(`.${ID}__popularDestinations-item`)) {
      const popularDestinationElem = target.closest(`.${ID}__popularDestinations-item`);
      const destinationTitle = popularDestinationElem.querySelector(`.${ID}__destinationTitle`);
      const searchInputElem = document.querySelector(`.${ID}__search-input`);
      searchInputElem.value = destinationTitle.textContent;
    }
    
    if (target.closest(`.${ID}__searchBtn`)) {
      console.log('search button clicked');
      searchButtonHandler(ID);
    }
    //outside of room input click - close room input
    if (!target.closest(`.${ID}__roomInput`)) {
      const roomInputElem = document.querySelector(`.${ID}__roomInput`);
      const roomLabelElem = roomInputElem.querySelector(`.${ID}__roomLabel`);
      const roomsElem = roomInputElem.querySelector(`.${ID}__rooms`);
      const roomSelectorElem = roomInputElem.querySelector(`.${ID}__roomSelector`);

      roomInputElem?.classList.remove(`${ID}__roomInput-active`);
      roomSelectorElem?.classList.remove(`${ID}__roomSelector-active`);
      
      roomLabelElem?.classList.remove(`${ID}__hide`);
      roomInputElem?.classList.add(`${ID}__roomInput-success`);
      roomsElem?.classList.add(`${ID}__hide`);
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  pollerLite([() => typeof window.HotelDatepicker === 'function'], () => {
    init();
    
    populateFieldsBasedOnPage(ID);
  });
};
