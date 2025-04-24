import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';
/* eslint-disable */
poller([
  '.row.max-width.mobile-only-768',
  '.mobile-only-768.product-information-mobile',
  '.product-title-region',
  '.flickity-slider',
  '.flickity-slider li',
  () => {
    return window.Flickity;
  },
], Experiment.init);
