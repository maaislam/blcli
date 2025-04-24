/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite, logMessage } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
const { ID, VARIATION } = shared;

const checkRelevantFilters = () => {

  let localStorageItem = JSON.parse(localStorage.getItem(`${ID}-filter-usage`));
  if(localStorageItem) {
    let currURL = window.location.href.substring(0, window.location.href.indexOf('?'));
    let currDept = currURL.substring(currURL.indexOf('.com/') + 5, currURL.length);
    currDept = currDept.split('/')[0];
    let filtersAppliedToThisURL = localStorageItem.filter((filter) => {

      if (filter.filterURL.indexOf(currDept) > -1) {
        return filter;
      }

    });

    let allFiltersToBeUsed = filtersAppliedToThisURL.filter((filter) => {

      let currDate = new Date();
      let filterDate = new Date(filter.dateUsed * 1000);
      let diffTime = Math.abs(currDate - filterDate);
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 14;
    })

    if (window.outerWidth < 992) {

      if (!document.querySelector('.oct-listers-facet-burger-menu').classList.contains(`${ID}-pullingdata`)) {
        document.querySelector('.oct-listers-facet-burger-menu').classList.add(`${ID}-pullingdata`);
        document.querySelector('.oct-listers-facet-burger-menu > button').click();
      }

      let allAvailableFilters = [].slice.call(document.querySelectorAll('.oct-listers-facets__item:not(.oct-listers-facets__item--inStock)'));

      let theCheckedFilters = allAvailableFilters.filter((filter) => {
        if (filter.classList.toString().indexOf('oct-listers-facets__item--') > -1 && filter.classList.toString().indexOf('oct-listers-facets__item--currentPrice') == -1) {
          return filter;
        } else {
          return false;
        }
      });

      allFiltersToBeUsed = allFiltersToBeUsed.filter((filter) => {

        // check if filter is available in theCheckedFilters

        let filterFound = false;
        let filterType = filter.filterType;

        theCheckedFilters.forEach((filter) => {
          if (filter.querySelector('button').getAttribute('aria-label').toLowerCase() == filterType.toLowerCase()) {
            filterFound = true;
          }
        });

        if (filterFound == true) {
          return filter;
        }

      });

      document.querySelector('.oct-listers-facet-burger-menu').classList.remove(`${ID}-pullingdata`);
      pollerLite(['.oct-listers__close'], () => {
        document.querySelector('.oct-listers__close').click();
      });

    } else {

      let allAvailableFilters = [].slice.call(document.querySelectorAll('.oct-listers-facets__item:not(.oct-listers-facets__item--inStock)'));

      let theCheckedFilters = allAvailableFilters.filter((filter) => {
        if (filter.classList.toString().indexOf('oct-listers-facets__item--') > -1 && filter.classList.toString().indexOf('oct-listers-facets__item--currentPrice') == -1) {
          return filter;
        } else {
          return false;
        }
      });

      allFiltersToBeUsed = allFiltersToBeUsed.filter((filter) => {

        // check if filter is available in theCheckedFilters

        let filterFound = false;
        let filterType = filter.filterType;

        theCheckedFilters.forEach((filter) => {
          if (filter.querySelector('button').getAttribute('aria-label').toLowerCase() == filterType.toLowerCase()) {
            filterFound = true;
          }
        });

        if (filterFound == true) {
          return filter;
        }

      });

    }



    return allFiltersToBeUsed;
  } else {
    return [];
  }
  

}

