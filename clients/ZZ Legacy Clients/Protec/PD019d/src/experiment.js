import { fullStory, events } from '../../../../lib/utils';

/**
 * {{PD019d}} - {{Desktop Product Listing Page Information}}
 */
const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'PD019d',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const prodArr = document.querySelectorAll('.pd3--variant-product.subcat_column-item .pd3-prod-content');
      const prodWrap = document.querySelector('.pd3--variant-product.subcat_column-item').parentNode;
      let infoArr;

      return {
        prodArr,
        bodyVar,
        prodWrap,
        infoArr,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      // Execute test functions
      components.reOrder();
      components.productFunctions.contentBuilder();
      components.productFunctions.extraInfoClick();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send('PD019d', 'Test Load', 'PD019d has fired and loaded', { sendOnce: true });
      },
      /**
       * @desc Requests product page to then be built into the page
       */
      HTMLRequest: (href, node) => {
        const request = new XMLHttpRequest();
        const textWrap = node;

        request.open('GET', href, true);
        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            Exp.components.productFunctions.buildRequestedMarkup(request.responseText, node);
          } else if (!node.querySelector('p')) {
            textWrap.insertAdjacentHTML('beforeend', '<p class="PD019d_error">There was an error with the request. Please try again.</p>');
          }
        };
        request.onerror = () => {
          if (!node.querySelector('p')) {
            textWrap.insertAdjacentHTML('beforeend', '<p class="PD019d_error">There was an error with the request. Please try again.</p>');
          }
        };
        request.send();
      },
    },
    components: {
      reOrder: () => {
        Exp.cache.prodWrap.classList.add('PD019d_prod-wrap');
        Exp.cache.prodWrap.insertAdjacentHTML('beforebegin', '<div class="PD019d_order-by PD019d_before"></div>');
        Exp.cache.prodWrap.insertAdjacentHTML('afterend', '<div class="PD019d_order-by PD019d_end"></div>');

        document.querySelector('.PD019d_order-by.PD019d_before').appendChild(Exp.cache.prodWrap.querySelector('.productSwitchItem:first-child'));
        document.querySelector('.PD019d_order-by.PD019d_end').appendChild(Exp.cache.prodWrap.querySelector('.productSwitchItem'));
      },
      productFunctions: {
        /**
         * @desc Build View product details markup to allow the user to request the product details
         */
        contentBuilder: () => {
          Exp.cache.prodArr.forEach((el) => {
            el.insertAdjacentHTML('afterend', '<div class="PD019d_info-wrap"><a class="PD019d_info-btn"><span><img src="//www.protecdirect.co.uk/_ui/desktop/theme-protec/images/infoIcon.png" /></span><span>View Product Details</span></a></div>');
          });

          Exp.cache.infoArr = document.querySelectorAll('.PD019d_info-btn');
        },
        /**
         * @desc On click of the view details button, send a request to the relevant product paage
         */
        extraInfoClick: () => {
          Exp.cache.infoArr.forEach((el) => {
            el.addEventListener('click', () => {
              const elHref = el.parentNode.parentNode.querySelector('.productName label a').href;
              const detailsWrap = el.parentNode;
              Exp.services.HTMLRequest(elHref, detailsWrap);

              events.send('PD019d', 'Click', 'User clicked View Product Details', { sendOnce: true });
            });
          });
        },
        /**
         * @desc Once request is done change the markup to the message requested
         */
        buildRequestedMarkup: (request, node) => {
          const div = document.createElement('div');
          const target = node;

          // Put markup in a div to be search for content
          div.insertAdjacentHTML('beforeend', request);
          const details = `<p>${(div.querySelector('.span-9 .prod h3 + p').innerHTML.trim())}</p>`;

          // Change markup to product details
          target.innerHTML = details;
        },
      },
    },
  };

  Exp.init();
};

export default Run;
