import { fullStory } from '../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';

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
  document.body.classList.add(`${ID}-${VARIATION}`);
};

export const generateNewPageContent = (productImages, imagesContent, pageID) => {
  const { ID, VARIATION } = shared;

  let listItems = '';
  let lastEl = '';
  // console.log('This is the data object: ', data[`${pageID}`]);
  // console.log('Type: ', typeof data[`${pageID}`]);
  // // Object.keys(myArray).length
  // console.log('Length: ', Object.keys(data[`${pageID}`]).length);
  const objectLength = Object.keys(imagesContent[`${pageID}`]).length;
  for (let i = 0; i < productImages.length; i += 1) {
    const img = productImages[i];
    // --- Check length of data
    if (objectLength == 1) {
      if (i !== 1) {
        listItems += `<li class="HC020-imageContainer">
          <img src=${img}>
          <div class="text"><p>${imagesContent[`${pageID}`][2]}</p></div>
        </li>`;
      }
    } else if (objectLength == 2) {
      if (i !== 1) {
        if (i == 0) {
          lastEl = `<li class="HC020-imageContainer">
            <img src=${img}>
            <div class="text"><p>${imagesContent[`${pageID}`][3]}</p></div>
          </li>`;
        } else if (i == 2) {
          listItems += `<li class="HC020-imageContainer">
            <img src=${img}>
            <div class="text"><p>${imagesContent[`${pageID}`][2]}</p></div>
          </li>`;
        }
      }
    } else if (objectLength == 3) {
      if (i !== 1) {
        if (i == 0) {
          lastEl = `<li class="HC020-imageContainer">
            <img src=${img}>
            <div class="text"><p>${imagesContent[`${pageID}`][4]}</p></div>
          </li>`;
        } else if (i == 2) {
          listItems += `<li class="HC020-imageContainer">
            <img src=${img}>
            <div class="text"><p>${imagesContent[`${pageID}`][2]}</p></div>
          </li>`;
        } else if (i == 3) {
          listItems += `<li class="HC020-imageContainer">
            <img src=${img}>
            <div class="text"><p>${imagesContent[`${pageID}`][3]}</p></div>
          </li>`;
        }
      }
    } else if (objectLength == 4) {
      if (i !== 1) {
        if (i == 0) {
          lastEl = `<li class="HC020-imageContainer">
            <img src=${img}>
            <div class="text"><p>${imagesContent[`${pageID}`][5]}</p></div>
          </li>`;
        } else if (i == 2) {
          listItems += `<li class="HC020-imageContainer">
            <img src=${img}>
            <div class="text"><p>${imagesContent[`${pageID}`][2]}</p></div>
          </li>`;
        } else if (i == 3) {
          listItems += `<li class="HC020-imageContainer">
            <img src=${img}>
            <div class="text"><p>${imagesContent[`${pageID}`][3]}</p></div>
          </li>`;
        } else if (i == 4) {
          listItems += `<li class="HC020-imageContainer">
            <img src=${img}>
            <div class="text"><p>${imagesContent[`${pageID}`][4]}</p></div>
          </li>`;
        }
      }
    }
    
  }
  let newImagesSection = `<div class="HC020-imagesContent__wrapper">
    <ul class="content">
      ${listItems}
      ${lastEl}
    </ul>
  </div>`;

  document.querySelector('.tab-target-mobile').insertAdjacentHTML('beforebegin', newImagesSection);
};


export const moveElementsOnPage = () => {
  const { ID, VARIATION } = shared;

  // --- MOVE STAR REVIEWS
  pollerLite(['.product-review-links.product-review-links-top'], () => {
    const reviewsEl = document.querySelector('.product-review-links.product-review-links-top');
    reviewsEl.classList.add(`${ID}-reviews`);
    document.querySelector('.product-price').insertAdjacentElement('afterend', reviewsEl);

    pollerLite(['.HC017-productPrice'], () => {
      if (document.querySelector('.HC017-productPrice')) {
        document.querySelector('.HC017-productPrice').insertAdjacentElement('afterend', reviewsEl);
      }  
    });
  });
  

  // --- MOVE WISH LIST
  pollerLite(['.wishlist-wrapper'], () => {
    const wish = document.querySelector('.wishlist-wrapper');
    document.querySelector('form.pdpForm .inventory').insertAdjacentElement('beforebegin', wish);
  });
};

export const createDeliveryGiftingLightbox = () => {
  const { ID, VARIATION } = shared;

  pollerLite(['.prod-info.prod-info-b', '.prod-info.prod-info-c', 'form.pdpForm'], () => {
    const giftingEl = document.querySelector('.prod-info.prod-info-b');
    const deliveryEl = document.querySelector('.prod-info.prod-info-c');

    document.querySelector('#check-store-stock').insertAdjacentHTML('afterend', `<div class="${ID}-giftingDelivery__wrapper"></div>`);

    document.querySelector(`.${ID}-giftingDelivery__wrapper`).insertAdjacentElement('afterbegin', deliveryEl);
    document.querySelector(`.${ID}-giftingDelivery__wrapper`).insertAdjacentElement('afterbegin', giftingEl);
    giftingEl.querySelector('h4').click();
    deliveryEl.querySelector('h4').click();

    giftingEl.querySelector('h4').insertAdjacentHTML('afterend', `<h4 class="${ID}-header active">GIFTING INFORMATION <span id="${ID}-close">X</span></h4>`);
    deliveryEl.querySelector('h4').insertAdjacentHTML('afterend', `<h4 class="${ID}-header active">DELIVERY INFORMATION</h4>`);

    
    // --- CLOSE Lightbox
    document.querySelector(`#${ID}-close`).addEventListener('click', (e) => {
      document.querySelector(`.${ID}-giftingDelivery__wrapper`).classList.remove('show');
      document.querySelector('body').classList.remove(`${ID}-noScroll`);
    });

    const deliveryGiftingContainer = `<div class="${ID}-deliveryGiftingToggle__wrapper">
      <h4 class="toggle-title">Delivery and Gifting information</h4>
    </div>`;

    document.querySelector('form.pdpForm').insertAdjacentHTML('afterend', deliveryGiftingContainer);
    document.querySelector(`.${ID}-deliveryGiftingToggle__wrapper h4.toggle-title`).addEventListener('click', (e) => {
      document.querySelector(`.${ID}-giftingDelivery__wrapper`).classList.add('show');
      document.querySelector('body').classList.add(`${ID}-noScroll`);
    });


    const subHeading = document.querySelector('#page_heading h3');
    if (subHeading) {
      document.querySelector(`.${ID}-deliveryGiftingToggle__wrapper`).insertAdjacentElement('afterend', subHeading);
    }
  });
};