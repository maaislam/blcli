import { fullStory, events, eventFire, scrollTo } from '../../../../lib/utils';
import { observer, pollerLite } from '../../../../lib/uc-lib';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'EH001',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}v${settings.VARIATION}`);

    const emptyDiv = document.createElement('div');
    emptyDiv.classList.add('EH001-emptyDiv');
    document.querySelector('#form-area').appendChild(emptyDiv);

    let obs = null;

    const form = document.querySelector('.registrationForm__form___1UO-_');

    function runFunctions() {
      if (document.querySelector('.EH001-emptyDiv')) {
        if (!document.querySelector('.EH001_label')) {
          components.requiredFields();
          components.errorMessage();
          components.addPostcodeSpace();
          // components.specialOfferAgreement();

          // postcode changes
          const countrySelect = document.querySelector('.registrationForm__countrySelect___1ALbG');
          if (countrySelect) {
            if (countrySelect.options[countrySelect.selectedIndex].value === '215') {
              components.validatePostCode();
            }
            countrySelect.addEventListener('change', () => {
              if (countrySelect.options[countrySelect.selectedIndex].value === '215') {
                components.validatePostCode();
              }
            });
          }

          // V2 under CTA text
          if (settings.VARIATION === '2') {
            components.CTAtext();
            components.scrollToTop();
          }

          eventFire(document, `${settings.ID.toLowerCase()}didchangeform`);
        }
      }

      if (obs) {
        obs.disconnect(form);
      }
      /* eslint-disable */
      addObserver();
      /* eslint-enable */
    }

    function addObserver() {
      obs = observer.connect([form], () => {
        runFunctions();
      }, { config: { attributes: false, childList: true, subtree: true }, throttle: 1000 });
    }

    runFunctions();
    if (settings.VARIATION === '2') {
      components.progressBar();
    }

    /* eslint-enable */
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
  },

  components: {
    requiredFields: () => {
      const registerForm = document.getElementById('social-registration');

      const labels = {
        '.registrationForm__nameInput___3NdzK': 'What is your name?',
        '.registrationForm__countrySelect___1ALbG': 'Country',
        '.registrationForm__zipInput___3N-AB': 'Postcode',
        '.registrationForm__emailInput___1sTIK': 'Email',
        '.registrationForm__passwordInput___16GJp': 'Password',
        '.registrationForm__referrerSelect___1hxQS ': 'Where did you hear about us?',
      };
      for (let i = 0; i < Object.keys(labels).length; i += 1) {
        const data = Object.entries(labels)[i];
        const key = data[0];
        const category = data[1];

        const requiredLabel = document.createElement('div');
        requiredLabel.classList.add('EH001_label');
        requiredLabel.innerHTML = `${category}<span>*</span>`;

        if (registerForm.querySelector(key)) {
          const element = registerForm.querySelector(key);

          // add the password requirements
          if (element.classList.contains('registrationForm__passwordInput___16GJp')) {
            requiredLabel.innerHTML = `<span>${category}</span><span>*</span> <span class="EH001-validation">8 characters or more, no spaces allowed</span>`;
          }
          element.insertAdjacentElement('beforebegin', requiredLabel);
          // remove placeholder
          if (element.getAttribute('placeholder')) {
            element.removeAttribute('placeholder');
          }
        }
      }
    },
    /* specialOfferAgreement: () => {
      if (document.querySelector('.AgreeTerms__checkbox___d8c0m')
      && document.querySelector('.registrationForm__referrerSelect___1hxQS
      ~ .registrationForm__submit___311-o')) {
        const fakeButton = document.createElement('div');
        fakeButton.classList.add('EH001-fake_submit');
        fakeButton.innerHTML = 'Find my matches';

        const button = document.querySelector
        ('.registrationForm__referrerSelect___1hxQS ~ .registrationForm__submit___311-o');
        document.querySelector('.AgreeTerms__checkbox___d8c0m > div')
        .insertAdjacentElement('afterend', fakeButton);

        fakeButton.addEventListener('click', () => {
          button.click();
        });
      }
    }, */
    // add a space while typing postcode on UK
    /* eslint-disable */
    validatePostCode: () => {
      const postCodeBox = document.querySelector('.registrationForm__zipInput___3N-AB');
      const countrySelect = document.querySelector('.registrationForm__countrySelect___1ALbG');
      postCodeBox.addEventListener('keyup', () => {
        if (countrySelect.options[countrySelect.selectedIndex].value === '215') {
          const ukPostcodeRegex = /^([Gg][Ii][Rr]0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))[0-9][A-Za-z]{2})$/;
          const postCodeValue = postCodeBox.value;
          if (ukPostcodeRegex.test(postCodeValue)) {
            postCodeBox.value = postCodeValue.replace(/(\d\w\w)$/, ' $1');
          }
        }
      });
    },
    // add the progress bar on V2
    progressBar: () => {
      const progressBar = document.createElement('div');
      progressBar.classList.add('EH001-progress');
      progressBar.innerHTML = `
      <div class="EH001-step EH001-step_one EH001-active"><span>1</span></div>
      <div class="EH001-step EH001-step EH001-step_two"><span>2</span></div>
      <div class="EH001-step EH001-step EH001-step_three"><span>3</span></div>`

      const container = document.querySelector('#social-registration');
      const heading = document.querySelector('.frame__frame___2hnV5.frame__fixedFrame___1IXDt');
      if(window.innerWidth < 641) {
        container.insertBefore(progressBar, container.firstChild);
      } else {
        heading.appendChild(progressBar);
      }

      // show active
      const firstButton = document.querySelector('.registrationForm__submit___311-o');
      firstButton.addEventListener('click', () => {
        pollerLite(['.AgreeTerms__checkbox___d8c0m'], () => {
          document.querySelector('.EH001-step_one').classList.remove('EH001-active');
          document.querySelector('.EH001-step_two').classList.add('EH001-active');
        });
      });
    },
    /* eslint-enable */
    CTAtext: () => {
      if (document.querySelector('.registrationForm__referrerSelect___1hxQS ~ .registrationForm__submit___311-o')) {
        const bottomText = document.createElement('span');
        bottomText.classList.add('EH001-bottom_Text');
        bottomText.innerHTML = 'Get ready - we’re going to ask you a bunch of questions to help find your perfect match. We recommend you set aside 30 minutes for this process';

        if (!document.querySelector('.EH001-bottom_Text')) {
          document.querySelector('.registrationForm__form___1UO-_').appendChild(bottomText);

          const button = document.querySelector('.registrationForm__referrerSelect___1hxQS ~ .registrationForm__submit___311-o');
          button.insertAdjacentElement('afterend', document.querySelector('.EH001-bottom_Text'));
        }
      }
    },
    errorMessage: () => {
      const errorMessage = document.querySelector('.messages__error___1HHPf');
      if (errorMessage) {
        if (window.innerWidth < 767) {
          document.querySelector('.registrationForm__firstName___YlLMK').style = 'margin-top: 40px';
        }
      }
    },
    scrollToTop: () => {
      const topOfForm = document.querySelector('#social-registration');
      const firstCTA = document.querySelector('.registrationForm__submit___311-o');
      const productsVal = topOfForm.getBoundingClientRect().y + window.scrollY;
      if (productsVal > 0) {
        firstCTA.addEventListener('click', () => {
          scrollTo(productsVal - 200);
        });
      }
    },
    addPostcodeSpace: () => {
      const postCodeBox = document.querySelector('.registrationForm__zipInput___3N-AB');
      const countrySelect = document.querySelector('.registrationForm__countrySelect___1ALbG');
      if (countrySelect.options[countrySelect.selectedIndex].value === '215') {
        const ukPostcodeRegex = /^([Gg][Ii][Rr]0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))[0-9][A-Za-z]{2})$/;
        const postCodeValue = postCodeBox.value;
        if (ukPostcodeRegex.test(postCodeValue)) {
          postCodeBox.value = postCodeValue.replace(/(\d\w\w)$/, ' $1');
        }
      }
    },
  },
};

export default Experiment;
