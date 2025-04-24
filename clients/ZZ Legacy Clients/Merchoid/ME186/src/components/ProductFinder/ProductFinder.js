import settings from '../../lib/settings';
import brandImages from './data/brandImages';
import { getClosest } from '../../../../../../lib/utils';

const { ID } = settings;

export default class ProductFinder {
  constructor() {
    // Use flexbox if browser supports it for a smoother animation on brands, else use fallback
    const { style } = document.body;
    if (!style.webkitFlexWrap === '' || !style.msFlexWrap === '' || !style.flexWrap === '') {
      document.body.classList.add(`${ID}_no-flex-support`);
    }

    // ------------------------------------------------------------------------
    // Data object that will contain the original and filtered JSON states
    // The slugsMap object will be fully populated when the filterData function
    // iterates over each option. They are used to construct a URL on submit
    // ------------------------------------------------------------------------
    // TODO: Rename to getDataObject
    this.finderData = {
      productData: '',
      filteredData: {
        json: '', // Not needed
        categories: [], // Not needed
        brands: [], // Not needed
        genders: [], // Not needed
      },
      slugsMap: {
        categories: {
          query: 'product_cat',
          values: {},
        },
        brands: {
          query: 'pa_brand',
          values: {},
        },
        genders: {
          query: 'pa_person',
          values: {
            Male: 'men',
            Female: 'ladies',
            Unisex: 'unisex',
          },
        },
      },
    };

    /**
     * Filter data
     */
    this.filters = {
      Brand: {
        copy: {
          selectPlaceholderText: 'All Brands',
          selectedText: 'brand(s) selected',
        },
        slugs: {
          query: 'pa_brand',
          values: {},
        },
      },
      Category: {
        copy: {
          selectPlaceholderText: 'All Categories',
          selectedText: 'categories selected',
        },
        slugs: {
          query: 'product_cat',
          values: {},
        },
      },
      Gender: {
        copy: {
          selectPlaceholderText: 'All Genders',
          selectedText: 'gender(s) selected',
        },
        slugs: {
          query: 'pa_person',
          values: {
            Male: 'men',
            Female: 'ladies',
            Unisex: 'unisex',
          },
        },
      },
    };
    this.visitorLocation = ProductFinder.getLocation();
    this.componentActivated = false;
    this.activePromises = [];

    this.create();
    this.bindEvents();
    this.render();
  }

  /** Create component */
  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_ProductFinder`);

    // ----------------------------------------------------------
    // Markup - NOTE: Can't use 'real' select elements due to iOS
    // not allowing select options to be updated dynamically
    // ----------------------------------------------------------
    /* eslint-disable indent */
    element.innerHTML = `
      <div class="${ID}_overlay"></div>
      <div class="${ID}_banner"></div>
      <div class="${ID}_brandText">Search over <span>3,000</span> pieces of <span>Officially Licensed Geek Merch!</span></div>
      <div class="${ID}_brandTitle">Start by selecting your favourite brand(s).</div>

