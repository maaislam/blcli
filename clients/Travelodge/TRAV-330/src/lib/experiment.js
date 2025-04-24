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
import expressWrapper from './components/expressWrapper';
import message from './components/message';
import toolTip from './components/tooltip';
import { onUrlChange } from './helpers/utils';

import roomTypeConfig from './roomTypeConfig';

const { ID, VARIATION } = shared;

const init = () => {
  if (window.globalDataLayer.bookWindow !== 0) {
    return;
  }

  fireEvent('User is no search page');
  const allHotels = document.querySelectorAll(`.container .hotel-card:not(.${ID}__existing-hotel)`);
  allHotels.forEach((hotel) => {
    const card = hotel.querySelector('.card');
    const roomAlsoAvailableElem = hotel.querySelector('[data-room-also-available]');
    const roomAvailability = roomAlsoAvailableElem && roomAlsoAvailableElem.getAttribute('data-room-also-available');

    if (!card || !roomAvailability) return;
    hotel.classList.add(`${ID}__existing-hotel`);
    const availableButton = hotel.querySelector('.qa-book-now-url');
    const buttonLink = availableButton.href.includes('checkIn') ? availableButton.href : window.location.href;
    const hotelCode = hotel.getAttribute('data-hotel-code');
    const bookingParams = new URLSearchParams(buttonLink.split('?')[1]);

    const roomTypeElem = hotel.querySelector('[data-room-code]');
    const roomTypeCode = roomTypeElem.getAttribute('data-room-code');
    //drop searchLocation from the query string
    bookingParams.delete('searchLocation');

    //check number of "[adults]" in the query string
    // Loop through all parameters
    Array.from(bookingParams.entries()).forEach(([key]) => {
      if (key.includes('[adults]')) {
        // Extract the room index from the key
        const match = key.match(/\[([0-9]+)\]\[adults\]/);
        if (match) {
          const roomIndex = match[1]; // Get room index from key

          bookingParams.set(`rooms[${roomIndex}][roomCode]`, roomTypeCode);
          bookingParams.set(`rooms[${roomIndex}][ratePlanCode]`, 'SAVER');
        }
      }
    });

    //check checkin value

    const atcUrl = `/ocb/${hotelCode}?${bookingParams.toString()}`;

    const buttonWrapper = availableButton.closest('div');

    //console.log('🚀 ~ allHotels.forEach ~ atcUrl:', atcUrl);
    buttonWrapper.classList.add(`${ID}__availableButtonWrapper`);

    const hasUrgencyMsg = !!hotel.querySelector('.qa-availability--low-availability');

    //console.log('🚀 ~ allHotels.forEach ~ hasUrgencyMsg:', hasUrgencyMsg);

    if (!card.querySelector(`.${ID}__expressWrapper`)) {
      card.insertAdjacentHTML('beforeend', expressWrapper(ID, atcUrl, hasUrgencyMsg));
    }

    if (!buttonWrapper.querySelector(`.${ID}__expressIcon`)) {
      buttonWrapper.insertAdjacentHTML('afterbegin', toolTip(ID));
    }

    if (!card.querySelector(`.${ID}__message`)) {
      const roomType = roomTypeConfig[roomTypeCode];

      //console.log('🚀 ~ allHotels roomType:', roomType);
      //get price

      const priceElem = hotel.querySelector('.qa-now-price');

      card.querySelector('.align--xs').insertAdjacentHTML('beforeend', message(ID, roomType));
      card.querySelector(`.${ID}__price .${ID}__text`).innerText = priceElem.innerText;
    }

    const cloneCard = card.cloneNode(true);
    cloneCard.classList.add(`${ID}__card`);

    if (!hotel.querySelector(`.${ID}__card`)) {
      hotel.querySelector('.well > .row').insertAdjacentElement('beforeend', cloneCard);
    }
  });

  const toolTips = document.querySelectorAll(`.card:not(.${ID}__card) .${ID}__expressIcon svg`);
  const allcards = document.querySelectorAll(`.card:not(.${ID}__card)`);

  const onOverHandler = (e) => {
    const wrapper = e.target.closest('.card');
    wrapper.classList.add('open');
    fireEvent('User hovers on info icon');
  };

  const onleaveHandler = (e) => {
    const wrapper = e.target.closest('.card');
    wrapper.classList.remove('open');
  };

  // Add a mouseover event listener
  toolTips.forEach((item) => {
    item.removeEventListener('mouseover', (e) => onOverHandler(e));
    item.addEventListener('mouseover', (e) => onOverHandler(e));
  });

  allcards.forEach((card) => {
    card.removeEventListener('mouseleave', (e) => onleaveHandler(e));
    card.addEventListener('mouseleave', (e) => onleaveHandler(e));
  });
};

export default () => {
  setup();

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}__message`) || (target.closest(`.open.card`) && !target.closest(`.${ID}__expressButton`))) {
      e.stopPropagation();
      e.preventDefault();
    }

    if (target.closest(`.${ID}__button`)) {
      e.stopPropagation();
      fireEvent('User clicks ‘express booking’');
    } else if (target.closest(`.${ID}__expressIcon svg`) && target.closest(`.${ID}__card`)) {
      e.stopPropagation();

      const wrapper = target.closest(`.${ID}__card`);
      wrapper.classList.toggle('open');
      fireEvent('User clicks on info icon');
    } else if (target.closest('.qa-book-now-url') && target.closest('.card')) {
      fireEvent('User clicks ‘see availability’');
    } else if (target.closest('button[data-target-title="Add extras"]')) {
      fireEvent('User interacts with ‘add extras’');
    }
  });
  if (VARIATION == 'control') {
    if (window.location.pathname.includes('/search/results')) {
      fireEvent('User is no search page');
      return;
    }
  }

  pollerLite(
    [
      () => window.location.pathname.includes('/search/results'),
      () => document.querySelectorAll('.container .hotel-card') && document.querySelectorAll('.container .hotel-card').length,
    ],
    () => init()
  );
  window.addEventListener('scroll', () => {
    pollerLite(
      [
        () =>
          document.querySelectorAll(`.container .hotel-card:not(.${ID}__existing-hotel)`) &&
          document.querySelectorAll(`.container .hotel-card:not(.${ID}__existing-hotel)`).length,
      ],
      () => setTimeout(init, 2000)
    );
  });

  onUrlChange(() => {
    pollerLite(
      [
        () => window.location.pathname.includes('/search/results'),
        () => document.querySelectorAll('.container .hotel-card') && document.querySelectorAll('.container .hotel-card').length,
      ],
      () => setTimeout(init, 2000)
    );
  });
};
