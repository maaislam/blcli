/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { touchend } from 'dom7';
import { setup, fireEvent } from '../../../core-files/services';
import shared from '../../../core-files/shared';
import { events, logMessage, pollerLite } from '../../utils';

const { ID, VARIATION } = shared;
const promises = [];
let recStoryData,
    processStepRequest,
    currStage,
    currStory,
    allStories,
    storySlides,
    navSpans,
    currActiveCarouselName,
    numStories,
    numProductsShown,
    storyHolder,
    storyTriggerHolder,
    storyRecommendationStrategies,
    activePortion,
    usedData,
    expUsedData;
let spanCurrWidth = 0;
let animationStopped = false;
let storyTimeout, stageTimeout;

export const startRecommendedStories = (data) => {

    recStoryData = data;
    logMessage("Recommended Stories Start");
    

    // assign to variables
    numStories = recStoryData.strategyData.length;
    numProductsShown = recStoryData.numProductsShown;
    storyRecommendationStrategies = recStoryData.strategyData;
    currStory = 0;
    currStage = 0;

    logMessage("Data:");
    logMessage(recStoryData);
    logMessage("Number of Stories: "+numStories+" / Number of Products shown: "+numProductsShown);

    if(!localStorage.getItem(`${ID}-cache-timeout-initial`)) {
        localStorage.setItem(`${ID}-cache-timeout-initial`, new Date().getDay());
    }

    if(!localStorage.getItem(`${ID}-story-data`)) {
        localStorage.setItem(`${ID}-story-data`, JSON.stringify(recStoryData.strategyData));
    }

    buildStoryElement();
}

const buildStoryElement = () => {

    // do loader
    let recStoriesHTML = `
        <div class="${ID}-recommended-stories loading">

            <div class="loading-spinner">
            <p> Loading stories... </p>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="38px" height="38px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" fill="none" stroke="#000000" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"></circle>
            </svg>
            </div>
        
            <div class="${ID}-recommended-stories--holder" data-stories-count="${numProductsShown}">
            
            </div>
        
        </div>
    `;
    
    let insertionPoint = document.querySelector(recStoryData.triggerAttachPoint);
    insertionPoint.insertAdjacentHTML(recStoryData.triggerAttachPointAdjacentValue, recStoriesHTML);

    buildStories();

}

const getRecs = (strategy, iterator) => {
    usedData = JSON.parse(localStorage.getItem(`${ID}-story-data`));
    return new Promise((resolve, reject) => {
        DYO.recommendationWidgetData(strategy.strategyID, { maxProducts: 20 }, function (error, data) {
            usedData[iterator].theProducts = data;
            usedData[iterator].completed = false;
            localStorage.setItem(`${ID}-story-data`, JSON.stringify(usedData));
            resolve();
        });
    });
}

const arrayShuffle = (array) => {
let currentIndex = array.length,  randomIndex;

// While there remain elements to shuffle...
while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
    array[randomIndex], array[currentIndex]];
}

return array;
}

