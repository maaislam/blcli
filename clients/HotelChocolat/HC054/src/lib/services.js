import { events, pollerLite } from './../../../../../lib/utils';
import shared from './shared';


/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  // set up events
  events.setDefaultCategory('Experimentation');
  events.setDefaultAction(CLIENT + " - "+ID);

  if(LIVECODE == "true") {
    events.sendEvents = false;
  } else {
    events.sendEvents = true;
  }

  // adds document body classlist 
  document.documentElement.classList.add(ID);
  document.documentElement.classList.add(`${ID}-${VARIATION}`);
};

export const fireEvent = (label) => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  events.sendAuto(VARIATION, label);

}


/*  ----------------
  Cookie opt in check
  ------------------ */
  export const cookieOpt = () => {
    const { ID, VARIATION } = shared;

    pollerLite([
     () => {
      return !!window.ga
     }], () => {
      fireEvent(`${ID}-${VARIATION} Experiment Fired`);
     });
  }

export const observeWindowWidth = () => {
  const { ID, VARIATION } = shared;

  let windowWidth = document.body.clientWidth;
  let device = '';
  if (windowWidth > 767) {
    device = 'desktop';
  } else {
    device = 'mobile';
  }

  let pageTitle = document.querySelector('h1');

  window.addEventListener("resize", function(event) {
    if (document.body.clientWidth > 767 && device == 'mobile') {
      device = 'desktop';
      // --- Window re-size - From MOBILE to DESKTOP
      document.querySelector('#product-content').insertAdjacentElement('afterbegin', pageTitle);

    } else if (document.body.clientWidth <= 767 && device == 'desktop') {
      device = 'mobile';
      // --- Window re-size - From DESKTOP to MOBILE
      document.querySelector('#page_heading').insertAdjacentElement('afterbegin', pageTitle);
      
    }
  });
  
};

export const observeWindowWidthAndReload = () => {
  const { ID, VARIATION } = shared;

  let windowWidth = document.body.clientWidth;
  let device = '';
  if (windowWidth > 767) {
    device = 'desktop';
  } else {
    device = 'mobile';
  }
  window.addEventListener("resize", function(event) {
    if (document.body.clientWidth > 767 && device == 'mobile') {
      device = 'desktop';
      // --- Window re-size - From MOBILE to DESKTOP
      // -- Reload
      window.location.reload();
    } else if (document.body.clientWidth <= 767 && device == 'desktop') {
      device = 'mobile';
      // --- Window re-size - From DESKTOP to MOBILE
      // -- Reload
      window.location.reload();
    }
  });
  
};

export const addBanners = () => {
  const { ID, VARIATION } = shared;

  let banner2Text;
  let banner2Link;
  const productName = document.querySelector('#pdpMain h1');


  if((productName.textContent.indexOf("Father's Day") > -1) || (productName.textContent.indexOf("Beer") > -1) || (document.querySelectorAll('.breadcrumb-element') && document.querySelectorAll('.breadcrumb-element')[2] && document.querySelectorAll('.breadcrumb-element')[2].textContent.indexOf("Father's Day Chocolates & Gifts") > -1)) {
    banner2Text = "Father's Day Gifts";
    banner2Link = 'https://www.hotelchocolat.com/uk/shop/fathers-day/'
  } else {
    banner2Text = "Best Selling Gifts";
    banner2Link = '/uk/shop/gift-ideas/shop-by-occasion/best-chocolate/'
  }

  const ctaBanners = `<div class="${ID}-banners__wrapper">
    <div class="${ID}-top__wrapper">
      <h4>Explore Hotel Chocolat</h4>
    </div>
    <div class="${ID}-bannersCta__wrapper">
      <div id="${ID}-shopAll" class="box box-1">
        <a class="shop-all" href="/uk/shop/collections/products/all-products/">
          <span><p>Shop</p><p>All Chocolate</p></span>
        </a>
      </div>
      <div id="${ID}-shopGifts" class="box box-2">
        <a class="shop-gifts" href="${banner2Link}">
          <span><p>Shop</p><p>${banner2Text}</p></span>
        </a>
      </div>
    </div>
  </div>`;

  if (window.innerWidth > 767) {
    document.querySelector('#pdpMain .product-col-1.product-image-container .product-detail').insertAdjacentHTML('beforebegin', ctaBanners); 
    // document.querySelector(`.${ID}-banners__wrapper`).setAttribute('style', 'position: absolute;');
    // --- Get Recommended Carousel height
    const carouselHeight = document.querySelector(`.${ID}-banners__wrapper`).getBoundingClientRect().height;

    // const newColumns = `<div class="${ID}-product-col-1 product-col-1 product-image-container" style="padding-top: 425px;"></div>
    // <div class="${ID}-product-col-2 product-col-2 product-detail" style="padding-top: 425px;"></div>`;

    // document.querySelector('#pdpMain .product-col-2.product-detail').insertAdjacentHTML('afterend', newColumns);
    // // --- MOVE Left side tabs content below the Carousel
    // const prodTabs = document.querySelector('.product-tabs.product-tabs-move.ui-tabs.ui-corner-all.ui-widget.ui-widget-content');
    // document.querySelector(`.${ID}-product-col-1`).insertAdjacentElement('afterbegin', prodTabs);
    // // ------------------------------------------------------//
    // // --- MOVE Right side columns content below the Carousel
    // const allPaymentContent = document.querySelectorAll('.product-col-2.product-detail .content-zone');
    // [].forEach.call(allPaymentContent, (el) => {
    //   document.querySelector(`.${ID}-product-col-2`).insertAdjacentElement('beforeend', el);
    // });
    // const prodInfo = document.querySelector('.product-col-2.product-detail .prod-info.prod-info-b');
    // const prodDelivery = document.querySelector('.product-col-2.product-detail .prod-info.prod-info-c');
    // document.querySelector(`.${ID}-product-col-2`).insertAdjacentElement('beforeend', prodInfo);
    // document.querySelector(`.${ID}-product-col-2`).insertAdjacentElement('beforeend', prodDelivery);
    // // ------------------------------------------------------//
  } else {
  /**
   * @desc Tablet and Mobile
   */
    document.querySelector('.product-actions').insertAdjacentHTML('afterend', ctaBanners);
  }

  observeWindowWidthAndReload();

}

