vwo_$(function(){
  
    //Desktop header Call and chat
  jQuery('#header .logo').after('<div class="custom-header-middle"> <p>Call us today on <a href="tel:08000321301">0800 032 1301</a> <br>or email on <a href="mailto:customerservices@hearingdirect.com" target="_top">customerservices@hearingdirect.com</a> <br>or chat to us on <a class="custom-liveChat">live chat</a> right now</p> </div>');
  //Mobile footer call and chat
  jQuery('.footer-container').before('<div class="custom-footerMiddle"><p>Call us today on <a href="tel:08000321301">0800 032 1301</a> <br>or email on <a href="mailto:customerservices@hearingdirect.com" target="_top">customerservices@hearingdirect.com</a> <br>or chat to us on <a class="custom-liveChat">live chat</a> right now</p></div>');
  //Payment logos mobile and desktop
  jQuery('.custom-header-middle').after('<div class="custom-header-right"><img class="custom-mobile" src="//useruploads.visualwebsiteoptimizer.com/useruploads/332107/images/2f14902a03f549d408dc7cfed3b5fc54_paymob.png"> <img class="custom-desktop" src="//useruploads.visualwebsiteoptimizer.com/useruploads/332107/images/2f14902a03f549d408dc7cfed3b5fc54_paymob.png"> </div>');
  //Help text next to phone number
  jQuery('.group-select li .input-box.input-telephone').append('<small>Only used in rare cases if the delivery  courier cannot find you. </small>');
  // Logo mobile world pay
  jQuery('.main-container').prepend('<div class="customworldPay custom-mobile"><img src="///useruploads.visualwebsiteoptimizer.com/useruploads/332107/images/4cb333c2e329ddd5648b7bb127e536b2_payments_by_braintree_logo.png"></div>');
  //Rearrange delivery address checkbox
  jQuery('.input-box.input-different-shipping').insertBefore('.onestepcheckout-shipping-method-block');
  jQuery('#shipping_address').insertAfter('.input-box.input-different-shipping');
  jQuery('input#id_create_account').closest('li').addClass('custom-top-gap');
  jQuery('p.onestepcheckout-numbers-2').html('<span class="numbers-2"></span>delivery information');
  jQuery('dl.shipment-methods > dd').text('Select delivery method');
  // Review order section changes
  jQuery('p.onestepcheckout-numbers-4').html('<span class="numbers-4"></span> Review order');
  jQuery('ol.osc-checkout-agreements.checkout-agreements').insertAfter('p.onestepcheckout-numbers-4');
  jQuery('.input-box.input-coupon').insertAfter('.button-box');
  jQuery('button#onestepcheckout-coupon-add').after('<a class="custom-couponCode">Apply Voucher Code</a>');
  jQuery('.paypal-info > p').text('Please click the PayPal button on the bottom to complete your payment.');
  jQuery('p.onestepcheckout-numbers.onestepcheckout-numbers-3').before('<div class="seprator"></div>');
  //Coupon code toggle
  jQuery('.custom-couponCode').click(function(){
      jQuery('.input-box.input-coupon').slideToggle();
  });
  jQuery('.onestepcheckout-place-order-wrapper').insertAfter('ol.osc-checkout-agreements.checkout-agreements');
  //Changes for US
  if(document.URL.indexOf('us/onestepcheckout/')!=-1){  
      jQuery('.custom-header-middle').html('<p>Call us today on <a href="tel:18002162331">1800 216 2331</a> <br>or email on <a href="mailto:customercare@hearingdirect.com" target="_top">customercare@hearingdirect.com</a> <br>or chat to us on <a class="custom-liveChat">live chat</a> right now</p>');
      jQuery('.footer-container').before('<div class="custom-footerMiddle"><p>Call us today on <a href="tel:18002162331">1800 216 2331</a> <br>or email on <a href="mailto:customercare@hearingdirect.com" target="_top">customercare@hearingdirect.com</a> <br>or chat to us on <a class="custom-liveChat">live chat</a> right now</p></div>');
      
      if(jQuery('#onestepcheckout-form .shipment-methods label span.price').eq(0).text().indexOf('$0.00') == 0) {
          jQuery('#onestepcheckout-form .shipment-methods label span.price').eq(0).parent().parent().text('FREE');
      }
  }
  //Changes for UK
  if(document.URL.indexOf('us/onestepcheckout/')==-1){
       
      jQuery('dl.shipment-methods label').each(function(){
          if(jQuery(this).text().indexOf('Royal Mail 1st Class')!=-1){
          jQuery(this).contents().get(1).replaceWith('1 - 2 day Expedited Delivery');
          }
        else if(jQuery(this).text().indexOf(' Royal Mail Next Day (Monday to Friday Only) ')!=-1){
          jQuery(this).contents().get(1).replaceWith('Next Day (Monday to Friday Only)');
          }
         else if(jQuery(this).text().indexOf('Royal Mail 2nd Class')!=-1){	
                  jQuery(this).contents().get(1).replaceWith('3 - 5 day Standard Delivery');  
                  }
      });  
       if(jQuery('#onestepcheckout-form .shipment-methods label span.price').eq(0).text().indexOf('£0.00') == 0){
              jQuery('#onestepcheckout-form .shipment-methods label span.price').eq(0).closest('label').text('3 - 5 day Standard Delivery - FREE');
          }
       
  }
  //Live chat open on chat link click
  jQuery('a.custom-liveChat').click(function(){
      Tawk_API.maximize();
  });  
    
  });
  //To apply changes after ajax request i.e DOM change
  (function(win) {
      'use strict';
      
      var listeners = [], 
      doc = win.document, 
      MutationObserver = win.MutationObserver || win.WebKitMutationObserver,
      observer;
      
      function ready(selector, fn) {
          // Store the selector and callback to be monitored
          listeners.push({
              selector: selector,
              fn: fn
          });
          if (!observer) {
              // Watch for changes in the document
              observer = new MutationObserver(check);
              observer.observe(doc.documentElement, {
                  childList: true,
                  subtree: true
              });
          }
          // Check if the element is currently in the DOM
          check();
      }
          
      function check() {
          // Check the DOM for elements matching a stored selector
          for (var i = 0, len = listeners.length, listener, elements; i < len; i++) {
              listener = listeners[i];
              // Query for elements matching the specified selector
              elements = doc.querySelectorAll(listener.selector);
              for (var j = 0, jLen = elements.length, element; j < jLen; j++) {
                  element = elements[j];
                  // Make sure the callback isn't invoked with the
                  // same element more than once
                  if (!element.ready) {
                      element.ready = true;
                      // Invoke the callback with the element
                      listener.fn.call(element, element);
                  }
              }
          }
      }
      // Expose 'ready'
      win.ready = ready;
              
  })(this);
  ready('#onestepcheckout-form .shipment-methods label span.price', function () { 
          if(document.URL.indexOf('us/onestepcheckout/')==-1){
          if(jQuery('#onestepcheckout-form .shipment-methods label span.price').eq(0).text().indexOf('£0.00') == 0){
              jQuery('#onestepcheckout-form .shipment-methods label span.price').eq(0).closest('label').text('3 - 5 day Standard Delivery - FREE');
          }
               jQuery('dl.shipment-methods label').each(function(){
                  if(jQuery(this).text().indexOf('Royal Mail 1st Class')!=-1){
                  jQuery(this).contents().get(1).replaceWith('1 - 2 day Expedited Delivery');
                  }
                else if(jQuery(this).text().indexOf(' Royal Mail Next Day (Monday to Friday Only)')!=-1){
                  jQuery(this).contents().get(1).replaceWith('Next Day (Monday to Friday Only)');
                  }
                 else if(jQuery(this).text().indexOf('Royal Mail 2nd Class')!=-1){	
                  jQuery(this).contents().get(1).replaceWith('3 - 5 day Standard Delivery');  
                  }
              }); 
          }
          
      if(document.URL.indexOf('us/onestepcheckout/')!=-1){ 
      if(jQuery('#onestepcheckout-form .shipment-methods label span.price').eq(0).text().indexOf('$0.00') == 0){
          jQuery('#onestepcheckout-form .shipment-methods label span.price').eq(0).parent().parent().text('FREE');
      }
  }
          
          jQuery('dl.shipment-methods > dd').text('Select delivery method');
          jQuery('p.onestepcheckout-numbers-2').html('<span class="numbers-2"></span>delivery information');
  });
  ready('.paypal-info > p', function () { 
  jQuery('.paypal-info > p').text('Please click the PayPal button on the bottom to complete your payment.');
  });
  