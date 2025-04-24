import { fullStory, events } from '../../../../lib/utils';

/**
 * {{FL032}} - {{Guest Checkout Improvements}}
 */

// headerRebuild contains most of the setup as it will run across all pages of the test

const headerRebuild = () => {
  // Flannels ga configuration
  events.analyticsReference = '_gaUAT';
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL032',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;

      return {
        docVar,
        bodyVar,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { render } = Exp;
      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      render.headerText();
      // Send default running event
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
      setProgress() {
        // Sets styling class for header
        const pathName = window.location.pathname;
        const progressContainer = Exp.cache.bodyVar.querySelector('.FL032_Progress_Container');
        if (pathName.indexOf('/checkout/deliverychoices') > -1) {
          progressContainer.classList.add('FL032_Step_One');
          this.bindTestLaunch();
        } else if (pathName.indexOf('/checkout/yourdetails') > -1) {
          progressContainer.classList.add('FL032_Step_One');
        } else if (pathName.match(/(\/checkout\/usegiftcard|carddetails|usevoucher|payment|billingaddress)/g)) {
          progressContainer.classList.add('FL032_Step_Two');
        } else if (pathName.indexOf('/checkout/confirmandpay') > -1) {
          progressContainer.classList.add('FL032_Step_Three');
          // Add tracking to elements on confirm page
          Exp.bindExperimentEvents.addPayNowTracking();
        }
      },
      handleTestLaunch() {
        sessionStorage.setItem('FL032_Activate', 'FL032_Activate');
      },
      stopTestLaunch() {
        // Remove activation item from session storage
        sessionStorage.removeItem('FL032_Activate');
      },
      bindTestLaunch() {
        const allContinueButtons = Exp.cache.bodyVar.querySelectorAll('.AddressContainBut > input');
        for (let i = 0, n = allContinueButtons.length; i < n; i += 1) {
          const containingElement = allContinueButtons[i].parentNode;
          if (containingElement.classList.contains('NewAddressContainBut') || containingElement.classList.contains('DeliveryContinueButton')) {
            allContinueButtons[i].addEventListener('click', this.handleTestLaunch);
          } else {
            allContinueButtons[i].addEventListener('click', this.stopTestLaunch);
          }
        }
      },
    },
    render: {
      headerText() {
        // Create a new checkout progress header
        const currentHeader = Exp.cache.bodyVar.querySelector('#BodyWrap > header');
        // Using container fluid to use website styling wrap
        currentHeader.insertAdjacentHTML('beforeend', `
          <div class="FL032_Progress_Container">
            <div class="container-fluid">
              <span class="FL032_Progress_Step">1. Delivery</span>
              <span class="FL032_Progress_Step">2. Payment</span>
              <span class="FL032_Progress_Step">3. Confirm</span>
            </div>
          </div>
        `);
        // Set styling class for progress bar
        Exp.services.setProgress();
      },
    },
    bindExperimentEvents: {
      trackPayNow() {
        events.send(`${Exp.settings.ID} - ${Exp.settings.VARIATION}`, 'Clicked', 'Pay now', { sendOnce: true });
      },
      addPayNowTracking() {
        const payNowButtons = Exp.cache.bodyVar.querySelectorAll('[class*="ContinueButtonWrapper"] input');
        for (let i = 0, n = payNowButtons.length; i < n; i += 1) {
          payNowButtons[i].addEventListener('click', this.trackPayNow);
        }
      },
    },
  };

  Exp.init();
};

