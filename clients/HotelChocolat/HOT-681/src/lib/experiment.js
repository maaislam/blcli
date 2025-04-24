/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const vipSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
  <g clip-path="url(#clip0_2009_1193)">
    <path d="M22.561 6.30549C23.0432 6.30549 23.4048 6.66715 23.4048 7.14935V19.6867C23.4048 20.1689 23.0432 20.5306 22.561 20.5306H2.54938C2.06717 20.5306 1.70552 20.1689 1.70552 19.6867V7.14935C1.70552 6.66715 2.06717 6.30549 2.54938 6.30549H22.561ZM22.561 5.09998H2.54938C1.46441 5.09998 0.5 5.94384 0.5 7.14935V19.6867C0.5 20.8922 1.46441 21.7361 2.54938 21.7361H22.4404C23.6459 21.7361 24.4898 20.7717 24.4898 19.6867V7.14935C24.6103 5.94384 23.6459 5.09998 22.561 5.09998Z" fill="black"/>
    <path d="M9.66211 15.4674V11.248H10.9882C11.4704 11.248 11.7115 11.3686 12.0731 11.6097C12.3142 11.8508 12.4348 12.0919 12.4348 12.5741C12.4348 13.0563 12.3142 13.2974 12.0731 13.5385C11.832 13.7796 11.4704 13.7796 10.9882 13.7796H10.506V15.4674H9.66211ZM10.8676 13.0563C11.1087 13.0563 11.3498 13.0563 11.4704 12.9358C11.5909 12.8152 11.5909 12.6947 11.5909 12.5741C11.5909 12.333 11.5909 12.2125 11.4704 12.2125C11.3498 12.0919 11.1087 12.0919 10.8676 12.0919H10.3854V13.1769H10.8676V13.0563Z" fill="black"/>
    <path d="M12.314 15.5879C12.1934 15.5879 12.0729 15.5879 11.9523 15.4674C11.8318 15.3468 11.8318 15.2263 11.8318 15.1057C11.8318 14.9852 11.8318 14.8646 11.9523 14.7441C12.0729 14.6235 12.1934 14.6235 12.314 14.6235C12.4345 14.6235 12.5551 14.6235 12.6756 14.7441C12.7962 14.8646 12.7962 14.9852 12.7962 15.1057C12.7962 15.2263 12.7962 15.3468 12.6756 15.4674C12.5551 15.4674 12.4345 15.5879 12.314 15.5879Z" fill="black"/>
    <path d="M5.32195 15.4674L3.51367 11.248H4.35753L5.4425 13.9002L6.52746 11.248H7.37133L5.56305 15.4674H5.32195Z" fill="black"/>
    <path d="M8.81798 11.248H7.97412V15.4674H8.81798V11.248Z" fill="black"/>
    <path d="M19.0649 15.4674V11.248H21.476V11.9714H19.7883V13.0563H21.476V13.7796H19.7883V14.744H21.5965V15.4674H19.0649Z" fill="black"/>
    <path d="M17.2569 15.4674V12.5741L16.1719 13.9002H15.9308L14.8459 12.5741V15.4674H14.1226V11.248H14.7253L16.0514 12.8152L17.2569 11.3686L17.8597 11.248H17.9802V15.4674H17.2569Z" fill="black"/>
  </g>
  <defs>
    <clipPath id="clip0_2009_1193">
      <rect width="24" height="24" fill="white" transform="translate(0.833252)"/>
    </clipPath>
  </defs>
