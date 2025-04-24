/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 //import debounce from 'lodash/debounce';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events, logMessage, pollerLite, observer } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;
let stageNumber = 0;
let mySwiper, stage0, stage1, stage2, stage4, quizBody, quizProgressBarInner, backwardsButton, theQuiz;

let stageData = [
    { stageHeader: "Who are you shopping for?" },
    { stageHeader: "What do you have in mind? " },
    { stageHeader: "What is your price range?" },
    { stageHeader: "Your results" },
    { stageHeader: "Just For You" },
];

// let categoryPages = [
//     '/beauty/skincare/eyes'
// ]



const initiateSlider = () => {

    // Run slick
    let slider = document.querySelector(`.${ID}-quiz--justforyou`);
    slider.classList.add('swiper-active');

    mySwiper = new window.Swiper(slider, {
        // Optional parameters
        init: false,
        loop: false,
        // If we need pagination
        slidesPerView: 4,
        slidesPerGroup: 1,
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

    document.querySelector(`.${ID}-quiz--stage4`).classList.remove('calculating');

}

const checkCurrency = () => {

    let currency = document.querySelector('.currencySelector .languageSwitcherRadioButton:checked').value;
    let currencyExtension = "£";
    if (currency == 'GBP') {
        currencyExtension = '£';
    } else if (currency == 'EUR') {
        currencyExtension = '€';
    } else if (currency == 'USD') {
        currencyExtension = '$';
    }

    return currencyExtension;

}

const processRecs = (strategy) => {
    return new Promise((resolve) => {
        window.DYO.recommendationWidgetData(strategy, { maxProducts: 20 }, function (err, data) {
            let allCurrItems = data.slots;
            let insertionPoint = document.querySelector(`.${ID}-quiz--stage4 .swiper-wrapper`);

            allCurrItems.map((currItem) => {
                let item = currItem.item;
                let itemHTML = `
                
                    <a href="${item.url}" class="swiper-slide ${ID}-slide">
                
                        <div class="${ID}-slide--image">
                            <img src="${item.image_url}" alt="${item.name}" />
                        </div>

                        <div class="${ID}-slide--info">
                            <p class="${ID}-slide--infobrand">${item.brand}</p>
                            <p class="${ID}-slide--infoname">${item.name}</p>
                            <p class="${ID}-slide--infoprice">${checkCurrency()}${item.price.toFixed(2)}</p>
                        </div>

                    </a>
                `;

                insertionPoint.insertAdjacentHTML('beforeend', itemHTML);

            });

            let allSlides = document.querySelectorAll(`.${ID}-slide`);
            [].slice.call(allSlides).forEach((slide) => {

                slide.addEventListener('click', (e) => {
                    quizBody.classList.add(`${ID}-calculating`);
                    quizProgressBarInner.setAttribute('data-percent', 100);
                    quizProgressBarInner.innerText = "100%";
                    fireEvent(`Click - user has clicked on JFY item going to href: ${e.currentTarget.href}`, true);

                });

            });


            resolve();
        });
    });
}

const checkProgress = () => {


    let quizHeader = document.querySelector(`.${ID}-quiz--header`);
    let quizHeaderH2 = quizHeader.querySelector('h2');

    quizHeaderH2.innerText = `${stageData[stageNumber].stageHeader}`;

    if (stageNumber == 0) {
        quizProgressBarInner.setAttribute('data-percent', 5);
        quizProgressBarInner.innerText = "5%";
        backwardsButton.classList.remove('active');

    } else if (stageNumber == 1) {
        backwardsButton.classList.add('active');
        quizProgressBarInner.setAttribute('data-percent', 33);
        quizProgressBarInner.innerText = "33%";



    } else if (stageNumber == 2) {
        quizProgressBarInner.setAttribute('data-percent', 66);
        quizProgressBarInner.innerText = "66%";

        stage2.classList.add('calculating');

        let requestURL = "https://www.flannels.com" + localStorage.getItem(`${ID}-category-option`).toLowerCase();

        const request = new XMLHttpRequest();
        request.open('GET', requestURL, true);
        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                const data = request.responseText;
                // const sizeVariantId = request.responseURL;
                if (data) {
                    let brandPage = document.createElement('div');

                    brandPage.classList.add('hidden')
                    brandPage.id = "no-visual";
                    brandPage.innerHTML = data;

                    // Get page code

                    let allPriceOptions = brandPage.querySelectorAll('.APRI');
                    let priceHolder = document.querySelector(`.${ID}-quiz--pricerange`);
                    priceHolder.innerHTML = "";
                    let displayFilter = true;
                    [].slice.call(allPriceOptions).forEach((option) => {
                        let filter = option.querySelector('.SelectableFilter').getAttribute('data-item');
                        let buttonHTML = `<button class="${ID}-quiz--button ${ID}-price-option" data-price="${filter}">${option.getAttribute('data-productname')}</button>`;

                        if (filter == "APRI^£0 to £10" || filter == "APRI^£10 to £20") {
                            // do nothing
                            displayFilter = false;
                        } else if (filter == "APRI^£20 to £50") {
                            buttonHTML = `<button class="${ID}-quiz--button ${ID}-price-option" data-price="APRI^£0 to £10,£10 to £20,£20 to £50">£0 to £50</button>`;
                            displayFilter = true;
                        } else {
                            displayFilter = true;
                        }

                        if (displayFilter == true) {

                            priceHolder.insertAdjacentHTML('beforeend', buttonHTML);
                        }


                    });

                    stage2.classList.remove('calculating');

                    // Stage 2 event handler 

                    let stage2Buttons = document.querySelectorAll(`.${ID}-price-option`);

                    [].slice.call(stage2Buttons).forEach((button) => {

                        button.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            stageNumber = 3;
                            moveForwardStage();

                            quizBody.classList.add(`${ID}-calculating`);
                            quizProgressBarInner.setAttribute('data-percent', 100);
                            quizProgressBarInner.innerText = "100%";
                            let stageURL = localStorage.getItem(`${ID}-category-option`);
                            let pricerange = e.target.getAttribute('data-price');

                            let fullURL = `https://www.flannels.com${stageURL}#dcp=1&dppp=100&OrderBy=rank&Filter=${encodeURIComponent(pricerange)}`;
                            logMessage('Full URL used: ' + fullURL);
                            fireEvent("Visible - user has got to stage 3 and selected: " + e.target.innerText + " for their price");
                            localStorage.setItem(`${ID}-last-url`, fullURL);
                            window.location.href = fullURL;

                        }, false)

                    })



                }
            }
        };
        request.onerror = () => {
            // There was a connection error of some sort
        };
        request.send();

    } else if (stageNumber == 3) {
        quizProgressBarInner.setAttribute('data-percent', 100);
        quizProgressBarInner.innerText = "100%";



    } else if (stageNumber == 4) {
        backwardsButton.classList.add('active');
        quizProgressBarInner.setAttribute('data-percent', 50);
        quizProgressBarInner.innerText = "50%";
        processRecs(157700).then(() => {

            setTimeout(() => {
                initiateSlider();
            }, 1000);
            

        });

    }


}

