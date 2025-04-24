/**
 * BD011 - Mobile Navigation
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { observer, events } from '../../../../../lib/utils';
import beerData from './data/beerData';

export default () => {
  setup();

  const {ID, VARIATION} = settings;

  console.log("BD-14");

  const runBuild = () => {

    console.log("running");

    let allProdData = document.querySelectorAll('.productTile');

    Array.from(allProdData).map((prodData, index) => {

      // let prodName = prodData.querySelector('.productTile__name').innerText.toLowerCase();
      let prodUrl = prodData.querySelector('a.link.productTile__link').href;
      // let prodQuant = prodData.querySelector('.productTile__packaging').innerText;
      // prodQuant = prodQuant.substr(0, prodQuant.indexOf('x')).trim();
      let prodImg = prodData.querySelector('.product-image-wrapper');

      for (const key in beerData) {
        if (beerData.hasOwnProperty(key)) {
          const el = beerData[key];
          // const beerName = el.name.toLowerCase();
          // const beerQty = el.qty;
          
          // if (prodName == beerName
          // && prodQuant == beerQty) {
          //   prodData.querySelector('.productTile__name').closest('.productTile').classList.add(`${el.badge}`);

          //   let badgeText = '';
          //   if (el.badge == "best_seller") {
          //     badgeText = "Best</br>Seller";
          //   } else if (el.badge == "perfect_gift") {
          //     badgeText = "Perfect</br>gift";
          //   }
          //   if (!prodData.querySelector(`.${ID}-badge__wrapper`)) {
          //     prodImg.insertAdjacentHTML('beforeend', `<div class="${ID}-badge__wrapper ${el.badge}"><div>${badgeText}</div></div>`);
          //     break;
          //   }
          // }
        /**
         * @desc Exclude below products:
         * 'brewdog-pale-ale-48-x-can', 'brewdog-pale-ale-24-x-can', 'lonewolf-gin-and-tonic-12-x-can'
         */
          if (prodUrl.indexOf(`brewdog-pale-ale-48-x-can`) == -1
          && prodUrl.indexOf(`brewdog-pale-ale-24-x-can`) == -1
          && prodUrl.indexOf(`lonewolf-gin-and-tonic-12-x-can`) == -1) {
            if (prodUrl.indexOf(`${key}`) > -1) {
              prodData.querySelector('.productTile__name').closest('.productTile').classList.add(`${el.badge}`);

              let badgeText = '';
              if (el.badge == "best_seller") {
                badgeText = "Best</br>Seller";
              } else if (el.badge == "perfect_gift") {
                badgeText = "Perfect</br>gift";
              }
              if (!prodData.querySelector(`.${ID}-badge__wrapper`)) {
                prodImg.insertAdjacentHTML('beforeend', `<div class="${ID}-badge__wrapper ${el.badge}"><div>${badgeText}</div></div>`);
                break;
              }
            }
          }
            

        }
      }

    });

  }

  runBuild();

  const prodList = document.querySelector('#amasty-shopby-product-list');
  
  observer.connect(prodList, () => {
    // alert('content changed');
    runBuild();
  }, {
      config: {
          attributes: false,
          // subtree: true,
          childList: true,
      }
  });

  const mainContent = document.querySelector('.column.main');
  observer.connect(mainContent, () => {
    // alert('filter applied');
    runBuild();
  }, {
      config: {
          attributes: false,
          // subtree: true,
          childList: true,
      }
  });

// --- If URL has changed because of page filters, e.g. show X number of products on page
// --- then re-run experiment
  var oldHref = document.location.href;
  var bodyList = document.querySelector("body");
  var observerUrl = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
              if (oldHref != document.location.href) {
                  oldHref = document.location.href;
                  // alert('changed url');
                  runBuild();
                }
          });
      });
  var config = {
          childList: true,
          subtree: true
      };
  observerUrl.observe(bodyList, config);

};
