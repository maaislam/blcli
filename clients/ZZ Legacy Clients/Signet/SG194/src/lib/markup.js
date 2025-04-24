import shared from "../../../../../core-files/shared"
import { bestSellers, brandStory, ranges } from "./data";
import { carouselContent, initCarousel } from "./helpers";

const { ID } = shared;


export default class Markup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-brandPage`);
      element.innerHTML = `
            <section class="${ID}-banner">
                <div class="${ID}-container">
                    <div class="${ID}-banner-text">
                        <h1>Omega Watches</h1>
                        <p>OMEGA is one of the most iconic Swiss watch brands, offering a wide range of elegant and stylish models for both men and women. Whether you’re looking for a sophisticated dress watch or a rugged sports watch, OMEGA has a model to suit your lifestyle.</p>
                        <a href="https://www.ernestjones.co.uk/webstore/l/omega-watches/" class="${ID}-cta ${ID}-white">Shop all Omega</a>
                    </div>
                </div>
            </section>
            <section class="${ID}-categories">
                <div class="${ID}-container">
                    <div class="${ID}-heading-text">
                        <h2>Shop our signature styles</h2>
                        <p>With so many different options to choose from, OMEGA has a timepiece for every lifestyle. So take your time and explore the collections. You’re sure to find the perfect Swiss watch for you.</p>
                        <a href="https://www.ernestjones.co.uk/webstore/l/omega-watches/" class="${ID}-cta ${ID}-textLink">Shop all</a>
                    </div>
                    <div class="${ID}-carousel">
                        <div class="swiper-wrapper"></div>
                        <div class="${ID}-swiperNext swiper-button-next"></div>
                        <div class="${ID}-swiperPrev swiper-button-prev"></div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
            </section>
            <section class="${ID}-story">
                <div class="${ID}-container">
                    <div class="${ID}-carousel">
                        <div class="swiper-wrapper"></div>
                        <div class="${ID}-swiperNext swiper-button-next"></div>
                        <div class="${ID}-swiperPrev swiper-button-prev"></div>
                        <div class="${ID}-progessPagination swiper-pagination"></div>
                    </div>
                </div>
            </section>
            <section class="${ID}-bestSellers">
                <div class="${ID}-container">
                    <div class="${ID}-heading-text">
                        <h2>Best Sellers</h2>
                    </div>
                    <div class="${ID}-carousel">
                        <div class="swiper-wrapper"></div>
                        <div class="${ID}-swiperNext swiper-button-next"></div>
                        <div class="${ID}-swiperPrev swiper-button-prev"></div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
            </section>
            <section class="${ID}-ifc">
                <div class="${ID}-ifc-banner">
                    <div class="${ID}-banner-content">
                        <div class="${ID}-image"></div>
                        <div class="${ID}-banner-text">
                            <h3>0% APR up to 5 years interest free credit available</h3>
                            <p>Take advantage of our Interest Free Credit options. Treat yourself or give the gift they’ll remember forever with our Interest Free Credit.</p>
                            <a href="https://www.ernestjones.co.uk/payment/#credit" class="${ID}-cta ${ID}-white">Learn more</a>
                        </div>
                    </div>
                    <a href="https://www.ernestjones.co.uk/payment/#credit" class="${ID}-cta ${ID}-black ${ID}-mobile">Learn more</a>
                </div>
            </section>
            <section class="${ID}-video">
                <div class="${ID}-container">
                    <div class="${ID}-video-container">
                        <video controls="" controlslist="nodownload" class="${ID}-video-player" poster="//classic.cdn.media.amplience.net/i/ernestjones/1000x1000_MC34_B" preload="metadata"> <source src="//classic.cdn.media.amplience.net/v/ernestjones/Omega_MC24_Speedmaster38_1080x1350_22sec/webm_720p?protocol=https" type="video/webm"> <source src="//classic.cdn.media.amplience.net/v/ernestjones/Omega_MC24_Speedmaster38_1080x1350_22sec/mp4_720p?protocol=https" type="video/mp4"> </video>
                    </div>
                </div>
            </section>
            <section class="${ID}-content">
                <div class="${ID}-container">
                    <div class="${ID}-carousel">
                        <div class="swiper-wrapper"></div>
                        <div class="${ID}-swiperNext swiper-button-next"></div>
                        <div class="${ID}-swiperPrev swiper-button-prev"></div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
            </section>

      `;
      this.component = element;

      // add carousels
      carouselContent(ranges, element.querySelector(`.${ID}-categories .swiper-wrapper`));
      carouselContent(brandStory, element.querySelector(`.${ID}-story .swiper-wrapper`));
      carouselContent(bestSellers, element.querySelector(`.${ID}-bestSellers .swiper-wrapper`));

    
      // remove first content slot
      const firstCard = document.querySelector('.editorial-card-grid__container .card');
      firstCard.remove();

      // move content slots
      const contentSlots = document.querySelectorAll('.editorial-card-grid__container .card');
      for (let index = 0; index < contentSlots.length; index += 1) {
          const cardEl = contentSlots[index];
          cardEl.classList.add(`${ID}-slide`);
          cardEl.classList.add(`swiper-slide`);
          cardEl.querySelector('img').setAttribute('src', cardEl.querySelector('img').getAttribute('lazy-src'));
          
          const cardLink = cardEl.getAttribute('href');
          cardEl.querySelector('.card__caption').insertAdjacentHTML('beforeend', `<a href="${cardLink}" class="${ID}-cta ${ID}-black">Learn More</a>`);

          element.querySelector(`.${ID}-content .swiper-wrapper`).appendChild(cardEl);
      }
      
    
    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;
      document.querySelector('.hero-banner').insertAdjacentElement('beforebegin', component);

        if(typeof window.Swiper !== 'undefined') {


            // categories
            initCarousel(`.${ID}-categories .${ID}-carousel`, `.${ID}-categories .swiper-pagination`, `.${ID}-categories .${ID}-swiperNext`, `.${ID}-categories .${ID}-swiperPrev`,true,false, false);            
        
            // brand stories
            initCarousel(`.${ID}-story .${ID}-carousel`, `.${ID}-story .swiper-pagination`, `.${ID}-story .${ID}-swiperNext`, `.${ID}-story .${ID}-swiperPrev`, false, true, true);            

            // best sellers
            initCarousel(`.${ID}-bestSellers .${ID}-carousel`, `.${ID}-bestSellers .swiper-pagination`, `.${ID}-bestSellers .${ID}-swiperNext`, `.${ID}-bestSellers .${ID}-swiperPrev`, false, false, true);

           
        }
      
    }
  }