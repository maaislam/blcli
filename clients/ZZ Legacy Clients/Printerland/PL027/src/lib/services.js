import { fullStory } from '../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import generateLightboxContent from './generateLightboxContent';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${shared.ID}-${VARIATION}`);
};

export const showLightbox = (lightboxEl) => {
  const { ID, VARIATION } = shared;
  // --- Widget
  const widget = document.querySelector(`.${shared.ID}-widget__wrapper`);
  const widgetContent = document.querySelector(`.${shared.ID}-widget__content .${shared.ID}-content`);
  
  widgetContent.addEventListener('click', () => {
    if (lightboxEl.classList.contains('hide')) {
      lightboxEl.classList.remove('hide');

      // --- Stop Widget from Animating after this
      widget.classList.remove('animate');
    }
  });
  
};

export const minimiseWidget = () => {
  const { ID, VARIATION } = shared;
  // --- Widget Close icon
  const widget = document.querySelector(`.${shared.ID}-widget__wrapper`);
  const widgetClose = widget.querySelector(`.${shared.ID}-close__icon`);
  
  widgetClose.addEventListener('click', () => {
    if (!widget.classList.contains('hide')) {
      widget.classList.add('hide');
    }
  });
  
};

export const closeLightbox = (lightboxEl) => {
  const { ID, VARIATION } = shared;
  // --- Close Icon
  const closeIcon = document.querySelector(`.${shared.ID}-lightbox__wrapper .${shared.ID}-lightbox__close`);
  
  closeIcon.addEventListener('click', () => {
    lightboxEl.classList.add('hide');
    // if (pageType === 'pdp') {
    //   lightboxEl.parentNode.removeChild(lightboxEl);
    // }
  });

  // --- Clicked outside Lightbox
  // if (window.innerWidth > 1023) {
    document.querySelector(`.${shared.ID}-lightbox__wrapper`).addEventListener('click', (e) => {
      if (document.querySelector(`.${shared.ID}-lightbox__container`) && !document.querySelector(`.${shared.ID}-lightbox__container`).classList.contains('hide')) {
        if (!document.querySelector(`.${shared.ID}-lightbox__container`).contains(e.target)) {
          // Clicked outside the box
          lightboxEl.classList.add('hide');
          // if (pageType === 'pdp') {
          //   lightboxEl.parentNode.removeChild(lightboxEl);
          // }
        }
      }
    });
  // }
  
};

export const setCheapest = (target) => {
  const targets = document.querySelectorAll(`[data-cost="${target}"]`);
  if(targets.length < 4 && targets.length > 1){
    Array.prototype.forEach.call(targets, function(target){
      const newBlock = document.createElement('div');
      newBlock.classList.add(`${shared.ID}_cheapest__text`);
      newBlock.textContent = 'Low running costs';
      target.classList.add(`${shared.ID}_cheapest`);
      if(!target.querySelector(`.${shared.ID}_cheapest__text`)){
        target.insertAdjacentElement('afterbegin', newBlock);
      }
    });
  } else if(targets.length === 1){
    const curTarget = document.querySelector(`[data-cost="${target}"]`);
    const newBlock = document.createElement('div');
    newBlock.classList.add(`${shared.ID}_cheapest__text`);
    newBlock.textContent = 'Cheapest to run';
    curTarget.classList.add(`${shared.ID}_cheapest`);
    if(!curTarget.querySelector(`.${shared.ID}_cheapest__text`)){
      curTarget.insertAdjacentElement('afterbegin', newBlock);
    }
  }
}