export const addCarousel = (recommendedProdContainer) => {
  const { ID, VARIATION } = shared;

  /**
   * @desc For Desktop devices, add carousel and amend columns content
   */
  if (window.innerWidth > 767) {
    // alert('add carousel - desktop');
    document.querySelector('#pdpMain .product-col-1.product-image-container .product-detail').insertAdjacentHTML('beforebegin', recommendedProdContainer);
    // document.querySelector(`.${ID}-recommendations__wrapper`).setAttribute('style', 'position: absolute;');
    // --- Get Recommended Carousel height
    const carouselHeight = document.querySelector(`.${ID}-recommendations__wrapper`).getBoundingClientRect().height;

    // const newColumns = `<div class="${ID}-product-col-1 product-col-1 product-image-container" style="padding-top: 425px;"></div>
    // <div class="${ID}-product-col-2 product-col-2 product-detail" style="padding-top: 425px;"></div>`;

    // document.querySelector('#pdpMain .product-col-2.product-detail').insertAdjacentHTML('afterend', newColumns);
    // // --- MOVE Left side tabs content below the Carousel
    // const prodTabs = document.querySelector('.product-tabs.product-tabs-move.ui-tabs.ui-corner-all.ui-widget.ui-widget-content');
    // document.querySelector(`.${ID}-product-col-1`).insertAdjacentElement('afterbegin', prodTabs);
    // // ------------------------------------------------------//
    // // --- MOVE Right side columns content below the Carousel
    // const allPaymentContent = document.querySelectorAll('.product-col-2.product-detail .content-zone');
    // [].forEach.call(allPaymentContent, (el) => {
    //   document.querySelector(`.${ID}-product-col-2`).insertAdjacentElement('beforeend', el);
    // });
    // const prodInfo = document.querySelector('.product-col-2.product-detail .prod-info.prod-info-b');
    // const prodDelivery = document.querySelector('.product-col-2.product-detail .prod-info.prod-info-c');
    // document.querySelector(`.${ID}-product-col-2`).insertAdjacentElement('beforeend', prodInfo);
    // document.querySelector(`.${ID}-product-col-2`).insertAdjacentElement('beforeend', prodDelivery);
    // ------------------------------------------------------//
  } else {
    // alert('add carousel - tablet/mobile');
  /**
   * @desc Tablet and Mobile
   */
    // document.querySelector('.product-col-2.product-detail .tab-target-mobile').insertAdjacentHTML('beforebegin', recommendedProdContainer);
    document.querySelector('.product-actions').insertAdjacentHTML('afterend', recommendedProdContainer);
  }
};

