import sizeGuideData from './data/sizeGuide';
import { fullStory, eventFire } from '../../../../lib/utils';

/**
 * FL000 - Size Guide
 */
const Experiment = {
  globals: {
    ID: 'FL000',
    variation: '1',
    pageData: null,
  },

  init() {
    // Cache
    const { globals, services, components } = Experiment;

    // Services
    services.cacheDOM();
    services.tracking();
    services.addBodyClasses(globals.ID);
    services.populateGlobals();

    // Components
    const gender = globals.pageData.productGender;
    // const category = globals.pageData.productCategory;
    components.SizeGuide.init(sizeGuideData[gender]['Casual Shirts']);
  },

  services: {
    /**
     * @description Populate global variables
     */
    populateGlobals() {
      const { globals } = Experiment;
      globals.pageData = this.getPageData();
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
      elements.sizeGuideLinks = document.querySelectorAll('a[href="https://www.flannels.com/Popup_SizeGuide"]');
      return elements;
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
            el.classList.add('FL000_MetricConverter');

            // Metric Switch
            // This uses a hidden checkbox to determine which measurement is shown
            const metricSwitch = document.createElement('div');
            metricSwitch.classList.add('FL000_switch');
            metricSwitch.innerHTML = `
              <input type="checkbox" class="FL000_switch__checkbox FL000_hidden" />
              <div class="FL000_switch__label FL000_switch__label--active" data-metric="inches">Inches</div>
              <div class="FL000_switch__slider FL000_switch__slider--left">
                <div class="FL000_switch__slider__thumb"></div>
                <div class="FL000_switch__slider__track"></div>
              </div>
              <div class="FL000_switch__label" data-metric="cm">CM</div>
            `;

            // Table
            const table = document.createElement('div');
            table.classList.add('FL000_MetricConverter__table');
            table.innerHTML = data.metricConverter;

            const scrollTip = document.createElement('div');
            scrollTip.classList.add('FL000_scrollTip');
            scrollTip.innerText = '❮•❯ Scroll horizontally to see more sizes.';

            el.appendChild(metricSwitch);
            el.appendChild(table);
            el.appendChild(scrollTip);

            return el;
          },

          /**
           * @param {HTMLElement} component Instance of component
           */
          bindEvents(component) {
            // Metric Switch Functionality
            const metricSwitch = component.querySelector('.FL000_switch');
            const checkbox = metricSwitch.querySelector('input');
            const slider = metricSwitch.querySelector('.FL000_switch__slider');
            const inchesData = component.querySelector('tr[data-metric="inches"]');
            const cmData = component.querySelector('tr[data-metric="cm"]');

            // Toggle checkbox on click of component
            metricSwitch.addEventListener('click', () => {
              checkbox.checked = !checkbox.checked;
              eventFire(checkbox, 'change');
            });

            const changeToCm = () => {
              inchesData.style.display = 'none';
              cmData.style.display = 'table-row';
              slider.classList.remove('FL000_switch__slider--left');
              slider.classList.add('FL000_switch__slider--right');
            };

            const changeToInches = () => {
              inchesData.style.display = 'table-row';
              cmData.style.display = 'none';
              slider.classList.remove('FL000_switch__slider--right');
              slider.classList.add('FL000_switch__slider--left');
            };

            // On change of checkbox, toggle sizing change
            checkbox.addEventListener('change', () => {
              if (inchesData.style.display !== 'none') {
                changeToCm();
              } else {
                changeToInches();
              }
            });

            // Country Converter Anchor
            const link = component.querySelector('#FL000_MetricConverter__convertLink');
            link.addEventListener('click', () => {
              $('.FL000_SizeGuide').animate({
                scrollTop: $('.FL000_CountryConverter').offset().top,
              }, 800);
            });
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

        CountryConverter: {
          /**
           * @param {object} data Contains size guide data for this category
           * @returns {HTMLElement} Subcomponent
           */
          create(data) {
            // Component Container
            const el = document.createElement('div');
            el.classList.add('FL000_CountryConverter');

            // Heading
            const heading = document.createElement('h3');
            heading.innerText = 'Size Converter';

            // Table
            const tableMarkup = `
            <table>
              <tbody>
                <tr>
                  <td>
                    <span class="FL000_table__flag FL000_table__flag--gb"></span>UK
                  </td>
                  <td>Extra Small</td>
                  <td>Small</td>
                  <td>Medium</td>
                  <td>Large</td>
                  <td>Extra Large</td>
                  <td>XXL</td>
                  <td>3XL</td>
                </tr>

                <tr>
                  <td>
                    <span class="FL000_table__flag FL000_table__flag--us"></span>US
                  </td>
                  <td>Extra Small</td>
                  <td>Small</td>
                  <td>Medium</td>
                  <td>Large</td>
                  <td>Extra Large</td>
                  <td>XXL</td>
                  <td>3XL</td>
                </tr>
              </tbody>
            </table>
            `;

            const table = document.createElement('div');
            table.classList.add('FL000_CountryConverter__table');
            table.innerHTML = tableMarkup;

            el.appendChild(heading);
            el.appendChild(table);

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

        HowToMeasure: {
          /**
           * @param {object} data Contains size guide data for this category
           * @returns {HTMLElement} Subcomponent
           */
          create(data) {
            const stepsData = data.howToMeasure;

            // Component Container
            const el = document.createElement('div');
            el.classList.add('FL000_HowToMeasure');

            // Heading
            const heading = document.createElement('h3');
            heading.innerText = 'How To Measure';

            // Steps
            const steps = document.createElement('div');
            steps.classList.add('FL000_HowToMeasure__steps');
            for (let i = 0; i < stepsData.length; i += 1) {
              const stepData = stepsData[i];
              const step = document.createElement('div');
              step.classList.add('FL000_HowToMeasure__step');
              step.innerHTML = `
                <h3 class="FL000_heading--type2">${stepData.title}</h3>
                <div class="FL000_HowToMeasure__step__img">
                  <img src="${stepData.img}" />
                </div>
                <p>${stepData.text}</p>
              `;
              steps.appendChild(step);
            }
            const scrollTip = document.createElement('div');
            scrollTip.classList.add('FL000_scrollTip');
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
        el.classList.add('FL000_SizeGuide');

        // Head
        const head = (() => {
          // Container
          const headEl = document.createElement('div');
          headEl.classList.add('FL000_SizeGuide__header');

          // Heading
          const heading = document.createElement('h1');
          heading.innerText = 'Size Guide';

          // Close button
          const close = document.createElement('div');
          close.classList.add('FL000_SizeGuide__close');
          close.innerText = '×';

          headEl.appendChild(heading);
          headEl.appendChild(close);

          return headEl;
        })();

        // Body
        const body = (() => {
          // Container
          const bodyEl = document.createElement('div');
          bodyEl.classList.add('FL000_SizeGuide__body');

          // Heading
          const heading = document.createElement('h2');
          heading.innerText = `${globals.pageData.productGender} ${globals.pageData.productCategory} Sizing`;

          // Subheading
          const subheading = document.createElement('h3');
          subheading.classList.add('FL000_heading--type2');
          subheading.innerText = 'Find your size';

          // Subheading link
          const subheadingLink = document.createElement('a');
          // eslint-disable-next-line no-script-url
          subheadingLink.href = 'javascript:void(0)';
          subheadingLink.innerText = 'Do you know how to measure?';
          subheadingLink.classList.add('FL000_SizeGuide__subheadingLink');

          // Metric Converter component
          const MetricConverter = this.subcomponents.MetricConverter.init(data);

          // Info block
          const info = document.createElement('div');
          info.classList.add('FL000_SizeGuide__info');
          info.innerHTML = `
            <h3>In Between Sizes?</h3>
            <p>If you are in between sizes then this isn't too much of a problem as you can decide which fit you prefer which will inform you which size would be the best fit for you.</p>
            <h3 class="FL000_heading--type2">Do you prefer a tight or loose fit?</h3>
            <p>If you prefer a tight fit on a shirt, go for the smaller size. If you prefer a loose fit on a shirt, go for the larger size.</p>
          `;

          // Country Converter component
          const CountryConverter = this.subcomponents.CountryConverter.init(data);

          // How To Measure component
          const HowToMeasure = this.subcomponents.HowToMeasure.init(data);

          bodyEl.appendChild(heading);
          bodyEl.appendChild(subheading);
          bodyEl.appendChild(subheadingLink);
          bodyEl.appendChild(MetricConverter);
          bodyEl.appendChild(info);
          bodyEl.appendChild(CountryConverter);
          bodyEl.appendChild(HowToMeasure);

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
            element.classList.add('FL000_sizeGuideLink');
            // eslint-disable-next-line no-script-url
            element.href = 'javascript:void(0)';
            element.innerHTML = '<span>Size guide</span><span class="SizeGuideIco"></span>';
            return element;
          })();

          newSizeGuideLink.addEventListener('click', (e) => {
            e.preventDefault();
            component.classList.add('FL000_SizeGuide--visible');
            document.body.classList.add('FL000_scrollLock');
          });

          el.replaceWith(newSizeGuideLink);
        });

        const close = component.querySelector('.FL000_SizeGuide__close');
        close.addEventListener('click', () => {
          component.classList.remove('FL000_SizeGuide--visible');
          document.body.classList.remove('FL000_scrollLock');
        });
      },

      /**
       * @param {HTMLElement} component Instance of component
       */
      render(component) {
        document.body.appendChild(component);
      },

      /**
       * @param {object} data Contains size guide data for this category
       * @returns {HTMLElement} Component
       */
      init(data) {
        console.log('init');
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
