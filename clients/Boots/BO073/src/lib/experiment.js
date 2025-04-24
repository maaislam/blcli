/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { cookieOpt, setup } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  cookieOpt();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  /*  ----------------
  Create Carousel
  ------------------ */
  const heroCarousel = () => {

    const carousel = document.createElement('div');
    carousel.classList.add(`${ID}__heroCarousel`);
    document.querySelector('.heroCarousel').insertAdjacentElement('beforebegin', carousel);

      const $ = window.jQuery;

      const slides = () => {
          const heroSlides = {
              slide1: { // chanel no5
                  name: 'chanelno5',
                  backgroundColour: '#fff',
                  mainImage: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/CBDEA7835E6E07846372ED5D11F869A8A67FFFE4557A04A11BCC491A763B50FB.png?meta=/BO073---Chanel-Carousel/Bottle-mobile.png',
                  desktopBG: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/560D8DDABCD39FFED902ABEB621CEE1FF627357AC2E7690EB04642421BCB833A.png?meta=/BO073---Chanel-Carousel/Bottle-1.png',
                  logo: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/962914FB070859DC6019D2FF46FA3299044BE37B424C585BFD0BC1EF01B8B2C0.png?meta=/BO073---Chanel-Carousel/fe85eb46-3797-4e95-835a-430eaf3fe17e_chanel-logo-v2.png',
                  logoName: 'chanellogo',
                  buttonTheme: 'black',
                  buttonOne: 'Shop Now',
                  buttonOneLink: 'https://www.boots.com/chanel/chanel-ladies-fragrances/chanel-no5/chanel-no5-eau-de-parfum-spray-100ml-10012525',
                  buttonTwo: 'DISCOVER LADIES FRAGRANCES',
                  buttonTwoLink: 'https://www.boots.com/chanel/chanel-ladies-fragrances',
              },
              slide2: { // chanel bleu
                name: 'chanelbleu',
                backgroundColour: '#fff',
                mainImage: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F419B5371218C269B6E950D174C58BD39A2D5FBD85DE90A08A6B6580F66362B0.png?meta=/BO073---Chanel-Carousel/BLEU-Mobile.png',
                desktopBG: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/75A123721EE6F100C0F195D8A457FB13B17886045975845A5B739AC53D56B4D3.png?meta=/BO073---Chanel-Carousel/Bleu-1.png',
                logo: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/962914FB070859DC6019D2FF46FA3299044BE37B424C585BFD0BC1EF01B8B2C0.png?meta=/BO073---Chanel-Carousel/fe85eb46-3797-4e95-835a-430eaf3fe17e_chanel-logo-v2.png',
                logoName: 'chanellogo',
                buttonTheme: 'black',
                buttonOne: 'Shop Bleu',
                buttonOneLink: 'https://www.boots.com/chanel-bleu-de-chanel-eau-de-parfum-100ml-10179150',
                buttonTwo: 'DISCOVER MENS FRAGRANCES',
                buttonTwoLink: 'https://www.boots.com/chanel/chanel-mens-fragrances',
              },
              slide3: { // rouge allure
                name: 'rougeallure',
                backgroundColour: '#000',
                mainImage: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/25C2DAB31E59B0C3B3126952108BDCF43339D81F2CD5965A1464DBD19E95102F.png?meta=/BO073---Chanel-Carousel/Rouge-mobile.png',
                desktopBG: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/33E7BAACEE93743584F29E1BDEE6E47BF16686B22DBFDC927CDD95C5B229665C.png?meta=/BO073---Chanel-Carousel/Rouce-1.png',
                logo: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/586C48979DD8B8B75E77C44CFF0F1AC9DD595C3BB7CC4F341DDAF851669DE6FA.png?meta=/BO073---Chanel-Carousel/Rougelogo.png',
                buttonTheme: 'white',
                buttonOne: 'Shop Now',
                buttonOneLink: 'https://www.boots.com/chanel-rouge-allure-laque-ultrawear-shine-liquid-lip-colour-10292113',
                buttonTwo: 'DISCOVER MAKEUP',
                buttonTwoLink: 'https://www.boots.com/chanel/chanel-make-up',
              },
              slide4: { // le lift
                name: 'lelift',
                backgroundColour: '#E5DFE3',
                mainImage: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/5E63AFF297273BC850619D31475F09015F02A2AD9A1AE3F79BD95F27C8145B25.png?meta=/BO073---Chanel-Carousel/Lelift-mobile.png',
                desktopBG: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/5CD437806E4466DD3668B3EDED384D3657E7D7C17447464AE5F196F1F958AF5A.png?meta=/BO073---Chanel-Carousel/Lelift-1.png',
                logo: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/80C4B6E24ED80A8E7810066B1B7E8F2CB17F797B1D87A108D1A385FB1FBEF3B2.png?meta=/BO073---Chanel-Carousel/lift-txt.png',
                buttonTheme: 'black',
                buttonOne: 'Shop Le Lift',
                buttonOneLink: 'https://www.boots.com/chanel-le-lift-lotion-10291972',
                buttonTwo: 'DISCOVER SKINCARE',
                buttonTwoLink: 'https://www.boots.com/chanel/chanel-skincare',
              },
          }
      
          Object.keys(heroSlides).forEach((i) => {
              const data = heroSlides[i];
              const slide = document.createElement('div');
              slide.classList.add(`${ID}__slide`);
              slide.setAttribute('slide-name', data.name);
              slide.style= `background-color: ${data.backgroundColour}`;
              if(window.innerWidth > 767) {
                slide.style= `background-image: url(${data.desktopBG})`;
              }


              slide.innerHTML = 
              `<div class="${ID}__slide__content">
                  <div class="${ID}-image" style="background-image:url(${data.mainImage})"></div>
                  <div class="${ID}-slideBottom">
                    <div class="${ID}-logo ${data.logoName ? `${ID}-${data.logoName}` : ''}" style="background-image:url(${data.logo})"></div>
                    <div class="${ID}-buttons">
                      <a class="${ID}-button ${ID}-first ${ID}-${data.buttonTheme}" href="${data.buttonOneLink}">${data.buttonOne}</a>
                      <a class="${ID}-button ${ID}-second ${ID}-${data.buttonTheme}" href="${data.buttonTwoLink}">${data.buttonTwo}</a>
                    </div>
                  </div>
              </div>`;
          
              document.querySelector(`.${ID}__heroCarousel`).appendChild(slide);
          });
      }
      slides();

      const slickCarousel = () => {
          $(`.${ID}__heroCarousel`).slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
              arrows: true,
              infinite: true,
              autoplay: true,
              autoplaySpeed: 7000,
              fade: true,
              pauseOnHover: true,
              cssEase: 'linear',
              mobileFirst: true,
              responsive: [
                  {
                    breakpoint: 1024,
                    settings: {
                      arrows: true,
                    }
                  },
                ]
          });
      }
      slickCarousel();

      const hoverCarousel = () => {
          // prevent mouse out triggering on child
          const slider = document.querySelector(`.${ID}__heroCarousel`);
          slider.querySelector('.slick-track').onmouseout=function(e){
              let obj = e.relatedTarget;
              while(obj!=null){
                  if(obj==this){
                      return;
                  }
                  obj = obj.parentNode;
              }
              slider.querySelector('.slick-dots .slick-active').classList.remove(`${ID}-pauseAnim`);
          }
        
          slider.querySelector('.slick-track').addEventListener('mouseover', (e) => {
            slider.querySelector('.slick-dots .slick-active').classList.add(`${ID}-pauseAnim`);
          });
      }

      if(window.innerWidth > 1024) {
          hoverCarousel();
      }
  }

  const carouselEvents = () => {
    const allSlides = document.querySelectorAll(`.${ID}__slide`);
    for (let index = 0; index < allSlides.length; index += 1) {
      const element = allSlides[index];
      const firstButton = element.querySelector(`.${ID}-first`);
      const secondButton =  element.querySelector(`.${ID}-second`);
      const slideName = element.getAttribute('slide-name');
      firstButton.addEventListener('click', (e) => {
        window.cmCreateManualLinkClickTag(`/BO073?cm_sp=MaxymiserBO073Carousels-_-ClickedCarousel${slideName}buttonShop-_-Click`);
      });

      secondButton.addEventListener('click', (e) => {
        window.cmCreateManualLinkClickTag(`/BO073?cm_sp=MaxymiserBO073Carousels-_-ClickedCarousel${slideName}buttonDiscover-_-Click`);
      });
    }

  }

  heroCarousel();
  carouselEvents();

};
