import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', '#productlistcontainer ul.s-productscontainer2 li', '.sdlProdList',
  () => {
    return document.readyState == 'complete';
  }
], activate);
