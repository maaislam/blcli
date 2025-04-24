import fetch from './fetch';
import store from './store';


const slider = (basketItems, targetDiv1, targetDiv2) => {

  if (targetDiv1) {
    const topBrand = store.basketProducts();

    // Create Similar Slider UL element
    const similarSliderElement = document.createElement('div');
    similarSliderElement.setAttribute('id', 'FL051-simSlider');

    fetch.similarProducts(topBrand, basketItems).then((result) => {
      /**
       * Returns an array of LI's
       */
      const mapResult = result.map((prod, index) => {
        if (index < 7) {
          const html =
            `<div class="FL051-slide">
              <div class="SuggestedProduct" data-productpos="${index}" data-productid="${prod.ProductId}" data-productname="${prod.Title}">
                  <div class="productimage s-productthumbimage">
                      <a href="${prod.Url}" class="PSImage"> <img class="PSPimg-res" src="${prod.ImageUrl}" alt="${prod.Name}"> </a>
                  </div>
                  <div class="hotspotbuy hotspotquickbuy" data-colourvariantid="${prod.ProductId}" data-hsshowallcolours="false" data-iswishlist="${prod.WishListEnabled}" data-hsisproductrecclick="true" style="display: none;"> <span class="QuickLookIcon"></span> <span class="QuickLookText"></span> </div>
                  <div class="hotspotbuy hotspotwishlist" data-colourvariantid="${prod.ProductId}" data-hsshowallcolours="false" data-iswishlist="${prod.WishListEnabled}" data-hsisproductrecclick="true" data-loginredirecturl="/Login?addto=wishlist&amp;returnurl=" style="display: none;"> <span class="WishIcon"></span> <span class="WishText">Wish list</span> </div>
                  <a href="${prod.Url}"> <span class="PSProdBrand"><span class="wrap">${prod.Brand}</span></span> <span class="PSProdTitle"><span class="wrap">${prod.Name}</span></span>
                  </a>
                  <div class="PSProdPrice"> <span class="PSSellPrice">${prod.SellPrice}</span>
                      <div> <span class="PSRefPrice">${prod.RefPrice}</span> </div>
                  </div>
              </div>
            </div>`;
          return html;
        }
      }).join('');
      // Add HTML to created UL.
      targetDiv1.insertAdjacentHTML('beforeend', mapResult);
    });
  }

  if (targetDiv2) {
    // Fetch array of product
    const recentlyViewed = JSON.parse(fetch.recentlyViewed());
    // Create element to house products
    const recentlyViewedElement = document.createElement('div');
    recentlyViewedElement.setAttribute('id', 'FL051-recSlider');

    // Loop over products and add result to element above.
    const recentResult = Object.keys(recentlyViewed).map((prod, index) => {
      const prodObject = recentlyViewed[prod];
      if (index < 7) {
        const html =
          `<div class="FL051-slide">
            <div class="SuggestedProduct" data-productpos="${index}" data-productid="${prodObject.ProductId}" data-productname="${prodObject.Title}">
                <div class="productimage s-productthumbimage">
                    <a href="${prodObject.Url}" class="PSImage"> <img class="PSPimg-res" src="${prodObject.ImageUrl}" alt="${prodObject.Name}"> </a>
                </div>
                <div class="hotspotbuy hotspotquickbuy" data-colourvariantid="${prodObject.ProductId}" data-hsshowallcolours="false" data-hsisproductrecclick="true" style="display: none;"> <span class="QuickLookIcon"></span> <span class="QuickLookText"></span> </div>
                <div class="hotspotbuy hotspotwishlist" data-colourvariantid="${prodObject.ProductId}" data-hsshowallcolours="false" data-hsisproductrecclick="true" data-loginredirecturl="/Login?addto=wishlist&amp;returnurl=" style="display: none;"> <span class="WishIcon"></span> <span class="WishText">Wish list</span> </div>
                <a href="${prodObject.Url}"> <span class="PSProdBrand"><span class="wrap">${prodObject.Brand}</span></span> <span class="PSProdTitle"><span class="wrap">${prodObject.Name}</span></span>
                </a>
                ${prodObject.priceEl ? `<div class="PSProdPrice">
                  ${prodObject.priceEl}
                </div>` : ''}
            </div>
          </div>`;
        return html;
      }
    }).join('');
    targetDiv2.insertAdjacentHTML('beforeend', recentResult);
  }
};

export default slider;
