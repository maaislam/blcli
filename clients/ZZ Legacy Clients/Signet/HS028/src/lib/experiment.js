/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import ImageSlider from './components/imageSlider';
import TopBanners from './components/topBanners';
import productPageChanges from './components/productPageChanges';
import Lightbox from './components/lightbox';
import settings from './settings';
import LightboxSlider from './components/lightboxSlider';
import accordianChanges from './components/accordianChanges';
import quantityChange from './components/quantityChange';

const activate = () => {
  setup();
  // const topBanners = new TopBanners();

  productPageChanges();
  quantityChange();

  // show the slider if there is more than one image
  const productThumbnails = document.querySelectorAll('.thumbnails button:not(.video):not(.tangiblee-button-wrap):not(.arrow-360)');

  if (productThumbnails.length > 1) {
    const slider = new ImageSlider();
    const lightbox = new Lightbox(settings.ID, {
      content: `<div class="${settings.ID}-lightboxSlider"></div>`,
    });

    const lightboxSliderImages = new LightboxSlider();
  } else {
    document.querySelector('.product-image').classList.add(`${settings.ID}-oneImage`);
  }
  accordianChanges();


  // move the sale banner over the image if it exists
  const addSaleBanner = () => {
    const imageBanner = document.querySelector('.product-image__corner-flag.top-left');
    const productImage = document.querySelector('.HS028_productSlider');
    productImage.insertAdjacentElement('beforebegin', imageBanner);
  };

  if (document.querySelector('.product-image__corner-flag.top-left')) {
    addSaleBanner();
  }
};

export default activate;
