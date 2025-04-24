/* eslint-disable */
// Test adjusts PD003 to undo limiting number of size selectors for each product
(function() {
  var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

  UC.Money = UC.Money || {};

  UC.Money.Format=function(){function a(e){this.num=e}var b={GBP:'\xA3',USD:'$',EUR:'\u20AC'};return a.prototype.setCurrency=function(e){return this.currency=e,this},a.prototype.formatMoney=function(e,f,g,h){var k=this.num,l=isNaN(e=Math.abs(e))?2:e,m=void 0==f?'.':f,o=void 0==g?'':g,p=0>k?'-':'',q=parseInt(k=Math.abs(+k||0).toFixed(l))+'',r=3<(r=q.length)?r%3:0,u=p+(r?q.substr(0,r)+o:'')+q.substr(r).replace(/(\d{3})(?=\d)/g,'$1'+o)+(l?m+Math.abs(k-q).toFixed(l).slice(2):'');return h&&(u=('undefined'==typeof b[this.currency]?'':b[this.currency])+u),u},a}();

  var trackerName;
  function sendEvent(action, label, nonInteractionValue) {
      var category = 'PD036';
      label = label || '';
      nonInteractionValue = nonInteractionValue || true;

      ga('send', 'event', category, action, label, {nonInteraction: nonInteractionValue});
  }

  document.body.classList.add('PD036');
  
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
          experiment_str: 'PD036',
          variation_str: 'Variation 1'
      });
  }, { multiplier: 1.2, timeout: 0 });

  // Poll start
  UC.poller([
      '.subcat_column-item .prod_cols',
      '.cart .firstLinePrice',
      function() {
          return !!window.jQuery;
      }
  ], function() {
      run();
  });



  // -----------------------------------------------
  // Entry point for test...
  // -----------------------------------------------
  function run() {
      var $ = window.jQuery;
      // Default running event
      sendEvent('View PD036 activated - Variation 1');

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

      // PD036-Code

      // PD036 variable declaration, check if on footwear page, do not adjust for ladies footwear
      let PD036FootwearCheck = false;
      const pathCheck = window.location.pathname.toUpperCase();
      if (pathCheck.indexOf('SAFETY-FOOTWEAR') > -1 && pathCheck.indexOf('LADIES-SAFETY-FOOTWEAR') === -1) {
        PD036FootwearCheck = true;
      }

      // -----------------------------------------------
      // Iterate over products
      // -----------------------------------------------
      $('.subcat_column-item').each(function() {
          var that = this;

          // var productUrl = $(this).find('.details h3 label a').attr('href');
          // Check the if the product title contains 'Ladies'
          const PD036productTitle = $(this).find('.productName label a').text().trim().toUpperCase();
          let PD036showLarger = true;
          if(PD036productTitle.indexOf('LADIES') > -1) {
            PD036showLarger = false;
          }
          // -----------------------------------------------
          // Modify structure of product
          // -----------------------------------------------
          $(this).find('.thumb, .cart').wrapAll('<div class="pd3-prod-content clearfix">');

          // -----------------------------------------------
          // Create new add to / price container
          // -----------------------------------------------
          $(this).find('.cart').before([
              '<div class="pd3-details-box">',
              '</div>'
          ].join(''));

          // -----------------------------------------------
          // Build new pseudo size selector
          // -----------------------------------------------
          var variantSelect = $(this).find('.variant_options select:first');

          var sizeSelector = $([
              '<div class="pd3-size-selector">',
              '</div>'
          ].join(''));

          $(this).find('.pd3-details-box').append(sizeSelector);

          /**
           * Helper add option row to selector
           */

           // PD036-Code Added PD036 as function parameter and HTML class
          function addSelectorRow(price, productCode, details, defaultQuantity, PD036Class) {
              if(!defaultQuantity) {
                  defaultQuantity = 0;
              }
              if (!PD036Class) {
                PD036Class = 'PD036_Simple_Product';
              }
              sizeSelector.append([
                  '<div class="pd3-size-selector__option ' + PD036Class + '">',
                      '<div class="pd3-size-selector__selector">',
                          '<div class="pd3-size-selector__minus">',
                              '-',
                          '</div>',
                          '<div class="pd3-size-selector__input-wrap">',
                              '<input data-price="' + price  + '" ',
                                  'data-code="' + productCode + '" ',
                                  'class="pd3-size-selector__quantity" type="text" min="0" value="' + defaultQuantity + '" />',
                          '</div>',
                          '<div class="pd3-size-selector__plus">',
                              '+',
                          '</div>',
                      '</div>',
                      '<div class="pd3-size-selector__details">',
                          '<span>',
                          details,
                          '</span>',
                      '</div>',
                  '</div>'
              ].join(''));
          }

          if(variantSelect.length > 0 && $(this).find('.variant_options .options_not_available').length === 0) {
              // -----------------------------------------------
              // Build the options for a variant
              // -----------------------------------------------

              // Adjusting PD003 by removing the condition limiting to quantity
              var numOptions = variantSelect.find('option').length;
              variantSelect.find('option').each(function(idx) {
                  var details = $(this).html().trim();
                  details = details.replace(/&nbsp;/g, ' ');

                  var optionPrice = details.match(/£(\d+\.\d+)$/);

                  var value = $(this).val();
                  var keyValuePairs = parseOptionKeyValuePairs(value);

                  // PD036-Code
                  // initialise styling class to toggle between options, value passed to helper function

                  let PD036OptionClass = 'PD036_Additional_Option';
                  // Check there are a more than 3 options
                  if (numOptions > 3) {
                    // Check if on footwear page and product should not display smaller sizes
                    if (PD036FootwearCheck && PD036showLarger) {
                      // Check if the size should always be visible(sizes 9, 10, 11)
                      if(/(Size\s)(EIGHT|NINE|TEN|8|9|10|MED|LARGE|XL)/.test(details)) {
                        // Value should be always be visible
                        PD036OptionClass = 'PD036_Option';
                      }
                    }
                    // if not on a footwear page and current option is not greater than 3, reveal it
                  else if (idx < 3 && PD036OptionClass != 'PD036_Option'){
                    PD036OptionClass = 'PD036_Option';
                    }
                  } 
                  // Less than 3 options, reveal all options
                  else if (numOptions <= 3) {
                    PD036OptionClass = 'PD036_Option';
                  }
                  // PD036-Code Code-End
                  // Add size selector and assoc details row
                  addSelectorRow((optionPrice || [])[1], keyValuePairs['code'], details, numOptions === 1 ? 1 : 0, PD036OptionClass);
              });

              // if there are more than 3 options, display view more sizes box
              // PD036-Code - Move if statement code block to outside of each function
              if (numOptions > 3) {
                $(that).find('.pd3-details-box').append([
                  '<div class="pd3-size-selector__show-more-options PD036_Display_More">',
                      '<span classs="PD036_View_Text">',
                          'View ',
                            '<span class="PD036_Show_Fewer">fewer </span>',
                            '<span class="PD036_Show_More">more </span>',
                          ' sizes',
                      '</span>',
                  '</div>'
              ].join(''));

            }

          } else {
              // -----------------------------------------------
              // Build simple product row
              // -----------------------------------------------
              var productCode = $(that).find('[name=productCodePost]').val();
              var details = $(that).find('.options_not_available').text().trim();
              var price = $(that).find('.firstLinePrice .price').text().replace(',', '');
              price = price.match(/£(\d+\.\d+)|(\d+\,\d+\.\d+)$/);
              
              if(!details) {
                  details = $(that).find('.firstLinePrice .price').text();
              }
              if(price && productCode) {
                  addSelectorRow((price || [])[1], productCode, details, 1);
              }
          }
          
          // -----------------------------------------------
          // Crate price summary and custom add to basket buttons
          // -----------------------------------------------
          var priceSummary = $([
              '<div class="pd3-addto">',
                  '<div class="pd3-addto__price">',
                      '&nbsp;',
                  '</div>',
                  '<div class="pd3-addto__button-wrap">',
                      '<button class="pd3-addto__button">',
                          'Add to Basket',
                      '</button>',
                  '</div>',
              '</div>'
          ].join(''));

          priceSummary.insertAfter($(this).find('.pd3-prod-content'));

          /**
           * Helper show a message against a product
           */
          function showMessage(message, type) {
              removeExistingMessage();

              $(that).find('.pd3-addto').before([
                  '<div class="pd3-message">',
                      message,
                  '</div>'
              ].join(''));

              $(that).find('.pd3-message').addClass('pd3-message--type-' + type);
          }

          /**
           * Hide existing message
           */
          function removeExistingMessage() {
              $(that).find('.pd3-message').remove();
          }
          
          // -----------------------------------------------
          // Handle add to basket
          // -----------------------------------------------
          $(that).find('.pd3-addto__button').click(function() {
              removeExistingMessage();

              // ----------------------------------------------------
              // Validate
              // ----------------------------------------------------
              var totalQty = 0;
              $(that).find('.pd3-size-selector__quantity').each(function() {
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
              $(that).find('.pd3-size-selector__quantity').each(function(idx, item) {
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
                              CSRFToken: $('[name="CSRFToken"]:first').val(),
                              qty: qty
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
                  $(that).find('.pd3-addto__button').text('Add to Basket');

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
          $(this).find('.pd3-addto__price').empty()

          var originalFirstLinePrice = $(this).find('.firstLinePrice').html(),
              originalGrossPrice = $(this).find('.secLinePrice .grossPrice').html();

          $(this).find('.firstLinePrice').clone().appendTo($(this).find('.pd3-addto__price'));
          $(this).find('.secLinePrice').clone().appendTo($(this).find('.pd3-addto__price'));
          
          // -----------------------------------------------
          // Handle prices update when item pressed
          // -----------------------------------------------
          $(this).find('.pd3-size-selector__plus').click(function() {
              var qtySelector = $(this).prev().find('input');
              var val = parseInt(qtySelector.val());
              qtySelector.val(val + 1);

              updatePrice();
          });
          $(this).find('.pd3-size-selector__minus').click(function() {
              var qtySelector = $(this).next().find('input');
              var val = parseInt(qtySelector.val());
              if(val > 0) {
                  qtySelector.val(val - 1);
              }

              updatePrice();
          });
          
          function updatePrice() {
              var total = 0, totalQty = 0;

              // Get all quanitites and prices for each and add them up
              $(that).find('.pd3-size-selector__quantity').each(function() {
                  var price = parseFloat($(this).attr('data-price').trim()),
                      qty = parseInt($(this).val(), 10);

                  totalQty += qty;

                  total += price * qty;
              });

              var totalInc = total * 1.2;

              var moneyFormatExVat = new UC.Money.Format(total);
              moneyFormatExVat.setCurrency('GBP');
              var moneyFormatIncVat = new UC.Money.Format(totalInc);
              moneyFormatIncVat.setCurrency('GBP');

              var totalExVat = moneyFormatExVat.formatMoney(2, '.', ',', true);
              var totalIncVat = moneyFormatIncVat.formatMoney(2, '.', ',', true);


              // If Quantities Chosen
              if(totalQty > 0) {
                  // Update prices and associated descriptions
                  $(that).find('.firstLinePrice .price').text(totalExVat);
                  $(that).find('.firstLinePrice .price_details').text(' ex. VAT ');

                  $(that).find('.secLinePrice .grossPrice').html([
                      '<span id="grossPrice-NBS">',
                      totalIncVat,
                      '</span>',
                      ' inc. VAT'
                  ].join(''));

                  // Hide 'from' label
                  $(that).find('.pd3-addto__prefix').css('visibility', 'hidden');
              } else {
                  $(that).find('.firstLinePrice').html(originalFirstLinePrice);

                  // Reset prices 
                  $(that).find('.secLinePrice .grossPrice').html(originalGrossPrice);

                  // Show 'from' label
                  $(that).find('.pd3-addto__prefix').css('visibility', 'visible');
              }
          }

          // -----------------------------------------------
          // Handle differences between simple and variation products
          // -----------------------------------------------
          if(variantSelect.length > 0) {
              $(this).addClass('pd3--variant-product pd3--has-from-prefix');
              $(this).find('.pd3-addto__price').prepend('<p class="pd3-addto__prefix">From</p>');
          } else {
              $(this).addClass('pd3--simple-product');
          }
          
          // -----------------------------------------------
          // Free delivery button
          // -----------------------------------------------
          if($(this).find('.freeDeliveryBtn').length) {
              $(this).append([
                  '<a class="pd3-free-delivery" target="_blank" href="/Terms-And-Conditions">',
                      'Free Delivery ',
                      '<em>*</em>',
                  '</a>'
              ].join(''));
          }
      }); // end of looping through individual products

      // PD036-Code Reveal/Hide additional options functionality - Start

      // Add event listener to current show more
      $('.PD036_Display_More').on('click', (e) => {
        const optionsContainer = $(e.target).closest('.pd3-details-box').find('.pd3-size-selector');
        const moreOption = $(e.target).closest('.pd3-details-box').find('.PD036_Additional_Option').first();
          // Check if options need to be hidden or revealed, toggle class to hide or reveal
          if (moreOption.is(':visible')) {
            optionsContainer.removeClass('PD036_Show_Additional');
          } else {
            optionsContainer.addClass('PD036_Show_Additional');
          }
      });

      // PD036 Reveal/Hide additional options functionality - End

      // PD036-Code event tracking: Quantity increase, Quantity Decrease

      $('.pd3-size-selector__plus').on('click', () => {
        sendEvent('Quantity Increase');
      });

      $('.pd3-size-selector__minus').on('click', () =>{
        sendEvent('Quantity Decrease');
      });

          
      // -----------------------------------------------
      // Other category page amends
      // -----------------------------------------------
      $('.catBanner p').remove();
      $('.catBanner').removeClass('catBanner');
      
      // -----------------------------------------------
      // Delivery / countdown banner
      // -----------------------------------------------
      $('#breadcrumb').before([
          '<div class="pd3-delivery-banner clearfix">',
              '<div class="pd3-delivery-banner__col pd3-delivery-banner__delivery-message">',
                  '<img src="//www.userconversion.com/assets/icon-free.png" />',
                  '<span>FREE delivery on orders over £25</span>',
              '</div>',
              '<div class="pd3-delivery-banner__col pd3-deivery-banner__countdown">',
                  '<img src="//www.userconversion.com/assets/icon-nextday.png" />',
                  '<span class="pd3-delivery-banner__message"></span>',
              '</div>',
          '</div>'
      ].join(''));

      var messagePreCutoff = '<span>Order in the next <strong class="uc-countdown-wrapper"></strong> for next day delivery</span>';
      var messagePostCutoff = '<span>Order in the next <strong class="uc-countdown-wrapper"></strong> for delivery by <strong class="uc-countdown-target-day"></strong></span>';

      // Determine cutoffs and delivery days
      var now = new Date(),
          orderDate = new Date(),
          d = new Date(),
          days = [' ', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', ' '],
          day = now.getDay();
    
      d.setHours(d.getUTCHours()+1);
    
      // Cutoff time set to 5PM
      orderDate.setHours(17,0,0);
      
      var deliveryDayString = 'tomorrow';
      if (day === 4 && d > orderDate) { 
        // If Thursday past cutoff...
      
        orderDate.setDate(d.getDate() + 1); // set countdown to Friday 3pm
        deliveryDayString = days[1];
        
      } else if (day === 5) { // if Friday
        if (d > orderDate) { // past cutoff
        
          orderDate.setDate(d.getDate() + 3); // set countdown to Monday 3pm
          deliveryDayString = days[2];
          
        } else { // before cutoff
        
          deliveryDayString = days[1]; // leave countdown for today at 3pm for delivery on Monday
        }
        
      } else if (day === 6) { // if Saturday
      
        orderDate.setDate(d.getDate() + 2); // set countdown to Monday 3pm
        deliveryDayString = days[2]; // for delivery on Tuesday
        
      } else if (day === 0) { // if Sunday
      
        orderDate.setDate(d.getDate() + 1); // set countdown to Monday 3pm
        deliveryDayString = days[2]; // for delivery on Tuesday
        
      } else if (d > orderDate) { // else if Monday-Wed past 3pm
      
        orderDate.setDate(d.getDate() + 1); // set countdown to tommorrow 3pm
        deliveryDayString = days[day+2];
        
      } 

      if(deliveryDayString != 'tomorrow') {
          $('.pd3-delivery-banner__message').html(messagePostCutoff);
          $('.uc-countdown-target-day').text(deliveryDayString);    

      } else {
          $('.pd3-delivery-banner__message').html(messagePreCutoff);
      }

      var secondsUntilCutoff = Math.floor( (orderDate.getTime() - d.getTime()) / 1000 );
      
      function timer() {
          var days        = Math.floor(secondsUntilCutoff/24/60/60);
          var hoursLeft   = Math.floor((secondsUntilCutoff) - (days*86400));
          var hours       = Math.floor(hoursLeft/3600);
          var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
          var minutes     = Math.floor(minutesLeft/60);
          var remainingSeconds = secondsUntilCutoff % 60;
          if (remainingSeconds < 10) {
              remainingSeconds = "0" + remainingSeconds; 
          }
          var countdownElements = document.querySelectorAll('.uc-countdown-wrapper');
          for(var i = 0, ii = countdownElements.length; i < ii; i++) {
            var countdownElm = countdownElements[i];
            countdownElm.innerHTML = [
              '<span class="uc-countdown">',
              days > 0 ? ('<span class="days">' + days + '</span> days ') : '',
              '<span class="hours">' + hours + '</span>h ',
              '<span class="minutes">' + minutes + '</span>m ',
              '</span>'
            ].join('');
            if (secondsUntilCutoff == 0) {
                clearInterval(countdownTimer);
            } else {
                secondsUntilCutoff--;
            }
          }
      }
      var countdownTimer = setInterval(timer, 1000);
  }
})();
