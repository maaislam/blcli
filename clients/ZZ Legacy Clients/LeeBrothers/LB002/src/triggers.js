/* eslint-disable */
// Script 1
(function() {
  if(typeof UC == 'undefined'){
      window.UC = {};
  }
  UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
  
  // -----------------------------------------------
  // Full story integration
  // -----------------------------------------------
  UC.poller([
      function() {
          var fs = window.FS;
          if (fs && fs.setUserVars) return true;
      }
  ], function () {
      window.FS.setUserVars({
          experiment_str: 'PD002',
          variation_str: 'Variation 1'
      });
  }, { multiplier: 1.2, timeout: 0 });

  UC.Money = UC.Money || {};
  
  UC.Money.Format=function(){function a(e){this.num=e}var b={GBP:'\xA3',USD:'$',EUR:'\u20AC'};return a.prototype.setCurrency=function(e){return this.currency=e,this},a.prototype.formatMoney=function(e,f,g,h){var k=this.num,l=isNaN(e=Math.abs(e))?2:e,m=void 0==f?'.':f,o=void 0==g?'':g,p=0>k?'-':'',q=parseInt(k=Math.abs(+k||0).toFixed(l))+'',r=3<(r=q.length)?r%3:0,u=p+(r?q.substr(0,r)+o:'')+q.substr(r).replace(/(\d{3})(?=\d)/g,'$1'+o)+(l?m+Math.abs(k-q).toFixed(l).slice(2):'');return h&&(u=('undefined'==typeof b[this.currency]?'':b[this.currency])+u),u},a}();
  

})();

