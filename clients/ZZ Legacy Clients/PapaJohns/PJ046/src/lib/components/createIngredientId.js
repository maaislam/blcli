import { events, scrollTo } from '../../../../../../lib/utils';
import { pollerLite } from '../../../../../../lib/uc-lib';

export default (str) => {
  const camel = str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');

  return camel.charAt(0).toLowerCase() + camel.slice(1);
};
