import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

import { data } from './data/data';
import { observeDOM } from './helpers/utils';
import { navItemUrlSelector } from './helpers/navItemUrlSelector';

const { ID, VARIATION } = shared;

const init = () => {
  const navMenuUrls = document.querySelectorAll(navItemUrlSelector);
  navMenuUrls?.forEach((navItemUrl) => {
    const itemUrl = navItemUrl?.getAttribute('href').trim();
    const navTableCategory = navItemUrl.closest('ul[data-test-id="nav-table-category-list"]').parentElement;
    const subCategoryHref = navTableCategory.querySelector('[class^="NavMenuListDesktop"] a')?.getAttribute('href');
    const matchingObj = data[itemUrl];

    if (subCategoryHref === matchingObj?.subCategoryUrl) {
      if (matchingObj?.orangeLabel === true && VARIATION === '1') {
        navItemUrl.classList.contains(`${ID}__remove`) && navItemUrl.classList.remove(`${ID}__remove`);
      } else {
        matchingObj && navItemUrl.parentElement.classList.add(`${ID}__remove`);
      }
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
