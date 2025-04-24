/* eslint-disable */
import { fullStory, events } from '../../../../lib/utils';
import { pollerLite, observer } from '../../../../lib/uc-lib';

/**
 * {{TP084}} - {{Product Information - PLP (mobile)}}
 */

const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP122m',
      VARIATION: '1',
    },
    cache: (() => {
      /** Cache Notes
       * Following elements are in the test but may not always exist, therefore not in poller
       * Dropdown selector for products: select[id*="advancedListProductVariants"]
       * Show more products button: #show_more
       */
      const docVar = document;
      const bodyVar = docVar.body;
      const showMoreButton = docVar.getElementById('show_more');

      return {
        docVar,
        bodyVar,
        showMoreButton,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      components.setupElements();
      services.tracking();
      // Test has succesfully loaded, send default running event
      events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
      // Reload page on click of grid.
      Exp.bindExperimentEvents.reloadPage();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
      findNewProducts: () => {
        // Searches the DOM for products without the test
        const newProducts = Exp.cache.bodyVar.querySelectorAll('.advanced_plp_product_item.product_item:not(.TP084_Product)');
        // elements found, add markup and event handlers
        if (newProducts.length > 0) {
          for (let i = 0; i < newProducts.length; i += 1) {
            // Render markup
            Exp.render.productInformationMarkup(newProducts[i]);
            // Add styling class to prevent retargeting

            newProducts[i].classList.add('TP084_Product');
            // Add event handler to markup
            Exp.bindExperimentEvents.handleRequestClick(newProducts[i]);
            // If current product has a dropdown selector, add event listener
            const productDropDown = newProducts[i].querySelector('select[id*="advancedListProductVariants"]');
            
            if (productDropDown) {
              Exp.bindExperimentEvents.dropDownChange(productDropDown);
            }

            // Add observer
            Exp.bindExperimentEvents.addObserver(newProducts[i]);
          }
        }
        // Add event for tech details
        Exp.bindExperimentEvents.addTechControls();
      },
      // Next line exceeds length
      // eslint-disable-next-line
      requestData: (requestLink, dataContainer, animationContainer, productMarkupContainer, insertedMarkup) => {
        const requestProductData = new XMLHttpRequest();
        requestProductData.open('GET', requestLink, true);

        requestProductData.onload = () => {
          if (requestProductData.status >= 200 && requestProductData.status < 400) {
            // Success!
            const resp = requestProductData.responseText;
            const div = document.createElement('div');
            if (resp) {
              div.innerHTML = resp;
  
              const retrievedData = div.querySelector('#content .tp_detOverview');
  
              // Check if data exists
              if (retrievedData) {
                // Render data, toggle class and slidedown container
                dataContainer.insertAdjacentElement('afterbegin', retrievedData);
                productMarkupContainer.classList.toggle('TP084_Closed');
                productMarkupContainer.classList.toggle('TP084_Open');
                animationContainer.slideDown();
                // Scroll to opened data wrap
                $('html, body').animate({ scrollTop: animationContainer.offset().top - 250 });
                // Remove request preventing class
                productMarkupContainer.classList.toggle('TP084_Requesting');
              }
            }

            /**
             * Get and check the technical data
             */
            const techData = div.querySelector('.tp_prodDetailTabs .tp_detSpec .featureClass:first-of-type');
            if (techData) {
              dataContainer.insertAdjacentHTML('afterend', `
                <div class="TP122m-tech-specs TP122m-tech-info-wrap">
                  <div class="TP122m-tech-wrapper">
                    <img class="TP084_ProductInfo_Icon" src="data:image/png;base64,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" alt="Product Informtion Icon">
                    <p class="TP122m-tech-link">View technical details</p>
                  </div>
                  <div class="TP122m-tech-data TP122m-hide">
                    ${techData.outerHTML}
                  </div>
                </div>
              `);

              // Add events to tech titles
              Exp.bindExperimentEvents.addTechControls();
            }
          } else {
            // We reached our target server, but it returned an error - Handle request error
            // Next line exceeds length
            // eslint-disable-next-line
          Exp.services.handleRequestError(dataContainer, productMarkupContainer, animationContainer, insertedMarkup);
          }
        };

        requestProductData.onerror = () => {
          // Next line exceeds length
          // eslint-disable-next-line
          Exp.services.handleRequestError(dataContainer, productMarkupContainer, animationContainer, insertedMarkup);
        };

        requestProductData.send();
      },
      // Next line exceeds length
      // eslint-disable-next-line
      handleRequestError: (errorDataContainer, errorProductMarkupContainer, errorAnimationContainer, errorInsertedMarkup) => {
        // There was a connection error of some sort
        // Remove request preventing class
        errorProductMarkupContainer.classList.toggle('TP084_Requesting');
        // Render error markup
        errorDataContainer.insertAdjacentHTML('afterbegin', `
          <p class="TP084_Error_Markup">There was an error with your request, please click here to try again</p>
        `);
        // Toggle class and slidedown container
        errorProductMarkupContainer.classList.toggle('TP084_Closed');
        errorProductMarkupContainer.classList.toggle('TP084_Open');
        errorAnimationContainer.slideDown();
        // Add event listener
        const errorMarkup = errorDataContainer.querySelector('.TP084_Error_Markup');
        errorMarkup.addEventListener('click', () => {
          // Reset the above classes and slideup container
          errorProductMarkupContainer.classList.toggle('TP084_Closed');
          errorProductMarkupContainer.classList.toggle('TP084_Open');
          errorAnimationContainer.slideUp();
          // Remove element, and click link again to send another request
          $(errorMarkup).remove();
          errorInsertedMarkup.click();
        });
      },
    },
    components: {
      setupElements() {
        // Start test using generic function to find products without test
        Exp.services.findNewProducts();
        // Add event listener to show more button if it exists
        if (Exp.cache.showMoreButton) {
          Exp.bindExperimentEvents.handleShowMore();
        }
      },
    },
    render: {
      productInformationMarkup(product) {
        product.insertAdjacentHTML('beforeend', `
        <div class="TP084_ProductInfo_Wrapper TP084_Closed">
          <img class="TP084_ProductInfo_Icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhBBoKIThy4lsXAAAD4UlEQVRo3t3Zf2iVVRgH8I+blBWC4pQwLAslK2tkf7RAy8wfOVAaJYstIpOalUYFVhQUmGFKmFREJKQg5c/IkGpDmH+MSCFWzYpCM4aYtI0mqMxG8+0Pb2O7u+s+9+5eF37PP/c953ue8z3P+5znfe77kg+utEunpE/r9Imr87KVFz7rt/i/7UeXXpjlJ+txyhzX9GnznJaYe2EEPC7RMKC3QaIud2Mjw8xSD3jQZZiEcwPGEzytCl22262n0Puu7ne/tw4Y39pvvDpqdkRYwKfu87Em8Je9OtLGyyxKBeEsNfaoipkd/BaMUmGGCb3X5Wjy/qD8Dpt7f9co90bvVZtmB5zNwduY6XCGg7Y8NHd5hpmHzczFAzPsN1K7Ju29fZUm5bCBY77o/T3eLFPsd7vm2OQRDkk0GNOvtz4nD9T36xmjQeJQpogryWBgqum61DqZw47/GyfV6jLd1JiAW9EyIMqHhg4tKctpyBQDY8mw+wTjTA4sNi7FTvfCecsBAZnR6F5rrAmzgyiJEm2yJXiWz9piU9Rs3AMnLbU0zA4j7oEi4aIWcIl3vDCcAt6zInuJUjwBT1km8Vw2WuQULLQ4a93Qap1zmKDOR466y0a8bk8+2tMfJj9lrIHT2y1gpcQJ87VJfN7Pv4M8zCIeqFMZ8MAhsM0TbtCAI2ozVI55CWhKFWIRdJit0U3OqIo9TQsfhG3u9q4FfojR46k4jnYr4+TiZsLRRg2ngJu1OjB8AsbaY6zfh0tAie2uczz7AzwiYEsgDbUaD+Y47hmsNV+3+/2RzXjkFFwV4JSlwq3MRG+pUI0VDmafGBGwwKSsmbDdGbBTuZdU44NYWRYRcE5rxFQKL/vbK76K5oJiBOGrys3WHSMXIxPSEqcWNxMuUzk8HjiPVdY7lu3lXfE8MM9avF0ID0xxT1bOUfvAKPPsd9q1tiu105v5aE8vyVpCJdmN4EmJb0z0vUSLK/pYGUJJttGSQEl2BOzT6TaHXa5TVSo5DdkDuWGGPyV6LEzrH8QDhQ/CZnMdVOfLGL0Yx7BZRZx8Uf85LfO1bdlIxcuEI+1SMZxF6QazdXm0EB541sNZ88CvHtKFadbbqNEjVuIx3+ajPT0PfBfKhNNAnUSX552V2NDP6hAy4UJ3ZuX85mewWaXF1qHRqshuIwJO2BH2XrcldlmsVXXsm0nhg7DbEsvcEX3VW4xj2O3DOPl/mQl7iiKsJGU5IOAXUoeqkJiWshzAaN0StQVdvlai2+iBA5mC8JTVXrPZ9fb2+WaUP8Zb5EWsdio6pdSOUPbLpe1QmpvuGvXaCrJ0m3o1gy3zD/cHtFfrzUnxAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTI2VDEwOjMzOjU2KzAyOjAwH4Za7wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0yNlQxMDozMzo1NiswMjowMG7b4lMAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC" alt="Product Informtion Icon" />
          <p class="TP084_ProductInfo_Text">View Product Information</p>
        </div>
        <div class="TP084_ProductInfo_Data_Wrap"></div>
        `);
      },
    },
    bindExperimentEvents: {
      handleRequestClick(productContainer) {
        const markupContainer = productContainer.querySelector('.TP084_ProductInfo_Wrapper');
        const addedMarkup = productContainer.querySelector('.TP084_ProductInfo_Text');
        const dataWrap = productContainer.querySelector('.TP084_ProductInfo_Data_Wrap');
        const animateDataWrap = $(dataWrap);
        markupContainer.addEventListener('click', () => {
          // Send event
          events.send(`${Exp.settings.ID}`, 'Click', 'View Product Information', { sendOnce: true });
          // If datawrap has no children (previous AJAX has not occured), make request
          
          // If datawrap has no children (previous AJAX has not occured), make request
          if (dataWrap.children.length === 0 && !markupContainer.classList.contains('TP084_Requesting')) {
            // Add class to prevent multiple requests
            markupContainer.classList.toggle('TP084_Requesting');
            const productLink = productContainer.querySelector('.product_item_header a').href;
            // Make request to productlink - pass link, product container
            // Next line exceeds length
            // eslint-disable-next-line
            Exp.services.requestData(productLink, dataWrap, animateDataWrap, markupContainer, addedMarkup);
            // Datawrap has hidden content, reveal them
          } else if (markupContainer.classList.contains('TP084_Closed')) {
            markupContainer.classList.toggle('TP084_Closed');
            markupContainer.classList.toggle('TP084_Open');
            animateDataWrap.slideDown();
            // Scroll to opened data wrap
            $('html, body').animate({ scrollTop: animateDataWrap.offset().top - 250 });
            events.send(`${Exp.settings.ID}`, 'User saw', 'View more details', { sendOnce: true });
            // Data wrap has content visible, hide them
          } else if (markupContainer.classList.contains('TP084_Open')) {
            markupContainer.classList.toggle('TP084_Closed');
            markupContainer.classList.toggle('TP084_Open');
            animateDataWrap.slideUp();
          }
          /**
           * Toggle information text
           */
          const title = markupContainer.querySelector('p.TP084_ProductInfo_Text');
          if (title) {
            if (title.textContent === 'View Product Information') {
              title.textContent = 'Close Product Information';
            } else {
              title.textContent = 'View Product Information';
            }
          }
          return false;
        });
      },
      handleShowMore() {
        // Poll for missing items, call service to find new product
        Exp.cache.showMoreButton.addEventListener('click', this.detectNewProducts);
      },
      detectNewProducts() {
        // const products = document.querySelectorAll('.list_view #products .row .prod .tpPlpProductPanelComponent:not(.TP084_Product)');
        pollerLite([
          '.advanced_plp_product_item.product_item:not(.TP084_Product)', // All product Container - Without test content
        ], () => {
          Exp.services.findNewProducts();
        });
      },
      dropDownChange(dropdownSelector) {
        dropdownSelector.addEventListener('change', this.detectNewProducts);
      },
      addObserver(product) {
        observer.connect(product.parentNode, () => {
          this.detectNewProducts();
        }, {
          config: {
            childList: false,
            attributes: true,
          },
        });
      },
      addTechControls() {
        const techElements = document.querySelectorAll('.TP122m-tech-specs');

        if (techElements.length > 0) {
          for (let i = 0; techElements.length > i; i += 1) {

            techElements[i].addEventListener('click', (e) => {
              // Send event
              events.send(`${Exp.settings.ID}`, 'Click', 'View Technical Information', { sendOnce: true });

              const techData = techElements[i].querySelector('.TP122m-tech-data');
              if (techData) {
                techData.classList.toggle('TP122m-hide');
              }
              const techTitle = techElements[i].querySelector('.TP122m-tech-link');

              if (techTitle) {
                if (techTitle.textContent === 'View technical details') {
                  techTitle.textContent = 'Close technical details';
                } else {
                  techTitle.textContent = 'View technical details';
                }
              }
              techElements[i].classList.add('TP122m-has-event');
              
            });
          }
        }
      },
      /**
       * Reload the page on toggle of grid or list.
       */
      reloadPage() {
        const gridBtn = document.querySelector('.prod_nav_bottom .view_mode_buttons .grid_button');
        if (gridBtn) {
          gridBtn.addEventListener('click', () => {
            window.location.reload();
          });
        }
      },
    },
  };

  Exp.init();
};

export default Run;
