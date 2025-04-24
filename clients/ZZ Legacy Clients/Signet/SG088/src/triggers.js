/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.product-gallery__image-container img',
  '.detail-page__left-column',
  '.brand-logo',
  '.detail-page__right-column',
  '.product-accordion-item__content',
  '.product-specification__item',
  '.product-specification__detail',
  () => {
    if(window.digitalData.page.category.primaryCategory === 'Watches') {
      return true;
    }
  },
  () => {
    return !!window.Swiper;
  },
], activate);
