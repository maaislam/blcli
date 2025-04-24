import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';
import flicker from './flickerprevention';

/**
 * {{PD032}} - {{Mobile Checkout Redesign}}
 */

const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'PD032',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const pathName = window.location.pathname.toUpperCase();

      // Selectors assigned later on

      let oldHeader;
      let pageContentContainer;
      let backButton;
      let addAddressFormContainer;

      return {
        docVar,
        bodyVar,
        oldHeader,
        pageContentContainer,
        backButton,
        addAddressFormContainer,
        pathName,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      services.tracking();
      services.pageCheck();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
      pageCheck: () => {
        // Call the correct content builder
        if (Exp.cache.pathName.indexOf('/CHOOSE-DELIVERY-ADDRESS') > -1) {
          Exp.addressPage.addressPagePoll();
        } else if (Exp.cache.pathName.indexOf('/ADD-DELIVERY-ADDRESS') > -1 || Exp.cache.pathName.indexOf('/EDIT-DELIVERY-ADDRESS') > -1) {
          flicker();
          Exp.addAddressPage.addAddressPagePoll();
        } else if (Exp.cache.pathName.indexOf('/CHOOSE-DELIVERY-METHOD') > -1) {
          flicker();
          Exp.deliveryMethod.deliveryMethodPoll();
        } else if (Exp.cache.pathName.indexOf('/SUMMARY') > -1 || Exp.cache.pathName.indexOf('/PLACEORDER') > -1) {
          flicker();
          Exp.checkoutSummary.checkoutsummaryPoll();
        }
      },
      removeFlicker: () => {
        const hide = document.getElementById(`${Exp.settings.ID}_flickerPrevention`);
        if (hide) {
          hide.parentElement.removeChild(hide);
        }
      },
      addStepNumbers: () => {
        // Prepend number to header text
        const allHeaders = Exp.cache.bodyVar.querySelectorAll('.container_12 .ui-collapsible-heading .ui-collapsible-heading-toggle');
        for (let i = 0; i < allHeaders.length; i += 1) {
          // Using node value as 'click to expand contents' text exists
          allHeaders[i].textContent = `${i + 1}. ${allHeaders[i].childNodes[0].nodeValue}`;
        }
      },
      editViewBag: () => {
        // Change view/hide bag button text, using current toggle system
        Exp.cache.bodyVar.querySelector('#orderDetailsToDisplayFlag > .view').textContent = 'View Bag';
        Exp.cache.bodyVar.querySelector('#orderDetailsToDisplayFlag > .hide').textContent = 'Hide Bag';
      },

    },
    // Header is across all checkout pages, includes progress bar and back button
    checkoutHeader: {
      // Poll for header elements
      headerPoll() {
        poller([
          '#header_container', '#content', '.titlePanel .ui-title-bar > a',
        ], this.renderHeader);
      },
      // Build header
      renderHeader() {
        // Insert header markup
        Exp.cache.oldHeader = Exp.cache.docVar.getElementById('header_container');
        Exp.cache.oldHeader.insertAdjacentHTML('afterend', `
        <div class="PD032_Header">
          <a class="PD032-Header-Home-Link" href="/">
            <img class="PD032_Header_Image" alt="Protec Direct Logo" src="//sitegainer.com/fu/up/mei2jto6rm9040u.png" />
          </a>
          <p class="PD032_Header_Text">Need help? <br />Call us on 0870 333 3081</p>
        </div>
        `);
        // Insert progress bar
        Exp.cache.pageContentContainer = Exp.cache.docVar.getElementById('content');
        Exp.cache.pageContentContainer.insertAdjacentHTML('beforebegin', `
        <div class="PD032_Progress_Bar_Container">
          <a class="PD032_Progress_Bar_Step PD032_Progress_Address" href="/checkout/multi/choose-delivery-address">Delivery Address</a>
          <a class="PD032_Progress_Bar_Step PD032_Progress_Delivery" href="/checkout/multi/choose-delivery-method">Delivery Method</a>
          <a class="PD032_Progress_Bar_Step PD032_Progress_Review" href="/checkout/multi/summary">Review <br />& Pay</a>
        </div>
        `);
        // Trim < from back button
        Exp.cache.backButton = Exp.cache.bodyVar.querySelector('.titlePanel .ui-title-bar > a');
        Exp.cache.backButton.textContent = Exp.cache.backButton.textContent.trim().replace(/< /g, '');
      },
    },
    addressPage: {
      addressPagePoll() {
        poller([
          '.delivery_address > .clear_search',
          '.delivery_address',
          '.pageinfo ',
          '.address .billing',
          '#orderDetailsToDisplayFlag > .view',
          '#orderDetailsToDisplayFlag > .hide',
          '.bdr-b > .mar-10 .ui-grid-a >  .ui-block-b > a.ui-link:first-child',
          () => {
            let checkjQuery = false;
            if (window.jQuery) {
              checkjQuery = true;
            }
            return checkjQuery;
          },
        ], this.addressPageInit);
      },
      addressPageInit() {
        // flicker prevention not added to this page, interferes with slideup animation on load
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
        // Calls required functions
        // Render header
        Exp.checkoutHeader.headerPoll();
        // Add styling classes
        Exp.cache.bodyVar.classList.add(Exp.settings.ID);
        Exp.cache.bodyVar.classList.add('PD032-Address-Page');
        // Manipulate address page DOM
        Exp.addressPage.addressPageManipulate();
        // Edit add to bag button
        Exp.services.editViewBag();
      },
      addressPageManipulate() {
        const $ = window.jQuery;
        // Edits current DOM elements
        // Create a container for address search, move address search here
        const deliveryAddressContainer = Exp.cache.bodyVar.querySelector('.delivery_address');
        const addressSearchForm = Exp.cache.bodyVar.querySelector('.delivery_address > .clear_search');
        deliveryAddressContainer.insertAdjacentHTML('afterbegin', `
        <div class="PD032_Address_Search_Container">
          <span class="PD032_Address_Search">Search for an address</span>
          <div class="PD032_Address_Search_Area">
          </div>
        </div>
        `);
        const PD032AddressSearch = Exp.cache.bodyVar.querySelector('.PD032_Address_Search_Area');
        // Move address count to the top of address area
        deliveryAddressContainer.insertAdjacentElement('afterbegin', Exp.cache.bodyVar.querySelector('.pageinfo '));
        // Move address search to added container
        PD032AddressSearch.insertAdjacentElement('afterbegin', addressSearchForm);
        // Hide address search by default
        $(PD032AddressSearch).slideUp();
        // Add address search toggle
        Exp.cache.bodyVar.querySelector('.PD032_Address_Search').addEventListener('click', () => {
          // If address search is visible slide up, else slide down
          if ($(PD032AddressSearch).is(':visible')) {
            $(PD032AddressSearch).slideUp();
          } else {
            $(PD032AddressSearch).slideDown();
          }
        });
        // Loop through all addresses to find billing address
        // if text content is not null then move it
        const allBillingAddress = Exp.cache.bodyVar.querySelectorAll('.address .billing');
        for (let i = 0; i < allBillingAddress.length; i += 1) {
          const currentBillingAddress = allBillingAddress[i];
          if (currentBillingAddress.textContent.trim()) {
            // Billing address found, edit text, add styling class and reposition
            const billingAddress = currentBillingAddress.parentNode.parentNode.querySelector('.address_no');
            // Insert Markup
            billingAddress.insertAdjacentHTML('beforeend', `
            <span class="PD032_Billing_Address">This is your billing address</span>
            `);
            break;
          }
        }
        // Add event tracking to continue button
        Exp.cache.bodyVar.querySelector('.bdr-b > .mar-10 .ui-grid-a >  .ui-block-b > a.ui-link:first-child').addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Choose-Delivery-Address: Continue', { sendOnce: true });
        });
        // Change address selected if it exists, insert markup
        const addressSelected = Exp.cache.bodyVar.querySelector('.address .tick');
        if (addressSelected) {
          // Insert an a tag to move to next page, replicates select adress button functionality
          addressSelected.insertAdjacentHTML('afterend', `
          <a class="PD032_Selected_Address_Link" href="/checkout/multi/choose-delivery-method">Selected</a>
          `);
        }
      },
    },
    addAddressPage: {
      addAddressPagePoll() {
        poller([
          '#content > .checkout h2',
          '.checkout.ui-content.multicheckout > .container_12 > .grid_12',
          'label[for="address.phone"]',
          'label[for="address.surname"]',
          'label[for="address.country"]',
          'label[for="address.postcode"]',
          '#addressForm > .ui-grid-a',
          '#addressForm > .ui-grid-a > .ui-block-b',
          '.grid_12 > .ui-grid-a',
          '#addressForm',
          '#findAddress',
          '.ui-title-bar > .ui-link',
          '#addressForm .cancel',
        ], this.addAddressPageInit);
      },
      addAddressPageInit() {
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
        // Render header
        // Add styling classes
        Exp.cache.bodyVar.classList.add(Exp.settings.ID);
        Exp.cache.bodyVar.classList.add('PD032-Add-Address-Page');
        Exp.checkoutHeader.headerPoll();
        Exp.addAddressPage.addAddressPageManipulate();
      },
      addAddressPageManipulate() {
        // Edit title
        const addAddressTitle = Exp.cache.bodyVar.querySelector('#content > .checkout h2');
        // Change address page title based on adding or editing address
        // Add event listener for edit address page to click back button
        // currently a bug where it appears to submit details
        Exp.cache.addAddressFormContainer = Exp.cache.docVar.getElementById('addressForm');
        if (Exp.cache.pathName.indexOf('/ADD-DELIVERY-ADDRESS') > -1) {
          // Add styling class to hide address form on add address page
          Exp.cache.addAddressFormContainer.classList.toggle('PD032_Hide_Address');
          addAddressTitle.textContent = 'Add a New Address';
          Exp.cache.bodyVar.querySelector('#addressForm .cancel').addEventListener('click', (e) => {
            e.preventDefault();
            // Click back button
            Exp.cache.bodyVar.querySelector('.ui-title-bar > .ui-link').click();
          });
        } else {
          addAddressTitle.textContent = 'Edit Address';
        }
        // Remove copy - Please use this form to add/edit an address
        // Cannot use CSS due to DOM structure
        Exp.cache.bodyVar.querySelector('.checkout.ui-content.multicheckout > .container_12 > .grid_12').childNodes[0].nodeValue = '';
        // Rearrange form elements
        // Next line exceeds length
        // eslint-disable-next-line
        // QA Amend, check for errors, form elements with errors are wrapped in a span, if in an error span, reassign selector
        let telephoneContainer = Exp.cache.bodyVar.querySelector('label[for="address.phone"]').parentNode;
        if (telephoneContainer.parentNode.classList.contains('form_field_error')) {
          telephoneContainer = telephoneContainer.parentNode;
        }
        let surnameContainer = Exp.cache.bodyVar.querySelector('label[for="address.surname"]').parentNode;
        if (surnameContainer.parentNode.classList.contains('form_field_error')) {
          surnameContainer = surnameContainer.parentNode;
        }
        let countryContainer = Exp.cache.bodyVar.querySelector('label[for="address.country"]').parentNode;
        if (countryContainer.parentNode.classList.contains('form_field_error')) {
          countryContainer = countryContainer.parentNode;
        }
        let postcodeContainer = Exp.cache.bodyVar.querySelector('label[for="address.postcode"]').parentNode;
        if (postcodeContainer.parentNode.classList.contains('form_field_error')) {
          postcodeContainer = postcodeContainer.parentNode;
        }
        // Move telephone after surname
        surnameContainer.insertAdjacentElement('afterend', telephoneContainer);
        // Move country after telephone
        telephoneContainer.insertAdjacentElement('afterend', countryContainer);
        // Move postcode after country
        countryContainer.insertAdjacentElement('afterend', postcodeContainer);
        // Move address lookup - after country
        const addressSearch = Exp.cache.bodyVar.querySelector('.grid_12 > .ui-grid-a');
        countryContainer.insertAdjacentElement('afterend', addressSearch);
        // Insert enter address manually link
        addressSearch.insertAdjacentHTML('afterend', `
        <div class="PD032_Enter_Address_Wrap">
          <span class="PD032_Enter_Address_Text">Enter Address <span class="PD032_Enter_Address_Automatically_Text">Automatically</span><span class="PD032_Enter_Address_Manually_Text">Manually</span></span>
        </div>
        `);
        // Add event handler to toggle the above class and reveale the address inputs
        const PD032AddressEnter = Exp.cache.bodyVar.querySelector('.PD032_Enter_Address_Text');
        PD032AddressEnter.addEventListener('click', () => {
          Exp.cache.addAddressFormContainer.classList.toggle('PD032_Hide_Address');
        });
        // Expose address fields when user clicks “Find Address”
        const findAddressButton = Exp.cache.docVar.getElementById('findAddress');
        findAddressButton.addEventListener('click', () => {
          // Check for styling class, toggle if form fields are not visible
          if (Exp.cache.addAddressFormContainer.classList.contains('PD032_Hide_Address')) {
            Exp.cache.addAddressFormContainer.classList.toggle('PD032_Hide_Address');
          }
        });
        // Move cancel button before save address
        Exp.cache.bodyVar.querySelector('#addressForm > .ui-grid-a').insertAdjacentElement('afterbegin', Exp.cache.bodyVar.querySelector('#addressForm > .ui-grid-a > .ui-block-b'));
      },
    },
    deliveryMethod: {
      deliveryMethodPoll() {
        poller([
          '.container_12 .ui-collapsible-heading .ui-collapsible-heading-toggle',
          '.address-selected .red.ui-link',
          '#delivery_method_item label',
          '#orderDetailsToDisplayFlag > .view',
          '#orderDetailsToDisplayFlag > .hide',
          '#chooseDeliveryMethod_continue_button',
        ], this.deliveryMethodInit);
      },
      deliveryMethodInit() {
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
        // Render header
        Exp.checkoutHeader.headerPoll();
        // Add styling classes
        Exp.cache.bodyVar.classList.add(Exp.settings.ID);
        Exp.cache.bodyVar.classList.add('PD032-Delivery-Page');
        // Add numbers to each header
        Exp.services.addStepNumbers();
        // Change text of edit address link
        Exp.cache.bodyVar.querySelector('.address-selected .red.ui-link').textContent = 'Edit';
        // Restructure delivery options text
        Exp.deliveryMethod.rebuildDeliveryOptionText();
        // Edit view bag buttons
        Exp.services.editViewBag();
        // Add tracking to continue button
        Exp.cache.docVar.getElementById('chooseDeliveryMethod_continue_button').addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Choose-Delivery-Method: Continue', { sendOnce: true });
        });
        Exp.services.removeFlicker();
      },
      rebuildDeliveryOptionText() {
        const allDeliveryOptionText = Exp.cache.bodyVar.querySelectorAll('#delivery_method_item label');
        for (let i = 0; i < allDeliveryOptionText.length; i += 1) {
          // Trim current text to rebuilt markup
          const currentDeliveryText = allDeliveryOptionText[i].textContent.trim();
          const currentPrice = currentDeliveryText.substring(currentDeliveryText.indexOf('£'));
          const currentOption = currentDeliveryText.substring(0, currentDeliveryText.indexOf('-'));
          const optionText = currentDeliveryText.substring(currentDeliveryText.indexOf('-') + 2, currentDeliveryText.lastIndexOf('-') - 1);
          // Information required, clear current text and insert markup
          allDeliveryOptionText[i].textContent = '';
          allDeliveryOptionText[i].insertAdjacentHTML('afterbegin', `
          <div class="PD032_Delivery_Option_Container">
            <span class="PD032_Delivery_Type">${currentOption}</span>
            <span class="PD032_Delivery_Description">${optionText}</span>
          </div>
          <span class="PD032_Delivery_Price">${currentPrice}</span>
          `);
        }
      },
    },
    checkoutSummary: {
      checkoutsummaryPoll() {
        poller([
          '.container_12 .ui-collapsible-heading .ui-collapsible-heading-toggle',
          '#placeOrderForm1 > .ui-field-contain > label',
          '.red.ui-link',
          '#placeOrderForm1 > .mar-10 .place-order',
          '#checkout_summary_order_details',
          '.checkout > .container_12 > .grid_12.mar-10 > .mar-10',
          '#placeOrderForm1 > .ui-field-contain',
          '#checkout_summary_order_details',
          '#cart_totals_div',
          '#orderDetailsToDisplayFlag > .view',
          '#orderDetailsToDisplayFlag > .hide',
          '.checkout_summary_flow > .ui-collapsible-set:last-child .ui-collapsible-heading-toggle',
          '.checkout_summary_flow > .ui-collapsible-set:last-child > div > div .ui-radio',
          '.checkout_summary_flow > .ui-collapsible-set:last-child > div',
          () => {
            let checkjQuery = false;
            if (window.jQuery) {
              checkjQuery = true;
            }
            return checkjQuery;
          },
        ], this.checkoutSummaryInit);
      },
      checkoutSummaryInit() {
        const $ = window.jQuery;
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
        // Render header
        Exp.checkoutHeader.headerPoll();
        // Add styling classes
        Exp.cache.bodyVar.classList.add(Exp.settings.ID);
        Exp.cache.bodyVar.classList.add('PD032-Checkout-Summary');
        // Change text of this accordion heading (Payment method)
        Exp.cache.bodyVar.querySelector('.checkout_summary_flow > .ui-collapsible-set:last-child .ui-collapsible-heading-toggle').textContent = 'Review & Pay';
        // Add numbers to each header
        Exp.services.addStepNumbers();
        const purchaseReference = Exp.cache.bodyVar.querySelector('#placeOrderForm1 > .ui-field-contain');
        // Change purchase reference text
        purchaseReference.querySelector('label').textContent = 'Add a purchase reference';
        // Change text of edit links
        const editLinks = Exp.cache.bodyVar.querySelectorAll('.red.ui-link');
        for (let i = 0; i < editLinks.length; i += 1) {
          editLinks[i].textContent = 'Edit';
        }
        // Check number of payment options for pay by account, adjust accordingly
        let accountPaymentAvailable = false;
        const paymentOptions = Exp.cache.bodyVar.querySelectorAll('.checkout_summary_flow > .ui-collapsible-set:last-child > div > div .ui-radio');
        for (let i = 0; i < paymentOptions.length; i += 1) {
          const currentOption = paymentOptions[i].querySelector('input').value.toUpperCase();
          if (currentOption === 'ACCOUNT') {
            accountPaymentAvailable = true;
            break;
          }
        }
        // Change text of buy now button
        const buyNowButton = Exp.cache.bodyVar.querySelector('#placeOrderForm1 > .mar-10 .place-order');
        if (accountPaymentAvailable) {
          // If a user has payment option “Account”, then show the payment options
          // Change payment option “Account” to say “Pay with my credit account”
          buyNowButton.textContent = 'Finish and Pay';
          Exp.cache.bodyVar.querySelector('.checkout_summary_flow > .ui-collapsible-set:last-child > div > div label').textContent = 'Credit Account';
          // Change credit card text to pay by card
          Exp.cache.bodyVar.querySelector('.checkout_summary_flow > .ui-collapsible-set:last-child .ui-collapsible-content .ui-radio:last-child > label').textContent = 'Pay by Card';
          // Add event listener
          $('.checkout_summary_flow > div:last-child > #addFilters .ui-radio input').change((e) => {
            if (e.target.value.toUpperCase() === 'ACCOUNT') {
              buyNowButton.textContent = 'Complete Order';
            } else {
              buyNowButton.textContent = 'Finish and Pay';
            }
          });
        } else {
          // Only “Credit Card” payment option, hide payment options, change CTA to “Pay by Card”
          buyNowButton.textContent = 'Pay by Card';
          Exp.cache.bodyVar.querySelector('.checkout_summary_flow > .ui-collapsible-set:last-child > div > div').classList.toggle('PD032_Hide');
        }
        // Move basket, view basket button and totals to after purchase reference
        purchaseReference.insertAdjacentElement('afterend', Exp.cache.docVar.getElementById('checkout_summary_order_details'));
        purchaseReference.insertAdjacentElement('afterend', Exp.cache.bodyVar.querySelector('.checkout > .container_12 > .grid_12.mar-10 > .mar-10'));
        purchaseReference.insertAdjacentElement('afterend', Exp.cache.docVar.getElementById('cart_totals_div'));
        // Edit view bag buttons
        Exp.services.editViewBag();
        // Add event tracking to buy now button
        buyNowButton.addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Summary: Finish & Pay', { sendOnce: true });
        });
        Exp.services.removeFlicker();
      },
    },
  };

  Exp.init();
};

export default Run;
