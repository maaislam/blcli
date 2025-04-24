import {
  fullStory
} from '../../../../../lib/utils';
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

function watchDiscount() {
  if (document.querySelector('.multi_break')) {
    const reg = /\d+/;
    const discounts = JSON.parse(localStorage.getItem('discounts'));
    const curItemsString = document.querySelector('#price_totals .grid_items span').textContent;
    const match = reg.exec(curItemsString);
    const curitems = parseInt(match[0]);
    const newLine = document.createElement('p');
    newLine.classList.add(`${ID}_discountNotice`);
    newLine.innerHTML = '<sup>*</sup>If you want to add more than one colour, your bulk buy discount will be applied in the basket.';
    if (parseInt(discounts[0]) > curitems) {
      document.querySelector(`.${ID}_discountInfo`).innerHTML = '';
    } else if (parseInt(discounts[0]) == curitems) {
      document.querySelector(`.${ID}_discountInfo`).innerHTML = `<strong>${parseInt(discounts[1]) - curitems} product<small>(s)</small></strong> to go to your next discount!<sup>*</sup>`;
    } else if (parseInt(discounts[1]) > curitems) {
      document.querySelector(`.${ID}_discountInfo`).innerHTML = `<strong>${parseInt(discounts[1]) - curitems} product<small>(s)</small></strong> to go to your next discount!<sup>*</sup>`;
    } else if (parseInt(discounts[1]) == curitems) {
      document.querySelector(`.${ID}_discountInfo`).innerHTML = `<strong>${parseInt(discounts[2]) - curitems} product<small>(s)</small></strong> to go to your next discount!<sup>*</sup>`;
    } else if (parseInt(discounts[2]) > curitems) {
      document.querySelector(`.${ID}_discountInfo`).innerHTML = `<strong>${parseInt(discounts[2]) - curitems} product<small>(s)</small></strong> to go to your next discount!<sup>*</sup>`;
    } else if (parseInt(discounts[2]) == curitems) {
      document.querySelector(`.${ID}_discountInfo`).innerHTML = `<strong>${parseInt(discounts[3]) - curitems} product<small>(s)</small></strong> to go to your next discount!<sup>*</sup>`;
    } else if (parseInt(discounts[3]) > curitems) {
      document.querySelector(`.${ID}_discountInfo`).innerHTML = `<strong>${parseInt(discounts[3]) - curitems} product<small>(s)</small></strong> to go to your next discount!<sup>*</sup>`;
    } else if (parseInt(discounts[3]) == curitems) {
      document.querySelector(`.${ID}_discountInfo`).innerHTML = `<strong>${parseInt(discounts[4]) - curitems} product<small>(s)</small></strong> to go to your next discount!<sup>*</sup>`;
    } else if (parseInt(discounts[4]) > curitems) {
      document.querySelector(`.${ID}_discountInfo`).innerHTML = `<strong>${parseInt(discounts[4]) - curitems} product<small>(s)</small></strong> to go to your next discount!<sup>*</sup>`;
    } else if (parseInt(discounts[4]) <= curitems) {
      document.querySelector(`.${ID}_discountInfo`).innerHTML = 'You\'ve reached your max discount rate for this purchase.';
    }
    if(!document.querySelector(`.${ID}_discountNotice`) && parseInt(discounts[0]) == curitems){
      document.querySelector(`.${ID}_discountInfo`).insertAdjacentElement('afterend', newLine);
    }
  }
}

function resetSelection(id){
  const sizes = document.querySelectorAll(`.switch-image-row .qty_grid`);
  [].forEach.call(sizes, function(size){
    size.value = 0;
    size.focus();
    size.blur();
  });
  watchDiscount();
}

function setDiscounts() {
  const maxPrice = document.querySelector('#price_totals .grid_break span').textContent;
  const el = document.createElement('div');
  el.classList.add(`${ID}_fromPriceWrap`);
  el.innerHTML = `
    <div class="${ID}_fromPrice">
      From: ${maxPrice}
    </div>
  `;
  document.querySelector('#prodpage_title').insertAdjacentElement('afterbegin', el);
  if (document.querySelector('.multi_break')) {
    const discountEl = document.querySelector('.price_breaks');
    const discounts = discountEl.querySelectorAll('.multi_break');
    const discountGaps = [];
    const reg = /\d+/;
    let discountGap;
    let curVal;
    [].forEach.call(discounts, function (discount) {
      curVal = discount.textContent.trim();
      discountGap = reg.exec(curVal);
      discountGaps.push(discountGap[0]);
    });
    localStorage.setItem('discounts', JSON.stringify(discountGaps));
    watchDiscount();
  }
}

