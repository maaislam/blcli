import variantOptions from '../data';
import shared from '../../../../../../core-files/shared';
import { fireEvent } from '../../../../../../core-files/services';
const clickHandler = (e) => {
  const { ID } = shared;
  const { target } = e;
  console.log(target);
  const pathname = window.location.pathname;

  if (target.closest(`.${ID}__variantbtn`)) {
    const selectedProduct = variantOptions.find((item) => item.url === pathname);
    const targetParent = target.closest(`.${ID}__variantbtn`);
    const targetType = targetParent.dataset.varianttype;
    const targetVal = targetParent.dataset.variantvalue;
    const { color, finish, volume } = selectedProduct;
    const productVariants = variantOptions.filter((item) => item.productName === selectedProduct.productName);
    const selection = {
      color,
      finish,
      volume,
    };
    selection[targetType] = targetVal;
    const choosenProduct = productVariants.find((variant) => {
      return variant.color === selection.color && variant.finish === selection.finish && variant.volume === selection.volume;
    });
    fireEvent(`User chooses a ${targetType}`);
    window.location.href = window.location.origin + choosenProduct.url;
  } else if (target.closest('[data-qaid="pdp-button-deliver"]')) {
    fireEvent('User clicks on deliver button');
  } else if (target.closest('[data-qaid="pdp-button-click-and-collect"]')) {
    fireEvent('User clicks on deliver button');
  } else if (target.closest('#accordion-paintfinish-content')) {
    fireEvent('User interacts with finish filter on PLP');
  } else if (target.closest('#accordion-volume-content')) {
    fireEvent('User interacts with volume filter on PLP');
  }
};

export default clickHandler;
