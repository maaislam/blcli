import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

import brandData from './brandData';
import obsIntersection from './helpers/observeIntersection';
import { getParentCategory, onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;

const DOM_RENDER_DELAY = 2000;

const init = () => {
  const { parentCategories } = getParentCategory();
  const anchorElm = document.querySelector('[data-qaid="product-tile"] > div:last-child > div');
  const brandElem = document.querySelector('[data-qaid="pdp-brand-logo"]');

  if (!brandElem) return;
  const brandName = brandElem.getAttribute('alt');

  const brandLogo = brandElem.getAttribute('src');

  const pdpCategory = parentCategories[parentCategories.length - 1];

  if (!brandData[pdpCategory]) return;

  const brandDetails = brandData[pdpCategory][brandName];

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
        <div class="${ID}__brandbanner--buttons h3w2GY j57Zqz">
          <a href="${brandDetails.v1Url}" class="${ID}__shopall kND5MA AusteP _1_UNke M3d0F0">Shop all ${brandName}</a>
          <a href="${brandDetails.v2Url}" class="${ID}__shopcategory kND5MA AusteP _1_UNke M3d0F0">Shop ${brandName} ${pdpCategory}</a>
        </div>
    </div>
    `;

  anchorElm.insertAdjacentHTML('afterend', VARIATION === '3' ? v3Html : htmlStr);
};

export default () => {
  setup(); //use if needed
  console.log('SCR022 init....');

  document.body.addEventListener('input', ({ target }) => {
    if (target.closest('[data-qaid="pdp-product-quantity"]')) {
      fireEvent('User interacts with search');
    }
  });

  document.body.addEventListener('click', ({ target }) => {
    if (target.closest('#site-navigation')) {
      fireEvent(`User interacts with navigation | ${target.closest('li').querySelector('a').innerText}`);
    } else if (target.closest('#recommendations_container')) {
      fireEvent('User interact with best sellers');
    } else if (target.closest('[id^="product_add_to_trolley"]')) {
      fireEvent('User interacts with the delivery CTA');
    } else if (
      target.closest('[id^="add_for_collection_button"]') &&
      target.closest('[id^="add_for_sticky_collection_button"]')
    ) {
      fireEvent('User interacts with the click & collect CTA');
    } else if (target.closest('.bc__list')) {
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
    if (entry.isIntersecting) {
      entry.target.classList.add(`${ID}__seen`);
      //anchorElm.classList.add('fade-in-fwd');
      fireEvent('Conditions Met');
      console.log('SCR022 conditions met');
    }
  };

  obsIntersection(anchorElm, 0.02, intersectionCallback);

  //-----------------------------
  //If control, bail out from here
  //-----------------------------
  if (VARIATION === 'control') {
    return;
  }

  setTimeout(init, DOM_RENDER_DELAY);
  onUrlChange(() => {
    pollerLite(['#__next', '#__NEXT_DATA__', () => window.__NEXT_DATA__ !== undefined], () => {
      setTimeout(init, DOM_RENDER_DELAY);
    });
  });
};
