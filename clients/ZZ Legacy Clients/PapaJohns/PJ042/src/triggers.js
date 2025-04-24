import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.mainMenu.mobile .first.uppercase',
], Experiment.init);
