/**
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { events, eventFire } from './../../../../../lib/utils';
import settings from './settings';
import { parseDatesFromSelect, splitDateAndPrice, cleanString } from './date-parser';
import Lightbox, { showLightbox, closeLightbox } from './components/lightbox';
import PseudoSelect, { pseudoSelectToggle, pseudoSelectClose, pseudoSelectIsOpen, handleChooseDropdownOption } from './components/pseudo-select';

/**
 * Hold reference to whether user chose a date
 *
 * This because the select box will show 'click for more dates'
 */
let didChooseADate = false;

/**
 * On lightbox clicked
 */
const handleDateChosen = (ident) => {
  didChooseADate = true;

  const selectElm = document.querySelector('#ddlMoreDates');
  if(selectElm) {
    const matchingOpt = [].slice.call(selectElm.options).filter((opt) => opt.dataset.ident == ident)[0];

    if(matchingOpt) {
      matchingOpt.selected = true;
      eventFire(selectElm, 'change');
    }
  }
};

/**
 * Handle Lightbox close clicked
 */
const handleLightboxClosed = () => {
  closeLightbox();
};

/**
 * Helper render ligthbox
 */
const renderLightbox = (selectElm) => {
  const dateInfo = parseDatesFromSelect(splitDateAndPrice)(selectElm);

  const rows = [];
  dateInfo.forEach((info) => {
    rows.push(`
      <li class="${settings.ID}-lightbox-row ${info.selected ? `${settings.ID}-lightbox-row--selected` : ''}">
        <span class="${settings.ID}-lightbox-row__prefix">Coach Departs on</span>
        <span class="${settings.ID}-lightbox-row__date-price">${info.rawValue}</span>
        <a class="${settings.ID}-lightbox-row__select" data-ident="${info.ident}">Select</a>
      </li>
    `);
  });

  const content = `
    <h2>Choose another date</h2>
    <span class="${settings.ID}-lightbox__close">&times;</span>
    <ul class="${settings.ID}-lightbox-row-wrap">${rows.join('')}</ul>
  `;

  document.body.insertAdjacentHTML('afterbegin', Lightbox({
    content: content,
    active: false
  }, rows.length >= 3));

  // Event Listeners
  [].forEach.call(document.querySelectorAll(`.${settings.ID}-lightbox-row__select`), (sel) => {
    sel.addEventListener('click', () => {
      handleDateChosen(sel.dataset.ident);
      closeLightbox();
    });
  });

  const lightboxClose = document.querySelector(`.${settings.ID}-lightbox__close`);
  if(lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      closeLightbox();
    });
  }
};

/**
 * Helper render pseudo select
 */
const renderPseudoSelect = (selectElm) => {
  const dateInfo = parseDatesFromSelect(splitDateAndPrice)(selectElm);
  const destinationBox = document.querySelector('.main-content .destination-box');
  destinationBox.insertAdjacentHTML('beforeend', PseudoSelect({
    options: dateInfo,
    selectedContent: 'Click for more dates'
  }));

  const pseudoSelectResult = document.querySelector(`.${settings.ID}-pseudoselect__result`);
  if(pseudoSelectResult) {
    handleChooseDropdownOption((option) => {
      handleDateChosen(option.dataset.ident);
    });

    pseudoSelectResult.addEventListener('click', () => {
      pseudoSelectToggle((isNowOpen) => {
        if(settings.VARIATION == 1) {
          // Show lightbox
          showLightbox();
        } else if(settings.VARIATION == 2) {
          // Reveal dropdown 
          if(isNowOpen) {
            pseudoSelectResult.innerText = 'Choose a date...';
          } else {
            pseudoSelectResult.innerText = 'Click for more dates';
          }
        }
      });
    });
  }

  document.addEventListener('keydown', (e) => {
    if(e.keyCode == 27) {
      pseudoSelectClose();
    }
  });
  document.addEventListener('click', (e) => {
    if(!e.target.className.match(new RegExp(`${settings.ID}-pseudoselect`))) {
      pseudoSelectClose();
    }
  });
};

/**
 * Entry point
 */
const activate = () => {
  setup();

  // ------------------------------------------------------------------
  // Build lightbox if > 1 date available
  // ------------------------------------------------------------------
  const selectElm = document.querySelector('#ddlMoreDates');
  if(selectElm && selectElm.options.length > 1) {
    renderLightbox(selectElm);

    renderPseudoSelect(selectElm);
  }
  
  // ------------------------------------------------------------------
  // Move back button
  // ------------------------------------------------------------------
  const backButton = document.querySelector('.main-content .destination-box .buttons .back');
  const container = document.querySelector('.main-content > .content > section.blue.custom > .container');
  if(container && backButton) {
    backButton.classList.add(`${settings.ID}-back-button`);
    container.insertAdjacentElement('afterbegin', backButton);
  }
  
  // ------------------------------------------------------------------
  // Move other buttons to beneath the image
  // ------------------------------------------------------------------
  const buttonsContainer = document.querySelector('.main-content .destination-box .buttons');
  const rightContainer = document.querySelector('.main-content .container .split-column > .right');
  if(rightContainer && buttonsContainer) {
    rightContainer.insertAdjacentElement('beforeend', buttonsContainer);
  }

  const socialContainer = document.querySelector('.container .left .social');
  if(socialContainer && buttonsContainer) {
    buttonsContainer.insertAdjacentElement('beforebegin', socialContainer);
  }
  
  // ------------------------------------------------------------------
  // Amend the order of the pricing and days away overview
  // ------------------------------------------------------------------
  const metaContainer = document.querySelector('.main-content .destination-box .clearfix');
  if(metaContainer) {
    const priceLine = metaContainer.querySelector('.blue-line:last-of-type');
    if(priceLine) {
      priceLine.classList.add(`${settings.ID}-price-line`);
      metaContainer.insertAdjacentElement('afterbegin', priceLine);
    }
  }
};

export default activate;
