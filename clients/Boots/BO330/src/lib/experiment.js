/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import Swiper from 'swiper/swiper-bundle';
import shared from '../../../../../core-files/shared';
const { ID, VARIATION } = shared;

const startExperiment = () => {

  let carouselData = [

    {
      imageURL: 'https://blcro.fra1.digitaloceanspaces.com/BO330/BO330-bronzing-new.jpg',
      title: 'Bronzing',
      description: 'Get your glow on for sunkissed skin in seconds with our bronzing besties',
      shopNowURL: 'https://www.boots.com/sitesearch?searchTerm=bronzer&paging.index=0&paging.size=50&sortBy=mostRelevant',
    },
    {
      imageURL: 'https://blcro.fra1.digitaloceanspaces.com/BO330/BO330-doll-blush.jpg',
      title: 'Doll Blush',
      description: 'Blush is getting a glow-up! Embrace your inner doll with dreamy doll blush',
      shopNowURL: 'https://www.boots.com/sitesearch?searchTerm=blush&paging.index=0&paging.size=52&sortBy=mostRelevant',
    },
    {
      imageURL: 'https://blcro.fra1.digitaloceanspaces.com/BO330/BO330-dewy-skin.jpg',
      title: 'Dewy Skin',
      description: 'Reveal your natural glow easily with our dewy skin staples',
      shopNowURL: 'https://www.boots.com/sitesearch?searchTerm=dewy&paging.index=0&paging.size=48&sortBy=bestSeller',
    },
    {
      imageURL: 'https://blcro.fra1.digitaloceanspaces.com/BO330/BO330-colour-eyes.jpg',
      title: 'Colourful eye makeup',
      description: 'Create endless looks with our full array of colours',
      shopNowURL: 'https://www.boots.com/sitesearch?searchTerm=eye+makeup&paging.index=0&paging.size=48&sortBy=mostRelevant&criteria.productColour=Pink_EC69A4---Purple_662483---Blue_004899---Gold_C98910---Green_009640---Red_FF0000---Orange_EA5B0C---Yellow_FFD73E',
    },
    {
      imageURL: 'https://blcro.fra1.digitaloceanspaces.com/BO330/BO330-nude-lips.jpg',
      title: 'Nude lips',
      description: 'Finish any makeup look with the next-level nude on everyone\'s lips',
      shopNowURL: 'https://www.boots.com/sitesearch?searchTerm=nude+lip&paging.index=0&paging.size=45&sortBy=mostRelevant',
    },
    {
      imageURL: 'https://blcro.fra1.digitaloceanspaces.com/BO330/BO330-spf.jpg',
      title: 'SPF',
      description: 'Add sun protection to your everyday routine with our SPF saviours',
      shopNowURL: 'https://www.boots.com/sitesearch?searchTerm=face+spf&paging.index=0&paging.size=49&sortBy=mostRelevant',
    },
    {
      imageURL: 'https://blcro.fra1.digitaloceanspaces.com/BO330/BO330-glowing.jpg',
      title: 'Glowing',
      description: 'Brighten your complexion with our energising, refreshing goodies',
      shopNowURL: 'https://www.boots.com/sitesearch?searchTerm=glow&paging.index=0&paging.size=52&sortBy=mostRelevant',
    },


  ]

  // needs to change to BO330-HotOnSocialTrending
  if(document.getElementById('BO330-HotOnSocialTrending') || window.location.href.indexOf('hot-on-social') > -1){

    let newHTML = `
    
      <div class="${ID}-trending-holder">
      
        <div class="${ID}-trending">
        
          <div class="${ID}-trending--header">
            <svg width="182" height="94" viewBox="0 0 182 94" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M126.41 23.3865C131.045 23.3865 135.267 26.0483 135.267 33.3454V45.5991H130.861V33.7126C130.861 29.628 128.796 27.6087 125.492 27.6087C121.912 27.6087 119.755 29.6739 119.755 34.2174V45.5991H115.349V23.7995H119.755V26.186C121.178 24.5338 123.381 23.3865 126.41 23.3865Z" fill="black"/><path d="M98.9552 46.1498C92.4841 46.1498 87.4817 40.9638 87.4817 34.7222C87.4817 28.4807 92.4841 23.3865 98.9552 23.3865C105.426 23.3865 110.475 28.4807 110.475 34.7222C110.475 40.9638 105.426 46.1498 98.9552 46.1498ZM98.9552 41.9276C103.04 41.9276 105.977 38.6232 105.977 34.7222C105.977 30.9131 103.04 27.6087 98.9552 27.6087C94.8706 27.6087 91.9334 30.9131 91.9334 34.7222C91.9334 38.6232 94.8706 41.9276 98.9552 41.9276Z" fill="black"/><path d="M70.5403 40.8721C71.8253 40.8721 72.7432 40.7344 73.5693 40.4131V45.4156C72.5137 45.8745 71.2287 46.1958 69.0717 46.1958C64.62 46.1958 61.9581 43.3962 61.9581 39.0363V29.215H58.3784V23.7996H61.9581V17.3285L67.6031 15.9517V23.7996H73.2021V29.215H67.6031V37.9349C67.6031 39.8624 68.7045 40.8721 70.5403 40.8721Z" fill="black"/><path d="M44.6768 46.1957C38.2517 46.1957 33.1116 41.0556 33.1116 34.7681C33.1116 28.4348 38.2517 23.3865 44.6768 23.3865C51.1479 23.3865 56.288 28.4348 56.288 34.7681C56.288 41.0556 51.1479 46.1957 44.6768 46.1957ZM44.6768 40.7802C48.0271 40.7802 50.5512 38.0266 50.5512 34.7681C50.5512 31.5556 48.0271 28.8019 44.6768 28.8019C41.3725 28.8019 38.8483 31.5556 38.8483 34.7681C38.8483 38.0266 41.3725 40.7802 44.6768 40.7802Z" fill="black"/><path d="M22.3503 11.6376H28.3624V45.5991H22.3503V30.5918H6.0121V45.5991H0V11.6376H6.0121V24.8092H22.3503V11.6376Z" fill="black"/><path d="M159.125 51.0491L166.181 49.328V92.6404H159.125V51.0491Z" fill="black"/><path d="M144.979 65.391H152.035V92.6404H144.979V89.8868C143.085 91.8947 140.446 93.1568 137.062 93.1568C129.145 93.1568 122.949 86.9611 122.949 78.987C122.949 71.013 129.145 64.8747 137.062 64.8747C140.446 64.8747 143.085 66.1367 144.979 68.1446V65.391ZM137.521 86.5021C141.995 86.5021 144.979 83.0601 144.979 78.987C144.979 74.9713 141.995 71.5293 137.521 71.5293C133.218 71.5293 130.12 74.9713 130.12 78.987C130.12 83.0601 133.218 86.5021 137.521 86.5021Z" fill="black"/><path d="M114.053 59.8262C111.472 59.8262 109.464 57.8757 109.464 55.2368C109.464 52.6553 111.472 50.7048 114.053 50.7048C116.635 50.7048 118.643 52.6553 118.643 55.2368C118.643 57.8757 116.635 59.8262 114.053 59.8262ZM110.497 65.3908H117.553V92.6403H110.497V65.3908Z" fill="black"/><path d="M96.2373 93.1568C87.2306 93.1568 81.4939 86.8463 81.4939 78.987C81.4939 71.0703 87.288 64.8747 95.9505 64.8747C99.6793 64.8747 102.433 65.8499 104.613 67.2267V74.2255H104.498C102.318 72.6193 99.6793 71.5293 96.6962 71.5293C91.8774 71.5293 88.6648 74.5124 88.6648 78.987C88.6648 83.1175 91.4184 86.5021 96.8683 86.5021C99.9662 86.5021 102.548 85.5269 104.728 83.9206H104.842V90.9194C102.835 92.2389 100.024 93.1568 96.2373 93.1568Z" fill="black"/><path d="M63.232 93.3862C55.2005 93.3862 48.7754 86.9611 48.7754 79.1018C48.7754 71.1851 55.2005 64.8747 63.232 64.8747C71.3207 64.8747 77.7459 71.1851 77.7459 79.1018C77.7459 86.9611 71.3207 93.3862 63.232 93.3862ZM63.232 86.6169C67.4198 86.6169 70.575 83.1748 70.575 79.1018C70.575 75.086 67.4198 71.644 63.232 71.644C59.1015 71.644 55.9463 75.086 55.9463 79.1018C55.9463 83.1748 59.1015 86.6169 63.232 86.6169Z" fill="black"/><path d="M33.4108 93.3862C29.7966 93.3862 27.8461 92.9273 25.4941 91.7799V85.1827H25.6088C28.0756 86.5021 30.3129 87.0758 33.6976 87.0758C37.197 87.0758 38.1723 86.1006 38.1723 85.068C38.1723 81.0523 24.9204 83.6338 24.9204 73.5945C24.9204 68.6035 29.0509 64.8747 35.8776 64.8747C39.0328 64.8747 40.9833 65.3336 43.3353 66.4809V73.0782H43.2206C40.7538 71.7587 38.5165 71.1851 35.7628 71.1851C32.665 71.1851 31.8045 71.9882 31.8045 73.0208C31.8045 76.6923 44.8842 74.5697 44.8842 84.3796C44.8842 89.7147 41.0406 93.3862 33.4108 93.3862Z" fill="black"/><path d="M146.201 25.1787C142.505 37.4303 152.362 43.5285 157.753 45.0462C153.317 39.7482 155.905 29.5937 157.753 25.1787C159.971 25.1787 160.833 29.8696 160.987 32.2151C165.053 28.2416 164.222 21.4535 163.298 18.5562C173.648 25.5098 170.383 39.1135 167.456 45.0462C187.417 34.4502 179.47 17.1765 173.001 9.86417C173.371 15.1622 171.923 16.7626 171.153 16.9006C169.674 8.95358 162.836 3.65558 159.601 1.99996C158.862 13.2582 155.289 17.7284 153.594 18.5562L150.36 13.5893C151.099 17.8939 147.478 20.9477 146.201 25.1787Z" stroke="black" stroke-width="2"/></svg>

            <p>We've done the scrolling &amp; found the biggest, most viral beauty besties, ready for you to try the next best thing on social!</p>
          </div>

          <div class="${ID}-trending--content">

            <div class="${ID}-trending--content--left">

              <div class="${ID}-playpause">
                <button class="${ID}-play"><svg viewBox="-3 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-419.000000, -571.000000)" fill="#FFF"><path d="M440.415,583.554 L421.418,571.311 C420.291,570.704 419,570.767 419,572.946 L419,597.054 C419,599.046 420.385,599.36 421.418,598.689 L440.415,586.446 C441.197,585.647 441.197,584.353 440.415,583.554" id="play" sketch:type="MSShapeGroup"></path></g></g></svg></button>
                <button class="${ID}-pause"><svg viewBox="-1 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Dribbble-Light-Preview" transform="translate(-67.000000, -3765.000000)" fill="#FFF"><g id="icons" transform="translate(56.000000, 160.000000)"><path d="M11,3613 L13,3613 L13,3605 L11,3605 L11,3613 Z M15,3613 L17,3613 L17,3605 L15,3605 L15,3613 Z" id="pause-[#1010]"></path></g></g></g></svg></button>              </div>
              
            
              <span>Discover all trending</span>

              <a href="https://www.boots.com/beauty/trending-products" class="${ID}-shopnow">Shop Now</a>

            </div>

            <div class="${ID}-trending--content--right">
              <button class="${ID}-carousel--arrow ${ID}-carousel--arrow--prev"><svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L2 8L9 15" stroke="#333333" stroke-width="2"/></svg></button>
              <button class="${ID}-carousel--arrow ${ID}-carousel--arrow--next"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 17L13 10L6 3" stroke="#333333" stroke-width="2"/></svg></button>

              <div class="${ID}-carousel swiper" id="${ID}-carousel">
                
                
                <div class="swiper-wrapper">
                  
                  ${carouselData.map((item) => {

                    return `
                    
                      <a href="${item.shopNowURL}" class="${ID}-carousel--item swiper-slide">
                  
                        <div class="${ID}-img" style="background-image: url('${item.imageURL}');"></div>

                        <div class="${ID}-carousel--item--content">
                          <h2>${item.title}</h2>
                          <p>${item.description}</p>
                        </div>

                        <div class="${ID}-carousel--item--cta">
                          <button>Shop Now</button>
                        </div>

                      </a>
                    
                    `;


                  }).join('')}
                  
                  
                </div>
              
              </div>

            </div>
        
          </div>
        
        </div>
      
      
      </div>
    
    
    `;

    let insertionPoint = document.getElementById('BO330-HotOnSocialTrending');
    insertionPoint.insertAdjacentHTML('beforebegin', newHTML);

    fireEvent(`Interaction - element added to page`, true);

    const swiper = new Swiper(
      `#${ID}-carousel`,
      {
        navigation: {
          nextEl: `.${ID}-carousel--arrow--next`,
          prevEl: `.${ID}-carousel--arrow--prev`,
        },
        slidesPerView: 2.9,
        loop: false,
        spaceBetween: 20,
        
        breakpoints: {
          0: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },
          330: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          450: {
            slidesPerView: 2.2,
            spaceBetween: 10,
          },
          600: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2.3,
            spaceBetween: 10,
          },
          1100: {
            slidesPerView: 2.6,
            spaceBetween: 20,
          },
          2000: {
            slidesPerView: 2.9,
            spaceBetween: 20,
          }
        },
      }
    );

    window.addEventListener("resize", () => {
      swiper.update();
    });

    document.body.addEventListener('click', (e) => {

      if(e.target.closest(`.${ID}-carousel--item`)) {
        let header = e.target.closest(`.${ID}-carousel--item`).querySelector('h2').innerText;
        fireEvent(`Click - Trending CTA Clicked with header: ${header} going to href: ${e.target.closest(`.${ID}-carousel--item`).href}`, true);
      }

      if(e.target.closest(`.${ID}-shopnow`)) {
        fireEvent('Click - Main Animated gif Shop Now Clicked', true);
      }

      if(e.target.closest(`.${ID}-carousel--arrow--prev`)) {
        fireEvent('Click - Carousel Prev Clicked', true);
      }

      if(e.target.closest(`.${ID}-carousel--arrow--next`)) {
        fireEvent('Click - Carousel Next Clicked', true);
      }

      if(e.target.closest(`.${ID}-pause`) || e.target.classList.contains(`${ID}-pause`)) {

        document.querySelector(`.${ID}-trending--content--left`).classList.add(`${ID}-paused`);
        fireEvent('Click - Trending Pause Clicked', true);
      }

      if (e.target.closest(`.${ID}-play`) || e.target.classList.contains(`${ID}-play`)) {

        document.querySelector(`.${ID}-trending--content--left`).classList.remove(`${ID}-paused`);
        fireEvent('Click - Trending Play Clicked', true);
      }

    });

    

  }


}

