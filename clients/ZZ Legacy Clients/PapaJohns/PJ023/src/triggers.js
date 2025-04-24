import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '#ctl00__objHeader_pnlStoreMenuHasStore .bodyText > span',
  '.storeName [itemprop="name"]',
  '#ctl00__objHeader_upHeaderSummary',
  '#ctl00__objHeader_upOmnibar',
  '#ctl00__objHeader_upBasketNotification',
  '.basketNotification',
  '#ctl00__objHeader_upOmnibar .omnibarMenu > ul',
], Experiment.init);
