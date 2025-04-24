import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';

pollerLite([
  '.main.mainMobileInside',
  '#ctl00_cphBody__objOffersMobile_pnlPromoCode',
  '.offer-m',
  '.offer-desc .redText',
], () => {
  events.send('PJ038', 'View', 'PJ038 activated - Control');
});
