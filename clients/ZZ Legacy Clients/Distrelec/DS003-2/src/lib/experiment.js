/**
 * DS003
 * @author User Conversion
 */
import { setup } from './services';
import Search from '../components/Search/Search';
import settings from '../lib/settings';
import USP from '../components/USP/USP';
import USPV2 from '../components/USPV2/USPV2';
import TopCategories from '../components/Top-Categories/top-categories';
import ImportTools from '../components/Import-Tool/import-tool';
import HeroBannerAccount from '../components/HeroBannerAccount/HeroBannerAccount';
import CartPreview from '../components/CartPreview/CartPreview';

const { ID, VARIATION } = settings;

const activate = () => {
  console.log('activating');
  setup();

  const IS_LOGGED_IN = window.digitalData.user[0].userID !== 'anonymous';
  const PRODUCTS_IN_BASKET = window.digitalData.cart && window.digitalData.cart.item;
  console.log(VARIATION);

  // Render components
  if (VARIATION === '1') {
    const search = new Search();
    const usp = new USP();
    const topCategories = new TopCategories();
    const importTools = new ImportTools();

    document.querySelector('.page-wrapper').insertAdjacentElement('afterbegin', search.component);
    search.component.insertAdjacentElement('afterend', usp.component);
    usp.component.insertAdjacentElement('afterend', topCategories.component);
    document.querySelector('.home-quickorder').insertAdjacentElement('afterend', importTools.component);
    /*
    * Create a wrap for the quickorder block
    */
    const quickOrder = document.querySelector('.home-quickorder');
    const quickOrderWrap = document.createElement('div');
    quickOrderWrap.classList.add('home-quickorderWrap');
    quickOrderWrap.appendChild(quickOrder);
    document.querySelector('.what-looking-today').insertAdjacentElement('afterend', quickOrderWrap);
    /*
    * Wrap quick-order buttons in a div to avoid unnecessary absolute positioning
    */
    const cartButton = document.querySelector('.quickorder__cta--floating-add-to-cart');
    const addButton = document.querySelector('.quickorder__cta--add-product');
    const block = document.createElement('div');
    block.classList.add('quickorder__block');
    block.appendChild(cartButton);
    block.appendChild(addButton);
    document.querySelector('.quickorder__fieldWrapper').insertAdjacentElement('afterend', block);
    /*
    * Clone the existing searchbar and insert it in the sticky header
    */
    const listitem = document.createElement('li');
    listitem.classList.add('mod', 'mod-metahd-item', 'skin-metahd-item', 'stickySearch');
    document.querySelector('.skin-metahd-item-account').insertAdjacentElement('afterend', listitem);
  } else if (VARIATION === '2') {
    const heroBanner = new HeroBannerAccount();
    const cartPreview = new CartPreview();
    const uspV2 = new USPV2();
    const topCategories = new TopCategories();

    // Render Components
    const rootEl = document.querySelector('.page-wrapper');
    console.log('before');
    if (IS_LOGGED_IN) {
      console.log('logged in');
      if (PRODUCTS_IN_BASKET) {
        rootEl.insertAdjacentElement('afterbegin', cartPreview.component);
        cartPreview.component.insertAdjacentElement('afterend', uspV2.component);
      } else {
        rootEl.insertAdjacentElement('afterbegin', uspV2.component);
      }
      uspV2.component.insertAdjacentElement('afterend', topCategories.component);
    } else {
      console.log('not logged in');
      rootEl.insertAdjacentElement('afterbegin', heroBanner.component);
      if (PRODUCTS_IN_BASKET) {
        heroBanner.component.insertAdjacentElement('afterend', cartPreview.component);
        cartPreview.component.insertAdjacentElement('afterend', uspV2.component);
      } else {
        heroBanner.component.insertAdjacentElement('afterend', uspV2.component);
      }
      uspV2.component.insertAdjacentElement('afterend', topCategories.component);
    }
  }
};

export default activate;
