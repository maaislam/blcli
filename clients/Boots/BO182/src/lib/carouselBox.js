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
       
        <div class="${ID}-modalInner ${ID}-swiper">
          <div class="${ID}-topBar">
            <div class="${ID}-progessPagination swiper-pagination"></div>
            <div class="${ID}-socialTitle"></div>
          </div>
          <div class="swiper-wrapper">
          </div>
          <div class="${ID}-swiperNext swiper-button-next"></div>
          <div class="${ID}-swiperPrev swiper-button-prev"></div>
        </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
        const { component } = this;
       
        document.querySelector(`.${ID}-close`).addEventListener('click', () => {
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
