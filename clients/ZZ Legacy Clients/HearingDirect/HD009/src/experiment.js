import { fullStory, events, viewabilityTracker } from '../../../../lib/utils';
import { cacheDom } from '../../../../lib/cache-dom';
import reviewsHtml from './lib/html/reviews.js';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'hd009',
    VARIATION: '{{VARIATION}}',
    reviewsCount: '2,450',
    numHearingAidsSold: '8,255',
    reviewsLink: 'https://www.google.com/shopping/ratings/account/metrics?q=hearingdirect.com&c=GLOBAL&v=1&hl=en_GB',
  },

  init() {
    // -------------------------------------------------------
    // Setup
    // -------------------------------------------------------
    events.useLegacyTracker(); // Uses _gaq

    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    // -------------------------------------------------------
    // Run
    // -------------------------------------------------------
    Experiment.showPurchaseMessage();

    if(window.jQuery.fn.slick) {
      Experiment.buildWhySlider();
    } else {
      jQuery.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', function () {
        Experiment.buildWhySlider();
      });
    }
  },

  /**
   * @desc The purchase message shown in the product description
   */
  showPurchaseMessage() {
    const html = `
      <div class="hd9-purchase-msg">
        We have sold over ${Experiment.settings.numHearingAidsSold} hearing aids to 
        happy customers in the past 12 months. 
        <a target="_blank" href="${Experiment.settings.reviewsLink}" class="hd9-purchase-msg__link"
          >See our ${Experiment.settings.reviewsCount} Google Reviews &gt;</a>
      </div>
    `;

    const productInfo = cacheDom.get('.container__product .product-info');
    const infoReviews = cacheDom.get('.product-info .product-into__reviews');
    if(infoReviews) {
      infoReviews.insertAdjacentHTML('beforeend', html);
    }

    // On devices, move to after thumbnails
    if(window.innerWidth < 768) {
      const mediaThumbs = cacheDom.get('.product-media .thumbnails');
      if(infoReviews && mediaThumbs) {
        mediaThumbs.insertAdjacentElement('afterend', infoReviews); 
        infoReviews.classList.add('.hd9-reviews-mobile');
      }
    }
  },

  /**
   * @desc The 'why buy' slider
   */
  buildWhySlider() {
    const container = cacheDom.get('.container__product');
    if(container) {

      container.insertAdjacentHTML('afterend', `
        <div class="container">
          ${reviewsHtml}
        </div>
      `);

      jQuery('.hd9-reviews-slider').slick({
        dots: false,
        infinite: true
      });

      viewabilityTracker(cacheDom.get('.hd9-reviews-slider'), () => {
        events.send(Experiment.settings.ID, 'why-slider-came-into-view', '', {
          sendOnce: true
        });
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
