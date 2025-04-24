import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.rc4-search-container',
  '.rc4-search-box',
  'span.RC022_selectCourseType',
], activate);
