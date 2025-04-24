/* eslint-disable no-confusing-arrow */
/**
 * @fileoverview All potential changes for this experiment on all devices
 */
import { share } from './services';
import shared from './shared';
import { pollerLite, throttle, observer } from '../../../../../lib/uc-lib';
import {
  wrap,
  scrollTo,
  globalGetScript,
  loadStyleSheet,
  events,
} from '../../../../../lib/utils';

const { ID } = shared;

/**
 * @desc Returns all image data from a single given element
 * @param {HTMLElement} image
 * @returns {Object.<string>}
 */
const extractImageData = image => ({
  src: image.getAttribute('src') || image.getAttribute('data-src') || image.getAttribute('ng-src'),
  fallback: image.getAttribute('fallback-src'),
  alt: image.getAttribute('alt'),
});

/**
 * @desc Returns all image data from a nodeList of images
 * @returns {Array.<Object>}
 */
const getImageData = images => [].map.call(images, extractImageData);

/**
 * @desc Returns the correct render method for rendering based on the template type
 * @returns {Function}
 */
const getRenderMethod = template => template instanceof HTMLElement
  ? HTMLElement.prototype.insertAdjacentElement
  : HTMLElement.prototype.insertAdjacentHTML;

/**
 * @desc Get the screen height
 * @returns {Number}
 */
const getScreenHeight = () => window.innerHeight;

/**
 * @desc Get the header height
 * @returns {Number}
 */
const getHeaderHeight = () => document.querySelector('#HeaderPlaceholder').getBoundingClientRect().height;

/**
 * @desc Get the height of the mini product info
 * @returns {Number}
 */
const getMiniProductInfoHeight = () => {
  const element = document.querySelector(`.${ID}_miniProductInfo`);
  return element ? element.getBoundingClientRect().height : 0;
};

/**
 * @desc Hide arrows on gallery bringing out the images to their full size.
 * Align images vertically down left hand column of page.
 */
export const dismantleCarousel = {
  /**
   * @desc Promise is resolved when conditions are passed
   * @returns {Promise}
   */
  checkConditions: () => new Promise((resolve, reject) => {
    const dependencyElements = [
      '#ProductMediaCarousel .Slides .Slide img',
      '#ProductDetailForm .MediaGalleryModule .Item img',
    ];

    pollerLite(['#ProductMediaCarousel'], () => {
      const isModified = document.querySelector('#ProductMediaCarousel').getAttribute(`data-${ID}-modified`);
      if (isModified) {
        reject();
      } else {
        pollerLite(dependencyElements, resolve);
      }
    });
  }),

  /**
   * @desc Apply changes
   */
  applyChanges: () => new Promise((resolve, reject) => {
    const carousel = document.querySelector('#ProductMediaCarousel');
    const productImages = carousel.querySelectorAll('.Slides .Slide img');
    const productImageData = getImageData(productImages);

    carousel.setAttribute(`data-${ID}-modified`, true);

    const thumbnailContainer = document.querySelector('#ProductDetailForm .MediaGalleryModule');
    const thumbnails = thumbnailContainer.querySelectorAll('.Item img');
    thumbnailContainer.classList.remove('MediaGalleryModule');

    [].forEach.call(productImageData, (data, index) => {
      const { src, alt, fallback } = data;
      const thumbnail = thumbnails[index];
      if (data.src) thumbnail.setAttribute('src', src);
      if (data.alt) thumbnail.setAttribute('alt', alt);
      if (data.fallback) thumbnail.setAttribute('fallback-src', fallback);
    });

    resolve();
  }),
};

/**
 * @desc Split up the brand and product name
 */
