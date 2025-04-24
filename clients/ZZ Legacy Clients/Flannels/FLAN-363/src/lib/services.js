import { events, pollerLite, logMessage } from './../../../../../lib/utils';
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

export const addCarbonNeutralTag = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  const carbonNeutralTag = `
  
    <div class="${ID}-carbonNeutral__wrapper">
      <div class="${ID}-carbonNeutral__inner">
        <svg height="16px" width="16px" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path fill="#ffffff" d="M8.778,69.438c0.155-0.289,0.317-0.579,0.489-0.867c0.668-1.162,1.464-2.313,2.375-3.415  c1.814-2.218,4.13-4.163,6.642-5.777c2.524-1.602,5.261-2.85,8.016-3.91c2.757-1.07,5.565-1.917,8.327-2.749  c2.762-0.833,5.504-1.584,8.147-2.419c2.651-0.813,5.213-1.68,7.64-2.634c2.427-0.949,4.715-1.991,6.817-3.108  c2.1-1.123,4.02-2.312,5.724-3.521c1.703-1.21,3.207-2.418,4.481-3.565c0.315-0.29,0.622-0.57,0.918-0.841  c0.286-0.282,0.562-0.554,0.827-0.814c0.546-0.51,1.004-1.02,1.442-1.462c0.845-0.904,1.488-1.638,1.924-2.158  c0.438-0.514,0.672-0.787,0.672-0.787c0.09-0.104,0.247-0.116,0.352-0.026c0.091,0.077,0.112,0.208,0.057,0.31  c0,0-0.175,0.314-0.502,0.905c-0.312,0.593-0.841,1.443-1.528,2.521c-0.7,1.063-1.58,2.347-2.725,3.719  c-1.135,1.378-2.481,2.897-4.102,4.412c-1.616,1.519-3.484,3.05-5.58,4.504c-2.085,1.475-4.417,2.822-6.873,4.108  c-2.467,1.259-5.074,2.425-7.736,3.5c-2.666,1.066-5.373,2.084-8.044,3.069c-2.67,0.985-5.281,2.007-7.738,3.088  c-2.459,1.081-4.718,2.31-6.688,3.653c-0.565,0.396-1.103,0.805-1.615,1.224c-0.295,0.175-0.588,0.353-0.878,0.536  c-2.512,1.614-4.826,3.56-6.641,5.778c-0.911,1.101-1.707,2.252-2.375,3.414c-0.689,1.154-1.229,2.325-1.711,3.455  c-0.93,2.274-1.486,4.419-1.849,6.312c-0.363,1.896-0.526,3.541-0.644,4.891c-0.094,1.348-0.144,2.402-0.148,3.117  c-0.007,0.358-0.013,0.633-0.015,0.817c0.012,0.046-0.032,0.087,0.026,0.122c0.105,0.035,0.586,0.065,1.163,0.089  c0.291,0.012,0.546,0.021,0.765,0.03c0.345,0.009,0.634,0.017,0.864,0.022c0.462,0.011,0.694,0.017,0.694,0.017  c0.149,0.003,0.336,0.004,0.487,0h0.008c0,0,0.233-0.005,0.695-0.017c0.231-0.005,0.52-0.012,0.865-0.02  c0.219-0.008,0.475-0.018,0.766-0.027c0.577-0.021,1.06-0.045,1.166-0.075c0.059-0.03,0.017-0.066,0.031-0.106  c0.002-0.162,0.005-0.402,0.009-0.716c-0.001-0.629,0.036-1.541,0.107-2.693c0.092-1.146,0.219-2.536,0.503-4.073  c0.291-1.533,0.704-3.224,1.356-4.948c0.346-0.851,0.721-1.728,1.204-2.573c0.031-0.057,0.065-0.113,0.098-0.171  C87.151,102.087,93.768,5,93.768,5C85.136,31.883,12.067,13.634,8.778,69.438z"></path></svg>
        <span>Carbon Neutral Delivery</span>
      </div>
      <a href="#" class="${ID}-tooltip-button">i</a>  
      <div class="${ID}-hover-box">
        <p>Flannels are delighted to partner with DPD to offer a certified 'Carbon Neutral' delivery service.</p>
      </div>

    </div>
    
    `
    
  ;

  pollerLite(['section.deliverySection .radioOptionsGroup li'], () => {

    
    setTimeout(() => {
      let deliveryOptions = document.querySelectorAll('section.deliverySection .radioOptionsGroup li');

      logMessage("adding carbon neutral tags to "+deliveryOptions.length+" lis");

      [].forEach.call(deliveryOptions, (option) => {
        // --- Remove Tag before re-adding
        if (option.querySelector(`.${ID}-carbonNeutral__wrapper`)) {
          let tag = option.querySelector(`.${ID}-carbonNeutral__wrapper`);
          tag.parentElement.removeChild(tag);
        }
        let optionTitle = option.querySelector('h3').innerText.trim();
        if (optionTitle.indexOf('Delivery') > -1 || optionTitle.indexOf('Collect') > -1) {
          if (window.innerWidth < 500) {
            // --- MOBILE
            option.querySelector('h3').insertAdjacentHTML('afterend', carbonNeutralTag);
          } else {
            // --- DESKTOP
            option.querySelector('.deliveryPrice').insertAdjacentHTML('beforebegin', carbonNeutralTag);
          }
          if(window.outerWidth > 499) {
            option.querySelector(`.${ID}-tooltip-button`).addEventListener('mouseenter', (e) => {
              e.target.nextElementSibling.classList.add('visible');
              fireEvent('Visible - desktop tooltip shown', true)
            })
  
            option.querySelector(`.${ID}-tooltip-button`).addEventListener('mouseleave', (e) => {
              e.target.nextElementSibling.classList.remove('visible');
            })
          } else {
            option.querySelector(`.${ID}-tooltip-button`).addEventListener('click', (e) => {
              
              
              if(e.target.nextElementSibling.classList.contains('visible')) {
                e.target.nextElementSibling.classList.remove('visible');
              } else {

                let allHovers = document.querySelectorAll(`.${ID}-hover-box`);
                [].slice.call(allHovers).forEach((hover) => {
                  hover.classList.remove('visible');
                });

                e.target.nextElementSibling.classList.add('visible');
              }
              
              fireEvent('Visible - mobile tooltip shown', true)
            })
          }
          
  
          fireEvent(`Visible - Carbon Neutral Tag added to ${optionTitle} option`);
        }
        
      });

    }, 500);
    

  })
  

}

export const observeWindowWidth = () => {
  const { ID, VARIATION } = shared;

  let windowWidth = document.body.clientWidth;
  let device = '';
  if (windowWidth > 500) {
    device = 'desktop';
  } else {
    device = 'mobile';
  }

  let pageTitle = document.querySelector('h1');

  window.addEventListener("resize", function(event) {
    if (document.body.clientWidth > 500 && device == 'mobile') {
      device = 'desktop';
      // --- Window re-size - From MOBILE to DESKTOP
      addCarbonNeutralTag();

    } else if (document.body.clientWidth <= 500 && device == 'desktop') {
      device = 'mobile';
      // --- Window re-size - From DESKTOP to MOBILE
      addCarbonNeutralTag();
      
    }
  });
  
};
