/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { slotInfo, getUrlByClassName } from './files/data';
import { topRatedMarkUp } from './files/topRatedMarkup';

const { ID, VARIATION } = shared;

export default () => {
  //console.log(`Running experiment ${ID} - ${VARIATION}`);

  setup();
  fireEvent('Conditions Met');

  document.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest('.second-level-listing')) {

      if (target.getAttribute("href") === 'https://avon.uk.com/collections/bestsellers') {
        fireEvent(`User clicks on Top Rated in the main navigation`);
      }

      if (target.getAttribute("href") === '/collections/make-up') {
        fireEvent(`User clicks the makeup category in the main nav`);
      }

      if (target.getAttribute("href") === '/collections/skincare') {
        fireEvent(`User clicks the skincare category in the main nav`);
      }
      if (target.getAttribute("href") === '/collections/bath-body') {
        fireEvent(`User clicks the Bath & Body category in the main nav`);
      }
      if (target.getAttribute("href") === '/collections/fragrance') {
        fireEvent(`User clicks the Fragrance category in the main nav`);
      }

    }

  });

  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  fireEvent(`Running experiment ${ID} - test 01`);

  if (document.querySelector(`[class^="${ID}-nav__element--"]`)) return;
  //render new Nav Element

  if (!document.querySelector('.top-rated.AV153-site-navigation-megamenu')) {

    document.querySelector('a[href="https://avon.uk.com/collections/bestsellers"]')
      .closest(".second-level-listing").classList.add("has-children", "new-top-rated");

    document.querySelector('li.second-level-listing.new-top-rated')
      .insertAdjacentHTML("beforeend", topRatedMarkUp(ID));
  }

  for (let key in slotInfo) {

    if (slotInfo.hasOwnProperty(key)) {
      const categoryDiv = document.createElement("div");
      categoryDiv.classList.add(`${ID}-nav__element--${key}`);
      categoryDiv.setAttribute('data-item', key);
      categoryDiv.classList.add("category");

      const infoArray = slotInfo[key].info;

      infoArray.forEach((item, i) => {
        const { className, header, subcopy, image, url, bgColor } = item;

        const htmlElm = `
        <div class="new__nav--slot ${className}" style="background-color: ${bgColor};">
            <div class="nav--slot-content">
                <p class="hero-title hero-title-${key} hero-title-${i}">${header}</p>
                <div class="content-body content-body-${key}">
                    <p class="sub-title">${subcopy}</p>
                    <a class="btn custom-btn btn-${key}" href="${url}">Shop Now</a>
                </div>
            </div>
        
            <div class="slot-img__wrapper" data-src="${image}">
                <img class="img-fluid lazyloaded slot-image-${key} slot-image-${i}" src="${image}" alt="slot-image-${i}">
            </div>
        </div>
        `;

        categoryDiv.innerHTML += htmlElm;
      });

      document.querySelector(`.site-navigation-megamenu.${key}`).append(categoryDiv);

      //add event listener to fire event when user sees the expanded category
      ['mouseenter', 'touchstart'].forEach((event) => {

        document.querySelector(`.site-navigation-megamenu.${key}`).closest('li.second-level-listing').addEventListener(event, (e) => {
          fireEvent(`User sees the expanded ${key} category in the main nav`);
        });
      });
    }
  }

  document.addEventListener('click', (e) => {
    const { target } = e;

    if (
      target.closest('.new-top-rated') &&
      document.querySelector('#header-navigation-mobile > nav') &&
      !target.closest('.third-level-listing')
    ) {
      e.preventDefault();
      target.closest('.new-top-rated')
        .querySelector('.top-rated .third-level').classList.add('active');

      target.closest('.new-top-rated')
        .querySelector('.top-rated .mobile-navigation-title').textContent = 'Top Rated';

    }

    if (target.closest(`.${ID}-site-navigation-megamenu`)) {
      target.closest('.third-level')?.classList.remove('active');
    }

    if (target.closest(`.all-top-rated`)) {
      fireEvent(`User clicks on All Top Rated in the Top Rated drop down`);
    }

    if (target.closest(`.all-make-up`)) {
      fireEvent(`User clicks on Make up in the Top Rated drop down`);
    }

    if (target.closest(`.all-skin-care`)) {
      fireEvent(`User clicks on Skincare in the Top Rated drop down`);
    }

    if (target.closest(`.all-bath-body`)) {
      fireEvent(`User clicks on Bath & Body in the Top Rated drop down `);
    }

    if (target.closest(`.all-fragrance`)) {
      fireEvent(`User clicks on Fragrance in the Top Rated drop down`);
    }

    if (target.closest('.new__nav--slot')) {
      let exactClassName = target.closest('.new__nav--slot').classList[1];

      let targetUrl = getUrlByClassName(exactClassName)[0];
      let CategoryName = getUrlByClassName(exactClassName)[1];
      let productName = getUrlByClassName(exactClassName)[2];
      fireEvent(`User interacts with the ${productName} slot in the ${CategoryName} dropdown `);
      location.href = targetUrl;
    }
  });
};
