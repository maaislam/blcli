import { fullStory, events, getClosest, group } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * TP126 - Desktop Search
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
      ID: 'TP126',
      VARIATION: '1',
    },

    cache: (() => {
      const breadCrumbs = document.getElementById('breadcrumb');
      const categoryFilters = document.getElementById('spanFacet');
      const categoryParent = document.querySelector('#facets_filters > #facets_filters');
      let topFilterWrap;
      let currentFilterParent;
      const catFilter = document.querySelector('#facets_filters > #facetWrapper');
      const filtersParent = document.querySelectorAll('#facets_filters > .item');
      const filtersParentScroll = $(filtersParent[0]);
      const searchTerms = /(gravel)|(screw)|(timber)|(shingle)/ig;

      /**
       * Work out which filters to used based in searchTerms
       * @returns {RegExp}
       */
      const filterTerms = () => {
        const currentSearchTerm = () => {
          const searchTitle = document.querySelector('.prod_search_result_pagination h1.bold');
          let finalTerm = null;
          if (searchTitle) {
            const term = searchTitle.textContent.trim();
            if (term) {
              if (term.match(searchTerms)) {
                finalTerm = term.match(searchTerms);
              }
            }
          }
          return finalTerm;
        };
        const key = currentSearchTerm();
        if (!key) {
          return;
        }
        let regexToMatch = null;
        switch (key[0]) {
          case ('gravel'):
            regexToMatch = /by type|by brand|by package type/g;
            break;
          case ('timber'):
            regexToMatch = /by width|by length|by depth|by type/g;
            break;
          case ('screw'):
            regexToMatch = /by length|by width|by type|by pack quantity/g;
            break;
          case ('shingle'):
            regexToMatch = /by colour|by brand|by material/g;
            break;
          default:
            break;
        }
        return regexToMatch;
      };

      /**
       * @returns {Array.<HTMLElement>} Array of elements for each filter that will be used
       */
      const chooseFilters = () => {
        const filterArr = [];
        if (filtersParent) {
          for (let i = 0; filtersParent.length > i; i += 1) {
            const text = filtersParent[i].querySelector('.category > a').textContent.trim().toLowerCase();
            if (text) {
              if (text.match(filterTerms())) {
                filterArr.push(filtersParent[i]);
              }
            }
          }
        }
        return filterArr;
      };

      const newFiltersParent = chooseFilters();

      return {
        filtersParent,
        breadCrumbs,
        topFilterWrap,
        currentFilterParent,
        categoryFilters,
        categoryParent,
        filtersParentScroll,
        catFilter,
        newFiltersParent,
        searchTerms,
      };
    })(),

    init: () => {
      const {
        services,
        settings,
        components,
      } = Exp;

      /**
       * Bail out if the search term does not contain one of the following:
       * gravel
       * screw
       * timber
       * shingle
       * @returns {Boolean}
       */
      const isTerm = () => {
        const searchTermEl = document.querySelector('#content h1.bold');
        let hasTerm = false;
        if (searchTermEl && searchTermEl.textContent.match(Exp.cache.searchTerms)) {
          hasTerm = true;
        }
        return hasTerm;
      };

      if (isTerm() === false) {
        return false;
      }

      document.body.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
      // const hide = document.getElementById(`${settings.ID}_flickerPrevention`);
      // hide.parentElement.removeChild(hide);
      /**
       * Will name the function in relation to the wireframes. 01
       */
      const filterYourSearchHeader = () => {
        services.moveComponent(Exp.cache.catFilter, `
          <div class="TP126-filter-header" id="TP126-filters">
            <h3>Filter your search</h3>
          </div>
        `, 'afterend');
      };

      filterYourSearchHeader();
      components.rebuildSearchTerm();

      /** Add active class to filters */
      const addActiveClass = () => {
        const selectedOptions = document.querySelectorAll('#selected_facet_options .facet_block li > a');
        const posibleFilters = document.querySelectorAll('.TP126_Filters_Top_Wrap .TP126_Filter-Wrap .dd-container > .dd-options li > a > label');
        const selectedOptionsArr = [];
        const posibleFiltersArr = [];
        let matches = [];
        if (selectedOptions && posibleFilters) {
          [].forEach.call(selectedOptions, (element) => {
            const text = element.textContent;
            if (text) {
              selectedOptionsArr.push(text.trim());
            }
          });
          [].forEach.call(posibleFilters, (element) => {
            const text = element.textContent;
            if (text) {
              posibleFiltersArr.push(text.trim());
              matches = selectedOptionsArr.filter(elementTwo => posibleFiltersArr.includes(elementTwo));
            }
          });
        }
        for (let i = 0; posibleFilters.length > i; i += 1) {
          if (posibleFilters[i]) {
            const text = posibleFilters[i].textContent;
            if (text) {
              if (matches.indexOf(text) > -1) {
                posibleFilters[i].parentElement.classList.add('TP126-active-filter');
              }
            }
          }
        }
      };

      /** Move title below breadcrumbs */
      const addedFilters = document.querySelectorAll('.TP126_Filters_Top_Wrap .TP126_Filter-Wrap .dd-container .dd-selected .dd-selected-text');
      pollerLite([addedFilters], () => {
        services.moveComponent(
          document.querySelector('.TP126_Wrap'),
          document.querySelector('.prod_search_result_pagination h1.bold'), 'afterbegin',
        );
        addActiveClass();
        services.clickTracking();
        services.orderFilters();
        services.updateSelectTitle();
      });
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

      /**
       * @desc Move existing components around
       * @param {Element} ref
       * @param {Element} element
       * @param {String} position options; beforebegin, afterbegin, beforeend, afterend
       */
      moveComponent(ref, element, position) {
        if (ref && element && position) {
          if (typeof element === 'object') {
            ref.insertAdjacentElement(position, element);
          } else {
            ref.insertAdjacentHTML(position, element);
          }
        }
      },

      /**
       * After the classes have been added to the chosen filters
       * take those titles and replace the current select title with them.
       */
      updateSelectTitle() {
        const selectDropdownsParent = document.querySelectorAll('.TP126_Filters_Top_Wrap .TP126_Filter-Wrap .dd-container');
        if (selectDropdownsParent.length > 0) {
          const activeFiltersObject = {};

          for (let i = 0; selectDropdownsParent.length > i; i += 1) {
            // Active filters for this particular dropdown
            const currentActiveFilters = selectDropdownsParent[i].querySelectorAll('.dd-options li .dd-option.TP126-active-filter');
            // Selected dropdown label
            const selectedLabel = selectDropdownsParent[i].querySelector('.dd-select .dd-selected .dd-selected-text');
            // Make empty array
            const activeFiltersArr = [];
            // Push the text to the array
            for (let k = 0; currentActiveFilters.length > k; k += 1) {
              activeFiltersArr.push(currentActiveFilters[k].textContent);
            }
            // Assign filter text to object.
            activeFiltersObject[selectedLabel.textContent] = activeFiltersArr;
            // Apply object values to the selected label
            if (activeFiltersObject[selectedLabel.textContent].length > 0) {
              selectedLabel.classList.add('TP126-added-filter');
              selectedLabel.textContent = activeFiltersObject[selectedLabel.textContent];
            }
          }
        }
      },

      /**
       * Click tracking on the filter elements and view all filters
       */
      clickTracking() {
        const filterSelects = document.querySelectorAll('.TP126_Filters_Top_Wrap > .TP126_Filter-Wrap .dd-select .dd-selected');
        const viewAllFilters = document.querySelector('.TP126_Filters_Top_Wrap .TP126_Show_More_Wrap .TP126_More_Filter_Options');

        if (filterSelects) {
          for (let i = 0; filterSelects.length > i; i += 1) {
            filterSelects[i].addEventListener('click', () => {
              events.send(Exp.settings.ID, 'Click', 'Prioritised filter', { sendOnce: true });
            });
          }
        }
        if (viewAllFilters) {
          viewAllFilters.addEventListener('click', () => {
            events.send(Exp.settings.ID, 'Click', 'View More Filters', { sendOnce: true });
          });
        }
      },

      orderFilters() {
        const whatTerm = Exp.cache.searchTerms;
        const currentTerm = document.querySelector('.TP126_Wrap h1.bold span').textContent;
        const activeTerm = currentTerm.match(whatTerm);
        const currentFunctions = document.querySelectorAll('.TP126_Wrap .TP126_Filter-Wrap');
        const filterWrap = document.querySelector('.TP126_Wrap');

        function isElement(element) {
          return element instanceof Element;  
        }

        const gravelOrder = () => {
          let typeFilter;
          let brandFilter;
          let pacakgeTypeFilter;

          for (let i = 0; currentFunctions.length > i; i += 1) {
            const filterTextElement = currentFunctions[i].querySelector('.dd-container .dd-selected .dd-selected-text');
            // Move second to end
            if (!filterTextElement) return false;
            const filterText = filterTextElement.textContent.trim().toLowerCase();
            const type = filterText.match(/^type$/);
            const brand = filterText.match(/^brand$/);
            const pacakgeType = filterText.match(/package type/);
            
            // Re order
            if (type !== null) {
              typeFilter = currentFunctions[i];
            }
            if (brand !== null) {
              brandFilter = currentFunctions[i];
            }
            if (pacakgeType !== null) {
              pacakgeTypeFilter = currentFunctions[i];
            }
          }
          
          if (pacakgeTypeFilter && typeFilter) {
            pacakgeTypeFilter.insertAdjacentElement('beforebegin', typeFilter);
          }
          if (pacakgeTypeFilter && brandFilter) {
            pacakgeTypeFilter.insertAdjacentElement('beforebegin', brandFilter);
          }
        };

        const timberOrder = () => {
          let widthFilter;
          let lengthFilter;
          let depthFilter;
          let typeFilter;

          for (let i = 0; currentFunctions.length > i; i += 1) {
            const filterTextElement = currentFunctions[i].querySelector('.dd-container .dd-selected .dd-selected-text');
            // Move second to end
            if (!filterTextElement) return false;
            const filterText = filterTextElement.textContent.trim().toLowerCase();
            const width = filterText.match(/^width$/);
            const length = filterText.match(/^length$/);
            const depth = filterText.match(/^depth$/);
            const type = filterText.match(/^type$/);
            
            // Re order
            if (type !== null) {
              typeFilter = currentFunctions[i];
            }
            if (width !== null) {
              widthFilter = currentFunctions[i];
            }
            if (length !== null) {
              lengthFilter = currentFunctions[i];
            }
            if (depth !== null) {
              depthFilter = currentFunctions[i];
            }
          }
          if (lengthFilter && depthFilter) {
            lengthFilter.insertAdjacentElement('afterend', depthFilter);
          }
        };

        const screwOrder = () => {
          let lengthFilter;
          let widthFilter;
          let typeFilter;
          let packQtyFilter;

          for (let i = 0; currentFunctions.length > i; i += 1) {
            const filterTextElement = currentFunctions[i].querySelector('.dd-container .dd-selected .dd-selected-text');
            // Move second to end
            if (!filterTextElement) return false;
            const filterText = filterTextElement.textContent.trim().toLowerCase();
            const length = filterText.match(/^length$/);
            const width = filterText.match(/^width$/);
            const type = filterText.match(/^type$/);
            const packQty = filterText.match(/^depth$/);

            // Re order
            if (type !== null) {
              typeFilter = currentFunctions[i];
            }
            if (width !== null) {
              widthFilter = currentFunctions[i];
            }
            if (length !== null) {
              lengthFilter = currentFunctions[i];
            }
            if (packQty !== null) {
              packQtyFilter = currentFunctions[i];
            }
          }
          if (widthFilter && lengthFilter) {
            widthFilter.insertAdjacentElement('beforebegin', lengthFilter);
            if (typeFilter) {
              widthFilter.insertAdjacentElement('afterend', typeFilter);
            }
          }
        };

        const shingleOrder = () => {
          let colourFilter;
          let brandFilter;
          let materialFilter;

          for (let i = 0; currentFunctions.length > i; i += 1) {
            const filterTextElement = currentFunctions[i].querySelector('.dd-container .dd-selected .dd-selected-text');
            // Move second to end
            if (!filterTextElement) return false;
            const filterText = filterTextElement.textContent.trim().toLowerCase();
            const colour = filterText.match(/^colour$/);
            const brand = filterText.match(/^brand$/);
            const material = filterText.match(/^material$/);
            
            // Re order
            if (colour !== null) {
              colourFilter = currentFunctions[i];
            }
            if (brand !== null) {
              brandFilter = currentFunctions[i];
            }
            if (material !== null) {
              materialFilter = currentFunctions[i];
            }
          }
          if (materialFilter && brandFilter) {
            materialFilter.insertAdjacentElement('beforebegin', brandFilter);
          }
        };

        switch (activeTerm[0].toLowerCase()) {
          case 'gravel':
            gravelOrder();
            break;
          case 'timber':
            timberOrder();
            break;
          case 'shingle':
            shingleOrder();
            break;
          case 'screw':
            screwOrder();
            break;
          default:
            break;
        }
      },

      /**
       * In each filter dropdown, move any selected options to the top of the
       * list and disable them
       */
      moveSelectedOptionsToTop() {
        const selectedOptions = Exp.cache.activeFilters;
        const keys = Object.keys(selectedOptions);
        for (let i = 0; i < keys.length; i += 1) {
          const groupName = keys[i];
          const selectedGroupOptions = selectedOptions[groupName];
          const groupEl = document.querySelector(`.TP126_Filter-Wrap[data-tp126-group="TP126-${groupName}"]`);
          const groupOptionsList = groupEl.querySelector('.dd-options');

          for (let j = 0; j < selectedGroupOptions.length; j += 1) {
            const selectedOptionFilter = selectedGroupOptions[j];
            const selectedOptionFilterInput = groupOptionsList.querySelector(`[value="TP126-${selectedOptionFilter}"]`);
            const selectedOptionFilterEl = getClosest(selectedOptionFilterInput, 'li');

            // Move to top of list
            groupOptionsList.insertAdjacentElement('afterbegin', selectedOptionFilterEl);

            // Disable element
            selectedOptionFilterEl.classList.add('TP126_Filter-Disable');
          }

          // Add label to top
          groupOptionsList.insertAdjacentHTML('afterbegin', `<li class="TP126_Filter-Disable"><a class="dd-option"><label class="dd-option-text">${groupName}</label></a></li>`);
          const groupOptionsLabel = getClosest(groupOptionsList.querySelector('[value="TP126_GroupName"]'), 'li');
          groupOptionsLabel.parentElement.removeChild(groupOptionsLabel);
        }
      },
    },
    components: {
      setupElements() {
        // Insert markup to contain dropdowns
        Exp.cache.breadCrumbs.insertAdjacentHTML('afterend', `
          <div class="TP126_Wrap">
            <h4 class="TP126_Header">Popular filter options</h4>
            <div class="TP126_Filters_Top_Wrap">
              <div class="TP126_Show_More_Wrap"><span class="TP126_More_Filter_Options">View All Filter Options</span></div>
            </div>
          </div>
        `);
        // Assign selectors
        Exp.cache.topFilterWrap = document.querySelector('.TP126_Filters_Top_Wrap');
        // Build drop down options
        this.buildDropDown();
        // Give all dropdowns the same width
        // this.setDropDownWidth();
        // Add functions
        this.setupFunctions();
        // Build ddslick dropdowns
        pollerLite([
          () => {
            let checkDdSlick = false;
            if (window.$.fn.ddslick) {
              checkDdSlick = true;
            }
            return checkDdSlick;
          },
        ], () => {
          this.buildSlickDropDown();
          Exp.services.moveSelectedOptionsToTop();
        });
      },

      buildDropDown() {
        Exp.cache.activeFilters = {};

        // Loop through each of the filter parents
        for (let i = 0; i < Exp.cache.newFiltersParent.length; i += 1) {
          // Only run for up to 4 filters
          if (i < 4) {
            const currentCategory = Exp.cache.newFiltersParent[i].querySelector('.refinementToggle').textContent.trim();
            const currentFilters = Exp.cache.newFiltersParent[i].querySelectorAll('.allFacetValues .facet_block  > li');
            const groupName = currentCategory.replace('Shop by ', '');

            // Insert markup to house options
            const categoryClass = currentCategory.replace(/\.|\s+/g, '_');
            const filterMarkup = `
              <div class="TP126_Filter-Wrap ${categoryClass}_Wrap" data-TP126-Group="TP126-${groupName}">
                <p class="TP126_Filter_Header TP126_${categoryClass}_Header">${currentCategory}</p>
                  <select class="TP126_Select_Group" name="${categoryClass}" id="TP126_${categoryClass}">
                    <option disabled selected value="TP126_GroupName">${groupName}</option>
                  </select>
              </div>
            `;

            // Place markup depending on current filter number
            Exp.cache.topFilterWrap.insertAdjacentHTML('afterbegin', filterMarkup);

            // Store a reference to the added markup to add options
            Exp.cache.currentFilterParent = document.querySelector(`.${categoryClass}_Wrap > select`);

            // Set unique name on filter parent so we can target it later
            // This will avoid situations where the wrong filter is selected when a generic filter
            // appears in multiple groups (e.g. 10mm)
            Exp.cache.newFiltersParent[i].setAttribute('data-TP126-Group', `TP126-${groupName}`);

            // Add each dropdown option to the parent
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
              filterOption.setAttribute('data-TP126-Filter', `TP126-${optionData}`);
              const filterOptionText = filterOption.textContent.trim();
              const filterOptionMarkup = `
               <option value="TP126-${optionData}">${filterOptionText}</option>
              `;

              // Append the option to the current select group
              Exp.cache.currentFilterParent.insertAdjacentHTML('beforeend', filterOptionMarkup);

              // Disable option if it's already selected - should only apply to checkboxes
              // Add filter to top if it's already selected
              if (alreadyAdded) {
                const selectedOption = document.querySelector(`option[value="TP126-${optionData}"]`);
                selectedOption.setAttribute('disabled', 'disabled');
                selectedOption.setAttribute('selected', 'selected');
                if (!Exp.cache.activeFilters[groupName]) {
                  Exp.cache.activeFilters[groupName] = [];
                }
                Exp.cache.activeFilters[groupName].push(optionData);
              }
            }
          } else {
            break;
          }
        }
      },

      buildSlickDropDown() {
        // Using ddslick plugin on website to build dropdowns
        // Add ddslick to each drop down group, else all drop downs share options
        const dropDowns = $('.TP126_Select_Group');
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
        const selectedGroup = getClosest(target.selectedItem[0], '.TP126_Filter-Wrap').getAttribute('data-tp126-group');
        document.querySelector(`[data-tp126-group="${selectedGroup}"] [data-tp126-filter="${selectedOption}"]`).click();
      },

      setupFunctions() {
        // Add event handler to added more filters link
        document.querySelector('.TP126_More_Filter_Options').addEventListener('click', () => {
          if (!SlideQ) {
            // Send event
            events.send(`${Exp.settings.ID}`, 'Click', ` More filter options ${Exp.settings.ID}`, { sendOnce: true });
            SlideQ = true;
            // Anchor to filters and add styling class to make filters parent glow
            $('html, body').animate({ scrollTop: Exp.cache.filtersParentScroll.offset().top - 50 });
            // Add styling class
            Exp.cache.categoryParent.classList.toggle('TP126-Glow');
            // Remove class after 10s
            setTimeout(() => {
              Exp.cache.categoryParent.classList.toggle('TP126-Glow');
              SlideQ = false;
            }, 10000);
          }
        });
      },

      /**
       * Create a heading with the user's search term
       */
      rebuildSearchTerm() {
        const searchTerm = document.querySelector('.prod_search_result_pagination h1.bold');
        if (searchTerm) {
          const term = searchTerm.textContent.trim().match(/("\w.+")/)[1];
          if (term) {
            const newTerm = `
              You searched for <span>${term}</span>
            `;
            searchTerm.innerHTML = newTerm;
          }
        }
      },
    },
  };

  Exp.init();
};

export default Run;
