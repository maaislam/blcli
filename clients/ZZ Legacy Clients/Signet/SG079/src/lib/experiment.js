/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';
import FinderBox from './finderBox';
import finderLogic from './finderLogic';
import boxTrigger from './boxTrigger';

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();
    new FinderBox();
    boxTrigger();
    finderLogic();

    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }

    const removeTest = () => {
      const engagementBox = document.querySelector(`.${ID}-finderBox-wrapper`);
      if(engagementBox) {
        engagementBox.remove();
      }

      const topBanner = document.querySelector(`.${ID}-engagementBanner`);
      if(topBanner) {
        topBanner.remove();
      }

      const inGrid = document.querySelector(`.${ID}-inGrid`);
      if(inGrid) {
        inGrid.remove();
      }
    }

    let oldHref = document.location.href;
    let bodyList = document.querySelector("body");
    const observeEl = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
          if (oldHref != document.location.href) {
              oldHref = document.location.href;

  

              removeTest();
              if(window.location.href.indexOf('engagement') > -1) {
                new FinderBox();
                boxTrigger();
                finderLogic();
              }
          }
      });
    });
    const config = {
        childList: true,
        subtree: true
    };
    
    observeEl.observe(bodyList, config);
  }
};
