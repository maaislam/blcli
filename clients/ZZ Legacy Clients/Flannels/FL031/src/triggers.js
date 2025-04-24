import Run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const sessionCheck = sessionStorage.getItem('FL031');

// if (!sessionCheck) {
  pollerLite([
    '#divBagItems',
  ], Run);
// }
