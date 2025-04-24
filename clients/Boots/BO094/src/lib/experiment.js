/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import QuickViewBox from './quickViewBox';
import { cookieOpt, fireEvent, setup } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  cookieOpt();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  /*  ----------------
    Experiment code 
    ------------------ */
    new QuickViewBox();

    // add overlay
    document.body.insertAdjacentHTML(`beforeend`, `<div class="${ID}-overlay"></div>`)


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

    const addQuickViewButton = () => {

      // add quick view on all products with CTA and not bundle products
      const allProducts = document.querySelectorAll(`.grid_mode.grid .estore_product_container`);
      for (let index = 0; index < allProducts.length; index += 1) {
        const element = allProducts[index];
        if(element.querySelector('.button.primary') && element.querySelector('.product_name_link').textContent.indexOf('bundle') === -1) {
          element.classList.add(`${ID}-hascta`);
          if(VARIATION === '1') {
            element.querySelector('.product_add').insertAdjacentHTML(`beforebegin`, `<div class="${ID}-quickViewCTA">Quick View</div>`);
          } else if(VARIATION === '2'){
            element.querySelector('.product_add').insertAdjacentHTML(`afterbegin`, `<div class="${ID}-quickViewCTA">Quick View</div>`);
          }
        }
      }
    }

    addQuickViewButton();

    const getProductDetails = () => {
      const quickViewBox = document.querySelector(`.${ID}-quickView`);

      const allQuickViewCTAs = document.querySelectorAll(`.${ID}-quickViewCTA`);
      for (let index = 0; index < allQuickViewCTAs.length; index += 1) {
        const element = allQuickViewCTAs[index];

        element.addEventListener('click', () => {
          fireEvent('Clicked Quick View');
          let clickedProduct;
          if(VARIATION === '1') {
            clickedProduct = element.parentNode; 
          } else if (VARIATION === '2') {
            clickedProduct = element.parentNode.parentNode
          }
          const productLink = clickedProduct.querySelector('.product_image .product_img_link').getAttribute('href');

          
          // get info that's already on the product 
          const productName = clickedProduct.querySelector('.product_top_section');
          const productPrice = clickedProduct.querySelector('.product_info');
          const productReviews = clickedProduct.querySelector('.product_rating');
          const productOffer = clickedProduct.querySelector('.product_offer');
          const productImage = clickedProduct.querySelector('.product_img');
          

          // get the rest of the info from the request
          const request = new XMLHttpRequest();
            request.open('GET',productLink, true);
            request.onload = () => {
              if (request.status >= 200 && request.status < 400) {
                const temp = document.createElement('html');
                temp.innerHTML = request.responseText;
                
                const productDesc = temp.querySelector('#estore_product_longdesc [dir="ltr"]');                
                const pointsAmount = temp.querySelector('.estore_adcard_points_to_earn_widget');


                // create markup for the quick view box
                quickViewBox.querySelector(`.${ID}-productInfo`).innerHTML = 
                `<div class="${ID}-productImage" style="background-image: url(${productImage.getAttribute('src')})">
                  <a href="${productLink}"></a>
                </div>
                  <div class="${ID}-productDetails">
                      <div class="${ID}-title">
                          <h3>${productName.textContent.trim().replace(/\([^()]*\)/, "")}</h3>
                          <div class="${ID}-priceRating">
                              <div class="${ID}-price">${productPrice.innerHTML}</div>
                              ${productReviews ? `<div class="${ID}-reviews">${productReviews.innerHTML}</div>` : ''}
                          </div>
                      </div>
                      <div class="${ID}-productDescription">
                          <p>${productDesc.querySelector('#product_long_description').innerHTML}</p>
                          <a href="${productLink}">Read More</a>
                      </div>
                      <div class="${ID}-addSection">
                          ${productOffer ? `<div class="${ID}-offer">${productOffer.innerHTML}</div>` : ''}
                          <div class="${ID}-addCTA">Add to basket</div>
                          <div class="${ID}-points">${pointsAmount.innerHTML}</div>
                      </div>
                  </div>`;


                  quickViewBox.classList.add(`${ID}-quickViewShow`);
                  quickViewBox.classList.remove(`${ID}-quickViewHide`);
                  document.querySelector(`.${ID}-overlay`).classList.add(`${ID}-overlayShow`);

                  // Wishlist functionality

                  const itemWishlist = quickViewBox.querySelector(`.${ID}-wishlist`);

                  // if wishlist already clicked make wishlist icon red
                  if(element.parentNode.querySelector('.favouritesPDP-container.favouritesPDP-brand') && element.parentNode.querySelector('.favouritesPDP-container.favouritesPDP-brand').classList.contains('active')) {
                    itemWishlist.classList.add(`${ID}-wishlistSaved`);
                  } else {
                    itemWishlist.classList.remove(`${ID}-wishlistSaved`);
                  }

                  // on wishlist click in quick view
                  itemWishlist.addEventListener('click', () => {
                    if(clickedProduct.querySelector('#wishListSection .favouritesPDP-container')) {
                      clickedProduct.querySelector('#wishListSection .favouritesPDP-container').click();
                    }
                    setTimeout(() => {
                      if(clickedProduct.querySelector('.favouritesPDP-container.favouritesPDP-brand').classList.contains('active')) {
                        itemWishlist.classList.add(`${ID}-wishlistSaved`);
                      } else {
                        itemWishlist.classList.remove(`${ID}-wishlistSaved`);
                      }
                    }, 550)
                  });


                  // add to basket click
                  const quickViewaddToBag = quickViewBox.querySelector(`.${ID}-addCTA`);
                  quickViewaddToBag.addEventListener('click', () => {
                    clickedProduct.querySelector('.shopperActions .button.primary').click();
                    closeQuickView();
                  });

                  // hide save price if it says £0
                  const secondSaveprice = quickViewBox.querySelectorAll(`.${ID}-price .save`);
                  if(secondSaveprice) {
                    if(secondSaveprice[1] && secondSaveprice[1].textContent === 'Save £0.00') {
                      secondSaveprice[1].style = 'display: none';
                    }
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
};
