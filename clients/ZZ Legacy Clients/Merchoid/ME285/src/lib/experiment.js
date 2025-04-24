/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import MobileNavigation from './mobile/mobileMarkup';
import shared from './shared';
import mobileHeader from './mobile/mobileHeader';
import DesktopHeader from './desktop/desktopHeader';
import DesktopNavigation from './desktop/desktopNavMarkup';

export default () => {
  setup();

  const { ID } = shared;


  if(window.innerWidth < 1024) {
    document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);
    new MobileNavigation();
    mobileHeader();
  }

  if(window.innerWidth >= 1024) {
    new DesktopHeader();
    new DesktopNavigation();
  }
};
