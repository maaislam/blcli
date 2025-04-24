import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#js-header',
  () => {
    return !!window.jQuery;
  },
], activate);
