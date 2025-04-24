/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import variantGroup from './components/variantGroup';
import variantOptions from './data';
import changeHandler from './handlers/changeHandler';
import clickHandler from './handlers/clickHandler';
import intersectionHandler from './handlers/intersectionHandler';
import obsIntersection from './helpers/observeIntersection';
import { getVariantOptions, renderSelected } from './helpers/utils';

const { ID, VARIATION } = shared;

export default () => {
  setup();

  const pathname = window.location.pathname;
  const selectedProduct = variantOptions.find((item) => item.url === pathname);
  //console.log('selectedProduct', selectedProduct);
  if (!selectedProduct) return;
  const productVariants = variantOptions.filter((item) => item.productName === selectedProduct.productName);
  //console.log(productVariants);
  document.body.addEventListener('click', clickHandler);
  document.body.addEventListener('input', changeHandler);

  const isMobile = window.matchMedia('(max-width: 640px)').matches;
  const anchorElem = isMobile
    ? document.querySelector('[data-qaid="pdp-price"]').parentElement.parentElement
    : document.querySelector('[data-qaid="pdp_sticky_product_footer"]');

  obsIntersection(anchorElem, 1, intersectionHandler);

  if (VARIATION == 'control') {
    return;
  }

  const variantContainer = document.createElement('div');

  variantContainer.classList.add(`${ID}__variant-container`);
  anchorElem.insertAdjacentElement('beforebegin', variantContainer);

  const colorData = getVariantOptions(productVariants, 'color');
  const sizeData = getVariantOptions(productVariants, 'volume');
  const finishData = getVariantOptions(productVariants, 'finish');

  if (VARIATION === '2') {
    finishData.length > 0 && variantContainer.insertAdjacentHTML('afterbegin', variantGroup(ID, finishData, 'finish'));
  }
  sizeData.length > 0 && variantContainer.insertAdjacentHTML('afterbegin', variantGroup(ID, sizeData, 'volume'));
  colorData.length > 0 && variantContainer.insertAdjacentHTML('afterbegin', variantGroup(ID, colorData, 'color'));

  //render selected
  renderSelected(selectedProduct);
};
