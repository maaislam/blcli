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

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;
let stageNumber = 0;
let mySwiper, stage0, stage1, stage2, stage3, quizProgressBarInner, backwardsButton, theSlider, catLink;

let stageData = [
    { stageHeader: "Who are you shopping for?", stageImageURL: "https://blcro.fra1.digitaloceanspaces.com/FLAN-602/flannels-valentines-gift%20finder-p1-220127-d.jpg" },
    { stageHeader: "What do you have in mind? ", stageImageURL: "https://blcro.fra1.digitaloceanspaces.com/FLAN-602/flannels-valentines-gift%20finder-p2-220127-d.jpg" },
    { stageHeader: "What is your price range?", stageImageURL: "https://blcro.fra1.digitaloceanspaces.com/FLAN-602/flannels-valentines-gift%20finder-p3-220127-d.jpg" },
    { stageHeader: "Your results", stageImageURL: "https://blcro.fra1.digitaloceanspaces.com/FLAN-602/flannels-valentines-gift%20finder-p3-220127-d.jpg" },
];

// const initiateSlider = () => {

//     // Run slick
//     let slider = document.querySelector(`#${ID}-quiz--itemscarousel`);
//     slider.classList.add('swiper-active');

//     mySwiper = new Swiper(slider, {
//         // Optional parameters
//         init: false,
//         loop: false,
//         // If we need pagination
//         slidesPerView: 4,
//         slidesPerGroup: 1,
//         spaceBetween: 20,
//         // Disable preloading of all images
//         preloadImages: true,
//         // Enable lazy loading
//         lazy: false,
//         // Responsive breakpoints
//         breakpoints: {
//             992: {
//                 slidesPerView: 3,
//             },
//             767: {
//                 slidesPerView: 2,
//             },
//             600: {
//                 slidesPerView: 1,
//             }
//         },
//         pagination: {
//             el: `#${ID}-carousel-pagination`,
//             type: 'bullets',
//             clickable: true,

//         },
//         navigation: {
//             nextEl: `.${ID}-button-next`,
//             prevEl: `.${ID}-button-prev`,
//         }

//     })

//     // Once the carousel is ready, initiate swiper and remove the loading spinner to display the carousel

//     setTimeout(function() {
//         mySwiper.init();
//     }, 500);

//     setTimeout(function() {

//         document.querySelector(`.${ID}-quiz--stage3`).classList.remove('calculating');

//     }, 600);

// }

// const updateSlider = () => {

//     mySwiper.update();

// }

