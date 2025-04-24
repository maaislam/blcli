import {
  fullStory
} from '../../../../../lib/utils';
import {addResetButton, reset} from './resetButton';
import settings from './settings';

const {
  ID,
  VARIATION
} = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

function arrayPolyfill() {
  if (!Array.from) {
    Array.from = (function () {
      var toStr = Object.prototype.toString;
      var isCallable = function (fn) {
        return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
      };
      var toInteger = function (value) {
        var number = Number(value);
        if (isNaN(number)) {
          return 0;
        }
        if (number === 0 || !isFinite(number)) {
          return number;
        }
        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
      };
      var maxSafeInteger = Math.pow(2, 53) - 1;
      var toLength = function (value) {
        var len = toInteger(value);
        return Math.min(Math.max(len, 0), maxSafeInteger);
      };

      // The length property of the from method is 1.
      return function from(arrayLike /*, mapFn, thisArg */ ) {
        // 1. Let C be the this value.
        var C = this;

        // 2. Let items be ToObject(arrayLike).
        var items = Object(arrayLike);

        // 3. ReturnIfAbrupt(items).
        if (arrayLike == null) {
          throw new TypeError('Array.from requires an array-like object - not null or undefined');
        }

        // 4. If mapfn is undefined, then let mapping be false.
        var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
        var T;
        if (typeof mapFn !== 'undefined') {
          // 5. else
          // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
          if (!isCallable(mapFn)) {
            throw new TypeError('Array.from: when provided, the second argument must be a function');
          }

          // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
          if (arguments.length > 2) {
            T = arguments[2];
          }
        }

        // 10. Let lenValue be Get(items, "length").
        // 11. Let len be ToLength(lenValue).
        var len = toLength(items.length);

        // 13. If IsConstructor(C) is true, then
        // 13. a. Let A be the result of calling the [[Construct]] internal method 
        // of C with an argument list containing the single item len.
        // 14. a. Else, Let A be ArrayCreate(len).
        var A = isCallable(C) ? Object(new C(len)) : new Array(len);

        // 16. Let k be 0.
        var k = 0;
        // 17. Repeat, while k < len… (also steps a - h)
        var kValue;
        while (k < len) {
          kValue = items[k];
          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }
          k += 1;
        }
        // 18. Let putStatus be Put(A, "length", len, true).
        A.length = len;
        // 20. Return A.
        return A;
      };
    }());
  }
}

function setRooms(){
  let roomsArray = [];
  let curAvailability;
  let roomType;
  let roomName;
  const rooms = document.querySelectorAll('.left .sml-tbl .room-list-cont .field-row:not(.sold-out)');
  Array.from(rooms).forEach(function(room){
    const curAvailableRooms = room.querySelector('.cell.one select').length -1;
    const curRoomType = room.querySelector('.cell.two').textContent.trim();
    if(curRoomType.indexOf('Single') > -1 || curRoomType.indexOf('Request') > -1){
      roomName = curRoomType.toLowerCase().replace(/ /g, '-');
      roomType = 'single';
      room.querySelector('.cell.one select').setAttribute('data-room', roomName);
      curAvailability = curAvailableRooms;
      roomsArray.push({type: roomType, name:roomName, availability: curAvailability});
    } else if (curRoomType.indexOf('Twin') > -1){
      roomName = curRoomType.toLowerCase().replace(/ /g, '-');
      roomType = 'twin';
      room.querySelector('.cell.one select').setAttribute('data-room', roomName);
      curAvailability = curAvailableRooms;
      roomsArray.push({type: roomType, name:roomName, availability: curAvailability});
    } else if (curRoomType.indexOf('Double') > -1){
      roomName = curRoomType.toLowerCase().replace(/ /g, '-');
      roomType = 'double';
      room.querySelector('.cell.one select').setAttribute('data-room', roomName);
      curAvailability = curAvailableRooms;
      roomsArray.push({type: roomType, name:roomName, availability: curAvailability});
    } else if(curRoomType.indexOf('4') > -1){
      roomName = curRoomType.toLowerCase().replace(/ /g, '-');
      roomType = 'quadruple';
      room.querySelector('.cell.one select').setAttribute('data-room', roomName);
      curAvailability = curAvailableRooms;
      roomsArray.push({type: roomType, name:roomName, availability: curAvailability});
    } else {
      roomName = curRoomType.toLowerCase().replace(/ /g, '-');
      roomType = 'triple';
      room.querySelector('.cell.one select').setAttribute('data-room', roomName);
      curAvailability = curAvailableRooms;
      roomsArray.push({type: roomType, name:roomName, availability: curAvailability});
    }
  });
  localStorage.setItem('availableRooms', JSON.stringify(roomsArray));
}

