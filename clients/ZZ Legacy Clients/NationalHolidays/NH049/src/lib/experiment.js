/**
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events, viewabilityTracker } from '../../../../../lib/utils';
import settings from './settings';

let isPollRunning = false;

/**
 * Helper move cat hotspots
 */
const moveCatHotspots = (after) => {
  const catHotspots = cacheDom.get('.main-content .content #ctl00_ContentPane');
  if(after && catHotspots) {
    after.insertAdjacentHTML('afterend', `
      <div class="container ${settings.ID}-hotspots-target"></div>
    `);

    const hotspotsTarget = document.querySelector(`.${settings.ID}-hotspots-target`);
    if(hotspotsTarget) {
      hotspotsTarget.insertAdjacentElement('beforeend', catHotspots);
    }
  }
}

/**
 * Helper gen quote1
 */
const getQuote1 = () => {
  return `
    <div class="container ${settings.ID}-quote-container ${settings.ID}-quote-container--1">
      <div class="${settings.ID}-flex">
        <div class="${settings.ID}-col">
          <blockquote class="${settings.ID}-blockquote">
            <img src="${settings.ICONS.bubble_star_o}">
            <div>
              "Great value for money, fantastic service and fun times with other travellers"
              <span class="${settings.ID}-author">Andrew Bennett-Steele via Facebook</span>
            </div>
          </blockquote>
        </div>
        <div class="${settings.ID}-col ${settings.ID}-byline">
          Discover the fun of National Holidays for yourself
        </div>
      </div>
    </div>
  `;
};

/**
 * Helper get quote 2
 */
const getQuote2 = () => {
  return `
    <div class="${settings.ID}-quote-container ${settings.ID}-quote-container--1">
      <div class="${settings.ID}-flex ${settings.ID}-mw1000">
        <div class="${settings.ID}-col">
          <blockquote class="${settings.ID}-blockquote">
            <img src="${settings.ICONS.bubble_star_o}">
            <div>
              "Excellent value! First time with National Holidays, but sure it won't be my last! 
              Would definitely recommend"
              <span class="${settings.ID}-author">Emma Cameron-Pryde via Facebook</span>
            </div>
          </blockquote>
        </div>
        <div class="${settings.ID}-col ${settings.ID}-byline">
          Discover the fun of National Holidays for yourself
        </div>
      </div>
    </div>
  `;
};

/**
 * No departure region chosen yet..
 */
const noDepartureLocationSetYet = () => {
  const noCookieSelect = cacheDom.get('#noCookieDepSelect');

  events.send(`${settings.ID}`, 'no-depature-location-set', '', {
    sendOnce: true  
  });

  // ----------------------------------------------
  // Move category hotspots
  // ----------------------------------------------
  moveCatHotspots(noCookieSelect);
  
  // ----------------------------------------------
  // Add quotes to 'no cookie select'
  // ----------------------------------------------
  if(noCookieSelect) {
    noCookieSelect.insertAdjacentHTML('beforeend', getQuote1());

    viewabilityTracker(noCookieSelect, () => {
      events.send(`${settings.ID}`, 'did-see-quote-1', '', {
        sendOnce: true  
      });
    });
  }
  
  // ----------------------------------------------
  // Add quote under recommended carousel
  // ----------------------------------------------
  const recommendedSlider = cacheDom.get('#ctl00_BottomPane [id*=DivUpcomingSlider');
  if(recommendedSlider) {
    recommendedSlider.insertAdjacentHTML('afterend', getQuote2());

    viewabilityTracker(recommendedSlider, () => {
      events.send(`${settings.ID}`, 'did-see-quote-2', '', {
        sendOnce: true  
      });
    });
  }
};

/**
 * Depature Location chosen
 */
const departureLocationExists = () => {
  const latestSliderWrap = document.querySelector('#ctl00_ctl00_pnlResults');
  const latestSlider = document.querySelector('#ctl00_ctl00_pnlResults section');

  events.send(`${settings.ID}`, 'depature-location-set', '', {
    sendOnce: true  
  });

  // ----------------------------------------------
  // Move category hotspots
  // ----------------------------------------------
  moveCatHotspots(latestSliderWrap);
  
  // ----------------------------------------------
  // Add quotes to 'no cookie select'
  // ----------------------------------------------
  if(latestSlider) {
    latestSlider.insertAdjacentHTML('beforeend', getQuote1());

    viewabilityTracker(latestSlider, () => {
      events.send(`${settings.ID}`, 'did-see-quote-1', '', {
        sendOnce: true  
      });
    });

    const targetByline = document.querySelector(`.${settings.ID}-quote-container--1 .${settings.ID}-byline`);
    const seeMoreBtn = document.querySelector('.see-more.late-deals-btn');
    if(seeMoreBtn && targetByline) {
      targetByline.insertAdjacentElement('beforeend', seeMoreBtn);
    }
  }
  
  // ----------------------------------------------
  // Add quote under recommended carousel
  // ----------------------------------------------
  const recommendedSlider = cacheDom.get('[id*=HtmlHolder] + section [id*=DivUpcomingSlider]');
  if(recommendedSlider) {
    recommendedSlider.insertAdjacentHTML('afterend', getQuote2());

    viewabilityTracker(recommendedSlider, () => {
      events.send(`${settings.ID}`, 'did-see-quote-2', '', {
        sendOnce: true  
      });
    });
  }
};

/**
 * Helper run hotjar poll when element comes into view
 */
export const runHotjarPoll = (elm, hotjarTrigger) => {
  if(!isPollRunning) {
    viewabilityTracker(elm, () => {
      hj('trigger', hotjarTrigger);

      events.send(`${settings.ID}`, `variation-${settings.VARIATION}-did-run-poll`, hotjarTrigger);
    });

    isPollRunning = true;
  }
};

/**
 * Entry point for running experiment
 *
 * When running gulp, set settings.VARIATION = '1' or 'control'
 */
export const activate = () => {
  setup();

  // ----------------------------------------------
  // Considerations for when the 'no cookie' area
  // exists (select departure location)
  // ----------------------------------------------
  pollerLite([
    '#noCookieDepSelect',
  ], noDepartureLocationSetYet, {
    multiplier: 1.5  
  });
  
  // ----------------------------------------------
  // Considerations for when location chosen
  // ----------------------------------------------
  pollerLite([
    '#ctl00_ctl00_pnlResults'
  ], departureLocationExists, {
    multiplier: 1.5  
  });
  
  // ----------------------------------------------
  // Init the Hotjar poll - this happens when 
  // any of the messaging comes into view
  // ----------------------------------------------
  pollerLite([
    `.${settings.ID}-quote-container`,
    () => !!window.hj,
  ], () => {
    const quoteContainers = document.querySelectorAll(`.${settings.ID}-quote-container`);
    [].forEach.call(quoteContainers, (cont) => {
      runHotjarPoll(cont, 'NH049_Variation');
    });
  });
};
