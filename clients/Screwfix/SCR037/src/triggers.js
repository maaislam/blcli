import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['#__next', '#__NEXT_DATA__', 'header'], () => {
  setTimeout(activate, 2000);
});
