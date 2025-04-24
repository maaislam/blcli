import { fullStory, events, getCookie } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';
// import test from './lib/test';
import slider from './lib/cat-slider';

/**
 * {{TG054}} - {{Mobile Homepage Categories}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'TG054',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup1
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    // jQuery
    let $ = null;
    // Poll for TG023
    poller([
      '.homepage_slider .post-content', () => {
        let trigger = false;
        if (window.jQuery) {
          $ = window.jQuery;
          trigger = true;
        }
        return trigger;
      },
    ], () => {
      // const runTest = test;
      if (!document.body.classList.contains('tg23')) {
        const currentBanner = document.querySelector('.homepage_slider .post-content');
        if (currentBanner) {
          currentBanner.insertAdjacentHTML('beforeend', slider[0].outerHTML);
          // Re init slick on element
          // const $slickSlider = $('.tg23-all-products-slider');
          // components.reInitSlick($slickSlider);
          const $elToSlick = $('.tg23-all-products-slider .tg23-all-products-slider__categories');
          components.addSlick($elToSlick);
        }
      }
      // Re run slick functions on slide toggle
      // const rangesTab = $('.tg23-toggle.tg23-toggle--ranges');
      // components.onToggle(rangesTab, $elToSlick);
      // Track clicks
      services.trackOnClick();
    });
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
    trackOnClick() {
      const elements = document.querySelectorAll('.tg23-all-products-slider__inner ul.slick-slider li.slick-slide a');
      const trackClick = (el) => {
        el.addEventListener('click', () => {
          events.send(Experiment.settings.ID, 'Click', 'Category item clicked');
        });
      };
      [].forEach.call(elements, (element) => {
        trackClick(element);
      });
    },
  },

  components: {
    reInitSlick($slickSlider) {
      if ($slickSlider) {
        // Unslick
        $slickSlider[0].slick.unslick();
        // Re init
        $slickSlider.slick({
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 3,
        });
      }
    },
    addSlick(el) {
      if (el) {
        if (!el[0].classList.contains('slick-initialized')) {
          el.slick({
            // infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
          });
        } else {
          el.slick('setPosition');
        }
      }
    },
    onToggle(clicker, slider) {
      if (clicker && slider) {
        $(clicker).click(function() {
          Experiment.components.addSlick(slider);
        });
      }
    },
  },
};

export default Experiment;
