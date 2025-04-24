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

  var array = window.dataLayer; 
  for (var index = 0; index < array.length; index++) {
    var element = array[index];
    if (element.event === "purchase") {
      var OrderID = element.ecommerce.purchase.actionField.id;
      var OrderAmount = element.ecommerce.purchase.actionField.revenue;
      var CurrencyCode = element.ecommerce.purchase.currencyCode;
      var DiscountAmount = element.ecommerce.purchase.discountTotal;
      var CouponCode = element.ecommerce.purchase.actionField.coupon;
      var DeliveryType = element.ecommerce.purchase.fulfilmentType;
      var products = element.ecommerce.purchase.products;
      var _incProductsInfo = '';
      var TransactionTax = element.ecommerce.purchase.actionField.tax;
      var TransactionShipping = element.ecommerce.purchase.actionField.shipping;

      for (let index = 0; index < products.length; index++) {
        const element = products[index];

        var p1 = element.id;
        var p2 = element.price;
        var p3 = element.quantity;
        var p4 = element.variant;

        var string = 'p1=' + p1 + '&p2=' + p2 + '&p3=' + p3 + '&p4=' + p4 + '|';

        var _incProductsInfo = _incProductsInfo.concat(string);

      }

      function readCookie(name) {
        try {
          var nameEQ = name + "=";
          if (document.cookie != undefined && document.cookie != "" && document.cookie != null && document.cookie.indexOf(";") > -1) {
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) == ' ') c = c.substring(1, c.length);
              if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
          }
          return null;
        } catch (err) {
          return null;
        }
      }

      try {
        var _ivid = "";
        if (localStorage.getItem('inc_cookie') != null && localStorage.getItem('inc_cookie') != "" && localStorage.getItem('inc_cookie') != undefined) {
          _ivid = localStorage.getItem('inc_cookie');
        }

        if (_ivid == null || _ivid == "" || _ivid == undefined) {
          _ivid = readCookie('ivid');
        }

        var _incConvPixData = '//optimizedby.increasingly.co/track?CONVERSION_PIXEL/clientId=181&orderId=' + OrderID + '&orderAmount=' + OrderAmount + '&currency=' + CurrencyCode + '&discountAmount=' + DiscountAmount + '&couponCode=' + CouponCode + '&transactionTax=' + TransactionTax + '&transactionShipping=' + TransactionShipping + '&ivid=' + _ivid + '&productsInfo=' + escape(_incProductsInfo) + '&cb=' + Math.floor(Math.random() * 999999);

        var _incConvPixElm = document.createElement('img');
        _incConvPixElm.setAttribute('border', '0');
        _incConvPixElm.setAttribute('width', '1');
        _incConvPixElm.setAttribute('height', '1');
        _incConvPixElm.setAttribute('src', _incConvPixData);
        _incConvPixElm.setAttribute('style', 'display:none');

        var _incConvPixPlaceToSet = document.querySelector('body');
        _incConvPixPlaceToSet.appendChild(_incConvPixElm);
      } catch (err) {
        var formData = new FormData();
        formData.append("EmailId", "tech@increasingly.com");
        formData.append("Subject", 'Conversion pixel Error Boots');
        formData.append("Message", err);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '//api.increasingly.co/SendEmail', true);
        xhr.send(formData);
      }
      
    }

  }
};