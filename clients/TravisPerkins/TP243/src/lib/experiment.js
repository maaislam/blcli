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
import clickCollectMessages from './components/clickBanner';

import { postcodes } from './data';
import { tradeSkuPrice243 } from './data243';
import { postcodeMatch } from './helpers/checkpostcode';
import skuValidity from './helpers/checkSkuValidity';
import { getCookie } from './helpers/cookie';
import obsIntersection from './helpers/observeIntersection';
import { isPDP, isPLP } from './helpers/utils';

const { ID, VARIATION } = shared;

const init = () => {
  // console.log(mutation);
  setup();

  const isLoggedIn = !!getCookie('access_token');

  //const isMobile = deviceType() !== 'desktop';

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------

  //render pdp changes

  //check if user in pdp && userLoginStatus && sku && postcode

  if (isPDP() && skuValidity(tradeSkuPrice243) && postcodeMatch(postcodes)) {
    document.querySelectorAll(`.${ID}__tradeprice-badge`).forEach((item) => {
      item?.remove();
    });
    const badgeAnchor =
      document.querySelector('[class^="PDPDesktop__Content-sc"]') ||
      document.querySelector('[class^="ProductDetailMobile__ImagesBlockWrapperRelative"]');

    if (!document.querySelector(`.${ID}__tradeprice-badge`)) {
      badgeAnchor.classList.add(`${ID}__badge-container`);
      //VARIATION != 2 && badgeAnchor.insertAdjacentHTML('afterbegin', tradepriceBadge(ID));
    }
    if (!document.querySelector(`.${ID}__newprice`) && isLoggedIn) {
      const priceAnchor = document.querySelector('[data-test-id="main-price"]');
      priceAnchor.classList.add(`${ID}__newprice-anchor`);
    }
    const CollectionAvailable = !document.querySelector('[data-test-id="add-to-collection-btn"]').disabled;

    if (CollectionAvailable && !document.querySelector(`.${ID}__click-collect`)) {
      const anchorElm =
        document.querySelector('[class^="ProductDetailDesktop__OrderButtonsWrapper-sc"]') ||
        document.querySelector('[class^="ProductDetailMobile__OrderButtonsWr-sc"]');
      clickCollectMessages(ID, anchorElm);
    }

    const intersectionCallback = (entry) => {
      if (entry.isIntersecting && !document.querySelector(`.${ID}__seen`)) {
        entry.target.classList.add(`${ID}__seen`);

        if (sessionStorage.getItem(`${ID}__pdpPriceMsgSeen`) !== 'true') {
          fireEvent('Conditions Met');
          fireEvent('Viewed message with delivery time on PDP');
          sessionStorage.setItem(`${ID}__pdpPriceMsgSeen`, 'true');
        }
      }
    };
    const clickCollectIntersection =
      document.querySelector(`.${ID}__click-collect`) || document.querySelector(`.${ID}__tradeprice`);

    obsIntersection(clickCollectIntersection, 0.5, intersectionCallback);
  } else if (isPLP() && postcodeMatch(postcodes)) {
    //render stuff based on login status

    const prodCards = document.querySelector('[data-test-id="plp-list"]')?.querySelectorAll('[data-test-id="product"]');
    prodCards.forEach((card) => {
      const cardSku = card.querySelector('[data-test-id="product-card-code"]').innerText.split(': ')[1];
      card.querySelector('[class^="Layouts__GridEqu"]')?.classList.add(`${ID}__height-adjust`);
      if (skuValidity(tradeSkuPrice243, cardSku)) {
        const anchorElem = card.querySelector('[data-test-id="qty-selector"]');
        card.querySelector('[class^="Layouts__GridEqu"]')?.classList.remove(`${ID}__height-adjust`);

        const CollectionAvailable = !card.querySelector('[data-test-id="add-to-collection-btn"]').disabled;
        if (CollectionAvailable && !card.querySelector(`.${ID}__click-collect`)) {
          clickCollectMessages(ID, anchorElem, 'plp', card);
        }
      }
    });
    const intersectionCallback = (entry) => {
      if (entry.isIntersecting && !document.querySelector(`.${ID}__seen`)) {
        entry.target.classList.add(`${ID}__seen`);
        if (sessionStorage.getItem(`${ID}__plpPriceMsgSeen`) !== 'true') {
          fireEvent('Conditions Met');
          fireEvent('Viewed message with delivery time on PLP');
          sessionStorage.setItem(`${ID}__plpPriceMsgSeen`, 'true');
        }
      }
    };
    const tradePriceIntersection = document.querySelector(`.${ID}__underbtn--msg`);
    obsIntersection(tradePriceIntersection, 0.5, intersectionCallback);
  } else if (isPDP() && (!skuValidity(tradeSkuPrice243) || !postcodeMatch(postcodes))) {
    document.querySelector(`.${ID}__tradeprice`)?.remove();
    document.querySelector(`.${ID}__click-collect`)?.remove();
    const anchorElm =
      document.querySelector('[data-test-id="login-or-register-block"]') ||
      document.querySelector('[data-test-id="price"][class^="TradePriceBlock__Wrapper-sc"]');
    anchorElm.classList.remove(`${ID}__hide`);
    anchorElm.removeAttribute('style');
  }
};

