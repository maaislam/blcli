import { fullStory, events } from '../../../../lib/utils';

/**
 * {{PD021}} - {{Product Page Iteration}}
 */
const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'PD021',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      // Markup

      // Free delivery markup
      const deliveryMarkup = `
      <div class="PD021-Delivery-Wrapper">
        <img class="PD021-Delivery-Icon" src="https://ab-test-sandbox.userconversion.com/experiments/PD005-freedeliv.png" alt="Free Delivery">
        <p class="PD021-Delivery-Text">FREE next day delivery<br />when you spend over £25*</p>
      </div>
      `;

      // More informaiton markup

      const MoreInfoMarkup = `
      <div class="PD021-More-Information-Wrapper">
        <span class="PD021-More-Information">More information</span>
        <span class="PD021-Circle-Icon"></span>
      </div>
      `;

      // Product information markup

      const productInformationMarkup = `
      <div class="PD021-New-Product-Information-Wrapper">
        <div class="PD021-Product-Information">
          <p class="PD021-Full-Product-Header">Full Product Information</p>
        </div>
        <div class="PD021-Manufacturer-Details">
        </div>
      </div>
      `;

      // Related items markup

      const relatedItemsMarkup = `
      <div class="PD021-Related-Items-Wrapper">
        <p class="PD021-Related-Items-Header">Related Items</p>
      </div>
      `;

      // Selectors - test dependant
      const breadcrumbParent = bodyVar.querySelector('#breadcrumb');
      const productTitle = bodyVar.querySelector('#content > .span-24 > .catBanner');
      const galleryImageSize = bodyVar.querySelectorAll('#carousel_alternate .thumb');
      const galleryImageParent = bodyVar.querySelector('#productDetailUpdateable .span-4');
      const tabProductInformation = bodyVar.querySelector('div#tab-details');
      const productDetailsContainer = bodyVar.querySelector('#productDetailUpdateable');
      const relatedItemsContainer = bodyVar.querySelector('div#tab-relatedItems');
      const relatedNews = bodyVar.querySelector('#tab_08');
      const productCode = bodyVar.querySelector('#productDetailUpdateable .prod .code');

      // Selectors - May not exist

      const logoNewParent = bodyVar.querySelector('#tab-details>.featureClass>h4');
      const brandingLogo = bodyVar.querySelector('.brandlogo_datasheets > a');
      const manufacturerDetails = bodyVar.querySelector('#tab-details>.featureClass');
      const mdManufacturerCode = bodyVar.querySelectorAll('#tab-details .attrib')[1];

      return {
        bodyVar,
        breadcrumbParent,
        deliveryMarkup,
        brandingLogo,
        productTitle,
        galleryImageSize,
        galleryImageParent,
        logoNewParent,
        productInformationMarkup,
        relatedItemsMarkup,
        tabProductInformation,
        productDetailsContainer,
        manufacturerDetails,
        relatedItemsContainer,
        relatedNews,
        mdManufacturerCode,
        productCode,
        MoreInfoMarkup,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
      // Event template
      // events.send(`${Exp.settings.VARIATION}`, 'Action', 'Label', { sendOnce: true });
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Insert delivery markup after breadcrumbs
        Exp.cache.breadcrumbParent.insertAdjacentHTML('afterend', Exp.cache.deliveryMarkup);
        // Check number of gallery image items
        // If number is one, then hide the carousel
        if (Exp.cache.galleryImageSize.length <= 1) {
          Exp.cache.galleryImageParent.classList.add('PD021-Hide');
          // Add styling class to alter main the image
          Exp.cache.bodyVar.querySelector('.mainImageHolder').classList.add('PD021-Main-Image');
        }
        // Add the word 'Product' to 'code'
        Exp.cache.productCode.textContent = `Product ${Exp.cache.productCode.innerHTML}`;
        // Add more informaiton markup after product code
        Exp.cache.productCode.insertAdjacentHTML('afterend', Exp.cache.MoreInfoMarkup);
        // Move product information in tab to new area
        Exp.cache.productDetailsContainer.insertAdjacentHTML('afterend', Exp.cache.productInformationMarkup);
        Exp.cache.bodyVar.querySelector('.PD021-Product-Information').insertAdjacentElement('beforeend', Exp.cache.tabProductInformation);
        // Move branding logo if it exists
        // Check if manufacturer details exist, move if it exists
        if (Exp.cache.logoNewParent) {
          Exp.cache.bodyVar.querySelector('.PD021-Manufacturer-Details').insertAdjacentElement('afterbegin', Exp.cache.manufacturerDetails);
          // Amend manufacturer code text, if it exists
          if (Exp.cache.mdManufacturerCode) {
            Exp.cache.mdManufacturerCode.textContent = 'Product Code';
          }
        }
        // Move Logo if it exists
        if (Exp.cache.brandingLogo) {
          // Check if manufacturer details exists, move to new location depending on this
          if (Exp.cache.logoNewParent) {
            Exp.cache.logoNewParent.insertAdjacentElement('afterend', Exp.cache.brandingLogo);
          } else {
            Exp.cache.bodyVar.querySelector('.PD021-Manufacturer-Details').insertAdjacentElement('afterbegin', Exp.cache.brandingLogo);
          }
          // Add styling class
          Exp.cache.bodyVar.querySelector('.PD021-Product-Information').classList.add('PD021-Logo');
        }
        // Move related products carousel
        Exp.cache.bodyVar.querySelector('.PD021-New-Product-Information-Wrapper').insertAdjacentHTML('afterend', Exp.cache.relatedItemsMarkup);
        Exp.cache.bodyVar.querySelector('.PD021-Related-Items-Wrapper').insertAdjacentElement('beforeend', Exp.cache.relatedItemsContainer);
        // Reorder bottom tabs, move related news to first tab
        Exp.cache.bodyVar.querySelector('#tab_strip').insertAdjacentElement('afterbegin', Exp.cache.relatedNews);
        // Elements ready, set up functionality
        this.setupFunctions();
      },
      setupFunctions() {
        // Scroll to top of full product information
        Exp.cache.bodyVar.querySelector('.PD021-More-Information-Wrapper').addEventListener('click', () => {
          events.send('PD021', 'Click', 'More Information', { sendOnce: true });
          $('html, body').animate({ scrollTop: $('.PD021-New-Product-Information-Wrapper').offset().top - 50 });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
