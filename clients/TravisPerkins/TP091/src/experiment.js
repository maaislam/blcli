import { fullStory, events } from '../../../../lib/utils';
import flicker from './flickerprevention';

/**
 * {{TP091}} - {{Desktop Product Listing Page Information}}
 */
flicker();
export const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP091',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const originalHeader = bodyVar.querySelector('#header');
      const offersCarousel = bodyVar.querySelector('#content > .yCmsComponent.home-carousel');
      const topPicks = bodyVar.querySelectorAll('#content > .inspirational_promotion_section');
      const TP091MarkUp = (`
      <div class="TP091-Wrapper">

        <div class="TP091-Top-Buttons-Wrapper">
          <span class="TP091-Show-Offers-Button">Offers</span>
          <span class="TP091-Trade-Account-Area-Button">Trade Account<br /> Area</span>
        </div>

        <div class="TP091-Offers-Trade-Container">

          <div class="TP091-Offers-Container">
            <div class="TP091-Top-Offers-Container">

              <div class="TP091-Offers-Carousel">
              </div>

              <div class="TP091-Top-Picks">
              </div>

            </div>
          </div>


        </div>

        <div class="TP091-Top-Categories-Wrapper">
          <p class="TP091-Top-Categories-Header">Top Categories</p>

          <div class="TP091-Top-Category-Wrap-1">

            <div class="TP091-Top-Category-Container TP091-Timber-Container">
              <a class="TP091-Top-Category-Link TP091-Timber-Link" href="/Product/Timber/c/1500000">
                <img class="TP091-Top-Category-Image TP091-Timber-Image" src="/_ui/scene7/is/image/travisperkins/default/xTimber,7Etimber,qdefaultImage=travisperkins,_missing-product.pagespeed.gp+jp+jw+pj+ws+js+rj+rp+rw+ri+cp+md+irlb=128000000.ic.HaYuOEdF4E.jpg" alt="Timber">
                <p class="TP091-Top-Category-Text TP091-Timber-Text">Timber</p>
              </a>
            </div>

            <div class="TP091-Top-Category-Container TP091-Building-Materials-Container">
              <a class="TP091-Top-Category-Link TP091-Building-Materials-Link" href="/Product/Building-Materials/c/1500029">
                <img class="TP091-Top-Category-Image TP091-Building-Materials-Image" src="/_ui/scene7/is/image/travisperkins/default/xBuilding-Materials,7EBuildingMaterials,qdefaultImage=travisperkins,_missing-product.pagespeed.gp+jp+jw+pj+ws+js+rj+rp+rw+ri+cp+md+irlb=128000000.ic.IFLfF9QaQC.jpg" alt="Building Materials">
                <p class="TP091-Top-Category-Text TP091-Building-Materials-Text">Building Materials</p>
              </a>
            </div>

            <div class="TP091-Top-Category-Container TP091-Doors-Windows-Joinery-Container">
              <a class="TP091-Top-Category-Link TP091-Doors-Windows-Joinery-Link" href="/Product/Doors%2C-Windows+Joinery/c/1500152">
                <img class="TP091-Top-Category-Image TP091-Doors-Windows-Joinery-Image" src="/_ui/scene7/is/image/travisperkins/default/xDoors-Windows-Joinery,7Edoors,P20and,P20windows,qdefaultImage=travisperkins,_missing-product.pagespeed.gp+jp+jw+pj+ws+js+rj+rp+rw+ri+cp+md+irlb=128000000.ic.iPsfdY5lWX.jpg" alt="Doors, Windows & Joinery">
                <p class="TP091-Top-Category-Text TP091-Doors-Windows-Joinery-Text">Doors, Windows & Joinery</p>
              </a>
            </div>

            <div class="TP091-Top-Category-Container TP091-Gardens-Landscaping-Container">
              <a class="TP091-Top-Category-Link TP091-Gardens-Landscaping-Link" href="/Product/Gardens+Landscaping/c/1500098">
                <img class="TP091-Top-Category-Image TP091-Gardens-Landscaping-Image" src="/_ui/scene7/is/image/travisperkins/default/xGardens-Landscaping,7Elandscaping,qdefaultImage=travisperkins,_missing-product.pagespeed.gp+jp+jw+pj+ws+js+rj+rp+rw+ri+cp+md+irlb=128000000.ic.sTHf5H-rJH.jpg" alt="Gardens & Landscaping">
                <p class="TP091-Top-Category-Text TP091-Gardens-Landscaping-Text">Gardens & Landscaping</p>
              </a>
            </div>


          </div>

          <div class="TP091-Top-Category-Wrap-2">
            <div class="TP091-Top-Category-Container TP091-Tools-Workwear-Container">
              <a class="TP091-Top-Category-Link TP091-Tools-Workwear-Link" href="/Product/Tools+Workwear/c/1500450">
                <img class="TP091-Top-Category-Image TP091-Tools-Workwear-Image" src="/_ui/scene7/is/image/travisperkins/default/xTools-Workwear,7Etools-and-workwear,qdefaultImage=travisperkins,_missing-product.pagespeed.gp+jp+jw+pj+ws+js+rj+rp+rw+ri+cp+md+irlb=128000000.ic.JqXRGqjlu5.jpg" alt="Tools & Workwear">
                <p class="TP091-Top-Category-Text TP091-Tools-Workwear-Text">Tools & Workwear</p>
              </a>
            </div>

            <div class="TP091-Top-Category-Container TP091-Plumbing-Heating-Container">
              <a class="TP091-Top-Category-Link TP091-Plumbing-Heating-Link" href="/Product/Plumbing+Heating/c/1500282">
                <img class="TP091-Top-Category-Image TP091-Plumbing-Heating-Image" src="/_ui/scene7/is/image/travisperkins/default/xPlumbing-Heating,7Eplumbing-and-heating,qdefaultImage=travisperkins,_missing-product.pagespeed.gp+jp+jw+pj+ws+js+rj+rp+rw+ri+cp+md+irlb=128000000.ic.sHE3CuPBTT.jpg" alt="Plumbing & Heating">
                <p class="TP091-Top-Category-Text TP091-Plumbing-Heating-Text">Plumbing & Heating</p>
              </a>
            </div>

            <div class="TP091-Top-Category-Container TP091-Bathrooms-Container">
              <a class="TP091-Top-Category-Link TP091-Bathrooms-Link" href="/Product/Bathrooms/c/1500376">
                <img class="TP091-Top-Category-Image TP091-Bathrooms-Image" src="/_ui/scene7/is/image/travisperkins/default/xBathrooms,7Ekitchens-and-bathrooms,qdefaultImage=travisperkins,_missing-product.pagespeed.gp+jp+jw+pj+ws+js+rj+rp+rw+ri+cp+md+irlb=128000000.ic.nSKIotsh5y.jpg" alt="Bathrooms">
                <p class="TP091-Top-Category-Text TP091-Bathrooms-Text">Bathrooms</p>
              </a>
            </div>

            <div class="TP091-Top-Category-Container TP091-Kitchens-Container">
              <a class="TP091-Top-Category-Link TP091-Kitchens-Link" href="/Product/Kitchens/c/1509005">
                <img class="TP091-Top-Category-Image TP091-Kitchens-Image" src="/_ui/scene7/is/image/travisperkins/default/xKitchens,7EOrlando,P20Grey,qdefaultImage=travisperkins,_missing-product.pagespeed.gp+jp+jw+pj+ws+js+rj+rp+rw+ri+cp+md+irlb=128000000.ic.loLS4ObyCT.jpg" alt="Kitchens">
                <p class="TP091-Top-Category-Text TP091-Kitchens-Text">Kitchens</p>
              </a>
            </div>
          </div>

          <div class="TP091-Top-Category-Wrap-3">
            <div class="TP091-Top-Category-Container TP091-Decorating-Interiors-Container">
              <a class="TP091-Top-Category-Link TP091-Decorating-Interiors-Link" href="/Product/Decorating+Interiors/c/1500538">
                <img class="TP091-Top-Category-Image TP091-Decorating-Interiors-Image" src="/_ui/scene7/is/image/travisperkins/default/xDecorating-Interiors,7Edecorating-and-interiors,qdefaultImage=travisperkins,_missing-product.pagespeed.gp+jp+jw+pj+ws+js+rj+rp+rw+ri+cp+md+irlb=128000000.ic.0FFPMQ4A_O.jpg" alt="Decorating & Interiors">
                <p class="TP091-Top-Category-Text TP091-Decorating-Interiors-Text">Decorating & Interiors</p>
              </a>
            </div>

            <div class="TP091-Top-Category-Container TP091-Fixings-Adhesives-Container">
              <a class="TP091-Top-Category-Link TP091-Fixings-Adhesives-Link" href="/Product/Fixings+Adhesives/c/1500237">
                <img class="TP091-Top-Category-Image TP091-Fixings-Adhesives-Image" src="/_ui/scene7/is/image/travisperkins/default/xFixings-Adhesives,7Efixings-and-sealants,qdefaultImage=travisperkins,_missing-product.pagespeed.gp+jp+jw+pj+ws+js+rj+rp+rw+ri+cp+md+irlb=128000000.ic.5zSYQ68KGZ.jpg" alt="Fixings & Adhesives">
                <p class="TP091-Top-Category-Text TP091-Fixings-Adhesives-Text">Fixings & Adhesives</p>
              </a>
            </div>

            <div class="TP091-Top-Category-Container TP091-Electrical-Lighting-Container">
              <a class="TP091-Top-Category-Link TP091-Electrical-Lighting-Link" href="/Product/Electrical+Lighting/c/1500571">
                <img class="TP091-Top-Category-Image TP091-Electrical-Lighting-Image" src="/_ui/scene7/is/image/travisperkins/default/xElectrical-Lighting,7E10479,qdefaultImage=travisperkins,_missing-product.pagespeed.gp+jp+jw+pj+ws+js+rj+rp+rw+ri+cp+md+irlb=128000000.ic.m8AZitJHrg.jpg" alt="Electrical & Lighting">
                <p class="TP091-Top-Category-Text TP091-Electrical-Lighting-Text">Electrical & Lighting</p>
              </a>
            </div>

            <div class="TP091-Top-Category-Container TP091-Tool-Hire-Container">
              <a class="TP091-Top-Category-Link TP091-Tool-Hire-Link" href="/Product/Tool-Hire/c/1571000">
                <img class="TP091-Top-Category-Image TP091-Tool-Hire-Image" src="/_ui/scene7/is/image/travisperkins/SupplierMediaScene7InputFormat/xTool-Hire,7E1571000,qdefaultImage=travisperkins,_missing-product.pagespeed.gp+jp+jw+pj+ws+js+rj+rp+rw+ri+cp+md+irlb=128000000.ic.e2YQuTnr6x.jpg" alt="Tool Hire">
                <p class="TP091-Top-Category-Text TP091-Tool-Hire-Text">Tool Hire</p>
              </a>
            </div>
          </div>

          <div class="TP091-Top-Categories-View-More-Wrapper">
            <span class="TP091-Top-Categories-View-More">View more categories...</span>
          </div>

        </div>

      </div>
      `);

      const loggedOutMarkup = `
        <div class="TP091-Trade-Container TP091-Logged-Out">
          <a class="TP091-Log-In-Button" href="/login?TP091Login">Log In</a>
          <a class="TP091-Register-Button" href="/login?TP091Register">Register</a>
        </div>
      `;

      const loggedInMarkup = `
        <div class="TP091-Trade-Container TP091-Logged-In">
          <p class="TP091-View-Account-Text">You are logged in!</p>
          <a class="TP091-View-Account-Button" href="/accountDashboard">View Account</a>
        </div>
      `;
      const loginCheck = bodyVar.querySelector('.logout-m');
      let TP091SliderParent;
      let topCategory2;
      let topCategory3;
      let viewMoreCategory;
      let offersButton;
      let tradeAccountButton;
      let offersContainer;
      let tradeAccountContainer;

      return {
        bodyVar,
        originalHeader,
        TP091MarkUp,
        TP091SliderParent,
        topCategory2,
        topCategory3,
        viewMoreCategory,
        offersButton,
        tradeAccountButton,
        offersContainer,
        tradeAccountContainer,
        offersCarousel,
        topPicks,
        loginCheck,
        loggedOutMarkup,
        loggedInMarkup,
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
        // Insert Markup

        Exp.cache.originalHeader.insertAdjacentHTML('afterend', Exp.cache.TP091MarkUp);
        // Check if user is logged in, add relevant markup

        if (Exp.cache.loginCheck) {
          // User logged in
          Exp.cache.bodyVar.querySelector('.TP091-Offers-Container').insertAdjacentHTML('afterend', Exp.cache.loggedInMarkup);
          Exp.cache.bodyVar.querySelector('.TP091-View-Account-Button').addEventListener('click', () => {
            events.send('TP091', 'Click', 'View Account', { sendOnce: true });
          });
          // View account tracking
        } else {
          // User not logged in
          Exp.cache.bodyVar.querySelector('.TP091-Offers-Container').insertAdjacentHTML('afterend', Exp.cache.loggedOutMarkup);
          // Login button - Tracking
          Exp.cache.bodyVar.querySelector('.TP091-Log-In-Button').addEventListener('click', () => {
            events.send('TP091', 'Click', 'Log In', { sendOnce: true });
          });
          // Register Button - Tracking
          Exp.cache.bodyVar.querySelector('.TP091-Register-Button').addEventListener('click', () => {
            events.send('TP091', 'Click', 'Register', { sendOnce: true });
          });
        }
        // Build USP carousel

        $.getScript('//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', () => {
          const USPSliderMarkup = (`
          <section class="landing_wrap">
            <div class="TP091-USP-Wrapper">
             <a class="TP091-USP-Link" href="/delivery">FREE DELIVERY on all orders over £40</a>
             <a class="TP091-USP-Link" href="/About_Us">YOUR LOCAL Timber & Builders Merchant</a>
             <a class="TP091-USP-Link" href="/clickandcollect">FREE CLICK & COLLECT in 1 hour</a>
            </div>
          </section>
          `);
          // Insert USP
          Exp.cache.bodyVar.querySelector('.TP091-Wrapper').insertAdjacentHTML('afterbegin', USPSliderMarkup);
          Exp.cache.TP091SliderParent = $('.TP091-USP-Wrapper');
          Exp.cache.bodyVar.querySelector('.landing_wrap').className = 'TP091_landing_wrap';
          Exp.cache.bodyVar.querySelector('.TP091-USP-Wrapper').classList.add('TP091_landing_slider');
          Exp.cache.bodyVar.querySelector('.TP091_landing_slider').classList.remove('landing_slider');
          Exp.cache.TP091SliderParent.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            arrows: false,
            dots: false,
            autoplay: true,
          });
        });

        // Assign selectors
        Exp.cache.tradeAccountContainer = $('.TP091-Trade-Container');
        Exp.cache.topCategory2 = $('.TP091-Top-Category-Wrap-2');
        Exp.cache.topCategory3 = $('.TP091-Top-Category-Wrap-3');
        Exp.cache.viewMoreCategory = $('.TP091-Top-Categories-View-More');
        Exp.cache.tradeAccountButton = Exp.cache.bodyVar.querySelector('.TP091-Trade-Account-Area-Button');
        Exp.cache.offersButton = Exp.cache.bodyVar.querySelector('.TP091-Show-Offers-Button');
        Exp.cache.offersContainer = $('.TP091-Offers-Container');
        // Move carousel and top picks to top offers
        Exp.cache.bodyVar.querySelector('.TP091-Offers-Carousel').insertAdjacentElement('afterbegin', Exp.cache.offersCarousel);
        for (let i = 0; i < Exp.cache.topPicks.length; i += 1) {
          Exp.cache.bodyVar.querySelector('.TP091-Top-Picks').insertAdjacentElement('beforeend', Exp.cache.topPicks[i]);
        }
        // Elements ready, build functions
        this.setupFunctions();
        this.setupTracking();
        // Offers container slides up after test build, else carousel won't display properly
        Exp.cache.offersContainer.slideUp();
        const hide = document.getElementById('TP091_flickerPrevention');
        hide.parentElement.removeChild(hide);
      },
      setupFunctions() {
        // View more category function
        Exp.cache.viewMoreCategory.click(() => {
          // Check if the second set of categories are visible, if they are not visible show them
          // If second category set is visible, show the final set
          if (!Exp.cache.topCategory2.is(':visible')) {
            events.send('TP091', 'Click', 'More Categories', { sendOnce: true });
            Exp.cache.topCategory2.slideDown();
          } else {
            Exp.cache.topCategory3.slideDown();
            events.send('TP091', 'Click', 'All Categories Visible', { sendOnce: true });
            // Hide view more categories link
            Exp.cache.viewMoreCategory.hide();
          }
        });
        // Offers button functionality
        Exp.cache.offersButton.addEventListener('click', () => {
          events.send('TP091', 'Click', 'Offers', { sendOnce: true });
          // Check if the container is visible
          if (!Exp.cache.offersContainer.is(':visible')) {
            // Check if class exists to change button styling
            if (Exp.cache.offersButton.classList.contains('TP091-Fade-Out')) {
              // Remove class if found
              Exp.cache.offersButton.classList.toggle('TP091-Fade-Out');
            }
            // Slide up other container
            Exp.cache.tradeAccountContainer.slideUp();
            // Add class to non-selected button
            Exp.cache.tradeAccountButton.classList.toggle('TP091-Fade-Out');
            // Slide down container of clicked button
            Exp.cache.offersContainer.slideDown();
          } else {
            // If the button is clicked and container is visible, hide container
            Exp.cache.offersContainer.slideUp();
            // Remove styling class of other button if exists
            if (Exp.cache.tradeAccountButton.classList.contains('TP091-Fade-Out')) {
              Exp.cache.tradeAccountButton.classList.toggle('TP091-Fade-Out');
            }
          }
        });
        // Trade account functionality - same as offers button functinality
        Exp.cache.tradeAccountButton.addEventListener('click', () => {
          events.send('TP091', 'Click', 'Trade Account Area', { sendOnce: true });
          if (!Exp.cache.tradeAccountContainer.is(':visible')) {
            if (Exp.cache.tradeAccountButton.classList.contains('TP091-Fade-Out')) {
              Exp.cache.tradeAccountButton.classList.toggle('TP091-Fade-Out');
            }
            Exp.cache.offersContainer.slideUp();
            Exp.cache.offersButton.classList.toggle('TP091-Fade-Out');
            Exp.cache.tradeAccountContainer.slideDown();
          } else {
            Exp.cache.tradeAccountContainer.slideUp();
            if (Exp.cache.offersButton.classList.contains('TP091-Fade-Out')) {
              Exp.cache.offersButton.classList.toggle('TP091-Fade-Out');
            }
          }
        });
      },
      setupTracking() {
        // setup element tracking
        // Search Use
        $('#searchForm').submit(() => {
          events.send('TP091', 'Search', 'Search Submitted', { sendOnce: true });
        });
        // Menu/Nav open
        Exp.cache.bodyVar.querySelector('#headerItem0').addEventListener('click', () => {
          events.send('TP091', 'Click', 'Menu/Navigation Opened', { sendOnce: true });
        });
        // Offers carousel
        $('.flexslider.slider_component > .flex-viewport > .slides > .yCmsComponent .ui-link').click(() => {
          events.send('TP091', 'Click', 'Offers Carousel: Banner', { sendOnce: true });
        });
        // Top picks
        $('.TP091-Top-Picks .product_link.ui-link').click(() => {
          events.send('TP091', 'Click', 'Offers Carousel: Products', { sendOnce: true });
        });
        // Categories
        $('.TP091-Top-Category-Link').click((e) => {
          const TP091Category = $(e.target).closest('.TP091-Top-Category-Container').find('.TP091-Top-Category-Text').text();
          events.send('TP091', 'Click', `Category: ${TP091Category}`, { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};
// If login or register buttons are used on homepage, scroll to area
export const runLogin = () => {
  const $ = window.jQuery;
  const Exp = {
    init() {
      // Check pathname for query string
      if (window.location.search.indexOf('?TP091Login') > -1) {
        // If query string found, wait before scrolling
        setTimeout(() => {
          $('html, body').animate({ scrollTop: $('#loginSection').offset().top - 50 });
        }, 700);
      }
      // Same as above
      if (window.location.search.indexOf('?TP091Register') > -1) {
        setTimeout(() => {
          $('html, body').animate({ scrollTop: $('#registerSection').offset().top - 150 });
        }, 700);
      }
    },
  };

  Exp.init();
};
