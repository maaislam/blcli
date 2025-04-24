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
import removePlpChanges from './helpers/removePlpChanges';
import renderPdpChanges from './helpers/renderPdpChanges';

import { renderPlpChanges } from './helpers/renderPlpCnages';
import { addSearchParam, modifySkuList, getCompareList, getReactStoreData, onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;

const DOM_RENDER_DELAY = 2000;

const init = () => {
  getReactStoreData();
  renderPlpChanges();
  renderPdpChanges();
};

export default () => {
  setup();

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest('label[data-qaid="option-name"]') && target.closest('[data-qaid="product-card"]')) {
      setTimeout(renderPlpChanges, DOM_RENDER_DELAY);
      fireEvent('User interacts with the compare element');
    } else if (target.closest(`.${ID}__cardclose-container`)) {
      const sku = target.closest(`.${ID}__cardclose-container`).dataset.sku;
      fireEvent('User interacts with clear on individual products');
      modifySkuList(sku).then(window.location.reload());
    } else if (target.closest('[data-action="compare-all"]')) {
      const compareAllUrl = addSearchParam('action', 'compare');
      window.location.href = compareAllUrl;
      fireEvent('User interacts with the compare all cta');
    } else if (target.closest('[data-action="clear-all"]')) {
      fireEvent('User interacts with clear all');
      const activeSkus = [];
      const activeSkuElems = document.querySelectorAll(`.${ID}__productCard [data-sku]`);
      activeSkuElems.forEach((activeSkuElem) => {
        activeSkus.push(activeSkuElem.dataset.sku);
      });

      const promises = activeSkus.map((sku) => modifySkuList(sku));
      Promise.allSettled(promises).then(() => window.location.reload());
    } else if (target.closest(`.${ID}__recommendationsClose`)) {
      removePlpChanges();
    } else if (target.closest(`.${ID}__compare-button`)) {
      fireEvent('User interacts with the compare cta on PDP');
      const currentProdSku = target.closest(`.${ID}__compare-button`).dataset.skuid;
      getCompareList(false).then((activeSkus) => {
        const promises = activeSkus.map((sku) => modifySkuList(sku));
        Promise.allSettled(promises)
          .then(() => modifySkuList(currentProdSku, 'add'))
          .then(() => {
            if (activeSkus.length > 3) {
              activeSkus.pop();
            }
            const promises = activeSkus.map((sku) => modifySkuList(sku, 'add'));
            return Promise.allSettled(promises);
          })
          .then(() => {
            const comparePageUrl = target.closest(`.${ID}__compare-button`).dataset.href;
            window.location.href = comparePageUrl;
          });

        //reset compare list
        //delete all then add all
      });
    } else if (target.closest('[data-qaid="compare-button"]')) {
      fireEvent("User interacts with control's compare cta");
    }
  });

  if (VARIATION === 'control') return;

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    removePlpChanges();
    pollerLite(['#__next', '#__NEXT_DATA__', () => window.__NEXT_DATA__ !== undefined], () => {
      setTimeout(init, DOM_RENDER_DELAY);
    });
  });
};
