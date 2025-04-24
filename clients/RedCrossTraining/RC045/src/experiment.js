import { fullStory, events, setCookie } from '../../../../lib/utils';

/**
 * {{RC045}} - {{Checkout Exit Intent}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'RC045',
    VARIATION: '{{VARIATION}}',
    lightboxShown: false,
    formData: '',
  },

  init() {
    // Setup
    /*eslint-disable */
    const { settings, services, bindExperimentEvents } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    /* eslint-enable */

    /**
     * @desc Makes a GET request to a category URL and retrieves the venue details
     * @param {String} url URL to retrieve the venue information from
     * @param {Function} callback Function to run when the request was successful
     */
    /*eslint-disable */
    const getFormDetails = (url, callback) => {
      const request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const temp = document.createElement('html');
          temp.innerHTML = request.responseText;
          
          const viewState = temp.querySelector('#__VIEWSTATE').value;
          const viewStateGenerator = temp.querySelector('#__VIEWSTATEGENERATOR').value;
          const eventValidation = temp.querySelector('#__EVENTVALIDATION').value;

          const formWrap = temp.querySelector('.scfForm');
          const formMainInput = formWrap.querySelector('input');
          const formName = formMainInput.name;
          const formValue = formMainInput.value;
          
          const formContent = formWrap.querySelector('.scfSectionContent');
          const formNameField = formContent.querySelector('.name\\.full-name');
          const nameFieldId = formNameField.querySelector('.scfSingleLineGeneralPanel > input').name;
          const formNumberField = formContent.querySelector('.name\\.contact-number');
          const numberFieldId = formNumberField.querySelector('.scfSingleLineGeneralPanel > input').name;
          const formEmailField = formContent.querySelector('.name\\.E-mail\\+address');
          const emailFieldId = formEmailField.querySelector('.scfEmailGeneralPanel > input').name;
          const formTextField = formContent.querySelector('.name\\.Reason\\+for\\+call\\+back');
          const textFieldId = formTextField.querySelector('textarea').name;

          const formDetails = {
            'view-state': viewState,
            'event-validation': eventValidation,
            'view-state-generator': viewStateGenerator,
            'form-name': formName,
            'form-value': formValue,
            'name-id': nameFieldId,
            'number-id': numberFieldId,
            'email-id': emailFieldId,
            'text-id': textFieldId,
          };
          callback(formDetails);
        }
      };
      request.send();
    };

    // Create form content
    const lightboxForm = `<div id="main_0_form_A73668ED2F8545EAA481448D4A79A0A1_fieldContainer" style="margin-top: 30px;">
      <div class="scfSectionBorder">
        <div class="scfSectionBorder">
          <div class="scfSectionContent">
            <div id="main_0_form_A73668ED2F8545EAA481448D4A79A0A1_field_7FF62D0148DD4A5FAD751A70AF28B6B8_scope" class="scfSingleLineTextBorder fieldid.%7b7FF62D01-48DD-4A5F-AD75-1A70AF28B6B8%7d name.full-name">
              <label for="main_0_form_A73668ED2F8545EAA481448D4A79A0A1_field_7FF62D0148DD4A5FAD751A70AF28B6B8" id="main_0_form_A73668ED2F8545EAA481448D4A79A0A1_field_7FF62D0148DD4A5FAD751A70AF28B6B8_text" class="scfSingleLineTextLabel">Full name 
                <abbr title="required" class="required">*</abbr>
              </label>
              <div class="scfSingleLineGeneralPanel">
                <input name="main_0$form_A73668ED2F8545EAA481448D4A79A0A1$field_7FF62D0148DD4A5FAD751A70AF28B6B8" type="text" maxlength="256" id="main_0_form_A73668ED2F8545EAA481448D4A79A0A1_field_7FF62D0148DD4A5FAD751A70AF28B6B8" class="RC045-inputValidation RC045-nameInput scfSingleLineTextBox">
                <span id="RC045-nameInput__error" style="display:none;">Full name must have at least 0 and no more than 256 characters.</span>
              </div>
              <span class="scfRequired">*</span>
            </div>
            <div id="main_0_form_A73668ED2F8545EAA481448D4A79A0A1_field_3737AD07DB70452D86F82C60E4CCDEC7_scope" class="scfSingleLineTextBorder fieldid.%7b3737AD07-DB70-452D-86F8-2C60E4CCDEC7%7d name.contact-number">
              <label for="main_0_form_A73668ED2F8545EAA481448D4A79A0A1_field_3737AD07DB70452D86F82C60E4CCDEC7" id="main_0_form_A73668ED2F8545EAA481448D4A79A0A1_field_3737AD07DB70452D86F82C60E4CCDEC7_text" class="scfSingleLineTextLabel">Preferred contact number 
                <abbr title="required" class="required">*</abbr>
              </label>
              <div class="scfSingleLineGeneralPanel">
                <input name="main_0$form_A73668ED2F8545EAA481448D4A79A0A1$field_3737AD07DB70452D86F82C60E4CCDEC7" type="text" maxlength="256" id="main_0_form_A73668ED2F8545EAA481448D4A79A0A1_field_3737AD07DB70452D86F82C60E4CCDEC7" class="RC045-inputValidation RC045-numberInput scfSingleLineTextBox">
                <span id="RC045-numberInput__error" style="display:none;">The value of the Preferred contact number field is not valid.</span>
              </div>
              <span class="scfRequired">*</span>
            </div>
            <div id="main_0_form_A73668ED2F8545EAA481448D4A79A0A1_field_C8D6577E21AC4796A40F31856A53EE45_scope" class="scfEmailBorder fieldid.%7bC8D6577E-21AC-4796-A40F-31856A53EE45%7d name.E-mail+address">
              <label for="main_0_form_A73668ED2F8545EAA481448D4A79A0A1_field_C8D6577E21AC4796A40F31856A53EE45" id="main_0_form_A73668ED2F8545EAA481448D4A79A0A1_field_C8D6577E21AC4796A40F31856A53EE45_text" class="scfEmailLabel">E-mail address 
                <abbr title="required" class="required">*</abbr>
              </label>
              <div class="scfEmailGeneralPanel">
                <input name="main_0$form_A73668ED2F8545EAA481448D4A79A0A1$field_C8D6577E21AC4796A40F31856A53EE45" type="text" id="main_0_form_A73668ED2F8545EAA481448D4A79A0A1_field_C8D6577E21AC4796A40F31856A53EE45" class="RC045-inputValidation RC045-emailInput scfEmailTextBox">
                <span id="RC045-emailInput__error" style="display:none;">Enter a valid e-mail address.</span>
              </div>
              <span class="scfRequired">*</span>
            </div>
            <div id="main_0_form_A73668ED2F8545EAA481448D4A79A0A1_field_A18BB7D8B8714E078079659FEA205D58_scope" class="scfMultipleLineTextBorder fieldid.%7bA18BB7D8-B871-4E07-8079-659FEA205D58%7d name.Reason+for+call+back">
              <label for="main_0_form_A73668ED2F8545EAA481448D4A79A0A1_field_A18BB7D8B8714E078079659FEA205D58" id="main_0_form_A73668ED2F8545EAA481448D4A79A0A1_field_A18BB7D8B8714E078079659FEA205D58_text" class="scfMultipleLineTextLabel">Please provide details of your enquiry
                <abbr title="required" class="required">*</abbr>
              </label>
              <div class="scfMultipleLineGeneralPanel">
                <textarea name="main_0$form_A73668ED2F8545EAA481448D4A79A0A1$field_A18BB7D8B8714E078079659FEA205D58" rows="4" cols="20" id="main_0_form_A73668ED2F8545EAA481448D4A79A0A1_field_A18BB7D8B8714E078079659FEA205D58" class="RC045-inputValidation RC045-textInput scfMultipleLineTextBox"></textarea>
                <span id="RC045-textInput__error" style="display:none;">Please provide details of your enquiry must have at least 0 and no more than 512 characters.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="scfSubmitButtonBorder">
      <label></label>
      <input type="submit" name="main_0$form_A73668ED2F8545EAA481448D4A79A0A1$form_A73668ED2F8545EAA481448D4A79A0A1_submit" value="Submit" id="main_0_form_A73668ED2F8545EAA481448D4A79A0A1_form_A73668ED2F8545EAA481448D4A79A0A1_submit" class="scfSubmitButton">
      <span id="RC045-field__error" style="display:none;">* Required fields cannot be left blank.</span>
      <span id="RC045-submit__error" style="display:none;">An error occured while submitting the form. Please try again <a href='/contact-us/Request-a-call-back.aspx'>here</a>.</span>
    </div>`;

    const lightboxContainer = `<div class='RC045-lightboxWrap hidden'>
      <div class='RC045-lightboxContainer'>
        <div class='RC045-lightbox'>
          <div class='RC045-lightbox__top'>
            <span class='lightboxTop__icon'>
              <i class='icon-phone icon-red'></i>
            </span>
            <span class='lightboxTop__text'>
              <div class='text-bold'>Would you like to request a call back?</div>
              <div class='subText'>Our advisors can assist with bookings or any queries that you may have.</div>
            </span>
            <span class='lightboxTop__close'></span>
          </div>
          <div class='RC045-lightbox__main'>${lightboxForm}</div>
        </div>
      </div>
    </div>`;

    document.querySelector('body').insertAdjacentHTML('beforeend', lightboxContainer);

    getFormDetails(`https://www.redcrossfirstaidtraining.co.uk/contact-us/Request-a-call-back.aspx`, (formDetails) => {
      settings.formData = formDetails; 
      // Submit Button
      bindExperimentEvents.submitFormData(settings.formData);
    });

    /**
     * @desc Shows lightbox when mouse leaves document (after 5 seconds on the page)
     */
    const run = () => {
      setTimeout(() => {
        if (!Experiment.settings.lightboxShown) {
          services.exitIntentPlugin();
        }
      }, 5000);
    };
    if (document.readyState !== 'loading') {
      run();
    } else {
      document.addEventListener('DOMContentLoaded', run);
    }

    // Input Validation
    const inputFields = document.querySelectorAll('.RC045-inputValidation');

    [].forEach.call(inputFields, (field) => {
      bindExperimentEvents.addEventsToInputFields(field);
    });

    // Close Lightbox
    bindExperimentEvents.closeLightbox();
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
    /**
     * @desc Exit Intent
     */
    exitIntentPlugin() {
    /* eslint-disable */
      const exitIntent = {
        // OuiBounce plugin
        ouiPlugin: function(){
          (function (root, factory) {
            if (typeof define === 'function' && define.amd) {
              define(factory);
            } else if (typeof exports === 'object') {
              module.exports = factory(require, exports, module);
            } else {
              root.ouibounce = factory();
            }
          }(this, function (require, exports, module) {
            return function ouibounce(el, custom_config) {
              'use strict';
              var config = custom_config || {},
                aggressive = config.aggressive || false,
                sensitivity = setDefault(config.sensitivity, 200),
                timer = setDefault(config.timer, 1000),
                delay = setDefault(config.delay, 0),
                callback = config.callback || function () { },
                cookieExpire = setDefaultCookieExpire(config.cookieExpire) || '',
                cookieDomain = config.cookieDomain ? ';domain=' + config.cookieDomain : '',
                cookieName = config.cookieName ? config.cookieName : 'viewedOuibounceModal',
                sitewide = config.sitewide === true ? ';path=/' : '',
                _delayTimer = null,
                _html = document.documentElement;
  
              function setDefault(_property, _default) {
                return typeof _property === 'undefined' ? _default : _property;
              }
  
              function setDefaultCookieExpire(days) {
                // transform days to milliseconds
                var ms = days * 24 * 60 * 60 * 1000;
  
                var date = new Date();
                date.setTime(date.getTime() + ms);
  
                return "; expires=" + date.toUTCString();
              }
  
              setTimeout(attachOuiBounce, timer);
              function attachOuiBounce() {
                if (isDisabled()) { return; }

                _html.addEventListener('mouseleave', handleMouseleave);
                _html.addEventListener('mouseenter', handleMouseenter);
                _html.addEventListener('keydown', handleKeydown);
              }
  
              function handleMouseleave(e) {
                if (e.clientY > sensitivity) { return; }
  
                _delayTimer = setTimeout(fire, delay);
              }
  
              function handleMouseenter() {
                if (_delayTimer) {
                  clearTimeout(_delayTimer);
                  _delayTimer = null;
                }
              }
  
              var disableKeydown = false;
              function handleKeydown(e) {
                if (disableKeydown) { return; }
                else if (!e.metaKey || e.keyCode !== 76) { return; }
  
                disableKeydown = true;
                _delayTimer = setTimeout(fire, delay);
              }
  
              function checkCookieValue(cookieName, value) {
                return parseCookies()[cookieName] === value;
              }
  
              function parseCookies() {
                // cookies are separated by '; '
                var cookies = document.cookie.split('; ');
  
                var ret = {};
                for (var i = cookies.length - 1; i >= 0; i--) {
                  var el = cookies[i].split('=');
                  ret[el[0]] = el[1];
                }
                return ret;
              }
  
              function isDisabled() {
                return checkCookieValue(cookieName, 'true') && !aggressive;
              }
  
              // You can use ouibounce without passing an element
              // https://github.com/carlsednaoui/ouibounce/issues/30
              function fire() {
                if (isDisabled()) { return; }
  
                if (el) { $(el).fadeIn(); }
  
                callback();
                disable();
              }
  
              function disable(custom_options) {
                var options = custom_options || {};
  
                // you can pass a specific cookie expiration when using the OuiBounce API
                // ex: _ouiBounce.disable({ cookieExpire: 5 });
                if (typeof options.cookieExpire !== 'undefined') {
                  cookieExpire = setDefaultCookieExpire(options.cookieExpire);
                }
  
                // you can pass use sitewide cookies too
                // ex: _ouiBounce.disable({ cookieExpire: 5, sitewide: true });
                if (options.sitewide === true) {
                  sitewide = ';path=/';
                }
  
                // you can pass a domain string when the cookie should be read subdomain-wise
                // ex: _ouiBounce.disable({ cookieDomain: '.example.com' });
                if (typeof options.cookieDomain !== 'undefined') {
                  cookieDomain = ';domain=' + options.cookieDomain;
                }
  
                if (typeof options.cookieName !== 'undefined') {
                  cookieName = options.cookieName;
                }
  
                document.cookie = cookieName + '=true' + cookieExpire + cookieDomain + sitewide;
  
                // remove listeners
                _html.removeEventListener('mouseleave', handleMouseleave);
                _html.removeEventListener('mouseenter', handleMouseenter);
                _html.removeEventListener('keydown', handleKeydown);
              }
  
              return {
                fire: fire,
                disable: disable,
                isDisabled: isDisabled
              };
            };
          }));
        },
        // OUIBounce trigger
        exitTrigger: function () {
          this.ouibounce(null, { 
            cookieName: 'RC045_lightboxShown', 
            cookieDomain: 'https://www.redcrossfirstaidtraining.co.uk/',
            callback: function() {
              if (!Experiment.settings.lightboxShown) {
                setCookie('RC045_lightboxShown', 'true', null, 'redcrossfirstaidtraining.co.uk');
                Experiment.services.showLightbox();
              }
            } 
          });
        }
      }
      exitIntent.ouiPlugin();
      exitIntent.exitTrigger();
    },
    showLightbox() {
      const { settings } = Experiment;
      document.querySelector('.RC045-lightboxWrap').classList.remove('hidden');
      events.send(settings.ID, `Variation ${settings.VARIATION}`, `User Saw - Request a Call Back Lightbox`, { sendOnce: true });
      Experiment.settings.lightboxShown = true;
    },
    /**
     * @desc Validate Name
     */
    validateName(field) {
      const length = field.value.length;
      const errorMessage = field.nextElementSibling;
      if (length > 0 && length <= 256) {
        field.removeAttribute('style');
        if (errorMessage.classList.contains('RC045-errorMessage')) {
          errorMessage.classList.remove('RC045-errorMessage');
          errorMessage.style.display = 'none';
        }
      } else {
        field.style.border = '2.5px solid #CD121F';
        errorMessage.classList.add('RC045-errorMessage');
        errorMessage.style.display = 'block';
      }
    },
    /**
     * @desc Validate Telephone Number
     */
    validateNumber(field) {
      const number = field.value;
      const errorMessage = field.nextElementSibling;
      function validate(number) {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re.test(number);
      }
      if (validate(number)) {
        field.removeAttribute('style');
        if (errorMessage.classList.contains('RC045-errorMessage')) {
          errorMessage.classList.remove('RC045-errorMessage');
          errorMessage.style.display = 'none';
        }
      } else {
        field.style.border = '2.5px solid #CD121F';
        errorMessage.classList.add('RC045-errorMessage');
        errorMessage.style.display = 'block';
      }

    },
    /**
     * @desc Validate Email Address
     */
    validateEmail(field) {
      const email = field.value;
      const errorMessage = field.nextElementSibling;
      function validate(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }

      if (validate(email)) {
        field.removeAttribute('style');
        if (errorMessage.classList.contains('RC045-errorMessage')) {
          errorMessage.classList.remove('RC045-errorMessage');
          errorMessage.style.display = 'none';
        }
      } else {
        field.style.border = '2.5px solid #CD121F';
        errorMessage.classList.add('RC045-errorMessage');
        errorMessage.style.display = 'block';
      }
    },
    /**
     * @desc Validate Text Length
     */
    validateTextLength(field) {
      const length = field.value.length;
      const errorMessage = field.nextElementSibling;
      if (length > 0 && length <= 512) {
        field.removeAttribute('style');
        if (errorMessage.classList.contains('RC045-errorMessage')) {
          errorMessage.classList.remove('RC045-errorMessage');
          errorMessage.style.display = 'none';
        }
      } else {
        field.style.border = '2.5px solid #CD121F';
        errorMessage.classList.add('RC045-errorMessage');
        errorMessage.style.display = 'block';
      }
    },
    /* eslint-enable */
  },

  components: {
    /*eslint-disable */
    /**
     * @desc Inits all page level tracking
     */
    successFormContent() {
      // Replace Message
      document.querySelector('.lightboxTop__text .text-bold').textContent = 'Thank your for your enquiry.';
      document.querySelector('.lightboxTop__text .subText').textContent = '';
      
      const successMainMessage = `<div class='RC045-successMessageWrap'>
        <div class='RC045-successMessage'>
          <div class='messageLine'>Our working hours are 08:30 - 17:00, Monday to Friday.</div>
          <div class='messageLine'>If you have subitted this form before 13:00, we will call you back today.</div>
          <div class='messageLine'>If you have contacted us after 13:00, we will endeavour to call you before 12:00 the next working day.</div>
          <div class='messageLine'>Should you require more urgent assistance, you can call us:</div>
          <div class='messageLine'>First aid for the workplace - 0844 871 8000.</div>
          <div class='messageLine'>First aid for the public - 0344 412 2808.</div>
        </div>
      </div>`;
      document.querySelector('.RC045-lightbox__main').innerHTML = successMainMessage;

      document.querySelector('.RC045-lightbox__top .icon-phone.icon-red').style.bottom = '0';
      document.querySelector('.lightboxTop__text .text-bold').style.marginTop = '20px';
    },
    /* eslint-enable */
  },

  bindExperimentEvents: {
    /*eslint-disable */
    /**
     * @desc Input Fields Event Listener
     */
    addEventsToInputFields(field) {
      const { services } = Experiment;
      let timeout = null;
      field.addEventListener('keyup', () => {
        if (field.classList.contains('RC045-nameInput')) {
          clearTimeout(timeout);
          // Make a new timeout set to go off in 500ms
          timeout = setTimeout(function () {
            services.validateName(field);
          }, 500);
        } else if (field.classList.contains('RC045-numberInput')) {
          timeout = setTimeout(function () {
            services.validateNumber(field);
          }, 2000);
        } else if (field.classList.contains('RC045-emailInput')) {
          clearTimeout(timeout);
          timeout = setTimeout(function () {
            services.validateEmail(field);
          }, 500);
        } else if (field.classList.contains('RC045-textInput')) {
          clearTimeout(timeout);
          timeout = setTimeout(function () {
            services.validateTextLength(field);
          }, 500);
        }
      });
    },
    /**
     * @desc Close Lightbox
     */
    closeLightbox() {
      const { settings } = Experiment;
      const closeIcon = document.querySelector('.lightboxTop__close');
      closeIcon.addEventListener('click', () => {
        document.querySelector('.RC045-lightboxWrap').style.display = 'none';
        events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Leave Call Back Lightbox`, { sendOnce: true });
      });
    },
    /* eslint-enable */
    /**
     * @desc Checks and Submits Form Data
     */
    /*eslint-disable */
    submitFormData(formData) {
      const { settings, components } = Experiment;
      const submitBtn = document.querySelector('.RC045-lightboxContainer .scfSubmitButtonBorder>input');
      
      submitBtn.addEventListener('click', () => {
        let emptyFieldsCount = 0;
        const errors = document.querySelectorAll('.RC045-errorMessage');
        // Get Input Values from form
        const lightboxForm = document.querySelector('.RC045-lightbox__main');
        const nameFieldId = formData['name-id'];
        const nameValue = lightboxForm.querySelector('.RC045-nameInput').value;
        const numberFieldId = formData['number-id'];
        const numberValue = lightboxForm.querySelector('.RC045-numberInput').value;
        const emailFieldId = formData['email-id'];
        const emailValue = lightboxForm.querySelector('.RC045-emailInput').value;
        const textFieldId = formData['text-id'];
        const textValue = lightboxForm.querySelector('.RC045-textInput').value;
        if (nameValue === '' || numberValue === '' || emailValue === '' || textValue === '') {
          emptyFieldsCount += 1;
        }
        if (errors.length > 0) {
          [].forEach.call(errors, (errorField) => {
            errorField.textContent = '* This field is required';
          });
        } else if (errors.length === 0 && emptyFieldsCount === 0) {
          if (formData) {
            const formReference = formData['form-name'];
            const formReferenceValue = formData['form-value'];
            const viewStateValue = formData['view-state'];
            const viewStateGeneratorValue = formData['view-state-generator'];
            const eventValidationValue = formData['event-validation'];
            
            const reqData = {
              '__VIEWSTATE': `${viewStateValue}`,
              '__EVENTTARGET': '',
              '__EVENTARGUMENT': '',
              '__EVENTVALIDATION': `${eventValidationValue}`,
              '__VIEWSTATEGENERATOR': `${viewStateGeneratorValue}`,
              'main_0$form_A73668ED2F8545EAA481448D4A79A0A1$form_A73668ED2F8545EAA481448D4A79A0A1_submit': 'Submit',
            }
            reqData[`${formReference}`] = formReferenceValue;
            reqData[`${nameFieldId}`] = nameValue;
            reqData[`${numberFieldId}`] = numberValue;
            reqData[`${emailFieldId}`] = emailValue;
            reqData[`${textFieldId}`] = textValue;

            jQuery.ajax({
              type: 'post',
              url: 'https://www.redcrossfirstaidtraining.co.uk/contact-us/Request-a-call-back.aspx',
              data: reqData,
              success: function(data) {
                // Run the code here that needs
                //    to access the data returned
                if (data.indexOf('Thank you for your enquiry.') > -1) {
                  events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Submit Call Back`, { sendOnce: true });
                  components.successFormContent();
                } else {
                  document.querySelector('#RC045-submit__error').classList.add('RC045-errorMessage');
                }
                return data;
              },
            });
          }
        } else {
          document.querySelector('#RC045-field__error').classList.add('RC045-errorMessage');
          setTimeout(() => {
            document.querySelector('#RC045-field__error').classList.remove('RC045-errorMessage');
          }, 5000);
          
        }
      });
    },
    /* eslint-enable */
  },
};

export default Experiment;
