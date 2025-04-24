/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { logMessage, observer, pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import Swiper from 'swiper/swiper-bundle';
import AddToBag from "./addToBag";

const { ID, VARIATION } = shared;

const getCategoryData = (categoryString) => {



  return new Promise((resolve, reject) => {

    fetch('https://www.boots-optimisation.co.uk/category-search/' + categoryString, {
      method: 'GET',
      
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        resolve(responseJSON); // Resolve the promise with the response data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        reject(error); // Reject the promise with the error
      });

  });
}

const buildPLPCarousel = (data, plpType, newPageURL, newPageFriendlyName) => {

  const currPageURL = window.location.pathname;
  let winterWellness = false;
  if(currPageURL === "/health-pharmacy/medicines-treatments/cold-flu-medication") {
    winterWellness = true;
  } else {
    winterWellness = false;
  }

  if(newPageFriendlyName == 'Winter Wellness') {

    data = data.filter((product) => {
      if(!product.offerName.toLowerCase().includes('hand warmer') && !product.offerName.toLowerCase().includes('foot warmer')) {
        return product;
      }
    });

  }

  let productsToBeShown = data.slice(0, 10);

  let insertionPointSelectorNumber = 8;
  if(window.outerWidth > 600 && window.outerWidth <= 1280) {
    insertionPointSelectorNumber = 9;
  } else if(window.outerWidth <= 600) {
    insertionPointSelectorNumber = 6;
  }

  let numGridCells = document.querySelectorAll('#octListers .oct-listers-hits .oct-grid__cell');
  if(plpType == 'old-plp'){
    numGridCells = document.querySelectorAll('.product_listing_container .grid li');
  } 

  if(plpType == 'new-plp') {

    numGridCells = [].slice.call(numGridCells).filter((cell) => {

      if(cell.style.display == 'none') {
        return false;
      } else {
        return true;
      }

    });

  }

  if(numGridCells.length < insertionPointSelectorNumber) {

    fireEvent(`Interaction - not enough products to display the carousel`, true);
    return;

  }

  pollerLite(['#footer'], () => {
    setTimeout(() => {
        let insertionPoint = numGridCells[insertionPointSelectorNumber -1];

        let carouselHTML = `
      
        <div class="${ID}-carousel-outer ${plpType}">

          <div class="${ID}-carousel">
        
          <h2>${winterWellness ? 'Winter wellness' : 'The perfect pairing'}</h2>

            <div class="${ID}-carousel--container">
              
              <button class="${ID}-carousel--button ${ID}-carousel--button--left" id="${ID}-swiper-button-prev" aria-label="Previous slide"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 4.29289C8.68342 3.90237 9.31658 3.90237 9.70711 4.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L9.70711 19.7071C9.31658 20.0976 8.68342 20.0976 8.29289 19.7071C7.90237 19.3166 7.90237 18.6834 8.29289 18.2929L14.5858 12L8.29289 5.70711C7.90237 5.31658 7.90237 4.68342 8.29289 4.29289Z" fill="#000000"/></svg></button>
              <button class="${ID}-carousel--button ${ID}-carousel--button--right" id="${ID}-swiper-button-next" aria-label="Next slide"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 4.29289C8.68342 3.90237 9.31658 3.90237 9.70711 4.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L9.70711 19.7071C9.31658 20.0976 8.68342 20.0976 8.29289 19.7071C7.90237 19.3166 7.90237 18.6834 8.29289 18.2929L14.5858 12L8.29289 5.70711C7.90237 5.31658 7.90237 4.68342 8.29289 4.29289Z" fill="#000000"/></svg></button>

              <div class="${ID}-carousel--container--inner swiper-container">
              
                <div class="swiper-wrapper">

                  ${productsToBeShown.map((product) => {

          return `

                      <div class="swiper-slide ${ID}-slide">
                        <div class="${ID}-slide-inner">
                          <div class="${ID}-slide-inner--image">
                            <a href="${product.actionURL}">
                              <img src="${product.referenceImageURL}" alt="${product.offerName}" />
                            </a>
                          </div>
                          <div class="${ID}-slide-inner--details">
                            <a class="${ID}-slide-inner--name" href="${product.actionURL}" title="${product.offerName}">
                              <h3>${product.offerName.length > 50 ? `${product.offerName.substring(0, 50)}...` : product.offerName}</h3>
                            </a>
                            <div class="${ID}-slide-inner--price">

                              ${product.currentPrice == product.regularPrice ? 
                                
                              `
                                <span class="${ID}-slide-inner--price--current">£${product.currentPrice.toFixed(2)}</span>
                                <span class="${ID}-slide-inner--price--regular ${ID}-invisible">Was £${product.regularPrice.toFixed(2)}</span>
                              ` 
                              : 

                              `
                                <span class="${ID}-slide-inner--price--current">Now £${product.currentPrice.toFixed(2)}</span>
                                <span class="${ID}-slide-inner--price--regular">Was £${product.regularPrice.toFixed(2)}</span>
                              `
                              }

                              
                            </div>
                            <div class="${ID}-slide-inner--cta">
                              <button class="${ID}-slide-inner--cta--button" data-model="${product.model}" data-name="${product.offerName}" data-object="${product.model}">Add to Basket</button>
                            </div>

                          </div>
                        </div>
                      </div>

                      `;

        }).join('')}

                </div>

                
              </div>
              <div class="${ID}-swiper-scrollbar swiper-scrollbar"></div>
            </div>
            <div class="${ID}-carousel--shop-all">
              <a href="${newPageURL}" class="${ID}-shop-all">${winterWellness ? 'Shop all electric blankets' : `Shop all ${newPageFriendlyName}`}</a>
            </div>
          </div>
          
        </div>
      
      
      `;
      insertionPoint.insertAdjacentHTML('afterend', carouselHTML);

      const swiper = new Swiper(
        `.${ID}-carousel--container--inner.swiper-container`,
        {
          slidesPerView: 5,
          loop: false,
          //slidesPerGroup: 1,
          spaceBetween: 40,
          //centerInsufficientSlides: true,

          navigation: {
            nextEl: `#${ID}-swiper-button-next`,
            prevEl: `#${ID}-swiper-button-prev`,
          },
          scrollbar: {
            el: `.${ID}-swiper-scrollbar`,
            draggable: true,
          },

          breakpoints: {
            1600: {
              slidesPerView: 5,
            },
            1400: {
              slidesPerView: 4,
            },
            992: {
              slidesPerView: 3,
            },
            500: {
              slidesPerView: 2.5,
            },
            200: {
              slidesPerView: 1.5,
            }
          },
        }
      );

      window.addEventListener("resize", () => {
        swiper.update();
      });

      const allATBButtons = document.querySelectorAll(
        `.${ID}-carousel--container--inner .${ID}-slide-inner--cta--button`
      );
      allATBButtons.forEach((button) => {
        const model = button.getAttribute("data-model");
        const name = button.getAttribute("data-name");
        const object = button.getAttribute("data-object");
        const addToBag = new AddToBag(
          object,
          parseInt(object, 10) - 1,
          model,
          name
        );
        button.addEventListener("click", (e) => {
          e.preventDefault();
          addToBag.add();
          fireEvent(`Click - User clicked add to basket from the recommendations for product: ${name} with sku: ${model}`);
        });
      });

      let scrollWatch = new window.IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            fireEvent('Interaction - user has seen the recommendations', true);
            scrollWatch.unobserve(contentHolder);
          }
        });
      }, { root: null });

      let contentHolder = document.querySelector(`.${ID}-carousel-outer`);

      scrollWatch.observe(contentHolder);

    }, 1000);
    

    

  })



}

