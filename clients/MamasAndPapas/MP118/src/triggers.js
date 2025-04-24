import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '#js-header .header_logo-black'
], Experiment.init);
