import activate from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

/* eslint-disable */
pollerLite([
  '.buying-options',
  '#buy',
  () => {
    try {
      return !!window.digitalData.product[0];
    } catch(e) {}
  },
  () => {
    try {
      return !!window.jQuery;
    } catch(e) {}
  },
], activate);
/* eslint-enable */
