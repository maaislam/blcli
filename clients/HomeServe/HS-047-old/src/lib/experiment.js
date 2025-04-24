/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import {
  addCssToHead,
  addScriptToHead,
  fireEvent,
  formatText,
  newEvents,
  numberObjext,
  obsIntersection,
  setup,
} from './helpers/utils';
import shared from '../../../../../core-files/shared';
import promoBar from './components/promoBar';

import { listItems } from './data/listItems';
import { listStr } from './components/listStr';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const handleIntersection = (entry) => {
  if (entry.isIntersecting) {
    if (!document.body.classList.contains(`${ID}__seenCarousel`)) {
      VARIATION === '1' ? fireEvent('when a user scrolls the carousel') : fireEvent('when a user sees the category items');
      document.body.classList.add(`${ID}__seenCarousel`);
    }
  }
};

const handleObserver = (selector) => {
  const intersectionAnchor = document.querySelector(selector);
  if (intersectionAnchor) {
    obsIntersection(intersectionAnchor, 0.2, handleIntersection);
  }
};

const test035Init = () => {
  const { pathname } = window.location;
  const plpData = listItems[pathname];
  if (!plpData) {
    return;
  }
  const promoBoxes = document.querySelectorAll('.category-items .promo-box');
  promoBoxes.forEach((box) => {
    const targetPoint = box.querySelector('.list');
    const findOutUrl = box.querySelector('.btn--rounded').href.split('.uk')[1];
    const productData = plpData[findOutUrl];
    if (box.querySelector(`.${ID}__list`)) {
      box.querySelector(`.${ID}__list`).remove();
    }
    targetPoint && targetPoint.insertAdjacentHTML('beforebegin', listStr(ID, productData));

    const firstInactiveItem = box.querySelector(`.${ID}__active--no`);
    if (firstInactiveItem) {
      firstInactiveItem.classList.add(`${ID}__first-inactive`);
    }
  });
};

const init = () => {
  const promoBoxes = document.querySelectorAll('.category-items .promo-box');
  promoBoxes.forEach((box) => {
    const bubbleElement = box.querySelector('.bubble');
    const claimRibon = box.querySelector('.claims-ribbon');
    const serviceWrapper = box.querySelector('.service-box');
    const buttons = box.querySelectorAll('.choose-excess > div');
    !bubbleElement && box.classList.add(`${ID}__promoBox`);
    if (bubbleElement && !box.querySelector(`.${ID}__promoBar`)) {
      const bubbleText = bubbleElement.innerText;

      const mainText = formatText(bubbleText);

      bubbleElement.insertAdjacentHTML('beforebegin', promoBar(ID, mainText));
    }

    if (buttons && buttons.length > 1) {
      box.querySelector('.choose-excess').classList.add(`${ID}__excess`);
    }

    claimRibon && serviceWrapper?.querySelector('.no-service')?.insertAdjacentElement('beforeend', claimRibon);
    if (!box.querySelector('.no-service') && claimRibon) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
          <div class="no-service"></div>`;
      wrapper.classList.add('service-box');
      box.insertAdjacentElement('beforeend', wrapper);
      wrapper.querySelector('.no-service').insertAdjacentElement('beforeend', claimRibon);
    }

    if (box.classList.contains('promo-box--grey')) {
      box.querySelector(`.${ID}__list-title`).textContent = `With this plan, you'll get:`;
    }
  });
};

export default () => {
  setup();
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-970RHZRVZ4';
  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest('.category-selector__list') && target.closest('.category-selector__list > li')) {
      fireEvent('Customer clicks the product tabs');
    } else if (
      target.closest('.promo-box .choose-excess') &&
      (target.closest('.btn') || target.closest('label.float-label-cat'))
    ) {
      fireEvent('Customer clicks the excess buttons');
    } else if (target.closest('.promo-box') && target.closest('a.btn--rounded')) {
      fireEvent('Customer clicks Find out More');
    } else if (target.closest('.row.category-items .swiper-button-next')) {
      fireEvent('when a user clicks the forwards button');
    } else if (target.closest('.row.category-items .swiper-button-prev')) {
      fireEvent('when a user clicks the backward button');
    }
  });

  pollerLite(['.row.category-items'], () => {
    console.log('enter');
    VARIATION === '1' ? handleObserver('.row.category-items') : handleObserver('.row.category-items .h3');
  });

  if (VARIATION == 'control') {
    return;
  }

  test035Init();
  init();

  //add swiper

  addCssToHead('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  addScriptToHead('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  const swiperInit = () => {
    pollerLite(['.promo-box', () => typeof window.Swiper == 'function'], () => {
      const slides = document.querySelectorAll('.promo-box');
      const wrapper = document.querySelector('.row.category-items');
      slides.forEach((slide) => {
        slide.classList.add('swiper-slide');

        slide.closest('.row').classList.add('swiper');

        const swiperParentElem = slide.closest('.swiper');
        const swiperWrapper = swiperParentElem.querySelector('div');
        swiperWrapper.classList.remove('grid');
        swiperWrapper.classList.add('swiper-wrapper');
      });

      wrapper.querySelectorAll('.swiper-pagination').forEach((el) => el.remove());
      wrapper.querySelectorAll('.swiper-button-next').forEach((el) => el.remove());
      wrapper.querySelectorAll('.swiper-button-prev').forEach((el) => el.remove());

      document.querySelector('.row.category-items .swiper-wrapper').insertAdjacentHTML(
        'afterend',
        `
        <div class="swiper-pagination"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      `
      );

      const swiper = new window.Swiper('.swiper', {
        slidesPerView: 1.15,
        spaceBetween: 10,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          slideChange: () => {
            const { activeIndex } = swiper; // Destructure Swiper properties

            if (!document.querySelector(`.${ID}__slide_${activeIndex + 1}`)) {
              fireEvent(`when the customer has seen the ${numberObjext[activeIndex + 1]} product card`);
              document.body.classList.add(`${ID}__slide_${activeIndex + 1}`);
            }
          },
        },
      });
    });
  };

  swiperInit();

  // Listen for orientation changes
  window.matchMedia('(orientation: portrait)').addEventListener('change', (e) => {
    const portrait = e.matches;
    if (portrait) {
      swiperInit();
    } else {
      window.location.reload();
    }
  });
};
