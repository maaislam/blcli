// eslint-disable-next-line
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';

events.setTrackerName('tracker2');

pollerLite([
  'body',
  '.box-with-border.white div.side-block',
  /*eslint-disable */
  () => {
    if (window && window.location && window.location.pathname && window.location.pathname.indexOf('/OrderProcess') > -1) {
      return true;
    }
  },
  /* eslint-enable */
], activate);
