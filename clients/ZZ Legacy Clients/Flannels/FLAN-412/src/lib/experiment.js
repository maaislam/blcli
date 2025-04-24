/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
import { events, logMessage, pollerLite, observer } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;
let mySwiper, contentHolder;

const getPageData = () => {

  let dataObject;
  for (let i = 0; i < window.dataLayer.length; i += 1) {
    const data = window.dataLayer[i];
    if (typeof data === 'object' && data.event && data.event === 'FLAN_onLoad') {
      dataObject = data;
      break;
    }
  }
  return dataObject;

}

const openModal = () => {
  document.documentElement.classList.add(`${ID}-noscroll`);
  contentHolder.classList.add(`active`);

  

  if(document.querySelector(`.${ID}-wishlist-items .swiper-wrapper`).childElementCount == 0) {
    document.querySelector(`.${ID}-wishlist-holder`).classList.remove('loading');
    
  } 

}

const closeModal = () => {
  document.documentElement.classList.remove(`${ID}-noscroll`);
  contentHolder.classList.remove(`active`);
}

const initiateSlider = () => {

  // Run slick
  let slider = document.querySelector(`#${ID}-wishlist-items`);
  slider.classList.add('swiper-active');

  mySwiper = new Swiper(slider, {
    // Optional parameters
    init: false,
    loop: false,
    // If we need pagination
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 0,
    // Disable preloading of all images
    preloadImages: true,
    // Enable lazy loading
    lazy: false,
    // Responsive breakpoints
    pagination: {
      el: `#${ID}-carousel-pagination`,
      type: 'bullets',
      clickable: true,

    },
    navigation: {
      nextEl: `.${ID}-button-next`,
      prevEl: `.${ID}-button-prev`,
    }

  })

  // Once the carousel is ready, initiate swiper and remove the loading spinner to display the carousel

  setTimeout(function () {
    mySwiper.init();
  }, 300);

  setTimeout(function () {

    document.querySelector(`.${ID}-wishlist-holder`).classList.remove('loading');

  }, 600);

}

const updateSlider = () => {

  mySwiper.update();

}

const updateHeaderWishlist = () => {

  if(localStorage.getItem(`${ID}-user-wishlist`)) {
    let wishlistLength = JSON.parse(localStorage.getItem(`${ID}-user-wishlist`)).length;
    if(wishlistLength > 0) {
      if(document.getElementById(`${ID}-no-wishlist-items`)) {
        document.getElementById(`${ID}-no-wishlist-items`).remove();
      }
      
      if(document.getElementById(`${ID}-header-wishlist-count`)) {
        document.getElementById(`${ID}-header-wishlist-count`).innerHTML = wishlistLength;
        
      } else {
    
        let countHTML = `<span id="${ID}-header-wishlist-count" class="${ID}-header-wishlist-count">${wishlistLength}</span>`;
        let insertionPoint = document.querySelector('.wishQuantityContainer');
        insertionPoint.insertAdjacentHTML('afterbegin', countHTML);
        
      }
    } else {
      if(document.getElementById(`${ID}-header-wishlist-count`)) {
        document.querySelector(`.${ID}-wishlist-holder`).insertAdjacentHTML('afterbegin', `<p id="${ID}-no-wishlist-items" class="${ID}-no-wishlist-items"> There are no items in the wishlist </p>`); 
        document.getElementById(`${ID}-header-wishlist-count`).remove(); 
      }
      
    }


    updateWishlistModalItems();

  }
  


  
}

const addProductToWishlist = (productInfo) => {

  let wishlist = [];

  if(localStorage.getItem(`${ID}-user-wishlist`)) {
    let currWishlist = JSON.parse(localStorage.getItem(`${ID}-user-wishlist`));
    currWishlist.unshift(productInfo);
    localStorage.setItem(`${ID}-user-wishlist`, JSON.stringify(currWishlist));
  } else {
    wishlist.unshift(productInfo);
    localStorage.setItem(`${ID}-user-wishlist`, JSON.stringify(wishlist));
  }

  updateHeaderWishlist();

}

