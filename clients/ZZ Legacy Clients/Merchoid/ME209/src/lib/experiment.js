/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';

const activate = () => {
  setup();

  const { VARIATION } = settings;


  if (VARIATION === '2') {
    const allProducts = document.querySelectorAll('.products .product-small');
    for (let index = 0; index < allProducts.length; index += 1) {
      const element = allProducts[index];
      const officialBadge = document.createElement('div');
      officialBadge.classList.add(`${settings.ID}-official`);
      officialBadge.innerHTML = '<span>Officially Licensed Product</span>';
      element.appendChild(officialBadge);
    }
  }
};

export default activate;
