import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

/**
 * {{AC026}} - {{Reduced Refine - Static page}}
 */

const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'AC026',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const locationParent = bodyVar.querySelector('#search-bar-body > .col-md-12');
      const locationInput = bodyVar.querySelector('#input-location');
      const searchForm = bodyVar.querySelector('#search-bar-form');
      const profileOptions = bodyVar.querySelectorAll('#input-user-type-selector-dropdown > .dropdown-option > span');
      const searchButton = bodyVar.querySelector('.search-bar-button-inline');
      const searchSuggestionParent = bodyVar.querySelector('.autosuggest.single-instance-popup');
      const AC026Markup = `
      <div class="AC026-Wrap">
        <div class="AC026-Location-Button-Wrap">
          <div class="AC026-Upper-Options">
            <span class="AC026-Location">London</span>
            <span class="AC026-Location">Manchester</span>
            <span class="AC026-Location">Birmingham</span>
            <span class="AC026-Location">Edinburgh</span>
          </div>
          <div class="AC026-Lower-Options">
            <span class="AC026-Location">Glasgow</span>
            <span class="AC026-Location">Leeds</span>
            <span class="AC026-Location">Bristol</span>
            <span class="AC026-Location">Liverpool</span>
          </div>
        </div>
        <div class="AC026-Profile-Button-Wrap">
          <span class="AC026-Profile-Button AC026-Candidate">I am looking for a job</span>
          <span class="AC026-Profile-Button AC026-Employer">I am looking to hire staff</span>
        </div>
      </div>
      `;
      let locationOptions;

      return {
        bodyVar,
        locationParent,
        locationInput,
        AC026Markup,
        searchForm,
        locationOptions,
        profileOptions,
        searchButton,
        searchSuggestionParent,
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
      const hide = document.getElementById(`${settings.ID}_flickerPrevention`);
      hide.parentElement.removeChild(hide);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
        // Change location placeholder text
        Exp.cache.locationInput.placeholder = 'Enter Your Location or Select One of the Options Below';
        // Insert Header
        Exp.cache.locationParent.insertAdjacentHTML('beforebegin', `
          <p class="AC026-Header">By adding your location, you are more likely to find an agency which suits your needs</p>
        `);
        // Insert markup
        Exp.cache.searchForm.insertAdjacentHTML('beforeend', Exp.cache.AC026Markup);
        // Assign selectors
        Exp.cache.locationOptions = Exp.cache.bodyVar.querySelectorAll('.AC026-Location');
        // elements ready, set up functionality and tracking
        this.elementFunctions();
      },
      elementFunctions() {
        // Add click handler to each location button added
        for (let i = 0; i < Exp.cache.locationOptions.length; i += 1) {
          Exp.cache.locationOptions[i].addEventListener('click', () => {
            // Add a styling class to hide search suggestions
            Exp.cache.searchSuggestionParent.classList.add('AC026-Hide');
            // Change drop down profile to neither
            Exp.cache.profileOptions[2].click();
            Exp.cache.locationInput.value = Exp.cache.locationOptions[i].textContent;
            // Send event
            events.send(`${Exp.settings.ID}`, 'Click', `Location - ${Exp.cache.locationInput.value}`, { sendOnce: true });
            // Focus into search bar to reveal locations
            Exp.cache.locationInput.focus();
            // Poll for search suggestion, click when found
            poller([
              '.autosuggest.single-instance-popup > .autosuggest-result',
            ], () => {
              // Click first search suggestion
              Exp.cache.bodyVar.querySelectorAll('.autosuggest.single-instance-popup > .autosuggest-result')[0].click();
              // Click agency search button
              Exp.cache.searchButton.click();
            });
          });
        }
        // Add click handler to candidate button
        Exp.cache.bodyVar.querySelector('.AC026-Profile-Button.AC026-Candidate').addEventListener('click', () => {
          // Check if location input has a value
          if (!Exp.cache.locationInput.value) {
            // If not add validation styling class and change placeholder
            Exp.cache.locationInput.placeholder = 'Please enter a location';
            Exp.cache.locationInput.classList.add('AC026-Error');
          } else {
            // Send Event
            events.send(`${Exp.settings.ID}`, 'Click', 'Candidate - Refine', { sendOnce: true });
            // Change dropdown to candidate
            Exp.cache.profileOptions[1].click();
            // Click agency search button
            Exp.cache.searchButton.click();
          }
        });
        // Add click handler to employer button
        Exp.cache.bodyVar.querySelector('.AC026-Profile-Button.AC026-Employer').addEventListener('click', () => {
          // Check if location input has a value
          if (!Exp.cache.locationInput.value) {
            // If not add validation styling class and change placeholder
            Exp.cache.locationInput.placeholder = 'Please enter a location';
            Exp.cache.locationInput.classList.add('AC026-Error');
          } else {
            // Send event
            events.send(`${Exp.settings.ID}`, 'Click', 'Employer - Refine', { sendOnce: true });
            // Change dropdown to Employer
            Exp.cache.profileOptions[0].click();
            // Click agency search button
            Exp.cache.searchButton.click();
          }
        });
      },
    },
  };

  Exp.init();
};

export default Run;
