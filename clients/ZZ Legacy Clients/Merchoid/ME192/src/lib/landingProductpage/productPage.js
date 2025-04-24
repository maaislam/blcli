import settings from '../settings';
import featureLightbox from './featureLightbox';
import extraImageLightbox from './extraImageLightbox';
import { extraImages, featuresContent } from './extraImage';
import scrollToElement from '../landingProductpage/scrollTo';

export default () => {
  // move size guide
  const sizeGuide = document.querySelector('.size-guide-wrapper');
  document.querySelector('.variations').insertAdjacentElement('afterend', sizeGuide);

  // add id
  const formSection = document.querySelector('.variations_form.cart');
  formSection.setAttribute('id', `${settings.ID}-buy`);

  const productTitle = document.querySelector('.mobile-target-product-title');

  // change scarcity message
  const scarcityMessage = document.querySelector('#merchoid-scarcity-message');
  scarcityMessage.innerHTML = '<strong>Hurry!</strong> Only 500 of these have been made!';

  const moveElements = () => {
    const sliderThumbnails = document.querySelector('.product-thumbnails');
    sliderThumbnails.insertAdjacentElement('beforebegin', productTitle);
  };

  const productButtons = () => {
    // add two buttons
    const ctaButtons = document.createElement('div');
    ctaButtons.classList.add(`${settings.ID}-product_buttons`);
    ctaButtons.innerHTML = `
    <div class="${settings.ID}-button ${settings.ID}-learnMore"><a href="#${settings.ID}-features">Learn more</a></div>
    <div class="${settings.ID}-button ${settings.ID}-buyNow"><a href="#${settings.ID}-buy">Buy now</a></div>`;

    productTitle.insertAdjacentElement('afterend', ctaButtons);
  };

  const genuineMessage = () => {
    const genuineMessageText = document.querySelectorAll('.offers .merchoid_price_framing')[1];
    genuineMessageText.innerHTML = `
    100% genuine
      <img src="https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/05/Marvel-Logo.png">
    merchandise`;
  };

  /* Features section */
  const featuresSection = () => {
    const features = document.createElement('div');
    features.classList.add(`${settings.ID}-features_wrapper`);
    features.setAttribute('id', `${settings.ID}-features`);
    features.innerHTML = `
      <h2>Key Features</h2>
      <p>"We’re in the Endgame now" <span>- Dr Strange</span></p>
      <div class="${settings.ID}-overlay"></div>
      `;
    document.querySelector('.product-usps').insertAdjacentElement('afterend', features);

    Object.keys(featuresContent).forEach((i) => {
      const data = featuresContent[i];
      const feature = document.createElement('div');
      feature.classList.add(`${settings.ID}-feature`);
      feature.innerHTML = `
      <span style="background-image: url(${data.image})"></span>
      <h3>${data.title}</h3>
      <p>${data.description}</p>
      <div class="${settings.ID}-button"><a href="#${settings.ID}-features">Learn more</a></div>
      <div class="${settings.ID}-button ${settings.ID}-buyNow"><a href="#${settings.ID}-buy">Buy now</a></div>
      <div class="${settings.ID}-feature_lightbox">
        <div class="${settings.ID}-exit">&times;</div>
        <h2>${data.lightboxTitle}</h2>
        <div class="${settings.ID}-lightboxImage" style="background-image: url(${data.lightboxImage})"></div>
        <p>${data.lightboxDescription}</p>
        <div class="${settings.ID}-button ${settings.ID}-lightboxbutton ${settings.ID}-buyNow"><a href="#${settings.ID}-buy">Buy now</a></div>
      </div>`;

      document.querySelector(`.${settings.ID}-features_wrapper`).appendChild(feature);
    });
  };

  const extraImagesSection = () => {
    // create the images container
    const featuresWrapper = document.querySelector(`.${settings.ID}-features_wrapper`);

    const extraImagesContainer = document.createElement('div');
    extraImagesContainer.classList.add(`${settings.ID}-extra_images_wrapper`);
    extraImagesContainer.innerHTML = `<h2>Extra Images</h2><div class="${settings.ID}-extraImages"></div><div class="${settings.ID}-button ${settings.ID}-buyNow"><a href="#${settings.ID}-buy">Buy now</a></div>`;

    featuresWrapper.insertAdjacentElement('afterend', extraImagesContainer);

    // add the images
    const imagesWrap = document.querySelector(`.${settings.ID}-extra_images_wrapper .${settings.ID}-extraImages`);

    for (let index = 0; index < extraImages.length; index += 1) {
      const element = extraImages[index];
      const extraImage = document.createElement('div');
      extraImage.classList.add(`${settings.ID}-extra_image_wrapper`);
      extraImage.innerHTML = `
      <div class="${settings.ID}-image" style="background-image: url(${element})">
      </div>
      <div class="${settings.ID}-overlay"></div>
      <div class="${settings.ID}-extra_lightbox">
        <div class="${settings.ID}-extra_lightbox-exit">&times;</div>
        <div class="${settings.ID}-extra_lightbox-image" style="background-image: url(${element})"></div>
      </div>`;
      imagesWrap.appendChild(extraImage);
    }
  };

  const moveReviews = () => {
    const reviews = document.querySelector('.me111-reviewsWrapper');
    document.querySelector(`.${settings.ID}-extra_images_wrapper`).insertAdjacentElement('afterEnd', reviews);
  };

  const smoothScroll = () => {
    const anchorLinks = document.querySelectorAll(`.${settings.ID}-button a`);
    for (let index = 0; index < anchorLinks.length; index += 1) {
      const element = anchorLinks[index];
      const sectionLink = element.getAttribute('href');
      element.addEventListener('click', (e) => {
        e.preventDefault();
        // if buy now is clicked in the lightbox
        const lightbox = document.querySelector(`.${settings.ID}-lightbox_showing`);
        const overlay = document.querySelector(`.${settings.ID}-overlay_showing`);

        if (lightbox) {
          if (element.parentNode.classList.contains(`${settings.ID}-lightboxbutton`)) {
            lightbox.classList.remove(`${settings.ID}-lightbox_showing`);
            overlay.classList.remove(`${settings.ID}-overlay_showing`);
          }
        } else if (e.target.href.indexOf('#ME192-buy') > -1) {
          const addToCartButton = document.querySelector('.single_add_to_cart_button');
          scrollToElement(document.querySelector('.product-info'));
          addToCartButton.classList.add(`${settings.ID}-buy_animated`);
          setTimeout(() => {
            addToCartButton.classList.remove(`${settings.ID}-buy_animated`);
          }, 2000);
        } else if (e.target.href.indexOf('#ME192-features') > -1) {
          scrollToElement(document.querySelector(sectionLink));
        }
      });
    }
  };


  moveElements();
  productButtons();
  genuineMessage();

  featuresSection();
  featureLightbox();

  extraImagesSection();
  extraImageLightbox();

  moveReviews();
  smoothScroll();
};