export const costCalculator = () => {
  const targetArray = [`.${shared.ID}-monocostperpage`, `.${shared.ID}-colourcostperpage`];
  let calculatorInner;
  //Loop through each of the above selectors
  Array.prototype.forEach.call(targetArray, function (target) {
    let pricesArray = [];
    let targetName;
    calculatorInner = '';
    //Select all children except for the 1st one
    const costs = document.querySelector(target).querySelectorAll('.compareitemcell');
    if(document.querySelector(target).classList.contains(`${shared.ID}-monocostperpage`)){
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
          <td class="${shared.ID}_calculator__item compareitemcell" data-calc="${match[0]}"><span><strong>£${(500 * match[0] / 100).toFixed(2)}</strong></span></td>
        `;
      } else {
        calculatorInner += `
        <td class="${shared.ID}_calculator__item compareitemcell"></td>
      `;
      }
    });

    //At the end of each cycle generate a tr with all the tds generated above as content
    const newRow = document.createElement('tr');
    newRow.classList.add(`${shared.ID}_calculator`);
    newRow.innerHTML = `
      <td class="${shared.ID}_calculator__item ${shared.ID}_calculator__item--amount comparetitlewhite">
        <span class="${shared.ID}_calculator__text">Cost for:</span>
        <div class="${shared.ID}_calculator__dropdownWrap">
          <select class="${shared.ID}_calculator__dropdown">
            <option value="500" selected>500 ${targetName}</option>
            <option value="1000">1000 ${targetName}</option>
            <option value="2000">2000 ${targetName}</option>
          </select>
        </div>
      </td>
      ${calculatorInner}
    `;
    //Append the new row after mono or colour
    if (!document.querySelector(`.${shared.ID}_calculator__dropdown_mono`) && !document.querySelector(`.${shared.ID}_calculator__dropdown_colour`)) {
      document.querySelector(target).insertAdjacentElement('afterend', newRow);
    }

    //Adds an event listener to each dropdown and on change calculates the amount
    const dropDowns = document.querySelectorAll(`.${shared.ID}_calculator__dropdown`);
    //Adds additional class name to dropdowns
    if (dropDowns.length === 2) {
      dropDowns[0].classList.add(`.${shared.ID}_calculator__dropdown_mono`);
      dropDowns[1].classList.add(`.${shared.ID}_calculator__dropdown_colour`);
    }
    
    Array.prototype.forEach.call(dropDowns, function(dropdown){
      dropdown.addEventListener('change', function(e){
        const curVal = e.target.options[e.target.selectedIndex].value;
        const curparent = e.target.closest(`.${shared.ID}_calculator`);
        const curChildren = curparent.querySelectorAll(`.${shared.ID}_calculator__item:not(.${shared.ID}_calculator__item--amount)`);
        Array.prototype.forEach.call(curChildren, function(child){
          if(child.getAttribute('data-calc')){
            const curMultiplier = child.getAttribute('data-calc');
            child.querySelector('span strong').textContent = '£' + (curVal * curMultiplier / 100).toFixed(2);
            child.classList.add(`${shared.ID}_pulse-bg`);
            setTimeout(function(){
              child.classList.remove(`${shared.ID}_pulse-bg`);
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

export const splitOffers = (parent) => {
  //Split each offers and generate an ul
  const offers = parent.querySelectorAll(`.${shared.ID}-specialoffer td.compareoffercell`);
  Array.prototype.forEach.call(offers, function (offer) {
    let offerText = '';
    if (offer.textContent.indexOf('+') > -1) {
      offerText = offer.textContent.split('+');
    } else if (offer.textContent.indexOf(',') > -1) {
      offerText = offer.textContent.split(',');
    }
    
    //let tooltipLink; Removed since the tooltip is not working on the control
    let offersBlock = '';
    /*if (offer.querySelector(`.${shared.ID}-specialoffer .tooltip-link`)) {
      tooltipLink = offer.querySelector(`.${shared.ID}-specialoffer .tooltip-link`).outerHTML;
    }*/
    const offersList = document.createElement('ul');
    offersList.classList.add(`${shared.ID}_offersList`);
    Array.prototype.forEach.call(offerText, function (curtext) {
      offersBlock += `
        <li class="${shared.ID}_offersList__item">${curtext.trim()}</li>
      `;
    });
    offersList.innerHTML = offersBlock;
    offer.innerHTML = '';
    offer.insertAdjacentElement('afterbegin', offersList);
  });
};

export const generateLightbox = () => {
  const { ID, VARIATION } = shared;

  generateLightboxContent();
  const mainContainer = document.querySelector('.main-body-container');
  const lightboxContainer = `<div class="${shared.ID}-lightbox__wrapper hide">
    <div class="${shared.ID}-lightbox__container">
      <div  class="${shared.ID}-lightbox__header">
        <span  class="${shared.ID}-lightbox__title">Similar Printers</span>
        <span  class="${shared.ID}-lightbox__subtitle">See how much you could save...</span>
        <span class="${shared.ID}-lightbox__close"></span>
      </div>
      <div class="${shared.ID}-lightbox__content">
        
   
      </div>
    </div>
  </div>`;
  mainContainer.insertAdjacentHTML('beforebegin', lightboxContainer);

  const lightboxEl = document.querySelector(`.${shared.ID}-lightbox__wrapper`);

  closeLightbox(lightboxEl);
  showLightbox(lightboxEl);
  minimiseWidget();

  pollerLite([`.${shared.ID}-lightbox__wrapper .compareitemcell`], () => {
    costCalculator();
  });

  pollerLite([`.${shared.ID}-lightbox__content .${shared.ID}-specialoffer`], () => {
    
    const productsSection = document.querySelector(`.${shared.ID}-lightbox__content`);
    splitOffers(productsSection);
  });
  
};