// Script 2
(function() {
  var trackerName;
  function sendEvent(action, label, nonInteractionValue) {
      var category = 'PD002---Mobile Product Page';
      label = label || '';
      nonInteractionValue = nonInteractionValue || true;

      ga('send', 'event', category, action, label, {nonInteraction: nonInteractionValue});
  }
  
  // Poll start
  UC.poller([
      'body',
      '.ui-block-c  .btn-contactus',
      '.productDetailsContent',
      '.productDetailPanel',
      function() {
          return !!window.jQuery;
      }
  ], function() {
      run();
  });

  function run() {
      var $ = window.jQuery;

      $('body').addClass('PD002');

      sendEvent('pd2-page-view');



  /*-------------------------------
  Add a zoom button within the product image
  ---------------------------------*/
      function zoomImage() {
          $('<img class="pd2-zoom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACMVBMVEUAAAAAAABXV1xXWlxZWVtZWVpYWltYWltYWVtYWFpYWFpZWVxZWV1VVVVgYGBYWFxXWVtYWVtYWVtYWFtYWlpdXV1bW1tZWVtZWVtYWVtYWltaWlpXWVxYWVtYWVtYWFhYWFxYWVtYWVtYWVtYWVpYWVtYWVtYWVtYWVtYWVtZWVtYWFpXWVxYWlpZWVlAQEBWWlpYWlxYWVxVVVVJSUlYWFtYWVtYWFtNTWZXV1tZWVtYWFhYWFtdXV1XV1tXWVtYWVtXV11YWVtVVV5VVVVXWVtYWVpVVVVYWFyAgIBYWFhYWVtWWlpYWVxYWFpgYGBYWVtXWVtYWFtZWVxZWVxYWFtZWVpYWFtaWlpYWVtYWVtOYmJYWVxXWlpZWVxYWlpYWFxVXV1YWVtYWVxYWVxYWVxXWVtaWlpXV1dZWVtXWVtaWlpaWlpYWFxXV1tXWlxYWVpXWVtYWFtZWVxZWVpYWlpZWVpXWlpbW1tYWF1XWVtWWlpZWVlZWVxZWVtYWVtZWVlXW1tVVVVYWFpZWVtYWVtYWVteXl5YWVtYWVtYWFtYWltZWVxXV1xZWVtYWltYWltVW1tYWVtYWVtVXFxYWVtVXFxXWlxYWltYWlxYWVtYWVtZWVxZWVtYWVtYWFxYWFtZWVtYWVtXWVxZWVlXWlpYWltYWVtZWVxYWVtaWlpYWltXV11YWVtXWlpYWVtYWFtZWVtcXFxYWFpXWVpYWVtYWFtbW1tYWltYWVsAAAAbVjUjAAAAuXRSTlMAATJedo2luauTfGRCBghLmOTzrWAWDoHy/aglcuz7GkDi8de9prTM+vZzbrJjFwRBjtwJB5/naAo1ux3HC0bP6SnIGwOS2Q+cAjH3RPiFEN2JZVCqs57bIv7aDc5YU2aIIfDR6sCMSiPBuBEfTklsutKwZ5B3oVUcNI8+Lqdfvyg4DILYo9QTxZ1a9aQvaoPNKprtJO4nb7aA1rFWcPw9V9X0YTxSl+VZ+TaiLKlb095cGV2soFQtlLplO88AAAABYktHRACIBR1IAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4QgXECQRawwkRAAAA2RJREFUWMOll/kjVFEUxy9qGJoZW7aisiYytkgiapQhaSQlJkYLWpSIJJKQQYssFZoWWqR9n/+ue957nrfd53qdX7jf7zmf9+a+e868QUgWHp5e69brvH30vn4bDGitYTT5B7hXIjAoeONaykNCw9zSCI/YRH31zZFupYjy30JVv3UbXxIdExsXnxCwfXmduIOiPimKS07emcJJ5tS0dA6hy1ilPHMXm5iVvVts5OxhjYRc1fqMvUxWmG+e3Mvfx3gFhWoA9vr7DyialiLGPXiIXO/HZBRnkvxsZn/irSS/pBT8JJU7PFwGGUcIbvlRcG2qm1TB3OMxZbMSvONWVQCqgqQTFiXrZDW2TtWo1yNjLRDsSpYNnNNira4eh1kkORpw2hmFesNZbNR6iMVzADWKtfOgmeQAO+iNaHVAE3zUZjkActMRBQBdgOa+KE29BKl6KsBlxSfZCGoLFcCShcUiaeoV6OAMKgC6qvQc0rDYiugA/jBrpOI1LHrzq7Z2NpjBqucW/Hm4Dqq041qx1iHaaFnwd9IJqxsSQKCoj9QBXbAqkQAKsHaTEtANq1sSAMyyHkpAL6wcEoAOa7f5Vd8dNpjW6+YWfJ+EwlHslwDuYnGA8jEOYnFIKgYD9R4dYBiLTqnIbMwIFaB8FIt10tQQUMeoAEkg3pd93GKsRhpoADGQKZ+KzOl4QAFIBe0hkscjrAdkrg6A4V2aogCoUPhWGRc9fyZaYKI9VqhHedHYmZhE6uGYwlnV04reE7iFgXLVeiN8UPdTghsBZqxZDeBkuuIZwe2fAXeW/OVktXFvS52EhEKYCu6ZaYJdk7zcmFFzhJQ5xm5QvsD40EprEwnPXYw//ELm5DpdwuHgekkg5E+xCfEm4fnxyGkvlYwXl51AmHzFZbwOml9oykOG3Jw3b98pDCjXe9JW6RcFaYmC/6tnP/jQEJBjKVzhiotO/IJnrhQSRkgE9HFwQlIebWNflM2fhITPRAKyLNR/4bf961hbCG9ECAnfkFpYvnua5u35XeLeFRHC1QkEbo+Q8EMLIU5I8NJC0AkJvf9NCNZCGPtfgnVQSJjXQlgSnodCLYQOAeGnBoCIMKoFgKy/eECzJgCycr/x3GVd2gDIWsUOCi3nmSOk4ZYN/K25Hsefyr99+M8/vAflGap5lMEAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDgtMjNUMTY6MzY6MTcrMDI6MDDh54ZJAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA4LTIzVDE2OjM2OjE3KzAyOjAwkLo+9QAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="/>').prependTo('.productDetailPanel .prod_image_main');
      }
      
  /*-------------------------------
  Change header on product pages to turn sign in, register and contact us into links. Specifically contact us should be a phone number not a button
  ---------------------------------*/
      function changeContactNo() {
          var contactButton = $('.ui-block-c  .btn-contactus');
              contactButton.html('<a href="callto:08703333081">0870 333 3081</a>');
          
      }
  /*-------------------------------
  General Page rearrangements;
  Add in a small headline under the search bar “The largest supplier…”
  Add description and product code next to the product image
  Make image bigger
  Add a small piece of text under the add to basket “Free delivery on orders over £30”
  ---------------------------------*/
          function rearrangePage() {
              var header = $('#header');
              header.append('<div class="pd2-headline"><span>Trading since 1890</span></div>');
      
      
              //move desc & product code & resize the image
              var productDesc = $('.productDetailsContent .grid_12 .initial-description:first');
                  productDesc.prependTo('.productDetailPanel .grid_8:first')
                  
                  var productContainer = $('.productDetailPanel');
      
                  productContainer.find('.grid_8:first').removeClass('grid_8').addClass('grid_6 pd2-prodDesc');   
                  productContainer.find('.grid_4:first').removeClass('grid_4').addClass('grid_5 pd2-prodImage');
          
          };
          changeContactNo();
          rearrangePage();
          zoomImage();
      }

  /*-------------------------------
  Free delivery
  ---------------------------------*/
  $('<div class="pd2-freeDeliv">Free delivery on orders over <span>£30</span></div>').insertAfter('.pd2-addto');
  

})();

