/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { navItemUrlSelector } from './helpers/navItemUrlSelector';
import { observeDOM } from './helpers/utils';

const { ID, VARIATION } = shared;

const init = () => {
  const navMenuUrls = document.querySelectorAll(navItemUrlSelector);
  navMenuUrls?.forEach((navItemUrl) => {
    const itemUrl =
      window.innerWidth > 767 ? navItemUrl.querySelector('span > span')?.innerText : navItemUrl.querySelector('span')?.innerText;
    if (itemUrl.toLowerCase().includes('view all')) {
      navItemUrl.parentElement.classList.add(`${ID}__remove`);
    }
  });
};

export default () => {
  setup();
  const isMobile = !!document.querySelector('[class^="MobileLayout__PageWrapper"]');
  const eventTypes = isMobile ? 'click' : 'mouseenter';
  const validMenuUrls = [
    '/product/building-materials/c/1500029/',
    '/product/timber-and-sheet-materials/c/1500000/',
    '/product/gardens-and-landscaping/c/1500098/',
  ];

  const menuClassName = isMobile
    ? '[class^="NavMenuBaseCategoryMobile__Wrapper-sc"]'
    : '[class^="NavMenuDesktop__NavMenuBarItem-sc"]';

  const primaryNavs = document.querySelectorAll(menuClassName);

  primaryNavs?.forEach((primaryNav, i) => {
    if (i > 2) return;

    primaryNav.addEventListener(eventTypes, (e) => {
      const { target } = e;

      if (target.closest(menuClassName) && !target.closest('[class^="NavMenuSubCategoryMobile__SubCategoryTitle-sc"]')) {
        const parentElement = target.closest(menuClassName);
        const href = parentElement.querySelector('a')?.getAttribute('href');

        if (validMenuUrls.includes(href)) {
          fireEvent('Conditions Met');
          fireEvent(`user interacted with ${href}`);
        }
      }
    });
  });

  //if control bail out here

  if (VARIATION === 'control') return;

  init();
  observeDOM('body', init);
};
