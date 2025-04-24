import { fullStory } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

function createOffersContainer() {
  const menuItemsContainer = document.querySelector('.offers-m-cont');
  menuItemsContainer.classList.add(`${settings.ID}-menuItems`);
  const newOfferContainer = `<div class="${settings.ID}-header__wrapper ${settings.ID}-header__options">
    <div class="${settings.ID}-header">
      <div class="${settings.ID}-title">What are you here for today?</div>
      <div class="${settings.ID}-icons__wrapper">
        <span class="${settings.ID}-status success"></span>
        <span class="${settings.ID}-toggle open"></span>
      </div>
    </div>
  </div>
  <div class="${settings.ID}-offersItems">
    <ul class="${settings.ID}-options">
      <li class="${settings.ID}-option ${settings.ID}-option__pizza">
        <div class="${settings.ID}-image ${settings.ID}-image__pizza"></div>
        <label class="container">Pizza</label>
      </li>
      <li class="${settings.ID}-option ${settings.ID}-option__sides">
        <div class="${settings.ID}-image ${settings.ID}-image__sides"></div>
        <label class="container">Sides
          <input type="checkbox" checked="checked" data-value="side" class="${settings.ID}-option__side">
          <span class="checkmark"></span>
        </label>
      </li>
      <li class="${settings.ID}-option ${settings.ID}-option__plus">
        <div class="${settings.ID}-image ${settings.ID}-image__plus"></div>
      </li>
      <li class="${settings.ID}-option ${settings.ID}-option__drinks">
        <div class="${settings.ID}-image ${settings.ID}-image__drinks"></div> 
        <label class="container">Drinks
          <input type="checkbox" checked="checked" data-value="drink" class="${settings.ID}-option__drink">
          <span class="checkmark"></span>
        </label>
      </li>
      <li class="${settings.ID}-option ${settings.ID}-option__desserts">
        <div class="${settings.ID}-image ${settings.ID}-image__desserts"></div>
        <label class="container">Desserts
          <input type="checkbox" checked="checked" data-value="dessert" class="${settings.ID}-option__dessert">
          <span class="checkmark"></span>
        </label>
      </li>
    </ul>

    <div class="${settings.ID}-cta__wrapper">
      <div class="${settings.ID}-cta__btn">Show me my offers</div>
      <div class="${settings.ID}-cta__skip">View all offers</div>
    </div>
  </div>
  <div class="${settings.ID}-header__wrapper ${settings.ID}-header__offers">
    <div class="${settings.ID}-header">
      <div class="${settings.ID}-title">Your Offers</div>
      <div class="${settings.ID}-icons__wrapper">
        <span class="${settings.ID}-status"></span>
        <span class="${settings.ID}-toggle open"></span>
      </div>
    </div>
  </div>`;

  menuItemsContainer.insertAdjacentHTML('beforebegin', newOfferContainer);
  document.body.insertAdjacentHTML('afterbegin', `<div class="${settings.ID}-loader__wrapper"><div class="${settings.ID}-loader"></div></div>`);
}

function showHideContainers() {
  const toggleIcons = document.querySelectorAll(`.${settings.ID}-toggle`);
  [].forEach.call(toggleIcons, (icon) => {
    const parentEl = icon.parentElement.parentElement;
    parentEl.addEventListener('click', () => {
      icon.classList.toggle('open');

      if (!icon.classList.contains('open')) {
        icon.closest(`.${settings.ID}-header__wrapper`).nextElementSibling.setAttribute('style', 'display: none;');
      } else {
        icon.closest(`.${settings.ID}-header__wrapper`).nextElementSibling.setAttribute('style', 'display: block;');
      }
    });
  });
}

/**
 * Show an offer element
 *
 * @param {HTMLElement} offer
 */
const showOffer = (offer) => {
  offer.setAttribute('style', 'display: block;');
}


/**
 * Hide an offer element
 *
 * @param {HTMLElement} offer
 */
const hideOffer = (offer) => {
  offer.setAttribute('style', 'display: none;');
}

/**
 * Filter all offers by a given keyword - this defines
 * the logic by which we show offers
 *
 * Note that we have to take into account _all ticked offers_ at given time
 *
 * Approach is basically as follows:
 * 1. If any of the offers contain the word 'pizzas', always show them
 * 2a. If data['side'] is an empty string, it means that it is checked
 * 2b. If data['drink'] is an empty string, it means that it is checked
 * 2c. If data['dessert'] is an empty string, it means that it is checked
 * = if item contains any of the given keywords above (i.e. non-empty-string), 
 * then don't show it - a user doesn't want a pizza meal + sides if they unchecked sides
 */
