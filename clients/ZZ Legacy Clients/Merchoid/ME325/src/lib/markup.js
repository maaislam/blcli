import Swiper, { Autoplay, Navigation, Pagination } from "swiper";
import shared from "../../../../../core-files/shared";
//import { productData } from "./data";
import { countdown, createCarousel, scrollToElement } from "./helpers";

const { ID } = shared;

const url = window.location.pathname.replace(/\/$/, '');
const lastSeg = url.substring(url.lastIndexOf('/') + 1);
const data = window.MEdata[lastSeg];

//const data = productData[lastSeg];

export default class PageTemplate {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
      this.runCarousel();
    }
  
    create() {

        // existing elems
        const productName = document.querySelector('.page-title span').textContent.match(/:(.*)/)[1];
        const productPrice = document.querySelector('.price-wrapper');
        const addBlock = document.querySelector('.product-info-main');
        const productAccordion = document.querySelector('.product-secondary-tabs-wrapper');

        const detailsText = document.querySelector('.product-secondary-tabs__content.description-content p');
        const handSelectedText = document.querySelector('.product-secondary-tabs__content.description-content ul li');

        const element = document.createElement('div');
        element.classList.add(`${ID}-heroPage`);
        element.classList.add(`${ID}-${data.theme}`);
        //element.style = `background-color: ${data.backgroundColour}`;

        // Create markup
        element.innerHTML = 
        `<div class="${ID}-pageContainer">
            <div class="${ID}-section ${ID}-top">
            <div class="${ID}-merchlogo"><a href="/"></a></div>
                <div class="${ID}-left" style="background-image:url(${data.images.introProductImage})"></div>
                <div class="${ID}-right">
                    <div class="${ID}-titlebox">
                        <h1>${data.brand}</h1>
                        <p class="${ID}-name">${productName}</p>
                        <p class="${ID}-textBox-paragraph ${ID}--mobHide">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                        </p>
                        <div class="${ID}-titlebox-price">
                            ${productPrice.innerHTML}
                        </div>
                        <div class="${ID}-ctas">
                            <div class="${ID}-cta ${ID}--secondary">Learn More</div>
                            <div class="${ID}-cta ${ID}--primary">Buy Now</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="${ID}-section ${ID}-logo" style="background-image:url(${window.innerWidth <= 700 ? data.images.logoBackground : data.images.logoBackgroundDesktop})">
                <div class="${ID}-section-container">
                    <div class="${ID}-textBox">
                        <div class="${ID}-textBox-title">
                        ${data.content.logoContent}
                        </div>
                        <p class="${ID}-textBox-paragraph">
                            ${data.content.productDescription}
                        </p>
                    </div>
                </div>
            </div>
            <div class="${ID}-section ${ID}-details">
                <div class="${ID}-section-container">
                    <div class="${ID}-textBox">
                        <div class="${ID}-textBox-title">
                            The Details
                        </div>
                        <p class="${ID}-textBox-paragraph ${ID}--mobHide">
                            ${data.content.detailsText}
                        </p>
                        <div class="${ID}-cta ${ID}--primary ${ID}--mobHide">Buy it now</div>
                    </div>
                    <div class="${ID}-carousel">
                        <div class="${ID}-swiper">
                            <div class="swiper-wrapper">
                            </div>
                            <div class="${ID}-pagination swiper-pagination"></div>
                            <div class="${ID}-swiperNext swiper-button-next"></div>
                            <div class="${ID}-swiperPrev swiper-button-prev"></div>
                        </div>
                        </div>
                    <div class="${ID}-cta ${ID}--primary">Buy it now</div>
                </div>
            </div>
            <div class="${ID}-section ${ID}-quality">
                <div class="${ID}-section-container">
                    <div class="${ID}-left" style="background-image:url(${data.images.bottomProductimage})"></div>
                    <div class="${ID}-right">
                        <div class="${ID}-textBox">
                            
                            <p class="${ID}-textBox-paragraph">
                                ${detailsText.innerText}
                            </p>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="${ID}-section ${ID}-circles" style="background-image:url(${window.innerWidth <= 700 ? data.images.circlesBackground : data.images.circlesBackgroundDesktop})">
                <div class="${ID}-section-container">
                    <div class="${ID}-textBox">
                        <p class="${ID}-textBox-paragraph">
                            ${handSelectedText.innerText}
                        </p>
                    </div>
                    <div class="${ID}-circleBlocks"></div>
                    <div class="${ID}-cta ${ID}--primary">Buy now</div>
                </div>
            </div>
            <div class="${ID}-section ${ID}-ecom">
                <div class="${ID}-brandLogo" style="background-image:url(${data.images.brandLogo})"></div>
                <div class="${ID}-section-container">
                    <div class="${ID}-left"></div>
                    <div class="${ID}-right" style="background-image:url(${data.images.ecomImage})"></div>
                </div>
            </div>
            ${data.countdown.exists == true ? `
            <div class="${ID}-section ${ID}-countdown">
                <div class="${ID}-section-container">
                    <div class="${ID}-countdownImage" style="background-image:url(${data.countdown.backgroundimage})"><div class="${ID}-countdownLogo" style="background-image:url(${data.countdown.logo})"></div></div>
                    <div class="${ID}-countBlock">
                        <div class="${ID}-countdownLogo" style="background-image:url(${data.countdown.logo})"></div>
                        <div class="${ID}-countdownTimer"></div>
                        <p class="${ID}-countdownText">${data.countdown.text}</p>
                    </div>
                </div>
            </div>` : ''}
            <div class="${ID}-section ${ID}-accordion">
                <div class="${ID}-section-container"></div>
            </div>
           
        </div>
        `;

        /**
         *  <div class="${ID}-section ${ID}-usps">
                <div class="${ID}-section-container"></div>
            </div>
         */
        this.component = element;

        // add icon circles
        const circleData = data.bottomCircles;
        Object.keys(circleData).forEach((i) => {
            const circleEl = circleData[i];

            const circle = document.createElement('div');
            circle.classList.add(`${ID}-circleBlock`);
            circle.innerHTML = 
            `<div class="${ID}-circleBlock-circle">
                <span style="background-image:url(${circleEl.icon})"></span>
            </div>
            <p class="${ID}-circleBlock-text">${[i][0]}</p>`;

            element.querySelector(`.${ID}-circleBlocks`).appendChild(circle);
        });

        // add carousel
        createCarousel(data.featuresCarousel, element.querySelector(`.${ID}-carousel .swiper-wrapper`));

        // add to bag section
        element.querySelector(`.${ID}-ecom .${ID}-section-container .${ID}-left`).appendChild(addBlock);

        // add accordion
        element.querySelector(`.${ID}-accordion .${ID}-section-container`).appendChild(productAccordion);

        // move USPs
        // const uspsEl = document.querySelector('.merchoid-product-reasons');
        // uspsEl.classList.add(`${ID}-swiper`)
        // uspsEl.querySelector('.columns.small-12').classList.add(`swiper-wrapper`);
        // uspsEl.querySelector('.columns.small-12').classList.remove('columns');

        // const allUsps = uspsEl.querySelectorAll('.small-3');
        // allUsps.forEach(usp => {
        //     usp.classList.add('swiper-slide');
        // });

        // element.querySelector(`.${ID}-usps .${ID}-section-container`).appendChild(uspsEl);
    }

    bindEvents () {
        const { component } = this;

        // Scroll events
        const allBuyNow = component.querySelectorAll(`.${ID}-cta.${ID}--primary`);
        const learnMore = component.querySelector(`.${ID}-top .${ID}-cta.${ID}--secondary`);

        for (let index = 0; index < allBuyNow.length; index += 1) {
            const element = allBuyNow[index];

            element.addEventListener('click', () => {
                const ecomSection = document.querySelector(`.${ID}-ecom`);
                scrollToElement(ecomSection);       
            });
        }

        learnMore.addEventListener('click', () => {
            const details = component.querySelector(`.${ID}-details`);
            scrollToElement(details);       
        });

    }
  
    render() {
      const { component } = this;
      document.querySelector('#maincontent').insertAdjacentElement('afterbegin', component);

      // add countdown
      if(data.countdown.exists === true) {
        countdown(data.countdown.date);
      }
      
       // change description
       const descText = document.querySelectorAll('.product-secondary-tabs__feature')[1];
       if(descText) {
            document.querySelector('.product-description-wrapper').classList.add(`${ID}--mobHide`);
           document.querySelector('.product-description-wrapper').innerText = descText.querySelector('.product-secondary-tabs__feature-text').innerText;
       }
      
    }

    runCarousel() {

        const { component } = this;

        const carousel = component.querySelector(`.${ID}-carousel .${ID}-swiper`);
        const usps = component.querySelector(`.${ID}-usps .${ID}-swiper`);

        Swiper.use([Navigation, Pagination, Autoplay]);

        // image carousel
        const swiper = new Swiper(carousel, {
            direction: 'horizontal',
            slidesPerView: 1.2,
            centeredSlides: true,
            spaceBetween: 0,
            loop: true,
            observer: true,  
            arrows: false,
            observeParents: true,
            paginationClickable: true,
            pagination: {
                el: `.${ID}-swiper .swiper-pagination`,
               clickable: true
            },
            navigation: {
               nextEl: `.${ID}-swiper .${ID}-swiperNext.swiper-button-next`,
               prevEl: `.${ID}-swiper .${ID}-swiperPrev.swiper-button-prev`,
               clickable: true
            },
            breakpoints: {
                315: {
                  slidesPerView: 1.2,
                  spaceBetween: 0,
                  centeredSlides: true,
                },
                700: {
                  slidesPerView: 2.1,
                },
                1024: {
                  slidesPerView: 2.1,
                  spaceBetween: 20,
                  centeredSlides: false,
                  arrows: true
                },
                1280: {
                    slidesPerView: 3.1,
                    spaceBetween: 20,
                    centeredSlides: false,
                    arrows: true
                  }
              }
        });

        swiper.init();
        

        swiper.update();

        // build or destroy usp carousel
        // let init;
        // let swiper1;
        // const swiperMode = () => {
        //     let mobile = window.matchMedia('(min-width: 0px) and (max-width: 768px)');
        //     let tablet = window.matchMedia('(min-width: 769px) and (max-width: 1024px)');
        //     let desktop = window.matchMedia('(min-width: 1025px)');
        
        //     // Enable (for mobile)
        //     if(mobile.matches || tablet.matches) {
        //         if (!init) {
        //             init = true;
        //             swiper1 = new Swiper(usps, {
        //                 direction: 'horizontal',
        //                 slidesPerView: 1,
        //                 observeParents: true,
        //                 observer: true,  
        //                 loop: true,
        //                 arrows: false,
        //                 autoplay: {
        //                     delay: 5000,
        //                 },
        //             });
        //         }
        
        //     }

        //     // Disable (for desktop)
        //     else if(desktop.matches) {
        //         swiper1.destroy();
        //         init = false;
        //     }
        // }

        // swiperMode();
        // window.addEventListener('resize', function() {
        //     swiperMode();
        // });
    }
  }
  