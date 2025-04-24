import { pollerLite } from "../../../../../lib/utils";
import { getName } from "./helpers"
import shared from "./shared";


export default () => {
const { ID } = shared;

    // get url to pull pages from

    const heading = getName();
    let allProductsURL;

    let newURL;
    let bestSellingURL;
    let seasonalURL;

    if(heading === 'skincare') {
        bestSellingURL = 'https://www.boots.com/ProductListingViewRedesign?ajaxStoreImageDir=%2Fwcsstore%2FeBootsStorefrontAssetStore%2F&searchType=1000&advancedSearch=&cm_route2Page=Home%3Ebeauty+%26+skincare%3Eskincare%3Eall+skincare&filterTerm=&storeId=11352&cm_pagename=all+skincare&manufacturer=&sType=SimpleSearch&metaData=&catalogId=28501&searchTerm=&resultsPerPage=24&filterFacet=&resultCatEntryType=&gridPosition=&emsName=&disableProductCompare=false&langId=-1&facet=&categoryId=2300180';
        newURL = 'https://www.boots.com/ProductListingViewRedesign?ajaxStoreImageDir=%2Fwcsstore%2FeBootsStorefrontAssetStore%2F&searchType=1000&advancedSearch=&cm_route2Page=Home%3Ebeauty+%26+skincare%3Eskincare%3Eall+skincare&filterTerm=&storeId=11352&cm_pagename=all+skincare&manufacturer=&sType=SimpleSearch&metaData=&catalogId=28501&searchTerm=&resultsPerPage=24&filterFacet=&resultCatEntryType=&gridPosition=&emsName=&disableProductCompare=false&langId=-1&facet=&categoryId=2300180';
        seasonalURL = 'https://www.boots.com/beauty/skincare/skincare-all-skincare';
    }

    // run 3 requests to get products
    const getBestSellers = () => {
        jQuery.ajax({
            url: bestSellingURL,
            type: 'post',
            data: {
              orderBy: 7
            },
            success: function(data) {
              const pageData = data;
              const products = jQuery(pageData).find('.product_listing_container .plp_gridView_redesign li');
              const prodArr = Array.from(products);
              const firstEight = prodArr.slice(0,8);
              
              for (let index = 0; index < firstEight.length; index += 1) {
                  const element = firstEight[index];
                  element.classList.add(`${ID}-product`);
                  document.querySelector(`.${ID}-tabCarousel.${ID}-bestSelling .${ID}-productsWrap`).appendChild(element);
                }             
            }
          });
    }

    const getNew = () => {

        jQuery.ajax({
            url: newURL,
            type: 'post',
            data: {
              orderBy: 5
            },
            success: function(data) {
              const pageData = data;
              const products = jQuery(pageData).find('.product_listing_container .plp_gridView_redesign li');
              const prodArr = Array.from(products);
              const firstEight = prodArr.slice(0,8);
              
              for (let index = 0; index < firstEight.length; index += 1) {
                  const element = firstEight[index];
                  element.classList.add(`${ID}-product`);
                  document.querySelector(`.${ID}-tabCarousel.${ID}-new .${ID}-productsWrap`).appendChild(element);
                }             
            }
          });
    }

    const getSeasonal = () => {
        jQuery.ajax({
            url: seasonalURL,
            type: 'post',
            success: function(data) {
              const pageData = data;
              const products = jQuery(pageData).find('.product_listing_container .plp_gridView_redesign li');
              const prodArr = Array.from(products);
              const firstEight = prodArr.slice(0,8);
              
              for (let index = 0; index < firstEight.length; index += 1) {
                  const element = firstEight[index];
                  element.classList.add(`${ID}-product`);
                  document.querySelector(`.${ID}-tabCarousel.${ID}-seasonal .${ID}-productsWrap`).appendChild(element);
                }             
            }
          });
    }

    const productChanges = () => {
        const allProducts = document.querySelectorAll(`.${ID}-tabCarousel .${ID}-product`);

        for (let index = 0; index < allProducts.length; index += 1) {
            const element = allProducts[index];
            // add shop now button
            const productLink = element.querySelector('.product_img_link').getAttribute('href');
            if(productLink) {
                element.querySelector('.product_info').insertAdjacentHTML('afterend', `<a class="${ID}-button ${ID}-shop" href="${productLink}">Shop Now</a>`);
            }
        }
    }

    const slickProducts = () => {
        window.jQuery(`.${ID}-tabCarousel .${ID}-productsWrap`).slick({
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
                settings: "unslick"
              },
              {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                  }
              },
                {
                  breakpoint: 1280,
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
    

    getBestSellers();
    getNew();
    getSeasonal();

    pollerLite([`.${ID}-tabCarousel.${ID}-bestSelling .${ID}-product`, `.${ID}-tabCarousel.${ID}-seasonal .${ID}-product`, `.${ID}-tabCarousel.${ID}-new .${ID}-product .product_img_link`], () => {
        productChanges();

        if(window.innerWidth >= 1024) {
            slickProducts();
            window.jQuery(`.${ID}-tabCarousel .${ID}-productsWrap`).slick('resize');
        }
        

        if(window.innerWidth >= 1024) {
          slickProducts();
          window.jQuery(`.${ID}-tabCarousel .${ID}-productsWrap`).slick('resize');
          window.jQuery(window).on('resize orientationchange', function() {
            window.jQuery(`.${ID}-tabCarousel .${ID}-productsWrap`).slick('reinit');
          });
      }
      // on resize
      if(window.innerWidth > 767){
          window.jQuery(window).resize(function() {
              if(window.innerWidth >= 1024) {
                slickProducts();
                window.jQuery(`.${ID}-tabCarousel .${ID}-productsWrap`).slick('resize');
              } else {
                  if(window.jQuery(`.${ID}-tabCarousel .${ID}-productsWrap.slick-initialized`)) {
                    window.jQuery(`.${ID}-tabCarousel .${ID}-productsWrap`).slick('unslick');
                  }
              }
          });
        }
        
    });


    

}