</svg>`;

const deliverySVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="22" viewBox="0 0 25 22" fill="none">
  <g clip-path="url(#clip0_2009_1226)">
    <path d="M24.5 10.6C24.5 10.24 24.38 9.88 24.26 9.64L21.38 5.2C21.14 4.72 20.66 4.36 20.06 4.36H16.46V1.96C16.46 1.36 15.98 1 15.38 1H1.46C0.98 1 0.5 1.48 0.5 1.96V16.96C0.5 17.56 0.98 17.92 1.46 17.92H3.5C3.5 18.16 3.5 18.28 3.5 18.52C3.5 20.2 4.82 21.4 6.38 21.4C7.94 21.4 9.38 20.08 9.38 18.52C9.38 18.4 9.38 18.16 9.26 18.04H15.38C15.38 18.16 15.26 18.4 15.26 18.52C15.26 20.2 16.58 21.4 18.14 21.4C19.7 21.4 21.14 20.08 21.14 18.52C21.14 18.4 21.14 18.16 21.02 18.04H23.3C23.9 18.04 24.38 17.56 24.38 16.96L24.5 10.6ZM6.38 20.56C5.3 20.56 4.34 19.6 4.34 18.52C4.34 18.28 4.46 17.92 4.58 17.8C4.82 17.08 5.54 16.6 6.38 16.6C7.22 16.6 7.94 17.08 8.3 17.8C8.42 18.04 8.54 18.28 8.54 18.52C8.54 19.6 7.58 20.56 6.38 20.56ZM18.5 20.56C17.3 20.56 16.46 19.6 16.46 18.52C16.46 18.28 16.58 17.92 16.58 17.8C16.82 17.08 17.66 16.6 18.5 16.6C19.34 16.6 20.06 17.08 20.3 17.8C20.42 18.04 20.42 18.28 20.42 18.52C20.42 19.6 19.58 20.56 18.5 20.56ZM23.54 16.96L23.42 17.08H20.9C20.42 16.12 19.46 15.64 18.38 15.64C17.3 15.64 16.34 16.24 15.86 17.08H9.02C8.54 16.12 7.46 15.64 6.38 15.64C5.3 15.64 4.34 16.24 3.86 17.08H1.46C1.46 17.08 1.34 17.08 1.34 16.96V1.96C1.34 1.84 1.34 1.84 1.46 1.84H15.26C15.38 1.84 15.38 1.96 15.38 1.96V5.32H19.82C20.06 5.32 20.3 5.44 20.42 5.56L23.3 10.12V10.24C23.3 10.36 23.42 10.48 23.42 10.72V16.96H23.54Z" fill="black"/>
    <path d="M15.98 6.28003V10.6H22.7L19.94 6.28003H15.98ZM16.82 9.76003V7.12003H19.46L21.14 9.76003H16.82Z" fill="black"/>
  </g>
  <defs>
    <clipPath id="clip0_2009_1226">
      <rect width="24" height="21" fill="white" transform="translate(0.5 0.5)"/>
    </clipPath>
  </defs>
</svg>`;

const cocoaSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
  <path d="M17.6327 1.20268C15.388 -1.04196 9.33879 -0.201302 4.90151 4.23598C0.464225 8.67326 -0.376431 14.7225 1.86821 16.9672C2.53553 17.6345 3.76619 17.9985 5.27417 17.9985C8.05613 17.9985 11.7741 16.7592 14.5994 13.9339C18.95 9.58325 19.548 3.11799 17.6327 1.20268ZM11.7828 11.1172C8.13413 14.7659 4.83217 16.3952 3.36752 16.3258L16.9914 2.69333C17.0607 4.16665 15.4314 7.45994 11.7828 11.1172ZM3.28086 12.8852C4.19951 11.0652 5.76816 8.99392 7.71814 7.05261C9.66812 5.1113 11.7308 3.52532 13.5507 2.61533C14.6774 2.052 15.5007 1.83534 16.0467 1.83534C16.0814 1.83534 16.0987 1.84401 16.1247 1.84401L2.50953 15.4678C2.48353 14.9219 2.68287 14.0725 3.28086 12.8852ZM5.7595 5.09397C8.2728 2.58067 11.3841 1.30668 13.7587 1.19401C11.6008 2.104 9.02679 4.01931 6.86015 6.18596C4.82351 8.2226 3.16819 10.4066 2.19754 12.3305C2.06754 12.5819 1.96354 12.8245 1.85954 13.0672C1.97221 10.7012 3.24619 7.59861 5.7595 5.09397ZM13.7414 13.0759C11.5141 15.3032 8.6368 16.4125 6.34016 16.6985C8.36813 15.7105 10.6734 13.9512 12.6407 11.9752C14.6167 9.99924 16.376 7.7026 17.364 5.67463C17.078 7.97127 15.96 10.8486 13.7414 13.0759Z" fill="black"/>