const deliveryMethods = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL032',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const currentAddressContainer = docVar.getElementById('CurrentAddress');
      const continueDesktop = docVar.getElementById('dnn_ctr102498_Delivery_btnContinue');
      const continueMobile = docVar.getElementById('dnn_ctr102498_Delivery_DeliveryGroupSelection_btnContinue');
      // Reassigned when markup is rendered
      let newDeliveryDetailsContainer;
      const allDeliveryOptions = bodyVar.querySelectorAll('#DeliveryOptionsList > li');

      return {
        docVar,
        bodyVar,
        currentAddressContainer,
        continueDesktop,
        continueMobile,
        newDeliveryDetailsContainer,
        allDeliveryOptions,
      };
    })(),
    init: () => {
      // Setup
      Exp.cache.bodyVar.classList.add('FL032_Delivery_Options');
      // Render markup, move elements
      Exp.cache.bodyVar.querySelector('.CheckoutLeft > .OrderSumm').insertAdjacentHTML('afterend', `
        <div class="FL032_Delivery_Address_Container">
          <span class="FL032_Delivery_Address_Header FL032_Desktop_Display">Your order will be delivered to:</span>
        </div>
      `);
      // Insert mobile header
      Exp.cache.currentAddressContainer.insertAdjacentHTML('afterbegin', `
      <span class="FL032_Delivery_Address_Header FL032_Mobile_Display">Deliver to: </span>
      `);
      Exp.cache.newDeliveryDetailsContainer = Exp.cache.bodyVar.querySelector('.FL032_Delivery_Address_Container');
      // Current Address
      Exp.cache.newDeliveryDetailsContainer.insertAdjacentElement('beforeend', Exp.cache.bodyVar.querySelector('.innerDelWrap > .CurrentAddressText'));
      // Edit Address
      Exp.cache.newDeliveryDetailsContainer.insertAdjacentElement('beforeend', Exp.cache.bodyVar.querySelector('.innerDelWrap > .DifferentAddressLinkWrapper'));
      // Edit text
      Exp.cache.docVar.getElementById('DifferentAddressLink').textContent = 'Change delivery details or billing address';
      // Edit standard delivery text and next day delivery text
      Exp.cache.bodyVar.querySelector('.DeliveryOptionsItem_STD .DeliveryOptionName').insertAdjacentHTML('beforeend', `
        <span class="FL032_Delivery_Option_Detail">(3 - 5 days)</span>
      `);
      // Render delivery prices
      for (let i = 0, n = Exp.cache.allDeliveryOptions.length; i < n; i += 1) {
        const currentPrice = Exp.cache.allDeliveryOptions[i].querySelector('.DeliveryOptionRadio').getAttribute('data-price');
        // Render desktop/tablet
        Exp.cache.allDeliveryOptions[i].querySelector('.RadioBut').insertAdjacentHTML('beforebegin', `
          <span class="FL032_Delivery_Option_Price FL032_Desktop_Display">£${currentPrice}</span>
        `);
        // Render Mobile
        Exp.cache.allDeliveryOptions[i].querySelector('.DeliveryNaming').insertAdjacentHTML('beforeend', `
        <span class="FL032_Delivery_Option_Price FL032_Mobile_Display">£${currentPrice}</span>
      `);
      }
      // Bind event listener to for storing data to both mobile and desktop
      Exp.cache.continueDesktop.addEventListener('click', Exp.bindExperimentEvents.storeDetails);
      Exp.cache.continueMobile.addEventListener('click', Exp.bindExperimentEvents.storeDetails);
      Exp.services.handleInitialRender();
      // Binds event listeners to test options to display/hide test accordingly
      Exp.bindExperimentEvents.handleTestDisplay();
    },
    services: {
      // Handle render of delivery option - if home delivery is not visible hide test content
      handleInitialRender() {
        if (Exp.cache.docVar.getElementById('HomeDeliveryWrapper').style.display.toUpperCase() === 'NONE') {
          Exp.cache.newDeliveryDetailsContainer.classList.add('FL032_Hide');
        }
      },
    },
    bindExperimentEvents: {
      storeDetails() {
        // Create an object to house data for session storage
        const FL032Details = {
          addressDetails: [],
          deliveryMethod: 'Standard Delivery',
        };
        // Loop through address conatiner, retrieve details and save in session storage
        const allDetailElements = Exp.cache.currentAddressContainer.querySelectorAll('span:not(.FL032_Delivery_Address_Header)');
        for (let i = 0, n = allDetailElements.length; i < n; i += 1) {
          FL032Details.addressDetails.push(allDetailElements[i].textContent.trim());
        }
        // If next day delivery class is active, update object
        if (Exp.cache.bodyVar.querySelector('.DeliveryOptionsItem_NDD.active')) {
          FL032Details.deliveryMethod = 'Next Day Delivery';
        }
        // Set session storage item, overwrite existing item if it exists
        sessionStorage.setItem('FL032_Data', JSON.stringify(FL032Details));
      },
      displayTest() {
        Exp.cache.newDeliveryDetailsContainer.classList.remove('FL032_Hide');
      },
      hideTest() {
        Exp.cache.newDeliveryDetailsContainer.classList.add('FL032_Hide');
      },
      handleTestDisplay() {
        const deliveryOptionList = Exp.cache.bodyVar.querySelectorAll('.deliveryGroupTypeLi');
        for (let i = 0, n = deliveryOptionList.length; i < n; i += 1) {
          if (deliveryOptionList[i].classList.contains('deliveryGroup_HomeDelivery')) {
            deliveryOptionList[i].addEventListener('click', this.displayTest);
          } else {
            deliveryOptionList[i].addEventListener('click', this.hideTest);
          }
        }
      },
    },
  };

  Exp.init();
};

