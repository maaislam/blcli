/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(
  [
    '.pgHotel .main .c-section .bookNow',
    '.rate-btn[data-rate-plan-code="SAVER"]',
    '.rebaseFixedButton .js-room-total-amount',
    () => window.globalDataLayer?.flexibleRateAmount !== undefined,
    () => window.roomRateObj !== undefined,
  ],
  activate
);