</svg>
`;

const arrowSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 8" fill="#000">
  <path d="M1.08351 8C1.01294 8 0.942378 7.97256 0.887493 7.91767C0.781643 7.81182 0.781643 7.63541 0.887493 7.52956L4.41974 4.00123L0.887493 0.46898C0.781643 0.36313 0.781643 0.190634 0.887493 0.0808642C0.993343 -0.028906 1.16976 -0.0249856 1.27561 0.0808642L5.19205 4.00123L1.27561 7.92159C1.22072 7.97256 1.15016 8 1.08351 8Z" fill="black"/>
</svg>
`;

const startExperimentDesktop = () => {
  pollerLite(['body #desktop-navigation .main-navigation'], () => {
    // console.log('Poller: body #desktop-navigation .main-navigation');

    const currentSearchBar = document.querySelector('#main-header .hlp-centered-wrapper')
    const input = currentSearchBar.querySelector('input');
    input.placeholder = 'Search products';
    input.style.textAlign = 'left';
    input.style.marginLeft = '20px';
    const currNav = document.querySelector('#desktop-navigation')

    // currentSearchBar.insertAdjacentElement('afterend', currNav)

    const newContainer = `
    <div class="${ID}-nav-search-wrapper">
    </div>`;

    currentSearchBar.insertAdjacentHTML('afterend', newContainer)

    const newNav = document.querySelector(`.${ID}-nav-search-wrapper`)
    newNav.appendChild(currNav)
    newNav.appendChild(currentSearchBar)

    const myAccount = document.querySelector('#navigation #my-account-dropdown .drop-down-options');
    // console.log(myAccount.childNodes.length, 'myAccount.childNodes.length')
    if(myAccount.childNodes.length < 17) {
      //then we have a logged out user
      document.querySelector('#navigation #my-account-dropdown .menu-title .menu-text').innerText = 'My Account';
      document.querySelector('#navigation #my-account-dropdown').addEventListener('click', () => {
        fireEvent('Click - Logged out user clicks on "My Account"');
      });
    }

    const headerPromoBanner = document.querySelector('#header-promo-banner');
    headerPromoBanner.style.display = 'none';

    const headerPromoCarousel = `
    <div class="${ID}-header-promo-carousel">
      <div class="${ID}-carousel">
          <a href="https://www.hotelchocolat.com/uk/about-vipme/">${vipSVG} Join for 15% off ${VARIATION === '3' ? `${arrowSVG}` : ``}</a>
          <a href="https://www.hotelchocolat.com/uk/help/delivery.html">${deliverySVG} Delivery options ${VARIATION === '3' ? `${arrowSVG}` : ``}</a>
          <a href="https://www.hotelchocolat.com/uk/ethics-and-sustainability/gentle-farming.html">${cocoaSVG} Gentle farming ${VARIATION === '3' ? `${arrowSVG}` : ``}</a>
      </div>
    </div>`;

    const mainHeader = document.querySelector('#main-header');

    if(VARIATION === '1'){
      mainHeader.insertAdjacentHTML('afterend', headerPromoCarousel)
    }

    if(VARIATION === '2'){
      mainHeader.insertAdjacentHTML('beforebegin', headerPromoCarousel)
    }

    if(VARIATION === '3'){

      mainHeader.insertAdjacentHTML('beforebegin', headerPromoCarousel)

      $(`.${ID}-carousel`).slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Autoplay enabled
        autoplaySpeed: 10000, // Autoplay speed in milliseconds
        speed: 1000,
        dots: false,
        arrows: false,
        responsive: [

        ],
      });
    
    }

    

  })
}