const closeQuiz = () => {

    stageNumber = 0;
    quizBody.classList.remove(`${ID}-calculating`);
    moveBackwardsStage();
    quizProgressBarInner.setAttribute("data-percent", 5);
    quizProgressBarInner.innerText = "0%";
    let allStages = document.querySelectorAll(`.${ID}-quiz--stage`);
    [].slice.call(allStages).forEach((stage) => {
        stage.classList.remove("active");
    });
    stage0.classList.add("active");
    theQuiz.classList.remove(`${ID}-active`);
    document.documentElement.classList.remove(`${ID}-noscroll`);


}

const moveForwardStage = () => {
    const header = document.querySelector(`.${ID}-quiz--header`);
    header.classList.remove(`stage${stageNumber-1}`);
    header.classList.add(`stage${stageNumber}`);
    checkProgress();
    if (stageNumber == 0) {
        // do stage 0 stuff
    } else if (stageNumber == 1) {
        // do stage 1 stuff
        stage0.classList.remove('active');
        stage1.classList.add('active');

    } else if (stageNumber == 2) {
        // do stage 2 stuff
        stage1.classList.remove('active');
        stage2.classList.add('active');
    } else if (stageNumber == 4) {

        stage0.classList.remove('active');
        stage4.classList.add('active');
    }
}

