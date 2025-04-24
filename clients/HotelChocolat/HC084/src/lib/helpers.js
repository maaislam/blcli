import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

/**
 * Standard experiment setup
 */
export const showLightbox = () => {
  const lightbox = document.querySelector(`.${ID}-lightbox__wrapper`);
  const dropHintLink = document.querySelector(`.${ID}-link__wrapper a`);

  dropHintLink.addEventListener('click', (e) => {
    lightbox.classList.remove('fade-out');
    lightbox.classList.add('show');
    lightbox.classList.remove('hidden');
    document.querySelector('body').classList.add(`${ID}-noScroll`);

    fireEvent(`Click - Drop a Hint Link`);
  });
  
  lightboxClickEvents(lightbox);
}

export const lightboxClickEvents = (lightbox) => {
  const whatsappBtn = document.querySelector(`#${ID}-whatsapp-share`);
  whatsappBtn.addEventListener('click', (e) => {
    lightbox.classList.remove('show');
    lightbox.classList.add('fade-out');
    setTimeout(() => {
      lightbox.classList.add('hidden');
    }, 600);
    document.querySelector('body').classList.remove(`${ID}-noScroll`);

    // --- Hotjar Event
    hj('event', 'dropahint');

    fireEvent(`Click - Share via WhatsApp`);

    // let didLoadWhatsapp = false;

    // window.addEventListener('unload', () => {
    //   didLoadWhatsapp = true;
    // });

    // setTimeout(() => {
    //   if(didLoadWhatsapp == false) {
    //     // Show the 'oops looks like you dont have whatsapp' message
    //     alert('oops looks like you dont have whatsapp');
    //   }
    // }, 3000);
    
    // if(navigator.userAgent.toLowerCase().indexOf("android") > -1) {
    //   if(confirm("Download app?")) {
    //       window.location.href= "market://details?id=com.whatsapp";
    //   }
    // }
    // if(navigator.userAgent.toLowerCase().indexOf("android") > -1){
    //   window.location.href = 'http://play.google.com/store/apps/details?id=com.whatsapp';
    // }
    // if(navigator.userAgent.toLowerCase().indexOf("iphone") > -1){
    //       window.location.href = 'http://itunes.apple.com/lb/app/com.whatsapp';
    // }

    // detectWhatsapp('<your number here>', 'test').then(hasWhatsapp =>
    //   alert(
    //      'You ' + 
    //         (hasWhatsapp ? 'have WhatsApp' : "don't have WhatsApp")
    //   )
    // )
  });

  const lightboxOverlay = document.querySelector(`.${ID}-overlay`);
  lightboxOverlay.addEventListener('click', (e) => {
    lightbox.classList.remove('show');
    lightbox.classList.add('fade-out');
    setTimeout(() => {
      lightbox.classList.add('hidden');
    }, 600);
    document.querySelector('body').classList.remove(`${ID}-noScroll`);
  });

  const closeIcon = document.querySelector(`.${ID}-closeIcon`);
  closeIcon.addEventListener('click', (e) => {
    lightbox.classList.remove('show');
    lightbox.classList.add('fade-out');
    setTimeout(() => {
      lightbox.classList.add('hidden');
    }, 600);
    document.querySelector('body').classList.remove(`${ID}-noScroll`);
  });
}


/* Wishlist functions */
export const closeSavedBox = () => {
  const savedItemsList = document.querySelector(`.${ID}-savedItemsList__wrapper`);
  savedItemsList.classList.remove('show');
  document.documentElement.classList.remove(`${ID}-noScroll`);
  if (JSON.parse(localStorage.getItem(`${ID}-saved-products`)) !== null) {
    document.querySelector(`.${ID}-tab`).classList.add('show');
  }

  if(document.querySelector(`.${ID}-savedItemsList.slick-initialized`)) {
    window.jQuery(`.${ID}-savedItemsList`).slick('unslick');
  }
}


export const addPinsToProducts = () => {

  let prePinnedProducts = {};
  let activeProduct = '';

  if (JSON.parse(localStorage.getItem(`${ID}-saved-products`)) !== null) {
    prePinnedProducts = JSON.parse(localStorage.getItem(`${ID}-saved-products`));

    if (Object.keys(prePinnedProducts).length > 0) {
      document.querySelector(`.${ID}-tab`).classList.add('show');
    }
  }

  const iconContainer = 
    `<div class="${ID}-icon__wrapper heart ${activeProduct}">
      <div class="label-text"><span>Save for later</span></div>
      <div class="${ID}-icon"></div>
    </div>`;

  // PDP
  if (document.querySelector('#pdpMain')) {

    const productImage = document.querySelector('.product-image-container');

    let productUrl = window.location.pathname;
    
    if (Object.keys(prePinnedProducts).length > 0 && prePinnedProducts[`${productUrl}`]) {
      activeProduct = 'active';
    }
    
    // --- Add icon only if it doesn't previously exists
    if (!productImage.querySelector(`.${ID}-icon__wrapper`)) {
      productImage.insertAdjacentHTML('afterbegin', iconContainer);
    }
  } else {
    const allProducts = document.querySelectorAll('.search-result-content .grid-tile');

    [].forEach.call(allProducts, product => {
      
      const productUrl = product.querySelector('.thumb-link').getAttribute('href');
      // if (product.querySelector(`.${ID}-icon__wrapper`)) {
      //   const itemToRemove = product.querySelector(`.${ID}-icon__wrapper`);
      //   itemToRemove.parentNode.removeChild(itemToRemove);
      // }

      if (Object.keys(prePinnedProducts).length > 0 && prePinnedProducts[`${productUrl}`]) {
          activeProduct = 'active';
      }

      if (!product.querySelector(`.${ID}-icon__wrapper`)) {
        product.insertAdjacentHTML('afterbegin', iconContainer);
      }

    });
  }
}

