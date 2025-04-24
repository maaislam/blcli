/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';
import categories from './categories';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  if(VARIATION === '1') {
    const createTopBanners = () => {
      const topBannerMarkup = document.createElement('div');
      topBannerMarkup.classList.add(`${ID}-topBanners`);
      topBannerMarkup.innerHTML = `
      <div class="${ID}-banner ${ID}-gifts" data-target="gifts">
        <div class="${ID}-textcontent">
          <span>Shop</span>
          <h3>Gifts</h3>
        </div>
      </div>
      <div class="${ID}-banner ${ID}-chocolate" data-target="chocolate">
      <div class="${ID}-textcontent">
        <span>Shop</span>
        <h3>All Chocolate</h3>
      </div>
      </div>`;

      document.querySelector('#main > .fullwidth-image').insertAdjacentElement('afterend', topBannerMarkup);
    }

    createTopBanners();
    categories();


    const removeActive = () => {
      const activeContent = document.querySelectorAll(`.${ID}-contentWrapper.${ID}-active`);
      if(activeContent) {
        [...activeContent].forEach((el) => {
          el.classList.remove(`${ID}-active`);
          document.body.classList.remove(`${ID}-noScroll`);
        });
      }
    }

    const iconTracking = () => {
      const allicons = document.querySelectorAll(`.${ID}-contentWrapper .${ID}-block`);
      for (let index = 0; index < allicons.length; index += 1) {
        const element = allicons[index];
        element.addEventListener('click', (e) => {
          const iconName = e.currentTarget.querySelector('p').textContent;
          events.send(`${ID} variation: ${VARIATION}`, 'click', `category: ${iconName}`);
        });
      }
    }

    const allBanners = document.querySelectorAll(`.${ID}-topBanners .${ID}-banner`);
    for (let index = 0; index < allBanners.length; index += 1) {
      const element = allBanners[index];
      if(element.getAttribute('data-target')) {
        element.addEventListener('click', (e) => {
          removeActive();
          const elTarget = e.currentTarget.getAttribute('data-target');
          const matchingEl = document.querySelector(`.${ID}-contentWrapper[name=${elTarget}]`);
          if(matchingEl) {
            document.body.classList.add(`${ID}-noScroll`);
            matchingEl.classList.add(`${ID}-active`);
            events.send(`${ID} variation: ${VARIATION}`, 'click', `banner ${elTarget}`);
          }
          iconTracking();
        });
      }
    }

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
  } else if (VARIATION === '2') {
    const createTopBanners = () => {
      const topBannerMarkup = document.createElement('div');
      topBannerMarkup.classList.add(`${ID}-topBanners`);
      topBannerMarkup.innerHTML = `
      <a class="${ID}-banner ${ID}-gifts" href="https://www.hotelchocolat.com/uk/shop/gift-ideas/">
        <div class="${ID}-textcontent">
          <span>Shop</span>
          <h3>Gifts</h3>
        </div>
      </a>
      <a class="${ID}-banner ${ID}-chocolate" href="https://www.hotelchocolat.com/uk/shop/collections/products/all-products/">
      <div class="${ID}-textcontent">
        <span>Shop</span>
        <h3>All Chocolate</h3>
      </div>
      </a>`;

      document.querySelector('#main > .fullwidth-image').insertAdjacentElement('afterend', topBannerMarkup);
    }
    const bannerTracking = () => {
      const giftBanner = document.querySelector(`.${ID}-banner.${ID}-gifts`);
      if(giftBanner) {
        giftBanner.addEventListener('click', () => {
          events.send(`${ID} variation:${VARIATION}`, 'click', 'All gifts banner');
        });
      }

      const allchocBanner = document.querySelector(`.${ID}-banner.${ID}-chocolate`);
      if(allchocBanner) {
        allchocBanner.addEventListener('click', () => {
          events.send(`${ID} variation:${VARIATION}`, 'click', 'All Chocolate banner');
        });
      }
    }
    createTopBanners();
    bannerTracking();
  }


};
