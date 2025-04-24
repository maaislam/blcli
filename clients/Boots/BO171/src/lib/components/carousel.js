import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import { globalGetScript, pollerLite } from "../../../../../../lib/utils";
import { carouselProducts, testType } from "../helpers";

const { ID } = shared;
const type = testType('stargift');

export default class ProductCarousel {
  
    constructor() {
      ProductCarousel.loadSlider(() => {
        this.create();
        this.bindEvents();
        this.render();
      });
    }
  
    create() {

      const element = document.createElement('div');
      element.classList.add(`${ID}_carousel`);
      element.classList.add(`${ID}-${type.name}`);
      element.setAttribute('style', `background-image: url(${type.carouselbg})`);
      element.innerHTML = `
        <h4>${type.title}</h4>
       <div class="${ID}-products"></div>`;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;
      document.querySelector('.oct-grid__row.oct-grid__row--full-width .oct-grid.oct-aem-grid .oct-grid__row.oct-grid__row--full-width').insertAdjacentElement('afterend', component);
      
      // add products
      const url = type.url;
      carouselProducts(url);

      // show carousel
      pollerLite([`.${ID}-carouselProduct`], () => {
        component.classList.add('visible');

        const runSlick = () => {
          window.jQuery(`.${ID}-products`).slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            mobileFirst: true,
            responsive: [
              {
              breakpoint: 1200,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
                draggable: false,
              }
              },
              {
                breakpoint: 1100,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                }
              },
              {
                breakpoint: 280,
                settings: "unslick"
              }
            ]
          });
        }
        if(window.innerWidth >= 1024) {
          runSlick();
        }

        window.addEventListener('resize', () => {
          if(window.innerWidth >= 1024) {
            runSlick();
          } else {
            window.jQuery(`.${ID}-products`).slick('unslick');
          }
        });


        // events
        const allProducts = document.querySelectorAll(`.${ID}-carouselProduct`);
        for (let index = 0; index < allProducts.length; index++) {
          const element = allProducts[index];
          element.querySelector('a').addEventListener('click', () => {
            fireEvent('Clicked product in carousel ' + type.name);
          });

          element.querySelector(`.${ID}-shopCTA`).addEventListener('click', () => {
            fireEvent('Clicked product in carousel ' + type.name);
          })
        }

      });
    }

    /**
   * Load slider from CDN then run callback
   * @param {function} callback
   */
    static loadSlider(callback) {
      // Load JS
      globalGetScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js')
        .then(() => {
          if (typeof callback === 'function') {
            callback();
          }
        });

      // Load CSS
      document.head.insertAdjacentHTML("beforeend", `<link type="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"/>`);
    }

  }