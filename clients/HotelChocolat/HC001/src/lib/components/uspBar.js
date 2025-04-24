import shared from "../shared";
import { events } from "../../../../../../lib/utils";

const { ID, VARIATION } = shared;

export default class USPS {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-uspBar`);
      element.innerHTML = `
        <div class="${ID}-uspContainer">
            <div class="${ID}-usp">
                <a href="https://www.hotelchocolat.com/uk/help/delivery.html">
                  <span class="${ID}-delivery"></span>
                  <p>Free Delivery when you spend over £45</p>
                </a>
            </div>
            <div class="${ID}-usp">
              <a href="https://www.hotelchocolat.com/uk/help/our-guarantee.html">
                <span class="${ID}-happiness"></span>
                <p>We promise 100% happiness guaranteed</p>
              </a>
            </div>
            <div class="${ID}-usp">
                <a href="https://www.hotelchocolat.com/uk/help/delivery.html">
                  <span class="${ID}-clickCollect"></span>
                  <p>Free click & collect from UK locations</p>
                </a>
            </div>
        </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;
      document.querySelector('#navigation').insertAdjacentElement('afterend', component);
    

      // slick the carousel 
      if(document.querySelector(`.${ID}-usp`)) {
        window.jQuery(`.${ID}-uspContainer`).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 5000,
            mobileFirst: true,
            responsive: [
                {
                  breakpoint: 767,
                  settings: 'unslick',
                },
              ]
        });

        window.jQuery(`.${ID}-uspContainer`).on('swipe', function(event, slick){
          events.send(`${ID} variation: ${VARIATION} - homepage`, 'usp bar', 'swiped on mobile');
        });

      }
    }
  }
  