const startExperimentMobile = () => {
  pollerLite(['body #desktop-navigation .main-navigation'], () => {
    const currentSearchBar = document.querySelector('#main-header .hlp-centered-wrapper')
    const input = currentSearchBar.querySelector('input');
    input.placeholder = 'Search products';
    input.style.textAlign = 'left';
    input.style.marginLeft = '20px';

    const icon = document.querySelector('#main-header .hlp-centered-wrapper button');
    icon.style.right = 'unset';
    icon.style.left = '0';
    icon.style.padding = '0 5px';

    const headerPromoBanner = document.querySelector('#header-promo-banner');
    headerPromoBanner.style.display = 'none';

    const headerPromoCarousel = `
    <div class="${ID}-header-promo-carousel-mobile">
      <div class="${ID}-carousel">
          <a href="https://www.hotelchocolat.com/uk/about-vipme/">${vipSVG} Join for 15% off</a>
          <a href="https://www.hotelchocolat.com/uk/help/delivery.html">${deliverySVG} Delivery options</a>
          <a href="https://www.hotelchocolat.com/uk/ethics-and-sustainability/gentle-farming.html">${cocoaSVG} Gentle farming</a>
      </div>
    </div>`;

    const mainHeader = document.querySelector('#main-header');

    if(VARIATION === '4'){
      const headerPromoCarouselMobile = document.querySelector(`.${ID}-header-promo-carousel-mobile`);
      if(!headerPromoCarouselMobile){
        mainHeader.insertAdjacentHTML('afterend', headerPromoCarousel)
      }

      pollerLite(['body #desktop-navigation'], () => {
        // console.log('jquery found')
        $(`.${ID}-carousel`).slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true, // Autoplay enabled
          autoplaySpeed: 5000, // Autoplay speed in milliseconds
          speed: 1000,
          dots: false,
          arrows: true,
          responsive: [
    
          ],
        });
      });

    }

    if(VARIATION === '5'){
      const headerPromoCarouselMobile = document.querySelector(`.${ID}-header-promo-carousel-mobile`);
      if(!headerPromoCarouselMobile){
        mainHeader.insertAdjacentHTML('beforebegin', headerPromoCarousel)

        pollerLite(['body #desktop-navigation .main-navigation'], () => {
          $(`.${ID}-carousel`).slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true, // Autoplay enabled
            autoplaySpeed: 5000, // Autoplay speed in milliseconds
            speed: 1000,
            dots: false,
            arrows: true,
            responsive: [
      
            ],
          });
        });
      }
      headerPromoCarouselMobile.style.borderBottom = '2px solid #000';

    }

    document.body.addEventListener('click', (e) => {
      if(e.target.closest(`.${ID}-carousel a`)){
        fireEvent('Click - the user clicks on the USP bar');
      }
    });

    // $(`.${ID}-carousel`).slick({
    //   infinite: true,
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //   autoplay: true, // Autoplay enabled
    //   autoplaySpeed: 5000, // Autoplay speed in milliseconds
    //   speed: 1000,
    //   dots: false,
    //   arrows: true,
    //   responsive: [

    //   ],
    // });
  });
}

const addTracking = () => {
  document.body.addEventListener('click', (e) => {
    const screenWidth = window.innerWidth;
    //Desktop
      if(e.target.closest('#navigation .hlp-centered-wrapper .header-search')){
        fireEvent('Click - the user uses the search bar');
      }
      if(screenWidth > 640){
        if(e.target.closest('#header-promo-banner a[href="https://www.hotelchocolat.com/uk/about-vipme/"]')){
          fireEvent('Click - the user clicks on the VIP link');
        }
        if(e.target.closest('#header-promo-banner a[href="https://www.hotelchocolat.com/uk/help/delivery.html"]')){
          fireEvent('Click - the user clicks on the Delivery link');
        }
        if(e.target.closest('#header-promo-banner a[href="https://www.hotelchocolat.com/uk/ethics-and-sustainability/gentle-farming.html"]')){
          fireEvent('Click - the user clicks on the Gentle farming link');
        }
      }
      if(e.target.closest('#navigation #my-account-dropdown')){
        fireEvent('Click - the user clicks on "Me"');
      }
    //Mobile

    if(e.target.closest('#main-header .hlp-centered-wrapper .header-search')){
      fireEvent('Click - the user uses the search bar');
    }
    if(screenWidth < 640){
      if(e.target.closest('#header-promo-banner')){
        fireEvent('Click - the user clicks on USP bar');
      }
    }

  });
}

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  addTracking();
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  
  if(VARIATION === '1' || VARIATION === '2' || VARIATION === '3'){
    startExperimentDesktop();
  }
  if(VARIATION === '4' || VARIATION === '5'){
    startExperimentMobile();
  }
};
