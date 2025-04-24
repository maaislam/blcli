import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '#ctl00__objHeader_lbSelectStoreMenuItem',
  '#ctl00__objHeader_pnlStoreMenuHasStore',
], activate);
