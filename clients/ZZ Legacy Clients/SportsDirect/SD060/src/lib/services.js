import { fullStory, setCookie, events } from '../../../../../lib/utils';
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

/**
 * @desc Compares the visited brands to the brand tier.
 * @param {Array} storedBrands
 * @param {Array} brandTier
 */
function checkBrand(storedBrands, brandTier) {
  
  const upperCaseTier = brandTier.map(item => item.toUpperCase());
  const chosenBrands = storedBrands.filter((brand) => {
    if (upperCaseTier.indexOf(brand) > -1) {
      return brand;
    }
  });
  return chosenBrands;
}

function uniq(a) {
  return Array.from(new Set(a));
}

/**
 * @desc Loop over accepted brands and return link elements.
 * @param {Array} acceptedBrands
 */
function addBrands(acceptedBrands) {
  // Create element
  const brandWrap = document.createElement('div');
  // Add accepted brands with links
  const arrayToUse = uniq(acceptedBrands);
  let count = 0;
  if (arrayToUse.length > 0) {
    const brands = arrayToUse.map((brand, index) => {
      if (brand && count < 3) {
        const link = brand.replace(/\s/g, '-').toLowerCase();
        count += 1;
        return `<div class="SD060-chosen-brand">
        <a href="/${link}">${brand}</a>
      </div>`;
      }
    }).join('');
    brandWrap.innerHTML = brands;
  }
  return brandWrap;
}

/**
 * @desc Create the popup element with the accepted brands.
 * @param {Element} brandWrap
 */
function buildPopup(brandWrap) {
  let html;
  if (brandWrap) {
    html = `
      <div class="SD060-popup">
        <div class="SD060-popup--wrap">
          <div class="SD060-info">
            <button class="SD060-close-popup">
              <span></span>
              <span></span>
            </button>
            <h2>Shop the latest looks from your favourite brands</h2>

            ${brandWrap.outerHTML}
          </div>
        </div>
      </div>
    `;
  }
  return html;
}

/**
 * @desc Adds the popup to the page.
 * @param {Element} popup
 * @param {Element} ref
 */
function showPopup(popup, ref) {
  if (popup && ref) {
    ref.insertAdjacentHTML('beforeend', popup);
  }
}

/**
 * Removes popup on either click of the X or outside of popup.
 */
function closePopup() {
  const bodyWrap = document.getElementById('BodyWrap');
  const popup = document.querySelector('.SD060-popup');
  if (bodyWrap) {
    bodyWrap.addEventListener('click', (e) => {
      if (popup) {
        if (e.target.classList.contains('SD060-close-popup')) {
          if (popup.parentElement) {
            popup.parentElement.removeChild(popup);
            // setCookie('SD060PopupClosed', true, 999);
            events.send(ID, 'Click', 'User closed popup');
            document.body.classList.remove('SD060-popupAdded');
          }
        }
        // Popup exists
        if (!popup.contains(e.target)) {
          if (popup.parentElement) {
            popup.parentElement.removeChild(popup);
            events.send(ID, 'Click', 'User closed popup');
            document.body.classList.remove('SD060-popupAdded');
          }
        }
        // Only set cookie to show popup once if they click outside.
        setCookie('SD060PopupClosed', true, 999);
      }
    });
  }
}

/**
 * Click events for brand links.
 */
function clickBrand() {
  const popupBrands = document.querySelectorAll('.SD060-popup .SD060-chosen-brand');
  if (popupBrands.length) {
    for (let i = 0; popupBrands.length > i; i += 1) {
      const brandName = popupBrands[i].textContent;
      popupBrands[i].addEventListener('click', (e) => {
        events.send(ID, 'Click', `Brand; ${brandName}`);
      });
    }
  }
}


export { setup, checkBrand, addBrands, buildPopup, showPopup, closePopup, clickBrand }; // eslint-disable-line
