/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, share } from './services';
import shared from './shared';
import { pollerLite } from '../../../../../lib/utils';

export default () => {
  setup();

  const { ID,VARIATION } = shared;

  // get page type
  if(shared.VARIATION === '1') {
    if(document.querySelector('#estores_product_listing_widget')) {
      document.body.classList.add(`${ID}-plp`);
    }

    if(document.querySelector('#estore_productpage_template_container')) {
      document.body.classList.add(`${ID}-pdp`);
    }
  }

  const getTagStarOnPLP = () => {

      const cat = window.location.pathname.match(/^(\/)[\w\d-]+/)[0].replace(/\//, '');
      // send event if tagstar exists
      if(cat) {
        if(document.querySelector('.tagg-category-page')) {
            window.cmCreateManualLinkClickTag(`/BO035?cm_sp=TagstarShownPLP-_-${VARIATION}-_-${cat}`);
          }
        }

        //send event if product with tagstar exists
        const allProducts = document.querySelectorAll('.estore_product_container');
        for (let index = 0; index < allProducts.length; index += 1) {
          const element = allProducts[index];
          const hasTagstar = element.querySelector('.tagg-category-page');
          element.addEventListener('click', () => {
            if(hasTagstar) {
              const tagStarText = hasTagstar.innerText.trim();
              window.cmCreateManualLinkClickTag(`/BO035?cm_sp=${VARIATION}-_-ClickedPLP ${tagStarText} on clicked product-_-${cat}`);
            }
          });
        }
    }
  

  const getTagStarOnPDP = () => {
    const cat = window.location.pathname.match(/^(\/)[\w\d-]+/)[0].replace(/\//, '');
    const tagStarShown = document.querySelector('.tagg-product-page .tagg-reset');
    if(cat) {
      if(tagStarShown) {
        const productPrice = document.querySelector('#PDP_productPrice').innerText.trim();
        const tagText = tagStarShown.innerText.trim();
        const addToBag = document.querySelector('#productPageAdd2Cart');

        window.cmCreateManualLinkClickTag(`/BO035?cm_sp=TagstarShownPDP${VARIATION}-_-${tagText}-_-${cat},${productPrice}'`);

        addToBag.addEventListener('click', () => {
          window.cmCreateManualLinkClickTag(`/BO035?cm_sp=TagstarShownPDP${VARIATION}-_-AddToBasket-_-${cat},${productPrice}`);
        });
      }
    }
  }

  if(document.body.classList.contains(`${ID}-plp`)) {
    pollerLite(['.tagg-category-page'], () => {
      getTagStarOnPLP();
    });
  }

  if(document.body.classList.contains(`${ID}-pdp`)) {
    pollerLite(['.tagg-product-page'], () => {
      getTagStarOnPDP();
    });
  }
};
