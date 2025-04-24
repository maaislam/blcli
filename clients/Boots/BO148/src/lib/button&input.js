export const buttonFunction = (ID) => {
  document.querySelectorAll(`.${ID}-productContainerParent ul.grid_mode > li`).forEach((liItem) => {
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

  document.querySelectorAll(`.${ID}-productContainerParent ul.grid_mode > li`).forEach((liItem) => {
    if (liItem.querySelector('div.shopperActions')) {
      liItem.querySelector('div#coremetrics_add_to_cart_json').insertAdjacentHTML('beforebegin', buttonDiv);
    }
  });
};

export const inputFieldFunction = (ID) => {
  // remove existing input if any
  document.querySelectorAll(`.${ID}-productContainerParent ul.grid_mode > li`).forEach((liItem) => {
    const inputEl = liItem.querySelector('input.numberofProducts');
    if (inputEl) {
      inputEl.remove();
    }
  });
  // define content
  const inputField = `<input type="number" value="1" class="numberofProducts">`;
  //place content in DOM|
  document.querySelectorAll(`.${ID}-productContainerParent ul.grid_mode > li`).forEach((liItem) => {
    if (liItem.querySelector('div.shopperActions')) {
      liItem.querySelector('div#coremetrics_add_to_cart_json').insertAdjacentHTML('beforebegin', inputField);
    }
  });

  //attach events as needed
};
