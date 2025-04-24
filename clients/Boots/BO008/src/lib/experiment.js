/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import PageContent from './pageMarkup';
import brandbar from './components/brandbar';
import smallTeaserBoxes from './components/smallTeaserBoxes';
import largeTeaserBoxes from './components/largeTeaserBoxes';
import smallTeaserCarousel from './components/smallTeaserCarousel';
import propositionBanner from './components/propositionBanner';
import heroCarousel from './components/heroCarousel';

export default () => {
  setup();
  new PageContent();

  heroCarousel();
  brandbar(); // brand bar
  smallTeaserBoxes(); // 25% teasers
  largeTeaserBoxes(); // 50% teasers
  smallTeaserCarousel(); // small banners in carousel
  propositionBanner();
};
