/**
 * PJ063 - Go Larger up-sell (Go for a larger pizza) | Dekstop
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { eventFire } from './../../../../../lib/utils';

const { ID, VARIATION } = shared;

export default () => {
  setup();
  // console.log(`${shared.ID} NEW VERSION IS RUNNING`);
  if (sessionStorage.getItem(`${shared.ID}-data`) !== null 
  && sessionStorage.getItem(`${shared.ID}-productAdded`) !== null
  && sessionStorage.getItem(`${shared.ID}-upgradeAddedToBasket`) !== null) {
    sessionStorage.removeItem(`${shared.ID}-data`);
    sessionStorage.removeItem(`${shared.ID}-productAdded`);
    sessionStorage.removeItem(`${shared.ID}-upgradeAddedToBasket`);
  }

  // Experiment code
  // console.log('PJ063 DUPLICATE IS RUNNING -----');

  if (sessionStorage.getItem('PJ063-data') === null) {
    const allPizzas = document.querySelectorAll('.menuList');
    
    for (let i = 0; i < allPizzas.length; i += 1) {
      // Get Pizza ID and Title
      // const pizzaID = pizza.getAttribute('data-id');
      const pizzaID = i;
      const pizza = allPizzas[i];
      const pizzaTitle = pizza.querySelector('h3.titleWithIcon span').innerText.trim();

      // Data object to be stored in Session Storage
      let data = {
        'id': `${pizzaID}`,
        'title': `${pizzaTitle}`,
        'size': 'Large',
        'crust': 'Original',
      };

      // console.log(`THIS  IS  PIZZA  No:  ${pizzaID}`);
      // pizza.setAttribute('style', 'background-color: lightcoral;');
      const selectBtn = pizza.querySelector('.menuListCont.menuListPRPizza > a.greenButton');
      // selectBtn.setAttribute('style', 'background-color: lightseagreen;');
      selectBtn.addEventListener('click', () => {
        pollerLite(['.menuListCont.menuListPRPizza.menuListContH'], () => {
          const hiddenContainer = pizza.querySelector('.menuListCont.menuListPRPizza.menuListContH');
          // console.log('[018] HIDDEN --- CONTAINER ---');
          // console.log(hiddenContainer);
          if (hiddenContainer) {
            const addBtn = hiddenContainer.querySelector('.buttons a.greenButton');
            if (addBtn) {
              // addBtn.setAttribute('style', 'background-color: lightblue;');

              let sizeSelected = 'Large';
              let crustSelected = 'Original';
              // Select --- Size
              const sizeSelect = hiddenContainer.querySelector('select.variationDropDown.ddlSize');
              sizeSelect.addEventListener('change', (e) => {
                sizeSelected = sizeSelect.options[sizeSelect.selectedIndex].value;
                data['size'] = sizeSelected;
              });
              // Select --- Crust
              const crustSelect = hiddenContainer.querySelector('select.variationDropDown.ddlBase');
              crustSelect.addEventListener('change', (e) => {
                crustSelected = crustSelect.options[crustSelect.selectedIndex].value;
                data['crust'] = crustSelected;
              });

              // Put the object into storage
              addBtn.addEventListener('click', () => {
                // ----- Check that Quantity is 1 
                const qty = pizza.querySelector('p.inputs input.quantity').value;
                if (qty === '1' && data['size'] !== 'Extra Extra Large') {
                  // alert('data');
                  // alert(data['size']);
                  sessionStorage.setItem('PJ063-data', JSON.stringify(data));
                }
              });
            }
          }
          
        });

      });
    }

    observer.connect(document.querySelector('#ctl00__objHeader_upBasketNotification'), () => {
      // alert('product added to basket');
      // alert(sessionStorage.getItem('PJ063-productAdded'));
      if (sessionStorage.getItem('PJ063-productAdded') === null && sessionStorage.getItem('PJ063-data') !== null) {
        // alert('productAdded');
        sessionStorage.setItem('PJ063-productAdded', 1);
      } else {
        if (sessionStorage.getItem('PJ063-productAdded') === '1') {
          // alert('product 1 product has been added');
          sessionStorage.setItem('PJ063-productAdded', 2);
          const viewBasketCta = document.querySelector('td.basket a#ctl00__objHeader_lbBasketItem');

          if (viewBasketCta) {
            viewBasketCta.click();

            /**
             * @desc BASKET OPEN ---- This one does not run
             */
            // sessionStorage.setItem('PJ063-upgradeAddedToBasket', true);
            // // alert('basket open');
            // const pizzaData = JSON.parse(sessionStorage.getItem('PJ063-data'));
            // const pizzaId = pizzaData['id'];
            // const pizzaTitle = pizzaData['title'];
            // const pizzaSize = pizzaData['size'];
            // const pizzaCrust = pizzaData['crust'];

            // const basketItems = document.querySelectorAll('#ctl00__objHeader_divBasketHolder .itemCont');
            // const pizzaToBeRemoved = `${pizzaTitle} (${pizzaCrust} / ${pizzaSize}`;
            // for (let i = 0; i < basketItems.length; i += 1) { 
            //   const pizzaInList = basketItems[i].querySelector('span.item').innerText.trim();

            //   if (pizzaToBeRemoved === pizzaInList) {
            //     basketItems[i].setAttribute('style', 'background-color: lightcoral;');
            //     const removeCta = basketItems[i].querySelector('a.redLink');
            //     if (removeCta) {
            //       removeCta.click();
            //     }

            //     break;
            //   }
            // }
          }
        } 
      }
      
    }, {
      throttle: 200,
      config: {
        attributes: false,
        childList: true,
        // subtree: true,
      },
    });
  } else {
    // sessionStorage.removeItem('PJ063-data');
  }


  // -------------------------------------------
  // PRM Manager Listen for State Changes
  // -------------------------------------------
  window.prm.add_endRequest(function (sender, error) {
    try {
      console.log(sender);
      if (sender['_postBackSettings'].asyncTarget.indexOf("objMenuProduct$lbAddToBasket") > -1
        && sessionStorage.getItem('PJ063-data') !== null) {
        if (sessionStorage.getItem('PJ063-data') !== null && sessionStorage.getItem('PJ063-productAdded') === null) {
          const pizzaData = JSON.parse(sessionStorage.getItem('PJ063-data'));
          const pizzaId = pizzaData['id'];
          const pizzaTitle = pizzaData['title'];
          const pizzaSize = pizzaData['size'];
          const pizzaCrust = pizzaData['crust'];

          /**
           * @desc Check if pizza size is smaller than XXL
           * and show overlay with upgrade 
           */
          if (pizzaSize !== "Extra Extra Large") {
            let upgradeTo = '';
            let upgradeToText = '';
            let percentage = '';
            switch(pizzaSize) {
              case "Small":
                upgradeTo = "Medium";
                upgradeToText = "Medium";
                percentage = '45';
                break;
              case "Medium":
                upgradeTo = "Large";
                upgradeToText = "Large";
                percentage = '35';
                break;
              case "Large":
                upgradeTo = "Extra Extra Large";
                upgradeToText = "XXL";
                percentage = '30';
                break;
            }
            // console.log(`--- User selected ${pizzaTitle} in size -${pizzaSize} and -${pizzaCrust} crust and can UPGRADE to ${upgradeTo}`);

            
            // const pizzaSelected = document.querySelector(`.menuList[data-id="${pizzaId}"]`);
            const pizzaSelected = document.querySelectorAll('.menuList')[`${pizzaId}`];
            pizzaSelected.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});

            // ---- CHANGE Select Options
            // Size
            const lighboxSizeSelect = pizzaSelected.querySelector('select.variationDropDown.ddlSize');
            let opt;
            for (let i = 0; i < lighboxSizeSelect.length; i += 1) {
              opt = lighboxSizeSelect.options[i];
              if (opt.value === upgradeTo) {
                opt.selected = true;
                opt.selected = 'selected';

                break;
              }
            }
            eventFire(lighboxSizeSelect, 'change');
            
            // Crust
            const lighboxCrustSelect = pizzaSelected.querySelector('select.variationDropDown.ddlBase');
            for (let i = 0; i < lighboxCrustSelect.length; i += 1) {
              opt = lighboxCrustSelect.options[i];
              if (opt.value === pizzaCrust) {
                opt.selected = true;
                opt.selected = 'selected';

                break;
              }
            }
            eventFire(lighboxCrustSelect, 'change');

            let overlayContainer = '';
            if (VARIATION === '1') {
              overlayContainer = `<div class="PJ063-upgrade__wrapper">
                <div class="PJ063-upgrade__container PJ063-upgrade__container__v1">
                  <div class="PJ063-upgrade__title">Feeling Hungry?</div>
                  <div class="PJ063-upgrade__text redBackground"><span>Get ${percentage}% more</span></div>
                  <div class="PJ063-upgrade__text redBackground"><span>pizza for an extra</span></div>
                  <div class="PJ063-upgrade__text redBackground"><span>£2.00</span></div>
                  <div class="PJ063-skip">No thanks</div>
                  <div class="PJ063-cta__btn">Go <span>${upgradeToText}!</span></div>
                </div>
              </div>`;
            } else if (VARIATION === '2') {
              overlayContainer = `<div class="PJ063-upgrade__wrapper">
                <div class="PJ063-upgrade__container PJ063-upgrade__container__v2">
                  <div class="PJ063-upgrade__title">Feeling Hungry?</div>
                  <div class="PJ063-upgrade__banner"></div>
                  <div class="PJ063-upgrade__text-container">
                    <div class="PJ063-arrow__up"></div>
                    <div class="PJ063-upgrade__text redBackground"><span>Get ${percentage}% more</span></div>
                    <div class="PJ063-upgrade__text redBackground"><span>pizza</span></div>
                    <div class="PJ063-arrow__bottom"></div>
                  </div>
                  <div class="PJ063-upgrade__text"><span>For only £2 more</span></div>
                  <div class="PJ063-skip">No thanks</div>
                  <div class="PJ063-cta__btn">Go <span>${upgradeToText}!</span></div>
                </div>
              </div>`;
            }
            

            pizzaSelected.insertAdjacentHTML('afterbegin', overlayContainer);

            const upgradeBtn = pizzaSelected.querySelector('.PJ063-cta__btn');
            // upgradeBtn.setAttribute('style', 'background-color: blue;');
            upgradeBtn.addEventListener('click', (e) => {
              const selectBtn = pizzaSelected.querySelector('.menuListCont.menuListPRPizza > a.greenButton');
              selectBtn.setAttribute('style', 'width: 100% !important; float: none !important; margin: auto !important;');

              selectBtn.click();
              
              // --- Hide unwanted elements
              const nutrionalInfoLink = pizzaSelected.querySelector('p.nutritionalInfoLink');
              if (nutrionalInfoLink) {
                nutrionalInfoLink.setAttribute('style', 'display: none !important;');
              }
              const customiseBtn = pizzaSelected.querySelector('.buttons .blackButton');
              if (customiseBtn) {
                customiseBtn.setAttribute('style', 'display: none !important;');
              }
              const insideBtn = selectBtn.querySelector('.centerB');
              insideBtn.innerHTML = `Go <span class='PJ063-largerText'>${upgradeToText}!</span>`;
              selectBtn.classList.add('PJ063-addLargerSizePizza');

              /**
               * @desc When Basket Notification shows up
               * then force Basket to open and remove previous addition 
               */
              const btn = document.querySelector('.PJ063-addLargerSizePizza');
              // btn.setAttribute('style', 'background-color: grey;');
              btn.addEventListener('click', () => {
                // console.log('******** UPGRADE ADDED TO BASKET');
                // alert('upgradeAddedToBasket');
                sessionStorage.setItem('PJ063-upgradeAddedToBasket', true);
              })
            });

            // --- Skip link
            const overlayEl = document.querySelector('.PJ063-upgrade__wrapper');
            const skipLink = overlayEl.querySelector('.PJ063-skip');
            if (skipLink) {
              skipLink.addEventListener('click', (e) => {
                overlayEl.classList.add('hide');
                window.location.reload();
              });
            } 
          }
        }
      } else if (sender['_postBackSettings'].asyncTarget.indexOf("ctl00$_objHeader$lbBasketItem") > -1
      && sessionStorage.getItem('PJ063-upgradeAddedToBasket') !== null
      && sessionStorage.getItem('PJ063-data') !== null) {
        const pizzaData = JSON.parse(sessionStorage.getItem('PJ063-data'));
        const pizzaId = pizzaData['id'];
        const pizzaTitle = pizzaData['title'];
        const pizzaSize = pizzaData['size'];
        const pizzaCrust = pizzaData['crust'];

        const basketItems = document.querySelectorAll('#ctl00__objHeader_divBasketHolder .itemCont');
        const pizzaToBeRemoved = `${pizzaTitle} (${pizzaCrust} / ${pizzaSize}`;
        for (let i = 0; i < basketItems.length; i += 1) { 
          const pizzaInList = basketItems[i].querySelector('span.item').innerText.trim();

          if (pizzaInList.indexOf(`${pizzaTitle}`) > -1 && (pizzaInList.indexOf(`${pizzaSize}`) > -1 && pizzaInList.indexOf('Extra') === -1)) {
            basketItems[i].classList.add('highlight');
            setTimeout(function(){ 
              basketItems[i].classList.add('slide-right');
              const removeCta = basketItems[i].querySelector('a.redLink');
              removeCta.click();
              // setTimeout(function(){
              //   if (removeCta) {
              //     removeCta.click();
              //   }
              // }, 500);
            }, 1000);
            // const removeCta = basketItems[i].querySelector('a.redLink');
            // if (removeCta) {
            //   removeCta.click();
            // }

            break;
          }
        }
      }
    } catch (e) {} 
  });
};