function sortGuests(value) {
  let newVal;
  const guests = JSON.parse(localStorage.getItem('guests'));
  switch (value) {
    case 'single':
      newVal = parseInt(guests) - 1;
      if (newVal <= 0) {
        newVal = 0;
        localStorage.setItem('guests', JSON.stringify(newVal));
        document.querySelector(`.${ID}_rooms__addButton`).remove();
        document.querySelector('#btnContinue').classList.remove(`${ID}_disabled`);
        document.querySelector('#btnContinue').removeAttribute('disabled');
      }
      localStorage.setItem('guests', JSON.stringify(newVal));
      break;
    case 'double':
      newVal = parseInt(guests) - 2;
      if (newVal <= 0) {
        newVal = 0;
        localStorage.setItem('guests', JSON.stringify(newVal));
        document.querySelector(`.${ID}_rooms__addButton`).remove();
        document.querySelector('#btnContinue').classList.remove(`${ID}_disabled`);
        document.querySelector('#btnContinue').removeAttribute('disabled');
      }
      localStorage.setItem('guests', JSON.stringify(newVal));
      break;
    case 'triple':
      newVal = parseInt(guests) - 3;
      if (newVal <= 0) {
        newVal = 0;
        localStorage.setItem('guests', JSON.stringify(newVal));
        document.querySelector(`.${ID}_rooms__addButton`).remove();
        document.querySelector('#btnContinue').classList.remove(`${ID}_disabled`);
        document.querySelector('#btnContinue').removeAttribute('disabled');
      }
      localStorage.setItem('guests', JSON.stringify(newVal));
      break;
    case 'quadruple':
      newVal = parseInt(guests) - 4;
      if (newVal <= 0) {
        newVal = 0;
        localStorage.setItem('guests', JSON.stringify(newVal));
        document.querySelector(`.${ID}_rooms__addButton`).remove();
        document.querySelector('#btnContinue').classList.remove(`${ID}_disabled`);
        document.querySelector('#btnContinue').removeAttribute('disabled');
      }
      localStorage.setItem('guests', JSON.stringify(newVal));
      break;
    default:
      break;
  }
}

function generateNotice(selector) {
  const element = document.createElement('div');
  element.classList.add(`${ID}_info__noticeWrap`);
  element.innerHTML = `
    <span class="${ID}_info__notice">Supplements apply from time to time, <label for="supplementTrigger">Why?</label></span>
    <input type="checkbox" id="supplementTrigger" name="supplementTrigger">
    <label for="supplementTrigger" class="${ID}_dialogWrap">
      <div class="${ID}_dialog">
        <div class="${ID}_dialog__header">
          <h3 class="${ID}_dialog__title">Why do we charge a room supplement?</h3>
        </div>
        <div class="${ID}_dialog__body">
          <p class="${ID}_dialog__content">Many of our selected hotels levy varying charges for some rooms e.g. for single bedroom occupancy or premium rooms.</p>
          <div class="${ID}_dialog__buttonWrap">
            <label for="supplementTrigger" class="${ID}_dialog__button">OK</label>
          </div>
        </div>
      </div>
    </label>
  `;
  selector.querySelector(`.${ID}_info`).insertAdjacentElement('beforeend', element);
}

