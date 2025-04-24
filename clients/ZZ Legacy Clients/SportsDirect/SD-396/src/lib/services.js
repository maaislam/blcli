import { events } from './../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';
import shared from './shared';

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  // set up events
  events.setDefaultCategory('Experimentation');
  events.setDefaultAction(CLIENT + " - "+ID);
  events.analyticsReference = '_gaUAT';

  if(LIVECODE == "true") {
    events.sendEvents = false;
  } else {
    events.sendEvents = true;
  }

  // adds document body classlist 
  document.documentElement.classList.add(ID);
  document.documentElement.classList.add(`${ID}-${VARIATION}`);
};

export const fireEvent = (label, sendOnce = false) => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  let labelMessage = "Test ID: "+ID+" Variation: "+VARIATION+" Label: "+label;

  events.sendNormalised(labelMessage, {
    sendOnce: sendOnce
  });

}

export const getUrlParameter = (name, url) => {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,'\\\]');
  const regexS = `[\\?#]${name}=([^&#]*)`;
  const regex = new RegExp(regexS);
  const results = regex.exec(url);
  return results == null ? null : results[1];
};

export const checkProductView = () => {
  const { ID, VARIATION } = shared;

  let view = '';
  if (document.querySelector('#divColumnSelection ul.columnselector li.colopt3.selected')) {
    view = 'colopt3';
  } else if (document.querySelector('#divColumnSelection ul.columnselector li.colopt4.selected')) {
    view = 'colopt4';
  }

  return view;
}

export const clickEvents = () => {
  const { ID, VARIATION } = shared;

  // --- Dismiss Modal
  pollerLite([`#${ID}-dismiss`], () => {
    const dismissCTA = document.querySelector(`#${ID}-dismiss`);
    dismissCTA.addEventListener('click', () => {
      localStorage.setItem(`${ID}-size-filters-dismissed`, true);

      fireEvent('Click - Popular Sizes Filter dismissed');

      let trainerSizesContainer = document.querySelector(`.${ID}-popularSizes__wrapper`);
      if (trainerSizesContainer) {
        trainerSizesContainer.parentElement.removeChild(trainerSizesContainer);
      }
      
    });
  });
  
  
}

export const observeWindowWidthAndResetContent = () => {
  const { ID, VARIATION } = shared;

  let windowWidth = document.body.clientWidth;
  let device = '';
  if (windowWidth > 767) {
    device = 'desktop';
  } else {
    device = 'mobile';
  }
  window.addEventListener("resize", function(event) {
    if (document.body.clientWidth > 767 && device == 'mobile') {
      device = 'desktop';
      // --- Window re-size - From MOBILE to DESKTOP
      resetExperimentContent();
    } else if (document.body.clientWidth <= 767 && device == 'desktop') {
      device = 'mobile';
      // --- Window re-size - From DESKTOP to MOBILE
      resetExperimentContent();
    }
  });
  
};

export const resetExperimentContent = () => {
  const { ID, VARIATION } = shared;

  let trainerSizesContainer = document.querySelector(`.${ID}-popularSizes__wrapper`);
  if (trainerSizesContainer) {
    trainerSizesContainer.parentElement.removeChild(trainerSizesContainer);
  }

  if (window.location.pathname.indexOf('/mens/') > -1) {
    generateSizesBanner('mens');
  } else if (window.location.pathname.indexOf('/ladies/') > -1) {
    generateSizesBanner('ladies');
  }

  // --- Select Filter
  selectSizeFilter();

  // --- Click Events
  clickEvents();
  
};



export const getSizesFilter = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  const allFilters = document.querySelectorAll('ul#filterlist li.productFilter');
  for (let i = 0; i <= allFilters.length - 1; i += 1) {
    let filter = allFilters[i];

    if (filter.querySelector('h3.productFilterTitle')) {
      let title = filter.querySelector('h3.productFilterTitle').innerText.trim().toLowerCase();
      if (title == "size") {
        filter.classList.add(`${ID}-sizeFilter`);

        break;
      }
    }
  }

  // --- If Size Filters exist, then loop through the list and add experiment IDs
  if (document.querySelector(`li.${ID}-sizeFilter`)) {
    let allSizeFilters = document.querySelectorAll(`li.${ID}-sizeFilter .productFilterList .FilterListItem`);
    [].forEach.call(allSizeFilters, (filter) => {
      let getSize = filter.getAttribute('data-productname');
      if (getSize.indexOf('.5') > -1) {
        getSize = getSize.replace('.5', '');
        filter.setAttribute('id', `${ID}-size__${getSize}-half`);
      } else {
        filter.setAttribute('id', `${ID}-size__${getSize}`);
      }
    });
  }

}

export const generateSizesBanner = (genre) => {
  const { ID, VARIATION } = shared;
  let mensPopularSizes = ['7', '8', '9', '10', '11', '12', '13', '14'];
  let ladiesPopularSizes = ['3', '4', '5', '6', '7', '8', '9', '10'];

  let listOfSizes = '';
  let popularSizes;
  if (genre == 'ladies') {
    popularSizes = ladiesPopularSizes;
  } else if (genre == 'mens') {
    popularSizes = mensPopularSizes;
  }
  for (let i = 0; i < popularSizes.length; i += 1) {
    let size = popularSizes[i];
    let halfsize = popularSizes[i] + ".5";
    listOfSizes +=`<li class="${ID}-size" data-size-filter="${ID}-size__${size}">
      <div>SIZE ${size}, ${halfsize}</div>
    </li>`;
  }
  
  const trainerSizesContainer = `<div class="${ID}-popularSizes__wrapper">
    <h3>Shop Your Size</h3>
    <ul class="${ID}-popularSizes">${listOfSizes}</ul>
    <span id="${ID}-dismiss">Don't show this again</span>
  </div>`;
 
  

  if (window.innerWidth > 767) {
    if (checkProductView() == 'colopt3') {
      document.querySelectorAll('ul#navlist.s-productscontainer2 li')[2].insertAdjacentHTML('afterend', trainerSizesContainer);
    } else if (checkProductView() == 'colopt4') {
      document.querySelectorAll('ul#navlist.s-productscontainer2 li')[3].insertAdjacentHTML('afterend', trainerSizesContainer);
    }
  } else {
    document.querySelectorAll('ul#navlist.s-productscontainer2 li')[1].insertAdjacentHTML('afterend', trainerSizesContainer);
  }
  
  
  

}

export const selectSizeFilter = () => {
  const { ID, VARIATION } = shared;

  let allSizes = document.querySelectorAll(`.${ID}-popularSizes__wrapper li`);
  [].forEach.call(allSizes, (size) => {
    size.addEventListener('click', () => {
      let getSizeId = size.getAttribute('data-size-filter');
      if (document.querySelector(`#${getSizeId}`)) {

        fireEvent(`Click - Size Filter CTA - Size ${getSizeId}`);
        document.querySelector(`#${getSizeId} a`).click();
        if (document.querySelector(`#${getSizeId}-half`)) {
          document.querySelector(`#${getSizeId}-half a`).click();
        }
      }

      
    });
    
  });
}
