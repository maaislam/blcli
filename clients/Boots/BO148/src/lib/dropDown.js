const dropDownFunction = (ID, fireEvent) => {
  const productsValue = {};
  const emptyDiv = `<div class="emptyDiv"></div>`;
  if (document.body.querySelector('div.emptyDiv')) {
    document.body.querySelector('div.emptyDiv').remove();
  }
  document.body.insertAdjacentHTML('beforeend', emptyDiv);

  document.querySelectorAll(`.${ID}-productsContainerV3 ul.grid_mode > li`).forEach((liItem) => {
    const findButtonEl = liItem.querySelector('span#forMobileSection');
    if (findButtonEl) {
      findButtonEl.closest('a#add2Cart').remove();
    }
  });
  const buttonDiv =
    '<a class="button primary primary_redesign add2Cart" id="add2Cart" products-value="1">' +
    '<div class="left_border"></div>' +
    '<span id="productPageAdd2Cart" class="button_text button_text_redesign desktop">Add to basket</span>' +
    '<span id="productPageAdd2Cart" class="button_text button_text_redesign mobile forMobileSection">Add</span>' +
    '<div class="right_border"></div>' +
    '</a>';

  document.querySelectorAll(`.${ID}-productsContainerV3 ul.grid_mode > li`).forEach((liItem) => {
    if (liItem.querySelector('div.shopperActions')) {
      liItem.querySelector('div#coremetrics_add_to_cart_json').insertAdjacentHTML('beforebegin', buttonDiv);
    }
  });

  document.querySelectorAll(`.${ID}-productsContainerV3 ul.grid_mode > li`).forEach((liItem) => {
    const customSelectEl = liItem.querySelector('div.custom-select');
    if (customSelectEl) {
      customSelectEl.remove();
    }
  });

  const selectField =
    '<div class="custom-select">' +
    '<div class="quantityTitle">quantity:</div>' +
    '<div class="optionsField">' +
    "<div class='selectOptionItem'>" +
    '<p>Select your quantity</p>' +
    '<span>Done</span>' +
    '</div>' +
    "<div class='optionItem'>1</div>" +
    "<div class='optionItem'>2</div>" +
    "<div class='optionItem'>3</div>" +
    "<div class='optionItem'>4</div>" +
    "<div class='optionItem'>5</div>" +
    "<div class='optionItem'>6</div>" +
    "<div class='optionItem'>7</div>" +
    "<div class='optionItem'>8</div>" +
    "<div class='optionItem'>9</div>" +
    "<div class='optionItem'>10+</div>" +
    "<div class='optionItem'>10+<input type='number' class='numberOfProducts' ><span class='applyButton'>Apply</span></div>" +
    '</div>' +
    '</div>';

  document.querySelectorAll(`.${ID}-productsContainerV3 ul.grid_mode > li`).forEach((liItem) => {
    if (liItem.querySelector('div.shopperActions')) {
      liItem.querySelector('div#coremetrics_add_to_cart_json').insertAdjacentHTML('beforebegin', selectField);
    }
  });

  document.querySelectorAll(`.${ID}-productsContainerV3 ul.grid_mode > li`).forEach((liItem) => {
    liItem.addEventListener('click', (e) => {
      if (e.target == liItem.querySelector('div.custom-select .quantityTitle')) {
        console.log('custom select');
        console.log(e.target.parentNode.querySelector('div.optionsField'));
        e.target.parentNode.querySelector('div.optionsField').classList.toggle('showOptionsField');
        document.body.classList.toggle('showOptionsFieldMobile');
      }
    });
  });

  document.querySelectorAll(`.${ID}-productsContainerV3 ul.grid_mode li div.optionsField`).forEach((optionField) => {});

  document.querySelectorAll(`.${ID}-productsContainerV3 ul.grid_mode > li`).forEach((liItem) => {
    liItem.addEventListener('click', (e) => {
      liItem.querySelectorAll('div.optionItem').forEach((option) => {
        if (e.target != liItem.querySelector('div.optionItem:last-child') && e.target == option) {
          liItem.querySelectorAll('div.optionItem:not(:last-child)').forEach((optionItem) => {
            if (optionItem.classList.contains('selectedItem')) {
              optionItem.classList.remove('selectedItem');
            }
          });
          e.target.classList.add('selectedItem');
          productsValue.number = e.target.innerText;
          fireEvent(`Used Dropdown`);
        }
      });
    });
  });

  document
    .querySelectorAll(
      `.${ID}-productsContainerV3 ul.grid_mode > li div.optionsField .optionItem:last-child input.numberOfProducts`
    )
    .forEach((inputField) => {
      inputField.addEventListener('input', (e) => {
        inputField.setAttribute('value', e.target.value);
        productsValue.number = e.target.value;
        fireEvent('used text field');
      });
    });

  document.querySelectorAll(`.BO148-productsContainerV3 ul.grid_mode > li div.custom-select`).forEach((customSelect) => {
    customSelect.addEventListener('click', (e) => {
      if (e.target == customSelect.querySelector('span.applyButton')) {
        customSelect.querySelector('div.quantityTitle').innerText = productsValue.number;
        fireEvent(`Enter Quantity - ${productsValue.number}`);
        customSelect.querySelector('div.optionsField').classList.toggle('showOptionsField');
        document.body.classList.toggle('showOptionsFieldMobile');
      }
    });
  });

  document.querySelectorAll(`.BO148-productsContainerV3 ul.grid_mode > li div.custom-select`).forEach((doneButton) => {
    doneButton.addEventListener('click', (e) => {
      if (e.target == doneButton.querySelector('.selectOptionItem span')) {
        doneButton.querySelectorAll('.optionItem').forEach((option) => {
          if (option.classList.contains('selectedItem')) {
            if (option.textContent != '10+') {
              productsValue.number = option.textContent;
              doneButton.querySelector('div.quantityTitle').innerText = productsValue.number;
            } else {
              console.log(10);
              productsValue.number = '10';
              doneButton.querySelector('div.quantityTitle').innerText = productsValue.number;
            }
            if (doneButton.querySelector('div.optionsField').classList.contains('showOptionsField')) {
              doneButton.querySelector('div.optionsField').classList.toggle('showOptionsField');
            }
            document.body.classList.toggle('showOptionsFieldMobile');
          }
        });
      }
    });
  });

  document.querySelector('body .emptyDiv').addEventListener('click', () => {
    document.body.classList.toggle('showOptionsFieldMobile');
    document.querySelectorAll(`.BO148-productsContainerV3 ul.grid_mode > li div.custom-select`).forEach((doneButton) => {
      if (doneButton.querySelector('div.optionsField').classList.contains('showOptionsField')) {
        doneButton.querySelector('div.optionsField').classList.remove('showOptionsField');
      }
    });
  });

  // use input value -->> next
  document.querySelectorAll(`.${ID}-productsContainerV3 ul.grid_mode li`).forEach((item) => {
    item.addEventListener('click', (e) => {
      const productsValue = item.querySelector('div.custom-select .quantityTitle').innerText;
      if (e.target.closest('a#add2Cart.add2Cart') == item.querySelector('a#add2Cart')) {
        if (productsValue != 'NaN' && productsValue != ' ' && productsValue != '0' && parseInt(productsValue) >= 1) {
          const id = item.querySelector('.quantity_section input').getAttribute('id');
          const atag = item.querySelector("a[title='Add']:not(.add2Cart)").getAttribute('href');
          const currentId = atag.lastIndexOf('javascript:');
          const setupShopDesign = atag.lastIndexOf('setupShop5DataRedesign');
          const setup5Data = atag.lastIndexOf('setupShop5Data');
          const shoppingAction = atag.lastIndexOf('shoppingActionsJS');
          const currentIdFunction = atag.slice(currentId, setupShopDesign);
          const currentIdFunction1 = atag.slice(currentId, setup5Data);
          const setupShopDesignFunction = atag.slice(setupShopDesign, shoppingAction);
          const setupShopDesignFunction1 = atag.slice(setup5Data, shoppingAction);
          const shoppingActionFunction = atag.slice(shoppingAction);
          var updatedShoppingActionFunction;
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
            item.querySelector('div.quantityTitle').innerText = document.querySelector(
              '#widget_minishopcart_popup_1 #MiniShopCartAddedProdQty1'
            ).innerText;
          }, 5000);
        } else {
          const productId = item.querySelector('div.product_image').getAttribute('id').lastIndexOf('_');
          const mainProductId = parseInt(
            item
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

export default dropDownFunction;
