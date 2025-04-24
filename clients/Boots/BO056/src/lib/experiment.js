

/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import BannerMarkup from './components/bannerTemplate';
import { bannerDataMarkup, bannerDataMarkupV2, slickOuterCarousel, slickSmallCategories } from './components/bannerData';
import { getLastCategory, getLastDepartment } from './components/getStorage';
import shared from './shared';

export default () => {
  setup();

  const { ID } = shared;

 // show banners if last category exists
  if(getLastCategory()) {
    document.body.classList.add(`${ID}-bannerShow`);


    new BannerMarkup();
    if(shared.VARIATION === '1') {
      bannerDataMarkup();
    } else if (shared.VARIATION === '2') {
      bannerDataMarkupV2();
    }
    slickOuterCarousel();

    if(window.innerWidth >= 767) {
      slickSmallCategories();
    }
  } else {
    document.body.classList.remove(`${ID}-bannerShow`);
  }
};
