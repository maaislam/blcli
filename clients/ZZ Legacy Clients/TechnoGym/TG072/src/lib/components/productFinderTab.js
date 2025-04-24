import { __ } from '../helpers';

export default () => {
  const productFinderTab = document.createElement('div');
  productFinderTab.classList.add('TG072-product_finderTab');
  productFinderTab.innerHTML = `<span></span><p>${__('PRODUCT FINDER')}</p>`;
  document.body.append(productFinderTab);
};
