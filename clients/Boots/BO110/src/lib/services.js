import { events, pollerLite, eventFire } from './../../../../../lib/utils';
import shared from './shared';

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  // set up events
  events.setDefaultCategory('Experimentation');
  events.setDefaultAction(CLIENT + " - "+ID);

  if(LIVECODE == "true") {
    events.sendEvents = false;
  } else {
    events.sendEvents = true;
  }

  // adds document body classlist 
  document.documentElement.classList.add(ID);
  document.documentElement.classList.add(`${ID}-${VARIATION}`);
};

export const fireEvent = (label) => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  events.sendAuto(VARIATION, label);

}


/*  ----------------
  Cookie opt in check
  ------------------ */
  export const cookieOpt = () => {
    const { ID, VARIATION } = shared;

    pollerLite([
     () => {
      return !!window.ga
     }], () => {
       fireEvent(`${ID}-${VARIATION} Experiment Fired`);
     });
  }

  export const clickRatingFilter = () => {
    const { ID, VARIATION } = shared;

    const allRatingFilters = document.querySelectorAll(`.${ID}-filterRating__wrapper ul.${ID}-filter-options li.${ID}-star-filter`);

    [].forEach.call(allRatingFilters, (filter) => {
      let filterBy = filter.getAttribute('data-filter-by');
      filter.addEventListener('click', (e) => {
        
        if (document.querySelector('select.bv-content-filter-select-element.bv-dropdown[data-bv-filter-for="Rating"]')) {
          // --- Mobile
          // alert('MOBILE');
          selectFilterRatingMobile(filterBy);
        } else {
          // --- Desktop
          // alert('DESKTOP');
          selectFilterRating(filterBy);
        }

        fireEvent(`Click - Review Stars Filter - ${filterBy}`);

      });
    });
  }

  export const expClickEvents = () => {
    const { ID, VARIATION } = shared;

    // --- Top Star Ratings
    pollerLite(['.bv-primarySummary-rating-container'], () => {
      const topStars = document.querySelector('.bv-primarySummary-rating-container');
      topStars.addEventListener('click', (e) => {
        fireEvent(`Click - Top Review Stars`);
      });
    });


    // --- Add to Bag CTA
    pollerLite(['#add2CartBtn'], () => {
      const addToBagCTA = document.querySelector('#add2CartBtn');
      addToBagCTA .addEventListener('click', (e) => {
        fireEvent(`Click - Add to Bag`);
      });
    });
  }

  export const selectFilterRatingMobile = (filterBy) => {
    const { ID, VARIATION } = shared;

    if (!document.querySelector('select.bv-content-filter-select-element.bv-dropdown[data-bv-filter-for="Rating"] option')) {
      document.querySelector('button.bv-content-btn.bv-filter-control.bv-expand-filter-button.bv-focusable').click();
      const filterRatingBtn = document.querySelector('.bv-dropdown[data-bv-filter-for="Rating"]');
      pollerLite(['.bv-dropdown[data-bv-filter-for="Rating"]'], () => {
        filterRatingBtn.click();

        pollerLite(['select.bv-content-filter-select-element.bv-dropdown[data-bv-filter-for="Rating"] option'], () => {
          const ratingFilterSelect = document.querySelector('select.bv-content-filter-select-element.bv-dropdown[data-bv-filter-for="Rating"]');
          for (let i = 0; i < ratingFilterSelect.length; i += 1) {
            let opt = ratingFilterSelect.options[i];
            if (opt.textContent.trim() === filterBy) {
              opt.selected = true;
              opt.selected = 'selected';

              break;
            }
          }
          eventFire(ratingFilterSelect, 'change');

          
        });
      });
    } else if (!document.querySelector('.bv-dropdown[data-bv-filter-for="Rating"]')) {
      pollerLite(['.bv-dropdown[data-bv-filter-for="Rating"]'], () => {
        const filterRatingBtn = document.querySelector('.bv-dropdown[data-bv-filter-for="Rating"]');
        filterRatingBtn.click();

        pollerLite(['select.bv-content-filter-select-element.bv-dropdown[data-bv-filter-for="Rating"] option'], () => {
          const ratingFilterSelect = document.querySelector('select.bv-content-filter-select-element.bv-dropdown[data-bv-filter-for="Rating"]');
          for (let i = 0; i < ratingFilterSelect.length; i += 1) {
            let opt = ratingFilterSelect.options[i];
            if (opt.textContent.trim() === filterBy) {
              opt.selected = true;
              opt.selected = 'selected';

              break;
            }
          }
          eventFire(ratingFilterSelect, 'change');

          

          
        });
      });

    } else {
      pollerLite(['select.bv-content-filter-select-element.bv-dropdown[data-bv-filter-for="Rating"]'], () => {
        const ratingFilterSelect = document.querySelector('select.bv-content-filter-select-element.bv-dropdown[data-bv-filter-for="Rating"]');
        for (let i = 0; i < ratingFilterSelect.length; i += 1) {
          let opt = ratingFilterSelect.options[i];
          if (opt.textContent.trim() === filterBy) {
            opt.selected = true;
            opt.selected = 'selected';

            break;
          }
        }
        eventFire(ratingFilterSelect, 'change');

        
      });
    }
    
    
  }

  export const selectFilterRating = (filterBy) => {
    const { ID, VARIATION } = shared;

    if (!document.querySelector('ul#bv-content-filter-dropdown-Rating li.bv-dropdown-item')) {
      document.querySelector('button.bv-content-btn.bv-filter-control.bv-expand-filter-button.bv-focusable').click();
      const filterRatingBtn = document.querySelector('.bv-dropdown[data-bv-filter-for="Rating"] button');
      pollerLite(['.bv-dropdown[data-bv-filter-for="Rating"] button'], () => {
        filterRatingBtn.click();

        pollerLite(['ul#bv-content-filter-dropdown-Rating li.bv-dropdown-item'], () => {
          const allStarOptions = document.querySelectorAll('ul#bv-content-filter-dropdown-Rating li.bv-dropdown-item');
          [].forEach.call(allStarOptions, (option) => {

            if (option.querySelector('span').innerText.trim() == filterBy) {
              option.click();
              // break;
            }

            
          });

          
        });
      });
    } else if (!document.querySelector('.bv-dropdown[data-bv-filter-for="Rating"] button')) {
      pollerLite(['.bv-dropdown[data-bv-filter-for="Rating"] button'], () => {
        const filterRatingBtn = document.querySelector('.bv-dropdown[data-bv-filter-for="Rating"] button');
        filterRatingBtn.click();

        pollerLite(['ul#bv-content-filter-dropdown-Rating li.bv-dropdown-item'], () => {
          const allStarOptions = document.querySelectorAll('ul#bv-content-filter-dropdown-Rating li.bv-dropdown-item');

          [].forEach.call(allStarOptions, (option) => {
            if (option.querySelector('span').innerText.trim() == filterBy) {
              option.click();
              // break;
            }

            
          });

          
        });
      });

    } else {
      pollerLite(['ul#bv-content-filter-dropdown-Rating li.bv-dropdown-item'], () => {
        const allStarOptions = document.querySelectorAll('ul#bv-content-filter-dropdown-Rating li.bv-dropdown-item');
        [].forEach.call(allStarOptions, (option) => {


          if (option.querySelector('span').innerText.trim() == filterBy) {
            option.click();
          }

          
        });

        
      });
    }
    
    
  }


  
