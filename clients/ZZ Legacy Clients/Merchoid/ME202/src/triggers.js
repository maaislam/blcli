import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.product-gallery .product-image .merchoidHeroImage',
  () => {
    return !!window.merchoidWhiteBackgroundImage;
  }
], activate);
