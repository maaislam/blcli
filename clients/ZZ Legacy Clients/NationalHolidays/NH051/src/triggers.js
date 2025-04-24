import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.inner-content',
  'section.blue .slider-wrap a.item',
], Experiment.init);
