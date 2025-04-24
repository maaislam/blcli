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

    const allBanners = document.querySelectorAll(`.${ID}-tiles__wrapper .${ID}-tile__item`);

    [].forEach.call(allBanners, (banner) => {
      banner.addEventListener('click', (e) => {
        const bannerData = banner.getAttribute('data-event');
        const bannerUrl = banner.getAttribute('href');
        fireEvent(`Click - User click on ${bannerData} banner - ${bannerUrl}`);
      });
      
    });

  }
  
