import sliderInit from './nouislider';

export default () => {
  /**
   * NoUiSlider CDN link
   */
  const NOUISLIDER_JS_CDN_URL = 'https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/14.0.3/nouislider.min.js';
  const PRICE_FILTERS_UPDATE_DELAY = 1000;

  /**
   * Append script to body
   *
   * @access private
   * @return {Promise}
   */
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      if (window.noUiSlider) {
        resolve();
      } else {
        sliderInit();
      }
    });
  };

  /**
   * Initialise slider
   */
  const init = (element, startMin, startMax, minInput, maxInput) => {
    // -------------------------------------------------
    // Create noUiSlider
    // -------------------------------------------------

    const slider = window.noUiSlider.create(element, {
      start: [parseInt(startMin, 10), parseInt(startMax, 10)],
      //connect: true,
      tooltips: true,
      step: 20,
      behaviour: 'drag',
      margin: 20,
      range: {
        'min': [parseInt(startMin, 10)],
        'max': [parseInt(startMax, 10)],
      },
      format: {
        to: function (value) {
          if (value == startMax) {
            return '£' + value + '+';
          } else {
            return '£' + value;
          }
          
        },
        from: function (value) {
          return value;
        }
      },
    });

    // -------------------------------------------------
    // Update Filters
    // -------------------------------------------------
    const lowPrice = document.querySelector('.price-filter #lowLimit');
    const toPrice = document.querySelector('.price-filter #highLimit');

    slider.on('slide', (values) => {
      if (values && values[0] && values[1]) {
        const lowValue = parseInt(values[0].replace(/[£,]/g, ''), 10);
        const highValue = parseInt(values[1].replace(/[£,]/g, ''), 10);

        minInput.value = lowValue || 0;

        if (highValue === startMax) {
          maxInput.value = 9999;
        } else {
          maxInput.value = highValue;
        }
      }
    });
  };

  return {
    loadScript,
    init
  };

};
