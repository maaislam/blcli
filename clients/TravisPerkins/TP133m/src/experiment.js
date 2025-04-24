import { fullStory, events, viewabilityTracker } from '../../../../lib/utils';


/**
 * {{TP133m}} - {{Reviews on PLP - Mobile}}
 */

const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: '{{ID}}',
      VARIATION: '{{VARIATION}}',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const allAddToCollection = bodyVar.querySelectorAll('#addForCollection');
      const allAddToBag = bodyVar.querySelectorAll('#addToCartButton');

      return {
        docVar,
        bodyVar,
        allAddToBag,
        allAddToCollection,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
      // Default running event
      events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        const { render } = Exp;
        const { bindExperimentEvents } = Exp;
        if ($.fn.slick) {
          render.reviews();
        } else {
          $.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', render.reviews);
        }
        // Add tracking
        bindExperimentEvents.handleAddForDelivery();
        bindExperimentEvents.handleAddToCollection();
      },
    },
    render: {
      reviews() {
        // Handles rendering, adds markup for slick then creates instances of slick
        const allProductNodes = Exp.cache.bodyVar.querySelectorAll('.advanced_plp_product_item');
        const productNodeList = [allProductNodes[1], allProductNodes[6]];
        for (let i = 0; i < 2; i += 1) {
          Exp.render.reviewMarkup(productNodeList[i], i);
        }
        // Add slick slider to all carousels
        Exp.render.addSlick();
      },
      reviewMarkup(renderLocation, carouselNumber) {
        const reviewsArray = [
          'Never had an issue with this supplier, they\'ve always had a good service and do a lot of great deals',
          'Been using them for 20-30 years and have a good relationship',
          'Driver was excellent, I live in a difficult place to deliver to but nothing was too much trouble for the driver and his mate, can’t recommend enough! Thank you, will def be back.',
          'Great service, contacted same day to organise delivery. Left delivery note on order, dropped exactly where I wanted it as I wasn\'t home on delivery. Great service, will be using again',
          'Bulk bag delivered precisely where I had asked. No reservations about using TP online purchase again.',
          'Really good, solid quality products, and the branch is so close and accessible'];
        renderLocation.insertAdjacentHTML('afterend', `
          <div class="TP133m_Container TP133m_Container_${carouselNumber}">
            <p class="TP133m_Header">Why the Trade choose Travis Perkins...</p>
            <section class="landing_wrap TP133m_Review_Carousel">
              <div class="TP133m_Slider_Wrap">
              </div>
            </section>
          </div>
        `);
        // Assign Selectors
        const TP133mSlickParent = Exp.cache.bodyVar.querySelector(`.TP133m_Container_${carouselNumber} .TP133m_Slider_Wrap`);
        // Render markup
        for (let i = 0, n = reviewsArray.length; i < n; i += 1) {
          TP133mSlickParent.insertAdjacentHTML('beforeend', `
            <div class="TP133m_Review">
              <div class="TP133m_Text_Container">
                <p class="TP133m_Review_Text TP133m_Review_${i}">
                <span class="TP133m_Open_Quote">“</span>
                  ${reviewsArray[i]}
                  <span class="TP133m_Close_Quote">”</span>
                </p>
              </div>
            </div>
          `);
        }
        Exp.cache.bodyVar.querySelector(`.TP133m_Container_${carouselNumber} .landing_wrap.TP133m_Review_Carousel`).className = 'TP133m_landing_wrap TP133m_Review_Carousel';
        TP133mSlickParent.classList.add('TP133m_landing_slider');
      },
      addSlick() {
        const TP133mSlickParentJQ = $('.TP133m_Slider_Wrap');
        // Configure slick
        TP133mSlickParentJQ.slick({
          dots: false,
          infinite: true,
          autoplay: true,
          slidesToShow: 1,
          autoplaySpeed: 5000,
          slidesToScroll: 1,
          arrows: false,
        });
        Exp.bindExperimentEvents.addVisibilityTrackers();
      },
    },
    bindExperimentEvents: {
      addToCollectionScript() {
        events.send(`${Exp.settings.ID}`, 'Clicked', 'Click and Collect', { sendOnce: true });
      },
      handleAddToCollection() {
        for (let i = 0, n = Exp.cache.allAddToCollection.length; i < n; i += 1) {
          Exp.cache.allAddToCollection[i].addEventListener('click', this.addToCollectionScript);
        }
      },
      addForDeliveryScript() {
        events.send(`${Exp.settings.ID}`, 'Clicked', 'Add For Delivery', { sendOnce: true });
      },
      handleAddForDelivery() {
        for (let i = 0, n = Exp.cache.allAddToBag.length; i < n; i += 1) {
          Exp.cache.allAddToBag[i].addEventListener('click', this.addForDeliveryScript);
        }
      },
      addVisibilityTrackers() {
        const allCarousels = Exp.cache.bodyVar.querySelectorAll('.TP133m_Container');
        // Upper carousel
        viewabilityTracker(allCarousels[0], () => {
          events.send(`${Exp.settings.ID}`, 'Viewed', 'First Carousel', { sendOnce: true });
        });
        // Lower carousel
        viewabilityTracker(allCarousels[1], () => {
          events.send(`${Exp.settings.ID}`, 'Viewed', 'Second Carousel', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
