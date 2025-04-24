import { fullStory } from '../../../../../lib/utils';
import shared from './shared';
import { eventFire } from './../../../../../lib/utils';
import data from './data';

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
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};
// export const increaseValue  = () => {
//   var value = parseInt(document.getElementById('number').value, 10);
//   value = isNaN(value) ? 0 : value;
//   value++;
//   document.getElementById('number').value = value;
// }

// export const decreaseValue  = () => {
//   var value = parseInt(document.getElementById('number').value, 10);
//   value = isNaN(value) ? 0 : value;
//   value < 1 ? value = 1 : '';
//   value--;
//   document.getElementById('number').value = value;
// }

export const camelize = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};

export const generateLightbox = (currentStore, dipsObj) => {
  const { ID, VARIATION } = shared;

  let listOfDips = '';
  const lightboxDips = ['Triple Garlic & Ghost Chilli Dip', 'BBQ', 'Special Garlic', 'Garlic and Herb', 'Hot Buffalo', 'Pizza Sauce'];

  let topDip = '';
  for (let i = 0; i < Object.keys(dipsObj).length; i += 1 ) {
    const dip = dipsObj[i];
    //alert(dip["name"]);
    if (lightboxDips.includes(dip["name"])) {
      let dipID;
      let tripleGarlicName = '';
      if (dip["name"] === "Triple Garlic & Ghost Chilli Dip") {
        dipID = "tripleGarlicGhostChilli";
        if (window.innerWidth <= 320) {
          tripleGarlicName = 'Triple Garlic & Ghost Chilli';
        } else {
          tripleGarlicName = 'Triple Garlic & Ghost</br>Chilli';
        }
      } else if (dip["name"] !== "BBQ") {
        dipID = camelize(dip["name"]);
      } else if (dip["name"] === "BBQ") {
        dipID = "bbq";
      }

      // --- Populate Data Object 
      data[`${dip["name"]}`] = { 
        quantity: 0,
        id: dip["id"],
      };

      if (dip["name"] === "Triple Garlic & Ghost Chilli Dip") {
        topDip = `<li class="${shared.ID}-dip" id="${shared.ID}-${dipID}">
          <div class="${shared.ID}-dip__img">
            <div id="${shared.ID}-${dipID}__img"></div>
          </div>
          <div class="${shared.ID}-dip__title"><div class="dip-name">${tripleGarlicName} <span class="${shared.ID}-red">Limited Edition</span></div><span>(Only +£1.50 per dip)</span></div>
          <div class="${shared.ID}-dip__input">
            <form>
              <div class="value-button decrease" value="Decrease Value">-</div>
              <input type="number" class="number" data-input="${shared.ID}-${dipID}" value="0" disabled />
              <div class="value-button increase" value="Increase Value">+</div>
            </form>
          </div>
          <div class="${shared.ID}-dip__cta">
            <div class="${shared.ID}-cta__btn" data-to-add="${dipID}" data-option="${dip.id}">ADD TO BAG (+£1.50)</div>
          </div>
        </li>`;
      } else {
        listOfDips += `<li class="${shared.ID}-dip" id="${shared.ID}-${dipID}">
          <div class="${shared.ID}-dip__img">
            <div id="${shared.ID}-${dipID}__img"></div>
          </div>
          <div class="${shared.ID}-dip__title"><div class="dip-name">${dip.name}</div><span>(Only +45p per dip)</span></div>
          <div class="${shared.ID}-dip__input">
            <form>
              <div class="value-button decrease" value="Decrease Value">-</div>
              <input type="number" class="number" data-input="${shared.ID}-${dipID}" value="0" disabled />
              <div class="value-button increase" value="Increase Value">+</div>
            </form>
          </div>
          <div class="${shared.ID}-dip__cta">
            <div class="${shared.ID}-cta__btn" data-to-add="${dipID}" data-option="${dip.id}">ADD TO BAG (+45p)</div>
          </div>
        </li>`;
      }

    }
  }

  const mainContainer = document.querySelector('.main');
  const lightboxContainer = `<div class="${shared.ID}-lightbox__wrapper hide">
    <div class="${shared.ID}-lightbox__container">
      <div  class="${shared.ID}-lightbox__header">
        <div  class="${shared.ID}-header">Select your dips</div>
        <div  class="${shared.ID}-lightbox__title">Why not add an extra dip to</br>complete your meal?</div>
        <span class="${shared.ID}-lightbox__close"></span>
      </div>
      <div class="${shared.ID}-lightbox__content">
        <ul class="${shared.ID}-dips">
          <li class="${shared.ID}-dip">
            <div class="${shared.ID}-dip__img">
              <div></div>
            </div>
            <div class="${shared.ID}-dip__title"></div>
            <div class="${shared.ID}-dip__input">
              <form>
                <div class="value-button" class="decrease" value="Decrease Value">-</div>
                <input type="number" class="number" value="1" disabled />
                <div class="value-button" class="increase" value="Increase Value">+</div>
              </form>
            </div>
            <div class="${shared.ID}-dip__cta">
              <div class="${shared.ID}-cta__btn">ADD TO BAG (+45p)</div>
            </div>
          </li>
          ${topDip}
          ${listOfDips}
        </ul>
        <div class="${shared.ID}-addToBasket__cta ${shared.ID}-dip__cta inactive">
          <div class="${shared.ID}-addToBasket__btn ${shared.ID}-cta__btn">Add to basket</div>
        </div>
        <div class="${shared.ID}-skip-step"><a href="/stores/${currentStore}/basket-confirmation.aspx">Skip to basket</a></div>
      </div>
    </div>
  </div>`;
  mainContainer.insertAdjacentHTML('afterbegin', lightboxContainer);
  // alert('added');

  const lightboxEl = document.querySelector(`.${shared.ID}-lightbox__wrapper`);
  closeLightbox(lightboxEl, currentStore);

};

export const closeLightbox = (lightboxEl, currentStore) => {
  const { ID, VARIATION } = shared;

  // --- Close Icon
  const closeIcon = document.querySelector(`.${shared.ID}-lightbox__close`);
  
  closeIcon.addEventListener('click', () => {
    lightboxEl.classList.add('hide');
    // if (pageType === 'pdp') {
    //   lightboxEl.parentNode.removeChild(lightboxEl);
    // }
    // --- SESSION STORAGE
    sessionStorage.setItem(`${shared.ID}-dipsLightbox`, true);
    // window.location.pathname = `/stores/${currentStore}/basket-confirmation.aspx`;

    /**
     * @desc When lightbox dismissed 
     * --- Refreshes the page to re-attach original event listeners to the element
     */
    document.querySelector('body').insertAdjacentHTML('afterbegin', '<div class="PJ097-white-overlay"></div>');
    window.location.reload();
  });

  // --- Clicked outside Lightbox
  document.querySelector(`.${shared.ID}-lightbox__wrapper`).addEventListener('click', (e) => {
    if (document.querySelector(`.${shared.ID}-lightbox__container`) && !document.querySelector(`.${shared.ID}-lightbox__container`).classList.contains('hide')) {
      if (!document.querySelector(`.${shared.ID}-lightbox__container`).contains(e.target)) {
        // Clicked outside the box
        lightboxEl.classList.add('hide');
        // --- SESSION STORAGE
        sessionStorage.setItem(`${shared.ID}-dipsLightbox`, true);
        window.location.pathname = `/stores/${currentStore}/basket-confirmation.aspx`;
        // if (pageType === 'pdp') {
        //   lightboxEl.parentNode.removeChild(lightboxEl);
        // }
      }
    }
  });
};
