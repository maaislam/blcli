/**
 * PJ064 - Go Larger up-sell (Go for a larger pizza) | Mobile
 * @author User Conversion
 */
import { setup, removePizzaFromBasket, generateUpgradeOverlay } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { eventFire } from './../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

const activate = () => {
  setup();
  localStorage.removeItem('PJ064-upgradeShown');
  // ADD LOADER HERE
  const loader = `<div class="${settings.ID}-loader__wrapper hide">
    <div class="${settings.ID}-text">Upgrading your pizza</div>
    <div class="${settings.ID}-loader"></div>
  </div>`;
  if (!document.querySelector(`.${settings.ID}-loader__wrapper`)) {
    document.querySelector('div.menuItems').insertAdjacentHTML('afterbegin', loader);
  }

  // Experiment code
  // console.log('- - - - - PJ064 is RUNNING - - - -');
  const allPizzas = document.querySelectorAll('.menuList');
  // console.log('[019] ALL PIZZAS:');
  // console.log(allPizzas.length);
  for (let i = 0; i < allPizzas.length; i += 1) {
    const pizzaID = i;
    const pizza = allPizzas[i];
    const pizzaTitle = pizza.querySelector('h3.titleWithIcon span').innerText.trim();

    // Data object to be stored in Session Storage
    let data = {
      'id': `${pizzaID}`,
      'title': `${pizzaTitle}`,
      'size': 'Large',
      'sizeToAdd': 'XXL',
      'crust': 'Orig',
      'addCTAid': '',
    };
    const addBtn = pizza.querySelector('.splitButtons span.butContainer a[id$=AddToBasket]');
    if (addBtn) {
      // addBtn.setAttribute('style', 'background-color: lightseagreen;');

      // Select --- Pizza
      const pizzaSelect = pizza.querySelector('select.variationDropDown.ddlDoubleUpsDipsClass.ddlProductVariations');
      pizzaSelect.addEventListener('change', (e) => {
        const pizzaSelectedText = pizzaSelect.options[pizzaSelect.selectedIndex].innerText;
        if (pizzaSelectedText.indexOf('Orig') > -1) {
          data['crust'] = 'Orig';
          if (pizzaSelectedText.indexOf('Small') > -1) {
            data['size'] = 'Small';
            data['sizeToAdd'] = 'Medium';
          } else if (pizzaSelectedText.indexOf('Medium') > -1) {
            data['size'] = 'Medium';
            data['sizeToAdd'] = 'Large';
          } else if (pizzaSelectedText.indexOf('Large') > -1) {
            data['size'] = 'Large';
            data['sizeToAdd'] = 'XXL';
          } else {
            data['crust'] = '';
            data['size'] = '';
            data['sizeToAdd'] = '';
          }
        } else if (pizzaSelectedText.indexOf('Thin') > -1) {
          data['crust'] = 'Thin';
          if (pizzaSelectedText.indexOf('Medium') > -1) {
            data['size'] = 'Medium';
            data['sizeToAdd'] = 'Large';
          } else if (pizzaSelectedText.indexOf('Large') > -1) {
            data['size'] = 'Large';
            data['sizeToAdd'] = 'XXL';
          } else {
            data['crust'] = '';
            data['size'] = '';
            data['sizeToAdd'] = '';
          }
        } else if (pizzaSelectedText.indexOf('Butternut') > -1) {
          // Overlay does not run for the Butternut Squash Base
          data['sizeToAdd'] = '';
        }
      });

      const addId = addBtn.getAttribute('id');
      data['addCTAid'] = addId;
      // Put the object into storage
      addBtn.addEventListener('click', () => {
        // ----- Set Item in Session Storage
        sessionStorage.setItem('PJ064-data', JSON.stringify(data));

        let upgradeShown = {};
        if (sessionStorage.getItem('PJ064-pizzaUpgrades')) {
          upgradeShown = JSON.parse(sessionStorage.getItem('PJ064-pizzaUpgrades'));
          if (!upgradeShown[`${pizzaID}`]) {
            upgradeShown[`${pizzaID}`] = false;
          }
          sessionStorage.setItem('PJ064-pizzaUpgrades', JSON.stringify(upgradeShown));
        } else {
          upgradeShown[`${pizzaID}`] = false;
          sessionStorage.setItem('PJ064-pizzaUpgrades', JSON.stringify(upgradeShown));
        }
      });
              
    }  
    ///////// 
  }
  

  // -------------------------------------------
  // PRM Manager Listen for State Changes
  // -------------------------------------------
  window.prm.add_endRequest(function (sender, error) {
    try {
      // console.log(sender);
      if (sender['_postBackSettings'].asyncTarget.indexOf("_objMenuProduct$lbAddToBasket") > -1
      && sessionStorage.getItem('PJ064-data') !== null
      && sessionStorage.getItem('PJ064-pizzaUpgrades') !== null) {
      // && localStorage.getItem('PJ064-upgradeShown') !== "true") {
        
        activate();
        
        const pizzaData = JSON.parse(sessionStorage.getItem('PJ064-data'));
        // console.log(pizzaData);
        const pizzaUpgrades = JSON.parse(sessionStorage.getItem('PJ064-pizzaUpgrades'));
        // console.log(pizzaUpgrades);
        const pizzaId = pizzaData['id'];
        const pizzaTitle = pizzaData['title'];
        const pizzaSize = pizzaData['size'];
        const upgradeTo = pizzaData['sizeToAdd'];
        const pizzaCrust = pizzaData['crust'];
        const ctaId = pizzaData['addCTAid'];
        if (upgradeTo !== '' && (!pizzaUpgrades[`${pizzaId}`] || pizzaUpgrades[`${pizzaId}`] === false)) {
          // console.log(`--- User selected ${pizzaTitle} in size -${pizzaSize} and -${pizzaCrust} crust and can UPGRADE to ${upgradeTo}`);
        // console.log('[141] - -- -- -  --');
          const pizzaSelected = document.querySelectorAll('.menuList')[`${pizzaId}`];
          // console.log('[135] - - - - -');
          // console.log(pizzaSelected);
          setTimeout(function(){
            // console.log('[138] +++++++');
            generateUpgradeOverlay(pizzaId, pizzaSelected, VARIATION, pizzaCrust, upgradeTo);
            if (document.querySelectorAll('.PJ064-upgrade__wrapper') > 1) {
              // console.log('[142]  LENGTH:');
              // console.log(document.querySelectorAll('.PJ064-upgrade__wrapper').length);
            }
            // // Pizza Overlay Shown to user
            // pizzaUpgrades[`${pizzaId}`] = true;
            // sessionStorage.setItem('PJ064-pizzaUpgrades', JSON.stringify(pizzaUpgrades));
            // console.log(pizzaUpgrades);

            // Overlay CTA
            const upgradeBtn = pizzaSelected.querySelector('.PJ064-cta__btn');

            if (upgradeBtn) {
              upgradeBtn.addEventListener('click', () => {
                document.querySelector(`.${settings.ID}-loader__wrapper`).classList.remove('hide');
                removePizzaFromBasket(pizzaSelected, pizzaTitle, pizzaSize, ctaId);
              });  
            }
          }, 3000);
        }
      }
      
    } catch (e) {} 
  });
  
};

export default activate;
