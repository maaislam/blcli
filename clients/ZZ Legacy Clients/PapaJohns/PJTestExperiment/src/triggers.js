import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => {
    if( (new Date()).getHours() < 22 && (new Date()).getHours() > 6 ) {
      return true;
    }
  },
], activate);
