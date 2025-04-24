import { fullStory, events } from '../../../../lib/utils';
import { observer } from '../../../../lib/uc-lib';
import productsDetails from './lib/PL004-content';

/**
 * {{PL004}} - {{Compare by Special offer icons}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PL004',
    VARIATION: '1',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    const changeSimilarProductsContent = function () { // eslint-disable-line func-names
      const similarPrinters = document.querySelectorAll('.product');

      [].forEach.call(similarPrinters, (printer) => {
        const printerHeader = printer.querySelector('header');
        // Special Offer button
        const newOfferButton = `<div class='PL004-speacialOffer'>
        <span class='PL004-specialOffer__btn'>Special Offer</span></div>`;
        printerHeader.insertAdjacentHTML('beforebegin', newOfferButton);

        // Reviews
        const starsContainer = `<div class='PL004-starReviewsContainer'></div>`; // eslint-disable-line quotes
        printerHeader.insertAdjacentHTML('afterend', starsContainer);
        const starsReview = printer.querySelector('.reviews');
        if (starsReview) {
          let starsCount;
          if (starsReview.querySelector('span.review-count')) {
            starsCount = starsReview.querySelector('span.review-count').textContent;
            starsCount = starsCount.replace(/[()]/g, '');
            let reviews;
            if (starsCount === 1) {
              reviews = `<span class='PL004-starReviews'><a>Read ${starsCount} review<a></span>`;
            } else {
              reviews = `<span class='PL004-starReviews'><a>Read ${starsCount} reviews</a></span>`;
            }
            printer.querySelector('.PL004-starReviewsContainer').insertAdjacentElement('afterbegin', starsReview);
            starsReview.insertAdjacentHTML('afterend', reviews);
          }
        }

        // Compare Button
        const buttonContainer = `<div class='PL004-compare'>
        <div class='comparePrinter'><span class='compare-btn'>Add to Compare</span>
        </div></div>`;
        printer.querySelector('.imgholder').insertAdjacentHTML('afterend', buttonContainer);
        printer.querySelector('.compare-btn').addEventListener('click', () => {
          printer.querySelector('.compare > label').click();
        });

        // Creates Offers Container
        const descriptionContainer = printer.querySelector('div.description');
        const offersContainer = `<div class='PL004-offersContainer'><div class='PL004-badges'><ul class='PL004-badgeList'></ul></div></div>`; // eslint-disable-line quotes
        descriptionContainer.insertAdjacentHTML('afterbegin', offersContainer);
        // Pricing
        const vatContent = printer.querySelector('span.pricing .price-suffix');
        const tooltipContent = printer.querySelector('span.tooltip_VAT');
        if (vatContent && tooltipContent) {
          vatContent.insertAdjacentElement('afterend', tooltipContent);
        }
      });

      productsDetails();
    };

    /*eslint-disable */
    const scrollIntoView = function () {
      window.addEventListener('scroll', function() {
        const elementTarget = document.querySelector('.detail_items.cross-sell');
        if (window.scrollY > (elementTarget.offsetTop + elementTarget.offsetHeight - 100)) {
          events.send(settings.ID, 'View', `${settings.ID} cross sell items shown - Variation ${settings.VARIATION}`, { sendOnce : true });
        }
      });
    };

    changeSimilarProductsContent();
    scrollIntoView();
    /*eslint-disable */
    observer.connect(document.querySelector('div.detail_items.cross-sell > div:nth-child(2)'), function () {
      // Reloads changes
      changeSimilarProductsContent();
    }, {
      config: {
        attributes: false,
        childList: true,
      },
    });
    /* eslint-enable */
    events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
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
