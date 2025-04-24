import { fullStory, events, viewabilityTracker } from '../../../../lib/utils';


/**
 * {{TP133d}} - {{Reviews on PLP - Desktop}}
 */

const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just tsoggle the variation number in production
     */
    settings: {
      ID: '{{ID}}',
      VARIATION: '{{VARIATION}}',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const listViewButtons = bodyVar.querySelectorAll('.list_button');
      const allAddToCollection = bodyVar.querySelectorAll('#addForCollectButton');
      const allAddToBag = bodyVar.querySelectorAll('#addToCartButton');
      // Assigned when slick loads, all slick nodes
      let TP133dSlickParentJQ;
      return {
        docVar,
        bodyVar,
        listViewButtons,
        TP133dSlickParentJQ,
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
      removeSlickArrow() {
        // Remove button text content
        const slickArrows = Exp.cache.bodyVar.querySelectorAll('.slick-arrow');
        for (let i = 0; i < slickArrows.length; i += 1) {
          slickArrows[i].textContent = '';
        }
      },
    },
    components: {
      setupElements() {
        const { render } = Exp;
        const { bindExperimentEvents } = Exp;
        // Renders first slick
        if ($.fn.slick) {
          render.reviews();
        } else {
          $.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', render.reviews);
        }
        // Add event listeners
        bindExperimentEvents.listViewClick();
        bindExperimentEvents.handleAddToCollection();
        bindExperimentEvents.handleAddForDelivery();
      },
    },
    render: {
      reviews() {
        // Handles rendering, adds markup for slick then creates instances of slick
        const allProductNodes = Exp.cache.bodyVar.querySelectorAll('#products .prod ');
        const productNodeList = [allProductNodes[2], allProductNodes[6]];
        for (let i = 0; i < 2; i += 1) {
          Exp.render.reviewMarkup(productNodeList[i], i);
        }
        Exp.render.addSlick();
      },
      reviewMarkup(renderLocation, carouselNumber) {
        const reviewsArray = [
          'They\'re local to me, get along pretty good with the lads. They\'re good for deliveries',
          'Never had an issue with this supplier, they\'ve always had a good service and do a lot of great deals',
          'Been using them for 20-30 years and have a good relationship',
          'Driver was excellent, I live in a difficult place to deliver to but nothing was too much trouble for the driver and his mate, can’t recommend enough! Thank you, will def be back.',
          'Great service, contacted same day to organise delivery. Left delivery note on order, dropped exactly where I wanted it as I wasn\'t home on delivery. Great service, will be using again',
          'Bulk bag delivered precisely where I had asked. No reservations about using TP online purchase again.',
          'Really good, solid quality products, and the branch is so close and accessible',
          'Delivered exactly where I wanted by very helpful delivery guy. Gravel good quality with mixture of sizes for 5 to 30mm. Cheapest of all suppliers I looked at and cheap delivery cost too.',
          'Really good, solid quality products, and the branch is so close and accessible. They have excellent customer service, and their products are always of good quality'];
        renderLocation.insertAdjacentHTML('afterend', `
          <div class="TP133d_Container TP133d_Container_${carouselNumber}">
            <p class="TP133d_Header">Why the Trade choose Travis Perkins...</p>
            <section class="landing_wrap TP133d_Review_Carousel">
              <div class="TP133d_Slider_Wrap">
              </div>
            </section>
          </div>
        `);
        // Assign Selectors
        const TP133dSlickParent = Exp.cache.bodyVar.querySelector(`.TP133d_Container_${carouselNumber} .TP133d_Slider_Wrap`);
        // Render markup
        for (let i = 0, n = reviewsArray.length; i < n; i += 1) {
          TP133dSlickParent.insertAdjacentHTML('beforeend', `
            <div class="TP133d_Review_Wrap">
              <div class="TP133d_Review">
                <div class="TP133d_Text_Container">
                  <p class="TP133d_Review_Text TP133d_Review_${i}">
                  <span class="TP133d_Open_Quote">“</span>
                    ${reviewsArray[i]}
                    <span class="TP133d_Close_Quote">”</span>
                  </p>
                </div>
              </div>
            </div>
          `);
        }
        Exp.cache.bodyVar.querySelector(`.TP133d_Container_${carouselNumber} .landing_wrap.TP133d_Review_Carousel`).className = 'TP133d_landing_wrap TP133d_Review_Carousel';
        TP133dSlickParent.classList.add('TP133d_landing_slider');
      },
      addSlick() {
        Exp.cache.TP133dSlickParentJQ = $('.TP133d_Slider_Wrap');
        // Configure slick
        Exp.cache.TP133dSlickParentJQ.slick({
          dots: false,
          infinite: true,
          autoplay: true,
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: true,
          autoplaySpeed: 5000,
        });
        Exp.services.removeSlickArrow();
        Exp.bindExperimentEvents.addVisibilityTrackers();
      },
    },
    bindExperimentEvents: {
      handleListView() {
        for (let i = 0, n = Exp.cache.TP133dSlickParentJQ.length; i < n; i += 1) {
          Exp.cache.TP133dSlickParentJQ[i].slick.refresh();
        }
        Exp.services.removeSlickArrow();
      },
      listViewClick() {
        for (let i = 0, n = Exp.cache.listViewButtons.length; i < n; i += 1) {
          Exp.cache.listViewButtons[i].addEventListener('click', this.handleListView);
        }
      },
      addToCollectionScript() {
        events.send(`${Exp.settings.ID}`, 'Clicked', 'Click and Collect', { sendOnce: true });
      },
      handleAddToCollection() {
        for (let i = 0, n = Exp.cache.allAddToCollection.length; i < n; i += 1) {
          Exp.cache.allAddToCollection[i].addEventListener('click', this.addToCollectionScript);
        }
      },
      addForDelivery() {
        events.send(`${Exp.settings.ID}`, 'Clicked', 'Add For Delivery', { sendOnce: true });
      },
      handleAddForDelivery() {
        for (let i = 0, n = Exp.cache.allAddToBag.length; i < n; i += 1) {
          Exp.cache.allAddToBag[i].addEventListener('click', this.addForDelivery);
        }
      },
      addVisibilityTrackers() {
        const allCarousels = Exp.cache.bodyVar.querySelectorAll('.TP133d_Container');
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
