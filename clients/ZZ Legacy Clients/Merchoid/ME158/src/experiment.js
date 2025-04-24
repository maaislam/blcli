import { fullStory, events } from '../../../../lib/utils';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME158',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    if (!localStorage.getItem('ME158-boxShown') && !localStorage.getItem('ME158-boxClosed')) {
      components.addWidget();
    }
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
  /**
   *  @desc Define the countries and the location widget to the page
   */
    addWidget: function addWidget() {
      const country = window.merchoidDetectedCountry;

      let flagName;
      let countryName;

      if (country === 'GB') {
        flagName = 'ME158-uk';
        countryName = 'UK';
      } else if (country === 'US' || country === 'CA') {
        flagName = 'ME158-us';
        countryName = 'US';
      }

      const locationWidget = document.createElement('div');
      locationWidget.classList.add('ME158-welcome_box');
      locationWidget.innerHTML = `<div class="ME158-exit">&times;</div>
            <div class="ME158-flag_side"></div>
            <div class="ME158-textside">
              <p class="ME158-title">Welcome to the Merchoid <span></span> store!</p>
              <p>Home to the coolest geek merch on the web</p>
            </div>`;

      const countryFlag = locationWidget.querySelector('.ME158-flag_side');
      const locationName = locationWidget.querySelector('.ME158-title span');
      const widgetTitle = locationWidget.querySelector('.ME158-title');

      if (country === 'GB' || country === 'US' || country === 'CA') {
        countryFlag.classList.add(flagName);
        locationName.textContent = countryName;
      } else {
        countryFlag.classList.add('ME158-eu');
        widgetTitle.textContent = 'You\'re now shopping our European store…';
      }
      document.body.appendChild(locationWidget);
      localStorage.setItem('ME158-boxShown', 1);

      document.querySelector('.ME158-exit').addEventListener('click', () => {
        document.querySelector('.ME158-welcome_box').remove();
        localStorage.setItem('ME158-boxClosed', 1);
      });
    },
  },
};

export default Experiment;
