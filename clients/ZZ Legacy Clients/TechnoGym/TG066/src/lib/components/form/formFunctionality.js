import { __ } from "../../../helpers";

/**
 * name: test
last-name: test
email: test@test.com
comment: 
profile: private_individual
need-business: 
company: 
need-freelance: 
form_key: 24HSmailJDIo4aSn
 */

export default () => {


  /**
   * @desc add the form key from the contact page
   */
  const addFormKey = () => {
    let contactUrl;
    const pathName = window.location.pathname;
    if (pathName.indexOf('/it/') > -1) {
      contactUrl = 'https://www.technogym.com/it/contacts/';
    } else {
      contactUrl = 'https://www.technogym.com/gb/contacts/';
    }
    jQuery.ajax({
      url: contactUrl,
      success: function (data) {
        const d = document.createElement('div');
        d.innerHTML = data;
        const formKey = jQuery(d).find('#contactForm > input:first');
        formKey.appendTo('.TG066-sideForm');
      }
    });
  };

  addFormKey();

  /**
   * @desc Show the "reasons" based on the radio button clicked
   */
  const showHideTypeOptions = () => {
    const radioOption = document.querySelectorAll('.TG066-option');
    const allReasons = document.querySelectorAll('.TG066-reasons .TG066-reason');

    for (let index = 0; index < radioOption.length; index += 1) {
      const element = radioOption[index];
      element.addEventListener('click', (e) => {
        // check the radio button
        e.currentTarget.querySelector('input').checked = true;

        // loop through the matching reasons, if matches show it
        [].forEach.call(allReasons, (reason) => {
          reason.classList.remove('TG066-reason_active');
        });

        const matchingReason = e.currentTarget.querySelector('input').getAttribute('reason-attr');
        const matchingEl = document.querySelector(`#${matchingReason}`);

        if (matchingEl) {
          if (matchingEl.id === 'TG066-business_reason') {
            matchingEl.innerHTML =
            `<select class="TG066-business_select business" required="" name="need-business"> <option value="">Market *</option> <option value="military">Military</option> <option value="community">Community</option> <option value="medical_rehab">Medical Rehab</option> <option value="education">Education</option> <option value="sports">Sports</option> <option value="residential">Residential</option> <option value="corporate">Corporate</option> <option value="hotels_spas">Hotels and Spas</option> <option value="fitness_club">Fitness Club</option> </select>
            <input name="company" id="company" title="Company" value="" class="input-text" type="text" placeholder="Company name *" required="">`;
          } else if (matchingEl.id === 'TG066-freelance_reason') {
            matchingEl.innerHTML = `<select class="TG066-freelance_select freelance validate-select" name="need-freelance" required="">
             <option value="">Job *</option> <option value="architect">Architect</option> <option value="personal_trainer">Personal Trainer</option> <option value="doctor">Doctor</option> <option value="journalist">Journalist</option> <option value="other">Other profession</option> </select>`;
          } else {
            matchingEl.innerHTML = '';
          }
          matchingEl.classList.add('TG066-reason_active');
        }
      });
    }
  };

  showHideTypeOptions();

  /**
   * @desc loader for when the form has been submitted
   */
  const loader = () => {
    const loaderHTML = document.createElement('div');
    loaderHTML.classList.add('TG066-loader');
    loaderHTML.innerHTML = `
    <div class="TG066-loader_inner">
      <span></span>
      <span></span>
      <span></span>
    </div>`;
    const form = document.querySelector('.TG066_slideOutForm');
    form.appendChild(loaderHTML);
  };

  loader();

  const showLoader = () => {
    const loaderEl = document.querySelector('.TG066-loader');
    loaderEl.classList.add('TG066-loader_show');
  };

  const successMessage = () => {
    const successMessageEl = document.createElement('div');
    successMessageEl.classList.add('TG066-success');
    successMessageEl.innerHTML = '<p>Your email has successfully been sent.</p>';
    const form = document.querySelector('.TG066_slideOutForm');
    form.querySelector('.TG066-submit_form').insertAdjacentElement('afterend', successMessageEl);

    // clear all fields
    const allFieldsInput = document.querySelectorAll('.TG066-allFields input');
    for (let index = 0; index < allFieldsInput.length; index += 1) {
      const element = allFieldsInput[index];
      element.value = '';
    }
    const messageBox = document.querySelector('.TG066-allFields textarea');
    messageBox.value = '';
  };

  const closeFormAfterSuccess = () => {
    const closeButton = document.querySelector('.TG066_slideOutForm .TG066-close');
    closeButton.click();
    // remove success message
    document.querySelector('.TG066-success').remove();
  };
  /**
  * @desc add validation to the form using parsley.js
  */
  const formValidation = () => {
    jQuery.getScript('//cdnjs.cloudflare.com/ajax/libs/parsley.js/2.9.0/parsley.min.js', function (data, textStatus, jqxhr) {
      jQuery('.TG066-sideForm').parsley();
    });
  };

  formValidation();

  /**
   * @desc On click of the submit button
   */
  let AJXURL;
  if (window.location.href.indexOf('/it/') > -1) {
    AJXURL = 'https://www.technogym.com/it/contacts/index/post/';
  } else {
    AJXURL = 'https://www.technogym.com/gb/contacts/index/post/';
  }

  jQuery('.TG066-sideForm').on('submit', (e) => {
    e.preventDefault();
    if (jQuery('.TG066-sideForm').parsley().isValid()) {
      showLoader();
      jQuery.ajax({
        url: AJXURL,
        type: 'post',
        data: jQuery('.TG066-sideForm').serialize(),
        success: (data) => {
          const loaderEl = document.querySelector('.TG066-loader');
          loaderEl.classList.remove('TG066-loader_show');
          successMessage();

          setTimeout(() => {
            closeFormAfterSuccess();
          }, 5000);
        },
      });
    }
  });
};
