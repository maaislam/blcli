/* eslint-disable no-underscore-dangle */
import { pollerLite, observer } from '../../../../lib/uc-lib';
import { fullStory, events, eventFire } from '../../../../lib/utils';
import exitIntentPopup from './lib/exitIntentPopup';

/**
 * HD014 - Checkout Redesign Improvements
 */
const Experiment = {
  settings: {
    ID: 'HD014',
    VARIATION: '1',
  },

  init() {
    /* SETUP ------------------------------------------ */
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);


    /* CHANGES ------------------------------------------ */
    // HD001 Changes
    /** Add contact options to the desktop header and mobile footer */
    const addContactDetails = () => {
      pollerLite([
        '.site-header__logo',
        '.wrapper.footer-links',
      ], () => {
        const logo = document.querySelector('.site-header__logo');
        const footerLinks = document.querySelector('.wrapper.footer-links');
        const isUS = /^\/us\/onestepcheckout\/?$/.test(window.location.pathname);
        const phoneNumber = (() => {
          let number;
          if (isUS) {
            number = '1800 216 2331';
          } else {
            number = '0800 032 1301';
          }
          return number;
        })();
        const emailAddress = (() => {
          let email;
          if (isUS) {
            email = 'customercare@hearingdirect.com';
          } else {
            email = 'customerservices@hearingdirect.com';
          }
          return email;
        })();
        const liveChatMarkup = (() => {
          let markup = '';
          if (window.Tawk_API) {
            markup = 'or chat to us on <a class="custom-liveChat">live chat</a> right now';
          }
          return markup;
        })();
        const markup = `
          <p>
            Call us today on <a href="tel:${phoneNumber.replace(/\s/g, '')}">${phoneNumber}</a>
            <br>
            or email on <a href="mailto:${emailAddress}" target="_top">${emailAddress}</a>
            <br>
            ${liveChatMarkup}
          </p>
        `;

        logo.insertAdjacentHTML('afterend', `<div class="custom-header-middle">${markup}</div>`);
        footerLinks.insertAdjacentHTML('afterend', `<div class="custom-footerMiddle">${markup}</div>`);

        // Live chat open on chat link click
        if (liveChatMarkup !== '') {
          document.querySelector('.custom-liveChat').addEventListener('click', window.Tawk_API.maximize);
        }
      });
    };

    /** Add payment logos to header */
    const addPaymentLogos = () => {
      pollerLite([
        '.onestepcheckout-title',
        '.custom-header-middle',
      ], () => {
        // Desktop
        const middleContent = document.querySelector('.custom-header-middle');
        middleContent.insertAdjacentHTML('afterend', `
        <div class="custom-header-right">
          <div class="custom-mobile">
            <img src="//useruploads.visualwebsiteoptimizer.com/useruploads/332107/images/2f14902a03f549d408dc7cfed3b5fc54_paymob.png">
          </div>

          <div class="custom-desktop">
            <span class="HD014_header__img HD014_header__img--payments">
              <img src="//useruploads.visualwebsiteoptimizer.com/useruploads/332107/images/2f14902a03f549d408dc7cfed3b5fc54_paymob.png">
            </span>
            <span class="HD014_header__img HD014_header__img--braintree">
              <img src="//useruploads.visualwebsiteoptimizer.com/useruploads/332107/images/37cfcf73ed3f39ba4a3158a082b90ee1_braintree.png">
            </span>
          </div>
        </div>  
        `);

        // Mobile
        const title = document.querySelector('.onestepcheckout-title');
        title.insertAdjacentHTML('afterend', '<div class="HD014_mobilePaymentLogo"><img src="//useruploads.visualwebsiteoptimizer.com/useruploads/332107/images/37cfcf73ed3f39ba4a3158a082b90ee1_braintree.png"></div>');
      });
    };

    /** Alter specific inputs */
    const modifyInputs = () => {
      // Add message to phone input
      pollerLite(['.input-telephone'], () => {
        document.querySelector('.input-telephone').insertAdjacentHTML('beforeend', '<small>Only used in rare cases if the delivery courier cannot find you.</small>');
      });

      // Add message to postcode input
      pollerLite(['.input-postcode'], () => {
        const postcodeFields = document.querySelectorAll('.input-postcode');
        for (let i = 0; i < postcodeFields.length; i += 1) {
          const field = postcodeFields[i];
          field.insertAdjacentHTML('beforeend', '<small>Please enter your postcode without a space</small>');
        }
      });

      // Add required to password fields
      pollerLite(['#onestepcheckout-li-password label'], () => {
        const passwordInputs = document.querySelectorAll('#onestepcheckout-li-password .input-box > label');
        for (let i = 0; i < passwordInputs.length; i += 1) {
          const input = passwordInputs[i];
          input.insertAdjacentHTML('beforeend', ' <span class="required">*</span>');
        }
      });
    };

    /** Move elements around */
    const rearrangeElements = () => {
      pollerLite([
        '#shipping_address',
        '.input-different-shipping',
        '.onestepcheckout-shipping-method-block',
        '#id_create_account',
        '.onestepcheckout-numbers-3',
      ], () => {
        const shippingAddress = document.querySelector('#shipping_address');
        const shippingAddressCheckbox = document.querySelector('.input-different-shipping');
        const shippingMethodBlock = document.querySelector('.onestepcheckout-shipping-method-block');
        shippingMethodBlock.insertAdjacentElement('beforebegin', shippingAddress);
        shippingMethodBlock.insertAdjacentElement('beforebegin', shippingAddressCheckbox);
        document.querySelector('#id_create_account').parentElement.parentElement.classList.add('custom-top-gap');
        shippingAddressCheckbox.querySelector('label').innerText = 'Deliver to same address';

        // Split step 2 and 3 into separate sections
        document.querySelector('.onestepcheckout-numbers-3').insertAdjacentHTML('beforebegin', '<div class="seprator"></div>');
      });
    };

    /** Changes to step 1 - Delivery information */
    const changeDetailsStep = () => {
      pollerLite([
        '.onestepcheckout-numbers-1',
        'label[for="id_create_account"]',
      ], () => {
        document.querySelector('.onestepcheckout-numbers-1').innerText = 'Your Details';
        document.querySelector('label[for="id_create_account"]').innerText = 'Select if you wish to create an account';
      });
    };

    /** Separate billing details into a new step */
    const separateBillingDetails = () => {
      pollerLite([
        '.input-create-account',
        '.input-telephone',
      ], () => {
        if (!document.querySelector('.onestepcheckout-numbers-2-billing')) {
          const createAccountToggle = document.querySelector('.input-create-account').parentElement;
          const createAccountField = document.querySelector('#onestepcheckout-li-password');
          const telephoneField = document.querySelector('.input-telephone');
          const group = telephoneField.parentElement;
          telephoneField.insertAdjacentElement('afterend', createAccountToggle);
          createAccountToggle.insertAdjacentElement('afterend', createAccountField);
          createAccountField.insertAdjacentHTML('afterend', '<div class="seprator"></div>');
          group.insertAdjacentHTML('afterend', '<p class="onestepcheckout-numbers onestepcheckout-numbers-2-billing">Billing Address</p><p class="HD014_headingSubtext">Enter your billing address associated with your payment card</p>');
        }
      });
    };

    /** Changes to step 2 - Delivery information */
    const changeDeliveryStep = () => {
      pollerLite([
        '.onestepcheckout-numbers-2',
        '.shipment-methods > dd',
      ], () => {
        const deliveryMessage = document.querySelector('.onestepcheckout-shipping-method');
        deliveryMessage.querySelector('.onestepcheckout-numbers-2').innerText = 'Delivery Information';
        deliveryMessage.querySelector('.shipment-methods > dd').innerText = 'Select Delivery Method';
      });
    };

    /** Changes to step 3 - Payment method */
    const changePaymentStep = () => {
      pollerLite(['.onestepcheckout-numbers-3'], () => {
        const title = document.querySelector('.onestepcheckout-numbers-3');
        title.innerText = 'Payment and Review';
      });
    };

    /** Changes to step 4 - Review your order */
    const changeReviewOrderStep = () => {
      pollerLite([
        '.onestepcheckout-column-right .onestepcheckout-numbers-4',
        '.checkout-agreements',
        '.agreement-content',
      ], () => {
        const reviewOrderSection = document.querySelector('.onestepcheckout-column-right');
        const reviewOrderSectionTitle = reviewOrderSection.querySelector('.onestepcheckout-numbers-4');

        // Update title text
        reviewOrderSectionTitle.innerText = 'Review order';

        // Move CTA and T&Cs above summary
        const checkoutAgreements = reviewOrderSection.querySelector('.checkout-agreements');
        const cta = reviewOrderSection.querySelector('.onestepcheckout-place-order-wrapper');
        reviewOrderSectionTitle.insertAdjacentElement('afterend', checkoutAgreements);
        checkoutAgreements.insertAdjacentElement('afterend', cta);

        // Restructure T&Cs
        // const terms = reviewOrderSection.querySelector('.agreement-content');
        // terms.insertAdjacentElement('afterbegin', terms.querySelector('input[type=checkbox]'));
        // terms.querySelector('p').style.display = 'none';
      });
    };

    /** Move coupon field */
    const moveCouponField = () => {
      pollerLite([
        '.onestepcheckout-coupons',
        '.onestepcheckout-summary',
      ], () => {
        const coupon = document.querySelector('.onestepcheckout-coupons');
        const summary = document.querySelector('.onestepcheckout-summary');
        summary.insertAdjacentElement('afterend', coupon);

        // 9/3/18 Amends
        const applyBtn = document.querySelector('#onestepcheckout-coupon-add');
        const cancelBtn = document.querySelector('#onestepcheckout-coupon-remove');

        if (applyBtn && cancelBtn) {
          applyBtn.classList.add('hd01-submit');
          cancelBtn.classList.add('hd01-cancel');
        }

        const voucherRef = document.querySelector('#onestepcheckout-coupons .input-box.input-coupon');
        if (voucherRef && applyBtn && cancelBtn) {
          voucherRef.appendChild(applyBtn);
          voucherRef.appendChild(cancelBtn);
        }

        // Events
        if (applyBtn) {
          applyBtn.addEventListener('click', () => {
            events.send('HD014', 'User clicked on', `Voucher code ${document.querySelector('#id_couponcode').value}`);
          });
        }

        // Send event when coupon notice changes
        pollerLite(['#coupon-notice'], () => {
          const couponNotice = document.querySelector('#coupon-notice');
          observer.connect(couponNotice, () => {
            const message = couponNotice.innerText.trim();
            switch (true) {
              case !!message.match(/Voucher code ".*" is not valid/i):
                events.send('HD014', 'User saw', 'Voucher code invalid');
                break;

              case !!message.match(/Coupon code ".*" was applied successfully/i):
                events.send('HD014', 'User saw', 'Voucher code successful');
                break;

              default:
                break;
            }
          }, {
            config: {
              attributes: false,
              childList: true,
              subtree: false,
            },
          });
        });
      });
    };

    /** Change delivery labels for UK */
    const ukDeliveryLabelChanges = () => {
      pollerLite(['dl.shipment-methods label'], () => {
        const isUK = /^\/onestepcheckout\/?$/.test(window.location.pathname);
        if (isUK) {
          const deliveryLabels = document.querySelectorAll('dl.shipment-methods label');
          for (let i = 0; i < deliveryLabels.length; i += 1) {
            const el = deliveryLabels[i];
            const text = el.innerText;
            switch (true) {
              case text.indexOf('Royal Mail 1st Class') !== -1:
                el.childNodes[1].nodeValue = '1 - 2 day Expedited Delivery';
                break;

              case text.indexOf('Royal Mail Next Day (Monday to Friday Only)') !== -1:
                el.childNodes[1].nodeValue = 'Next Day (Monday to Friday Only)';
                break;

              case text.indexOf('Royal Mail 2nd Class') !== -1:
                el.childNodes[1].nodeValue = '3 - 5 day Standard Delivery';
                break;

              default:
                break;
            }

            const priceEl = el.querySelector('.price');
            if (priceEl) {
              const priceElText = priceEl.innerText.trim();
              if (priceElText.indexOf('£0.00') > -1) {
                el.innerHTML = '3 - 5 day Standard Delivery <strong>FREE</strong>';
              } else if (priceElText.indexOf('$0.00') > -1) {
                priceEl.innerHTML = 'FREE';
              }
            }
          }
        }
      });
    };

    /** Update text in totals summary */
    const updateTotalsText = () => {
      pollerLite(['.onestepcheckout-totals tr td'], () => {
        const totals = document.querySelectorAll('.onestepcheckout-totals tr');
        for (let i = 0; i < totals.length; i += 1) {
          const tr = totals[i];
          const td = tr.querySelector('td');
          const text = td.innerText.trim();

          switch (true) {
            case !!text.match(/Delivery \(Select Shipping Method/i):
              td.innerText = 'Delivery';
              break;

            case !!text.match(/Grand Total Excl. VAT/i):
              tr.style.display = 'none';
              break;

            case !!text.match(/Shipping & Handling/i):
              td.innerHTML = 'Shipping &amp; Handling';
              break;

            case !!text.match(/Grand Total Incl. VAT/i):
              td.innerHTML = '<strong>Grand Total</strong>';
              break;

            default:
              break;
          }
        }
      });
    };

    /** Move payment options side by side */
    const reorderPaymentOptions = () => {
      pollerLite([() => document.querySelectorAll('#checkout-payment-method-load dt').length > 1], () => {
        const paymentContainer = document.querySelector('#checkout-payment-method-load');
        if (!paymentContainer.classList.contains('HD014_sideBySidePayment')) {
          paymentContainer.classList.add('HD014_sideBySidePayment');
          const paymentOptions = paymentContainer.querySelectorAll('dt');
          paymentOptions[0].insertAdjacentElement('afterend', paymentOptions[1]);
          paymentOptions[0].insertAdjacentHTML('afterend', '<div class="HD014_horizontalSeparator">or</div>');
        }
      });
    };

    /** Change text for checkout errors */
    const changeErrorText = () => {
      const error = document.querySelector('#onestepcheckout-form > .group-select > .onestepcheckout-error');
      if (error) {
        const errorMessage = error.innerText.trim();
        const newErrorMessage = (() => {
          let message;
          switch (true) {
            case !!errorMessage.match(/Your transaction has been declined, please try another payment method or contacting your issuing bank/i):
              message = 'Hi we’re sorry, your bank rejected the card. You might have entered the details incorrectly - please try again and make sure all your details are correct or try Paypal (you don’t need to sign up for an account if you don’t have one)';
              break;

            case !!errorMessage.match(/Gateway Rejected: avs Please try again or attempt refreshing the page/i):
              message = 'Hi we’re sorry, that payment didn’t work. It’s likely your billing address was incorrect - can you check and make sure everything is perfect? If it doesn’t work, try Paypal (you don’t need to sign up for an account if you don’t have one)';
              break;

            case !!errorMessage.match(/Cannot use a payment_method_token more than once. Please try again or attempt refreshing the page/i):
              message = 'Hi we’re sorry, you’ll need to go back to the basket and add your items again';
              break;

            case !!errorMessage.match(/Funding Instrument In The PayPal Account Was Declined By The Processor Or Bank, Or It Can't Be Used For This Payment. Please try again or attempt refreshing the page/i):
              message = 'Hi we’re sorry, Paypal doesn’t look to be working right now. Please try your credit or debit card instead';
              break;

            case !!errorMessage.match(/Cannot use a payment_method_nonce more than once. Please try again or attempt refreshing the page/i):
              message = 'Hi we’re sorry, Paypal doesn’t look to be working right now. Please try your credit or debit card instead';
              break;

            case !!errorMessage.match(/Your transaction has been declined, please try another payment/i):
              message = 'Hi we’re sorry, your transaction has been declined by the bank, please ensure all your details are right or try another payment method like Paypal (you don’t need to sign up for an account if you don’t have one)';
              break;

            default:
              break;
          }

          return message;
        })();

        if (newErrorMessage) {
          const container = document.querySelector('.onestepcheckout-threecolumns');
          const isUS = /^\/us\/onestepcheckout\/?$/.test(window.location.pathname);
          const phoneNumber = (() => {
            let number;
            if (isUS) {
              number = '1800 216 2331';
            } else {
              number = '0800 032 1301';
            }
            return number;
          })();
          const liveChatMarkup = (() => {
            let markup = '';
            if (window.Tawk_API) {
              markup = ' or chat to us live using our <a class="HD014_checkoutError__contact__chat">live chat</a> right now';
            }
            return markup;
          })();
          container.insertAdjacentHTML('beforebegin', `
            <div class="HD014_checkoutError">
              <div class="HD014_checkoutError__message"><span class="HD014_checkoutError__icon"></span><p>${newErrorMessage}</p></div>
              <div class="HD014_checkoutError__contact">
                <p>For help - call us today on <a href="tel:${phoneNumber.replace(/\s/g, '')}">${phoneNumber}</a> Mon - Fri 9am - 5pm${liveChatMarkup}</p>
              </div>
            </div>
          `);
          if (liveChatMarkup !== '') {
            document.querySelector('.HD014_checkoutError__contact__chat').addEventListener('click', (e) => {
              e.preventDefault();
              window.Tawk_API.maximize();
            });
          }
          error.style.display = 'none';
          const $ = window.jQuery;
          $(() => {
            $('html, body').animate({
              scrollTop: $('.HD014_checkoutError').offset().top - 20,
            }, 300);
          });
        }
      }
    };

    /** Add events to ctas */
    const addCtaEvents = () => {
      const cta = document.querySelector('.onestepcheckout-place-order-wrapper');
      const orderNow = cta.querySelector('#onestepcheckout-place-order');
      const paypal = cta.querySelector('.braintree-paypal-button');

      if (orderNow && !orderNow.getAttribute('data-HD014_modified')) {
        orderNow.setAttribute('data-HD014_modified', true);
        orderNow.addEventListener('click', () => {
          events.send('HD014', 'User clicked on', 'Place Order button');
        });
      }

      if (paypal && !paypal.getAttribute('data-HD014_modified')) {
        paypal.setAttribute('data-HD014_modified', true);
        paypal.addEventListener('click', () => {
          events.send('HD014', 'User clicked on', 'Paypal final button');
        });
      }
    };

    /** Fix login popup on mobile */
    const fixLoginPopup = () => {
      pollerLite([
        '#onestepcheckout-login-table',
        '#onestepcheckout-login-button',
        () => !!window.jQuery,
      ], () => {
        const table = document.querySelector('#onestepcheckout-login-table > tbody');
        const oldButton = table.querySelector('#onestepcheckout-login-button');

        // Duplicate login button for better formatting on mobile
        const newButton = (() => {
          const element = document.createElement('td');
          element.classList.add('HD014_login');
          element.innerHTML = '<button type="button" class="button HD014_login__button">Login</button>';

          element.querySelector('button').addEventListener('click', () => {
            window.jQuery(oldButton).trigger('click');
          });

          return element;
        })();

        table.appendChild(newButton);
      });
    };

    // HD013 Changes
    /** Change subtitle copy */
    const changeSubtitleCopy = () => {
      pollerLite(['#onestepcheckout-form p.onestepcheckout-description'], () => {
        const title = document.querySelector('#onestepcheckout-form p.onestepcheckout-description');
        title.textContent = 'Please complete the 4 steps below and you\'re done!';
      });
    };

    /** Set a default shipping option */
    const defaultShipping = () => {
      pollerLite(['.shipment-methods input'], () => {
        const shippingMethods = document.querySelectorAll('.shipment-methods input');
        const selectedShippingMethod = (() => {
          let checked;
          for (let i = 0; i < shippingMethods.length; i += 1) {
            const el = shippingMethods[i];
            if (el.checked) {
              checked = el;
              break;
            }
          }
          return checked;
        })();
        if (!selectedShippingMethod) {
          shippingMethods[0].checked = true;
          eventFire(shippingMethods[0], 'click');
        }
      });
    };

    /** Set a default payment option */
    const defaultPayment = () => {
      pollerLite(['.payment-methods input'], () => {
        const paymentMethods = document.querySelectorAll('.payment-methods input');
        const selectedPaymentMethod = (() => {
          let checked;
          for (let i = 0; i < paymentMethods.length; i += 1) {
            const el = paymentMethods[i];
            if (el.checked) {
              checked = el;
              break;
            }
          }
          return checked;
        })();
        if (!selectedPaymentMethod) {
          paymentMethods[0].checked = true;
          eventFire(paymentMethods[0], 'click');
        }
      });
    };

    /** When an error message appears anchor the user to it */
    const anchorErrorMessaging = () => {
      const checkForValidationErrors = () => {
        pollerLite(['.validation-failed'], () => {
          const failedFields = document.querySelectorAll('.validation-failed');
          const $ = window.jQuery;
          $('html, body').animate({
            scrollTop: $(failedFields[0]).offset().top - 30,
          }, 300);
        });
      };

      const bindEvents = () => {
        // Checkout button
        pollerLite(['#onestepcheckout-place-order'], () => {
          const button = document.querySelector('#onestepcheckout-place-order');
          button.addEventListener('click', checkForValidationErrors);
        });

        // PayPal button
        const attachPaypalButton = () => {
          pollerLite(['#paypal-container button'], () => {
            const button = document.querySelector('#paypal-container button');
            button.addEventListener('click', checkForValidationErrors);
          });
        };

        pollerLite(['#p_method_gene_braintree_paypal'], () => {
          const paypalOption = document.querySelector('#p_method_gene_braintree_paypal');
          if (paypalOption.checked) {
            attachPaypalButton();
          } else {
            // Wait for the option to be selected before polling for paypal button
            const changeEvent = () => {
              if (paypalOption.checked) {
                paypalOption.removeEventListener('change', changeEvent);
                attachPaypalButton();
              }
            };
            paypalOption.addEventListener('change', changeEvent);
          }
        });
      };

      bindEvents();
    };

    /** Show more product/delivery info when review order is clicked */
    const moreInfoLightbox = () => {
      class Tabs {
        /**
         * Creates a horizontal tab structure
         * @param {Array<{name: String, content: String}>} data All tab data -
         *  expects a tab name and markup
         */
        constructor(data) {
          this._data = data;
          this._create();
          this._bindEvents();
          return {
            _component: this._component,
          };
        }

        _create() {
          const component = document.createElement('div');
          component.classList.add('HD014_Tabs');

          // Tabs
          const tabs = document.createElement('div');
          tabs.classList.add('HD014_Tabs__tabBlock');

          const content = document.createElement('div');
          content.classList.add('HD014_Tabs__contentBlock');

          /** Create tab markup */
          const createTab = (data) => {
            // Create tab element
            const tab = document.createElement('div');
            tab.classList.add('HD014_Tabs__tab');
            tab.setAttribute('data-HD014_tab', data.name);
            tab.innerText = data.name;

            // Create content element
            const tabContent = document.createElement('div');
            tabContent.classList.add('HD014_Tabs__content');
            tabContent.setAttribute('data-HD014_tab', data.name);
            tabContent.innerHTML = data.content;

            tabs.appendChild(tab);
            content.appendChild(tabContent);
          };

          this._data.forEach((tabData) => {
            createTab(tabData);
          });

          // Default to the first tab
          tabs.children[0].classList.add('HD014_Tabs__tab--active');
          content.children[0].classList.add('HD014_Tabs__content--active');

          component.appendChild(tabs);
          component.appendChild(content);

          this._component = component;
        }

        _bindEvents() {
          // Tab transitions
          const switchTab = (tabName) => {
            // Hide currently active tab
            const activeTab = this._component.querySelector('.HD014_Tabs__tab--active');
            const activeContent = this._component.querySelector('.HD014_Tabs__content--active');
            if (activeTab) activeTab.classList.remove('HD014_Tabs__tab--active');
            if (activeContent) activeContent.classList.remove('HD014_Tabs__content--active');

            // Show this tab
            const tab = this._component.querySelector(`.HD014_Tabs__tab[data-HD014_tab="${tabName}"]`);
            const content = this._component.querySelector(`.HD014_Tabs__content[data-HD014_tab="${tabName}"]`);
            tab.classList.add('HD014_Tabs__tab--active');
            content.classList.add('HD014_Tabs__content--active');
          };

          const tabs = this._component.querySelectorAll('.HD014_Tabs__tab');
          for (let i = 0; i < tabs.length; i += 1) {
            const tab = tabs[i];
            tab.addEventListener('click', (e) => {
              const tabName = e.target.getAttribute('data-HD014_tab');
              if (tabName) {
                switchTab(tabName);
              }
            });
          }
        }
      }

      class Lightbox {
        /**
         * Creates a lightbox
         * @param {HTMLElement} content Content to go inside the lightbox
         */
        constructor(content) {
          this._content = content;
          this._create();
          this._bindEvents();
          this._render();

          return {
            open: this.open,
            close: this.close,
            toggle: this.toggle,
            _component: this._component,
            _overlay: this._overlay,
          };
        }

        /** Create elements */
        _create() {
          // Overlay
          const overlay = document.createElement('div');
          overlay.classList.add('HD014_LightboxOverlay');

          // Component
          const component = document.createElement('div');
          component.classList.add('HD014_Lightbox');

          // Inner content
          const content = document.createElement('div');
          content.classList.add('HD014_LightboxContent');

          // Close
          const close = document.createElement('div');
          close.classList.add('HD014_Lightbox__close');

          if (this._content) content.appendChild(this._content);
          component.appendChild(close);
          component.appendChild(content);

          this._overlay = overlay;
          this._component = component;
        }

        /** Add event listeners */
        _bindEvents() {
          // Close events
          this._component.querySelector('.HD014_Lightbox__close').addEventListener('click', () => {
            this.close();
          });

          this._overlay.addEventListener('click', () => {
            this.close();
          });
        }

        /** Inject to DOM */
        _render() {
          const { body } = document;
          body.appendChild(this._overlay);
          body.appendChild(this._component);
        }

        /** Open lightbox */
        open() {
          this._overlay.style.display = 'block';
          this._component.style.display = 'block';
          document.documentElement.classList.add('HD014_noScroll');
          document.body.classList.add('HD014_noScroll');
          events.send('HD014', 'User opened review your order lightbox', 'User saw review your order lightbox');
        }

        /** Close lightbox */
        close() {
          this._overlay.style.display = 'none';
          this._component.style.display = 'none';
          document.documentElement.classList.remove('HD014_noScroll');
          document.body.classList.remove('HD014_noScroll');
          events.send('HD014', 'User closed review your order lightbox', 'User closed review your order lightbox');
        }

        /** Toggle lightbox open/close state */
        toggle() {
          if (this._overlay.style === 'block') {
            this.close();
          } else {
            this.open();
          }
        }
      }

      /**
       * Init components
       * @param {Object} productData
       */
      const createComponents = (productData) => {
        /** Create Tabs component */
        const tabs = new Tabs([
          {
            name: 'Your Order',
            content: (() => {
              let markup = '<div class="HD014_summary">';

              // Products start
              markup += '<div class="HD014_products">';
              productData.products.forEach((data) => {
                markup += `
                  <div class="HD014_product">
                    <div class="HD014_product__img"><img src="${data.img}"/></div>
                    <div class="HD014_product__detailsBlock">
                      <div class="HD014_product__name">${data.name}</div>
                      <div class="HD014_product__options">${data.options}</div>
                    </div>
                    <div class="HD014_product__priceBlock">
                      <div class="HD014_product__price">${data.price}</div>
                    </div>
                    <div class="HD014_product__qty">${data.qty}</div>
                    <div class="HD014_product__actions">
                      <a href="${data.edit}">${data.editIconSVG} Edit</a>
                    </div>
                  </div>
                `;
              });
              markup += '</div>';
              // Products end

              // Totals start
              markup += `
                <div class="HD014_totals">
                  <div class="HD014_totals__total">Subtotal: ${productData.totals.subtotal}</div>
                </div>  
              `;
              // Totals end

              markup += '</div>';
              return markup;
            })(),
          },
          {
            name: 'Contact Us',
            content: `
              <ul class="HD014_contactDetails">
                <li>
                  <span class="HD014_contactIcon HD014_contactIcon--phone"></span>
                  <div class="HD014_contact__content">
                    <ul class="HD014_contactDetails__phoneNumbers">
                      <li><span class="HD014_flagIcon HD014_flagIcon--uk"></span><p>0800 032 1301</p></li>
                      <li><span class="HD014_flagIcon HD014_flagIcon--us"></span><p>1800 216 2331</p></li>
                      <li><span class="HD014_flagIcon HD014_flagIcon--fr"></span><p>08 05 63 81 99</p></li>
                      <li><span class="HD014_flagIcon HD014_flagIcon--nd"></span><p>0800 664 88 86</p></li>
                    </ul>
                  </div>
                </li>
                <li>
                  <span class="HD014_contactIcon HD014_contactIcon--email"></span>
                  <div class="HD014_contact__content">
                    <p><a href="mailto:customerservices@hearingdirect.com">customerservices@hearingdirect.com</a></p>
                  </div>
                </li>
              </ul>
            `,
          },
          {
            name: 'Returns Policy',
            content: `
              <div>
                <p>Our <strong>no quibble, 30-day, money back guarantee</strong> policy is exactly that - if you don't like, or you're unhappy with any item you have bought from HearingDirect.com, you can return it to us freepost (from within the UK), up to 30 days after it has been dispatched, for replacement or full product refund.</p>
                <p>If you wish to return goods after 30 days of shipping then you should first contact our customer service department to see whether a return is appropriate.</p>
                <p>To return goods you need to contact us to obtain a Return Authorisation Number (RAN). You can request one by emailing <a href="mailto:customerservices@hearingdirect.com">customerservices@hearingdirect.com</a> or calling us on 0800 032 1301. The RAN  should be quoted on an accompanying letter to explain the reason for return and ideally a copy of the original invoice. We recommend you obtain proof of postage from the post office when returning any item to us.</p>
                <p>You will be notified by email or in writing when your returned Goods have been received by us.</p>
                <p>For more details, see "Your right to cancel", in the <a https://www.hearingdirect.com/pages/Terms.html#righttocancel">terms and conditions</a>. Your statutory rights are not affected.</p>
                <p>
                  <strong>When does the 30 day period start?</strong>
                  <br />
                  We will stamp your receipt with a date when we put it in the post. The 30 day period will start from this date; returns must have a posting date no more than 30 days after this dispatch date.
                </p>
                <p>
                  <strong>Can I return it even if I simply don't like it?</strong>
                  <br/>
                  Yes, this truly is a money back, no quibble guarantee.
                </p>
              </div>
            `,
          },
        ]);

        /** Create Lightbox component */
        const lightbox = new Lightbox(tabs._component);

        /** Lightbox trigger */
        pollerLite(['.onestepcheckout-numbers-3'], () => {
          const reviewOrderTitle = document.querySelector('.onestepcheckout-numbers-3');
          if (reviewOrderTitle.getAttribute('data-HD014') !== 'modified') {
            reviewOrderTitle.addEventListener('click', () => {
              reviewOrderTitle.setAttribute('data-HD014', 'modified');
              lightbox.toggle();
            });
          }
        });
      };

      /**
       * Get all product data from minibasket or basket page (if more than 3 products)
       * Minibasket only shows the last 3 products so if there's more than that we need
       * to pull in the product data from the basket page
       */
      const productCount = document.querySelector('.controls__minicart-count').innerHTML;

      /**
       * Get data from the minibasket
       * @param {Function} cb Callback
       */
      const getDataFromMinibasket = (cb) => {
        const minibasket = document.querySelector('#cart-sidebar');

        // Products
        const productDataArr = [];
        const minibasketProducts = minibasket.querySelectorAll('.minicart__item');
        for (let i = 0; i < minibasketProducts.length; i += 1) {
          const element = minibasketProducts[i];
          const name = element.querySelector('.minicart__item-title');
          const price = element.querySelector('.minicart__item-price .price');
          const img = element.querySelector('.minicart__item-image img');
          const qty = element.querySelector('.minicart__item-qty');
          const edit = element.querySelector('.minicart__item-edit');
          const options = element.querySelector('.item-options');

          productDataArr.push({
            name: name ? name.innerText.trim() : '',
            price: price ? price.innerText.trim() : '',
            img: img ? img.src : '',
            qty: qty ? qty.innerText.trim() : '',
            edit: edit ? edit.href : '',
            editIconSVG: edit.querySelector('svg') ? edit.querySelector('svg').outerHTML : '',
            options: options ? options.innerHTML : '',
          });
        }

        // Totals
        const itemCount = document.querySelector('.minicart__items-count');
        const subtotal = document.querySelector('.minicart__subtotal .price');

        const productData = {
          products: productDataArr,
          totals: {
            itemCount: itemCount ? itemCount.innerHTML : '',
            subtotal: subtotal ? subtotal.innerHTML : '',
          },
        };

        /** Data has been retrieved, build components */
        cb(productData);
      };

      /**
       * Pull in data from the basket page as there's more than 3 products
       * @param {Function} cb Callback
       */
      const getDataFromBasketPage = (cb) => {
        /**
         * @param {HTMLElement} DOM Page DOM
         */
        const scrapeProductData = (DOM) => {
          // Products
          const productDataArr = [];
          const products = DOM.querySelectorAll('#shopping-cart-table > tbody > tr');
          for (let i = 0; i < products.length; i += 1) {
            const element = products[i];
            const name = element.querySelector('.title a');
            const price = element.querySelector('.cart-price .price');
            const img = element.querySelector('.product-image img');
            const qty = element.querySelector('.input-qty');
            const edit = element.querySelector('.link-edit');
            const options = element.querySelector('.item-options');

            productDataArr.push({
              name: name ? name.innerText.trim() : '',
              price: price ? price.innerText.trim() : '',
              img: img ? img.src : '',
              qty: qty ? `Qty: ${qty.innerText.trim()}` : '',
              edit: edit ? edit.href : '',
              editIconSVG: edit.querySelector('svg') ? edit.querySelector('svg').outerHTML : '',
              options: options ? options.innerHTML : '',
            });
          }

          // Totals
          const subtotal = DOM.querySelector('#shopping-cart-totals-table > tbody .price');

          const productData = {
            products: productDataArr,
            totals: {
              itemCount: productCount,
              subtotal: subtotal ? subtotal.innerHTML : '',
            },
          };

          /** Data has been retrieved, build components */
          cb(productData);
        };

        const request = new XMLHttpRequest();
        request.open('GET', '/checkout/cart/', true);
        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            const temp = document.createElement('div');
            temp.innerHTML = request.responseText;
            scrapeProductData(temp);
          }
        };
        request.send();
      };

      if (productCount > 3) {
        getDataFromBasketPage(createComponents);
      } else {
        getDataFromMinibasket(createComponents);
      }
    };

    /** Update PayPal info copy */
    const changePaypalCopy = () => {
      pollerLite(['.paypal-info > p'], () => {
        const paypalCopy = document.querySelector('.paypal-info > p');
        if (paypalCopy.getAttribute('data-HD014') !== 'modified') {
          paypalCopy.innerText = 'Please click the \'Pay by PayPal\' blue button below to complete your payment';
          paypalCopy.setAttribute('data-HD014', 'modified');
        }
      });
    };

    /** Remove links from footer payment icons */
    const removePaymentLinks = () => {
      pollerLite(['.copyright__item'], () => {
        const imgLinks = document.querySelectorAll('.copyright__item a');
        for (let i = 0; i < imgLinks.length; i += 1) {
          const link = imgLinks[0];
          link.addEventListener('click', (e) => {
            e.preventDefault();
          });
        }
      });
    };

    /** Apply all page changes */
    const applyAllChanges = () => {
      // HD001
      addContactDetails();
      addPaymentLogos();
      modifyInputs();
      rearrangeElements();
      changeDetailsStep();
      separateBillingDetails();
      changeDeliveryStep();
      changePaymentStep();
      changeReviewOrderStep();
      moveCouponField();
      ukDeliveryLabelChanges();
      updateTotalsText();
      // reorderPaymentOptions();
      changeErrorText();
      addCtaEvents();
      fixLoginPopup();

      // HD013
      changeSubtitleCopy();
      defaultShipping();
      defaultPayment();
      anchorErrorMessaging();
      moreInfoLightbox();
      changePaypalCopy();
      removePaymentLinks();
      exitIntentPopup.init();
    };

    /** Initial call */
    try {
      applyAllChanges();
    } catch (e) {
      events.send('HD014', 'Error', `Failed to apply all changes - ${e}`);
    }


    /* OBSERVERS ------------------------------------------ */
    const observerSettings = {
      throttle: 300,
      config: {
        attributes: false,
        childList: true,
        subtree: true,
      },
    };

    /** CTA events */
    pollerLite(['.onestepcheckout-place-order-wrapper'], () => {
      const cta = document.querySelector('.onestepcheckout-place-order-wrapper');
      observer.connect(cta, () => {
        try {
          addCtaEvents();
        } catch (e) {
          events.send('HD014', 'Error', `Failed to add cta events on refresh - ${e}`);
        }
      }, observerSettings);
    });

    /** Reapply step 2 and 3 changes when content refreshes */
    pollerLite(['.onestepcheckout-column-middle'], () => {
      const middleCol = document.querySelector('.onestepcheckout-column-middle');
      observer.connect(middleCol, () => {
        try {
          ukDeliveryLabelChanges();
          // reorderPaymentOptions();
          changeDeliveryStep();
          changePaypalCopy();
          defaultPayment();
        } catch (e) {
          events.send('HD014', 'Error', `Failed to refresh middle col changes - ${e}`);
        }
      }, observerSettings);
    });

    /** Reapply summary changes when content refreshes */
    pollerLite(['.onestepcheckout-summary'], () => {
      const summary = document.querySelector('.onestepcheckout-summary');
      observer.connect(summary, () => {
        try {
          setTimeout(updateTotalsText, 300);
        } catch (e) {
          events.send('HD014', 'Error', `Failed to refresh summary changes - ${e}`);
        }
      }, observerSettings);
    }, {
      throttle: 80,
      config: {
        attributes: false,
        childList: true,
        subtree: true,
      },
    });
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.useLegacyTracker();
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },
};

export default Experiment;
