import { events } from './../../../../../lib/utils';
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

export const fireEvent = (label) => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  events.sendAuto(VARIATION, label);

}

export const clickEvents = () => {
  const { ID, VARIATION } = shared;

  // --- Go to Bag CTA
  let goToBagCta = document.querySelector(`.${ID}-addedToBagMsg__wrapper .${ID}-goToBag`);
  goToBagCta.addEventListener('click', () => {
    fireEvent(`Click - Go to Bag CTA`);
  });
  // --- Go Back CTA
  let goBackCta = document.querySelector(`.${ID}-addedToBagMsg__wrapper .${ID}-goBackLink`);
  if (goBackCta ) {
    goBackCta .addEventListener('click', () => {
      fireEvent(`Click - Go Back to PLP CTA`);
    });
  
  }
  
}

export const getBagTotal = () => {
  const { ID, VARIATION } = shared;

  let bagTotal = document.querySelector('#bagTotal').innerText.trim().replace('£', '');
  bagTotal = parseFloat(bagTotal);

  return bagTotal;
}

export const pageIsPlp = (url) => {
  const { ID, VARIATION } = shared;

  let plpCheck = false;
  let listOfPLPs = ['/men', '/women', '/kids-and-baby', '/brand', '/beauty', '/home-and-furniture', '/sports', '/sport-and-fitness', '/sale', '/shoes-and-boots', '/accessories', '/bags-and-luggage', '/searchresults' ];

  for (let i = 0; i < listOfPLPs.length; i += 1) {
    let plp = listOfPLPs[i];

    if (url.indexOf(`${plp}`) > -1) {
      plpCheck = true;
      break;
    }
  }

  return plpCheck;
}
