const quantitySectionFunction = (ID, fireEvent) => {
  document.querySelectorAll(`.${ID}-productContainerParent-v2 ul.grid_mode > li`).forEach((liItem) => {
    const findButtonEl = liItem.querySelector('span#forMobileSection');
    if (findButtonEl) {
      findButtonEl.closest('a#add2Cart').remove();
    }
  });
  document.querySelectorAll(`.${ID}-productContainerParent-v2 ul.grid_mode > li`).forEach((liItem) => {
    const findQuantityElem = liItem.querySelector('div.quantity_section');
    if (findQuantityElem) {
      findQuantityElem.remove();
    }
  });

  const buttonDiv =
    '<a class="button primary primary_redesign add2Cart" id="add2Cart">' +
    '<div class="left_border"></div>' +
    '<span id="productPageAdd2Cart" class="button_text button_text_redesign desktop">Add to basket</span>' +
    '<span id="productPageAdd2Cart" class="button_text button_text_redesign mobile forMobileSection">Add</span>' +
    '<div class="right_border"></div>' +
    '</a>';

  const quantitySection = (productId) => {
    const quantityElem =
      `<div class="quantity_section clearfix">` +
      `<p id="desreseQty" name="desreseQty_${productId}" class="minus_quantity" onclick="minusProdQuantity(${productId});" tabindex="-1" aria-hidden="true" data-icon="K"></p>` +
      `<input aria-label="Quantity" id="quantity_${productId}" type="number" class="quantity_input" value="1">` +
      `<p id="increseQty_${productId}" class="plus_quantity" onclick="plusProdQuantity(${productId});" tabindex="-1" aria-hidden="true" data-icon="L"></p>` +
      `<p id="quantity_msg_${productId}" class="qty_errorMax">Maximum quantity reached</p>` +
      `</div>`;
    return quantityElem;
  };

  document.querySelectorAll(`.${ID}-productContainerParent-v2 ul.grid_mode > li`).forEach((liItem) => {
    if (liItem.querySelector('div.shopperActions')) {
      liItem.querySelector('div#coremetrics_add_to_cart_json').insertAdjacentHTML('beforebegin', buttonDiv);
    }
  });

  document.querySelectorAll(`.${ID}-productContainerParent-v2 ul.grid_mode > li`).forEach((liItem) => {
    const productId = liItem.querySelector('div.product_image').getAttribute('id').lastIndexOf('_');
    const mainProductId = parseInt(
      liItem
        .querySelector('div.product_image')
        .getAttribute('id')
        .slice(productId + 1)
    );
    if (liItem.querySelector('div.shopperActions')) {
      liItem.querySelector('div#coremetrics_add_to_cart_json').insertAdjacentHTML('beforebegin', quantitySection(mainProductId));
    }
  });

  document
    .querySelectorAll(`.${ID}-productContainerParent-v2 ul.grid_mode li div.quantity_section > input.quantity_input`)
    .forEach((item) => {
      item.addEventListener('input', (e) => {
        var currentValue = parseInt(e.target.value);
        item.setAttribute('value', currentValue);
      });
    });

  document.querySelectorAll(`.${ID}-productContainerParent-v2 ul.grid_mode > li`).forEach((liItem) => {
    liItem.addEventListener('click', (e) => {
      const productsValue = liItem.querySelector('input.quantity_input').value;

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

export default quantitySectionFunction;
