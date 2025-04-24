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
    if(document.querySelector('#pdp-accordion-warranty .product-cms')) {
      warranty = document.querySelector('#pdp-accordion-warranty .product-cms').textContent.trim().replace('Years', '');
    }

    return warranty;
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
  swiper.autoplay.running = true;

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
    if(document.querySelector(`.${ID}-circle[slide-target="${activeSlide}"]`)) {
      document.querySelector(`.${ID}-circle[slide-target="${activeSlide}"]`).classList.add('active');
    }
  
  });
 
}

export const closeCarousel = () => {
  const featureCarousel = document.querySelector(`.${ID}-carouselModal`);
  featureCarousel.classList.remove(`${ID}-modalShow`);

  const sliderInstance = document.querySelector(`.${ID}-carouselModal .${ID}-swiper`).swiper;
  sliderInstance.autoplay.running = false;

  if(document.querySelector(`.${ID}-circle.active`)) {
    document.querySelector(`.${ID}-circle.active`).classList.remove('active');
  }
}

const splitSpecs = () => {
  
    const allSpecs = document.querySelectorAll('#pdp-accordion-specs tr');
    
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
            if(specTitleText.match(/^Watch Strap/)) {
                specifications['strap'][specTitleText] = specDataText;
            } else if(specTitleText.match(/^Watch Face|^Stone Type/)) {
                specifications['dial'][specTitleText] = specDataText;
            }else if(specTitleText.match(/^Model|^Warranty|^Watch Resistance|^Watch Case|^Watch Brand|^Watch Features|^Supplier RR/)) {
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

  const warrantyOptions = document.querySelector('.product-detail__warrantyuk');
  const price = warrantyOptions.querySelectorAll('.product-detail-warranty-details strong')[1].innerText;

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
if(document.querySelector(`.${ID}-features`)) {
  document.querySelector(`.${ID}-features`).insertAdjacentHTML('afterend', warrantyHTML);


  document.querySelector(`.${ID}-insurance .${ID}__button`).addEventListener('click', () => {
    warrantyOptions.querySelector('.product-detail-warranty-link').click();
  });
}

}
export const insuranceScroll = () => {

  const warrantyUSP = document.querySelector(`.${ID}-usp.${ID}-warranty p`);
  if(warrantyUSP) {

    warrantyUSP.insertAdjacentHTML('afterend', `<div class="${ID}-warrantyLink ${ID}__textLink">Extend warranty</div>`);


    document.querySelector(`.${ID}-warrantyLink`).addEventListener('click', () => {
      scrollToElement(document.querySelector(`.${ID}-insurance`));
    });
  }

}