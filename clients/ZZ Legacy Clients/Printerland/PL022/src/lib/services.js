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

function splitOffers(parent) {
  //Split each offers and generate an ul
  const offers = parent.querySelectorAll(`.${ID}-specialoffer td:not(:nth-child(1))`);
  Array.prototype.forEach.call(offers, function (offer) {
    const offerText = offer.textContent.split('+');
    //let tooltipLink; Removed since the tooltip is not working on the control
    let offersBlock = '';
    /*if (offer.querySelector(`.${ID}-specialoffer .tooltip-link`)) {
      tooltipLink = offer.querySelector(`.${ID}-specialoffer .tooltip-link`).outerHTML;
    }*/
    const offersList = document.createElement('ul');
    offersList.classList.add(`${ID}_offersList`);
    Array.prototype.forEach.call(offerText, function (curtext) {
      offersBlock += `
        <li class="${ID}_offersList__item">${curtext.trim()}</li>
      `;
    });
    offersList.innerHTML = offersBlock;
    offer.innerHTML = '';
    offer.insertAdjacentElement('afterbegin', offersList);
  });
};

function setCheapest(target) {
  const targets = document.querySelectorAll(`[data-cost="${target}"]`);
  if(targets.length < 4 && targets.length > 1){
    Array.prototype.forEach.call(targets, function(target){
      const newBlock = document.createElement('div');
      newBlock.classList.add(`${ID}_cheapest__text`);
      newBlock.textContent = 'Low running costs';
      target.classList.add(`${ID}_cheapest`);
      if(!target.querySelector(`.${ID}_cheapest__text`)){
        target.insertAdjacentElement('afterbegin', newBlock);
      }
    });
  } else if(targets.length === 1){
    const curTarget = document.querySelector(`[data-cost="${target}"]`);
    const newBlock = document.createElement('div');
    newBlock.classList.add(`${ID}_cheapest__text`);
    newBlock.textContent = 'Cheapest to run';
    curTarget.classList.add(`${ID}_cheapest`);
    if(!curTarget.querySelector(`.${ID}_cheapest__text`)){
      curTarget.insertAdjacentElement('afterbegin', newBlock);
    }
  }
}

function costCalculator() {
  const targetArray = [`.${ID}-monocostperpage`, `.${ID}-colourcostperpage`];
  let calculatorInner;
  //Loop through each of the above selectors
  Array.prototype.forEach.call(targetArray, function (target) {
    let pricesArray = [];
    let targetName;
    calculatorInner = '';
    //Select all children except for the 1st one
    const costs = document.querySelector(target).querySelectorAll('.compareitemcell');
    if(document.querySelector(target).classList.contains(`${ID}-monocostperpage`)){
      targetName = 'prints';
    } else {
      targetName = 'prints';
    }
    //Loop through all children
    Array.prototype.forEach.call(costs, function (cost) {
      const reg = /[+-]?\d+(\.\d+)?/;
      const match = cost.querySelector('span').textContent.trim().match(reg);
      //If there's a match generate a td with its value -> 1.2p/3.4p per print
      if(match){
        //Set a data-cost attribute, needed to perform the green lowest cost addition
        cost.setAttribute('data-cost', match[0]);
        pricesArray.push(match[0]);
        calculatorInner += `
          <td class="${ID}_calculator__item compareitemcell" data-calc="${match[0]}"><span><strong>£${(500 * match[0] / 100).toFixed(2)}</strong></span></td>
        `;
      } else {
        calculatorInner += `
        <td class="${ID}_calculator__item compareitemcell"></td>
      `;
      }
    });
    // console.log('PRICES:');
    // console.log(pricesArray);
    //At the end of each cycle generate a tr with all the tds generated above as content
    const newRow = document.createElement('tr');
    newRow.classList.add(`${ID}_calculator`);
    newRow.innerHTML = `
      <td class="${ID}_calculator__item ${ID}_calculator__item--amount comparetitlewhite">
        <span class="${ID}_calculator__text">Cost for:</span>
        <div class="${ID}_calculator__dropdownWrap">
          <select class="${ID}_calculator__dropdown">
            <option value="500" selected>500 ${targetName}</option>
            <option value="1000">1000 ${targetName}</option>
            <option value="2000">2000 ${targetName}</option>
          </select>
        </div>
      </td>
      ${calculatorInner}
    `;
    //Append the new row after mono or colour
    if (!document.querySelector(`.${ID}_calculator__dropdown_mono`) && !document.querySelector(`.${ID}_calculator__dropdown_colour`)) {
      document.querySelector(target).insertAdjacentElement('afterend', newRow);
    }

    //Adds an event listener to each dropdown and on change calculates the amount
    const dropDowns = document.querySelectorAll(`.${ID}_calculator__dropdown`);
    //Adds additional class name to dropdowns
    if (dropDowns.length === 2) {
      dropDowns[0].classList.add(`.${ID}_calculator__dropdown_mono`);
      dropDowns[1].classList.add(`.${ID}_calculator__dropdown_colour`);
    }
    
    Array.prototype.forEach.call(dropDowns, function(dropdown){
      dropdown.addEventListener('change', function(e){
        const curVal = e.target.options[e.target.selectedIndex].value;
        const curparent = e.target.closest(`.${ID}_calculator`);
        const curChildren = curparent.querySelectorAll(`.${ID}_calculator__item:not(.${ID}_calculator__item--amount)`);
        Array.prototype.forEach.call(curChildren, function(child){
          if(child.getAttribute('data-calc')){
            const curMultiplier = child.getAttribute('data-calc');
            child.querySelector('span strong').textContent = '£' + (curVal * curMultiplier / 100).toFixed(2);
            child.classList.add(`${ID}_pulse-bg`);
            setTimeout(function(){
              child.classList.remove(`${ID}_pulse-bg`);
            }, 1000);
          }
        });
      });
    });
    //If there is more than 1 record sort the array to get the cheapest
    if(pricesArray.length > 1){
      pricesArray.sort(function(a, b){return a - b});
      //Set the green to the cheapest record based on data-cost
      setCheapest(parseFloat(pricesArray[0]).toFixed(1));
    }
  });
}

