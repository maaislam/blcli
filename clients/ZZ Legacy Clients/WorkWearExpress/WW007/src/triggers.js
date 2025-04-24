import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const trigger = () => {
  pollerLite([
    () => !!window.jQuery,
    '#product_add_form',
    '#product_grid',
    '#product_select',
    '#colour_select',
    '#size_select',
    '#qty_select',
  ], activate);
};

trigger();
