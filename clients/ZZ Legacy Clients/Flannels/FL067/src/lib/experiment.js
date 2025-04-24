import {
  setup,
  initInvasion,
  scrollToTop,
} from './services';
import {
  observer
} from '../../../../../lib/uc-lib';
import {
  events
} from '../../../../../lib/utils';
import settings from './settings';
import PopUp from '../components/PopUp/PopUp';
import Initcarousel from '../components/Carousel/InitCarousel';
import {
  Carousel,
  buildCarousel
} from '../components/Carousel/Carousel';
import CTAs from '../components/CTAs/CTAs';
events.analyticsReference = '_gaUAT';
const {
  ID,
  VARIATION
} = settings;

const activate = () => {
  setup();
  if (VARIATION === '2') {
    events.send(ID, 'FL067 Control', 'FL067 Control is active');
    return false;
  } else {
    events.send(ID, `FL067 Variation ${VARIATION}`, 'FL067 Test is active');
  }

  // Exclude Agent Provocateur as it has a different Brand URL
  let productBrand = window.dataLayer[1].productBrand.toLowerCase().replace(/\s/g, '-');
  if (productBrand == 'agent-provocateur') {
    return false;
  }

  const gender = window.dataLayer[1].productGender.toLowerCase();
  if(gender === 'men' || gender === 'women' ){
    document.body.classList.add(`${ID}_valid`);
    Carousel().then((elem) => {
      //Create the invasion
      const invasion = document.createElement('div');
      //invasion.classList.add('row');
      invasion.classList.add(`${ID}_invasionWrap`);
      invasion.innerHTML = `
      <div class="${ID}_invasion">
        <button class="${ID}_invasion__close">Close</button>
        ${PopUp()}
        <div class="${ID}_relatedWrap">
          <div class="${ID}_related">
            <h3 class="${ID}_related__title">You may also like...</h3>
            <div class="${ID}_carouselWrap">
                <button class="${ID}_carousel__button" id="prev">Prev</button>
                <div class="${ID}_carousel" id="carousel">
                    ${buildCarousel(elem)}
                </div>
                <button class="${ID}_carousel__button" id="next">Next</button>
            </div>
            <!--End carousel-->
          </div>
        </div>
        <!--End related-->
        ${CTAs()}
      </div>
      `;


      document.querySelector('.mainBody .row:nth-child(5)').insertAdjacentElement('afterend', invasion);
      //Adds GA events
      initInvasion();
      //Init carousel's script
      if (Initcarousel()) {
        
      }
      Initcarousel();
      //Set carousel's behavior
      const newSlider = new Siema({
        selector: '#carousel',
        duration: 300,
        easing: 'ease-out',
        startIndex: 0,
        draggable: true,
        multipleDrag: false,
        threshold: 20,
        loop: true,
        rtl: false,
        perPage: {
          380: 2,
          768: 2,
          1024: 3,
          1200: 5,
        },
        onInit: () => {
          // Get each slide, on first click return preventDefault
          const slides = document.querySelectorAll('.FL067_carousel__listItem');
          const slideLen = slides.length;
          for (let i = 0; slideLen > i; i += 1) {
            var count = 0;
            slides[i].addEventListener('click', (e) => {
              if (count == 0) {
                e.preventDefault();
                count += 1;
              }
            });
          }
        },
        onChange: () => {},
      });
      document.querySelector('#prev').addEventListener('click', function (e) {
        e.preventDefault();
        newSlider.prev();
      });
      document.querySelector('#next').addEventListener('click', function (e) {
        e.preventDefault();
        newSlider.next();
      });


      //Trigger Actions
      const dropDownParent = document.querySelector('.swapSize');
      const dropDown = dropDownParent.querySelector('.SizeDropDown');
      const productColor = document.querySelector('#divColour select');
      const addButton = document.querySelector('.addToBasketContainer');
      const exp = document.querySelector(`.${ID}_invasionWrap`);
      const closeButton = exp.querySelector(`.${ID}_invasion__close`);
      let changed = false;
      if (!dropDown.getAttribute('disabled')) {
        dropDown.addEventListener('change', function () {
          changed = true;
        });
        //Show the block
        addButton.querySelector('.addToBag').addEventListener('click', function () {
          if (changed) {
            events.send(settings.ID, 'FL067 Click', 'FL067 Test Seen');
            if(window.innerWidth <= 1024){
              scrollToTop();
              exp.classList.add(`${ID}_invasionWrap--show`);
            } else {
              exp.classList.add(`${ID}_invasionWrap--show`);
            }
            if(sessionStorage.getItem('addToCartCounter')){
              let counter = parseInt(JSON.parse(sessionStorage.getItem('addToCartCounter')));
              counter += 1;
              sessionStorage.setItem('addToCartCounter', JSON.stringify(counter));
              events.send(settings.ID, 'FL067 Clicked on', `FL067 Add to bag`);
            } else {
              sessionStorage.setItem('addToCartCounter', JSON.stringify(1));
            }
          }
        });
      } else {
        //Show the block
        addButton.querySelector('.addToBag').addEventListener('click', function () {
          events.send(settings.ID, 'FL067 Click', 'FL067 Test Seen');
          if(window.innerWidth <= 1024){
            scrollToTop();
            exp.classList.add(`${ID}_invasionWrap--show`);
          } else {
            exp.classList.add(`${ID}_invasionWrap--show`);
          }
          if(sessionStorage.getItem('addToCartCounter')){
            let counter = JSON.parse(sessionStorage.getItem('addToCartCounter'));
            counter += 1;
            sessionStorage.setItem('addToCartCounter', JSON.stringify(counter));
            events.send(settings.ID, 'FL067 Clicked on', `FL067 Add to bag, click num: ${counter}`);
          } else {
            sessionStorage.setItem('addToCartCounter', JSON.stringify(1));
          }
        });
      }
      //Change popUp image
      productColor.addEventListener('change', function () {
        observer.connect(document.querySelector('#imgProduct'), function () {
          const imageLink = document.querySelector('#imgProduct').src;
          document.querySelector(`.${ID}_cartPopUp__image`).src = imageLink;
          observer.disconnect(document.querySelector('#imgProduct'));
        }, {
          // Options
          config: {
            attributes: true,
            childList: false,
            subtree: false
          },
        });
      });
      //Close the block
      closeButton.addEventListener('click', function (e) {
        e.preventDefault();
        exp.classList.remove(`${ID}_invasionWrap--show`);
      });
    }).catch((error) => {
      console.log(error);
      document.body.classList.remove('FL067_valid');
      const miniBag = document.querySelector('.FL067.FL067_valid #divBagItems');
      if (miniBag) {
        miniBag.style.display = 'initial !important';
      }
    });
  }
};

export default activate;
