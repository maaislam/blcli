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

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();

    const hideLabel = () => {
      const allProducts = document.querySelectorAll('.product-tile.js-product-item');
      for (let index = 0; index < allProducts.length; index++) {
        const element = allProducts[index];
        
        if(element.querySelector('.product-tile__label') && element.querySelector('.product-tile__label').textContent.trim() === 'Collect in Tudor specialist stores') {
          const exSkus = ['3867447', '3867455', '3867498', '9192786', '2246724', '2225026', '1250043', '1250051','1250078'];
          
          const elSKU = element.querySelector('button').getAttribute('data-sku');
          const elSKUMeta = element.querySelector('[itemprop="sku"]');
          if(elSKU || elSKUMeta.content) {
            if(exSkus.indexOf(elSKU) > -1 || exSkus.indexOf(elSKUMeta.content) > -1) {
              
            } else { 
              element.querySelector('.product-tile__label').style.display = 'none';
            }
          }
        }
      }
    }

    const freeDeliveryMsg = () => {
      const delMsg = document.createElement('div');
      delMsg.classList.add(`${ID}-freeDel`);
      delMsg.innerHTML = `<span></span><p><b>Free Express Delivery</b> available on this product</p>`;
      document.querySelector('.usp.usp--at-top').insertAdjacentElement('beforebegin', delMsg);
    }

    const hideBasketMSg = () => {
      const allBasketItems = document.querySelectorAll('.product-summary span');
      if(allBasketItems) {
        for (let index = 0; index < allBasketItems.length; index += 1) {
          const element = allBasketItems[index];
          if(element.textContent.indexOf('This product is only available for collection at one of our') > -1) {
            element.style.display = 'none';
          } 
        }
      }
    }

    if(window.digitalData.page.pageInfo.pageType === 'PLP') {
      hideLabel();
    }

    if (window.digitalData.page.category.subCategory1 === "Watches" && window.digitalData.product[0].productInfo.brand === "Tudor"){
      const tudorMSG = document.querySelector('.store-count .store-count__description');
      if(tudorMSG) {
        const newText = tudorMSG.firstChild.textContent.replace('only', '');
        tudorMSG.firstChild.textContent = newText;

        freeDeliveryMsg();
      }
    }

    if(window.digitalData && window.digitalData.page && window.digitalData.page.pageInfo.pageType === 'Checkout') {
      hideBasketMSg();
    }

    let oldHref = document.location.href;
    let bodyList = document.querySelector("body");
    const observeEl = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
          if (oldHref != document.location.href) {
              oldHref = document.location.href;

              if(window.digitalData.page.pageInfo.pageType === 'PLP') {
                hideLabel();
              }
          }
      });
    });
    const config = {
        childList: true,
        subtree: true
    };
    
    observeEl.observe(bodyList, config);
  }
};
