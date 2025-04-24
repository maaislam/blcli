import settings from '../settings';
import lastViewedProductScraper from '../lastViewedProducts/storeLastViewedProducts';

const { ID } = settings;

export default () => {
  const cartNumber = parseInt(document.querySelector('.basket-icon__counter').textContent, 10);
  const URL = window.location.href;

  const removeCategoryStorage = () => {
    if (localStorage.getItem('HS022category')) {
      localStorage.removeItem('HS022category');
    }
  };

  const removeProductStorage = () => {
    if (window.localStorage.HS022recommended_prods_1) {
      localStorage.removeItem(`${ID}recommended_prods_1`);
    }
  };

  // if basket item is ever removed totalling 0, remove storage
  if (cartNumber === 0) {
    if (window.localStorage.HS022userType === 'PDPwithCartitem') {
      localStorage.removeItem('HS022userType');
    }
  }

  // if on PLP page and not met any other conditions
  if (cartNumber > 0) {
    window.localStorage.HS022userType = 'PDPwithCartitem';
    removeCategoryStorage();
    removeProductStorage();

  } else if (URL.indexOf('/webstore/l/') > -1 && window.localStorage.HS022userType !== 'PDP' && window.localStorage.HS022userType !== 'PDPwithCartitem') {
    window.localStorage.HS022userType = 'PLP';

    // remove PLP storage
    removeCategoryStorage();

    // store the product category in storage
    const productCategory = window.digitalData.page.category.primaryCategory;
    const cache = window.localStorage.HS022category;
    const cachedCategoryData = cache ? JSON.parse(cache) : [];

    const data = {
      name: productCategory,
      link: URL,
    };
    cachedCategoryData.push(data);
    window.localStorage.HS022category = JSON.stringify(cachedCategoryData);

  // if on PDP and nothing in cart
  } else if (URL.indexOf('/webstore/d/') > -1 && cartNumber === 0) { // if on PDP
    window.localStorage.HS022userType = 'PDP';

    // add the product storage here, remove any others
    lastViewedProductScraper();
    removeCategoryStorage();

    // if PDP, something in cart - store it
  }
};
