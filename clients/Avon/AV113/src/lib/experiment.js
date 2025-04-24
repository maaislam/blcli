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
import { sampleToProductMap } from './data';
import { getCart } from './helpers/addToCart';
import { checkUserPurchase } from './helpers/checkUserPurchase';
import clickHandler from './helpers/clickHandler';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;
const init = (data, purchasedFullSizedProducts) => {
  setup();
  fireEvent(`Customer lands on ${location.pathname} page.`);
  // -----------------------------
  // If control, bail out from here
  // -----------------------------

  //get fullsized products
  console.log('purchased sample', data);
  const fullSizedProdHandle = data.map((product) => {
    const purchsedSampleHnadle = product.item.url.split('/products/')[1].split('?')[0];
    console.log(purchsedSampleHnadle);
    return sampleToProductMap[purchsedSampleHnadle];
  });
  console.log(fullSizedProdHandle);

  const getAvonProdData = fullSizedProdHandle.map((item) => fetch(`/products/${item}.js`));

  Promise.all(getAvonProdData)
    .then((results) => Promise.all(results.map((response) => response.json())))
    .then((dataFromShopify) => {
      console.log('data from shopify', dataFromShopify);
      const combinedData = dataFromShopify.map((item, index) => {
        const activeVariant =
          item.variants.filter((variant) => data[index].item.name.indexOf(variant['public_title']) !== -1)[0] || item.variants[0];
        console.log('activeVariant', activeVariant);
        activeVariant.primaryImg = item['featured_image'];
        activeVariant.productUrl = item['url'];
        return activeVariant;
      });
      console.log('combined data', combinedData);

      // check versus user's current state

      //check if previously purchased
      console.log(purchasedFullSizedProducts);
      const hasAlreadyPurchased = combinedData.some((item) =>
        purchasedFullSizedProducts.some((prod) => prod.item.sku === item.sku)
      );
      console.log('hasAlreadyPurchased', hasAlreadyPurchased);

      const isVistingFullSizedProd = combinedData.some((prod) => prod.productUrl === location.pathname);
      console.log('isVistingFullSizedProd', isVistingFullSizedProd);

      //check if fullsized product is in cart

      getCart().then((data) => {
        const hasAlreadyAddedToCart = combinedData.some((item) => data.items.some((prod) => prod.sku === item.sku));
        console.log('hasAlreadyAddedToCart', hasAlreadyAddedToCart);
        const seeCount = parseInt(sessionStorage.getItem('user-seen-av113')) || 0;
        console.log('see-count', seeCount);
        if (seeCount > 4 || hasAlreadyAddedToCart || isVistingFullSizedProd || hasAlreadyPurchased) return;
        if (VARIATION == 'control') {
          fireEvent('Conditions Met');
          return;
        }
        document.body.classList.add(`${ID}__body-adjust`);
        document.body.insertAdjacentHTML('beforeend', renderLightbox(ID, combinedData));
        fireEvent('Conditions Met');
        clickHandler(ID, fireEvent);
        let seeCounter = parseInt(sessionStorage.getItem('user-seen-av113')) || 0;
        sessionStorage.setItem('user-seen-av113', `${seeCounter + 1}`);
        console.log('see-count', sessionStorage.getItem('user-seen-av113'));
      });
    })
    .catch((err) => console.log('Error: ', err));
};
export default () => {
  //if (sessionStorage.getItem('user-seen-av113') == 'true') return;
  checkUserPurchase(init);
};
