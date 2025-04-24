import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => {
    return window.universal_variable.page.type === 'Category';
  },
], activate);
