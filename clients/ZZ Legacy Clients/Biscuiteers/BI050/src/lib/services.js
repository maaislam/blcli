import { fullStory } from '../../../../../lib/utils';
import shared from './shared';

/**
 * Is current page a PLP or PDP?
 *
 * Always worth re-checking that we're on a PLP or PDP page as otherwise
 * we risk intercepting add to basket events on other pages
 */
export const isCurrentPagePlpOrPdp = () => {
  return document.querySelector('local-product-view local-add-to-basket') 
    || document.querySelector('.carousel-with-products')
    || document.querySelector('category-view .grid .product');
};

/**
 * Helper get root scope
 */
export const getRootScope = () => {
  return angular.element(document.body) ? 
    (angular.element(document.body).injector() ?
      angular.element(document.body).injector().get('$rootScope') : false
    ) : null
  ;
}

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
};