export const changeTitle = {
  /**
   * @desc Promise is resolved when conditions are passed
   * @returns {Promise}
   */
  checkConditions: () => new Promise((resolve, reject) => {
    const dependencyElements = ['#ProductNameAndRating .ProductName'];
    const isMarkBrandProduct = shared.functions.isUrlMatch(/https:\/\/www.avon.uk.com\/product\/.*7101/);
    const isModified = !!document.querySelector(`.${ID}_titleBrand`);
    if (isMarkBrandProduct && !isModified) {
      pollerLite(dependencyElements, resolve);
    }
  }),

  /**
   * @desc Apply changes
   */
  applyChanges: () => new Promise((resolve, reject) => {
    const template = `<div class="${ID}_titleBrand">mark.</div><div class="${ID}_titleName">Epic Lipstick With Built-In Primer</div>`;
    const productNames = document.querySelectorAll(`#ProductNameAndRating .ProductName, .${ID}_miniProductInfo__name`);
    if (productNames.length) {
      [].forEach.call(productNames, (productName) => {
        const element = productName;
        element.innerHTML = template;
      });
    }
    resolve();
  }),
};

const descBullets = {
  // Mark. Epic Lipstick With Built-In Primer
  '/product/.*7101':
  [
    'Creamy, full coverage colour',
    'Highly pigmented, rich colour',
    'Comfortable, balm-like, creamy formula',
    'SPF15',
  ],

  // Avon True Colour
  '/product/.*3907':
  [
    '100% Matte, 100% comfort',
    'Comfortable: no caking or drying, velvety formula',
    '100% Matte coverage: full colour',
    'SPF15',
  ],

  // Avon True Colour Perfectly Matte
  '/product/.*10953':
  [
    'Everyday, comfortable, satin colour',
    'Your “go-to” lipstick',
    'Hydrating shea butter',
    'SPF15',
  ],

  default: null,
};
/**
 * @desc Get the description bullet points for a product
 * @returns {Array} Array of bullet points
 */
export const getDescBullets = () => {
  const createTemplate = bullets => `<ul class="${ID}_uvpList">${bullets.map(bullet => `<li>${bullet}</li>`).join('')}</ul>`;
  let bullets = descBullets.default;
  Object.keys(descBullets).some((key) => {
    if (shared.functions.isUrlMatch(new RegExp(key))) {
      bullets = descBullets[key];
      return true;
    }
  });

  return bullets ? createTemplate(bullets) : '';
};

/**
 * @desc Create product info that sticks on scroll
 */
