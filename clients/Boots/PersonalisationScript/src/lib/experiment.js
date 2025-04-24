/**
 * Personalisation Script
 */

import {
  pollerLite
} from '../../../../../lib/utils';
import {
  setup
} from './services';
import shared from './shared';

export default () => {
  const {
    ID,
    VARIATION
  } = shared;

  setup();

  //Create Objects

  if (JSON.parse(localStorage.getItem("personalisationObj"))) {
    if (JSON.stringify(localStorage.getItem("personalisationObj")).length > 50000) {
      window.userObject = {
        isLoggedIn: '',
        prevLogin: 'false',
        adCardFlag: 'false',
        sessionTimestamp: [],
        behaviour: {
          navUsage: [],
          searchEngagement: [],
          viewedBasket: '',
          basketDate: '',
          hasTransacted: '',
          transactionDate: '',
        },
        filterUsage: [],
        filterCount: 0,
        productViews: [],
        productCount: 0,
        addToBag: [],
        purchasedProducts: [],
        pageView: [],
        totalPageViews: 0,
        pageViewsSinceLastProduct: '',
        clearedObject: 'true'
      }
    } else {
      window.userObject = JSON.parse(localStorage.getItem("personalisationObj"));
    }

  } else {
    window.userObject = {
      isLoggedIn: '',
      prevLogin: 'false',
      adCardFlag: 'false',
      sessionTimestamp: [],
      behaviour: {
        navUsage: [],
        searchEngagement: [],
        viewedBasket: '',
        basketDate: '',
        hasTransacted: '',
        transactionDate: '',
      },
      filterUsage: [],
      filterCount: 0,
      productViews: [],
      productCount: 0,
      addToBag: [],
      purchasedProducts: [],
      pageView: [],
      totalPageViews: 0,
      pageViewsSinceLastProduct: '',
    }
  }

  //General Variables

  const date = new Date();
  const timestamp = date.getTime();
  const url = window.location.href;
  const pathname = window.location.pathname;
  const obj = window.userObject;
  let pageType;

    //Page Type Config - Regex

    const homepageRE = /(http).*(www.boots.com)(\/)(\?.+)?$/gmi;
    const categoryRE = /(http).*(www.boots.com)(\/)(health-pharmacy|beauty|fragrance|baby-child|wellness|toiletries|electrical|mens)(\?.+)?(\/.+)?$/gmi;
    const checkoutRE = /(http).*(www.boots.com)(\/)(checkout).*/gmi;
    const successRE = /(http).*(www.boots.com)(\/)(checkout\/process-order).*/gmi;
  
    if (pageType === undefined && url.match(homepageRE)) {
      pageType = 'Home';
    } else if (pageType === undefined && url.match(categoryRE)) {
      pageType = 'Department';
    } else if (pageType === undefined && url.match(successRE)) {
      
      pageType = 'Success';
      
      obj.behaviour.hasTransacted = 'true';
      obj.behaviour.transactionDate = timestamp;
  
      const array = window.dataLayer; 
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.event === "purchase") {
          var products = element.ecommerce.purchase.products;
    
          for (let index = 0; index < products.length; index++) {
            const productID = element.id;
              const productInfo = {
                productSAP: productID.replace('.P', ''),
              };
              obj.purchasedProducts.push(productInfo);
              updateStorage();
            };
          }
        }
    } else if (pageType === undefined && url.match(checkoutRE)) {
      pageType = 'Checkout';
    }
    if(window.location.href.indexOf('sitesearch') > -1){
      pageType = 'SLP';
    }

  //General Functions

  function updateStorage() {
    localStorage.setItem("personalisationObj", JSON.stringify(obj));
  }

  function clickListener() {

    const navLinks = document.querySelectorAll('#header #global_navigation a');
    const searchEl = document.querySelector('#header #searchBox');

    for (let index = 0; index < navLinks.length; index++) {
      const element = navLinks[index];
      if (!element.getAttribute('personalisation-data')) {
        element.setAttribute('personalisation-data', 'true');
        element.addEventListener("click", function () {
          if (obj) {
            obj.behaviour.navUsage.push(element.innerText);
            updateStorage();
          }
        });
      }

    }

    searchEl.addEventListener("click", function () {
      if (obj) {
        obj.behaviour.searchEngagement.push('true');
        updateStorage();
      }
    });

  }

  function sessionCount() {
    if (sessionStorage.getItem("count") === null) {
      sessionStorage.setItem("count", timestamp);
      obj.sessionTimestamp.push(timestamp)
      updateStorage();
    }
  }

  function getBootsUserInfo() {
    const isLoggedIn = window.userObj.isLoggedIn;
    const adCardFlag = window.userObj.advantageCardFlag;

    if (isLoggedIn === 'true') {
      obj.isLoggedIn = 'true';
      obj.prevLogin = 'true';
    }
    if (isLoggedIn === 'false') {
      obj.isLoggedIn = 'false';
    }
    if (adCardFlag === 'true') {
      obj.adCardFlag = 'true';
    }

    updateStorage();
  }

  function daysSinceTransaction() {
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    const transactionDate = obj.transactionDate;
    const difference = currentTime - transactionDate
    const dayDifference = difference / (1000 * 3600 * 24).toFixed(2);
    obj.behaviour.daysSinceTransaction = dayDifference;
    updateStorage();
  }

  function daysSinceBasket() {
    const currentTime = currentDate.getTime();
    const basketDate = obj.basketDate;
    const difference = currentTime - basketDate
    const dayDifference = difference / (1000 * 3600 * 24).toFixed(2);
    obj.behaviour.daysSinceBasket = dayDifference;
    updateStorage();
  }

  function pdpCalculations() {

    const allPageviews = window.userObject.pageView;
    let pageTypeArr = [];

    for (let index = 0; index < allPageviews.length; index++) {
      const element = allPageviews[index];
      pageType = element.pageType;
      pageTypeArr.push(pageType)
    }

    if (pageTypeArr.indexOf("PDP") > 0){
    obj.pageViewsSinceLastProduct = (obj.pageView.length - (pageTypeArr.lastIndexOf('PDP'))) - 1;
    }
    else {
    obj.pageViewsSinceLastProduct = ""
    }
    updateStorage();

  }

  //PLP Events
  //Add Filter Tracking

  pollerLite(['.facetbutton'], () => {
    pageType = 'PLP';
    setTimeout(function() {
    const filterEl = document.querySelectorAll('.facetbutton');
    if (filterEl) {
      for (let index = 0; index < filterEl.length; index++) {
        const element = filterEl[index];
        if (!element.hasAttribute('aria-checked')){
        element.addEventListener("click", function () {
          if (obj) {
            const filterParent = element.closest("fieldset").id;
            let filterName = element.querySelector('.outline').innerText.replace(/\([\d]+\)/, '').trim();
            if (filterName === ''){
              filterName = element.querySelector('.outline > span').getAttribute('title').trim();
            }
            const filterData = {
              filterName: filterParent,
              filterValue: filterName,
              filterDate: timestamp,
              filterURL: pathname
            };
            obj.filterUsage.push(filterData);
            obj.filterCount = obj.filterCount + 1;
            updateStorage();
          }
        });
      }
      }
    }
  }, 2000);
  });

  //PLP Add to Cart

  pollerLite(['#estore_lister_template_container', '#productPageAdd2Cart', '.product_add'], () => {
    const plpAdd = document.querySelectorAll('.product_add');
    let productInfo = {};
    for (let index = 0; index < plpAdd.length; index++) {
      const element = plpAdd[index];
      let dataLayerEl;
      element.addEventListener('click', function () {
  
        pollerLite([()=> {
          for (let index = 0; index <  window.dataLayer.length; index++) {
            const el = window.dataLayer[index];
            if(el.event === 'addToCart') {
              dataLayerEl = el;
              return true
            }
          }
        }], () => {
            productInfo = {
              productURL: window.location.pathname,
              productInStock: 'true',
              productPrice: dataLayerEl['ecommerce'].add.products[0].price,
              productSAP: dataLayerEl['ecommerce'].add.products[0].id.replace('.P', ''),
              //productCategoryMap: hits[0].categoryMap,
              productLastViewed: timestamp,
              productBrand: dataLayerEl['ecommerce'].add.products[0].brand,
            };
            obj.addToBag.push(productInfo);
            updateStorage();
        });
      });
      
    }

  });

  //PDP Events

  pollerLite(['#estore_productpage_template_container'], () => {
    if (url.match(/(.*)([\d]{8}(p)?).*/)[2]) {
          let productInfo;
          for (let index = 0; index < window.dataLayer.length; index++) {
            var element = window.dataLayer[index];
            if (element.event === "pdpView"){
                productInfo = {
                productURL: window.location.pathname,
                productInStock: element['ecommerce.detail'].products[0].inStockHomeDelivery,
                productPrice: element['ecommerce.detail'].products[0].price,
                productSAP: element['ecommerce.detail'].products[0].id.replace('.P', ''),
                //productCategoryMap: hits[0].categoryMap,
                productLastViewed: timestamp,
                productBrand: element['ecommerce.detail'].products[0].brand,
              };
            }
          } 

        obj.productViews.push(productInfo);
        obj.productCount = obj.productViews.length;
        if (obj.productCount > 50){
          for (let index = 50; index < obj.productViews.length; index++) {
            const element = obj.productViews[index];
            obj.productViews.splice(element, 1);
          }
          updateStorage();
        }
        else {
          updateStorage();
        }
    pageType = 'PDP';
  }
  });

  pollerLite(['#estore_productpage_template_container', '#productPageAdd2Cart'], () => {
    document.querySelector('#productPageAdd2Cart').addEventListener('click', function () {
      if (url.match(/(.*)([\d]{8}(p)?).*/)[2]) {
        let productInfo;
        for (let index = 0; index < window.dataLayer.length; index++) {
          var element = window.dataLayer[index];
          if (element.event === "pdpView"){
              productInfo = {
              productURL: window.location.pathname,
              productInStock: element['ecommerce.detail'].products[0].inStockHomeDelivery,
              productPrice: element['ecommerce.detail'].products[0].price,
              productSAP: element['ecommerce.detail'].products[0].id.replace('.P', ''),
              //productCategoryMap: hits[0].categoryMap,
              productLastViewed: timestamp,
              productBrand: element['ecommerce.detail'].products[0].brand,
            };
          }
        } 
          obj.addToBag.push(productInfo);
          updateStorage();
      }
    });
  });

  //Send Pageview Data

  const pageviewData = {
    pageURL: pathname,
    pageType: pageType,
    pageLastViewed: timestamp,
  }

  obj.pageView.push(pageviewData);
  obj.totalPageViews = obj.pageView.length;

  if (obj.pageView.length > 50){
    for (let index = 50; index < obj.pageView.length; index++) {
      const element = obj.pageView[index];
      obj.pageView.splice(element, 1);
    }
    updateStorage();
  }
  else {
    updateStorage();
  }

  //call general functions

  sessionCount();
  getBootsUserInfo();
  pdpCalculations();

  if (obj.transactionDate !== undefined) {
    daysSinceTransaction()
  }

  if (obj.basketDate !== undefined) {
    daysSinceBasket()
  }

  pollerLite(['#header #global_navigation a', '#subcategoryList li', '#header #searchBox'], () => {
    clickListener();
    const elementToObserve = document.querySelector("#global_navigation");
    const observer = new MutationObserver(() => {
      clickListener();
    });
    observer.observe(elementToObserve, {
      subtree: true,
      childList: true
    });
  });

  const basketCheck = setInterval(function () {
    if (document.querySelector('.oct-basket')) {
      clearInterval(basketCheck);
      obj.behaviour.viewedBasket = 'true';
      obj.behaviour.basketDate = timestamp;
      updateStorage();
    }
  }, 500);

  //End DOM Ready Listener

};