/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, pollerLite } from '../../../../../lib/utils';
import { fetchAffinityAllData } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

let currStep = 0;
let mySwiper;

const initiateSlider = (slider) => {

  // Run slick
  
  slider.classList.add('swiper-active');

  mySwiper = new window.Swiper(slider, {
    // Optional parameters
    init: false,
    loop: false,
    // If we need pagination
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 20,
    // Disable preloading of all images
    preloadImages: true,
    // Enable lazy loading
    lazy: false,
    // Responsive breakpoints
    breakpoints: {
      1400: {
        slidesPerView: 6,
      },
      1200: {
        slidesPerView: 5,
      },
      1020: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 3,
      },
      550: {
        slidesPerView: 2,
      },
      320: {
        slidesPerView: 1,
      }
    },
    navigation: {
      nextEl: `.${ID}-button-next`,
      prevEl: `.${ID}-button-prev`,
    }

  })

  mySwiper.init();

  //document.querySelector(`.${ID}-quiz--stage4`).classList.remove('calculating');

}

const stepTransition = (currStep, nextStep) => {

  document.querySelector(`.${ID}-outfit-generator--body`).setAttribute('data-step', nextStep);

  // build logic in here to show the next step with recommendations

}

const getProducts = (strID, categoryString )=> {


  let categoryArgs = categoryString.split(',');
  let categories = [];

  categoryArgs.forEach((category) => {
    let categoryObj = {
      "action": "CONTAINS",
      "value": category 
    };
    categories.push(categoryObj);
  });

  var realtimeRules = [{
    "id": -1,
    "query": {
      "conditions": [{
        "field": "categories", // Condition
        "arguments": categories
      }]
    },
    "type": "include", // Include or exclude
    "slots": [] // Position in widget
  }];

  return new Promise((resolve, reject) => {
    DYO.recommendationWidgetData(strID, { maxProducts: 50, realtimeRules: realtimeRules }, function (err, data) {
      resolve(data);
    });
  });

  

}

