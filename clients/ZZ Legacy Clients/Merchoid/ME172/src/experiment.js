import { fullStory, events } from '../../../../lib/utils';

/**
 * {{ME172}} - {{Test Description}}
 */
const Run = () => {
  const doc = document;
  const bodyVar = doc.body;
  let sizeInfo;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'ME172',
      VARIATION: '1',
    },
    cache: (() => {
      const sizeSelect = doc.getElementById('pa_size');

      return {
        sizeSelect,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      bodyVar.classList.add(settings.ID);
      if (doc.getElementById('pa_size').querySelector('option[value="l"]').textContent.indexOf('39-40"') > -1) {
        components.parseSizes();
        components.render();
        components.changeEvent();

        services.tracking();
      } else {
        events.send(`${Exp.settings.ID}`, 'Sizing Mismatch', 'The current page has different chest sizing to targeting - ' + window.location.pathname, { sendOnce: true });
      }
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      parseSizes() {
        const options = Exp.cache.sizeSelect.querySelectorAll('option');
        const optionsLength = options.length;

        for (let i = 0; optionsLength > i; i += 1) {
          const current = options[i];
          const val = current.value.toUpperCase();
          
          if (i > 0) {
            current.setAttribute('data-female-sizing', sizeInfo[val][0]);
            current.setAttribute('data-male-sizing', sizeInfo[val][1]);
            current.textContent = `${val} (Fits ${sizeInfo[val][1]})`;
          }
        }
      },
      render() {
        const selectWrap = bodyVar.querySelector('.radical-variations-wrapper');

        selectWrap.insertAdjacentHTML('afterbegin', `
        <select class="ME172_select-gender">
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>`);
      },
      changeEvent() {
        const genderSelect = bodyVar.querySelector('.ME172_select-gender');

        genderSelect.addEventListener('change', () => {
          const active = genderSelect.options[genderSelect.selectedIndex].value;
          Exp.components.changeOptions(active);
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Clicks on the gender drop down and the size guide', { sendOnce: true });
        });
      },
      changeOptions(gender) {
        const options = Exp.cache.sizeSelect.querySelectorAll('option');
        const optionsLength = options.length;

        for (let i = 0; optionsLength > i; i += 1) {
          const current = options[i];
          const val = current.value.toUpperCase();
          let data = '';
          if (val !== '') {
            if (gender === 'M') {
              data = current.getAttribute('data-male-sizing');
            } else {
              data = current.getAttribute('data-female-sizing');
            }

            current.textContent = `${val} (Fits ${data})`;
          }
        }
      },
    },
  };

  if (wc_aelia_currency_switcher_params.selected_currency === 'GBP') {
    sizeInfo = {
      XS: ['UK size 8', '32-34" chest'],
      S: ['UK size 10', '34-36" chest'],
      M: ['UK size 12', '37-38" chest'],
      L: ['UK size 14', '39-40" chest'],
      XL: ['UK size 16', '41-42" chest'],
      XXL: ['UK size 18', '43-45" chest'],
      XXXL: ['UK size 20', '46-47" chest'],
    };
    Exp.init();
  } else if (wc_aelia_currency_switcher_params.selected_currency === 'USD') {
    sizeInfo = {
      XS: ['US size 4', '32-34" chest'],
      S: ['US size 6', '34-36" chest'],
      M: ['US size 8', '37-38" chest'],
      L: ['US size 10', '39-40" chest'],
      XL: ['US size 12', '41-42" chest'],
      XXL: ['US size 16', '43-45" chest'],
      XXXL: ['US size 18', '46-47" chest'],
    };
    Exp.init();
  }  
};

export default Run;