const fireOnListerUpdates = (data, plpType, newPageURL, newPageFriendlyName) => {

  const frequency = 1000; // check every 500ms
  // helper function for comparing nodeLists
  const eq = (A, B) => {
    if (A.length !== B.length) return false;
    for (let i = 0; i < A.length; i++) {
      if (A[i] !== B[i]) return false;
    }
    return true;
  }

  let titles = document.querySelectorAll('.oct-teaser-with-listers').length > 0 ? document.querySelectorAll('.oct-teaser-with-listers') : document.querySelectorAll('.product_name_link');

  window.setInterval(() => {
    let newTitles = document.querySelectorAll('.oct-teaser-with-listers').length > 0 ? document.querySelectorAll('.oct-teaser-with-listers') : document.querySelectorAll('.product_name_link');
    if (!eq(titles, newTitles)) {
      titles = newTitles;
      document.querySelector(`.${ID}-carousel-outer`)?.remove();
      buildPLPCarousel(data, plpType, newPageURL, newPageFriendlyName);
    }
  }, frequency)


}

const callCategoryData = (newPLP, plpType, newPageURL, newPageFriendlyName, currPageURL) => {

  getCategoryData(newPLP).then((data) => {

    logMessage("Returned Data: ");
    logMessage(data);

    if (data.length > 0) {
      if(VARIATION !== 'control') {
        buildPLPCarousel(data, plpType, newPageURL, newPageFriendlyName);
      }
      fireEvent(`Interaction - Recommendations ${VARIATION == "control" ? 'would have been' : 'were'} loaded - on page: ${currPageURL} - recs taken from new page: ${newPageURL}`, true);
    } else {
      fireEvent(`Experiment - Recommendations Not Loaded, no data`, true);
    }

    if(plpType == "new-plp") {
      if (VARIATION !== 'control') {
        fireOnListerUpdates(data, plpType, newPageURL, newPageFriendlyName);
      }
    } else {
      if(VARIATION !== 'control') {
        observer.connect(document.querySelector('#estore_lister_template_container div[dojotype="wc.widget.RefreshArea"]'), () => {

          setTimeout(() => {
            document.querySelector(`.${ID}-carousel-outer`)?.remove();
            buildPLPCarousel(data, plpType, newPageURL, newPageFriendlyName);
          }, 1000);
          

        }, {
          attributes: true,
          childList: true,
          subtree: true,
        });
      }
    }



  });

}

