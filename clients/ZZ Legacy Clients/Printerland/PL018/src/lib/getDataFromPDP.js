import { pollerLite } from '../../../../../lib/uc-lib';

export default () => {
  pollerLite(['h1#pageTitle', '#hlinkLargeImage', '#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_lbltxtProductPrice'], () => {
    // Getting Data out of the dataLayer
    dataLayer.forEach(element => {
      if (element.ecommerce && element.ecommerce.detail && element.ecommerce.detail.products[0].category && element.ecommerce.detail.products[0].id && element.ecommerce.detail.products[0].price && element.ecommerce.detail.products[0].brand && element.ecommerce.detail.products[0].category === 'Printers') {
        const productId = element.ecommerce.detail.products[0].id;
        const productTitle = document.querySelector('h1#pageTitle').innerText.trim();
        const productBrand = element.ecommerce.detail.products[0].brand;
        const productImage = document.querySelector('#hlinkLargeImage').href;
        let specialOffers = '';
        if (document.querySelector('#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_pnlPromotion .body')) {
          specialOffers = document.querySelector('#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_pnlPromotion .body').innerHTML;
        }
        // const businessPrice = document.querySelector('#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_lbltxtProductPrice').innerText.trim().replace('£', '');
        const businessPrice = element.ecommerce.detail.products[0].price;
        const regularPrice = element.ecommerce.detail.products[0].incVat;
        const productUrl = window.location.href;

        const productData = {
          id : `${productId}`,
          url : `${productUrl}`,
          title : `${productTitle}`,
          brand : `${productBrand}`,
          image : `${productImage}`,
          special_offers : `${specialOffers}`,
          business_price : `${businessPrice}`,
          regular_price : `${regularPrice}`,
        };
        let products = [];

        if (!localStorage.getItem("recentlyViewedProducts")) {
          products.push(productData);
          localStorage.setItem("recentlyViewedProducts", JSON.stringify(products));
        } else {
          products = JSON.parse(localStorage.getItem("recentlyViewedProducts"));
          
          // Check if product ID already exists in localStorage item
          let productExistsInCookie = false;
          products.forEach(product => {
            if (product.id === productId) {
              productExistsInCookie = true;
            }
          });

          if (!productExistsInCookie) {
            if (products.length < 5) {
              products.push(productData);
              localStorage.setItem("recentlyViewedProducts", JSON.stringify(products));
            } else if (products.length === 5) {
              products.shift();
              products.push(productData);
              localStorage.setItem("recentlyViewedProducts", JSON.stringify(products));
            }
          }
        }
      }
    });
  });

};