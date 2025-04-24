import { cacheDom } from '../../../../lib/cache-dom';
import { fullStory, events } from '../../../../lib/utils';

/**
 * {{TP093}} - {{Postcode manipultion}}
 */
function Run() {
  const Experiment = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      TP093: 'TP093',
      VARIATION: '1',
    },
    init: () => {
      // Setup
      const { settings } = Experiment;
      const { services } = Experiment;
      const { components } = Experiment;
      services.tracking();
      cacheDom.get('body').classList.add(settings.TP093);

      // Fire main functions for the test
      components.postCodeBuilder();
      components.findAddressClick();
    },
    cache: (() => {
      const formWrap = document.querySelector('#orderDeliveryAddressForm .address-form');
      const postCodeWrap = formWrap.querySelector('.input-wrap:first-child');
      const findAddressBtn = formWrap.querySelector('.find-btn-wrap .find-btn');
      const selectAddress = formWrap.querySelector('#selectedAddress');
      let houseNumInput;

      return {
        formWrap,
        postCodeWrap,
        findAddressBtn,
        houseNumInput,
        selectAddress,
      };
    })(),
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Experiment;
        fullStory(settings.TP093, `Variation ${settings.VARIATION}`);
        events.send('TP093', 'View', 'Variation 1 has loaded', { sendOnce: true });

        Experiment.cache.formWrap.querySelector('#address-line-1').addEventListener('keyup', () => {
          events.send('TP093', 'Key Press', 'User manually changed Address Line 1', { sendOnce: true });
        });

        Experiment.cache.formWrap.querySelector('#address-line-2').addEventListener('keyup', () => {
          events.send('TP093', 'Key Press', 'User manually changed Address Line 2', { sendOnce: true });
        });

        Experiment.cache.formWrap.querySelector('#address-line-3').addEventListener('keyup', () => {
          events.send('TP093', 'Key Press', 'User manually changed Address Line 3', { sendOnce: true });
        });

        Experiment.cache.formWrap.querySelector('#contact-town').addEventListener('keyup', () => {
          events.send('TP093', 'Key Press', 'User manually changed Town', { sendOnce: true });
        });

        Experiment.cache.selectAddress.addEventListener('click', () => {
          events.send('TP093', 'Click', 'User clicked on the select address dropdown', { sendOnce: true });
        });
      },
    },
    components: {
      /**
       * @desc This creates the markup for the house number field
       */
      postCodeBuilder: () => {
        Experiment.cache.postCodeWrap.insertAdjacentHTML('beforebegin', `
          <div class="TP093_house_num-wrap input-wrap">
            <div class="label-and-input">
              <div class="label">
                <label for="TP093_house-num">
                  House Number/Name</label>
              </div>
              <div class="input">
                <input id="TP093_house-num"></div>
              </div>
          </div>
        `);

        Experiment.cache.houseNumInput = Experiment.cache.formWrap.querySelector('.TP093_house_num-wrap #TP093_house-num');
      },
      findAddressClick: () => {
        Experiment.cache.findAddressBtn.addEventListener('click', () => {
          events.send('TP093', 'Click', 'User clicked on Find Address', { sendOnce: true });

          const houseVal = Experiment.cache.houseNumInput.value;
          const addressOptions = Experiment.cache.selectAddress.querySelectorAll('option');
          let arrayMatches = [];
          // Store values needed for the loop

          if (houseVal) {
            addressOptions.forEach((el) => {
              const thisVal = el.innerText;

              if (thisVal.indexOf(houseVal) > -1) {
                arrayMatches.push(el);
                // If it matches the house number the user entered store it in an array
              }
            });

            /*
              If the users entered value matched just one option value
              then select it and trigger change
            */
            if (arrayMatches.length === 1) {
              arrayMatches[0].selected = true;
              const triggerChange = new Event('change');
              Experiment.cache.selectAddress.dispatchEvent(triggerChange);
              events.send('TP093', 'Show', 'We found a single match for the address and autofilled', { sendOnce: true });
            } else {
              arrayMatches = [];
            }
          }
        });
      },
    },
  };
  Experiment.init();
}

export default Run;
