import { fullStory, events } from '../../../../lib/utils';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ034',
    VARIATION: '{{VARIATION}}',
  },
  sizes: {
    newSizesPizzas: {
      XXL: 'XXL, 12 slices',
      Large: 'Large, 10 slices',
      Medium: 'Medium, 8 slices',
      Small: 'Small, 6 slices',
    },
    newSizesV2: {
      XXL: 'XXL, 15.5"',
      Large: 'Large, 13.5"',
      Medium: 'Medium, 11.5"',
      Small: 'Small, 9.5"',
    },
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);


    /* eslint-disable */
    window.prm.add_pageLoaded(function (sender, error) {
      try {
        components.changeSizes();
      } catch (e) {}
    });
    /* eslint-enable */
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    changeSizes: () => {
      const { settings, sizes } = Experiment;
      let newSizes;
      if (settings.VARIATION === '1') {
        newSizes = sizes.newSizesPizzas;
      } else if (settings.VARIATION === '2') {
        newSizes = sizes.newSizesV2;
      }

      let dropdowns;
      if (window.location.href.indexOf('customise') > -1) {
        dropdowns = document.querySelectorAll('.characteristics select option');
      } else {
        dropdowns = document.querySelectorAll('.variationDropDown option');
      }

      for (let index = 0; index < dropdowns.length; index += 1) {
        const element = dropdowns[index];
        const sizeRegex = /(XXL|Large|Medium|Small)/g;
        /*eslint-disable*/
        for(const title in newSizes) {
          if (element.textContent.match(title)) {
            if(settings.VARIATION === '1'){
              if (element.textContent.indexOf('slices') === -1) {
                element.textContent = element.textContent.replace(sizeRegex, newSizes[title]);
              }
            }
            if(settings.VARIATION === '2'){
              if (element.textContent.indexOf('",') === -1) {
                element.textContent = element.textContent.replace(sizeRegex, newSizes[title]);
              }
            }
          }
        }
        /* eslint-enable */
      }
    },
  },
};

export default Experiment;
