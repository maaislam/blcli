/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

import renderLightbox from './components/lightbox';
//import { sampleToProductMap } from './data';
import { getCart } from './helpers/addToCart';
//import { checkUserPurchase } from './helpers/checkUserPurchase';
import clickHandler from './helpers/clickHandler';
import observeDOM from './helpers/observeDOM';
import { localStorageGet } from './helpers/storage';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;
const init = (mutation) => {
  setup();
  //fireEvent(`Customer lands on ${location.pathname} page.`);
  // -----------------------------
  // If control, bail out from here
  // -----------------------------

  const { addedNodes, removesNodes, target } = mutation;

  if (addedNodes.length <= 0 || !target.matches('.cart-count') || document.querySelector(`.${ID}__lightbox--wrapper`)) return;

  if (VARIATION == 'control') {
    fireEvent('Conditions Met');
    return;
  }
  if (VARIATION == '2' && parseInt(sessionStorage.getItem(`${ID}__viewcount--variation-${VARIATION}`)) > 0) {
    return;
  }

  //hide increasing;y sidebar

  const incOverlay = document.querySelector('.inc_sidebar_overlay_block');
  const incSideBar = document.querySelector('.inc_sidebar_modal_block')?.closest('.sidebar_outer');

  [incOverlay, incSideBar].forEach((elm) => {
    console.log(elm);
    elm?.classList.add(`${ID}__hide`);
  });

  //get cart

  getCart().then((cartData) => {
    const samplesInCart = cartData.items.filter((data) => data.title.indexOf('Sample') !== -1);
    const popularSamples = localStorageGet('popular-samples');

    console.log('popularSamples', popularSamples);

    const popularSamplesMinusCart =
      popularSamples.reduce((prev, curr) => {
        if (samplesInCart.length === 0) {
          return;
        }

        const isInCart = samplesInCart.some((item) => item.sku == curr.sku);
        console.log(isInCart);
        if (!isInCart) {
          prev.push(curr);
        }
        return prev;
      }, []) || popularSamples;
    if (popularSamplesMinusCart.length === 0) return;
    //get fullsized products
    const firstThree = popularSamplesMinusCart.slice(0, 3);
    const sampleHandles = firstThree.map((product) => product.url.split('/products/')[1].split('?')[0]);
    console.log(sampleHandles);

    const getAvonProdData = sampleHandles.map((item) => fetch(`/products/${item}.js`));

    Promise.all(getAvonProdData)
      .then((results) => Promise.all(results.map((response) => response.json())))
      .then((dataFromShopify) => {
        const combinedData = dataFromShopify.map((item, index) => {
          const activeVariant =
            item.variants.filter((variant) => firstThree[index].name.indexOf(variant['public_title']) !== -1)[0] ||
            item.variants[0];
          console.log('activeVariant', activeVariant);
          activeVariant.primaryImg = item['featured_image'];
          activeVariant.productUrl = item['url'];
          return activeVariant;
        });
        console.log('combined data', combinedData);

        console.log(popularSamplesMinusCart);
        document.body.classList.add(`${ID}__body-adjust`);
        document.body.insertAdjacentHTML('beforeend', renderLightbox(ID, combinedData));
        fireEvent('Conditions Met');
        const viewCount = sessionStorage.getItem(`${ID}__viewcount--variation-${VARIATION}`) || 0;
        //set view count and store in session storage
        sessionStorage.setItem(`${ID}__viewcount--variation-${VARIATION}`, parseInt(viewCount) + 1);
        console.log('VARIATION', VARIATION);
        clickHandler(ID, VARIATION, fireEvent);
      });
  });
};
export default () => {
  //get popular sample and store in cookies

  //check for add to cart action

  observeDOM('#header-bag .cart-count', init);
};
