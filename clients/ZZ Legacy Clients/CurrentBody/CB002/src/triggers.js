/* eslint-disable */
/* no_doc_ready */
var _CB002 = (function ($) {
  // Hide Content
  $('head').append('<style id="ucbasket_hideBody">body{visibility:hidden}</style>');
  var $loader = $('<div id="ucbasket_page-overlay"><div class="ucbasket_loading-dots"><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span></div></div>');
  $('body').prepend($loader);
  $('#ucbasket_hideBody').remove();
  setTimeout(function(){
    $loader.hide();
  }, 4000);
  
  // UC Poller 
  // @version 0.2.1
  var UC=function(a){var b=$||window.jQuery;return a.poller=function(a,c,d){var e={wait:50,multiplier:0,timeout:7000},f=Date.now||function(){return(new Date).getTime()};if(d)for(var g in d)e[g]=d[g];else d=e;for(var h=!!e.timeout&&new Date(f()+e.timeout),i=e.wait,j=e.multiplier,k=[],m=function(d,e){if(h&&f()>h)return!1;e=e||i;var g=function(){var c,a=typeof d;return c="function"===a?d():"string"!==a||b(d).length}();g?(k.push(!0),k.length===a.length&&c()):setTimeout(function(){m(d,e*j)},e)},n=0;n<a.length;n++)m(a[n])},a}(UC||{});
  
  // Triggers
  UC.poller([
      'main > .row > article',
      '.col-sidebar',
      '.cart-collaterals',
      '.delivery-by',
      '#shopping-cart-table h2.product-name',
      '.coupon-block',
      'tbody tr td',
      '.country'
  ], CB002);

  // Variation
  function CB002() {
      $('body').addClass('testVar testVar_1 testVar_2');
      
      productList = [];
      productList.push('DEFAULT');
      productList.push('Beurer');
      
      
      $('.col-sidebar').remove();
      $('#shopping-cart-container-wrapper .top-menu').remove();
      
      $('main > .row > article').removeClass('col-xs-12 col-sm-8 col-md-9').addClass('col-xs-12 col-sm-12 col-md-12');
      
      $('.cart-collaterals').addClass('col-xs-12 col-sm-7 cart-collaterals-right');
      $('.cart-collaterals').before('<div class="col-xs-12"><div class="cart-subtotal"></div></div>');
      $('.cart-collaterals').before('<div class="col-xs-12 col-sm-5 cart-collaterals-left"></div>');
      $('.cart-total').appendTo('.cart-subtotal');
      
      $('.cart-collaterals-left').append('<div class="payment-logos"></div>');
      $('.payment-logos').append('<img src="//www.sitegainer.com/fu/up/1jm3mam8oietezm.jpg" /><img src="//www.sitegainer.com/fu/up/h05j0yefhpwl24l.jpg" /><img src="//www.sitegainer.com/fu/up/d2hog6cywns7jg8.jpg" /><img src="//www.sitegainer.com/fu/up/c2e927vq87xolmv.jpg" /><img src="//www.sitegainer.com/fu/up/ldnqo7o15fixzc8.jpg" />');
      
      $('.payment-logos').after('<button type="button" title="Continue Shopping" class="btn btn-primary button-return" onclick="window.location=\'http://www.currentbody.com\';"><span><span>Continue Shopping</span></span></button>');
      
      $('.delivery-by').each(function() {
        $(this).find('br:gt(0)').remove();
      });
      
      $('#shopping-cart-table h2.product-name').each( function(k,v) {
        product = $(this).find('a:eq(0)').text().trim();
        if ($.inArray( product, productList ) < 0 ) {
          $(this).append('<p class="stock-message">IN STOCK.</p>');
        }
      });
      
      $('#shopping-cart-table').closest('fieldset').addClass('col-xs-12');
      $('.coupon-block').css({"display":"block"}).insertAfter('.payment-logos');
      
      $(".country").css({"top":11});
      $(".country").css({"top":"16px"});
      
      $('.cart-total div:nth-child(2)').css({"color":"red"});
      
      $('tbody tr').each(function() {
         $(this).find('td').each(function() {
            el = $(this).find('p.stock-message');
            var txt = el.text();
            var newtxt = txt.replace(". Dispatched in 24 hours","");
      
            el.text(newtxt);
         });
      });
      
      $loader.hide();
  }
}(jQuery));