const removeProductFromWishlist = (productInfo) => {

  if(localStorage.getItem(`${ID}-user-wishlist`)) {
    let currWishlist = JSON.parse(localStorage.getItem(`${ID}-user-wishlist`));
    currWishlist.pop(productInfo);
    localStorage.setItem(`${ID}-user-wishlist`, JSON.stringify(currWishlist));
  }

  amendPLPWishlistIcons();
  updateHeaderWishlist();

}

const removeProductFromWishlistBySKU = (sku) => {

  if(localStorage.getItem(`${ID}-user-wishlist`)) {
    let currWishlist = JSON.parse(localStorage.getItem(`${ID}-user-wishlist`));
    
    currWishlist = currWishlist.filter((wishlistItem) => {

      if(wishlistItem.sku == sku) {
        return false;
      } else {
        return true;
      }

    })

    localStorage.setItem(`${ID}-user-wishlist`, JSON.stringify(currWishlist));
  }

  amendPLPWishlistIcons();
  updateHeaderWishlist();

}

const removeProductFromWishlistBySeqId = (seqId) => {

  if(localStorage.getItem(`${ID}-user-wishlist`)) {
    let currWishlist = JSON.parse(localStorage.getItem(`${ID}-user-wishlist`));
    
    currWishlist = currWishlist.filter((wishlistItem) => {

      if(wishlistItem.sku.substring(wishlistItem.sku.indexOf('-'), wishlistItem.sku.length) == seqId) {
        return false;
      } else {
        return true;
      }

    })

    localStorage.setItem(`${ID}-user-wishlist`, JSON.stringify(currWishlist));
  }

  amendPLPWishlistIcons();
  updateHeaderWishlist();

}

const amendHeaderWishlistIcon = () => {

  let headerWishlistIcon = document.getElementById('aWishListLink');
  headerWishlistIcon.href = "#";  

  headerWishlistIcon.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    let openWishlistMessage = "Click - user opened the wishlist using the header heart icon";
    logMessage(openWishlistMessage);
    fireEvent(openWishlistMessage, true);
    
    if(contentHolder.classList.contains('active')) {
      closeModal();
    } else {
      openModal();
    }

  }, false); 

}

