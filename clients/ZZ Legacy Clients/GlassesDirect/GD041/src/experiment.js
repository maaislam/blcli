/**
 * GD041 - Prescription Form Redesign - Desktop
 * @author User Conversion
 */
import '../../../../lib/utils/extendWebStorage';
import { setup } from './lib/services';
import settings from './lib/settings';
import { pollerLite } from '../../../../lib/uc-lib';
import { getClosest } from '../../../../lib/utils';

const activate = () => {
  setup();
  const { ID } = settings;
  const formErrors = document.querySelector('.prescription-form-errors');
  let slickSliderSet = false;

  // -----------------------------------------------
  // Slider markup
  // -----------------------------------------------
  const content = document.createElement('div');
  content.classList.add(`${ID}_content`);
  content.innerHTML = `
    <div class="${ID}_section">
      <h2>General Details</h2>
      <div class="${ID}_form-section" id="${ID}_generalDetails">
        <div class="${ID}_description">
          <p>Enter your prescription below or <a href="#" class="${ID}_sendItLater">send it later</a></p>
          <p>All prescriptions will be checked by one of our opticians and verified for any potential errors or delays, and they may contaxt you if they need to discuss your details any further.</p>
        </div>
        <h4>General Details</h4>
        <div class="${ID}_fields"></div>
      </div>
    </div>

    <div class="${ID}_section">
      <h2>Right Eye (O.D)</h2>
      <div class="${ID}_form-section" id="${ID}_rightEye">
        <div class="${ID}_description">
          <p>Enter your prescription below or <a href="#" class="${ID}_sendItLater">send it later</a></p>
          <p>All prescriptions will be checked by one of our opticians and verified for any potential errors or delays, and they may contaxt you if they need to discuss your details any further.</p>
        </div>
        <div class="${ID}_fields"></div>
        <div><a class="toggle-complexity">My prescription doesn’t look like this</a></div>
      </div>
    </div>

    <div class="${ID}_section">
      <h2>Left Eye (O.S)</h2>
      <div class="${ID}_form-section" id="${ID}_leftEye">
        <div class="${ID}_description">
          <p>Enter your prescription below or <a href="#" class="${ID}_sendItLater">send it later</a></p>
          <p>All prescriptions will be checked by one of our opticians and verified for any potential errors or delays, and they may contaxt you if they need to discuss your details any further.</p>
        </div>
        <div class="${ID}_fields"></div>
        <div><a class="toggle-complexity">My prescription doesn’t look like this</a></div>
      </div>
    </div>

    <div class="${ID}_section">
      <h2>Extra Information</h2>
      <div class="${ID}_form-section" id="${ID}_extraInfo">
        <div class="${ID}_description">
          <p>Enter your prescription below or <a href="#" class="${ID}_sendItLater">send it later</a></p>
          <p>All prescriptions will be checked by one of our opticians and verified for any potential errors or delays, and they may contaxt you if they need to discuss your details any further.</p>
        </div>
        <div class="${ID}_fields"></div>
        <button class="button button--primary -replaced-btn option-select" type="submit">
          Add Prescription
        </button>
      </div>
    </div>
  `;

  // Render
  const form = document.querySelector('.prescription-form--has-validation');
  form.insertAdjacentElement('beforeend', content);
  content.insertAdjacentHTML('afterend', `<div class="${ID}_navContainer"></div>`);

  // Scroll to errors
  if (formErrors) {
    setTimeout(() => {
      window.scrollTo(0, formErrors.getBoundingClientRect().top + window.scrollY - 5);
    }, 20);
  }

  // -----------------------------------------------
  // Move form fields
  // -----------------------------------------------
  /**
   * Takes original elements and wraps them in a new
   * container
   * @param {HTMLElement} input Input element
   * @param {string} name Name of field
   * @param {string} customClass Custom class to add to the field wrap
   * @returns {HTMLElement}
   */
  const createField = (input, name, customClass) => {
    const field = document.createElement('div');
    field.className = `${ID}_form-field${customClass ? ` ${customClass}` : ''}`;
    const inputEl = input.querySelector('select, input');
    const dataElementAttr = input.name || (inputEl && inputEl.name ? inputEl.name : null);

    if (dataElementAttr) field.setAttribute('data-element', dataElementAttr);

    if (name) {
      const label = document.createElement('span');
      label.classList.add('field-label');
      label.innerHTML = name;
      field.appendChild(label);
    }

    field.appendChild(input);

    return field;
  };

  const populateFieldSections = {
    /** Add fields to General Details */
    generalDetails() {
      const container = content.querySelector(`#${ID}_generalDetails .${ID}_fields`);

      const nameField = createField(
        form.querySelector('#id_reference'),
        '<label class="field-required" for="id_reference">Prescription name:</label>',
      );
      const dateField = createField(
        form.querySelector('#id_date_day').parentElement.parentElement,
        '<label class="field-required" for="id_date_day">Date of prescription:</label>',
      );

      container.appendChild(nameField);
      container.appendChild(dateField);
    },

    /** Add fields to Right Eye */
    rightEye() {
      const container = content.querySelector(`#${ID}_rightEye .${ID}_fields`);

      // Distance
      const sphereDistField = createField(
        form.querySelector('#id_dist-right_sphere').parentElement,
        'Sphere (SPH):',
      );
      const cylinderDistField = createField(
        form.querySelector('#id_dist-right_cylinder').parentElement,
        'Cylinder (CYL):',
      );
      const axisDistField = createField(
        form.querySelector('#id_dist-right_axis').parentElement,
        'Axis:',
      );


      // Intermediate
      const sphereIntrField = createField(
        form.querySelector('#id_intr-right_sphere').parentElement,
        'Sphere (SPH):',
        `${ID}_form-field--complex`,
      );
      const cylinderIntrField = createField(
        form.querySelector('#id_intr-right_cylinder').parentElement,
        'Cylinder (CYL):',
        `${ID}_form-field--complex`,
      );
      const axisIntrField = createField(
        form.querySelector('#id_intr-right_axis').parentElement,
        'Axis:',
        `${ID}_form-field--complex`,
      );
      const addIntrField = createField(
        form.querySelector('#id_intr-right_addition').parentElement,
        'Intermediate Addition (ADD):',
        `${ID}_form-field--complex`,
      );


      // Near
      const sphereNearField = createField(
        form.querySelector('#id_near-right_sphere').parentElement,
        'Sphere (SPH):',
        `${ID}_form-field--complex`,
      );
      const cylinderNearField = createField(
        form.querySelector('#id_near-right_cylinder').parentElement,
        'Cylinder (CYL):',
        `${ID}_form-field--complex`,
      );
      const axisNearField = createField(
        form.querySelector('#id_near-right_axis').parentElement,
        'Axis:',
        `${ID}_form-field--complex`,
      );
      const addNearField = createField(
        form.querySelector('#id_near-right_addition').parentElement,
        'Near Addition (ADD):',
      );

      container.insertAdjacentHTML('beforeend', `<h5 class="${ID}_form-field--complex">Right Eye Distance</h5>`);
      container.appendChild(sphereDistField);
      container.appendChild(cylinderDistField);
      container.appendChild(axisDistField);

      container.insertAdjacentHTML('beforeend', `<h5 class="${ID}_form-field--complex">Right Eye Intermediate</h5>`);
      container.appendChild(sphereIntrField);
      container.appendChild(cylinderIntrField);
      container.appendChild(axisIntrField);
      container.appendChild(addIntrField);

      container.insertAdjacentHTML('beforeend', `<h5 class="${ID}_form-field--complex">Right Eye Near (Reading)</h5>`);
      container.appendChild(sphereNearField);
      container.appendChild(cylinderNearField);
      container.appendChild(axisNearField);
      container.appendChild(addNearField);
    },

    /** Add fields to Left Eye */
    leftEye() {
      const container = content.querySelector(`#${ID}_leftEye .${ID}_fields`);

      // Distance
      const sphereDistField = createField(
        form.querySelector('#id_dist-left_sphere').parentElement,
        'Sphere (SPH):',
      );
      const cylinderDistField = createField(
        form.querySelector('#id_dist-left_cylinder').parentElement,
        'Cylinder (CYL):',
      );
      const axisDistField = createField(
        form.querySelector('#id_dist-left_axis').parentElement,
        'Axis:',
      );


      // Intermediate
      const sphereIntrField = createField(
        form.querySelector('#id_intr-left_sphere').parentElement,
        'Sphere (SPH):',
        `${ID}_form-field--complex`,
      );
      const cylinderIntrField = createField(
        form.querySelector('#id_intr-left_cylinder').parentElement,
        'Cylinder (CYL):',
        `${ID}_form-field--complex`,
      );
      const axisIntrField = createField(
        form.querySelector('#id_intr-left_axis').parentElement,
        'Axis:',
        `${ID}_form-field--complex`,
      );
      const addIntrField = createField(
        form.querySelector('#id_intr-left_addition').parentElement,
        'Intermediate Addition (ADD):',
        `${ID}_form-field--complex`,
      );


      // Near
      const sphereNearField = createField(
        form.querySelector('#id_near-left_sphere').parentElement,
        'Sphere (SPH):',
        `${ID}_form-field--complex`,
      );
      const cylinderNearField = createField(
        form.querySelector('#id_near-left_cylinder').parentElement,
        'Cylinder (CYL):',
        `${ID}_form-field--complex`,
      );
      const axisNearField = createField(
        form.querySelector('#id_near-left_axis').parentElement,
        'Axis:',
        `${ID}_form-field--complex`,
      );
      const addNearField = createField(
        form.querySelector('#id_near-left_addition').parentElement,
        'Near Addition (ADD):',
      );

      container.insertAdjacentHTML('beforeend', `<h5 class="${ID}_form-field--complex">Left Eye Distance</h5>`);
      container.appendChild(sphereDistField);
      container.appendChild(cylinderDistField);
      container.appendChild(axisDistField);

      container.insertAdjacentHTML('beforeend', `<h5 class="${ID}_form-field--complex">Left Eye Intermediate</h5>`);
      container.appendChild(sphereIntrField);
      container.appendChild(cylinderIntrField);
      container.appendChild(axisIntrField);
      container.appendChild(addIntrField);

      container.insertAdjacentHTML('beforeend', `<h5 class="${ID}_form-field--complex">Left Eye Near (Reading)</h5>`);
      container.appendChild(sphereNearField);
      container.appendChild(cylinderNearField);
      container.appendChild(axisNearField);
      container.appendChild(addNearField);
    },

    /** Add fields to Extra Information */
    extraInformation() {
      const container = content.querySelector(`#${ID}_extraInfo .${ID}_fields`);

      const pupilDistanceField = createField(
        form.querySelector('#id_pupil_distance').parentElement,
        '<label class="field-required" for="id_pupil_distance">Pupil distance:</label>',
      );
      const extraInfoField = createField(
        form.querySelector('#id_notes'),
        '<label for="id_notes">Aditional Information: (e.g. prism)</label>',
      );
      const termsField = createField(
        form.querySelector('#id_terms_and_conditions').parentElement,
      );

      container.appendChild(pupilDistanceField);
      container.appendChild(extraInfoField);
      container.appendChild(termsField);
    },

    /** Add fields to all sections */
    all() {
      this.generalDetails();
      this.rightEye();
      this.leftEye();
      this.extraInformation();
    },
  };

  const addTooltips = () => {
    const tooltipMarkup = {
      sphere: `
        <p class='tooltip__title'>SPH</p>
        <p>This indicates the lens power prescribed to correct long or short-sightedness. If it's &quot;+&quot;, you are long-sighted. If it's &quot;-&quot;, you are short-sighted.</p>
      `,
      cylinder: `
        <p class='tooltip__title'>CYL</p>
        <p>This indicates correction for astigmatism. If you have nothing entered in this box, then you don't need to be corrected for astigmatism.</p>
      `,
      axis: `
        <p class='tooltip__title'>Axis</p>
        <p>The axis represents the direction of the CYL. If you don't need to be corrected for CYL, you won't have an axis.</p>
      `,
      add: `
        <p class='tooltip__title'>ADD</p>
        <p>This is the extra magnification you need to see close objects in addition to the long distance prescription. It is usually the same for both eyes.</p>
      `,
    };

    /**
     * Create a tooltip element
     * @param {HTMLElement} input Input to place tooltip beside
     * @param {string} content Markup for inside the toolip
     */
    const createTooltip = (input, tooltipContent) => {
      const temp = document.createElement('div');
      temp.innerHTML = `
        <a data-toggle="tooltip" data-placement="top" data-html="true" data-trigger="hover" title="" class="prescription-tooltip-trigger -replaced-btn" data-original-title="${tooltipContent}">ⓘ</a>
      `;
      input.insertAdjacentElement('beforeend', temp.children[0]);
    };

    const inputs = content.querySelectorAll(`#${ID}_rightEye [data-element], #${ID}_leftEye [data-element]`);
    for (let i = 0; i < inputs.length; i += 1) {
      const input = inputs[i];
      const attrText = input.getAttribute('data-element').toLowerCase();
      switch (true) {
        case attrText.indexOf('sphere') > -1:
          createTooltip(input, tooltipMarkup.sphere);
          break;

        case attrText.indexOf('cylinder') > -1:
          createTooltip(input, tooltipMarkup.cylinder);
          break;

        case attrText.indexOf('axis') > -1:
          createTooltip(input, tooltipMarkup.axis);
          break;

        case attrText.indexOf('add') > -1:
          createTooltip(input, tooltipMarkup.add);
          break;

        default:
          break;
      }
    }

    // Init tooltips
    pollerLite([() => !!window.gd.lib.lensPackageTabs.fireTooltips], () => {
      window.gd.lib.lensPackageTabs.fireTooltips();
    });
  };


  // -----------------------------------------------
  // Event handlers
  // -----------------------------------------------
  const bindEventHandlers = {
    /** Show/hide functionality for simple/complex forms */
    complexityToggle() {
      const complexityToggle = content.querySelectorAll('.toggle-complexity');

      const showComplexForm = () => {
        form.classList.add(`${ID}_form--showComplex`);
        const storage = window.localStorage.getObject(ID) || {};
        storage.showComplexForms = true;
        window.localStorage.setObject(ID, storage);
        for (let i = 0; i < complexityToggle.length; i += 1) {
          complexityToggle[i].innerText = 'My prescription is more simple than this';
        }
        if (slickSliderSet) $(content).slick('setPosition');
      };

      const hideComplexForm = () => {
        form.classList.remove(`${ID}_form--showComplex`);
        const storage = window.localStorage.getObject(ID) || {};
        storage.showComplexForms = false;
        window.localStorage.setObject(ID, storage);
        for (let i = 0; i < complexityToggle.length; i += 1) {
          complexityToggle[i].innerText = 'My prescription doesn’t look like this';
        }
        if (slickSliderSet) $(content).slick('setPosition');
      };

      for (let i = 0; i < complexityToggle.length; i += 1) {
        const el = complexityToggle[i];

        // Toggle state on click
        el.addEventListener('click', () => {
          if (form.classList.contains(`${ID}_form--showComplex`)) {
            hideComplexForm();
          } else {
            showComplexForm();
          }
        });

        // Set default state
        const storage = window.localStorage.getObject(ID) || {};
        if (storage.showComplexForms) showComplexForm();
      }
    },

    /** Send it later links */
    sendItLater() {
      const originalLink = document.querySelector('.switch-to-later-tab');
      const links = content.querySelectorAll(`.${ID}_sendItLater`);
      for (let i = 0; i < links.length; i += 1) {
        const link = links[i];
        link.addEventListener('click', () => {
          originalLink.click();
        });
      }
    },

    /** Highlight errors in the form */
    // checkForErrors() {
    //   const errors = content.querySelector('.error');
    //   for (let i = 0; i < errors.length; i += 1) {
    //     const error = errors[i];
    //     const section = getClosest(error, `.${ID}_section`)
    //   }
    // },

    /** Bind all event handlers */
    all() {
      this.complexityToggle();
      this.sendItLater();
      // this.checkForErrors();
    },
  };

  // Init
  populateFieldSections.all();
  bindEventHandlers.all();
  addTooltips();

  // Wait for jQuery then load and init slider
  pollerLite([() => !!window.jQuery], () => {
    window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
      const initSlider = () => {
        // Init slick slider
        $(content).slick({
          adaptiveHeight: true,
          dots: true,
          nextArrow: `<div class="${ID}_nav ${ID}_nav--next btn btn-action">Next</div>`,
          prevArrow: `<div class="${ID}_nav ${ID}_nav--prev btn btn-action">Back</div>`,
          appendArrows: `.${ID}_navContainer`,
          infinite: false,
          speed: 0,
          draggable: false,
        });

        slickSliderSet = true;

        // On last slide, change 'next' button to form submit
        const submitBtn = document.querySelector(`#${ID}_extraInfo button[type="submit"]`);
        const nextButton = document.querySelector(`.${ID}_nav--next`);
        const submitHandler = (e) => {
          e.preventDefault();
          submitBtn.click();
        };

        $(content).on('afterChange', (event, slick, currentSlide) => {
          // Scroll to top of container
          const offsetTop = $(content).offset().top - 20;
          if ($(window).scrollTop() > offsetTop) {
            $('html, body').animate({
              scrollTop: offsetTop,
            }, 200);
          }

          if (currentSlide === 3) {
            nextButton.addEventListener('click', submitHandler);
            nextButton.innerText = 'Submit';
            nextButton.classList.add(`${ID}_nav--submit`);
          } else {
            nextButton.removeEventListener('click', submitHandler);
            nextButton.innerText = 'Next';
            nextButton.classList.remove(`${ID}_nav--submit`);
          }
        });
      };
      const onFormPage = content.getBoundingClientRect().height > 0;
      if (onFormPage) {
        initSlider();
      } else {
        pollerLite([() => content.getBoundingClientRect().height > 0], initSlider, {
          timeout: false,
          multiplier: 1,
          wait: 250,
        });
      }
    });
  });
};

export default activate;