const moveBackwardsStage = () => {
    const header = document.querySelector(`.${ID}-quiz--header`);
    header.classList.remove(`stage${stageNumber+1}`);
    header.classList.add(`stage${stageNumber}`);
    quizBody.classList.remove(`${ID}-calculating`);
    checkProgress();

    if (stageNumber == 0) {

        // do stage 0 stuff

        stage0.classList.add('active');
        stage1.classList.remove('active');
        stage4.classList.remove('active');

    } else if (stageNumber == 1) {

        // do stage 1 stuff
        stage1.classList.add('active');
        stage2.classList.remove('active');
    } else if (stageNumber == 2) {

        // do stage 2 stuff
        stage2.classList.add('active');

    }
    else if (stageNumber == 4) {

        // do stage 2 stuff
        stage0.classList.add('active');
        stage4.classList.remove('active');

    }
}

const buildQuiz = (placement) => {

    let quizHTML = `
  
    <div class="${ID}-quiz ${window.location.href.indexOf('/just-for-you') > -1 ? `${ID}-finder-jfy` : `${ID}-finder-homepage`} ${placement == "url" ? `${ID}-finder-url` : `${ID}-finder-modal`}">
    
      <div class="${ID}-quiz--header">
      
        <a href="#" id="${ID}-quiz--exit" class="${ID}-quiz--exit"> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L22 22" stroke="black" stroke-width="3"/><path d="M2 22L22 2" stroke="black" stroke-width="3"/></svg></a>

        <h2> Who are you shopping for? </h2>      
      
      </div>
    
      <div class="${ID}-quiz--progress">
      
        <div class="${ID}-quiz--progressinner" data-percent="5">5%</div>
      
      </div>

      <button id="${ID}-quiz--backbutton" class="${ID}-quiz--backbutton">
        <svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.46155 15.4351L2 8.21753L7.46155 1" stroke="black" stroke-width="2"/></svg>
        <span class="${ID}-quiz--backbuttontext">Back</span>      
      </button>

      <div class="${ID}-quiz--body">
        <div class="${ID}-quiz--stage ${ID}-quiz--stage0 ${stageNumber == 0 ? 'active' : ''}">
          <button class="${ID}-quiz--button ${ID}-gender-option option-her" data-option="option-him">HIM</button>
          <button class="${ID}-quiz--button ${ID}-gender-option option-him" data-option="option-her">HER</button>
          <button class="${ID}-quiz--button ${ID}-gender-option option-junior" data-option="option-junior">JUNIOR</button>
          <button class="${ID}-quiz--button ${ID}-gender-option option-jfy" data-option="option-jfy">Just for You</button>
        </div>

        <div class="${ID}-quiz--stage ${ID}-quiz--stage1 ${stageNumber == 1 ? 'active' : ''}">
        
          <div class="${ID}-option-him">
            <button class="${ID}-quiz--button ${ID}-category-option option-fragrance" data-stageurl="/beauty/fragrance/men" data-catcode="FLAN_TOPMENFRA" data-catoption="">FRAGRANCE</button>
            <button class="${ID}-quiz--button ${ID}-category-option option-accessories" data-stageurl="/men/accessories" data-catcode="FLAN_TOPMENACC" data-catoption="">ACCESSORIES</button>
            <button class="${ID}-quiz--button ${ID}-category-option option-clothing" data-stageurl="/men/clothing" data-catcode="FLAN_TOPMENCL" data-catoption="">CLOTHING</button>
          </div>

          <div class="${ID}-option-her">
            <button class="${ID}-quiz--button ${ID}-category-option option-fragrance" data-stageurl="/beauty/fragrance/women" data-catcode="FLAN_TOPWOMFRA" data-catoption="">FRAGRANCE</button>
            <button class="${ID}-quiz--button ${ID}-category-option option-accessories" data-stageurl="/women/accessories" data-catcode="FLAN_TOPWOMACC" data-catoption="">ACCESSORIES</button>
            <button class="${ID}-quiz--button ${ID}-category-option option-beauty" data-stageurl="/beauty/makeup" data-catcode="FLAN_TOPWOMACCMAKE" data-catoption="">BEAUTY</button>
            <button class="${ID}-quiz--button ${ID}-category-option option-clothing" data-stageurl="/women/clothing" data-catcode="FLAN_TOPWOMCL" data-catoption="">CLOTHING</button>
          </div>

          <div class="${ID}-option-junior">
            <button class="${ID}-quiz--button ${ID}-category-option option-girls-clothing" data-stageurl="/kids/girls/clothing" data-catcode="FLAN_TOPWOMFRA" data-catoption="">GIRLS CLOTHING</button>
            <button class="${ID}-quiz--button ${ID}-category-option option-girls-accessories" data-stageurl="/kids/girls/accessories" data-catcode="FLAN_TOPWOMACC" data-catoption="">GIRLS ACCESSORIES</button>
            <button class="${ID}-quiz--button ${ID}-category-option option-boys-clothing" data-stageurl="/kids/boys/clothing" data-catcode="FLAN_TOPWOMCL" data-catoption="">BOYS CLOTHING</button>
            <button class="${ID}-quiz--button ${ID}-category-option option-boys-accessories" data-stageurl="/kids/boys/accessories" data-catcode="FLAN_TOPWOMCL" data-catoption="">BOYS ACCESSORIES</button>
            <button class="${ID}-quiz--button ${ID}-category-option option-baby-clothing" data-stageurl="/kids/baby/clothing" data-catcode="FLAN_TOPWOMCL" data-catoption="">BABY CLOTHING</button>
            <button class="${ID}-quiz--button ${ID}-category-option option-baby-accessories" data-stageurl="/kids/baby/accessories" data-catcode="FLAN_TOPWOMCL" data-catoption="">BABY ACCESSORIES</button>
          </div>
          
        </div>

        <div class="${ID}-quiz--stage ${ID}-quiz--stage2 ${stageNumber == 2 ? 'active' : ''} calculating">
        
          <p> Getting Prices... </p>

          <div class="${ID}-quiz--pricerange">
            
          </div>     
          
          <button id="${ID}-quiz--skipstep" class="${ID}-quiz--skipstep">View Results</button>
        
        </div>

        <div class="${ID}-quiz--stage ${ID}-quiz--stage3 ${stageNumber == 3 ? 'active' : ''} calculating">
        
          <p> Getting Products... </p>
               
        </div>

        <div class="${ID}-quiz--stage ${ID}-quiz--stage4 ${stageNumber == 4 ? 'active' : ''} calculating">
        
          <p> Getting JUST FOR YOU... </p>

          <div class="${ID}-quiz--justforyou swiper-container">
            <div class="${ID}-button ${ID}-button-prev"> <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 1L10 9L1 1" stroke="#000" stroke-width="2"/></svg></div>
            <div class="${ID}-button ${ID}-button-next"> <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 1L10 9L1 1" stroke="#000" stroke-width="2"/></svg></div>
          
            <div class="swiper-wrapper">

            </div>
          </div>          
        
        </div>
    </div>
  
  `;

    let quizInsertionPoint = document.body;
    if(placement == "url") {

        document.querySelector('.ContentWrapper').classList.add(`${ID}-url-quiz-wrapper`);
        quizInsertionPoint = document.querySelector('.ContentWrapper');
    }
    

    quizInsertionPoint.insertAdjacentHTML('afterbegin', quizHTML);
    theQuiz = document.querySelector(`.${ID}-quiz`);
    stage0 = document.querySelector(`.${ID}-quiz--stage0`);
    stage1 = document.querySelector(`.${ID}-quiz--stage1`);
    stage2 = document.querySelector(`.${ID}-quiz--stage2`);
    stage4 = document.querySelector(`.${ID}-quiz--stage4`);
    quizBody = document.querySelector(`.${ID}-quiz--body`);
    quizProgressBarInner = document.querySelector(`.${ID}-quiz--progressinner`);
    backwardsButton = document.getElementById(`${ID}-quiz--backbutton`);
    // Event Handlers

    // Go back handler
    backwardsButton.addEventListener('click', (e) => {
        e.preventDefault();
        if(stageNumber == 4) {
            stageNumber = 0;
        } else {
            stageNumber--;
        }
        
        moveBackwardsStage();
        fireEvent(`Click - user has clicked the back button to go to stage ${stageNumber + 1}`);
    });

    // Stage 0 event handler

    let stage0Buttons = document.querySelectorAll(`.${ID}-gender-option`);

    [].slice.call(stage0Buttons).forEach((button) => {

        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            let dataOption = e.target.getAttribute('data-option');
            if(dataOption == "option-jfy") {
                stageNumber = 4;
                moveForwardStage();

                fireEvent("Visible - user has got to stage 1 and selected: Just for You");
            } else {
                localStorage.setItem(`${ID}-gender-option`, e.target.getAttribute('data-option'));
                stage1.setAttribute('data-active', e.target.getAttribute('data-option'))
                stageNumber = 1;
                moveForwardStage();

                fireEvent("Visible - user has got to stage 1 and selected: " + e.target.getAttribute('data-option') + " for their gender");
            }
            



            

        }, false)

    })

    // Stage 1 event handler

    let stage1Buttons = document.querySelectorAll(`.${ID}-category-option`);

    [].slice.call(stage1Buttons).forEach((button) => {

        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            localStorage.setItem(`${ID}-category-option`, e.target.getAttribute('data-stageurl'));
            localStorage.setItem(`${ID}-catcode-option`, e.target.getAttribute('data-catcode'));

            stageNumber = 2;
            moveForwardStage();



            fireEvent("Visible - user has got to stage 2 and selected: " + e.target.innerText + " for their category");

        }, false)

    })

    let exitButton = document.getElementById(`${ID}-quiz--exit`);
    exitButton.addEventListener('click', (e) => {
        
        e.preventDefault();
        
        if(placement == "url") {
            window.location.href = document.referrer;
        } else {
            closeQuiz();
        }

        fireEvent('Click - user has clicked the exit button to close the quiz');
        
    });

    document.documentElement.addEventListener('click', (e) => {
        if(e.target.classList.contains(`${ID}-noscroll`)) {
            closeQuiz();
            fireEvent('Click - user has clicked outside the modal to close the quiz');
        }
    });

    let skipStepButton = document.querySelector(`.${ID}-quiz--skipstep`);
    skipStepButton.addEventListener('click', () => {
        quizBody.classList.add(`${ID}-calculating`);
        quizProgressBarInner.setAttribute('data-percent', 100);
        quizProgressBarInner.innerText = "100%";
        let stageURL = localStorage.getItem(`${ID}-category-option`);
        let fullURL = `https://www.flannels.com${stageURL}`;
        localStorage.setItem(`${ID}-last-url`, fullURL);
        window.location.href = fullURL;
    })

}

