import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.aside-content',
  '.category-title h1',
  '#narrow-by-list',
  () => {
    return !!window.jQuery;
  },
], activate);
