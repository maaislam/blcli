import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', '.page-productGrid.feature-design .view_mode_buttons span', '.perpage_list',
  () => {
    let run = false;
    if (window.location.href.indexOf('Product/Building-Materials/Bricks+Blocks/') > -1) {
      run = true;
    };
    return run;
  },
], activate);
