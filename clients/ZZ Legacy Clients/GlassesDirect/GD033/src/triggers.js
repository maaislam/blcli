import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#navigation .wrapper',
], Experiment.init);
