import shared from '../../../../../core-files/shared';
import { fireEvent } from '../../../../../core-files/services';
import { nextDay, isAfterCutoff, arriveBy } from './nextDayDelivery';

const { ID, VARIATION } = shared;

export const checkPageView = () => {
  const pageViewToggle = document.querySelector('#main #primary .pagination .toggle-grid');
  let pageView = '';
  if (pageViewToggle.querySelector('.grid-view.active')) {
    pageView = `${ID}-grid-view`;
  } else if (pageViewToggle.querySelector('.list-view.active')) {
    pageView = `${ID}-list-view`;
  }

  return pageView;
}

export const updateByPageView = () => {
  const pageView = checkPageView();

  if (document.querySelector(`.${ID}-plp-tile__wrapper`)) {
    switch(pageView) {
      case `${ID}-grid-view`:
        // code block
        document.querySelector(`.${ID}-plp-tile__wrapper`).classList.remove(`${ID}-list-view`);
        document.querySelector(`.${ID}-plp-tile__wrapper`).classList.add(`${ID}-grid-view`);
        
        break;
      case `${ID}-list-view`:
        // code block
        document.querySelector(`.${ID}-plp-tile__wrapper`).classList.remove(`${ID}-grid-view`);
        document.querySelector(`.${ID}-plp-tile__wrapper`).classList.add(`${ID}-list-view`);

        break;
    }
  }
  
}

export const generatePlpTileContent = (productList) => {
  // get PLP tile height
  const tileHeight = productList.querySelector('li.grid-tile div.product-tile').getAttribute('style');
  // generate content
  const newTile = `<li class="${ID}-plp-tile__wrapper grid-tile ${checkPageView()}">
    <div class="product-tile" style="${tileHeight}">
      <div class="${ID}-top-section"></div>
      <div class="${ID}-main-section tile-v${VARIATION}">
        <div class="${ID}-message__wrapper">
          <div class="${ID}-message"></div>
        </div>
      </div>
    </div>
  </li>`;

  return newTile;
}

export const addTileMessage = () => {
  
  let message = '';
  if (VARIATION == '1') {
    message = `Next Day &amp;</br>Saturday Delivery</br>available from £4.95`;
  } else if (VARIATION == '2') {
    message = `<strong class="bold">Whoosh!</strong></br>Deliver a gift to their smartphone</br>within minutes.`;
  } else if (VARIATION == '3') {
    const today = new Date();
    // -- Check if day is Saturday
    if (today.getDay() !== 6) {
      message = `Order in</br><strong><span id="${ID}-days"></span> <span id="${ID}-hours"></span></strong> <strong><span id="${ID}-mins"></span></strong> for</br>Next Day Delivery`;
    } else {
      message = `Order in the next</br><strong><span id="${ID}-days"></span> <span id="${ID}-hours"></span></strong> <strong><span id="${ID}-mins"></span></strong></br>for delivery on Monday`;
    }
    
  }
  
  document.querySelector(`.${ID}-plp-tile__wrapper .${ID}-message`).innerHTML = message;

  if (VARIATION == '3') {
    nextDay();
  }

}