export const removeCtaButtons = () => {

  const allRemoveButtons = document.querySelectorAll(`.${ID}-btn__remove`);
  const savedItemsList = document.querySelector(`.${ID}-savedItemsList__wrapper`);


  [].forEach.call(allRemoveButtons, (btn) => {
    btn.addEventListener('click', (e) => {
      if (JSON.parse(localStorage.getItem(`${ID}-saved-products`)) !== null) {
        const productToRemove = btn.getAttribute('data-to-remove');
        let savedProducts = JSON.parse(localStorage.getItem(`${ID}-saved-products`));
        delete savedProducts[`${productToRemove}`];
        localStorage.setItem(`${ID}-saved-products`, JSON.stringify(savedProducts));
        
        updatePinIcons();

        if (Object.keys(savedProducts).length === 0) {
          document.querySelector(`.${ID}-savedItems__wrapper`).classList.remove('show');

          closeSavedBox();
        } else {
          updateSavedItemsContent(savedItemsList);
        }
      }
    });
  });
};

export const generateSavedProductsElements = () => {
  const { ID, VARIATION } = shared;

 
  const savedItemsTab = document.querySelector(`.${ID}-tab`);
  // savedItemsTab.insertAdjacentHTML('beforebegin', savedProductsList);
  if (!document.querySelector(`.${ID}-savedItemsList__wrapper`)) {
    
    const savedItemsList = document.querySelector(`.${ID}-savedItemsList__wrapper`);
    savedItemsTab.addEventListener('click', (e) => {
      
      /**
       * @desc Saved Products List DOES NOT contain hidden
       * Shows the Saved list lightbox -------------------
       * and updates the content -------------------------
       */
      updateSavedItemsContent(savedItemsList);

      /**
       * @desc Remove click CTA
       * add Event Listeners to each "remove" CTA
       */
      removeCtaButtons();


    });

   
  }
};


const createItem = (url, image, name, currentPrice, oldPrice, sku) => {

  const product = 
  `<li class="${ID}-product__wrapper">
  <div class="${ID}-closeIcon__remove" data-to-remove="${url}"></div>
  <div class="${ID}-productImg__wrapper">
    <a href="${url}"><div class="${ID}-img" style="background-image: url(${image})"></div></a>
  </div>
  <div class="${ID}-productTitle__wrapper">
    <p>${name}</p>
    <div class="${ID}-productPrice__wrapper">
      ${currentPrice}
      ${oldPrice}
    </div>
    <div class="${ID}-btn__wrapper">
      <a class="${ID}-btn__shop" sku-data="${sku}">Add to bag</a>
      <span class="${ID}-btn__remove" data-to-remove="${url}"></span>
    </div>
  </div>
</li>`

return product;

}

export const updateSavedItemsContent = (savedItemsList) => {
  let savedItems = {};
  if (!savedItemsList.classList.contains('hidden')) {

    if (JSON.parse(localStorage.getItem(`${ID}-saved-products`)) !== null) {

      savedItems = JSON.parse(localStorage.getItem(`${ID}-saved-products`));

      let listItems = '';

      const keys = Object.keys(savedItems);

      for (const key of keys) {
        const item = savedItems[key];
        let productTitle = item.title;
      
        listItems += createItem(item.url, item.img, productTitle, item["current-price"], item["old-price"], item["sku"]);
        }

      document.querySelector(`.${ID}-savedItemsList`).innerHTML = listItems;      
    }

    removeCtaButtons();

  }
};

export const storeProduct = (objEl, url, name, image, currentprice, oldprice, sku) => {

  return objEl[`${url}`] = {
    'title': `${name}`,
    'img': `${image}`,
    'url': `${url}`,
    'sku': `${sku}`,
    'current-price': `${currentprice}`,
    'old-price': `${oldprice}`,
  };  
}

