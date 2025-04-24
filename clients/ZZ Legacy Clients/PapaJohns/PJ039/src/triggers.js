import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.menuList',
  '#ctl00_cphBody__objOffers_pnlPromoCode',
  '.main',
], Experiment.init);