const clickMobileFilter = (currFilter, currFilterType) => {
  let filterHeadingArray = [];
  if (!document.querySelector('.oct-listers-facet-burger-menu').classList.contains(`${ID}-pullingdata`)) {
    document.querySelector('.oct-listers-facet-burger-menu').classList.add(`${ID}-pullingdata`);
    document.querySelector('.oct-listers-facet-burger-menu > button').click();
  }

  pollerLite(['.oct-listers-facet-menu .oct-listers-facets__item .oct-listers-text'], () => {


    let allFilters = [].slice.call(document.querySelectorAll('.oct-listers-facets__item:not(.oct-listers-facets__item--inStock)'));
    
    let theCheckedFilters = allFilters.filter((filter) => {
      if (filter.classList.toString().indexOf('oct-listers-facets__item--') > -1 && filter.classList.toString().indexOf('oct-listers-facets__item--currentPrice') == -1) {
        return filter;
      } else {
        return false;
      }
    })

    theCheckedFilters.forEach((filter) => {

      if (filter.querySelector('.oct-listers-text').innerText.toLowerCase() == currFilterType.toLowerCase()) {
        filter.querySelector('button').click();

        if(currFilterType == "Rating") {

          pollerLite(['.rating-facet__child'], () => {
            

            filterHeadingArray = document.querySelectorAll('.rating-facet__child');
            let numStars = currFilter.getAttribute('data-stars').trim();
            let starSelector = `#RadioCount-${currFilter.getAttribute('data-stars')}`;

            filterHeadingArray = [].slice.call(filterHeadingArray);
            filterHeadingArray.forEach((filter) => {
              if (filter.querySelector(starSelector)) {
                filter.click();
                document.querySelector('.oct-listers-facet-burger-menu').classList.remove(`${ID}-pullingdata`);
                pollerLite(['.oct-listers__close'], () => {
                  document.querySelector('.oct-listers__close').click();
                });
                fireEvent(`Click - click on new personalised hero filter item - Rating - ${numStars} stars`, true);
              }
            });
          });



        } else if (currFilterType == "Colour") {

          pollerLite(['.colour-facet__child'], () => {

            filterHeadingArray = document.querySelectorAll('.colour-facet__child');
            filterHeadingArray = [].slice.call(filterHeadingArray);
            let clickedText = currFilter.innerText.toLowerCase().trim().substring(0, 30);
            filterHeadingArray.forEach((filter) => {
              let filterText = filter.innerText.toLowerCase().trim().substring(0, 30);
              if (filterText == clickedText) {
                filter.click();
                document.querySelector('.oct-listers-facet-burger-menu').classList.remove(`${ID}-pullingdata`);
                pollerLite(['.oct-listers__close'], () => {
                  document.querySelector('.oct-listers__close').click();
                });
                fireEvent(`Click - click on new personalised hero filter item - Colour - ${filterText}`, true);
              }
            });
          });
            
        } else {

          pollerLite(['.checkbox-list-facet__child'], () => {

            filterHeadingArray = document.querySelectorAll('.checkbox-list-facet__child');

            filterHeadingArray = [].slice.call(filterHeadingArray);
            let clickedText = currFilter.innerText.toLowerCase().trim().substring(0, 30);
            filterHeadingArray.forEach((filter) => {
              let filterText = filter.innerText.toLowerCase().trim().substring(0, 30);
              if (filterText == clickedText) {
                filter.querySelector('label').click();
                document.querySelector('.oct-listers-facet-burger-menu').classList.remove(`${ID}-pullingdata`);
                pollerLite(['.oct-listers__close'], () => {
                  document.querySelector('.oct-listers__close').click();
                });
                fireEvent(`Click - click on new personalised hero filter item - Checkbox - ${filterText}`, true);
              }
            });


          })

        }
      }

    });

  })


}

const pullFilters = (filterType) => {
  let filterHeadingArray = [];
  let allFilters = [].slice.call(document.querySelectorAll('.oct-listers-facets__item:not(.oct-listers-facets__item--inStock)'));

  let theCheckedFilters = allFilters.filter((filter) => {
    if (filter.classList.toString().indexOf('oct-listers-facets__item--') > -1 && filter.classList.toString().indexOf('oct-listers-facets__item--currentPrice') == -1) {
      return filter;
    } else {
      return false;
    }
  })

  if(filterType == "Rating") {
    theCheckedFilters.forEach((filter) => {
      if (filter.querySelector('.oct-listers-text').innerText.toLowerCase() == filterType.toLowerCase()) {
        filter.querySelector('button').click();
        pollerLite(['.rating-facet__child', '.oct-listers__goBack'], () => {
          filterHeadingArray = document.querySelectorAll('.rating-facet__child');
          document.querySelector('.oct-listers__goBack').click();
        })
      }

    });
  } else if (filterType == "Colour") {
    theCheckedFilters.forEach((filter) => {
      if (filter.querySelector('.oct-listers-text').innerText.toLowerCase() == filterType.toLowerCase()) {
        filter.querySelector('button').click();
        pollerLite(['.colour-facet__child', '.oct-listers__goBack'], () => {
          filterHeadingArray = document.querySelectorAll('.colour-facet__child');
          document.querySelector('.oct-listers__goBack').click();
        })
      }

    });
  } else {
    theCheckedFilters.forEach((filter) => {
      if (filter.querySelector('.oct-listers-text').innerText.toLowerCase() == filterType.toLowerCase()) {
        filter.querySelector('button').click();
        pollerLite(['.checkbox-list-facet__child', '.oct-listers__goBack'], () => {
          filterHeadingArray = document.querySelectorAll('.checkbox-list-facet__child');
          document.querySelector('.oct-listers__goBack').click();
        })
      }

    });
  }

  


  if (filterHeadingArray.length > 0) {
    return filterHeadingArray;
  } else {
    return [];
  }


}