const paymentOptions = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL032',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const orderSummary = bodyVar.querySelector('.CheckoutLeft > .OrderSumm');
      const FL032Data = JSON.parse(sessionStorage.getItem('FL032_Data'));
      const mobileDeliveryOrderSummary = docVar.getElementById('ShippingLabel');

      return {
        docVar,
        bodyVar,
        orderSummary,
        FL032Data,
        mobileDeliveryOrderSummary,
      };
    })(),
    init: () => {
      // Setup
      Exp.cache.bodyVar.classList.add('FL032_Payment_Options');
      Exp.components.setupElements();
    },
    components: {
      setupElements() {
        Exp.render.orderDetails();
        Exp.render.addMobileElements();
      },
    },
    render: {
      orderDetails() {
        // Insert container for delivery details
        const { addressDetails } = Exp.cache.FL032Data;
        Exp.cache.orderSummary.insertAdjacentHTML('afterend', `
        <div class="FL032_Delivery_Address_Container">
          <span class="FL032_Delivery_Address_Header FL032_Mobile_Display">Deliver to: </span>
          <span class="FL032_Delivery_Address_Header FL032_Desktop_Display">Your order will be delivered to:</span>
          <a href="/checkout/yourdetails" class="FL032_Change_Option FL032_Change_Address">Change delivery details or billing address</a>
        </div>
      `);
        // Loop through address details and create markup
        const deliveryDetailsHeader = Exp.cache.bodyVar.querySelector('.FL032_Delivery_Address_Header.FL032_Desktop_Display');
        for (let i = addressDetails.length - 1; i >= 0; i -= 1) {
          deliveryDetailsHeader.insertAdjacentHTML('afterend', `
            <span class="FL032_Address_Detail">${addressDetails[i]}</span>
          `);
        }
        // Insert selected delivery option
        deliveryDetailsHeader.parentNode.insertAdjacentHTML('afterend', `
        <div class="FL032_Delivery_Option_Container FL032_Desktop_Display">
          <span class="FL032_Delivery_Option">${Exp.cache.FL032Data.deliveryMethod}</span>
          <a href="/checkout/deliverychoices" class="FL032_Change_Option FL032_Change_Delivery FL032_Desktop_Display">Change delivery method</a>
        </div>
        `);
      },
      addMobileElements() {
        // Chosen delivery option
        Exp.cache.mobileDeliveryOrderSummary.insertAdjacentHTML('beforebegin', `
          <span class="FL032_Selected_Delivery_Option FL032_Mobile_Display">${Exp.cache.FL032Data.deliveryMethod}</span>
        `);
        // Link to change delivery option
        Exp.cache.mobileDeliveryOrderSummary.insertAdjacentHTML('afterend', `
          <a href="/checkout/deliverychoices" class="FL032_Change_Option FL032_Change_Delivery FL032_Mobile_Display">(Change)</a>
        `);
      },
    },
  };

  Exp.init();
};

const confirmationPage = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL032',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const billingAddressContainer = bodyVar.querySelector('.DelPayGroup .col-sm-6:nth-child(2) .InnerConfirm.FirstConfirm');
      const deliveryAddressContainer = bodyVar.querySelector('.DelPayGroup .col-sm-6:nth-child(1) .InnerConfirm.FirstConfirm');
      const deliveryOptionContainer = bodyVar.querySelector('.DelPayGroup .col-sm-6:nth-child(1) .InnerConfirm:last-child');
      const orderSummary = bodyVar.querySelector('.CheckoutLeft > .OrderSumm');
      // Next line exceeds length
      // eslint-disable-next-line
      const detailElementArray = [deliveryAddressContainer, deliveryOptionContainer];
      return {
        docVar,
        bodyVar,
        orderSummary,
        detailElementArray,
        billingAddressContainer,
      };
    })(),
    init: () => {
      // Setup
      Exp.cache.bodyVar.classList.add('FL032_Confirmation_Page');
      Exp.components.setupElements();
    },
    components: {
      setupElements() {
        // If not on mobile (based on datalayer) then rearrange the page, else do not
        if (window.dataLayer[1].isMobile.toUpperCase() === 'FALSE') {
          Exp.render.rearrangePage();
        }
      },
    },
    render: {
      rearrangePage() {
        // Insert container for elements to move
        Exp.cache.orderSummary.insertAdjacentHTML('afterend', `
          <div class="FL032_Summary_Details_Container"></div>
        `);
        const FL032DetailsSummaryContainer = Exp.cache.bodyVar.querySelector('.FL032_Summary_Details_Container');
        // Move elements
        for (let i = Exp.cache.detailElementArray.length - 1; i >= 0; i -= 1) {
          FL032DetailsSummaryContainer.insertAdjacentElement('afterbegin', Exp.cache.detailElementArray[i]);
        }
        // Move billing address under payment area (sibling elements)
        Exp.cache.billingAddressContainer.parentNode.insertAdjacentElement('beforeend', Exp.cache.billingAddressContainer);
      },
    },
  };

  Exp.init();
};

export { headerRebuild, deliveryMethods, paymentOptions, confirmationPage };
