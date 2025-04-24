const handleQuantityChange = (tag, partnumber) => {
  // PDP (Product Detail Page) elements
  const pdpContainer = document.querySelector('#estore_productpage_template_container');
  const pdpIncreaseBtn = pdpContainer?.querySelector('#increseQty');
  const pdpDecreaseBtn = pdpContainer?.querySelector('#desreseQty');

  // PLP (Product Listing Page) elements
  const plpContainer = document.querySelector(`.oct-grid__cell[data-productid^="${partnumber}"]`);
  const plpIncreaseBtn = plpContainer?.querySelector('button[id^="increseQty"]');
  const plpDecreaseBtn = plpContainer?.querySelector('button[id^="desreseQty"]');

  // Function to handle button click
  const clickButton = (button) => button?.click();

  // Execute action based on tag
  if (tag === 'increase') {
    clickButton(pdpIncreaseBtn);
    clickButton(plpIncreaseBtn);
  } else if (tag === 'decrease') {
    clickButton(pdpDecreaseBtn);
    clickButton(plpDecreaseBtn);
  }
};

export default handleQuantityChange;
