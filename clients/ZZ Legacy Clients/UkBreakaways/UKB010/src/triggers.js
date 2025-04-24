import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  // 'div[data-mid="10191"]',
  // '.tmspslot .inspire-masterblock',
  () => window.location.pathname === "/" || window.location.pathname.indexOf("/itineraries/") > -1,
  () => (
    !!document.querySelector('div[data-mid="10191"]') 
    && 
    !!document.querySelector('.tmspslot .inspire-masterblock .column1') 
    && 
    !!document.querySelector('.tmspslot .inspire-masterblock .column1 .containernew') 
 ) 
    || 
 (
  !!document.querySelector('.destination-box') && !!document.querySelector('.destination-box h1.itin-title-h')
 )
], activate);
