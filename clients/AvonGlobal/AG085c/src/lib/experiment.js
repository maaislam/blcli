/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { gdprData } from './data';
import renderRep from './components/renderRep';
import renderYourRep from './components/renderYourRep';

const { rootScope, ID, VARIATION } = shared;
const init = (mutation) => {
  setup();

  const { addedNodes } = mutation;
  //console.log(addedNodes);
  const repInCatalog = document.querySelectorAll(`.${ID}__rep`);

  if (repInCatalog.length === 1) {
    repInCatalog[0].style.opacity = '1';
  }
  addedNodes.length <= 1 &&
    addedNodes.forEach((node) => {
      if (VARIATION == 'control') {
        const nodeMatcher = () => {
          const elemsToCheck = [
            '.page_products_section',
            '[data-item-id="catalog"]',
            '[data-item-id="wishlistConfirmRepContent"]',
          ];
          return elemsToCheck.some((item) => node.matches(item));
        };
        nodeMatcher() && fireEvent('Conditions Met');
        return;
      }

      if (node.nodeType === 1 && node.matches('.page_products_section')) {
        const anchorElem = document.querySelector(`.product_container`);
        const anchorElemMobile = document.querySelector(`.mobile_version .infos_section`);

        const renderRepConfig = {
          id: ID,
          fireEvent: fireEvent,
          renderType: 'product-page',
          anchorElem: anchorElem,
          anchorPos: 'beforeend',
          mobileAnchorElem: anchorElemMobile,
          mobileAnchorPos: 'beforebegin',
        };
        renderRep(gdprData, renderRepConfig);
        document.querySelector(`.${ID}__rep.catalogue`).style.opacity = '0';
      } else if (node.nodeType === 1 && node.matches('[data-item-id="catalog"]')) {
        const repName = document.querySelector('[data-item-id="shoppingWith"] strong')?.innerText;
        const elemsToHide = ['#v7__catalog_by', '#gdpr-cookie-button', '[data-item-id="shoppingWith"]'];
        const isMobile = DY.deviceInfo.type !== 'desktop';
        window[`${ID}__repName`] = repName;

        elemsToHide.forEach((element, i) => {
          if (isMobile && i === 1) {
            document.querySelector(element).style.display = 'block';
          } else {
            document.querySelector(element).style.display = 'none';
          }
        });
        const anchorElem = document.querySelector(`.${ID}__catalogue`);
        //const mobileAnchorElem = document.querySelector(`[data-item-id="catalog"]`);
        const renderRepConfig = {
          id: ID,
          fireEvent: fireEvent,
          renderType: 'catalogue',
          anchorElem: anchorElem,
          anchorPos: 'afterbegin',
          mobileAnchorElem: anchorElem,
          mobileAnchorPos: 'afterend',
        };
        renderRep(gdprData, renderRepConfig);
      } else if (node.nodeType === 1 && node.matches('[data-item-id="wishlistConfirmRepContent"]')) {
        const anchorElem = document.querySelector(`[data-item-id="wishlistConfirmRepContent"]`);
        anchorElem.style.position = 'relative';
        const renderRepConfig = {
          id: ID,
          fireEvent: fireEvent,
          renderType: 'checkout',
          anchorElem: anchorElem,
          anchorPos: 'afterbegin',
          mobileAnchorElem: anchorElem,
          mobileAnchorPos: 'afterbegin',
        };
        renderRep(gdprData, renderRepConfig);
      } else if (node.nodeType === 1 && node.matches('.v7__elem--container.v7-anim-slide-right')) {
        const overlay = document.querySelector(`.v7__overlay.v7__elem--container`);
        if (overlay) {
          overlay.style.zIndex = '999';
        }

        (function pollForElem() {
          if (document.querySelectorAll('#v7_vue_basket').length > 0 && document.querySelector('[id^="vue_basket_checkout"]')) {
            console.log('basket loaded.....', document.querySelector(`.${ID}__rep.catalogue`));
            //remove control's checkout btn
            const firstBtn = document.querySelector('[id^="vue_basket_checkout"]').getElementsByTagName('button')[0];
            const isCheckoutBtn = firstBtn.innerText === 'Checkout online';
            if (isCheckoutBtn) {
              firstBtn.classList.add(`${ID}__hide`);
              const newBtn = `<a class="${ID}__custom-btn btn-full" href="https://my.avon.co.za/checkoutmobile/login/?sender=1">Checkout online</a>`;
              firstBtn.insertAdjacentHTML('afterend', newBtn);
            }
          } else {
            setTimeout(pollForElem, 25);
          }
        })();
      }
    });

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
};