const buildStories = () => {
    let navSpanHTML = ``;
    for (let i = 0; i < numProductsShown + 1; i++) {
        navSpanHTML += `<div class="${ID}-nav-span"><div class="${ID}-nav-span-activeportion"></div></div>`;
    }

    let storyHolderHTML = `
    
      <div class="${ID}-story-holder loading" id="${ID}-story-holder">
  
        <button class="${ID}-tap-holder ${ID}-tap-holder-left" id="${ID}-tap-holder-left"><svg enable-background="new 0 0 511.999 511.999" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m172.55 256 216.27-216.28c9.089-9.089 9.089-23.824 0-32.912s-23.824-9.089-32.912 2e-3l-232.73 232.73c-4.366 4.363-6.817 10.282-6.817 16.454 0 6.173 2.453 12.093 6.817 16.457l232.73 232.72c4.543 4.544 10.499 6.816 16.455 6.816s11.913-2.271 16.457-6.817c9.089-9.089 9.089-23.824 0-32.912l-216.27-216.26z" fill="#000"/></svg></button>
        <button class="${ID}-tap-holder ${ID}-tap-holder-right" id="${ID}-tap-holder-right"><svg enable-background="new 0 0 512.001 512.001" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m388.82 239.54-232.73-232.72c-9.087-9.089-23.824-9.089-32.912 2e-3 -9.087 9.089-9.087 23.824 2e-3 32.912l216.27 216.27-216.27 216.28c-9.087 9.089-9.087 23.824 2e-3 32.912 4.543 4.544 10.499 6.816 16.455 6.816s11.913-2.271 16.457-6.817l232.73-232.73c4.366-4.364 6.817-10.283 6.817-16.455 0-6.173-2.451-12.093-6.817-16.458z" fill="#000"/></svg></button>
  
        <div class="${ID}-story-navigation-holder">
  
          <h2 id="${ID}-strategy-name" class="${ID}-strategy-name"> </h2>
  
          <button id="${ID}-exit" class="${ID}-exit"> <svg width="26" fill="#FFF" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" preserveAspectRatio="none" x="0px" y="0px" viewBox="0 0 100 100"><path fill="#FFF" stroke="none" d=" M 81.75 21.75 Q 82.503515625 21.0390625 82.5 20 82.503515625 18.9607421875 81.75 18.2 81.0390625 17.4962890625 80 17.5 78.9607421875 17.4962890625 78.2 18.2 L 50 46.45 21.75 18.2 Q 21.0390625 17.4962890625 20 17.5 18.9607421875 17.4962890625 18.2 18.2 17.4962890625 18.9607421875 17.5 20 17.4962890625 21.0390625 18.2 21.75 L 46.45 50 18.2 78.2 Q 17.4962890625 78.9607421875 17.5 80 17.4962890625 81.0390625 18.2 81.75 18.9607421875 82.503515625 20 82.5 21.0390625 82.503515625 21.75 81.75 L 50 53.55 78.2 81.75 Q 78.9607421875 82.503515625 80 82.5 81.0390625 82.503515625 81.75 81.75 82.503515625 81.0390625 82.5 80 82.503515625 78.9607421875 81.75 78.2 L 53.55 50 81.75 21.75 Z"></path></svg> </button>
        
          <div class="${ID}-story-navigation">
          
            ${navSpanHTML}
          
          </div>
  
        </div>
      
      
      
      </div>
    
    `;

    // always inserted at the end before closing body tag
    document.body.insertAdjacentHTML('beforeend', storyHolderHTML);
    storyHolder = document.getElementById(`${ID}-story-holder`);
    storyTriggerHolder = document.querySelector(`.${ID}-recommended-stories`);
    let triggerInsertionPoint = document.querySelector(`.${ID}-recommended-stories--holder`);
    let storyInsertionPoint = document.getElementById(`${ID}-story-holder`);

    addStoryEvents();

 
    usedData = JSON.parse(localStorage.getItem(`${ID}-story-data`));

    if(!usedData || usedData[0].theProducts.length == 0 || parseInt(localStorage.getItem(`${ID}-cache-timeout-initial`)) !== new Date().getDay()) {
        logMessage("Cache - generating new products");
        localStorage.setItem(`${ID}-cache-timeout-initial`, new Date().getDay());
        usedData.forEach((strategy, iterator) => {
            const promise = getRecs(strategy, iterator);
            promises.push(promise);
        });

    } else {

        logMessage("Cache - products pulled from cache");
    }
    
    Promise.all(promises).then((values) => {

        usedData = JSON.parse(localStorage.getItem(`${ID}-story-data`));

        usedData.forEach((strategy, iterator) => {

            // shuffles and slices to pull random products.
            let strategyProducts = strategy.theProducts.slots;
            arrayShuffle(strategyProducts);
            strategyProducts = strategyProducts.slice(0,5);
    
            let storyTriggerHTML = `
              
              <button id="${ID}-strategy-${strategy.name}" data-strategy-name="${strategy.name}" data-story-id="${iterator}" data-friendly-name="${strategy.friendlyName}" class="${ID}-strategy-button ${strategy.completed == true ? 'completed' : ''}">
      
                <div style="background-image: url(${strategy.thumbImageUrl});" class="${ID}-strategy-button--img"></div>
      
                <p class="${ID}-strategy-button--identifier">${strategy.friendlyName}</p>
      
              </button>
            
            `;
    
            triggerInsertionPoint.insertAdjacentHTML('beforeend', storyTriggerHTML);
    
            let initialSlideHTML = `
        
                <div id="${ID}-${strategy.name}-story" class="${ID}-story ${ID}-${strategy.name}-story" data-strategy-name="${strategy.name}">
                    <div class="${ID}-story-wrapper">
                        <div class="${ID}-story-slide initial" style="background-image: url(${strategy.mainBgImageUrl})">
                            <h2> ${strategy.friendlyName} </h2>
                        </div> 
                    </div>
                </div>
            
            `;

            storyHolder.insertAdjacentHTML('beforeend', initialSlideHTML);

            strategyProducts.forEach((slot) => {

                let productSlideHTML = `
        

                    <div class="${ID}-story-slide ${ID}-product-slide" data-url="${slot.item.url}">
                        <div class="${ID}-product-slide--inner">
                            <div class="${ID}-product-slide--imageholder">
                                <img src="${slot.item.image_url}" alt="${slot.item.name} image" class="${ID}-product-slide--image" />
                            </div>
                            <div class="${ID}-product-slide--content">
                            
                                <p class="${ID}-product-slide--brand">${slot.item.brand}</p>
                                <p class="${ID}-product-slide--name">${slot.item.name}</p>
                                <p class="${ID}-product-slide--price ${slot.item.price != slot.item.ticket_price ? 'sale-price' : ''}">
                                    <span class="${ID}-product-slide--pricenow">${formatPrice(slot.item.price)}</span>
                                    <span class="${ID}-product-slide--pricewas">${formatPrice(slot.item.ticket_price)}</span>
                                                                        
                                </p>
            
                                <div class="${ID}-product-slide--buttonbrandholder">
                                <a href="${slot.item.url}" class="${ID}-button">View product details</a>
                                </div>
                            
                            </div>
                        </div>
                    </div>       
            
            
                `;

                document.querySelector(`.${ID}-${strategy.name}-story .${ID}-story-wrapper`).insertAdjacentHTML('beforeend', productSlideHTML);
            });
    
        });
    });

    pollerLite([
        () => {

            return document.querySelectorAll(`.${ID}-strategy-button`).length == numProductsShown;

        }
    ], () => {

        setTimeout(() => { storyTriggerHolder.classList.remove('loading') }, 500);
        let allStoryButtons = [].slice.call(document.querySelectorAll(`.${ID}-strategy-button`));
        allStories = [].slice.call(document.querySelectorAll(`${ID}-story`));
        allStoryButtons.forEach((story) => {
            story.addEventListener('click', (e) => {
                e.preventDefault();
                let theStory = e.currentTarget.getAttribute('data-strategy-name');
                let currFriendlyName = e.currentTarget.getAttribute('data-friendly-name');
                currStory = e.currentTarget.getAttribute('data-story-id');
                allStories.forEach((daStory) => {
                    daStory.classList.remove(`${ID}-active`);
                })
                document.getElementById(`${ID}-strategy-name`).innerText = currFriendlyName;
                storyHolder.classList.add(`${ID}-visible`);
                document.documentElement.classList.add(`${ID}-noscroll`);
                document.querySelector(`.${ID}-story[data-strategy-name="${theStory}"]`).classList.add(`${ID}-active`);
                setTimeout(() => {
                    startStageTimer();

                    
                    
                }, 500);

                setTimeout(() => {
                    let allTapHolders = document.querySelectorAll(`.${ID}-tap-holder`);
                    [].slice.call(allTapHolders).forEach((holder) => {
                        holder.classList.add('active');
                    });
                }, 1000);

                

                fireEvent(`Click - user has clicked to open story id: ${currStory} which is the ${currFriendlyName} story`);

            });
        });


        let allProductLinks = document.querySelectorAll(`.${ID}-product-slide--buttonbrandholder a`);
        [].slice.call(allProductLinks).forEach((link) => {
            link.addEventListener('click', (e) => {
                fireEvent(`Click - user has clicked on product information link on story: ${currStory} stage: ${currStage} to go to href: ${e.currentTarget.href} `)
            })
        })


    });

    pollerLite([`.${ID}-product-slide--inner`], () => {

        

        let allSlideInners = document.querySelectorAll(`.${ID}-product-slide--inner`);

        [].slice.call(allSlideInners).forEach((slideInner) => {

            if(window.outerWidth > 767) {
                slideInner.addEventListener('mouseenter', (e) => {
                    animationStopped = true;
                })
    
                slideInner.addEventListener('mouseleave', (e) => {
                    animationStopped = false;
                    window.requestAnimationFrame(processStep);
                })
            } 
            
        });

    });

    fireEvent('Visible - recommended stories have been shown to the user');

}

