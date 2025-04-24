import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', '#productlistcontainer ul.s-productscontainer2 li', '.flanProdList',
  () => {
    let run = false;
      if (window.jQuery) {
        $ = window.jQuery;
        run = true;
      }
      return run;
  }
], activate);