function setFakeCompareButtons(){

  // alert('set fake compare buttons');
  const buttons = document.querySelectorAll('.compare input[type="checkbox"]');
  const curSelProds = document.querySelector('.compare-table .compare-btn .grow').textContent;
  const reg = /\d+/;
  const match = curSelProds.match(reg);
  let maxProds;
  if(match){
    maxProds = parseInt(match[0]);
    if(maxProds === 5 & !localStorage.getItem('max-reached')){
      alert('You\'ve now selected the maximum 4 products to compare. Please remove a product in order to add another.');
      localStorage.setItem('max-reached', 'true');
    } else if(maxProds < 4){
      localStorage.removeItem('max-reached');
    }
  }

  let text = '';
  Array.prototype.forEach.call(buttons, function(button){
    const isChecked = button.checked;
    
    const elId = button.id;
    // const buttonParent = button.closest('.cell');
    const buttonParent = button.closest('li.product__item');
    if(isChecked){
      text = 'Comparing';
    } else {
      text = 'Compare';
    }

    const fakeSwitch = document.createElement('div');
    fakeSwitch.classList.add(`${ID}_fakeSwitch`);
    fakeSwitch.innerHTML = `
      <strong class="small text-info">${text}</strong>
      <span>
        <label class="switch" ${maxProds === 4 && !isChecked ? 'data-disabled="true"' : ''}>
            <input type="checkbox" ${isChecked ? 'checked' : ''} >
            <span class="slider ${ID}_slider" data-bind="${elId}" ${maxProds === 4 && !isChecked ? 'data-disabled="true"' : ''}></span>
        </label>
      </span>
    `;

    // --- Add Fake Compare Button
    // ---- on top of product container
    if (!button.closest('li.product__item').querySelector(`.${ID}_fakeSwitch`)) {
      button.closest('li.product__item').insertAdjacentElement('afterbegin', fakeSwitch);
    }
    
    if(isChecked){
      //if(window.location.href.indexOf('/product/') > -1){
      //  if(buttonParent){
      //    button.closest('.cell').querySelector('.box').setAttribute('data-comparing', 'true');
      //  }
      //} else {
      //  if(document.body.classList.contains('page-home')){
      //    if(buttonParent){
      //      button.closest('.cell').querySelector('.box').setAttribute('data-comparing', 'true');
      //    }
      //  } else {
      //    if(buttonParent){
      //      // console.log('[207] ------');
      //      // buttonParent.querySelector('.content.px-2')
      //      buttonParent.setAttribute('data-comparing', 'true');
      //    }
      //  }
      //}
      buttonParent.querySelector(`.${ID}_fakeSwitch`).classList.add('active');
      buttonParent.classList.add('active');
    }
    
    //if(buttonParent && !buttonParent.querySelector(`.${ID}_fakeSwitch`)){
    //  if(window.location.href.indexOf('/product/') > -1){
    //    if(buttonParent){
    //      button.closest('.cell').querySelector('.box').insertAdjacentElement('afterbegin', fakeSwitch);
    //    }
    //  } else {
    //    if(document.body.classList.contains('page-home')){
    //      button.closest('.cell').querySelector('.box').insertAdjacentElement('afterbegin', fakeSwitch);
    //    } else {
    //      // console.log('[222] ------');
    //      buttonParent.querySelector('.content.px-2').insertAdjacentElement('afterbegin', fakeSwitch);
    //    }
    //  }
    //  
    //  button.closest('.cell').querySelector(`.${ID}_fakeSwitch .switch .slider`).addEventListener('click', function(e){
    //    // console.log('[227] ---------');
    //    const isDisabled = e.target.getAttribute('data-disabled');
    //    if(!isDisabled){
    //      const target = e.target.getAttribute('data-bind');
    //      document.querySelector(`#${target}`).click();
    //    } else {
    //      if(e.target.getAttribute('data-disabled')){
    //        alert('You\'ve now selected the maximum 4 products to compare. Please remove a product in order to add another.');
    //      }
    //    }
    //  });
    //}
    // 
    
    const fakeCheckbox = buttonParent.querySelector(`.${ID}_fakeSwitch input[type=checkbox]:not(.xeladded)`);
    if(fakeCheckbox) {
      fakeCheckbox.classList.add('xeladded')

      fakeCheckbox.addEventListener('change', (e) => {
        button.click();
      });
    }
  });
}

export {
  setup,
  splitOffers,
  costCalculator,
  setFakeCompareButtons
}; // eslint-disable-line
