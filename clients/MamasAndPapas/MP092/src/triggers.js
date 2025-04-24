import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.productDetail_price',
  '.productDetail_title',
], Experiment.init);
