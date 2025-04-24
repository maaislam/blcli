/**
 * Page template
 */
import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { getData } from "./data";

 
 const { ID } = shared;
 
 export default class PageContent {
     constructor() {
         this.create();
         this.render();
     }
 
     create() {
 
         const brand = window.digitalData.product[0].productInfo.brand;

         // Get all the product data
         const productSKU = window.digitalData.product[0].productInfo.masterSku;
         const productObj = getData(productSKU);
 
         const element = document.createElement('div');
         element.classList.add(`${ID}__pageContent`);
         element.innerHTML =
             `<div class="${ID}__productDetails ${ID}__row">
                 <div class="${ID}__col-left ${ID}__mainProductSlider">
                     <div class="swiper-container">
                         <div class="swiper-wrapper"></div>
                         <div class="swiper-pagination ${ID}__sliderPagination"></div>
                     </div>
                     <div class="${ID}__swiperArrow swiper-button-prev"></div>
                     <div class="${ID}__swiperArrow swiper-button-next"></div>
                 </div>
                 <div class="${ID}__col-right ${ID}__mainProductInfo"></div>
             </div>
             
             <div class="${ID}__usps">
                 <div class="${ID}__row">
                     <div class="swiper-container">
                         <div class="swiper-wrapper">
                         </div>
                     </div>
                 </div>
             </div>
 
             <div class="${ID}__section ${ID}__description">
                 <div class="${ID}__sectionContainer">
                     <div class="${ID}__logo" style="background-image:url(${productObj.brandLogo})"></div>
                     <h3 class="${ID}__heading">${productObj.section1Title}</h3>
                     <div class="${ID}__productParagraph">
                     <p class='SG168__paragraph'>Made for those on-the-go with an adventurous spirit, the Fossil Gen 6 smartwatch will help you kick start your day – wherever it takes you. Customise the full-round display and three buttons with your fave features to personalise your dial, from tracking your heart rate and daily steps, to seeing how well your body is circulating oxygen, to switching-up your music and receiving text, email and social network pings from your smartphone.</p>
                     <p class='SG168__paragraph'>With the Snapdragon Wear 4100+ platform that allows for faster app loading and rapid charging (80% in a little over 30 minutes), it's faster processor and lower power consumption versus the Gen 5 range, you can now even make payments, explore fitness Apps and answer calls directly when your phone is out of reach - love it!</p>
                     <p class='SG168__paragraph SG168__moreText'>
                     Coming through with serious style points - always, this beautiful watch comes in sleek rose gold-tone, and works a crystal encrusted dial frame with an extra shimmer of crystals along the bracelet - it was made to sparkle. Smartwatches built with Wear OS by Google™ are compatible with iPhone® and Android™ phones.
                    </p>
                     <div class="${ID}__textLink">Read more</div></div>
                 </div>
             </div>
 
             <div class="${ID}__section ${ID}__parallax" style="background-image:url(${productObj.parallax1image})"></div>
 
             <div class="${ID}__section ${ID}__back_front">
                 <div class="${ID}__sectionContainer">
                     <h3 class="${ID}__heading">${productObj.section2Title}</h3>
                     <p class="${ID}__paragraph">${productObj.section2Content}</p>
                 </div>
                 <div class="${ID}-video">
                     <video width="500" height="500" controls>
                         <source src="${productObj.video}"  type="video/mp4"/>
                         <source src="${productObj.video}"  type="video/webm"/>
                     </video>
                 </div>
             </div>
 
             <div class="${ID}__section ${ID}__features">
                 <div class="${ID}__sectionContainer">
                     <h3 class="${ID}__heading">${productObj.featuresTitle}</h3>
                     <p class="${ID}__paragraph">${productObj.featuresContent}</p>
                 </div>
                 <div class="${ID}__sectionCarousel">
                     <div class="swiper-container">
                         <div class="swiper-wrapper">
                             <div class="swiper-slide ${ID}__slide" style="background-image:url(${productObj.featureImage1})">
                                 <span class="${ID}__featureCaption">${productObj.featureImage1Caption}</span>
                             </div>
                             <div class="swiper-slide ${ID}__slide" style="background-image:url(${productObj.featureImage2})">
                                 <span class="${ID}__featureCaption">${productObj.featureImage2Caption}</span>
                             </div>
                             <div class="swiper-slide ${ID}__slide" style="background-image:url(${productObj.featureImage3})">
                                 <span class="${ID}__featureCaption">${productObj.featureImage3Caption}</span>
                             </div>
                             <div class="swiper-slide ${ID}__slide" style="background-image:url(${productObj.featureImage4})">
                                <span class="${ID}__featureCaption">${productObj.featureImage4Caption}</span>
                            </div>
                            <div class="swiper-slide ${ID}__slide" style="background-image:url(${productObj.featureImage5})">
                                <span class="${ID}__featureCaption">${productObj.featureImage5Caption}</span>
                            </div>
                         </div>
                         <div class="swiper-button-prev ${ID}__slide_prev ${ID}__slide_arrow"></div>
                         <div class="swiper-button-next ${ID}__slide_next ${ID}__slide_arrow"></div>
                         <div class="swiper-pagination ${ID}__sliderPagination"></div>
                     </div>
                 </div>
             </div>
 
             <div class="${ID}__section ${ID}__parallax" style="background-image:url(https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/8965b700-4eb8-11ec-b211-2af50f405288)"></div>
 
             <div class="${ID}__section ${ID}__specs">
                 <div class="${ID}__sectionContainer">
                     <div class="${ID}__specification_wrapper ${ID}__row">
                         <h3 class="${ID}__heading">Technical Specifications</h3>
                     </div>
                     <div class="${ID}__specificationImage" style="background-image:url(${productObj.specImage})"></div>
                 </div>
             </div>
 
             <div class="${ID}__section ${ID}__range">
                 <div class="${ID}__sectionContainer">
                     <h3 class="${ID}__heading">Explore the range</h3>
                     <p class="${ID}__paragraph">${productObj.rangeText}</p>
                 </div>
                 <div class="${ID}__sectionCarousel">
                     <div class="swiper-container">
                         <div class="swiper-wrapper"></div>
                         <div class="swiper-button-prev ${ID}__slide_prev ${ID}__slide_arrow"></div>
                         <div class="swiper-button-next ${ID}__slide_next ${ID}__slide_arrow"></div>
                         <div class="swiper-pagination ${ID}__sliderPagination"></div>
                     </div>
                 </div>
             </div>`;
         this.component = element;
     }
 
     render() {
         const { component } = this;
         document.querySelector('#access-content').insertAdjacentElement('afterbegin', component);
 
         // read more on mobile
         if (window.innerWidth < 767) {
             const readMoreLink = document.querySelector(`.${ID}__textLink`);
             const hiddenText = document.querySelector(`.${ID}__paragraph.${ID}__moreText`);
             readMoreLink.addEventListener('click', () => {
                 hiddenText.classList.add(`${ID}__showAll`);
                 readMoreLink.style.display = 'none';
             });
         }
 
 
         // move existing elements
         const productInfo = document.querySelector('.detail-page__right-column');
         component.querySelector(`.${ID}__mainProductInfo`).appendChild(productInfo);

 
         if (window.innerWidth <= 767) {
             const featureSlider = new Swiper(`.${ID}__features .swiper-container`, {
                 direction: 'horizontal',
                 loop: true,
                 effect: 'fade',
                 observer: true,
                 observeParents: true,
                 paginationClickable: true,
                 pagination: {
                    el: `.${ID}__features .swiper-pagination`,
                    clickable: true,
                },
                navigation: {
                    nextEl: `.${ID}__features .swiper-button-next.${ID}__slide_next`,
                    prevEl: `.${ID}__features .swiper-button-prev.${ID}__slide_prev`,
                },
             });
 
             featureSlider.on('slideChange', function () {
                fireEvent('Interacted with feature carousel', true);
             });
 
         } else {
 
             const featureDesktop = new Swiper(`.${ID}__features .swiper-container`, {
                 direction: 'horizontal',
                 loop: true,
                 observer: true,
                 observeParents: true,
                 paginationClickable: true,
                 pagination: {
                    el: `.${ID}__features .swiper-pagination`,
                    clickable: true,
                },
                 navigation: {
                     nextEl: `.${ID}__features .swiper-button-next.${ID}__slide_next`,
                     prevEl: `.${ID}__features .swiper-button-prev.${ID}__slide_prev`,
                 },
                 slidesPerView: 3,
                 spaceBetween: 30,
                 breakpoints: {
                     320: {
                         slidesPerView: 1,
                         spaceBetween: 5
                     },
                     768: {
                         slidesPerView: 2,
                         spaceBetween: 20,
                     },
                     1024: {
                         slidesPerView: 3,
                         spaceBetween: 30,
                     },
                 },
             });
             if(featureDesktop) {
                 featureDesktop.on('slideChange', function () {
                     fireEvent('Interacted with feature carousel', true);
                });
             }
         }
     }
 }
 