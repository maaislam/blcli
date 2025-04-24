/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from './helpers/utils';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import wrapper from './components/wrapper';
import data from './data/data';

const { ID, VARIATION } = shared;

const init = () => {
  const { pathname } = window.location;
  const isExistingPage = data.find((item) => item.link.toLocaleLowerCase() === pathname.toLocaleLowerCase());

  if (!isExistingPage) {
    return;
  }
  setup();
  fireEvent('Conditions Met');

  if (isExistingPage.tag) {
    isExistingPage.tag.includes('FREE boiler')
      ? fireEvent(`user sees a "FREE boiler service in year one worth £120" badge`)
      : fireEvent(`user sees a "limited offer" badge`);
  } else {
    fireEvent('user sees a no badge');
  }

  if (VARIATION == 'control') {
    return;
  }

  pollerLite(['.banner-pricing-wrapper .mb0-xs'], () => {
    const bannerWrapper = document.querySelector('.banner-pricing-wrapper');
    const mainContent = bannerWrapper.querySelector('.panel-body > div');
    const cloneMainContent = mainContent.cloneNode(true);
    if (!document.querySelector(`.${ID}__container`)) {
      bannerWrapper.querySelector('.panel-body').insertAdjacentHTML('afterbegin', wrapper(ID, isExistingPage));
      document.querySelector(`.${ID}__content`).insertAdjacentElement('afterbegin', cloneMainContent);
      fireEvent('user sees a lo stress promo');
    }

    const prices = document.querySelectorAll(`.${ID}__content .homeserve_thick`);
    prices.forEach((item, index) => {
      const onlyPrice = item.innerText?.split(':')[1];
      document.querySelectorAll(`.${ID}__priceWrapper .${ID}__number`)[index].innerText = onlyPrice;
      document.querySelectorAll(`.${ID}__priceWrapper .${ID}__price`)[index].classList.remove(`${ID}__hide`);
    });

    const labelElement = document.querySelector(`.${ID}__content .first-yr-label`);
    if (labelElement) {
      labelElement.textContent = 'a month in year one';
    }
  });

  pollerLite(['.page--product .hero-banner__side.with-sticky'], () => {
    const mainWrapper = document.querySelector('.page--product .hero-banner__side.with-sticky');
    const priceInfo = mainWrapper.querySelector('.price-info');
    const tableElement = mainWrapper.querySelector('table.mini-table');
    if (!document.querySelector(`.${ID}__container`)) {
      mainWrapper.querySelector('.bubble').insertAdjacentHTML('afterbegin', wrapper(ID, isExistingPage));
      priceInfo && document.querySelector(`.${ID}__content .${ID}__priceWrapper`).insertAdjacentElement('beforebegin', priceInfo);
      tableElement &&
        document.querySelector(`.${ID}__content .${ID}__priceWrapper`).insertAdjacentElement('beforebegin', tableElement);
      fireEvent('user sees a lo stress promo');
    }

    const prices = document.querySelectorAll(`.${ID}__content .mini-table tr:not(.hidden)`);
    prices.forEach((item, index) => {
      const onlyPrice = item.innerText?.split(':')[1]?.replace('\t', '');
      document.querySelectorAll(`.${ID}__priceWrapper .${ID}__number`)[index].innerText = onlyPrice;
      document.querySelectorAll(`.${ID}__priceWrapper .${ID}__price`)[index].classList.remove(`${ID}__hide`);
    });

    const labelElement = document.querySelector(`.${ID}__content span.small`);
    if (labelElement) {
      labelElement.textContent = 'a month in year one';
    }
  });
};

export default () => {
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-970RHZRVZ4';

  document.body.addEventListener('click', (event) => {
    const { target } = event;
    if (target.closest(`.${ID}__popup`)) {
      const clickedItem =
        document.querySelector(`.${ID}__container ~ div #custom-popup:not(.${ID}__popup)`) ||
        document.querySelector('.mini-table [data-popup="info-excess"]');
      clickedItem.click();
      pollerLite(['#custom-popup-view'], () => {
        const popupupView = document.querySelector('#custom-popup-view').cloneNode(true);
        const targetPoint = document.querySelector(`.${ID}__price.excess`);
        if (!targetPoint.querySelector('#custom-popup-view')) {
          targetPoint.insertAdjacentElement('beforeend', popupupView);
        }
      });

      pollerLite(['[data-popup-id="info-excess"]'], () => {
        const popupupView = document.querySelector('[data-popup-id="info-excess"]');
        popupupView.style.display = 'flex';
      });
    } else if (target.matches(`.${ID}__price.excess .popup.is-shown`) || target.closest(`.${ID}__price.excess .btn--close`)) {
      const popupView = document.querySelector(`.${ID}__price.excess .popup.is-shown`);
      popupView && popupView.remove();
    } else if (target.closest(`.${ID}__price.excess #excess-info`)) {
      event.preventDefault();
      const popupView = document.querySelector(`.${ID}__price.excess .popup.is-shown`);
      popupView && popupView.remove();
      document.querySelector(`.${ID}__container ~ div .popup__content #excess-info`).click();

      pollerLite(['.banner-pricing-wrapper .mb0-xs'], () => {
        setTimeout(() => {
          const prices = document.querySelectorAll(`.${ID}__container ~ div .homeserve_thick`);
          const mainPriceElement = document.querySelector(`.${ID}__container ~ div .feature-title`);
          const mainPrice = mainPriceElement.textContent;
          //console.log(mainPrice, 'mainPrice');
          document.querySelector(`.${ID}__content .feature-title`).textContent = mainPrice;
          prices.forEach((item, index) => {
            const onlyPrice = item.innerText?.split(':')[1];
            document.querySelectorAll(`.${ID}__priceWrapper .${ID}__number`)[index].innerText = onlyPrice;
          });
        }, 200);
      });

      // pollerLite(['.page--product .hero-banner__side.with-sticky'], () => {
      //   setTimeout(() => {
      //     const mainPriceElement = document.querySelector(`.${ID}__container ~ div .feature-title`);
      //     const mainPrice = mainPriceElement.textContent;
      //     //console.log(mainPrice, 'mainPrice');
      //     document.querySelector(`.${ID}__content .feature-title`).textContent = mainPrice;
      //     const prices = document.querySelectorAll(`.${ID}__content .mini-table tr:not(.hidden)`);
      //     prices.forEach((item, index) => {
      //       const onlyPrice = item.innerText?.split(':')[1]?.replace('\t', '');
      //       document.querySelectorAll(`.${ID}__priceWrapper .${ID}__number`)[index].innerText = onlyPrice;
      //     });
      //   }, 200);
      // });
    } else if (target.matches('[data-popup-id="info-excess"]') || target.closest(`[data-popup-id="info-excess"] .btn--close`)) {
      const popupupView = document.querySelector('[data-popup-id="info-excess"]');
      popupupView.style.display = 'none';
    }
  });
  init();
};
