/**
 * ME176 - Scarcity Improvements
 * @author Lewis Needham - User Conversion
 */
import { setup } from './services';
import { cacheDom } from './../../../../lib/cache-dom';
import { events } from '../../../../lib/utils';
import settings from './settings';

const activate = () => {
  setup();

  const storage = window.localStorage.ME176 ? JSON.parse(window.localStorage.ME176) : {};
  const { pathname } = window.location;
  const stockSelections = storage[pathname] ? storage[pathname] : {}; // Add item when an in stock size is selected - Max: 2
  const sizeSelect = cacheDom.get('#pa_size');

  /**
   * Update saved cache to remember size selection
   */
  const updateCache = () => {
    const cache = window.localStorage.ME176 ? JSON.parse(window.localStorage.ME176) : {};
    cache[pathname] = stockSelections;
    window.localStorage.ME176 = JSON.stringify(cache);
  };

  /**
   * Add a stock message to active option
   */
  const addStockMessage = () => {
    const selected = sizeSelect.selectedOptions[0];

    // Store in memory
    if (!Object.prototype.hasOwnProperty.call(stockSelections, selected.value)) {
      // Change stock count depending on which size was viewed first
      if (!Object.keys(stockSelections).length) {
        stockSelections[selected.value] = '5'; // First size viewed
      } else {
        stockSelections[selected.value] = '3'; // Second+ size viewed
      }
      updateCache();
    }

    if (selected.innerText.match(/\//)) {
      selected.innerText += ' - Low Stock';
    } else {
      selected.innerText += ` - Less than ${stockSelections[selected.value]} available`;
    }
  };

  /**
   * Remove all stock messages to prevent them showing in
   * the dropdown
   */
  const clearAllStockMessages = () => {
    Array.from(sizeSelect.children).forEach((node) => {
      const el = node;
      if (/ - Less than \d+ available/.test(el.innerText)) {
        el.innerText = el.innerText.replace(/ - Less than \d+ available/, '');
      } else if (el.innerText.indexOf(' - Low Stock')) {
        el.innerText = el.innerText.replace(' - Low Stock', '');
      }
    });
  };

  /**
   * Add a stock message to first 2 selections that are in stock
   */
  const checkMessages = () => {
    clearAllStockMessages();
    const selected = sizeSelect.selectedOptions[0];

    if (Object.keys(stockSelections).length >= 2) {
      // Check stock selections
      if (Object.prototype.hasOwnProperty.call(stockSelections, selected.value)) {
        addStockMessage();
      }
    } else {
      const inStock = selected.getAttribute('data-uc-sflag');
      if (inStock) {
        addStockMessage();
      }
    }
  };

  // Events
  sizeSelect.addEventListener('change', checkMessages);
  sizeSelect.addEventListener('click', () => {
    events.send(settings.ID, 'Clicked', 'Clicked sizing drop down');
  });

  // Initial check
  checkMessages();
};

export default activate;
