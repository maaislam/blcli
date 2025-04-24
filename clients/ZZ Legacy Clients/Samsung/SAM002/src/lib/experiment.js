/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import renderCtaBlock from './components/CTABlock';
import renderDiscount from './components/discountBlock';
import renderCardDropdown from './components/dropdown';
import { clickHandler, controlClicks } from './helpers/clickHandlers';
import { formatPrice, getNumber } from './helpers/getNumber';

const { ID, VARIATION } = shared;

const init = () => {
  // Experiment Code...
  //setup();

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  const rePositionEnergyIcon = (card) => {
    const controlEnergyIcon = card.querySelector('.badge-energy-label') || card.querySelector('.product-card-v2__fiche');
    if (!controlEnergyIcon.querySelector('a:last-child')) return;
    const newEnergyIcon = controlEnergyIcon.querySelector('a:last-child').cloneNode(true);
    const newEneryIconAnchor = card.querySelector('.product-card-v2__image');
    newEnergyIcon.classList.add(`${ID}__energy-icon`);
    const iconPlaced = !!card.querySelector(`.${ID}__energy-icon`);
    //  console.log(iconPlaced);
    !iconPlaced && newEneryIconAnchor.insertAdjacentElement('beforeend', newEnergyIcon);
  };
  const rePositionRating = (card) => {
    const controlRating = card.querySelector('.product-card-v2__rating');
    if (!controlRating) return;
    const newRatingBlock = controlRating.cloneNode(true);
    const newRatingAnchor = card.querySelector('.product-card-v2__wishlist');
    newRatingBlock.classList.add(`${ID}__rating-block`);
    newRatingBlock.classList.remove(`product-card-v2__rating`);

    const iconPlaced = !!card.querySelector(`.${ID}__rating-block`);
    //  console.log(iconPlaced);
    !iconPlaced && newRatingAnchor.insertAdjacentElement('afterend', newRatingBlock);
  };
  document.querySelectorAll('.pf-finder-v2__box').forEach((box) => {
    box.classList.add(`${ID}__plp-box`);
  });

  const plpCards = document.querySelectorAll('.product-card-v2__item');
  plpCards.forEach((card) => {
    card.classList.add(`${ID}__plp-card`);
    //reposition energy image
    rePositionEnergyIcon(card);

    //reposition rating
    rePositionRating(card);

    //calc discount

    const currentPrice = parseFloat(card.querySelector('.product-card-v2__price-full')?.innerText);
    const prevPrice = getNumber(card.querySelector('.product-card-v2__price-advice')?.innerText) || 0;
    const discount = prevPrice - currentPrice;
    //console.log(discount);
    const data = [currentPrice, prevPrice, discount].map((item) => formatPrice(item));
    console.log(data);
    const anchorElment = card.querySelector('.product-card-v2__info');
    card.querySelector(`.${ID}__discount-block`)?.remove();
    renderDiscount(ID, data, discount, anchorElment);
    const controlPriceBlock = card.querySelector('.product-card-v2__price');
    controlPriceBlock.classList.add(`${ID}__hide`);
    /**calc discount */

    const featureItems = card.querySelectorAll('.product-card-v2__feature-item');
    featureItems.forEach((item) => {
      const itemTextContainer = item.querySelector('.product-card-v2__feature-text');
      itemTextContainer.classList.add(`${ID}__featuredItems`);
      if (item.innerText.indexOf('Nu ') === -1) return;
      itemTextContainer.classList.add(`${ID}__featuredItems-colored`);
    });

    //render dropdown
    const anchorElm = card.querySelector('.product-card-v2__cta');
    VARIATION == 2 ? renderCtaBlock(ID, anchorElm, card) : renderCardDropdown(ID, anchorElm, card);

    const defaultCTAs = ['.js-pf-compare-cta', '.js-cta-buy', '.pd-wishlist-cta', '[an-la="learn more click"]'];
    defaultCTAs.forEach((cta) => {
      card.querySelector(cta)?.classList.add(`${ID}__hide`);
    });
  });
};

export default () => {
  setup();
  VARIATION != 'control' &&
    setTimeout(() => {
      init();
    }, 2000);
  fireEvent('Conditions Met');
  // Poll and re-run init
  pollerLite(['.pf-finder-v2__content-wrap'], () => {
    const appContainer = document.querySelector('.pf-finder-v2__content-wrap');
    setTimeout(() => {
      init();
    }, 2000);
    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    //let oldHref = location.href;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        //console.log(mutation);
        setTimeout(() => {
          init();
        }, 2000);
      });
    });

    const config = {
      childList: true,
      //subtree: true,
      attributes: true,
    };

    if (VARIATION == 'control') {
      appContainer.addEventListener('click', controlClicks);
      return;
    }

    const clickController = (ev) => {
      clickHandler(ev, init);
    };

    appContainer.addEventListener('click', clickController);

    observer.observe(appContainer, config);
  });
};
