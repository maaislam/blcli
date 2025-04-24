import brandsAndCategories from './components/brandsAndCategories';
import gifting from './components/gifting';
import HomepageMarkup from './components/homepageMarkup';
import mobileHeader from './components/mobileHeader';
/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';

export default () => {

  const { ID } = shared;
  setup();

  mobileHeader();
  new HomepageMarkup();
  brandsAndCategories();
  gifting();

  /**
   * Mobile search
   */
  const moveMobileSearch = () => {
    
    // move search
    const searchBox = document.querySelector(`.top-search-banner`);
    document.querySelector('.page-header').insertAdjacentElement('beforeend', searchBox);

  }

  if(window.innerWidth < 767) {
    moveMobileSearch();
  }
  /**
   * Click events
   */
  const removeActive = () => {
    const activeContent = document.querySelectorAll(`.${ID}-contentWrapper.${ID}-active`);
    if(activeContent) {
      [...activeContent].forEach((el) => {
        el.classList.remove(`${ID}-active`);
        document.body.classList.remove(`${ID}-noScroll`);
      });
    }
   }


   // on click of homepage banners
  const allBanners = document.querySelectorAll(`.${ID}-homepageWrapper .${ID}-category`);
  for (let index = 0; index < allBanners.length; index += 1) {
    const element = allBanners[index];
    if(element.getAttribute('cat-target')) {
      element.addEventListener('click', (e) => {
        removeActive();
        const elTarget = e.currentTarget.getAttribute('cat-target');
        const matchingEl = document.querySelector(`.${ID}-contentWrapper[name=${elTarget}]`);
        if(matchingEl) {
          document.body.classList.add(`${ID}-noScroll`);
          matchingEl.classList.add(`${ID}-active`);
        }
      });
    }
  }

  // on back click
  const allBackArrows = document.querySelectorAll(`.${ID}-contentWrapper .${ID}-back`);
  for (let x = 0; x < allBackArrows.length; x += 1) {
    const el = allBackArrows[x];
    if(el) {
      el.addEventListener('click', () => {
        window.scrollTo(0, 0);
        removeActive();
      });
    }
  }

  /**
   * Change products title
   */
  const changeProductTitle = () => {
    const productNameElms = document.querySelectorAll('.product-item-details .product-item-name');
    [].forEach.call(productNameElms, (productNameElm) => {
      const link = productNameElm.querySelector('.product-item-link');
      if(link) {
        const text = link.innerText.trim();
        const regex = /^([^:]+:)/i;
        const regexMatches = text.match(regex);
  
        if(regexMatches && regexMatches[1]) {
          const newTitle = text.replace(regex, '');
          link.innerHTML = newTitle;
  
          link.insertAdjacentHTML('afterbegin', `
            <span class="${shared.ID}-cat-name">${regexMatches[1].replace(/:$/, '')}</span>
          `);
        }
      }
    });
  }
  changeProductTitle();
};