const createHeaderWishlist = () => {

  let wishlistHTML = `

    <div class="${ID}-wishlist-outer">
    
      <button id="${ID}-close-wishlist" class="${ID}-close-wishlist"><svg width="29" fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" preserveAspectRatio="none" x="0px" y="0px" viewBox="0 0 100 100"><path fill="#000000" stroke="none" d=" M 81.75 21.75 Q 82.503515625 21.0390625 82.5 20 82.503515625 18.9607421875 81.75 18.2 81.0390625 17.4962890625 80 17.5 78.9607421875 17.4962890625 78.2 18.2 L 50 46.45 21.75 18.2 Q 21.0390625 17.4962890625 20 17.5 18.9607421875 17.4962890625 18.2 18.2 17.4962890625 18.9607421875 17.5 20 17.4962890625 21.0390625 18.2 21.75 L 46.45 50 18.2 78.2 Q 17.4962890625 78.9607421875 17.5 80 17.4962890625 81.0390625 18.2 81.75 18.9607421875 82.503515625 20 82.5 21.0390625 82.503515625 21.75 81.75 L 50 53.55 78.2 81.75 Q 78.9607421875 82.503515625 80 82.5 81.0390625 82.503515625 81.75 81.75 82.503515625 81.0390625 82.5 80 82.503515625 78.9607421875 81.75 78.2 L 53.55 50 81.75 21.75 Z"></path></svg></button>

      <div class="${ID}-wishlist-inner">
      
        <div class="${ID}-wishlist-header">
          <h2> Wish List </h2>
          <p> Save all the things you want here and when you’re ready to buy simply add any items to your bag. Please check that the size and colour of your items are correct before you purchase. Be aware that the Item is not reserved whilst it is in your wish list. Items will remain in your wish list until you add them to your basket or choose to remove them. </p>
          
        </div>  

        <div class="${ID}-wishlist-carousel-header">
            <div class="${ID}-button ${ID}-button-prev"> <svg xmlns="http://www.w3.org/2000/svg" width="52" height="35" viewBox="0 0 24 24"><path d="M24 11.871l-5-4.871v3h-19v4h19v3z" stroke="#E0FF01" stroke-width="0.5"></path><path class="dy-recommendations-slider-button--hover" stroke="#E0FF01" d="M24 11.871l-5-4.871v3h-19v4h19v3z"></path></svg></div>
            <p id="${ID}-wishlist-amount-text" class="${ID}-wishlist-amount-text"> Your Saved Items (0) </p>
            <div class="${ID}-button ${ID}-button-next"> <svg xmlns="http://www.w3.org/2000/svg" width="52" height="35" viewBox="0 0 24 24"><path d="M24 11.871l-5-4.871v3h-19v4h19v3z" stroke="#E0FF01" stroke-width="0.5"></path><path class="dy-recommendations-slider-button--hover" stroke="#E0FF01" d="M24 11.871l-5-4.871v3h-19v4h19v3z"></path></svg></div>
        </div>

        <div class="${ID}-wishlist-holder loading">
                             
          <div class="${ID}-loading-spinner">
              <p> Updating... </p>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="38px" height="38px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" fill="none" stroke="#000000" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"></circle>
              </svg>
          </div>

          <div class="${ID}-wishlist-items swiper-container" id="${ID}-wishlist-items">
            <div class="swiper-wrapper">
            
            </div>
          </div>

          

        </div>

        <div class="${ID}-carousel-pagination" id="${ID}-carousel-pagination"></div>
      
      </div>
    
    </div>
  
  `;

  let insertionPoint = document.body;

  insertionPoint.insertAdjacentHTML('beforeend', wishlistHTML);

  let closeButton = document.getElementById(`${ID}-close-wishlist`);
  contentHolder = document.querySelector(`.${ID}-wishlist-outer`);

  closeButton.addEventListener('click', (e) => {

    closeModal();

    let closeWishlistMessage = "Click - user closed the wishlist using the X in the modal";
    logMessage(closeWishlistMessage);
    fireEvent(closeWishlistMessage, true);

  });

  document.documentElement.addEventListener('click', (e) => {
    if (e.target.classList.contains(`${ID}-noscroll`)) {
      closeModal();

      let closeWishlistMessage = "Click - user closed the wishlist by clicking outside the modal";
      logMessage(closeWishlistMessage);
      fireEvent(closeWishlistMessage, true);
    } else {
      return true;
    }
  })

  updateHeaderWishlist();

}