// const addPLPTrigger = () => {

//     if(!document.querySelector(`.${ID}-quiz--catpagelink`) && document.getElementById('navlist').querySelectorAll('li').length > 16) {
//         let placeButtonHTML = `
//             <li class="${ID}-quiz--catpagelink">
            
//                 <button id="${ID}-quiz--placebutton" class="${ID}-quiz--placebutton ${ID}-jfybutton">
//                     <span>Gift Finder</span>
//                     <p> Discover Now </p>
//                 </button>  
            
//             </li>
//         `;

//         document.getElementById(`navlist`).querySelector('li:nth-child(16)').insertAdjacentHTML('afterend', placeButtonHTML);

//         document.getElementById(`${ID}-quiz--placebutton`).addEventListener('click', () => {
//             document.documentElement.classList.add(`${ID}-noscroll`);
//             document.querySelector(`.${ID}-quiz`).classList.add(`${ID}-active`);
//             fireEvent('Click - user has clicked the gift finder button on the Christmas Page');
//         });

//         checkElemHeight();

//         window.addEventListener(
//             "resize",
//             debounce(
//                 () => {
//                     checkElemHeight();
//                 },
//                 250,
//                 { trailing: true }
//             )
//         );
//     }
    
    

// }

// const checkElemHeight = () => {
//     let nextElemHeight = parseInt(document.querySelector(`.${ID}-quiz--catpagelink`).nextElementSibling.getBoundingClientRect().height);
//     document.querySelector(`.${ID}-quiz--catpagelink`).style.height = nextElemHeight + "px";
// }

