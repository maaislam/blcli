import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { onUrlChange } from './helpers/utils';
import flickity from './helpers/flickity';
import fullScreen from './helpers/fullScreen';
import slider from './components/slider';
import sku from './components/sku';
import hammer from './helpers/hammer';
import openModal from './helpers/openModal';
import closeModal from './helpers/closeModal';
import trapFocus from './helpers/trapFoucs';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 1000;

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const enableZoom = () => {
  const images = document.querySelectorAll('.flickity-fullscreen-container .carousel-cell .image-wrapper');

  images.forEach((image) => {
    const mc = new window.Hammer(image);

    let scale = 1; // Current scale level
    let lastScale = 1;

    // Enable pinch gestures
    mc.get('pinch').set({ enable: true });

    // Handle pinch start and move
    mc.on('pinchstart pinchmove', function (event) {
      scale = Math.max(1, Math.min(lastScale * event.scale, 4)); // Limit zoom from 1x to 4x
      image.style.transform = `scale(${scale})`;
    });

    // Update scale after pinch ends
    mc.on('pinchend', function () {
      lastScale = scale;
    });

    // Optional: Reset zoom on double-tap
    mc.on('doubletap', function () {
      scale = 1;
      lastScale = 1;
      image.style.transform = 'scale(1)';
    });
  });
};

const init = () => {
  //check if page is correct
  const pageCondition = window.utag.data.basicPageId === 'product page'; //add page check conditions here based on experiment requirement

  if (!pageCondition) {
    //remove DOM element added by the experiment
    const element = document.querySelector(`.${ID}__gallery`);
    if (element) element.remove();

    const container = document.querySelector(`.${ID}__desktopInfo`);
    if (container) container.remove();

    const productBadge = document.querySelector(`.${ID}__productBadge`);
    if (productBadge) productBadge.remove();

    const containerAnother = document.querySelector(`.${ID}__desktopInfoAnother`);
    if (containerAnother) containerAnother.remove();

    const productSkus = document.querySelectorAll(`.${ID}__productCode`);
    if (productSkus.length) {
      productSkus.forEach((item) => item.remove());
    }

    //remove setup
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);

    return;
  }

  setup();

  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';
  /*****this enabled GA4****/

  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  flickity();
  fullScreen();
  hammer();

  /*****add experiment specific code here*****/
  const imageObject = {
    mainImage: [],
    thumbnailImage: [],
  };
  const mainImageSliderContainer = document.querySelector('[data-qaid="product-primary-images"]');
  const allImageSlides = mainImageSliderContainer.querySelectorAll('.slick-slide:not(.slick-cloned)');
  const thumbnailImageSliderContainer = document.querySelector('[data-qaid="product-images_thumbnails"]');
  const allThumbnailSlides = thumbnailImageSliderContainer.querySelectorAll('.slick-slide:not(.slick-cloned)');

  const mainContainer = document.querySelector('[data-qaid="product-tile"]');
  const productSkuElemenet = mainContainer.querySelector('[data-qaid="pdp-product-name"] .oodeYO');
  const productSku = productSkuElemenet.innerText.replace(/[()]/g, '');

  const productBadge = document.querySelector('[data-qaid="product-badge"]');
  const cloneProductBadge = productBadge ? productBadge.cloneNode(true) : '';
  cloneProductBadge?.classList?.add(`${ID}__productBadge`);

  const videoElement = document.querySelector('[data-qaid="pdp-video-button"]');
  const videoWrapper = videoElement ? videoElement.closest('.ewH_Uw') : '';

  if (!document.querySelector(`.${ID}__productCode`)) {
    mainContainer.querySelector('[data-qaid="pdp-product-name"]').insertAdjacentHTML('beforeend', sku(ID, productSku));
  }
  const pdpBrandLogo = document.querySelector(`[data-qaid="product-tile"] [data-qaid="pdp-brand-logo"]`);
  const infoContainer = document.querySelector('[data-qaid="product-tile"] > div:nth-child(2)');
  const desktopInfoContainer = infoContainer ? infoContainer.cloneNode(true) : '';
  const newDesktopInfo = document.createElement('div');
  const newDesktopInfoAnother = document.createElement('div');
  newDesktopInfo.classList.add(`${ID}__desktopInfo`);
  newDesktopInfoAnother.classList.add(`${ID}__desktopInfoAnother`);
  newDesktopInfo.innerHTML = desktopInfoContainer ? desktopInfoContainer.outerHTML : '';
  newDesktopInfoAnother.innerHTML = desktopInfoContainer ? `${desktopInfoContainer.outerHTML}` : '';
  newDesktopInfo.querySelector('[data-qaid="pdp-brand-logo"]')?.parentElement.classList.add(`${ID}__hide`);

  pollerLite([() => pdpBrandLogo], () => {
    const clonePdpBrandLogo = pdpBrandLogo.cloneNode(true);
    newDesktopInfoAnother.innerHTML = `${clonePdpBrandLogo.outerHTML} ${desktopInfoContainer.outerHTML}`;
  });

  allImageSlides.forEach((item) => {
    const img = item.querySelector('img').getAttribute('src');
    const altText = item.querySelector('img').getAttribute('alt');
    imageObject.mainImage.push({
      img,
      alt: altText,
    });
  });
  allThumbnailSlides.forEach((item) => {
    const img = item.querySelector('img').getAttribute('src');
    const altText = item.querySelector('img').getAttribute('alt');
    imageObject.thumbnailImage.push({
      img,
      alt: altText,
    });
  });

  if (!document.querySelector(`.${ID}__mainSlider`)) {
    const productName = document.querySelector(`[data-qaid="pdp-product-name"] [itemprop="name"]`);

    mainImageSliderContainer.insertAdjacentHTML(
      'beforebegin',
      slider(ID, imageObject, cloneProductBadge, productName.textContent)
    );
    videoWrapper && document.querySelector(`.${ID}__gallery`).insertAdjacentElement('beforeend', videoWrapper);
  }

  if (!document.querySelector(`.${ID}__desktopInfo`)) {
    document.querySelector('[data-qaid="product-tile"] > div:nth-child(3)').insertAdjacentElement('afterbegin', newDesktopInfo);
  }

  if (!document.querySelector(`.${ID}__desktopInfoAnother`) && (VARIATION === '1' || isMobile())) {
    if (isMobile()) {
      document.querySelector('[data-qaid="product-tile"]').insertAdjacentElement('beforeend', newDesktopInfoAnother);
    } else {
      document.querySelector('[data-qaid="pdp_sticky_product_footer"]').insertAdjacentElement('afterend', newDesktopInfoAnother);
    }
  } else if (!document.querySelector(`.${ID}__desktopInfoAnother`) && VARIATION === '2' && !isMobile()) {
    document.querySelector(`.${ID}__gallery`).insertAdjacentElement('beforeend', newDesktopInfoAnother);
  }

  if (isMobile()) {
    enableZoom();
  }

  // Get the Flickity instance
  const carouselElement = document.querySelector('.main-carousel');
  pollerLite([() => typeof window.Flickity?.data(carouselElement) !== 'undefined'], () => {
    const flkty = window.Flickity.data(carouselElement);
    window.flickityInstance = flkty;

    window.flickityInstance.on('staticClick', () => {
      openModal(ID);
    });

    const zoomBtn = document.querySelector(`.${ID}__zoomButton span`);
    const closeBtn = document.querySelector(`.${ID}__closeWrapper`);
    if (closeBtn) {
      closeBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          closeModal(ID);
        }
      });
    }

    zoomBtn?.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest(`.${ID}__optionsContainer`)) {
        e.preventDefault();
        openModal(ID);
      }
    });

    const flicketySlider = document.querySelectorAll('.carousel-cell');
    flicketySlider.forEach((item) => {
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.addEventListener('focus', () => {
        window.flickityInstance.next();
      });

      item.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest(`.${ID}__optionsContainer`)) {
          e.preventDefault();
          openModal(ID);
        }

        if (e.key === 'Escape') {
          e.preventDefault();
          closeModal(ID);
        }

        // handle foucs trapping....
        trapFocus(e, ID, carouselElement);
      });
    });

    const flickityContainer = document.querySelector('.flickity-fullscreen-container');
    flickityContainer?.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal(ID);
      }
    });
  });
};

