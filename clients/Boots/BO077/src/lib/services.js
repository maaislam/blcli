import { fullStory } from '../../../../../lib/utils';
import { events, pollerLite, observer } from '../../../../../lib/utils';
import shared from './shared';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};


/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  document.body.classList.add(`${ID}-${VARIATION}`);
};

/*  ----------------
  Cookie opt in check
  ------------------ */
  export const cookieOpt = () => {
    const { ID, VARIATION } = shared;
    if(window.OnetrustActiveGroups.indexOf(',2,') > -1) {
      events.send(`Experimentation`, `Boots - ${ID} V${VARIATION}`, `Test Fired`);
    }
    pollerLite([
      '.optanon-alert-box-wrapper',
      '.optanon-toggle-display.cookie-settings-button',
      '.optanon-allow-all.accept-cookies-button',
      ], () => {
        const cookieAllowAll = document.querySelector('.optanon-button-wrapper.optanon-allow-all-button');
        cookieAllowAll.addEventListener('click', () => {
            if(window.OnetrustActiveGroups.indexOf(',2,') > -1) {
              events.send(`Experimentation`, `Boots - ${ID} V${VARIATION}`, `Test Fired`);
            }
        });
      });
    
      pollerLite(['.optanon-button-wrapper.optanon-save-settings-button'], () => {
        // on click of the buttons in settings
        const cookieAllowAll = document.querySelector('.optanon-button-wrapper.optanon-allow-all-button');
        cookieAllowAll.addEventListener('click', () => {
          if(window.OnetrustActiveGroups.indexOf(',2,') > -1) {
            events.send(`Experimentation`, `Boots - ${ID} V${VARIATION}`, `Test Fired`);
          }
        });
      
        const saveSettings = document.querySelector('.optanon-button-wrapper.optanon-save-settings-button');
        saveSettings.addEventListener('click', () => {
          if(window.OnetrustActiveGroups.indexOf(',2,') > -1) {
            events.send(`Experimentation`, `Boots - ${ID} V${VARIATION}`, `Test Fired`);
          }
        });
      });
  };

  export const observeWindowWidthAndReload = () => {
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
        // -- Reload
        window.location.reload();
      } else if (document.body.clientWidth <= 767 && device == 'desktop') {
        device = 'mobile';
        // --- Window re-size - From DESKTOP to MOBILE
        // -- Reload
        window.location.reload();
      }
    });
    
  };

  export const resizeCarousels = () => {
    const { ID, VARIATION } = shared;

    console.log('resizeCarousels()');
  
    observer.connect(document.getElementById('item_page.rec1').querySelector('.rrContainer'), () => {
      console.log('SOMETHING HAS CHANGED-------');
      let firstCarouselWidth = document.getElementById('item_page.rec1').querySelector('.rrContainer').getAttribute('style');
      console.log(firstCarouselWidth);
      // document.getElementById('item_page.rec2').querySelector('.rrContainer').setAttribute('style', firstCarouselWidth);
      // document.getElementById('item_page.rec3').querySelector('.rrContainer').setAttribute('style', firstCarouselWidth);
    }, {
      throttle: 200,
      config: {
        attributes: true,
        childList: false,
        // subtree: true,
      },
    });
    
  };
  
