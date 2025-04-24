import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '#feefo-reviews',
  '.col-main',
  '#product_addtocart_form .add-to-cart-buttons > button',
], Experiment.init);
