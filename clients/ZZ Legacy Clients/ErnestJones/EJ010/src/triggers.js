import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '#lower-button-group .cta--basket',
  '.cta--basket-paypal-button',
  '.container .logo',
  '.cta--secondary.js-continue-shopping',
  '.product-summary__right',
  '.product-summary__sku',
  '.order-summary__container',
  '.basket__promo-code',
], Experiment.init);
