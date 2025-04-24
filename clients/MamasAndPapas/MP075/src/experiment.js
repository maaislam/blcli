import {
  fullStory,
  events
} from '../../../../lib/utils';
import {
  poller
} from '../../../../lib/uc-lib';
import productsDetails from './lib/MP075-content';
/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP075',
    VARIATION: '1',
  },

  init: function init() {
    // Setup
    const {
      settings,
      services
    } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    const iconWrapper = document.createElement('div');
    iconWrapper.classList.add('MP075_icon-wrapper');

    const readDescriptionLink = document.querySelector('.productDetail .pb-2');

    readDescriptionLink.insertAdjacentElement('afterend', iconWrapper);

    productsDetails();

    // Slider
    /*eslint-disable */
    poller([
      function () {
        try {
          return !!window.jQuery.fn.slick();
        } catch (e) {}
      }
    ], () => {
      $('.MP075_icon-wrapper').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        responsive: [{
            breakpoint: 375,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 322,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
<<<<<<< HEAD
      }).on('swipe', function(event, slick, direction){
        // events.send('MP075', 'user-swipe', direction);
=======
      }).on('swipe', function (event, slick, direction) {
        //events.send('MP075', 'user-swipe', direction);
>>>>>>> ce2de46a2622ef179b8eafcedae7adb6c757a527
      });
    });
    /* eslint-enable */

    /**
     * If dimensions link exists then adds an Event Listener for the cotbed graphic icon
     * when clicked, it opens Product Details
     */
    const dimensionsLink = document.querySelector('.MP075-dimensions');

    if (dimensionsLink) {
      dimensionsLink.addEventListener('click', () => {
        const productDetails = document.querySelector('#PDP-Details .js-slidePanel-mobile');
        if (productDetails) {
          productDetails.click();
<<<<<<< HEAD
          // events.send('MP075', 'clicked-dimensions', 'cot-bed-dimensions');
=======
          //events.send('MP075', 'clicked-dimensions', 'cot-bed-dimensions');
>>>>>>> ce2de46a2622ef179b8eafcedae7adb6c757a527
        }
      });
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const {
        settings
      } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
  },

  components: {},
};

export default Experiment;
