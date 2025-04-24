import { mapPoller } from '../../../../lib/uc-lib';
import Run from './lib/experiment';

mapPoller([
  {
    // 'mainHeader': '.main-site-header',
    'gridWrap': 'main.mainContent'
  },
], Run);
