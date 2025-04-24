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
      ID: 'TP122d',
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
      const isGridView = document.querySelector('#r_content.grid_view');
      if (isGridView) {
        return false;
      }
      
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

      services.toggleTechDropdown();

      function hideEl(el) {
        if (el) {
          el.classList.add('TP122d-hide');
        }
      }
      function showEl(el) {
        if (el) {
          el.classList.remove('TP122d-hide');
        }
      }
      const layoutButtons = document.querySelector('.page-productGrid.feature-design .view_mode_buttons');
      if (layoutButtons) {
        layoutButtons.addEventListener('click', (e) => {
          const wrappers = document.querySelectorAll('.TP084_ProductInfo_Wrapper');
          const infoWrappers = document.querySelectorAll('.TP084_ProductInfo_Data_Wrap');
          const techWrappers = document.querySelectorAll('.TP122d-tech-specs');
          if (e.target.classList.contains('grid_button')) {
            // Grid
            for (let i = 0; wrappers.length > i; i += 1) {
              hideEl(wrappers[i]);
            }
            for (let i = 0; infoWrappers.length > i; i += 1) {
              hideEl(infoWrappers[i]);
            }
            for (let i = 0; techWrappers.length > i; i += 1) {
              hideEl(techWrappers[i]);
            }
          }
          if (e.target.classList.contains('list_button')) {
            // List
            for (let i = 0; wrappers.length > i; i += 1) {
              showEl(wrappers[i]);
            }
            for (let i = 0; infoWrappers.length > i; i += 1) {
              showEl(infoWrappers[i]);
            }
            for (let i = 0; techWrappers.length > i; i += 1) {
              showEl(techWrappers[i]);
            }
          }
        });
      }
      
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
        const newProducts = Exp.cache.bodyVar.querySelectorAll('.list_view #products .row .prod .tpPlpProductPanelComponent:not(.TP084_Product)');
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
            const productDropDown = newProducts[i].querySelector('select[id*="listProductVariants"]');
            
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
            div.insertAdjacentHTML('afterbegin', resp);

            const retrievedData = div.querySelector('#content #ProductDetail #prod_tabs .prod_content div');

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

            /**
             * Get and check the technical data
             */
            const techData = div.querySelector('#content #ProductDetail #prod_tabs #tab-techspecs');
            if (techData) {
              dataContainer.insertAdjacentHTML('afterend', `
                <div class="TP122d-tech-specs">
                  <div class="TP122d-tech-title">
                    <span class="TP122d-cog"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhBBoMAQdVjS46AAAEpUlEQVRo3s3Zy2tVVxQG8J/mYoKPJC2iNZCigoIT0ZKJbdRUHGakCE7tPyA4E8WgE5GKE6UgQtGpTivoIFa0ooiUooIgOFFji6KtQWpijKuDu+/tSc+5r6i9fmdyztrr8e2zX2vvTevosNcD8Z/ngb06ZuFtFjiUC155DrXubE7LFnP9qdsvfvRuhvQ7g8Z9NkP6UdAvhK05+VYh9Lden1ZRbue3OfnbTOkHIrDEgJ6c9MsG/+e/6DFgScvV1OWkECbsqcpKthtN3W0oZzGUSkZty/yHPSaEcFJXa+EvZPr2YSxzwOP0PeGiVTmbVS6mYOGR/Zbi+4yXC81TqIQ/Zb1LQrjujRBeOWunRTUtF9nprFdCmHRDCJesd6oVCpXwP5iD+S6nGow7qLupCnQ7aDxZXTYfc/zQLIWZ4WGBK147anErbWixo167YkH6bpJCPjwstLKl4BWstDDz1RSFUwXhPxwqFE7VUuhLxR8nfJlCuYp9xcVfC2H9RwsP64XwdZbTv+j1h04/G/Z3E67WWa1PH5544r7fmrCZ7yffmvSFv4oV9qShs6Cumw2Oe5hbih86bkNduwVpSO+pp1Seu67M6L9ZrHU+E/S5u+56npGct7aG5UJXqvNqXdwQXhcOvA7HTAthzAlbdFZLOm1xwpgQph0rXBNXei1cbxR+qUnhaEFJT5ojntltXqHtPLs9S2O9p6D8qPDGsvoE9gvjBbNejztCOFd1vcIOR4wadcQOK6p654Rwp4DCYuPCgXrhOzwSDhbILwjv7Evfw4WdcDiV7vNOuFDQEAeFx0q1CWwTXhUsOceESOF7nUkhp9x22mm3TSXJGb2JQgjHcn66vRK21yYwKpzNSdeaFs6BwdTVbhrMzOldBt1M3XMQnBOmC0bEWWE0H3iufsttFMLOXOl54Zke9BoTpowU/MaSEVPCmF70eCacz2ntFMImy/VX0sEOh7ystuRELt3YIITd4IwwZWPNP7jRlHAG7BYiNzUtqmZN4aVDOtg7oytdzDk9LoyZh2EhjKiHESEMY54x4XhO4+KMeHt5IFy11WabbS7I9R4KJ6pvN+v1YZTcFB6CE9W3LFYZMmTIVleFB4Swq6bDdULYghVCpC5WD4NCWIEtQlhXU3OXEOWOEDWVVoNrGMBbtxoSuOVt0r6W8VCEoPHOqA8vTCaX90w0JDDhXtKe9CJ5qINmCPxOcvlrw/CS1gDJ8j0JfHQ0IvCEtH7dwldN+fwqaZctn7w/gc91JpdrmtjbdFmTtDt93iyB2nnwffBNcllKbVsPA0pJ+5uMhyKkqG2fiNo+Fbd9MaKyHG9qz3KcRdsSkgq2tzslK3nc3qSUA+1Ny1nmTXs3Jlxv79bscHs3p23Ynn9SBxRtOaLJou2HVG0/pvsEDirbflSbp/C/H1ZnKfx7XH/DpFaP69+4blbH9VkK5ed7LLXfo2rW1OjC4rEDlqnMqy1fWJQp5K9sOmxr6spme2bBneWVTRnFl1Yb6xLYlJM3uLSqlxw89bRA+qgu6Xwa/rL+jrr1veF0DeKlTGkLKLVqYMy4biP6c1e3jBtr2d8s8EEvr2eDD3p9/w+WW1C9x1w+OQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wNC0yNlQxMjowMTowNyswMjowMAxaXEgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDQtMjZUMTI6MDE6MDcrMDI6MDB9B+T0AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="></span>
                    <p>View technical details</p>
                  </div>
                  <div class="TP122d-tech-data TP122d-hide">
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
      /**
       * Amend 2/10/18
       * Hide Tech dropdown on close of information dropdown
       */
      toggleTechDropdown() {
        const infoDropdown = document.querySelectorAll('#products .row .prod .TP084_ProductInfo_Wrapper');
        if (infoDropdown.length > 0) {
          infoDropdown.forEach((element) => {
            element.addEventListener('click', () => {
              const techRow = element.parentElement.querySelector('.TP122d-tech-specs');
              if (techRow) {
                techRow.classList.toggle('TP122d-hide-tech');
              }
            });
          });
        }
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
        addedMarkup.addEventListener('click', () => {
          // Send event
          events.send(`${Exp.settings.ID}`, 'Click', 'View Product Information', { sendOnce: true });
          // If datawrap has no children (previous AJAX has not occured), make request
          
          // If datawrap has no children (previous AJAX has not occured), make request
          if (dataWrap.children.length === 0 && !markupContainer.classList.contains('TP084_Requesting')) {
            // Add class to prevent multiple requests
            markupContainer.classList.toggle('TP084_Requesting');
            const productLink = productContainer.querySelector('.prod_info a').href;
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
          '.list_view #products .row .prod .tpPlpProductPanelComponent:not(.TP084_Product)', // All product Container - Without test content
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
        const techElements = document.querySelectorAll('.TP122d-tech-specs');
        // const hasEvent = document.querySelectorAll('.TP122d-tech-specs.TP122d-has-event');

        if (techElements.length > 0) {
          for (let i = 0; techElements.length > i; i += 1) {
            // if (techElements[i].classList.contains('TP122d-has-event')) {
            //   techElements[i].removeEventListener('click', () => {

            //   });
            // }
            techElements[i].addEventListener('click', (e) => {
              // Send event
              events.send(`${Exp.settings.ID}`, 'Click', 'View Technical Information', { sendOnce: true });

              const techData = techElements[i].querySelector('.TP122d-tech-data');
              if (techData) {
                techData.classList.toggle('TP122d-hide');
                techData.parentElement.classList.toggle('TP122d-toggle-tech');
              }
              const techTitle = techElements[i].querySelector('.TP122d-tech-title p');
              if (techTitle) {
                if (techTitle.textContent === 'View technical details') {
                  techTitle.textContent = 'Close technical details';
                } else {
                  techTitle.textContent = 'View technical details';
                }
              }
              techElements[i].classList.add('TP122d-has-event');
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
