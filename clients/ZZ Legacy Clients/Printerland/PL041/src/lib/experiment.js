/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import shared from './shared';
import { setup, fireEvent } from './services';
import elements from './elements';
import settings from './settings';
import getManufacturerOptionValueByName from './getManufacturerOptionValueByName';
import html from './html';

const handleProductPage = () => {
  elements.tabContentWrapper.insertAdjacentHTML('afterend', html);
};

const handleCartridgeFinder = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const manufacturer = urlParams.get('manufacturer');
  const relatedValue = getManufacturerOptionValueByName(manufacturer, elements.manufacturerSelectOptions);
  if (elements.manufacturerSelect && relatedValue) {
    // Change value based on name
    elements.manufacturerSelect.value = relatedValue;
    // Trigger change for options to update
    elements.manufacturerSelect.dispatchEvent(new Event('change'));
  }
};

export default () => {
  setup();
  if (settings.isProductPage) {
    handleProductPage();
  }
  if (settings.isCartridgeFinder) {
    handleCartridgeFinder();
  }
};