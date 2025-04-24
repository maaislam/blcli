/**
 * IDXXX - Description
 * @author User Conversion
 */
import {
  setup
} from './services';

const activate = () => {
  setup();

  const trackerName = window.ga.getAll()[0].get('name');
  let stockCheck = window.digitalData.product[0].productInfo.stock;

  if (stockCheck === "yes"){
    stockCheck = "In Stock";
  }
  else {
    stockCheck = "Out of Stock";
  }

  const productSKU = window.digitalData.product[0].productInfo.productID;

  
    window.ga(trackerName + '.send', 'event', 'PDP Stock Event', 'Stock: ' + stockCheck + ' ', '' + productSKU + '', {
      nonInteraction: true
    });

};

export default activate;