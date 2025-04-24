import { fullStory } from '../../../../../lib/utils';
import settings from './settings';
import { eventFire } from './../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import activate from './experiment';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

/**
 * @desc Remove previously added pizza from basket
 */
function removePizzaFromBasket(pizzaSelected, pizzaTitle, pizzaSize, addId) {

    // --- Add larger size
    window.__doPostBack(addId.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');

  // console.log('REMOVE    PIZZZA   FROM    BASKET');
  setTimeout(() => {

    const basketItems = document.querySelectorAll('div#ctl00__objHeader_upHeaderBasketMobile div.intBasket tr');
    [].forEach.call(basketItems, (item) => {
      const nameContainer = item.querySelector('.pizzaName');
      
      if (nameContainer && nameContainer.querySelector('span.pizza-title-b') && nameContainer.querySelectorAll('span')[1]) {
        const pizzaName = nameContainer.querySelector('span.pizza-title-b').innerText;
        const pizzaDescription = nameContainer.querySelectorAll('span')[1].innerText;
        if (pizzaName.indexOf(`${pizzaTitle}`) > -1) {
          if (pizzaDescription.indexOf(`/ ${pizzaSize}`) > -1) {
            const removeBtn = item.querySelector('a.redText');
            if (removeBtn) {
              const idToRemove = removeBtn.getAttribute('id');
              // --- Remove smaller pizza
              window.__doPostBack(idToRemove.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');

              setTimeout(() => {
                document.querySelector(`.${settings.ID}-loader__wrapper`).classList.add('hide');

                window.location.reload();
              }, 2000);
            }
          }
        }
      }
    });
  }, 1200);

  sessionStorage.removeItem('PJ064-data');
  // localStorage.setItem('PJ064-upgradeShown', true);
  // -- Hide Overlay
  pizzaSelected.querySelector('.PJ064-upgrade__wrapper').classList.add('hide');

  mainMobileInside
  observer.connect(document.querySelector('.main.mainMobileInside'), () => {
    // console.log('[060] --- SOMETHING CHANGED! --');
    if (document.querySelector('.main.mainMobileInside').classList.contains('fadeAway')) {
      document.querySelector('.PJ064-loader__wrapper').classList.add('hide');
      document.querySelector('.main.mainMobileInside').classList.remove('fadeAway');
      activate();

    } else {
      // console.log('[069] opened/closed basket');
      activate();
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

/**
 * @desc Generate Upgrade Overlay
 */
function generateUpgradeOverlay(pizzaId, pizzaSelected, VARIATION, pizzaCrust, upgradeTo) {
  // console.log('INSIDE   GENERATE   UPGRADE  OVERLAY!');
  let overlayContainer = '';
  let percentage = '';
  switch(upgradeTo) {
    case 'Medium':
      percentage = '45';
      break;
    case 'Large':
      percentage = '35';
      break;
    case 'XXL':
      percentage = '30';
      break;
  }
  if (VARIATION === '1') {
    overlayContainer = `<div class="PJ064-upgrade__wrapper">
      <div class="PJ064-upgrade__container PJ064-upgrade__container__v1">
        <div class="PJ064-upgrade__title">Feeling Hungry?</div>
        <div class="PJ064-upgrade__text redBackground"><span>Get ${percentage}% more</span></div>
        <div class="PJ064-upgrade__text redBackground"><span>pizza for an extra</span></div>
        <div class="PJ064-upgrade__text redBackground"><span>£2.00</span></div>
        <div class="PJ064-skip">No thanks</div>
        <div class="PJ064-cta__btn">Go <span>${upgradeTo}!</span></div>
      </div>
    </div>`;
  } else if (VARIATION === '2') {
    overlayContainer = `<div class="PJ064-upgrade__wrapper">
      <div class="PJ064-upgrade__container PJ064-upgrade__container__v2">
        <div class="PJ064-upgrade__title">Feeling Hungry?</div>
        <div class="PJ064-upgrade__banner"></div>
        <div class="PJ064-upgrade__text-container">
          <div class="PJ064-arrow__up"></div>
          <div class="PJ064-upgrade__text redBackground"><span>Get ${percentage}% more</span></div>
          <div class="PJ064-upgrade__text redBackground"><span>pizza</span></div>
          <div class="PJ064-arrow__bottom"></div>
        </div>
        <div class="PJ064-upgrade__text"><span>For only £2 more</span></div>
        <div class="PJ064-skip">No thanks</div>
        <div class="PJ064-cta__btn">Go <span>${upgradeTo}!</span></div>
      </div>
    </div>`;
  }

  // console.log('[112] +++++ OVERLAY    ADDED  !');
  pizzaSelected.insertAdjacentHTML('afterbegin', overlayContainer);


  // ---- CHANGE Select Option
  const lighboxSizeSelect = pizzaSelected.querySelector('select.variationDropDown.ddlDoubleUpsDipsClass.ddlProductVariations');

  let opt;
  for (let i = 0; i < lighboxSizeSelect.length; i += 1) {
    opt = lighboxSizeSelect.options[i];
    if (opt.innerText.indexOf(`${pizzaCrust}, ${upgradeTo}`) > -1) {
    opt.selected = true;
    opt.selected = 'selected';

    break;
    }
  }
  eventFire(lighboxSizeSelect, 'change');

  // Scroll to Pizza
  pizzaSelected.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});

  // --- Skip link
  const overlayEl = document.querySelector('.PJ064-upgrade__wrapper');
  const skipLink = overlayEl.querySelector('.PJ064-skip');
  if (skipLink) {
    skipLink.addEventListener('click', (e) => {
      overlayEl.classList.add('hide');
      overlayEl.parentElement.removeChild(overlayEl);
      // --- Amend - Multiple overlays
      if (document.querySelectorAll('.PJ064-upgrade__wrapper').length >= 1) {
        const overlays = document.querySelectorAll('.PJ064-upgrade__wrapper');
        [].forEach.call(overlays, (overlay) => {
          overlay.parentElement.removeChild(overlay);
        });
      }

      let opt;
      for (let i = 0; i < lighboxSizeSelect.length; i += 1) {
        opt = lighboxSizeSelect.options[i];
        if (opt.innerText.indexOf(`Orig, Large`) > -1) {
        opt.selected = true;
        opt.selected = 'selected';

        break;
        }
      }
      eventFire(lighboxSizeSelect, 'change');
    });
  }

  // Pizza Overlay Shown to user
  const pizzaUpgrades = JSON.parse(sessionStorage.getItem('PJ064-pizzaUpgrades'));
  pizzaUpgrades[`${pizzaId}`] = true;
  sessionStorage.setItem('PJ064-pizzaUpgrades', JSON.stringify(pizzaUpgrades));
}

export { setup, removePizzaFromBasket, generateUpgradeOverlay }; // eslint-disable-line