      ${Array.prototype.map.call(Object.keys(this.filters), (key) => {
        const data = this.filters[key];
        return `
        <div class="${ID}_opt ${ID}_select-${key.toLowerCase()}" data-type="${key}">
          <span class="${ID}_opt__label">${key}</span>
          <div class="${ID}_opt__select">
            <span class="${ID}_opt__select__placeholder">${data.copy.selectPlaceholderText}</span>
            <div class="${ID}_opt__select__inner-wrap">
              <div class="${ID}_opt__select__inner"></div>
              <div class="${ID}_selected-opts ${ID}_row">
                <div class="${ID}_cols-9">
                  <div class="${ID}_selected-opts__txt">
                    <span id="${ID}_selected-opts__num"></span> ${data.copy.selectedText}
                  </div>
                </div>
                <div class="${ID}_cols-3">
                  <div class="${ID}_selected-opts__done">Done</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
      }).join('')}

      <div class="${ID}_cta-wrap">
        <div class="${ID}_clear-form">Clear form</div>
        <div class="${ID}_cta">Search</div>
      </div>
    `;
    /* eslint-enable indent */

    this.component = element;
    this.overlay = element.querySelector(`.${ID}_overlay`);
  }

  /** Attach event handlers */
  bindEvents() {
    const { component, overlay } = this;

    const ctrls = {
      openMenus: [],
      closeMenus: [],
    };

    // Open / Close dropdowns
    const options = component.querySelectorAll(`.${ID}_opt`);
    Array.prototype.forEach.call(options, (option) => {
      const menu = option.querySelector(`.${ID}_opt__select__inner-wrap`);
      const dataType = option.getAttribute('data-type');
      const placeholder = option.querySelector(`.${ID}_opt__select__placeholder`);
      const placeholderText = this.filters[dataType].copy.selectPlaceholderText;
      const selectedOptions = option.querySelector(`.${ID}_selected-opts`);

      // Set filters-selected attribute
      option.setAttribute('data-filters-selected', '0');

      const openMenu = () => {
        menu.style.display = 'block';
        option.classList.add(`${ID}_opt--active`);
        overlay.style.display = 'block';

        // Update selected filters number
        selectedOptions.querySelector(`#${ID}_selected-opts__num`).innerText = option.getAttribute('data-filters-selected');
      };
      const closeMenu = () => {
        menu.style.display = 'none';
        option.classList.remove(`${ID}_opt--active`);
        overlay.style.display = 'none';

        // Refilter data every time the menu is closed
        this.filterData(this.finderData.productData);
      };

      // Push controls to array which will allow us to open/close all
      // the menus at once if needed
      ctrls.openMenus.push(openMenu);
      ctrls.closeMenus.push(closeMenu);

      // Widget clicks
      const widgetClickHandler = () => {
        const allMenus = component.querySelectorAll(`.${ID}_opt__select__inner-wrap`);
        const allMenusToHide = Array.prototype.filter.call(allMenus, el => el !== menu);
        Array.prototype.forEach.call(allMenusToHide, (el) => {
          el.style.display = 'none';
        });

        const hasSelectedOptions = !!option.querySelector(`.${ID}_opt__selection`);
        const menuIsClosed = menu.style.display === 'none' || menu.style.display === '';

        if (menuIsClosed && hasSelectedOptions) {
          return false;
        }

        if (menuIsClosed) {
          openMenu();
        } else {
          closeMenu();
        }
      };
      option.addEventListener('click', () => {
        // Load Product Data JSON when user interacts with widget for first time
        if (!this.widgetActive) {
          this.widgetActive = true;
          this.getJSON().then((data) => {
            this.finderData.productData = data;
            this.filterData(data);
            widgetClickHandler();
          });
        } else {
          widgetClickHandler();
        }
      });

      // Prevent clicks inside the menus from bubbling
      menu.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      // Done button
      selectedOptions.querySelector(`.${ID}_selected-opts__done`).addEventListener('click', (e) => {
        e.stopPropagation();
        closeMenu();
      });

      const removeFilter = (opt) => {
        // Decrement filter selection
        const filterCount = option.getAttribute('data-filters-selected');
        const newFilterCount = parseInt(filterCount) - 1;
        option.setAttribute('data-filters-selected', newFilterCount);

        if (selectedOptions) {
          // Hide selected opts if visible
          if (newFilterCount === 0 && selectedOptions.classList.contains(`${ID}_show-selected-opts`)) {
            selectedOptions.classList.remove(`${ID}_show-selected-opts`);
          }

          selectedOptions.querySelector(`#${ID}_selected-opts__num`).innerText = newFilterCount;
        }

        opt.classList.remove(`${ID}_opt--selected`);

        const selectedFilters = Array.prototype.filter.call(placeholder.children, el => el.childNodes[0].nodeValue.trim() === opt.innerText.trim());
        if (selectedFilters) {
          Array.prototype.forEach.call(selectedFilters, (el) => {
            el.parentElement.removeChild(el);
          });
        }

        // If that was last child in placeholder, make field inactive again
        if (!placeholder.children.length) {
          const selectedOpts = menu.querySelectorAll(`span.${ID}_opt--selected`);
          if (selectedOpts) {
            Array.prototype.forEach.call(selectedOpts, (el) => {
              el.classList.remove(`${ID}_opt--selected`);
            });
          }
          option.querySelector(`.${ID}_opt__select`).classList.remove(`${ID}_opt__select--active`);
          option.querySelector(`.${ID}_opt__select__placeholder`).innerHTML = placeholderText.trim();
        }

        // Refilter every time a selection is removed
        // filterData(finderData.productData);
      };

      const addFilter = (opt) => {
        // Remove previously selected active options
        // $menu.children(`.${ID}_opt--selected`).removeClass(`${ID}_opt--selected`);
        opt.classList.add(`${ID}_opt--selected`);

        // Increment filter selection
        const filterCount = option.getAttribute('data-filters-selected');
        const newFilterCount = parseInt(filterCount) + 1;
        option.setAttribute('data-filters-selected', newFilterCount);

        if (selectedOptions) {
          // Show selected opts if hidden
          if (!selectedOptions.classList.contains(`${ID}_show-selected-opts`)) {
            selectedOptions.classList.add(`${ID}_show-selected-opts`);
          }

          selectedOptions.querySelector(`#${ID}_selected-opts__num`).innerText = newFilterCount;
        }

        // Add selection to placeholder
        const selectionEl = (() => {
          const element = document.createElement('span');
          element.classList.add(`${ID}_opt__selection`);
          element.innerHTML = `${opt.innerText.trim()}<span class="${ID}_opt__selection__remove">&times;</span>`;

          // selections are chosen here

          // Remove click handler
          element.querySelector(`.${ID}_opt__selection__remove`).addEventListener('click', (e) => {
            e.stopPropagation();
            removeFilter(opt);
            const menuIsOpen = option.classList.contains(`${ID}_opt--active`);
            // If the menu is closed re-filter data
            if (!menuIsOpen) this.filterData(this.finderData.productData);
          });

          return element;
        })();

        // If this is the first selection, empty the default placeholder text
        if (!placeholder.children.length) {
          placeholder.innerHTML = '';
        }
        placeholder.insertAdjacentElement('beforeend', selectionEl);
        option.querySelector(`.${ID}_opt__select`).classList.add(`${ID}_opt__select--active`);
      };

      option.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        const menuItem = dataType === 'Brand' ? getClosest(e.target, `.${ID}_brand-wrap`) : e.target;
        if (menuItem && menuItem.parentElement.classList.contains(`${ID}_opt__select__inner`)) {
          if (!menuItem.classList.contains(`${ID}_opt--selected`)) {
            addFilter(menuItem);
            // Scroll placeholder to right to make the last added option visible
            // $placeholder.animate({
            //   scrollLeft: $placeholder[0].scrollWidth
            // });

            // If 'Confirm / done' button isn't showing, show it

            // Re-filter select options (only shows possibilities that are in stock)
            // this.filterData(this.finderData.productData);
          } else {
            removeFilter(menuItem);
          }
        }
      });
    });

    const getSelections = (option) => {
      const selections = component.querySelectorAll(`[data-type="${option}"] .${ID}_opt__select__placeholder .${ID}_opt__selection`);
      const selected = [];
      Array.prototype.forEach.call(selections, (el) => {
        const text = el.childNodes[0].nodeValue;
        selected.push(text);
      });

      return selected.length ? selected : false;
    };

    // Submit form
    const cta = component.querySelector(`.${ID}_cta`);
    cta.addEventListener('click', () => {
      const brand = getSelections('Brand');
      const category = getSelections('Category');
      const gender = getSelections('Gender');

      if (!category && !brand && !gender) {
        // Nothing selected, show error
        alert('Please select at least one option');
        return;
      }

      const url = this.buildSearchURL(category, brand, gender);
      window.location.href = url;
    });

    // Clear form
    const clear = component.querySelector(`.${ID}_clear-form`);
    clear.addEventListener('click', () => {
      // Remove all active selections
      const active = component.querySelectorAll(`.${ID}_opt__select--active`);
      Array.prototype.forEach.call(active, (el) => {
        const opt = getClosest(el, `.${ID}_opt`);
        const dataType = opt.getAttribute('data-type');
        const placeholder = this.filters[dataType].copy.selectPlaceholderText;

        const placeholderEl = el.querySelector(`.${ID}_opt__select__placeholder`);
        placeholderEl.innerHTML = placeholder;
        el.classList.remove(`${ID}_opt__select--active`);
      });

      // Reset all filter selections
      const selectedFilters = component.querySelectorAll('[data-filters-selected]');
      Array.prototype.forEach.call(selectedFilters, (el) => {
        el.setAttribute('data-filters-selected', '0');
      });

      // Refresh data
      this.filterData(this.finderData.productData);
    });

    // Overlay
    overlay.addEventListener('click', () => {
      component.querySelector(`.${ID}_opt--active`).click();
    });
  }

