
/**
 * Get product data from dataLayer
 *
 * Last-added product corresponds (async colour switching => datalayer push)
 */
const getProductDataFromDataLayer = () => {
  let productData = {};

  let curPath = window.location.pathname;
  curPath = curPath.replace('/us/', '');

  for(let i = dataLayer.length - 1; i >= 0; i--) {
    if(dataLayer[i]?.product?.url?.indexOf(curPath) > -1) {
      productData = dataLayer[i].product;
      break;
    } 
  }

  return productData;
};

export { getProductDataFromDataLayer };