function generateError(option) {
  const element = document.createElement('div');
  element.classList.add(`${ID}_info__noticeWrap`);
  element.classList.add(`${ID}_info__noticeWrap--error`);
  element.innerHTML = `
    <input type="checkbox" id="errorTrigger" name="errorTrigger">
    <label for="${option ? '' : 'errorTrigger'}" class="${ID}_dialogWrap">
      <div class="${ID}_dialog">
        <div class="${ID}_dialog__header">
          <h3 class="${ID}_dialog__title">${option ? 'The number of guests is more than the availability.' : 'No single occupancy rooms available'}</h3>
          <label for="errorTrigger" id="close">&times;</label>
        </div>
        <div class="${ID}_dialog__body">
          <p class="${ID}_dialog__content">${option ? 'We\'re very sorry but there are no rooms for your number of guests on this holiday.' : 'We\'re very sorry but there are no more single occupancy rooms on this holiday.'}</p>
          <div class="${ID}_dialog__buttonWrap">
            <a href="https://www.ukbreakaways.com" for="errorTrigger" class="${ID}_dialog__button">Return to Homepage</a>
          </div>
          ${option ? '' : '<label for="errorTrigger" id="continue">or continue on this page</label>'}
        </div>
      </div>
    </label>
  `;
  document.body.insertAdjacentElement('beforeend', element);
  setTimeout(function () {
    document.querySelector('#errorTrigger').click();
  }, 250);
  const actions = ['#close', '#continue'];
  actions.forEach(function (action) {
    if (document.querySelector(action)) {
      document.querySelector(action).addEventListener('click', function () {
        setTimeout(function () {
          document.querySelector(`.${ID}_info__noticeWrap`).remove();
        }, 250);
      });
    }
  });
}

