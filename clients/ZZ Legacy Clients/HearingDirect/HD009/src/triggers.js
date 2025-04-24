import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body',
  '.container__product',
  '.product-info .product-into__reviews',
  () => !!window.jQuery,
], Experiment.init);
