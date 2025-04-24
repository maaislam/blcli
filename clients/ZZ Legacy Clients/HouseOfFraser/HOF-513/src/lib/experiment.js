/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events, logMessage, pollerLite } from '../../../../../lib/utils';
import debounce from 'lodash/debounce';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;
let stageNumber = 0;
let mySwiper, stage0, stage1, stage2, stage3, stage4, quizProgressBarInner, restartButton, quizHeader, quizPreviousButton;

let stageData = [
  { stageHeader: "What type of person is your gift for?", stageImageURL: "https://www.houseoffraser.co.uk/images/marketing/dy-assets/gift-finder2/Festive1-d.jpg", stageImageMobURL: "https://www.houseoffraser.co.uk/images/marketing/dy-assets/gift-finder2/Festive1-m.jpg" },
  { stageOptions: [
      { stageName: 'option-fabulous', stageHeader: "Would they rather smell, look, or feel fabulous?", stageImage: 'https://www.houseoffraser.co.uk/images/marketing/dy-assets/gift-finder2/Fabulous-d.jpg', stageImageMob: 'https://www.houseoffraser.co.uk/images/marketing/dy-assets/gift-finder2/Fabulous-m.jpg' },
      { stageName: 'option-fun', stageHeader: "How do they like to have fun?", stageImage: 'https://www.houseoffraser.co.uk/images/marketing/dy-assets/gift-finder2/Fun-d.jpg', stageImageMob: 'https://www.houseoffraser.co.uk/images/marketing/dy-assets/gift-finder2/Fun-m.jpg' },
      { stageName: 'option-festive', stageHeader: "How do they like to be festive?", stageImage: 'https://www.houseoffraser.co.uk/images/marketing/dy-assets/gift-finder2/Festive3-d.jpg', stageImageMob: 'https://www.houseoffraser.co.uk/images/marketing/dy-assets/gift-finder2/Festive2-m.jpg' },
      { stageName: 'option-fly', stageHeader: "What makes them fly?", stageImage: 'https://www.houseoffraser.co.uk/images/marketing/dy-assets/gift-finder2/Fly-d.jpg', stageImageMob: 'https://www.houseoffraser.co.uk/images/marketing/dy-assets/gift-finder2/Fly-m.jpg' },
      { stageName: 'option-fierce', stageHeader: "What makes them fierce?", stageImage: 'https://www.houseoffraser.co.uk/images/marketing/dy-assets/gift-finder2/Fierce-d.jpg', stageImageMob: 'https://www.houseoffraser.co.uk/images/marketing/dy-assets/gift-finder2/Fierce-m.jpg' },
      { stageName: 'option-flashy', stageHeader: "What makes them flashy?", stageImage: 'https://www.houseoffraser.co.uk/images/marketing/dy-assets/gift-finder2/Flashy-d.jpg', stageImageMob: 'https://www.houseoffraser.co.uk/images/marketing/dy-assets/gift-finder2/Flashy-m.jpg' },
    ]
  },
  { stageOptions: [
    // fabulous
    { stageName: 'option-fabulous-smell-fabulous', stageHeader: "What fragrances do they like wearing?" },
    { stageName: 'option-fabulous-look-fabulous', stageHeader: "How would you like to make them look fabulous?" },
    { stageName: 'option-fabulous-feel-fabulous', stageHeader: "What makes them feel fabulous?" },
    // fun
    { stageName: 'option-fun-arts-crafts', stageHeader: "What type of crafting would they like?" },
    { stageName: 'option-fun-imaginative', stageHeader: "What type of imaginative fun do they like?" },
    { stageName: 'option-fun-action-packed', stageHeader: "What type of action packed fun do they like?" },
    // festive
    { stageName: 'option-festive-home-decoration', stageHeader: "What do you need from our Christmas Collection?" },
    { stageName: 'option-festive-clothing', stageHeader: "Festive from head to toe?" },
    { stageName: 'option-festive-christmas-countdown', stageHeader: "The countdown is on!" },
    // fly
    { stageName: 'option-fly-accessories', stageHeader: "What fly accessories do they like?" },
    { stageName: 'option-fly-clothing', stageHeader: "What makes them fly?" },
    { stageName: 'option-fly-shoes', stageHeader: "Which shoes make them feel fly?" },
    { stageName: 'option-fly-gadgets', stageHeader: "What toys & gadgets make them feel fly?" },
    // fierce
    { stageName: 'option-fierce-accessories', stageHeader: "What accessory can they not be without?" },
    { stageName: 'option-fierce-clothing', stageHeader: "What's their fierce clothing choice?" },
    { stageName: 'option-fierce-shoes', stageHeader: "What’s their go to shoe style?" },
    { stageName: 'option-fierce-beauty', stageHeader: "What makes them feel fabulous?" },
    // flashy
    { stageName: 'option-flashy-accessories', stageHeader: "What accessory can they not be without?" },
    { stageName: 'option-flashy-suits', stageHeader: "How do they like to be tailored?" },
    { stageName: 'option-flashy-shoes-boots', stageHeader: "What shoes make them feel flashy?" },
    { stageName: 'option-flashy-clothing', stageHeader: "What clothing makes them feel flashy?" },
  ]},
  { stageHeader: "What is your price range?" },
];

const initiateSlider = () => {

  // Run slick
  let slider = document.querySelector(`.${ID}-quiz--products`);
  slider.classList.add('swiper-active');

  mySwiper = new Swiper(slider, {
    // Optional parameters
    init: false,
    loop: false,
    // If we need pagination
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    // Disable preloading of all images
    preloadImages: true,
    // Enable lazy loading
    lazy: false,
    // Responsive breakpoints

    pagination: {
      el: `.${ID}-quiz--carouselpagination`,
      type: 'bullets',
      clickable: true,

    },


  })

  // Once the carousel is ready, initiate swiper and remove the loading spinner to display the carousel

  setTimeout(function () {
    mySwiper.init();
  }, 500);

  setTimeout(function () {

    document.querySelector(`.${ID}-quiz--stage3`).classList.remove('calculating');

  }, 600);

}

