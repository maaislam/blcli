import wNumb from '../priceChanges/wNumb';
import settings from '../../settings';
import state from '../state';


export default () => {
  /**
   * NoUiSlider CDN link
   */
  const NOUISLIDER_JS_CDN_URL = 'https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/11.1.0/nouislider.min.js';
  const PRICE_FILTERS_UPDATE_DELAY = 1000;

  /**
   * Append script to body
   *
   * @access private
   * @return {Promise}
   */
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.type = 'text/javascript';

      s.addEventListener('load', () => {
        resolve();
      });

      s.src = src;
      document.querySelector('head').appendChild(s);
    });
  };


  const buildPriceSlider = () => {
    /**
     * Helper create top bar and slider
     */
    const create = () => {

      // get the increments based on the URL
      const URL = window.location.href;
      let maxPrice = 1000;
      let sliderSteps = 50;
      let spaceMargin = 150;

      // get default values if they are in the URL

      if (URL.indexOf('watches') > -1) {
        sliderSteps = 50;
        spaceMargin = 150;
      } else if (URL.indexOf('engagement') > -1) {
        sliderSteps = 500;
        maxPrice = 5000;
        spaceMargin = 1000;
      }

      let startMin = 0;
      let startMax = 9999;

      const urlPrice = URL.match(/CBTWN\+(\d+)\+(\d+)/i);
      if (urlPrice && urlPrice[1] && urlPrice[2]) {
        startMin = urlPrice[1];
        startMax = urlPrice[2];
      }


      const priceBlock = document.querySelector('#filter-modal #refinement-price .filters-panel__refinement-section-container');
      if (priceBlock) {
        // -------------------------------------------------
        // Create top bar
        // -------------------------------------------------
        const newPriceSlider = document.createElement('div');
        newPriceSlider.classList.add(`${settings.ID}-slider`);
        newPriceSlider.innerHTML = (`
          <div class="${settings.ID}-topbar">
            <div class="${settings.ID}-nouislider-wrap">
              <div class="${settings.ID}-slider-label">
                Choose your price range:
              </div>
              <div id="${settings.ID}-priceslider" class="${settings.ID}-priceslider"></div>
            </div>
          </div>
        `);

        priceBlock.appendChild(newPriceSlider);

        // Add the apply button
        const applyButton = document.createElement('div');
        applyButton.classList.add(`${settings.ID}-applyPrice`);
        applyButton.innerHTML = '<span>Apply</span>';

        newPriceSlider.insertAdjacentElement('afterend', applyButton);

        // -------------------------------------------------
        // Create noUiSlider
        // -------------------------------------------------
        const priceSlider = document.querySelector(`#${settings.ID}-priceslider`);

        const slider = noUiSlider.create(priceSlider, {
          start: [startMin, startMax],
          connect: true,
          tooltips: true,
          step: sliderSteps,
          behaviour: 'drag',
          margin: spaceMargin,
          range: {
            'min': 0,
            'max': maxPrice,
          },
          format: {
            to: function (value) {
              if (value === 5000 && maxPrice === 5000) {
                return '£' + value + '+';
              } else if(value === 1000 && maxPrice === 1000) { 
                return '£' + value + '+';
              } else {
                return '£' + value;
              }

              /*if(value === 1000 || value === 5000) { 
                return '£' + value + '+';
              } else {
                return '£' + value;
              }*/
              
            },
            from: function (value) {
              return value;
            }
          },
        });

        state.slider = slider;
        // -------------------------------------------------
        // Update Filters
        // -------------------------------------------------
        const lowPrice = document.querySelector('.price-filter #lowLimit');
        const toPrice = document.querySelector('.price-filter #highLimit');

        slider.on('slide', (values) => {
          if (values && values[0] && values[1]) {
            const lowValue = parseInt(values[0].replace(/[£,]/g, ''), 10);
            const highValue = parseInt(values[1].replace(/[£,]/g, ''), 10);
            lowPrice.value = lowValue;

            if (highValue === 1000 || highValue === 5000) {
              toPrice.value = 9999;
            } else {
              toPrice.value = highValue;
            }
          }
        });
      }
    };

    if (window.noUiSlider) {
      create();
    } else {
      loadScript(NOUISLIDER_JS_CDN_URL).then(create);
    }
  };

  buildPriceSlider();
};
