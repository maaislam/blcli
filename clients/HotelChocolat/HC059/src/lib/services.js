import { events, pollerLite } from './../../../../../lib/utils';
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
  

  export const clickEvents = () => {
    const { ID, VARIATION } = shared;
  
    // --- Search Input
    const searchInput = document.querySelector('#search-form input');
    searchInput.addEventListener('click', (e) => {
      fireEvent(`Click - Search Input`);
    });

    // --- Popular Searches
    const popularSearches = document.querySelectorAll(`.${ID}-search-suggestion-wrapper .phrase-suggestions .hitgroup .hit`);

    [].forEach.call(popularSearches, (searchItem) => {
      searchItem.addEventListener('click', (e) => {
        let searchTerm = searchItem.innerText.trim();
        fireEvent(`Click - Popular Searches - ${searchTerm}`);
      });
    });

    // --- Velvetiser Offer - Desktop
    const velvetiserDesktop = document.querySelector(`.${ID}-search-suggestion-wrapper .search-phrase`);
    let allVelvetisers = velvetiserDesktop.querySelectorAll(`ul.${ID}-velvetiserOptions__wrapper a`);
    [].forEach.call(allVelvetisers, (velvetiser) => {
      velvetiser.addEventListener('click', (e) => {
        let velvetiserId = velvetiser.getAttribute('id');
        fireEvent(`Click - Velvetiser ${velvetiserId} - Desktop`);
      });
    });
    

    // --- Velvetiser Offer - Mobile
    const velvetiserMobile = document.querySelector(`.${ID}-search-suggestion-wrapper .offer-mobile`);
    velvetiserMobile.addEventListener('click', (e) => {
      fireEvent(`Click - Velvetiser Offer - Mobile`);
    });
  
  }
