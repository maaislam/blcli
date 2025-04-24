import { pollerLite } from '../../../../../lib/uc-lib';
import settings from './settings';
import initiateSlick from './initiateSlick';
import brandsContent from './brands_data';
import gaTracking from './gaTracking';

export default () => {
  const searchBoxContainer = document.querySelector('.filter-box.product_filter');
  searchBoxContainer.classList.add('PL017-searchBox_V1');

  const products = JSON.parse(localStorage.getItem("recentlyViewedProducts"));
  let brands = [];
  let recentlyViewedProducts = '';
  products.reverse().forEach(product => {
    // Add brand in brands array
    if (brands.indexOf(product.brand) === -1) {
      brands.push(product.brand);
    }
    // Create Recently Viewed Products containers
    if (product.url) {
      let specialOffersContainer = '';
      if (product.special_offers !== '') {
        specialOffersContainer = `<div class="special-offers-box">
          <div class="header">
            <strong class="h5 text-uppercase">Special Offers</strong>
          </div>
          <div class="body">
            ${product.special_offers}
          </div>                            
        </div>`;
      }
      recentlyViewedProducts += `<div class="cell">
        <section class="box" style="height: auto;">
          <header>
            <figure>
              <a href="${product.url}">
                <picture>
                  <img class=" lazyloaded" data-src="${product.image}" alt="${product.title}" src="${product.image}">
                </picture>
              </a>
            </figure>
            <hgroup>
              <h2><a href="${product.url}">${product.title}</a></h2>                          
            </hgroup>                        
          </header>
          <div class="content">
            ${specialOffersContainer}
            <div class="pricing">
              <span>
                <p class="strong">Business Price
                    <span aria-label="Business Price" class="btn btn-sm btn-link tooltip-link" data-target="dialog-business-pricing"><i class="text-info ico icon-help-circle"></i></span>
                </p>
              </span>
              <div class="prices">
                <div class="ex-vat">
                  <span>£${product.business_price}</span> <small>ex VAT @ 20%</small>
                </div>
                <div class="in-vat">
                  <span id="ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_lstProducts_ctrl0_lblIncVat">£${product.regular_price}</span>
                  <small>inc VAT</small>                                             
                </div>
              </div>                        
            </div>                                      
            <div class="my-3">
                <a class="btn btn-lg btn-block btn-outline-info" href="${product.url}"><span>View</span> <i class="ico icon-chevron-thin-right"></i></a>
            </div>                            
          </div>
          <input type="hidden" value="${product.title}">
          <input type="hidden" value="${product.id}">
        </section>
      </div>`;
    }
    
  });

  // Brands Carousel
  let brandListItems = '';
  brands.forEach(brand => {
    const content = brandsContent[`${brand}`];
    brandListItems += `<li class='PL017-${brand}'>
      <div class='brand__img PL017-${content.id}'></div>
      <a class='PL017-brands__viewAllBtn' href='${content.url}'>View all</a>
    </li>`;
  });

  const recentlyViewedProductsContainer = `<div class="PL017-products__wrapper_v1">
    <div class="PL017-products__container">
      <div class="PL017-recentlyViewed__header">
        <p>Welcome back, here are your recently viewed products</p>
      </div>
      <div class="PL017-recentlyViewed__products">
        ${recentlyViewedProducts}
      </div>
      <div class="PL017-brands__container">
        <div class="PL017-brands__title"><p>Our suggested brands for you</p></div>
        <div class='PL017-brands'>
          <ul class='PL017-brands__list'>
            ${brandListItems}
          </ul>
        </div>
      </div>
    </div>
  </div>`;

  if (!document.querySelector('.PL017-products__wrapper_v1')) {
    const rightSection = document.querySelector('#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_pnlTopFilter .right');
    rightSection.insertAdjacentHTML('afterbegin', recentlyViewedProductsContainer);
  }
  
  // Middle Banner
  if (!document.querySelector('.PL017-middleBanner__wrapper')) {
    const middleBannerContainer = `<div class="PL017-middleBanner__wrapper"><div class="PL017-middleBanner">
      <a href="https://www.printerland.co.uk/Clearance-items-C24845.aspx">
        <img src="https://www.printerland.co.uk/Images/VWO/horizontal-spring-sale-banner.png">
      </a>
    </div></div>`;
    const shopByBrandSection = document.querySelector('section.shop-by-brand');
    shopByBrandSection.insertAdjacentHTML('afterbegin', middleBannerContainer);
  }

  pollerLite(['.PL017-recentlyViewed__products .cell', '.PL017-brands__list'], () => {
    initiateSlick();
    gaTracking();
  });
};