const startFilterBar = (relevantFilters) => {

  let theFilterToBeUsed = '';
  let theFilterObjectsToBeUsed = [];
  let relevantFilterFound = false;
  let allFiltersToBeDisplayed = [];

  if (window.outerWidth < 992) {

    let filterCount = 0;

    if (!document.querySelector('.oct-listers-facet-burger-menu').classList.contains(`${ID}-pullingdata`)) {
      document.querySelector('.oct-listers-facet-burger-menu').classList.add(`${ID}-pullingdata`);
      document.querySelector('.oct-listers-facet-burger-menu > button').click();
    }

    relevantFilters.forEach((group) => {
      filterCount++;
      if (relevantFilterFound == false) {
        let filtersPulled = pullFilters(group.filterType);
        if (filtersPulled && filtersPulled.length > 0) {
          allFiltersToBeDisplayed = filtersPulled;

          allFiltersToBeDisplayed = [].slice.call(allFiltersToBeDisplayed);

          if (allFiltersToBeDisplayed != [] && allFiltersToBeDisplayed.length >= 3) {
            theFilterToBeUsed = group.filterType;
            theFilterObjectsToBeUsed = allFiltersToBeDisplayed;
            relevantFilterFound = true;
          }

        }
      }


    })

    if (filterCount == relevantFilters.length) {
      document.querySelector('.oct-listers-facet-burger-menu').classList.remove(`${ID}-pullingdata`);
      pollerLite(['.oct-listers__close'], () => {
        document.querySelector('.oct-listers__close').click();
      });
    }


    

  } else {

  

    relevantFilters.forEach((group) => {
    
      if(relevantFilterFound == false) {
        let allFilterHeadings = document.querySelectorAll('.oct-accordion__toggle-wrapper .oct-text');

        let filterHeadingArray = [].slice.call(allFilterHeadings);
        filterHeadingArray = filterHeadingArray.filter((heading) => {
          if(heading.innerText == group.filterType) {
            return true;
          }
        })
      
        if (filterHeadingArray.length > 0) {
          if (group.filterType == "Rating") {
            allFiltersToBeDisplayed = filterHeadingArray[0].closest('.oct-listers-facets__item').querySelectorAll('.rating-facet__child');
          } else if (group.filterType == "Colour") {
            allFiltersToBeDisplayed = filterHeadingArray[0].closest('.oct-listers-facets__item').querySelectorAll('.colour-facet__child');
          } else {
            allFiltersToBeDisplayed = filterHeadingArray[0].closest('.oct-listers-facets__item').querySelectorAll('.facet__child');
          }
        }
        

        allFiltersToBeDisplayed = [].slice.call(allFiltersToBeDisplayed);

        if (allFiltersToBeDisplayed != [] && allFiltersToBeDisplayed.length >= 3) {
          theFilterToBeUsed = group.filterType;
          theFilterObjectsToBeUsed = allFiltersToBeDisplayed;
          relevantFilterFound = true;
        }
      }
      
      
    });

  }
  
  logMessage(theFilterToBeUsed);
  let additionalClass = '';
  if(theFilterToBeUsed == "Promotions") {
    additionalClass = `${ID}-promotions-button`;
  }

  let numFilters = theFilterObjectsToBeUsed.length;
  if (numFilters <= 5) {
    additionalClass = `${ID}-few-filters`;
  }

  if(numFilters == 0) {
    additionalClass = `${ID}-no-filters`;
  }

  if(VARIATION == 2) {

    const filterGroupings = [

      {
        name: "promotionalText", type: "Promotions", top5: 
          [
            "1/2 price on selected Mothercare",
            "3 for 2 on selected Christmas Mix and Match",
            "Save up to 25 percent on selected fragrance",
            "1/2 price brands",
            "Use code XMAS20 to save 20 percent on selected christmas gifting - online only"
          ]
      },
      {
        name: "brand", type: "Brand", top5:
          [
            "boots",
            "no7",
            "oral b",
            "l'oreal",
            "philips"
          ]
      },
      {
        name: "product_type", type: "Product type", top5:
          [
            "gift set",
            "face moisturiser",
            "electric toothbrush",
            "shampoo",
            "mascara"
          ]
      },
      {
        name: "size", type: "Size", top5:
          [
            "71-100",
            "12-18 months",
            "2-3 years",
            "3-4 years",
            "201-499"
          ]
      },
      {
        name: "skin_type", type: "Skin type", top5:
          [
            "sensitive skin",
            "dry skin",
            "oily skin",
            "mature skin",
            "combination skin"
          ]
      },
      {
        name: "suitable_for", type: "Suitable for", top5:
          [
            "vegan",
            "kids",
            "adults",
            "vegetarian",
            "baby"
          ]
      },
      {
        name: "gift_type", type: "Gift type", top5:
          [
            "skincare gifts",
            "fragrance gifts",
            "bath & body gifts",
            "make up gifts",
            "stocking fillers"
          ]
      },
      {
        name: "key_features", type: "Key features", top5:
          [
            "cruelty-free",
            "waterproof",
            "cordless",
            "anti-ageing",
            "ISOFIX"
          ]
      },
      {
        name: "free_from", type: "Free from", top5:
          [
            "fragrance-free",
            "sulphate-free",
            "paraben-free",
            "alcohol-free",
            "silicone-free"
          ]
      },



    ];

    let filterGrouping = filterGroupings.filter((group) => {
      if(group.type == theFilterToBeUsed) {
        return group;
      }
    });

    if(filterGrouping.length > 0) {

      let unsortedFilterObjects = theFilterObjectsToBeUsed;
      theFilterObjectsToBeUsed = [];

      unsortedFilterObjects.forEach((filter) => {
        if(filterGrouping[0].top5.includes(filter.innerText.trim().toLowerCase().substring(0, filter.innerText.trim().toLowerCase().indexOf('(')))) {
          theFilterObjectsToBeUsed.unshift(filter);
        } else {
          theFilterObjectsToBeUsed.push(filter);
        }

      });

      unsortedFilterObjects = theFilterObjectsToBeUsed;

      theFilterObjectsToBeUsed = [];

      unsortedFilterObjects.forEach((filter) => {

        if (filter.classList.contains('checkbox-list-facet__child--selected')) {
          theFilterObjectsToBeUsed.unshift(filter);
        } else {
          theFilterObjectsToBeUsed.push(filter);
        }

      });

    }

  }
 
  

  if (VARIATION !== "control") {
    let newFilterHTML = `
        <div class="${ID}-hero-filters" data-filter-type="${theFilterToBeUsed}">
        
          <h2>Filter by <span id="${ID}-filter-type-name">${theFilterToBeUsed}</span></h2>
                
        
          <div class="${ID}-hero-filters--container ${ID}-swiper-container ${additionalClass}">
            <div class="${ID}-swiper-button-next" tabindex="-1"></div>
            <div class="${ID}-swiper-button-prev" tabindex="-1"></div>
            <div class="${ID}-hero-filters--items swiper-wrapper ${additionalClass}">
                ${theFilterObjectsToBeUsed.map((filter) => {

                  if(theFilterToBeUsed == "Rating") {
                    let selected = filter.classList.contains('rating-facet__child--selected') ? true : false;
                    let numStars = filter.getAttribute('aria-label').substring(0, filter.getAttribute('aria-label').indexOf('stars'));
                    return `<button data-stars="${numStars}" title="${numStars == 5 ? `${numStars} star${numStars == 1 ? `` : `s`} only` : `${numStars} stars & Up`}" class="${ID}-hero-item ${ID}-radio-item swiper-slide ${selected ? `${ID}-selected` : ``}"><span>${numStars == 5 ? `${numStars} star${numStars == 1 ? `` : `s`} only` : `${numStars} star${numStars == 1 ? `` : `s`} & Up`}</span></button>`;
                  } else if (theFilterToBeUsed == "Colour") {
                    let selected = filter.classList.contains('colour-facet__child--selected') ? true : false;
                    return `<button title="${filter.innerText.substring(0, filter.innerText.indexOf('('))}" class="${ID}-hero-item ${ID}-colour-item swiper-slide ${selected ? `${ID}-selected` : ``}"><span>${filter.innerText.substring(0, filter.innerText.indexOf('('))}</span></button>`;
                  } else {
                    let selected = filter.classList.contains('checkbox-list-facet__child--selected') ? true : false;
                    return `<button title="${filter.innerText.substring(0, filter.innerText.indexOf('('))}" class="${ID}-hero-item ${ID}-checkbox-item ${additionalClass} swiper-slide ${selected ? `${ID}-selected` : ``}"><span>${filter.innerText.substring(0, filter.innerText.indexOf('('))}</span></button>`;
                  }

                  
                }).join('')}

                
            </div>
            <div class="${ID}-swiper-scrollbar"></div>
          </div>
        
        </div>
      `;

    let insertionPoint = document.querySelector(`.${ID}-outer`);
    insertionPoint.insertAdjacentHTML('afterbegin', newFilterHTML);

    const swiper = new Swiper(
      `.${ID}-swiper-container`,
      {
        slidesPerView: 'auto',
        freeMode: true,
        loop: false,
        scrollbar: {
          el: `.${ID}-swiper-scrollbar`,
          draggable: true,
        },
        navigation: {
          nextEl: `.${ID}-swiper-button-next`,
          prevEl: `.${ID}-swiper-button-prev`,
        },

      }
    );

    window.addEventListener("resize", () => {
      swiper.update();
    });

    let oldHeroFilters = document.querySelector('.oct-grid__row[data-testid="HeroFilterWrapper"]');
    if(additionalClass == `${ID}-no-filters`) {
      
      oldHeroFilters.classList.remove(`${ID}-hidden`);
      document.querySelector(`.${ID}-outer`).classList.add(`${ID}-hidden`);

      let allOldHeroFilters = oldHeroFilters.querySelectorAll('.oct-listers-facets__item');
      if(allOldHeroFilters.length < 5) {
        oldHeroFilters.querySelector('.swiper-wrapper').classList.add(`${ID}-oldhero-few-filters`);
      }

    } else {
      oldHeroFilters.classList.add(`${ID}-hidden`);
      document.querySelector(`.${ID}-outer`).classList.remove(`${ID}-hidden`);
    }

    

    


  }

}

