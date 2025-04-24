import { setup } from './services';
import { events } from '../../../../../lib/utils';
import { countdown } from '../../../../../lib/uc-lib';
import settings from './settings';

/**
 * {{PD041}} - {{Product Page Uphaul}}
 */

const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const productImageContainer = bodyVar.querySelector('.mainImageHolder');
      const exVatDetail = docVar.getElementById('variant-price-header').textContent.trim();
      const exVATText = `${exVatDetail} ${bodyVar.querySelector('.price_details').textContent.trim()}`;
      const incVATText = docVar.getElementById('variant-grossPrice-header').textContent.trim();
      const CSRFToken = bodyVar.querySelector('[name="CSRFToken"]').value;
      const quantityState = {
        exVAT: parseFloat(exVatDetail.replace(/£/g, '')),
        incVAT: parseFloat(incVATText.replace(/£/g, '').replace(/ inc\. VAT/, '')),
      };
      const headerItemCount = bodyVar.querySelector('#minicart_data .items');
      const headerTotal = bodyVar.querySelector('#minicart_data .total');
      // Reassigned when markup renders
      let tabsContainer;
      let rightContainerArea;
      let updateExVat;
      let updateIncVat;
      let singleOption;
      let allInputs;
      let allPlus;
      let allMinus;
      let addtoBagButton;
      let addtoBagMessage;
      let addMessageContainer;
      let ATBMessageText;
      let brandErrorContainer;
      // Reassigned when requests are initialised
      // eslint-disable-next-line
      let requestData = [];
      // Tracks requests, updated on request success
      // eslint-disable-next-line
      let requestCounter = 0;
      // Prevent multiple requests
      // eslint-disable-next-line
      let allowRequests = true;
      // Track number of requests to be made
      // eslint-disable-next-line
      let totalRequests = 0;
      return {
        docVar,
        bodyVar,
        productImageContainer,
        exVATText,
        incVATText,
        tabsContainer,
        rightContainerArea,
        updateExVat,
        updateIncVat,
        singleOption,
        quantityState,
        allInputs,
        allPlus,
        allMinus,
        requestData,
        CSRFToken,
        requestCounter,
        allowRequests,
        totalRequests,
        addtoBagButton,
        addtoBagMessage,
        addMessageContainer,
        ATBMessageText,
        headerItemCount,
        headerTotal,
        brandErrorContainer,
      };
    })(),
    init: () => {
      setup();
      Exp.render.markup();
      Exp.render.rightContainer();
      Exp.render.bottomContainer();
    },
    services: {
    },
    render: {
      // Render small sections of markup around the page
      markup: () => {
        // Insert price next to title
        Exp.cache.bodyVar.querySelector('.catBanner').insertAdjacentHTML('beforeend', `
        <div class="PD041_Upper_Price_Container">
          <span class="PD041_ExVat_Price">${Exp.cache.exVATText}</span>
          <span class="PD041_IncVat_Price">${Exp.cache.incVATText}</span>
        </div>
        `);
        // If there is only one image then restyle the carousel
        if (Exp.cache.bodyVar.querySelectorAll('#carousel_alternate .thumb').length === 1) {
          Exp.cache.productImageContainer.classList.add('PD041_Thumbnail_Hide');
        } else {
          Exp.cache.productImageContainer.classList.add('PD041_Thumbnail_Restyle');
          // Move the main image above carousel thumbnails
          Exp.cache.productImageContainer.insertAdjacentElement('afterbegin', Exp.cache.bodyVar.querySelector('.mainImageHolder > .span-5'));
        }
      },
      rightContainer() {
        // The product container on the right, after main image
        Exp.cache.productImageContainer.insertAdjacentHTML('afterend', `
          <div class="PD041_Product_Detail_Area">
            <div class="PD041_Brand_Code_Container">
              <span class="PD041_Brand_Name">Brand: <span class="PD041_Underline">${Exp.cache.bodyVar.querySelector('.prod > h3 > a').textContent.trim()}</span></span>
              <span class="PD041_Product_Code">Product ${Exp.cache.bodyVar.querySelector('.code').textContent.trim()}</span>
            </div>
            <div class="PD041_Information_Tabs_Container PD041_Overview_Active">
              <span class="PD041_Tab_Header PD041_Overview_Tab_Header">Overview</span>
              <span class="PD041_Tab_Header PD041_Details_Tab_Header">Product Details</span>
              <div class="PD041_Tab_Content PD041_Overview_Content">
                <p class="PD041_Tab_Text">${Exp.cache.bodyVar.querySelector('.prod > p').textContent.trim()}</p>
                <div class="PD041_Overview_More_Information_Container">
                  <span class="PD041_More_Information">More info</span>
                </div>
              </div>
              <div class="PD041_Tab_Content PD041_Details_Content">
                ${Exp.cache.docVar.getElementById('tab-details').innerHTML}
              </div>
            </div>
          </div>
        `);
        // Store Selectors
        Exp.cache.tabsContainer = Exp.cache.bodyVar.querySelector('.PD041_Information_Tabs_Container');
        // Check if brand logo exists, if so then add markup
        if (Exp.cache.bodyVar.querySelector('.brandlogo_datasheets > a > img')) {
          const moreInformationContainer = Exp.cache.bodyVar.querySelector('.PD041_Overview_More_Information_Container');
          moreInformationContainer.insertAdjacentElement('beforeend', Exp.cache.bodyVar.querySelector('.brandlogo_datasheets > a > img'));
          // Add styling class
          moreInformationContainer.classList.add('PD041_Info_Logo');
        }
        // Add tab functionality
        Exp.cache.bodyVar.querySelector('.PD041_Overview_Tab_Header').addEventListener('click', () => {
          Exp.cache.tabsContainer.classList.add('PD041_Overview_Active');
          Exp.cache.tabsContainer.classList.remove('PD041_Details_Active');
        });
        Exp.cache.bodyVar.querySelector('.PD041_Details_Tab_Header').addEventListener('click', () => {
          Exp.cache.tabsContainer.classList.remove('PD041_Overview_Active');
          Exp.cache.tabsContainer.classList.add('PD041_Details_Active');
          // Send event
          events.send(`${settings.ID}`, 'Clicked', 'Product Details Tab', { sendOnce: true });
        });
        Exp.cache.bodyVar.querySelector('.PD041_More_Information').addEventListener('click', () => {
          Exp.cache.tabsContainer.classList.remove('PD041_Overview_Active');
          Exp.cache.tabsContainer.classList.add('PD041_Details_Active');
        });
        Exp.cache.rightContainerArea = Exp.cache.bodyVar.querySelector('.PD041_Product_Detail_Area');
        // Move data sheets if they exist
        const allDataSheets = Exp.cache.bodyVar.querySelectorAll('.addMyDataicon > a');
        if (allDataSheets.length !== 0) {
          Exp.cache.rightContainerArea.insertAdjacentHTML('beforeend', `
            <div class="PD041_Data_Sheet_Container">
            </div>
          `);
          const dataSheetContainer = Exp.cache.bodyVar.querySelector('.PD041_Data_Sheet_Container');
          for (let i = 0, n = allDataSheets.length; i < n; i += 1) {
            dataSheetContainer.insertAdjacentElement('beforeend', allDataSheets[i]);
          }
          // Datasheets should always be the first child
          if (allDataSheets[0].textContent.trim().toUpperCase() === 'DATASHEET') {
            allDataSheets[0].addEventListener('click', () => {
              events.send(`${settings.ID}`, 'Clicked', 'Data Sheet', { sendOnce: true });
            });
          }
        }
        // Price area
        Exp.cache.rightContainerArea.insertAdjacentHTML('beforeend', `
          <div class="PD041_Price_Container">
            <div class="PD041_Price_Area">
              <span class="PD041_ExVat_Price">${Exp.cache.exVATText}</span>
              <span class="PD041_IncVat_Price">${Exp.cache.incVATText}</span>
            </div>
          </div>
        `);
        // If there are quantity discounts, insert additional markup
        if (Exp.cache.bodyVar.querySelector('#variant-quant_disc .price')) {
          const discountContainer = Exp.cache.docVar.getElementById('variant-quant_disc');
          // Toggle styling class
          const priceArea = Exp.cache.bodyVar.querySelector('.PD041_Price_Container');
          priceArea.classList.add('PD041_Discounts');
          const discountThreshold = discountContainer.querySelector('.quantity').textContent.trim();
          priceArea.insertAdjacentHTML('beforeend', `
            <div class="PD041_Discount_Area">
              <span class="PD041_Discount_Title">Order ${discountThreshold} For a discounted price per item!</span>
              <span class="PD041_Discount_Details">${discountThreshold} items: ${discountContainer.querySelector('.price').textContent.trim()} ${discountContainer.querySelector('.saving').textContent.trim()}</span>
            </div>
          `);
        }
        // Render Add to bag area
        this.addToBagArea();
        // Set countdown timer
        Exp.cache.rightContainerArea.insertAdjacentHTML('beforeend', `
        <div class="PD041_Free_Delivery_Container">
          <div class="PD041_Countdown_Container">
            <span class="PD041_Countdown_Text">Get it </span><div id="PD041_Delivery_Day"></div><span class="PD041_Countdown_Text"> if you order in the next<br /></span>
            <div id="PD041_Countdown"></div>
          </div>
          <div class="PD041_Free_Delivery_Text_Container">
            <span class="PD041_Free_Delivery_Text">Free next day delivery on orders over £25</span>
          </div>
        </div>
        `);

        let cutoff = new Date();
        cutoff.setUTCHours(17, 0, 0);
        cutoff = cutoff.getTime();

        // Configure the countdown function
        countdown({
          cutoff,
          element: '#PD041_Countdown',
          delivery: {
            deliveryDays: 1, // How long an item takes to arrive
            excludeDays: ['Saturday', 'Sunday'], // Non-working days built from the above code
            deliveryDayElement: '#PD041_Delivery_Day',
            tomorrowLabel: true,
          },
        });
      },
      addToBagArea: () => {
        // Check for branding
        const brandProduct = Exp.cache.bodyVar.querySelector('.branding > label');
        // Render container
        Exp.cache.rightContainerArea.insertAdjacentHTML('beforeend', `
        <div class="PD041_Add_To_Bag_Container">
          <div class="PD041_Options_Wrap">
            <div class="PD041_Branding_Error">
              <span class="PD041_Branding_Error_Message">Please select a quantity to continue to branding options</span>
            </div>
            <div class="PD041_Options_Area">
              <div class="PD041_Options_Headers">
                <span class="PD041_Option_Header">Quantity</span>
                <span class="PD041_Option_Header">Price (ex. VAT)</span>
              </div>
            </div>
          </div>
          <div class="PD041_Update_Price_Container">
            <span class="PD041_ExVat_Total">Total: £<span class="PD041_Total_Update_ExVat"></span> (ex vat)</span>
            <span class="PD041_IncVat_Total">Total: £<span class="PD041_Total_Update_IncVat"></span> (inc. vat)</span>
          </div>
          <span class="PD041_Add_To_Bag_Button">
            <span class="PD041_ATB_Text">Add to basket</span>
          </span>
          <div class="PD041_Basket_Message_Container">
            <span class="PD041_Basket_Message">Added to basket</span>
          </div>
        </div>
        `);
        const optionsArea = Exp.cache.bodyVar.querySelector('.PD041_Options_Area');
        if (!Exp.cache.docVar.getElementById('variant')) {
          const productCode = Exp.cache.bodyVar.querySelector('[name="productCodePost"]').value;
          // Add single option
          optionsArea.classList.add('PD041_Single_Option');
          let optionMarkup = `
            <div class="PD041_Option_Row_Container">
                  <div class="PD041_Option_Wrap">
                    <span class="PD041_Minus">-</span>
                    <input type="text" class="PD041_Input" value="0" pd041-code="${productCode}" />
                    <span class="PD041_Plus">+</span>
                  </div>
                <div class="PD041_Option_Price PD041_Detail_Side">
                  <span class="PD041_Option_ExVat">£${Exp.cache.quantityState.exVAT}</span>
                </div>
              </div>
            `;
          if (brandProduct) {
            optionMarkup = `
            <div class="PD041_Option_Row_Container">
                <div class="PD041_Option_Wrap">
                  <span class="PD041_Minus">-</span>
                  <input type="text" class="PD041_Input" value="0" pd041-code="${productCode}" />
                  <span class="PD041_Plus">+</span>
                </div>
              <div class="PD041_Option_Price PD041_Detail_Side">
                <span class="PD041_Option_ExVat">£${Exp.cache.quantityState.exVAT}</span>
              </div>
              <div class="PD041_Branding_Container">
                <span class="PD041_Branding_Button">Brand This Product</span>
              </div>
            </div>
            `;
          }
          optionsArea.insertAdjacentHTML('beforeend', optionMarkup);
        } else {
          // Insert header
          Exp.cache.bodyVar.querySelector('.PD041_Options_Headers').insertAdjacentHTML('afterbegin', `
            <span class="PD041_Option_Header">Options</span>
          `);
          // Iterate over price options and create individual quantity areas
          const allOptions = Exp.cache.bodyVar.querySelectorAll('#variant > option');
          for (let i = 0, n = allOptions.length; i < n; i += 1) {
            const currentItem = allOptions[i];
            const currentText = currentItem.textContent.trim();
            const currentValue = currentItem.value;
            // parse data from quantity inputs
            const optionText = currentText.substring(0, currentText.indexOf(','));
            const optionCode = currentValue.substring(currentValue.indexOf('code') + 5, currentValue.indexOf(';'));
            const optionPrice = currentText.substring(currentText.indexOf('£'));
            let optionMarkUp = `
            <div class="PD041_Option_Row_Container">
              <div class="PD041_Option_Detail PD041_Detail_Side">
                <span class="PD041_Option_Detail_Text">${optionText}</span>
              </div>
              <div class="PD041_Option_Wrap">
                <span class="PD041_Minus">-</span>
                <input type="text" class="PD041_Input" value="0" pd041-code="${optionCode}" />
                <span class="PD041_Plus">+</span>
              </div>
              <div class="PD041_Option_Price PD041_Detail_Side">
                <span class="PD041_Option_ExVat">${optionPrice}</span>
              </div>
            </div>
          `;
            if (brandProduct) {
              optionMarkUp = `
              <div class="PD041_Option_Row_Container">
                <div class="PD041_Option_Detail PD041_Detail_Side">
                  <span class="PD041_Option_Detail_Text">${optionText}</span>
                </div>
                <div class="PD041_Option_Wrap">
                  <span class="PD041_Minus">-</span>
                  <input type="text" class="PD041_Input" value="0" pd041-code="${optionCode}" />
                  <span class="PD041_Plus">+</span>
                </div>
                <div class="PD041_Option_Price PD041_Detail_Side">
                  <span class="PD041_Option_ExVat">${optionPrice}</span>
                </div>
                <div class="PD041_Branding_Container">
                  <span class="PD041_Branding_Button">Brand This Product</span>
                </div>
              </div>
            `;
            }
            optionsArea.insertAdjacentHTML('beforeend', optionMarkUp);
          }
        }
        if (brandProduct) {
          Exp.cache.brandErrorContainer = $('.PD041_Branding_Error');
          optionsArea.classList.add('PD041_Product_Branding');
          // Add event handlers to branding
          const allBranding = Exp.cache.bodyVar.querySelectorAll('.PD041_Branding_Button');
          for (let i = 0, n = allBranding.length; i < n; i += 1) {
            allBranding[i].addEventListener('click', (e) => {
              if (e.target.classList.contains('PD041_Branding_Button')) {
                // Send event
                events.send(`${settings.ID}`, 'Clicked', 'Brand This Item', { sendOnce: true });
                // Prevent adding to bag
                Exp.cache.allowRequests = false;
                const detailElement = e.target.parentNode.parentNode.querySelector('.PD041_Input');
                const brandingQuantity = parseInt(detailElement.value, 10);
                // Check if branding option is a valid number, if not show error message
                // eslint-disable-next-line
                if (!isNaN(brandingQuantity)) {
                  const brandURL = `${window.location.href}?CSRFToken=${Exp.cache.CSRFToken}&wantBranding=true&productCodePost=${detailElement.getAttribute('pd041-code')}&qty=${brandingQuantity}`;
                  window.location.href = brandURL;
                } else {
                  // Allow add to bag
                  Exp.cache.allowRequests = true;
                  Exp.cache.brandErrorContainer.slideDown();
                }
              }
            });
          }
        }
        Exp.handlePriceUpdate.initialisePriceUpdate();
        // Store selectors
        // Bind event handler to add to bag button
        Exp.cache.addtoBagButton = Exp.cache.bodyVar.querySelector('.PD041_Add_To_Bag_Button');
        Exp.cache.ATBMessageText = Exp.cache.bodyVar.querySelector('.PD041_ATB_Text');
        Exp.cache.addMessageContainer = Exp.cache.bodyVar.querySelector('.PD041_Basket_Message_Container');
        Exp.cache.addtoBagMessage = Exp.cache.bodyVar.querySelector('.PD041_Basket_Message');
        Exp.cache.addtoBagButton.addEventListener('click', Exp.handleRequests.initialiseRequest);
      },
      // Related products and discover more section
      bottomContainer: () => {
        // Add container
        Exp.cache.bodyVar.querySelector('#productDetailUpdateable .span-6.last').insertAdjacentHTML('afterend', `
          <div class="PD041_Related_Details_Area">
            <div class="PD041_Related_Products_Container">
              <h3 class="PD041_Related_Product_Title">Related Items:</h3>
            </div>
            <div class="PD041_Discover_More_Container">
              <h3 class="PD041_Discover_More_Title">Discover More:</h3>
                <div class="PD041_Discover_More_Link_Container"></div>
            </div>
          </div>
        `);
        // Move related products if they exist
        const relatedProducts = Exp.cache.bodyVar.querySelector('#tab-relatedItems .jcarousel');
        if (relatedProducts) {
          Exp.cache.bodyVar.querySelector('.PD041_Related_Products_Container').insertAdjacentElement('beforeend', relatedProducts);
          Exp.cache.bodyVar.querySelector('.PD041_Related_Details_Area').classList.add('PD041_Related_Products');
        }
        // Use breadcrumbs to build discover more area
        const allBreadCrumbs = Exp.cache.bodyVar.querySelectorAll('#breadcrumb li:not(.active) a');
        const discoverMoreContainer = Exp.cache.bodyVar.querySelector('.PD041_Discover_More_Link_Container');
        for (let i = 1, n = allBreadCrumbs.length; i < n; i += 1) {
          const currentLink = allBreadCrumbs[i];
          discoverMoreContainer.insertAdjacentHTML('beforeend', `
            <a href="${currentLink.getAttribute('href')}" class="PD041_Discover_More_Link">${currentLink.textContent.replace(/>/g, '').trim()}</a>
          `);
        }
      },
    },
    handlePriceUpdate: {
      updateQuantity: () => {
        let totalItems = 0;
        for (let i = 0, n = Exp.cache.allInputs.length; i < n; i += 1) {
          const currentInput = parseInt(Exp.cache.allInputs[i].value, 10);
          // Unexpected use of isNaN
          // eslint-disable-next-line
          if (!isNaN(currentInput)) {
            if (currentInput >= 0) {
              totalItems += currentInput;
            }
          }
        }
        const exVATVal = totalItems * Exp.cache.quantityState.exVAT;
        const incVATVal = totalItems * Exp.cache.quantityState.incVAT;
        // Render values
        Exp.cache.updateExVat.textContent = exVATVal.toFixed(2);
        Exp.cache.updateIncVat.textContent = incVATVal.toFixed(2);
      },
      incrementQuantity(updateInput) {
        const inputEl = updateInput;
        let tempVal = parseInt(updateInput.value, 10);
        tempVal += 1;
        inputEl.value = tempVal;
        this.updateQuantity();
      },
      decrementQuantity(updateInput) {
        const inputEl = updateInput;
        let tempVal = parseInt(updateInput.value, 10);
        tempVal -= 1;
        if (tempVal >= 0) {
          inputEl.value = tempVal;
          this.updateQuantity();
        }
      },
      initialisePriceUpdate() {
        // Store Selectors
        Exp.cache.updateExVat = Exp.cache.bodyVar.querySelector('.PD041_Total_Update_ExVat');
        Exp.cache.updateIncVat = Exp.cache.bodyVar.querySelector('.PD041_Total_Update_IncVat');
        Exp.cache.allInputs = Exp.cache.bodyVar.querySelectorAll('.PD041_Input');
        Exp.cache.allMinus = Exp.cache.bodyVar.querySelectorAll('.PD041_Minus');
        Exp.cache.allPlus = Exp.cache.bodyVar.querySelectorAll('.PD041_Plus');
        // Add event handlers
        for (let i = 0, n = Exp.cache.allInputs.length; i < n; i += 1) {
          Exp.cache.allInputs[i].addEventListener('change', (e) => {
            Exp.handlePriceUpdate.updateQuantity(e.target);
          });
          Exp.cache.allMinus[i].addEventListener('click', () => {
            Exp.handlePriceUpdate.decrementQuantity(Exp.cache.allInputs[i]);
          });
          Exp.cache.allPlus[i].addEventListener('click', () => {
            // Send event
            events.send(`${settings.ID}`, 'Clicked', 'QTY increase button', { sendOnce: true });
            Exp.handlePriceUpdate.incrementQuantity(Exp.cache.allInputs[i]);
          });
        }
        // Render intial values
        this.updateQuantity();
      },
    },
    handleRequests: {
      // Adds styling classes, controls add to bag message sliding and controls button text
      displayMessage: (incomingMessage, incomingClass) => {
        Exp.cache.addMessageContainer.classList.add(incomingClass);
        Exp.cache.addtoBagMessage.textContent = incomingMessage;
        $(Exp.cache.addMessageContainer).slideDown(() => {
          // Wait 3 seconds before hiding message
          setTimeout(() => {
            $(Exp.cache.addMessageContainer).slideUp(() => {
              Exp.cache.ATBMessageText.textContent = 'Add to basket';
              Exp.cache.addMessageContainer.classList.remove(incomingClass);
              Exp.cache.allowRequests = true;
              Exp.cache.addtoBagButton.classList.remove('PD041_Disable');
            });
          }, 3000);
        });
      },
      endRequests: (retrievedData) => {
        // Display Success Message
        Exp.handleRequests.displayMessage('Added Successfully', 'PD041_Success');
        // Reset quantity values
        for (let i = 0, n = Exp.cache.allInputs.length; i < n; i += 1) {
          Exp.cache.allInputs[i].value = 0;
        }
        // Reset prices
        Exp.handlePriceUpdate.updateQuantity();
        // Update header details, reveal minicart
        const basketData = JSON.parse(retrievedData);
        Exp.cache.headerItemCount.textContent = basketData.cartData.products.length;
        Exp.cache.headerTotal.textContent = `£${basketData.cartData.total}`;
      },
      initialiseRequest: () => {
        // Check if request is currently happening if not then proceed
        if (Exp.cache.allowRequests) {
          // Clear request data and reset counter
          Exp.cache.requestCounter = 0;
          Exp.cache.requestData = [];
          // Iterate over all inputs
          // create request data if product quantity is a valid number and greater than 0
          for (let i = 0, n = Exp.cache.allInputs.length; i < n; i += 1) {
            const currentInputEl = Exp.cache.allInputs[i];
            const currentInputVal = parseInt(currentInputEl.value, 10);
            // eslint-disable-next-line
            if (!isNaN(currentInputVal) && currentInputVal > 0 ) {
              const requestString = `CSRFToken=${Exp.cache.CSRFToken}&productCodePost=${currentInputEl.getAttribute('pd041-code')}&qty=${currentInputVal}`;
              Exp.cache.requestData.push(requestString);
            }
          }
          Exp.cache.totalRequests = Exp.cache.requestData.length - 1;
          if (Exp.cache.requestData.length > 0) {
            // Prevent multiple requests
            Exp.cache.allowRequests = false;
            // Make button appear unusable
            Exp.cache.addtoBagButton.classList.add('PD041_Disable');
            // Update button text
            Exp.cache.ATBMessageText.textContent = 'One Moment';
            Exp.handleRequests.recursiveRequest();
            // Slideup Branding error message
            if (Exp.cache.brandErrorContainer) {
              Exp.cache.brandErrorContainer.slideUp();
            }
          }
        }
      },
      // Recursive function to post data to add to cart
      recursiveRequest: () => {
        const addToBagRequest = new XMLHttpRequest();
        addToBagRequest.open('POST', '/cart/add', true);
        addToBagRequest.onload = () => {
          if (addToBagRequest.status >= 200 && addToBagRequest.status < 400) {
            Exp.cache.requestCounter += 1;
            // Make next request
            if (Exp.cache.totalRequests >= Exp.cache.requestCounter) {
              Exp.handleRequests.recursiveRequest();
            // End requests
            } else {
              // Use response JSON to update the minicart header
              Exp.handleRequests.endRequests(addToBagRequest.responseText);
            }
          } else {
            Exp.handleRequests.displayMessage('There was an error, please try again', 'PD041_Error');
          }
        };
        addToBagRequest.onerror = () => {
          Exp.handleRequests.displayMessage('There was an error, please try again', 'PD041_Error');
        };
        addToBagRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        addToBagRequest.send(Exp.cache.requestData[Exp.cache.requestCounter]);
      },
    },
  };

  Exp.init();
};

export default Run;
