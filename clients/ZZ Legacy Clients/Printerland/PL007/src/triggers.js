import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#ctl00_ctl00_ContentPlaceHolderMain_cntPlaceHlderMain_updateBuyButton',
], Experiment.init);
