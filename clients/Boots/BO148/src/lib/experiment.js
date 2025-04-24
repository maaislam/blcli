/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { buttonFunction, inputFieldFunction } from './button&input';
import quantitySectionFunction from './quantitySection';
import dropDownFunction from './dropDown';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  if (shared.VARIATION == '1') {
    // do something
    const initMain = () => {
      const productContainerParent = document.querySelector("div[ariamessage='Product List Display Updated']");
      productContainerParent && productContainerParent.classList.add(`${ID}-productContainerParent`);

      buttonFunction(ID);
      inputFieldFunction(ID);

      // get input value
      document.querySelectorAll(`.${ID}-productContainerParent ul.grid_mode li input.numberofProducts`).forEach((item) => {
        item.addEventListener('input', (e) => {
          var currentValue = parseInt(e.target.value);
          fireEvent(`Enter Quantity - ${currentValue}`);
          item.parentNode.querySelector('a.add2Cart').setAttribute('products-value', currentValue);
        });
      });

      document.querySelectorAll(`.${ID}-productContainerParent ul.grid_mode > li`).forEach((liItem) => {
        liItem.addEventListener('click', (e) => {
          const productsValue = liItem.querySelector('a#add2Cart').getAttribute('products-value');

          if (e.target.closest('a#add2Cart') == liItem.querySelector('a#add2Cart')) {
            if (productsValue != 'NaN' && productsValue != ' ' && productsValue != '0' && parseInt(productsValue) >= 1) {
              const id = liItem.querySelector('.quantity_section input').getAttribute('id');

              const atag = liItem.querySelector("a.button.primary[title='Add']").getAttribute('href');
              const currentId = atag.lastIndexOf('javascript:');
              const setupShopDesign = atag.lastIndexOf('setupShop5DataRedesign');
              const setup5Data = atag.lastIndexOf('setupShop5Data');
              const shoppingAction = atag.lastIndexOf('shoppingActionsJS');
              const currentIdFunction = atag.slice(currentId, setupShopDesign);
              const currentIdFunction1 = atag.slice(currentId, setup5Data);
              const setupShopDesignFunction = atag.slice(setupShopDesign, shoppingAction);
              const setupShopDesignFunction1 = atag.slice(setup5Data, shoppingAction);
              const shoppingActionFunction = atag.slice(shoppingAction);
              let updatedShoppingActionFunction;
              if (parseInt(productsValue) > 10) {
                if (shoppingActionFunction.includes(id)) {
                  updatedShoppingActionFunction = shoppingActionFunction.replace(`document.getElementById('${id}').value`, '1');
                } else {
                  updatedShoppingActionFunction = shoppingActionFunction;
                }
              } else {
                if (shoppingActionFunction.includes(id)) {
                  updatedShoppingActionFunction = shoppingActionFunction.replace(
                    `document.getElementById('${id}').value`,
                    `${parseInt(productsValue)}`
                  );
                } else {
                  updatedShoppingActionFunction = shoppingActionFunction.replace(',1,', `,${parseInt(productsValue)},`);
                }
              }

              const functionDiv = document.createElement('div');
              functionDiv.setAttribute('id', 'functionDiv');
              const script_ele = window.document.createElement('script');
              functionDiv.appendChild(script_ele);
              if (shoppingActionFunction.includes(id)) {
                script_ele.innerHTML = `function my_function(){${currentIdFunction1} ${setupShopDesignFunction1} ${updatedShoppingActionFunction}}`;
              } else {
                script_ele.innerHTML = `function my_function(){${currentIdFunction} ${setupShopDesignFunction} ${updatedShoppingActionFunction}}`;
              }
              window.document.body.appendChild(functionDiv);

              my_function();
              functionDiv.remove();

              setTimeout(() => {
                liItem.querySelector('.numberofProducts').value = document.querySelector(
                  '#widget_minishopcart_popup_1 #MiniShopCartAddedProdQty1'
                ).innerText;
              }, 5000);
            } else {
              const productId = liItem.querySelector('div.product_image').getAttribute('id').lastIndexOf('_');
              const mainProductId = parseInt(
                liItem
                  .querySelector('div.product_image')
                  .getAttribute('id')
                  .slice(productId + 1)
              );

              shoppingActionsJS.Add2ShopCartAjaxRedesign(`entitledItem_${mainProductId}`, NaN, false);
              fireEvent('Validation Error');
            }
          }
        });
      });
    };

    initMain();

    const targetNode = document.querySelector("div[ariamessage='Product List Display Updated']");
    const config = { attribute: true, childList: true, subtree: false };
    var timeout;
    const callback = function (mutationsList, observer) {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          for (let i = 0; i < 100; i++) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              initMain();
            }, 500);
          }
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  } else if (shared.VARIATION == '2') {
    // do something else

    const initMain = () => {
      const productContainerParent = document.querySelector("div[ariamessage='Product List Display Updated']");
      productContainerParent && productContainerParent.classList.add(`${ID}-productContainerParent-v2`);

      quantitySectionFunction(ID, fireEvent);
    };
    initMain();
    const targetNode = document.querySelector("div[ariamessage='Product List Display Updated']");

    const config = { attribute: true, childList: true, subtree: false };
    var timeout;
    const callback = function (mutationsList, observer) {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          for (let i = 0; i < 100; i++) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              initMain();
            }, 500);
          }
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  } else if (shared.VARIATION == '3') {
    // do something else
    const initMain = () => {
      const productsContainer = document.querySelector('#tab1Widget div.dijitContentPane');
      productsContainer.classList.add(`${ID}-productsContainerV3`);
      dropDownFunction(ID, fireEvent);
    };
    initMain();
    const targetNode = document.querySelector('#tab1Widget div.dijitContentPane');

    const config = { attribute: true, childList: true, subtree: false };
    var timeout;
    const callback = function (mutationsList, observer) {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          for (let i = 0; i < 100; i++) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              initMain();
            }, 500);
          }
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  }
};
