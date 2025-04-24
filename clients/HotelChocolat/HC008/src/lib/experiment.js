/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import MainProductSlider from './productSlider';
import shared from './shared';
import { addFlakesSlider } from './addKits';
import { addAccessoriesSlider } from './addAccessories';
import ProductTabs from './descriptionTabs';
import { events, pollerLite } from '../../../../../lib/utils';
import JourneyMarkup from './journeyMarkup';
import { addColourChoices } from './addColourChoices';
import journeyLogic from './journeyLogic';
import { accPrices, flakePrices, updatePrice } from './helpers';

export default () => {

  const { ID, VARIATION } = shared;

  setup();

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
   * Check if it's out of stock
   */
  const inStock = () => {
    const stockMessage = document.querySelector('.back-in-stock-notification');
    if(stockMessage) {
      document.body.classList.add(`${ID}-noStock`);
    }
  }

  /**
   * Add active to the colour
   */
  const activeColour = () => {
    const productHeading = document.querySelector('#page_heading h1');
    const productName = productHeading.textContent.trim().toLowerCase().match(/.*(charcoal|copper|white).*/);

    if(productName[1]) {
      document.querySelector(`.${productName[1]}`).classList.add(`${ID}-colourSelected`);
      events.send(`${ID} varation: ${VARIATION} - Velvetiser Journey`, 'colour selected', `${productName[1]}`, {sendOnce: true});
    }

  }

  /**
   * Current content changes e.g text changes
   */
  const pageChanges = () => {

    const pageTitle = document.querySelector('#page_heading h1');
    if(pageTitle) {
        pageTitle.textContent = 'The Velvetiser Starter kit';
    }

    const introText = document.querySelector('#page_heading h3');
    if(introText) {
      introText.textContent = 'In-home hot chocolate machine. Imagined by Hotel Chocolat, engineered by Dualit. Select your colour, choose your starter kit - Velvetise your world!';
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
      if(VARIATION === '1') {
        document.querySelector('#page_heading h3').insertAdjacentElement('afterend', reviews);
        reviews.insertAdjacentHTML('beforeend',`<div class="${ID}-reviewRating">${reviewRating.innerText}</div><div class="${ID}-readReviews">Read Reviews</div>`);
      } else if(VARIATION === '2') {
        document.querySelector(`.${ID}-topReviews`).insertAdjacentElement('beforebegin', reviews);
        reviews.insertAdjacentHTML('beforeend',`<div class="${ID}-reviewRating">${reviewRating.innerText}</div><div class="${ID}-readReviews">Read Reviews</div>`);
        
        const allReviews = document.querySelector('.tab-desktop-content');
        if(allReviews) {
          document.querySelector(`.${ID}-journeyContent`).appendChild(allReviews);
        }
      }
    }
  }

   /**
   * Rebuild the product info markup
   */
  const createTopMarkup = () => {
    const topMarkup = document.createElement('div');
    topMarkup.classList.add(`${ID}-topContent`);
   
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
          <div class="${ID}-accordionStep ${ID}-flakesSlider">
              <div class="${ID}-stepTitle">2. Choose your starter kit*</div>
              <div class="${ID}-stepContent">
                  <div class="${ID}-carousel"></div>
              </div>
          </div>
          <div class="${ID}-accordionStep ${ID}-accessories">
              <div class="${ID}-stepTitle">Add a little more?</div>
              <div class="${ID}-stepContent">
                  <div class="${ID}-carousel"></div>
              </div>
          </div>
      </div>
    </div>`;

    document.querySelector('.product-col-1').insertAdjacentElement('beforebegin', topMarkup);

    // move add to bag section inside new content
    //topMarkup.querySelector(`.${ID}-addToCart`).appendChild(document.querySelector('#product-content'));
   
      // move colours below review
    /*const colourOptions = document.querySelector('.promotion p:last-of-type');
    const reviews = document.querySelector('.product-review-links');
    if(reviews) {
      topMarkup.querySelector(`.${ID}-reviewSection`).appendChild(reviews);
    }
    if(colourOptions) {
      topMarkup.querySelector(`.${ID}-colourOptions`).appendChild(colourOptions);
    }*/
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

    if(VARIATION === '1') {
      reviewLink.addEventListener('click', () => {
        if(window.innerWidth < 767) {
          scrollToElement(reviews);
          reviews.click();
        } else {
          if(document.querySelector(`.${ID}-tab.${ID}-reviews`)) {
            const desktopReview = document.querySelector(`.${ID}-tab.${ID}-reviews`);
            scrollToElement(desktopReview);
            desktopReview.click();
          }
        }
      });
    }

    if(VARIATION === '2') {
      const review = document.querySelector('#tabReviews');
      review.style.display = 'none';
      reviewLink.addEventListener('click', () => {
      
        review.style.display = 'block';
        scrollToElement(review);
      });
    }
  }

  const chooseFlakes = () => {
    // choose flakes
    
    const product = document.querySelectorAll(`.${ID}-flakesSlider .${ID}-product`);
      for (let index = 0; index < product.length; index += 1) {
      const element = product[index];
      element.addEventListener('click', (e) => {
          const price = parseFloat(element.querySelector('p span').textContent.replace('£', ''));
          const packName = element.querySelector('p').textContent;
          if(e.currentTarget.classList.contains(`${ID}-selected`)) {
              element.classList.remove(`${ID}-selected`);
              flakePrices.pop();
              updatePrice();
          } else {
              e.currentTarget.classList.add(`${ID}-selected`);
              flakePrices.push(price);

              updatePrice();
              window.jQuery(`.${ID}-accessories .${ID}-carousel`).slick('resize');
              events.send(`${ID} varation: ${VARIATION} - Velvetiser Journey`, 'click', `flakes product: ${packName}`);
          }
         
      });
    }
  }
  const chooseAccessories = () => {
    // choose flakes
    const product = document.querySelectorAll(`.${ID}-accessories .${ID}-product`);
      for (let index = 0; index < product.length; index += 1) {
      const element = product[index];
      element.addEventListener('click', () => {
        const price = parseFloat(element.querySelector('p span').textContent.replace('£', ''));
        const packName = element.querySelector('p').textContent;
          if(element.classList.contains(`${ID}-selected`)) {
              element.classList.remove(`${ID}-selected`);
              accPrices.pop();

              updatePrice();
          } else {
              element.classList.add(`${ID}-selected`);
              accPrices.push(price);

              updatePrice();
              events.send(`${ID} varation: ${VARIATION} - Velvetiser Journey`, 'click', `additional product: ${packName}`);
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
    addButton.innerHTML = 'Add to bag';

    document.querySelector('.inventory').insertAdjacentElement('afterend', addButton);
  }

  /**
   * AJAX requests
   */
  const addAlltoBag = () => {
    const qty = document.querySelector('input[name=Quantity]').value;
    
    const productName = document.querySelector('#page_heading h1').textContent;

  
    // add all to bag
    const allSelected = document.querySelectorAll(`.${ID}-product.${ID}-selected`);
    let names = [];

    if(allSelected.length !== 0) {
      // add Velvetiser request
    
      for (let index = 0; index < allSelected.length; index += 1) {
        const element = allSelected[index];
        const productSku = element.getAttribute('prod-id');
        const elName = element.textContent.trim();
        if(productSku) {
          window.jQuery.ajax({
            url: 'https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Cart-AddProduct?format=ajax',
            type: 'post',
            data: `Quantity=${qty}&cartAction=add&pid=${productSku}`,
            success:function(){
              window.scrollTo(0, 0);
              document.querySelector(`.${ID}-add`).classList.add(`${ID}-addingToBag`);
              window.location.reload();
            }
          });

          names.push(elName);
        } 
      }
      if(names !== '') {
        events.send(`${ID} varation: ${VARIATION} - Velvetiser Journey`, 'add to bag', `added: ${productName} with ${names}`, {sendOnce: true});
      }
      // just add device
    } else {
        window.jQuery.ajax({
          url: 'https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Cart-AddProduct?format=ajax',
          type: 'post',
          data: `Quantity=${qty}&cartAction=add&pid=${currentProductID}`,
          success:function(){
            window.scrollTo(0, 0);
            document.querySelector(`.${ID}-add`).classList.remove(`${ID}-addingToBag`);
            window.location.reload();
          }
        });
        events.send(`${ID} varation: ${VARIATION} - Velvetiser Journey`, 'add to bag', `added: ${productName}, no additions`, {sendOnce: true});
    } 
  }


  /**
   * Add to bag event
   */
  const addToBagClick = () => {
    const addToBagButton = document.querySelector(`.${ID}-add`);
    addToBagButton.addEventListener('click', () => {
      addToBagButton.textContent = 'Adding...';
      addToBagButton.classList.add(`${ID}-addingToBag`);
      addAlltoBag();
      events.send(`${ID} varation: ${VARIATION} - Velvetiser Journey`, 'add to bag', `added to bag`, {sendOnce: true});
    });
  }


  /**
   * Add video
   */
  const addVideo = () => {

    const video = document.createElement('div');
    video.classList.add(`${ID}-video`);
    video.innerHTML = `<div id="player"></div>`;
    if(VARIATION === '1') {
      document.querySelector('.product-col-2.product-detail').insertAdjacentElement('afterend', video);
    } else if(VARIATION === '2') {
      document.querySelector(`.${ID}-journeyContent .${ID}-container`).insertAdjacentElement('beforebegin', video);
    }

    let player;

    function readyYoutube(){
      if((typeof YT !== "undefined") && YT && YT.Player){
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
            events.send(`${ID} varitation: ${VARIATION} - Velvetiser Journey`, 'click', 'play video', {sendOnce: true});
            done = true;
          }
        }
      }else{
          setTimeout(readyYoutube, 1000);
      }
  }

    

     // onYouTubeIframeAPIReady();
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


  /**
   * Add reviews for V2
   */

  const addReviews = () => {
    const reviews = {
      'Great for matcha lattes too': {
        reviewText: "Was gifted a velvetiser a few months ago and am so happy with it. It's easy to use and maintain, and as well as enjoying the various wonderful Hotel Chocolat offerings, I've found the velvetiser works great with matcha powder and powdered hot chocolates too",
      },
      'Hot chocolate on another level': {
        reviewText: "Brought this after a long time deciding, had a taster in a shop no contest this is a great gadget that does a fantastic job of producing a smooth cup of chocolate. Yes its not an every day drink but a treat such a simple luxury glad we treated ourselves",
      },
      'Amazing hot chocolate': {
        reviewText: "I bought this as a treat for myself but it would make a great present. The hot chocolate is delicious and rich, not at all like the powdered chocolate you make with hot water. I’d expect nothing less from Hotel Chocolat!"
      }
    }

    const reviewBlock = document.createElement('div');
    reviewBlock.classList.add(`${ID}-topReviews`);
    reviewBlock.innerHTML = `<div class="${ID}-container"><div class="${ID}-icon"></div><div class="${ID}-reviews"></div><div class="${ID}-icon"></div></div>`;
    document.querySelector(`.${ID}-title`).insertAdjacentElement('afterend', reviewBlock);


    Object.keys(reviews).forEach((i) => {
      const data = reviews[i];
      const review = document.createElement('div');
      review.classList.add(`${ID}-review`);
      review.innerHTML = `<span>${[i][0]}</span><p><b>"</b>${data.reviewText}<b>"</b></p>`;

      document.querySelector(`.${ID}-topReviews .${ID}-reviews`).appendChild(review);
    });

    // slick reviews
    window.jQuery(`.${ID}-topReviews .${ID}-reviews`).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      adaptiveHeight: true,
    });

  }

  const updateVidLink = () => {
    setTimeout(function(){ 

      if (document.querySelector('.HC008-video #player')){

    var videoURL = document.querySelector('.HC008-video #player').getAttribute('src');
    document.querySelector('#player').setAttribute('src', videoURL + '&rel=0');
  }

  }, 3000)
  }



  if(VARIATION === '1') {
    addYTapi();

    /** Above fold stuff */
    //inStock();
   // activeColour();
    createTopMarkup();
    new MainProductSlider();
    addToCartButton();
    addColourChoices();
    addFlakesSlider();
    addAccessoriesSlider();
    pageChanges();
    moveReviews();
    journeyLogic();
    
    //pageChanges();
    //addFlakesSlider();
    //addAccessoriesSlider();
    //chooseFlakes();
    //chooseAccessories();
    /*if(!document.querySelector('.back-in-stock-notification.button')) {
      addToCartButton();
      addToBagClick();
    }*/

    /**
     * Below fold stuff
     */
  
    addVideo();   
    circleContent();
    updateVidLink();

    if(window.innerWidth > 767) {
      new ProductTabs();
    }
    readReviewsEvent();

    jQuery('.HC008-thumbnails.slick-initialized.slick-slider.slick-vertical img:nth-child(2)').click();
    /**
     * All event tracking
     */
    const tracking = () => { 
      // circle usps
      const usp = document.querySelectorAll(`.${ID}-usp`);
      for (let index = 0; index < usp.length; index += 1) {
        const element = usp[index];
        const textLink = element.querySelector(`.${ID}-uspText`);
        textLink.addEventListener('click', () => {
          const linkName = textLink.textContent;
          events.send(`${ID} varation: ${VARIATION} - Velvetiser Journey`, 'click', `circle usp: ${linkName}`, {sendOnce: true});
        });
      }
    }

    tracking();
  }

  /**
  * Velvetiser Journey - V2 
  */
    

  if(VARIATION === '2') {
    addYTapi();
    new JourneyMarkup();

    
    addVideo();
    addColourChoices();
    addFlakesSlider();
    addAccessoriesSlider();

    journeyLogic();
    addReviews();
    moveReviews();
    readReviewsEvent();
    updateVidLink();
  }
   

};