function addListeners() {
  const roomsAvailable = document.querySelectorAll('.left .sml-tbl .room-list-cont .field-row:not(.sold-out)');
  const roomsSelect = document.querySelectorAll(`.${ID}_room__select`);
  Array.from(roomsSelect).forEach(function (roomSelect) {
    let value;
    const content = [
      'This room accomodates 2 guests, in a double-width bed.',
      'This room accomodates 1 guest, in a single-width bed.',
      'This room accomodates 3 guests.',
      'This room accomodates 2 guests, in 2 single-size beds.',
      'This room accomodates 4 guests.',
    ];
    roomSelect.removeEventListener('change', roomSelect);
    roomSelect.addEventListener('change', function (e) {
      const info = document.createElement('div');
      const charge = e.target.options[e.target.selectedIndex].getAttribute('data-charge');
      const dataBindRoom = e.target.options[e.target.selectedIndex].getAttribute('data-bindroom');
      const optionContent = e.target.options[e.target.selectedIndex].textContent;
      value = e.target.options[e.target.selectedIndex].value;
      switch (value) {
        case 'double':
          if (optionContent.indexOf('Twin') > -1) {
            info.classList.add(`${ID}_infoWrap`);
            info.innerHTML = `
            <div class="${ID}_info twin">
              <img class="${ID}_info__img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAmVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjHWqVAAAAMnRSTlMAu0TviNLoPBDzKBj5q4MMCgKx3tdcBnBX7Mu2l4VqSR0VwrqOd2Ii9ePFooBGMy17VA+WPuIAAAJWSURBVHja7dnpjqJAFIbhT2hABBUEwX1fW7vtPvd/cTMhdoVYpbYZOWUm9dzA9ybnDwsMwzAMQ5ZZm6+3Cqy7nzHuaxxsqoy7CnBbNAqpUv5XjBuCAVVu2MZV9ZQYLDNcEdeIxQpXdInJJ5SyhJgMoTQlNjOojIjNBCoDYnOAiktsllAJiY0DFbrKBJgAE/DKAbtQZ0Bz2gbmvYWmgL2Hs56vI2Awh9DY8we811EyS7gDFhfPtoHDGzCMAKmAMWAZQTJ3+AIWYt9y060oSLkC3sX9PZ/IbYgrpAwB0n65YJYwBEj7UkHFAWm9vH9ZsO1XHeA3yvtywbTqgPHFvlQwrDgguNiXCqxqA5yLfbkgCisNaKKw9UmSRCikHAFTUpj9a0Bt/W3dc0IhtmTez3Wse7qtAwzDUDmtR50ag84o30JmDYjR8IQLa+IVTqRvhNxylGyIX2hBaLukgROLgAlpMRUBS9JiJAL6pMUAZxnpscdZnfSwTYAJMAEm4GUCItLDxQ+ftHCkf6bMmiLgSFp0RcA2JA3cNoQVaTABhGxB7Joom7MXNCOgLGvtiFE/hyTIa/uQGITJcFKHYRgKRy+IwSCbTXOoJMSmA5UlsXmDyoTYeFCZ28TEiaG0JiYfUIs7xGKMa9osBasYV8V5nyqWfOOm+qaT9u2QCr79FDsq7GzXOfQy/Mb5FD08xZgKRwh6AlraAlqPBzRfJKD7fwWMtQUcHw9YUcHCU3SpsMHvfYjX12cI+vSXHeABb0Rkf+BJLJfItfCQz3wT4Gkiz4tgGIZhGC/qD7l6Ms9TOyANAAAAAElFTkSuQmCC" class="${ID}_info__img">
              <img class="${ID}_info__img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAmVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjHWqVAAAAMnRSTlMAu0TviNLoPBDzKBj5q4MMCgKx3tdcBnBX7Mu2l4VqSR0VwrqOd2Ii9ePFooBGMy17VA+WPuIAAAJWSURBVHja7dnpjqJAFIbhT2hABBUEwX1fW7vtPvd/cTMhdoVYpbYZOWUm9dzA9ybnDwsMwzAMQ5ZZm6+3Cqy7nzHuaxxsqoy7CnBbNAqpUv5XjBuCAVVu2MZV9ZQYLDNcEdeIxQpXdInJJ5SyhJgMoTQlNjOojIjNBCoDYnOAiktsllAJiY0DFbrKBJgAE/DKAbtQZ0Bz2gbmvYWmgL2Hs56vI2Awh9DY8we811EyS7gDFhfPtoHDGzCMAKmAMWAZQTJ3+AIWYt9y060oSLkC3sX9PZ/IbYgrpAwB0n65YJYwBEj7UkHFAWm9vH9ZsO1XHeA3yvtywbTqgPHFvlQwrDgguNiXCqxqA5yLfbkgCisNaKKw9UmSRCikHAFTUpj9a0Bt/W3dc0IhtmTez3Wse7qtAwzDUDmtR50ag84o30JmDYjR8IQLa+IVTqRvhNxylGyIX2hBaLukgROLgAlpMRUBS9JiJAL6pMUAZxnpscdZnfSwTYAJMAEm4GUCItLDxQ+ftHCkf6bMmiLgSFp0RcA2JA3cNoQVaTABhGxB7Joom7MXNCOgLGvtiFE/hyTIa/uQGITJcFKHYRgKRy+IwSCbTXOoJMSmA5UlsXmDyoTYeFCZ28TEiaG0JiYfUIs7xGKMa9osBasYV8V5nyqWfOOm+qaT9u2QCr79FDsq7GzXOfQy/Mb5FD08xZgKRwh6AlraAlqPBzRfJKD7fwWMtQUcHw9YUcHCU3SpsMHvfYjX12cI+vSXHeABb0Rkf+BJLJfItfCQz3wT4Gkiz4tgGIZhGC/qD7l6Ms9TOyANAAAAAElFTkSuQmCC" class="${ID}_info__img">  
              <p class="${ID}_info__content">${content[3]}</p>
            </div>
          `;
          } else {
            info.classList.add(`${ID}_infoWrap`);
            info.innerHTML = `
            <div class="${ID}_info">
              <img class="${ID}_info__img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAh1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD3YishAAAALHRSTlMARCJmiDMvEgP8GLD2ydSp8Nmbk21bQcV9eyYd7Offt4N1VDoqCffPoothDVTN8tYAAAH8SURBVGje7dnbjrIwFIbhT4EpexAV9zrud+v+r+/HGkcnmZb+iYVkZj1HDSF5U9qsE8AYY4wxxv6ca/dtrjC1GycxvVGcTHaoNysCer+sixqbmKw4DKG1JmvW2v2SRZo9T2OyKFafc0RWZVD4IMs+FGGXLPtUhFOyLMWP/IAsC3z8JKSnNOu7Sv3VnF7MV7p3o5SeQv3dyidd6PllRHQXlT70uuP863Zpw4WAgXJJlWUJA+JkEA4GMCMSopGAmUFQG17DlEiPV5ha14Uz3PkzT2X32OZ0ijux81RmPu4yfTieyWVY5KRxHOLF8EgaeRHiZhZrw3258hZU4+R/XfAT1Vh4uOlrw1tUxOI/pt8n1VrIs9nqwnPfdGbHIaTwYDqj/bkmnMhFjwxcIDlkoIebRBOOzGe2C8k1n9GRKiwcpyPDjoktpK1jQoY7jiPA/piw7DSqDO/ZiBoXVWnRoxb0BM7UChdLasUSAbUiALWEwyoc5jCHOcxhDitxmMMc5jCHCQdqRYyEWpHgQq24AAW1oEBlOMqpUfloiIcB3XiwypORAV4lVOnBspQqI7zo0s0Ylo1lZqp4YslzfxPFN7BAcaLPU7dFeYddqgQhrAsDqrjff9Gv0IAVVSI8TKiyQQM232/XPqPgjEacA8r2eBJ7NGTPP0QYY4wxxn6/f95ZIQb/rRzEAAAAAElFTkSuQmCC" class="${ID}_info__img">
              <p class="${ID}_info__content">${content[0]}</p>
            </div>
          `;
          }
          if (!e.target.parentNode.querySelector(`.${ID}_infoWrap`)) {
            e.target.insertAdjacentElement('afterend', info);
          } else {
            e.target.parentNode.querySelector(`.${ID}_infoWrap`).remove();
            e.target.insertAdjacentElement('afterend', info);
          }
          if (charge) {
            generateNotice(e.target.parentNode);
          }
          sortGuests(value);
          break;
        case 'triple':
          info.classList.add(`${ID}_infoWrap`);
          info.innerHTML = `
          <div class="${ID}_info">
            <p class="${ID}_info__content">${content[2]}</p>
          </div>
        `;
          if (!e.target.parentNode.querySelector(`.${ID}_infoWrap`)) {
            e.target.insertAdjacentElement('afterend', info);
          } else {
            e.target.parentNode.querySelector(`.${ID}_infoWrap`).remove();
            e.target.insertAdjacentElement('afterend', info);
          }
          if (charge) {
            generateNotice(e.target.parentNode);
          }
          sortGuests(value);
          break;
        case 'single':
          info.classList.add(`${ID}_infoWrap`);
          info.innerHTML = `
          <div class="${ID}_info">
            <img class="${ID}_info__img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAmVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjHWqVAAAAMnRSTlMAu0TviNLoPBDzKBj5q4MMCgKx3tdcBnBX7Mu2l4VqSR0VwrqOd2Ii9ePFooBGMy17VA+WPuIAAAJWSURBVHja7dnpjqJAFIbhT2hABBUEwX1fW7vtPvd/cTMhdoVYpbYZOWUm9dzA9ybnDwsMwzAMQ5ZZm6+3Cqy7nzHuaxxsqoy7CnBbNAqpUv5XjBuCAVVu2MZV9ZQYLDNcEdeIxQpXdInJJ5SyhJgMoTQlNjOojIjNBCoDYnOAiktsllAJiY0DFbrKBJgAE/DKAbtQZ0Bz2gbmvYWmgL2Hs56vI2Awh9DY8we811EyS7gDFhfPtoHDGzCMAKmAMWAZQTJ3+AIWYt9y060oSLkC3sX9PZ/IbYgrpAwB0n65YJYwBEj7UkHFAWm9vH9ZsO1XHeA3yvtywbTqgPHFvlQwrDgguNiXCqxqA5yLfbkgCisNaKKw9UmSRCikHAFTUpj9a0Bt/W3dc0IhtmTez3Wse7qtAwzDUDmtR50ag84o30JmDYjR8IQLa+IVTqRvhNxylGyIX2hBaLukgROLgAlpMRUBS9JiJAL6pMUAZxnpscdZnfSwTYAJMAEm4GUCItLDxQ+ftHCkf6bMmiLgSFp0RcA2JA3cNoQVaTABhGxB7Joom7MXNCOgLGvtiFE/hyTIa/uQGITJcFKHYRgKRy+IwSCbTXOoJMSmA5UlsXmDyoTYeFCZ28TEiaG0JiYfUIs7xGKMa9osBasYV8V5nyqWfOOm+qaT9u2QCr79FDsq7GzXOfQy/Mb5FD08xZgKRwh6AlraAlqPBzRfJKD7fwWMtQUcHw9YUcHCU3SpsMHvfYjX12cI+vSXHeABb0Rkf+BJLJfItfCQz3wT4Gkiz4tgGIZhGC/qD7l6Ms9TOyANAAAAAElFTkSuQmCC" class="${ID}_info__img">
            <p class="${ID}_info__content">${content[1]}</p>
          </div>
        `;
          if (!e.target.parentNode.querySelector(`.${ID}_infoWrap`)) {
            e.target.insertAdjacentElement('afterend', info);
          } else {
            e.target.parentNode.querySelector(`.${ID}_infoWrap`).remove();
            e.target.insertAdjacentElement('afterend', info);
          }
          if (charge) {
            generateNotice(e.target.parentNode);
          }
          sortGuests(value);
          break;
        case 'quadruple':
          info.classList.add(`${ID}_infoWrap`);
          info.innerHTML = `
          <div class="${ID}_info">
            <p class="${ID}_info__content">${content[4]}</p>
          </div>
        `;
          if (!e.target.parentNode.querySelector(`.${ID}_infoWrap`)) {
            e.target.insertAdjacentElement('afterend', info);
          } else {
            e.target.parentNode.querySelector(`.${ID}_infoWrap`).remove();
            e.target.insertAdjacentElement('afterend', info);
          }
          if (charge) {
            generateNotice(e.target.parentNode);
          }
          sortGuests(value);
          break;
        default:
          break;
      }
      const target = document.querySelector(`[data-room="${dataBindRoom}"]`);
      const targetIndex = target.selectedIndex;
      const newIndex = targetIndex + 1;
      target.selectedIndex = newIndex;
      const availableRooms = JSON.parse(localStorage.getItem('availableRooms'));
      for (let i = 0; i < availableRooms.length; i += 1) {
        if (availableRooms[i].name == dataBindRoom) {
          const tot = parseInt(availableRooms[i].availability);
          availableRooms[i].availability = tot - 1;
          localStorage.setItem('availableRooms', JSON.stringify(availableRooms))
        }
      }
    });
  });
}