const checkProgress = () => {


    let quizHeader = document.querySelector(`.${ID}-quiz--header`);
    let quizHeaderH2 = quizHeader.querySelector('h2');
    // quizHeader.style.backgroundImage = `url('${stageData[stageNumber].stageImageURL}')`;

    quizHeaderH2.innerText = `${stageData[stageNumber].stageHeader}`;

    if (stageNumber == 0) {
        quizProgressBarInner.setAttribute('data-percent', 0);
        quizProgressBarInner.innerText = "0%";
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

                            // stage3.classList.add('calculating');

                            let stageURL = localStorage.getItem(`${ID}-category-option`);
                            let catCode = localStorage.getItem(`${ID}-catcode-option`);
                            let pricerange = e.target.getAttribute('data-price');

                            let fullURL = `https://www.flannels.com${stageURL}#dcp=1&dppp=100&OrderBy=recent&Filter=${encodeURIComponent(pricerange)}`;
                            logMessage('Full URL used: ' + fullURL);
                            fireEvent("Visible - user has got to stage 3 and selected: " + e.target.innerText + " for their price");
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



    }


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
    } else if (stageNumber == 3) {

        // stage2.classList.remove('active');
        // stage3.classList.add('active');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const moveBackwardsStage = () => {
    const header = document.querySelector(`.${ID}-quiz--header`);
    header.classList.remove(`stage${stageNumber+1}`);
    header.classList.add(`stage${stageNumber}`);
    checkProgress();

    if (stageNumber == 0) {

        // do stage 0 stuff

        stage0.classList.add('active');
        stage1.classList.remove('active');

    } else if (stageNumber == 1) {

        // do stage 1 stuff
        stage1.classList.add('active');
        stage2.classList.remove('active');
    } else if (stageNumber == 2) {

        // do stage 2 stuff
        stage2.classList.add('active');
        //  stage3 .classList.remove('active');



    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const buildQuiz = () => {

    let quizHTML = `
  
    <div class="${ID}-quiz">
    
      <div class="${ID}-quiz--header">
      
        <a href="/" id="${ID}-quiz--exit" class="${ID}-quiz--exit"> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L22 22" stroke="black" stroke-width="3"/><path d="M2 22L22 2" stroke="black" stroke-width="3"/></svg></a>

        <h2> Who are you shopping for? </h2>      
      
      </div>
    
      <div class="${ID}-quiz--progress">
      
        <div class="${ID}-quiz--progressinner" data-percent="0">0%</div>
      
      </div>

      <button id="${ID}-quiz--backbutton" class="${ID}-quiz--backbutton">
        <svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.46155 15.4351L2 8.21753L7.46155 1" stroke="black" stroke-width="2"/></svg>
        <span class="${ID}-quiz--backbuttontext">Back</span>      
      </button>

      <div class="${ID}-quiz--body">
        <div class="${ID}-quiz--stage ${ID}-quiz--stage0 ${stageNumber == 0 ? 'active' : ''}">
          <button class="${ID}-quiz--button ${ID}-gender-option option-him" data-image="" data-option="option-her">HER</button>
          <button class="${ID}-quiz--button ${ID}-gender-option option-her" data-option="option-him">HIM</button>
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
        </div>

        <div class="${ID}-quiz--stage ${ID}-quiz--stage2 ${stageNumber == 2 ? 'active' : ''} calculating">
        
          <p> Getting Prices... </p>

          <div class="${ID}-quiz--pricerange">
            
          </div>          
        
        </div>
    </div>
  
  `;

    let quizInsertionPoint = document.querySelector('.ContentWrapper');

    quizInsertionPoint.insertAdjacentHTML('afterbegin', quizHTML);

    stage0 = document.querySelector(`.${ID}-quiz--stage0`);
    stage1 = document.querySelector(`.${ID}-quiz--stage1`);
    stage2 = document.querySelector(`.${ID}-quiz--stage2`);
    // stage3 = document.querySelector(`.${ID}-quiz--stage3`);
    quizProgressBarInner = document.querySelector(`.${ID}-quiz--progressinner`);
    backwardsButton = document.getElementById(`${ID}-quiz--backbutton`);
    //catLink = document.querySelector(`.${ID}-quiz--categorylink a`);
    // Event Handlers

    // Go back handler
    backwardsButton.addEventListener('click', (e) => {
        e.preventDefault();
        stageNumber--;
        moveBackwardsStage();
        fireEvent(`Click - user has clicked the back button to go to stage ${stageNumber + 1}`);
    });

    // category link event handler

    // catLink.addEventListener('click', (e) => {
    //     fireEvent('Click - user has selected "see all matches" to go to: ' + e.target.href);
    // });

    // Stage 0 event handler

    let stage0Buttons = document.querySelectorAll(`.${ID}-gender-option`);

    [].slice.call(stage0Buttons).forEach((button) => {

        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            localStorage.setItem(`${ID}-gender-option`, e.target.getAttribute('data-option'));
            stage1.setAttribute('data-active', e.target.getAttribute('data-option'))
            stageNumber = 1;
            moveForwardStage();



            fireEvent("Visible - user has got to stage 1 and selected: " + e.target.getAttribute('data-option') + " for their gender");

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
        document.documentElement.classList.add(`${ID}-experiment-begins`);
        buildQuiz();
    }

};