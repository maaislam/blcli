import { events, scrollTo } from '../../../../../../lib/utils';
import { pollerLite } from '../../../../../../lib/uc-lib';

export default (str) => {
  return str.toLowerCase()
  .split(' ')
  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
  .join(' ');
};