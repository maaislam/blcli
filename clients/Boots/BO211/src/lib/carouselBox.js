import shared from "../../../../../core-files/shared";
import { closeCarousel } from "./helpers";

const { ID } = shared;

export default class SocialCarousel {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-carouselModal`);

      element.innerHTML = `
        <div class="${ID}-modalInner">
          <div class="${ID}-swiper swiper-container image-carousel">
            <div class="${ID}-topBar">
              <div class="${ID}-progessPagination swiper-pagination"></div>
              <div class="${ID}-socialTitle"></div>
              <div class="${ID}-close"></div>
            </div>
            <div class="swiper-wrapper">
            </div>
            <div class="${ID}-swiperNext swiper-button-next"></div>
            <div class="${ID}-swiperPrev swiper-button-prev"></div>
          </div>
        </div>
        <div class="${ID}-bestSellers">
          <h4>Best sellers</h4>
          <div class="${ID}-swiper">
            <div class="swiper-wrapper"></div>
          </div>
          <div class="${ID}-swiperNext swiper-button-next"></div>
          <div class="${ID}-swiperPrev swiper-button-prev"></div>
        </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
        const { component } = this;
       
        component.querySelector(`.${ID}-close`).addEventListener('click', () => {
          closeCarousel();
        });
        document.querySelector(`.${ID}-overlay .${ID}-close`).addEventListener('click', () => {
            closeCarousel();
        });
        
        document.querySelector(`.${ID}-overlay`).addEventListener('click', () => {
         closeCarousel();
        });
    }
  
    render() {
        const { component } = this;
        document.body.appendChild(component);
    }

  }
