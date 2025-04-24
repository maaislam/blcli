// Mobile Version
var _TP021c = (function() {
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    UC.poller([
        '.tp_prodView',
        '.product_item',
        '.product_price_holder',
        '.price_value',
        function() {
            return window.jQuery;
        },
        function() {
            return window.ga;
        }
    ], run);

    function run() {
        var $ = window.jQuery;

        $('body').addClass('tp021c tp021c-mobile');

        // --------------------------------------------------
        // Get SKUs of all products and query against API
        // Identify each prod with sku identifier for easy querying later
        // --------------------------------------------------
        var skusOnPage = [];
        $('.tp_prodView .product_item').each(function() {
            var link = $(this).find('a:first'),
                linkHref = link.attr('href');

            var matches = linkHref.match(/[^\/]+$/);
            if((matches || {})[0]) {
                var sku = matches[0];
                $(this).attr('data-tp21-sku', sku);

                skusOnPage.push(sku);
            }
        });

        if(skusOnPage.length === 0) {
            // Bail out and fire an event to say that page had no skus
            sendEvent('NoSkusOnPage', window.location.pathname);
            return;
        }

        $.ajax({
          url: 'https://ab-test-sandbox.userconversion.com/custom-client-scripts/tp-product-orig-prices/',
          data: {
            type: isLoggedIn() ? 'loggedin' : 'guest',
            skus: skusOnPage
          },
          success: function(data) {
            // Note that data SKUs are not returned in the same order as the order of the
            // products listed on the page
            var results = JSON.parse(data);

            var numProductsWithItShown = 0;
            $.each(results, function(idx, item) {
                var rrpPrice = parseFloat(item.rrp),
                    sku = item.sku;

                if(rrpPrice) {
                    var targetProduct = $('[data-tp21-sku="' + sku + '"]');

                    if(targetProduct.length) {
                        var priceHolder = targetProduct.find('.product_price_holder'),
                            rrpPriceFormatted = formatMoney(rrpPrice, 2, '.', ',');

                        // If current price does not equal price on page, show
                        var currentProductPrice = parsePrice(targetProduct.find('.price_value').text().trim());

                        if(currentProductPrice != rrpPrice && rrpPrice > currentProductPrice) {

                            targetProduct.addClass('tp21-product-has-rrp');

                            priceHolder.prepend([
                                '<span class="tp21-rrp-price">',
                                    '<em>',
                                        'RRP:',
                                    '</em>',
                                    '<strong>',
                                        rrpPriceFormatted,
                                    '</strong>',
                                '</span>'
                            ].join(''));

                            targetProduct.on('click', function() {
                                sendEvent('DidClickOnProductShowingRRP', targetProduct.find('.ui-link > p').text().trim());
                            });

                            numProductsWithItShown++;
                        }
                    }
                }
            });

            if(numProductsWithItShown > 0) {
                sendEvent('DidShowRRPPricesOnListingPage', 'NumShown:' + numProductsWithItShown + '; Page:' + window.location.pathname + ';');
            }
          }
        });
  
        /**
         * Format money with thousands separator and period
         */
        function formatMoney(n, decimalPlaces, period, comma){
            var c = isNaN(decimalPlaces = Math.abs(decimalPlaces)) ? 2 : decimalPlaces, 
                d = period == undefined ? "." : period, 
                t = comma == undefined ? "" : comma, 
                s = n < 0 ? "-" : "", 
                i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
                j = (j = i.length) > 3 ? j % 3 : 0;
          
            var result = s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) 
              + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");

            if(result) {
                result = '&pound;' + result;
            }
            
            return result;
        }

        /**
         * Parse sku
         */
        function parseSku(formattedSku) {
            return formattedSku.replace(/[\(\)]/g, '').trim();
        }

        /**
         * Helper parse price numeric
         */
        function parsePrice(formattedPrice) {
            var rawPrice = formattedPrice.replace(/[£,]/g, '');
            return parseFloat(rawPrice);
        }

        /**
         * Helper check if user is logged in
         */
        function isLoggedIn() {
            return !!$('.your-account').length; 
        }

        /**
         * Send GA event
         */
        var trackerName;
        function sendEvent(action, label) {
            var category = 'TP021c---RRP Prices---PLP---Mobile',
                nonInteractionValue = true;

            if(!label) {
                label = '';
            }

            var fire = function(tracker) {
                window.ga(tracker + '.send', 'event', category, action, label, {nonInteraction: nonInteractionValue});
            };

            if (trackerName) {
                fire(trackerName);
            } else {
                UC.poller([
                    function() { return window.ga.getAll; }
                ], function() {
                    trackerName = window.ga.getAll()[0].get('name');
                    fire(trackerName);
                });
            }
        }
    }
})();