const updateWishlistModalItems = () => {

  if(localStorage.getItem(`${ID}-user-wishlist`)) {

    document.getElementById(`${ID}-wishlist-items`).querySelector('.swiper-wrapper').innerHTML = "";

    let wishlistItems = JSON.parse(localStorage.getItem(`${ID}-user-wishlist`));
    
    let filteredWishlistItemsarr = wishlistItems.filter((v,i,a)=>a.findIndex(t=>(t.seqId === v.seqId))===i);
    let wishlistItemsLength = filteredWishlistItemsarr.length;

    document.getElementById(`${ID}-wishlist-amount-text`).innerHTML = "Your Saved Items ("+wishlistItemsLength+")";

    [].slice.call(filteredWishlistItemsarr).forEach((item, iterator) => {

      fetch(
        `https://www.flannels.com/ProductDetail/GetColourVariantsForProduct?productId=${item.sku}&selectedCurrency=GBP`
      )
      .then((res) => res.json())
      .then((response) => {

        let itemHTML = `
    
          <div id="${ID}-wishlist-item-${iterator}" class="${ID}-wishlist-item swiper-slide" data-sku="${item.sku}">

            <button class="${ID}-remove-item">Remove</button>

            <div class="${ID}-wishlist-item-image">
              
                <a class="${ID}-wishlist-item-desturl" href="${response.variantsData[0].detailsUrl}"><img src="${response.variantsData[0].imageUrl}" alt="${item.prodTitle}-image" title="${item.prodTitle}-image" /></a>

            </div>

            <div class="${ID}-wishlist-item-details">

              <div class="${ID}-wishlist-item-info">

                <p class="${ID}-wishlist-item-brand"> ${item.prodBrand} </p>
                <a class="${ID}-wishlist-item-desturl" href="${response.variantsData[0].detailsUrl}"><p class="${ID}-wishlist-item-title"> ${item.prodTitle} </p></a>
                <p class="${ID}-wishlist-item-price"> ${item.price} </p>

                <p class="${ID}-wishlist-item-colour"><span class="${ID}-wishlist-item-colour-heading">Colour:</span><span class="${ID}-wishlist-item-colour-value" id="${ID}-wishlist-item-colour-value">${response.variantsData[0].colourName}</span></p>
              
                <select name="${ID}-wishlist-item-colourdropdown" class="${ID}-wishlist-item-colourdropdown ${response.variantsData.length <= 1 ? `${ID}-hidden` : ''}">

                  ${response.variantsData.map((item) => {

                    return `<option data-thumb-url="${item.imageUrl}" data-href="${item.detailsUrl}" value="${item.colVarId}">${item.colourName}</option>`;

                  }).join('')}
                
                </select>

                <p class="${ID}-wishlist-item-size-heading">Choose your size:</p>

                <div class="${ID}-wishlist-sizes-holder">
                                        
                  ${response.variantsData.map((variant, iterator) => {

                    let sizeVariants = variant.sizeVariants.map((size) => {
                      return `
                        
                          <option data-size-id="${size.sizeVarId}" class="${ID}-sizebutton">${size.sizeName}</option>
                          
                      `;
                    }).join('');

                    return `<select data-colvarid="${variant.colVarId}" class="${ID}-wishlist-item-sizes ${iterator == 0 ? 'active' : ''}"><option class="${ID}-sizebutton">Please choose</option>${sizeVariants}</select>`;

                  }).join('')}

                </div>
                

              </div>
          
              

            </div>

            <div class="${ID}-wishlist-item-atb">

              <button id="${ID}-wishlist-item-atb-button-${iterator}" class="${ID}-wishlist-item-atb-button"> Add to Bag </button>
            
            </div>

          </div>
        
        `;

        let insertionPoint = document.getElementById(`${ID}-wishlist-items`).querySelector('.swiper-wrapper');

        insertionPoint.insertAdjacentHTML('beforeend', itemHTML);

        let atbButton = document.getElementById(`${ID}-wishlist-item-atb-button-${iterator}`);

        atbButton.addEventListener('click', (e) => {

          e.preventDefault();
          let currentATB = e.currentTarget;
          let currentItem = e.currentTarget.closest(`.${ID}-wishlist-item`);
          let currActiveSizes = currentItem.querySelector(`.${ID}-wishlist-item-sizes.active`);
          let currentSKU = currentItem.getAttribute('data-sku');
          let currentSeqID = currentSKU.substring(currentSKU.indexOf('-'), currentSKU.length);
          if(currActiveSizes.options[currActiveSizes.selectedIndex].getAttribute('data-size-id')) {
          
            let sizeVarId = currActiveSizes.options[currActiveSizes.selectedIndex].getAttribute('data-size-id');
          
            const bagContent = [
              {
                sizeVariantId: sizeVarId,
                quantity: '1',
                personalisation: [],
                isProductRec: false,
              },
            ];

            $.ajax({
              type: 'POST',
              url: '/api/basket/v1/add',
              data: JSON.stringify(bagContent),
              dataType: 'json',
              contentType: 'application/json',
              xhrFields: {
                withCredentials: true,
              },
              success: function (data, error) {
                const addedMessage = `Click - product sizeVarId: ${sizeVarId} added to basket.`;
                logMessage(addedMessage);
                fireEvent(addedMessage);

                currentATB.innerHTML = "Added";
                window.updateSkinBag();
                setTimeout(() => {
                  removeProductFromWishlistBySeqId(currentSeqID);
                  currentItem.remove();
                  initiateSlider();
                }, 5000);
              },
            });
          
          } else {
            currActiveSizes.classList.add('shake');
            setTimeout(() => {
              currActiveSizes.classList.remove('shake');
            }, 250);
          }



        });



        



      })
      .catch(error => {
        removeProductFromWishlist(item);
      });

    })


    pollerLite([
      () => {
        let recsLength = document.querySelector(`#${ID}-wishlist-items .swiper-wrapper`).childElementCount;
        return recsLength == wishlistItemsLength;
      }], 
      () => {
        
        
        let colourDropdowns = document.querySelectorAll(`.${ID}-wishlist-item-colourdropdown`);
        [].slice.call(colourDropdowns).forEach((dropdown) => {
          dropdown.addEventListener('change', (e) => {
            let colVarId = e.target.value;
            let colourName = e.target.options[e.target.selectedIndex].innerText;
            let colourImg = e.target.options[e.target.selectedIndex].getAttribute('data-thumb-url');
            let colourHref = e.target.options[e.target.selectedIndex].getAttribute('data-href');
            let closestItem = e.currentTarget.closest(`.${ID}-wishlist-item`);
            document.getElementById(`${ID}-wishlist-item-colour-value`).innerHTML = colourName;
            closestItem.querySelector(`.${ID}-wishlist-item-image img`).src = colourImg;
            closestItem.querySelectorAll(`.${ID}-wishlist-item-desturl`).href = colourHref;
            let allSizeLists = closestItem.querySelectorAll(`.${ID}-wishlist-item-sizes`);
            [].slice.call(allSizeLists).forEach((list) => {
              list.classList.remove('active');
            });
            document.querySelector(`.${ID}-wishlist-item-sizes[data-colvarid="${colVarId}"]`).classList.add('active');

            let changeDDMessage = `Click - user changed a colour option within the carousel`;
            logMessage(changeDDMessage);
            fireEvent(changeDDMessage, true);

          })
        })

        let allRemoveLinks = document.querySelectorAll(`.${ID}-remove-item`);
        [].slice.call(allRemoveLinks).forEach((removeLink) => {

          removeLink.addEventListener('click', (e) => {

            let prodSKU = e.currentTarget.closest(`.${ID}-wishlist-item`).getAttribute('data-sku');
            removeProductFromWishlistBySKU(prodSKU);

            let removeOptionMessage = `Click - user used the remove option to remove product: ${prodSKU}`;
            logMessage(removeOptionMessage);
            fireEvent(removeOptionMessage, true);

          })


        })

        if(document.querySelector(`.${ID}-wishlist-items`).classList.contains('swiper-active')) {
          updateSlider();
        } else {
          initiateSlider();
        }
        

    });
    

    

  }


}