export const createScollingDesc = {
  /**
   * @desc Promise is resolved when conditions are passed
   * @returns {Promise}
   */
  checkConditions: () => new Promise((resolve, reject) => {
    const dependencyElements = [
      '#BVRRSummaryContainer > div',
      '#ProductDetails > .Prices',
    ];

    const isModified = document.querySelector(`.${ID}_topInfo`);
    if (!isModified) {
      pollerLite(dependencyElements, resolve);
    }
  }),

  /**
   * @desc Apply changes
   */
  applyChanges: () => new Promise((resolve, reject) => {
    const { $, rootScope } = shared;

    /**
     * Creates a new element by cloning the existing product info
     * and making some changes
     * @returns {HTMLElement}
     */
    const createTopInfo = () => {
      // Clone top of description
      const container = document.querySelector('#ProductNameAndRating');
      const containerClone = container.cloneNode(true);
      containerClone.id = `${ID}_ProductNameAndRating`;
      containerClone.classList.add(`${ID}_topInfo`);

      // Add price
      const price = document.querySelector('#ProductDetails > .Prices');
      const priceClone = price.cloneNode(true);
      containerClone.appendChild(priceClone);

      // Add bullet points
      const bullets = getDescBullets();
      getRenderMethod(bullets).call(containerClone, 'beforeend', bullets);

      // Remove reviews container due to it being buggy when duplicated
      // before they are fully loaded in
      const reviewContainer = containerClone.querySelector('.product-meta-rating');
      reviewContainer.parentElement.removeChild(reviewContainer);

      // Clone reviews when they exist
      pollerLite([`.${ID}_bottomInfo__right #ProductNameAndRating > #BVRRSummaryContainer .BVRRRatingSummary`], () => {
        const reviews = container.querySelector('#BVRRSummaryContainer');
        const reviewsClone = reviews.cloneNode(true);

        // Add events
        const writeReviewsClone = reviewsClone.querySelector('#BVRRRatingSummaryLinkWriteID a');
        const writeReviews = reviews.querySelector('#BVRRRatingSummaryLinkWriteID a');
        writeReviewsClone.addEventListener('click', () => {
          writeReviews.click();
        });

        // Render
        containerClone.querySelector('.Prices').insertAdjacentElement('beforebegin', reviewsClone);
      });

      // Add Select Your Shade button
      const bottomInfoAnchor = document.createElement('div');
      bottomInfoAnchor.className = `Button ${ID}_productInfoAnchor`;
      bottomInfoAnchor.innerHTML = '<span>Select your shade</span>';
      getRenderMethod(bottomInfoAnchor).call(containerClone, 'beforeend', bottomInfoAnchor);

      return containerClone;
    };

    /**
     * Reformats the existing product info to sit at the bottom of the page.
     * @returns {HTMLElement}
     */
    const createBottomInfo = () => {
      const productInfo = document.querySelector('.ProductInformation');
      const productNameAndRating = productInfo.querySelector('#ProductNameAndRating');
      const productDetails = productInfo.querySelector('#ProductDetails');
      const productActions = productDetails.querySelector('.ProductActions');
      const shades = productInfo.querySelector('#Shades');
      const shadeSelectionDropdowns = shades.querySelectorAll('.ShadeDropdown');

      // Wrap and move content
      const bottomInfoLeft = wrap(shades, `<div class="${ID}_bottomInfo__left"></div>`);
      const bottomInfoRight = wrap([productNameAndRating, productDetails], `<div class="${ID}_bottomInfo__right"></div>`);
      bottomInfoRight.insertAdjacentElement('beforebegin', bottomInfoLeft);
      const bottomInfo = wrap([bottomInfoLeft, bottomInfoRight], `<div class="${ID}_bottomInfo"></div>`);

      // Add heading to shades
      shades.insertAdjacentHTML('beforebegin', `<div class="${ID}_shadesHeading">Your colour choices...</div>`);

      // Move selection dropdowns to be above product actions
      const shadeSelectionDropdownsWrap = wrap(shadeSelectionDropdowns, `<div class="${ID}_shadeSelections"></div>`);
      productActions.insertAdjacentElement('beforebegin', shadeSelectionDropdownsWrap);

      // Remove reviews hover info when it exists as it scrolls back to the top of the page
      pollerLite([
        `.${ID}_topInfo .BVRRRatingsHistogramButton`,
        `.${ID}_bottomInfo .BVRRRatingsHistogramButton`,
      ], () => {
        const reviewsHover = document.querySelector(`.${ID}_bottomInfo .BVRRRatingsHistogramButton`);
        reviewsHover.parentElement.removeChild(reviewsHover);
      });

      return bottomInfo;
    };

    /**
     * Renders the top product info
     * @param {HTMLElement|string} template
     */
    const renderTopInfo = template => getRenderMethod(template).call(document.querySelector('#ProductNameAndRating'), 'beforebegin', template);

    /**
     * Renders the bottom product info
     * @param {HTMLElement|string} template
     */
    const renderBottomInfo = template => getRenderMethod(template).call(document.querySelector('.ProductInformation'), 'afterend', template);

    /**
     * @type {HTMLElement}
     */
    const topInfo = createTopInfo();
    renderTopInfo(topInfo);

    /**
     * @type {HTMLElement}
     */
    const bottomInfo = createBottomInfo();
    renderBottomInfo(bottomInfo);

    /**
     * @desc Top offset of the sticky sidebar
     * @type {Number}
     */
    const SIDEBAR_TOP_OFFSET = 30;

    /**
     * @desc Bottom offset of the sticky sidebar
     * @type {Number}
     */
    const SIDEBAR_BOTTOM_OFFSET = 250;

    /**
     * @desc Calculate the dimensions for the sticky sidebar
     * @returns {Object}
     */
    const calcStickyDimensions = () => {
      const containerEl = document.querySelector('.ProductInformation');
      const containerDimensions = containerEl.getBoundingClientRect();

      const column = containerEl.querySelector('.ProductDetails');
      const columnDimensions = column.getBoundingClientRect();
      const columnStyles = window.getComputedStyle(column, null);
      const columnPaddingLeft = parseInt(columnStyles.paddingLeft, 10) || 0;
      const columnPaddingRight = parseInt(columnStyles.paddingRight, 10) || 0;
      const columnWidth = columnDimensions.width - (columnPaddingLeft + columnPaddingRight);

      const { top: containerTop, height: containerHeight } = containerDimensions;
      const { height: stickyElHeight } = topInfo.getBoundingClientRect();
      const { pageYOffset } = window;

      const topWaypoint = (containerTop + pageYOffset) - SIDEBAR_TOP_OFFSET;
      const bottomWaypoint = ((containerTop + containerHeight + pageYOffset) - stickyElHeight) - (SIDEBAR_TOP_OFFSET + SIDEBAR_BOTTOM_OFFSET);

      return {
        columnWidth,
        top: topWaypoint,
        bottom: bottomWaypoint,
      };
    };

    /**
     * @desc Update sticky sidebar
     */
    const updateSticky = () => {
      const dimensions = calcStickyDimensions();
      const stickyEl = topInfo;
      const stuckClass = `${ID}_topInfo--stuck`;
      const bottomedOutClass = `${ID}_topInfo--bottomedOut`;

      const { pageYOffset } = window;
      const scrolledPastTop = pageYOffset >= dimensions.top;
      const scrollBottomedOut = pageYOffset >= dimensions.bottom;
      const isStuck = stickyEl.classList.contains(stuckClass);
      const isBottomedOut = stickyEl.classList.contains(bottomedOutClass);

      const addSticky = () => {
        if (!isStuck) {
          stickyEl.classList.add(stuckClass);
          stickyEl.style.top = `${SIDEBAR_TOP_OFFSET}px`;
          stickyEl.style.bottom = '';
          stickyEl.style.width = `${dimensions.columnWidth}px`;
        }
      };
      const removeSticky = () => {
        if (isStuck) {
          stickyEl.classList.remove(stuckClass);
          stickyEl.style.top = '';
          stickyEl.style.bottom = '';
          stickyEl.style.width = '';
        }
      };
      const addBottomedOut = () => {
        if (!isBottomedOut) {
          stickyEl.classList.add(bottomedOutClass);
          stickyEl.style.top = '';
          stickyEl.style.bottom = `${SIDEBAR_BOTTOM_OFFSET}px`;
          stickyEl.style.width = '';
        }
      };
      const removeBottomedOut = () => {
        if (isBottomedOut) {
          stickyEl.classList.remove(bottomedOutClass);
          stickyEl.style.top = `${SIDEBAR_TOP_OFFSET}px`;
          stickyEl.style.bottom = '';
          stickyEl.style.width = `${dimensions.columnWidth}px`;
        }
      };

      if (scrolledPastTop) {
        addSticky();

        if (!scrollBottomedOut) {
          removeBottomedOut();
        } else {
          addBottomedOut();
        }
      } else {
        removeSticky();
      }
    };

    /**
     * Binds all event handlers in this component
     */
    const bindEvents = () => {
      const bottomInfoAnchor = topInfo.querySelector(`.${ID}_productInfoAnchor`);
      bottomInfoAnchor.addEventListener('click', () => {
        events.send(ID, 'Click', 'Select your shade desktop');
        const topPadding = 90;
        const distanceFromScroll = bottomInfo.getBoundingClientRect().top;
        const scrollPoint = (distanceFromScroll + window.scrollY) - topPadding;
        scrollTo(scrollPoint, 250);
      });

      const throttledUpdateSticky = throttle(updateSticky, 100);
      window.addEventListener('scroll', throttledUpdateSticky);

      share({ sidebarReference: { updateSticky } });

      // Refresh the sticky siderbar when the document height changes
      rootScope.$watch(() => $(document).height(), () => {
        updateSticky();
      });
    };

    bindEvents();
    resolve();
  }),
};

