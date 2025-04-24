import shared from "../../../../../core-files/shared"

const { ID, VARIATION } = shared;


/**
 * Markup for right icons, same for all variations
 */
export const rightIcons = () => {
  const righticons = `
  <div class="${ID}-headerIcons">
    <div class="${ID}-icon search"><span class="icon-img"></span><p class="icon-name">Search</span></div>
    <div class="${ID}-icon account"><a href="/customer/account/"></a><span class="icon-img"></span><p class="icon-name">Account</span></div>
    <div class="${ID}-icon wishlist"><a href="/guestwishlist/product/view"></a><span class="icon-img"></span><p class="icon-name">Wishlist</span></div>
    <div class="${ID}-icon basket"><a href="/checkout/cart/"></a><span class="icon-img"></span><p class="icon-name">Basket</span></div>
  </div>`;

  return righticons;
}

export const bagNotEmpty = () => {
  const bagIcon = document.querySelector(`.${ID}-icon.basket`);
  if(document.querySelector('.counter-number').textContent !== '0') {
    bagIcon.classList.add('notEmpty');
  } else {
    bagIcon.classList.remove('notEmpty');
  }
}

export const mobileNavShow = () => {
  const newToggle = document.querySelector(`.${ID}-navToggle`);
  const hiddenToggle = document.querySelector(`.action.nav-toggle`);
  const overlay = document.querySelector(`.${ID}-overlay`);

  newToggle.addEventListener('click', () => {
    hiddenToggle.click();

    setTimeout(() => {
      if(document.documentElement.classList.contains('nav-open')) {
        overlay.classList.remove(`${ID}-active`);
        document.querySelector(`.${ID}-search`).classList.remove(`${ID}_searchActive`);
      }
    }, 100);
   
  });

}

export const reviewsSlider = () => {
  document.querySelector('#reviews').style.display ='none';
  window.jQuery('#reviews').slick('unslick');
  
  setTimeout(() => {
    document.querySelector('#reviews').style.display ='block';
  
    if(window.innerWidth >= 1200 && VARIATION !== '3') {
    // reslick reviews
      window.jQuery('#reviews').slick({
        autoplay: true,
        arrows: false,
        dots: false,
        slidesToShow: 1,
        draggable: false,
        infinite: true,
        pauseOnHover: false,
        swipe: false,
        touchMove: false,
        vertical: true,
        speed: 1000,
        autoplaySpeed: 2000,
        useTransform: true,
        cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
        adaptiveHeight: false,
      });

      // Height issue fix
      let maxHeight = -1;
      window.jQuery('#reviews .slick-slide').each(function() {
        if (window.jQuery(this).height() > maxHeight) {
          maxHeight = window.jQuery(this).height();
        }
      });
      window.jQuery('#reviews .slick-slide').each(function() {
        if (window.jQuery(this).height() < maxHeight) {
          window.jQuery(this).css('margin', Math.ceil((maxHeight-window.jQuery(this).height())/2) + 'px 0');
        }
      });
    } else {
      window.jQuery('#reviews').slick({
        autoplay: true,
        arrows: false,
        dots: false,
        slidesToShow: 1,
        draggable: false,
        infinite: true,
        pauseOnHover: false,
        swipe: false,
        touchMove: false,
        vertical: false,
        speed: 1000,
        autoplaySpeed: 2000,
        useTransform: true,
        cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
        adaptiveHeight: false,
      });
    }
}, 50)
}