function filterResultSet(data) {
  const allOffers = document.querySelectorAll(`.offers-m-cont .offer-m`);

  [].forEach.call(allOffers, (offer) => {
    const offerTitle = offer.querySelector('.offer-desc h2.redText').innerText.trim().toLowerCase();
    const offerText = offer.querySelector('.offer-desc p').innerHTML.trim().toLowerCase();
    const combinedText = offerTitle + offerText;

    let didMatch = true;

    if(data['side'].trim() !== '' && ( combinedText.match(/sides?/i) || combinedText.match(/wedges/i) )) {
      didMatch = false;
    } 

    if(data['drink'].trim() !== '' && combinedText.match(/drinks?/i)) {
      didMatch = false;
    } 

    if(data['dessert'].trim() !== '' && combinedText.match(/desserts?/i)) {
      didMatch = false;
    }

    if(didMatch) {
      showOffer(offer);
    } else {
      hideOffer(offer);
    }
  });
}

function bindEventOnCheckboxes(menuItemsContainer) {
  // --- Select Options Checkboxes
  const checkboxes = document.querySelectorAll(`.${settings.ID}-option label.container input`);
  let data = {
    'side': '',
    'drink': '',
    'dessert': '',
  };
  
  const allOffers = document.querySelectorAll(`.offers-m-cont .offer-m`);
  const loader = document.querySelector(`.${settings.ID}-loader__wrapper`);
  [].forEach.call(checkboxes, (checkbox) => {
    checkbox.addEventListener('click', () => {
      const checkboxValue = checkbox.getAttribute('data-value');
      // --- Show loader for 2 seconds
      loader.classList.add('show');
      setTimeout(function(){
        loader.classList.remove('show');
        document.querySelector(`.${settings.ID}-header__offers .${settings.ID}-status`).classList.add('success');
      }, 500);
      if (checkbox.checked) {
        data[`${checkboxValue}`] = '';
        sessionStorage.setItem(`${settings.ID}-data`, JSON.stringify(data));

        // ----- Filter Offers
        filterResultSet(data);
      } else {
        data[`${checkboxValue}`] = checkboxValue;
        sessionStorage.setItem(`${settings.ID}-data`, JSON.stringify(data));

        // ----- Filter Offers
        filterResultSet(data);
      }

      if (document.querySelectorAll(`.offers-m-cont .offer-m#hidden`)) {
        const totalOffersHidden = document.querySelectorAll(`.offers-m-cont .offer-m#hidden`).length;
      }
    });
  });
}

function bindEventOnCtaButtons() {
  // --- CTA Buttons
  const updateOffers = document.querySelector(`.${settings.ID}-cta__btn`);
  const offersContainer = document.querySelector(`.${settings.ID}-header__offers`);
  if (updateOffers) {
    updateOffers.addEventListener('click', () => {
      document.querySelector(`.${settings.ID}-header__options .${settings.ID}-toggle`).classList.remove('open');
      document.querySelector(`.${settings.ID}-header__options`).nextElementSibling.setAttribute('style', 'display: none;');
      
      const toggleOffers = document.querySelector(`.${settings.ID}-header__offers .${settings.ID}-toggle`);
      if (!toggleOffers.classList.contains('open')) {
        toggleOffers.click();
      }
      
      offersContainer.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    });
  }

  const skipStep = document.querySelector(`.${settings.ID}-cta__skip`);
  if (skipStep) {
    skipStep.addEventListener('click', () => {
      const offerOptions = ['side', 'drink', 'dessert'];
      for (let i = 0; i < offerOptions.length; i += 1) {
        const element = offerOptions[i];
        const checkbox = document.querySelector(`input.${settings.ID}-option__${element}`);
        if (checkbox && !checkbox.checked) {
          document.querySelector(`input.${settings.ID}-option__${element}`).click();
        }
      }

      const toggleOffers = document.querySelector(`.${settings.ID}-header__offers .${settings.ID}-toggle`);
      if (!toggleOffers.classList.contains('open')) {
        toggleOffers.click();
      }
      
      offersContainer.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    });
  }
}

export { setup, createOffersContainer, showHideContainers, bindEventOnCheckboxes, bindEventOnCtaButtons }; // eslint-disable-line
