import shared from "../../../../../core-files/shared";

const { ID } = shared;

export const dataLayerPush = (product) => {
  window.dataLayer.push({ ecommerce: null });  
  window.dataLayer.push({
  'event': 'addToBag',
  product
  });
  
}

export const plus = () => {
  if(document.querySelector(`.${ID}-quantity-input`)) {
    var value = parseInt(document.querySelector(`.${ID}-quantity-input`).value, 10);
    value = isNaN(value) ? 1 : value;
    value++;
    document.querySelector(`.${ID}-quantity-input`).value = value;
  }
}
export const minus = () => {
  if(document.querySelector(`.${ID}-quantity-input`)) {
    var value = parseInt(document.querySelector(`.${ID}-quantity-input`).value, 10);
    value = isNaN(value) ? 1 : value;
    value--;
    value < 1 ? value = 1 : '';
    document.querySelector(`.${ID}-quantity-input`).value = value;
  }
}

export const elementInViewport = (element) => {
  var top = element.offsetTop;
  var left = element.offsetLeft;
  var width = element.offsetWidth;
  var height = element.offsetHeight;

  while(element.offsetParent) {
    element = element.offsetParent;
    top += element.offsetTop;
    left += element.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}

export const addYTapi = () => {
  var tag = document.createElement('script');
  tag.className = `youtube`;
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

export const runYoutube = () => {
  let player;

  function readyYoutube() {
    if ((typeof YT !== "undefined") && YT && YT.Player) {
      player = new YT.Player('player', {
        height: "100%",
        width: "100%",
        videoId: 'vMyqdse4ElU',
        events: {
          'onStateChange': onPlayerStateChange
        }
      });

      let done = false;

      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          fireEvent('Clicked play video');
          done = true;
        }
      }
    } else {
      setTimeout(readyYoutube, 1000);
    }
  }
  readyYoutube();
}

export const klarnaAdditon = () => {
  document.querySelector('.product-add-to-cart').insertAdjacentHTML('beforeend', ' <klarna-placement data-key="top-strip-promotion-standard" data-locale="en-GB"></klarna-placement>');
  window.KlarnaOnsiteService = window.KlarnaOnsiteService || []
  window.KlarnaOnsiteService.push({
    eventName: 'refresh-placements'
  });
}

export const reviewSmoothScroll = () => {
  function scrollToElement(element) {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: element.getBoundingClientRect().top + window.scrollY - 100,
    });
  }

  const reviewLink = document.querySelector(`.product-review-links.product-review-links-top`);

  if (reviewLink) {
    reviewLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.innerWidth <= 767) {

        if(!document.querySelector('.reviews.tab-mobile-title').classList.contains('active')) {
          document.querySelector('.reviews.tab-mobile-title').click();
        }

        scrollToElement(document.querySelector('.reviews.tab-mobile-title'));
        
      } else {
        if (document.querySelector(`.${ID}-tab.${ID}-reviews`)) {
          const desktopReview = document.querySelector(`.${ID}-tab.${ID}-reviews`);
          scrollToElement(desktopReview);
          desktopReview.click();
        }
      }
    });
  }
}


export const colourPrice = 149.95;
export const extrasPrices = [];
export const bundlePrices = [];



export const radioOptionPrice = [149.95];
export const radioExtrasPrices = [];
export const radioBundlePrices = [];

export const updateRadioPrice = () => {
  let totalPriceEl;
  totalPriceEl = document.querySelector(`.product-price span`);

  const optionPrice = radioOptionPrice.reduce(function (a, b) {
    return a + b;
  }, 0);

  const radioextraPrice = radioExtrasPrices.reduce(function (a, b) {
    return a + b;
  }, 0);

  const radiobundlePrice = radioBundlePrices.reduce(function (a, b) {
    return a + b;
  }, 0);

  const total = parseFloat(optionPrice + radioextraPrice + radiobundlePrice);
  totalPriceEl.innerHTML = `£${total.toFixed(2)}`;
}

export const updatePrice = () => {
  let totalPriceEl;
  totalPriceEl = document.querySelector(`.product-price span`);


  const extraPrice = extrasPrices.reduce(function (a, b) {
    return a + b;
  }, 0);


  const bundlePrice = bundlePrices.reduce(function (a, b) {
    return a + b;
  }, 0);

  const total = parseFloat(colourPrice + extraPrice + bundlePrice);
  totalPriceEl.innerHTML = `£${total.toFixed(2)}`;

  // if on mobile, update fixed bar price
  const fixedPrice = document.querySelector(`.${ID}-addToBagMobile .${ID}-price span`);
  if(fixedPrice) {
    fixedPrice.innerHTML = `£${total.toFixed(2)}`;
  }

}



export const makeActiveColour = (prodId) => {
  document.querySelector(`.${ID}-colour[prod-id="${prodId}"]`).click();
}

export const slickProducts = (carousel, initialSlideToShow) => {
  

  window.jQuery(carousel).slick({
    
      slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
        infinite: false,
        initialSlide: initialSlideToShow,
        mobileFirst: true, 
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                initialSlide: initialSlideToShow,
              }
            },
            {
              breakpoint: 1008,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                initialSlide: initialSlideToShow,
              }
            },
            {
                  breakpoint: 400,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: initialSlideToShow,
                  }
              },
              {
                  breakpoint: 374,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: initialSlideToShow,
                  }
              },
              {
                  breakpoint: 300,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: initialSlideToShow,
                  }
              },

            ]
  });

  
  
}