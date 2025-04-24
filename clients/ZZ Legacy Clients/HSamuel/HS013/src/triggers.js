import activate from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.site-logo',
  'main .container',
  '.product-summary__right',
  '.order-summary',
  '#lower-button-group',
], activate);
