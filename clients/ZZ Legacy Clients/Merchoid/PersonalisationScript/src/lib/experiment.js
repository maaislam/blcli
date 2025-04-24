/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite } from '../../../../../lib/utils';

export default () => {
  setup();

  let userArr = JSON.parse(localStorage.getItem("userArray"));
  const timeStamp = new Date();
  let currentObj = {};
  const URL = window.location.href;

  if (userArr === null) {
    userArr = {
    "page": [], 
    "details":[
      {Email: '', Name: '', Size: ''}
    ]};
  }

  // count the number of sessions
  const sessionCount = () => {

    if (localStorage.getItem("count") === null) {
      sessionStorage.setItem("count", 's');
      localStorage.setItem("count", 's');
    }
    
    else if (sessionStorage.getItem("count") === null) {
      var lsCount = localStorage.getItem("count");
      sessionStorage.setItem("count", lsCount + 's');
      localStorage.setItem("count", lsCount + 's');
    }
    
    var sessionRetrieve = sessionStorage.getItem("count");
    return sessionRetrieve.length;
    
  }

  // if on a product page
  if(document.querySelector('.product-info-main')) {
    const brand = document.querySelector('#maincontent h1').textContent.trim().match(/^[^:]+/)[0];
    const wasPrice = window.item.Price;
    const nowPrice = window.item.FinalPrice;
    const productName = window.item.Name;
    const productType = window.item.Categories;


    // add the size
    let size;
    const sizeSelect = document.querySelector('.super-attribute-select');

    if(sizeSelect) {
      size = sizeSelect.options[sizeSelect.selectedIndex].text;
      if(size.trim().indexOf('Choose an Option') === -1){
        userArr.details[0].Size = size;
        localStorage.setItem("userArray", JSON.stringify(userArr));
      }

      sizeSelect.addEventListener('change', () => {
        size = sizeSelect.options[sizeSelect.selectedIndex].text;
        if(size.trim().indexOf('Choose an Option') === -1){
          userArr.details[0].Size = size;
          localStorage.setItem("userArray", JSON.stringify(userArr));
        }
      });
    } 
    
    currentObj = { Page: 'pdp', Brand: brand, ProductName: productName, Category: productType, NowPrice: nowPrice, WasPrice: wasPrice, time: timeStamp};
    userArr.page.push(currentObj);
    localStorage.setItem("userArray", JSON.stringify(userArr));
  }


   // on PLP Pages - TO DO, check brand pages 
  if(document.querySelector('.page-products')) {
    if(URL.indexOf('brand') > -1) {
      const brand = window.location.pathname.match(/(brand)(\/([^\/]+)\/?)/)[3]
      currentObj = { Page: 'plp', Brand: brand, time: timeStamp};
      userArr.page.push(currentObj);
      localStorage.setItem("userArray", JSON.stringify(userArr));
    } else {
      const category = document.querySelector('.page-title');
      if(category) {
        const catName = category.textContent.trim();
        currentObj = { Page: 'plp', Category: catName, time: timeStamp};
        userArr.page.push(currentObj);
        localStorage.setItem("userArray", JSON.stringify(userArr));
      }
    }

  }
  // if on a basket page get the products
  if(URL.indexOf('/checkout/cart/') > -1) {
    const allBasketItems = document.querySelectorAll('.cart.item');
    let products = [];
    for (let index = 0; index < allBasketItems.length; index += 1) {
      const element = allBasketItems[index];
      const productName = element.querySelector('.product-item-name').textContent.trim();
      products.push(productName);
    }
    currentObj = {Page: 'cart', basketProducts: products, time: timeStamp, sessionCount: sessionCount()}; 
    userArr.page.push(currentObj);
    localStorage.setItem("userArray", JSON.stringify(userArr));
  }

  // get the email and name from the shipping form
  if(URL.indexOf('/checkout/#shipping') > -1) {

    pollerLite(['.button.action.continue.primary'], () => {
      const nextStepButton = document.querySelector('.button.action.continue.primary');

      nextStepButton.addEventListener('click', () => {
        const email = document.querySelector('#customer-email').value;
        const name = document.querySelector('#shipping-new-address-form [name=firstname]').value;
        if(email !== '' && name !== '') {
          userArr.details[0].Email = email;
          userArr.details[0].Name = name;
          localStorage.setItem("userArray", JSON.stringify(userArr));
        }
      });
    });
    
  }
};
