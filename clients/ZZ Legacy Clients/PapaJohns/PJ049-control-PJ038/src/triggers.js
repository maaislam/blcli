import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.main.mainMobileInside',
  '#ctl00_cphBody__objOffersMobile_pnlPromoCode',
  '.offer-m',
  '.offer-desc .redText',
], Experiment.init);
