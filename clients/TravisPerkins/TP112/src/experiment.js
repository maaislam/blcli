import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';


/**
 * {{TP112}} - {{Desktop Search}}
 */

const Run = () => {
  const $ = window.jQuery;
  let SlideQ = false;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP112',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const docVar = document;
      const filtersParent = bodyVar.querySelectorAll('#facets_filters > .item');
      const breadCrumbs = docVar.getElementById('breadcrumb');
      const categoryFilters = docVar.getElementById('spanFacet');
      const categoryParent = bodyVar.querySelector('#facets_filters > #facets_filters');
      const filtersParentScroll = $(filtersParent[0]);
      let topFilterWrap;
      let currentFilterParent;

      return {
        bodyVar,
        filtersParent,
        breadCrumbs,
        topFilterWrap,
        currentFilterParent,
        categoryFilters,
        categoryParent,
        docVar,
        filtersParentScroll,
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
      // const hide = document.getElementById(`${settings.ID}_flickerPrevention`);
      // hide.parentElement.removeChild(hide);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Insert markup to contain dropdowns
        Exp.cache.breadCrumbs.insertAdjacentHTML('afterend', `
        <div class="TP112_Wrap">
          <h3 class="TP112_Header">Refine your search</h3>
          <div class="TP112_Filters_Top_Wrap">
            <div class="TP112_Show_More_Wrap"><span class="TP112_More_Filter_Options">More Filter Options</span></div>
          </div>
        </div>
        `);
        // Assign selectors
        Exp.cache.topFilterWrap = Exp.cache.bodyVar.querySelector('.TP112_Filters_Top_Wrap');
        // Build drop down options
        this.buildDropDown();
        // Give all dropdowns the same width
        // this.setDropDownWidth();
        // Add functions
        this.setupFunctions();
        // Build ddslick dropdowns
        poller([
          () => {
            let checkDdSlick = false;
            if (window.$.fn.ddslick) {
              checkDdSlick = true;
            }
            return checkDdSlick;
          },
        ], this.buildSlickDropDown);
      },
      buildDropDown() {
        // Loop through each of the filter parents
        // loop through each parent to get individual option
        for (let i = 0; i < Exp.cache.filtersParent.length; i += 1) {
          // Only run for up to 4 filters
          if (i < 4) {
            const currentCategory = Exp.cache.filtersParent[i].querySelector('.refinementToggle').textContent.trim();
            const currentFilters = Exp.cache.filtersParent[i].querySelectorAll('.allFacetValues .facet_block  > li');
            // Insert markup to house options
            const categoryClass = currentCategory.replace(/\.|\s+/g, '_');
            const filterMarkup = `
            <div class="TP112_Filter-Wrap ${categoryClass}_Wrap">
              <p class="TP112_Filter_Header TP112_${categoryClass}_Header">${currentCategory}</p>
                <select class="TP112_Select_Group" name="${categoryClass}" id="TP112_${categoryClass}">
                  <option value="" disabled selected>Select Option</option>
                </select>
            </div>`;
            // Place markup depending on current filter number
            Exp.cache.topFilterWrap.insertAdjacentHTML('afterbegin', filterMarkup);
            // Store a reference to the added markup to add options
            Exp.cache.currentFilterParent = Exp.cache.bodyVar.querySelector(`.${categoryClass}_Wrap > select`);
            // Second loop to retrieve each filter option
            for (let j = 0; j < currentFilters.length; j += 1) {
              // Used to disabled already selected options in the dropdown
              let alreadyAdded = false;
              let filterOption = currentFilters[j].querySelector('label');
              // Check if option is selected
              if (filterOption) {
                if (filterOption.querySelector('input').checked) {
                  alreadyAdded = true;
                }
              }
              // Some options are an a tag instead of a label with checkbox
              if (!filterOption) {
                filterOption = currentFilters[j].querySelector('a');
              }
              // Prepare data attribute/Option value
              const optionData = filterOption.textContent.replace(/\s+/g, '').trim();
              // Set data attribute to current option on page to match markup
              filterOption.setAttribute('data-TP112-Filter', `TP112-${optionData}`);
              const filterOptionText = filterOption.textContent.trim();
              const filterOptionMarkup = `
              <option value="TP112-${optionData}">${filterOptionText}</option>
              `;
              // Append the option to the current select group
              Exp.cache.currentFilterParent.insertAdjacentHTML('beforeend', filterOptionMarkup);
              // Disable option if it's already selected - should only apply to checkboxes
              if (alreadyAdded) {
                Exp.cache.bodyVar.querySelector(`option[value="TP112-${optionData}"]`).setAttribute('disabled', 'disabled');
              }
            }
          } else {
            break;
          }
        }
      },
      // setDropDownWidth() {
      //   // Find the largest outerwidth of the dropdown selectors
      //   // Assign all of the drop downs the largest width
      //   const insertedDropDown = $('.TP112_Select_Group');
      //   let newWidth = 0;
      //   for (let i = 0; i < insertedDropDown.length; i += 1) {
      //     if ($(insertedDropDown[i]).outerWidth() > newWidth) {
      //       newWidth = $(insertedDropDown[i]).outerWidth();
      //     }
      //   }
      //   Exp.cache.dropdownWidth = newWidth;
      // },
      buildSlickDropDown() {
        // Using ddslick plugin on website to build dropdowns
        // Add ddslick to each drop down group, else all drop downs share options
        const dropDowns = $('.TP112_Select_Group');
        for (let i = 0; i < dropDowns.length; i += 1) {
          $(dropDowns[i]).ddslick({
            width: 160,
            background: '#ffffff',
            onSelected: (data) => {
              Exp.components.buildSlickDropDownFunction(data);
            },
          });
        }
      },
      buildSlickDropDownFunction(target) {
        // Retreive selected option and click filter
        // Send event
        events.send(`${Exp.settings.ID}`, 'Click', `Filter drop down ${Exp.settings.ID}`, { sendOnce: true });
        const selectedOption = target.selectedData.value;
        Exp.cache.bodyVar.querySelector(`[data-tp112-filter="${selectedOption}"]`).click();
      },
      setupFunctions() {
        // Add event handler to added more filters link
        Exp.cache.bodyVar.querySelector('.TP112_More_Filter_Options').addEventListener('click', () => {
          if (!SlideQ) {
            // Send event
            events.send(`${Exp.settings.ID}`, 'Click', ` More filter options ${Exp.settings.ID}`, { sendOnce: true });
            SlideQ = true;
            // Anchor to filters and add styling class to make filters parent glow
            $('html, body').animate({ scrollTop: Exp.cache.filtersParentScroll.offset().top - 50 });
            // Add styling class
            Exp.cache.categoryParent.classList.toggle('TP112-Glow');
            // Remove class after 10s
            setTimeout(() => {
              Exp.cache.categoryParent.classList.toggle('TP112-Glow');
              SlideQ = false;
            }, 10000);
          }
        });
      },
    },
  };

  Exp.init();
};

export default Run;
