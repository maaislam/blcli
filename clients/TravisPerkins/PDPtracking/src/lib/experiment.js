/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { events } from '../../../../../lib/utils';

export default () => {
  setup();

  var arr = window.dataLayer;
  var lastPDPecomm;

  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].event === "productDetails") {
      var lastPDPecomm = i;
    }
  }

  var PDPname = window.dataLayer[lastPDPecomm].ecommerce.detail.products[0].name,
    PDPsku = window.dataLayer[lastPDPecomm].ecommerce.detail.products[0].sku,
    PDPprice = window.dataLayer[lastPDPecomm].ecommerce.detail.products[0].price,
    PDPexVAT = window.dataLayer[lastPDPecomm].ecommerce.detail.products[0].priceExVat,
    PDPcategory1 = ((window.dataLayer[lastPDPecomm].ecommerce.detail.products[0].categories[0] || {}).name || ''),
    PDPcategory2 = ((window.dataLayer[lastPDPecomm].ecommerce.detail.products[0].categories[1] || {}).name || ''),
    PDPcategory3 = ((window.dataLayer[lastPDPecomm].ecommerce.detail.products[0].categories[2] || {}).name || ''),
    PDPcategory4 = ((window.dataLayer[lastPDPecomm].ecommerce.detail.products[0].categories[3] || {}).name || ''),
    PDPbrand = window.dataLayer[lastPDPecomm].ecommerce.detail.products[0].brand;

  var VatState = "Include";
  document.querySelector(".VatSwitch__ToggleSliderDsk-sc-1ebcts7-3") && "eZvxzl" == document.querySelector(".VatSwitch__ToggleSliderDsk-sc-1ebcts7-3").classList[1] && (VatState = "Exclude");


events.send('PDP Tracking', 'Name: ' + PDPname + ' || SKU: ' + PDPsku + ' || Price: ' + PDPprice + ' || EX Vat Price: ' + PDPexVAT + ' || Category: ' + PDPcategory1 + ' | ' + PDPcategory2 + ' | ' + PDPcategory3 + ' | ' + PDPcategory4 + ' || Brand: ' + PDPbrand + '', 'Toggle: ' + 'ToggleState' + VatState + '');

};
