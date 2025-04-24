import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { banners, bestSellers, brands, categories, usps } from "./data";
import { bannerCarousel, productsCarousel, smallCarouselContent } from "./helpers";
import { tabMarkup, tabSwitch } from "./tabs";

const { ID, VARIATION } = shared;


export default class Markup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {

      const element = document.createElement('div');
      element.className = `${ID}-homepage`;
      element.innerHTML = `

      <section class="${ID}-categories">
        <div class="${ID}-container">
          <div class="${ID}-carousel">
              <div class="swiper-wrapper">
              </div>
          </div>
          <div class="${ID}-swiperNext swiper-button-next"></div>
          <div class="${ID}-swiperPrev swiper-button-prev"></div>
        </div>
      </section>
      <section class="${ID}-banners">
        <div class="${ID}-container">
          <div class="${ID}-carousel">
              <div class="swiper-wrapper">
              ${bannerCarousel()}
              </div>
              <div class="${ID}-swiperNext swiper-button-next"></div>
              <div class="${ID}-swiperPrev swiper-button-prev"></div>
          </div>
          ${VARIATION === '1' ? 
          `<div class="${ID}-offer">
              <h1>Up to half price Christmas Collection</h1>
              <a href="https://www.hsamuel.co.uk/webstore/l/?on_sale_calc=true" class="${ID}-cta primary">Shop Now</a>
          </div>` : ''}
        </div>
      </section>

      ${VARIATION === '2' ? 
      `<section class="${ID}-bestsellers">
        <div class="${ID}-container">
          <h2>Our bestsellers</h2>
          <div class="${ID}-carousel">
              <div class="swiper-wrapper"></div>
          </div>
          <div class="${ID}-swiperNext swiper-button-next"></div>
          <div class="${ID}-swiperPrev swiper-button-prev"></div>
        </div>
      </section>` : ''}

      <section class="${ID}-brands">
        <div class="${ID}-container">
          <div class="${ID}-carousel">
              <div class="swiper-wrapper"></div>
              <div class="${ID}-swiperNext swiper-button-next"></div>
              <div class="${ID}-swiperPrev swiper-button-prev"></div>
          </div>
        </div>
      </section>
      ${VARIATION === '1' ? `<section class="${ID}-bestsellers">
        <div class="${ID}-container">
          <h2>Our bestsellers</h2>
          <div class="${ID}-carousel">
              <div class="swiper-wrapper"></div>
          </div>
          <div class="${ID}-swiperNext swiper-button-next"></div>
          <div class="${ID}-swiperPrev swiper-button-prev"></div>
        </div>
      </section>` : ''}

      ${VARIATION === '1' ? tabMarkup() : ''}

      ${VARIATION === '1' ? 
        `<section class="${ID}-contentspots-small">
        <div class="${ID}-container">
            <div class="${ID}-block">
                <div class="${ID}-image" style="background-image:url(https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/ee4f0ad8-4a2d-11ed-b48e-b60ef4d4b576)">
                <a href="https://www.hsamuel.co.uk/about_us/"></a>
                </div>
                <div class="${ID}-block-text">
                    <h2 class="alternate">Meet Harriet Samuel.
                    </h2>
                    <p class="text-large">Way back in 1862, a woman named Harriet opened a little shop selling gems, jewels and watches. Learn more about the Woman Behind The H.</p>
                    <a href="https://www.hsamuel.co.uk/about_us/" class="${ID}-cta primary">Learn more</a>
                </div>
            </div>
            <div class="${ID}-block">
            <div class="${ID}-image" style="background-image:url(https://cdn.media.amplience.net/i/hsamuel/HS2202B02_EngagementRingTrends_FadorFruture_proof_1000x1000_ListPage?w=1000&fmt=webp)">
              <a href="https://www.hsamuel.co.uk/webstore/blog/engagement-ring-trends-fad-or-future-proof/"></a>
            </div>
                <div class="${ID}-block-text">
                    <h2 class="alternate">Engagement ring trends</h2>
                    <p class="text-large">We couldn’t help but wonder: For something meant to last a lifetime, should engagement ring trends be a thing?</p>
                    <a href="https://www.hsamuel.co.uk/webstore/blog/engagement-ring-trends-fad-or-future-proof/" class="${ID}-cta primary">Learn more</a>
                </div>
            </div>
            <div class="${ID}-block">
            <div class="${ID}-image" style="background-image:url(https://cdn.media.amplience.net/i/hsamuel/HS2210WC03_Christmas_Category_cards_1342x1050_shot6_1)">
                <a href="https://www.hsamuel.co.uk/webstore/blog/christmas/"></a>
            </div>
                <div class="${ID}-block-text">
                    <h2 class="alternate">Christmas Gift Shop</h2>
                    <p class="text-large">Your festive gift shop is open. Get inspired with come-true gifts for every wish. We're here to help tick everyone off your gift list.</p>
                    <a href="https://www.hsamuel.co.uk/christmas/" class="${ID}-cta primary">Shop Now</a>
                </div>
            </div>
        </div>
      </section>