const startExperiment = () => {

  logMessage("Experiment started");
  pollerLite(['.oct-grid__row[data-testid="HeroFilterWrapper"]'], () => {

    if (localStorage.getItem(`${ID}-filter-usage`)) {

      var scriptElement = document.createElement("script");
      scriptElement.setAttribute(
        "src",
        "https://blcro.fra1.digitaloceanspaces.com/KG-234/swiper-bundle.min.js"
      );
      document.head.appendChild(scriptElement);
      scriptElement.addEventListener("load", function () {

        let relevantFilters = checkRelevantFilters();

        if (relevantFilters.length > 0) {

          if(VARIATION !== "control") {
            document.querySelector(`.${ID}-outer`)?.remove();
            let newFilterHTML = `
            <div class="${ID}-outer">
              
            </div>
          `;

            let insertionPoint = document.querySelector('.oct-grid__row[data-testid="HeroFilterWrapper"]');
            insertionPoint.classList.add(`${ID}-hidden`);
            insertionPoint.insertAdjacentHTML('beforebegin', newFilterHTML);
            startFilterBar(relevantFilters);

          }
          

          fireEvent(`Interaction - relevant filters found, latest one: [${relevantFilters[0].filterType}] - ${VARIATION == "control" ? `filters not shown` : `filters shown`}`, true);

        } else {

          fireEvent('Interaction - No relevant filters found', true);

        }

      });

    } else {

      fireEvent('Interaction - no filter usage so far');

    }


  })

}

