/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

const checkIfContains = (string, values) => {
  let found = 0;
  values.forEach((value) => {
    if (string.indexOf(value) > -1) {
      found += 1;
    }
  });

  if (found > 0) return true;
  return false;
};

const products = ['10294573', '10294362'];

if (
  !ieChecks &&
  !getCookie('Synthetic_Testing') &&
  checkIfContains(window.location.href, products)
) {
  pollerLite(['body', '#estore_pdp_topsec', '.payPal3PDPMessage'], activate);
}
