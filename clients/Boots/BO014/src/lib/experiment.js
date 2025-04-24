/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import BannerV1 from './components/blueBlockbanner';
import PageMarkup from './components/markupV2';

export default () => {
  setup();

  if(shared.VARIATION === '1') {
    new BannerV1();
  }

  if(shared.VARIATION === '2') {
    new PageMarkup();
  }
};