export const iconClick = (el, productUrl, productTitle, productImg, currentPrice, oldPrice, sku) => {
  let savedProducts;

  if(!el.classList.contains('active')) {

    fireEvent('Saved product');
    
    document.querySelector(`.${ID}-tab`).classList.add('show');


    el.classList.add('active');

    // if saved products already exists
    if (JSON.parse(localStorage.getItem(`${ID}-saved-products`)) !== null) {
        savedProducts = JSON.parse(localStorage.getItem(`${ID}-saved-products`));

        if (!savedProducts[`${productUrl}`]) {
            storeProduct(savedProducts, productUrl, productTitle, productImg, currentPrice, oldPrice, sku);
            localStorage.setItem(`${ID}-saved-products`, JSON.stringify(savedProducts));
        }

    } else {
        let productsToSave = {};
        if (!productsToSave[`${productUrl}`]) {
            storeProduct(productsToSave, productUrl, productTitle, productImg, currentPrice, oldPrice, sku);
            localStorage.setItem(`${ID}-saved-products`, JSON.stringify(productsToSave));
        }
    }


// remove item from saved
  } else {

    el.classList.remove('active');


      if (JSON.parse(localStorage.getItem(`${ID}-saved-products`)) !== null) {
          let savedProducts = JSON.parse(localStorage.getItem(`${ID}-saved-products`));

          delete savedProducts[`${productUrl}`];

          localStorage.setItem(`${ID}-saved-products`, JSON.stringify(savedProducts));
          
          if (Object.keys(savedProducts).length === 0) {
            // hide saved tab
            document.querySelector(`.${ID}-tab`).classList.remove('show');
          }

      } else {
          // hide saved tab
          document.querySelector(`.${ID}-tab`).classList.remove('show');
      }
  }
}


export const updatePinIcons = () => {

  let prePinnedProducts = {};

  if (JSON.parse(localStorage.getItem(`${ID}-saved-products`)) !== null) {
    prePinnedProducts = JSON.parse(localStorage.getItem(`${ID}-saved-products`));

    if (Object.keys(prePinnedProducts).length > 0) {
      document.querySelector(`.${ID}-tab`).classList.add('show');
    }
  }

  const checkProduct = (productIcon ,productLink) => {
    if (Object.keys(prePinnedProducts).length > 0 && prePinnedProducts[`${productLink}`]) {
      productIcon.classList.add('active');
    } else {
      if (productIcon.classList.contains('active')) {
        productIcon.classList.remove('active');
      }
    }
  }

  // On PDP
  if(document.querySelector('#pdpMain')) {
    const productUrl = window.location.pathname;
    const PDPIcon =  document.querySelector(`.${ID}-icon__wrapper`);
    checkProduct(PDPIcon, productUrl);
  } else {
    const allProducts = document.querySelectorAll('.search-result-content .grid-tile');

    [].forEach.call(allProducts, product => {
      const productUrl = product.querySelector('.thumb-link').getAttribute('href');
      const ProdIcon =  product.querySelector(`.${ID}-icon__wrapper`);
      checkProduct(ProdIcon, productUrl);
    }); 
  }
};

export const slickProducts = () => {  
  const runSlick = () => {
    window.jQuery(`.${ID}-savedItemsList`).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      mobileFirst: true, 
      infinite: false,
      responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              arrows: true,
            }
          },
          {
            breakpoint: 1023,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              arrows: true,
            }
          },
          {
              breakpoint: 300,
              settings: 'unslick'
          },
          ]
    });      
  }

  if(document.querySelectorAll(`.${ID}-product__wrapper`).length > 4) {
    if(window.jQuery.fn.slick) {
      runSlick();
    } else {
      jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', () => {
        runSlick();
      });
    }
  } else {
    if(document.querySelector(`.${ID}-savedItemsList.slick-initialized`)) {
      window.jQuery(`.${ID}-savedItemsList`).slick('unslick');
    }
  }
 
}

export const addProductTobag = (sku) => {
  window.jQuery.ajax({
    url: 'https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Cart-AddProduct?format=ajax',
    type: 'post',
    data: `Quantity=1&cartAction=add&pid=${sku}`,
    success: function () {
        window.scrollTo(0, 0);
        window.location.reload();
    }
  });
}

// export const detectWhatsapp = (phone, text) => {
//   const uri = `whatsapp://send/?phone=${encodeURIComponent(
//     phone
//   )}&text=${encodeURIComponent(text)}`;

//   const onIE = () => {
//     return new Promise((resolve) => {
//       window.navigator.msLaunchUri(
//         uri,
//         () => resolve(true),
//         () => resolve(false)
//       );
//     });
//   };

//   const notOnIE = () => {
//     return new Promise((resolve) => {
//       const a =
//         document.getElementById("wapp-launcher") || document.createElement("a");
//       a.id = "wapp-launcher";
//       a.href = uri;
//       a.style.display = "none";
//       document.body.appendChild(a);

//       const start = Date.now();
//       const timeoutToken = setTimeout(() => {
//         if (Date.now() - start > 1250) {
//           resolve(true);
//         } else {
//           resolve(false);
//         }
//       }, 1000);

//       const handleBlur = () => {
//         clearTimeout(timeoutToken);
//         resolve(true);
//       };
//       window.addEventListener("blur", handleBlur);

//       a.click();
//     });
//   };

//   return window.navigator.msLaunchUri ? onIE() : notOnIE();
// };
