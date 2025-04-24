import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

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
      ID: 'TP084',
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
        const newProducts = Exp.cache.bodyVar.querySelectorAll('.advanced_plp_product_item:not(.TP084_Product)');
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
          }
        }
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
            div.insertAdjacentHTML('afterbegin', resp);
            const retrievedData = div.querySelector('.tp_detOverview');
            // Check if data exists
            if (retrievedData) {
              // Render data, toggle class and slidedown container
              dataContainer.insertAdjacentElement('afterbegin', retrievedData);
              productMarkupContainer.classList.toggle('TP084_Closed');
              productMarkupContainer.classList.toggle('TP084_Open');
              animationContainer.slideDown();
              // Scroll to opened data wrap
              $('html, body').animate({ scrollTop: animationContainer.offset().top - 250 });
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
          <p class="TP084_ProductInfo_Text"><span class="TP084_View_ProductInfo">View</span><span class="TP084_Close_ProductInfo">Close</span> Product Information</p>
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
        addedMarkup.addEventListener('click', () => {
          console.log('clicked');
          // Send event
          events.send(`${Exp.settings.ID}`, 'Click', 'View Product Information', { sendOnce: true });
          // If datawrap has no children (previous AJAX has not occured), make request
          if (dataWrap.children.length === 0) {
            const productLink = productContainer.querySelector('.product_item_header > .product_item_img').href;
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
            // Data wrap has content visible, hide them
          } else if (markupContainer.classList.contains('TP084_Open')) {
            markupContainer.classList.toggle('TP084_Closed');
            markupContainer.classList.toggle('TP084_Open');
            animateDataWrap.slideUp();
          }
        });
      },
      handleShowMore() {
        // Poll for missing items, call service to find new product
        Exp.cache.showMoreButton.addEventListener('click', this.detectNewProducts);
      },
      detectNewProducts() {
        pollerLite([
          '.advanced_plp_product_item:not(.TP084_Product)', // All product Container - Without test content
        ], () => {
          Exp.services.findNewProducts();
        });
      },
      dropDownChange(dropdownSelector) {
        dropdownSelector.addEventListener('change', this.detectNewProducts);
      },
    },
  };

  Exp.init();
};

export default Run;