export default () => {
  /*****Request from Screwfix*****/
  const blExpID = VARIATION === 'control' ? `${ID} control` : ID;
  window.brainLabsExperimentID = window.brainLabsExperimentID || '';
  if (window.brainLabsExperimentID) {
    window.brainLabsExperimentID += `,${blExpID}`;
  } else {
    window.brainLabsExperimentID = blExpID;
  }
  /*****Request from Screwfix*****/

  const clickHandler = (e) => {
    //check if page is correct
    if (window.utag.data.basicPageId !== 'product page') return;

    const { target } = e;

    if (target.closest(`.${ID}__zoomButton span`)) {
      openModal(ID);
    } else if (target.closest(`.${ID}__closeWrapper`) || target.closest(`.${ID}__overlay`)) {
      closeModal(ID);
    } else if (target.closest(`.${ID}__videoButton`)) {
      // fireEvent('User taps to engage with the video view');
      const videoButton = document.querySelector('[data-qaid="pdp-video-button"]');
      if (videoButton) {
        videoButton.click();
      }
    } else if (target.closest(`.${ID}__desktopInfo`) && target.closest(`._2hopKH button`)) {
      document.querySelector('[data-qaid="product-tile"] > div:nth-child(2) ._2hopKH button')?.click();
    } else if (target.closest('[data-qaid="pdp-more-info-link"]') && target.closest(`.${ID}__desktopInfoAnother`)) {
      document.querySelector('[data-qaid="pdp-tab-2"]').click();
    } else if (target.closest(`.${ID}__spinButton`)) {
      // fireEvent('User taps to engage with the 360 view');
      const spinButton = document.querySelector('[data-qaid="pdp-spinset-button"]');
      spinButton && spinButton.click();
    } else if (target.closest('[data-qaid="pdp-button-deliver"]') && VARIATION !== 'control') {
      fireEvent('User clicks on delivery CTA');
    } else if (target.closest('[data-qaid="pdp-button-click-and-collect"]') && VARIATION !== 'control') {
      fireEvent('User clicks on click & collect CTA');
    } else if (target.closest('[data-qaid="pdp-video-button"]') && VARIATION !== 'control') {
      fireEvent('User taps to engage with the video view');
    } else if (target.closest('[data-qaid="pdp-spinset-button"]') && VARIATION !== 'control') {
      fireEvent('User taps to engage with the 360 view');
    }
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    pollerLite(
      [
        () => typeof window.tealiumDataLayer === 'object',
        () => window.utag !== undefined,
        () => window.__NEXT_DATA__ !== undefined,
      ],
      () => {
        setTimeout(init, DOM_RENDER_DELAY);
      }
    );
  });
};
