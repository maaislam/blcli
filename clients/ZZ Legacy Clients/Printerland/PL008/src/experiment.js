import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';
import Toggle from './lib/Toggle';
import PublishSubscribe from './lib/PublishSubscribe';
import { saveToggled, getToggled } from './lib/Storage';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PL008',
    POPUP_DISPLAY_TIME: 10000,
    STORAGE_KEY__TOGGLED: 'PriceIncVat',
    STORAGE_KEY__POPUP: 'pl8-did-see-popup',
    VARIATION: '{{VARIATION}}',
  },

  /**
   * @desc Entry point for experiment
   */
  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    // -----------------------------------
    // Build mark up to drop components in
    // -----------------------------------
    document.querySelector('.top_menu').insertAdjacentHTML('afterbegin', `
        <div class="pl8-toggle-wrap">
        </div>
    `);

    // -----------------------------------
    // :: Register subscribers ::
    // -----------------------------------
    
      // -----------------------------------
      // > Send GA Event
      // -----------------------------------
      PublishSubscribe.subscribe('did-toggle', (data) => {
        events.send(settings.ID, 'Did Toggle', data.toggled ? 'On' : 'Off');
      });

      // -----------------------------------
      // > Update the pricing on the page
      // -----------------------------------
      PublishSubscribe.subscribe('did-toggle', (data) => {
        Experiment.updatePricing(data.toggled);
      });
      
      // -----------------------------------
      // > Update the logo add-on when toggle changed
      // -----------------------------------
      PublishSubscribe.subscribe('did-toggle', (data) => {
        const shouldShowLogoAddon = !data.toggled; // toggler off = trade pricing, show addon
        Experiment.modifyLogoAddon(shouldShowLogoAddon);
      });

      // -----------------------------------
      // > Did close popup
      // -----------------------------------
      PublishSubscribe.subscribe('user-did-close-popup', () => {
        events.send(settings.ID, 'User Did Close Popup');
      });

    // -----------------------------------
    // Create Toggler component and render in update callback function
    // -----------------------------------
    const toggler = new Toggle((component) => {
      document.querySelector('.pl8-toggle-wrap').innerHTML = component.render();
    });

    // On load, if business modify logo
    const shouldShowLogoAddon = !toggler.toggled; // toggler off = trade pricing, show addon
    Experiment.modifyLogoAddon(shouldShowLogoAddon);
  },

  /**
   * Logo add on
   *
   * Shown to customers viewing trade pricing
   * Toggling to consumer pricing hides the logo add on
   */
  modifyLogoAddon: (show = true) => {
    const logoAddon = document.querySelector('.pl8-logo-addon');
    if(logoAddon) {
      logoAddon.remove();
    }

    if(show) {
      const logoWrapper = document.querySelector('.main_header .logo');
      if(logoWrapper) {
        logoWrapper.insertAdjacentHTML('beforeend', '<div class="pl8-logo-addon">Business</div>');
      }
    }
  },

  /**
   * @desc Helper update the pricing on the page
   */
  updatePricing: (toggled) => {
    let toggler = document.querySelector('#ctl00_ctl00_ContentPlaceHolderMain_cntPlaceHlderMain_chkTogglePrice');
    if(!toggler) {
      // Named differently on different pages
      toggler = document.querySelector('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMain_chkTogglePrice');
    }

    if(toggler) {
      // Toggler is already on the page, so hit it
      toggler.click();
    } else {
      // Set cookie, future page visits should utilise this to remember pricing
      saveToggled(toggled);

      window.location.reload();
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

  components: {},
};

export default Experiment;
