import { events } from '../../../../lib/utils';
import mapPoller from './lib/mapPoller';

import init from './lib/experiment';

mapPoller([
  {
    'logo': '#top-nav .logo-block',
    'topNav': '#top-nav',
  },
], init);