const addStoryEvents = () => {

    let storyExitButton = document.getElementById(`${ID}-exit`);
    storyExitButton.addEventListener('click', (e) => {

        closeAndReset();

        fireEvent(`Click - user has clicked on close X to close the recommended stories at story: ${currStory} stage: ${currStage}`)

    });


    let leftTapButton = document.getElementById(`${ID}-tap-holder-left`);
    let rightTapButton = document.getElementById(`${ID}-tap-holder-right`);

    leftTapButton.addEventListener('click', (e) => {
        prevStage();
        fireEvent(`Click - user has tapped the left side of the viewport to move back a stage`);

    })

    rightTapButton.addEventListener('click', (e) => {
        let currWidth = parseInt(navSpans[currStage].querySelector(`.${ID}-nav-span-activeportion`).style.width);
        if(currWidth > 5) {
            nextStage();
            fireEvent(`Click - user has tapped the right side of the viewport to move forward a stage`);
        }
        

    })

    if(window.outerWidth < 767) {


        let touchstartX = 0;
        let touchstartY = 0;
        let touchendX = 0;
        let touchendY = 0;
        pollerLite([`.${ID}-story-holder`], () => {
            const gestureZone = document.querySelector(`.${ID}-story-holder`);
        
            gestureZone.addEventListener('touchstart', function(event) {
                touchstartX = event.changedTouches[0].screenX;
                touchstartY = event.changedTouches[0].screenY;
                animationStopped = true;
            }, false);
            
            gestureZone.addEventListener('touchend', function(event) {
                touchendX = event.changedTouches[0].screenX;
                touchendY = event.changedTouches[0].screenY;
                
                handleGesture();
            }, false); 
            
            function handleGesture() {
                var xDiff = touchstartX - touchendX;
                var yDiff = touchstartY - touchendY;
                if(Math.abs( xDiff ) + Math.abs( yDiff ) > 50) {
                    animationStopped = false;
                    if (touchendX <= touchstartX) {
                        animationStopped = false;
                        nextStage();
                    }
                    
                    if (touchendX >= touchstartX) {
                        animationStopped = false;
                        prevStage();
                    }
                } else {
                    animationStopped = false;
                    window.requestAnimationFrame(processStep);
                }
                
                
                
            }
        })
        

    }

    


}


