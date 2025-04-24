import { fullStory } from '../../../../lib/utils';

const Experiment = {
  /**
  * @desc Variation settings. Useful for when multiple variations are developed
  * in a single project so you can just toggle the variation number in production
  */
  settings: {
    ID: 'PU016',
    VARIATION: '2',
  },
  globals: {
    formFilled: false,
  },

  init: function init() {
    // Setup
    const { settings, services, globals } = Experiment;
    // const { components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(settings.ID + settings.VARIATION);

    const title = document.querySelector('.registrationContainer h1');
    const socialButtons = document.querySelector('[ng-hide="socialReg"]');
    const wrapper = document.querySelector('.registrationContainer');

    // change the text of the buttons
    const faceBook = document.querySelector('.btn.btn-facebook');
    const google = document.querySelector('.btn.btn-google');
    faceBook.innerHTML = '<i class="fa fa-facebook-official"></i>Sign up with Facebook';
    google.innerHTML = '<i class="google-g"></i> Sign up with Google';

    const socialTwoButtons = socialButtons.querySelector('.or_horizontal_seperator__container');
    socialTwoButtons.querySelector('p').textContent = '- OR -';
    if (settings.VARIATION === '1') {
      title.textContent = 'Your details';
    }

    /* VARIATION 2 */
    if (settings.VARIATION === '2') {
      const hideFormButton = document.createElement('div');
      hideFormButton.classList.add('PU016-formButton');
      hideFormButton.innerHTML = '<a>Create a new account</a>';

      const form = document.querySelector('form[name="registrationForm"]');
      const formFields = form.querySelectorAll('input-box');
      wrapper.insertBefore(hideFormButton, form.previousSibling);

      socialButtons.insertBefore(socialTwoButtons, socialButtons.firstChild);

      // move the social buttons after 'create account button'
      wrapper.insertBefore(socialButtons, form.nextSibling);

      // check if form has been filled in
      for (let i = 0; i < formFields.length; i += 1) {
        const element = formFields[i];
        const elementInput = element.querySelector('input');
        if (elementInput.value === '') {
          globals.formFilled = false;
        } else {
          globals.formFilled = true;
        }
      }
      // if form is not filled in by signing in hide the for
      if (globals.formFilled !== true) {
        wrapper.classList.add('PU016-notsignedIn');
        hideFormButton.addEventListener('click', () => {
          form.classList.add('PU016-form_showing');
          // move the social buttons to the bottom
          wrapper.insertBefore(socialButtons, form.nextSibling);
          hideFormButton.classList.add('PU016-form_showing');
        });
      }
    }
  },
  services: {
    /**
    * @desc Inits all page level tracking
    */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
  },

  components: {},
};

export default Experiment;