const checkProgress = () => {

  let quizHeader = document.querySelector(`.${ID}-quiz--header`);
  let quizHeaderImage = document.getElementById(`${ID}-quiz--bgimage`);
  let quizHeaderH2 = quizHeader.querySelector('h2');

  

  if (stageNumber == 0) {
    quizProgressBarInner.setAttribute('data-percent', 0);
    quizProgressBarInner.querySelector('span').innerText = "0%";

    if(window.outerWidth >= 768) {
      quizHeaderImage.src = stageData[0].stageImageURL;
    } else {
      quizHeaderImage.src = stageData[0].stageImageMobURL;
    }
    
    quizHeaderH2.innerText = stageData[0].stageHeader;

    quizProgressBarInner.closest(`.${ID}-quiz--progress`).classList.remove(`${ID}-hidden`);
    restartButton.classList.add(`${ID}-hidden`);
    quizHeader.classList.remove(`hidden-buttons`);

    quizPreviousButton.classList.add(`${ID}-hidden`);

  } else if (stageNumber == 1) {
    quizProgressBarInner.setAttribute('data-percent', 25);
    quizProgressBarInner.querySelector('span').innerText = "25%";
    restartButton.classList.remove(`${ID}-hidden`);
    let stageOptions = stageData[1].stageOptions;
    let currSelectedStage = localStorage.getItem(`${ID}-gifttype-option`);
    let currStageDetails = stageOptions.filter((option) => {
      if(option.stageName == currSelectedStage) {
        return true;
      }

    });

    if(window.outerWidth >= 768) {
      quizHeaderImage.src = currStageDetails[0].stageImage;
    } else {
      quizHeaderImage.src = currStageDetails[0].stageImageMob;
    }
    
    quizHeaderH2.innerText = currStageDetails[0].stageHeader;

    quizPreviousButton.classList.remove(`${ID}-hidden`);

  } else if (stageNumber == 2) {
    quizProgressBarInner.setAttribute('data-percent', 50);
    quizProgressBarInner.querySelector('span').innerText = "50%";

    let stageOptions = stageData[2].stageOptions;
    let currSelectedStage = localStorage.getItem(`${ID}-category-option`);
    let currStageDetails = stageOptions.filter((option) => {
      if(option.stageName == currSelectedStage) {
        return true;
      }

    });

    quizHeaderH2.innerText = currStageDetails[0].stageHeader;

  } else if (stageNumber == 3) {

    quizProgressBarInner.setAttribute('data-percent', 75);
    quizProgressBarInner.querySelector('span').innerText = "75%";

    quizHeaderH2.innerText = "How much would you like to spend?";
    stage4.classList.remove('no-products');
    quizProgressBarInner.closest(`.${ID}-quiz--progress`).classList.remove(`${ID}-hidden`);
    restartButton.classList.remove(`${ID}-hidden`);
    //quizHeader.classList.remove(`hidden-buttons`);

  } else if (stageNumber == 4) {

    quizProgressBarInner.setAttribute('data-percent', 100);
    quizProgressBarInner.querySelector('span').innerText = "100%";
    quizProgressBarInner.closest(`.${ID}-quiz--progress`).classList.add(`${ID}-hidden`);
    quizHeaderH2.innerText = "";
    restartButton.classList.add(`${ID}-hidden`);
    //quizHeader.classList.add(`hidden-buttons`);
    stage4.classList.remove('no-products');
    stage4.classList.add('calculating');

    // Start doing ajax call here

    let topLevelOption = localStorage.getItem(`${ID}-gifttype-option`);
    let topLevelCategoryOption = localStorage.getItem(`${ID}-category-filter`);
    let secondLevelCategoryOption = localStorage.getItem(`${ID}-catlevtwo-option`);
    let secondLevelCategoryCatCode = localStorage.getItem(`${ID}-catlevtwo-catcode`);
    let secondLevelCategoryStageURL = localStorage.getItem(`${ID}-catlevtwo-stageurl`);
    let priceOption = localStorage.getItem(`${ID}-price-option`);

    logMessage("TL: "+topLevelOption+" TLC: "+topLevelCategoryOption+" 2LC: "+secondLevelCategoryOption+" 2LCCC: "+secondLevelCategoryCatCode+" 2LSU: "+secondLevelCategoryStageURL+" PRI: "+priceOption);

    let stageOptions = stageData[2].stageOptions;
    let currSelectedStage = localStorage.getItem(`${ID}-category-option`);
    let currStageDetails = stageOptions.filter((option) => {
      if(option.stageName == currSelectedStage) {
        return true;
      }

    });

    let plpCode = currStageDetails[0].stagePLPCode;

    let selectedFilters = `${topLevelCategoryOption !== "" ? topLevelCategoryOption + '|' : ''}${secondLevelCategoryOption}|APRI^${priceOption}`;
    
    let overallURL = "https://www.houseoffraser.co.uk"+secondLevelCategoryStageURL+"#dcp=1&dppp=36&OrderBy=rank&Filter=" + encodeURIComponent(selectedFilters);

    logMessage("Filters: "+selectedFilters);
    logMessage("OverallURL: "+overallURL);

    stage4.classList.remove('no-products');

    let isMobileView = false;
    if(window.outerWidth < 767) {
      isMobileView = true;
    }
    
    let parentStageOptions = stageData[1].stageOptions;
    let parentSelectedStage = localStorage.getItem(`${ID}-gifttype-option`);
    let parentStageDetails = parentStageOptions.filter((option) => {
      if(option.stageName == parentSelectedStage) {
        return true;
      }

    });

    let theData = {
        categoryId: secondLevelCategoryCatCode,
        page: 1,
        productsPerPage: 6,
        sortOption: 'price_desc',
        selectedFilters: selectedFilters,
        isSearch: false,
        searchText: '',
        columns: 3,
        mobileColumns: 2,
        clearFilters: false,
        pathName: 'https://www.houseoffraser.co.uk/'+secondLevelCategoryStageURL,
        searchTermCategory: '',
        selectedCurrency: 'GBP',
        portalSiteId: 12,
        searchCategory: '',
    };

    var productApiRequestUrl = '/api/productlist/v1/getforcategory'

    let currentGetProductsXhr = $.ajax({
        cache: true,
        type: 'GET',
        url: productApiRequestUrl,
        data: theData,
        dataType: "json",
        success: function(returnedData) {
          if(returnedData) {
            let products = returnedData.products;
            logMessage("Products Array");
            logMessage(returnedData);
            logMessage(products);

            if(products.length > 0) {

            

              let productDisplayHTML = `

                <div class="${ID}-quiz--products ${products.length == 1 ? 'single-product' : ''} ${isMobileView == true ? `swiper-container` : ''}">
                  ${isMobileView == true ? `<div class="swiper-wrapper">` : ''}
                  ${products.map((product, iterator) => {

                    // layout logic

                    let numProds = products.length;
                    let classes = "";
                    if(iterator == 0) {

                      classes = `large-product`;

                    } else if(iterator == 1) {

                      classes = `large-product`;

                    } else if(iterator == 2) {

                      if(numProds == 5 || numProds == 3) {
                        classes = `third-product`;
                      } else if(numProds == 4) {
                        classes = `large-product`;
                      } else {
                        classes = `small-product`;
                      }

                    } else if(iterator == 3) {

                      if(numProds == 5 || numProds == 3) {
                        classes = `third-product`;
                      } else if(numProds == 4) {
                        classes = `large-product`;
                      } else {
                        classes = `small-product`;
                      }

                    } else if(iterator == 4) {

                      if(numProds == 5 || numProds == 3) {
                        classes = `third-product`;
                      } else {
                        classes = `small-product`;
                      }

                    } else if(iterator == 5) {

                      if(numProds == 5 || numProds == 3) {
                        classes = `third-product`;
                      } else {
                        classes = `small-product`;
                      }

                    }


                    return `
                      <div class="${ID}-product ${classes} ${isMobileView == true ? `swiper-slide` : ''}">
                        <div class="${ID}-product--image">
                          <img src="${product.image}" alt="${product.name} image" />
                        </div>

                        <div class="${ID}-product--desc">
                        
                          <p class="${ID}-product--brand">${product.brand}</p>
                          <p class="${ID}-product--name">${product.name}</p>
                          <p class="${ID}-product--price">From ${product.price}</p>

                          <div class="${ID}-product--buttons">

                            <a href="${product.url}" class="${ID}-product--button primary">View Product</a>
                            
                          </div>
                        </div>
                      
                      </div>
                    `;


                  }).join('')}       
                  ${isMobileView == true ? `</div><div class="${ID}-quiz--carouselpagination"></div>` : ''}
                </div>

                <div class="${ID}-quiz--categorylink">

                  ${products.length > 0 ? `<a target="_blank" class="${ID}-quiz--seeall" href="${overallURL}"> See all matches (${returnedData.numberOfProducts}) </a>` : ''}
                  <a href="/gift-finder" class="${ID}-quiz--retakequiz"> Retake Quiz </a>

                </div>
              
              `;
              stage4.querySelector(`.${ID}-quiz--stage4results`).innerHTML = "";

              stage4.querySelector(`.${ID}-quiz--stage4results`).insertAdjacentHTML('afterbegin', productDisplayHTML);

              fireEvent(`Visible - products shown to user, category URL: ${overallURL} first six products shown from this`);

              
              if(isMobileView == true) {
                initiateSlider();
              }

              pollerLite([`.${ID}-quiz--seeall`, `.${ID}-quiz--retakequiz`], () => {
                let seeAllMatchesButton = stage4.querySelector(`.${ID}-quiz--seeall`);
                seeAllMatchesButton.addEventListener('click', (e) => {
                  fireEvent(`Click - user clicked on the see all products button to go to ${e.currentTarget.href}`);
                })

                let retakeButton = stage4.querySelector(`.${ID}-quiz--retakequiz`);
                console.log(retakeButton);
                retakeButton.addEventListener('click', (e) => {
                  fireEvent(`Click - user clicked on the retake button to exit to ${e.currentTarget.href}`);
                })
              });

              setTimeout(() => {
                let allReturnedProducts = stage4.querySelectorAll(`.${ID}-quiz--stage4results .${ID}-product a`);
                console.log(allReturnedProducts);
                [].slice.call(allReturnedProducts).forEach((product) => {
                  product.addEventListener('click', (e) => {
                    fireEvent(`Click - user clicked on the product: ${e.currentTarget.href}`);
                  });
                });
                
                

                stage4.classList.remove('calculating');
              }, 500);
              

              
            } else {

              stage4.querySelector(`.${ID}-quiz--stage4results`).innerHTML = "";
              stage4.classList.remove('calculating');
              stage4.classList.add('no-products');
              restartButton.classList.remove(`${ID}-hidden`);
            }
            



          }
        },
        error: function(xhr, textStatus, errorThrown) {
          logMessage("Error");
          logMessage(errorThrown);
            if (textStatus != "abort")
                console.error(textStatus + errorThrown);
        },
        complete: function(data) {
            currentGetProductsXhr = null;
        }
    });
    

  }


}

