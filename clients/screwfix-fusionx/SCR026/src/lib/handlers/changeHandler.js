//import shared from '../../../../../../core-files/shared';
import { fireEvent } from '../../../../../../core-files/services';

const changeHandler = (event) => {
  const { target } = event;
  //console.log(target);
  if (target.closest('[data-qaid="pdp-product-quantity"]')) {
    fireEvent('User interacts with quantity on pdp');
  }
};

export default changeHandler;
