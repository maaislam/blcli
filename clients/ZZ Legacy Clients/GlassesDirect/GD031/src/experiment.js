import { fullStory, events } from '../../../../lib/utils';
import GD017 from './lib/GD017';
import getProducts from './lib/getProducts';
import getLastPrice from './lib/getLastPrice';
import getName from './lib/getName';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * {{GD031}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'GD031',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // // Dont run if not logged in.
    // if (document.getElementById('nav-login')) {
    //   return false;
    // }
    let $ = null;
    $ = window.jQuery;
    
    const { settings, services, components } = Experiment;
    
    // Setup
    if (!document.querySelector('.GD017')) {
      GD017();
    }
    pollerLite([
      '.GD017 .GD017_link-inner .GD017_reveal-hover',
    ], () => {
      services.tracking();
      document.body.classList.add(settings.ID);
      let homePageRef = document.querySelector('.t165-b-cont.desktop');
      if (!homePageRef) {
        homePageRef = document.querySelector('#content');
      }
      let usersName = '';
      getName((name) => {
        usersName = name;
      });
      getLastPrice((price, name) => {
        getProducts(price, (productsArr) => {
          const html = components.buildHTML(productsArr, name, usersName);
          services.addToPage(homePageRef, html, 'beforebegin');
          if ($.fn.slick) {
            services.runSlick();
          } else {
            $.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', services.runSlick);
          }
          services.addTracking();
        });
      });
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
    addToPage(ref, html, position) {
      if (ref && html) {
        ref.insertAdjacentElement(position, html);
      }
    },
    runSlick() {
      $('.GD031-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        prevArrow: "<button type='button' class='slick-prev slick-arrow'>❮</button>",
        nextArrow: "<button type='button' class='slick-next slick-arrow'>❯</button>",
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
        ],
      });
    },
    addTracking() {
      events.send(Experiment.settings.ID, 'Saw', 'User saw this module');
      const addedProducts = document.querySelectorAll('.GD031-welcome .product a');
      const clickTrack = (element) => {
        element.addEventListener('click', () => {
          events.send(Experiment.settings.ID, 'Click', 'User clicked a recommended product');
        });
      };
      if (addedProducts.length > 0) {
        Array.from(addedProducts).forEach((product) => {
          clickTrack(product);
        });
      }
    },
  },

  components: {
    buildHTML(productsArr, productName, usersName) {
      const html = document.createElement('div');
      html.classList.add('GD031-welcome');

      if (productsArr) {
        // Add previous product title
        if (productName) {
          html.innerHTML = `
            <div class="GD031-welcome-back">
              <h1>Welcome back ${usersName}! Did you like your <br />${productName} glasses?</h1>
  
              <p>Why not try a new look:</p>
            </div>
            <div class="GD031-slider fr_carousel"></div>
          `;
        }
        productsArr.forEach((product) => {
          if (product.name && product.image && product.link && product.rating) {
            const element = `
              <div class="product imagecontainer" style="width: 100%; display: inline-block;">
                <div class="product_name"><a href="${product.link}" tabindex="-1"><strong>${product.brand.innerHTML}</strong> ${product.name.innerHTML}</a></div>
                <div class="product_price"><a href="${product.link}" tabindex="-1">${product.price}</a></div>
                <div class="product_image">
                  <a href="${product.link}" tabindex="-1">
                    ${product.image.outerHTML}
                  </a>
                </div>
                <div class="product_rating">
                  ${product.rating.outerHTML}
                </div>
                <div class="product_cta"><a href="${product.link}" tabindex="-1">SHOP NOW</a></div>
              </div>
            `;
            html.querySelector('.GD031-slider').insertAdjacentHTML('beforeend', element);
          }
        });
      }
      return html;
    },
  },
};

export default Experiment;
