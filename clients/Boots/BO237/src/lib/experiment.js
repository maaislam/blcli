/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { insertAfterElement } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import product from './bundleProduct';
import AddToBag from './addToBag';

export default (data) => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live){
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
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const entry = document.querySelectorAll("#estore_productpage_template_container .rowContainer .row")[1];
  const root = document.createElement("div");
  root.id = `${ID}-root`;
  root.innerHTML = /* HTML */ `
    <div class="${ID}-container">
      <div class="${ID}-title">
        <h2>The best combination</h2>
        <div class="${ID}-add">
          <div class="${ID}-totalPrice"></div>
          <div class="${ID}-cta">Add both to basket</div>
        </div>
      </div>
      <div class="${ID}-bundle-container">
        <div class="${ID}-productOuter current">
          <span>This item</span>
        </div>
        <span class="${ID}-plus"></span>
        <div class="${ID}-productOuter extra"></div>
      </div>
    </div>
  `;

  insertAfterElement(entry, root);


  const currentProduct = document.createElement("div");
  currentProduct.classList.add(`${ID}-product-inner`);

  // Current product variables
  const currentObjID = document.querySelector('#cvosSkuID_1').value;
  const model = document.querySelector('#cvosVariantId_1').value;
  const currentImage = `https://boots.scene7.com/is/image/Boots/${model}?fit=constrain,1&wid=500&hei=500&fmt=jpg";`
  const currentName = document.querySelector('#estore_product_title').innerText;
  const currentPrice = document.querySelector('#PDP_productPrice').innerText.replace('£','');
  let wasPrice;
  if(document.querySelector('.was_price was_price_redesign')){
    wasPrice = document.querySelector('.was_price_redesign').innerText.replace('Was', '').replace('£','');
  }
  let promotionalText = '';
  if(document.querySelector('.pdp-promotion-redesign a')){
    promotionalText = document.querySelector('.pdp-promotion-redesign a').innerText;
  }

  // Add current product
  currentProduct.appendChild(
    product(
      currentObjID,
      model,
      currentImage,
      currentName,
      currentPrice,
      wasPrice,
      '',
      promotionalText
    )
  );
  root.querySelector(`.${ID}-productOuter.current`).append(currentProduct);
  
  // Add bundle product
  const bundleProduct = document.createElement("div");
  bundleProduct.classList.add(`${ID}-product-inner`);
  bundleProduct.appendChild(

    product(
      data[0].product_data.objectid,
      data[0].product_data.model,
      data[0].product_data.referenceimageurl,
      data[0].product_data.offername,
      data[0].product_data.currentprice.toFixed(2),
      data[0].product_data.regularprice.toFixed(2),
      data[0].product_data.actionurl,
      data[0].product_data.promotionaltext
    )
  );
  root.querySelector(`.${ID}-productOuter.extra`).append(bundleProduct);


  // Get total price
  const totalPrice = parseFloat(currentPrice.replace('£', '')) + parseFloat(data[0].product_data.currentprice.toFixed(2));
  root.querySelector(`.${ID}-totalPrice`).innerText = `Total price: £${totalPrice.toFixed(2)}`;

  // Add both to bag
  const bundleProductEl = document.querySelector(`.${ID}-productOuter.extra .${ID}-product`);
  const bundleProductObjectID = bundleProductEl.getAttribute('objectid');
  const bundleProductSap = bundleProductEl.getAttribute('sap');
  const bundleProductName = bundleProductEl.querySelector(`.${ID}-card-title`).innerText;
  
  const addToBag1 = new AddToBag(currentObjID, parseInt(currentObjID, 10) - 1, model, currentName);
  const addToBag2 = new AddToBag(bundleProductObjectID, parseInt(bundleProductObjectID, 10) - 1, bundleProductSap, bundleProductName);

  document.querySelector(`.${ID}-cta`).addEventListener('click', () => {
    fireEvent('Clicked add both to bag');
    addToBag1.add().then(() => {
      addToBag2.add();
    });
  });

};
