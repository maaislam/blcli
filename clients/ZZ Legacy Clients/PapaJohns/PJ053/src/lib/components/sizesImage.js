import { events } from '../../../../../../lib/utils';

export const sizesImageDesktop = () => {
    const menuBanner = document.querySelector('.menuBanner');

    if(menuBanner && menuBanner.parentNode) {
      const url1 = window.location.pathname.replace('pizzas.aspx', 'create-your-own.aspx');
      const url2 = window.location.pathname.replace('pizzas.aspx', 'half-and-half.aspx');

      menuBanner.parentNode.innerHTML = `
        <div class="PJ053-banner-desktop">
          <a href="${url1}" id="ctl00_cphBody__objMenuHeader_hypCYO" class="create_own" onclick="dataLayer.push({'event': 'GAevent', 'eventCategory': 'Menu', 'eventAction': 'CYO', 'eventLabel': ''});">
            <img src="https://dp8v87cz8a7qa.cloudfront.net/43831/5ca3e3a81cf281554244520.jpg" alt="">
          </a>
          <a href="${url2}" id="ctl00_cphBody__objMenuHeader_hypHH" class="half_half" onclick="dataLayer.push({'event': 'GAevent', 'eventCategory': 'Menu', 'eventAction': 'HalfAndHalf', 'eventLabel': ''});">
            <img src="/images/2019assets/try_half_half.jpg" alt="">
          </a>
          <div class="PJ053-our-sizes">
            <img src="https://dp8v87cz8a7qa.cloudfront.net/43831/5ca3d5e313f6d1554240995.jpg">
          </div>
          <div class="PJ053-size PJ053-size--small">
            <img src="https://dp8v87cz8a7qa.cloudfront.net/43831/5ca3d633722301554241075.jpg">

            <span class="PJ053-size-title">9.5"</span>
            <span class="PJ053-size-desc">6 slices</span>
          </div>
          <div class="PJ053-size PJ053-size--medium">
            <img src="https://dp8v87cz8a7qa.cloudfront.net/43831/5ca3d622264f71554241058.jpg">

            <span class="PJ053-size-title">11.5"</span>
            <span class="PJ053-size-desc">8 slices</span>
          </div>
          <div class="PJ053-size PJ053-size--large">
            <img src="https://dp8v87cz8a7qa.cloudfront.net/43831/5ca3d60fe758c1554241039.jpg">

            <span class="PJ053-size-title">13.5"</span>
            <span class="PJ053-size-desc">10 slices</span>
          </div>
          <div class="PJ053-size PJ053-size--xxl">
            <img src="https://dp8v87cz8a7qa.cloudfront.net/43831/5ca3d5fc42a581554241020.jpg">

            <span class="PJ053-size-title">15.5"</span>
            <span class="PJ053-size-desc">12 slices</span>
          </div>
        </div>
      `;
    }

};

export const sizesImageTablet = () => {
    const menuBanner = document.querySelector('.menuBanner');

    if(menuBanner) {
      menuBanner.innerHTML = `
        <div class="PJ053-banner-desktop">
          <div class="PJ053-our-sizes">
            <img src="https://dp8v87cz8a7qa.cloudfront.net/43831/5ca3d5e313f6d1554240995.jpg">
          </div>
          <div class="PJ053-size PJ053-size--small">
            <img src="https://dp8v87cz8a7qa.cloudfront.net/43831/5ca3d633722301554241075.jpg">

            <span class="PJ053-size-title">9.5"</span>
            <span class="PJ053-size-desc">6 slices</span>
          </div>
          <div class="PJ053-size PJ053-size--medium">
            <img src="https://dp8v87cz8a7qa.cloudfront.net/43831/5ca3d622264f71554241058.jpg">

            <span class="PJ053-size-title">11.5"</span>
            <span class="PJ053-size-desc">8 slices</span>
          </div>
          <div class="PJ053-size PJ053-size--large">
            <img src="https://dp8v87cz8a7qa.cloudfront.net/43831/5ca3d60fe758c1554241039.jpg">

            <span class="PJ053-size-title">13.5"</span>
            <span class="PJ053-size-desc">10 slices</span>
          </div>
          <div class="PJ053-size PJ053-size--xxl">
            <img src="https://dp8v87cz8a7qa.cloudfront.net/43831/5ca3d5fc42a581554241020.jpg">

            <span class="PJ053-size-title">15.5"</span>
            <span class="PJ053-size-desc">12 slices</span>
          </div>
        </div>
      `;
    }
};

export const sizesImageMobile = () => {
  const menuContainer = document.querySelector('.main .menuItems');
  const pizzaSizesImage = document.createElement('div');
  pizzaSizesImage.classList.add('PJ053-image_sizes');
  menuContainer.insertAdjacentElement('beforebegin', pizzaSizesImage);
};
