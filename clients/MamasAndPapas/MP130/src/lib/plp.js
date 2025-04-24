import PLPReview from '../components/PLPReview/PLPReview';

/**
 * @param {array} includedSKUs All product SKUs that should have a review
 */
export default (includedSKUs) => {
  const allProducts = document.querySelectorAll('.productCard');

  Array.from(allProducts).forEach((product) => {
    const sku = product.querySelector('.ga-product-click').getAttribute('data-code');
    if (includedSKUs.indexOf(sku) > -1) {
      new PLPReview(product); // eslint-disable-line no-new
    }
  });
};
