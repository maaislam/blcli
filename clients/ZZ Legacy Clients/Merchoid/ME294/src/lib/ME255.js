import { setup, fireEvent } from '../../../../../core-files/services';
import MobileNavigation from './mobile/mobileMarkup';
import shared from '../../../../../core-files/shared';
import mobileHeader from './mobile/mobileHeader';
import DesktopHeader from './desktop/desktopHeader';
import DesktopNavigation from './desktop/desktopNavMarkup';
import allBrands from './mobile/allBrands';

export default () => {
  setup();

  const { ID } = shared;


  if(window.innerWidth < 1024) {
    document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);
    new MobileNavigation();
    //allBrands();
    mobileHeader();
  }

  if(window.innerWidth >= 1024) {
    new DesktopHeader();
    new DesktopNavigation();
    //allBrands();
  }
};