export default () => {
  //init();
  setup();
  const controlInit = () => {
    if (isPDP() && skuValidity(tradeSkuPrice243) && postcodeMatch(postcodes)) {
      fireEvent('Conditions Met');
    } else if (postcodeMatch(postcodes)) {
      const appContainer = document.querySelector('#app-container');
      pollerLite(['[data-test-id="plp-list"]'], () => {
        const prodCards = document.querySelector('[data-test-id="plp-list"]')?.querySelectorAll('[data-test-id="product"]');
        prodCards.forEach((card) => {
          const cardSku = card.querySelector('[data-test-id="product-card-code"]').innerText.split(': ')[1];
          if (skuValidity(tradeSkuPrice243, cardSku) && !document.querySelector(`.${ID}__plp-condition-met`)) {
            fireEvent('Conditions Met');
            appContainer.querySelector('[data-test-id="plp-wrapper"]').classList.add(`${ID}__plp-condition-met`);
          }
        });
      });
    }
  };

  // Poll and re-run init
  pollerLite(['#app-container'], () => {
    const appContainer = document.querySelector('#app-container');

    if (VARIATION == 'control') {
      setTimeout(controlInit, 2000);
      document.body.addEventListener('click', (e) => {
        if (!isPDP()) return;
        const target = e.target;
        // console.log('target', target);
        const loginBtn = `[data-test-id="link"][href="/login"]`;
        const signupBtn = `[data-test-id="link"][href="/activate"]`;
        const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);
        if (targetMatched(loginBtn)) {
          fireEvent('Clicks of “Login” in existing element on PDP');
        } else if (targetMatched(signupBtn)) {
          fireEvent('Clicks of “Register” in existing element on PDP');
        }
      });
    }
    let oldHref = window.location.href;
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        const { addedNodes, removedNodes } = mutation;
        const modifiedNodes = [...addedNodes, ...removedNodes];
        if (
          modifiedNodes.length > 0 &&
          modifiedNodes.some(
            (node) =>
              node.nodeType === 1 &&
              (node?.matches(`.${ID}__tradeprice-badge`) ||
                node.matches(`.TP232__collectionIcon`) ||
                node.matches(`.TP232__deliveryIcon`) ||
                node?.matches(`.${ID}__click-collect`) ||
                node?.matches(`.${ID}__underbtn--msg`))
          )
        )
          return;
        setTimeout(() => {
          const validPage = isPDP() || isPLP();
          validPage && init(mutation);
        }, 2000);

        if (oldHref != window.location.href) {
          oldHref = window.location.href;

          document.body.classList.remove(`${shared.ID}`);

          if (VARIATION == 'control') {
            setTimeout(controlInit, 2000);
          }
        }
      });
    });

    const config = {
      childList: true,
      subtree: true,
      CharacterData: true,
    };

    observer.observe(appContainer, config);
  });
};
