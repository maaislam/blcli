import shared from '../shared';
import { getLanguage } from '../helpers';
import { createLoader, showLoader, hideLoader } from './loader';
import scrollToElement from '../components/TG069/components/aboveTheFold/scrollTo';

const { ID } = shared;

export default () => {

    const createFormWrapper = () => {
        const element = document.createElement('div');
        element.classList.add(`${ID}-bottomForm`);
    
        element.innerHTML = `
        <div class="${ID}-successMessage">
          <div class="${ID}-success_inner">
            <h3>Thank you!</h3><p></p>
          </div>
        </div>
        <div class="${ID}-form_inner">
            <div class="${ID}-brochureForm_intro">
                <h2>Need More Information?</h2>
                <p>Our wellness consultants can help with any questions you have. Get in touch or get a catalogue.</p>
            </div>
            <div class="${ID}-form_buttons">
              <div class="${ID}-brochure ${ID}-formButton ${ID}-formButton_active">Request a catalogue</div>
              <div class="${ID}-email ${ID}-formButton">Email us</div>
            </div>
            <div class="${ID}-brochure_details">
              <div class="${ID}-brochureImage"></div>
              <div class="${ID}-brochureText">
                <h3>Get a MyRun catalogue</h3>
                  <ul>
                    <li>- Complete Specification</li>
                    <li>- Detailed Product Photography</li>
                    <li>- Deep Dive on Feature Benefits</li>
                </ul>
              </div>
            </div>
            <div class="${ID}-forms"></div>
        </div>`;

        document.querySelector(`.${ID}-specification`).insertAdjacentElement('afterend', element);
    }

    // markup for bottom form
    const createContactForm = () => {
        const contactForm = document.createElement('div');
        contactForm.classList.add(`${ID}-contactForm`);
        contactForm.innerHTML = 
        `<form id="${ID}-contactForm" class="submit-checker">
            <input type="hidden" name="form_key" value="">
            <input type="hidden" name="reason" id="reason" class="" value="catalogue">
            <input type="hidden" name="userType" id="type" class="" value="private_individual">

            <div class="${ID}-field">
                <label>First Name: <span class="${ID}-required">*</span></label>
                <input name="name" id="name" title="First Name" value="" class="input-text required-entry" type="text">
                <p class="${ID}_error">This is a required field</p>
            </div>

            <div class="${ID}-field">
                <label>Last Name <span class="${ID}-required">*</span></label>
                <input name="last-name" id="last-name" title="Last Name" value="" class="input-text required-entry" type="text">
                <p class="${ID}_error">This is a required field</p>
            </div>

            <div class="${ID}-field">
                <label>Email <span class="${ID}-required">*</span></label><span>(We'll only use this to respond to your query)</span>
                <input name="email" id="email" title="Email" value="" class="input-text required-entry validate-email" type="email">
                <p class="${ID}_error">This is a required field</p>
            </div>

            <div class="${ID}-field">
                <label>Phone (Optional)</label><span>(If you'd like a call back, leave your preferred number)</span>
                <input name="telephone" id="telephone" title="Phone" value="" class="input-text" type="number">
            </div>

             <div class="${ID}-field ${ID}-message">
                <label>Message <span class="${ID}-required">*</span></label>
                <textarea name="comment" class="required-entry input-text" id="comment" title="Message" placeholder="We can help with all your queries e.g explaining the features on MyRun, recommending alternative equipment, discussing finance options"></textarea>
                <p class="${ID}_error">This is a required field</p>
              </div>

            <div class="${ID}-privacy input-box terms-privacy">
              <p>Having read and understood the 
              <a href="https://www.technogym.com/gb/privacy-policy/" target="_blank">Privacy Policy</a> and having accepted the <a href="https://www.technogym.com/gb/terms-of-use/" target="_blank">Technogym Terms and Conditions</a></p>
              <p><input type="checkbox">I consent to the use of personal data for marketing and publicity purposes.</p>
            </div>

            <button type="submit" title="Send" class="${ID}-submit button">Request a catalogue</button>
        </form>`;

        document.querySelector(`.${ID}-forms`).appendChild(contactForm);
    }

    // event listeners for form buttons
    const typeOfForm = () => {
      const emailFormButton = document.querySelector(`.${ID}-email`);
      const brochureFormButton = document.querySelector(`.${ID}-brochure`);
      const messageField = document.querySelector(`.${ID}-message`);
      const brochureDetails = document.querySelector(`.${ID}-brochure_details`);
      const submitButton = document.querySelector(`.${ID}-contactForm .${ID}-submit`)
      const formReason = document.querySelector(`.${ID}-contactForm #reason`);

      // on email click
      emailFormButton.addEventListener('click', (e) => {
        brochureFormButton.classList.remove(`${ID}-formButton_active`);
        e.currentTarget.classList.add(`${ID}-formButton_active`);

        messageField.style.display = 'block';
        formReason.value = 'mail';

        brochureDetails.classList.add(`${ID}-details_hidden`);

        submitButton.textContent = 'Get in touch';
      });


      // on brochure click
      brochureFormButton.addEventListener('click', (e) => {
        emailFormButton.classList.remove(`${ID}-formButton_active`);
        e.currentTarget.classList.add(`${ID}-formButton_active`);

        // hide message field
        messageField.style.display = 'none';
        formReason.value = 'catalogue';

        brochureDetails.classList.remove(`${ID}-details_hidden`);
        submitButton.textContent = 'Request a catalogue';
      });
    }

    createFormWrapper();
    createContactForm();
    typeOfForm();
    createLoader();

  
    // if all the fields are filled
    const formFieldValidation = () => {

      let isValid;

      const allRequired = document.querySelectorAll(`.${ID}-field input.required-entry`);
      for (let index = 0; index < allRequired.length; index += 1) {
        const element = allRequired[index];
        if(element.value === '') {
          element.classList.add(`${ID}-requiredField`);
          element.parentNode.querySelector(`.${ID}_error`).style.display = 'block';
          isValid = false;
        } else {
          element.classList.remove(`${ID}-requiredField`);
          element.parentNode.querySelector(`.${ID}_error`).style.display = 'none';
          isValid = true;
        }
      }
      return isValid;
    }

    // if the email isn't empty
    const emailFormValidation = () => {
      const message = document.querySelector(`.${ID}-message .required-entry`);
      if(document.querySelector(`.${ID}-email`).classList.contains(`${ID}-formButton_active`)) {
        if(message.value === '') {
          message.classList.add(`${ID}-requiredField`);
          message.parentNode.querySelector(`.${ID}_error`).style.display = 'block';
          return false;
        }
      }
    }

    // clear fields when the form is submitted
    const clearFields = () => {
      const allFields = document.querySelectorAll(`.${ID}-field .input-text`);
      for (let index = 0; index < allFields.length; index += 1) {
        const element = allFields[index];
        element.value = '';
      }
    }

     // when the form has been submitted
     const onSuccessOfForm = () => {
      hideLoader(); 

      const feedbackMessage = document.querySelector(`.${ID}-successMessage`);
      feedbackMessage.classList.add(`${ID}-successMessage_active`);

      // change the text based on form type
      if (document.querySelector(`.${ID}-brochure`).classList.contains(`${ID}-formButton_active`)) {
        feedbackMessage.querySelector('p').textContent = 'We’ll send you the MyRun catalogue by email shortly.';
      } else {
        feedbackMessage.querySelector('p').textContent = 'All queries are answered within 24 hours, often less.';
      }

      // fade out the message after 5 seconds
      setTimeout(() => {
        feedbackMessage.classList.remove(`${ID}-successMessage_active`);
        clearFields();
      },3000); 
    }

    const errorWithForm = () => {
      hideLoader(); 

      const feedbackMessage = document.querySelector(`.${ID}-successMessage`);
      feedbackMessage.querySelector('h3').textContent = 'Sorry!';
      feedbackMessage.querySelector('p').textContent = 'Something went wrong, please try again later';
      feedbackMessage.classList.add(`${ID}-successMessage_active`);

      setTimeout(() => {
        feedbackMessage.classList.remove(`${ID}-successMessage_active`);
        clearFields();
      },3000); 

    }
    
    const submitForm = () => {

      // this is needed to submit the form
      const grecaptchaSiteKey = '6LfQW5kUAAAAAC4-bndLCHnsk3C0uLkgkHak3ym7';
      const action = ' contacts-index-index livechat-enabled'.split(' ')[0].replace(/-/g, '');
      const _RECAPTCHA = _RECAPTCHA || {};
      _RECAPTCHA.init = function() {
          grecaptcha.ready(function() {
              grecaptcha.execute(grecaptchaSiteKey, {action: action}).then(function(token) {
                  if (jQuery('.grecaptchaToken')[0]) {
                      jQuery('form .grecaptchaToken').remove();
                  }
                  if (jQuery('form')[0]) {
                      jQuery('form').append('<input type="hidden" class="grecaptchaToken" name="grecaptchaToken" value="' + token + '" />');
                  }
              });
          });
      }
      _RECAPTCHA.init();

      function buildDataSubmitString(data) {
          const defaults = {
            'form_key': document.querySelector('#product-info #product_addtocart_form [name="form_key"]').value,
            'referrer_pageurl': window.location.href,
            'referrer_element': 'contactForm',
            'need-business': 'community',
            'need-freelance': 'other',
            'company': 'Auto-Filled-Field',
            'secure_field_check': '',
            'campaign': '1',
            'hideit': '',
            'product-name': 'MYRUN',
            'product':'MYRUN-CONFIGURABLE-EUROPE',
            'catalog-url': 'https://www.technogym.com/marketing-support/download/F0246A23-7510-4A14-9859-8973FD0E483B',
            'grecaptchaToken': document.querySelector('.grecaptchaToken').value,
          };
          const segments = [
            'referrer_pageurl',
            'referrer_element',
            'form_key',
            'reason',
            'name',
            'last-name',
            'email',
            'telephone',
            'comment',
            'profile',
            'need',
            'need-business',
            'need-freelance',
            'company',
            'secure_field_check',
            'campaign',
            'hideit',
            'product-name',
            'product',
            'grecaptchaToken'
          ];
          let res = segments.map((val) => {
            return val + '=' + (
              data[val] ? encodeURIComponent(data[val]) : (
                defaults[val] ? encodeURIComponent(defaults[val]) : ''
              )
            );
          });
          return res.join('&');
      }

      // add the values to the data
      let data = buildDataSubmitString({
        reason: document.querySelector('#reason').value,
        name: document.querySelector('#name').value,
        'last-name': document.querySelector('#last-name').value,
        'email': document.querySelector('#email').value,
        comment: document.querySelector('#comment').value,
        profile: document.querySelector('#type').value,
        telephone: document.querySelector('#telephone').value

      });
      data = data.replace(/%20/g, '+');
      data = data.replace(/%40/g, '@');

      const request = new XMLHttpRequest();
      request.open('POST', `/${getLanguage()}/contacts/index/post/`, true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          // Request Was Successful
          const temp = document.createElement('html');
          temp.innerHTML = request.responseText;
          const errorMessage = temp.querySelector('#messages_product_view .error-msg');
          if(!errorMessage) {
            onSuccessOfForm();
          } else {
            errorWithForm();
          }
        } else {
          // Request gave non-success response code
        }
      };
      request.onerror = () => {
        // Request threw error
      };
      // Now send request :..
      request.send(data);

    }

    const contactForm = document.querySelector(`.${ID}-contactForm`);
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); 

      if(formFieldValidation() === false) {
        // don't submit
      } else if (emailFormValidation() === false){
        // don't submit
      } else {
        showLoader();
        scrollToElement(document.querySelector(`.${ID}-bottomForm`));
        submitForm();
      }
    });
}