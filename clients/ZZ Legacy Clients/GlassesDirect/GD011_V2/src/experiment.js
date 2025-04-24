import { fullStory } from '../../../../lib/utils';


/**
 * {{GD011}} - {{Default Enter Prescription - V2}}
 */

const Run = () => {
  // const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'GD011',
      VARIATION: '2',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const savedPrescriptionsHeading = bodyVar.querySelector('#prescription-tab-saved > .form-heading');
      const savedPrescriptionsButton = bodyVar.querySelector('#prescription-tab-header-saved.personalise-choice.prescription.option-current');
      const prescriptionLaterButton = docVar.getElementById('prescription-tab-header-later');
      const prescriptionAddButton = docVar.getElementById('prescription-tab-header-add');
      const backButton = bodyVar.querySelector('.btn-back');
      // Reassigned when markup is added
      let GD011New;
      let GD011Later;

      return {
        docVar,
        bodyVar,
        savedPrescriptionsHeading,
        savedPrescriptionsButton,
        GD011Later,
        GD011New,
        prescriptionAddButton,
        prescriptionLaterButton,
        backButton,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
      // Default running event
      // eslint-disable-next-line
      // events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
      // Event template
      // events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      // eslint-disable-next-line
      // events.send(`${Exp.settings.ID} - ${Exp.settings.VARIATION}`, 'Action', 'Label', { sendOnce: true });
      // Flannels event
      // eslint-disable-next-line
      // events.send(settings.ID, 'View', `${settings.ID} Variation ${settings.VARIATION}`, { sendOnce: true });
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
      removeFlicker: () => {
        const hide = document.getElementById(`${Exp.settings.ID}_flickerPrevention`);
        if (hide) {
          hide.parentElement.removeChild(hide);
        }
      },
    },
    components: {
      setupElements() {
        // Render content
        Exp.render.prescriptionOptions();
        // Store selectors
        Exp.cache.GD011Later = Exp.cache.bodyVar.querySelector('.GD011_Later');
        Exp.cache.GD011New = Exp.cache.bodyVar.querySelector('.GD011_New');
        // Click Saved prescripton
        Exp.cache.savedPrescriptionsButton.click();
        // Add test functionality
        Exp.bindExperimentEvents.otherOptionFunctions();
      },
    },
    render: {
      prescriptionOptions() {
        Exp.cache.savedPrescriptionsHeading.insertAdjacentHTML('afterend', `
          <p class="GD011_Saved_Prescription_Heading">Choose a saved prescription below by clicking anywhere within the prescription, <span class="GD011_Later">send it later</span> or enter a <span class="GD011_New">new prescription</span>.</p>
        `);
      },
    },
    bindExperimentEvents: {
      // Add event handlers to added markup, allows switching between options
      otherOptionFunctions() {
        // Same functionality for both:
        // Click the back button to hide current content
        // Click relevant option to display content
        Exp.cache.GD011Later.addEventListener('click', () => {
          Exp.cache.backButton.click();
          Exp.cache.prescriptionLaterButton.click();
        });
        Exp.cache.GD011New.addEventListener('click', () => {
          Exp.cache.backButton.click();
          Exp.cache.prescriptionAddButton.click();
        });
      },
    },
  };

  Exp.init();
};

export default Run;
