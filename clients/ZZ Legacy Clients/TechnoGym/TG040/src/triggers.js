import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body', '.product-main-info > .product-name > h1[itemprop="name"]', 'div[role="main"] .product-view > .container',
], Experiment.init);