      <section class="${ID}-usps">
          <div class="${ID}-container">
            <div class="${ID}-carousel">
              <div class="swiper-wrapper"></div>
              <div class="${ID}-swiperNext swiper-button-next"></div>
              <div class="${ID}-swiperPrev swiper-button-prev"></div>
            </div>
          </div>
        </section>` : ''}

        <section class="${ID}-brand-content">
        </section>`;
      
     this.component = element;

      const emailBox = document.querySelector('.email-sign-up');
      emailBox.querySelector('.email-sign-up__policy-label span').innerHTML = `I accept the privacy policy. You can read the privacy policy <a href="https://www.ernestjones.co.uk/privacy-policy/">here</a>`
      emailBox.querySelector('.email-sign-up__text--small').innerHTML = `
      Exclusions apply - 
      <a class="email-sign-up__link-interaction" href="/terms/">see terms and conditions</a> 
      for details. If you wish to unsubscribe from our emails please 
      <a href="/webstore/secure/responsys/unsubscribe.sdo" class="email-sign-up__link">click here</a>`;
      emailBox.querySelector('.email-sign-up__unsubscribe').insertAdjacentElement('beforebegin', emailBox.querySelector('.email-sign-up__text--small'));

      if(window.innerWidth >= 767) {
        emailBox.querySelector('input').insertAdjacentElement('afterend', emailBox.querySelector('.button.email-sign-up__submit'));
      }

      element.insertAdjacentElement('beforeend', emailBox);

      const brandSection = element.querySelector(`.${ID}-brand-content`);
      const firstBanner = document.querySelectorAll('.single-image-block')[1];
      const fullBanner = document.querySelectorAll('.single-image-block')[2];
      const brandBlocks = document.querySelectorAll('.card-grid.card-grid--3-cards')[1];
      if(firstBanner) {
        brandSection.appendChild(firstBanner);
      }
      if(brandBlocks) {
        brandSection.appendChild(brandBlocks);
      }
      if(fullBanner) {
        brandSection.appendChild(fullBanner);
      }
      


     // categories
     smallCarouselContent(categories, element.querySelector(`.${ID}-categories .swiper-wrapper`));

     // banners
    //  bannerCarousel(banners, element.querySelector(`.${ID}-banners .swiper-wrapper`));

     // brand bar
     smallCarouselContent(brands, element.querySelector(`.${ID}-brands .swiper-wrapper`));

     // best sellers
     productsCarousel(bestSellers, element.querySelector(`.${ID}-bestsellers .swiper-wrapper`));

     // usps
     if(VARIATION === '1') {
      smallCarouselContent(usps, element.querySelector(`.${ID}-usps .swiper-wrapper`));
     }
 
    }
  
    bindEvents() {
      const { component } = this;

      if(VARIATION == '1'){
        const allTabLinks = component.querySelectorAll(`.${ID}-tab`);
        for (let index = 0; index < allTabLinks.length; index++) {
            const element = allTabLinks[index];
            element.addEventListener('click', (e) => {
                tabSwitch(e, e.currentTarget.getAttribute("tab-target"));
                fireEvent('Clicked tab ' + e.currentTarget.textContent);
            })
        }
      }

    }
  
    render() {
      const { component } = this;
      document.querySelector('#access-content').insertAdjacentElement('beforebegin', component);
    }
  }





