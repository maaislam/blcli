import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';
import test from './lib/exp';

/**
 * {{TG021v3}} - {{Lead Gen at Product}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'TG021v3',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    test();
    const tooltipChanges = () => {
      const tooltipText = document.querySelector('.TG21_wrap p.TG21_bottomText');
      const quoteBtn = document.querySelector('.TG21_wrap .request-quote');
      if (tooltipText && quoteBtn) {
        const tooltipHTML = `
          <div class="TG21_tooltip">
            <div>
              <p>${tooltipText.textContent}</p>
            </div>
          </div>
        `;
        const tooltipIcon = `
          <div class="TG21_tooltip_icon">
            <p>i</p>
          </div>
        `;
        quoteBtn.insertAdjacentHTML('beforeend', tooltipIcon);
        quoteBtn.insertAdjacentHTML('beforeend', tooltipHTML);

        const toggleTooltip = () => {
          const icon = document.querySelector('.TG21_wrap .TG21_tooltip_icon');
          const refDiv = document.querySelector('.TG21_tooltip');
          if (icon) {
            icon.addEventListener('mouseenter', () => {
              refDiv.classList.add('TG21-open-tt');
            });
            icon.addEventListener('mouseleave', () => {
              refDiv.classList.remove('TG21-open-tt');
            });
          }
        };
        toggleTooltip();

        // Change text
        const changeText = () => {
          let text = null;
          const lang = window.location.pathname.split('/');
          if (lang[1] === 'gb') {
            text = '<p><span>Still unsure?</span> Recieve a FREE catalogue by clicking the link below</p>';
          } else if (lang[1] === 'it') {
            text = '<p><span>Vuoi saperne di più?</span> Ricevi il catalogo cliccando questo link</p>';
          }
          const textDiv = document.createElement('div');
          textDiv.classList.add('tg21-v3--text');
          textDiv.innerHTML = text;
          const ref = document.querySelector('.TG21_wrap .product-other-social');
          if (ref) {
            ref.insertAdjacentElement('beforebegin', textDiv);
          }
        };
        // poller([
        //   '.TG025_smallWrapper .TG025_underFirstBtn',
        // ], changeText);
        changeText();
      }
    };
    poller([
      'body', '.TG21_wrap .request-quote',
    ], tooltipChanges);
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