const addToStorageArray = (filterName, filterType, currDate, currURL) => {

  if (!localStorage.getItem(`${ID}-filter-usage`)) {

    localStorage.setItem(`${ID}-filter-usage`, JSON.stringify([{ 'filterType': filterType, 'filterName': filterName, 'dateUsed': currDate, 'filterURL': currURL }]));

  } else {

    let currLSArray = JSON.parse(localStorage.getItem(`${ID}-filter-usage`));
    let toBeAdded = { 'filterType': filterType, 'filterName': filterName, 'dateUsed': currDate, 'filterURL': currURL };

    currLSArray.unshift(toBeAdded);

    if (currLSArray.length > 20) {
      currLSArray.pop();
    }

    localStorage.setItem(`${ID}-filter-usage`, JSON.stringify(currLSArray));


  }



}

const startFilterTracking = () => {

  document.body.addEventListener('click', (e) => {
    if (e.target.closest('.checkbox-list-facet__child') && e.target.tagName.toLowerCase() == "input") {

      let thisFilterType;
      if(window.outerWidth < 992) {
        thisFilterType = e.target.closest('.oct-listers-facets-wrapper').querySelector('.oct-listers__filter-by__heading').innerText;
      } else {
        thisFilterType = e.target.closest('.oct-accordion__item').querySelector('.oct-accordion__text-wrapper h2').innerText;
      }
      let thisFilterName = e.target.closest('.checkbox-list-facet__child').querySelector('.checkbox__label').innerText;
      let currURL = window.location.href.substring(0, window.location.href.indexOf('?'));
      let isCurrentlyActive = e.target.closest('.checkbox-list-facet__child').classList.contains('checkbox-list-facet__child--selected') ? true : false;
      thisFilterName = thisFilterName.substring(0, thisFilterName.indexOf('('));
      if (isCurrentlyActive === false) {
        addToStorageArray(thisFilterName, thisFilterType, Math.floor(new Date().getTime() / 1000), currURL);
        fireEvent(`click on checkbox filter: ${thisFilterName} with type: ${thisFilterType} - adding to storage array`, true);

      }
      
      
    }

    if (e.target.closest('.colour-facet__child')) {

      let thisFilterType = "Colour";
      let thisFilterName = e.target.closest('.colour-facet__child').querySelector('.colour-facet__child__name').innerText;
      let currURL = window.location.href.substring(0, window.location.href.indexOf('?'));
      fireEvent(`click on colour filter: ${thisFilterName} with type: ${thisFilterType} - adding to storage array`, true);
      addToStorageArray(thisFilterName, thisFilterType, Math.floor(new Date().getTime() / 1000), currURL);

    }

    if (e.target.closest('.rating-facet__child')) {
      let thisFilterType = "Rating";
      let thisFilterName = e.target.closest('.rating-facet__child').getAttribute('aria-label');
      thisFilterName = thisFilterName.substring(0, thisFilterName.indexOf('stars') + 5);
      let currURL = window.location.href.substring(0, window.location.href.indexOf('?'));
      fireEvent(`click on rating filter: ${thisFilterName} with type: ${thisFilterType} - adding to storage array`, true);
      addToStorageArray(thisFilterName, thisFilterType, Math.floor(new Date().getTime() / 1000), currURL);
    }
    
    if(e.target.closest('.oct-hero-filter')) {

      let slide = e.target.closest('.swiper-slide');
      let slideButtonText = slide.querySelector('.oct-hero-filter-swiper-slide__content').innerText;

      fireEvent(`Interaction - click on control hero filter item ${slideButtonText}`, true);

    }

  })


}

