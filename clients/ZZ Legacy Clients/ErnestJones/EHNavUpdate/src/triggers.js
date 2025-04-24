import Run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#js-nav-status',
], Run);
