/**
 * Helper get product items
 *
 * @return {NodeList}
 */
export const getProductItems = () => {
  const productItems = document.querySelectorAll('.items .product-tile-list__item');
  return productItems;
};
