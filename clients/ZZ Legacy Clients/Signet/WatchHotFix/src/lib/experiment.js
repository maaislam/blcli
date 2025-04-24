/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import {
  setup
} from './services';

export default () => {
  setup();

  if(window.location.href.indexOf('ernestjones') > -1) {

    if (window.digitalData.page.pageInfo.pageType === "PDP") {
      if (window.digitalData.page.category.primaryCategory.indexOf("watch")) {
        if ((window.digitalData.product[0].productInfo.brand).match(/.*(Tudor|Breitling|Cartier|Gucci Jewellery|Chopard|Bremont|Omega|Zenith|TAG Heuer|Gucci Watches|Chanel|Michael Kors Access|MEY for Game of Thrones|Tissot|Hamilton|Swatch).*/gi)) {
          document.querySelector('.usp-list .usp-list__item:nth-child(1)').style.display = "none";
        }
        if(window.digitalData.page.category.subCategory1 && window.digitalData.page.category.subCategory1 === 'Smart Watches') {
          document.querySelector('.usp-list .usp-list__item:nth-child(1)').style.display = "none";
        }
      }

    }
  }

  if(window.location.href.indexOf('hsamuel') > -1) {
    if (window.digitalData.page.pageInfo.pageType === "PDP") {
      if(window.digitalData.page.category.subCategory1 && window.digitalData.page.category.subCategory1 === 'Smart Watches') {
        document.querySelector('.product-propositions .product-propositions__item:nth-child(2)').style.display = "none";
      }
      if(window.digitalData.product[0].productInfo.brand && window.digitalData.product[0].productInfo.brand === 'Citizen' && window.digitalData.page.category.primaryCategory === 'Watches' && window.location.href.indexOf('star+wars') > -1) {
        document.querySelector('.product-propositions .product-propositions__item:nth-child(2)').style.display = "none";
      }
      if ((window.digitalData.product[0].productInfo.brand).match(/.*(Tudor|Breitling|Cartier|Gucci Jewellery|Chopard|Bremont|Omega|Zenith|TAG Heuer|Gucci Watches|Chanel|Michael Kors Access|MEY for Game of Thrones|Tissot|Hamilton|Swatch).*/gi)) {
        document.querySelector('.product-propositions .product-propositions__item:nth-child(2)').style.display = "none";
      }
    }
  }

};
