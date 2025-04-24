/* eslint-disable */
import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body',
  '.detail_items.cross-sell',
  '.product',
  'span.pricing .price-suffix',
  'span.tooltip_VAT',
], Experiment.init);
