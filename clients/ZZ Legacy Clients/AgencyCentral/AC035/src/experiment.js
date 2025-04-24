import { fullStory, events, setCookie, getCookie, deleteCookie } from '../../../../lib/utils';
import { observer, pollerLite } from '../../../../lib/uc-lib';

/**
 * {{AC035}} - {{Contact Form Improvements}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'AC035',
    VARIATION: '{{VARIATION}}',
  },

  cache: (() => {
    const bodyVar = document.body;
    const form = bodyVar.querySelector('#contact-form-container');

    return {
      bodyVar,
      form,
    };
  })(),

  init() {    
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    services.targetClicks();
    services.detectStage();
    services.updateCookie();
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
     * Add an observer to the form to detect what stage it's on.
     */
    detectStage() {
      const formContainer = document.querySelector('.contact-body .inner-contact-body');
      if (formContainer) {
        observer.connect(formContainer, () => {
          /**
           * Need to remove / replace this, formRow isn't available straight away.
           */
          pollerLite([
            '.contact-body .inner-contact-body > .row',
          ], () => {
            const formRow = document.querySelector('.contact-body .inner-contact-body > .row');
            if (formRow) {
              let isEmpOrCand;
              pollerLite([
                () => {
                  let run = false;
                  isEmpOrCand = getCookie('empOrCand');
                  if (isEmpOrCand) {
                    if (isEmpOrCand === 'neither') {
                      const addedType = getCookie('AC035-Type');
                      if (addedType) {
                        if (addedType === 'employer') {
                          isEmpOrCand = 'emp';
                        } else {
                          isEmpOrCand = 'cnd';
                        }
                      }
                    }
                    run = true;
                  }
                  return run;
                },
              ], () => {
                /**
                 * Change cookie based on user choice and pass to the next formRow
                 */
                const userTypes = document.querySelectorAll('#contact-form-container .contact-body .selection.trigger-user-type');
                if (userTypes.length > 0) {
                  for (let j = 0; userTypes.length > j; j += 1) {
                    userTypes[j].addEventListener('click', () => {
                      const thisUserType = userTypes[j].getAttribute('data-value');
                      if (thisUserType === 'candidate') {
                        setCookie('empOrCand', 'cnd');
                      } else {
                        setCookie('empOrCand', 'emp');
                      }
                    });
                  }
                }
                formRow.classList.add(`AC035-is-${isEmpOrCand}`);
              });
              if (formRow.getAttribute('id') === 'user-type-selection') {
                /**
                 * User Type:
                 */
                // Add class for styling
                Experiment.cache.form.setAttribute('class', '');
                Experiment.cache.form.classList.add('AC035-user-type');
                this.userSelection();
              } else if (formRow.getAttribute('id') === 'agency-branch-selection') {
                /**
                 * Location:
                 */
                // Add class for styling
                Experiment.cache.form.setAttribute('class', '');
                Experiment.cache.form.classList.add('AC035-location');
                this.officeLocation(isEmpOrCand);
              } else if (formRow.getAttribute('id') === 'email-enquiry-form') {
                /**
                 * Job submission to recruiter
                 */
                // Add class for styling
                Experiment.cache.form.setAttribute('class', '');
                Experiment.cache.form.classList.add('AC035-email-enquiry');
                pollerLite([
                  () => {
                    let run = false;
                    isEmpOrCand = getCookie('empOrCand');
                    if (isEmpOrCand) {
                      if (isEmpOrCand === 'neither') {
                        isEmpOrCand = 'cnd';
                      }
                      run = true;
                    }
                    return run;
                  },
                ], () => {
                  this.emailEnquiry(isEmpOrCand);
                });
              } else {
                /**
                 * No ID's attached
                 * Use other methods to check what the popup is.
                 */
                const displayTelephoneInput = formRow.querySelector('input#contact-form-employer-name');
                const displayedNumber = formRow.querySelector('a.telephone-link');
                if (displayTelephoneInput || displayedNumber) {
                  // Display company telephone number
                  Experiment.cache.form.setAttribute('class', '');
                  Experiment.cache.form.classList.add('AC035-display-number');
                  this.displayNumber(isEmpOrCand);
                }
                // Candiadate request number
                const formSubmit = formRow.querySelector('input[type="submit"]');
                if (formSubmit && formSubmit.value === 'Display telephone number') {
                  // Display company telephone number
                  Experiment.cache.form.setAttribute('class', '');
                  Experiment.cache.form.classList.add('AC035-display-number');
                  this.displayNumber(isEmpOrCand);
                }
                if (formSubmit && formSubmit.value === 'Visit website') {
                  // Display company telephone number
                  Experiment.cache.form.setAttribute('class', '');
                  Experiment.cache.form.classList.add('AC035-visit-site');
                  this.displayNumber(isEmpOrCand);
                }
              }
            }
          });
        }, {
          config: {
            childList: true,
            subtree: false,
            attributes: true,
          },
        });
      }
    },
    /**
     * Target the click events that open the popup. For storing information
     */
    targetClicks() {
      const agencies = Experiment.cache.bodyVar.querySelectorAll('.agency-result');

      if (agencies.length > 0) {
        for (let i = 0; agencies.length > i; i += 1) {
          const agencyLinks = agencies[i].querySelectorAll('.contact-options-container .contact-option-container');
          if (agencyLinks.length > 0) {
            for (let k = 0; agencyLinks.length > k; k += 1) {
              agencyLinks[k].addEventListener('click', () => {
                events.send(Experiment.settings.ID, 'Clicked', 'User clicked contact option');
                const companyName = agencies[i].dataset.name;
                deleteCookie('AC035-CompanyName');
                setCookie('AC035-CompanyName', companyName);
              });
            }
          }
        }
      }
    },
    /**
     * Run this function when no user has been selected. E,g Emp or Cand
     */
    userSelection() {
      const { cache, components } = Experiment;
      const userTypeSelection = cache.form.querySelector('#user-type-selection');
      if (userTypeSelection) {
        // Run functions here.
        components.replaceUsersInfo(userTypeSelection);
      }
    },
    /**
     * Run this function when there has been no location chosen
     */
    officeLocation() {
      const { cache, components } = Experiment;
      const locationContainer = cache.form.querySelector('#agency-branch-selection');
      if (locationContainer) {
        // Run functions here.
        components.replaceLocationTitle(locationContainer);
        components.locationControls(locationContainer);
      }
    },
    /**
     * Changes to the recruiter posting a job email enquiry form.
     */
    emailEnquiry(empOrCand) {
      const changeOrder = () => {
        const personalDetails = Experiment.cache.form.querySelectorAll('.col-md-12.form-group');
        if (personalDetails.length > 1) {
          if (empOrCand === 'emp') {
            let messageAgency;
            let yourDetails;
            let jobDetails;
            for (let i = 0; personalDetails.length > i; i += 1) {
              if (personalDetails[i].querySelector('h2')) {
                if (personalDetails[i].querySelector('h2').textContent.match(/message/gi)) {
                  messageAgency = personalDetails[i];
                }
                if (personalDetails[i].querySelector('h2').textContent.match(/details/gi)) {
                  yourDetails = personalDetails[i];
                }
                if (personalDetails[i].querySelector('h2').textContent.match(/job/gi)) {
                  jobDetails = personalDetails[i];
                }
              }
              // Move elements
              if (yourDetails) {
                personalDetails[0].insertAdjacentElement('beforebegin', yourDetails);
                if (messageAgency) {
                  messageAgency.insertAdjacentElement('beforebegin', yourDetails);
                }
              }
            }
            if (jobDetails) {
              jobDetails.classList.add('AC035-job-detials');
            }
            if (yourDetails) {
              yourDetails.classList.add('AC035-your-detials');
            }
            if (messageAgency) {
              messageAgency.classList.add('AC035-message-details');
            }
          }
          if (empOrCand === 'cnd') {
            personalDetails[0].classList.add('AC035-cnd-details');
            personalDetails[1].classList.add('AC035-cnd');
            personalDetails[2].classList.add('AC035-cnd-cv');
            personalDetails[3].classList.add('AC035-cnd-job');
            personalDetails[0].insertAdjacentElement('afterend', personalDetails[2]);
          }
        }
      };
      const setTextareaRowSize = () => {
        // const details = Experiment.cache.form.querySelector('.col-md-12.form-group');
        // if (details) {
        const textareas = Experiment.cache.form.querySelectorAll('textarea');
        if (textareas.length > 0) {
          for (let i = 0; textareas.length > i; i += 1) {
            textareas[i].setAttribute('rows', '5');
          }
        }
        // }
      };
      const amendJobSpec = () => {
        const jobSpecBtn = Experiment.cache.form.querySelector('input#contact-form-job-spec-file');
        if (jobSpecBtn) {
          if (!document.querySelector('input#contact-form-job-spec-file')) {
            jobSpecBtn.insertAdjacentHTML('beforebegin', '<label for="contact-form-job-spec-file">Attach Job Spec</label>');
          }
        }
      };
      const amendCV = () => {
        const cvField = Experiment.cache.form.querySelector('input#contact-form-cv-file');
        if (cvField) {
          cvField.insertAdjacentHTML('beforebegin', '<label for="contact-form-cv-file">Attach a CV (Optional)</label>');
        }
      };
      const addTitleIcon = () => {
        const companyName = getCookie('AC035-CompanyName');
        const decodedCompanyName = decodeURIComponent(companyName);
        const title = Experiment.cache.form.querySelector('.title-section h1');
        let titleToAdd = null;
        if (empOrCand === 'emp') {
          titleToAdd = 'Submit a Job Specification to';
        } else if (empOrCand === 'cnd') {
          titleToAdd = 'Send an email to';
        } else {
          titleToAdd = '';
        }
        if (title && !title.querySelector('i')) {
          if (companyName) {
            title.innerHTML = `<i class="fa fa-envelope"></i> ${titleToAdd} ${decodedCompanyName}`;
          } else {
            title.insertAdjacentHTML('afterbegin', '<i class="fa fa-envelope"></i>');
          }
        }
      };
      const addRequired = () => {
        const formWrap = Experiment.cache.form.querySelector('#contact-form');
        const items = [
          Experiment.cache.form.querySelector('label[for="contact-form-email-address"]'),
          Experiment.cache.form.querySelector('label[for="contact-form-company-name"]'),
          Experiment.cache.form.querySelector('label[for="contact-form-contact-name"]'),
          Experiment.cache.form.querySelector('label[for="contact-form-job-title"]'),
          Experiment.cache.form.querySelector('label[for="contact-form-telephone-number"]'),
          Experiment.cache.form.querySelector('label[for="contact-form-employment-type"]'),
          // CND
          Experiment.cache.form.querySelector('label[for="contact-form-first-name"]'),
          Experiment.cache.form.querySelector('label[for="contact-form-surname"]'),
          Experiment.cache.form.querySelector('label[for="contact-form-email-subject"]'),
          Experiment.cache.form.querySelector('label[for="contact-form-email-content"]'),
        ];
        if (items.length > 0) {
          items.map((item) => {
            if (item && !item.querySelector('sup')) {
              item.insertAdjacentHTML('beforeend', '<sup>*</sup>');
            }
          });
        }
        if (formWrap && !formWrap.querySelector('.AC035-required')) {
          formWrap.insertAdjacentHTML('afterbegin', '<div class="AC035-required"><sup>*</sup>Required Field</div>');
        }
      };

      if (empOrCand === 'emp') {
        amendJobSpec();
      }
      if (empOrCand === 'cnd') {
        amendCV();
      }
      // Run for both
      changeOrder();
      setTextareaRowSize();
      addTitleIcon();
      addRequired();
    },
    /**
     * Changes for the request number popup.
     */
    displayNumber(empOrCand) {
      const formContainer = Experiment.cache.form.querySelector('.contact-body');
      /**
       * Add title name
       */
      const addName = () => {
        const companyName = getCookie('AC035-CompanyName');
        const decodedCompanyName = decodeURIComponent(companyName);

        if (formContainer) {
          const formTitle = formContainer.querySelector('.title-section');
          let icon = null;
          let text = '';
          const submit = formContainer.querySelector('input[type="submit"]');
          if (submit) {
            if (submit.value === 'Visit website') {
              icon = 'desktop';
              text = 'Visit Website - ';
            } else {
              icon = 'phone';
              text = 'Call ';
            }
          }
          if (formTitle && companyName) {
            if (!formTitle.querySelector('h1')) {
              formTitle.insertAdjacentHTML('afterbegin', `
                <h1><i class="fa fa-${icon}"></i>${text}${decodedCompanyName}</h1>
              `);
            } else {
              const existingTitle = formTitle.querySelector('h1');
              if (existingTitle && !existingTitle.querySelector('i')) {
                existingTitle.insertAdjacentHTML('afterbegin', '<i class="fa fa-phone"></i>');
              }
            }
          }
        }
      };
      /**
       * Move the copy above submit
       */
      const moveContent = () => {
        if (formContainer) {
          const copy = formContainer.querySelector('.v2st-whyask-1');
          const ref = formContainer.querySelector('input.form-control.btn-brand-full-width.btn.btn-brand-full-secondary');
          if (copy && ref) {
            ref.insertAdjacentElement('beforebegin', copy);
          }
        }
      };
      /**
       * Add label to text input
       */
      const addInputLabel = () => {
        if (formContainer) {
          const companyNameInput = formContainer.querySelector('input#contact-form-employer-name');
          if (companyNameInput && !formContainer.querySelector('#AC035-label-1')) {
            companyNameInput.insertAdjacentHTML('beforebegin', '<label id="AC035-label-1" for="contact-form-employer-name">Company Name:</label>');
          }
          const nameInput = formContainer.querySelector('input#contact-form-first-name');
          if (nameInput && !formContainer.querySelector('#AC035-label-2')) {
            nameInput.insertAdjacentHTML('beforebegin', '<label id="AC035-label-2" for="contact-form-first-name">First Name:</label>');
          }
          const lastNameInput = formContainer.querySelector('input#contact-form-surname');
          if (lastNameInput && !formContainer.querySelector('#AC035-label-3')) {
            lastNameInput.insertAdjacentHTML('beforebegin', '<label id="AC035-label-3" for="contact-form-surname">Last Name:</label>');
          }
          const jobTitleInput = formContainer.querySelector('input#contact-form-job-title');
          if (jobTitleInput && !formContainer.querySelector('#AC035-label-4')) {
            jobTitleInput.insertAdjacentHTML('beforebegin', '<label id="AC035-label-4" for="contact-form-job-title">Job Title:</label>');
          }
          const emailInput = formContainer.querySelector('input#contact-form-email-address');
          if (emailInput && !formContainer.querySelector('#AC035-label-5')) {
            emailInput.insertAdjacentHTML('beforebegin', '<label id="AC035-label-5" for="contact-form-email-address">Email Address:</label>');
          }
          const phoneInput = formContainer.querySelector('input#contact-form-telephone-number');
          if (phoneInput && !formContainer.querySelector('#AC035-label-6')) {
            phoneInput.insertAdjacentHTML('beforebegin', '<label id="AC035-label-6" for="contact-form-telephone-number">Phone Number:</label>');
          }
        }
      };
      /**
       * Add a blue banner above the email inputs on the candidate call form.
       */
      const addGDPRBanner = () => {
        const banner = '<div class="AC035-cnd-banner"><p>If you would like this agency to contact should a vacancy become available, add your information below:</p></div>';
        const ref = formContainer.querySelector('label[for="contact-form-email-address"]');
        if (ref && !formContainer.querySelector('.AC035-cnd-banner')) {
          ref.insertAdjacentHTML('beforebegin', banner);
        }
      };
      /**
       * Add required asterisks
       */
      const addRequired = () => {
        const formWrap = Experiment.cache.form.querySelector('#contact-form');
        const items = [
          // CND
          Experiment.cache.form.querySelector('label[for="contact-form-first-name"]'),
          Experiment.cache.form.querySelector('label[for="contact-form-surname"]'),
          Experiment.cache.form.querySelector('label[for=""]'),
          Experiment.cache.form.querySelector('label[for=""]'),
        ];
        if (items.length > 0) {
          items.map((item) => {
            if (item && !item.querySelector('sup')) {
              item.insertAdjacentHTML('beforeend', '<sup>*</sup>');
            }
          });
        }
        if (formWrap && !formWrap.querySelector('.AC035-required')) {
          formWrap.insertAdjacentHTML('afterbegin', '<div class="AC035-required"><sup>*</sup>Required Field</div>');
        }
      };

      addName();
      addInputLabel();
      moveContent();
      if (empOrCand === 'cnd') {
        addGDPRBanner();
        addRequired();
      }
    },
    /**
     * Amend to AC004 element to assist with this test.
     */
    updateCookie() {
      const empOrCandCookie = getCookie('empOrCand');
      if (empOrCandCookie) {
        const buttons = document.querySelectorAll('#user-type-selection .selection');
        if (buttons.length > 0) {
          buttons.forEach((button) => {
            button.addEventListener('click', () => {
              const data = button.dataset.option;
              if (data) {
                setCookie('empOrCand', data, 1);
              }
            });
          });
        }
      }
    },
  },

  components: {
    /**
     * @desc Replace the two user images and titles for Emp Or Cand icons.
     * @param {Element} container
     */
    replaceUsersInfo(container) {
      if (container) {
        const title = container.querySelector('.title-section');
        const rows = container.querySelectorAll('.selection');
        // Images and content / titles
        if (rows.length > 0) {
          let empRow = null;
          let candRow = null;
          // Set elements to variables.
          for (let i = 0; rows.length > i; i += 1) {
            if (rows[i].dataset.value === 'employer') {
              empRow = rows[i];
            }
            if (rows[i].dataset.value === 'candidate') {
              candRow = rows[i];
            }
          }
          // Amend images & titles
          const empImgContainer = empRow.querySelector('.row .col-lg-3.col-md-4.col-sm-5.col-xs-5');
          const empTitle = empRow.querySelector('.row span.center');
          if (empImgContainer) {
            empImgContainer.innerHTML = `
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="29px" height="46px" viewBox="0 0 29 46" version="1.1" class="selectbox-icon">
                  <g id="Search-Bar-Update" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="1.1-Search-Bar-Update---Portrait-Tablet-(970-or-below)" transform="translate(-93.000000, -2530.000000)" fill="#136CAA">
                          <g id="Rectangle-185-Copy-+-I’m-an-employer-+-profile-icon-+-Rectangle-185-Copy-+-I’m-an-employer-+-profile-icon-Copy-+-Rectangle-185-Copy-+-I’m-an-employer-+-profile-icon-Copy-Copy" transform="translate(46.000000, 2510.000000)">
                              <g id="Rectangle-185-Copy-+-I’m-an-employer-+-profile-icon">
                                  <path d="M61.2500195,39.9500273 C57.1745139,39.9329273 48.1243265,41.2311041 48.1243265,41.2311041 C48.1243265,41.2311041 47,51.5908683 47,58.0703522 C47,68.1109159 75.5000391,68.1109159 75.5000391,58.0703522 C75.5000391,51.4298431 73.971012,41.0871789 73.971012,41.0871789 C73.971012,41.0871789 64.7939994,39.9657024 61.2500195,39.9500273 M69.8000312,28.5500117 C69.8000312,23.9729054 65.8271258,20 61.2500195,20 C56.6729133,20 52.7000078,23.9729054 52.7000078,28.5500117 C52.7000078,33.127118 56.6729133,37.1000234 61.2500195,37.1000234 C65.8271258,37.1000234 69.8000312,33.127118 69.8000312,28.5500117 M61.6526019,38.3701953 C60.0231656,38.3701953 56.9750137,38.5809158 56.9750137,38.5809158 L60.4385189,42.6159617 L62.7745162,42.6159617 L65.9623738,38.5809158 C65.9623738,38.5809158 63.0189524,38.3701953 61.6526019,38.3701953 Z M60.3893073,43.2900459 L57.5783239,61.1355077 L61.5666499,64.5974556 L65.5549759,61.2678809 L62.8218591,43.2900459 L60.3893073,43.2900459 Z" id="employer-icon"></path>
                              </g>
                          </g>
                      </g>
                    </g>
                </svg>
              </span>
            `;
          }
          if (empTitle) {
            empTitle.textContent = 'Looking to hire staff';
          }
          const candImgContainer = candRow.querySelector('.row .col-lg-3.col-md-4.col-sm-5.col-xs-5');
          const candTitle = candRow.querySelector('.row span.center');
          if (candImgContainer) {
            candImgContainer.innerHTML = `
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="19px" height="27px" viewBox="0 0 19 27" version="1.1" class="selectbox-icon">
                  <g id="Search-Bar-Update" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="1.1-Search-Bar-Update---Portrait-Tablet-(970-or-below)" transform="translate(-66.000000, -1119.000000)" fill="#136CAA">
                          <g id="Group-Copy-3" transform="translate(29.000000, 986.000000)">
                              <g id="Input-Background-Copy-5-+-profile-icon-+-arrow-icon" transform="translate(17.000000, 119.000000)">
                                  <path d="M29.2681605,14 C26.3668413,14 23.8471606,16.3739176 23.8471606,19.1073959 C23.8471606,21.8408742 26.3668413,24.2147918 29.2681605,24.2147918 C32.1694796,24.2147918 34.6891604,21.8408742 34.6891604,19.1073959 C34.6891604,16.3739176 32.1694796,14 29.2681605,14 Z M26.4770047,25.798871 C22.9622926,26.9805868 20.2331606,30.4943743 20.2331606,36.3402336 C20.2331606,41.3592126 38.3031603,41.3592126 38.3031603,36.3402336 C38.3031603,30.6112753 35.6820871,27.1220514 32.2692118,25.8725619 C32.0340916,26.1957456 31.6584976,26.5241926 31.2545669,26.8161213 C30.4830507,27.3737113 29.6081568,28.4196107 29.4112674,28.4196107 C29.0992795,28.4196107 27.0848861,26.9078499 26.4770047,25.798871 Z" id="candidate-icon"></path>
                              </g>
                          </g>
                      </g>
                    </g>
                </svg>
              </span>
            `;
          }
          if (candTitle) {
            candTitle.textContent = 'Looking for a job';
          }
        }
        // Main title
        if (title) {
          const titleEl = title.querySelector('h1');
          if (titleEl) {
            titleEl.textContent = 'I am:';
          }
        }
      }
      // Add click events to set new cookie
      const genders = document.querySelectorAll('.trigger-user-type.selection');
      if (genders.length) {
        for (let i = 0; genders.length > i; i += 1) {
          genders[i].addEventListener('click', () => {
            const genderType = genders[i].getAttribute('data-value');
            setCookie('AC035-Type', genderType, 999);
          });
        }
      }
    },
    /**
     * @desc Replace the title in the location module.
     * @param {Element} container
     */
    replaceLocationTitle(container) {
      if (container) {
        const titleEl = container.querySelector('.title-section h1');
        if (titleEl) {
          titleEl.textContent = 'Please select an office location';
        }
      }
    },
    /**
     * @desc Add the controls for the dropdown toggles
     * @param {Element} container
     */
    locationControls(container) {
      if (container) {
        const titles = container.querySelectorAll('.branch-selection h2');
        if (titles.length > 0) {
          for (let i = 0; titles.length > i; i += 1) {
            titles[i].addEventListener('click', () => {
              const thisRow = titles[i].nextElementSibling;
              if (thisRow) {
                thisRow.classList.toggle('active');
                titles[i].classList.toggle('active');
              }
            });
          }
        }
      }
    },

  },
};

export default Experiment;
