/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import tracking from './tracking';
import shared from '../../../../../core-files/shared';
import getCurrencyRates from './getCurrencyRates';
import getRecommendedProducts from './getRecommendedProducts';
import addItems from './addItems';
import slickRecommendations from './slickRecommendations';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;


export default () => {

  setup();

  fireEvent('Conditions Met');

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

  getCurrencyRates().then((data) => {
    
    window.currencyRates = data;
    window.userCurrency = window.AF?.analyticsData?.currency;
    window.currentCurrencyRates = window.currencyRates[window.userCurrency];
    getRecommendedProducts().then(recommendations => {
      // Check is in stock from attraqt feed
      const inStockRecommendations = recommendations.filter((recommendation) => {
        const product = recommendation.product;
        return product?.is_in_stock;
      });
      addItems(inStockRecommendations);
      slickRecommendations();
      tracking();
    });
  });
  
};
