/* Get the stock levels, disable any out of stock */

import settings from '../../settings';

export default () => {
  function getJSONFromDataAttr(selector, dataAttr) {
    const element = document.querySelector(selector);
    const dataStr = element.getAttribute(dataAttr);
    return JSON.parse(dataStr);
  }
  const productData = getJSONFromDataAttr('.variations_form', 'data-product_variations');
  const stockData = getJSONFromDataAttr('#main-content .product-page', 'data-merchoid-dispatch-info').variation_stock;
  const stockLevels = (() => {
    const obj = {};
    for (let i = 0; i < productData.length; i += 1) {
      const variationData = productData[i];
      const variationId = variationData.variation_id;
      const size = variationData.attributes.attribute_pa_size;
      const isInStock = stockData[variationId] > 0;

      obj[size] = isInStock;
    }
    return obj;
  })();

  const stockObj = stockLevels;

  const allSizes = document.querySelectorAll(`.${settings.ID}-size`);
  for (let index = 0; index < allSizes.length; index += 1) {
    const element = allSizes[index];
    const sizeAttr = element.getAttribute('size-target');
    Object.keys(stockObj).forEach((i) => {
      const data = stockObj[i];
      if (sizeAttr === [i][0]) {
        if (data === false) {
          element.classList.add(`${settings.ID}-outOfStock`);
        }
      }
    });
  }
};