/**
 * @desc Create a full page vertical carousel on mobile
 */
export const createMobileCarousel = {
  /**
   * @desc Promise is resolved when conditions are passed
   * @returns {Promise}
   */
  checkConditions: () => new Promise((resolve, reject) => {
    if (!document.querySelector(`.${ID}_heroSlider`)) {
      resolve();
    }
  }),

  /**
   * @desc Apply changes
   */
  applyChanges: () => new Promise((resolve, reject) => {
    const { rootScope } = shared;
    let slider;
    let sliderInstance;
    let activeSlideCount = 0;

    /**
     * @desc Load slider JS and CSS from CDN
     * @returns {Promise}
     */
    const loadSlider = () => new Promise((resolve, reject) => {
      const swipeResources = {
        js: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/js/swiper.min.js',
        css: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/css/swiper.min.css',
      };

      loadStyleSheet(swipeResources.css);
      globalGetScript(swipeResources.js)
        .then(() => {
          resolve();
        }, reject);
    });

    /**
     * @desc Get the Angular scope object for the carousel
     * @returns {Object}
     */
    const getCarouselScope = () => $(document.querySelectorAll('#ProductMediaCarousel .Slides')).scope();

    /**
     * @desc Get the number of slides in the product image carousel
     * @returns {number}
     */
    const getCarouselSlideCount = scope => scope
      ? scope.slideCount
      : getCarouselScope().slideCount;

    /**
     * @desc Get a reference to all slides in the product image carousel
     * @returns {NodeList}
     */
    const getCarouselSlides = scope => scope
      ? scope.slides
      : getCarouselScope().slides;

    /**
     * @desc Check if new slides have become available in
     * angular scope
     * @returns {boolean}
     */
    const checkNewSlidesAvailable = () => {
      const carouselScope = getCarouselScope();
      const slidesCount = getCarouselSlideCount(carouselScope);
      const newSlidesLoaded = slidesCount > activeSlideCount;
      return newSlidesLoaded;
    };

    /**
     * @desc Add all sliders available in scope
     */
    const addAllSlides = () => {
      const slides = getCarouselSlides();
      const productImages = [].map.call(slides, slide => slide.querySelector('img'));
      const productImageData = getImageData(productImages);
      productImageData.forEach((data) => {
        sliderInstance.appendSlide(`
          <div class="swiper-slide ${ID}_heroSlide">
            <img
              ${data.src ? `src="${data.src}"` : ''} 
              ${data.alt ? `alt="${data.alt}"` : ''}
            />
          </div>
        `);
      });
      activeSlideCount = slides.length;
    };

    /**
     * @desc Update all slides to latest version
     */
    const updateSlides = () => {
      sliderInstance.removeAllSlides();
      addAllSlides();
      sliderInstance.update();
    };

    /**
     * @desc Recalculate slider height based on available screen space
     */
    const updateSliderDimensions = () => {
      const headerHeight = getHeaderHeight();
      const screenHeight = getScreenHeight();
      const tabHeight = getMiniProductInfoHeight();
      const sliderHeight = screenHeight - (headerHeight + tabHeight);
      slider.style.height = `${sliderHeight}px`;
      slider.style.maxHeight = `${sliderHeight}px`;

      const slides = slider.querySelectorAll(`.${ID}_heroSlide`);
      [].forEach.call(slides, (slide) => {
        const el = slide;
        el.style.height = `${sliderHeight}px`;
      });

      sliderInstance.update();
    };

    /**
     * @desc Render slider
     */
    const renderSlider = () => {
      const mainWrap = document.querySelector(`.${ID}_pageContent`) || document.querySelector('#MainContentWrapper');
      mainWrap.insertAdjacentElement('afterbegin', slider);
    };

    /**
     * @desc Create slider component
     * @returns {HTMLElement}
     */
    const createSlider = () => {
      // Create elements
      const component = document.createElement('div');
      component.className = `${ID}_heroSlider swiper-container`;
      component.innerHTML = `
        <div class="swiper-wrapper"></div>
        <div class="swiper-pagination"></div>
      `;

      return component;
    };

    /**
     * @desc Bind all event handlers
     */
    const bindSliderEvents = () => {
      // Update slider content when new carousel images are detected
      rootScope.$on('Carousel_Updated', () => {
        const newSlidesAvailable = checkNewSlidesAvailable();
        if (newSlidesAvailable) {
          updateSlides();
        }
      });

      // Update slider dimensions on doc ready
      const domLoaded = document.readyState !== 'loading';
      if (domLoaded) {
        updateSliderDimensions();
      } else {
        document.addEventListener('DOMContentLoaded', updateSliderDimensions);
      }
    };

    loadSlider().then(() => {
      slider = createSlider();
      renderSlider();

      // Init slider
      sliderInstance = new window.Swiper(`.${ID}_heroSlider`, {
        direction: 'vertical',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });

      addAllSlides();
      bindSliderEvents();

      // Force update slider dimensions again after a while to ensure it's the correct size
      setTimeout(updateSliderDimensions, 2000);
      setTimeout(updateSliderDimensions, 10000);

      resolve();
    });

    // Expose methods
    share({
      mobileCarousel: {
        updateSliderDimensions,
      },
    });
  }),
};

