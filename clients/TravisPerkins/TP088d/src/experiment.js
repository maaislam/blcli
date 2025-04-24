import { fullStory, events } from '../../../../lib/utils';

/**
 * {{TP088d}} - {{In-the-grid reviews - Bulk Bag specific}}
 */

const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP088d',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      let TP088dSlickParent;
      // eslint-disable-next-line
      // const URLArray = ['/Product/Building-Materials/Cements+Aggregates/c/1500039', '/Product/Gardens+Landscaping/Soil-Compost+Bark/c/1500140', '/Product/Gardens+Landscaping/Decorative-Stones+Gravel/c/1500053', '/Product/Building-Materials/Cements+Aggregates/Bagged-Sand+Aggregates/c/1500050'];
      const TP088dMarkUp = `
      <div class="TP088d-Wrap">
        <p class="TP088d-Title">Why the Trade choose Travis Perkins</p>
        <section class="landing_wrap TP088d-Slider">
          <div class="TP088d-Content-Wrap">
            <p class="TP088d-Reveiw">"Bulk bag delivered precisely where I had asked. No reservations about using TP online to purchase again."</p>
            <p class="TP088d-Reveiw">"They're local to me, get along pretty good with the lads. They're good for deliveries"</p>
            <p class="TP088d-Reveiw">"Never had an issue with this supplier, they've always had a good service and do a lot of great deals"</p>
            <p class="TP088d-Reveiw">"They have excellent customer service, and their products are always of good quality"</p>
            <p class="TP088d-Reveiw">"Been using them for 20-30 years and have a good relationship"</p>
            <p class="TP088d-Reveiw">"Really good, solid quality products, and the branch is so close and accessible"</p>
            <p class="TP088d-Reveiw">"Quality is good, always hold good levels of stock locally, or they will get it in urgently."</p>
            <p class="TP088d-Reveiw">"Quality products and service"</p>
            <p class="TP088d-Reveiw">"Driver was excellent, I live in a difficult place to deliver to but nothing was too much trouble for the driver and his mate, cant recommend enough! Thank you, will def be back.."</p>
            <p class="TP088d-Reveiw">"Delivered exactly where I wanted by very helpful delivery guy. Gravel good quality with mixture of sizes for 5 to 30mm. Cheapest of all suppliers I looked at and cheap delivery cost too."</p>
            <p class="TP088d-Reveiw">"Great service, contacted same day to organise delivery. Left delivery note on order, dropped exactly where I wanted it as I wasn't home on delivery. Great service, will be using again"</p>
          </div>
        </section>
      </div>
      `;
      return {
        bodyVar,
        TP088dMarkUp,
        TP088dSlickParent,
        // URLArray,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      // services.pageCheck();
      Exp.components.setupPLP();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
      // pageCheck: () => {
      //   const { components } = Exp;
      //   // Call content builder based on URL check
      //   if (window.location.pathname === Exp.cache.URLArray[0]) {
      //     components.setupCategoryPage();
      //     // Next line disabled, line exceeds length
      // eslint-disable-next-line
      //   } else if (window.location.pathname === Exp.cache.URLArray[1] || window.location.pathname === Exp.cache.URLArray[2] || window.location.pathname === Exp.cache.URLArray[3] ) {
      // eslint-disable-next-line
      //     components.setupPLP();
      //   }
      // },
    },
    components: {
      // setupCategoryPage() {
      //   poller([
      //     '#products > .cat_prod', () => {
      //       let checkjQuery = false;
      //       if (window.jQuery) {
      //         checkjQuery = true;
      //       }
      //       return checkjQuery;
      //     },
      //   ], () => {
      //     const $ = window.jQuery;
      //     // Default running event
      // eslint-disable-next-line
      //     events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
      //     // Insert slider as 5th category
      //     const reviewCarousel = () => {
      //       // Add styling class
      //       Exp.cache.bodyVar.classList.add('TP088d-Category');
      //       const insertSlider = Exp.cache.bodyVar.querySelectorAll('#products > .cat_prod')[3];
      //       // Insert Markup
      //       insertSlider.insertAdjacentHTML('afterend', Exp.cache.TP088dMarkUp);
      //       // Assign Selectors
      //       Exp.cache.TP088dSlickParent = $('.TP088d-Wrap > section > .TP088d-Content-Wrap');
      // eslint-disable-next-line
      //       Exp.cache.bodyVar.querySelector('.landing_wrap.TP088d-Slider').className = 'TP088d_landing_wrap TP088d_Content_Carousel';
      //       Exp.cache.TP088dSlickParent.addClass('TP088d_landing_slider');
      //       Exp.cache.TP088dSlickParent.removeClass('landing_slider');
      //       // Configure Slick
      //       Exp.cache.TP088dSlickParent.slick({
      //         slidesToShow: 1,
      //         slidesToScroll: 1,
      //         infinite: true,
      //         arrows: false,
      //         dots: false,
      //         autoplay: true,
      //         autoplaySpeed: 6000,
      //       });
      //     };
      //     if ($.fn.slick) {
      //       reviewCarousel();
      //     } else {
      //       $.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', reviewCarousel);
      //     }
      //   });
      // },
      setupPLP() {
        const $ = window.jQuery;
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
        // Insert slider as 5th category
        const reviewCarousel = () => {
          // Add styling class
          Exp.cache.bodyVar.classList.add('TP088d-PLP');
          const insertSlider = Exp.cache.bodyVar.querySelector('#products > .row > .prod ');
          // Insert Markup
          insertSlider.insertAdjacentHTML('afterend', Exp.cache.TP088dMarkUp);
          // Assign Selectors
          Exp.cache.TP088dSlickParent = $('.TP088d-Wrap > section > .TP088d-Content-Wrap');
          Exp.cache.bodyVar.querySelector('.landing_wrap.TP088d-Slider').className = 'TP088d_landing_wrap TP088d_Content_Carousel';
          Exp.cache.TP088dSlickParent.addClass('TP088d_landing_slider');
          Exp.cache.TP088dSlickParent.removeClass('landing_slider');
          // Configure Slick
          Exp.cache.TP088dSlickParent.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            arrows: false,
            dots: false,
            autoplay: true,
            autoplaySpeed: 6000,
          });
          // Add event handlers to refresh slick on listing view change
          Exp.cache.bodyVar.querySelector('#content .prod_nav_top > .view_mode_buttons > .list_button').addEventListener('click', () => {
            Exp.cache.TP088dSlickParent[0].slick.refresh();
          });
          // eslint-disable-next-line
          // Exp.cache.bodyVar.querySelector('#content .prod_nav_top > .view_mode_buttons > .grid_button').addEventListener('click', () => {
          //   Exp.cache.TP088dSlickParent[0].slick.refresh();
          // });
        };
        if ($.fn.slick) {
          reviewCarousel();
        } else {
          $.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', reviewCarousel);
        }
      },
    },
  };

  Exp.init();
};

export default Run;
