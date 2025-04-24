import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID } = shared;


export const scrollToElement = (element) => {
  window.scroll({
      behavior: 'smooth',
      left: 0,
      top: element.getBoundingClientRect().top + window.scrollY - 150,
  });
}

export const getWarranty = () => {
    let warranty;
    const allSpecs = document.querySelectorAll('.product-specification tr td');
    for (let index = 0; index < allSpecs.length; index += 1) {
        const element = allSpecs[index];
        if(element.textContent === 'Warranty') {
           warranty = element.nextElementSibling.textContent.trim().replace('Years', '');
        }
    }

    return warranty;
}

export const stockCheck = () => {

    const storeCheck = document.querySelector('collect-in-store');

   if(storeCheck) {
     const stockContainer = document.createElement('div');
     stockContainer.classList.add(`${ID}-stockCheck`);
     stockContainer.innerHTML = `
         <div class="${ID}-stockToggle">
           <span></span><div class="${ID}__textLink">Check stock in your local store</div>
         </div>
         <div class="${ID}-stockBox"></div>`;
 
     stockContainer.querySelector(`.${ID}-stockBox`).appendChild(storeCheck);
 
     document.querySelector('.product-buy-now').insertAdjacentElement('afterend', stockContainer);
 
     // change styling of shadow root on the stock
     const stockStyle = document.createElement('style');
     stockStyle.innerHTML = `
           .cis { background: #EFEFEF } 
           .cis-section-title { display: none }
           .cis-postcode-search .cis-postcode-search__nearby button { 
             background-color: #D8D8D8;
             background-image: url('https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/68F1861A2BFA82BCF87BEBD26B67309B041BD18FC196B01D617C5195E69F0C53.png?meta=/SG080---In-Grid-Content-PLP-New/searchDark.png');
             background-repeat: no-repeat;
             background-position: center;
             background-size: 20px;
             width: 50px;
           }
   
           .cis {
             font-family: inherit;
           }
           .cis-bottom-wrapper__title {
             font-size: 12px;
           }
           .cis-bottom-wrapper__title strong {
             font-weight: 300;
   
           }
           .cis-bottom-section {
             margin-top: 15px;
           }
           .cis-postcode-search__my-location {
             margin-top: 15px;
           }
           .cis-postcode-search__my-location span svg {
             display: none
           }
           .cis-postcode-search__my-location span {
             background: url(https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/5044B38A56E6C441402BB7D8743EC0A7DC46CBD647FF0EDB55C21B72C21B1187.png?meta=/SG080---In-Grid-Content-PLP-New/noun_Location_3639309.png) no-repeat center;
             background-size: contain;
             height: 20px;
             width: 20px;
             display: inline-block;
           }
           .cis-postcode-search__my-location button {
             font-family: inherit;
             margin-left: 0;
           }
           .cis-postcode-search .cis-postcode-search__nearby button {
             opacity: 1;
           }
           .cis-postcode-search .cis-postcode-search__nearby button:disabled {
             opacity: 0.5;
           }
           .cis-postcode-search .cis-postcode-search__nearby button strong {
             display: none;
           }
           .cis-postcode-search__nearby input {
             border: .0625rem solid #e4e4e4;
             border-right: 0px;
           }
           .cis-bottom-wrapper {
             padding-left: 25px;
             position: relative;
           }
           .cis-bottom-wrapper::before {
             content: '';
             height: 25px;
             width: 20px;
             position: absolute;
             left: 5px;
             top: 50%;
             transfrom: translateY(-50%);
             -webkit-transform: translateY(-50%);
             -moz-transform: translateY(-50%);
             -o-transform: translateY(-50%);
           }
           .cis-bottom-section .cis-bottom-wrapper:nth-child(1)::before {
             background: url('https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/53D1DA13C21182822EEB0C9AA5BF10BAC9907D4AE64C3C57FD482BC66BD40884.png?meta=/SG080---In-Grid-Content-PLP-New/noun_Store_3940605.png') no-repeat center;
             background-size: contain;
   
           }
           .cis-bottom-section .cis-bottom-wrapper:nth-child(2)::before {
             background: url('https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/6FE0ADD3154E27E9C48B45CEB16630EBE7B22D0DB3A15760F27E7A91310397A6.png?meta=/SG080---In-Grid-Content-PLP-New/noun_delivery_1918041.png') no-repeat center;
             background-size: contain;
           }
           .cis-bottom-wrapper svg {
             display: none;
           }
           @media(min-width: 1024px) {
             .cis {
               padding: 15px;
             }
             .cis-postcode-search {
               display: flex;
               flex-direction: row;
               align-items: center;
               margin-bottom: 20px;
             }
             .cis-postcode-search__my-location {
               margin-top: 0;
               order: unset;
               width: 30%;
               text-align: center;
               display: flex;
               flex-direction: row;
               align-items: center;
             }
             .cis-postcode-search__nearby {
               width: 65%;
             }
           }
           @media (min-width: 1280px){
             .cis-postcode-search__nearby {
                 width: 62%;
             }
             .cis-postcode-search__my-location {
                 width: 34%;
             }
         }
         `;
 
     storeCheck.shadowRoot.appendChild(stockStyle);
 
 
 
     // stock toggle
     stockContainer.querySelector(`.${ID}-stockToggle`).addEventListener('click', () => {
       if (stockContainer.classList.contains(`${ID}-stockShow`)) {
         stockContainer.classList.remove(`${ID}-stockShow`);

       } else {
         stockContainer.classList.add(`${ID}-stockShow`);
       }
     });
   }
}

