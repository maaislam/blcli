import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.homepageContainer > .grid',
  () => {
    const jq = window['j'.trim() + 'Query'];
    return !!jq && !!jq.fn.slick;
  },
], activate);
