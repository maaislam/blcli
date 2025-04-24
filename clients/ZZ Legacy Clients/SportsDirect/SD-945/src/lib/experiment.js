/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events, logMessage, pollerLite, observer } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;
let stageNumber = 0;
let mySwiper, stage0, stage1, stage2, stage3, stage4, quizProgressBarInner, quizBody, backwardsButton, theQuiz;

const initiateSlider = () => {

    // Run slick
    let slider = document.querySelector(`.${ID}-quiz--justforyou`);
    slider.classList.add('swiper-active');

    mySwiper = new Swiper(slider, {
        // Optional parameters
        init: true,
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

                    fireEvent(`Click - user has clicked on JFY item going to href: ${e.currentTarget.href}`, true);

                });

            });


            resolve();
        });
    });
}

const checkProgress = () => {

    if (stageNumber == 0) {
        quizProgressBarInner.setAttribute('data-percent', 0);
        backwardsButton.classList.remove('active');

    } else if (stageNumber == 1) {
        backwardsButton.classList.add('active');
        quizProgressBarInner.setAttribute('data-percent', 25);



    } else if (stageNumber == 2) {
        quizProgressBarInner.setAttribute('data-percent', 50);

        stage2.classList.add('calculating');

        

    } else if (stageNumber == 3) {
        quizProgressBarInner.setAttribute('data-percent', 75);

        let requestURL = "https://www.sportsdirect.com" + localStorage.getItem(`${ID}-catlevtwo-option`).toLowerCase();

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
                            buttonHTML = `<button class="${ID}-quiz--button ${ID}-price-option" data-price="APRI^£0 to £10,£10 to £20,£20 to £50">Up to £50</button>`;
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
                            quizBody.classList.add(`${ID}-calculating`);
                            let stageURL = localStorage.getItem(`${ID}-catlevtwo-option`);
                            let pricerange = e.target.getAttribute('data-price');
                            quizProgressBarInner.setAttribute('data-percent', 100);
                            let fullURL = `https://www.sportsdirect.com${stageURL}#dcp=1&dppp=100&OrderBy=rank&Filter=${encodeURIComponent(pricerange)}`;
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

    } else if (stageNumber == 4) {
        backwardsButton.classList.add('active');
        quizProgressBarInner.setAttribute('data-percent', 50);
        processRecs(157700).then(() => {

            setTimeout(() => {
                initiateSlider();
            }, 1000);
            

        });

    }


}

