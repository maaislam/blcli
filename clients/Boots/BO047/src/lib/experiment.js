/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import HeroBanner from './topBanner/bannerMarkup';
import ProductBox from './finderBox/productBox';
import finderMarkup from './finderBox/finderMarkup';

export default () => {
  setup();

  new HeroBanner();
  new ProductBox(); 
  finderMarkup();

  const finderBanner = document.querySelector(`.BO047-staticBanner.BO047-heroBanner`);
  finderBanner.addEventListener('mouseenter', () => {
    document.querySelector('#topLevelMenu').classList.remove('ready');
  });
};
