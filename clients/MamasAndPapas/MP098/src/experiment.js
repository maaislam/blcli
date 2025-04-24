import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * MP098 - Advanced Content
 *
 * Relies on MP081 being 1005
 */
class Experiment {

  /**
   * @constructor
   */
  constructor() {
    this.settings = {
      ID: 'MP098',
      VARIATION: '{{VARIATION}}',
      POLLING_EXPIRY: 5000,
      MOBILE_BREAKPOINT: 767, // lte 767px
    };

    // ----------------------------------------------------------------
    // - Reference to all completed actions
    // E.g. video-player = true or false -- because some products may 
    // not have a video that we can use
    // ----------------------------------------------------------------
    this.actions = {};
  }

  /**
   * Post triggers entry point for run
   */
  init() {
    // ----------------------------------------------------------------
    // Setup
    // ----------------------------------------------------------------
    this.trackOnLoad();

    document.body.classList.add(this.settings.ID);

    // ----------------------------------------------------------------
    // Actions
    // ----------------------------------------------------------------
    this.addVideoToGallery();

    const bundleOptions = document.querySelectorAll('.MP081_BundlePicker__option');
    [].forEach.call(bundleOptions, (bundleOpt) => {
      // When bundle opt chosen, re-add video
      bundleOpt.addEventListener('click', () => {
        setTimeout(() => {
          this.addVideoToGallery();
        }, 500);
      });
    });

    this.addProductCodeToDetail();
    this.anchorToTopFeatures();
    this.amendLeftProductDetails();

    if(window.innerWidth > this.settings.MOBILE_BREAKPOINT) {
      this.collapseDeliveryInfo();
    }

    this.reorderAdvContentLinks([0,1,3,2,4]);
    this.reorderAdvContentSections(['#top-features', '#whats-included', '#benefits', '#video']);

    this.initCollapserLinks();

    // ----------------------------------------------------------------
    // After timeout seconds, what has happened for the user?:
    // Fire All tracked actions event for ref
    //
    // Required as not all elements or sections will be available
    // across all products
    // ----------------------------------------------------------------
    setTimeout(() => {
      events.send('MP098', '5-second-actions', Object.keys(this.actions).join('|'));
    }, this.settings.POLLING_EXPIRY);
  }

  /**
   * Add video to product gallery
   */
  addVideoToGallery() {
    pollerLite([
      '#video-player video',
      '#js-desktopImageContainer .slick-dots'
    ], () => {

      if(window.jQuery('#js-desktopImageContainer video').length) {
        return;
      }

      const video = document.querySelector('#video-player video');

      if(video) {
        this.actions['video-player'] = true;

        const poster = video.getAttribute('poster');

        // ----------------------------------------------------------------
        // Desktop 
        // ----------------------------------------------------------------
        const videoClone = video.cloneNode(true);
        videoClone.setAttribute('id', 'mp98-video-clone');
        videoClone.setAttribute('src', poster);

        videoClone.addEventListener('play', () => {
          events.send('MP098', 'did-play-video', '', {
            sendOnce: true  
          });
        });
        
        window.jQuery('#js-desktopImageContainer').slick('slickAdd', videoClone);
        window.jQuery('#js-desktopImageContainer').slick('setOption', 'adaptiveHeight', true);

        videoClone.removeAttribute('src');

        const dots = document.querySelector('#js-desktopImageContainer .slick-dots');

        window.jQuery('#js-desktopImageContainer').on('afterChange', (ev, slick, currentSlide) => {
          const currentSlideElement = slick.$slides.eq(currentSlide);
          if(currentSlideElement && currentSlideElement[0] && currentSlideElement[0].nodeName.toLowerCase() === 'video') {
            events.send('MP098', 'did-view-video-slide', '');
          }
        });
      }
    }, {
      timeout: this.settings.POLLING_EXPIRY  
    });
  }

  /**
   * Add product code to description
   */
  addProductCodeToDetail() {
    const sku = this.getProductCode();
    const productTitle = document.querySelector('h1.productDetail_title');

    if(sku && productTitle) {
      productTitle.insertAdjacentHTML('afterend', `
        <p class="mp98-sku">
          <strong>Product Code:</strong>
          <span>${sku}</span>
        </p>
      `);

      this.actions['product-code-moved-to-detail'] = true;
    }
  }