export const featureCarousel = () => {
  var swiper = new Swiper(`.${ID}-carouselModal .${ID}-swiper`, {
    direction: 'horizontal',
    loop: true,
    fadeEffect: { crossFade: true },
    effect: 'fade',
    virtualTranslate: true,
    draggable: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    speed: 1000, 
    slidesPerView: 1,
    initialSlide : 0,
    observer: true,  
    observeParents: true,
    paginationClickable: true,
    pagination: {
        el: `.${ID}-progessPagination`,
      clickable: true
    },
    navigation: {
      nextEl: `.${ID}-modalInner .${ID}-swiperNext.swiper-button-next`,
      prevEl: `.${ID}-modalInner .${ID}-swiperPrev.swiper-button-prev`,
      clickable: true
    },
});
}

/**
 * 
 * @param {*} slideNo 
 * @description destroys and creates the carousel when feature is clicked
 */
export const openCarousel = (slideNo, el) => {

  const swiper = document.querySelector(`.${ID}-carouselModal .${ID}-swiper`).swiper;
  swiper.update();
  swiper.slideTo(slideNo, 300, true);
  swiper.autoplay.start();

  fireEvent('Clicked feature story');

  if(document.querySelector(`.${ID}-circle.active`)) {
    document.querySelector(`.${ID}-circle.active`).classList.remove('active');
  }
  el.classList.add(`active`);

  const featureCarousel = document.querySelector(`.${ID}-carouselModal`);
  featureCarousel.classList.add(`${ID}-modalShow`);

  if(window.innerWidth >= 767) {
    scrollToElement(featureCarousel);
  }

  swiper.on('slideChange', function () {
    const activeSlide = swiper.activeIndex;

    if(document.querySelector(`.${ID}-circle.active`)) {
      document.querySelector(`.${ID}-circle.active`).classList.remove('active');
    }
    document.querySelector(`.${ID}-circle[slide-target="${activeSlide}"]`).classList.add('active');
  
  });
 
}

export const closeCarousel = () => {
  const featureCarousel = document.querySelector(`.${ID}-carouselModal`);
  featureCarousel.classList.remove(`${ID}-modalShow`);

  const sliderInstance = document.querySelector(`.${ID}-carouselModal .${ID}-swiper`).swiper;
  sliderInstance.autoplay.stop();

  if(document.querySelector(`.${ID}-circle.active`)) {
    document.querySelector(`.${ID}-circle.active`).classList.remove('active');
  }
}

const splitSpecs = () => {
  
    const allSpecs = document.querySelectorAll('.product-specification tr');
    
    const specifications = {
        model: {},
        movement: {},
        dial: {},
        strap: {}, 
    };

    allSpecs.forEach((specItem) => {
        const specTitle = specItem.querySelector('td:first-child');
        const specData = specItem.querySelector('td:last-child');
        

        if(specTitle && specData) {
            const specTitleText = specTitle.innerText.trim();
            const specDataText = specData.innerText.trim();
            if(specTitleText.match(/^Strap/)) {
                specifications['strap'][specTitleText] = specDataText;
            } else if(specTitleText.match(/^Face/)) {
                specifications['dial'][specTitleText] = specDataText;
            }else if(specTitleText.match(/^Model|^Warranty|^Water|^Case|^Brand/)) {
              specifications['model'][specTitleText] = specDataText;
            }
             else {
              specifications['movement'][specTitleText] = specDataText;
            }
        }
    });

    return specifications;
}
export const addSpecs = () => {

  const specs = splitSpecs();
  // loop through tabs
  const allTabContent = document.querySelectorAll(`.${ID}-tabContent`);
  for (let index = 0; index < allTabContent.length; index += 1) {
    const element = allTabContent[index];
    const matchClass = element.getAttribute('data');
      if(specs[matchClass]) {

        const matchingContent = specs[matchClass];

        // add the data
        Object.keys(matchingContent).forEach((keyword) => {
          const specData = document.createElement('div');
          specData.classList.add(`${ID}-spec`);
          specData.innerHTML = `<h4 class="${ID}-specName">${keyword}</h4><p class="${ID}-specData">${matchingContent[keyword]}</p>`;
          element.appendChild(specData);
        });
      }
  }
}

