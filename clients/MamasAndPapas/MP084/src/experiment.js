import { fullStory } from '../../../../lib/utils';

/**
 * {{MP084}} - {{Scarcity messages}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP084',
    VARIATION: 1,
  },

  init: function init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    /**
     * @desc Checks selected size value. If 'Select option' is selected then does not run experiment
     */
    const sizeSelectDropdown = document.querySelector('select.w-100.p-3');
    if (sizeSelectDropdown) {
      if (sizeSelectDropdown.querySelector('option').hasAttribute('selected')) {
        return;
      }
    }
    // Gets stock levels
    const stockLevels = document.querySelector('#stock-levels-check').innerHTML;
    const stockObj = JSON.parse(stockLevels);
    let stockNumber = stockObj.head_office_stock;

    let bubbleText = 'In Stock';
    let bubbleSubText = 'and ready to send';
    let badgeContent = `<div><img id='tick-icon' src="https://dd6zx4ibq538k.cloudfront.net/static/images/4068/649373a9acfca76e87464814ac3d8605_64_64.png" alt="tick" height="42" width="42"></div>`;// eslint-disable-line quotes

    // More than 6 in stock but less than 20
    if (stockNumber > 6 && stockNumber < 20) {
      bubbleText = 'Hurry!';
      bubbleSubText = 'Less than 20 In Stock Online';
      stockNumber = 20;
      badgeContent = `<div id='stock-number'>${stockNumber}</div>
      <div><p>Left</p></div>`;
    // More than 1 in stock but less than 5
    } else if (stockNumber > 1 && stockNumber < 5) {
      bubbleText = 'Last Chance!';
      bubbleSubText = 'Less than 5 In Stock Online';
      stockNumber = 5;
      badgeContent = `<div id='stock-number'>${stockNumber}</div>
      <div><p>Left</p></div>`;
    // 0 in stock
    } else if (stockNumber === 0) {
      if (document.querySelector('.productDetail .btn-primary').innerText === 'ADD TO BAG') {
        bubbleText = 'Pre-order';
        bubbleSubText = document.querySelector('.py-3 p:nth-child(3)').innerText;
        badgeContent = `<div><img id='tick-icon' src="https://dd6zx4ibq538k.cloudfront.net/static/images/4068/d5ed3925a5d57e105a4953f095de3cdc_32_32.png" alt="tick" height="42" width="42"></div>`;// eslint-disable-line quotes
      } else {
        if (document.querySelector('#PickUpInStore-PickUpInStoreAction')) { // eslint-disable-line no-lonely-if
          bubbleText = 'Sold out';
          bubbleSubText = 'Why not try our Find In Store option';
          badgeContent = `<div id='out-of-stock'><p>Sold</p><p>out</p></div>`;// eslint-disable-line quotes
        } else {
          bubbleText = 'Sold out';
          bubbleSubText = 'Have you checked our Related Items?';
          badgeContent = `<div id='out-of-stock'><p>Sold</p><p>out</p></div>`;// eslint-disable-line quotes
        }
      }
    }
    // Creates badge content for Desktop image and Mobile carousel images
    const imageMobileCarousel = document.querySelector('#js-productCarouselMobile');
    const desktopProductDescription = document.querySelector('.pb-2');
    const badgeContainerDesktop = `<div class='MP084-badgeWrapper__desktop'>
    <div class='MP084-badgeContainer'>
    <span><img src='https://dd6zx4ibq538k.cloudfront.net/static/images/4068/e80ba68fb8663d624bc8dbe6681e3223_165_128.png' alt='sparkle'></span>
    <div class='MP084-badge badge'>${badgeContent}</div>
    </div>
    <div class='MP084-message__desktop'>
    <div class='MP084-messageText'><strong>${bubbleText}</strong> ${bubbleSubText}
    </div>
    </div></div>`;
    const badgeContainerMobile = `<div class='MP084-badgeWrapper'><div class='MP084-badgeContainer'>
    <span><img src='https://dd6zx4ibq538k.cloudfront.net/static/images/4068/e80ba68fb8663d624bc8dbe6681e3223_165_128.png' alt='sparkle'></span>
    <div class='MP084-badge badge'>${badgeContent}</div>
    </div>
    <div class='MP084-talkBubble'>
    <div class='MP084-bubbleText'>${bubbleText}
    <div class='MP084-bubbleSubText'>${bubbleSubText}</div>
    </div>
    </div></div>`;
    if (window.innerWidth > 992) {
      desktopProductDescription.insertAdjacentHTML('afterend', badgeContainerDesktop);
    } else if (window.innerWidth < 992) {
      imageMobileCarousel.insertAdjacentHTML('afterend', badgeContainerMobile);
    }

    // If product is not out of stock, then it appends delivery information below CTA button
    /* if (stockNumber !== 0) {
      // Gets product price
      let productPrice = document.querySelector('.price').innerHTML;
      productPrice = parseFloat(productPrice.substr(2));

      let deliveryInfo;

      if (productPrice < 50) {
        deliveryInfo = `<p>Discover convenient <a id='delivery-info-link'>delivery options</a></p>`;// eslint-disable-line quotes
      } else {
        deliveryInfo = `<p>This item includes <img src='https://dd6zx4ibq538k.cloudfront.net/static/images/4068/eae991c79c2ce228b61dacc3ebf6df34_922_346.png' alt='Free Delivery'></p>`;// eslint-disable-line quotes
      }
      /**
       * @desc Creates delivery information content for mobile/tablet view and desktop view
       
      let deliveryInfoWrapperClass;
      if (window.innerWidth < 991) {
        deliveryInfoWrapperClass = 'MP084-deliveryInfoWrapper__mobile';
      } else {
        deliveryInfoWrapperClass = 'MP084-deliveryInfoWrapper__desktop';
      }

      const addToCartWrapper = document.querySelector('.qty-block');
      const deliveryInfoWrapper = `<div class='${deliveryInfoWrapperClass}'>
      <div class='MP084-deliveryInfoContainer'>
      <div class='MP084-delivery-van__icon'><img src="https://dd6zx4ibq538k.cloudfront.net/static/images/4068/7d89991e4dfbfb3b0c5ae968b319ece8_500_500.png" alt="delivery-van"></div>
      <div class='MP084-deliveryInfo'>${deliveryInfo}</div>
      </div>
      </div>`;

      addToCartWrapper.insertAdjacentHTML('afterend', deliveryInfoWrapper);
      // Checks device and if delivery information link exists adds event listener
      let deliveryInfoLink;
      const deliveryDesktopWrapper = document.querySelector('.MP084-deliveryInfoWrapper__desktop');
      const deliveryMobileWrapper = document.querySelector('.MP084-deliveryInfoWrapper__mobile');
      if (deliveryDesktopWrapper) {
        deliveryInfoLink = deliveryDesktopWrapper.querySelector('#delivery-info-link');
        if (deliveryInfoLink) {
          /*eslint-disable 
          deliveryInfoLink.addEventListener('click', () => {
            const productDetails = document.querySelector('#PDP-Details');
            const headerHeight = document.querySelector('.header_nav').clientHeight;
            const scrollVal = productDetails.getBoundingClientRect().y + window.scrollY - (headerHeight * 2);
            window.scrollTo(0, scrollVal);
          });
          /* eslint-enable
        }
      } else if (deliveryMobileWrapper) {
        deliveryInfoLink = document.querySelector('#delivery-info-link');
        if (deliveryInfoLink) {
          deliveryInfoLink.addEventListener('click', () => {
            document.querySelectorAll('.productDetail_panelHeading')[1].click();
          });
        }
      }
    } */
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
  },

  components: {},
};

export default Experiment;
