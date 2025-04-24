import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

import brandData from './brandData';
import obsIntersection from './helpers/observeIntersection';
import { getParentCategory } from './helpers/utils';

const { ID, VARIATION } = shared;

export default () => {
  const { parentCategories } = getParentCategory();

  setup(); //use if needed
  console.log('SCR022 init....');

  document.body.addEventListener('input', ({ target }) => {
    if (target.closest('[data-qaid="pdp-product-quantity"]')) {
      fireEvent('User interacts with search');
    }
  });

  document.body.addEventListener('click', ({ target }) => {
    if (target.closest('[data-qaid="meganav-item"]')) {
      fireEvent(`User interacts with navigation | ${target.closest('li').querySelector('a').innerText}`);
    } else if (target.closest('[data-qaid="pdp-best-seller-container"]')) {
      fireEvent('User interact with best sellers');
    } else if (target.closest('[data-qaid="pdp-button-deliver"]')) {
      fireEvent('User interacts with the delivery CTA');
    } else if (target.closest('[data-qaid="pdp-button-click-and-collect"]')) {
      fireEvent('User interacts with the click & collect CTA');
    } else if (target.closest('[data-qaid="breadcrumb-qa"]')) {
      fireEvent('User interact with breadcrumbs');
    } else if (target.closest(`.${ID}__shopall`)) {
      fireEvent('User interact with “shop all” cta in  banner');
    } else if (target.closest(`.${ID}__shopcategory`)) {
      fireEvent('User interact with category cta in  banner');
    } else if (target.closest(`.${ID}__brandbanner`) && VARIATION !== '3') {
      fireEvent('User interact with experiment banner');
    }
  });

  //document.querySelector('.pr__product #qty').addEventListener('keyup', () => {});

  //console.log(ID);
  const anchorElm = document.querySelector('[data-qaid="pdp-best-seller-container"]');

  const intersectionCallback = (entry) => {
    //console.log('file: experiment.js:77 ~ entry', entry);
    if (entry.isIntersecting && !document.querySelector(`.${ID}__seen`)) {
      entry.target.classList.add(`${ID}__seen`);
      anchorElm.classList.add('fade-in-fwd');
      fireEvent('Conditions Met');
    }
  };

  obsIntersection(anchorElm, 0.02, intersectionCallback);

  //-----------------------------
  //If control, bail out from here
  //-----------------------------
  if (VARIATION === 'control') {
    return;
  }

  //-----------------------------
  //Write experiment code here
  //-----------------------------
  //...

  const brandElem = document.querySelector('[data-qaid="pdp-brand-logo"]');
  if (!brandElem) return;
  const brandName = brandElem.getAttribute('alt');
  const brandLogo = brandElem.getAttribute('src');

  const pdpCategory = parentCategories[parentCategories.length - 1];
  //console.log('file: experiment.js:77 ~ pdpCategory', pdpCategory);

  if (!brandData[pdpCategory]) return;

  const brandDetails = brandData[pdpCategory][brandName];
  console.log(brandData, brandDetails);

  const textContent =
    VARIATION === '1'
      ? `SHOP ${brandName} ${pdpCategory}`
      : VARIATION === '2'
      ? `SHOP ALL ${brandName}`
      : `We have lots more ${brandName} products available`;

  const htmlStr = `
      <a class="${ID}__brandbanner" 
         href="${VARIATION === '1' ? brandDetails.v1Url : brandDetails.v2Url}">
        <div class="${ID}__brandbanner--text">${textContent}</div>
        <div class="${ID}__brandbanner--logo"><img width="107" height="50" src="${brandLogo}" alt="${brandName}" /></div>
      </a>
      `;
  const v3Html = `
    <div class="${ID}__brandbanner">
        <div class="${ID}__brandbanner--text">${textContent}</div>
        <div class="${ID}__brandbanner--logo"><img width="107" height="50" src="${brandLogo}" alt="${brandName}" /></div>
        <div class="${ID}__brandbanner--buttons ZjkWkc">
          <a href="${brandDetails.v1Url}" class="${ID}__shopall btn btn--lg fill Vg1ac_ _0Bc83U ooy6_x M3d0F0">Shop all ${brandName}</a>
          <a href="${brandDetails.v2Url}" class="${ID}__shopcategory btn btn--lg fill Vg1ac_ _0Bc83U ooy6_x M3d0F0">Shop ${brandName} ${pdpCategory}</a>
        </div>
    </div>
    `;

  anchorElm.insertAdjacentHTML('afterbegin', VARIATION === '3' ? v3Html : htmlStr);
};
