import activate from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * Cookie 'HS007_submitted' exists when the form has been submitted previously
 * or form was closed
 */
const newsletterWillShow = document.cookie.indexOf('HS007_submitted=') === -1;
if (newsletterWillShow) {
  pollerLite([
    '#js-emailSignUp',
    '.main-site-header',
  ], activate);
}
