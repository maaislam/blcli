import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.grid.list-view .cell',
  '.pricing-container',
  'div.compare',
  'strong.small.text-info',
  () => {
    let page = '';
    dataLayer.forEach(element => {
      if (element.eventLabel && element.eventLabel === "Category Page") {
        page = 'PLP';
      }
    });
    if (page === 'PLP' && window.location.pathname.indexOf("/printers") > -1) {
      return true;
    }
  },
], activate);