const startExperiment = () => {


  let pageObject = [
    {
      currPageURL: "/beauty/makeup/lips/foundation",
      newPageURL: "/beauty/makeup/lips/brushes-sponges",
      newPageCatString: "beauty & skincare > makeup > brushes & sponges",
      newPageFriendlyName: "Brushes & Sponges",
    },
    {
      currPageURL: "/beauty/makeup/lips/lipsticks",
      newPageURL: "/beauty/makeup/lips/lip-liners-pencils",
      newPageCatString: "beauty & skincare > makeup > lips > lip liners & pencils",
      newPageFriendlyName: "Lip Liners & Pencils",
    },
    { 
      currPageURL: "/beauty/makeup/eyes/mascara", 
      newPageURL: "/beauty/makeup/eyes/eye-liner", 
      newPageCatString: "beauty & skincare > makeup > eyes > eye liner",
      newPageFriendlyName: "Eye Liner",
    },
    {
      currPageURL: "/beauty/makeup/face/powder",
      newPageURL: "/beauty/makeup/brushes-sponges/face-brushes-sponges",
      newPageCatString: "beauty & skincare > makeup > brushes & sponges > face brushes & sponges", 
      newPageFriendlyName: "Face Brushes & Sponges",
    },
    {
      currPageURL: "/beauty/makeup/face/blusher",
      newPageURL: "/beauty/makeup/face/bronzer",
      newPageCatString: "beauty & skincare > makeup > face > bronzer",
      newPageFriendlyName: "Bronzer",
    },
    {
      currPageURL: "/beauty/skincare/facial-skincare/cleanser-toner",
      newPageURL: "/beauty/skincare/facial-skincare/serum-and-treatments",
      newPageCatString: "beauty & skincare > skincare > facial skincare > serum",
      newPageFriendlyName: "Serum & Treatments",
    },
    {
      currPageURL: "/beauty/hair/shampoo",
      newPageURL: "/toiletries/hair/conditioner",
      newPageCatString: "toiletries > hair > conditioner",
      newPageFriendlyName: "Conditioner",
    },
    {
      currPageURL: "/electrical/hair-styling-tools/hair-dryers",
      newPageURL: "/beauty/hair/hair-treatments-and-masks",
      newPageCatString: "beauty & skincare > hair > hair treatments and masks",
      newPageFriendlyName: "Hair Treatments & Masks",
    },
    {
      currPageURL: "/electrical/hair-styling-tools/hair-straighteners",
      newPageURL: "/beauty/hair/hair-treatments-and-masks",
      newPageCatString: "beauty & skincare > hair > hair treatments and masks",
      newPageFriendlyName: "Hair Treatments & Masks",
    },
    {
      currPageURL: "/electrical/hair-styling-tools/hair-curlers",
      newPageURL: "/beauty/hair/hair-treatments-and-masks",
      newPageCatString: "beauty & skincare > hair > hair treatments and masks",
      newPageFriendlyName: "Hair Treatments & Masks",
    },
    {
      currPageURL: "/baby-child/bathing-changing/nappies",
      newPageURL: "/baby-child/bathing-changing/baby-wipes",
      newPageCatString: "baby & child > bathing & changing > baby wipes",
      newPageFriendlyName: "Baby Wipes",
    },
    // {
    //   currPageURL: "/health-pharmacy/medicines-treatments/painrelief",
    //   newPageURL: "/health-pharmacy/lifestyle-wellbeing/electric-blankets",
    //   newPageCatString: "electrical > electrical health & diagnostics > electric blankets & heated bedding",
    //   newPageFriendlyName: "Electric Blankets",
    // },
    {
      currPageURL: "/health-pharmacy/medicines-treatments/cold-flu-medication",
      newPageURL: "/health-pharmacy/lifestyle-wellbeing/electric-blankets",
      newPageCatString: "electrical > electrical health & diagnostics > electric blankets & heated bedding",
      newPageFriendlyName: "Winter Wellness",
    },

  ]

  let currPageURL = window.location.pathname;


  let newPageObject = pageObject.filter((page) => {
    return page.currPageURL == currPageURL;
  })[0]

  if(newPageObject !== undefined) {

    fireEvent('Conditions Met');

    let newPageCatString = newPageObject.newPageCatString;
    let newPageURL = newPageObject.newPageURL;
    let newPageFriendlyName = newPageObject.newPageFriendlyName;

    let newPLP = newPageCatString;
    newPLP = encodeURIComponent(newPLP);
    let plpType = '';
    let interval = setInterval(() => {
      if(document.querySelector('.oct-listers-hits')) {
        plpType = 'new-plp';
        callCategoryData(newPLP, plpType, newPageURL, newPageFriendlyName, currPageURL);
        clearInterval(interval);
      } else if (document.getElementById('estore_lister_template_container')) {
        plpType = 'old-plp';
        callCategoryData(newPLP, plpType, newPageURL, newPageFriendlyName, currPageURL);
        clearInterval(interval);
      }

    }, 100);

    document.body.addEventListener('click', (e) => {

      if (e.target.classList.contains(`${ID}-shop-all`)) {
        fireEvent(`Click - User clicked shop all from the recommendations for page: ${newPageURL}`, true);
      }

      if (e.target.id == `${ID}-swiper-button-prev` || e.target.closest('button')?.id == `${ID}-swiper-button-prev`) {
        fireEvent(`Click - User clicked previous slide from the recommendations`, true);
      }

      if (e.target.id == `${ID}-swiper-button-next` || e.target.closest('button')?.id == `${ID}-swiper-button-next`) {
        fireEvent(`Click - User clicked next slide from the recommendations`, true);
      }

    });

    

  } else {
    
    logMessage('No match found');
  }





};

export default () => {

  setup();

  

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  startExperiment();

  

};
