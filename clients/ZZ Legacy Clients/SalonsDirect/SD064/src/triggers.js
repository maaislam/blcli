import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body',
  '.product-shop',
  '.product-details-box .last',
  '.sku-code',
  '.product-options-bottom .qty-wrapper #qty',
  '.product-options-bottom .add-to-cart .button.btn-cart',
], Experiment.init);
