/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { sizesImageDesktop, sizesImageMobile, sizesImageTablet } from './components/sizesImage';
import { pollerLite } from '../../../../../lib/uc-lib';

import PJ034 from './components/PJ034sizes';

const activate = () => {
  setup();

  if (window.innerWidth < 600) {
    pollerLite([
      '.main .menuItems',
    ], sizesImageMobile);
  } else if(window.innerWidth >= 600 && window.innerWidth <= 1024) {
    pollerLite([
      '.PJMCont .menuBanner',
    ], sizesImageTablet);
  } else if(window.innerWidth > 1024) {
    pollerLite([
      '.menuBanner',
    ], sizesImageDesktop);
  }

  PJ034();
};

export default activate;
