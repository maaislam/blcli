import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared"
import { bestSellers, brands } from "./data";
import { addTabContent, carouselContent, initCarousel, tabMarkup, tabSwitch } from "./helpers";


    const { ID, VARIATION } = shared;

    export default class Markup {
        constructor() {
          this.create();
          this.bindEvents();
          this.render();
        }
      
        create() {
          const element = document.createElement('div');
          element.classList.add(`${ID}-homepage`);
          element.innerHTML = `
          <section class="${ID}-banner">
          <a class="fullLink" href="https://www.ernestjones.co.uk/webstore/l/jewellery-new/"></a>
              <div class="${ID}-banner-text">
                ${VARIATION === '4' ? `
                  <h1>NEW ARRIVALS</h1>
                  <a href="https://www.ernestjones.co.uk/webstore/l/jewellery-new/" class="${ID}-cta ${ID}-black">Shop Now</a>
                ` : `
                  <h1>Omega Watches</h1>
                  <p>Discover Swiss craftsmanship and elegance. Shop one of the world's most prestigious watch brands, guaranteeing you a premium quality timepiece.</p>
                  <a href="https://www.ernestjones.co.uk/webstore/l/omega-watches/" class="${ID}-cta ${ID}-white">Shop Now</a>
                  `}
              </div>
          </section>
          <section class="${ID}-categories">
                <div class="${ID}-heading-text">
                    <h2>Shop our signature styles</h2>
                </div>
              <div class="${ID}-container">
                <div class="${ID}-ctas">
                    <a href="https://www.ernestjones.co.uk/webstore/l/watches/" class="${ID}-cta ${ID}-black">Watches</a>
                    <a href="https://www.ernestjones.co.uk/webstore/l/engagement-rings/" class="${ID}-cta ${ID}-black">Engagement</a>
                    <a href="https://www.ernestjones.co.uk/webstore/jewellery.do" class="${ID}-cta ${ID}-black">Jewellery</a>
                    <a href="https://www.ernestjones.co.uk/webstore/l/wedding-rings/" class="${ID}-cta ${ID}-black">Weddings</a>
                    <a href="https://www.ernestjones.co.uk/webstore/l/jewellery-new/" class="${ID}-cta ${ID}-black">New arrivals</a>
                    <a href="https://www.ernestjones.co.uk/webstore/diamonds.do" class="${ID}-cta ${ID}-black">Diamonds</a>
                </div>
              </div>
          </section>
          <section class="${ID}-brandBar">
            <div class="${ID}-carousel">
                <div class="swiper-wrapper"></div>
                <div class="${ID}-swiperNext swiper-button-next"></div>
                <div class="${ID}-swiperPrev swiper-button-prev"></div>
                <div class="swiper-pagination"></div>
            </div>
          </section>

          ${VARIATION === '1'|| VARIATION === '4' ? tabMarkup() : ''}

          ${VARIATION === '1' || VARIATION === '4' ? `<section class="${ID}-usps">
            <div class="${ID}-container">
              <div class="swiper-wrapper">
                <div class="${ID}-usp swiper-slide">
                  <span style="background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/9f1a53f2-ba3e-11ec-8430-ea461a631999)"></span>
                  <p>Upload a picture and shop! You can even use screenshots or photos from social media as inspiration.</p>
                </div>
                <div class="${ID}-usp swiper-slide">
                  <span style="background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/9e8f7b92-ba3e-11ec-9eb2-4289e2eab807)"></span>
                  <p>Free Delivery on orders over £40. Free Next Day Delivery over £500.</p>
                </div>
                <div class="${ID}-usp swiper-slide">
                  <span style="background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/9d0b8522-ba3e-11ec-8c2a-ae3c9bdeed48)"></span>
                  <p>Every single item in our fine jewellery collection has been sourced with integrity for your peace of mind.</p>
                </div>
                <div class="${ID}-usp swiper-slide">
                  <span style="background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/9de6b4d0-ba3e-11ec-ac18-ea461a631999)"></span>
                  <p>Confidence in buying with clearpay. Buy now pay later.</p>
                </div>
              </div>
            </div>
          </section>` : ''}

          ${VARIATION === '2' ? tabMarkup() : ''}

          ${VARIATION === '1' || VARIATION === '4' ? `
          <section class="${ID}-categoryGrid">
              <div class="${ID}-heading-text">
                <h2>Featured</h2>
                <p>Shop with confidence at the engagement ring specialists.</p>
              </div>
              <div class="${ID}-container">
                 ${VARIATION === '4' ? `
                 <div class="${ID}-block" style="background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/1f12b6ba-d503-11ec-bb99-5e8fff975618)">
                      <a href="https://www.ernestjones.co.uk/webstore/l/ladies-jewellery/?material.lvl0=yellow%20gold"></a>
                      <div class="${ID}-textBox">
                        <h3>Gold jewellery</h3>
                        <a href="https://www.ernestjones.co.uk/webstore/l/ladies-jewellery/?material.lvl0=yellow%20gold" class="${ID}-cta ${ID}-black">Shop</a>
                      </div>
                  </div>
                  <div class="${ID}-block" style="background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/8a497658-d503-11ec-bbc3-46a73b3cd513)">
                      <a href="https://www.ernestjones.co.uk/webstore/l/mens-jewellery/"></a>
                      <div class="${ID}-textBox">
                        <h3>Men’s jewellery</h3>
                        <a href="https://www.ernestjones.co.uk/webstore/l/mens-jewellery/" class="${ID}-cta ${ID}-black">Shop</a>
                      </div>
                  </div>
                  <div class="${ID}-block" style="background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/7f2ba7a6-c60c-11ec-ae62-9e900291ac83)">
                      <a href="https://www.ernestjones.co.uk/webstore/l/diamond-rings/"></a>
                      <div class="${ID}-textBox">
                        <h3>Diamond Rings</h3>
                        <a href="https://www.ernestjones.co.uk/webstore/l/diamond-rings/" class="${ID}-cta ${ID}-black">Shop</a>
                      </div>
                  </div>
                 ` : 
                 `<div class="${ID}-block" style="background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/7e94313c-c60c-11ec-999b-061afd0129c7)">
                      <a href="https://www.ernestjones.co.uk/webstore/l/solitaire-engagement-rings/"></a>
                      <div class="${ID}-textBox">
                        <h3>Solitaire Engagement Rings</h3>
                        <a href="https://www.ernestjones.co.uk/webstore/l/solitaire-engagement-rings/" class="${ID}-cta ${ID}-black">Shop</a>
                      </div>
                  </div>
                  <div class="${ID}-block" style="background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/a8d5b4b6-c60c-11ec-82b8-3ad35526edb6)">
                      <a href="https://www.ernestjones.co.uk/webstore/l/bridal-ring-sets/"></a>
                      <div class="${ID}-textBox">
                        <h3>Bridal Sets</h3>
                        <a href="https://www.ernestjones.co.uk/webstore/l/bridal-ring-sets/" class="${ID}-cta ${ID}-black">Shop</a>
                      </div>
                  </div>
                  <div class="${ID}-block" style="background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/7f2ba7a6-c60c-11ec-ae62-9e900291ac83)">
                      <a href="https://www.ernestjones.co.uk/webstore/l/halo-engagement-rings/"></a>
                      <div class="${ID}-textBox">
                        <h3>Halo Rings</h3>
                        <a href="https://www.ernestjones.co.uk/webstore/l/halo-engagement-rings/" class="${ID}-cta ${ID}-black">Shop</a>
                      </div>
                  </div>
                  `}
              </div>
          </section>` : ''}


          <section class="${ID}-bestSellers">
                <div class="${ID}-heading-text">
                    <h2>Trending products</h2>
                </div>
                <div class="${ID}-container">
                    <div class="${ID}-carousel">
                      <div class="swiper-wrapper"></div>
                  </div>
                  <div class="${ID}-swiperNext swiper-button-next"></div>
                      <div class="${ID}-swiperPrev swiper-button-prev"></div>
                      <div class="swiper-pagination"></div>
                </div>
          </section>`;

          this.component = element;

          // add tabs
          if(VARIATION == '1' || VARIATION === '2' || VARIATION === '4'){
            addTabContent("watches", element.querySelector(`.${ID}-tabContent[tab-data="watches"]`));
            addTabContent("New in", element.querySelector(`.${ID}-tabContent[tab-data="new"]`))
            addTabContent("engagement", element.querySelector(`.${ID}-tabContent[tab-data="engagement"]`))
            addTabContent("jewellery", element.querySelector(`.${ID}-tabContent[tab-data="jewellery"]`))
          }

    
          // add carousels
          carouselContent(bestSellers, element.querySelector(`.${ID}-bestSellers .swiper-wrapper`));
          carouselContent(brands, element.querySelector(`.${ID}-brandBar .swiper-wrapper`));

          // Change email sign up content
          const emailBox = document.querySelector('.email-sign-up');
          emailBox.querySelector('.email-sign-up__policy-label span').innerHTML = `I accept the privacy policy. You can read the privacy policy <a href="https://www.ernestjones.co.uk/privacy-policy/">here</a>`

          emailBox.querySelector('.email-sign-up__unsubscribe').insertAdjacentElement('beforebegin', emailBox.querySelector('.email-sign-up__text--small'));

          if(window.innerWidth >= 767) {
            emailBox.querySelector('input').insertAdjacentElement('afterend', emailBox.querySelector('.button.email-sign-up__submit'));
          }
          
          
        }
      
        bindEvents() {
          const { component } = this;

          // For changing tabs
          if(VARIATION == '1' || VARIATION === '2' || VARIATION === '4'){
            const allTabLinks = component.querySelectorAll(`.${ID}-tab`);
            for (let index = 0; index < allTabLinks.length; index++) {
                const element = allTabLinks[index];
                element.addEventListener('click', (e) => {
                    tabSwitch(e, e.currentTarget.getAttribute("tab-target"));
                    fireEvent('Clicked tab ' + e.currentTarget.textContent);
                })
            }
          }

          // Tracking
          const categoryButtons = component.querySelectorAll(`.${ID}-ctas .${ID}-cta`);
          for (let index = 0; index < categoryButtons.length; index++) {
            const element = categoryButtons[index];
            element.addEventListener('click', () => {
              const name = element.textContent;
              fireEvent('Clicked category ' + name);
            });
          }

          const bannerBlocks = component.querySelectorAll(`.${ID}-categoryGrid .${ID}-block`);
          if(bannerBlocks) {
            for (let index = 0; index < bannerBlocks.length; index++) {
              const element = bannerBlocks[index];
              element.querySelector('a').addEventListener('click', () => {
                const blockname = element.querySelector('h3').textContent;
                fireEvent('Clicked category block ' + blockname);
              });

              element.querySelector(`.${ID}-cta`).addEventListener('click', () => {
                const blockctaname = element.querySelector('h3').textContent;
                fireEvent('Clicked category block ' + blockctaname);
              });
            }
          }

          component.querySelector(`.${ID}-banner-text .${ID}-cta`).addEventListener('click', () => {
            fireEvent('Clicked banner CTA');
          });

          component.querySelector(`.${ID}-banner-text .${ID}-cta`).addEventListener('click', () => {
            fireEvent('Clicked banner CTA');
          });


        }
      
        render() {
          const { component } = this;
          document.querySelector('#access-content').insertAdjacentElement('beforebegin', component);
    
            if(typeof window.Swiper !== 'undefined') {
                initCarousel(`.${ID}-brandBar .${ID}-carousel`, `.${ID}-brandBar .swiper-pagination`, `.${ID}-brandBar .${ID}-swiperNext`, `.${ID}-brandBar .${ID}-swiperPrev`);
            }
          
        }
      }

   

    