/**
 * @desc Create sliding product info
 */
export const createMobileSlidingContent = {
  checkConditions: () => new Promise((resolve, reject) => {
    pollerLite([
      '#MainContentWrapper',
      '#ProductNameAndRating .ProductName',
      '.ProductInformation #Shades',
      '#ProductDetails .Prices .Price',
      'footer[ng-controller="FooterController"]',
      () => {
        try {
          return typeof window.Hammer.Manager === 'function';
        } catch(e) {}
      },
    ], () => {
      const isModified = document.querySelector(`.${ID}_fullProductInfo`);
      if (!isModified) {
        resolve();
      }
    });
  }),

  applyChanges: () => new Promise((resolve, reject) => {
    let miniProductInfo;

    /**
     * @desc Make changes to the DOM structure before
     * creating the slider
     */
    const prepareDOM = () => {
      const mainInfo = document.querySelector('#MainContentWrapper');
      const footer = document.querySelector('ng-include footer[ng-controller="FooterController"]').parentElement;

      // Create a wrapper for the product info
      const fullContentWrap = document.createElement('div');
      fullContentWrap.className = `${ID}_fullProductInfo`;
      wrap([mainInfo, footer], fullContentWrap);

      // Create another wrapper for the product info so we can toggle
      // between the small and full versions
      const allContentWrap = document.createElement('div');
      allContentWrap.className = `${ID}_allProductInfo`;
      wrap(fullContentWrap, allContentWrap);

      // Create a wrapper for the slider and main content
      const pageWrap = document.createElement('div');
      pageWrap.className = `${ID}_pageContent`;
      wrap(allContentWrap, pageWrap);
    };

    /**
     * @desc Create a mini version of the product info that
     * is visible when the slider is collapsed
     */
    const createMiniProductInfo = () => {
      const miniInfo = document.createElement('div');
      miniInfo.className = `${ID}_miniProductInfo`;
      miniInfo.innerHTML = `
        <div class="${ID}_miniProductInfo__toggle">
          <i></i>
        </div>
        <div class="${ID}_miniProductInfo__nameAndPrice">
          <div class="${ID}_miniProductInfo__name"></div>
          <div class="${ID}_miniProductInfo__price"></div>
        </div>
        <div class="${ID}_miniProductInfo__btn">
          <div class="Button">
            <span>Select your shade</span>
          </div>
        </div>
      `;

      // Move product name and price
      const productName = document.querySelector('#ProductNameAndRating .ProductName');
      miniInfo.querySelector(`.${ID}_miniProductInfo__name`).appendChild(productName.cloneNode(true));

      const productPrice = document.querySelector('#ProductDetails .Prices .Price');
      miniInfo.querySelector(`.${ID}_miniProductInfo__price`).appendChild(productPrice.cloneNode(true));

      const productPriceRRP = document.querySelector('#ProductDetails .Prices .ListPrice');
      if (productPriceRRP) {
        miniInfo.querySelector(`.${ID}_miniProductInfo__price`).appendChild(productPriceRRP.cloneNode(true));
      }

      // Render
      const fullProductInfo = document.querySelector(`.${ID}_fullProductInfo`);
      fullProductInfo.insertAdjacentElement('beforebegin', miniInfo);

      return miniInfo;
    };

    /**
     * @desc Changes made to the extended product info
     */
    const productInfoChanges = () => {
      // Add bullet points
      const container = document.querySelector('#ProductNameAndRating');
      const bullets = getDescBullets();
      getRenderMethod(bullets).call(container, 'beforeend', bullets);

      // Add shade selection header
      const shades = document.querySelector('.ProductInformation #Shades');
      shades.insertAdjacentHTML('beforebegin', `<div class="${ID}_shadesHeading">Your colour choices...</div>`);
    };

    /**
     * @desc Bind all event handlers
     */
    const bindEvents = () => {
      let snappingToPosition = false;
      const { Hammer } = window;
      const content = document.querySelector(`.${ID}_allProductInfo`);
      const mc = new Hammer.Manager(miniProductInfo, {
        recognizers: [
          [Hammer.Pan, { direction: Hammer.DIRECTION_VERTICAL }],
        ],
      });

      const viewportHeight = getScreenHeight();
      const headerHeight = getHeaderHeight();
      const tabHeight = getMiniProductInfoHeight();

      /**
       * @desc Highest point of the page, under the header
       * @type {Number}
       */
      const topPoint = (viewportHeight - headerHeight) + tabHeight;

      /**
       * @desc The point where if the content is dragged above, it should snap to the top
       * @type {Number}
       */
      const triggerPoint = topPoint / 2;

      /**
       * @desc The point on the page where the content will settle when snapped to the top
       * @type {Number}
       */
      const settlePoint = topPoint - (tabHeight * 2.5);

      /**
       * @desc Snaps the element to the top so it is expanded
       */
      const snapToTop = () => {
        snappingToPosition = true;
        content.classList.add('is-animating');
        content.classList.add(`${ID}_allProductInfo--snappedToTop`);

        content.style.transform = `translateY(-${settlePoint}px)`;

        // Hide cta
        $(miniProductInfo).find(`.${ID}_miniProductInfo__btn`).slideUp();

        // Allow auto height on tab so it can adjust for hiding the cta
        miniProductInfo.style.height = 'auto';

        // Set height on content to prevent overscrolling
        content.style.height = `${settlePoint + tabHeight}px`;

        setTimeout(() => {
          snappingToPosition = false;
          content.classList.remove('is-animating');
          events.send(ID, 'Open', 'Opened product info mobile');
        }, 400);
      };

      /**
       * @desc Snaps the element to the bottom so it is minimized
       */
      const snapToBottom = () => {
        snappingToPosition = true;
        content.classList.add('is-animating');
        content.style.transform = 'translateY(0)';

        // Show cta
        $(miniProductInfo).find(`.${ID}_miniProductInfo__btn`).slideDown();

        // Reset heights
        content.style.height = '';
        miniProductInfo.style.height = '';

        setTimeout(() => {
          snappingToPosition = false;
          content.classList.remove('is-animating');
          content.classList.remove(`${ID}_allProductInfo--snappedToTop`);

          // Re-calculate mobile slider
          if (shared.mobileCarousel && shared.mobileCarousel.updateSliderDimensions) {
            shared.mobileCarousel.updateSliderDimensions();
          }

          events.send(ID, 'Closed', 'Closed product info mobile');
        }, 400);
      };

      /**
       * @desk Check if content is currently snapped to top
       * @returns {Boolean}
       */
      const isSnapped = () => content.classList.contains(`${ID}_allProductInfo--snappedToTop`);

      // Pan event handler
      mc.on('pan', (ev) => {
        /**
         * @desc Y distance from the top of the page
         * @type {Number}
         */
        const pageYOffset = ev.srcEvent.pageY;

        /**
         * @desc Y distance from the top of the tab element
         * @type {Number}
         */
        const tabYOffset = ev.srcEvent.layerY;

        // Move element along with swipe gesture
        //
        // Don't transform if the Y value is above or below the range
        // i.e. if the tab height would be pushed below it's starting point or
        // if the container would otherwise be dragged under the header
        const allowDragAbove = false;
        const allowDragBelow = true;

        const isAboveBottomPoint = allowDragBelow || tabYOffset < 0;
        const isBelowTopPoint = allowDragAbove || Math.abs(tabYOffset) < settlePoint;
        const isInRange = isAboveBottomPoint && isBelowTopPoint;

        if (isInRange) {
          content.style.transform = `translateY(${tabYOffset}px)`;
        }

        // When use stops panning, decide if the element should be snapped
        // to the top or bottom based on how far or how hard they dragged it
        if (ev.isFinal) {
          const shouldSnapToTop = pageYOffset <= triggerPoint || ev.velocity > 1;
          content.style.top = '';

          if (shouldSnapToTop) {
            snapToTop();
          } else {
            snapToBottom();
          }
        }
      });

      // Bind event handler
      const button = miniProductInfo.querySelector('.Button');
      button.addEventListener('click', () => {
        events.send(ID, 'Click', 'Select your shade mobile');
        snapToTop();
      });

      const topBar = miniProductInfo.querySelector(`.${ID}_miniProductInfo__toggle`);
      topBar.addEventListener('click', () => {
        if (!snappingToPosition) {
          if (isSnapped()) {
            snapToBottom();
          } else {
            snapToTop();
          }
        }
      });

      pollerLite([`.${ID}_heroSlider`], () => {
        const slider = document.querySelector(`.${ID}_heroSlider`);
        slider.addEventListener('click', () => {
          if (isSnapped()) {
            snapToBottom();
          }
        });
      });
    };

    document.body.classList.add(`${ID}_slidingContent`);
    prepareDOM();
    miniProductInfo = createMiniProductInfo();
    productInfoChanges();
    bindEvents();
    resolve();
  }),
};

