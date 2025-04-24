import { events, pollerLite } from "../../../../../lib/utils";
import { deliveryThreshold } from "./helpers";
import shared from "./shared";

const { ID, VARIATION } = shared;

export const upsellProducts = {

    'Up to Snow Good – Children’s Advent Calendar': {
        id: '300694',
        price: '£8.00',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw4da3e664/images/300694.jpg?sw=500&sh=500&sm=fit',
        link: 'https://www.hotelchocolat.com/uk/kids-advent-calendar.html',
    },
    'The Christmas Pick Me Up': {
        id: '357794',
        price: '£12.00',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw825f9df5/images/357794.jpg?sw=875&sh=875&sm=fit',
        link: 'https://www.hotelchocolat.com/uk/the-christmas-pick-me-up.html',
    },
    'The Advent Calendar Milk': {
        id: '300687',
        price: '£12.50',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw46f68043/images/300687.jpg?sw=500&sh=500&sm=fit',
        link: 'https://www.hotelchocolat.com/uk/chocolate-advent-calendar.html',
    },
    'The Advent Calendar White': {
        id: '300689',
        price: '£12.50',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc0250364/images/300689.jpg?sw=500&sh=500&sm=fit',
        link: 'https://www.hotelchocolat.com/uk/the-advent-calendar-white.html',
    },

    'The Milk to Caramel H-Box': {
        id: '260749',
        price: '£12.95',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwbaae17c0/images/the-milk-to-caramel-hbox.jpg?sw=875&sh=875&sm=fit',
        link: 'https://www.hotelchocolat.com/uk/caramel-chocolate-box.html',
    },
    
    'The Patisserie Chocolate H-Box': {
        id: '260751',
        price: '£12.95',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw63d6323b/images/260751-patisserie-h-box.jpg?sw=875&sh=875&sm=fit',
        link: 'https://www.hotelchocolat.com/uk/patisserie-chocolates.html',
    },
    'The Everything H-Box of Chocolates': {
      id: '260748',
      price: '£12.95',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw85c6d8a7/images/260748.jpg?sw=875&sh=875&sm=fit',
      link: 'https://www.hotelchocolat.com/uk/everything-chocolate-selection.html',
    },
    'The Tipsy Truffles H-Box': {
      id: '260750',
      price: '£12.95',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw044f2f50/images/the-tipsy-truffles-hbox.jpg?sw=875&sh=875&sm=fit',
      link: 'https://www.hotelchocolat.com/uk/boozy-chocolate-truffles.html',
    },

    'The Winter Puddings H-box': {
      id: '263290',
      price: '£12.95',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwb52a32f8/images/263290.jpg?sw=500&sh=500&sm=fit',
      link: 'https://www.hotelchocolat.com/uk/263290.html',
    },

    'The Classic Christmas H-box': {
      id: '263286',
      price: '£12.95',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw3f578442/images/263286.jpg?sw=500&sh=500&sm=fit',
      link: 'https://www.hotelchocolat.com/uk/263286.html',
    },

    'Merry Christmas Signature Chocolate Box': {
      id: '112095',
      price: '£15.00',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7df9931e/images/112095.jpg?sw=500&sh=500&sm=fit',
      link: 'https://www.hotelchocolat.com/uk/112095.html',
    },

    'The Dark Signature': {
      id: '263329',
      price: '£15.50',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwa5f829e3/images/263329.jpg?sw=500&sh=500&sm=fit',
      link: 'https://www.hotelchocolat.com/uk/263329.html',
    },

    'The Signature Collection - Classic': {
      id: '263328',
      price: '£15.50',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwf51de43f/images/263328.jpg?sw=500&sh=500&sm=fit',
      link: 'https://www.hotelchocolat.com/uk/263328.html',
    },

    'The Christmas Goody Bag': {
      id: '357793',
      price: '£18.00',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwf4692c10/images/357793.jpg?sw=875&sh=875&sm=fit',
      link: 'https://www.hotelchocolat.com/uk/357793.html',
    },
}

