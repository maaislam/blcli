/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import PageMarkup from './components/pageMarkup';
import getData from './components/content';
import shared from './shared';

export default () => {
  setup();
  const { ID } = shared;
  new PageMarkup();
  


  /**
   * Loop through content obj main products
   */
  const contentData = getData();

  if(contentData.title === 'Treadmills') {
    document.body.classList.add(`${ID}-treadmill`);
  } 
  if(contentData.title === 'Exercise bikes') {
    document.body.classList.add(`${ID}-bikes`);
  } 
  if(contentData.title === 'Cross Trainers') {
    document.body.classList.add(`${ID}-crosstrain`);
  } 
  if(contentData.title === 'Rowers') {
    document.body.classList.add(`${ID}-rowers`);
  } 

  const addMainProducts = () => {
    Object.keys(contentData.mainProducts).forEach((i) => {
      const product = contentData.mainProducts[i];
      
      const productBlock = document.createElement('div');
      productBlock.classList.add(`${ID}__product`);
      productBlock.classList.add(`${ID}-mainproduct`);
      productBlock.innerHTML = 
      `<div class="${ID}__productImage" style="background-image: url(${shared.VARIATION === '1' ? product.image : product.imageV2})"></div>
      <div class="${ID}__productInfo">
        <h3 class="${ID}__h3">${[i][0]}</h3>
        <div class="${ID}__subtitle">${product.subtitle}</div>
        <p class="${ID}__p">${product.description}</p>
        <div class="${ID}__priceRow">
          ${product.price && product.price !== '' ? `<p class="${ID}__p ${ID}__price">${product.price}</p><a href="${product.link}" class="${ID}__textLink">Shop Now ></a>` : `<a href="${product.link}" class="${ID}__textLink">Request a quote ></a>`}
        </div>
        <div class="${ID}__button"><a href="${product.link}">Learn More</a></div>
        ${product.line ? `<div class="${ID}__line">Line: <a class="${ID}__textLink "href="${product.lineLink}">${product.line}</a></div>` : ''}
      </div>`;

      document.querySelector(`.${ID}-mainProducts`).appendChild(productBlock);

    });
  }
  addMainProducts();

  const addProductCarousel = () => {

    let carouselProducts;
    let carousel;

    if(contentData.smallCarousel) {
      carouselProducts = contentData.smallCarousel;
      carousel = document.querySelector(`.${ID}-moreProducts .${ID}__carousel`);
    }

    if(contentData.uprightBikes) {
      carouselProducts = contentData.uprightBikes;
      carousel = document.querySelector(`.${ID}-moreProducts.${ID}-upright .${ID}__carousel`);
    }

    Object.keys(carouselProducts).forEach((i) => {
      const product = carouselProducts[i];
      const carouselproduct = document.createElement('div');
      carouselproduct.classList.add(`${ID}__product`);
      carouselproduct.classList.add(`${ID}-carouselproduct`);
      carouselproduct.innerHTML = 
      `<div class="${ID}__productImage" style="background-image: url(${shared.VARIATION === '1' ? product.image : product.imageV2})"></div>
      <div class="${ID}__productInfo">
        <h3 class="${ID}__productName">${[i][0]}</h3>
        <p class="${ID}__p">${product.description}</p>
        <div class="${ID}__priceRow">
        ${product.price && product.price !== '' ? `<p class="${ID}__p ${ID}__price">${product.price}</p><a href="${product.link}" class="${ID}__textLink">Shop Now ></a>` : `<p class="${ID}-priceText">Pricing on request</p><a href="${product.link}" class="${ID}__textLink ${ID}__request">Request a quote ></a>`}
        </div>
        <div class="${ID}__button"><a href="${product.link}">Learn More</a></div>
      </div>`;

      carousel.appendChild(carouselproduct);
    });

    // add second carousel
    if(contentData.recumbentBikes) {
      Object.keys(contentData.recumbentBikes).forEach((i) => {
        const product = contentData.recumbentBikes[i];
        const carouselproduct = document.createElement('div');
        carouselproduct.classList.add(`${ID}__product`);
        carouselproduct.classList.add(`${ID}-carouselproduct`);
        carouselproduct.innerHTML = 
        `<div class="${ID}__productImage" style="background-image: url(${shared.VARIATION === '1' ? product.image : product.imageV2})"></div>
        <div class="${ID}__productInfo">
          <h3 class="${ID}__productName">${[i][0]}</h3>
          <p class="${ID}__p">${product.description}</p>
          <div class="${ID}__priceRow">
          ${product.price && product.price !== '' ? `<p class="${ID}__p ${ID}__price">${product.price}</p><a href="${product.link}" class="${ID}__textLink">Shop Now ></a>` : `<p class="${ID}-priceText">Pricing on request</p><a href="${product.link}" class="${ID}__textLink ${ID}__request">Request a quote ></a>`}
          </div>
          <div class="${ID}__button"><a href="${product.link}">Learn More</a></div>
        </div>`;
  
        document.querySelector(`.${ID}-moreProducts.${ID}-recumbent .${ID}__carousel`).appendChild(carouselproduct);
      });
    }
  }

  
  const addMedCarousel = () => {
    Object.keys(contentData.medCarousel).forEach((i) => {
      const product = contentData.medCarousel[i];
      const carouselMed = document.createElement('div');
      carouselMed.classList.add(`${ID}__product`);
      if(product.image) {
        carouselMed.classList.add(`${ID}-carouselproduct`);
        carouselMed.innerHTML = 
        `<div class="${ID}__productImage" style="background-image: url(${shared.VARIATION === '1' ? product.image : product.imageV2})"></div>
        <div class="${ID}__productInfo">
          <h3 class="${ID}__productName">${[i][0]}</h3>
          <p class="${ID}__p">${product.description}</p>
          <div class="${ID}__priceRow">
          ${product.price && product.price !== '' ? `<p class="${ID}__p ${ID}__price">${product.price}</p><a href="${product.link}" class="${ID}__textLink">Shop Now ></a>` : `<p class="${ID}-priceText">Pricing on request</p><a href="${product.link}" class="${ID}__textLink">Request a quote ></a>`}
          </div>
          <div class="${ID}__button"><a href="${product.link}">Learn More</a></div>
        </div>`
      } else {
        carouselMed.classList.add(`${ID}-noneProduct`);
        carouselMed.innerHTML = 
        `<div class="${ID}__moreProducts">
            <p>${[i][0]}</p>
            <div class="${ID}__button"><a href="${product.link}">Browse all</a></div>
          </div>`;
      }
      document.querySelector(`.${ID}-medical .${ID}__carousel`).appendChild(carouselMed);
    });
  }

  // slick the carousel
  const slickProducts = () => {
    window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', (data, textStatus, jqxhr) => {
      window.jQuery(`.${ID}__carousel`).slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable: true,
        rows: 0,
        responsive: [
        {
          breakpoint: 9999,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            dots: true,
            infinite: false,
          }
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        }
        },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          infinite: false,
          arrows: true,
          dots: false,
          draggable: true,
        }
      }]
      });


      const noOfSlides = document.querySelectorAll(`.${ID}-moreProducts .${ID}__product`).length - 1;
      const medicalNoOfSlides = document.querySelectorAll(`.${ID}-medical .${ID}__product`).length - 1;

      if(document.querySelector(`.${ID}-moreProducts .slick-prev`)) {
      // show and hide the arrows based on the slide index on product carousel
        window.jQuery(`.${ID}-moreProducts .${ID}__carousel`).on('afterChange', function (event, slick, currentSlide) {
          if(window.innerWidth > 767) {
            if(currentSlide === noOfSlides || currentSlide >= 2) {
              document.querySelector(`.${ID}-moreProducts .slick-prev`).classList.add(`${ID}__show`);
              document.querySelector(`.${ID}-moreProducts .slick-next`).classList.add(`${ID}__hidden`);
            }
            else if(currentSlide === 0) {
              document.querySelector(`.${ID}-moreProducts .slick-prev`).classList.remove(`${ID}__show`);
              document.querySelector(`.${ID}-moreProducts .slick-next`).classList.remove(`${ID}__hidden`);
            }
            } else {
            if(currentSlide === noOfSlides) {
              document.querySelector(`.${ID}-moreProducts .slick-prev`).classList.add(`${ID}__show`);
              document.querySelector(`.${ID}-moreProducts .slick-next`).classList.add(`${ID}__hidden`);
            }
            else if(currentSlide === 0) {
              document.querySelector(`.${ID}-moreProducts .slick-prev`).classList.remove(`${ID}__show`);
              document.querySelector(`.${ID}-moreProducts .slick-next`).classList.remove(`${ID}__hidden`);
            }
          }
          
        }); 

        // medical slide
        if(window.innerWidth < 767) {
          // show and hide the arrows based on the slide index on medical carousel
          window.jQuery(`.${ID}-medical .${ID}__carousel`).on('afterChange', function (event, slick, currentSlide) {
            if(currentSlide === medicalNoOfSlides) {
              document.querySelector(`.${ID}-medical .slick-prev`).classList.add(`${ID}__show`);
              document.querySelector(`.${ID}-medical .slick-next`).classList.add(`${ID}__hidden`);
            }
            else if(currentSlide === 0) {
              document.querySelector(`.${ID}-medical .slick-prev`).classList.remove(`${ID}__show`);
              document.querySelector(`.${ID}-medical .slick-next`).classList.remove(`${ID}__hidden`);
            }
          }); 
        }
      }
    });
  }

  /** Bottom Section */
  const learnMore = () => {
    const learnMoreLink = document.querySelector(`.${ID}-treadmillHelp .${ID}__learnMore`);
    if(learnMoreLink) {
      const bottomText = document.querySelector(`.${ID}-treadmillHelp .${ID}__bottomContent`)
      learnMoreLink.addEventListener('click', () => {
        bottomText.classList.add(`${ID}-text_show`);
        learnMoreLink.classList.add(`${ID}-hidden`);
      });
    }
  }

  learnMore();


  /**
   * Add both carousel products to the page
   */
  addProductCarousel();

  if(contentData.medCarousel) {
    addMedCarousel();
  }
  /**
   * Slick both carousels
   */
  slickProducts();


};
