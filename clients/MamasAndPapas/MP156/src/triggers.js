import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.yCmsComponent.content-plp .content',
  () => {
    if (window.location.pathname === '/en-gb/c/boys-clothing' || window.location.pathname === '/en-gb/c/girls-clothing' || window.location.pathname === '/en-gb/c/parasols-raincovers' || window.location.pathname === '/en-gb/c/pushchairs-prams' || window.location.pathname === '/en-gb/c/new-arrivals-travel' || window.location.pathname === '/en-gb/c/buggies-strollers' || window.location.pathname === '/en-gb/c/twin-double-pushchairs' || window.location.pathname === '/en-gb/c/pushchairs-all') {
      return true;
    }
  },
], activate);