export const SwitchTab = (el, tabContent) => {
	const tab = document.querySelectorAll(`.${ID}-tab`);
  const allTabs = document.querySelectorAll(`.${ID}-tabContent`);
  const allTabBadges = document.querySelectorAll(`.${ID}-specBadge`);

  for (let index = 0; index < tab.length; index += 1) {
    const element = tab[index];
    element.classList.remove('active');
  }

  for (let index = 0; index < allTabBadges.length; index += 1) {
    const element = allTabBadges[index];
    element.classList.remove('active');
  }

  for (let index = 0; index < allTabs.length; index += 1) {
    const element = allTabs[index];
    element.classList.remove('active'); 
  }

  const currentTab = el.getAttribute("tab-target");
  document.querySelector(`.${ID}-tab[tab-target="${currentTab}"]`).classList.add('active');

  if(document.querySelector(`.${ID}-specBadge[tab-target="${currentTab}"]`)) {
    document.querySelector(`.${ID}-specBadge[tab-target="${currentTab}"]`).classList.add('active');
  }

  const currentTabContent = tabContent;
  currentTabContent.classList.add('active');

  fireEvent('Clicked spec tab');
}

export const openSlideTab = (content) => {
  const tab = document.querySelector(`.${ID}-slideOutTab`);
  const overlay =  document.querySelector(`.${ID}-overlay`);

  overlay.classList.add('active');
  tab.classList.add('active');
  tab.classList.remove('closed');
  content.classList.add('active');
  fireEvent('Clicked link ' + content);
  document.documentElement.classList.add('noScroll');
}

export const closeSlideTab = (content) => {
  const tab = document.querySelector(`.${ID}-slideOutTab`);
  const overlay =  document.querySelector(`.${ID}-overlay`);

  overlay.classList.remove('active');
  tab.classList.remove('active');
  tab.classList.add('closed');
  content.classList.remove('active');
  document.documentElement.classList.remove('noScroll');
}

export const addWarranty = () => {

  const warrantyOptions = document.querySelector('warranty-options');
  document.body.appendChild(warrantyOptions);
  const price = document.querySelector('warranty-options').shadowRoot.querySelector('.c-product-warranty-summary__starting-price').textContent;  

  const warrantyHTML = 
  `<section class="${ID}-insurance">
  <div class="${ID}__sectionContainer">
      <div class="${ID}__row">
          <div class="${ID}-image"></div>
          <div class="${ID}-textBlock">
              <div class="inner">
                  <h2>Ernest Jones Platinum Care</h2>
                  <p>Few possessions mean as much to us as a watch or a special piece of jewellery. That’s why peace of mind is so important. With Ernest Jones Platinum Care, you’ll know that your valuable item is protected wherever you are in the world (limits and exclusions apply).</p>
                  <p>Choose a 2,3 or 5 year Platinum Care policy which includes theft & accidental cover from only <b>${price}</b></p>
                  <div class="${ID}-ctas">
                      <a class="${ID}__button secondary">Learn More</a>
                  </div>
              </div>
          </div>
      </div>
  </div>
</section>
`

document.querySelector(`.${ID}-features`).insertAdjacentHTML('afterend', warrantyHTML);

document.querySelector(`.${ID}-insurance .${ID}__button`).addEventListener('click', () => {
  warrantyOptions.shadowRoot.querySelector('.c-product-warranty-summary__button-prompt').click();
});

// styling
warrantyOptions.shadowRoot.querySelector('.c-product-warranty-summary').style="display: none";
}
export const insuranceScroll = () => {

  const warrantyUSP = document.querySelector(`.${ID}-usp.${ID}-warranty p`);

  warrantyUSP.insertAdjacentHTML('afterend', `<div class="${ID}-warrantyLink ${ID}__textLink">Extended warranty available</div>`);


  document.querySelector(`.${ID}-warrantyLink`).addEventListener('click', () => {
    scrollToElement(document.querySelector(`.${ID}-insurance`));

  });

}