import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['#__next', '#__NEXT_DATA__', () => window.__NEXT_DATA__ !== undefined], () => {
  setTimeout(activate, 2000);
});
