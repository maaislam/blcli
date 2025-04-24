/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import badges from './components/badges';
import inGrid from './components/inGrid';
import countdown from './components/countdown';
import shared from './shared';
import { observer } from '../../../../../lib/uc-lib';


export default () => {

  const { ID } = shared;

  setup();
  badges();
  inGrid();
  countdown();



  // remove all new elements for observer
  const removeBlocksAndBadges = () => {
    const allBadges = document.querySelectorAll(`.${ID}-productBadge`);
    const allBlocks = document.querySelectorAll(`.${ID}-inGridBlock`);
    
    for (let index = 0; index < allBlocks.length; index += 1) {
      const element = allBlocks[index];
      element.remove();
    }

    for (let index = 0; index < allBadges.length; index += 1) {
      const element = allBadges[index];
      element.remove();
    }
  }

  // desktop filter observer
  if(window.innerWidth > 767) {
    observer.connect(document.querySelector('.browse__main-content'), () => {
      removeBlocksAndBadges();
      badges();
      inGrid();
      countdown();
      observer.connect(document.querySelector('.product-tile-list.js-infinite-scroll'), () => {
        removeBlocksAndBadges();
        badges();
        inGrid();
        countdown();
      }, {
        throttle: 1000,
        config: {
          attributes: true,
          childList: true,
          subtree: false,
        },
      });
    }, {
      throttle: 1000,
      config: {
        attributes: true,
        childList: true,
        subtree: false,
      },
    });
  }


  // observe show more and the filters
  observer.connect(document.querySelector('#filter-modal'), () => {
    removeBlocksAndBadges();
    badges();
    inGrid();
    countdown();

    observer.connect(document.querySelector('.product-tile-list.js-infinite-scroll'), () => {
      removeBlocksAndBadges();
      badges();
      inGrid();
      countdown();
    }, {
      throttle: 1000,
      config: {
        attributes: true,
        childList: true,
        subtree: false,
      },
    });
 
  }, {
    throttle: 1000,
    config: {
      attributes: true,
      childList: true,
      subtree: false,
    },
  });

  observer.connect(document.querySelector('.product-tile-list.js-infinite-scroll'), () => {
    removeBlocksAndBadges();
    badges();
    inGrid();
    countdown();
  }, {
    throttle: 1000,
    config: {
      attributes: true,
      childList: true,
      subtree: false,
    },
  });
};
