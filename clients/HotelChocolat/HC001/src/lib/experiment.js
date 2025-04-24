/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, share } from './services';
import PageMarkup from './pageMarkup';
import { heroCarousel, giftCarousel, recommendations, slickBothBanners } from './components/carousels';
import { mainCategories, giftCategories, discoverBox } from './components/categoryBoxes';
import USPS from './components/uspBar';
import shared from './shared';
import SearchBar from './components/searchBar';
import { events } from '../../../../../lib/utils';

export default () => {
  setup();

  
  const { ID,VARIATION } = shared;
    // all tracking
  const trackingEventsVariation = () => {

    /*const uspLinks = document.querySelectorAll(`.${ID}-usp`);
    for (let z = 0; z < uspLinks.length; z += 1) {
      const element = uspLinks[z];
      element.addEventListener('click', () => {
        const uspText = element.querySelector('p').textContent;
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'usp click', `usp: ${uspText}`);
      });
      
    }*/
    const uspLinks = document.querySelectorAll(`#header-promo-banner a`);
    for (let z = 0; z < uspLinks.length; z += 1) {
      const element = uspLinks[z];
      element.addEventListener('click', () => {
        const uspText = element.getAttribute('title');
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'usp click', `usp link: ${uspText}`);
      });
      
    }

    // ----- hero carousel events 

    const mainBannerButton = document.querySelector(`.${ID}-banner.${ID}-hero.${ID}-carouselBanner .${ID}-button`);
    if(mainBannerButton) {
      mainBannerButton.addEventListener('click', () => {
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'hero banner click', 'banner button - big cacao summer');
      });
    }
    const carouselItems = document.querySelectorAll(`.${ID}-hero .${ID}-carouselItem`);
    for (let index = 0; index < carouselItems.length; index+= 1) {
      const element = carouselItems[index];
      element.querySelector('a').addEventListener('click', () => {
        const prodName = element.querySelector(`span`).textContent.trim();
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'hero carousel click', `carousel product: ${prodName}`);
      });
    }
    const carouselArrowPrev = document.querySelector(`.${ID}-hero .slick-prev`);
    if(carouselArrowPrev) {
      carouselArrowPrev.addEventListener('click', () => {
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'hero carousel arrow click', 'previous arrow');
      });
    }
    const carouselArrowNext = document.querySelector(`.${ID}-hero .slick-next`);
    if(carouselArrowNext) {
      carouselArrowNext.addEventListener('click', () => {
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'hero carousel arrow click', 'next arrow');
      });
    }
  

    // --- category blocks
    const categoryBlocks = document.querySelectorAll(`.${ID}-categories .${ID}-categoryBox-outer`);
    for (let i = 0; i < categoryBlocks.length; i += 1) {
      const element = categoryBlocks[i];
      const elName = element.querySelector(`.${ID}-textLink`);
      if(elName) {
        element.querySelector('a').addEventListener('click', () => {
          events.send(`${ID} variation: ${VARIATION} - homepage`, 'click', `category box: ${elName.textContent.trim()}`);
        });
      }
    }

    //---gift sleeve banner
    const mainGiftBannerButton = document.querySelector(`.${ID}-banner.${ID}-gift.${ID}-carouselBanner .${ID}-button`);
    if(mainGiftBannerButton) {
      mainGiftBannerButton.addEventListener('click', () => {
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'gift sleeve banner click', 'banner button');
      });
    }
    const carouselGiftItems = document.querySelectorAll(`.${ID}-gift .${ID}-carouselItem`);
    for (let j = 0; j < carouselGiftItems.length; j+= 1) {
      const element = carouselGiftItems[j];

      element.querySelector('a').addEventListener('click', () => {
        const prodGiftName = element.querySelector(`span`).textContent.trim();
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'gift sleeve carousel click', `carousel product ${prodGiftName}`);
      });
    }

    const carouselgiftArrowPrev = document.querySelector(`.${ID}-gift .slick-prev`);
    if(carouselgiftArrowPrev) {
      carouselgiftArrowPrev.addEventListener('click', () => {
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'gift sleeve carousel click', 'previous arrow');
      });
    }
    const carouselgiftArrowNext = document.querySelector(`.${ID}-gift .slick-next`);
    if(carouselgiftArrowNext) {
      carouselgiftArrowNext.addEventListener('click', () => {
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'gift sleeve carousel click', 'next arrow');
      });
    }

     // --- discover section
    const beautyBanner = document.querySelector(`.${ID}-discover .${ID}-beauty`);
    if(beautyBanner) {
      beautyBanner.addEventListener('click', () => {
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'banner click', 'Rabot Beauty');
      });
    }


    const discoverCategoryBlocks = document.querySelectorAll(`.${ID}-discover .${ID}-categoryBox-outer`);
    for (let x = 0; x < discoverCategoryBlocks.length; x += 1) {
      const el = discoverCategoryBlocks[x];
      const boxName = el.querySelector(`.${ID}-title`);
      if(boxName) {
        el.querySelector('a').addEventListener('click', () => {
          events.send(`${ID} variation: ${VARIATION} - homepage`, 'click', `discover image: ${boxName.textContent.trim()}`);
        });

        el.querySelector(`.${ID}-p a`).addEventListener('click', () => {
          events.send(`${ID} variation: ${VARIATION} - homepage`, 'click', `read more: ${boxName.textContent.trim()}`);
        });
      }
    }

    // --- ethical banner
    const ethicalBanner = document.querySelector(`.${ID}-banner.${ID}-ethics`);
    if(ethicalBanner) {
      ethicalBanner.querySelector('a').addEventListener('click', () => {
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'banner click', 'Our ethical business');
      });
    }

    // --- recommended carousel
    const recItems = document.querySelectorAll(`.${ID}-recommended .${ID}-carouselItem`);
    for (let n = 0; n < recItems.length; n+= 1) {
      const element = recItems[n];
      element.querySelector('a').addEventListener('click', () => {
        const recName = element.querySelector(`span`).textContent.trim();
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'rec/fav carousel click', `carousel product: ${recName}`);
      });
    }
  

    const recArrowPrev = document.querySelector(`.${ID}-recommended .${ID}-carousel .slick-prev`);
    if(recArrowPrev) {
      recArrowPrev.addEventListener('click', () => {
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'rec/fav carousel click', 'previous arrow');
      });
    }
    const recArrowNext = document.querySelector(`.${ID}-recommended .${ID}-carousel .slick-next`);
    if(recArrowNext) {
      recArrowNext.addEventListener('click', () => {
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'rec/fav carousel click', 'next arrow');
      });
    }
  }


   if(shared.VARIATION !== 'control') {
    //const uspBar = new USPS();
    const pageContent = new PageMarkup();
    heroCarousel();
    mainCategories();
    giftCarousel();
    slickBothBanners();
    //giftCategories();
    discoverBox();
    recommendations();
    trackingEventsVariation();
   }

  if(shared.VARIATION === '2') {
    new SearchBar();
  }

  // control events 
  const trackingEventsControl = () => {

    // header usps

    const uspLinks = document.querySelectorAll(`#header-promo-banner a`);
    for (let z = 0; z < uspLinks.length; z += 1) {
      const element = uspLinks[z];
      element.addEventListener('click', () => {
        const uspText = element.getAttribute('title');
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'usp click', `usp link: ${uspText}`);
      });
      
    }

    // --- main hero image and carousel
    const mainheroCarousel = document.querySelectorAll('#main > .fullwidth-image .content-tiles-slider-container .content-tile');
    for (let index = 0; index < mainheroCarousel.length; index += 1) {
      const element = mainheroCarousel[index];
      if(element) {
        const elName = element.querySelector('.heading').textContent.trim();
        element.addEventListener('click', () => {
          events.send(`${ID} variation: ${VARIATION} - homepage`, 'hero carousel click', `carousel product: ${elName}`);
        });
      }
    }

    const mainheroArrowPrev = document.querySelector(`#main > .fullwidth-image .content-tiles-slider-container .slick-prev`);
    if(mainheroArrowPrev) {
      mainheroArrowPrev.addEventListener('click', () => {
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'hero carousel arrow click', 'previous arrow');
      });
    }
    const mainheroArrowNext = document.querySelector(`#main > .fullwidth-image .content-tiles-slider-container .slick-next`);
    if(mainheroArrowNext) {
      mainheroArrowNext.addEventListener('click', () => {
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'hero carousel arrow click', 'next arrow');
      });
    }

    const heroButton = document.querySelector(`#main > .fullwidth-image .button-fancy-large`);
    if(heroButton) {
      heroButton.addEventListener('click', () => {
          events.send(`${ID} variation: ${VARIATION} - homepage`, 'hero button click', 'shop summer');
      });
    }


    const allBannerImages = document.querySelectorAll('.fullwidth-image .craigsrow .craigsimg');
    for (let i = 0; i < allBannerImages.length; i += 1) {
      const el = allBannerImages[i];
      const bannerName = el.getAttribute('title');
      el.addEventListener('click', () => {
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'banner click', bannerName);
      });
    }


    const sleeveCarousel = document.querySelector('.fullwidth-image:nth-child(4) .content-tiles-slider-container');
    if(sleeveCarousel) {
      const carouselProduct = sleeveCarousel.querySelectorAll('.content-tile');
      for (let j = 0; j < carouselProduct.length; j += 1) {
        const item = carouselProduct[j];
        const productName = item.querySelector('.heading').textContent.trim();
        item.addEventListener('click', () => {
          events.send(`${ID} variation: ${VARIATION} - homepage`, 'gift carousel click', `carousel product: ${productName}`);
        });
      }
    }

    const giftArrowPrev = document.querySelector(`.fullwidth-image:nth-child(5) .content-tiles-slider-container .slick-prev`);
    if(giftArrowPrev) {
      giftArrowPrev.addEventListener('click', () => {
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'gift carousel arrow click', 'previous arrow');
      });
    }
    const giftArrowNext = document.querySelector(`.fullwidth-image:nth-child(5) .content-tiles-slider-container .slick-next`);
    if(giftArrowNext) {
      giftArrowNext.addEventListener('click', () => {
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'gift carousel arrow click', 'next arrow');
      });
    }

    const giftButton = document.querySelector(`.fullwidth-image:nth-child(5) .button-fancy-large`);
    if(giftButton) {
      giftButton.addEventListener('click', () => {
          events.send(`${ID} variation: ${VARIATION} - homepage`, 'gift button click', 'shop sleeksters & h-boxes');
      });
    }

    // beauty carousel
    const beautyCarousel = document.querySelector('.fullwidth-image:nth-child(4) .content-tiles-slider-container');
    if(beautyCarousel) {
      const beautyProduct = beautyCarousel.querySelectorAll('.content-tile');
      for (let x = 0; x < beautyProduct.length; x += 1) {
        const product = beautyProduct[x];
        const beautyproductName = product.querySelector('.heading').textContent.trim();
        product.addEventListener('click', () => {
          events.send(`${ID} variation: ${VARIATION} - homepage`, 'beauty carousel click', `carousel product: ${beautyproductName}`);
        });
      }
    }

    const beautyArrowNext = document.querySelector(`.fullwidth-image:nth-child(4) .content-tiles-slider-container .slick-next`);
    if(beautyArrowNext) {
      beautyArrowNext.addEventListener('click', () => {
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'beauty carousel arrow click', 'next arrow');
      });
    }
    const beautyArrowPrev = document.querySelector(`.fullwidth-image:nth-child(4) .content-tiles-slider-container .slick-prev`);
    if(beautyArrowPrev) {
      beautyArrowPrev.addEventListener('click', () => {
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'beauty carousel arrow click', 'prev arrow');
      });
    }

    const beautyButton = document.querySelector(`.fullwidth-image:nth-child(4) .button-fancy-large`);
    if(beautyButton) {
      beautyButton.addEventListener('click', () => {
          events.send(`${ID} variation: ${VARIATION} - homepage`, 'gift button click', 'shop cocao beauty');
      });
    }

    // velvetiser carousel
    const velvetCarousel = document.querySelector('.fullwidth-image:nth-child(3) .content-tiles-slider-container');

    if(velvetCarousel) {
      const velvetCarouselItems = velvetCarousel.querySelectorAll('.content-tile-wrapper');
      
      for (let x = 0; x < velvetCarouselItems.length; x += 1) {
        const product = velvetCarouselItems[x];
        const productName = product.querySelector('.heading').textContent.trim();
        product.addEventListener('click', () => {
          events.send(`${ID} variation: ${VARIATION} - homepage`, 'velvetiser carousel click', `carousel product: ${productName}`);
        });
      }
    }

    const velvetArrowNext = document.querySelector(`.fullwidth-image:nth-child(3) .content-tiles-slider-container .slick-next`);
    if(velvetArrowNext) {
      velvetArrowNext.addEventListener('click', () => {
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'velvetiser carousel arrow click', 'next arrow');
      });
    }
    const velvetArrowPrev = document.querySelector(`.fullwidth-image:nth-child(3) .content-tiles-slider-container .slick-prev`);
    if(velvetArrowPrev) {
      velvetArrowPrev.addEventListener('click', () => {
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'velvetiser carousel arrow click', 'prev arrow');
      });
    }

    // rec carousel
    const recSlider = document.querySelectorAll('.einstain-inited .content-tile');
    if(recSlider) {
      for (let c = 0; c < recSlider.length; c += 1) {
        const element = recSlider[c];
        const recName = element.querySelector('.product-name').textContent.trim();
        element.addEventListener('click', () => {
          events.send(`${ID} variation: ${VARIATION} - homepage`, 'rec/fav carousel product click', recName);
        }); 
      }
    }

    const recSliderNext = document.querySelector('.einstain-inited .slick-next');
    if(recSliderNext) {
      recSliderNext.addEventListener('click', () => {
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'rec/fav carousel arrow click', 'next arrow');
      });
    }

    const recSliderPrev = document.querySelector('.einstain-inited .slick-prev');
    if(recSliderPrev) {
      recSliderPrev.addEventListener('click', () => {
        events.send(`${ID} variation: ${VARIATION} - homepage`, 'rec/fav carousel arrow click', 'prev arrow');
      });
    }
  }

  if(shared.VARIATION === 'control') {
    trackingEventsControl();
  }
  
};
