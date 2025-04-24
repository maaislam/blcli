import run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

// Start polling if array filter method exists
if (typeof Array.prototype.filter === 'function') {
  pollerLite([
    '#ctl00_ctl02_txtKeyword',
    '#ctl00_ctl02_pnlKeyword',
  ], run);
}
