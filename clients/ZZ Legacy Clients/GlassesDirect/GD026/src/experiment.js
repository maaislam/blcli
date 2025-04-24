import { fullStory, events } from '../../../../lib/utils';


/**
 * {{GD026}} - {{Improve error validation UI on basket}}
 */

const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'GD026',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const allProductContainers = bodyVar.querySelectorAll('.basket-product');

      return {
        docVar,
        bodyVar,
        allProductContainers,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      // Check if device is mobile, add class for css if so
      if (window.mobileSite) {
        Exp.cache.bodyVar.classList.add('GD026_Mobile');
      }
      services.tracking();
      components.setupElements();
      events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
      checkForErrors() {
        // Loop through every product in the basket and check for any errors
        for (let i = 0, n = Exp.cache.allProductContainers.length; i < n; i += 1) {
          const currentProduct = Exp.cache.allProductContainers[i];
          const currentErrors = currentProduct.querySelectorAll('.product-detail--error');
          const currentValid = currentProduct.querySelectorAll('.product-component:not(.product-detail--error):not(.product-frames)');
          // Check if product has validation error
          if (currentErrors.length > 0) {
            const currentProductDetailContainer = currentProduct.querySelector('.product-details');
            this.parseErrors(currentErrors, currentProductDetailContainer);
          }
          // Check if product has passed validation
          if (currentValid.length > 0) {
            // Render element for check marks
            Exp.render.checkMarks(currentValid);
          }
        }
      },
      parseErrors(validationErrors, renderLocation) {
        /** Loops through current products errors
        * Takes out error message
        * Builds a string to render error message
        * retrieves first error link for button
        */
        let singleError = false;
        let errorValidationMessage = '<span class="GD026_Error_Message">';
        const firstLink = validationErrors[0].querySelector('.product-personalise__action').href;
        for (let i = 0, n = validationErrors.length; i < n; i += 1) {
          const currentMessage = validationErrors[i].querySelector('.detail-name').textContent.trim();
          const markupTemplate = `<span class="GD026_Error">${currentMessage}</span>`;
          errorValidationMessage += markupTemplate;
          // Only one error
          if ((i === n - 1) && (i === 0)) {
            singleError = true;
            // Multiple errors, end of string
          } else if ((i < n - 2)) {
            errorValidationMessage += ', ';
          } else if ((i === 0) && (n === 2)) {
            errorValidationMessage += ' and ';
            // Middle of string, second last option
          } else if ((i === n - 2) && (i > 0)) {
            errorValidationMessage += ' and ';
            // Only two error messages
          }
        }
        if (singleError) {
          errorValidationMessage += ' is missing. Please review your options by clicking \'Update Options\'';
        } else {
          errorValidationMessage += ' are missing. Please review your options by clicking \'Update Options\'';
        }
        // Close markup
        errorValidationMessage += '</span>';
        // Information retrieved, render markup
        Exp.render.errorMessageContainer(errorValidationMessage, renderLocation, firstLink);
      },
    },
    components: {
      setupElements() {
        // check validation errors
        Exp.services.checkForErrors();
        // All markup rendered, add event tracking
        Exp.bindExperimentEvents.trackPageView();
        Exp.bindExperimentEvents.trackUpdateOptions();
        Exp.bindExperimentEvents.trackEditValid();
        Exp.bindExperimentEvents.trackEditError();
      },
    },
    render: {
      errorMessageContainer(errorMessage, productLocation, firstLink) {
        productLocation.insertAdjacentHTML('afterend', `
          <div class="GD026_Container">
            ${errorMessage}
            <a class="GD026_Update_Options_Link" href="${firstLink}">Update Options</a>
          </div>
        `);
      },
      checkMarks(passedValidation) {
        const cMarkup = '<span class="GD026_Check_Mark"></span>';
        for (let i = 0, n = passedValidation.length; i < n; i += 1) {
          passedValidation[i].insertAdjacentHTML('afterbegin', cMarkup);
        }
      },
    },
    bindExperimentEvents: {
      trackPageView() {
        // Send an event if there is at least one error is present, else send no error present
        if (Exp.cache.bodyVar.querySelector('.product-detail--error')) {
          events.send(`${Exp.settings.ID}`, 'Error Present', 'Yes', { sendOnce: true });
        } else {
          events.send(`${Exp.settings.ID}`, 'Error Present', 'No', { sendOnce: true });
        }
      },
      updateOptionsTrackingCode() {
        // Send event if update options button is clicked
        events.send(`${Exp.settings.ID}`, 'Click', 'Update Options', { sendOnce: true });
      },
      trackUpdateOptions() {
        // Adds tracking code to all update options
        const allUpdateOptions = Exp.cache.bodyVar.querySelectorAll('.GD026_Update_Options_Link');
        for (let i = 0, n = allUpdateOptions.length; i < n; i += 1) {
          allUpdateOptions[i].addEventListener('click', this.updateOptionsTrackingCode);
        }
      },
      editValidTrackingCode(e) {
        // Get the text of edited option, in previous sibling element
        const editText = e.target.parentNode.querySelector('.detail-name').textContent.trim();
        events.send(`${Exp.settings.ID}`, 'Click', `Edit No Error: ${editText}`, { sendOnce: true });
      },
      trackEditValid() {
        // Adds tracking code to all edit options
        const allValidEditLinks = Exp.cache.bodyVar.querySelectorAll('.product-personalise__action--edit');
        for (let i = 0, n = allValidEditLinks.length; i < n; i += 1) {
          allValidEditLinks[i].addEventListener('click', this.editValidTrackingCode);
        }
      },
      editErrorTrackingCode(e) {
        // Get the text of edited option, in previous sibling element
        const selectText = e.target.parentNode.querySelector('.detail-name').textContent.trim();
        events.send(`${Exp.settings.ID}`, 'Click', `Edit Error: ${selectText}`, { sendOnce: true });
      },
      trackEditError() {
        // Adds tracking code to all select options
        const allErrorEditLinks = Exp.cache.bodyVar.querySelectorAll('.product-personalise__action--select');
        for (let i = 0, n = allErrorEditLinks.length; i < n; i += 1) {
          allErrorEditLinks[i].addEventListener('click', this.editErrorTrackingCode);
        }
      },
    },
  };

  Exp.init();
};

export default Run;
