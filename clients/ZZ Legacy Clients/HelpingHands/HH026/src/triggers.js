import Run from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if (window.MutationObserver) {
  pollerLite([
    '.phone-number.InfinityNumber',
  ], Run);
}
