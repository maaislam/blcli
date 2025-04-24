import { fullStory, events } from '../../../../lib/utils';
import urls from './lib/MP131urls';
/**
 * {{MP131}} - {{Mattress comparison page link}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP131',
    VARIATION: '{{VARIATION}}',
    /*eslint-disable */
    isPLP(pageType) {
      if (pageType === 'Category') {
        return true;
      }
    },
    isPDP(pageType) {
      if (pageType === 'Product') {
        return true;
      }
    },
  },

  init() {
    // Setup
    const { settings, services, components, bindExperimentEvents } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    /* eslint-enable */
    // Check Page Type
    const pageType = window.universal_variable.page.type;
    const plpPage = settings.isPLP(pageType);
    const pdpPage = settings.isPDP(pageType);

    if (plpPage && window.location.pathname === '/en-gb/c/mattress-covers') {
      // Change Content for second '?' USP Card
      components.changeUspContent();

      // Add New USP Card
      components.addNewUspCard();

      // Bind Event on USP Card
      bindExperimentEvents.mattressCompareRedirect();
    } else if (pdpPage) {
      const pathname = window.location.pathname; // eslint-disable-line prefer-destructuring
      const pdpType = urls[`${pathname}`];

      // Add Mattress Compare Message
      components.addMattressCompareMessage(pdpType);
      // Bind Event on USP Card
      bindExperimentEvents.mattressCompareRedirect();
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
     * @desc Change Content for second '?' USP Card
     */
    changeUspContent() {
      const productCards = document.querySelectorAll('.productCard .usp-outer');
      if (productCards && productCards.length > 0) {
        const secondCard = productCards[1].querySelector('.usp-inner > img');
        secondCard.src = 'https://dd6zx4ibq538k.cloudfront.net/static/images/4068/a2eef977923a1166b8ee675c556fdf8c_250_160.jpeg';
        secondCard.style.maxWidth = '130px';
        secondCard.style.marginBottom = '50px';
      }
    },
    /**
     * @desc Add New USP Card
     */
    addNewUspCard() {
      const { bindExperimentEvents } = Experiment;
      const allProducts = document.querySelectorAll('.productLister .col-xs-6.col-sm-3.mt-3');

      if (allProducts && allProducts.length > 0) {
        const newUspIcon = `<div class='col-xs-12 col-sm-3' data-span='1'>
        <div class='MP131-productCard productCard'>
        <style type='text/css'>
            body {overflow: visible;}
        
            .usp-wrapper h1 {border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 20px 0}
            .usp-outer {display: table;height: 100%;text-align: center;}
            .usp-inner {display: table-cell;vertical-align: middle;height: 350px;padding: 0 20px;}
            .usp-text {position: relative;line-height: 1.6em;color: #828282;font-size: 1.2em;text-align: center;font-weight: 300;margin: 15px 0}
            .usp-inner h2{margin-bottom: 40px; padding: 0 20px; font-size: 26px; letter-spacing: 2px;}
            .usp-inner a {padding:0 20px; margin-top: 20px; font-size: 18px; font-weight: 400; text-decoration: underline;}
            .usp-inner img {margin: 10px auto; display: block;}
            .usp-text:before {content: '~';position: absolute;left: 50%;top: -30px;font-size: 1.6em;line-height: 1em;color: #999;margin-left: -10px;}
        </style>
        <div class='usp-outer'>
        <div class='MP131-uspInner usp-inner'>
        <img src='https://i1.adis.ws/i/mamasandpapas/didyouknow-usp' style='max-width:160px; height: auto;'>
        <p class='usp-text'>
        <strong>Need some help?</strong><br> View our mattress comparison page to find your perfect mattress from only £39
        </p>
        </div>
        </div></div>
        </div>`;

        let productCount = 0;
        [].forEach.call(allProducts, (product) => {
          productCount += 1;
          if (productCount === 6) {
            product.insertAdjacentHTML('afterend', newUspIcon);
          }
        });

        const newUspCard = document.querySelector('.MP131-uspInner.usp-inner');
        bindExperimentEvents.mattressCompareRedirect(newUspCard, 'Mattress PLP');
      }
    },
    /**
     * @desc Add Mattress Compare Message
     */
    addMattressCompareMessage(pdpType) {
      const { bindExperimentEvents } = Experiment;
      let topText = '';
      let mainText = '';
      let page = '';
      switch (pdpType) { // eslint-disable-line default-case
        case 'mattress':
          page = 'Mattress PDP';
          topText = 'Need help deciding?';
          mainText = 'Find your perfect mattress using our mattress comparison page';
          break;
        case 'cotbed':
          page = 'Cotbed PDP';
          topText = 'Looking for a compatible mattress?';
          mainText = 'Find your perfect mattress using our mattress comparison page';
          break;
      }

      if (topText !== '' && mainText !== '' && page !== '') {
        const priceContainer = document.querySelector('.productDetail_price.font-size-5.font-weight-semibold.py-1');
        if (priceContainer) {
          const mattressCompareContent = `<div class='MP131-mattressCompareWrap'>
            <div class='MP131-mattressCompare'>
              <div class='MP131-top'>
                <strong>${topText}</strong>
              </div>
              <div class='MP131-bottom'>${mainText}</div>
            </div>
          </div>`;
          priceContainer.insertAdjacentHTML('afterend', mattressCompareContent);

          const mattressCompareMessage = document.querySelector('.MP131-mattressCompare');
          bindExperimentEvents.mattressCompareRedirect(mattressCompareMessage, page);
        }
      }
    },
  },
  bindExperimentEvents: {
    /**
     * @desc Redirect to Mattress Compare page on Click
     */
    mattressCompareRedirect(element, clickOrigin) {
      const { settings } = Experiment;
      if (element) {
        element.addEventListener('click', () => {
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Mattress comparison page link on ${clickOrigin}`, { sendOnce: true });
          window.location.href = '/en-gb/mattress-compare';
        });
      }
    },
  },
};

export default Experiment;
