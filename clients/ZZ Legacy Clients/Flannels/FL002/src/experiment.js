/* eslint-disable max-len */
import sizeGuideData from './data/sizeGuide';
import { fullStory, eventFire, events } from '../../../../lib/utils';

/**
 * FL002 - Size Guide
 */
const Experiment = {
  globals: {
    ID: 'FL002',
    variation: '1',
    pageData: null,
    productCategory: null,
  },

  init() {
    // Setup
    const { globals, services, components } = Experiment;
    events.analyticsReference = '_gaUAT';
    events.send('FL002', 'View', 'FL002 Variation 1 ran', { sendOnce: true });

    // Services
    services.cacheDOM();
    services.tracking();
    services.populateGlobals();

    const { pageData } = globals;
    const { productGender } = pageData;
    const { productCategory } = globals;

    if (!productCategory) {
      // Category could not be determined, send GA event to show size guide has not been changed
      events.send('FL002', 'View', 'Experiment did not run - Could not determine category');
      return false;
    }

    // Components
    // const category = globals.pageData.productCategory;
    globals.categoryData = sizeGuideData[productGender][productCategory];
    if (globals.categoryData) {
      // Add class to body for this category
      const categoryClass = productCategory.replace(/[/\s]/, '');
      services.addBodyClasses([globals.ID, `FL002--${categoryClass}`]);

      components.SizeGuide.init(globals.categoryData);

      // Send events to say experiment triggered and which category is viewed
      events.send('FL002', 'View', 'Experiment ran', { sendOnce: true });
      events.send('FL002', 'Category', productCategory, { sendOnce: true });
    } else {
      events.send('FL002', 'View', 'Experiment did not run - no size guide info for product', { sendOnce: true });
    }

    return true;
  },

  services: {
    /**
     * @description Populate global variables
     */
    populateGlobals() {
      const { globals } = Experiment;
      globals.pageData = this.getPageData();
      globals.productCategory = this.getCategory();
    },

    /**
     * @description Performs a number of checks to determine which category
     * the product falls under. The category in the data layer is too generic
     * @returns {String} Product category (matching size guide categories)
     */
    getCategory() {
      const { globals } = Experiment;
      const { pageData } = globals;
      const { productName } = pageData;
      let category;
      const dataLayerCategory = pageData.productCategory;
      if (pageData.productGender === 'Men') {
        if (dataLayerCategory === 'Clothing') {
          switch (true) {
            case !!productName.match(/polo shirt/gi):
              category = 'Casual Shirts';
              break;

            case !!productName.match(/t shirt/gi):
              category = 'Casual Shirts';
              break;

            case !!productName.match(/t-shirt/gi):
              category = 'Casual Shirts';
              break;

            case !!productName.match(/jumpsuit/gi):
              category = 'Clothing';
              break;

            case !!productName.match(/dress/gi):
              category = 'Clothing';
              break;

            case !!productName.match(/jean/gi):
              category = 'Jeans';
              break;

            case !!productName.match(/trouser/gi):
              category = 'Trousers';
              break;

            case !!productName.match(/chino/gi):
              category = 'Trousers';
              break;

            case !!productName.match(/jogger/gi):
              category = 'Trousers';
              break;

            case !!productName.match(/pants/gi):
              category = 'Trousers';
              break;

            case !!productName.match(/boxer/gi):
              category = 'Swim/Underwear';
              break;

            case !!productName.match(/shorts/gi):
              category = 'Trousers';
              break;

            case !!productName.match(/bottoms/gi):
              category = 'Trousers';
              break;

            case !!productName.match(/coat/gi):
              category = 'Outerwear';
              break;

            case !!productName.match(/jacket/gi):
              category = 'Outerwear';
              break;

            case !!productName.match(/gilet/gi):
              category = 'Outerwear';
              break;

            case !!productName.match(/brief/gi):
              category = 'Swim/Underwear';
              break;

            case !!productName.match(/trunk/gi):
              category = 'Swim/Underwear';
              break;

            case !!productName.match(/sweatshirt/gi):
              category = 'Tops/Knitwear';
              break;

            case !!productName.match(/shirt/gi):
              category = 'Formal Shirts';
              break;

            case !!productName.match(/jumper/gi):
              category = 'Tops/Knitwear';
              break;

            case !!productName.match(/cardigan/gi):
              category = 'Tops/Knitwear';
              break;

            case !!productName.match(/kimono/gi):
              category = 'Tops/Knitwear';
              break;

            case !!productName.match(/suit/gi):
              category = 'Tailoring';
              break;

            case !!productName.match(/blazer/gi):
              category = 'Tailoring';
              break;

            case !!productName.match(/sock/gi):
              category = 'Socks';
              break;

            case !!productName.match(/cap/gi):
              category = 'Hats';
              break;

            case !!productName.match(/hat/gi):
              category = 'Hats';
              break;

            default:
              break;
          }
        } else if (dataLayerCategory === 'Accessories') {
          switch (true) {
            case !!productName.match(/cap/gi):
              category = 'Hats';
              break;

            case !!productName.match(/hat/gi):
              category = 'Hats';
              break;

            case !!productName.match(/belt/gi):
              category = 'Belts';
              break;

            case !!productName.match(/glove/gi):
              category = 'Gloves';
              break;

            case !!productName.match(/sock/gi):
              category = 'Socks';
              break;

            default:
              break;
          }
        } else if (dataLayerCategory === 'Footwear') {
          category = 'Footwear';
        }
      } else if (pageData.productGender === 'Women') {
        if (dataLayerCategory === 'Clothing') {
          switch (true) {
            case !!productName.match(/jean/gi):
              category = 'Jeans';
              break;

            default:
              category = 'Clothing';
          }
        } else if (dataLayerCategory === 'Footwear') {
          category = 'Footwear';
        }
      } else if (pageData.productGender === 'Unisex') {
        if (dataLayerCategory === 'Clothing') {
          switch (true) {
            case !!productName.match(/cap/gi):
              category = 'Hats';
              break;

            case !!productName.match(/hat/gi):
              category = 'Hats';
              break;

            default:
              break;
          }
        } else if (dataLayerCategory === 'Accessories') {
          switch (true) {
            case !!productName.match(/cap/gi):
              category = 'Hats';
              break;

            case !!productName.match(/hat/gi):
              category = 'Hats';
              break;

            default:
              break;
          }
        }
      }

      return category;
    },

    /**
     * @description Gets the FLAN_onLoad data object that is pushed to
     * the datalayer on page load. Contains product category and other
     * useful information for this product
     * @returns {object} Returns data object pushed to data layer
     */
    getPageData() {
      let dataObject;
      for (let i = 0; i < window.dataLayer.length; i += 1) {
        const data = window.dataLayer[i];
        if (typeof data === 'object' && data.event && data.event === 'FLAN_onLoad') {
          dataObject = data;
          break;
        }
      }
      return dataObject;
    },

    /**
     * @description Add classes to the body to namespace CSS
     * @param {string|array} classes Single class or array of classes to add
     * to the body
     */
    addBodyClasses(classes) {
      if (typeof classes === 'string') {
        document.body.classList.add(classes);
      }
      for (let i = 0; i < classes.length; i += 1) {
        document.body.classList.add(classes[i]);
      }
    },

    /**
     * @description Init all page tracking
     */
    tracking() {
      const { ID, variation } = Experiment.globals;
      fullStory(ID, `Variation ${variation}`);
    },

    /**
     * @description Cache all used elements in Experiment.cache.elements
     * @returns {object} All cached elements
     */
    cacheDOM() {
      const { elements } = Experiment.cache;
      elements.sizeGuideLinks = document.querySelectorAll('a[href="https://www.flannels.com/Popup_SizeGuide"], .FL001_sizeGuideBtn > a');
      elements.description = document.querySelector('[itemprop="description"]');
      return elements;
    },

    /**
     * @description Scrapes the size type from the product description (e.g. European sizing, American sizing etc.)
     * @returns {String}
     */
    getSizingType() {
      const { elements } = Experiment.cache;
      const listItems = elements.description.querySelectorAll('li');
      let sizingType;
      [].forEach.call(listItems, (listItem) => {
        if (listItem.innerText.match('Size selection:')) {
          const modifiedString = listItem.innerText.replace('Size selection:', '').trim();
          sizingType = modifiedString;
        }
      });
      return sizingType;
    },
  },

  components: {
    SizeGuide: {
      subcomponents: {
        MetricConverter: {
          /**
           * @param {object} data Contains size guide data for this category
           * @returns {HTMLElement} Subcomponent
           */
          create(data) {
            // Component Container
            const el = document.createElement('div');
            el.classList.add('FL002_MetricConverter');

            // Metric Switch
            // This uses a hidden checkbox to determine which measurement is shown
            const switchData = data.metricSwitch;
            const metricSwitch = document.createElement('div');
            if (switchData) {
              metricSwitch.classList.add('FL002_switch');
              metricSwitch.innerHTML = `
                <input type="checkbox" class="FL002_switch__checkbox FL002_hidden" />
                <div class="FL002_switch__label FL002_switch__label--active" data-metric="metricOne">${switchData.metricOneLabel}</div>
                <div class="FL002_switch__slider FL002_switch__slider--left">
                  <div class="FL002_switch__slider__thumb"></div>
                  <div class="FL002_switch__slider__track"></div>
                </div>
                <div class="FL002_switch__label" data-metric="metricTwo">${switchData.metricTwoLabel}</div>
              `;
            }

            // Table
            const table = document.createElement('div');
            table.classList.add('FL002_MetricConverter__table');
            table.innerHTML = `${data.metricConverter.labels}${data.metricConverter.html}`;

            // const scrollTip = document.createElement('div');
            // scrollTip.classList.add('FL002_scrollTip');
            // scrollTip.innerText = '❮•❯ Scroll horizontally to see more sizes.';

            if (switchData) {
              el.appendChild(metricSwitch);
            }
            el.appendChild(table);
            // el.appendChild(scrollTip);

            return el;
          },

          /**
           * @param {HTMLElement} component Instance of component
           */
          bindEvents(component) {
            // Metric Switch Functionality
            const metricSwitch = component.querySelector('.FL002_switch');
            if (metricSwitch) {
              const checkbox = metricSwitch.querySelector('input');
              const slider = metricSwitch.querySelector('.FL002_switch__slider');
              const metricOneData = component.querySelectorAll('tr[data-metric="metricOne"]');
              const metricTwoData = component.querySelectorAll('tr[data-metric="metricTwo"]');

              // Toggle checkbox on click of component
              metricSwitch.addEventListener('click', () => {
                checkbox.checked = !checkbox.checked;
                eventFire(checkbox, 'change');
              });

              const changeToMetricTwo = () => {
                [].forEach.call(metricOneData, (element) => {
                  const el = element;
                  el.style.display = 'none';
                });

                [].forEach.call(metricTwoData, (element) => {
                  const el = element;
                  el.style.display = 'table-row';
                });

                slider.classList.remove('FL002_switch__slider--left');
                slider.classList.add('FL002_switch__slider--right');
              };

              const changeToMetricOne = () => {
                [].forEach.call(metricOneData, (element) => {
                  const el = element;
                  el.style.display = 'table-row';
                });

                [].forEach.call(metricTwoData, (element) => {
                  const el = element;
                  el.style.display = 'none';
                });

                slider.classList.remove('FL002_switch__slider--right');
                slider.classList.add('FL002_switch__slider--left');
              };

              // On change of checkbox, toggle sizing change
              checkbox.addEventListener('change', () => {
                if (metricOneData[0].style.display !== 'none') {
                  changeToMetricTwo();
                } else {
                  changeToMetricOne();
                }
              });
            }

            // Country Converter Anchor
            const link = component.querySelector('#FL002_MetricConverter__convertLink');
            if (link) {
              link.addEventListener('click', () => {
                $('.FL002_SizeGuide').animate({
                  scrollTop: $('.FL002_CountryConverter').offset().top,
                }, 800);
              });
            }
          },

          /**
           * @param {object} data Contains size guide data for this category
           * @returns {HTMLElement} Subcomponent
           */
          init(data) {
            if (!data.metricConverter) return false;
            const component = this.create(data);
            this.bindEvents(component);
            return component;
          },
        },

        CountryConverter: {
          /**
           * @param {object} data Contains size guide data for this category
           * @returns {HTMLElement} Subcomponent
           */
          create(data) {
            const { countries } = data.countryConverter;

            // Component Container
            const el = document.createElement('div');
            el.classList.add('FL002_CountryConverter');

            // Heading
            const heading = document.createElement('h3');
            heading.innerText = 'Size Converter';

            // Table
            const table = document.createElement('div');
            table.classList.add('FL002_CountryConverter__table');

            // Labels
            const labels = document.createElement('table');
            labels.classList.add('FL002_CountryConverter__labels');
            const labelsBody = document.createElement('tbody');
            labels.appendChild(labelsBody);

            // Values
            const values = document.createElement('table');
            values.classList.add('FL002_CountryConverter__values');
            const valuesBody = document.createElement('tbody');
            values.appendChild(valuesBody);

            // Add dynamic content
            const LIMIT = 2;
            let i = 0;
            // eslint-disable-next-line consistent-return
            [].forEach.call(countries, (country) => {
              if (i === LIMIT) {
                return false;
              }
              i += 1;
              // Labels
              const labelRow = document.createElement('tr');
              const labelHead = document.createElement('th');
              labelHead.setAttribute('data-value', country.name);
              labelHead.innerHTML = `
              <div class="FL002_CountryConverter__label">
                <span class="FL002_table__flag ${country.flagClass}"></span>${country.name}
              </div>
              `;

              /*
               * Country dropdown
               * Note: Room for improvement here, the 2 loops are inefficient but were necessary
               * due to deadlines
               */
              const select = document.createElement('div');
              select.classList.add('FL002_CountryConverter__select');
              const optionsWrap = document.createElement('div');
              optionsWrap.classList.add('FL002_CountryConverter__optionsWrap');
              [].forEach.call(countries, (selectCountry) => {
                const option = document.createElement('div');
                option.classList.add('FL002_CountryConverter__select__option');
                option.setAttribute('data-newValue', selectCountry.name);
                if (country.name === selectCountry.name) {
                  option.classList.add('FL002_CountryConverter__select__option--active');
                }
                option.innerHTML = `
                <span class="FL002_table__flag ${selectCountry.flagClass}"></span>${selectCountry.name}
                `;
                optionsWrap.appendChild(option);
              });
              select.appendChild(optionsWrap);
              labelHead.appendChild(select);


              labelRow.appendChild(labelHead);
              labelsBody.appendChild(labelRow);

              // Values
              const valueRow = document.createElement('tr');
              valueRow.setAttribute('data-value', country.name);
              [].forEach.call(country.sizes, (size) => {
                const valueData = document.createElement('td');
                valueData.innerHTML = size;
                valueRow.appendChild(valueData);
              });
              valuesBody.appendChild(valueRow);
            });

            table.appendChild(labels);
            table.appendChild(values);
            el.appendChild(heading);
            el.appendChild(table);

            return el;
          },

          /**
           * @param {HTMLElement} component Instance of component
           * @param {object} data Contains size guide data for this category
           */
          bindEvents(component, data) {
            // Headings - Open close select menu
            const headings = component.querySelectorAll('th');
            [].forEach.call(headings, (heading) => {
              heading.addEventListener('click', () => {
                const allSelects = component.querySelectorAll('.FL002_CountryConverter__select');
                const thisSelect = heading.querySelector('.FL002_CountryConverter__select');
                if (thisSelect.style.display === '' || thisSelect.style.display === 'none') {
                  // Hide all other selects if open
                  [].forEach.call(allSelects, (select) => {
                    if (select.style.display === 'block') {
                      // eslint-disable-next-line no-param-reassign
                      select.style.display = 'none';
                    }
                  });
                  thisSelect.style.display = 'block';
                } else {
                  thisSelect.style.display = 'none';
                }
              });
            });

            /**
             * @description Changes the sizing in a row to a different country
             * @param {Number} index Index of the table row to change
             * @param {String} country Country to change to
             */
            const updateRow = (index, country) => {
              events.send('FL002', 'Change', 'User interacted with size converter', { sendOnce: true });
              const rowLabel = component.querySelectorAll('.FL002_CountryConverter__labels > tbody tr')[index];
              const rowValue = component.querySelectorAll('.FL002_CountryConverter__values > tbody > tr')[index];
              const countryData = (() => {
                let matchingCountryData;
                [].forEach.call(data.countryConverter.countries, (newCountryData) => {
                  if (newCountryData.name === country) {
                    matchingCountryData = newCountryData;
                  }
                });
                return matchingCountryData;
              })();

              // Update content
              rowLabel.querySelector('.FL002_CountryConverter__label').innerHTML = `
                <span class="FL002_table__flag ${countryData.flagClass}"></span>${countryData.name}
              `;
              rowValue.innerHTML = (() => {
                let html = '';
                [].forEach.call(countryData.sizes, (size) => {
                  html += `<td>${size}</td>`;
                });
                return html;
              })();

              // Update values
              rowLabel.setAttribute('data-value', country);
              rowLabel.querySelector('th').setAttribute('data-value', country);
              rowValue.setAttribute('data-value', country);

              // Update active option in menu
              rowLabel.querySelector('.FL002_CountryConverter__select__option--active').classList.remove('FL002_CountryConverter__select__option--active');
              rowLabel.querySelector(`.FL002_CountryConverter__select__option[data-newvalue="${country}"]`).classList.add('FL002_CountryConverter__select__option--active');
            };

            // Select menu
            const options = component.querySelectorAll('.FL002_CountryConverter__select__option');
            [].forEach.call(options, (option) => {
              option.addEventListener('click', () => {
                const newCountry = option.getAttribute('data-newvalue');
                const index = option.parentElement.parentElement.parentElement.parentElement.rowIndex;
                if (typeof index === 'number' && typeof newCountry === 'string') {
                  updateRow(index, newCountry);
                }
              });
            });
          },

          /**
           * @param {object} data Contains size guide data for this category
           * @returns {HTMLElement} Subcomponent
           */
          init(data) {
            if (!data.countryConverter) return false;
            const component = this.create(data);
            this.bindEvents(component, data);
            return component;
          },
        },

        HowToMeasure: {
          /**
           * @param {object} data Contains size guide data for this category
           * @returns {HTMLElement} Subcomponent
           */
          create(data) {
            const stepsData = data.howToMeasure;

            // Component Container
            const el = document.createElement('div');
            el.classList.add('FL002_HowToMeasure');

            // Heading
            const heading = document.createElement('h3');
            heading.innerText = 'How To Measure';

            // Steps
            const steps = document.createElement('div');
            steps.classList.add('FL002_HowToMeasure__steps');
            for (let i = 0; i < stepsData.length; i += 1) {
              const stepData = stepsData[i];
              const step = document.createElement('div');
              step.classList.add('FL002_HowToMeasure__step');
              step.innerHTML = `
                <h3 class="FL002_heading--type2">${stepData.title}</h3>
                <div class="FL002_HowToMeasure__step__img">
                  <img src="${stepData.img}" />
                </div>
                <p>${stepData.text}</p>
              `;
              steps.appendChild(step);
            }
            const scrollTip = document.createElement('div');
            scrollTip.classList.add('FL002_scrollTip');
            scrollTip.innerText = '❮•❯ Scroll horizontally to see more.';

            el.appendChild(heading);
            el.appendChild(steps);
            el.appendChild(scrollTip);

            return el;
          },

          /**
           * @param {HTMLElement} component Instance of component
           */
          bindEvents(component) {
          },

          /**
           * @param {object} data Contains size guide data for this category
           * @returns {HTMLElement} Subcomponent
           */
          init(data) {
            const component = this.create(data);
            this.bindEvents(component);
            return component;
          },
        },
      },

      /**
       * @param {object} data Contains size guide data for this category
       * @returns {HTMLElement} Component
       */
      create(data) {
        const { globals } = Experiment;
        // const { category } = globals;

        // Component Container
        const el = document.createElement('div');
        el.classList.add('FL002_SizeGuide');

        // Head
        const head = (() => {
          // Container
          const headEl = document.createElement('div');
          headEl.classList.add('FL002_SizeGuide__header');

          // Heading
          const heading = document.createElement('h1');
          heading.innerText = 'Size Guide';

          // Close button
          const close = document.createElement('div');
          close.classList.add('FL002_SizeGuide__close');
          close.innerText = '×';

          headEl.appendChild(heading);
          headEl.appendChild(close);

          return headEl;
        })();

        // Body
        const body = (() => {
          // Container
          const bodyEl = document.createElement('div');
          bodyEl.classList.add('FL002_SizeGuide__body');

          // Heading
          const heading = document.createElement('h2');
          heading.innerText = `${globals.pageData.productGender} ${globals.productCategory} Sizing`;

          // Subheading
          const subheading = document.createElement('h3');
          subheading.classList.add('FL002_heading--type2');
          subheading.innerText = 'Find your size';

          // Metric Converter component
          const MetricConverter = this.subcomponents.MetricConverter.init(data);

          // Info block
          // const info = document.createElement('div');
          // info.classList.add('FL002_SizeGuide__info');
          // info.innerHTML = `
          //   <h3>In Between Sizes?</h3>
          //   <p>If you are in between sizes then this isn't too much of a problem as you can decide which fit you prefer which will inform you which size would be the best fit for you.</p>
          //   <h3 class="FL002_heading--type2">Do you prefer a tight or loose fit?</h3>
          //   <p>If you prefer a tight fit on a shirt, go for the smaller size. If you prefer a loose fit on a shirt, go for the larger size.</p>
          // `;

          // Country Converter component
          const CountryConverter = this.subcomponents.CountryConverter.init(data);

          // How To Measure component
          // const HowToMeasure = this.subcomponents.HowToMeasure.init(data);

          bodyEl.appendChild(heading);
          bodyEl.appendChild(subheading);
          if (MetricConverter) bodyEl.appendChild(MetricConverter);
          // bodyEl.appendChild(info);
          if (CountryConverter) bodyEl.appendChild(CountryConverter);
          // bodyEl.appendChild(HowToMeasure);

          // Add scroll tip
          const scrollTip = document.createElement('div');
          scrollTip.classList.add('FL002_scrollTip');
          scrollTip.innerText = '❮•❯ Scroll horizontally to see more sizes.';
          if (MetricConverter) {
            const table = MetricConverter.querySelector('.FL002_MetricConverter__table');
            table.parentElement.insertBefore(scrollTip, table);
            scrollTip.style.marginBottom = '10px';
            scrollTip.style.marginTop = '0';
          } else if (CountryConverter) {
            const table = CountryConverter.querySelector('.FL002_CountryConverter__table');
            table.parentElement.insertBefore(scrollTip, table);
            scrollTip.style.marginBottom = '10px';
            scrollTip.style.marginTop = '0';
          }

          return bodyEl;
        })();

        el.appendChild(head);
        el.appendChild(body);

        return el;
      },

      /**
       * @param {HTMLElement} component Instance of component
       */
      bindEvents(component) {
        const { sizeGuideLinks } = Experiment.cache.elements;
        sizeGuideLinks.forEach((el) => {
          const newSizeGuideLink = (() => {
            const element = document.createElement('a');
            element.classList.add('FL002_sizeGuideLink');
            // eslint-disable-next-line no-script-url
            element.href = 'javascript:void(0)';
            element.innerHTML = '<span>Size guide</span><span class="SizeGuideIco"></span>';
            return element;
          })();

          newSizeGuideLink.addEventListener('click', (e) => {
            e.preventDefault();
            component.classList.add('FL002_SizeGuide--visible');
            document.body.classList.add('FL002_scrollLock');
            document.documentElement.classList.add('FL002_scrollLock');
            events.send('FL002', 'View', 'Size guide opened');
            // eslint-disable-next-line
            window._gaUAT('send', {
              hitType: 'pageview',
              page: 'https://www.flannels.com/Popup_SizeGuide',
              title: 'Flannels > Popup_SizeGuide',
            });
            // document.querySelector('.FL002_SizeGuideBackground').style.display = 'block';
          });

          const parent = el.parentElement;
          parent.removeChild(el);
          parent.appendChild(newSizeGuideLink);
        });

        const close = component.querySelector('.FL002_SizeGuide__close');
        close.addEventListener('click', () => {
          component.classList.remove('FL002_SizeGuide--visible');
          document.body.classList.remove('FL002_scrollLock');
          document.documentElement.classList.remove('FL002_scrollLock');
          // document.querySelector('.FL002_SizeGuideBackground').style.display = 'none';
        });
      },

      /**
       * @param {HTMLElement} component Instance of component
       */
      render(component) {
        document.body.appendChild(component);

        // Add background overlay
        /* (() => {
          const background = document.createElement('div');
          background.classList.add('FL002_SizeGuideBackground');
          document.body.appendChild(background);
        })(); */
      },

      /**
       * @param {object} data Contains size guide data for this category
       * @returns {HTMLElement} Component
       */
      init(data) {
        const component = this.create(data);
        this.bindEvents(component);
        this.render(component);
        return component;
      },
    },
  },

  cache: {
    elements: {},
  },
};

export default Experiment;
