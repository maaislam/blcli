/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import productChanges from './components/productChanges';
import rebuildSlider from './components/rebuildSlider';
import settings from './settings';
import StickyCTA from './components/stickyCTA/stickyCTA';
import SizeContent from './components/stickyCTA/addSizeContent';
import changeStickyView from './components/stickyCTA/changeStickyView';
import getstockLevels from './components/stickyCTA/getstockLevels';
import { addSize, sizeEvents, addSizeToBag } from './components/stickyCTA/sizeSelect';
import { pollerLite } from '../../../../../lib/uc-lib';
import Loader from './components/loader';

const activate = () => {
  setup();

  // add the loader to the page while the slider loads
  const loader = new Loader();

  productChanges();

  // rebuild the slider so it's full width
  pollerLite(['.product-gallery .images .product-gallery-slider.flickity-enabled'], () => {
    rebuildSlider();
  });

  // sticky CTA for V3
  if (settings.VARIATION === '3') {
    const stickyCTA = new StickyCTA();
    changeStickyView();

    pollerLite(['.variations_form', '#main-content .product-page'], () => {
      const sizeOptions = document.querySelector('.variations #pa_size');
      if (sizeOptions) {
        const sizeContent = new SizeContent();
        addSize();
        getstockLevels();
        sizeEvents();
        addSizeToBag();
      }
    });
  }
};

export default activate;
