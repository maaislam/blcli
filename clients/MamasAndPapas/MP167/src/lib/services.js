import { fullStory } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

export const getCat = () => {
  let obj = {
    gender: null,
    // type: null,
  }
  // Get info from Datalayer
  if (window.dataLayer && window.dataLayer[0]) {
    const { ecommerce } = window.dataLayer[0];
    if (ecommerce && ecommerce.detail) {
      const { products } = ecommerce.detail;
      if (products) {
        products.map((prod) => {
          const { category } = prod;
          if (category.match(/Clothes|Clothing/gmi)) {
            // We're in the right product type. Clothing PDP.
            if (category.match(/boys/gmi)) {
              obj.gender = 'Boys';
            } else if (category.match(/girls/gmi)) {
              obj.gender = 'Girls';
            } else if (category.match(/unisex/gmi)) {
              obj.gender = 'Unisex';
            }

            // Check product type
            // obj.type = category.substr(category.lastIndexOf('/') + 1);
          }
        });
        return obj;
      }
    }
  }
};

export { setup }; // eslint-disable-line
