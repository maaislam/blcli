/**
 * EJ006 - PLP Finance Option
 * @author Lewis Needham - User Conversion
 */
import settings from './settings';
import { setup } from './services';
import { observer } from './../../../../lib/uc-lib';
import { cacheDom } from './../../../../lib/cache-dom';
import FinanceBoxPLP from './components/FinanceBoxPLP';

const activate = () => {
  setup();

  /** Adds FinanceBoxPLP component to products */
  const addFinanceBox = () => {
    /** Gets a subset of products from the listing */
    const unmodifiedProducts = (() => {
      const items = document.querySelectorAll('.product-tile-list__item');
      return [].filter.call(items, el => !el.getAttribute(`data-${settings.ID}_modified`));
    })();

    [].forEach.call(unmodifiedProducts, (product) => {
      product.setAttribute(`data-${settings.ID}_modified`, true);
      const financeBoxPLP = new FinanceBoxPLP(product); // eslint-disable-line no-unused-vars
    });
  };

  /** Call addFinanceBox every time new products are added to the listing */
  observer.connect(cacheDom.get('.items'), () => {
    addFinanceBox();

    // Try again 2 more times to account for slow loading products
    setTimeout(addFinanceBox, 800);
    setTimeout(addFinanceBox, 1500);
  }, {
    config: {
      childList: false,
      subtree: true,
      attributes: true,
    },
  });

  /** Inital call */
  addFinanceBox();
};

export default activate;
