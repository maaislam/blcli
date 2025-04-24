/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { pollerLite } from '../../../../../lib/utils';
import Modal from './components/Modal/Modal';
import renderPlpAddToCart from './components/products';
import addToCart from './helpers/addToCart';
import getFullProductDetails from './helpers/getFullProdData';
import modifyProductListTemplate from './helpers/prodTemplate';
import productActionHandler from './helpers/productAction';
import { fireEvent } from './services';
import shared from './shared';

export default () => {
  const { rootScope, ID, VARIATION } = shared;
  if (VARIATION == 'control') {
    return;
  }
  const modal = new Modal();
  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const initStep1 = (reRender = true, showAll = false) => {
    console.log('Running', ID);
    getFullProductDetails(showAll).then((response) => {
      console.log('response: ', response);
      window.AG086bData = response.Data.Products;
      reRender && modifyProductListTemplate(modal);

      pollerLite([() => document.querySelectorAll('[data-product-id]').length == window.AG086bData.length], () => {
        setTimeout(() => {
          const productCardCtas = document.querySelectorAll(`.${ID}_ctaWrapper`);
          //console.log(productCardCtas.length);
          productCardCtas.forEach((cardCtaWrapper) => {
            const productData = window.AG086bData.filter(
              (item) => item.Id == cardCtaWrapper.closest('.ProductListItem').getAttribute('data-product-id')
            );
            //console.log('product data', productData);
            renderPlpAddToCart(productData, cardCtaWrapper, ID);
          });
          reRender && productActionHandler(ID, fireEvent, addToCart);
        }, 2000);
      });
    });
  };

  // Make device specific changes when layout changes

  rootScope.$on('App_LayoutChanged', () => {
    location.reload();
  });

  initStep1();
  let oldHref = document.location.href;
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      //console.log(mutation);
      const { addedNodes, removedNodes } = mutation;

      let showAll;
      if (removedNodes && removedNodes.length > 0) {
        removedNodes.forEach((item) => {
          if (item.nodeType !== 1) return;
          if (item.matches('a.ViewAllButton')) {
            showAll = true;

            showAll && initStep1(false, showAll);
          } else if (item.matches('a.ViewLessButton')) {
            initStep1(false);
          }
        });
      }
      if (oldHref != document.location.href) {
        oldHref = document.location.href;
        initStep1(false);
        return;
      }
      addedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.matches('.ModalContent') && node.querySelector(`.${ID}_ModalImages_details`)) {
          const modalProductData = window.AG086bData.filter(
            (item) => item.Id == node.querySelector(`.${ID}_ModalImages`).getAttribute('data-prod-id')
          );
          const anchorElem = node.querySelector(`.${ID}_ModalImages_details`);
          node.querySelector(`.AddToCart`)?.classList.add(`${ID}__hide`);
          renderPlpAddToCart(modalProductData, anchorElem, ID, 'modal');
          //productActionHandler(ID, fireEvent, addToCart);
        }
      });
    });
  });

  const config = {
    childList: true,
    subtree: true,
  };
  const appContainer = document.querySelector('body');
  observer.observe(appContainer, config);
};