// Script 3
(function() {
  var trackerName;
  function sendEvent(action, label, nonInteractionValue) {
      var category = 'PD002---Mobile Product Page';
      label = label || '';
      nonInteractionValue = nonInteractionValue || true;

      ga('send', 'event', category, action, label, {nonInteraction: nonInteractionValue});
  }
  
  // Poll start
  UC.poller([
      'body',
      '.ui-block-c  .btn-contactus',
      '.productDetailsContent',
      '.productDetailPanel',
      function() {
          return !!window.jQuery;
      }
  ], function() {
      run();
  });

  function run() {
      var $ = window.jQuery;

      $('body').addClass('PD002');


  /*-------------------------------
  Lightbox to show bigger image
  ---------------------------------*/
  function imageLightbox() {
      var $body = $('body');

      var mainImage = $('.productDetailPanel .grid_5.pd2-prodImage .product-overlay'),
          imageUrl = mainImage.find('a').attr('href');

      var $lightBoxMarkup = $(['<div class="pd2-lightbox-overlay"></div>',
                          '<div class="pd2-lightbox-wrap">',
                              '<div class="pd2-lightbox-innercontent">',
                                  '<div class="pd2-lightbox-exit">x</div>',
                                  '<div class="pd2-lightbox-image">',
                              '</div>',
                          '</div>',
                        '</div>'].join(''));

      $('body').prepend($lightBoxMarkup);

      var productImageWrapper = $lightBoxMarkup.find('.pd2-lightbox-image');

      $.ajax({
          url: imageUrl,
          success: function(data) {
              var d = document.createElement('div');
              d.innerHTML = data;
              
              var biggerImage = $(d).find('.productGalleryContent .container_12:last');
              biggerImage.appendTo(productImageWrapper);

              // There can be multiple images, employ Swipe() util
              if($('.pd2-lightbox-image .product-gallery').length > 1) {
                  $.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', function() {
                      var swipeLightbox = $('.pd2-lightbox-image');
                      swipeLightbox.addClass('pd2-has-slick');

                      swipeLightbox.find('.swipe-wrap').slick({
                          dots: false
                      });
                  });

                  $(window).trigger('resize');

                  // Trigger resize workaround for slick loading images in production
                  setTimeout(function() {
                      $(window).trigger('resize');
                  }, 1500);
                  
              }
              
          }
      });
      var imageLightboxEvent;

      var $lightbox = $lightBoxMarkup .filter('.pd2-lightbox-overlay, .pd2-lightbox-wrap');
      $lightBoxMarkup .find(".pd2-lightbox-exit").add($lightbox.filter('.pd2-lightbox-overlay')).click(function () {
          $lightbox.fadeOut(200);
          $body.removeClass('pd2-nobodyscroll');
      });
  
      $lightBoxMarkup .find(".pd2-lightbox-exit").click(function () {
          $lightbox.fadeOut(200); 
          $body.removeClass('pd2-nobodyscroll');
      });

      mainImage.click(function(){
          $lightbox.fadeIn(100);
          $body.addClass('pd2-nobodyscroll');

          if(!imageLightboxEvent){
              sendEvent('pd2-image-lightbox-opened');
              imageLightboxEvent = true;
          }
      });

      mainImage.find('a').attr('href','javascript:void(0)');
      
  };

  imageLightbox();

  }

  })();