const setupOutfitGenerator = () => {

  fetchAffinityAllData().then((data) => {
    console.log(data);
  });

  let blankLSObject = {
    tops: [],
    bottoms: [],
    footwear: [],
    accessories: []
  };

  if(!localStorage.getItem(`${ID}-outfit-generator-object`)) {
    localStorage.setItem(`${ID}-outfit-generator-object`, JSON.stringify(blankLSObject));
  }


  let insertionPoint = document.body;

  let outfitGeneratorHTML = `

    <div class="${ID}-outfit-generator-holder ${ID}-hidden">

      <div class="${ID}-outfit-generator">

        <div class="${ID}-outfit-generator--header">
          <h2> Welcome to Flannels Outfit Generator! </h2>
          <p> To get started, choose from the options and then pick your items. </p>
        </div>

        <div class="${ID}-outfit-generator--body" data-step="0">

          <div class="${ID}-outfit-generator--step ${ID}-outfit-generator--step0" data-stepvalue="0">

            <p> First, choose your gender: </p>

            <div class="${ID}-outfit-generator--options">
              <button class="${ID}-outfit-generator--option" data-value="male">Male</button>
              <button class="${ID}-outfit-generator--option" data-value="female">Female</button>
              <button class="${ID}-outfit-generator--option" data-value="unisex">Unisex</button>
            </div>

          </div> 

          <div class="${ID}-outfit-generator--step ${ID}-outfit-generator--step1" data-stepvalue="1">

            <p> Second, choose what kind of outfit you're looking for: </p>

            <div class="${ID}-outfit-generator--options">
              <button class="${ID}-outfit-generator--option" data-value="smart">Smart</button>
              <button class="${ID}-outfit-generator--option" data-value="casual">Casual</button>
              <button class="${ID}-outfit-generator--option" data-value="work">Work</button>
              <button class="${ID}-outfit-generator--option" data-value="custom">Custom</button>
            </div>

          </div>

          <div class="${ID}-outfit-generator--step ${ID}-outfit-generator--step2" data-stepvalue="2">

            <p> Now pick items to complete your outfit: </p>

            <div class="${ID}-outfit-generator--items">
              
              <div class="${ID}-outfit-generator--item ${ID}-outfit-generator--item0 ${ID}-inactive" data-option="tops" data-cat-string="T-shirts, Tops, Shirts">
                <p>Tops</p>
                <div class="${ID}-outfit-generator--itemicon"></div>
                <div class="${ID}-outfit-generator--carousel swiper-carousel">
                  <div class="swiper-wrapper">

                  </div>
                </div>
              </div>

              <div class="${ID}-outfit-generator--item ${ID}-outfit-generator--item1 ${ID}-inactive" data-option="bottoms" data-cat-string="Jeans, Denim, Trousers">
                <p>Bottoms</p>
                <div class="${ID}-outfit-generator--itemicon"></div>
                <div class="${ID}-outfit-generator--carousel swiper-carousel">
                  <div class="swiper-wrapper">

                  </div>
                </div>
              </div>

              <div class="${ID}-outfit-generator--item ${ID}-outfit-generator--item2 ${ID}-inactive" data-option="footwear" data-cat-string="Trainers, Shoes, Flip-Flops">
                <p>Footwear</p>
                <div class="${ID}-outfit-generator--itemicon"></div>
                <div class="${ID}-outfit-generator--carousel swiper-carousel">
                  <div class="swiper-wrapper">

                  </div>
                </div>
              </div>

              <div class="${ID}-outfit-generator--item ${ID}-outfit-generator--item3 ${ID}-inactive" data-option="accessories" data-cat-string="Necklace, Wristband, Watch">
                <p>Accessories</p>
                <div class="${ID}-outfit-generator--itemicon"></div>
                <div class="${ID}-outfit-generator--carousel swiper-carousel">
                  <div class="swiper-wrapper">

                  </div>
                </div>
              </div>

            </div>

            <button class="${ID}-outfit-generator--proceed">Proceed to overview</button>

          </div>

          <div class="${ID}-outfit-generator--step ${ID}-outfit-generator--step3" data-stepvalue="3">

            <p> Results </p>

            <div class="${ID}-outfit-generator--results">
              
              <div class="${ID}-outfit-generator--result">

              </div>

              <div class="${ID}-outfit-generator--result">

              </div>

              <div class="${ID}-outfit-generator--result">

              </div>

              <div class="${ID}-outfit-generator--result">

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  `;

  insertionPoint.insertAdjacentHTML('afterbegin', outfitGeneratorHTML);

  let allOptions = document.querySelectorAll(`.${ID}-outfit-generator--option`);
  [].slice.call(allOptions).forEach((option) => {
    option.addEventListener('click', (e) => {

      let currStep = document.querySelector(`.${ID}-outfit-generator--body`).getAttribute('data-step');
      let thisClickStep = parseInt(e.target.closest(`.${ID}-outfit-generator--step`).getAttribute('data-stepvalue')) + 1;
      stepTransition(currStep, thisClickStep);

    });
  });

  let allItems = document.querySelectorAll(`.${ID}-outfit-generator--item`);
  [].slice.call(allItems).forEach((item) => {
    item.addEventListener('click', (e) => {

      e.target.classList.toggle(`${ID}-inactive`);
      e.target.classList.toggle(`${ID}-active`);

      let catString = e.target.closest(`.${ID}-outfit-generator--item`).getAttribute('data-cat-string');

      getProducts(128877, catString).then((data) => {
       
        let allProds = data.slots;

        allProds.map((prod) => {

          let prodHTML = `

            <div class="${ID}-outfit-generator--slide swiper-slide" data-sku="${prod.item.sku}">
              <img src="${prod.item.image_url}" alt="${prod.item.name}" />
              <p class="prod-name">${prod.item.name}</p>
             
            </div>

          `;

          item.querySelector('.swiper-wrapper').insertAdjacentHTML('afterbegin', prodHTML);

        });

        

        initiateSlider(item.querySelector('.swiper-carousel'));
        
      });

    });
  });


  document.body.addEventListener('click', (e) => {
    
    if(e.target.closest(`.${ID}-outfit-generator--slide`)) {

      e.target.closest(`.${ID}-outfit-generator--slide`).classList.toggle(`${ID}-outfit-generator--slideactive`);

      let currSlide = e.target.closest(`.${ID}-outfit-generator--slide`);
      let parentCarousel = e.target.closest(`.${ID}-outfit-generator--item`).getAttribute('data-carousel');
      let currSlideObj = {
        "name": currSlide.querySelector('img').getAttribute('alt'),
        "image": currSlide.querySelector('img').getAttribute('src'),
        "sku": currSlide.getAttribute('data-sku')
      }

      let currLSObject = JSON.parse(localStorage.getItem(`${ID}-outfit-generator-object`));

      
      if(parentCarousel == 'tops') {
        currLSObject.tops = currSlideObj;
      } else if(parentCarousel == 'bottoms') {
        currLSObject.bottoms = currSlideObj;
      } else if(parentCarousel == 'footwear') {
        currLSObject.footwear = currSlideObj;
      } else if(parentCarousel == 'accessories') {
        currLSObject.accessories = currSlideObj;
      }

      console.log(currLSObject);
      console.log(currSlideObj);

      localStorage.setItem(`${ID}-outfit-generator-object`, JSON.stringify(currLSObject));

    }
    
  });

}

const placeTrigger = () => {

  let triggerInsertionPoint = document.querySelector('.categorycopyd4');

  let triggerHTML = `

    <button class="${ID}-trigger">
      Get Started
    </button>

  `;

  triggerInsertionPoint.insertAdjacentHTML('afterend', triggerHTML);

  document.querySelector(`.${ID}-trigger`).addEventListener('click', () => {

    fireEvent('Click - user has clicked on the trigger');
    document.querySelector(`.${ID}-outfit-generator-holder`).classList.remove(`${ID}-hidden`);
    document.documentElement.classList.add(`${ID}-noscroll`);

  });

}

const startExperiment = () => {


  pollerLite(['.categorycopyd4'], () => {

    placeTrigger();

  });

  setupOutfitGenerator();


}


export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  startExperiment();
};