const moveForwardStage = () => {

  checkProgress();



  if (stageNumber == 0) {

    // do stage 0 stuff
    stage0.classList.add('active');
    stage1.classList.remove('active');
    stage2.classList.remove('active');
    stage3.classList.remove('active');
    stage4.classList.remove('active');


  } else if (stageNumber == 1) {

    // do stage 1 stuff

    stage0.classList.remove('active');
    stage1.classList.add('active');

    
    

  } else if (stageNumber == 2) {

    // do stage 2 stuff

    stage1.classList.remove('active');
    stage2.classList.add('active');



  } else if (stageNumber == 3) {

    stage2.classList.remove('active');
    stage3.classList.add('active');


  } else if (stageNumber == 4) {

    stage3.classList.remove('active');
    stage4.classList.add('active');



  }

}

const moveBackwardsStage = () => {

  checkProgress();



  if (stageNumber == 0) {

    // do stage 0 stuff
    stage0.classList.add('active');
    stage1.classList.remove('active');
    stage2.classList.remove('active');
    stage3.classList.remove('active');
    stage4.classList.remove('active');

  } else if (stageNumber == 1) {

    // do stage 1 stuff
    stage1.classList.add('active');
    stage2.classList.remove('active');
    
    

  } else if (stageNumber == 2) {

    // do stage 2 stuff
    stage2.classList.add('active');
    stage3.classList.remove('active');
    



  } else if (stageNumber == 3) {

    stage3.classList.add('active');
    stage4.classList.remove('active');


  }

}

