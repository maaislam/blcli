/**
 * PL029 - Basket share feature
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, closeLightbox } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  // Write experiment code here
  // console.log(`${shared.ID} is running`);
  // --- Get Offers
  /**
   * @desc Makes a GET request to a category URL and retrieves the venue details
   * @param {String} url URL to retrieve the venue information from
   * @param {Function} callback Function to run when the request was successful
   */
  /*eslint-disable */
  const getOffers = (url, callback) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const temp = document.createElement('html');
        temp.innerHTML = request.responseText;
        const offersList = temp.querySelectorAll('.container.product-container .container__body ul.tick-list li');

        let offers = [];
        [].forEach.call(offersList, (offer) => {
          offers.push(offer.querySelector('span').innerText);  
        });
        

        callback(offers);
      }
    };
    request.send();
  };


  // --- Create Share via Email CTA
  const shareEmailCtaEl = `<div class="${shared.ID}-shareCTA__wrapper">
    <div class="${shared.ID}-shareCTA__btn">Share via email</div>
  </div>`;

  // ---- Create Form
  const formEl = `<div class="${shared.ID}-emailForm__wrapper hidden" id="${shared.ID}-form">
    <div class="${shared.ID}-form__close"></div>
      <div class="${shared.ID}-emailForm__content">
        <form>
          <div class="${shared.ID}-header">
            <span class="${shared.ID}-title">Recipient Details</span><span class="${shared.ID}-subtitle">(Required)</span>
          </div>
          <label>First Name:*</label>
          <input class="invalid" type="text" name="recipientName" id="${shared.ID}-recipientName">
          <label>E-mail:*</label>
          <input type="text" name="recipientEmail" id="${shared.ID}-recipientEmail">
          <label>Confirm E-mail:*</label>
          <input type="text" name="confirmEmail" id="${shared.ID}-confirmEmail">
          <div class="${shared.ID}-header">
            <span class="${shared.ID}-title">Message</span><span class="${shared.ID}-subtitle">(optional) max 300 characters</span>
          </div>
          <textarea maxlength="300" name="customText" style="min-height: 130px;" id="${shared.ID}-customText"></textarea>
          <div class="${shared.ID}-header sender-details">
            <span class="${shared.ID}-title">Your Details</span>
          </div>
          <label>Your Name:*</label>
          <input class="invalid" type="text" name="senderName" id="${shared.ID}-senderName">
          <label>Your E-mail:</label><span class="${shared.ID}-subtitle">(optional)</span>
          <input type="text" name="senderEmail" id="${shared.ID}-senderEmail">
        </form>
        <div id="${shared.ID}-submitCTA">
          <p style="font-size: 13px; margin: 0 0 20px;">By submitting this form you agree to our <a target="_blank" style="text-decoration: underline; color: #109ee0;" href="https://www.printerland.co.uk/About-E111.aspx#privacy">privacy policy</a>.</p>
          <div class="btn btn--cyan checkout_btn disable" style="background-color: #fcef43;color:#000;">Send Email<i class="fas fa-caret-right"></i></div>
        </div>
      </div>
    </div>`;

  const successMessageEl = `<div class="${shared.ID}-emailForm__wrapper hidden" id="${shared.ID}-success">
    <div class="${shared.ID}-form__close"></div>
      <div class="${shared.ID}-emailForm__content">
        <div class="${shared.ID}-header">
          <span class="${shared.ID}-title">Message Sent</span>
        </div>
        <div class="${shared.ID}-paragraph">
          Thank you. We can confirm your email has been sent to <span class="${shared.ID}-recipientEmail"></span>.
        </div>
        <div class="${shared.ID}-paragraph">
          If you have entered this incorrectly or want to send someone else, then please click below.
        </div>
        <div id="${shared.ID}-resend">
          <div class="btn btn--cyan checkout_btn" style="background-color: #fcef43;color:#000;">Send another email<i class="fas fa-caret-right"></i></div>
        </div>
      </div>
    </div>
  </div>`;
  
  // ---- ADD ERROR MESSAGE HERE ---------------

  if (window.innerWidth > 420) {
    const containerTitle = document.querySelector('.container.basket .container__title h1');
    containerTitle.insertAdjacentHTML('afterend', shareEmailCtaEl);
    containerTitle.parentNode.setAttribute('data-element', 'added');

    document.body.insertAdjacentHTML('beforeend', formEl);
    document.body.insertAdjacentHTML('beforeend', successMessageEl);

    const cta = document.querySelector(`.${shared.ID}-shareCTA__wrapper`);
    const mobileForm = document.querySelector(`.${shared.ID}-emailForm__wrapper`);
    const formCloseIcon = mobileForm.querySelector(`.${shared.ID}-form__close`);
    cta.addEventListener('click', (e) => {
      window.scrollTo({top: 0, behavior: 'smooth'});
      mobileForm.classList.remove('hidden');
    });

    formCloseIcon.addEventListener('click', (e) => {
      mobileForm.classList.add('hidden');
    });


    // ----- Close Lightboxes
    const formLightbox = document.querySelector(`#${shared.ID}-form`);
    const successLightbox = document.querySelector(`#${shared.ID}-success`);
    closeLightbox(formLightbox);
    closeLightbox(successLightbox);

    // -- Success Message Events
    const successMessage = document.querySelector(`.${shared.ID}-emailForm__wrapper#${shared.ID}-success`);
    const successCloseIcon = successMessage.querySelector(`.${shared.ID}-form__close`);
    const successCTA = successMessage.querySelector(`#${shared.ID}-resend`);
    successCloseIcon.addEventListener('click', (e) => {
      successMessage.classList.add('hidden');
    });
    successCTA.addEventListener('click', (e) => {
      setTimeout(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
      }, 1000);
      
      mobileForm.classList.remove('hidden');
      successMessage.classList.add('hidden');
    });

    
  } else {
    const mobilePromoContainer = document.querySelector('.cart_basket--promo');
    mobilePromoContainer.insertAdjacentHTML('beforebegin', shareEmailCtaEl);
    mobilePromoContainer.parentNode.setAttribute('data-element', 'added');

    document.body.insertAdjacentHTML('beforeend', formEl);
    document.body.insertAdjacentHTML('beforeend', successMessageEl);

    const cta = document.querySelector(`.${shared.ID}-shareCTA__wrapper`);
    const mobileForm = document.querySelector(`.${shared.ID}-emailForm__wrapper`);
    const formCloseIcon = mobileForm.querySelector(`.${shared.ID}-form__close`);
    cta.addEventListener('click', (e) => {
      window.scrollTo({top: 0, behavior: 'smooth'});
      mobileForm.classList.remove('hidden');
    });

    formCloseIcon.addEventListener('click', (e) => {
      mobileForm.classList.add('hidden');
    });

    // -- Success Message Events
    const successMessage = document.querySelector(`.${shared.ID}-emailForm__wrapper#${shared.ID}-success`);
    const successCloseIcon = successMessage.querySelector(`.${shared.ID}-form__close`);
    const successCTA = successMessage.querySelector(`#${shared.ID}-resend`);
    successCloseIcon.addEventListener('click', (e) => {
      successMessage.classList.add('hidden');
    });
    successCTA.addEventListener('click', (e) => {
      window.scrollTo({top: 0, behavior: 'smooth'});
      mobileForm.classList.remove('hidden');
      successMessage.classList.remove('hidden');
    });
  }
  
  // --- Validate Emails
  function validateEmail(email, input) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // console.log('RESULT:');
    // console.log(re.test(String(email).toLowerCase()));
    if (re.test(String(email).toLowerCase())) {
      input.classList.remove('invalid');
      input.classList.add('valid');

      if (input.getAttribute('id') === `${shared.ID}-confirmEmail`) {
        if (document.querySelector(`#${shared.ID}-recipientEmail`).value.toLowerCase() === document.querySelector(`#${shared.ID}-confirmEmail`).value.toLowerCase()) {
          // alert('SUCCESS MATCHING');
          input.classList.remove('invalid');
        } else {
          // alert('WRONG');
          input.classList.add('invalid');
        }
      } else if (input.getAttribute('id') === `${shared.ID}-recipientEmail`) {
        if (document.querySelector(`#${shared.ID}-recipientEmail`).value.toLowerCase() === document.querySelector(`#${shared.ID}-confirmEmail`).value.toLowerCase()) {
          document.querySelector(`#${shared.ID}-confirmEmail`).classList.add('success');
          document.querySelector(`#${shared.ID}-confirmEmail`).classList.remove('invalid');
          setTimeout(() => {
            document.querySelector(`#${shared.ID}-confirmEmail`).classList.remove('valid');
            document.querySelector(`#${shared.ID}-confirmEmail`).classList.add('success');
          }, 3000);
        } else {
          document.querySelector(`#${shared.ID}-confirmEmail`).classList.add('invalid');
          setTimeout(() => {
            document.querySelector(`#${shared.ID}-confirmEmail`).classList.remove('valid');
            document.querySelector(`#${shared.ID}-confirmEmail`).classList.add('success');
          }, 3000);
        }

      }

      setTimeout(() => {
        input.classList.remove('valid');
        input.classList.add('success');
      }, 3000);
    } else {
      input.classList.remove('success');
      input.classList.remove('valid');
      input.classList.add('invalid');

      if (input.getAttribute('id') === `${shared.ID}-senderEmail`) {
        if (document.querySelector(`#${shared.ID}-senderEmail`).value === '') {
          input.classList.remove('invalid');
        }
      }
    }
  }

  // Validate Field
  function validateInputField(value, input) {
    if (value !== "") {
      input.classList.remove('invalid');
    } else {
      input.classList.add('invalid');
    }
  }

  /**
   * @desc If all fields are validated, then remove disable class from CTA
   * and allow email to be sent
   */
  function activateCTA() {
    const invalidFields = document.querySelectorAll(`.${shared.ID}-emailForm__content input.invalid`);
    const cta = document.querySelector(`#${shared.ID}-submitCTA div`);
    if (invalidFields.length === 0) {
      cta.classList.remove('disable');
    } else {
      cta.classList.add('disable');
    }
  }

  const inputFields = document.querySelectorAll(`.${shared.ID}-emailForm__content input`);
  [].forEach.call(inputFields, (input) => {
    const fieldID = input.getAttribute('id');
    if (fieldID === `${shared.ID}-recipientEmail`) {
      // --- Email Input Field
      input.addEventListener('input', (e) => {
        const value = input.value;
        validateEmail(value, input);
        activateCTA();
      });
    } else if (fieldID === `${shared.ID}-confirmEmail`) {
      // --- Confirm Email Input
      input.addEventListener('input', (e) => {
        const value = input.value;
        validateEmail(value, input);
        activateCTA();
      });
    } else if (fieldID === `${shared.ID}-senderEmail`) {
      // --- Sender Email Input Field
      input.addEventListener('input', (e) => {
        const value = input.value;
        validateEmail(value, input);
        activateCTA();
      });
    } else if (fieldID === `${shared.ID}-recipientName`
      || fieldID === `${shared.ID}-senderName`) {
      input.addEventListener('input', (e) => {
        const value = input.value;
        validateInputField(value, input);
        activateCTA();
      });
    }
  });


  // ------- Submit Email ------
  // -- Collect Data
  let productData = [];
  const productElements = document.querySelectorAll('.container.basket .container__body .row');
  [].forEach.call(productElements, (product) => {
    if (product.querySelector('h3 a')
    &&  product.querySelector('.image img')) {
      const img = encodeURI(product.querySelector('.image img').getAttribute('src'));
      const titleEl = product.querySelector('h3 a');
      const title = titleEl.innerText.trim();
      const url = titleEl.getAttribute('href');
      const price = product.querySelector('.price').innerText.trim().replace('£', '');

      // Call
      let offers = '';
      getOffers(`https://www.printerland.co.uk/${url}`, (offersData) => {
          offers = offersData;
      });
      setTimeout(() => {
        let data = {
          product_image_url: `${img}`,
          product_title: `${title}`,
          product_url: `https://www.printerland.co.uk/${url}`,
          offers: offers,
          price: `${price}`,
        };

        productData.push(data);
      }, 4000);
      
    }
  });

  const submitCTAContainer = document.querySelector(`#${shared.ID}-submitCTA`);
  submitCTAContainer.addEventListener('click', (e) => {
    // console.log('clicked on container');
    // console.log(productData);
  });
  const submitCTA = document.querySelector(`#${shared.ID}-submitCTA .btn`);

  submitCTA.addEventListener('click', (e) => {
    const recipientName = document.querySelector(`#${shared.ID}-recipientName`).value;
    const recipientEmail = document.querySelector(`#${shared.ID}-recipientEmail`).value;
    const messageText = document.querySelector(`#${shared.ID}-customText`).value;
    const senderName = document.querySelector(`#${shared.ID}-senderName`).value;;
    const senderEmail = document.querySelector(`#${shared.ID}-senderEmail`).value;
    if (!submitCTA.classList.contains('disable')
    && recipientEmail !== ''
    && recipientName !== ''
    && senderName !== '') {
      jQuery.ajax({
          url: 'https://ab-test-sandbox.userconversion.com/printerlandmailer/api/submit-data-no-captcha',
          type: 'post',
          success: function(data) {
            // data is string, parse to JSON if JSON-parseable
            // console.log(data);
            if (data.code === 200) {
              document.querySelector(`.${shared.ID}-emailForm__wrapper#${shared.ID}-success`).classList.remove('hidden');
              setTimeout(() => {
                window.scrollTo({top: 0, behavior: 'smooth'});
              }, 1000);
            }
          },
          error: function() {
            // catch-all error handling maybe here
            alert('Unsuccessful attempt. Please try again later.');
          },
          data: {
            recipient: `${recipientEmail}`,
            sender_email: `${senderEmail}`,
            formData: {
              custom_message: `${messageText}`,
              sender_name: `${senderName}`,
              // recipient name missing
              recipient_name: `${recipientName}`,
              products: productData,
            }
          }
      });

      // --- Hide form after email attempt has been sent
      document.querySelector(`.${shared.ID}-emailForm__wrapper`).classList.add('hidden');

      // -- Add Recipient Email to Success Message
      document.querySelector(`#${shared.ID}-success .${shared.ID}-recipientEmail`).innerText = recipientEmail;
    }
    
  });


  // DISABLE PASTE ON CONFIRM EMAIL
  const myInput = document.getElementById('PL029-confirmEmail');
  myInput.onpaste = function(e) {
    e.preventDefault();
  }

  // --- User Updates Basket Items
  const basketItems = document.querySelectorAll('.container .container__body .row');
  [].forEach.call(basketItems, (item) => {
    const ctaBtns = item.querySelectorAll('td.inline a');
    [].forEach.call(ctaBtns, (cta) => {

      cta.addEventListener('click', (e) => {
        setTimeout(() => {
          // activate();
          window.location.reload();
        }, 1000);
        // activate();
      });
    });
    if (item.querySelector('.extras') && item.querySelectorAll('.extras a').length > 0) {
      const addCtaBtns = item.querySelectorAll('.extras a');

      [].forEach.call(addCtaBtns, (cta) => {
        // cta.setAttribute('style', 'background-color: lightcoral;');
  
        cta.addEventListener('click', (e) => {
          setTimeout(() => {
            const closePopupEl = document.querySelector('.popupwindow .modal-close-button');
            closePopupEl.addEventListener('click', () => {
              // alert('close clicked');
              setTimeout(() => {
                // activate();
                window.location.reload();
              }, 1000);
            });


            pollerLite(['.messages.confirmation'], () => {
              // console.log('--------element found!');
              const closePopupEl = document.querySelector('.popupwindow .modal-close-button');
              closePopupEl.addEventListener('click', () => {
                setTimeout(() => {
                  // activate();
                  window.location.reload();
                }, 1000);
              });
            });
          }, 1000);
        });
      });
    }
  });
  // console.log('[405] before poller');
  // pollerLite(['.popupwindow .modal-close-button'], () => {
  //   console.log('element found!');
  //   console.log(document.querySelector('#PopupBehaviourQA_foregroundElement'));
  //   const closePopupEl = document.querySelector('.popupwindow .modal-close-button');
  //   console.log(closePopupEl);
  //   closePopupEl.addEventListener('click', () => {
  //     alert('close clicked');
  //     setTimeout(() => {
  //       activate();
  //     }, 1000);
  //   });
  //   // observer.connect(document.querySelector('#PopupBehaviourQA_foregroundElement'), () => {
  //   //   console.log('SOMETHING HAS CHANGED-------');
  //   //   activate();
  //   // }, {
  //   //   throttle: 200,
  //   //   config: {
  //   //     attributes: true,
  //   //     childList: false,
  //   //     // subtree: true,
  //   //   },
  //   // });
  // });
  
};

export default activate;
