import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.product-main-info .product-description-wrapper',
  '.contact-team a',
], activate);
