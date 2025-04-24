import { fullStory } from '../../../../../lib/utils';
import settings from './settings';
import { pollerLite, observer } from '../../../../../lib/uc-lib';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

function showHideNewAddBtn(side) {
  observer.connect(side.querySelector('p.buttons a.greenButton'), () => {
    // console.log('[129] --- SOMETHING CHANGED! -- greenbutton shown');
    // --- If new CTA button was previously added and hidden
    // ---- show it once lightbox is open again
    const closeIconDisplay = side.querySelector('a.close').getAttribute('style');
    if (closeIconDisplay !== 'display: none;') {
      if (side.querySelector(`.${settings.ID}-quantityLabel`)
      && side.querySelector(`input.quantity`)
      && side.querySelector(`.${settings.ID}-addToCart__wrapper`)) {
        // side.querySelector(`.${settings.ID}-quantityLabel`).setAttribute('style', 'display: inline-block;');
        // side.querySelector(`input.quantity`).setAttribute('style', 'display: inline-block;');
        // side.querySelector(`.${settings.ID}-addToCart__wrapper`).setAttribute('style', 'display: block;');
      }
    }
    

    const addCtaBtn = side.querySelector('p.buttons a.greenButton');
    // console.log('[---183]');
    // console.log(addCtaBtn);
    if (addCtaBtn) {
      const btnStyle = addCtaBtn.getAttribute('style');
      const newAddCta =  side.querySelector(`.${settings.ID}-addToCart`);
      const controlAddCta = side.querySelector('.menuListCont.menuListPRPizza.menuListContH p.buttons a.greenButton');
      if (btnStyle === 'display: none;') {
        newAddCta.classList.add('inactive');
      } else {
        const portionBtns = side.querySelectorAll(`.${settings.ID}-btn`);
        if (portionBtns.length > 1) {
          if (side.querySelector(`.${settings.ID}-btn.selected`)) {
            newAddCta.classList.remove('inactive');
          }
        } else {
          newAddCta.classList.remove('inactive');
        }
        // // Excluded sides button style
        // console.log(side);
        // if (side.classList.contains(`${settings.ID}-excluded`)) {
        //   addCtaBtn.setAttribute('style', 'float: none !important; min-width: 200px; margin: auto !important;');
        //   side.querySelector('.menuListCont.menuListPRPizza p.buttons a.greenButton').setAttribute('style', 'float: none !important; min-width: 200px; margin: auto !important;');
        // }
      }
      newAddCta.addEventListener('click', () => {
        controlAddCta.click();
      });
    } else {
      // document.querySelector(`.${settings.ID}-addToCart__wrapper`).setAttribute('style', 'display: none;');
      // document.querySelector(`.${settings.ID}-quantityLabel`).setAttribute('style', 'display: none;');
      // document.querySelector(`input.quantity`).setAttribute('style', 'display: none;');
      // document.querySelector(`.${settings.ID}-addToCart__wrapper`).setAttribute('style', 'display: none;');
    }
  }, {
    throttle: 200,
    config: {
      attributes: true,
      childList: false,
      // subtree: true,
    },
  });
}

export { setup, showHideNewAddBtn }; // eslint-disable-line
