import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';

pollerLite([
  '.menuList',
  '#ctl00_cphBody__objOffers_pnlPromoCode',
  '.main',
], () => {
  events.send('PJ039', 'View', 'PJ039 activated - Control');
});
