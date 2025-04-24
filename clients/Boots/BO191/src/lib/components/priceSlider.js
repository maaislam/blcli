import { fireEvent } from '../../../../../../core-files/services';
import shared from '../../../../../../core-files/shared';
import sliderInit from './nouislider';


export default () => {

  const { ID, VARIATION } = shared;
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


  let maxPrice = 100;
  let sliderSteps = 10;
  let spaceMargin = 10;

  let startMin = 0;
  let startMax = 100;

  const priceReg = /(.*(www.boots.com.*(minPrice:)([\d]+)(.*maxPrice:)([\d]+).*))/;
  const url = window.location.href;
  if(url.match(priceReg)) {
    if(url.match(priceReg)[4]) {
      startMin = url.match(priceReg)[4];
    }
    if(url.match(priceReg)[6]) {
      startMax = url.match(priceReg)[6];
    }
  }


  const init = () => {
    // -------------------------------------------------
    // Create noUiSlider
    // -------------------------------------------------

    const newPriceSlider = document.createElement('div');
        newPriceSlider.classList.add(`${ID}-priceslider-wrapper`);
        newPriceSlider.innerHTML = (`
            <div class="${ID}-nouislider-wrap">
              <div id="${ID}-priceslider"></div>
            </div>
            <div class="${ID}-filterButton">Filter</div>
        `);

        document.querySelector(`.${ID}-filters`).appendChild(newPriceSlider);



    // -------------------------------------------------
    // Render
    // -------------------------------------------------
    const priceSlider = document.querySelector(`#${ID}-priceslider`);


    const slider = window.noUiSlider.create(priceSlider, {
        start: [startMin, startMax],
          connect: true,
          tooltips: true,
          step: sliderSteps,
          behaviour: 'drag',
          margin: spaceMargin,
          range: {
            'min': 0,
            'max': 100,
          },
          format: {
            to: function (value) {
              if (value === 100 && maxPrice === 100) {
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

      const applyPrice = () => {
        const lowPrice = document.querySelector('.noUi-handle.noUi-handle-lower .noUi-tooltip');
        const lowValue = parseInt(lowPrice.textContent.replace(/[£,]/g, ''), 10);

        const highPrice = document.querySelector('.noUi-handle.noUi-handle-upper .noUi-tooltip');
        const highValue = parseInt(highPrice.textContent.replace(/[£,]/g, ''), 10);

        const lowInput = document.querySelector('.price_range_container.low_price_input_container #low_price_input');
        const highInput = document.querySelector('.price_range_container.high_price_input_container #high_price_input');
        
        lowInput.value = lowValue;
        highInput.value = highValue;
        
      }

      document.querySelector(`.${ID}-filterButton`).addEventListener('click', () => {
        applyPrice();
        //document.querySelector('#price_range_input #price_range_go').click();
        dojo.topic.publish('Facet_Add');
        fireEvent('Clicked apply on price slider');
      });
  };

  return {
    loadScript,
    init
  };

};
