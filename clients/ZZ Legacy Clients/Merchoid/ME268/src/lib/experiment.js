/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import categories from './categories';
import PageMarkup from './markup';
import mobileHeader from './mobileHeader';
import { setup } from './services';
import shared from './shared';

export default () => {

  const { ID, VARIATION } = shared;

  setup();

  new PageMarkup();
  mobileHeader();
  
  // loop through all products to add an attribute based on the category heading
  const addProductAttr = () => {

    const clothingCategories = ['christmas-sweaters', 'jackets-and-outerwear', "mens-t-shirts", 'ladies-nightwear-and-pyjamas', 'nightwear-and-pyjamas', 'dressing-gowns--bathrobes', 'cosplay', 'accessories', 'jewellery', 'bags', 'wallets-and-purses', 'scarves', 'earrings', 'gloves', 'necklaces', 'watches', 'slippers'];
    const homeCategories = ['home-and-office', 'kitchen-gadgets', 'lights', 'computer-tablets--mobile', 'posters-and-wallscrolls', 'kitchenware', 'stationery', 'keyrings', 'money-boxes', 'cups-coasters-and-mugs', 'christmas-decorations'];
    const toysCategories = ['models-and-figures', 'games', 'props-figures-and-plushies', 'props--replicas'];

    const allProducts = document.querySelectorAll('.products.wrapper.grid.products-grid .item.product.product-item');
    for (let index = 0; index < allProducts.length; index += 1) {
      const element = allProducts[index];
      const categoryHeading = element.parentNode.parentNode.id;

      // make image src that actual product image to avoid blank lazy load
      if(VARIATION === '2') {
        const imageData = element.querySelector('img').getAttribute('data-original');
        element.querySelector('img').setAttribute('src', imageData);
     }
  

      if(categoryHeading) {

        // add target based on categories
        if(clothingCategories.indexOf(categoryHeading) > -1) {
         element.setAttribute('cat-data', 'clothing');

         if(VARIATION === '2') {
          document.querySelector(`.${ID}-categoryList.${ID}-clothingList .${ID}-list`).appendChild(element);
         }
        }

        if(homeCategories.indexOf(categoryHeading) > -1) {
         element.setAttribute('cat-data', 'home');
         if(VARIATION === '2') {
          document.querySelector(`.${ID}-categoryList.${ID}-homeList .${ID}-list`).appendChild(element);
         }
        }

        if(toysCategories.indexOf(categoryHeading) > -1) {
         element.setAttribute('cat-data', 'toys');
         if(VARIATION === '2') {
          document.querySelector(`.${ID}-categoryList.${ID}-toysList .${ID}-list`).appendChild(element);
         }
        }

        if(VARIATION === '1') {
          document.querySelector(`.${ID}-productGrid .${ID}-container`).appendChild(element);
        } 
      }
    }
  }

  // Seperate brand name from product name
  const changeProductTitle = () => {
    const productNameElms = document.querySelectorAll('.product-item-details .product-item-name');
    [].forEach.call(productNameElms, (productNameElm) => {
      const link = productNameElm.querySelector('.product-item-link');
      if(link) {
        const text = link.innerText.trim();
        const regex = /^([^:]+:)/i;
        const regexMatches = text.match(regex);
  
        if(regexMatches && regexMatches[1]) {
          const newTitle = text.replace(regex, '');
          link.innerHTML = newTitle;
  
          link.insertAdjacentHTML('afterbegin', `
            <span class="${shared.ID}-cat-name">${regexMatches[1].replace(/:$/, '')}</span>
          `);
        }
      }
    });
  }


  changeProductTitle();
  addProductAttr();
  categories();

};