function generateOptions(checkStorage) {
  let options = '';
  const optionsList = document.querySelectorAll('.left .sml-tbl .room-list-cont .field-row');
  const availableRooms = JSON.parse(localStorage.getItem('availableRooms'));
  Array.from(optionsList).forEach(function (option) {
    let curAvailability;
    const isSoldOut = option.classList.contains('sold-out');
    const roomType = option.querySelector('.cell.two').textContent.trim();
    const cleanRoomType = roomType.toLowerCase().trim().replace(/\s/g, '-');
    const roomCapacity = option.querySelector('.cell.three').textContent.trim();
    const roomCharge = option.querySelector('.cell.four').textContent.trim();
    const opt = document.createElement('option');
    if (isSoldOut) {
      opt.setAttribute('disabled', 'disabled');
    }
    if (checkStorage) {
      for (let i = 0; i < availableRooms.length; i += 1) {
        curAvailability = availableRooms[i].availability;
        if (availableRooms[i].name == cleanRoomType && curAvailability <= 0) {
          opt.setAttribute('disabled', 'disabled');
        }
      }
    }
    opt.setAttribute('data-bindroom', cleanRoomType);
    const cleanCharge = roomCharge.replace('£', '');
    if (cleanCharge !== '0.00') {
      opt.setAttribute('data-charge', true);
    }
    if (roomType) {
      if (roomCapacity.indexOf('3') > -1) {
        opt.setAttribute('value', 'triple');
      } else if (roomCapacity.indexOf('1') > -1) {
        opt.setAttribute('value', 'single');
      } else if (roomCapacity.indexOf('4') > -1) {
        opt.setAttribute('value', 'quadruple');
      } else {
        opt.setAttribute('value', 'double');
      }
      opt.textContent = `${roomType}. ${roomCapacity}${cleanCharge !== '0.00' ? `, ${roomCharge}` : ''}`;
      options += opt.outerHTML;
    }
  });
  return options;
}

