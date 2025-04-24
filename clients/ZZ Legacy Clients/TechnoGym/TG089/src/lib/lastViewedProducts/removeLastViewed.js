import settings from '../settings';

/* Loop through products, if name matches the product in list, hide it */

export default () => {
  const lastViewed = document.querySelectorAll(`.${settings.ID}_LastViewedProducts-item`);
  const allProducts = document.querySelectorAll('.category-products .item-product');
  for (let index = 0; index < allProducts.length; index += 1) {
    const element = allProducts[index];
    const productName = element.querySelector('.product-name a');

    [].forEach.call(lastViewed, (item) => {
      const lastViewedName = item.querySelector(`.${settings.ID}_LastViewedProducts-name`);
      if (productName.textContent === lastViewedName.textContent) {
        element.classList.add(`${settings.ID}-productInLastViewed`);
      } else {
        element.classList.remove(`${settings.ID}-productInLastViewed`);
      }
    });
  }
};
