import Run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.radical-variations-wrapper',
  '#pa_size',
  () => {
    let trigger = false;
    if (window.wc_aelia_currency_switcher_params) trigger = true;
    return trigger;
  },
], Run);
