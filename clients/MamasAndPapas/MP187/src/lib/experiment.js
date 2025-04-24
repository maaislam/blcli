/**
 * MP187 - Quick View
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  const getProductImages = (url, callback) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const temp = document.createElement('html');
        temp.innerHTML = request.responseText;
        const title = temp.querySelector('#js-productCarouselMobile');
        const images = temp.querySelectorAll(`.pdpThumbnail img`);
        let imagesData = [];
        for (let i = 0; i < 5;) {
          const imgUrl = images[i].getAttribute('data-src');
          if (!imagesData.includes(imgUrl)) {
            imagesData.push(imgUrl);
            i += 1;
          }
        }

        callback(imagesData);
      }
    };
    request.send();
  };

  // Write experiment code here
  const currentCategory = document.querySelector('span.breadcrumb_category_item.breadcrumb-active').innerText.trim();
  const allProducts = document.querySelectorAll('.productLister .productCard');
  [].forEach.call(allProducts, (product) => {
    // console.log(product);
    if (product.querySelector('.productCard_title')
    && product.querySelector('.productCard_price .price')) {
      const productTitle = product.querySelectorAll('.productCard_title a')[1];
      const productTitleText = productTitle.getAttribute('title');
      const productHref = productTitle.getAttribute('href');
      const productImg = product.querySelector('img.productCard_image').getAttribute('src');
      const productPriceContainer = product.querySelector('.productCard_price .price');
      const price = productPriceContainer.querySelector('div span').innerText;
      let worthPrice;
      if (productPriceContainer.querySelector('.text-strike')) {
        worthPrice = productPriceContainer.querySelector('.text-strike').innerText;
      } else if (productPriceContainer.querySelector('.worth-price')) {
        worthPrice = productPriceContainer.querySelector('.worth-price').innerText;
      }

      let promoline = '';
      if (document.querySelector('.productCard_promoLine')) {
        promoline = document.querySelector('.productCard_promoLine').innerText;
        promoline = `Order now for delivery in 4 weeks`;
      }
      
      const quickViewLink = `<div class="${shared.ID}-quickViewLink__wrapper">
        <span class="${shared.ID}-quickView__icon"></span>
        <span class="${shared.ID}-quickView">Quick View</span>
      </div>`;
      product.insertAdjacentHTML('beforeend', quickViewLink);
      // product.setAttribute('style', 'background-color: lightblue;');

      const quickViewContainer = `<div class="${shared.ID}-quickView__wrapper hidden">
        <div class="${shared.ID}-quickView__container">
          <span class="${shared.ID}-quickView__back"><div class="backIcon"></div> back to ${currentCategory}</span>
          <span class="${shared.ID}-quickView__close"></span>
          <div class="${shared.ID}-images__container">
            <ul data-slick='{"slidesToShow": 1, "slidesToScroll": 1}' class="${shared.ID}-images" style="padding: 0px;text-align: center;height: 180px; margin-top: 20px;"><img src="${productImg}" style="width: 145px;"></ul>
          </div>
          <div class="${shared.ID}-quickView__details">
            <div class="${shared.ID}-quickView__title"><a href="${productHref}">${productTitleText}</a></div>
            <div class="${shared.ID}-quickView__prices">
              <span>${price}</span>
              <span class="oldPrice">${worthPrice}</span>
            </div>
            <div class="${shared.ID}-promoline"><span class="truckIcon"></span><span class="text">${promoline}</span></div>
            <div class="${shared.ID}-viewPDP__wrapper"><a class="${shared.ID}-viewPDP__btn" href="${productHref}">VIEW DETAILS</a></div>
          </div>
        </div>
      </div>`;
      product.insertAdjacentHTML('beforeend', quickViewContainer);

      // product.querySelector(`.${shared.ID}-images`).insertAdjacentElement('afterbegin', productImg);
      // const quickViewElements = document.querySelectorAll(`.${shared.ID}-quickView__wrapper`);
      // [].forEach.call(quickViewElements, (el) => {
      //   const quickLinkCta = el.querySelector(`.${shared.ID}-quickView`);

      //   quickLinkCta.addEventListener('click', (e) => {
      //     el.classList.remove('hidden');
      //   });
      // }); 

      const quickLinkCta = product.querySelector(`.${shared.ID}-quickView`);
      quickLinkCta.addEventListener('click', (e) => {
        // Call
        if (!product.querySelector(`ul.${shared.ID}-images.slick-initialized`)) {
          getProductImages(`${productHref}`, (imagesData) => {
            // console.log('[108] images from PDP');
            // console.log(imagesData);
            let images = '';
            for (let i = 0; i < imagesData.length; i += 1) {
              images += `<li style="background-image: url('${imagesData[i]}');"></li>`;
            }
            product.querySelector(`ul.${shared.ID}-images`).innerHTML = images;
  
            if(jQuery.fn.slick) {
              jQuery(product.querySelector(`ul.${shared.ID}-images`)).slick({
                dots: true,
                infinite: false,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                responsive: [
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    }
                  },
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    }
                  },
                  {
                    breakpoint: 480,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }
                  }
                  // You can unslick at a given breakpoint now by adding:
                  // settings: "unslick"
                  // instead of a settings object
                ]
              });
            }
          });
        }
        
        // -- If lightbox is already open, close that one and open new
        if (document.querySelector(`.${shared.ID}-quickView__wrapper.open`)) {
          document.querySelector(`.${shared.ID}-quickView__wrapper.open`).classList.add('hidden');
          document.querySelector(`.${shared.ID}-quickView__wrapper.open`).classList.remove('open');
        
          product.querySelector(`.${shared.ID}-quickView__wrapper`).classList.remove('hidden');
          product.querySelector(`.${shared.ID}-quickView__wrapper`).classList.add('open');
        } else {
          product.querySelector(`.${shared.ID}-quickView__wrapper`).classList.remove('hidden');
          product.querySelector(`.${shared.ID}-quickView__wrapper`).classList.add('open');
        }
        // product.querySelector(`.${shared.ID}-quickView__wrapper`).classList.remove('hidden');
        // product.querySelector(`.${shared.ID}-quickView__wrapper`).classList.add('open');


        
          
      });

      const quickViewClose = product.querySelector(`.${shared.ID}-quickView__close`);
      quickViewClose.addEventListener('click', (e) => {
        product.querySelector(`.${shared.ID}-quickView__wrapper`).classList.add('hidden');
      });
      const quickViewBack = product.querySelector(`.${shared.ID}-quickView__back`);
      quickViewBack.addEventListener('click', (e) => {
        product.querySelector(`.${shared.ID}-quickView__wrapper`).classList.add('hidden');
      });
    }
    
  });
};


export default activate;