const amendPLPWishlistIcons = () => {

  let allPLPWishlistIcons = document.querySelectorAll('.hotspotwishlist');
  
  [].slice.call(allPLPWishlistIcons).forEach((icon, iterator) => {

    // get product SKU

    let prodSKU = icon.closest('li').getAttribute('li-productid') + '-' +icon.closest('li').getAttribute('li-seq');
    let prodId = icon.closest('li').getAttribute('li-productid');
    let prodSeq = icon.closest('li').getAttribute('li-seq');

    let prodInWishlist = false;
    if(localStorage.getItem(`${ID}-user-wishlist`)) {
      let currWishlist = JSON.parse(localStorage.getItem(`${ID}-user-wishlist`));
      [].slice.call(currWishlist).forEach((wishlistItem) => {
        if(wishlistItem.seqId == prodSeq) {
          prodInWishlist = true;
        }           
      })
    }
    

    let wishlistHTML = `
    
      <button class="hotspotbuy hotspotwishlist ${ID}-wishlist-icon ${prodInWishlist == true ? 'added' : ''}" id="${ID}-wishlist-icon-${iterator}">
        <svg width="21" height="21" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 142.44 129.75"><defs><style>.cls-1{fill:#fff;stroke:#000;stroke-miterlimit:10;stroke-width:7px;}</style></defs><path id="Path_19548" data-name="Path 19548" class="cls-1" d="M131.67,13.15c-16-18.14-51.93-11.89-60.38,15-8.13-31.91-44.42-32.85-60.37-15C-3.78,29.73,0,53.5,13.73,71A617.45,617.45,0,0,0,71,128.27h.31A494.46,494.46,0,0,0,128.54,71C142.3,53.19,146.37,29.73,131.67,13.15Z" transform="translate(-0.01 -0.02)"/></svg>
      </div>
    
    `;
    icon.insertAdjacentHTML('afterend', wishlistHTML);
    
    document.getElementById(`${ID}-wishlist-icon-${iterator}`).addEventListener('click', (e) => {

      e.preventDefault();
      e.stopPropagation();

      let productInfo = {
        sku: prodSKU,
        colourId: prodId,
        seqId: prodSeq,
        prodBrand: e.currentTarget.closest('li').querySelector('.productdescriptionbrand').innerText,
        prodTitle: e.currentTarget.closest('li').querySelector('.productdescriptionname').innerText,
        imageThumbSrc: e.currentTarget.closest('li').querySelector('.MainImage').src,
        price: e.currentTarget.closest('li').querySelector('.curprice').innerText,
      };

      if(e.currentTarget.classList.contains('added')) {
        removeProductFromWishlistBySKU(prodSKU);
        e.currentTarget.classList.remove('added');

        let removeFromWishlistMessage = "Click - user removed product: "+prodSKU+" from their wishlist using PLP";
        logMessage(removeFromWishlistMessage);
        fireEvent(removeFromWishlistMessage, true);

      } else {
        addProductToWishlist(productInfo);
        e.currentTarget.classList.add('added');

        let addToWishlistMessage = "Click - user added product: "+prodSKU+" to their wishlist using PLP";
        logMessage(addToWishlistMessage);
        fireEvent(addToWishlistMessage, true);
      }

      return false;

    }, false);

  });

}

