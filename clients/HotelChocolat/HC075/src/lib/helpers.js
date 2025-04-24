import shared from '../../../../../core-files/shared';
import { fireEvent } from '../../../../../core-files/services';

const { ID, VARIATION } = shared;



export const getProductID = () => {
  let productID = '';
  const productDataInput = document.querySelector('#product-detail-wrapper input[name="productData"]');
  let productData = JSON.parse(productDataInput.getAttribute('value'));

  if (productData.productID) {
    productID = productData.productID;
  }
  
  return productID;
}