// UTILITY FUNCTIONS


const nextStage = () => {
    
    currStage++;

    logMessage("Next Stage currstage: " + currStage);

    storySlides = document.querySelectorAll(`#${ID}-${currActiveCarouselName}-story .${ID}-story-slide`);
    navSpans = document.querySelectorAll(`.${ID}-nav-span`);
    
    

    let prevStage = currStage - 1;

    if(currStage > 0 && currStage !== 6) {
            
        navSpans[prevStage].querySelector(`.${ID}-nav-span-activeportion`).style.width = "100%";
        navSpans[currStage].querySelector(`.${ID}-nav-span-activeportion`).style.width = "0";
        storySlides[prevStage].classList.add(`${ID}-completed`);
        storySlides[prevStage].classList.remove(`${ID}-active`);
        storySlides[currStage].classList.add(`${ID}-active`); 
    }
    
    if (currStage == 1) {
        document.querySelector(`.${ID}-story-navigation-holder`).classList.add('lightmode');
        storySlides[prevStage].classList.add(`${ID}-completed`); 
    }

    if (currStage == 6) {
        nextStory();
    }

    spanCurrWidth = 0;
    
    window.cancelAnimationFrame(processStepRequest);
    processStepRequest = undefined;
    startStageTimer();
}

const prevStage = () => {
    
    
    // reduce by one
    
    let prevStage = currStage;
    currStage = currStage - 1;
    spanCurrWidth = 0;

    logMessage("Prev Stage currstage: " + currStage);

    if(currStage >= 0) {
        
        storySlides[prevStage].classList.remove(`${ID}-active`);
        navSpans[prevStage].querySelector(`.${ID}-nav-span-activeportion`).style.width = "0";
    }
    
    if(currStage > -1) {
        storySlides[currStage].classList.add(`${ID}-active`);
        navSpans[currStage].querySelector(`.${ID}-nav-span-activeportion`).style.width = "0";
    }

    if (currStage == 0) {
        document.querySelector(`.${ID}-story-navigation-holder`).classList.remove('lightmode');
        spanCurrWidth = 0;
        window.cancelAnimationFrame(processStepRequest);
        processStepRequest = undefined;
        startStageTimer();
    } else if (currStage == -1) {
        currStage = 0;
        if(currStory !== 0) {
            prevStory();
        }
    } else {
        spanCurrWidth = 0;
        window.cancelAnimationFrame(processStepRequest);
        processStepRequest = undefined;
        startStageTimer();
    }

    
}

