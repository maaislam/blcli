import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { getCookie } from '../../../../lib/utils';

pollerLite([
  'body', 'ul.filter_group > li',
  '#js-filterSortOrder .d-inline-block',
], activate);
