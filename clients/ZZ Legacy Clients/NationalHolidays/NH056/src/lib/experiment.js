/**
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import settings from './settings';
import pubSub from './PublishSubscribe';
import { events, eventFire } from './../../../../../lib/utils';
import { poller } from '../../../../../lib/uc-lib';

/**
 * Event listener stack
 */
const eventListeners = [];

/**
 * Helper reorder elms
 *
 * This is a bit tricky as NH014 is running independently of this...
 * 
 * An event has been added to NH014 so this will run when that is fired, but since we don't
 * know WHEN it fires, this function is potentially called twice
 *
 * Tidy up by removing moved elms and let NH014 do its thing and thereafter
 * move the appropriate elements (depending which of the quick view links they clicked)
 */
const reorder = (text) => {
  // Remove elms we previously moved as NH014 rebuilds them
  [].forEach.call(document.querySelectorAll(`.${settings.ID}-moved`), (movedElm) => {
    movedElm.remove();
  });

  // Sometimes we get duplicates owing to NH014, so remove them
  const hotelDivs = document.querySelectorAll('.nh14-travel-div.nh14-hotel-div');
  for(var i = hotelDivs.length - 1; i > 0; i--) {
    hoteDivs[i].remove();
  }
  const travelDivs = document.querySelectorAll('.nh14-travel-div:not(.nh14-hotel-div)');
  for(var i = travelDivs.length - 1; i > 0; i--) {
    travelDivs[i].remove();
  }

  const travelDiv = document.querySelector('#divQuickviewPopup .seat-availability ~ .nh14-travel-div:not(.nh14-hotel-div)');
  const hotelDiv = document.querySelector('#divQuickviewPopup .seat-availability ~ .nh14-hotel-div');

  const seeMoreDates = document.querySelector('#divQuickviewPopup .see-more-dates');

  if(seeMoreDates) {
    if(text === 'departurepoints') {
      if(hotelDiv) {
        hotelDiv.classList.add(`${settings.ID}-moved`);
        seeMoreDates.insertAdjacentElement('afterend', hotelDiv);
      }
      if(travelDiv) {
        travelDiv.classList.add(`${settings.ID}-moved`);
        seeMoreDates.insertAdjacentElement('afterend', travelDiv);
      }

      pubSub.publish('did-reorder-departure-points');

    } else if(text === 'roomtypes') {
      if(travelDiv) {
        travelDiv.classList.add(`${settings.ID}-moved`);
        seeMoreDates.insertAdjacentElement('afterend', travelDiv);
      }
      if(hotelDiv) {
        hotelDiv.classList.add(`${settings.ID}-moved`);
        seeMoreDates.insertAdjacentElement('afterend', hotelDiv);
      }

      pubSub.publish('did-reorder-room-types');
    }
  }

  eventFire(window, `${settings.ID.toLowerCase()}didmoveelmsinquickview`);
};

/**
 * Handle tour link clicked
 */
const tourLinkClicked = (link) => {
  const text = link.innerText.trim().replace(/\s/g, '').toLowerCase();

  pubSub.publish('did-click-tour-link', text);

  eventListeners.forEach((e) => {
    e.elm.removeEventListener(e.name, e.listener)
  });

  reorder(text);

  // Now, the reordering may need to happen on ajax complete request
  // Event added to NH014 so listen for that
  const listener = () => {
    reorder(text);
  }

  eventListeners.push({
    elm: document,
    name: 'nh14didbuildcore',
    listener: listener
  });

  document.addEventListener('nh14didbuildcore', listener);
};

/**
 * Entry point for experiment
 */
const activate = () => {
  events.setTrackerName('tracker2');

  setup();

  // Iterate over result items and tour links
  const resultItems = document.querySelectorAll('.result-item');
  [].forEach.call(resultItems, (resultItem) => {
    const elmContainingTourId = resultItem.querySelector('[data-tourid]');
    if(elmContainingTourId) {
      resultItem.dataset[`${settings.ID.toLowerCase()}tourid`] = elmContainingTourId.dataset.tourid;
    }

    const tourLinks = resultItem.querySelectorAll('a.quick-view');
    [].forEach.call(tourLinks, (tourLink) => {
      tourLink.addEventListener('click', (e) => {
        tourLinkClicked(e.currentTarget);
      });
    });
  });
};

export default activate;
