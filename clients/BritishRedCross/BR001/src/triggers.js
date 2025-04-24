import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.component.navigation .main li a',
], Experiment.init);