  /** Render component */
  render() {
    const { component } = this;
    const productWizardRegex = new RegExp('.*/(product-wizard)/.*');

    if (productWizardRegex.test(window.location.href)) {
      const textWidget = document.querySelector('.textwidget');
      if (textWidget) textWidget.style.display = 'none';

      const header = document.querySelector('.entry-header.text-center');

      header.insertAdjacentElement('beforebegin', '<div class="search-again-wrap"><span class="search-again">Search Again ></span></div>');
      document.querySelector('.search-again').addEventListener('click', () => {
        component.classList.toggle('hidden');
      });

      header.insertAdjacentElement('afterend', component);
      component.classList.add('hidden');
    } else {
      // document.querySelector(`.${ID}_Banner`).insertAdjacentElement('afterend', component);
      document.querySelector(`.${ID}_Lightbox__content .${ID}-product_finder`).appendChild(component);
    }
  }

  /**
   * Returns JSON data for stock levels
   * @return {Promise}
   */
  getJSON() {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', `https://ab-test-sandbox.userconversion.com/custom-client-scripts/me-product-finder-json/ME186-data-min-${this.visitorLocation}.json`, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const data = JSON.parse(request.responseText);
          resolve(data);
        } else {
          reject();
        }
      };
      request.onerror = reject;
      request.send();
    });
  }

  /** Determines which options will be shown in select inputs */
  filterData(data) {
    const { component, finderData } = this;
    const options = component.querySelectorAll(`.${ID}_opt`);
    const categoryInput = Array.prototype.filter.call(options, el => el.getAttribute('data-type') === 'Category')[0];
    const brandInput = Array.prototype.filter.call(options, el => el.getAttribute('data-type') === 'Brand')[0];
    const genderInput = Array.prototype.filter.call(options, el => el.getAttribute('data-type') === 'Gender')[0];

    // Reset filtered data
    finderData.filteredData = {
      categories: [],
      brands: [],
      genders: [],
    };

    // Get currently selected options
    const getSelectedOptions = (input) => {
      const selections = input.querySelectorAll(`.${ID}_opt__selection`);
      const selected = [];
      if (selections.length) {
        Array.prototype.forEach.call(selections, (selection) => {
          const value = selection.childNodes[0].nodeValue;
          if (value) selected.push(value);
        });
      }

      return selected.length ? selected : false;
    };

    const selectedBrand = getSelectedOptions(brandInput);
    const selectedCategory = getSelectedOptions(categoryInput);
    const selectedGender = getSelectedOptions(genderInput);

    /* Return array of stock levels to check depending on the selected gender
       n.b. When the JSON file was minified the labels "Male", "Female" and "Unisex"
       were replaced by a single letter. This is what the second array item is */
    const stockLevels = (() => {
      let toReturn = [];

      if (!selectedGender) {
        // Check stock for all genders if none are specified
        toReturn = [['Male', 'g'], ['Female', 'h'], ['Unisex', 'i']];
      } else {
        if (selectedGender.indexOf('Male') > -1) {
          toReturn.push(['Male', 'g']);
        }

        if (selectedGender.indexOf('Female') > -1) {
          toReturn.push(['Female', 'h']);
        }

        if (selectedGender.indexOf('Unisex') > -1) {
          toReturn.push(['Unisex', 'i']);
        }
      }

      return toReturn;
    })();

    // Loop through all objects in data argument and filter them
    // data.forEach((content) => {
    //   console.log(content);
    // });

    for (let i = 0, n = data.length; i < n; i += 1) {
      ((i, val) => {
        let isCategory;
        let isBrand;
        let j;
        const gendersInStock = [];

        // If a category is selected, check to see if this object category matches
        const category = val.e;
        if (selectedCategory && selectedCategory.length) {
          if (selectedCategory.indexOf(category) > -1) {
            isCategory = true;
          } else {
            return;
          }
        } else {
          isCategory = true;
        }

        // If a brand is selected, check to see if this object brand matches
        const brand = val.a;
        if (selectedBrand && selectedBrand.length) {
          if (selectedBrand.indexOf(brand) > -1) {
            isBrand = true;
          } else {
            return;
          }
        } else {
          isBrand = true;
        }

        // Check the stock level of each stock key
        // Product is in stock if any of them are above 0
        for (j = 0; j < stockLevels.length; j += 1) {
          const label = stockLevels[j][0];
          const key = stockLevels[j][1];
          const stockLevel = val[key];

          if (stockLevel > 0) {
            gendersInStock.push(label);
          }
        }

        if (isCategory && isBrand && gendersInStock) {
          const { slugsMap } = finderData;

          // Push all available options to filtered data arrays
          // These will be referenced when populating the lists
          if (finderData.filteredData.categories.indexOf(category) === -1) {
            finderData.filteredData.categories.push(category);
          }

          if (finderData.filteredData.brands.indexOf(brand) === -1) {
            finderData.filteredData.brands.push(brand);
          }

          for (j = 0; j < gendersInStock.length; j += 1) {
            if (finderData.filteredData.genders.indexOf(gendersInStock[j]) === -1) {
              finderData.filteredData.genders.push(gendersInStock[j]);
            }
          }

          // If the value is new, map the URL slug in the slugsMap object
          if (!slugsMap.categories.values[category]) {
            slugsMap.categories.values[category] = val.d;
          }

          if (!slugsMap.brands.values[brand]) {
            slugsMap.brands.values[brand] = val.b;
          }
        }

      })(i, data[i]);
    }

    this.updateView({
      categories: selectedCategory,
      brands: selectedBrand,
      genders: selectedGender,
    });
  }

  /** Handles form view */
  updateView(selectedData) {
    const { component } = this;
    const options = component.querySelectorAll(`.${ID}_opt`);
    const categoryInput = Array.prototype.filter.call(options, el => el.getAttribute('data-type') === 'Category')[0].querySelector(`.${ID}_opt__select__inner`);
    const brandInput = Array.prototype.filter.call(options, el => el.getAttribute('data-type') === 'Brand')[0].querySelector(`.${ID}_opt__select__inner`);
    const genderInput = Array.prototype.filter.call(options, el => el.getAttribute('data-type') === 'Gender')[0].querySelector(`.${ID}_opt__select__inner`);

    const { filteredData } = this.finderData;
    const categories = filteredData.categories.sort();
    const brands = filteredData.brands.sort();
    const genders = filteredData.genders.sort();

    // Categories
    categoryInput.innerHTML = categories.map((category) => {
      const isSelected = selectedData.categories && selectedData.categories.indexOf(category) > -1;
      return `<span${isSelected ? ` class="${ID}_opt--selected"` : ''}>${category}</span>`;
    }).join('');

    // Brands
    brandInput.innerHTML = brands.map((brand) => {
      const isSelected = selectedData.brands && selectedData.brands.indexOf(brand) > -1;
      return `
        <div class="${ID}_brand-wrap${isSelected ? `${ID}_opt--selected` : ''}">
          <div class="${ID}_brand">
            <span class="${ID}_brand-img" style="background-image:url('${brandImages[brand]}')"></span>
            <span class="${ID}_brand-txt">${brand}</span>
          </div>
        </div>
      `;
    }).join('');

    // Genders
    genderInput.innerHTML = genders.map((gender) => {
      const isSelected = selectedData.genders && selectedData.genders.indexOf(gender) > -1;
      return `<span ${isSelected ? ` class="${ID}_opt--selected"` : ''}>${gender}</span>`;
    }).join('');
  }

  /** Returns location string from Optimizely geolocation if available */
  static getLocation() {
    // TODO: Update because API is outdated
    /* const { optimizely } = window;
    let location = optimizely && optimizely.data && optimizely.data.visitor && optimizely.data.visitor.location;

    if (optimizely && optimizely.data && optimizely.data.visitor && optimizely.data.visitor.location) {
      { location } = optimizely.data.visitor;
    }
      
    if (!location) {
      return false;
    }

    if (location === 'GB') {
      return 'uk';
    } else if (location === 'US') {
      return 'us';
    }   */
    return 'uk';
  }

  /**
   * Returns a URL with filter slugs appended to it
   * @param {string} category
   * @param {string} brand
   * @param {string} gender
   */
  buildSearchURL(category, brand, gender) {
    const { finderData } = this;
    const slugs = finderData.slugsMap;
    let url = '';
    let query = '';
    let separator = '?';

    if (category) {
      const categoriesString = (() => {
        let slugString = '';
        for (let i = 0; i < category.length; i += 1) {
          if (i > 0) slugString += ',';
          slugString += slugs.categories.values[category[i]];
        }
        return slugString;
      })();

      // TODO: Refactor to shorten
      // const categoriesString = category.map((item, i) => {
      // });

      query += `${separator}${slugs.categories.query}=${categoriesString}`;
      separator = '&';
    }

    if (brand) {
      const brandsString = (() => {
        let slugString = '';
        for (let i = 0; i < brand.length; i += 1) {
          if (i > 0) slugString += ',';
          slugString += slugs.brands.values[brand[i]];
        }
        return slugString;
      })();
      query += `${separator}${slugs.brands.query}=${brandsString}`;
      separator = '&';
    }

    if (gender) {
      const gendersString = (() => {
        let slugString = '';
        for (let i = 0; i < gender.length; i += 1) {
          if (i > 0) slugString += ',';
          slugString += slugs.genders.values[gender[i]];
        }
        return slugString;
      })();
      query += `${separator}${slugs.genders.query}=${gendersString}`;
      separator = '&';
    }

    url = `https://www.merchoid.com/product-wizard/${query}`;
    return url;
  }
}