const nextStory = () => {
    logMessage("Next Story");
    currStory ++;

    let prevStoryName = storyRecommendationStrategies[currStory - 1].name;
    document.querySelector(`.${ID}-strategy-button[data-strategy-name="${prevStoryName}"]`).classList.add(`completed`);

    let currLSData = JSON.parse(localStorage.getItem(`${ID}-story-data`));
    currLSData[currStory - 1].completed = true;
    localStorage.setItem(`${ID}-story-data`, JSON.stringify(currLSData));
    
    if (currStory < storyRecommendationStrategies.length) {
        const storyPromise = resetAllStories();
        storyPromise.then(() => {
            let currStoryArray = storyRecommendationStrategies[currStory];
            let currStoryName = currStoryArray.name;
            let currFriendlyName = currStoryArray.friendlyName;
            allStories.forEach((daStory) => {
                daStory.classList.remove(`${ID}-active`);
            })
            document.getElementById(`${ID}-strategy-name`).innerText = currFriendlyName;
            document.querySelector(`.${ID}-story[data-strategy-name="${currStoryName}"]`).classList.add(`${ID}-active`);
            setTimeout(() => {
                window.cancelAnimationFrame(processStepRequest);
                processStepRequest = undefined;    
                startStageTimer();
            }, 500)
        })
        
    } else if(currStory == storyRecommendationStrategies.length) {
        closeAndReset();
        logMessage("Reached the end, close");
    }
}

const prevStory = () => {
    logMessage("Prev Story");
    currStory --;

    

    if (currStory < storyRecommendationStrategies.length && currStory > -1) {
        resetAllStories();
        let currStoryArray = storyRecommendationStrategies[currStory];
        let currStoryName = currStoryArray.name;
        let currFriendlyName = currStoryArray.friendlyName;
        allStories.forEach((daStory) => {
            daStory.classList.remove(`${ID}-active`);
        })
        document.getElementById(`${ID}-strategy-name`).innerText = currFriendlyName;
        document.querySelector(`.${ID}-story[data-strategy-name="${currStoryName}"]`).classList.add(`${ID}-active`);
        setTimeout(() => {
            window.cancelAnimationFrame(processStepRequest);
            processStepRequest = undefined;    
            startStageTimer();
        }, 500)
    } else if(currStory == -1) {
        logMessage("Reached the beginning, do nothing");
    }
}

