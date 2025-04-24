/**
 * PJ070 - Sides overlay portion side & dips - phase 1
 * @author User Conversion
 */
import { setup, showHideNewAddBtn } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import settings from './settings';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { eventFire } from './../../../../../lib/utils';

const { ID, VARIATION } = settings;

const activate = () => {
  setup();

  // Experiment code
  // console.log(`--- ${settings.ID} is running now`);
  const allSides = document.querySelectorAll('div.menuList');
  //////////////////////////////////////////////////////////////////
  [].forEach.call(allSides, (side) => {
    const selectBtn = side.querySelector('a.greenButton');

    // --- ADD New add button
    const selectDropdown = side.querySelector('select.variationDropDown.ddlVariation');
    const selectOptions = selectDropdown.options;

    let status = '';
    // --- Only include sides that have less than 3 selections
    if (selectOptions.length <= 3) {
      side.classList.add(`${settings.ID}-included`);
      if (selectOptions.length > 1) {
        status = 'inactive';
      }
      const newAddBtn = `<div class="${settings.ID}-addToCart__wrapper">
        <div class="${settings.ID}-addToCart ${status}">Add to Basket</div>
      </div>`;

      selectBtn.addEventListener('click', () => {
        pollerLite([
          '.menuListCont.menuListPRPizza.menuListContH',
          'select.variationDropDown.ddlVariation',
        ], () => {
          if (!side.classList.contains(`${settings.ID}-elements`)) {
            // console.log(`[043]  +++++  new lightbox`);
            setTimeout(function(){ 
              side.querySelector('.menuListCont.menuListPRPizza.menuListContH').insertAdjacentHTML('beforeend', newAddBtn);
            
              pollerLite(['select.variationDropDown.ddlVariation option',], () => {
                // console.log('[026] clicked on select, lightbox is now open');

                // --- Get portion options from Select dropdown
                let newOptionBtns = '';
                if (selectOptions.length > 1) {
                  // side.setAttribute('style', 'background-color: lightcoral;');
                  for (let i = 0; i < selectOptions.length; i += 1) {
                    let text = selectOptions[i].innerText;
                    if (text.indexOf('Select') === -1) {
                      let className = '';
                      if (text.indexOf('Single') > -1) {
                        text = text.replace(' Portion', '');
                        className = `${settings.ID}-single`;
                      } else if (text.indexOf('Double') > -1) {
                        text = text.replace(' Up Portion', ',');
                        className = `${settings.ID}-double`;
                      }
                      const value = selectOptions[i].getAttribute('value');
                      let selected = '';
                      if (selectOptions[i].selected) {
                        selected = 'selected';
                      }
                      // ---- If more than TWO portion options are available
                      // ---- add class name
                      let largerBtn = '';
                      let preSelected = '';
                      if (selectOptions.length > 3 && selectOptions.length < 7) {
                        if (i === 0) {
                          preSelected = 'selected';
                        }
                        largerBtn = `${settings.ID}-btn__larger`;
                        if (text.indexOf('£') > -1) {
                          text = text.replace('£', `<br>£`);
                        }
                      }
                      newOptionBtns += `<div class="${settings.ID}-btn ${preSelected} ${largerBtn} ${className} ${selected}" value="${value}">${text}</div>`;

                      // --- If there is no dip select, then show Add Button as active
                      if (!side.querySelector('.dip-selection-box')) {
                        const newAddCta =  side.querySelector(`.${settings.ID}-addToCart`);
                        newAddCta.classList.remove('inactive');
                      }
                    }
                  }
                // --- If only Single portion is available
                } else if (selectOptions.length === 1) {
                  // side.setAttribute('style', 'background-color: lightblue;');
                  const text = selectOptions[0].innerText.replace(' Portion', '');
                  const value = selectOptions[0].getAttribute('value');
                  newOptionBtns += `<div class="${settings.ID}-btn selected" value="${value}">${text}</div>`;
                
                  const controlAddCta = side.querySelector('.menuListCont.menuListPRPizza.menuListContH p.buttons a.greenButton');
                  const addCtaBtn = side.querySelector('p.buttons a.greenButton');
                  const btnStyle = addCtaBtn.getAttribute('style');
                  const newAddCta =  side.querySelector(`.${settings.ID}-addToCart`);
                  if (btnStyle === 'display: none;') {
                    // alert('button hidden');
                    newAddCta.classList.add('inactive');
                  } else {
                    // alert('button shown!');
                    newAddCta.classList.remove('inactive');
                  }
                  newAddCta.addEventListener('click', () => {
                    controlAddCta.click();
                  });

                  pollerLite([
                    () => side.querySelector('select.variationDropDown.ddlFreeDip'),
                  ], () => {
                    // side.setAttribute('style', 'background-color: lightgreen;');

                    // --- Show Add Button
                    showHideNewAddBtn(side);
                  });
                }
                
                // addExperimentElements(side);
                const portionContainer = side.querySelector('.PRSeparator');
                // console.log(portionContainer);
                const newEl = `<div class="${settings.ID}-pickPortion__label ${settings.ID}-label">Pick a portion size</div>
                  <div class="${settings.ID}-pickPortion__btns">
                    ${newOptionBtns}
                </div>`;
                // console.log(newEl);
                portionContainer.insertAdjacentHTML('afterbegin', newEl);

                const quantityInputEl = side.querySelector('input.quantity');
                const quantityLabel = `<label class="${settings.ID}-quantityLabel ${settings.ID}-label">Quantity</label>`;
                const newBtnContainer = side.querySelector(`.${settings.ID}-addToCart__wrapper`);
                newBtnContainer.insertAdjacentElement('beforebegin', quantityInputEl);
                // quantityInputEl = side.querySelector('input.quantity');
                quantityInputEl.insertAdjacentHTML('beforebegin', quantityLabel);

                side.classList.add(`${settings.ID}-elements`);


                // --- Click Select Portion - Select in background
                const portionBtns = side.querySelectorAll(`.${settings.ID}-btn`);
                const quantityInput = side.querySelector('input.quantity');
                if (portionBtns.length > 1) {
                  for (let i = 0; i < portionBtns.length; i += 1) {
                    // side.setAttribute('style', 'background-color: lightcoral;');
                    const btn = portionBtns[i];
                    btn.addEventListener('click', () => {
                      // console.log('[127] CLICKED  BUTTON:');
                      // console.log(btn);
                      // Get btn value
                      const btnValue = btn.getAttribute('value');
                      btn.classList.add('portion-selected');
                      // // --- Show Add Button
                      // showHideNewAddBtn(side);

                      // Set Btn Active
                      if (side.querySelector(`.${settings.ID}-btn.selected`)) {
                        side.querySelector(`.${settings.ID}-btn.selected`).classList.remove('selected');
                      }
                      btn.classList.add('selected');

                      let opt;
                      for (let i = 0; i < selectDropdown.length; i += 1) {
                        opt = selectDropdown.options[i];
                        if (opt.value === btnValue) {
                          opt.selected = true;
                          opt.selected = 'selected';

                          break;
                        }
                      }
                      eventFire(selectDropdown, 'change');


                      // --- Disable Quantity input
                      // --- if portion selected is Double
                      if (btn.classList.contains(`${settings.ID}-double`)) {
                        quantityInput.disabled = true;
                        quantityInput.classList.add('inactive');
                        quantityInput.setAttribute('style', 'filter: blur(.6px); cursor: not-allowed;');
                        quantityInput.value = 1;
                        // console.log('[143] --- Added tooltip');
                        // quantityInput.insertAdjacentHTML('afterend', `<div class="${settings.ID}-input__tooltip"><div class="${settings.ID}-message"><p>This is available only on Single portion</p></div></div>`);
                      } else {
                        quantityInput.disabled = false;
                        quantityInput.classList.remove('inactive');
                        quantityInput.setAttribute('style', 'filter: blur(0px); cursor: default;');
                      }

                      // --- Change text on "Free dips"
                      pollerLite([
                        () => side.querySelector('.pnlFreeDips') 
                              && side.querySelector('.litSelectFreeDip'),
                      ], () => {
                        // console.log('[119] --- clicked on portion, select dip');
                        // addExperimentElements(side);
                        side.querySelector('.litSelectFreeDip').innerText = `Pick a dip for FREE`;
                        side.querySelector('.litSelectFreeDip').classList.add(`${settings.ID}-label`);
                        side.querySelector('.litSelectFreeDips').innerText = `Pick two dips for FREE`;
                        side.querySelector('.litSelectFreeDips').classList.add(`${settings.ID}-label`);
                      });
                    });

                    // --- Show Add Button
                    showHideNewAddBtn(side);
                  }
                }

                // --- Close icon
                const closeIcon = side.querySelector('a.close');
                closeIcon.addEventListener('click', () => {
                  // side.querySelector(`.${settings.ID}-quantityLabel`).setAttribute('style', 'display: none;');
                  // side.querySelector(`input.quantity`).setAttribute('style', 'display: none;');
                  // side.querySelector(`.${settings.ID}-addToCart__wrapper`).setAttribute('style', 'display: none;');
                });
                
              });

            }, 100);
            
            
          } else {
            // if new elements have been added to this side
            // check selected options and ...
            pollerLite(['select.variationDropDown.ddlVariation option'], () => {
              if (!side.querySelector(`.${settings.ID}-pickside__wrapper`)) {
                // alert('else code');
                // document.querySelector(`.${settings.ID}-addToCart__wrapper`).setAttribute('style', 'display: block;');
                // document.querySelector(`.${settings.ID}-quantityLabel`).setAttribute('style', 'display: block;');
                // document.querySelector(`input.quantity`).setAttribute('style', 'display: block;');
                // document.querySelector(`.${settings.ID}-addToCart__wrapper`).setAttribute('style', 'display: block;');
                // addExperimentElements(side);
              }
              // alert('re-show');

            });
          }
        });
      });
      

      // --- Select Dropdowns
      const dropdowns = side.querySelectorAll('select.variationDropDown.ddlFreeDip');
      [].forEach.call(dropdowns, (dropdown) => {
        dropdown.addEventListener('change', (e) => {
          const parentEl = dropdown.closest('p.inputs');
          const selectedValue = dropdown.options[dropdown.selectedIndex].getAttribute('value');

          if (selectedValue !== '') {
            parentEl.classList.add('success');
          } else {
            parentEl.classList.remove('success');
          }
        });
        
      });
    } else {
      // --- Sides that are excluded content
      pollerLite([
        '.menuListCont.menuListPRPizza.menuListContH',
        '.menuListCont.menuListPRPizza.menuListContH p.buttons a.greenButton',
      ], () => {
        side.classList.add(`${settings.ID}-excluded`);
        // side.querySelector('.menuListCont.menuListPRPizza p.buttons a.greenButton').setAttribute('style', 'float: none !important; min-width: 200px; margin: auto !important;');
        // console.log(side.querySelector('.menuListCont.menuListPRPizza.menuListContH p.buttons a.greenButton'));
        // console.log(side);
      });
      
    }
  });

  //////////////////////////////////////////////////////////////////

  // -------------------------------------------
  // PRM Manager Listen for State Changes
  // -------------------------------------------
  window.prm.add_endRequest(function (sender, error) {
    try {
      // console.log(sender);
      if (sender['_postBackSettings'].asyncTarget.indexOf("_objMenuProduct$lbAddToBasket") > -1) {
        // alert('re-run test');
        // activate();
        window.location.reload();
      } else if (sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbCloseOnmibar2"
      || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbCloseOnmibar1"
      || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbCloseOnmibar3"
      || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbCloseOnmibar4") {
        window.location.reload();
      }
      
    } catch (e) {} 
  });
};

export default activate;
