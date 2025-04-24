import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.product-view',
  '.frame-specs__stats__table > tbody > tr',
], activate);
