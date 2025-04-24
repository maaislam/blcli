import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '#PDP-Details',
  () => {
    return window && window.universal_variable && window.universal_variable.page && window.universal_variable.page.type === 'Product';
  },
], activate);
