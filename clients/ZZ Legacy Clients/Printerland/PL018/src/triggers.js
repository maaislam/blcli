import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';

events.setPropertyId('UA-3521256-1');

pollerLite([
  'body',
  () => !!window.jQuery,
  // () => {
  //   if (window.location.pathname === '/') {
  //     return true;
  //   } else if (window.location.href.indexOf('/product/') > -1) {
  //     dataLayer.forEach(element => {
  //       if (element.ecommerce && element.ecommerce.detail && element.ecommerce.detail.products[0].category && element.ecommerce.detail.products[0].id && element.ecommerce.detail.products[0].price && element.ecommerce.detail.products[0].brand) {
  //         // console.log('trigger passed------');
  //         return true;
  //       }
  //     });
  //   }
  // },
], activate);