export const clickEvents = () => {
  const { ID, VARIATION} = shared;

  if (VARIATION == '1') {
    pollerLite([`#${ID}-carousel-recommendations .product-tile`,
    `#${ID}-carousel-recommendations.slick-initialized`], () => {
        // --- Click on Carousel Products
        const allCarouselProducts = document.querySelectorAll(`#${ID}-carousel-recommendations .product-tile`);
        [].forEach.call(allCarouselProducts, (prod) => {
          let prodId;
            if(prod.getAttribute('data-itemid')) {
              prodId = prod.getAttribute('data-itemid');
            } else {
              prodId = prod.querySelector('.name-link .product-name-40').textContent;
            }
          prod.querySelector('.thumb-link').addEventListener('click', () => {
            fireEvent(`Click - Carousel Product - ${prodId}`);
          });
          prod.querySelector('.name-link').addEventListener('click', () => {
            fireEvent(`Click - Carousel Product - ${prodId}`);
          });
        });
    });
  } else if (VARIATION == '2') {
    // --- Click on Banner - Shop All
    const shopAllCta = document.querySelector(`.${ID}-bannersCta__wrapper #${ID}-shopAll`);
    shopAllCta.addEventListener('click', () => {
      fireEvent('Click - Banner Shop All Chocolate');
    });
    // --- Click on Banner - Shop Best Selling Gifts
    const shopGiftsCta = document.querySelector(`.${ID}-bannersCta__wrapper #${ID}-shopGifts`);
    shopGiftsCta.addEventListener('click', () => {
      fireEvent('Click - Banner Shop Best Selling Gifts');
    });
  }

}

export const getTopProductsForList = (promoProducts) => {
  const { ID, VARIATION } = shared;

  let list = "";
  if (promoProducts.length >= 9) {
    for (let i = 0; i < 9; i += 1) {
      const prod = promoProducts[i];
      let prodLink = prod.querySelector('.product-name a.name-link').getAttribute('href');
      if (prodLink !== window.location.pathname) {
        console.log(prod);
        console.log('1 ---------');
        list += prod.querySelector('.product-tile').outerHTML;
      }
      
    }
  } else {
    for (let i = 0; i < promoProducts.length; i += 1) {
      const prod = promoProducts[i];
      let prodLink = prod.querySelector('.product-name a.name-link').getAttribute('href');
      if (prodLink !== window.location.pathname) {
        console.log(prod);
        console.log('2 ========');
        list += prod.querySelector('.product-tile').outerHTML;
      }
      
    }
  }

  return list;
};

export const generateCarouselContent = () => {
  const { ID, VARIATION } = shared;

  // let promoData = getPromoData();
  const getProductsFromPromoPLP = (url, callback) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const temp = document.createElement('html');
        temp.innerHTML = request.responseText;
        const allProducts = temp.querySelectorAll('.search-result-content ul#search-result-items li.grid-tile');
        if (allProducts.length > 0) {
          let promoProducts = allProducts;

          callback(promoProducts);
        }
        
      }
    };
    request.send();
  };
  // Call 
  // if (Object.keys(promoData).length > 0) {

    let savedProducts = '';
    if (JSON.parse(sessionStorage.getItem(`${ID}-saved-products`)) !== null) {
      savedProducts = JSON.parse(sessionStorage.getItem(`${ID}-saved-products`));
      if (savedProducts !== '') {
        // alert('data DOES NOT exist in session - call function');
        getProductsFromPromoPLP(`https://www.hotelchocolat.com/uk/shop/collections/products/all-products/`, (promoProducts) => {

          // --- GET LIST OF PRODUCTS - 9 first products
          let listOfRecommendedProducts = '';
          listOfRecommendedProducts = getTopProductsForList(promoProducts);

          let productsToSave = {};
          savedProducts = listOfRecommendedProducts;

          sessionStorage.setItem(`${ID}-saved-products`, JSON.stringify(savedProducts));

          const recommendedProdContainer = `<div class="${ID}-recommendations__wrapper recommendations recommendations-pdp">
            <h4>Customers Also View</h4>
            <div id="${ID}-carousel-recommendations">
              ${listOfRecommendedProducts}
            </div>
          </div>`;

          // --- ADD CAROUSEL
          addCarousel(recommendedProdContainer);
        });

      // --- Product Data for this Offer already exist in Session Storage
      } else {
        let listOfRecommendedProducts = savedProducts;
        const recommendedProdContainer = `<div class="${ID}-recommendations__wrapper recommendations recommendations-pdp">
          <h4>Customers Also View</h4>
          <div id="${ID}-carousel-recommendations">
            ${listOfRecommendedProducts}
          </div>
        </div>`;

        // --- ADD CAROUSEL
        addCarousel(recommendedProdContainer);
      }
    } 
  
    
  // }


};
  
