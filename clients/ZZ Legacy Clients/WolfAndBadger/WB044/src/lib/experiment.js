/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import renderButtons from './components/buttonsGrid';
import renderGenderSector from './components/gender';
import renderInitial from './components/initialStage';
import renderLoader from './components/loader';
import renderPersonalitySelector from './components/personality';
import renderPriceSelector from './components/price';
import progressbar from './components/progressbar';
import renderResultPage from './components/resultpage';
import stageWrapper from './components/stageWrapper';
import data from './data';
import initExternalLib from './helpers/addExternalLib';
import { localStorageGet, localStorageRemove, localStorageSave } from './helpers/cookie';
import observeDOM from './helpers/domObserver';

import { initSwiper, swiperConfig } from './helpers/initSwiper';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    let oldHref = location.href;
    if (location.pathname.indexOf('/gift-shop/') !== -1) {
      fireEvent('Test code Fired');
    }

    const callbackFnCtrl = (mutations) => {
      const newHref = location.href;
      if (oldHref !== newHref || location.pathname.indexOf('/gift-shop/') !== -1) {
        oldHref = newHref;

        if (location.pathname.indexOf('/gift-shop/') !== -1) {
          fireEvent('Test Code Fired', false);
        }
      }
    };

    observeDOM('#gatsby-focus-wrapper', callbackFnCtrl);

    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  //check if resultpage
  if (localStorageGet('userFromGiftfinder') === 'true' && location.pathname.indexOf('/search/') !== -1) {
    renderResultPage(localStorageRemove, progressbar, localStorageSave);
    return;
  } else if (localStorageGet('retakeTest') === 'true' && location.pathname.indexOf('/gift-shop/') !== -1) {
    (function pollForLoadVariation() {
      if (document.querySelector('.WB044__initialstage')) {
        document.querySelector('.WB044__buttons--transparent').click();
        localStorageRemove('retakeTest');
      } else {
        setTimeout(pollForLoadVariation, 25);
      }
    })();
  }

  window.giftFinderData = data;

  const swiperJs = 'https://unpkg.com/swiper@7/swiper-bundle.min.js';
  const swiperCss = 'https://unpkg.com/swiper@7/swiper-bundle.min.css';

  initExternalLib(swiperJs, swiperCss);

  const adjustWithHeight = (mainElem) => {
    let intViewportHeight = window.innerHeight;
    if (intViewportHeight <= 450) {
      mainElem.classList.remove('WB044__rotate');
    } else {
      mainElem.classList.add('WB044__rotate');
    }
  };

  let oldHref = location.href;

  const callbackFn = (mutations) => {
    const newHref = location.href;

    if (oldHref !== newHref || location.pathname.indexOf('/gift-shop/') !== -1) {
      oldHref = newHref;

      if (location.pathname.indexOf('/gift-shop/') !== -1) {
        document.querySelector('main').classList.add(`${ID}__main`, 'relative');
        const mainElem = document.querySelector(`.${ID}__main`);
        adjustWithHeight(mainElem);
        window.addEventListener('orientationchange', () => {
          adjustWithHeight(mainElem);
        });
        renderInitial(mainElem);
        clickHandler();
        fireEvent('Test Code Fired', false);
      }
    }
  };
  const goBack = (stepData) => {
    if (stepData == 'genderSelection') {
      document.querySelector('.WB044__personalityselector').remove();
      renderGenderSector(progressbar, stageWrapper, renderButtons);
    } else if (stepData == 'personality') {
      const inComingData = window.giftFinderData.gender;
      document.querySelector('.WB044__priceselector').remove();
      renderPersonalitySelector(progressbar, stageWrapper, renderButtons, inComingData);
      initSwiper('.WB044__swiper', swiperConfig);
    }
  };

  const clickHandler = () => {
    const main = document.querySelector('.WB044__main');
    main.addEventListener('click', (e) => {
      const target = e.target;

      const incomingData = target.getAttribute('data-selection');

      if (target.matches('.WB044__buttons--next>button')) {
        main.querySelector('[class^="WB044__"')?.remove();
      }

      if (target.matches('[data-nextstep="genderselector"]')) {
        renderGenderSector(progressbar, stageWrapper, renderButtons);
        fireEvent('User has selected “Yes Please” on the Gift Shop page banner', false);
      } else if (target.matches('[data-nextstep="personality"]')) {
        renderPersonalitySelector(progressbar, stageWrapper, renderButtons, incomingData);
        initSwiper('.WB044__swiper', swiperConfig);
        fireEvent('User has seen the second page ("which best describes them?" page) of the quiz', false);
      } else if (target.matches('[data-nextstep="price"]')) {
        fireEvent(
          `user has selected the ${target.getAttribute('data-selectedpersonality')} personality during the gift finder`,
          false
        );
        renderPriceSelector(progressbar, stageWrapper, renderButtons, incomingData);
        fireEvent('User has seen the third page ("What is your budget?" page) of the quiz', false);
      } else if (target.matches('[data-nextstep="loader"]')) {
        const minPrice = target.getAttribute('data-minselection') || '';
        const maxPrice = target.getAttribute('data-maxselection') || '';
        const finalUrl = incomingData + minPrice + maxPrice;

        renderLoader(progressbar, stageWrapper, localStorageSave, finalUrl, fireEvent);
        fireEvent('User has seen the loading page of the quiz');
      } else if (target.matches('.WB044__buttons--exit') || target.closest('.WB044__buttons--exit')) {
        fireEvent(`user has exited from ${document.querySelector('main').getAttribute('data-stagename')}`, false);
        location.reload();
      } else if (target.matches('.WB044__buttons--previous')) {
        const previousStep = target.getAttribute('data-previous');
        goBack(previousStep);
      }

      if (target.matches('.WB044__buttons--skip') && target.innerText == 'Skip') {
        fireEvent(`user has skipped from ${document.querySelector('main').getAttribute('data-laststagename')}`);
      }
    });
  };

  observeDOM('#gatsby-focus-wrapper', callbackFn);
  if (location.pathname.indexOf('/gift-shop/') !== -1) {
    setTimeout(() => {
      document.querySelector('main').classList.add(`${ID}__main`, 'relative');
      const mainElem = document.querySelector(`.${ID}__main`);
      adjustWithHeight(mainElem);
      window.addEventListener('orientationchange', () => {
        adjustWithHeight(mainElem);
      });
      renderInitial(mainElem);
      clickHandler();
    }, 2000);
  }
};
