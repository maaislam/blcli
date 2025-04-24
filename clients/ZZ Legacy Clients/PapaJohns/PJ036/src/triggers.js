import Run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.mainMobileInside.main .menuItems .menuListCont .splitButtons a',
  '#ctl00_cphBody_upProductLists'
], Run);
