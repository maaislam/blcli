/**
 * GD039 - Prescription Form Redesign
 * @author User Conversion
 */
import './lib/extendStorage';
import { setup } from './lib/services';
import { getClosest } from '../../../../lib/utils';
import settings from './lib/settings';
import Accordion from '../../../../lib/components/Accordion/Accordion';
import { pollerLite } from '../../../../lib/uc-lib';

const activate = () => {
  setup();
  const { ID } = settings;
  const formErrors = document.querySelector('.prescription-form-errors');

  // -----------------------------------------------
  // Accordion component
  // -----------------------------------------------
  const accordion = new Accordion(ID, {
    content: [
      {
        tab: '<h2>General Details</h2>',
        body: `
          <div class="${ID}_form-section" id="${ID}_generalDetails">
            <div class="${ID}_description">
              <h3>Enter New Prescription</h3>
              <p>All prescriptions will be checked by one of our opticians and verified for any potential errors or delays, and they may contaxt you if they need to discuss your details any further.</p>
              <p>Enter your prescription below or <a href="#" class="${ID}_sendItLater">send it later</a></p>
            </div>
            <h4>General Details</h4>
            <div class="${ID}_fields"></div>
          </div>
        `,
      },
      {
        tab: '<h2>Right Eye (O.D)</h2>',
        body: `
          <div class="${ID}_form-section" id="${ID}_rightEye">
            <div class="${ID}_description">
              <h3>Enter Right Eye Prescription</h3>
              <p>All prescriptions will be checked by one of our opticians and verified for any potential errors or delays, and they may contaxt you if they need to discuss your details any further.</p>
              <p>Enter your prescription below or <a href="#" class="${ID}_sendItLater">send it later</a></p>
            </div>
            <div class="${ID}_simple-form">
              <div class="${ID}_fields"></div>
            </div>
            <div class="${ID}_complex-form ${ID}_form--hidden">
              <div class="${ID}_fields"></div>
            </div>
            <div class="${ID}_multi-form">
              <div class="${ID}_fields"></div>
            </div>
            <div><a class="toggle-complexity">My prescription doesn’t look like this</a></div>
          </div>
        `,
      },
      {
        tab: '<h2>Left Eye (O.S)</h2>',
        body: `
          <div class="${ID}_form-section" id="${ID}_leftEye">
            <div class="${ID}_description">
              <h3>Enter Left Eye Prescription</h3>
              <p>All prescriptions will be checked by one of our opticians and verified for any potential errors or delays, and they may contaxt you if they need to discuss your details any further.</p>
              <p>Enter your prescription below or <a href="#" class="${ID}_sendItLater">send it later</a></p>
            </div>
            <div class="${ID}_simple-form">
              <div class="${ID}_fields"></div>
            </div>
            <div class="${ID}_complex-form ${ID}_form--hidden">
              <div class="${ID}_fields"></div>
            </div>
            <div class="${ID}_multi-form">
              <div class="${ID}_fields"></div>
            </div>
            <div><a class="toggle-complexity">My prescription doesn’t look like this</a></div>
          </div>
        `,
      },
      {
        tab: '<h2>Extra Information</h2>',
        body: `
          <div class="${ID}_form-section" id="${ID}_extraInfo">
            <div class="${ID}_description">
              <h3>Enter Any Additional Information</h3>
              <p>Feel free to include any additional information that would help us.</p>
              <p>Enter your prescription below or <a href="#" class="${ID}_sendItLater">send it later</a></p>
            </div>
            <div class="${ID}_fields"></div>
            <button class="button button--primary -replaced-btn option-select" type="submit">
              Add Prescription
            </button>
          </div>
        `,
      },
    ],
    onlyOneOpen: true,
    scrollOnOpen: true,
    navigation: true,
    defaultOpenIndex: 0,
    forceOpenAll: formErrors ? true : false,
  });
  const accordionEl = accordion.cache.component;

  // Render
  const form = document.querySelector('.prescription-form--has-validation');
  form.insertAdjacentElement('beforeend', accordion.cache.component);

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
   * Takes original elements and replaces the
   * TD wrap with a DIV
   * @param {string} selector Input selector
   * @returns {HTMLElement}
   */
  const createField = (selector) => {
    // Create DIV
    const field = document.createElement('div');
    field.classList.add(`${ID}_form-field`);

    const input = form.querySelector(selector);
    const container = getClosest(input, 'td');

    const { attributes, children } = container;

    // Clone attributes from TD
    let i = attributes.length;
    while (i--) {
      const attribute = attributes[i];
      const { name, value } = attribute;
      if (name !== 'colspan') field.setAttribute(name, value);
    }

    // Move TD children to new element
    while (children.length) {
      field.appendChild(children[0]);
    }

    return field;
  };

  const populateFieldSections = {
    /**
     * Add fields to a container in accordion
     * @param {HTMLElement} container Container to add fields to
     * @param {array.string} fields IDs of inputs to add to container
     *  Not necessary to add all sibling elements as createField
     *  will search for the closest TD and add all child elements
     */
    addFields(container, fields) {
      // Create new fields from each input and add to new section
      fields.forEach((field) => {
        const newField = createField(field);
        container.appendChild(newField);
      });
    },

    /** Add fields to General Details */
    generalDetails() {
      const container = accordionEl.querySelector(`#${ID}_generalDetails .${ID}_fields`);
      this.addFields(container, [
        '#id_reference',
        '#id_date_day',
      ]);
    },

    /** Add fields to Right Eye (Simple) */
    rightEye() {
      // Simple
      const simpleContainer = accordionEl.querySelector(`#${ID}_rightEye .${ID}_simple-form .${ID}_fields`);
      this.addFields(simpleContainer, [
        '#id_dist-right_sphere',
        '#id_dist-right_cylinder',
        '#id_dist-right_axis',
      ]);

      // Complex
      const complexContainer = accordionEl.querySelector(`#${ID}_rightEye .${ID}_complex-form .${ID}_fields`);
      this.addFields(complexContainer, [
        '#id_intr-right_sphere',
        '#id_near-right_sphere',
        '#id_intr-right_addition',
      ]);

      // Add headings to complex form
      complexContainer.querySelector('[data-element="intr-right-sphere"]').insertAdjacentHTML('beforebegin', `
        <h5>Right Eye Intermediate</h5>
      `);

      complexContainer.querySelector('[data-element="near-right-sphere"]').insertAdjacentHTML('beforebegin', `
        <h5>Right Eye Near (Reading)</h5>
      `);

      // Both
      const bothContainer = accordionEl.querySelector(`#${ID}_rightEye .${ID}_multi-form .${ID}_fields`);
      this.addFields(bothContainer, [
        '#id_near-right_addition',
      ]);
    },

    /** Add fields to Left Eye */
    leftEye() {
      // Simple
      const simpleContainer = accordionEl.querySelector(`#${ID}_leftEye .${ID}_simple-form .${ID}_fields`);
      this.addFields(simpleContainer, [
        '#id_dist-left_sphere',
        '#id_dist-left_cylinder',
        '#id_dist-left_axis',
      ]);

      // Complex
      const complexContainer = accordionEl.querySelector(`#${ID}_leftEye .${ID}_complex-form .${ID}_fields`);
      this.addFields(complexContainer, [
        '#id_intr-left_sphere',
        '#id_near-left_sphere',
        '#id_intr-left_addition',
      ]);

      // Add headings to complex form
      complexContainer.querySelector('[data-element="intr-left-sphere"]').insertAdjacentHTML('beforebegin', `
        <h5>Left Eye Intermediate</h5>
      `);

      complexContainer.querySelector('[data-element="near-left-sphere"]').insertAdjacentHTML('beforebegin', `
        <h5>Left Eye Near (Reading)</h5>
      `);

      // Both
      const bothContainer = accordionEl.querySelector(`#${ID}_leftEye .${ID}_multi-form .${ID}_fields`);
      this.addFields(bothContainer, [
        '#id_near-left_addition',
      ]);
    },

    /** Add fields to Extra Information */
    extraInformation() {
      const container = accordionEl.querySelector(`#${ID}_extraInfo .${ID}_fields`);
      this.addFields(container, [
        '#id_pupil_distance',
        '#id_notes',
        '#id_terms_and_conditions',
      ]);

      // Add heading to additional info
      container.querySelector('.toggle-extra-info__content').insertAdjacentHTML('beforebegin', `
        <span class="field-label">
          <label>Additional Information:</label>
        </span>
      `);
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
    const createTooltip = (input, content) => {
      const temp = document.createElement('div');
      temp.innerHTML = `
        <a data-toggle="tooltip" data-placement="top" data-html="true" data-trigger="click focus" title="" class="prescription-tooltip-trigger -replaced-btn" data-original-title="${content}">ⓘ</a>
      `;
      input.insertAdjacentElement('beforeend', temp.children[0]);
    };

    const inputs = accordionEl.querySelectorAll(`#${ID}_rightEye [data-element], #${ID}_leftEye [data-element]`);
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
      const complexityToggle = accordionEl.querySelectorAll('.toggle-complexity');

      for (let i = 0; i < complexityToggle.length; i += 1) {
        const el = complexityToggle[i];

        // Toggle state on click
        el.addEventListener('click', () => {
          if (form.classList.contains(`${ID}_form--showComplex`)) {
            form.classList.remove(`${ID}_form--showComplex`);
            const storage = window.localStorage.getObject(ID) || {};
            storage.showComplexForms = false;
            window.localStorage.setObject(ID, storage);
          } else {
            form.classList.add(`${ID}_form--showComplex`);
            const storage = window.localStorage.getObject(ID) || {};
            storage.showComplexForms = true;
            window.localStorage.setObject(ID, storage);
          }
        });

        // Set default state
        const storage = window.localStorage.getObject(ID) || {};
        if (storage.showComplexForms) {
          form.classList.add(`${ID}_form--showComplex`);
        }
      }
    },

    /** Send it later links */
    sendItLater() {
      const originalLink = document.querySelector('.switch-to-later-tab');
      const links = accordionEl.querySelectorAll(`.${ID}_sendItLater`);
      for (let i = 0; i < links.length; i += 1) {
        const link = links[i];
        link.addEventListener('click', () => {
          originalLink.click();
        });
      }
    },

    /** Bind all event handlers */
    all() {
      this.complexityToggle();
      this.sendItLater();
    },
  };

  // Init
  populateFieldSections.all();
  bindEventHandlers.all();
  addTooltips();
};

export default activate;
