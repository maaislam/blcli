import activate from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const URL = window.location.href;
const user = window.dataLayer.filter(el => typeof el.user !== 'undefined');
const userLoggedIn = user && user[0].user.userStatus === 'logged in';

if (/.*karenmillen.com\/gb\/billing/.test(URL) && !userLoggedIn) {
  pollerLite([
    '#use_shipping',
    '.billing-form-fields',
    '#toPayment',
  ], activate);
}