const buildQuiz = () => {

  let quizHTML = `
  
    <div class="${ID}-quiz">
    
      <div class="${ID}-quiz--header">

        <div class="${ID}-quiz--headerinner">
        
          <div class="${ID}-quiz--buttonholder ${ID}-quiz--gobacklink">
            <button id="${ID}-quiz--previous" class="${ID}-quiz--link previous ${ID}-hidden"> <svg width="12" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 25.451 25.451" style="enable-background:new 0 0 25.451 25.451;" xml:space="preserve"><g><g id="c185_triangle"><path fill="#AC9751" d="M20.982,0.521v2.006L8.57,12.315c-0.121,0.101-0.195,0.251-0.195,0.41s0.074,0.311,0.195,0.41l12.412,9.79v2.005c0,0.199-0.115,0.383-0.297,0.469c-0.178,0.086-0.395,0.064-0.549-0.061L4.664,13.136c-0.122-0.1-0.194-0.251-0.194-0.41s0.072-0.31,0.194-0.41L20.136,0.113c0.154-0.126,0.371-0.148,0.549-0.061C20.866,0.139,20.982,0.322,20.982,0.521z"/></g><g id="Capa_1_58_"></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg> <span class="${ID}-button-text-inner">Back to Previous</span> </button>         
          </div>

          ${window.outerWidth >= 768 ? `<div class="${ID}-quiz--imagery"><img src="https://www.houseoffraser.co.uk/images/marketing/dy-assets/gift-finder2/Festive1-d.jpg" alt="placeholder1" class="${ID}-quiz--bgimage" id="${ID}-quiz--bgimage" /></div>` : '' }

          <div class="${ID}-quiz--buttonholder ${ID}-quiz--exitlink">
            <a href="${document.referrer}" id="${ID}-quiz--exit" class="${ID}-quiz--link"> <svg width="17" fill="#AC9751" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" preserveAspectRatio="none" x="0px" y="0px" viewBox="0 0 100 100"><path fill="#AC9751" stroke="none" d=" M 81.75 21.75 Q 82.503515625 21.0390625 82.5 20 82.503515625 18.9607421875 81.75 18.2 81.0390625 17.4962890625 80 17.5 78.9607421875 17.4962890625 78.2 18.2 L 50 46.45 21.75 18.2 Q 21.0390625 17.4962890625 20 17.5 18.9607421875 17.4962890625 18.2 18.2 17.4962890625 18.9607421875 17.5 20 17.4962890625 21.0390625 18.2 21.75 L 46.45 50 18.2 78.2 Q 17.4962890625 78.9607421875 17.5 80 17.4962890625 81.0390625 18.2 81.75 18.9607421875 82.503515625 20 82.5 21.0390625 82.503515625 21.75 81.75 L 50 53.55 78.2 81.75 Q 78.9607421875 82.503515625 80 82.5 81.0390625 82.503515625 81.75 81.75 82.503515625 81.0390625 82.5 80 82.503515625 78.9607421875 81.75 78.2 L 53.55 50 81.75 21.75 Z"></path></svg> <span class="${ID}-button-text-inner">Exit</span> </a>
          </div>

          
        </div>

        ${window.outerWidth < 768 ? `<div class="${ID}-quiz--imagery"><img src="https://www.houseoffraser.co.uk/images/marketing/dy-assets/gift-finder2/Festive1-m.jpg" alt="placeholder1" class="${ID}-quiz--bgimage" id="${ID}-quiz--bgimage" /></div>` : '' }

        ${window.outerWidth < 768 ? `<div class="${ID}-quiz--progress">
      
          <div class="${ID}-quiz--progressinner" data-percent="0"><span class="${ID}-percent">0%</span></div>
        
        </div>` : ``}
        
        <h2> ${stageData[0].stageHeader} ${window.outerWidth < 767 ? `<button class="${ID}-quiz--mobileadvice" id="${ID}-quiz--mobileadvice"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15" viewBox="0 0 281.488 281.488" style="enable-background:new 0 0 281.488 281.488;" xml:space="preserve"> <g> <path d="M140.744,0C63.138,0,0,63.138,0,140.744s63.138,140.744,140.744,140.744s140.744-63.138,140.744-140.744 S218.351,0,140.744,0z M140.744,263.488C73.063,263.488,18,208.426,18,140.744S73.063,18,140.744,18 s122.744,55.063,122.744,122.744S208.425,263.488,140.744,263.488z"/> <path d="M163.374,181.765l-16.824,9.849v-71.791c0-3.143-1.64-6.058-4.325-7.69c-2.686-1.632-6.027-1.747-8.818-0.299 l-23.981,12.436c-4.413,2.288-6.135,7.72-3.847,12.132c2.289,4.413,7.72,6.136,12.133,3.847l10.838-5.62v72.684 c0,3.225,1.726,6.203,4.523,7.808c1.387,0.795,2.932,1.192,4.477,1.192c1.572,0,3.143-0.411,4.546-1.232l30.371-17.778 c4.29-2.512,5.732-8.024,3.221-12.314S167.663,179.255,163.374,181.765z"/> <circle cx="137.549" cy="86.612" r="12.435"/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg></button>` : ''} </h2>      
      
      </div>
    
      

      <div class="${ID}-quiz--body">
      
        <div class="${ID}-quiz--stage ${ID}-quiz--stage0 ${stageNumber == 0 ? 'active' : ''}">
        
          <button class="${ID}-quiz--button ${ID}-gifttype-option" data-option="option-fabulous">FABULOUS<span class="${ID}-gifttype-explainer" style="width: 104px;">Beauty</span></button>
          <button class="${ID}-quiz--button ${ID}-gifttype-option" data-option="option-fun">FUN<span class="${ID}-gifttype-explainer" style="width: 120px;">Toys & Games</span></button>
          <button class="${ID}-quiz--button ${ID}-gifttype-option" data-option="option-festive">FESTIVE<span class="${ID}-gifttype-explainer" style="width: 142px;">Christmas Shop</span></button>
          <button class="${ID}-quiz--button ${ID}-gifttype-option" data-option="option-fly">FLY<span class="${ID}-gifttype-explainer" style="width: 74px;">Kids</span></button>
          <button class="${ID}-quiz--button ${ID}-gifttype-option" data-option="option-fierce">FIERCE<span class="${ID}-gifttype-explainer" style="width: 88px;">Womens</span></button>
          <button class="${ID}-quiz--button ${ID}-gifttype-option" data-option="option-flashy">FLASHY<span class="${ID}-gifttype-explainer" style="width: 70px;">Mens</span></button>
        
        </div>

        <div class="${ID}-quiz--stage ${ID}-quiz--stage1 ${stageNumber == 1 ? 'active' : ''}">
        
          <div class="${ID}-option-fabulous">
            <button class="${ID}-quiz--button ${ID}-category-option" data-option="option-fabulous-smell-fabulous" data-filter="WEBCAT^Perfumes">SMELL FABULOUS</button>
            <button class="${ID}-quiz--button ${ID}-category-option" data-option="option-fabulous-look-fabulous" data-filter="">LOOK FABULOUS</button>
            <button class="${ID}-quiz--button ${ID}-category-option" data-option="option-fabulous-feel-fabulous" data-filter="">FEEL FABULOUS</button>
          </div>

          <div class="${ID}-option-fun">
            <button class="${ID}-quiz--button ${ID}-category-option" data-option="option-fun-arts-crafts" data-filter="">ARTS & CRAFTS</button>
            <button class="${ID}-quiz--button ${ID}-category-option" data-option="option-fun-imaginative" data-filter="">IMAGINATIVE</button>
            <button class="${ID}-quiz--button ${ID}-category-option" data-option="option-fun-action-packed" data-filter="">ACTION PACKED</button>
          </div>

          <div class="${ID}-option-festive">
            <button class="${ID}-quiz--button ${ID}-category-option" data-option="option-festive-home-decoration">HOME DECORATION</button>
            <button class="${ID}-quiz--button ${ID}-category-option" data-option="option-festive-clothing">CLOTHING</button>
            <button class="${ID}-quiz--button ${ID}-category-option" data-option="option-festive-christmas-countdown">CHRISTMAS COUNTDOWN</button>
          </div>

          <div class="${ID}-option-fly">
            <button class="${ID}-quiz--button ${ID}-category-option" data-option="option-fly-accessories">ACCESSORIES</button>
            <button class="${ID}-quiz--button ${ID}-category-option" data-option="option-fly-clothing">CLOTHING</button>
            <button class="${ID}-quiz--button ${ID}-category-option" data-option="option-fly-shoes">SHOES</button>
            <button class="${ID}-quiz--button ${ID}-category-option" data-option="option-fly-gadgets">GADGETS</button>
          </div>

          <div class="${ID}-option-fierce">
            <button class="${ID}-quiz--button ${ID}-category-option" data-option="option-fierce-accessories">ACCESSORIES</button>
            <button class="${ID}-quiz--button ${ID}-category-option" data-option="option-fierce-clothing">CLOTHING</button>
            <button class="${ID}-quiz--button ${ID}-category-option" data-option="option-fierce-shoes">SHOES</button>
            <button class="${ID}-quiz--button ${ID}-category-option" data-option="option-fierce-beauty">BEAUTY</button>
          </div>

          <div class="${ID}-option-flashy">
            <button class="${ID}-quiz--button ${ID}-category-option" data-option="option-flashy-accessories">ACCESSORIES</button>
            <button class="${ID}-quiz--button ${ID}-category-option" data-option="option-flashy-suits">SUITS &amp; TAILORING</button>
            <button class="${ID}-quiz--button ${ID}-category-option" data-option="option-flashy-shoes-boots">SHOES &amp; BOOTS</button>
            <button class="${ID}-quiz--button ${ID}-category-option" data-option="option-flashy-clothing">CLOTHING</button>
          </div>
          
        
        </div>

        <div class="${ID}-quiz--stage ${ID}-quiz--stage2 ${stageNumber == 2 ? 'active' : ''}">
        
          <!-- fabulous -->
          <div class="${ID}-option-fabulous-smell-fabulous">

            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fabulous" data-catcode="HOF_XMASGIFTS" data-stageurl="/christmas/christmas-gifts" data-option="AFLOR^Womens">FEMININE</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fabulous" data-catcode="HOF_XMASGIFTS" data-stageurl="/christmas/christmas-gifts" data-option="AFLOR^Unisex Adults">UNISEX</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fabulous" data-catcode="HOF_XMASGIFTS" data-stageurl="/christmas/christmas-gifts" data-option="AFLOR^Mens">MASCULINE</button>
          
          </div>

          <div class="${ID}-option-fabulous-look-fabulous">
          
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fabulous" data-catcode="HOF_XMASGIFTS" data-stageurl="/christmas/christmas-gifts" data-option="WEBCAT^Moisturisers">FOUNDATION</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fabulous" data-catcode="HOF_XMASGIFTS" data-stageurl="/christmas/christmas-gifts" data-option="WEBCAT^Lip Colour">LIPS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fabulous" data-catcode="HOF_XMASGIFTS" data-stageurl="/christmas/christmas-gifts" data-option="WEBCAT^Eye Shadows and Mascara">EYES</button>
          
          </div>

          <div class="${ID}-option-fabulous-feel-fabulous">
          
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fabulous" data-catcode="HOF_XMASGIFTS" data-stageurl="/christmas/christmas-gifts" data-option="WEBCAT^Nutrition">SUPPLEMENTS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fabulous" data-catcode="HOF_XMASGIFTS" data-stageurl="/christmas/christmas-gifts" data-option="WEBCAT^Bathroom Gifting">BATH &amp; BODY</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fabulous" data-catcode="HOF_XMASGIFTS" data-stageurl="/christmas/christmas-gifts" data-option="WEBCAT^Face Oils and Serums">OILS &amp; SERUMS</button>
          
          </div>

          <!-- fun -->
          <div class="${ID}-option-fun-arts-crafts">
          
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fun" data-catcode="HOF_XMASTOYS" data-stageurl="/christmas/christmas-gifts/toys" data-option="WEBSTYLE^Make Your Own Toys">MAKE YOUR OWN</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fun" data-catcode="HOF_XMASGIFTS" data-stageurl="/christmas/christmas-gifts/toys" data-option="WEBSTYLE^Stickers">STICKERS</button>
          
          </div>

          <div class="${ID}-option-fun-imaginative">
          
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fun" data-catcode="HOF_XMASTOYS" data-stageurl="/christmas/christmas-gifts/toys" data-option="WEBSTYLE^Building Blocks">BUILDING BLOCKS &amp; CONSTRUCTION</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fun" data-catcode="HOF_XMASTOYS" data-stageurl="/christmas/christmas-gifts/toys" data-option="WEBCAT^Soft Toys and Teddy Bears, Soft Toys">SOFT TOYS</button>
          
          </div>

          <div class="${ID}-option-fun-action-packed">
          
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fun" data-catcode="HOF_4278ACTIONFIGURESPLAYSETS" data-stageurl="/kids-and-baby/action-figures-and-playsets" data-option="">ACTION FIGURES &amp; PLAYSETS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fun" data-catcode="HOF_4288ROLLERSKATESSKATESHOES" data-stageurl="/kids-and-baby/roller-skates-and-skate-shoes" data-option="">ROLLER SKATES</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fun" data-catcode="HOF_4282BIKESTRIKESSCOOTERS" data-stageurl="/kids-and-baby/kids-bikes-trikes-and-scooters" data-option="">BIKES, TRIKES &amp; SCOOTERS</button>
          
          </div>

          <!-- festive -->
          <div class="${ID}-option-festive-home-decoration">
          
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="festive" data-catcode="HOF_XMASTREES" data-stageurl="/christmas/trees-and-decorations/christmas-trees" data-option="">CHRISTMAS TREES</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="festive" data-catcode="HOF_XMASLIGHTS" data-stageurl="/christmas/trees-and-decorations/lights" data-option="">CHRISTMAS LIGHTS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="festive" data-catcode="HOF_XMASTREEDECS" data-stageurl="/christmas/trees-and-decorations" data-option="WEBCAT^Christmas Ornaments, Christmas Decorations">CHRISTMAS ORNAMENTS</button>
          
          </div>

          <div class="${ID}-option-festive-clothing">
          
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="festive" data-catcode="HOF_XMASJUMPERS" data-stageurl="/christmas/clothing/christmas-jumpers" data-option="">CHRISTMAS JUMPERS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="festive" data-catcode="HOF_XMASDRESSES" data-stageurl="/christmas/clothing/christmas-dresses" data-option="">CHRISTMAS DRESSES</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="festive" data-catcode="HOF_XMASPJS" data-stageurl="/christmas/clothing/christmas-pyjamas" data-option="">CHRISTMAS PYJAMAS</button>
          
          </div>

          <div class="${ID}-option-festive-christmas-countdown">
          
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="festive" data-catcode="HOF_XMASADVCAL" data-stageurl="/christmas/trees-and-decorations/advent-calendars" data-option="">ADVENT CALENDARS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="festive" data-catcode="HOF_XMASSTOCKINGS" data-stageurl="/christmas/trees-and-decorations/stocking-and-sacks" data-option="">STOCKINGS &amp; SACKS</button>
            
          </div>    
          
          <!-- fly -->
          <div class="${ID}-option-fly-accessories">
          
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fly" data-catcode="HOF_4075KIDSHATS" data-stageurl="/accessories/kids-hats" data-option="">HATS &amp; SCARVES</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fly" data-catcode="HOF_4071KIDSBAGS" data-stageurl="/accessories/kids-bags" data-option="">HANDBAGS &amp; BACKPACKS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fly" data-catcode="HOF_4084KIDSSOCKSTIGHTS" data-stageurl="/kids-and-baby/kids-socks-and-tights/" data-option="WEBSTYLE^Novelty Socks">NOVELTY SOCKS</button>
          
          </div>

          <div class="${ID}-option-fly-clothing">
          
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fly" data-catcode="HOF_5108KIDSTOPSTSHIRTS" data-stageurl="/kids-and-baby/kids-tops-and-t-shirts/" data-option="">TOPS &amp; T-SHIRTS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fly" data-catcode="HOF_KIDSHOODIESSWEA" data-stageurl="/kids-and-baby/kids-hoodies-and-sweatshirts/" data-option="">HOODIES &amp; SWEATSHIRTS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fly" data-catcode="HOF_5107KIDSKNITWEAR" data-stageurl="/kids-and-baby/kids-knitwear/" data-option="">KNITWEAR</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fly" data-catcode="HOF_5100KIDSJEANS" data-stageurl="/kids-and-baby/kids-jeans/" data-option="">JEANS</button>
          
          </div>

          <div class="${ID}-option-fly-shoes">
          
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fly" data-catcode="HOF_4172KIDSBOOTS" data-stageurl="/shoes-and-boots/kids-boots" data-option="">BOOTS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fly" data-catcode="HOF_4182KWTRAINERS" data-stageurl="/shoes-and-boots/kids-trainers" data-option="">TRAINERS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fly" data-catcode="HOF_4172KIDSBOOTS" data-stageurl="/shoes-and-boots/kids-boots/wellies" data-option="WEBSTYLE^Wellies">WELLIES</button>
          
          </div>    

          <div class="${ID}-option-fly-gadgets">
          
          <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fly" data-catcode="HOF_GAMESANDCONSOLE" data-stageurl="/electricals/games-and-consoles" data-option="">VIDEO GAMES</button>
          <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fly" data-catcode="HOF_4278ACTIONFIGURESPLAYSETS" data-stageurl="/kids-and-baby/action-figures-and-playsets" data-option="">ACTION FIGURES &amp; PLAYSETS</button>
          <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fly" data-catcode="HOF_4273GAMESPUZZLES" data-stageurl="/kids-and-baby/games-and-puzzles" data-option="">GAMES &amp; PUZZLES</button>
          <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fly" data-catcode="HOF_4288ROLLERSKATESSKATESHOES" data-stageurl="/kids-and-baby/roller-skates-and-skate-shoes" data-option="">ROLLER SKATES &amp; SKATE SHOES</button>
          
          </div>
          
          <!-- fierce -->
          <div class="${ID}-option-fierce-accessories">
          
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fierce" data-catcode="HOF_193HANDBAGS" data-stageurl="/bags-and-luggage/handbags" data-option="">HANDBAGS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fierce" data-catcode="HOF_5083WOMENSSCARVES" data-stageurl="/accessories/womens-scarves" data-option="">SCARVES</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fierce" data-catcode="HOF_1820NECKLACES" data-stageurl="/accessories/necklaces" data-option="">NECKLACES</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fierce" data-catcode="HOF_1823RINGS" data-stageurl="/accessories/rings" data-option="">RINGS</button>
          
          </div>

          <div class="${ID}-option-fierce-clothing">
          
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fierce" data-catcode="HOF_301DRESSES" data-stageurl="/women/dresses" data-option="">DRESSES</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fierce" data-catcode="HOF_300COATSJACKETS" data-stageurl="/women/coats-and-jackets" data-option="">COATS &amp; JACKETS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fierce" data-catcode="HOF_3020LOUNGEWEAR" data-stageurl="/women/loungewear" data-option="">LOUNGEWEAR</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fierce" data-catcode="HOF_310TOPS" data-stageurl="/women/tops" data-option="">TOPS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fierce" data-catcode="HOF_315LINGERIE" data-stageurl="/women/lingerie" data-option="">LINGERIE</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fierce" data-catcode="HOF_307SKIRTS" data-stageurl="/women/skirts" data-option="">SKIRTS</button>
          
          </div>

          <div class="${ID}-option-fierce-shoes">
          
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fierce" data-catcode="HOF_HEELS" data-stageurl="/shoes-and-boots/heels" data-option="">HEELS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fierce" data-catcode="HOF_4170WOMENSBOOTS" data-stageurl="/shoes-and-boots/ladies-boots/ankle-boots" data-option="WEBSTYLE^Ankle Boots">ANKLE BOOTS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fierce" data-catcode="HOF_4170WOMENSBOOTS" data-stageurl="/shoes-and-boots/ladies-boots/knee-high-boots" data-option="WEBSTYLE^Knee High Boots">KNEE HIGH BOOTS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fierce" data-catcode="HOF_4180WWTRAINERS" data-stageurl="/shoes-and-boots/ladies-trainers" data-option="">TRAINERS</button>
          
          </div>    

          <div class="${ID}-option-fierce-beauty">
          
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fierce" data-catcode="HOF_XMASGIFTS" data-stageurl="/christmas/christmas-gifts" data-option="WEBCAT^Moisturisers">FOUNDATION</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fierce" data-catcode="HOF_XMASGIFTS" data-stageurl="/christmas/christmas-gifts" data-option="WEBCAT^Lip Colour">LIPS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="fierce" data-catcode="HOF_XMASGIFTS" data-stageurl="/christmas/christmas-gifts" data-option="WEBCAT^Eye Shadows and Mascara">EYES</button>
          
          </div>   

          <!-- flashy -->
          <div class="${ID}-option-flashy-accessories">
          
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="flashy" data-catcode="HOF_2024MENSBELTS" data-stageurl="/accessories/mens-belts" data-option="">BELTS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="flashy" data-catcode="HOF_2029MENSSUNGLASSES" data-stageurl="/accessories/mens-sunglasses" data-option="">SUNGLASSES</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="flashy" data-catcode="HOF_16ACCESSORIES" data-stageurl="/accessories/" data-option="WEBCAT^Gloves, Scarves">GLOVES &amp; SCARVES</button>
          
          </div>

          <div class="${ID}-option-flashy-suits">
          
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="flashy" data-catcode="HOF_2130COMPLETESUITS" data-stageurl="/men/suits" data-option="">COMPLETE SUIT</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="flashy" data-catcode="HOF_2131SUITJACKETSBLAZERS" data-stageurl="/men/suit-jackets" data-option="">SUIT JACKETS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="flashy" data-catcode="HOF_2041FORMALSHIRTS" data-stageurl="/men/formal-shirts" data-option="">FORMAL SHIRTS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="flashy" data-catcode="HOF_189TIES" data-stageurl="/accessories/ties" data-option="">TIES &amp; BOW TIES</button>
          
          </div>

          <div class="${ID}-option-flashy-shoes-boots">
          
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="flashy" data-catcode="HOF_4161MENSSHOES" data-stageurl="/shoes-and-boots/mens-shoes" data-option="">SHOES</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="flashy" data-catcode="HOF_4171MENSBOOTS" data-stageurl="/shoes-and-boots/mens-boots" data-option="">BOOTS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="flashy" data-catcode="HOF_4181MWTRAINERS" data-stageurl="/shoes-and-boots/mens-trainers" data-option="">TRAINERS</button>
          
          </div>    

          <div class="${ID}-option-flashy-clothing">
          
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="flashy" data-catcode="HOF_201KNITWEAR" data-stageurl="/men/knitwear" data-option="">KNITWEAR</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="flashy" data-catcode="HOF_207TOPSTSHIRTS" data-stageurl="/men/tops-and-t-shirts" data-option="">TOPS &amp; T-SHIRTS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="flashy" data-catcode="HOF_200JEANS" data-stageurl="/men/jeans" data-option="">JEANS</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option" data-parent="flashy" data-catcode="HOF_18SPORTSFITNESS" data-stageurl="/sport-and-fitness/mens" data-option="">SPORTSWEAR</button>
          
          </div> 
        
        </div>

        <div class="${ID}-quiz--stage ${ID}-quiz--stage3 ${stageNumber == 3 ? 'active' : ''}">
        
          <div class="${ID}-fabulous-price-range">
          
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-25">UNDER £25</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-50">UNDER £50</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-100">UNDER £100</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-150">UNDER £150</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="150-10000">OVER £150</button>
          
          </div>

          <div class="${ID}-fun-price-range">
          
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-10">UNDER £10</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-20">UNDER £20</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-30">UNDER £30</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-40">UNDER £40</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="40-10000">OVER £40</button>
          
          </div>

          <div class="${ID}-festive-price-range">
          
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-20">UNDER £20</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-40">UNDER £40</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-60">UNDER £60</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-80">UNDER £80</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="80-10000">OVER £80</button>
          
          </div>

          <div class="${ID}-fly-price-range">
          
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-25">UNDER £25</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-50">UNDER £50</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-100">UNDER £100</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-150">UNDER £150</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="150-10000">OVER £150</button>
          
          </div>

          <div class="${ID}-fierce-price-range">
          
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-25">UNDER £25</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-50">UNDER £50</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-100">UNDER £100</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-150">UNDER £150</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="150-10000">OVER £150</button>
          
          </div>

          <div class="${ID}-flashy-price-range">
          
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-25">UNDER £25</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-50">UNDER £50</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-100">UNDER £100</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="0-150">UNDER £150</button>
            <button class="${ID}-quiz--button ${ID}-price-option" data-option="150-10000">OVER £150</button>
          
          </div>
        
        </div>

        <div class="${ID}-quiz--stage ${ID}-quiz--stage4 ${stageNumber == 4 ? 'active' : ''} calculating">
        
          <div class="${ID}-quiz--noproducts">No Products Available, Sorry</div>
          <div class="${ID}-quiz--loading">Calculating Results<div class="ellipsis"><span class="ellipsis-anim"><span>.</span><span>.</span><span>.</span></span></div></div>

          <div class="${ID}-quiz--stage4header">

            <div class="${ID}-quiz--buttonholder ${ID}-quiz--retake">
              <button class="${ID}-hidden ${ID}-quiz--link"> <span class="${ID}-button-text-inner">Retake Quiz</span> </button>
            </div>

            <h2> Your top results </h2>

            <div class="${ID}-quiz--buttonholder ${ID}-quiz--backtobrowse">
              
              <a href="${document.referrer}" id="${ID}-quiz--exit" class="${ID}-hidden ${ID}-quiz--link"><svg width="20" fill="#AC9751" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" preserveAspectRatio="none" x="0px" y="0px" viewBox="0 0 100 100"><path fill="#AC9751" stroke="none" d=" M 81.75 21.75 Q 82.503515625 21.0390625 82.5 20 82.503515625 18.9607421875 81.75 18.2 81.0390625 17.4962890625 80 17.5 78.9607421875 17.4962890625 78.2 18.2 L 50 46.45 21.75 18.2 Q 21.0390625 17.4962890625 20 17.5 18.9607421875 17.4962890625 18.2 18.2 17.4962890625 18.9607421875 17.5 20 17.4962890625 21.0390625 18.2 21.75 L 46.45 50 18.2 78.2 Q 17.4962890625 78.9607421875 17.5 80 17.4962890625 81.0390625 18.2 81.75 18.9607421875 82.503515625 20 82.5 21.0390625 82.503515625 21.75 81.75 L 50 53.55 78.2 81.75 Q 78.9607421875 82.503515625 80 82.5 81.0390625 82.503515625 81.75 81.75 82.503515625 81.0390625 82.5 80 82.503515625 78.9607421875 81.75 78.2 L 53.55 50 81.75 21.75 Z"></path></svg> <span class="${ID}-button-text-inner">Back to Browsing</span> </a>
            </div>

          </div>

          <div class="${ID}-quiz--stage4results">



          </div>
          
        
        </div>
      
      
      
      </div>

      ${window.outerWidth >= 768 ? `<div class="${ID}-quiz--progress">
      
        <div class="${ID}-quiz--progressinner" data-percent="0"><span class="${ID}-percent">0%</span></div>
      
      </div>` : ``}

      <div class="${ID}-quiz--restart ${ID}-hidden">
      
        <button class="${ID}-quiz--button">RESTART GIFT FINDER</button>
      
      </div>
    
    
    </div>
  
  `;

  let quizInsertionPoint = document.querySelector('.ContentWrapper');

  quizInsertionPoint.insertAdjacentHTML('afterbegin', quizHTML);

  stage0 = document.querySelector(`.${ID}-quiz--stage0`);
  stage1 = document.querySelector(`.${ID}-quiz--stage1`);
  stage2 = document.querySelector(`.${ID}-quiz--stage2`);
  stage3 = document.querySelector(`.${ID}-quiz--stage3`);
  stage4 = document.querySelector(`.${ID}-quiz--stage4`);
  quizProgressBarInner = document.querySelector(`.${ID}-quiz--progressinner`);
  restartButton = document.querySelector(`.${ID}-quiz--restart`);
  quizHeader = document.querySelector(`.${ID}-quiz--header`);
  quizPreviousButton = document.getElementById(`${ID}-quiz--previous`);
  // Event Handlers

  // mobile advice handler

  if(window.outerWidth < 767) {
    let mobileAdviceButton = document.getElementById(`${ID}-quiz--mobileadvice`);
    mobileAdviceButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      fireEvent(`Click - user hits the mobile info button on stage1`)
      let allOptionButtons = document.querySelectorAll(`.${ID}-quiz--button`);
      [].slice.call(allOptionButtons).forEach((option) => {
        option.classList.add('show-explainer');
      });
  
      setTimeout(() => {
        [].slice.call(allOptionButtons).forEach((option) => {
          option.classList.remove('show-explainer');
        });
      }, 3000);
    });
  }
  

  // go backwards handler

  let backwardsButton = document.getElementById(`${ID}-quiz--previous`);
  backwardsButton.addEventListener('click', (e) => {
    e.preventDefault();
    stageNumber --;
    moveBackwardsStage();

  });

  // quit event handler 

  let quitButton = document.getElementById(`${ID}-quiz--exit`);
  quitButton.addEventListener('click', (e) => {
    fireEvent(`Click - user has clicked on the exit button to go to ${e.currentTarget.href}`);
  });

  // Stage 0 event handler

  let stage0Buttons = document.querySelectorAll(`.${ID}-gifttype-option`);

  [].slice.call(stage0Buttons).forEach((button) => {

    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      stageNumber = 1;
      let option = e.currentTarget.getAttribute('data-option');
      stage1.setAttribute('data-active', option);
      localStorage.setItem(`${ID}-gifttype-option`, e.target.getAttribute('data-option'));
      moveForwardStage();
      fireEvent("Visible - user has got to stage 1 and selected: " + e.target.getAttribute('data-option') + " for their gift type");

    }, false)

  })

  // Stage 1 event handler

  let stage1Buttons = document.querySelectorAll(`.${ID}-category-option`);

  [].slice.call(stage1Buttons).forEach((button) => {

    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      stageNumber = 2;
      let option = e.currentTarget.getAttribute('data-option');
      stage2.setAttribute('data-active', option);
      localStorage.setItem(`${ID}-category-option`, e.target.getAttribute('data-option'));
      localStorage.setItem(`${ID}-category-filter`, e.target.getAttribute('data-filter'));
      moveForwardStage();
      fireEvent("Visible - user has got to stage 2 and selected: " + e.target.getAttribute('data-option') + " for their category");

    }, false)

  })

  // Stage 2 event handler

  let stage2Buttons = document.querySelectorAll(`.${ID}-catlevtwo-option`);

  [].slice.call(stage2Buttons).forEach((button) => {

    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      stageNumber = 3;
      let option = e.currentTarget.getAttribute('data-parent');
      stage3.setAttribute('data-active', option);
      localStorage.setItem(`${ID}-catlevtwo-option`, e.target.getAttribute('data-option'));
      localStorage.setItem(`${ID}-catlevtwo-catcode`, e.target.getAttribute('data-catcode'));
      localStorage.setItem(`${ID}-catlevtwo-stageurl`, e.target.getAttribute('data-stageurl'));
      moveForwardStage();
      fireEvent("Visible - user has got to stage 3 and selected: " + e.target.getAttribute('data-option') + " for their 2nd level category");

    }, false)

  })

  // Stage 3 event handler

  let stage3Buttons = document.querySelectorAll(`.${ID}-price-option`);

  [].slice.call(stage3Buttons).forEach((button) => {
 
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      stageNumber = 4;
      let option = e.currentTarget.getAttribute('data-option');
      stage4.setAttribute('data-active', option);
      localStorage.setItem(`${ID}-price-option`, e.target.getAttribute('data-option'));
      moveForwardStage();
      fireEvent("Visible - user has got to stage 4 and selected: " + e.target.getAttribute('data-option') + " for their price range");

    }, false)

  })

}

export default () => {
  setup();

  logMessage(ID + " Variation: " + VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...
  if (window.location.href.indexOf('gift-finder') > -1) {
    document.documentElement.classList.add(`${ID}-quiz-started`);
    buildQuiz();
  }

};
