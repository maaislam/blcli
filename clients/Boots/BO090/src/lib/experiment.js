/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { events, observer, pollerLite } from '../../../../../lib/utils';
import { simulateMouseClick } from './helpers';
import { cookieOpt, setup } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  cookieOpt();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  if(VARIATION === 'control') {

    const allCarouselItems = carousel.querySelectorAll(`.rrItemContainer`);

    if(allCarouselItems) {
        for (let index = 0; index < allCarouselItems.length; index++) {
          const element = allCarouselItems[index];
          element.querySelector(`.rrItemTitle`).addEventListener('click', () => {
            events.send(`${ID} v${VARIATION}`, 'click', 'carousel product');
          });
          element.querySelector(`.rrImageContainer a`).addEventListener('click', () => {
            events.send(`${ID} v${VARIATION}`, 'click', 'carousel product');
          });
        }
    }

  } else {
    /*  ----------------
    Experiment code 
    ------------------ */

    /**
     *  IF PDP
     * 
     */

    if(document.querySelector('#estore_productpage_template_container')) {
      // functions without offers
      const moveReviews = () => {
        const reviewContainer = document.querySelector('#estore_pdp_trcol_1 #BVRRSummaryContainer');
        if(reviewContainer) {
          document.querySelector('.price.price_redesign').insertAdjacentElement('beforeend', reviewContainer);
        }
      }

      moveReviews();
      

      let mainOffer = [];

      /* 
      * ---- Promise to return the first offer and get the link by opening the box in the backround 
      */
      const generateOfferLinks = () => {

        return new Promise((resolve, reject) => {
            simulateMouseClick(document.querySelector(".pdp-promotion-redesign a"));

            // add class to make sure it's hidden
            document.body.classList.add(`${ID}-offerGenerating`);

            pollerLite(['#productPromotionPopup', '#productPromotionPopup .redesign-promotionLink a'], () => {

              const boxOffers = document.querySelector(`#productPromotionPopup .redesign-promotionLink`);
              const pattern = new RegExp(/\-(.*)/g);

              let offerName;
              if(boxOffers.childNodes[2].nodeType === 3) {
                offerName = boxOffers.childNodes[2].textContent.trim().replace(/\-(.*)/g, "");
              }
              
              const offerLink = boxOffers.querySelector('div a').getAttribute('onmousedown').match(/\('(.*?)'\)/)[1];
        
              if(offerName && offerLink) {
                mainOffer.push(offerName, offerLink);
              }
              
              simulateMouseClick(document.querySelector("#listerpage_tile_offers_overlay .close-btn"));
              document.body.classList.remove(`${ID}-offerGenerating`);

              resolve();
            });
        });
      }

      
      /* 
      * ---- Once the offer has been generated, run the rest of the test
      */
      generateOfferLinks().then(function() {

        // stored offer used in most functions
        const offerName = mainOffer[0]; 
        const offerLink = mainOffer[1];

        const shopOfferCTA = () => {
          const offerButton = document.createElement('a');
          offerButton.className = `${ID}-button ${ID}-shopAll`;
          offerButton.setAttribute('href', offerLink);
          offerButton.innerHTML = `Shop the <span>${offerName}</span> offer`;
          
          return offerButton;
        }

        /* Change carousel heading and add a shop all link */
        const carouselChanges = () => {
          const carousel = document.querySelector(`#richRelevanceContainer .rrContainer`);
          carousel.querySelector('h3').textContent = 'Other products in this offer';

          carousel.insertAdjacentHTML(`beforeend`, `<a class="${ID}-button ${ID}-textLink" href="${offerLink}"><span></span>View all products in the offer</a>`);

          // loop through all carousel products and add event
          const allCarouselItems = carousel.querySelectorAll(`.rrItemContainer`);

          for (let index = 0; index < allCarouselItems.length; index++) {
            const element = allCarouselItems[index];
            element.querySelector(`.rrItemTitle`).addEventListener('click', () => {
              events.send(`${ID} v${VARIATION}`, 'click', 'carousel product');
            });
            element.querySelector(`.rrImageContainer a`).addEventListener('click', () => {
              events.send(`${ID} v${VARIATION}`, 'click', 'carousel product');
            });
          }

          const shopAllCarouselLink = carousel.querySelector(`.${ID}-button.${ID}-textLink`);
          if(shopAllCarouselLink) {
            shopAllCarouselLink.addEventListener('click', () => {
              events.send(`${ID} v${VARIATION}`, 'click', 'shop all offer carousel');
            });
          }
        }

        /* CTA to add more  */
        const miniBagAddMore = () => {
          const productPrice = document.querySelector('#estore_product_price_widget #schemaOrgPrice');
          const addMoreButton = document.createElement('a');
          addMoreButton.className = `${ID}-button ${ID}-addMore ${ID}-textLink`;
          addMoreButton.setAttribute('href', window.location.href);
          addMoreButton.innerHTML = `Add two more for just <span>£${productPrice.textContent.trim()}</span>`;
          
          return addMoreButton;
        }

        /* Mini bag */
        const miniBagButton = () => {
          const miniBag = document.querySelector(`#widget_minishopcart_popup_1`);
          if(miniBag &&  miniBag.querySelector(`#GotoCartButton2`)) {
            miniBag.querySelector(`#GotoCartButton2`).insertAdjacentElement('beforebegin', shopOfferCTA());

            // shop offer cta event
            miniBag.querySelector(`.${ID}-button.${ID}-shopAll`).addEventListener('click', () => {
              events.send(`${ID} v${VARIATION}`, 'click', 'shop offer CTA');
            });

            if(VARIATION === '4') {
              pollerLite(['.product_quantity #MiniShopCartAddedProdQty1'], () => {
                const qtyButton = miniBag.querySelector('.product_quantity #MiniShopCartAddedProdQty1').textContent;
                if(qtyButton === '1') {
                  miniBag.querySelector(`.product`).insertAdjacentElement('afterend', miniBagAddMore());

                  document.querySelector(`.${ID}-button.${ID}-addMore.${ID}-textLink`).addEventListener('click', () => {
                    events.send(`${ID} v${VARIATION}`, 'click', 'shop offer CTA');
                  });
      
                }
              });
            }
          }
        }


        /* On update of add to bag */
        const addedToBasket = () => {
          observer.connect(document.querySelector('#MiniShoppingCart'), () => {
            miniBagButton();

            events.send(`${ID} v${ID}`, 'click', 'Added to bag');

            if(VARIATION === '3') {
              if(!document.querySelector(`.${ID}-offerCarousel`)) {
                createOfferCarousel();
              }
            }
            if(VARIATION === '5') {
              if(!document.querySelector(`.${ID}-offerCarousel`)) {
                createOfferCarousel();
              }
            }
          }, {
            throttle: 500,
            config: {
              attributes: true,
              childList: true,
            },
          });
        }

        /** Create the offer carousel for V2  */
        const createOfferCarousel = () => {
          const carouselContainer = document.createElement('div');
          carouselContainer.classList.add(`${ID}-offerCarousel`);
          carouselContainer.innerHTML = `
          <h3>Shop the offer</h3>
          <div class="${ID}-innerCarousel">
            <div class="${ID}-productsWrap"></div>
          </div>
          <a class="${ID}-button ${ID}-shopAll" href="${offerLink}">Shop all products</a>`;

          document.querySelector('.row.template_row_spacer').insertAdjacentElement('beforebegin', carouselContainer);

          // pull in the products
          const getOfferProducts = () => {
            jQuery.ajax({
                url: offerLink,
                type: 'post',
                success: function(data) {
                  const pageData = data;
                  const products = jQuery(pageData).find('.product_listing_container ul li');
                  const prodArr = Array.from(products);
                  const firstEight = prodArr.slice(0,8);
                  for (let index = 0; index < firstEight.length; index += 1) {
                      const element = firstEight[index];
                      element.classList.add(`${ID}-product`);
                      element.querySelector('.product_info').insertAdjacentElement('beforebegin',  element.querySelector('.product_top_section'));
                      document.querySelector(`.${ID}-offerCarousel .${ID}-productsWrap`).appendChild(element);
                    }             
                }
              });
          }

          getOfferProducts();

          const carouselEvents = () => {
            const allCarouselProducts = document.querySelectorAll(`.${ID}-offerCarousel .${ID}-product`);
            for (let index = 0; index < allCarouselProducts.length; index += 1) {
              const element = allCarouselProducts[index];
              element.querySelector('.product_img_link').addEventListener('click', () => {
                events.send(`${ID} v${VARIATION}`, 'click', 'product in new carousel');
              });
              element.querySelector('.product_name_link').addEventListener('click', () => {
                events.send(`${ID} v${VARIATION}`, 'click', 'product in new carousel');
              });
            }
          }
          pollerLite([`.${ID}-offerCarousel .${ID}-product`], () => {
            carouselEvents();
          });
          

          const slickProducts = () => {
            window.jQuery(`.${ID}-offerCarousel .${ID}-productsWrap`).slick({
                infinite: true,
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                mobileFirst: true,
                responsive: [
                  {
                    breakpoint: 300,
                    settings: "unslick"
                  },
                  {
                    breakpoint: 766,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 1,
                      infinite: true,
                      dots: false
                    }
                  },
                    {
                      breakpoint: 1023,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                      }
                    },
                    {
                      breakpoint: 9999,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                      }
                    },
                ]
            });

          }
          if(window.innerWidth > 767) {
            pollerLite([`.${ID}-product .product_info`], () => {
              slickProducts();
            });
          }
          window.addEventListener('resize', () => {
            if(window.innerWidth > 767) {
              pollerLite([`.${ID}-product .product_info`], () => {
                if(!document.querySelector(`.${ID}-offerCarousel .${ID}-productsWrap`).classList.contains('slick-initialized')) {
                  slickProducts();
                }
              });
            }
          })

        }     

      
        if(offerName) {
          // variations only if not 3 for 2 or only on that product
          if(offerName.indexOf('Only £') === -1 && offerName.indexOf('Worth £') === -1 && offerName.indexOf('3 for 2') === -1) {
            if(VARIATION === '1') {
              document.querySelector(`#in_stock_actions`).insertAdjacentElement('afterend', shopOfferCTA());
              addedToBasket();
              carouselChanges();
            }

            if(VARIATION === '2') {
              document.querySelector(`#in_stock_actions`).insertAdjacentElement('afterend', shopOfferCTA());
              addedToBasket();
              createOfferCarousel();
            }

            if(VARIATION === '3') {
              document.querySelector(`#in_stock_actions`).insertAdjacentElement('afterend', shopOfferCTA());
              addedToBasket();
            }

             // shop offer cta event
             if(document.querySelector(`.shopperActions .BO090-button.BO090-shopAll`)) {
              document.querySelector(`.shopperActions .BO090-button.BO090-shopAll`).addEventListener('click', () => {
                events.send(`${ID} v${VARIATION}`, 'click', 'shop offer CTA');
              });
            }
          }

          // if 3 for 2
          if(offerName.indexOf('3 for 2') > -1) {

            if(VARIATION === '4') {
              document.querySelector(`#in_stock_actions`).insertAdjacentElement('afterend', shopOfferCTA());
              carouselChanges();
              addedToBasket();
            }

            if(VARIATION === '5') {
              document.querySelector(`#in_stock_actions`).insertAdjacentElement('afterend', shopOfferCTA());
              addedToBasket();
            }
          }
        }
      }); 
      
    }

    /**
     *  If Basket
     * 
     */

    const addbasketOfferCTA = () => {
      const allProducts = document.querySelectorAll(`.row.product_item`);
      for (let index = 0; index < allProducts.length; index += 1) {
        const element = allProducts[index];
        if(element.querySelector('.promo_offer_container')) {
          const offLink = element.querySelector('.promo_offer_container a');

          if(offLink) {
            element.querySelector('.basket_product_sku').insertAdjacentHTML('afterend',`<a class="${ID}-textLink" href="${offLink.getAttribute('href')}">${offLink.textContent.trim()}</a>`);
            if(element.querySelector(`.${ID}-textLink`)) {
              // shop offer cta event
              element.addEventListener('click', () => {
                events.send(`${ID} v${VARIATION}`, 'click', 'shop offer in basket');
              });
            }
          }
        }

      }
    }

    const removeAllNewOffers = () => {
      const allOffer = document.querySelectorAll(`.${ID}-textLink`);
      for (let index = 0; index < allOffer.length; index += 1) {
        const element = allOffer[index];
        if(element) {
          element.remove();
        }
      }
    }

    if(window.location.href.indexOf('/OrderItemDisplay?') > -1) {
      addbasketOfferCTA();

      

      observer.connect(document.querySelector('#MiniShoppingCart'), () => {
        removeAllNewOffers();
        setTimeout(() => {
          addbasketOfferCTA();
        }, 3000);
      
      }, {
        throttle: 500,
        config: {
          attributes: true,
          childList: true,
        },
      });
    }
  }
    
};
