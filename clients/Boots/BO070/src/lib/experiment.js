/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */;
import { observer,  poller,  pollerLite } from '../../../../../lib/utils';
import MiniBasket from './miniBasket';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID, VARIATION } = shared;

  /*
  TO DO:
  style the mini basket add on desktop
  fix the normal basket not showing after removing product from PDP */

    /**
     * Create overlay
     */
    const addOverlay = () => {
    document.body.insertAdjacentHTML('beforeend', `
    <div class="${ID}-basketOverlay">
    </div>`);

    if(window.innerWidth >= 1024) {
      pollerLite(['#estore_productpage_template_container', '#richRelevanceContainer > .rrPlacements'], () => {
        document.querySelector(`.${ID}-basketOverlay`).innerHTML = 
        `<div class="${ID}-otherProducts">
          <h4>Recommended</h4>
          <div class="${ID}-carousel"></div>
        </div>`;
      });
    }
    }

    /**
     * Create mini basket
     */
    addOverlay();
    new MiniBasket();

    /*
    * Mini add to basket
    */
   const smallAddToBag = () => {
     const miniAdd = document.createElement('div');
     miniAdd.classList.add(`${ID}-miniAdd`);
     miniAdd.innerHTML = `
      <p class="${ID}-empty">You currently have no items in your basket</p>
      <div class="${ID}-product">
        <div class="${ID}-title"><span></span> Item added to your basket</div>
        <div class="${ID}-productAdded"></div>
        <div class="${ID}-buttons">
          <a class="${ID}-basketButton ${ID}-minibasket">Basket</a>
          <a class="${ID}-basketButton  ${ID}-minicheckout" href="/OrderItemDisplay">Checkout</a>
        </div>
    </div>`;

     if(window.innerWidth <= 767) {
       document.querySelector('#header').insertAdjacentElement('afterend', miniAdd);
     } else {
      document.querySelector('#header').appendChild(miniAdd);
     }

   }

    /**
     * Show the basket
     */
    const showBasket = () => {
      const overlay = document.querySelector(`.${ID}-basketOverlay`);
      const miniBasket = document.querySelector(`.${ID}-miniBasketWrapper`);

      document.body.classList.add(`${ID}-noScroll`);
      miniBasket.classList.add(`${ID}-activeBasket`);
      overlay.classList.add(`${ID}-overlayActive`);
    }

    const addEditToProducts = () => {
      const allProducts = document.querySelectorAll(`.${ID}-product`);
      if(allProducts) {
        for (let index = 0; index < allProducts.length; index += 1) {
          const element = allProducts[index];

          if(element.querySelector('.product_quantity')) {
            element.querySelector('.product_quantity').insertAdjacentHTML('beforeend', `<a href="/OrderItemDisplay">Edit</a>`);
          }
        }
      }
    }
    

    /**
     * Add upsell on product pages
     */
    const addUpsellProducts = () => {
      
        const firstCarousel = document.querySelector('#richRelevanceContainer > .rrPlacements');
        if(firstCarousel) {
          const upsellCarousel = firstCarousel.querySelectorAll('.rrItemsContainer');
          if(upsellCarousel) {
            for (let index = 0; index < upsellCarousel.length; index += 1) {
              const element = upsellCarousel[index];
              const carouselProduct = document.createElement('div');
              carouselProduct.classList.add(`${ID}-carouselProducts`);
              carouselProduct.innerHTML = element.innerHTML;

            
                document.querySelector(`.${ID}-otherProducts .${ID}-carousel`).appendChild(carouselProduct);
              }
            }
          }
  
      
    }

    /**
     * Tracking for upsell products
     */
    const upsellTracking = () => {
      const upsellProducts = document.querySelectorAll(`.${ID}-carouselProducts .rrItemContainer`);
      if(upsellProducts) {
        for (let index = 0; index < upsellProducts.length; index += 1) {
          const element = upsellProducts[index];
          element.querySelector('a').addEventListener('click', () => {
            window.cmCreateManualLinkClickTag('/BO070?cm_sp=BO070MiniBasket-_-ClickedRecs-_-ProductTiles');
          });
        }
      }
    }

    /**
     * Edit button event
     */
    const editTracking = () => {
      const editItems = document.querySelectorAll(`.${ID}-products .product_quantity a`);
      if(editItems){
        for (let index = 0; index < editItems.length; index += 1) {
          const element = editItems[index];
          if(element) {
            element.addEventListener('click', () => {
              window.cmCreateManualLinkClickTag('/BO070?cm_sp=BO070MiniBasket-_-ClickedEdit-_-CTA');
            });
          }
        }
      }
    }

    /**
     * Slick upsell products
     */
    const slickProducts = () => {
      window.jQuery(`.${ID}-otherProducts .${ID}-carouselProducts`).slick({
          infinite: true,
          arrows: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          mobileFirst: true,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },

          ]
      });
    }

    const removeUpsell = () => {
      const carousel = document.querySelector(`.${ID}-carouselProducts`);
      if(carousel) {
        carousel.remove();
      }
    }


     /**
     * Function for when mini bag is clicked
     */
    const slideBasketOut = () => {

        removeUpsell();

        // force mini basket to show to get products but keep it hidden
        toggleMiniShopCartDropDown('widget_minishopcart','quick_cart_container','orderItemsList');
        
        // wait for the basket to exist
        pollerLite(['#MiniShopCartProductsList #cartDropdown'], () => {
       
          window.cmCreateManualLinkClickTag('/BO070?cm_sp=BO070MiniBasket-_-BasketShown-_-CTA')

          // put click event here for mini bag
          if(VARIATION !== 'control' && document.querySelector('#MiniShopCartProductsList #cartDropdown .products .product')) {
              const miniBasketControl =  document.querySelector('#MiniShopCartProductsList');

              document.querySelector(`.${ID}-miniBasketWrapper .${ID}-products`).innerHTML = '';

              const miniBasketProducts = document.querySelectorAll('#MiniShopCartProductsList #cartDropdown .products .product');
              for (let index = 0; index < miniBasketProducts.length; index += 1) {
                  const basketEl = miniBasketProducts[index];
                  const newProduct = document.createElement(`div`);
                  newProduct.classList.add(`${ID}-product`);
                  newProduct.innerHTML = basketEl.innerHTML;
                  document.querySelector(`.${ID}-miniBasketWrapper .${ID}-products`).appendChild(newProduct);
              }

              addEditToProducts();
              editTracking();
              

              // add price and total products from mini basket
              const basketTotal = miniBasketControl.querySelector('.subtotal .product_price');
              const productNo = miniBasketControl.querySelector('.mini_basket_order_qty');

              if(basketTotal && productNo)  {
                document.querySelector(`.${ID}-miniBasketWrapper .${ID}-itemCount .${ID}-itemNo`).textContent = productNo.textContent.match(/\d+/g)[0];
                document.querySelector(`.${ID}-miniBasketWrapper .${ID}-totalPriceText .${ID}-totalPrice`).textContent = basketTotal.textContent;
              }

              if(window.innerWidth >= 1024 && document.querySelector('#estore_productpage_template_container')) {
                pollerLite([`.${ID}-otherProducts .${ID}-carousel`, '#richRelevanceContainer > .rrPlacements'], () => {
                  removeUpsell();
                  addUpsellProducts();
               
                  upsellTracking();
                  slickProducts();
                  window.jQuery(`.${ID}-otherProducts .${ID}-carouselProducts`).slick('resize');
                });
              }


              showBasket();

          } else {

          }
        });

    }

 
    /**
     * Show the added to bag message
     */
    const addedToBagMessage = () => {

      const addToBag = document.querySelector(`.${ID}-miniAdd`);

      // wait for the basket to update
      observer.connect(document.querySelector('#MiniShoppingCart'), () => {

        removeUpsell();

        // clear last added product
        addToBag.querySelector(`.${ID}-productAdded`).innerHTML = '';
        
        // wait for the basket to exist
        pollerLite(['#MiniShopCartProductAdded'], () => {
         
          window.scrollTo(0,0);

          addToBag.classList.add(`${ID}-addedActive`);

          window.cmCreateManualLinkClickTag('/BO070?cm_sp=BO070MiniBasket-_-NotificationShown-_-CTA')

          if(window.innerWidth > 767) {
            const prodImage = document.querySelector('#cartDropdown .products.added .product_image img');
            const prodName = document.querySelector('#cartDropdown .products.added .product_name a');
            const prodPrice = document.querySelector('#cartDropdown .products.added .product_price');

            if(prodName && prodPrice && prodImage) {
              addToBag.querySelector(`.${ID}-productAdded`).removeAttribute('style');
              addToBag.querySelector(`.${ID}-title`).textContent = 'Item added to your basket';

              addToBag.querySelector(`.${ID}-productAdded`).innerHTML = 
              `<div class="${ID}-image" style="background-image:url(${prodImage.src})"></div>
              <div class="${ID}-productInfo">
                <h3>${prodName.textContent.trim()}</h3>
                <p>${prodPrice.textContent.trim()}</p>
              </div>`
            } else {
              addToBag.querySelector(`.${ID}-productAdded`).style.display = 'none';
              addToBag.querySelector(`.${ID}-title`).textContent = 'Basket updated';
            }
          }

          // on mini basket buttons click

          document.querySelector(`.${ID}-miniAdd .${ID}-basketButton.${ID}-minicheckout`).addEventListener('click', () => {
            window.cmCreateManualLinkClickTag('/BO070?cm_sp=BO070MiniBasket-_-NotificationCheckout-_-CTA');
          });
        
          // wait for the mini basket function to stop working
          document.querySelector(`.${ID}-miniAdd .${ID}-basketButton.${ID}-minibasket`).addEventListener('click', () => {
            document.querySelector(`.${ID}-miniAdd .${ID}-basketButton.${ID}-minibasket`).classList.add(`${ID}-loader`);

            window.cmCreateManualLinkClickTag(`/BO070?cm_sp=BO070MiniBasket-_-NotificationBasket-_-CTA`);
            setTimeout(() => {
              slideBasketOut();
              document.querySelector(`.${ID}-miniAdd .${ID}-basketButton.${ID}-minibasket`).classList.remove(`${ID}-loader`);
            }, 4000)
          });

          // hide after X seconds
          setTimeout(() => {
            addToBag.classList.remove(`${ID}-addedActive`);
            document.querySelector('#widget_minishopcart').removeAttribute('onclick');
            document.querySelector('#widget_minishopcart').removeAttribute('onkeypress');
          }, 6000);
        });
      }, {
        throttle: 500,
        config: {
          attributes: false,
          childList: true,
          // subtree: true,
        },
      });

    }

    // PDP
    pollerLite(['#estore_productpage_template_container', '#productPageAdd2Cart'], () => {
      if(document.querySelector('#estore_productpage_template_container')) {
        const productPageCTA = document.querySelector('#productPageAdd2Cart');
        productPageCTA.addEventListener('click', () => {
            // if colour options or button is disabled
            const colourOpt = document.querySelector('#sizeComboButton .sizeComboButton_label .tooltip span');
            if(colourOpt && colourOpt.textContent.indexOf('Choose colour first') > -1 || document.querySelector('#add2CartBtn.button.primary.disabled')) {
              return;
            }
  
            addedToBagMessage();
        });
      }

    });
   

    pollerLite(['.estore_product_container', '.product_listing_container'], () => {
      // PLPs with grid
      if(document.querySelector('.product_listing_container')) {
        document.body.classList.add(`${ID}-PLP`);
        const allProducts = document.querySelectorAll('.estore_product_container');
        for (let index = 0; index < allProducts.length; index += 1) {
          const element = allProducts[index];
          const addButton = element.querySelector('[id^="add2CartBtn"]');

          if(addButton) {
            addButton.addEventListener('click', () => {
              addedToBagMessage();

            });
          }
        }
      }
    });

    pollerLite(['.cu-car', '.cu-car-item .button.btnSecondary'], () => {
      // category and offers pages
      if(document.querySelector('.cu-car') && document.querySelector('.cu-car-item .button.btnSecondary')) {
        document.body.classList.add(`${ID}-PLP`);
        const allProducts = document.querySelectorAll('.cu-car-item');
        for (let index = 0; index < allProducts.length; index += 1) {
          const element = allProducts[index];
          const addButton = element.querySelector('.button.btnSecondary');

          if(addButton) {
            addButton.addEventListener('click', () => {
              addedToBagMessage();
    
            });
          }
        }
      }
    });

    /* Add mini bag to page */
    smallAddToBag();

    /* Mini bag click */
    const addToBagClick = () => {
      const miniBag = document.querySelector('#MiniShoppingCart');
      document.querySelector('#widget_minishopcart').removeAttribute('onclick');
      document.querySelector('#widget_minishopcart').removeAttribute('onkeypress');


      miniBag.addEventListener('click', (e) => {
        if(e.target.id === 'widget_minishopcart') {
          e.preventDefault();

          const addToBag = document.querySelector(`.${ID}-miniAdd`);
          // if basket is empty, show empty basket message
          if(document.querySelector('#minishopcart_total') && document.querySelector('#minishopcart_total').textContent.trim() === '') {
            addToBag.classList.add(`${ID}-emptybasket`);
            setTimeout(() => {
              addToBag.classList.remove(`${ID}-emptybasket`);
            }, 3000);
          } else {
            addToBag.classList.remove(`${ID}-emptybasket`);
            slideBasketOut();
          }
        }
      });
    }

    addToBagClick();
  
};
