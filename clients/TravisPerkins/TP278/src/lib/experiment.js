import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import categories from './components/categories';
import { data } from './data/data';
import handleShowMoreLess from './handlers/handleShowMoreLess';
import setShowMoreLess from './helpers/setShowMoreLess';

const { ID, VARIATION } = shared;

const init = () => {
  const navMenuTableWrappers = document.querySelectorAll('[class*="NavMenuTableDesktop__Wrapper"]');
  navMenuTableWrappers?.forEach((navMenuTableWrapper, index) => {
    const menuData = Object.keys(data);
    const menuKey = menuData[index];
    const menu = data[menuKey];
    if (menu) {
      const categoryWrapper = navMenuTableWrapper.querySelector('[class*="NavMenuTableDesktop__NavMenuTableDesktopWrapper"]');
      const categoryWrapperHtml = `<div class='${ID}__categoryWrapper' data-test-id="nav-table-category">
          ${categories(ID, menu)}
        <div class='${ID}__imgWrapper'>
          <a href=''>
            <img src='https://sb.monetate.net/img/1/581/5207684.png' alt='category-img' />
          </a>
          <a href=''>
            <img src='https://sb.monetate.net/img/1/581/5207685.png' alt='category-img' />
          </a>
        </div>
      </div>`;
      categoryWrapper.insertAdjacentHTML('afterbegin', categoryWrapperHtml);
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

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}__viewAll`)) {
      fireEvent('Customer clicks a “View all” option');
    } else if (target.closest(`.${ID}__categoryCard-title`)) {
      fireEvent('Customer clicks a title or arrow');
    } else if (target.closest('[data-test-id="nav-menu-bar"] a')) {
      fireEvent('Customer clicks top level category');
    } else if (target.closest('[class*="NavMenuListDesktop__LinkWrapper"] a')) {
      fireEvent('Customer clicks category name');
    } else if (target.classList.contains('show-more') || target.classList.contains('show-less')) {
      handleShowMoreLess(ID, target);
    }
  });

  if (VARIATION === 'control') return;

  setTimeout(() => {
    init();
    setShowMoreLess(ID);
  }, 1000);
};