const closeAndReset = () => {
    storyHolder.classList.remove(`${ID}-visible`);
    document.documentElement.classList.remove(`${ID}-noscroll`);
    logMessage("Close & Reset");
    resetAllStories();
}

const resetAllStories = () => {
    logMessage("Resetting Stories");

    window.cancelAnimationFrame(processStepRequest);
    processStepRequest = undefined;

    return new Promise((resolve, reject) => {
        let allNavItems = document.querySelectorAll(`.${ID}-nav-span`);
        [].slice.call(allNavItems).forEach((navItem) => {
            navItem.classList.remove(`${ID}-started`);
            navItem.querySelector(`.${ID}-nav-span-activeportion`).style.width = "0%";
        });
    
        document.querySelector(`.${ID}-story-navigation-holder`).classList.remove('lightmode');
    
        let allStories = document.querySelectorAll(`.${ID}-story`);
        [].slice.call(allStories).forEach((story) => {
            story.classList.remove(`${ID}-active`);
        })
    
        let allStorySlides = document.querySelectorAll(`.${ID}-story-slide`);
        [].slice.call(allStorySlides).forEach((storySlide) => {
            storySlide.classList.remove(`${ID}-completed`);
            storySlide.classList.remove(`${ID}-active`);
        })
    
        currStage = 0;
        spanCurrWidth = 0;
    
        resolve();
    })

    
}

// HELPER FUNCTIONS

const formatPrice = (price) => {

    let defaultCurrency = '£';

    if (typeof price == "string" && price.indexOf('.') > 0) {
        price = parseFloat(price).toFixed(2);
    } else if (typeof price == "number" && Number.isInteger(price)) {
        price = price + ".00";
    } else {
        price = price.toFixed(2);
    }

    let currencyText = document.querySelector('.spanCurrencyLanguageSelector > p').innerHTML;
    let currencySign = currencyText.substring(0, currencyText.indexOf(' '));

    if (DY.recommendationContext.lng === 'en_EU') {
        price = price.replace('.', ',');
    }

    price = currencySign + price;

    return price;
}

const startStageTimer = () => {
    clearTimeout(stageTimeout);
    numTimesProcessed = 0;
    spanCurrWidth = 0;
    stageTimeout = setTimeout(() => {
        processStepRequest = window.requestAnimationFrame(processStep);
    }, 50);

}

let numTimesProcessed = 0;

const processStep = () => {
     
    numTimesProcessed ++;

    navSpans = document.querySelectorAll(`.${ID}-nav-span`);
    currActiveCarouselName = document.querySelector(`.${ID}-story.${ID}-active`).getAttribute('data-strategy-name');
    
    if(currStage >= 0) {
        navSpans[currStage].classList.add(`${ID}-started`);

        activePortion = navSpans[currStage].querySelector(`.${ID}-nav-span-activeportion`);
    }

    if (spanCurrWidth < 100) {
        if (animationStopped == false) {
            if(window.outerWidth > 767) {
                spanCurrWidth = spanCurrWidth + 0.5;
            } else {
                spanCurrWidth = spanCurrWidth + 0.35;
            }
            
            activePortion.style.width = spanCurrWidth + "%";
            processStepRequest = window.requestAnimationFrame(processStep);
        }
    } else {

        numTimesProcessed = 0;
        if (currStage == 0) {
            document.querySelector(`.${ID}-story-navigation-holder`).classList.add('lightmode');
        }

        if (currStage < 5) {
            nextStage();

        } else {
            nextStory();
        }



    }


}