export default class UpsellLightbox {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
      pollerLite([`.${ID}-modal .${ID}-productCarousel`], () => {
        this.slickImages();
      });
    }
  
    create() {  
    
        // get basket difference
      let priceAwayFromDelivery;     
      const basketTotalEl = document.querySelector('.mini-cart-wrapper .mini-cart-subtotals .subtotal');
      // if basket total, set basket amount
      if (basketTotalEl) {
          const basketAmount = parseFloat(basketTotalEl.textContent.replace('£', ''));
          priceAwayFromDelivery = (deliveryThreshold() - basketAmount).toFixed(2);
      }

      const productName = document.querySelector('#page_heading h1');
      const qty = document.querySelector('.inventory input');
      
      const element = document.createElement('div');
      element.classList.add(`${ID}-modal`);
      element.innerHTML = `
        <div class="${ID}-close"></div>
        <div class="${ID}-modalInner">
            <div class="${ID}-titleBlock">
                
                  <h3 class="${ID}-productAdded">Product added to bag: <span class="${ID}-productName">${qty.value} x ${productName.textContent.trim()}</span></h3>
                  <span class="${ID}-delivery">You’re only <b>£${priceAwayFromDelivery}</b> away from free delivery</span>
                </h3>
            </div>
            <p>Why not add some of these products to your basket too?</p>
            <div class="${ID}-productCarousel"></div>
            <div class="${ID}-buttonsWrap">
                <a class="${ID}-button ${ID}-white ${ID}-continue">Continue Shopping</a>
                <a class="${ID}-button ${ID}-green" href="https://www.hotelchocolat.com/uk/basket">View basket</a>
            </div>
        </div>`;

        this.component = element;

        // add overlay
        document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);

        // add products
        Object.keys(upsellProducts).forEach((i) => {
            const data = upsellProducts[i];

            if(sessionStorage.getItem(`oos-${data.id}`)) {
              return;
            }

            const upsellProduct = document.createElement('div');
            upsellProduct.classList.add(`${ID}-product`);
            upsellProduct.innerHTML = `
            <a class="${ID}-prodLink" href="${data.link}">
                <div class="${ID}-productimage" style="background-image:url(${data.image})"></div>
                <p>${[i][0]}</p>
                <p class="${ID}-price">${data.price}</p>
            </a>
            <a class="${ID}-button ${ID}-black" prod-id="${data.id}">Add to bag</a>`;

            element.querySelector(`.${ID}-productCarousel`).appendChild(upsellProduct);
        });
    }
  
    bindEvents() {
      const { component } = this;


      const closeLightbox = () => {
        const overlay = document.querySelector(`.${ID}-overlay`);
        component.classList.add(`${ID}-modalHide`);
        overlay.classList.add(`${ID}-overlayHide`);
      }

      const continueButton = component.querySelector(`.${ID}-continue`);
      continueButton.addEventListener('click', () => {
        closeLightbox();
        sessionStorage.setItem(`${ID}-modalShown`, true);
        events.send(`${ID} variation: ${VARIATION}`, 'clicked', `continue shopping`);
      });

      const overlay = document.querySelector(`.${ID}-overlay`);
      overlay.addEventListener('click', () => {
        closeLightbox();
        sessionStorage.setItem(`${ID}-modalShown`, true);
        events.send(`${ID} variation: ${VARIATION}`, 'clicked', `close upsell box`);
      });

      const closeBox = component.querySelector(`.${ID}-close`);
      closeBox.addEventListener('click', () => {
        closeLightbox();
        sessionStorage.setItem(`${ID}-modalShown`, true);
        events.send(`${ID} variation: ${VARIATION}`, 'clicked', `close upsell box`);
      });


      // add to upsell to basket
     const allProducts = component.querySelectorAll(`.${ID}-product`);
     for (let index = 0; index < allProducts.length; index += 1) {
         const element = allProducts[index];
         const addButton = element.querySelector(`.${ID}-button`);
         const productLink = element.querySelector(`.${ID}-prodLink`);

         if(productLink) {
          productLink.addEventListener('click', (e) => {
              const prodName = element.querySelector('p');
              events.send(`${ID} variation: ${VARIATION}`, 'clicked', `view product: ${prodName}`);
          });
        }

          // add to upsell to basket
         addButton.addEventListener('click', (e) => {
            const prodName = element.querySelector('p');
            const prodId = e.currentTarget.getAttribute('prod-id');
           
            window.jQuery.ajax({
                url: 'https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Cart-AddProduct?format=ajax',
                type: 'post',
                data: `Quantity=1&cartAction=add&pid=${prodId}`,
                success:function(){
                  if(window.innerWidth >= 960) {
                    sessionStorage.setItem(`${ID}-addedUpsell`, true);
                  }
                    addButton.classList.add(`${ID}-addingToBag`);
                    closeLightbox();
                    window.location.reload();
                    events.send(`${ID} variation: ${VARIATION}`, 'clicked', `lightbox add: ${prodName.textContent}`);
                }
              });
         });
        }

    }
  
    render() {
      const { component } = this;
      document.body.append(component);
    }

    slickImages () {
            window.jQuery(`.${ID}-productCarousel`).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                mobileFirst: true, 
                responsive: [
                    {
                      breakpoint: 1200,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2
                      }
                    },
                    {
                      breakpoint: 1008,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                      }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                          slidesToShow: 3,
                          slidesToScroll: 2
                        }
                      },
                    {
                          breakpoint: 400,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                          }
                      },
                      {
                          breakpoint: 374,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                          }
                      },
                      {
                          breakpoint: 300,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                          }
                      },
      
                    ]
            });         
    }
  }