const closeQuiz = () => {

    stageNumber = 0;
    moveBackwardsStage();
    quizBody.classList.remove(`${ID}-calculating`);
    quizProgressBarInner.setAttribute("data-percent", 0);
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
    } else if (stageNumber == 3) {
        stage1.classList.remove('active');
        stage2.classList.remove('active');
        stage3.classList.add('active');

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
        stage3.classList.remove('active');

    } else if (stageNumber == 3) {

        // do stage 2 stuff
        stage2.classList.add('active');
        stage3.classList.remove('active');

    } else if (stageNumber == 4) {

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

        <div class="${ID}-quiz--headercontent">
            <span><span class="${ID}-gift">Gift</span> Finder</span>
            <p> Find the perfect gift </p>   
        </div>
      
      </div>
    
      <div class="${ID}-quiz--progress">
      
        <div class="${ID}-quiz--progressinner" data-percent="0"></div>
      
      </div>

      <button id="${ID}-quiz--backbutton" class="${ID}-quiz--backbutton">
      <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.8674 0.83914C6.0547 0.63623 6.04205 0.3199 5.83914 0.132598C5.63623 -0.0547036 5.3199 -0.0420504 5.1326 0.16086L5.8674 0.83914ZM0.5 5.91667L0.132598 5.57753C-0.0441997 5.76906 -0.0441997 6.06428 0.132598 6.25581L0.5 5.91667ZM5.1326 11.6725C5.3199 11.8754 5.63623 11.888 5.83914 11.7007C6.04205 11.5134 6.0547 11.1971 5.8674 10.9942L5.1326 11.6725ZM5.1326 0.16086L0.132598 5.57753L0.867401 6.25581L5.8674 0.83914L5.1326 0.16086ZM0.132598 6.25581L5.1326 11.6725L5.8674 10.9942L0.867401 5.57753L0.132598 6.25581Z" fill="white"/>
      </svg>
        <span class="${ID}-quiz--backbuttontext">Go Back</span>      
      </button>

      <div class="${ID}-quiz--body">
        <div class="${ID}-quiz--stage ${ID}-quiz--stage0 ${stageNumber == 0 ? 'active' : ''}">

          <h2> Who are you shopping for? </h2>

          <div class="${ID}-quiz--stageoptions">
            <button class="${ID}-quiz--button ${ID}-gender-option option-him" data-option="option-him">Men</button>
            <button class="${ID}-quiz--button ${ID}-gender-option option-her" data-option="option-her">Women</button>
            <button class="${ID}-quiz--button ${ID}-gender-option option-junior" data-option="option-junior">Kids</button>
          </div>
        </div>

        <div class="${ID}-quiz--stage ${ID}-quiz--stage1 ${stageNumber == 1 ? 'active' : ''}">
        
          <h2> What are you shopping for? </h2>

          <div class="${ID}-option-him">
            <button class="${ID}-quiz--button ${ID}-category-option option-footwear" data-option="option-men-footwear">Mens Footwear</button>
            <button class="${ID}-quiz--button ${ID}-category-option option-clothing" data-option="option-men-clothing">Mens Clothing</button>
            <button class="${ID}-quiz--button ${ID}-category-option option-accessories" data-option="option-men-accessories">Mens Accessories</button>
            <button class="${ID}-quiz--button ${ID}-category-option option-gifts" data-option="option-men-gifts" data-url="/christmas/christmas-gifts/gifts-for-him">Mens Gifts</button>
            <button class="${ID}-quiz--button ${ID}-category-option option-giftcards" data-option="option-men-giftcards">Gift Cards</button>
          </div>

          <div class="${ID}-option-her">
            <button class="${ID}-quiz--button ${ID}-category-option option-footwear" data-option="option-women-footwear">Womens Footwear</button>
            <button class="${ID}-quiz--button ${ID}-category-option option-clothing" data-option="option-women-clothing">Womens Clothing</button>
            <button class="${ID}-quiz--button ${ID}-category-option option-accessories" data-option="option-women-accessories">Womens Accessories</button>
            <button class="${ID}-quiz--button ${ID}-category-option option-gifts" data-option="option-women-gifts" data-url="/christmas/christmas-gifts/gifts-for-her">Womens Gifts</button>
            <button class="${ID}-quiz--button ${ID}-category-option option-giftcards" data-option="option-women-giftcards">Gift Cards</button>
          </div>

          <div class="${ID}-option-junior">
            <button class="${ID}-quiz--button ${ID}-category-option option-footwear" data-option="option-kids-footwear">Kids Footwear</button>
            <button class="${ID}-quiz--button ${ID}-category-option option-clothing" data-option="option-kids-clothing">Kids Clothing</button>
            <button class="${ID}-quiz--button ${ID}-category-option option-accessories" data-option="option-kids-accessories">Kids Accessories</button>
            <button class="${ID}-quiz--button ${ID}-category-option option-gifts" data-option="option-kids-gifts" data-url="/christmas/christmas-gifts/gifts-for-kids">Kids Gifts</button>
            <button class="${ID}-quiz--button ${ID}-category-option option-giftcards" data-option="option-kids-giftcards">Gift Cards</button>
          </div>
          
        </div>

        <div class="${ID}-quiz--stage ${ID}-quiz--stage2 ${stageNumber == 2 ? 'active' : ''} calculating">
        
            <h2> What are you shopping for? </h2>    

            <div class="${ID}-option-men-footwear">
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-trainers" data-option="/mens/footwear/trainers">Trainers</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-footballboots" data-option="/football/football-boots/mens-football-boots">Football Boots</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-runningshoes" data-option="/running/running-shoes/mens-running-shoes">Running Shoes</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-fitnesstrainers" data-option="/fitness-and-training/gym-trainers/mens-gym-trainers">Fitness Trainers</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-walkingboots" data-option="/outdoor-footwear/mens-outdoor-footwear/mens-walking-boots">Walking Boots &amp; Shoes</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-sliders" data-option="/mens/footwear/sliders-and-flip-flops">Sliders &amp; Flip Flops</button>
            </div>

            <div class="${ID}-option-men-clothing">
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-hoodies" data-option="/mens/clothing/hoodies">Hoodies</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-jackets" data-option="/mens/clothing/jackets-and-coats">Jackets</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-tshirts" data-option="/mens/clothing/tops-and-t-shirts/t-shirts">T-Shirts</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-jeans" data-option="/mens/clothing/jeans">Jeans</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-tracksuits" data-option="/mens/clothing/tracksuits">Tracksuits</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-underwear" data-option="/mens/clothing/underwear">Underwear</button>
            </div>

            <div class="${ID}-option-men-accessories">
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-capshats" data-option="/accessories/caps-and-hats/mens-caps-and-hats">Caps &amp; Hats</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-backpacks" data-option="/luggage/backpacks-and-rucksacks">Backpacks &amp; Rucksacks</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-trainingequipment" data-option="/fitness-and-training/gym-accessories">Training &amp; Gym Equipment</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-waterbottles" data-option="/accessories/water-bottles-and-hydration">Water Bottles &amp; Flasks</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-wallets" data-option="/accessories/all-bags/wallets">Wallets</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-belts" data-option="/accessories/belts">Belts</button>
            </div>

            <div class="${ID}-option-women-footwear">
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-trainers" data-option="/ladies/footwear/trainers">Trainers</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-runningshoes" data-option="/running/running-shoes/ladies-running-shoes">Running Shoes</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-footballboots" data-option="/football/football-boots/womens-football-boots">Football Boots</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-fitnesstrainers" data-option="/fitness-and-training/gym-trainers/womens-gym-trainers">Fitness Trainers</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-walkingboots" data-option="/outdoor-footwear/ladies-outdoor-footwear/ladies-walking-boots">Walking Boots &amp; Shoes</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-sandals" data-option="/ladies/footwear/sandals">Sandals</button>
            </div>

            <div class="${ID}-option-women-clothing">
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-dresses" data-option="/ladies/clothing/dresses">Dresses</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-hoodies" data-option="/ladies/clothing/hoodies">Hoodies</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-jumpsuits" data-option="/ladies/clothing/jumpsuits-and-playsuits">Jumpsuits &amp; Playsuits</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-tshirts" data-option="/ladies/clothing/tops-and-t-shirts/t-shirts">T-Shirts</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-jeans" data-option="/ladies/clothing/jeans">Jeans</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-underwear" data-option="/ladies/clothing/underwear">Underwear</button>
            </div>

            <div class="${ID}-option-women-accessories">
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-capshats" data-option="/accessories/caps-and-hats/ladies-caps-and-hats">Caps &amp; Hats</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-backpacks" data-option="/luggage/backpacks-and-rucksacks">Backpacks &amp; Rucksacks</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-trainingequipment" data-option="/fitness-and-training/gym-accessories">Training &amp; Gym Equipment</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-waterbottles" data-option="/accessories/water-bottles-and-hydration">Water Bottles &amp; Flasks</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-hair-accessories" data-option="/accessories/hair-accessories">Hair Accessories</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-belts" data-option="/accessories/belts/ladies-belts">Belts</button>
            </div>

            <div class="${ID}-option-kids-footwear">
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-boys-footwear" data-option="/kids/footwear/boys">Boys Footwear</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-girls-footwear" data-option="/kids/footwear/girls">Girls Footwear</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-baby-footwear" data-option="/kids/footwear/baby">Baby Footwear</button>
            </div>

            <div class="${ID}-option-kids-clothing">
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-boys-clothing" data-option="/kids/clothing/boys">Boys Clothing</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-girls-clothing" data-option="/kids/clothing/girls">Girls Clothing</button>
            <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-baby-clothing" data-option="/kids/clothing/baby">Baby Clothing</button>
            </div>

            <div class="${ID}-option-kids-accessories">
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-backpacks" data-option="/luggage/backpacks-and-rucksacks">Backpacks &amp; Rucksacks</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-schoolbags" data-option="/luggage/gym-bags-and-sacks">School Bags</button>
                <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-waterbottles" data-option="/accessories/water-bottles-and-hydration">Water Bottles &amp; Flasks</button>
            </div>
            
        
        </div>

        <div class="${ID}-quiz--stage ${ID}-quiz--stage3 ${stageNumber == 3 ? 'active' : ''} calculating">
        
            <h2> What is your price range? </h2>

            <div class="${ID}-quiz--pricerange">
            
            </div>
               
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
    stage3 = document.querySelector(`.${ID}-quiz--stage3`);
    stage4 = document.querySelector(`.${ID}-quiz--stage4`);
    quizProgressBarInner = document.querySelector(`.${ID}-quiz--progressinner`);
    quizBody = document.querySelector(`.${ID}-quiz--body`);
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

            if(e.target.getAttribute('data-option').indexOf('giftcards') > -1) {
                
                quizBody.classList.add(`${ID}-calculating`);
                quizProgressBarInner.setAttribute('data-percent', 100);
                fireEvent("Visible - user has got to stage 2 and selected: Gift Cards");
                window.location.href = "https://www.sportsdirect.com/accessories/gift-card";
            } else if(e.target.getAttribute('data-option').indexOf('gifts') > -1) {
                localStorage.setItem(`${ID}-catlevtwo-option`, e.target.getAttribute('data-url'));
                stageNumber = 3;
                moveForwardStage();
                fireEvent("Visible - user has got to stage 2 and selected: Gifts");
            } else {
                stage2.setAttribute('data-active', e.target.getAttribute('data-option'))
                stageNumber = 2;
                moveForwardStage();
            }

            fireEvent("Visible - user has got to stage 2 and selected: " + e.target.innerText + " for their category");

        }, false)

    })

    // Stage 2 event handler

    let stage2Buttons = document.querySelectorAll(`.${ID}-catlevtwo-option`);

    [].slice.call(stage2Buttons).forEach((button) => {

        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            localStorage.setItem(`${ID}-catlevtwo-option`, e.target.getAttribute('data-option'));

            //stage2.setAttribute('data-active', e.target.getAttribute('data-option'))

            stageNumber = 3;
            moveForwardStage();



            fireEvent("Visible - user has got to stage 3 and selected: " + e.target.innerText + " for their 2nd level category");

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

}

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
    
    if(window.location.href.indexOf('/product-finder') > -1 && VARIATION == 2) {
        buildQuiz('url')
    } else {
        buildQuiz('modal');


        if(window.location.href.indexOf('/just-for-you') > -1) {
            pollerLite([`#SD-772-vwrv-carousel`], () => {
                let placeButtonHTML = `
                    <button id="${ID}-quiz--placebutton" class="${ID}-quiz--placebutton ${ID}-jfybutton">
                        <span>Gift Finder</span>
                        <p> Find the perfect gift </p>
                        <p class="${ID}-quiz--placebuttoncta">Get Started</p>
                    </button>  
                `;
        
                document.getElementById(`SD-772-vwrv-carousel`).insertAdjacentHTML('beforebegin', placeButtonHTML);
            
                document.getElementById(`${ID}-quiz--placebutton`).addEventListener('click', () => {
                    document.documentElement.classList.add(`${ID}-noscroll`);
                    document.querySelector(`.${ID}-quiz`).classList.add(`${ID}-active`);
                    fireEvent('Click - user has clicked the gift finder button on the Just for You page');
                });
            });
        } else if(document.body.classList.contains('Home')) {

            pollerLite([`.SDHOME_5`], () => {
                let placeButtonHTML = `
                    <button id="${ID}-quiz--placebutton" class="${ID}-quiz--placebutton">
                        <span><span class="${ID}-gift">Gift</span> Finder</span>
                        <p> Find the perfect gift </p>
                        <p class="${ID}-quiz--placebuttoncta">Get Started</p>
                    </button>  
                `;
        
                document.querySelector(`.SDHOME_5`).insertAdjacentHTML('afterend', placeButtonHTML);
            
                document.getElementById(`${ID}-quiz--placebutton`).addEventListener('click', () => {
                    document.documentElement.classList.add(`${ID}-noscroll`);
                    document.querySelector(`.${ID}-quiz`).classList.add(`${ID}-active`);
                    fireEvent('Click - user has clicked the gift finder button on the Homepage');
                });
            }); 

        } else if(window.location.href.indexOf('/christmas') > -1 && document.body.classList.contains('ukOnlyPromotion')) {

            pollerLite([`.SD_christmas_lp_5`], () => {
                let placeButtonHTML = `
                    <button id="${ID}-quiz--placebutton" class="${ID}-quiz--placebutton ${ID}-xmaspagebutton">
                        <span><span class="${ID}-gift">Gift</span> Finder</span>
                        <p> Find the perfect gift </p>
                        <p class="${ID}-quiz--placebuttoncta">Get Started</p>
                    </button>  
                `;
        
                document.querySelector(`.SD_christmas_lp_5`).insertAdjacentHTML('afterend', placeButtonHTML);
            
                document.getElementById(`${ID}-quiz--placebutton`).addEventListener('click', () => {
                    document.documentElement.classList.add(`${ID}-noscroll`);
                    document.querySelector(`.${ID}-quiz`).classList.add(`${ID}-active`);
                    fireEvent('Click - user has clicked the gift finder button on the Christmas Page');
                });
            }); 

        }

        // place navigation trigger
        if(window.outerWidth < 768) {
            pollerLite(['.mobMenuGroup'], () => {
                let navQuizTriggerHTML = `
        
                    <li class="root mmHasChild has-dropdown  AppTab AppSplash multicolumn MenuGroupDesigners threeCol twoPromo"><a href="#" id="${ID}-mobileplacebutton" class="${ID}-mobileplacebutton menuitemtext MobMenChevron"><img src="https://blcro.fra1.digitaloceanspaces.com/SD-945/SD-945-mobilesmall.jpg" alt="Gift Finder">Try our new Gift Finder</a></li>
                
                `;
                let insertionPoint = document.querySelector('.mobMenuGroup');
                insertionPoint.insertAdjacentHTML('beforeend', navQuizTriggerHTML);

                

                document.querySelector(`.${ID}-mobileplacebutton`).addEventListener('click', () => {
                    document.documentElement.classList.add(`${ID}-noscroll`);
                    document.querySelector(`.${ID}-quiz`).classList.add(`${ID}-active`);
                    fireEvent('Click - user has clicked the gift finder button in the Nav on mobile');
                });

            });
        } else {
            pollerLite(['#topMenu .SubMenuWrapper'], () => {
                let navQuizTriggerHTML = `
        
                    <button class="${ID}-quiz--placebutton ${ID}-navbutton">
                        <p> Try our new <span>Gift Finder</span></p>
                    </button> 
                
                `;

                let allSubmenuWrappers = document.querySelectorAll('#topMenu .SubMenuWrapper');
                [].slice.call(allSubmenuWrappers).forEach((subMenu) => {
                    if(!subMenu.closest('li').classList.contains('MenuGroupSports')) {
                        subMenu.querySelector('.Bottom').insertAdjacentHTML('beforebegin', navQuizTriggerHTML);
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

        // Onward tracking category page
        
        if(document.body.classList.contains('sdlProdList') && localStorage.getItem(`${ID}-last-url`) && localStorage.getItem(`${ID}-last-url`) !== "") {

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

    }
    


};