import { events } from '../../../../../lib/utils';
/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;
  if(VARIATION === 'control') {
    setup();

  } else {
    setup();

    const inGridContent = () => {
      const inGridOne = document.createElement('li');
      inGridOne.className = `${ID}-wonderWoman product-tile-list__item`;

      const inGridTwo = document.createElement('li');
      inGridTwo.className = `${ID}-wonderWoman2 product-tile-list__item`;

      document.querySelectorAll(`.items .product-tile-list__item`)[5].insertAdjacentElement('afterend', inGridOne);
      document.querySelectorAll(`.items .product-tile-list__item`)[11].insertAdjacentElement('afterend', inGridTwo);

      inGridOne.addEventListener('click', () => {
        events.send(`${ID} variation ${VARIATION}`, 'click', 'Wonder Woman, in grid first block');
      });

      inGridTwo.addEventListener('click', () => {
        events.send(`${ID} variation ${VARIATION}`, 'click', 'Wonder Woman, in grid second block');
      });

    }

    inGridContent();

    const removeMessage = () => {

      const inGridBlock1 = document.querySelector(`.${ID}-wonderWoman`);
      const inGridBlock2 = document.querySelector(`.${ID}-wonderWoman2`);

      if(inGridBlock1 && inGridBlock2) {
        inGridBlock1.remove();
        inGridBlock2.remove();
      }

    }

    let oldHref = document.location.href;
      let bodyList = document.querySelector("body");
      const observeEl = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                  if (oldHref != document.location.href) {
                      oldHref = document.location.href;

                  
                      removeMessage();
                      if(document.location.href.indexOf('brand%7Charry+potter') > -1) {
                        addMessage();
                        buttonEvent();
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
