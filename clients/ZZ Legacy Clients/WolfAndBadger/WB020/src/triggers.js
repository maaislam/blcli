/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const matchPages = () => {
  const isPDP = !!document.querySelector('.product-detail-body');
  const url = window.location.href;
  const isCheckoutPage = url.indexOf('/shopping-bag/') !== -1 || url.indexOf('/checkout/shipping/') !== -1 || url.indexOf('/checkout/payment/') !== -1;
  return isPDP || isCheckoutPage;
};

pollerLite(['body', matchPages], activate);
