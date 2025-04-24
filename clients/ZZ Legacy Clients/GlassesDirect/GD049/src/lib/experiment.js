/**
 * GD049 - Home Trial Checkout Messaging
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { eventFire } from '../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../lib/uc-lib';

const { ID } = settings;
const isMobile = window.mobileSite;

const experiment = {
  changes: {
    /**
     * Move products from a grid into a slider at the top of the page
     */
    moveProductsToSlider: () => {
      // Move location
      const products = cacheDom.get('#order-home-trial');
      products.classList.add(`${ID}_products`);

      if (isMobile) {
        const form = cacheDom.get('#form-payment-full');
        form.insertAdjacentElement('afterbegin', products);
      } else {
        const main = cacheDom.get('#purchase-details');
        main.insertAdjacentElement('afterbegin', products);
      }

      // Add header
      products.insertAdjacentHTML('beforebegin', `<div class="${ID}_products-heading ${ID}_heading">Home Trial Summary</div>`);

      // Make placeholder links clickable
      const placeholderLinks = document.querySelectorAll('.hometrial-item.slot-empty');
      [].forEach.call(placeholderLinks, (el) => {
        el.innerHTML = `<a href="/products">${el.innerHTML}</a>`;
      });
    },

    /**
     * Add delivery text to top of page
     */
    addDeliveryText: () => {
      const markup = `
        <div class="${ID}_delivery">
          <p>Your FREE 7-day Home Trial frames should be with you within 2 to 4 working days. We send them out via First Class Royal Mail</p>
          <p><small>(no deliveries on Sunday)</small></p>
        </div>
      `;

      if (isMobile) {
        const products = cacheDom.get('#order-home-trial');
        products.insertAdjacentHTML('beforebegin', markup);
      } else {
        const main = cacheDom.get('#purchase-details');
        main.insertAdjacentHTML('afterbegin', markup);
      }
    },

    /**
     * Modify FAQs
     */
    faqs: () => {
      const faqs = cacheDom.get('#payment-questions');
      const content = [
        {
          iconClass: 'icon-credit-card',
          question: 'Why do you need my credit card details if the Home Trial is free?',
          answer: 'We just need your details as a security measure in case you do not return our frames! <em>We don\'t charge you a penny</em>, and we merely take card details for validation purposes.',
        },
        {
          iconClass: 'icon-return',
          question: 'How do I return my Home Trial?',
          answer: 'Return your Home Trial is <em>free</em> and easy as 1-2-3: <ul><li>Pop the frames back in the original box and refit the sleeve</li><li>Stick the prepaid return label on the sleeve</li><li>Drop it in a postbox or at the post office</li></ul>',
        },
        {
          iconClass: 'icon-calendar-page',
          question: 'What happens if I return my Home Trial late?',
          answer: 'If we don\'t get your Home Trial after 7 days from the date you received it, we will charge your credit card for the cost of the frames, but <em>will refund you as soon as we get them back</em>. Don\'t worry, we\'ll send you a friendly reminder before we do so.',
        },
        {
          iconClass: 'icon-chat',
          question: 'Other questions?',
          answer: 'You can call us at <em>01793 746601</em> Monday to Friday from 9am to 5pm or send us an email to <em><a href="mailto:ask@glassesdirect.co.uk">ask@glassesdirect.co.uk</a></em>',
        },
      ];
      const accordionContent = [content[0], content[2]];

      // Add header
      faqs.insertAdjacentHTML('beforebegin', `<div class="${ID}_faq-heading ${ID}_heading">Frequently Asked Questions</div>`);

      // Replace with new content
      const markup = content.map((faq) => {
      return isMobile && accordionContent.indexOf(faq) > -1 ? '' : `
        <dt class="faq-question">
          ${faq.iconClass ? `<i class="icon ${faq.iconClass}"></i>` : ''}
          ${faq.question}
        </dt>
        <dd class="faq-answer">
          ${faq.answer}
        </dd>
      `;
      }).join('');
      faqs.innerHTML = markup;

      // Insert accordian faqs on mobile
      if (isMobile) {
        const terms = cacheDom.get('#terms-conditions');
        const accordion = document.createElement('div');
        accordion.classList.add(`${ID}_faq-accordion`);
        accordion.innerHTML = `
          ${accordionContent.map(faq => `
            <div class="${ID}_accordion-block">
              <div class="${ID}_accordion-tab"><p>${faq.question}</p><i class="icon icon-down-arrow"></i></div>
              <div class="${ID}_accordion-content">${faq.answer}</div>
            </div>
          `).join('')}
        `;

        // Events
        const blocks = accordion.querySelectorAll(`.${ID}_accordion-block`);
        const activeClass = 'active';
        [].forEach.call(blocks, (block) => {
          const tab = block.querySelector(`.${ID}_accordion-tab`);
          const icon = tab.querySelector('i');
          tab.addEventListener('click', () => {
            if (block.classList.contains(activeClass)) {
              block.classList.remove(activeClass);
              icon.classList.remove('icon-up-arrow');
              icon.classList.add('icon-down-arrow');
            } else {
              block.classList.add(activeClass);
              icon.classList.remove('icon-down-arrow');
              icon.classList.add('icon-up-arrow');
            }
          });
        });

        // Render
        terms.insertAdjacentElement('beforebegin', accordion);
      }
    },

    /**
     * Modify form
     */
    form: () => {
      const formSections = cacheDom.getAll('#payform .form-section');
      const details = formSections[1];
      const payment = formSections[3];
      const billingAddress = cacheDom.get('#billing-address');
      const deliveryAddress = cacheDom.get('#delivery-address');

      // Change headings
      const billingHeading = cacheDom.get('#billing-address legend');
      const deliveryHeading = cacheDom.get('#delivery-address legend');
      const paymentHeading = payment.querySelector('legend');
      if (billingHeading) billingHeading.style.display = 'none';
      if (deliveryHeading) deliveryHeading.innerText = 'Delivery Address';
      if (paymentHeading) paymentHeading.innerText = 'Billing Information';
      if (details.children[0].nodeName !== 'LEGEND') {
        details.insertAdjacentHTML('afterbegin', '<legend class="form-legend">Your Details</legend>');
      } else {
        details.children[0].innerText = 'Your Details';
      }

      // Change text in payment section
      const paymentText = payment.querySelectorAll('.form-intro > p');
      paymentText[0].classList.add(`${ID}_p-banner`);
      paymentText[1].parentElement.removeChild(paymentText[1]);
      payment.querySelector('#payment-details > .form-intro > p').innerHTML = 'Please enter your card details. We accept: <span style="display:inline-block;vertical-align:middle;height:23px;width:78px;background:url(\'//assets.glassesdirect.co.uk/assets/img/payments-accepted.png\') no-repeat;margin-left:10px;"></span>';

      // Move alerts so they're visible
      const alerts = cacheDom.get('.alert');
      if (alerts) cacheDom.get('#payform').insertAdjacentElement('beforebegin', alerts);

      // Changes for non-logged in users
      if (!window.universal_variable.user.user_id) {
        const deliveryToggle = cacheDom.get('#delivery-toggle');
        const deliveryToggleInput = deliveryToggle.querySelector('input');

        // Add label to password field
        const password = details.querySelector('#id_signup-password_row');
        password.insertAdjacentHTML('beforebegin', '<p style="padding-left: 2px;line-height: normal;margin-bottom: 5px;">Create a password</p>');

        // Move billing address to payment section
        payment.querySelector('p').insertAdjacentElement('afterend', billingAddress);
        billingAddress.insertAdjacentElement('beforebegin', deliveryToggle);

        // Style billing toggle
        deliveryToggleInput.id = 'billing-delivery-same';
        deliveryToggleInput.nextSibling.parentElement.removeChild(deliveryToggleInput.nextSibling);
        deliveryToggleInput.insertAdjacentHTML('afterend', '<label class="checkbox-label" for="billing-delivery-same"><em>My card address and delivery address are the same</em></label>');
        const deliveryToggleWrap = document.createElement('div');
        deliveryToggleWrap.classList.add('checkbox-custom');
        deliveryToggle.insertAdjacentElement('beforebegin', deliveryToggleWrap);
        deliveryToggleWrap.appendChild(deliveryToggle);

        // Delivery / Billing address functionality
        const billingAddressInputs = billingAddress.querySelectorAll('input, select');
        const deliveryAddressInputs = deliveryAddress.querySelectorAll('input, select');

        /**
         * Copies values from delivery field inputs over to billing address fields
         */
        const cloneDeliveryAddressToBillingAddress = () => {
          if (deliveryToggleInput.checked) {
            // Hide billing address fields and copy input values from delivery address form
            [].forEach.call(deliveryAddressInputs, (input, i) => {
              const billingInput = billingAddressInputs[i];
              if (billingInput) {
                billingInput.value = input.value;
                const inputValidated = input.classList.contains('field-error') || input.classList.contains('field-success');
                if (inputValidated) eventFire(billingInput, 'change');
              }
            });
          }
        };

        // Add close button and hide by default
        billingAddress.insertAdjacentHTML('beforebegin', `<i id="${ID}_billing-close" class="icon icon-close hidden"></i>`);
        billingAddress.classList.add('hidden');
        const billingClose = cacheDom.get(`#${ID}_billing-close`);
        billingClose.addEventListener('click', () => {
          billingClose.classList.add('hidden');
          billingAddress.classList.add('hidden');
          deliveryToggle.classList.remove('hidden');
          deliveryToggleInput.checked = true;
          eventFire(deliveryToggleInput, 'change');
        });

        // Show fields when unchecked
        deliveryToggleInput.addEventListener('change', () => {
          if (!deliveryToggleInput.checked) {
            billingAddress.classList.remove('hidden');
            billingClose.classList.remove('hidden');
            deliveryToggle.classList.add('hidden');

            // Clear billing address fields
            [].forEach.call(billingAddressInputs, (input) => {
              if (input.id && input.id === 'id_billing_address-country') return false; // Don't clear country field
              input.value = '';
              input.classList.remove('field-success');
              input.classList.remove('field-error');
            });
          } else {
            cloneDeliveryAddressToBillingAddress();
          }
        });

        // Add event handlers
        [].forEach.call(deliveryAddressInputs, (input) => {
          input.addEventListener('change', cloneDeliveryAddressToBillingAddress);
        });
        pollerLite(['#delivery-address .postcode-lookup'], () => {
          const postcodeLookup = document.querySelector('#delivery-address .postcode-lookup');
          observer.connect(postcodeLookup, () => {
            cloneDeliveryAddressToBillingAddress();
          }, {
            throttle: 10,
            config: {
              childList: true,
              attributes: true,
              subtree: true,
            },
          });
        }, { timeout: null });
      }
    },
  },

  init: () => {
    setup();
    const isHometrial = window.location.href.indexOf('/order-hometrial/');
    if(isHometrial > -1){
      document.body.classList.add(`${ID}_homeTrial`);
    }
    const { changes } = experiment;
    changes.moveProductsToSlider();
    changes.addDeliveryText();
    changes.faqs();
    changes.form();
  },
};

export default experiment;
