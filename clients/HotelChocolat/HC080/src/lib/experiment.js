import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import MainProductSlider from './productSlider';
import { addFlakesSlider } from './addFlakes';
import { addKitsSlider } from './addKits';
import ProductTabs from './descriptionTabs';
import { addColourChoices } from './addColourChoices';
import journeyLogic from './journeyLogic';

import addedToBasketBox from './addedToBasketBox';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------

  window.KlarnaOnsiteService = window.KlarnaOnsiteService || []  
  window.KlarnaOnsiteService.push({ eventName: 'refresh-placements' })


  /**
   * Add youtube API
   */
   const addYTapi = () => {
    var tag = document.createElement('script');
    tag.className = `youtube`;
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  /**
   * Current content changes e.g text changes
   */
  const pageChanges = () => {

    const pageTitle = document.querySelector('#main h1');
    if(pageTitle) {
        pageTitle.textContent = 'The Velvetiser Hot Chocolate Maker';
    }

    const introText = document.querySelector('#page_heading h3');
    if(introText) {
      introText.textContent = 'In-home hot chocolate machine. Imagined by Hotel Chocolat, engineered by Dualit. Select your colour - Velvetise your world!';
    }


    const price = document.querySelector('.price-wrapper');
    if(price) {
      price.insertAdjacentHTML(`beforeend`, `<div class="${ID}-delivery">Price includes delivery</div>`);
    }

    const inStockMessage = document.querySelector('.availability-block');
    if(inStockMessage) {
      const qty = document.querySelector('.inventory');
      qty.insertAdjacentElement('beforeend', inStockMessage);
    }

    const addSection = document.querySelector('#product-content');
    if(addSection) {
      document.querySelector(`.${ID}-right`).appendChild(addSection);
    }
  }

  const moveReviews = () => {
    const reviews = document.querySelector('.product-review-links.product-review-links-top');
    const reviewRating = reviews.querySelector('.bv-rating span');
    if(reviews && reviewRating) {
      document.querySelector('#page_heading h3').insertAdjacentElement('afterend', reviews);
      reviews.insertAdjacentHTML('beforeend',`<div class="${ID}-reviewRating">${reviewRating.innerText}</div><div class="${ID}-readReviews">Read Reviews</div>`);
    }
  }
  
  const createTopMarkup = () => {
    const topMarkup = document.createElement('div');
    topMarkup.classList.add(`${ID}-topContent`);
   
    /**
     * starter kits html 
     * 
     */
    topMarkup.innerHTML = `
    <div class="${ID}-left">
      <div class="${ID}-mainSlider"></div>
    </div>
    <div class="${ID}-right">
      <div class="${ID}-reviewSection"></div>
      <div class="${ID}-accordionSteps">
          <div class="${ID}-accordionStep ${ID}-colours"> 
              <div class="${ID}-stepTitle">1. Choose your Velvetiser Colour</div>
              <p>(Your Velvetiser includes 2 FREE Limited Edition Pod Cups)</p>
              <div class="${ID}-stepContent"></div>
          </div>

          <div class="${ID}-accordionStep ${ID}-kitSlider">
              <div class="${ID}-stepTitle">2. Choose your starter kit*</div>
              <div class="${ID}-stepContent">
                <span>Discount price only if bought with machine</span>
                  <div class="${ID}-carousel"></div>
              </div>
          </div>

          <div class="${ID}-accordionStep ${ID}-flakesSlider">
              <div class="${ID}-stepTitle">3. Add a little more?</div>
              <div class="${ID}-stepContent">
                  <div class="${ID}-carousel"></div>
              </div>
          </div>
      

      </div>
    </div>`;

    document.querySelector('.product-col-1').insertAdjacentElement('beforebegin', topMarkup);

  }

   /**
   * Review scroll
   */
  const readReviewsEvent = () => {
    function scrollToElement(element) {
      window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element.getBoundingClientRect().top + window.scrollY - 100,
      });
    }

    const reviewLink = document.querySelector(`.${ID}-readReviews`);
    const reviews = document.querySelector('.tab-desktop-content .reviews');

    if (reviewLink) {
      reviewLink.addEventListener('click', () => {
        if (window.innerWidth < 767) {
          scrollToElement(reviews);
          reviews.click();
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

  /**
   * add new cta button for the click event
   */
  const addToCartButton = () => {
    const addButton = document.createElement('div');
    addButton.classList.add(`${ID}-add`);
    addButton.id = `${ID}-addToCart`;
    addButton.innerHTML = 'Add to bag';

    document.querySelector('.inventory').insertAdjacentElement('afterend', addButton);
  }

  /**
   * Add video
   */
  const addVideo = () => {

    const video = document.createElement('div');
    video.classList.add(`${ID}-video`);
    video.innerHTML = `<div id="player"></div>`;
    document.querySelector('.product-col-2.product-detail').insertAdjacentElement('afterend', video);
    

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

  /**
   * Add circle image content
   */
  const circleContent = () => {
    document.querySelector('.recommendations').insertAdjacentHTML('beforebegin', `<div class="${ID}-usps"></div>`);

    const uspContent = {
      usp1: {
        image: 'https://c.zmags.com/assets/images/5e01eaa9ad04237765ff6a29_300x300.png',
        title: 'Hot Chocolate Refill',
        titleBold: 'Subscriptions',
        description: 'Never be without a cup of velvety hot chocolate again with our Velvetiser refill subscription.',
        link: 'https://www.hotelchocolat.com/uk/hot-chocolate-flavours.html',
        linkText: 'Find out more',
      },
      usp2: {
        image: 'https://c.zmags.com/assets/images/5e01eaa9faf7ea56195b205d_300x300.png',
        title: 'Make hot chocolate a',
        titleBold: 'Daily Ritual',
        description: 'A morning boost to start the day. A mid-afternoon lift. A post-sports pick-me-up. An evening indulgence. Your Velvetiser, your lifestyle.',
        link: 'https://www.hotelchocolat.com/uk/hot-chocolate-lifestyle-benefits.html',
        linkText: 'Life with a Velvetiser',
      },
      usp3: {
        image: 'https://c.zmags.com/assets/images/5e01eaa9ad04237765ff6a32_300x300.png',
        title: 'Imagined by Hotel Chocolat Engineered by',
        titleBold: 'Dualit',
        description: 'We spent 12 months working alongside Dualit to adapt their patented technology to create the Velvetiser.',
        link: 'https://www.hotelchocolat.com/uk/perfect-hot-chocolate-machine.html',
        linkText: 'Read More',
      }
    }

    Object.keys(uspContent).forEach((i) => {
      const uspEl = uspContent[i];
      const usp = document.createElement('div');
      usp.classList.add(`${ID}-usp`);
      usp.innerHTML = `
      <div class="${ID}-uspImage" style="background-image:url(${uspEl.image})"></div>
      <div class="${ID}-uspText">
        <h2>${uspEl.title}<span>${uspEl.titleBold}</span></h2>
        <p>${uspEl.description}</p>
        <a href="${uspEl.link}">${uspEl.linkText}</a>
      </div>`;

      document.querySelector(`.${ID}-usps`).appendChild(usp);
    });
  }


  const updateVidLink = () => {
    setTimeout(function(){ 
        if (document.querySelector('.HC008-video #player')){
          var videoURL = document.querySelector('.HC008-video #player').getAttribute('src');
          document.querySelector('#player').setAttribute('src', videoURL + '&rel=0');
        }
      }, 3000);
  }

  const addWarrantBanner = () => {
    const warrantyBanner = document.createElement('a');
    warrantyBanner.classList.add(`${ID}-warrantyBanner`);
    let banner;
    if(window.innerWidth <= 767) {
      banner = 'https://editor-assets.abtasty.com/48343/6005b52e513c41610986798.jpg'
    } else {
      banner = 'https://editor-assets.abtasty.com/48343/6005b557db0691610986839.jpg';
    }
    warrantyBanner.setAttribute('target', '_blank');
    warrantyBanner.setAttribute('href', 'https://www.hotelchocolat.com/uk/velvetiser-warranty.html');
    warrantyBanner.innerHTML = `<img src="${banner}"/>`;
   
   document.querySelector(`.${ID}-video`).insertAdjacentElement('afterend', warrantyBanner);
   
  }


  document.querySelector('.product-add-to-cart').insertAdjacentHTML('beforeend', ' <klarna-placement data-key="top-strip-promotion-standard" data-locale="en-GB"></klarna-placement>');
  window.KlarnaOnsiteService = window.KlarnaOnsiteService || []  
  window.KlarnaOnsiteService.push({ eventName: 'refresh-placements' });
  addYTapi();

  /** Above fold stuff */
  createTopMarkup();
  
  new MainProductSlider();
  
  addColourChoices();
  addKitsSlider();
  addFlakesSlider();
  addToCartButton();
  pageChanges();
  if (window.location.href.indexOf('stellar-white') > 0 || window.location.href.indexOf('472810') > 0){
  }
  else if (document.querySelector('.product-review-links.product-review-links-top .bv-rating span')){
    moveReviews();
  }
  journeyLogic();

  /**
   * Below fold stuff
   */
  addVideo(); 
  pollerLite(['.recommendations'], () => {
    circleContent();
  });  

  updateVidLink();
  addWarrantBanner();

  if(window.innerWidth > 767) {
    new ProductTabs();
  }
  readReviewsEvent();

  // remove ingredients mobile
  const mobileTab = document.querySelectorAll('.tab-mobile-title');
  if(mobileTab) {
    for (let index = 0; index < mobileTab.length; index += 1) {
      const element = mobileTab[index];
      if(element.textContent.trim() === 'INGREDIENTS') {
        element.style.display = 'none';
      }
    }
  }

  if(window.location.href.indexOf('?addtobasket=true') > -1 && sessionStorage.getItem(`${ID}-productsAdded`)) {
    addedToBasketBox();
  }

};
