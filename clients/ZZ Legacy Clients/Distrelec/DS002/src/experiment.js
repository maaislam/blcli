import { fullStory, events } from '../../../../lib/utils';
import lang from './lib/translations';

/**
 * {{DS002}} - {{Search for Similar Products}}
 */
let $ = null;
$ = window.jQuery;

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'DS002',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    Experiment.cache = (() => {
      const bodyVar = document.body;
      const button = bodyVar.querySelector('.searchsimilar__holder .mat-button.btn-search');
      const choiceTable = bodyVar.querySelector('table.validate-checkbox-group');
      const forLabels = bodyVar.querySelectorAll('tr .td1 label');
      const ref = bodyVar.querySelector('.tab-content__holder .specification-holder');

      return {
        bodyVar,
        button,
        choiceTable,
        forLabels,
        ref,
      };
    })();
    // Setup
    const {
      settings, services, components, cache,
    } = Experiment;

    const countryCode = services.detectCountry();
    let langText = lang[countryCode];
    if (langText === undefined) {
      langText = lang.en;
    }
    const titleText = langText.title;
    const subText = langText.sub;

    services.tracking();
    document.body.classList.add(settings.ID);
    // Add HTML below product details
    components.tagProducts(cache.ref, cache.button, cache.choiceTable, titleText, subText);

    // Add click events to new choices
    services.clickEvents();

    // Remove ID's
    services.removeId();

    // Highlight previous checked checkboxes
    components.checkChecked();
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', 'Experiment Ran');
    },
    clickEvents() {
      const newOptions = Experiment.cache.bodyVar.querySelectorAll('.DS002-tag-table table.validate-checkbox-group tr');
      const newButton = Experiment.cache.bodyVar.querySelector('.DS002-tag-button a');

      if (newOptions) {
        for (let i = 0; newOptions.length > i; i += 1) {
          newOptions[i].addEventListener('click', (e) => {
            e.preventDefault();
            events.send(Experiment.settings.ID, 'Clicked', 'Clicked on search for similar products');
            // Add active class to TR
            newOptions[i].classList.toggle('DS002-active-filter');

            // Add active button class
            if (newButton) {
              if (Experiment.cache.bodyVar.querySelector('.DS002-active-filter')) {
                newButton.classList.add('DS002-show-button');
              } else {
                newButton.classList.remove('DS002-show-button');
              }
            }

            // Trigger click on associated (original) label
            const newLabel = newOptions[i].querySelector('label');
            if (newLabel) {
              const labelForVal = newLabel.getAttribute('for');
              // Match against original label
              for (let j = 0; Experiment.cache.forLabels.length > j; j += 1) {
                const oldLabel = Experiment.cache.forLabels[j];
                if (oldLabel && oldLabel.getAttribute('for') === labelForVal) {
                  oldLabel.click();
                  $('html,body').animate({
                    scrollTop: $(newOptions[0]).offset().top - 300,
                  }, 0);
                  return;
                }
              }
            }
          });
        }
      }
      if (newButton) {
        newButton.addEventListener('click', () => {
          events.send(Experiment.settings.ID, 'Clicked', 'Clicked on add to cart from that search from similar products product');
          Experiment.cache.button.click();
        });
      }
    },
    removeId() {
      const newOptions = Experiment.cache.bodyVar.querySelectorAll('.DS002-tag-table table.validate-checkbox-group tr .td1 input');
      if (newOptions) {
        for (let i = 0; newOptions.length > i; i += 1) {
          // newOptions[i].setAttribute('id', '');
          // newOptions[i].setAttribute('name', '');
          newOptions[i].parentNode.removeChild(newOptions[i]);
        }
      }
    },
    detectCountry() {
      const url = window.location.pathname;
      let country = 'en';
      const matchedCountry = url.match(/^(\/)(\w{2})/);
      if (matchedCountry) {
        country = matchedCountry[2];
      } else {
        country = 'en';
      }
      return country;
    },
  },

  components: {
    tagProducts(ref, button, tableOfChoices, title, subtitle) {
      let html = null;
      if (button && tableOfChoices) {
        html = `
          <div class="DS002-similar-products">
            <div class="container">
              <h2>${title}</h2>
              <p>${subtitle}</p>

              <div class="DS002-tag-table">
                ${tableOfChoices.outerHTML}
              </div>
              <div class="DS002-tag-button">
                ${button.outerHTML}
              </div>
            </div>
          </div>
        `;
      }
      if (ref) {
        ref.insertAdjacentHTML('afterend', html);
      }
    },
    checkChecked() {
      const oldCheckboxes = Experiment.cache.choiceTable.querySelectorAll('td.td1 input:checked');
      const newCheckboxes = Experiment.cache.bodyVar.querySelectorAll('.DS002-tag-table .td1 label');
      const newButton = Experiment.cache.bodyVar.querySelector('.DS002-tag-button a');
      if (oldCheckboxes.length > 0) {
        for (let i = 0; oldCheckboxes.length > i; i += 1) {
          const id = oldCheckboxes[i].getAttribute('id');
          // Loop over new checkboxes
          for (let j = 0; newCheckboxes.length > j; j += 1) {
            const forName = newCheckboxes[j].getAttribute('for');

            if (forName === id) {
              newCheckboxes[j].parentNode.parentNode.classList.add('DS002-active-filter');
              newButton.classList.add('DS002-show-button');
            }
          }
        }
      }
    },
  },
};

export default Experiment;
