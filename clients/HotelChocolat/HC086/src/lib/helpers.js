import shared from "../../../../../core-files/shared";

const { ID } = shared;

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
        videoId: 'Xx5CwfpjToE',
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

export const smoothScroll = (element) => {

  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: element.getBoundingClientRect().top + window.scrollY - 100,
  });
  
}
export const reviewSmoothScroll = () => {
  

  const reviewLink = document.querySelector(`.product-review-links.product-review-links-top`);

  if (reviewLink) {
    reviewLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.innerWidth <= 767) {

        if(!document.querySelector('.reviews.tab-mobile-title').classList.contains('active')) {
          document.querySelector('.reviews.tab-mobile-title').click();
        }

        smoothScroll(document.querySelector('.reviews.tab-mobile-title'));
        
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


export const colourPrice = 99.95;
export const flakePrices = [];
export const kitPrices = [];

export const updatePrice = () => {
  let totalPriceEl;
  totalPriceEl = document.querySelector(`.product-price span`);


  const flakePrice = flakePrices.reduce(function (a, b) {
    return a + b;
  }, 0);


  const kitPrice = kitPrices.reduce(function (a, b) {
    return a + b;
  }, 0);

  const total = parseFloat(colourPrice + flakePrice + kitPrice);
  totalPriceEl.innerHTML = `£${total}`;

  // if on mobile, update fixed bar price
  const fixedPrice = document.querySelector(`.${ID}-addToBagMobile .${ID}-price span`);
  if(fixedPrice) {
    fixedPrice.innerHTML = `£${total}`;
  }
  

}

function increaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('number').value = value;
}

function decreaseValue() {
  var value = parseInt(document.querySelector(`.${ID}-quantity-input`).value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.querySelector(`.${ID}-quantity-input`).value = value;
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