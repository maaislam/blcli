import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.pdp_recently_viewed.col-pdp',
  '.breadcrumb_category_item',
  () => {
    let run = false;
    if (window.universal_variable.page.type == 'Product') {
      run = true;
    }
    return run;
  }
], activate);
