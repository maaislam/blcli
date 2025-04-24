import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';
/* eslint-disable */
poller([
  '.row.max-width.mobile-only-768',
  '.product-title-region',
  '.flickity-slider',
  '.flickity-slider li',
  '.merchoid_price_framing img',
  () => {
    return window.Flickity;
  },
], Experiment.init);
