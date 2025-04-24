/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';

const activate = () => {
  setup();

    var currentURL = window.location.href,
      pageType = window.digitalData.page.pageInfo.pageType,
      brandPlpRegex = /.*(\/)(l)(\/).*(brand%7C).*/gi,
      basketRegex = /.*(\/)(showbasket).*/gi,
      plpOnSaleCheck = /.*(\/)(l)(\/).*(sale).*/.test(currentURL),
      timeStamp = new Date(),
      currentObj,
      userArr = JSON.parse(localStorage.getItem("userArray"));

  if (userArr === null) {
      userArr = {"page": [], "details":[{"email": 'undefined', "newslettersignup": false, "IFC": false}]};
  }

  function emailSignUpCheck(cname){
      if (document.cookie.indexOf(cname) >= 0) {
          userArr.details[0].newslettersignup = true;
      }
      else {
          userArr.details[0].newslettersignup = false;
      }
      
  }

  function ifcCheck (){
      var ifcTable = document.querySelector('.basket__ifc-container');
      if (ifcTable) {
          userArr.details[0].IFC = true;
      }
      else {
              userArr.details[0].IFC = false;
      }

  }

  function sessionCount(){

      if (localStorage.getItem("count") === null) {
      sessionStorage.setItem("count", 's');
      localStorage.setItem("count", 's');
      }
      
      else if (sessionStorage.getItem("count") === null) {
      var lsCount = localStorage.getItem("count");
      sessionStorage.setItem("count", lsCount + 's');
      localStorage.setItem("count", lsCount + 's');
      }
      
      else {
          
      }
      
      var sessionRetrieve = sessionStorage.getItem("count");
      
      return sessionRetrieve.length;
      
      }

  function userNameCheck(){
      var userEmail = window.digitalData.user[0].profile[0].profileInfo.userName;
      if (userEmail) {
          userArr.details[0].email = userEmail
      }
  }

  if (brandPlpRegex.test(currentURL)){
      var plpBrand = window.location.href.match(/(.*(brand)(\%7C))([\w\d]+).*/)[4],
          digitalCategoryPrimary = window.digitalData.page.category.primaryCategory,
          digitalCategorySecondary = window.digitalData.page.category.subCategory1,
          //digitalOccasion = 
          //digitalRecipient = 
          currentObj = {Page: 'PLP', Category: digitalCategoryPrimary + " | " + digitalCategorySecondary, Timestamp: timeStamp, SessionCount: sessionCount(), Brand: plpBrand, Sale: plpOnSaleCheck};        
          //Occasion: digitalOccasion
          //Recipient: digitalRecipient
          emailSignUpCheck('UserNewsletterSubscribed');
          userNameCheck();
          userArr.page.push(currentObj);
          localStorage.setItem("userArray", JSON.stringify(userArr));
          
  }

  else if (pageType.match('PLP')) {
        
      var digitalCategoryPrimary = window.digitalData.page.category.primaryCategory,
          digitalCategorySecondary = window.digitalData.page.category.subCategory1,
          //digitalOccasion = 
          //digitalRecipient = 
          currentObj = {Page: 'plp', Category: digitalCategoryPrimary + " | " + digitalCategorySecondary, Timestamp: timeStamp, SessionCount: sessionCount(), Sale: plpOnSaleCheck}; 
          //Occasion: digitalOccasion
          //Recipient: digitalRecipient
          emailSignUpCheck('UserNewsletterSubscribed');
          userNameCheck();
          userArr.page.push(currentObj);
          localStorage.setItem("userArray", JSON.stringify(userArr));
          
          
  }

  else if (pageType.match('Landing')) {
        
      var digitalCategoryPrimary = window.digitalData.page.category.primaryCategory,
          digitalCategorySecondary = window.digitalData.page.category.subCategory1,
          currentObj = {Page: 'landing', Category: digitalCategoryPrimary + " | " + digitalCategorySecondary, Timestamp: timeStamp, SessionCount: sessionCount()}; 
          //Occasion: digitalOccasion
          emailSignUpCheck('UserNewsletterSubscribed');
          userNameCheck();
          userArr.page.push(currentObj);
          localStorage.setItem("userArray", JSON.stringify(userArr));
          
  }

  else if (pageType.match('PDP')) {
      var digitalCategoryPrimary = window.digitalData.page.category.primaryCategory,
          digitalCategorySecondary = window.digitalData.page.category.subCategory1,
          digitalPrice = window.digitalData.product[0].price.currentPrice,
          digitalBrand = window.digitalData.product[0].productInfo.brand,
          digitalSale = window.digitalData.product[0].productInfo.onSale,
          //digitalOccasion = 
          //digitalRecipient = 
          currentObj = {Page: 'pdp', Category: digitalCategoryPrimary + " | " + digitalCategorySecondary, Price: digitalPrice, Timestamp: timeStamp, SessionCount: sessionCount(), Brand: digitalBrand, Sale: digitalSale}; 
          //Occasion: digitalOccasion
          //Recipient: digitalRecipient
          emailSignUpCheck('UserNewsletterSubscribed');
          userNameCheck();
          userArr.page.push(currentObj);
          localStorage.setItem("userArray", JSON.stringify(userArr));
              

  }

  else if (basketRegex.test(currentURL)) {
      var currentObj = {Page: 'cart', Price: window.digitalData.cart.attributes.basketTotal, Timestamp: timeStamp, SessionCount: sessionCount()}; 
          userArr.page.push(currentObj);
          ifcCheck();
          userNameCheck();
          localStorage.setItem("userArray", JSON.stringify(userArr));
          //Occasion: digitalOccasion
          //Recipient: digitalRecipient

  }
  // Experiment code
};

export default activate;