function currentTotal() {
  let discounts;
  if (document.querySelector('.multi_break')) {
    discounts = true;
  }
  let total;
  let maxElements;
  let curElements;
  const element = document.createElement('div');
  const sizes = document.querySelectorAll('#product_grid .switch-image-row .colourcell .qty_grid');
  element.classList.add(`${ID}_block__right`);
  element.innerHTML = `
    <h4 class="${ID}_currentTotal">Current Total: <strong>£0</strong></h4>
    ${discounts ? `
    <span class="${ID}_discountInfo"><strong>N°</strong> to go to your next discount!<sup>*</sup></span>
    ` : ''}
  `;
  document.querySelector(`.${ID}_blockWrap[data-type="size"] .${ID}_block__body`).insertAdjacentElement('beforeend', element);
  [].forEach.call(sizes, function (size) {
    size.addEventListener('blur', function () {
      total = document.querySelector('#price_totals .grid_total span').innerText.trim();
      document.querySelector(`.${ID}_currentTotal strong`).innerText = '£' + total;
    });
  });
  setDiscounts();
}

function addEvents() {
  let buttonAction;
  let target;
  let curTarget;
  let value;
  let newValue;
  const buttons = document.querySelectorAll(`.${ID}_block__button`);
  const inputs = document.querySelectorAll(`.${ID}_block__input`);
  [].forEach.call(buttons, function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      buttonAction = e.target.getAttribute('value');
      target = e.target.getAttribute('data-bind');
      if (target) {
        if (buttonAction === 'remove') {
          curTarget = document.getElementById('product_grid').querySelector(`[data-newsku="${target}"]`);
          value = parseInt(curTarget.value);
          if (value > 0) {
            newValue = value - 1;
          } else {
            newValue = 0;
          }
          curTarget.value = newValue;
          curTarget.focus();
          curTarget.blur();
          e.target.parentElement.parentElement.querySelector(`.${ID}_block__input`).value = newValue;
          watchDiscount();
        } else {
          curTarget = document.getElementById('product_grid').querySelector(`[data-newsku="${target}"]`);
          value = parseInt(curTarget.value);
          if (isNaN(value) || value === '') {
            value = 0;
          }
          newValue = value + 1;
          curTarget.value = newValue;
          curTarget.focus();
          curTarget.blur();
          e.target.parentElement.parentElement.querySelector(`.${ID}_block__input`).value = newValue;
          watchDiscount();
        }
      } else {
        target = e.target.getAttribute('data-bind');
        if (buttonAction === 'remove') {
          curTarget = document.getElementById('product_grid').querySelector(`[data-size="${target}"]`);
          value = parseInt(curTarget.value);
          if (value > 0) {
            newValue = value - 1;
          } else {
            newValue = 0;
          }
          curTarget.value = newValue;
          curTarget.focus();
          curTarget.blur();
          e.target.parentElement.parentElement.querySelector(`.${ID}_block__input`).value = newValue;
        } else {
          curTarget = document.getElementById('product_grid').querySelector(`[data-size="${target}"]`);
          value = parseInt(curTarget.value);
          if (isNaN(value) || value === '') {
            value = 0;
          }
          newValue = value + 1;
          curTarget.value = newValue;
          curTarget.focus();
          curTarget.blur();
          e.target.parentElement.parentElement.querySelector(`.${ID}_block__input`).value = newValue;
        }
      }
    });
  });
  [].forEach.call(inputs, function (input) {
    input.addEventListener('keyup', function (e) {
      target = e.target.getAttribute('data-bind');
      if (target) {
        value = e.target.value;
        target = e.target.getAttribute('data-bind');
        curTarget = document.getElementById('product_grid').querySelector(`[data-newsku="${target}"]`);
        curTarget.value = value;
        setTimeout(function () {
          curTarget.focus();
          curTarget.blur();
          watchDiscount();
        }, 1000);
      } else {
        target = e.target.getAttribute('data-bind');
        value = e.target.value;
        target = e.target.getAttribute('data-bind');
        curTarget = document.getElementById('product_grid').querySelector(`[data-size="${target}"]`);
        curTarget.value = value;
        setTimeout(function () {
          curTarget.focus();
          curTarget.blur();
        }, 1000);
      }
    });
  });
}

