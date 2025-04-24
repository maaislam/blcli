/* eslint-disable */
import { fullStory, events, } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

const Experiment = {
/**
* @desc Variation settings. Useful for when multiple variations are developed
* in a single project so you can just toggle the variation number in production
*/
settings: {
ID: 'HD003',
VARIATION: '{{VARIATION}}',
},

init: function init() {
  // Setup
  const { settings, services, components } = Experiment;
  events.useLegacyTracker(); 
  services.tracking();
  document.body.classList.add(settings.ID);

  poller(['body',
    () => !!window.jQuery,
  ], () => {
    components.HD003test();
    services.sendEvents();
  });
 
},


services: {
  /**
  * @desc Inits all page level tracking
  */
  tracking: function tracking() {
    const { settings } = Experiment;
    fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    _gaq.push(['_trackEvent', 'HD003', 'view', 'HD003 activated', null, true]);
  },
  /**
  * @desc Inits all page level tracking
  */
  sendEvents: function sendEvents() {
    poller([
      '.buy_more .productInfo','.custom-breadcrumbsright',
    ], () =>{
      const buySaveArea = document.querySelector('.buy_more .productInfo');
      buySaveArea.addEventListener('click', () => {
        _gaq.push(['_trackEvent', 'HD003', 'click', 'Buy more save more clicked', null, true]);
      });
    

    const viewAll = document.querySelector('.custom-breadcrumbsright a');
    if(viewAll.textContent.indexOf('View all') > -1) {
      viewAll.addEventListener('click', () => {
        _gaq.push(['_trackEvent', 'HD003', 'click', 'Clicked view all pack size', null, true]);
      });
    }
  });
  },
},

components: {
 HD003test: function HD003test() {
  var regexSizePack = /Size \d+ Pack of \d+/;
  var regexSize = /Size \d+/;
  var regexPack = /Pack of \d+/;
  var regexPackUrl = /pack-of-\d+/;
  var productName = jQuery('.product-info__name')[0].innerText;
  var sizePackVal, sizeVal, getSizeValue, packVal, getPackValue;
  var getproductPrice;
  var productPrice;
  var weekMonthArr = {
    weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    suffixDay: ['st', 'nd', 'rd']
  };
  function calculateNextDate(noOfDaysToAdd) {
    var startDate = new Date();
    var endDate = "", count = 0;
    if(startDate.getDay() != 0) {
      noOfDaysToAdd = noOfDaysToAdd - 1;
    }
    while(count < noOfDaysToAdd){
        endDate = new Date(startDate.setDate(startDate.getDate() + 1));
        if(endDate.getDay() != 0){
           count++;
        }
    }
    return endDate;
  }
  var getDeliverDate = calculateNextDate(4);
  var lastCharDate = getDeliverDate.getDate().toString()[getDeliverDate.getDate().toString().length - 1];
  var suffixDate = getDeliverDate.getDate() > 3 && (getDeliverDate.getDate() < 20 || getDeliverDate.getDate() > 23)? 'th': weekMonthArr.suffixDay[lastCharDate - 1];
  var deliveryString = '<span class="week_month"> ' + weekMonthArr.weekDays[getDeliverDate.getDay()] + ' ' + getDeliverDate.getDate() + suffixDate + ' ' + weekMonthArr.month[getDeliverDate.getMonth()] + '</span>';
  jQuery(function (){
    if(productName.match(regexSizePack)){
      sizePackVal = productName.match(regexSizePack)[0];
      var tempProductNameHTML = productName.replace(sizePackVal, '');
      sizeVal = sizePackVal.match(regexSize)[0];
      getSizeValue = sizeVal.match(/\d+/)[0];
      packVal = sizePackVal.match(regexPack)[0];
      getPackValue = parseFloat(packVal.match(/\d+/)[0]);
      tempProductNameHTML = tempProductNameHTML + '<br>' + sizeVal + '<br>' + packVal;
      jQuery('.product-info__name')[0].innerText = '';
      jQuery('.product-info__name').prepend(tempProductNameHTML);
      jQuery('ul.breadcrumbs').after('<div class="custom-breadcrumbsright"><a href="Hearing-Aid-Batteries-Size-' + getSizeValue + '"> View all ' + sizeVal + ' batteries </a></div>');
      //get packValue Price
      if(jQuery('.product-actions .price-box .special-price').length){
        getproductPrice = parseFloat(jQuery('.product-actions .price-box .special-price .price').text().replace('£', ''));
        productPrice = Math.ceil(getproductPrice);
      }
      else if(jQuery('.product-actions .price-box .regular-price').length){
        getproductPrice = parseFloat(jQuery('.product-actions .price-box .regular-price .price').text().replace('£', ''));
        productPrice = Math.ceil(getproductPrice);
      }
      var pricePerBattery =  parseFloat((productPrice/getPackValue) * 100);
      var roundedPrice = Math.ceil(pricePerBattery);

      jQuery('.product-actions .product__actions').append('<div class="thatsJust"><span><img src="//cdn-3.convertexperiments.com/uf/1002628/10021290/1525879200font-awesome_4-7-0_check_20_0_ffffff_none.png"></span>That\'s just ' + roundedPrice + 'p per battery!</div>');
      jQuery('.add-to-box').after('<p class="basket_delivery">Get your item by ' + deliveryString + '. Next day delivery and Saturday delivery also available</p>');
      
      if(getPackValue == 10){
        var getProductUrl = location.pathname.replace(regexPackUrl, 'pack-of-60');
        jQuery('.basket_delivery').after('<div style="display:none" class="buy_more"><h2>Buy more, save more</h2><a href="' + getProductUrl + '"><div class="productInfo"><div class="productImg"></div><div class="productPrice"></div></div></a></div>');	
        jQuery('.productImg').load(getProductUrl + ' .thumbnails.thumbnail-nav > li:first-child > img', function( response, status, xhr ) {
          if(xhr.status == 200){
            if(jQuery('.productImg > img').length == 0){
              jQuery('.buy_more').css('display', 'none');
            }
            else{
              jQuery('.buy_more').css('display', 'block');
            }
          }
          else{
            jQuery('.buy_more').css('display', 'none');
          }
        });
        jQuery('.productPrice').load(getProductUrl + ' .product__actions .price-box', function( response, status, xhr ) {
          if(xhr.status == 200){
            if(jQuery('.productPrice .special-price').length){
              var getNewproductPrice = parseFloat(jQuery('.productPrice .special-price .price').text().replace('£', ''));
              var batteryPackPrice = parseFloat((getNewproductPrice/60) * 100);
              var justPrice = parseFloat((getNewproductPrice/60) * 100);
              var justRounded = Math.ceil(justPrice);
              jQuery('.productPrice').html('<span class="customProdPrice"> Pack of 60 - £' + batteryPackPrice + '</span><span class="justCustomPrice"><span><img src="//cdn-3.convertexperiments.com/uf/1002628/10021290/1525879839font-awesome_4-7-0_check_20_0_000000_none.png"></span>Just ' + justRounded + 'p each</span>');
              jQuery('.buy_more').css('display', 'block');
            }
            else if(jQuery('.productPrice .regular-price').length){
              var getNewproductPrice = parseFloat(jQuery('.productPrice .regular-price .price').text().replace('£', ''));
              var batteryPackPrice = parseFloat((getNewproductPrice/60) * 100);
              var justPrice = parseFloat((getNewproductPrice/60) * 100);
              var justRounded = Math.ceil(justPrice);
              jQuery('.productPrice').html('<span class="customProdPrice"> Pack of 60 - £' + batteryPackPrice + '</span><span class="justCustomPrice"><span><img src="//cdn-3.convertexperiments.com/uf/1002628/10021290/1525879839font-awesome_4-7-0_check_20_0_000000_none.png"></span>Just ' + justRounded + 'p each</span>');
              jQuery('.buy_more').css('display', 'block');
            }
          }
          else{
            jQuery('.buy_more').css('display', 'none');
          }
        });
      }
      else if(getPackValue == 60){
        var getProductUrl = location.pathname.replace(regexPackUrl, 'pack-of-120');
        jQuery('.basket_delivery').after('<div style="display:none" class="buy_more"><h2>Buy more, save more</h2><a href="' + getProductUrl + '"><div class="productInfo"><div class="productImg"></div><div class="productPrice"></div></div></a></div>');
        jQuery('.productImg').load(getProductUrl + ' .thumbnails.thumbnail-nav > li:first-child > img', function( response, status, xhr ) {
          if(xhr.status == 200){
            if(jQuery('.productImg > img').length == 0){
              // jQuery('.buy_more').css('display', 'none');
              /**
               * Run another request with the adjusted url.
               */
              getProductUrl = location.pathname.replace(regexPackUrl, 'pack-of-120-and-battery-caddy');
              jQuery('.productImg').load(getProductUrl + ' .thumbnails.thumbnail-nav > li:first-child > img', function( response, status, xhr ) {
                if(xhr.status == 200){
                  if(jQuery('.productImg > img').length == 0){
                    jQuery('.buy_more').css('display', 'none');
                  }
                  else{
                    jQuery('.buy_more').css('display', 'block');
                  }
                }
                else{
                  jQuery('.buy_more').css('display', 'none');
                }
              });
            }
            else{
              jQuery('.buy_more').css('display', 'block');
            }
          }
          else{
            jQuery('.buy_more').css('display', 'none');
          }
        });
        jQuery('.productPrice').load(getProductUrl + ' .product__actions .price-box', function( response, status, xhr ) {
          if(xhr.status == 200){
            if(jQuery('.productPrice .special-price').length){
              var getNewproductPrice = parseFloat(jQuery('.productPrice .special-price .price').text().replace('£', ''));
              var justPrice = parseFloat((getNewproductPrice/120) * 100)
              var justRounded = Math.ceil(justPrice);
              jQuery('.productPrice').html('<span class="customProdPrice"> Pack of 120 - £' + getNewproductPrice + '</span><span class="justCustomPrice"><span><img src="//cdn-3.convertexperiments.com/uf/1002628/10021290/1525879839font-awesome_4-7-0_check_20_0_000000_none.png"></span>Just ' + justRounded + 'p each</span>');
              jQuery('.buy_more').css('display', 'block');
            }
            else if(jQuery('.productPrice .regular-price').length){
              var getNewproductPrice = parseFloat(jQuery('.productPrice .regular-price .price').text().replace('£', ''));
              var justPrice = parseFloat((getNewproductPrice/120) * 100)
              var justRounded = Math.ceil(justPrice);
              jQuery('.productPrice').html('<span class="customProdPrice"> Pack of 120 - £' + getNewproductPrice + '</span><span class="justCustomPrice"><span><img src="//cdn-3.convertexperiments.com/uf/1002628/10021290/1525879839font-awesome_4-7-0_check_20_0_000000_none.png"></span>Just ' + justRounded + 'p each</span>');
              jQuery('.buy_more').css('display', 'block');
            }
            else {
              /**
               * If wrong page try another URL
               */
              getProductUrl = location.pathname.replace(regexPackUrl, 'pack-of-120-and-battery-caddy');
              jQuery('.productPrice').load(getProductUrl + ' .product__actions .price-box', function( response, status, xhr ) {
                if(xhr.status == 200){
                  if(jQuery('.productPrice .special-price').length){
                    var getNewproductPrice = parseFloat(jQuery('.productPrice .special-price .price').text().replace('£', ''));
                    var justPrice = parseFloat((getNewproductPrice/120) * 100)
                    var justRounded = Math.ceil(justPrice);
                    jQuery('.productPrice').html('<span class="customProdPrice"> Pack of 120 - £' + getNewproductPrice + '</span><span class="justCustomPrice"><span><img src="//cdn-3.convertexperiments.com/uf/1002628/10021290/1525879839font-awesome_4-7-0_check_20_0_000000_none.png"></span>Just ' + justRounded + 'p each</span>');
                    jQuery('.buy_more').css('display', 'block');
                  }
                  else if(jQuery('.productPrice .regular-price').length){
                    var getNewproductPrice = parseFloat(jQuery('.productPrice .regular-price .price').text().replace('£', ''));
                    var justPrice = parseFloat((getNewproductPrice/120) * 100)
                    var justRounded = Math.ceil(justPrice);
                    jQuery('.productPrice').html('<span class="customProdPrice"> Pack of 120 - £' + getNewproductPrice + '</span><span class="justCustomPrice"><span><img src="//cdn-3.convertexperiments.com/uf/1002628/10021290/1525879839font-awesome_4-7-0_check_20_0_000000_none.png"></span>Just ' + justRounded + 'p each</span>');
                    jQuery('.buy_more').css('display', 'block');
                  } else {
                    jQuery('.buy_more').css('display', 'none');
                  }
                }
              });
            }
          }
        });
        /**
         * If the first .load returns fasly then adjust the getProductUrl to include
         * -and-battery-caddy as some of the 120 packs include this in the URL.
         */
      }
    }
    else if(productName.match(regexSize)){
      sizeVal = productName.match(regexSize)[0];
      getSizeValue = sizeVal.match(/\d+/)[0];
      var tempProductNameHTML = productName.replace(sizeVal, '');
      tempProductNameHTML = tempProductNameHTML + '<br>' + sizeVal;
      jQuery('.product-info__name')[0].innerText = '';
      jQuery('.product-info__name').prepend(tempProductNameHTML);
      jQuery('ul.breadcrumbs').after('<div><a href="Hearing-Aid-Batteries-Size-' + getSizeValue + '"> View all ' + sizeVal + ' batteries </a></div>');
      jQuery('.add-to-box').after('<p class="basket_delivery">Get your item by ' + deliveryString + '. Next day delivery and Saturday delivery also available</p>');
    }
    
    if(window.innerWidth<767){
      jQuery('.custom-breadcrumbsright').insertBefore('.product-actions');
      jQuery('.product-into__reviews').insertBefore('.product-actions');
    }
    
  });
 }
},
};

export default Experiment;