const amendPDPWishlistIcon = () => {

  let allWishlistContainers = document.querySelectorAll('.sAddToWishListWrapper');

  // get product SKU

  let prodSKU = window.DY.recommendationContext.data[0];
  let prodId = prodSKU.substring(0, prodSKU.indexOf('-'));
  let prodSeq = prodSKU.substring(prodSKU.indexOf('-') + 1, prodSKU.length);
  let prodInWishlist = false;
  if(localStorage.getItem(`${ID}-user-wishlist`)) {
    let currWishlist = JSON.parse(localStorage.getItem(`${ID}-user-wishlist`));
    [].slice.call(currWishlist).forEach((wishlistItem) => {
      if(wishlistItem.sku == prodSKU) {
        prodInWishlist = true;
      }           
    })
  }

  [].slice.call(allWishlistContainers).forEach((container) => {
    
    let wishlistHTML = `
      <button id="${ID}-pdp-wishlist-icon" class="${ID}-pdp-wishlist-icon ${ID}-wishlist-icon ${prodInWishlist == true ? 'added' : ''}">
        <svg width="25" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 142.44 129.75"><defs><style>.cls-1{fill:#fff;stroke:#000;stroke-miterlimit:10;stroke-width:6px;}</style></defs><path id="Path_19548" data-name="Path 19548" class="cls-1" d="M131.67,13.15c-16-18.14-51.93-11.89-60.38,15-8.13-31.91-44.42-32.85-60.37-15C-3.78,29.73,0,53.5,13.73,71A617.45,617.45,0,0,0,71,128.27h.31A494.46,494.46,0,0,0,128.54,71C142.3,53.19,146.37,29.73,131.67,13.15Z" transform="translate(-0.01 -0.02)"/></svg>
      </button>
    `;

    container.querySelector('a').insertAdjacentHTML('afterend', wishlistHTML);

    container.querySelector(`.${ID}-pdp-wishlist-icon`).addEventListener('click', (e) => {

      e.preventDefault();
      e.stopPropagation();

      let variantDetails = JSON.parse(document.querySelector('.ProductDetailsVariants').getAttribute('data-variants'));

      let imageSrc = variantDetails[0].MainImageDetails.ImgUrlThumb;
      let sellPrice = variantDetails[0].ProdVarPrices.SellPrice;

      let productInfo = {
        sku: prodSKU,
        colourId: prodId,
        seqId: prodSeq,
        prodBrand: document.getElementById('lblProductBrand').innerText,
        prodTitle: document.getElementById('lblProductName').innerText,
        imageThumbSrc: imageSrc,
        price: sellPrice,
      };

      if(e.currentTarget.classList.contains('added')) {
        removeProductFromWishlistBySKU(prodSKU);
        e.currentTarget.classList.remove('added');

        let removeFromWishlistMessage = "Click - user removed product: "+prodSKU+" from their wishlist using PDP";
        logMessage(removeFromWishlistMessage);
        fireEvent(removeFromWishlistMessage, true);

      } else {
        addProductToWishlist(productInfo);
        e.currentTarget.classList.add('added');

        let addToWishlistMessage = "Click - user added product: "+prodSKU+" to their wishlist using PDP";
        logMessage(addToWishlistMessage);
        fireEvent(addToWishlistMessage, true);

      }
      
      

      

      return false;

    }, false);

  });

  
}