  /**
   * Anchor to top features
   */
  anchorToTopFeatures() {
    const elementsToAnchor = ['#readMorePDP'];

    const topFeaturesLink = document.querySelector('a[href="#top-features"]');
    
    if(topFeaturesLink) {
      elementsToAnchor.forEach((selector) => {
        const elm = document.querySelector(selector);
        if(elm) {
          elm.addEventListener('click', (e) => {
            topFeaturesLink.click();
          });

          this.actions['anchor-top-features-link'] = true;
        }
      });
    }
  }

  /**
   * Amend left product details
   */
  amendLeftProductDetails() {
    // ----------------------------------------------------------------
    // Update details heading
    // ----------------------------------------------------------------
    const detailsHeader = document.querySelector('#PDP-Details .productDetail_panelHeading');
    detailsHeader.innerHTML = 'Product Dimensions';
    
    this.actions['amend-left-product-title'] = true;

    // ----------------------------------------------------------------
    // Update details content
    // ----------------------------------------------------------------
    const detailsContainer = document.querySelector('#PDP-Details .details-product-mobile');
    if(detailsContainer) {
      const listsToRetain = [];
      const list = detailsContainer.querySelectorAll('ul');
      [].forEach.call(list, (ul) => {
        const listItems = ul.children;

        for(var i = 0; i < listItems.length; i++) {
          const li = listItems[i];
          const txt = li.textContent.trim();

          if(this.doesMatchDimensional(txt)) {
            listsToRetain.push(ul.innerHTML);
            break;
          }
        }
      });

      if(listsToRetain.length > 0) {
        this.actions['amend-left-product-content'] = true;

        detailsContainer.innerHTML = `
          <ul>
            ${listsToRetain.join('')}
          </ul>
        `;
      }
    }
  }

  /**
   * Collapsible delivery details
   */
  collapseDeliveryInfo() {
    this.actions['amend-delivery-info'] = true;

    const deliveryDetails = document.querySelector('#PDP-Information .productDetail_panelContent');

    deliveryDetails.classList.add('mp98-do-collapse');
    deliveryDetails.insertAdjacentHTML('afterend', `
      <div class="mp98-do-collapse-link" data-target="#PDP-Information .productDetail_panelContent">
        <a>read more</a>
      </div>
    `);

  }

  /**
   * Collapser Links
   */
  initCollapserLinks() {
    const collapserLinks = document.querySelectorAll('.mp98-do-collapse-link');
    [].forEach.call(collapserLinks, (link) => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(e.currentTarget.dataset['target']);
        if(target) {
          target.classList.remove('mp98-do-collapse');
          e.currentTarget.remove();
        }

        events.send('MP098', 'did-click-read-more', '');
      });
    });
  }

  /**
   * Amend advanced content links
   *
   * @param {Array} order Zero-based E.g. [5,0,1,3,2,4];
   */
  reorderAdvContentLinks(order) {
    pollerLite([
      '#subCategoryContainer .subCategoryList'
    ], () => {
      const container = document.querySelector('#subCategoryContainer .subCategoryList');

      if(container) {
        const links = container.querySelectorAll('.subCategoryList-item');
        this.actions['reorder-adv-content-links'] = true;

        order.forEach((orderPosition) => {
          const t = links[orderPosition];
          if(t) {
            container.insertAdjacentElement('beforeend', t);
          }
        });
      }
    });
  }

  /**
   * Amend advanced content sections
   *
   * @param {Array} order ID based E.g. ['#top-features', '#whats-included', '#video', '#benefits']
   */
  reorderAdvContentSections(order) {
    pollerLite([
      '.advanced-content'
    ], () => {
      const container = document.querySelector('.advanced-content');

      if(container) {
        this.actions['reorder-adv-content-sections'] = true;

        order.forEach((id) => {
          const item = container.querySelector(id);

          container.insertAdjacentElement('beforeend', item);
        });
      }
    });
  }

  /**
   * Helper identify a dimensions element
   * Regex match on dimension / weight strings
   *
   * @param {String} str
   * @return {Boolean}
   */
  doesMatchDimensional(str) {
    const regex = /\d(cm[\s\b]|kg[\s\b])/i;

    return regex.test(str);
  }

  /**
   * Helper get product code
   *
   * @return {String}
   */
  getProductCode() {
    return window.universal_variable.product.sku_code;
  }

  /**
   * On experiment init event tracking
   */
  trackOnLoad() {
    fullStory(this.settings.ID, `Variation ${this.settings.VARIATION}`);
    events.send(this.settings.ID, 'View', `${this.settings.ID} activated - Variation ${this.settings.VARIATION}`);
  }
}

export default (new Experiment());
