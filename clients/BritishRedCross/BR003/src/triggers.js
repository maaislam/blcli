import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  // () => { // eslint-disable-line consistent-return
  //   if (window && window.location && window.location.href && window.location.href.indexOf('/PersonalDetails/Index') > -1) {
  //     return !!document.querySelector('#form-personal-details-pre-wp');
  //   }
  // },
], activate);
