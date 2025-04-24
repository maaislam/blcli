/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';
import bannerData from './bannerData';
import slideOutCategories from './slideOutCategories';

const { ID, VARIATION } = shared;


export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();

    /**
     * Add banner markup
     */
    const addBannerWrapper = () => {
      const bannerWrap = document.createElement('div');
      bannerWrap.classList.add(`${ID}-bannerWrap`);
      if(VARIATION === '1') {
        bannerWrap.innerHTML = `
        <div class="${ID}-bannersContainer"></div>
        ${window.innerWidth > 767 ? `
        <div class="${ID}-bannerCategories ${ID}-first"><div class="${ID}-catInner"></div></div>
        <div class="${ID}-bannerCategories ${ID}-second"><div class="${ID}-catInner"></div></div>
        <div class="${ID}-bannerCategories ${ID}-third"><div class="${ID}-catInner"></div></div>` : ''}`;
      }
      if(VARIATION === '2') {
        bannerWrap.innerHTML = `
        <div class="${ID}-bannersContainer"></div>
        <div class="${ID}-bannerCategories ${ID}-first"><div class="${ID}-catInner"></div></div>
        <div class="${ID}-bannerCategories ${ID}-second"><div class="${ID}-catInner"></div></div>
        <div class="${ID}-bannerCategories ${ID}-third"><div class="${ID}-catInner"></div></div>`;
      }
     

      document.querySelector('#access-content .seo-text-block').insertAdjacentElement('afterend', bannerWrap);
    }

    if(VARIATION === '1' || VARIATION === '2') {
      addBannerWrapper();
      bannerData();
    }


    if(VARIATION === '3') {
      /**
       * App style banners
       */
      const categoryBanners = () => {
        const BannerMarkup = document.createElement('div');
        BannerMarkup.classList.add(`${ID}-topBanners`);
        BannerMarkup.innerHTML = `
        <div class="${ID}-bannerInner ${ID}-elFirst" data-target="elFirst">
              <div class="${ID}-title"><span>${getSiteFromHostname() === 'ernestjones' ? 'Diamonds' : 'Engagement'}</span></div>
        </div>
        <div class="${ID}-bannerInner ${ID}-elSecond" data-target="elSecond">
          <div class="${ID}-title"><span>Watches</span></div>
        </div>
        <div class="${ID}-bannerInner ${ID}-elThird" data-target="elThird">
          <div class="${ID}-title"><span>${getSiteFromHostname() === 'ernestjones' ? 'Bridal' : 'Jewellery'}</span></div>
        </div>
        <div class="${ID}-bannerInner ${ID}-elFourth" data-target="elFourth">
          <div class="${ID}-title"><span>${getSiteFromHostname() === 'ernestjones' ? 'Jewellery' : 'Gifts'}</span></div>
        </div>
        `;
    
        document.querySelector('#access-content .seo-text-block').insertAdjacentElement('afterend', BannerMarkup);
      }

      categoryBanners();
      slideOutCategories();

      const removeActive = () => {
        const activeContent = document.querySelectorAll(`.${ID}-contentWrapper.${ID}-active`);
        if(activeContent) {
          [...activeContent].forEach((el) => {
            el.classList.remove(`${ID}-active`);
            document.body.classList.remove(`${ID}-noScroll`);
          });
        }
      }

     

      const allBanners = document.querySelectorAll(`.${ID}-topBanners .${ID}-bannerInner`);
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
              const bannerName = matchingEl.querySelector(`.${ID}-title`).textContent.trim().replace('Back', '');
              events.send(`${ID} variation: ${VARIATION}`, 'click', `banner ${bannerName}`);
            }
          });
        }
      }

      const allBackArrows = document.querySelectorAll(`.${ID}-contentWrapper .${ID}-back`);
      for (let x = 0; x < allBackArrows.length; x += 1) {
        const el = allBackArrows[x];
        if(el) {
          el.addEventListener('click', () => {
            removeActive();
            window.jQuery(`.SG103-contentWrapper .SG103-innerBlocks`).scrollTop(0);
          });
        }
      }
      const slideOutEvents = () => {
        const slideoutSubCat = document.querySelectorAll(`.${ID}-innerBlocks .${ID}-block`);
        if(slideoutSubCat) {
          for (let index = 0; index < slideoutSubCat.length; index += 1) {
            const element = slideoutSubCat[index];
            element.addEventListener('click', () => {
              const elName = element.querySelector('p').textContent.trim();
              events.send(`${ID} V:${VARIATION}`, 'click', `Subcategory: ${elName}`);
            });
          }
        }

        const slideoutButton = document.querySelectorAll(`.${ID}-contentWrapper .${ID}-button`);
        if(slideoutButton) {
          for (let index = 0; index < slideoutButton.length; index += 1) {
            const el = slideoutButton[index];
            el.addEventListener('click', () => {
              const buttonName = el.textContent.trim();
              events.send(`${ID} V:${VARIATION}`, 'click', `Shop all: ${elName}`);
            });
          }
        }
      }
      slideOutEvents();
    
    }
  }
};
