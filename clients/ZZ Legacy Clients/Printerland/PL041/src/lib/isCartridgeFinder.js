import elements from './elements';

const isCartridgeFinder = () => {
  const cartridgeFinderURLString = 'consumables/352';
  const cartridgeFinderPage = window.location.href.indexOf(cartridgeFinderURLString) > -1;
  const hasManufacturerInUrl = location.search.indexOf('manufacturer') >= 0;
  return (hasManufacturerInUrl && cartridgeFinderPage && elements.cartridgeFinder !== null);
};

export default isCartridgeFinder;