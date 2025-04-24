import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '#ctl00_ctl02_flexibleSearchPanel.holiday-search', // Seach Box
], Experiment.init);
