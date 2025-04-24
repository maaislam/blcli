import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';
/* eslint-disable */
poller([
  'body',
  '.price_container .button.product_buy',
  () => {
    return window.prm;
  },
], Experiment.init);