export default () => {
  // Poll and re-run init

  const appContainer = document.querySelector('body');
  pollerLite(['body'], () => {
    setup();
    const anchorElem1 = document.querySelector(`.navbar .navbar-header`);
    const anchorElem2 = document.querySelector(`header`);
    const renderRepConfig1 = {
      id: ID,
      fireEvent: fireEvent,
      renderType: `${ID}__checkout-desktop`,
      anchorElem: anchorElem1,
      anchorPos: 'afterend',
    };
    const renderRepConfig2 = {
      id: ID,
      fireEvent: fireEvent,
      renderType: `${ID}__checkout-mobile`,
      anchorElem: anchorElem2,
      anchorPos: 'afterend',
    };

    const isBrochureUser = () => {
      return (
        location.pathname.indexOf('/checkoutmobile/') !== -1 &&
        document.referrer === 'https://za.avon-brochure.com/' &&
        location.search.indexOf('sender') !== -1
      );
    };
    fireEvent('Test Code Fired');
    // if (isBrochureUser()) {
    //   (function pollForSession() {
    //     if (
    //       !!JSON.parse(sessionStorage.getItem('SessionContext_ZA')) &&
    //       JSON.parse(sessionStorage.getItem('SessionContext_ZA')).ShopperRepId
    //     ) {
    //       renderYourRep(gdprData, renderRepConfig1);
    //       renderYourRep(gdprData, renderRepConfig2);
    //       return;
    //     } else {
    //       setTimeout(pollForSession, 25);
    //     }
    //   })();
    // }

    appContainer.classList.add(`${ID}__catalogue`);

    //get repId
    const repIdFetchUrl = () => {
      const catalogueCover = document.querySelector('.catalogue-cover');
      const catOnclickAttr = catalogueCover.getAttribute('onclick');
      const urlParam = catOnclickAttr.split("url: '")[1].split("',")[0];
      const campaignNum = catOnclickAttr.split('IntroEvents:Open - ')[1].split("'")[0];

      const idFetchUrl = `/check-rep-url.php?market=&rep_id=&url=${encodeURI(location.href + urlParam)}`;

      return { campaignNum, idFetchUrl };
    };

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        setTimeout(() => {
          init(mutation);
        }, 2000);
      });
    });

    const config = {
      childList: true,
      subtree: true,
    };

    observer.observe(appContainer, config);
    if (VARIATION == 'control') {
      // fireEvent('Test Code Fired');
      return;
    }

    if (document.querySelector('.catalogue-cover')) {
      const { campaignNum, idFetchUrl } = repIdFetchUrl();
      fetch(idFetchUrl)
        .then((response1) => response1.json())
        .then((data1) => {
          fetch(`https://admin.south.avon.digital-catalogue.com/api/campaigns/${campaignNum}/settings/?repId=${data1['rep_id']}`)
            .then((response2) => response2.json())
            .then((data2) => {
              console.log(data2['shop_with_my_rep'].name);
              window[`${ID}__repName`] = data2['shop_with_my_rep'].name;
              appContainer.classList.add(`${ID}__homepage`);
              const anchorElem = document.querySelector(`.${ID}__homepage`);
              const anchorElemMob = document.querySelector('#logo_container');
              const renderRepConfig = {
                id: ID,
                fireEvent: fireEvent,
                renderType: 'homepage',
                anchorElem: anchorElem,
                anchorPos: 'afterbegin',
                mobileAnchorElem: anchorElemMob,
                mobileAnchorPos: 'afterend',
              };
              renderRep(gdprData, renderRepConfig);
            });
        });
    }
  });
};