const syncWishlists = () => {

    if(localStorage.getItem(`${ID}-user-wishlist`)) {

      let wishlistItems = JSON.parse(localStorage.getItem(`${ID}-user-wishlist`));
    
      let filteredWishlistItemsarr = wishlistItems.filter((v,i,a)=>a.findIndex(t=>(t.seqId === v.seqId))===i);
      let wishlistItemsLength = filteredWishlistItemsarr.length;

      [].slice.call(filteredWishlistItemsarr).forEach((item, iterator) => {

        fetch(
          `https://www.flannels.com/ProductDetail/GetColourVariantsForProduct?productId=${item.sku}&selectedCurrency=GBP`
        )
        .then((res) => res.json())
        .then((response) => {

          let sizeVarId = response.variantsData[0].sizeVariants[0].sizeVarId;

          const bagContent = [
            {
              sizeVariantId: sizeVarId,
              quantity: '1',
              personalisation: [],
              isProductRec: false,
            },
          ];
    
          $.ajax({
            type: 'POST',
            url: '/api/wishlist/v1/add',
            data: JSON.stringify(bagContent),
            dataType: 'json',
            contentType: 'application/json',
            xhrFields: {
              withCredentials: true,
            },
            success: function (data, error) {
              const addedMessage = `Sync - product sizeVarId: ${sizeVarId} added to wishlist.`;
              logMessage(addedMessage);
              fireEvent(addedMessage, true);
            },
          });

        });

      });

      const syncMessage = `Complete - user has logged in so their wishlist has been synced with their account wishlist.`;
      logMessage(syncMessage);
      fireEvent(syncMessage, true);
      localStorage.removeItem(`${ID}-user-wishlist`);

    } 

}


const startExperiment = () => {

  createHeaderWishlist();
  

  pollerLite(['#aWishListLink'], () => {
    amendHeaderWishlistIcon();
  });

  if(getPageData().pageType == "BrowsePL") {

    pollerLite(['.hotspotwishlist'], () => {
      amendPLPWishlistIcons();
    })

    // Trigger re render on pagniation change
    const wrap = document.querySelector('#ProductContainer ul#navlist');
    observer.connect(wrap, () => {

          amendPLPWishlistIcons();
        
    }, {
        config: {
          attributes: true,
          childList: true,
          subtree: false,
        }
    })



    
  } else if(getPageData().pageType == "ProductDetail") {

    pollerLite(['#aWishListToLogin'], () => {
      setTimeout(() => {
        amendPDPWishlistIcon();
      }, 1500);
      
    });
    

  }


  





}

const addControlTracking = () => {

  // todo - add control tracking for homepage/plp/pdp wishlist icon clicks


}

export default () => {
  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {

    addControlTracking();

    return;
  }

  // Write experiment code here
  
  pollerLite([
    () => {
      if(typeof getPageData() !== 'undefined') {
        return true;
      }
    }],
    () => {

      

      // Any page, once user logged in

      if(getPageData().visitorLoginState == "logged+in") {
        syncWishlists();

      } else {

        document.documentElement.classList.add(`${ID}-active`);
        startExperiment();

      }

    });

};
