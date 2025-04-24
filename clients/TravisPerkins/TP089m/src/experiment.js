import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

/**
 * {{TP089m}} - {{In-Grid Reviews - Bulk Bags mobile}
 */

const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP089m',
      VARIATION: '1',
    },
    cache: (() => {
      const URLArray = ['/Product/Building-Materials/Cements+Aggregates/c/1500039', '/Product/Gardens+Landscaping/Soil-Compost+Bark/c/1500140', '/Product/Gardens+Landscaping/Decorative-Stones+Gravel/c/1500053', '/Product/Building-Materials/Cements+Aggregates/Bagged-Sand+Aggregates/c/1500050'];
      const bodyVar = document.body;
      let TP089mSlickParent;
      const TP089mMarkUp = `
      <div class="TP089m-Wrap">
        <p class="TP089m-Title">Why the Trade choose Travis Perkins</p>
        <section class="landing_wrap TP089m-Slider">
          <div class="TP089m-Content-Wrap">
            <p class="TP089m-Reveiw">"Bulk bag delivered precisely where I had asked. No reservations about using TP online to purchase again."</p>
            <p class="TP089m-Reveiw">"They're local to me, get along pretty good with the lads. They're good for deliveries"</p>
            <p class="TP089m-Reveiw">"Never had an issue with this supplier, they've always had a good service and do a lot of great deals"</p>
            <p class="TP089m-Reveiw">"They have excellent customer service, and their products are always of good quality"</p>
            <p class="TP089m-Reveiw">"Been using them for 20-30 years and have a good relationship"</p>
            <p class="TP089m-Reveiw">"Local and good quality timber"</p>
            <p class="TP089m-Reveiw">"Really good, solid quality products, and the branch is so close and accessible"</p>
            <p class="TP089m-Reveiw">"Good quality wood compared to rivals"</p>
            <p class="TP089m-Reveiw">"Quality is good, always hold good levels of stock locally, or they will get it in urgently."</p>
            <p class="TP089m-Reveiw">"Quality products and service"</p>
            <p class="TP089m-Reveiw">"Driver was excellent, I live in a difficult place to deliver to but nothing was too much trouble for the driver and his mate, cant recommend enough! Thank you, will def be back.."</p>
            <p class="TP089m-Reveiw">"Delivered exactly where I wanted by very helpful delivery guy. Gravel good quality with mixture of sizes for 5 to 30mm. Cheapest of all suppliers I looked at and cheap delivery cost too."</p>
            <p class="TP089m-Reveiw">"Great service, contacted same day to organise delivery. Left delivery note on order, dropped exactly where I wanted it as I wasn't home on delivery. Great service, will be using again"</p>
          </div>
        </section>
      </div>
      `;

      return {
        bodyVar,
        URLArray,
        TP089mMarkUp,
        TP089mSlickParent,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;

      services.tracking();
      services.pageCheck();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
      pageCheck: () => {
        const { components } = Exp;
        // Call content builder based on URL check
        if (window.location.pathname === Exp.cache.URLArray[0]) {
          components.setupCategoryPage();
          // Next line disabled, line exceeds length
          // eslint-disable-next-line
        } else if (window.location.pathname === Exp.cache.URLArray[1] || window.location.pathname === Exp.cache.URLArray[2] || window.location.pathname === Exp.cache.URLArray[3] ) {
          components.setupPLP();
        }
      },
    },
    components: {
      setupCategoryPage() {
        poller([
          '.tp_catView.grid > li', () => {
            let checkjQuery = false;
            if (window.jQuery) {
              checkjQuery = true;
            }
            return checkjQuery;
          },
        ], () => {
          const $ = window.jQuery;
          events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
          // Insert slider as 4th category
          const reviewCarousel = () => {
            // Add styling class
            Exp.cache.bodyVar.classList.add(Exp.settings.ID);
            Exp.cache.bodyVar.classList.add('TP089m-Category');
            const insertSlider = Exp.cache.bodyVar.querySelectorAll('.tp_catView.grid > li')[3];
            // Insert Markup
            insertSlider.insertAdjacentHTML('afterend', Exp.cache.TP089mMarkUp);
            // Assign Selectors
            Exp.cache.TP089mSlickParent = $('.TP089m-Wrap > section > .TP089m-Content-Wrap');
            Exp.cache.bodyVar.querySelector('.landing_wrap.TP089m-Slider').className = 'TP089m_landing_wrap TP089m_Content_Carousel';
            Exp.cache.TP089mSlickParent.addClass('TP089m_landing_slider');
            Exp.cache.TP089mSlickParent.removeClass('landing_slider');
            // Configure Slick
            Exp.cache.TP089mSlickParent.slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              arrows: false,
              dots: false,
              autoplay: true,
            });
          };
          if ($.fn.slick) {
            reviewCarousel();
          } else {
            $.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', reviewCarousel);
          }
        });
      },
      setupPLP() {
        poller([
          '#tp_product_lister_enumeration > .advanced_plp_product_item.product_item', () => {
            let checkjQuery = false;
            if (window.jQuery) {
              checkjQuery = true;
            }
            return checkjQuery;
          },
        ], () => {
          const $ = window.jQuery;
          // Default running event
          events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
          const reviewCarousel = () => {
            // Add styling class
            Exp.cache.bodyVar.classList.add(Exp.settings.ID);
            Exp.cache.bodyVar.classList.add('TP089m-PLP');
            const insertSlider = Exp.cache.bodyVar.querySelector('#tp_product_lister_enumeration > .advanced_plp_product_item.product_item');
            // Insert Markup
            insertSlider.insertAdjacentHTML('afterend', Exp.cache.TP089mMarkUp);
            // Assign Selectors
            Exp.cache.TP089mSlickParent = $('.TP089m-Wrap > section > .TP089m-Content-Wrap');
            Exp.cache.bodyVar.querySelector('.landing_wrap.TP089m-Slider').className = 'TP089m_landing_wrap TP089m_Content_Carousel';
            Exp.cache.TP089mSlickParent.addClass('TP089m_landing_slider');
            Exp.cache.TP089mSlickParent.removeClass('landing_slider');
            // Configure Slick
            Exp.cache.TP089mSlickParent.slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              arrows: false,
              dots: false,
              autoplay: true,
            });
          };
          if ($.fn.slick) {
            reviewCarousel();
          } else {
            $.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', reviewCarousel);
          }
        });
      },
    },
  };

  Exp.init();
};

export default Run;
