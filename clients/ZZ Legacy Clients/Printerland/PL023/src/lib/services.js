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

/**
 * @desc PLPs
 */
function amendPlpElements() {
  const badgeContainer = `<div class="PL023-badge__wrapper">
    <div class="PL023-badge">
      <div>14</div>
      <div>Day Trial</div>
    </div>
  </div>`;

  const allProducts = document.querySelectorAll('.content .cell');
  [].forEach.call(allProducts, (product) => {
    const offers = product.querySelectorAll('ul.checklist li');
    // 14 Day Trial Badge
    for (let i = 0; i < offers.length; i += 1) {
      const offerText = offers[i].querySelector('div').innerText.trim();
      if (offerText.indexOf('14 Day Trial') > -1) {
        product.insertAdjacentHTML('afterbegin', badgeContainer);
        break;
      }
    } 

    const keyFeaturesBox = product.querySelector('.key-features .box');

    // Toner
    const tonerCostContainer = keyFeaturesBox.querySelector('.cost-per-page');
    if (tonerCostContainer) {
      keyFeaturesBox.insertAdjacentElement('beforebegin', tonerCostContainer);
    }

    // Compare CTA Button
    const compareBtnContainer = keyFeaturesBox.querySelector('div.compare');
    if (compareBtnContainer) {
      keyFeaturesBox.insertAdjacentElement('afterend', compareBtnContainer);
    }

    // Hide Key Feature Element after number 6
    const keyFeaturesList = keyFeaturesBox.querySelector('ul.list');
    keyFeaturesList.classList.add('hideElements');

    /**
     * @desc Loop through Keyfeatures
     */
    const features = keyFeaturesList.querySelectorAll('li');
    for (let i = 0; i < features.length; i += 1) {
      if (features[i].querySelector('span span')) {
        const featureText = features[i].querySelector('span span').innerText.trim();
        // Hide 14 Day Trial from Keyfeatures
        if (featureText.indexOf('14 Day Trial') > -1) {
          features[i].parentElement.removeChild(features[i]);
        } else if (featureText.indexOf('Continue printing in mono even if the printer is out of colour toners') > -1) {
          features[i].classList.add('PL023-continuePrinting');
        }
      } else if (features[i].querySelector('span')) {
        const featureText = features[i].querySelector('span').innerText.trim();

        if (featureText.match(/^.*?\bSecure\b.*?$/m) !== null) {
          features[i].classList.add('PL023-security');
        } else if (featureText.match(/^.*?\bAutomatic Double Sided\b.*?$/m) !== null) {
          features[i].classList.add('PL023-automaticDoubleSided');
        } else if (featureText.match(/^.*?\bUp to\b.*?\bdpi Print\b.*?$/m) !== null || featureText.match(/^.*?\bdpi Print\b.*?$/m) !== null) {
          features[i].classList.add('PL023-printQuality');
        } else if (featureText.match(/^.*?\bUSB\b.*?\bNetwork\b.*?$/m) !== null) {
          features[i].classList.add('PL023-usbNetwork');
        } else if (featureText.match(/^.*?\bUp to\b.*?\dppm Mono\b.*?$/m) !== null) {
          features[i].classList.add('PL023-printSpeed__mono');
        } else if (featureText.match(/^.*?\bUp to\b.*?\dppm Colour\b.*?$/m) !== null) {
          features[i].classList.add('PL023-printSpeed__colour');
        } else if (featureText.indexOf('Print/Scan/Copy/Fax') > -1) {
          features[i].classList.add('PL023-printScanCopyFax');
        }
      }
    }

    /**
     * @desc Change Keyfeatures based on priority
     * @argument priorityOrder
     * Priority order in reverse
     */
    const priorityOrder = ['PL023-printScanCopyFax', 'PL023-printSpeed__colour', 'PL023-printSpeed__mono', 'PL023-usbNetwork', 'PL023-printQuality', 'PL023-automaticDoubleSided', 'PL023-security', 'PL023-continuePrinting'];
    for (let i = 0; i < priorityOrder.length; i += 1) {
      if (keyFeaturesList.querySelector(`.${priorityOrder[i]}`)) {
        keyFeaturesList.insertAdjacentElement('afterbegin', keyFeaturesList.querySelector(`.${priorityOrder[i]}`));
      }
    }
    // See More
    const seeMoreContainer = `<div class="PL023-seeMore__wrapper">
      <span class="PL023-seeMore__text">See More</span>
      <span class="PL023-seeMore__arrow"></span>
    </div> `;

    const seeMoreCTA = keyFeaturesBox.querySelector('.PL023-seeMore__wrapper');
    const seeMoreTextContainer = keyFeaturesBox.querySelector('.PL023-seeMore__text');
    if (seeMoreCTA) {
      seeMoreCTA.addEventListener('click', () => {
        // seeMoreCTA.classList.toggle('open');
      });
    } else {
      keyFeaturesBox.insertAdjacentHTML('beforeend', seeMoreContainer);
      const seeMoreCTA = keyFeaturesBox.querySelector('.PL023-seeMore__wrapper');
      const seeMoreTextContainer = keyFeaturesBox.querySelector('.PL023-seeMore__text');
      seeMoreCTA.addEventListener('click', () => {
        seeMoreCTA.classList.toggle('open');
        keyFeaturesList.classList.toggle('hideElements');

        if (seeMoreCTA.classList.contains('open')) {
          seeMoreTextContainer.innerText = 'See Less';
        } else {
          seeMoreTextContainer.innerText = 'See More';
        }
      });
    }
  });
}

/**
 * @desc PDPs
 */
function amendPdpElements() {
  const badgeContainer = `<div class="PL023-pdpBadge__wrapper">
    <div class="PL023-badge">
      <div>14 Day Trial</div>
      <div class="PL023-badge__row"></div>
      <div>Call to arrange</div>
      <div>0800 840 1992</div>
    </div>
  </div>`;

  const offers = document.querySelectorAll('section.container.features .feature-content ul.no-list li');
  const pdpImageContainer = document.querySelector('section.container.product.printer .images');
  // 14 Day Trial Badge
  let offerFoundInKeyFeatures = false;
  if (offers.length > 0) {
    for (let i = 0; i < offers.length; i += 1) {
      if (offers[i].querySelector('span span')) {
        const offerText = offers[i].querySelector('span span').innerText.trim();
        if (offerText.indexOf('14 Day Trial') > -1) {
          offerFoundInKeyFeatures = true;
          pdpImageContainer.insertAdjacentHTML('afterbegin', badgeContainer);
          break;
        }
      }
    }
  }
  /**
   * @desc If '14 day trial' does not exist,
   * check if it's in the Special Offers
   */
  if (!offerFoundInKeyFeatures) {
    const specialOffers = document.querySelectorAll('.special-offers-box .promotions ul.checklist li');
    if (specialOffers.length > 0) {
      for (let i = 0; i < specialOffers.length; i += 1) {
        if (specialOffers[i].querySelector('div')) {
          const offerText = specialOffers[i].querySelector('div').innerText.trim();
          if (offerText.indexOf('14 Day Trial') > -1) {
            offerFoundInKeyFeatures = true;
            pdpImageContainer.insertAdjacentHTML('afterbegin', badgeContainer);
            break;
          }
        }
      }
    }
  }
}

export { setup, amendPlpElements, amendPdpElements }; // eslint-disable-line
