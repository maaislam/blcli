export default () => {
  function getJSONFromDataAttr(selector, dataAttr) {
    const element = document.querySelector(selector);
    const dataStr = element.getAttribute(dataAttr);
    return JSON.parse(dataStr);
  }
  
  const productData = getJSONFromDataAttr('.variations_form', 'data-product_variations');
  const stockData = getJSONFromDataAttr('.merchoid-limited', 'data-merchoid-dispatch-info').variation_stock;
  const stockLevels = (() => {
    const obj = {};
    for (let i = 0; i < productData.length; i++) {
      const variationData = productData[i];
      const variationId = variationData.variation_id;
      const size = variationData.attributes.attribute_pa_size;
      const isInStock = stockData[variationId] > 0;
    
      obj[size] = isInStock;
    }
    return obj;
  })();

  return stockLevels;
};