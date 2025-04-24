import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import search from './components/search';
import quantityHandler from './handlers/quantityHandler';
import addToCartHandler from './handlers/addToCartHandler';
import { searchComponent, overlay } from './components/searchComponent';
import setBestSellingProducts from './helpers/setBestSellingProducts';
import {
  overlayWithSearch,
  excludeOverlayWithSearch,
  overlayOpen,
  overlayClose
} from './helpers/utils';

const { ID, VARIATION } = shared;

const init = () => {
  const isMobile = () => window.DY.deviceInfo.type === 'smartphone';
  //overlay component add
  if (document.querySelector(`.${ID}__overlay`)) {
    document.querySelector(`.${ID}__overlay`).remove();
  }

  if (document.querySelector(`.${ID}__container`)) {
    [...document.querySelectorAll(`.${ID}__container`)].forEach((item) => {
      item.remove();
    });
  }

  //overlay add
  document.body.insertAdjacentHTML('beforeend', overlay(ID));
  document.querySelector('header').insertAdjacentHTML('beforebegin', overlay(ID));

  if (VARIATION === '1') {
    //content add mobile
    document
      .querySelector('#LogoBar ~ #SearchBar #SearchInput form')
      ?.insertAdjacentHTML('beforeend', searchComponent(ID));

    //content add desktop
    document
      .querySelector('body #LogoSearchBagBar #SearchInput form')
      ?.insertAdjacentHTML('beforeend', searchComponent(ID));
  } else if (VARIATION === '2') {
    const searchInputSelector = isMobile() ? '#LogoBar ~ #SearchBar #SearchInput form' : 'body #LogoSearchBagBar #SearchInput form';
    document
      .querySelector(searchInputSelector)
      ?.insertAdjacentHTML('beforeend', search(ID));

    //content add desktop
    // document
    //   .querySelector('body #LogoSearchBagBar #SearchInput form')
    //   ?.insertAdjacentHTML('beforeend', search(ID));
  }

  const searchInputMobile = document.querySelector('#LogoBar ~ #SearchBar #SearchInput input');
  const searchInputDesktop = document.querySelector('body #LogoSearchBagBar #SearchInput input');

  if (searchInputMobile) searchInputMobile.placeholder = 'Search product name or ID';
  if (searchInputDesktop) searchInputDesktop.placeholder = 'Search product name or ID';

  const overlayComOne = document.querySelector(`#HeaderPlaceholder .${ID}__overlay`);
  const overlayComTwo = document.querySelector(`#HeaderPlaceholder ~ .${ID}__overlay`);

  searchInputMobile &&
    searchInputMobile.addEventListener('focus', (event) => {
      overlayOpen(overlayComOne, overlayComTwo);
      if (!event.target.value) {
        overlayWithSearch(`#LogoBar ~ #SearchBar #SearchInput .${ID}__container`);
      }
    });

  searchInputDesktop &&
    searchInputDesktop.addEventListener('focus', (event) => {
      overlayOpen(overlayComOne, overlayComTwo);
      document
        .querySelector('body #LogoSearchBagBar #SearchBar')
        .classList.add(`${ID}__widthChange`);
      if (!event.target.value) {
        overlayWithSearch(`body #LogoSearchBagBar #SearchInput .${ID}__container`);
      }
    });

  //mobile
  searchInputMobile &&
    searchInputMobile.addEventListener('input', (event) => {
      if (event.target.value) {
        document.querySelector(
          `#LogoBar ~ #SearchBar #SearchInput .${ID}__container`
        ).style.display = 'none';
      } else {
        document.querySelector(
          `#LogoBar ~ #SearchBar #SearchInput .${ID}__container`
        ).style.display = 'block';
      }
    });

  //desktop
  searchInputDesktop &&
    searchInputDesktop.addEventListener('input', (event) => {
      if (event.target.value) {
        document.querySelector(
          `body #LogoSearchBagBar #SearchInput .${ID}__container`
        ).style.display = 'none';
      } else {
        document.querySelector(
          `body #LogoSearchBagBar #SearchInput .${ID}__container`
        ).style.display = 'block';
      }
    });


  document.body.addEventListener('click', (event) => {
    if (event.target === overlayComOne || event.target === overlayComTwo) {
      overlayClose(overlayComOne, overlayComTwo);
      excludeOverlayWithSearch(ID);
    }
  });

  if (window.location.pathname.includes('/reduceri')) {
    setBestSellingProducts(ID);
  }
};

export default () => {
  setup();
  
  const isMobile = () => window.DY.deviceInfo.type === 'smartphone';
  //tracking - 1
  const searchInputSelector = isMobile() ? '#LogoBar ~ #SearchBar #SearchInput form input' : 'body #LogoSearchBagBar #SearchInput form input';
  const searchInput = document.querySelector(searchInputSelector);

  if (searchInput) {
    searchInput.addEventListener("focus", () => {
      fireEvent('User interacts with search');
    });

    //tracking - 2
    searchInput.addEventListener("input", (e) => {
      const searchValue = e.target.value;
      if (searchValue.length > 3) {
        fireEvent(`User searches ${searchValue}`);
      }
    });
  }

  //tracking - 3
  document.body.addEventListener("mouseover", (e) => {
    const target = e.target;
    if (target.closest('#HeaderMenu') && target.closest('#HeaderMenu a span')) {
      const navItemText = target.closest('#HeaderMenu a span').innerText;
      fireEvent(`User interacts with navigation - ${navItemText}`);
    } else if (target.closest('#HeaderSubmenus') && target.closest('#HeaderSubmenus li')) {
      const navItemText = target.closest('#HeaderSubmenus li a').innerText;
      fireEvent(`User interacts with navigation - ${navItemText}`);
    }
  });

  //tracking - 4,5,6
  document.body.addEventListener('click', (event) => {
    const target = event.target;

    if (target.closest(`.${ID}__addtocart-block`)) {
      fireEvent('User adds to bag from PLP');
    }

    if (target.closest(`.${ID}__productcard`)) {
      // Check if the clicked element is the increase button
      quantityHandler(ID, target);
      addToCartHandler(ID, target);
    } else if (target.closest('.AddToCart a.Button')) {
      fireEvent('User adds to bag from PLP');
    } else if (target.closest(`.${ID}__container ul li a`)) {
      const searchListTitle = target.closest(`.${ID}__container ul li a`).textContent;
      fireEvent(`User selects a suggestion - ${searchListTitle}`);
    } else if (target.closest(`.${ID}__overlay`)) {
      fireEvent('User closes search');
    }
  });

  document.body.addEventListener('pointerup', (event) => {
    const target = event.target;
    if (target.closest('.HeaderMenuItem')) {
      const navItemText = target.closest('.HeaderMenuItem span').innerText;
      fireEvent(`User interacts with navigation - ${navItemText}`);
    } else if (target.closest('.omni-category')) {
      const navItemText = target.closest('.omni-category').innerText;
      fireEvent(`User interacts with navigation - ${navItemText}`);
    }
  });

  if (VARIATION === 'control') {
    return;
  }

  init();
};