function generateRooms(n) {
  localStorage.setItem('guests', JSON.stringify(n));
  const boxes = document.querySelectorAll('.left .box-with-border');
  if (boxes.length === 4) {
    document.querySelector(`.left .box-with-border:nth-child(3)`).removeAttribute('style');
  } else {
    document.querySelector(`.left .box-with-border:nth-child(2)`).removeAttribute('style');
  }
  const element = document.createElement('div');
  element.classList.add(`${ID}_roomsWrap`);
  element.innerHTML = `
    <div class="${ID}_rooms">
      <div class="${ID}_roomWrap">
        <div class="${ID}_room field-row">
          <label class="${ID}_room__label">Select a room</label>
          <select class="${ID}_room__select">
            <option value="none" selected="true" disabled="disabled">Please Select</option>
            ${generateOptions()}
          </select>
        </div>
      </div>
      <div class="${ID}_rooms__addButtonWrap">
        <div class="${ID}_rooms__addButton">Add a new room</div>
      </div>
    </div>
  `;
  if (!document.querySelector(`.${ID}_roomsWrap`)) {
    if (boxes.length === 4) {
      document.querySelector('.left .box-with-border:nth-child(3) .sml-tbl').insertAdjacentElement('beforebegin', element);
    } else {
      document.querySelector('.left .box-with-border:nth-child(2) .sml-tbl').insertAdjacentElement('beforebegin', element);
    }
  } else {
    document.querySelector(`.${ID}_roomsWrap`).remove();
    if (boxes.length === 4) {
      document.querySelector('.left .box-with-border:nth-child(3) .sml-tbl').insertAdjacentElement('beforebegin', element);
    } else {
      document.querySelector('.left .box-with-border:nth-child(2) .sml-tbl').insertAdjacentElement('beforebegin', element);
    }
  }
  if(!document.querySelector(`.${ID}_resetWrap`)){
    addResetButton();
  }
  // add add button listener
  const addButton = document.querySelector(`.${ID}_rooms__addButton`);
  addButton.addEventListener('click', function (e) {
    const newRoom = document.createElement('div');
    newRoom.classList.add(`${ID}_roomWrap`);
    newRoom.innerHTML = `
      <div class="${ID}_room field-row">
        <label class="${ID}_room__label">Select a room</label>
        <select class="${ID}_room__select">
          <option value="none" selected="true" disabled="disabled">Please Select</option>
          ${generateOptions(true)}
        </select>
      </div>
    `;
    e.target.parentNode.insertAdjacentElement('beforebegin', newRoom);
    addListeners(n);
  });
  addListeners(n);
}

