/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname, cookieOpt, fireEvent } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';
import QuickViewBox from './quickViewBox';

const { ID, VARIATION } = shared;

export default () => {
  setup();
  cookieOpt();

  if(VARIATION !== 'control') {
    new QuickViewBox();

    // add overlay
    document.body.insertAdjacentHTML(`beforeend`, `<div class="${ID}-overlay"></div>`)

    const addQuickViewButton = () => {

      // add quick view on all products with CTA and not bundle products
      const allProducts = document.querySelectorAll(`.product-tile-list .product-tile`);
      for (let index = 0; index < allProducts.length; index += 1) {
        const element = allProducts[index];
        element.querySelector('.productLink').insertAdjacentHTML(`beforeend`, `<div class="${ID}-quickViewCTA">Quick View</div>`);
      }
    }

    addQuickViewButton();


    const closeQuickView = () => {
      const quickViewBox = document.querySelector(`.${ID}-quickView`);
      document.body.classList.remove(`${ID}-noScroll`);
      quickViewBox.classList.add(`${ID}-quickViewHide`);
      quickViewBox.classList.remove(`${ID}-quickViewShow`);
      document.querySelector(`.${ID}-overlay`).classList.remove(`${ID}-overlayShow`);
    }

    const quickViewEvents = () => {
      const quickViewBox = document.querySelector(`.${ID}-quickView`);
      quickViewBox.querySelector(`.${ID}-close`).addEventListener('click', () => {
        closeQuickView();
      });      
    }

    const imageSlider = () => {
      const init = () => {
            window.jQuery(`.${ID}-images`).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: true,
                draggable: true,
                infinite: true,
                fade: true,
                rows: 0,
                cssEase: 'linear',
                mobileFirst: true,
                responsive: [
                    {
                    breakpoint: 1023,
                    settings: {
                        arrows: true,
                    }
                    },
                ]
            });
      }
      if(window.jQuery && window.jQuery.fn.slick) {
            init();
            window.jQuery(window).resize(function() {
              window.jQuery(`.${ID}-images`).slick('resize');
            });
          } else {
            window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', (data, textStatus, jqxhr) => {
                init();
              window.jQuery(window).resize(function() {
                window.jQuery(`.${ID}-images`).slick('resize');
              });
            });
        }
    }

    const getProductDetails = () => {
      //const quickViewBox = document.querySelector(`.${ID}-quickView`);

      const allQuickViewCTAs = document.querySelectorAll(`.${ID}-quickViewCTA`);
      for (let index = 0; index < allQuickViewCTAs.length; index += 1) {
        const element = allQuickViewCTAs[index];

        element.addEventListener('click', (e) => {
          e.preventDefault();
          const productLink = element.parentNode.getAttribute('href');

          fireEvent('Clicked Quick View');

          let productPrice;
          let financeHS;
          if(getSiteFromHostname() === 'ernestjones') {
            productPrice= element.parentNode.querySelector('.product-tile__current-price-container');
          } else {
            productPrice = element.parentNode.querySelector('.product-tile__pricing-container');
            financeHS = element.parentNode.querySelector('.product-tile__ifc-monthly-pricing');
          }
          const productName = element.parentNode.querySelector('.product-tile__description');
          const productReviews = element.parentNode.querySelector('.rating-stars');

          const request = new XMLHttpRequest();
                request.open('GET',productLink, true);
                request.onload = () => {
                  if (request.status >= 200 && request.status < 400) {
                    const temp = document.createElement('html');
                    temp.innerHTML = request.responseText;
            
                    const quickViewBox = document.querySelector(`.${ID}-quickView`)
                    const basketForm = temp.querySelector('#basketForm');
                    let productDescription;
                    if(getSiteFromHostname() === 'ernestjones') {
                      productDescription = temp.querySelector('.s-product-description-markdown');
                    } else {
                      productDescription= temp.querySelector('.product-description p:not(.product-description__long)');
                    }
                  

                    const images = temp.querySelectorAll('.product-gallery__image-container img');
                  
                    // create markup for the quick view box
                    quickViewBox.querySelector(`.${ID}-productInfo`).innerHTML = 
                    `<div class="${ID}-productImage">
                      <div class="${ID}-images"></div>
                      <a href="${productLink}"></a>
                    </div>
                      <div class="${ID}-productDetails">
                          <div class="${ID}-title">
                              <h3>${productName.textContent.trim()}</h3>
                              <div class="${ID}-priceRating">
                                  <div class="${ID}-price">${productPrice.innerHTML}</div>
                                  ${productReviews ? `<div class="${ID}-reviews">${productReviews.innerHTML}</div>` : ''}
                              </div>
                            ${financeHS && financeHS !== '' ? `<div class="${ID}-finance">${financeHS.innerHTML}</div>` : ''} 
                          </div>
                          <div class="${ID}-productDescription">
                              <p>${productDescription.textContent.trim()}</p>
                              <a href="${productLink}">Read More</a>
                          </div>
                          <div class="${ID}-addSection">
                              ${basketForm ? basketForm.outerHTML : `<a class="${ID}-view" href="${productLink}">View Product</a>`}
                          </div>
                      </div>`;


                      quickViewBox.classList.add(`${ID}-quickViewShow`);
                      quickViewBox.classList.remove(`${ID}-quickViewHide`);
                      document.querySelector(`.${ID}-overlay`).classList.add(`${ID}-overlayShow`);
                      document.body.classList.add(`${ID}-noScroll`);

                      // add all images
                      for (let index = 0; index < images.length; index += 1) {
                        const prodImages = images[index];
                        const newImage = document.createElement('div');
                        newImage.classList.add(`${ID}-image`);
                        newImage.setAttribute('style', `background-image: url(${prodImages.getAttribute('src').replace('1490.jpg', '504.jpg')})`);

                        document.querySelector(`.${ID}-images`).appendChild(newImage);  
                      }

                      if(images.length > 1) {
                        imageSlider();
                      }

                      if(document.querySelector(`.${ID}-quickViewContent .product-buy-now__button`)){
                        document.querySelector(`.${ID}-quickViewContent .product-buy-now__button`).addEventListener('click', () => {
                        fireEvent('Added to basket from quick view');
                      });
                      }
                  }
                }
                request.send(); 

        });
      }
    }

    getProductDetails();

    quickViewEvents();

    // overlay click
    const overlay = document.querySelector(`.${ID}-overlay`);
    overlay.addEventListener('click', () => {
      closeQuickView();
    });

    const removeQuickView = () => {
      const quickViewCTA = document.querySelectorAll(`.${ID}-quickViewCTA`);
    if(quickViewCTA.length > 0) {
      for (let index = 0; index < quickViewCTA.length; index += 1) {
        const element = quickViewCTA[index];
        element.remove();
      }
    }
    }


    let oldHref = document.location.href;
      let bodyList = document.querySelector("body");
      const observeEl = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                  if (oldHref != document.location.href) {
                      oldHref = document.location.href;

                      removeQuickView();
                      addQuickViewButton();
                      quickViewEvents();
                      getProductDetails();
                    
                  }
              });
          });
      const config = {
          childList: true,
          subtree: true
      };
      
      observeEl.observe(bodyList, config);


    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
  }
  
};