// Script 4
(function() {

  var trackerName;
  function sendEvent(action, label, nonInteractionValue) {
      var category = 'PD002---Mobile Product Page';
      label = label || '';
      nonInteractionValue = nonInteractionValue || true;

      ga('send', 'event', category, action, label, {nonInteraction: nonInteractionValue});
  }
  
  // Poll start
  UC.poller([
      'body',
      '.ui-block-c  .btn-contactus',
      '.productDetailsContent',
      '.productDetailPanel',
      function() {
          return !!window.jQuery;
      }
  ], function() {
      run();
  });
  
  function run() {
      var $ = window.jQuery;

      $('body').addClass('PD002');


  /*-------------------------------
  Pull out options & add a quantity figure
  ---------------------------------*/
  function quantityOptions() {

      /**
       * Helper split key value pairs string on options
       */
      function parseOptionKeyValuePairs(text) {
          text = text.trim();

          var results = [];

          var theSplit = text.split(';');
          $.each(theSplit, function(idx, value) {
              var s = value.split('=');
              if(s && s[0] && s[1]) {
                  results[s[0]] = s[1];
              }
          });

          return results;
      }

      //Create quantity wrapper
      var quantityOptions = $('<div class="grid_12 pd2-quantities"></div>');
      quantityOptions.insertAfter('.productDetailPanel .grid_6.pd2-prodDesc');


      var sizeSelector = $([
          '<div class="pd2-size-selector">',
          '</div>'
      ].join(''));    

      quantityOptions.append(sizeSelector);

      //get the dropdown options
      var variantSelect = $('.productDetailPanel .variant_options select:first');

      //create quantity boxes
      function addSelectorRow(price, productCode, details, defaultQuantity) {
          if(!defaultQuantity) {
              defaultQuantity = 0;
          }
          sizeSelector.append([
              '<div class="pd2-size-selector__option">',
                  '<div class="pd2-size-selector__selector">',
                      '<div class="pd2-size-selector__minus">',
                          '-',
                      '</div>',
                      '<div class="pd2-size-selector__input-wrap">',
                          '<input data-price="' + price  + '" ',
                              'data-code="' + productCode + '" ',
                              'class="pd2-size-selector__quantity" type="text" min="0" value="' + defaultQuantity + '" />',
                      '</div>',
                      '<div class="pd2-size-selector__plus">',
                          '+',
                      '</div>',
                  '</div>',
                  '<div class="pd2-size-selector__details">',
                      '<span>',
                      details,
                      '</span>',
                  '</div>',
              '</div>'
          ].join(''));
      }
                  //if product has options
                  if(variantSelect.length > 0) { 
                      // -----------------------------------------------
                      // Build the options for a variant
                      // -----------------------------------------------
                      var numOptions = variantSelect.find('option').length;
                      variantSelect.find('option').each(function(idx) {
                          var details = $(this).html().trim();
                          details = details.replace(/&nbsp;/g, ' ');
      
                          var optionPrice = details.match(/£(\d+\.\d+)$/);
      
                          var value = $(this).val();
                          var keyValuePairs = parseOptionKeyValuePairs(value);
      
                          // Add size selector and assoc details row
                          addSelectorRow((optionPrice || [])[1], keyValuePairs['code'], details, numOptions === 1 ? 1 : 0);
                      });
                  } else {
                      // -----------------------------------------------
                      // Build simple product row
                      // -----------------------------------------------
                      var productCode = $('[name=productCode]').val();
                      var details = $('.productDetailPanel .options_not_available').text().trim();
                      var price = $('.productDetailsContent .productDetailPanel .price-text span:first').text();
                      price = price.match(/£(\d+\.\d+)$/)
      
                      if(!details) {
                          details = $('.productDetailsContent .productDetailPanel .price-text').text();
                      }
      
                      if(price && productCode) {
                          addSelectorRow((price || [])[1], productCode, details, 1);
                      }
                  }

                  // -----------------------------------------------
          // Crate price summary and custom add to basket buttons
          // -----------------------------------------------
          var priceSummary = $([
              '<div class="pd2-addto">',
                  '<div class="pd2-addto__price">',
                      '&nbsp;',
                  '</div>',
                  '<div class="pd2-addto__button-wrap">',
                      '<button class="pd2-addto__button">',
                          'Add to Basket',
                      '</button>',
                  '</div>',
              '</div>'
          ].join(''));

          priceSummary.insertAfter(quantityOptions);
          
          /**
           * Helper show a message against a product
           */
          function showMessage(message, type) {
              removeExistingMessage();

              $('.pd2-addto').after([
                  '<div class="pd2-message">',
                      message,
                  '</div>'
              ].join(''));

              $('.pd2-message').addClass('pd2-message--type-' + type);
          }
          /**
           * Hide existing message
           */
          function removeExistingMessage() {
              $('.pd2-message').remove();
          }
          
          
          // -----------------------------------------------
          // Handle add to basket
          // -----------------------------------------------
          $('.pd2-addto__button').click(function() {
              removeExistingMessage();

              // ----------------------------------------------------
              // Validate
              // ----------------------------------------------------
              var totalQty = 0;
              $('.pd2-size-selector__quantity').each(function() {
                  var qty = parseInt($(this).val(), 10);
                  if(qty) {
                      totalQty += qty;
                  }
              });
              if(totalQty == 0) {
                  showMessage('Please select a quantity above.', 'error');
                  return;
              }
              
              // ----------------------------------------------------
              // Loading
              // ----------------------------------------------------
              $(this).text('One Moment...');
              

              // ----------------------------------------------------
              // Add each variant option to the basket
              // ----------------------------------------------------
              var ajaxRequests = [];
              var lastBasketResponse = null;
              $('.pd2-size-selector__quantity').each(function(idx, item) {
                  var price = parseFloat($(this).attr('data-price').trim()),
                      code = $(this).attr('data-code').trim(),
                      qty = parseInt($(this).val(), 10);

                  if(qty == 0) {
                      return;
                  }

                  var deferred = $.Deferred();
                  
                  // Add request, timeout ensures server doesn't go all 500 error on yo'
                  // owing to concurrent requests
                  setTimeout(function() {
                      var request = $.ajax({
                          url: '/cart/add',
                          type: 'post',
                          dataType: 'json',
                          data: {
                              productCodePost: code,
                              qty: qty,
                              CSRFToken: $('[name="CSRFToken"]:first').val(),
                          },
                          success: function(data) {
                              lastBasketResponse = data;

                              // Move onto next request..
                              deferred.resolve();
                          },
                          error: function(data) {
                              showMessage('Sorry, an error occurred. Please check your basket and try again.', 'error');
                          }
                      });
                  }, 500 * idx)

                  ajaxRequests.push(deferred.promise());
              });
              
              // Show a message and update the mini cart
              $.when.apply(null, ajaxRequests).then(function() {
                  $('.pd2-addto__button').text('Add to Basket');

                  if(lastBasketResponse && lastBasketResponse['cartData']) {
                      if(lastBasketResponse['cartData']['total']) {
                          var moneyFormat = new UC.Money.Format(lastBasketResponse['cartData']['total']);
                          moneyFormat.setCurrency('GBP');

                          $('#minicart_data .total').text(moneyFormat.formatMoney(2, '.', ',', true));
                      }
                      if(lastBasketResponse['cartData']['products']) {
                          var numItems = lastBasketResponse['cartData']['products'].length;
                          $('#minicart_data .items').text(numItems);
                      }

                      showMessage('Added to your basket. <a href="/cart/checkout">Checkout &gt;</a>', 'success');
                  }
              });
          });
          
          // -----------------------------------------------
          // Handle update prices on page load
          // -----------------------------------------------
          $('.pd2-addto__price').empty()
          $('.productDetailsContent .productDetailPanel .price-text').clone().appendTo('.pd2-addto__price');
          $('.productDetailsContent .productDetailPanel .productVariantSelector-grossPrice-header').clone().appendTo('.pd2-addto__price');

          var wasPrice = $('.productDetailsContent .productDetailPanel p.wasPrice:first');
          if(wasPrice.length && wasPrice.text().trim()) {
              $('.pd2-addto__price').append(wasPrice.clone());
          }

          // -----------------------------------------------
          // Handle prices update when item pressed
          // -----------------------------------------------
          $('.pd2-size-selector__plus').click(function() {
              var qtySelector = $(this).prev().find('input');
              var val = parseInt(qtySelector.val());
              qtySelector.val(val + 1);

              updatePrice();
          });
          $('.pd2-size-selector__minus').click(function() {
              var qtySelector = $(this).next().find('input');
              var val = parseInt(qtySelector.val());
              if(val > 0) {
                  qtySelector.val(val - 1);
              }

              updatePrice();
          });
          $('.pd2-size-selector__quantity').blur(function() {
              updatePrice();
          });
          
          function updatePrice() {
              var total = 0;
              var price = 0;

              // Get all quanitites and prices for each and add them up
              $('.pd2-size-selector__quantity').each(function() {
                      price = parseFloat($(this).attr('data-price').trim()),
                      qty = parseInt($(this).val(), 10);

                  total += price * qty;
              });

              //Check if quantity is zero
              if(total == 0){
                  //If quantity is 0, reset price to quantity of 1
                  total = price;
              }

              var totalInc = total * 1.2;

              var moneyFormatExVat = new UC.Money.Format(total);
              moneyFormatExVat.setCurrency('GBP');
              var moneyFormatIncVat = new UC.Money.Format(totalInc);
              moneyFormatIncVat.setCurrency('GBP');

              var totalExVat = moneyFormatExVat.formatMoney(2, '.', ',', true);
              var totalIncVat = moneyFormatIncVat.formatMoney(2, '.', ',', true);


              // Update prices and associated descriptions

              //Amend - selector amended to display totalExVat price
              $('.productDetailsContent .productDetailPanel .price-text > span.bold-blue').text(totalExVat);
              $('.productDetailsContent .productDetailPanel .price-text .vat').text(' ex. VAT ');

              $('.productDetailsContent .productDetailPanel .productVariantSelector-grossPrice-header').html([
                  '<span id="grossPrice-NBS">',
                  totalIncVat,
                  '</span>',
                  ' inc. VAT'
              ].join(''));

              // Hide 'from' label
              $('.pd2-addto__prefix').css('visibility', 'hidden');
          }
  };


  /*-------------------------------
  Remove/Add branded item link - current one doesnt give much information
  ---------------------------------*/
  function brandedItem() {
      var brandedLink = $('.branding .brandingInput'),
          moreInfoLink =$('.grid_4.moreInfoBranding a').attr('href');

          
          var brandedWrapper = $(['<div class="pd2-brand-wrap">',
                                      '<span class="pd2-branding">Brand item</span>',
                                      '<span class="pd2-brandInfo"><a href="http://www.protecdirect.co.uk/personalised-workwear-service">What is branding?</a></span>',
                                  '</div>'].join(''));
                                      
          brandedWrapper.insertAfter('.pd2-addto');

  };


  /*-------------------------------
  Brand lightbox form - rebuilt from the branding page
  ---------------------------------*/
  function brandedLightbox() {
  
      var formProductURL = '/Clothing-and-Workwear/Protective-Workwear/Boilersuits-and-Coveralls/Spruce-Green-Polycotton-Boilersuit~p~BSSG?wantBranding=true&amp;productCodePost=658038036&amp;productUrl=&amp;productBaseCode=BSSG&amp;qty=1'
      var $brandingLightboxHTML = $(['<div class="pd2-brandinglightboxOverlay"></div>',
                              '<div class="pd2-brandinglightbox">',
                                  '<div class="pd2-brandlightbox-wrap">',
                                  '<div class="pd2-brandlightbox-exit">x</div>',
                                  '<div class="pd2-brandightbox-innercontent">',
                                      
                                          '<div class="pd2-brandTitletext">',
                                              '<h3>Brand this Item</h3>',
                                              '<p>Thank you for showing your interest in our branding service. Please complete this short enquiry form and we will be in touch with you within 2 hours (Mon-Fri, 9am-5pm) to discuss your requirement. Thank you</p>',
                                          '</div>',
                                      '<div class="pd2-brandightbox-form">',
                                      '<form id="wantBrandingForm" class="mar-10" action="#" method="post">',
                                      '<label class="pd2-selectSize">Select your size:</label>',
                                      '<select class="pd2-productSelect"></select>',
                                      '<div class="pd2-size-selector__selector branding">',
                                      '</div>',
                                          '<input type="hidden" name="productCode" value="">',
                                          '<input type="hidden" name="productOption" value="">',
                                          '<input type="hidden" name="qty" value="1">',
                                          '<input type="hidden" name="wantBranding" value="true">',
                                          '<div data-role="fieldcontain" data-theme="b" class="ui-field-contain ui-body ui-br">',
                                              '<label class="" for="name"> Name<span class="mandatory">',
                                                  '<img src="/_ui/mobile/theme-protec/images/mandatory2.png" alt="Required" title="Required" class=""></span>',
                                                  '<span class="skip"></span>',
                                              '</label>',
                                              '<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">',
                                                  '<input id="name" name="name" class="text" type="text" value="" required>',
                                              '</div>',
                                          '</div>',
                                          '<div data-role="fieldcontain" data-theme="b" class="ui-field-contain ui-body ui-br">',
                                              '<label class="" for="phone"> Telephone<span class="mandatory">',
                                              '<img src="/_ui/mobile/theme-protec/images/mandatory2.png" alt="Required" title="Required" class=""></span>',
                                              '<span class="skip"></span>',
                                              '</label>',
                                          '<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">',
                                              '<input id="phone" name="phone" class="text" type="number" value="" required>',
                                          '</div>',
                                          '</div>',
                                          '<div data-role="fieldcontain" data-theme="b" class="ui-field-contain ui-body ui-br">',
                                              '<label class="" for="email"> Email<span class="mandatory">',
                                              '<img src="/_ui/mobile/theme-protec/images/mandatory2.png" alt="Required" title="Required" class=""></span>',
                                              '<span class="skip"></span>',
                                              '</label>',
                                          '<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">',
                                              '<input id="email" name="email" class="text" type="email" value="" required>',
                                          '</div>',
                                          '</div>',
                                          '<div data-role="fieldcontain" class="ui-field-contain">',
                                              '<label class="" for="message">',
                                              'Message<span class="mandatory">',
                                              '<img src="/_ui/mobile/theme-protec/images/mandatory2.png" alt="Required" title="Required" class=""></span>',
                                              '<span class="skip"></span>',
                                              '</label>',
                                          '<textarea id="message" name="message" class="ui-input-text ui-shadow-inset ui-body-inherit ui-corner-all ui-textinput-autogrow" style="height: 45px;" required></textarea>',
                                          '</div>',
                                          '<div class="ui-grid-a">',
                                              '<div class="ui-block-a">&nbsp;</div>',
                                                  '<div class="ui-block-b"><button type="submit" class="ui-button ui-btn ui-shadow ui-corner-all">Enquire</button>',
                                              '</div>',
                                          '</div>',
                                      '</form>',
                                  '</div>',
                              '</div>',
      '</div>'].join(''));


      var $body = $('body');
      $brandingLightboxHTML.prependTo($body);

      /*-------------------------------
      Brand lightbox functionality
      ---------------------------------*/
      var $brandLightbox = $brandingLightboxHTML.filter('.pd2-brandinglightboxOverlay,.pd2-brandinglightbox');
      

      $brandingLightboxHTML.find(".pd2-brandlightbox-exit").add($brandLightbox.filter('.pd2-brandinglightboxOverlay')).click(function () {
          $brandLightbox.fadeOut(200);
          $body.removeClass('pd2-nobodyscroll');
      });
  
      $brandingLightboxHTML.find(".pd2-brandlightbox-exit").click(function () {
          $brandLightbox.fadeOut(200);    
          $body.removeClass('pd2-nobodyscroll');
      });

     $('.pd2-branding').click(function(){
          $brandLightbox.fadeIn(200);
          $body.addClass('pd2-nobodyscroll');
      });


      /*-------------------------------
      //get each option and add the text and product code as an option value
      ---------------------------------*/
      var selectOptions = $('.pd2-size-selector__option').each(function(){
          var $sizeText = $(this).find('.pd2-size-selector__details span').text();
      
          var productCode = $(this).find('.pd2-size-selector__input-wrap input').attr('data-code');
          $('<option value ="'+productCode+'">'+$sizeText+'</option>').appendTo('.pd2-productSelect');
      });

      /*-------------------------------
      //change Form action based on selection option and replace input values
      ---------------------------------*/
      var pageUrl = window.location.href,
          productBaseCode = $('.container_12.common-qty.productDetailsContent #productCode_BSSG').val();

      /*-------------------------------
      //set default values if selct is not changed
      ---------------------------------*/
      var brandedForm = $("#wantBrandingForm");

          var noChangeselectID = brandedForm.find('option:selected').val();
          var noChangesize = brandedForm.find("option:selected").text().replace(/\s+/g, "_").split(",")[0].replace("''",'');
          
          
          brandedForm.find('input[name="productCode"]').val(noChangeselectID);
          brandedForm.find('input[name="productOption"]').val(noChangesize);

          brandedForm.attr("action", "?wantBranding=true&amp;productCodePost="+noChangeselectID+"&amp;productUrl=&amp;productBaseCode="+productBaseCode+"&amp;qty=1'");

      $(".pd2-productSelect").change(function() {
          var selectID = $(this).val();
          var size = $(this).find("option:selected").text().replace(/\s+/g, "_").split(",")[0].replace("''",'');
          
          var brandedForm = $("#wantBrandingForm");

          brandedForm.find('input[name="productCode"]').val(selectID);
          brandedForm.find('input[name="productOption"]').val(size);

          brandedForm.attr("action", "?wantBranding=true&amp;productCodePost="+selectID+"&amp;productUrl=&amp;productBaseCode="+productBaseCode+"&amp;qty=1'");
        });
                              
  };


  

  /*-------------------------------
  Run Functions
  ---------------------------------*/
  quantityOptions();
  
  var brandedItems = $('.branding .brandingInput');
  if(brandedItems.length > 0){
      brandedItem();
      brandedLightbox();
  }

  //$('.ui-collapsible .ui-block-b').append('<a href="/my-account" class="ui-link">Manage My Account</a>');



  /*-------------------------------
  Events
  ---------------------------------*/
  var addTobasketevent,
  clickedPlusevent,
  clickedMinusevent,
  clickedBrandButton;

  $('.pd2-addto__button').click(function(){
      if(!addTobasketevent){
          sendEvent('pd2 added to basket');
          addTobasketevent = true;
      }
  });
  $('.pd2-size-selector__plus').click(function(){
      if(!clickedPlusevent){
          sendEvent('pd2 clicked add in options');
          clickedPlusevent = true;
      }
  });
  $('.pd2-size-selector__minus').click(function(){
      if(!clickedMinusevent){
          sendEvent('pd2 clicked minus in options');
          clickedMinusevent = true;
      }
  });

  $('.pd2-branding').click(function(){
      if(!clickedBrandButton){
          sendEvent('pd2 clicked brand item button');
          clickedBrandButton = true;
      }
  });

  }

})();