function sumPeople(obj) {
  const values = [];
  let result;
  let total = 0;
  Object.keys(obj).forEach(function (key) {
    values.push(obj[key]);
    result = total;
  });
  values.forEach(function (num) {
    total += num;
  });
  result = total;
  generateRooms(result);
}

function checkPeople() {
  const toCheck = ['ddlAdults', 'ddlChildren'];
  const people = {
    adults: 0,
    children: 0,
  };
  let value;
  for (let i = 0; i < toCheck.length; i += 1) {
    document.querySelector(`.left #${toCheck[i]}`).addEventListener('change', function (e) {
      const items = [
        'single-en-suite-room',
        'single-sea-view',
        'single-scenic',
        'double-en-suite-room',
        'double-sea-view',
        'double-premier-sea-view',
        'double-standard-plus-sea-view',
        'twin-sea-view',
        'twin-standard-plus',
        'twin-en-suite-room',
        'three-bedded-en-suite-room',
      ]
      items.forEach(function (item) {
        if (localStorage.getItem(item)) {
          localStorage.removeItem(item);
        }
      });
      value = e.target.options[e.target.selectedIndex].value;
      const totRooms = JSON.parse(localStorage.getItem('availableRooms'));
      const sum = [];
      for (let i = 0; i < totRooms.length; i += 1) {
        switch (totRooms[i].type) {
          case 'single':
            sum.push(parseInt(totRooms[i].availability));
            break;
          case 'twin':
            sum.push(2 * parseInt(totRooms[i].availability));
            break;
          case 'double':
            sum.push(2 * parseInt(totRooms[i].availability));
            break;
          case 'triple':
            sum.push(3 * parseInt(totRooms[i].availability));
            break;
          case 'quadruple':
            sum.push(4 * parseInt(totRooms[i].availability));
            break;
          default:
            break;
        }
      }
      let total = 0;
      sum.forEach(function (num) {
        total += num;
      });
      if (value > total) {
        generateError(true);
      }
      const availableRooms = JSON.parse(localStorage.getItem('availableRooms'));
      const roomsArray = [];
      for (let i = 0; i < availableRooms.length; i += 1) {
        roomsArray.push(availableRooms[i].type);
      }
      if (roomsArray.indexOf('single') === -1 && value % 2 != 0) {
        generateError();
      }
      if (e.target.id === toCheck[0]) {
        people.adults = parseInt(value);
        sumPeople(people);
      } else {
        people.children = parseInt(value);
        sumPeople(people);
      }
    });
  }
}

export {
  setup,
  generateRooms,
  checkPeople,
  arrayPolyfill,
  setRooms,
  sumPeople,
}; // eslint-disable-line
