/**
 * PJ063 - Go Larger up-sell (Go for a larger pizza) | Dekstop
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { eventFire } from './../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

const showLoader = () => {
  const loader = document.querySelector(`.${settings.ID}-loader__wrapper`);
  loader.classList.remove('hide');
}

const hideLoader = () => {
  const loader = document.querySelector(`.${settings.ID}-loader__wrapper`);
  loader.classList.add('hide');
}

const activate = () => {
  setup();
  // document.body.insertAdjacentHTML('afterbegin', `<div class="${settings.ID}-loader"></div>`);
  if (!document.querySelector(`.${settings.ID}-loader__wrapper`)) {
    document.body.insertAdjacentHTML('afterbegin', `<div class="${settings.ID}-loader__wrapper hide"><div class="${settings.ID}-loader__message">Upgrading your pizza...</div><div class="${settings.ID}-loader"></div></div>`);
  }

  // Experiment code
  // ++++++++++++++++++
  // if (sessionStorage.getItem('PJ063-data') === null) {
    const allPizzas = document.querySelectorAll('.menuList');
    
    // [].forEach.call(allPizzas, (pizza) => {
    for (let i = 0; i < allPizzas.length; i += 1) {
      // Get Pizza ID and Title
      const pizzaID = i;
      const pizza = allPizzas[i];
      // const pizzaID = pizza.getAttribute('data-id');
      const pizzaTitle = pizza.querySelector('h3.titleWithIcon span').innerText.trim();

      // Data object to be stored in Session Storage
      let data = {
        'id': `${pizzaID}`,
        'title': `${pizzaTitle}`,
        'size': 'Large',
        'crust': 'Original',
      };

      console.log(`THIS  IS  PIZZA  No:  ${pizzaID}`);
      // pizza.setAttribute('style', 'background-color: lightcoral;');
      const selectBtn = pizza.querySelector('.menuListCont.menuListPRPizza > a.greenButton');
      // selectBtn.setAttribute('style', 'background-color: lightseagreen;');
      selectBtn.addEventListener('click', () => {
        pollerLite(['.menuListCont.menuListPRPizza.menuListContH'], () => {
          const hiddenContainer = pizza.querySelector('.menuListCont.menuListPRPizza.menuListContH');
          console.log('[018] HIDDEN --- CONTAINER ---');
          console.log(hiddenContainer);
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
              console.log('--- STEP 0');
              // Put the object into storage
              addBtn.addEventListener('click', () => {
                console.log('--- STEP 1');
                // addBtn.setAttribute('style', 'background-color: lightcoral;');
                // ----- Check that Quantity is 1 
                const qty = pizza.querySelector('p.inputs input.quantity').value;
                if (qty === '1') {
                  console.log('--- STEP 2');
                  // sessionStorage.setItem('PJ063-data', JSON.stringify(data));
                  // ----- Set Item in Session Storage
                  sessionStorage.setItem(`${settings.ID}-data`, JSON.stringify(data));
                  console.log('[085] ########### added data');
                  console.log(sessionStorage.getItem(`${settings.ID}-data`));
                  let upgradeShown = {};
                  console.log('--- STEP 3');
                  if (sessionStorage.getItem(`${settings.ID}-pizzaUpgrades`)) {
                    console.log('--- STEP 4');
                    upgradeShown = JSON.parse(sessionStorage.getItem(`${settings.ID}-pizzaUpgrades`));
                    if (!upgradeShown[`${pizzaID}`]) {
                      upgradeShown[`${pizzaID}`] = false;
                    }
                    sessionStorage.setItem(`${settings.ID}-pizzaUpgrades`, JSON.stringify(upgradeShown));
                  } else {
                    console.log('--- STEP 5');
                    upgradeShown[`${pizzaID}`] = false;
                    sessionStorage.setItem(`${settings.ID}-pizzaUpgrades`, JSON.stringify(upgradeShown));
                  }
                }
              });
            }
            //////////////////////////////
          }
          
        });

      });
    // });
    }

    // observer.connect(document.querySelector('#ctl00__objHeader_upBasketNotification'), () => {
    //   // alert('product added to basket');
    //   // alert(sessionStorage.getItem('PJ063-productAdded'));
    //   if (sessionStorage.getItem('PJ063-productAdded') === null) {
    //     sessionStorage.setItem('PJ063-productAdded', 1);
    //   } else {
    //     if (sessionStorage.getItem('PJ063-productAdded') === '1') {
    //       // alert('product 1 product has been added');
    //       sessionStorage.setItem('PJ063-productAdded', 2);
    //       const viewBasketCta = document.querySelector('td.basket a#ctl00__objHeader_lbBasketItem');

    //       if (viewBasketCta) {

    //         showLoader();

    //         setTimeout(() => {
    //           viewBasketCta.click();

    //           hideLoader();
    //         }, 1500);

    //         /**
    //          * @desc BASKET OPEN ---- This one does not run
    //          */
    //         // sessionStorage.setItem('PJ063-upgradeAddedToBasket', true);
    //         // // alert('basket open');
    //         // const pizzaData = JSON.parse(sessionStorage.getItem('PJ063-data'));
    //         // const pizzaId = pizzaData['id'];
    //         // const pizzaTitle = pizzaData['title'];
    //         // const pizzaSize = pizzaData['size'];
    //         // const pizzaCrust = pizzaData['crust'];

    //         // const basketItems = document.querySelectorAll('#ctl00__objHeader_divBasketHolder .itemCont');
    //         // const pizzaToBeRemoved = `${pizzaTitle} (${pizzaCrust} / ${pizzaSize}`;
    //         // for (let i = 0; i < basketItems.length; i += 1) { 
    //         //   const pizzaInList = basketItems[i].querySelector('span.item').innerText.trim();

    //         //   if (pizzaToBeRemoved === pizzaInList) {
    //         //     basketItems[i].setAttribute('style', 'background-color: lightcoral;');
    //         //     const removeCta = basketItems[i].querySelector('a.redLink');
    //         //     if (removeCta) {
    //         //       removeCta.click();
    //         //     }

    //         //     break;
    //         //   }
    //         // }
    //       }
    //     } 
    //   }
      
    // }, {
    //   throttle: 200,
    //   config: {
    //     attributes: false,
    //     childList: true,
    //     // subtree: true,
    //   },
    // });
    //++++++++++++++
  // } else {
  //   // sessionStorage.removeItem('PJ063-data');
  // }


  // -------------------------------------------
  // PRM Manager Listen for State Changes
  // -------------------------------------------
  window.prm.add_endRequest(function (sender, error) {
    try {
      console.log(sender);
      if (sender['_postBackSettings'].asyncTarget.indexOf("objMenuProduct$lbAddToBasket") > -1
      && sessionStorage.getItem(`${settings.ID}-data`) !== null
      && sessionStorage.getItem(`${settings.ID}-pizzaUpgrades`) !== null) {
        const pizzaData = JSON.parse(sessionStorage.getItem(`${settings.ID}-data`));
        const pizzaUpgrades = JSON.parse(sessionStorage.getItem(`${settings.ID}-pizzaUpgrades`));
        const pizzaId = pizzaData['id'];
        const pizzaTitle = pizzaData['title'];
        const pizzaSize = pizzaData['size'];
        const pizzaCrust = pizzaData['crust'];

        // ********* CHECK IF PIZZA OVERLAY HAS BEEN SHOWN **********
        //  If not then show pizza overlay 
        if (!pizzaUpgrades[`${pizzaId}`] || pizzaUpgrades[`${pizzaId}`] === false) {
          alert('[201] ################ ADDED - show pizza overlay #############');
          console.log('[201] ################ ADDED - show pizza overlay #############');
          // activate();
          const pizzaData = JSON.parse(sessionStorage.getItem(`${settings.ID}-data`));
          // console.log(pizzaData);
          const pizzaUpgrades = JSON.parse(sessionStorage.getItem(`${settings.ID}-pizzaUpgrades`));
          // console.log(pizzaUpgrades);
          const pizzaId = pizzaData['id'];
          const pizzaTitle = pizzaData['title'];
          const pizzaSize = pizzaData['size'];
          // const upgradeTo = pizzaData['sizeToAdd'];
          const pizzaCrust = pizzaData['crust'];
          // const ctaId = pizzaData['addCTAid'];
          console.log(sessionStorage.getItem(`${settings.ID}-data`) !== null);
          console.log(!pizzaUpgrades[`${pizzaId}`] || pizzaUpgrades[`${pizzaId}`] === false);
          console.log(pizzaId);
          if (!pizzaUpgrades[`${pizzaId}`] || pizzaUpgrades[`${pizzaId}`] === false) {
            // const pizzaData = JSON.parse(sessionStorage.getItem('PJ063-data'));
            // const pizzaId = pizzaData['id'];
            // const pizzaTitle = pizzaData['title'];
            // const pizzaSize = pizzaData['size'];
            // const pizzaCrust = pizzaData['crust'];

            /**
             * @desc Check if pizza size is smaller than XXL
             * and show overlay with upgrade 
             */
            if (pizzaSize !== "Extra Extra Large") {
              let upgradeTo = '';
              let upgradeToText = '';
              switch(pizzaSize) {
                case "Small":
                  upgradeTo = "Medium";
                  upgradeToText = "Medium";
                  break;
                case "Medium":
                  upgradeTo = "Large";
                  upgradeToText = "Large";
                  break;
                case "Large":
                  upgradeTo = "Extra Extra Large";
                  upgradeToText = "XXL";
                  break;
              }
              // console.log(`--- User selected ${pizzaTitle} in size -${pizzaSize} and -${pizzaCrust} crust and can UPGRADE to ${upgradeTo}`);

              
              // const pizzaSelected = document.querySelector(`.menuList[data-id="${pizzaId}"]`);
              const pizzaSelected = document.querySelectorAll('.menuList')[`${pizzaId}`];
              // pizzaSelected.setAttribute('style', 'background-color: lightblue;');
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
                    <div class="PJ063-upgrade__text redBackground"><span>Get 20% more</span></div>
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
                      <div class="PJ063-upgrade__text redBackground"><span>Get 20% more</span></div>
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
                  alert('******** UPGRADE ADDED TO BASKET');
                  // sessionStorage.setItem('PJ063-upgradeAddedToBasket', true);
                  showLoader();
                  // --- Amend - Multiple overlays
                  if (document.querySelectorAll(`.${settings.ID}-upgrade__wrapper`).length >= 1) {
                    const overlays = document.querySelectorAll(`.${settings.ID}-upgrade__wrapper`);
                    [].forEach.call(overlays, (overlay) => {
                      overlay.parentElement.removeChild(overlay);
                    });
                  }
                })
              });

              // --- Skip link
              const overlayEl = document.querySelector('.PJ063-upgrade__wrapper');
              const skipLink = overlayEl.querySelector('.PJ063-skip');
              if (skipLink) {
                skipLink.addEventListener('click', (e) => {
                  overlayEl.classList.add('hide');
                  overlayEl.parentElement.removeChild(overlayEl);
                  // --- Amend - Multiple overlays
                  if (document.querySelectorAll(`.${settings.ID}-upgrade__wrapper`).length >= 1) {
                    const overlays = document.querySelectorAll(`.${settings.ID}-upgrade__wrapper`);
                    [].forEach.call(overlays, (overlay) => {
                      overlay.parentElement.removeChild(overlay);
                    });
                  }
                });
              }

              // Pizza Overlay Shown to user
              const pizzaUpgrades = JSON.parse(sessionStorage.getItem(`${settings.ID}-pizzaUpgrades`));
              pizzaUpgrades[`${pizzaId}`] = true;
              sessionStorage.setItem(`${settings.ID}-pizzaUpgrades`, JSON.stringify(pizzaUpgrades));
            }
          }
        // ********* CHECK IF PIZZA OVERLAY HAS BEEN SHOWN **********
        //  If pizza overlay has been SHOWN then open basket
        //  and removed previously added pizza
        } else if ((!pizzaUpgrades[`${pizzaId}`] || pizzaUpgrades[`${pizzaId}`] === true)
        && sessionStorage.getItem('PJ063-data') !== null) {
          console.log(pizzaUpgrades);
          console.log(pizzaUpgrades[`${pizzaId}`]);
          alert('[372] ################ UPGRADE ADDED - open basket #############');
          console.log('[372] ################ UPGRADE ADDED - open basket #############');
          // console.log(sessionStorage.getItem('PJ063-upgradeAddedToBasket'));
          // console.log(sessionStorage.getItem('PJ063-data'));
          // console.log('[#363] Upgrade Added to Basket');
          // sessionStorage.removeItem('PJ063-upgradeAddedToBasket');
          // console.log('[#365] Upgrade Added to Basket --- REMOVED');
          // console.log(sessionStorage.getItem('PJ063-upgradeAddedToBasket'));
          // console.log(sessionStorage.getItem('PJ063-data'));
          const pizzaData = JSON.parse(sessionStorage.getItem('PJ063-data'));
          const pizzaId = pizzaData['id'];
          const pizzaTitle = pizzaData['title'];
          const pizzaSize = pizzaData['size'];
          const pizzaCrust = pizzaData['crust'];
          sessionStorage.removeItem('PJ063-data');

          observer.connect(document.querySelector('div.basketNotification'), () => {
            const basketNotifications = document.querySelector('div.basketNotification');
            if (basketNotifications.getAttribute('style').indexOf('block') > -1) {
              alert('Basket notifications appeared');
              const viewBasket = basketNotifications.querySelector('#ctl00__objHeader_lbNotificationViewBasket');
              viewBasket.click();
              setTimeout(() => {
                const basketItems = document.querySelectorAll('#ctl00__objHeader_divBasketHolder .itemCont');
                const pizzaToBeRemoved = `${pizzaTitle} (${pizzaCrust} / ${pizzaSize}`;
                console.log('[#393] Pizza   to   be   removed:');
                console.log(pizzaToBeRemoved);
                for (let i = 0; i < basketItems.length; i += 1) { 
                  const pizzaInList = basketItems[i].querySelector('span.item').innerText.trim();

                  if (pizzaInList.indexOf(`${pizzaTitle}`) > -1 
                  && (pizzaInList.indexOf(`${pizzaSize}`) > -1 
                  && pizzaInList.indexOf('Extra') === -1)) {
                    basketItems[i].classList.add('highlight');

                    showLoader();

                    setTimeout(() => {
                      const removeCta = basketItems[i].querySelector('a.redLink');
                      if (removeCta) {
                        removeCta.click();

                        basketItems[i].classList.add('slide-right');
                      }

                      hideLoader();
                    }, 1000);

                    break;
                  }
                }
              }, 1000);
            }
            
          }, {
            throttle: 200,
            config: {
              attributes: true,
              childList: false,
              // subtree: true,
            },
          });
          
          //---------------++++++++
        }
        // ********* CLOSE HEADER / BASKET ********
      } else if (sender['_postBackSettings'].asyncTarget.indexOf("ctl00$_objHeader$lbCloseOnmibar") > -1) {
        window.location.reload();
      }
    //   if (sender['_postBackSettings'].asyncTarget.indexOf("objMenuProduct$lbAddToBasket") > -1
    //   && sessionStorage.getItem(`${settings.ID}-data`) !== null
    //   && sessionStorage.getItem(`${settings.ID}-pizzaUpgrades`) !== null
    //   && sessionStorage.getItem(`${settings.ID}-upgradeAddedToBasket`) === null) {
    //     // console.log('[184] ################ ADDED #############');
    //     // // activate();
    //     // const pizzaData = JSON.parse(sessionStorage.getItem(`${settings.ID}-data`));
    //     // // console.log(pizzaData);
    //     // const pizzaUpgrades = JSON.parse(sessionStorage.getItem(`${settings.ID}-pizzaUpgrades`));
    //     // // console.log(pizzaUpgrades);
    //     // const pizzaId = pizzaData['id'];
    //     // const pizzaTitle = pizzaData['title'];
    //     // const pizzaSize = pizzaData['size'];
    //     // // const upgradeTo = pizzaData['sizeToAdd'];
    //     // const pizzaCrust = pizzaData['crust'];
    //     // // const ctaId = pizzaData['addCTAid'];
    //     // console.log(sessionStorage.getItem(`${settings.ID}-data`) !== null);
    //     // console.log(!pizzaUpgrades[`${pizzaId}`] || pizzaUpgrades[`${pizzaId}`] === false);
    //     // if (!pizzaUpgrades[`${pizzaId}`] || pizzaUpgrades[`${pizzaId}`] === false) {
    //     //   // const pizzaData = JSON.parse(sessionStorage.getItem('PJ063-data'));
    //     //   // const pizzaId = pizzaData['id'];
    //     //   // const pizzaTitle = pizzaData['title'];
    //     //   // const pizzaSize = pizzaData['size'];
    //     //   // const pizzaCrust = pizzaData['crust'];

    //     //   /**
    //     //    * @desc Check if pizza size is smaller than XXL
    //     //    * and show overlay with upgrade 
    //     //    */
    //     //   if (pizzaSize !== "Extra Extra Large") {
    //     //     let upgradeTo = '';
    //     //     let upgradeToText = '';
    //     //     switch(pizzaSize) {
    //     //       case "Small":
    //     //         upgradeTo = "Medium";
    //     //         upgradeToText = "Medium";
    //     //         break;
    //     //       case "Medium":
    //     //         upgradeTo = "Large";
    //     //         upgradeToText = "Large";
    //     //         break;
    //     //       case "Large":
    //     //         upgradeTo = "Extra Extra Large";
    //     //         upgradeToText = "XXL";
    //     //         break;
    //     //     }
    //     //     // console.log(`--- User selected ${pizzaTitle} in size -${pizzaSize} and -${pizzaCrust} crust and can UPGRADE to ${upgradeTo}`);

            
    //     //     // const pizzaSelected = document.querySelector(`.menuList[data-id="${pizzaId}"]`);
    //     //     const pizzaSelected = document.querySelectorAll('.menuList')[`${pizzaId}`];
    //     //     pizzaSelected.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});

    //     //     // ---- CHANGE Select Options
    //     //     // Size
    //     //     const lighboxSizeSelect = pizzaSelected.querySelector('select.variationDropDown.ddlSize');
    //     //     let opt;
    //     //     for (let i = 0; i < lighboxSizeSelect.length; i += 1) {
    //     //       opt = lighboxSizeSelect.options[i];
    //     //       if (opt.value === upgradeTo) {
    //     //         opt.selected = true;
    //     //         opt.selected = 'selected';

    //     //         break;
    //     //       }
    //     //     }
    //     //     eventFire(lighboxSizeSelect, 'change');
            
    //     //     // Crust
    //     //     const lighboxCrustSelect = pizzaSelected.querySelector('select.variationDropDown.ddlBase');
    //     //     for (let i = 0; i < lighboxCrustSelect.length; i += 1) {
    //     //       opt = lighboxCrustSelect.options[i];
    //     //       if (opt.value === pizzaCrust) {
    //     //         opt.selected = true;
    //     //         opt.selected = 'selected';

    //     //         break;
    //     //       }
    //     //     }
    //     //     eventFire(lighboxCrustSelect, 'change');

    //     //     let overlayContainer = '';
    //     //     if (VARIATION === '1') {
    //     //       overlayContainer = `<div class="PJ063-upgrade__wrapper">
    //     //         <div class="PJ063-upgrade__container PJ063-upgrade__container__v1">
    //     //           <div class="PJ063-upgrade__title">Feeling Hungry?</div>
    //     //           <div class="PJ063-upgrade__text redBackground"><span>Get 20% more</span></div>
    //     //           <div class="PJ063-upgrade__text redBackground"><span>pizza for an extra</span></div>
    //     //           <div class="PJ063-upgrade__text redBackground"><span>£2.00</span></div>
    //     //           <div class="PJ063-skip">No thanks</div>
    //     //           <div class="PJ063-cta__btn">Go <span>${upgradeToText}!</span></div>
    //     //         </div>
    //     //       </div>`;
    //     //     } else if (VARIATION === '2') {
    //     //       overlayContainer = `<div class="PJ063-upgrade__wrapper">
    //     //         <div class="PJ063-upgrade__container PJ063-upgrade__container__v2">
    //     //           <div class="PJ063-upgrade__title">Feeling Hungry?</div>
    //     //           <div class="PJ063-upgrade__banner"></div>
    //     //           <div class="PJ063-upgrade__text-container">
    //     //             <div class="PJ063-arrow__up"></div>
    //     //             <div class="PJ063-upgrade__text redBackground"><span>Get 20% more</span></div>
    //     //             <div class="PJ063-upgrade__text redBackground"><span>pizza</span></div>
    //     //             <div class="PJ063-arrow__bottom"></div>
    //     //           </div>
    //     //           <div class="PJ063-upgrade__text"><span>For only £2 more</span></div>
    //     //           <div class="PJ063-skip">No thanks</div>
    //     //           <div class="PJ063-cta__btn">Go <span>${upgradeToText}!</span></div>
    //     //         </div>
    //     //       </div>`;
    //     //     }
            

    //     //     pizzaSelected.insertAdjacentHTML('afterbegin', overlayContainer);

    //     //     const upgradeBtn = pizzaSelected.querySelector('.PJ063-cta__btn');
    //     //     // upgradeBtn.setAttribute('style', 'background-color: blue;');
    //     //     upgradeBtn.addEventListener('click', (e) => {
    //     //       const selectBtn = pizzaSelected.querySelector('.menuListCont.menuListPRPizza > a.greenButton');
    //     //       selectBtn.setAttribute('style', 'width: 100% !important; float: none !important; margin: auto !important;');

    //     //       selectBtn.click();
              
    //     //       // --- Hide unwanted elements
    //     //       const nutrionalInfoLink = pizzaSelected.querySelector('p.nutritionalInfoLink');
    //     //       if (nutrionalInfoLink) {
    //     //         nutrionalInfoLink.setAttribute('style', 'display: none !important;');
    //     //       }
    //     //       const customiseBtn = pizzaSelected.querySelector('.buttons .blackButton');
    //     //       if (customiseBtn) {
    //     //         customiseBtn.setAttribute('style', 'display: none !important;');
    //     //       }
    //     //       const insideBtn = selectBtn.querySelector('.centerB');
    //     //       insideBtn.innerHTML = `Go <span class='PJ063-largerText'>${upgradeToText}!</span>`;
    //     //       selectBtn.classList.add('PJ063-addLargerSizePizza');

    //     //       /**
    //     //        * @desc When Basket Notification shows up
    //     //        * then force Basket to open and remove previous addition 
    //     //        */
    //     //       const btn = document.querySelector('.PJ063-addLargerSizePizza');
    //     //       // btn.setAttribute('style', 'background-color: grey;');
    //     //       btn.addEventListener('click', () => {
    //     //         alert('******** UPGRADE ADDED TO BASKET');
    //     //         sessionStorage.setItem('PJ063-upgradeAddedToBasket', true);
    //     //       })
    //     //     });

    //     //     // --- Skip link
    //     //     const overlayEl = document.querySelector('.PJ063-upgrade__wrapper');
    //     //     const skipLink = overlayEl.querySelector('.PJ063-skip');
    //     //     if (skipLink) {
    //     //       skipLink.addEventListener('click', (e) => {
    //     //         overlayEl.classList.add('hide');
    //     //         overlayEl.parentElement.removeChild(overlayEl);
    //     //         // --- Amend - Multiple overlays
    //     //         if (document.querySelectorAll(`.${settings.ID}-upgrade__wrapper`).length >= 1) {
    //     //           const overlays = document.querySelectorAll(`.${settings.ID}-upgrade__wrapper`);
    //     //           [].forEach.call(overlays, (overlay) => {
    //     //             overlay.parentElement.removeChild(overlay);
    //     //           });
    //     //         }
    //     //       });
    //     //     }

    //     //     // Pizza Overlay Shown to user
    //     //     const pizzaUpgrades = JSON.parse(sessionStorage.getItem(`${settings.ID}-pizzaUpgrades`));
    //     //     pizzaUpgrades[`${pizzaId}`] = true;
    //     //     sessionStorage.setItem(`${settings.ID}-pizzaUpgrades`, JSON.stringify(pizzaUpgrades));
    //     //   }
    //     // }
    //   // ******** REMOVE FROM BASKET *********
    //   // *************************************
    //   // "ctl00$cphBody$rptProductLists$ctl00$_objMenuProductList$rptProducts$ctl10$_objMenuProduct$lbAddToBasket"
    //  } else if (sender['_postBackSettings'].asyncTarget.indexOf("objMenuProduct$lbAddToBasket") > -1
    //   && sessionStorage.getItem('PJ063-upgradeAddedToBasket') !== null
    //   && sessionStorage.getItem('PJ063-data') !== null) {
    //     // console.log(sessionStorage.getItem('PJ063-upgradeAddedToBasket'));
    //     // console.log(sessionStorage.getItem('PJ063-data'));
    //     // console.log('[#363] Upgrade Added to Basket');
    //     // sessionStorage.removeItem('PJ063-upgradeAddedToBasket');
    //     // console.log('[#365] Upgrade Added to Basket --- REMOVED');
    //     // console.log(sessionStorage.getItem('PJ063-upgradeAddedToBasket'));
    //     // console.log(sessionStorage.getItem('PJ063-data'));
    //     // const pizzaData = JSON.parse(sessionStorage.getItem('PJ063-data'));
    //     // const pizzaId = pizzaData['id'];
    //     // const pizzaTitle = pizzaData['title'];
    //     // const pizzaSize = pizzaData['size'];
    //     // const pizzaCrust = pizzaData['crust'];

    //     // const basketItems = document.querySelectorAll('#ctl00__objHeader_divBasketHolder .itemCont');
    //     // const pizzaToBeRemoved = `${pizzaTitle} (${pizzaCrust} / ${pizzaSize}`;
    //     // for (let i = 0; i < basketItems.length; i += 1) { 
    //     //   const pizzaInList = basketItems[i].querySelector('span.item').innerText.trim();

    //     //   if (pizzaInList.indexOf(`${pizzaTitle}`) > -1 && (pizzaInList.indexOf(`${pizzaSize}`) > -1 && pizzaInList.indexOf('Extra') === -1)) {
    //     //     basketItems[i].classList.add('highlight');

    //     //     showLoader();

    //     //     setTimeout(() => {
    //     //       const removeCta = basketItems[i].querySelector('a.redLink');
    //     //       if (removeCta) {
    //     //         removeCta.click();

    //     //         basketItems[i].classList.add('slide-right');
    //     //       }

    //     //       hideLoader();
    //     //     }, 1000);

    //     //     break;
    //     //   }
    //     // }
    //   }
    } catch (e) {} 
  });
};

export default activate;
