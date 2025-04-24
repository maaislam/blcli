const manufacturerSelectEl = document.querySelector('#drpManufacturer');
const manufacturerSelect = typeof manufacturerSelectEl !== 'undefined' ? manufacturerSelectEl : null;
const manufacturerSelectOptions = manufacturerSelect ? manufacturerSelect.options : null;
const tabContentWrapperEl = document.querySelector('.product-tabs .tab-content__wrapper');
const tabContentWrapper = typeof tabContentWrapperEl !== 'undefined' ? tabContentWrapperEl : null;

const cartridgeFinderEl = document.querySelector('.cons-product-search');
const cartridgeFinder = typeof cartridgeFinderEl !== 'undefined' ? cartridgeFinderEl : null;

const elements = {
  cartridgeFinder,
  tabContentWrapper,
  manufacturerSelect,
  manufacturerSelectOptions,
};

export default elements;