function bindSizes(el) {
  let curElToBindParent;
  let elToBind;
  let curElement;
  let dataBind;
  let curSize;
  if (localStorage.getItem('sizeModifiers')) {
    const sizeModifiers = JSON.parse(localStorage.getItem('sizeModifiers'));
    const list = document.querySelector(`.${ID}_block__list[data-tempid="${el}"]`);
    [].forEach.call(sizeModifiers, function (element, i) {
      curElement = list.querySelector(`.${ID}_block__listItem:nth-child(${i + 1})`);
      curSize = curElement.querySelector(`.${ID}_block__label`).textContent;
      curElement.querySelector(`.${ID}_block__label`).innerText = curSize + '-' + element;
    });
  }
  addEvents();
}

function generateSizeList(el) {
  document.querySelector(`.${ID}_blockWrap[data-type="size"] .${ID}_block__list`).innerHTML = '';
  /*
   * Generate a record for each different size variation -> 36"R, 36"S, 36"L
   */
  let modifiersArray = [];
  let curModifier;
  const modifier = document.querySelectorAll('#product_grid thead tr th');
  [].forEach.call(modifier, function (element) {
    if (element.querySelector('strong small').innerText != '') {
      curModifier = element.querySelector('strong small').textContent.trim();
      modifiersArray.push(curModifier);
    }
  });
  if (modifiersArray.length > 0) {
    localStorage.setItem('sizeModifiers', JSON.stringify(modifiersArray));
  }
  /**
   * Generate a new list of sizes
   */
  let newList;
  let row;
  if (el) {
    row = document.querySelector(`.switch-image-row[data-colourid="${el}"]`);
  } else {
    row = document.querySelector('.switch-image-row');
  }
  const sizes = row.querySelectorAll('.colourcell');
  let stockLevel;
  let size;
  let classes;
  let htmlBlock;
  let dataSku;
  let newSku;
  [].forEach.call(sizes, function (element, i) {
    if (element.childNodes.length != 0) {
      if (element.querySelector('.qty_grid')) {
        size = element.querySelector('.qty_grid').getAttribute('data-size');
        classes = element.querySelector('.qty_grid').classList;
        dataSku = element.querySelector('.qty_grid').getAttribute('data-sku');
        newSku = dataSku.replace(/\s/g, '');
        element.querySelector('.qty_grid').setAttribute('data-newsku', newSku);
      }
      if (classes.value.indexOf('mid-stock') > -1) {
        stockLevel = 'mid';
      } else if (classes.value.indexOf('low-stock') > -1) {
        stockLevel = 'low';
      } else {
        stockLevel = 'full';
      }
      htmlBlock = document.createElement('li');
      htmlBlock.classList.add(`${ID}_block__listItem`);
      htmlBlock.innerHTML = `
        <span class="${ID}_block__label">${size}</span>
        <div class="${ID}_block__actionsWrap" data-stock="${stockLevel}">
          <div class="${ID}_block__actions">
            <div class="${ID}_block__buttonWrap">
              <button data-bind="${newSku}" class="${ID}_block__button" value="remove">-</button>
            </div>
            <input data-bind="${newSku}" type="text" placeholder="0" min="0" class="${ID}_block__input">
            <div class="${ID}_block__buttonWrap">
              <button data-bind="${newSku}" class="${ID}_block__button" value="add">+</button>
            </div>
          </div>
        </div>
      `;
      if (el) {
        document.querySelector(`.${ID}_blockWrap[data-type="size"] .${ID}_block__list`).setAttribute('data-tempid', el);
      }
      document.querySelector(`.${ID}_blockWrap[data-type="size"] .${ID}_block__list`).insertAdjacentElement('beforeend', htmlBlock);
    }
  });
  bindSizes(el);
}

