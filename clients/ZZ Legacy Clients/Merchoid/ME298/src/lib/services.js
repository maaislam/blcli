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

export const observeWindowWidthAndReload = () => {
  const { ID, VARIATION } = shared;

  let windowWidth = document.body.clientWidth;
  let device = '';
  if (windowWidth > 768) {
    device = 'desktop';
  } else {
    device = 'mobile';
  }
  window.addEventListener("resize", function(event) {
    if (document.body.clientWidth > 768 && device == 'mobile') {
      device = 'desktop';
      // --- Window re-size - From MOBILE to DESKTOP
      // -- Reload
      window.location.reload();
    } else if (document.body.clientWidth <= 768 && device == 'desktop') {
      device = 'mobile';
      // --- Window re-size - From DESKTOP to MOBILE
      // -- Reload
      window.location.reload();
    }
  });
  
};
