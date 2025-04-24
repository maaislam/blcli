import { pollerLite } from '../../../../../lib/uc-lib';
import settings from './settings';
import initiateSlick from './initiateSlick';
import brandsContent from './brands_data';
// import gaTracking from './gaTracking';

export default () => {
  const messageContainer = document.querySelector('.PL018-welcomeMsg__wrapper');
  if (!document.querySelector('.PL018-welcomeMsg__wrapper')) {
    const topMessageContainer = `<div class="PL018-welcomeMsg__wrapper header__top">
      <div class="PL018-welcomeMsg">Welcome back!</div>
      <div class="PL018-headerMsg">Find something new</div>
    </div>`;
    const pageHeader = document.querySelector('.page-header .container.grid');
    pageHeader.insertAdjacentHTML('afterend', topMessageContainer);

    const middleMessageContainer = `<div class="PL018-welcomeMsg__wrapper header__middle">
      <div class="PL018-headerMsg">Pick up where you left off</div>
    </div>`;
    const shopByBrandSection = document.querySelector('section.shop-by-brand');
    shopByBrandSection.insertAdjacentHTML('afterbegin', middleMessageContainer);
  }
  
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
              <div class="PL018-content__bottom">
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
    brandListItems += `<li class='PL018-${brand}'>
      <div class='brand__img PL018-${content.id}'></div>
      <a class='PL018-brands__viewAllBtn' href='${content.url}'>View all</a>
    </li>`;
  });

  const recentlyViewedProductsContainer = `<div class="PL018-products__wrapper">
    <div class="PL018-products__container">
      <div class="PL018-recentlyViewed__title">
        <p>Your recently viewed products</p>
      </div>
      <div class="PL018-recentlyViewed__products">
        ${recentlyViewedProducts}
      </div>
    </div>
    <div class="PL018-separatingLine"></div>
    <div class="PL018-brands__container">
        <div class="PL018-brands__title"><p>Brands you've looked at</p></div>
        <div class='PL018-brands PL018-brands_v1'>
          <ul class='PL018-brands__list'>
            ${brandListItems}
          </ul>
        </div>
      </div>
  </div>`;

  if (!document.querySelector('.PL018-products__wrapper_v1')) {
    const middleSection = document.querySelector('.PL018-welcomeMsg__wrapper.header__middle');
    middleSection.insertAdjacentHTML('afterend', recentlyViewedProductsContainer);
  }
  // Move Pink Banner
  if (document.querySelector('.home-banner-strip')) {
    const pinkBanner = document.querySelector('.home-banner-strip');
    pinkBanner.classList.add('PL018-pinkBanner_v1');
    const shopByBrand = document.querySelector('section.shop-by-brand .container');
    shopByBrand.insertAdjacentElement('beforebegin', pinkBanner);
  }
  
  pollerLite(['.PL018-recentlyViewed__products .cell', '.PL018-brands__list'], () => {
    initiateSlick();
  });
};
