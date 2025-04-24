import { fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import { observer } from '../../../../../lib/uc-lib';
import shared from '../../../../../core-files/shared';

export const checkListProductsAndUpdate = () => {
  const { ID, VARIATION } = shared;

  let allProducts = document.querySelector('.product_listing_container').querySelectorAll('ul.grid_mode.grid li');

  for (let i = 0; i < allProducts.length; i += 1) {
    let prod = allProducts[i];
    let prodId = '';

    if (!prod.classList.contains(`${ID}-out-of-stock`) && prod.querySelector('.product_stockComingSoon')) {
      prod.classList.add(`${ID}-out-of-stock`);
      prod.classList.add(`${getPageType()}`);
      prod.classList.add(`v${VARIATION}`);


      if (VARIATION == '2' && prod.querySelector('.product_name_link')) {
        prod.querySelector('.product_stockComingSoon span').innerText = 'Check store stock';

        const prodUrl = prod.querySelector('.product_name_link').getAttribute('href');
        prod.addEventListener('click', (e) => {
          fireEvent(`Click - Product - Check store stock - ${prodUrl}`);

          setTimeout(() => {
            window.location.href = prodUrl;
          }, 500);
        });
      }

      
    }

    prod.classList.add(`${ID}-prod-checked`);
  }

}



export const getPageType = () => {
  const { ID, VARIATION } = shared;

  let pageType = '';
  if (window.location.href.indexOf('searchTerm') > -1) {
    pageType = `${ID}-srp`;
  } else {
    pageType = `${ID}-plp`;
  }

  return pageType
}