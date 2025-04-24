/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';

const activate = () => {
  setup();

  // change the hero image
  const heroImage = window.merchoidWhiteBackgroundImage;
  const currentImage = document.querySelector('.product-gallery .product-image .merchoidHeroImage');
  currentImage.src = heroImage;
};

export default activate;