const setupTracking = () => {

  document.body.addEventListener('click', (e) => {  

    if(e.target.closest(`.${ID}-social-trending-container`) && e.target.closest('.oct-teaser-wrapper-link'))  {
      let targetHref = e.target.closest('.oct-teaser-wrapper-link').href;
      let targetText = e.target.closest('.oct-teaser-wrapper-link').querySelector('h3').innerText;
      fireEvent(`Click - Trending Link: ${targetText} clicked to go to ${targetHref}`, true);
    }

    if(e.target.closest('.swiper-button-next')) {
      fireEvent('Click - Carousel Next Clicked', true);
    }

    if(e.target.closest('.swiper-button-prev')) {
      fireEvent('Click - Carousel Prev Clicked', true);
    }

  });


}

export default () => {

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }


  

  let socialTrending = document.getElementById('BO330-HotOnSocialTrending');
  let socialTrendingContainer = socialTrending.closest('.oct-aem-grid');
  socialTrendingContainer.classList.add(`${ID}-social-trending-container`);

  // write an intersection observer to fire an event when the element is seen

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if(VARIATION == 1 || VARIATION == 2) {
          fireEvent(`Interaction - Trending Section Seen by the user`, true);
        } else {
          fireEvent(`Interaction - Trending Section would have been seen by the user`, true);
        }
       
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.querySelector(`.${ID}-social-trending-container`));


  if (VARIATION == 1) {
    setupTracking();
  } else if (VARIATION == 2) {
    startExperiment();
  }

};