function sizeSelect(param) {
  const priceData = document.querySelector('.price_breaks_data');
  if (document.querySelector('#product_grid')) {
    const sizeLink = document.querySelector('#product_grid h2 small a').href;
    const element = document.createElement('div');
    element.classList.add(`${ID}_blockWrap`);
    element.setAttribute('data-show', param);
    element.setAttribute('data-type', 'size');
    element.innerHTML = `
      <div class="${ID}_block">
        <div class="${ID}_block__header">
          <h3 class="${ID}_block__title">${!param ? 'STEP 2:' : ''} Select Sizes</h3>
          <a href="${sizeLink}" target="_blank" class="${ID}_block__link">View size guide</a>
        </div>
        <!--End header-->
        <div class="${ID}_block__body">
          <div class="${ID}_block__left">
            <ul class="${ID}_block__list"></ul>
          </div>
        </div>
        <!--End body-->
        <div class="${ID}_block__footer">
          Can’t find your size? Call us on <a href="tel:0808 271 1665">0808 271 1665</a> for additional sizes
        </div>
      </div>
    `;
    if (document.querySelector('#price_break_tabs')) {
      document.querySelector('#price_break_tabs').insertAdjacentElement('beforebegin', element);
    } else {
      document.querySelector('#product_select').insertAdjacentElement('afterend', element);
    }
    if (priceData) {
      currentTotal();
    }
  }
}

function bindColors() {
  let value;
  let triggerId;
  let imgLink;
  let colorId;
  const target = document.querySelector(`.${ID}_colorSelect`);
  target.addEventListener('change', function (e) {
    document.querySelector(`.${ID}_colorSelectWrap`).classList.remove(`${ID}_colorSelectWrap--empty`);
    value = e.target.options[e.target.selectedIndex].value;
    triggerId = e.target.options[e.target.selectedIndex].getAttribute('data-trigger');
    imgLink = e.target.options[e.target.selectedIndex].getAttribute('data-colorimg');
    colorId = e.target.options[e.target.selectedIndex].getAttribute('data-colorid');
    resetSelection(colorId);
    /**
     * Changes color icon
     */
    document.querySelector(`.${ID}_colorSelect__img`).setAttribute('style', `background-image:url('${imgLink}')`);
    /**
     * Clicks on the right image trigger
     */
    document.getElementById(triggerId).click();
    if (document.querySelector(`.${ID}_blockWrap[data-type="size"]`).getAttribute('data-show')) {
      document.querySelector(`.${ID}_blockWrap[data-type="size"]`).removeAttribute('data-show');
    }
    generateSizeList(colorId);
  });
}

function generateColors() {
  const reg = /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/;
  let triggerId;
  let colorId;
  let imgLink;
  let color;
  let match;
  let options = '';
  const colorsList = document.querySelectorAll('#product_select label');
  [].forEach.call(colorsList, function (curColor, i) {
    if (curColor.parentNode.tagName != 'P') {
      triggerId = curColor.getAttribute('for');
      imgLink = curColor.getAttribute('style');
      colorId = document.getElementById(triggerId).getAttribute('value');
      match = reg.exec(imgLink);
      if (match) {
        imgLink = match[0].replace(')', '');
      }
      color = curColor.getAttribute('title');
      //document.querySelector(`.${ID}_block__left .${ID}_block__list:nth-child(${i + 1})`).setAttribute('data-bindcolor', color.toLowerCase());
      options += `<option data-trigger="${triggerId}" data-colorimg="${imgLink}" data-colorid="${colorId}" value="${color}">${color}</option>`;
    }
  });
  return options;
}

function colorSelect() {
  if (document.getElementById('product_select').querySelector('input[type="radio"]')) {
    const element = document.createElement('div');
    element.classList.add(`${ID}_blockWrap`);
    element.innerHTML = `
      <div class="${ID}_block">
        <div class="${ID}_block__header">
          <h3 class="${ID}_block__title">STEP 1: Select Colour</h3>
        </div>
        <!--End header-->
        <div class="${ID}_block__body ${ID}_block__body--no-margin">
          <div class="${ID}_block__left">
          <div class="${ID}_colorSelectWrap ${ID}_colorSelectWrap--empty">
            <div class="${ID}_colorSelect__img"></div>
            <select class="${ID}_colorSelect">
              <option selected="true" disabled="disabled" value="none">---</option>
              ${generateColors()}
            </select>
          </div>
          </div>
        </div>
        <!--End body-->
      </div>
    `;
    document.querySelector('#product_add_form').insertAdjacentElement('afterbegin', element);
    bindColors();
  }
}

export {
  setup,
  sizeSelect,
  colorSelect,
  generateSizeList
}; // eslint-disable-line