export default () => {

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  startFilterTracking();
  startExperiment();

  if(window.outerWidth > 992) {
    let oldHref = document.location.href;
    let bodyList = document.querySelector("body");
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (oldHref != document.location.href) {
          oldHref = document.location.href;

          let relevantFilters = checkRelevantFilters();

          if (document.querySelector(`.${ID}-outer`) && relevantFilters.length > 0) {
            if (document.querySelector(`.${ID}-outer`)) {
              document.querySelector(`.${ID}-hero-filters`).remove();
              startFilterBar(relevantFilters);

            }
          }

          if (document.querySelector(`.${ID}-outer`) && relevantFilters.length == 0) {
            document.querySelector(`.${ID}-outer`).remove();
            let insertionPoint = document.querySelector('.oct-grid__row[data-testid="HeroFilterWrapper"]');
            insertionPoint.classList.remove(`${ID}-hidden`);
          }

          if (!document.querySelector(`.${ID}-outer`) && relevantFilters.length > 0) {
            startExperiment();
          }

        }
      });
    });
    const config = {
      childList: true,
      subtree: true
    };

    observer.observe(bodyList, config);
  } else {

    let oldHref = document.location.href;
    
    setInterval(() => {
      if (oldHref != document.location.href) {
        
        if (!document.querySelector('.oct-listers-facet-sticky-ribbon').classList.contains('menu-open')) {
          oldHref = document.location.href;
          let relevantFilters = checkRelevantFilters();

          if (!document.querySelector(`.${ID}-outer`) && relevantFilters.length > 0) {
            startExperiment();
          }

          if (document.querySelector(`.${ID}-outer`) && relevantFilters.length > 0) {
            
            if (document.querySelector(`.${ID}-outer`)) {
              document.querySelector(`.${ID}-hero-filters`)?.remove();
              startFilterBar(relevantFilters);
            }
          }
        }
      }

    }, 1000);

  }
    
  document.body.addEventListener('click', (e) => {

    if (e.target.id == `${ID}-clear-all`) {
      e.preventDefault();
      document.querySelector(`.applied-filters__clear-all`).click();
      fireEvent(`Click - click on new personalised hero filter item - Clear all`, true);
    }

    if (e.target.closest(`.${ID}-hero-item`) || e.target.classList.contains(`${ID}-hero-item`)) {
      e.preventDefault();

      if (window.outerWidth < 992) {

        let currItem = e.target.classList.contains(`${ID}-hero-item`) ? e.target : e.target.closest(`.${ID}-hero-item`);
        let currFilterType = e.target.closest(`.${ID}-hero-filters`).getAttribute('data-filter-type');
        clickMobileFilter(currItem, currFilterType);



      } else {

        let currItem = e.target.classList.contains(`${ID}-hero-item`) ? e.target : e.target.closest(`.${ID}-hero-item`);
        if (currItem.classList.contains(`${ID}-radio-item`)) {
          let numStars = currItem.getAttribute('data-stars');
          let starSelector = `#RadioCount-${numStars}`;
          document.querySelector(starSelector).click();
          fireEvent(`Click - click on new personalised hero filter item - Rating - ${numStars} stars`, true);

        } else if (currItem.classList.contains(`${ID}-colour-item`)) {
          let allColourFilters = document.querySelectorAll('.colour-facet__child');
          let clickedText = e.target.innerText.toLowerCase().trim();
          allColourFilters.forEach((filter) => {
            let filterText = filter.innerText.toLowerCase().substring(0, filter.innerText.toLowerCase().trim().indexOf('(')).trim();
            if (filterText === clickedText) {
              filter.click();
              fireEvent(`Click - click on new personalised hero filter item - Colour - ${filterText}`, true)
            }
          });


        } else {
          let allCheckboxes = document.querySelectorAll('.oct-listers-facets-wrapper .checkbox__label');
          let clickedText = e.target.innerText.toLowerCase().trim();
          allCheckboxes.forEach((checkbox) => {
            let checkboxText = checkbox.innerText.toLowerCase().trim().substring(0, checkbox.innerText.toLowerCase().trim().indexOf('('));
            if (checkboxText === clickedText) {
              checkbox.closest('label').click();
              fireEvent(`Click - click on new personalised hero filter item - Checkbox - ${checkboxText}`, true);
            }
          });
        }




      }





    }

  })

};
