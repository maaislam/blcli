import addToBag from '../helpers/addToBag';
import getCartData from '../helpers/getCartData';
import handleQuantityChange from './handleQuantityChange';

const handleBagUpdate = async (partnumber, quantity, tag) => {
  const cartData = await getCartData();
  if (cartData && cartData.basketDetails.orderItems.some((item) => item.partNumber === partnumber)) {
    handleQuantityChange(tag, partnumber);
  } else {
    addToBag(partnumber, quantity);
  }
};

export default handleBagUpdate;
