/* eslint-disable */
(function() {
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    UC.Money = UC.Money || {};

    UC.Money.Format=function(){function a(e){this.num=e}var b={GBP:'\xA3',USD:'$',EUR:'\u20AC'};return a.prototype.setCurrency=function(e){return this.currency=e,this},a.prototype.formatMoney=function(e,f,g,h){var k=this.num,l=isNaN(e=Math.abs(e))?2:e,m=void 0==f?'.':f,o=void 0==g?'':g,p=0>k?'-':'',q=parseInt(k=Math.abs(+k||0).toFixed(l))+'',r=3<(r=q.length)?r%3:0,u=p+(r?q.substr(0,r)+o:'')+q.substr(r).replace(/(\d{3})(?=\d)/g,'$1'+o)+(l?m+Math.abs(k-q).toFixed(l).slice(2):'');return h&&(u=('undefined'==typeof b[this.currency]?'':b[this.currency])+u),u},a}();

    var trackerName;
    function sendEvent(action, label, nonInteractionValue) {
        var category = 'PD003---Desktop-Category';
        label = label || '';
        nonInteractionValue = nonInteractionValue || true;

        ga('send', 'event', category, action, label, {nonInteraction: nonInteractionValue});
    }

    document.body.classList.add('pd003');
    
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
            experiment_str: 'PD003',
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

        $('body').addClass('pd003--is-running');

        sendEvent('page-view');

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

        // -----------------------------------------------
        // Iterate over products
        // -----------------------------------------------
        $('.subcat_column-item').each(function() {
            var that = this;

            var productUrl = $(this).find('.details h3 label a').attr('href');

            // -----------------------------------------------
            // Modify structure of product
            // -----------------------------------------------
            $(this).find('.thumb, .cart').wrapAll('<div class="pd3-prod-content clearfix">');

            // -----------------------------------------------
            // Create new add to / price container
            // -----------------------------------------------
            $(this).find('.cart').before([
                '<div class="pd3-addto__price">',
                  '&nbsp;',
                '</div>',
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
            function addSelectorRow(price, productCode, details, defaultQuantity) {
                if(!defaultQuantity) {
                    defaultQuantity = 0;
                }
                sizeSelector.append([
                    '<div class="pd3-size-selector__option">',
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
                var numOptions = variantSelect.find('option').length;
                variantSelect.find('option').each(function(idx) {
                    if(idx > 2) {
                        // Limit number of options shown to 3 
                        $(that).find('.pd3-details-box').append([
                            '<div class="pd3-size-selector__show-more-options">',
                                '<a href="' + productUrl + '">',
                                    'Show more options',
                                '</a>',
                            '</div>'
                        ].join(''));

                        return false;
                    }
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

            sendEvent('pre-cutoff-delivery-message-shown');
        } else {
            $('.pd3-delivery-banner__message').html(messagePreCutoff);

            sendEvent('post-cutoff-delivery-message-shown');
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
