/* no_doc_ready */
/* eslint-disable */
var _CB005 = (function($) {
  $('head').append('<style id = "ucmobcart_hideBody"> body, .more-views, #product-video-button-wrap { visibility: hidden !important } </style>');
  /* _optimizely_evaluate=safe */
  var $loader = $('<div id="ucmobcart_page-overlay"><div class="ucmobcart_loading-dots"><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span></div>');
  $('body').prepend($loader);
  $('#ucmobcart_hideBody').remove();
  setTimeout(function(){
    $loader.hide();
  }, 4000);
  
  // UC Poller 
      // @version 0.2.1
      var UC=function(a){var b=$||window.jQuery;return a.poller=function(a,c,d){var e={wait:50,multiplier:0,timeout:7000},f=Date.now||function(){return(new Date).getTime()};if(d)for(var g in d)e[g]=d[g];else d=e;for(var h=!!e.timeout&&new Date(f()+e.timeout),i=e.wait,j=e.multiplier,k=[],m=function(d,e){if(h&&f()>h)return!1;e=e||i;var g=function(){var c,a=typeof d;return c="function"===a?d():"string"!==a||b(d).length}();g?(k.push(!0),k.length===a.length&&c()):setTimeout(function(){m(d,e*j)},e)},n=0;n<a.length;n++)m(a[n])},a}(UC||{});
      
      // Triggers
      UC.poller([
          '.title-buttons',
          'h1',
          '#shopping-cart-table',
          '.quantity input',
          '#recently-viewed-container'
      ], CB005);
      
      // Variation
      function CB005() {
      
    var isMobile = window.matchMedia("all and (max-width: 767px)");
    
    if(isMobile.matches){
    
  jQuery('body').addClass('mobileBasketVar UC053');
  
  // shopping basket header
  var titleButtons = jQuery('.title-buttons');
  titleButtons.find('h1').text('Shopping Cart').css('color', 'grey');
  titleButtons.find('.template_fr').hide();
  
  // basket table
  jQuery('thead .first.last').hide(); // remove table header
  jQuery('#shopping-cart-table').find("th:contains('Quantity')").hide();
  var quantityCols = jQuery('#shopping-cart-table').find('td.a-center');
  jQuery.each(quantityCols, function(){ jQuery(this).hide();});
  
  // basket prices
  var tableRows = jQuery('#shopping-cart-table tbody tr');
  jQuery.each(tableRows, function(){
  // hide the price
   jQuery( jQuery(this).find('.cart-price')[0]).parent().hide();
   // increase font size of total price
   jQuery( jQuery(this).find('.cart-price .price')[1]).attr("style","font-size:18px!important");
  });
   
  // move description cell
  //jQuery('#shopping-cart-table').find('div.visible-xs').attr("style", "display:none!important");
      jQuery('#shopping-cart-table').find('div.visible-xs').remove();
  jQuery('#shopping-cart-table').find('td.hidden-xs').attr("style", "display:block!important;");
  
  var descriptions = jQuery('#shopping-cart-table').find('td.hidden-xs');
  
  jQuery.each(descriptions, function(){
    var _this = jQuery(this);
    var quantity = _this.parent().find('.quantity input').val() || _this.next('.a-center').text().trim();
    _this.find('.stock-message').hide();
    var descList = _this.find('.item-options');
    if (descList.length > 0){
    _this.find('.item-options').prepend('<dt>Quantity:</dt><dd>' + quantity + '</dd>');
    }
    else{
     _this.find('.product-name').after('<dl class="item-options"><dt>Quantity:</dt><dd>'+ quantity + '</dd></dl>');
    }
    
    var removeItem = _this.find('[title="Remove item"]').attr('style', 'font-size:9px!important;');
    _this.find('.item-options').after(removeItem);
  });
      
  
  jQuery('#recently-viewed-container').hide();
   
    }
    
    $loader.hide();
  }
      
  }(jQuery));