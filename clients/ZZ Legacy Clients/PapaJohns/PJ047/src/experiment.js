import { fullStory, events } from '../../../../lib/utils';
import pizzaPage from './components/pizzaPage';
import halfAndhalfPage from './components/halfAndhalfPage';
import baseAndSize from './components/baseAndSize';
import addHalves from './components/addHalves';
import { poller } from '../../../../lib/uc-lib';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ047',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();

    const url = window.location.pathname;
    if (url.indexOf('/pizzas.aspx') > -1) {
      document.body.classList.add(settings.ID);
      poller(['.menuItems .pic.fixedMenuImage'], () => {
        pizzaPage();
      });
    }
    if (url.indexOf('/half-and-half.aspx') > -1) {
      document.body.classList.add(settings.ID);
      poller([
        '.main .halfPage',
        '.menuItems',
        '.selectBase',
        '.menuItems .selectCrust .crustSize',
      ], () => {
        halfAndhalfPage();
        baseAndSize();
        addHalves();
      });
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