export const changeShadeDropdownText = {
  checkConditions: () => new Promise((resolve, reject) => {
    pollerLite([
      '.ShadeDropdown',
      '.ShadeSelectedDropdown',
      '.ShadeSelectionDropdown',
    ], () => {
      const isModified = document.querySelector('.ShadeSelectedDropdown').getAttribute(`data-${ID}-modified`);
      if (!isModified) {
        resolve();
      }
    });
  }),

  applyChanges: () => new Promise((resolve, reject) => {
    /**
     * Return all updated elements
     * @returns {Object} Elements
     */
    const getShadeDropdowns = () => {
      const shadeDropdowns = document.querySelectorAll('.ShadeDropdown');
      const variantDropdown = [].filter.call(shadeDropdowns, el => el.classList.contains('ShadeSelectedDropdown'))[0];
      const selectorDropdown = [].filter.call(shadeDropdowns, el => el.classList.contains('ShadeSelectionDropdown'))[0];
      const selectorDropdownText = selectorDropdown.querySelector('.select2-choice > span');

      return {
        shadeDropdowns,
        variantDropdown,
        selectorDropdown,
        selectorDropdownText,
      };
    };

    /**
     * Change the text
     */
    const updateText = () => {
      const {
        variantDropdown,
        selectorDropdownText,
      } = getShadeDropdowns();

      const hasSelections = !!variantDropdown.querySelector('.SelectedVariant');
      if (hasSelections) {
        selectorDropdownText.innerText = 'Select another shade';
      } else {
        selectorDropdownText.innerText = 'Select a shade';
      }
    };

    // ChildList mutations will occur when shades are added / removed
    const { variantDropdown } = getShadeDropdowns();
    observer.connect(variantDropdown, updateText, {
      throttle: 0,
      config: { childList: true, subtree: false, attributes: true },
    });

    // Initial call
    updateText();
    variantDropdown.setAttribute(`data-${ID}-modified`, true);
    resolve();
  }),
};
