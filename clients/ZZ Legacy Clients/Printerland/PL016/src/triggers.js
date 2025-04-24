import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '#ctl00_ctl00_pnlUpdatestaticWrapper',
], activate);
