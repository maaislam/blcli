/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

const init = () => {
  const targetPoint = document.querySelector('#pdpMain > .product-detail');
  targetPoint.classList.add(`${ID}__product-detail`);
  const prodInfoElements = targetPoint.querySelectorAll('.prod-info > h4');
  const mobileTabTitleElements = targetPoint.querySelectorAll('.tab-mobile-content > .tab-mobile-title');
  const firstMobileTabTitleElem = targetPoint.querySelector('.tab-mobile-content > .tab-mobile-title');
  const firstMobileTabContentElem = targetPoint.querySelector('.tab-mobile-content > .tab-mobile-title + #tabDesc');
  prodInfoElements.forEach((element) => {
    element.textContent = element.textContent.toLocaleLowerCase();
  });

  mobileTabTitleElements.forEach((element) => {
    element.textContent = element.textContent.toLocaleLowerCase();
  });

  if (VARIATION === '1') {
    firstMobileTabTitleElem.classList.add('active');
    firstMobileTabContentElem.classList.add('mb-tab-active');
    firstMobileTabContentElem.style.display = 'block';
  }
};

export default () => {
  setup();

  fireEvent('Conditions Met');

  document.body.addEventListener('pointerup', ({ target }) => {
    if (window.innerWidth <= 767) return;

    if (target.closest('h4') && target.closest(`.prod-info:not(.${ID}__active)`)) {
      const wrapper = target.closest(`.prod-info`);
      const allActiveElements = document.querySelectorAll('[class*="-active"]');
      allActiveElements &&
        allActiveElements.forEach((el) => {
          el.classList.forEach((cls) => {
            if (/^HOT-678-[^-]+-active$/.test(cls)) {
              el.classList.remove(cls);
            }
          });
        });

      const allWrapper = document.querySelectorAll('.prod-info');
      allWrapper && allWrapper.forEach((el) => el.classList.remove(`${ID}__active`));
      wrapper.classList.add(`${ID}__active`);
    } else if (target.closest('h4') && target.closest(`.prod-info.${ID}__active`)) {
      const wrapper = target.closest(`.prod-info`);
      wrapper.classList.remove(`${ID}__active`);
    } else if (target.closest('.HOT-678-accordion--title')) {
      const prodInfoElem = document.querySelectorAll(`.prod-info.${ID}__active`);
      if (prodInfoElem) {
        prodInfoElem.forEach((item) => item.classList.remove(`${ID}__active`));
      }
    }
  });
  if (VARIATION == 'control') {
    return;
  }

  init();
};