const trackAllItems = () => {

    let navlist = document.getElementById('navlist');
    let allClickableItems = navlist.querySelectorAll('li');
    [].slice.call(allClickableItems).forEach((item) => {
        item.addEventListener('click', () => {
            fireEvent('Click - user has clicked on an item on the PLP directly after using the gift finder');
        });
    });
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
    
    document.documentElement.classList.add(`${ID}-experiment-begins`);

    if(window.location.href.indexOf('/gift-finder') > -1 && VARIATION == 2) {
        buildQuiz('url')
    } else {
        buildQuiz('modal');


        // PLP Page Triggers - removed at client request
        // if(document.body.classList.contains('flanProdList')) {

        //     pollerLite(['#navlist'], function () {

        //         if(categoryPages.find(page => window.location.href.indexOf(page) > -1)) {
        //             addPLPTrigger();
        //         }

        //         observer.connect(document.getElementById('navlist'), function () {
        //             if(categoryPages.find(page => window.location.href.indexOf(page) > -1)) {
        //                 addPLPTrigger();
        //             }
        //         }, {
        //         config: {
        //             attibutes: true,
        //             childList: true,
        //             subTree: true
        //         }
        //         });
        //     });



        // }
    

        if(window.location.href.indexOf('/just-for-you') > -1) {
            pollerLite([`#FLAN-766-vwrv-carousel`], () => {
                let placeButtonHTML = `
                    <button id="${ID}-quiz--placebutton" class="${ID}-quiz--placebutton ${ID}-jfybutton">
                        <span>Gift Finder</span>
                        <p> Discover Now </p>
                    </button>  
                `;
        
                document.getElementById(`FLAN-766-vwrv-carousel`).insertAdjacentHTML('beforebegin', placeButtonHTML);
            
                document.getElementById(`${ID}-quiz--placebutton`).addEventListener('click', () => {
                    document.documentElement.classList.add(`${ID}-noscroll`);
                    document.querySelector(`.${ID}-quiz`).classList.add(`${ID}-active`);
                    fireEvent('Click - user has clicked the gift finder button on the Just for You page');
                });
            });
        } else if(document.body.classList.contains('Home')) {

            pollerLite([`.FLAN_21_Home_4`], () => {
                let placeButtonHTML = `
                    <button id="${ID}-quiz--placebutton" class="${ID}-quiz--placebutton">
                        <span>Gift Finder</span>
                        <p> Discover Now </p>
                    </button>  
                `;
        
                document.querySelector(`.FLAN_21_Home_5`).insertAdjacentHTML('afterend', placeButtonHTML);
            
                document.getElementById(`${ID}-quiz--placebutton`).addEventListener('click', () => {
                    document.documentElement.classList.add(`${ID}-noscroll`);
                    document.querySelector(`.${ID}-quiz`).classList.add(`${ID}-active`);
                    fireEvent('Click - user has clicked the gift finder button on the Homepage');
                });
            }); 

        } else if(window.location.href.indexOf('/christmas') > -1) {

            

            pollerLite([`.FLAN_Christmas22_5 .u-contain`], () => {
                let placeButtonHTML = `
                    <button id="${ID}-quiz--placebutton" class="${ID}-quiz--placebutton ${ID}-xmaspagebutton">
                        <span>Gift Finder</span>
                        <p> Discover Now </p>
                    </button>  
                `;
        
                document.querySelector(`.FLAN_Christmas22_5 .u-contain`).insertAdjacentHTML('afterend', placeButtonHTML);
            
                document.getElementById(`${ID}-quiz--placebutton`).addEventListener('click', () => {
                    document.documentElement.classList.add(`${ID}-noscroll`);
                    document.querySelector(`.${ID}-quiz`).classList.add(`${ID}-active`);
                    fireEvent('Click - user has clicked the gift finder button on the Christmas Page');
                });
            }); 

        } 



        // bottomLinkContainer

        // // place navigation trigger
        if(window.outerWidth < 768) {
            pollerLite(['#mob-outlet'], () => {
                let navQuizTriggerHTML = `

                <li data-id="3820032" id="mob-outlet" class="root mmHasChild has-dropdown  hofGroupI"><a class="${ID}-mobileplacebutton menuitemtext MobMenChevron">Gift Finder</a></li>
                
                `;
                let insertionPoint = document.querySelector('#mob-outlet');
                insertionPoint.insertAdjacentHTML('afterend', navQuizTriggerHTML);

                document.querySelector(`.${ID}-mobileplacebutton`).addEventListener('click', () => {
                    document.documentElement.classList.add(`${ID}-noscroll`);
                    document.querySelector(`.${ID}-quiz`).classList.add(`${ID}-active`);
                    fireEvent('Click - user has clicked the gift finder button in the Nav on mobile');
                });

            });
        } else {
            pollerLite(['#topMenu .SubMenuWrapper'], () => {
                let navQuizTriggerHTML = `
                    <a href="#" id="${ID}-navbutton" class="${ID}-navbutton">GIFT FINDER</a> 
                `;
                document.documentElement.classList.add(`${ID}-nav-item-added`);

                let allSubmenuWrappers = document.querySelectorAll('#topMenu .SubMenuWrapper');
                [].slice.call(allSubmenuWrappers).forEach((subMenu) => {
                    if(!subMenu.closest('li').classList.contains('MenuGroupSports')) {
                        subMenu.querySelector('.Bottom').insertAdjacentHTML('afterbegin', navQuizTriggerHTML);
                    }
                });

                

                [].slice.call(document.querySelectorAll(`.${ID}-navbutton`)).forEach((button) => {
                    button.addEventListener('click', () => {
                        document.documentElement.classList.add(`${ID}-noscroll`);
                        document.querySelector(`.${ID}-quiz`).classList.add(`${ID}-active`);
                        fireEvent('Click - user has clicked the gift finder button in the Nav on desktop');
                    });

                })

                
            });
        }


        
    
    }

    if(document.body.classList.contains('flanProdList') && localStorage.getItem(`${ID}-last-url`) && localStorage.getItem(`${ID}-last-url`) !== "") {

        localStorage.setItem(`${ID}-last-url`, '');

        

        pollerLite(['#navlist'], function () {

            trackAllItems();

            observer.connect(document.getElementById('navlist'), function () {
            trackAllItems();
            }, {
            config: {
                attibutes: true,
                childList: true,
                subTree: true
            }
            });
        });


    }

};