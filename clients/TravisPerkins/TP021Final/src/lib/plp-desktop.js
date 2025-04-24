import * as UC from '../../../../../lib/uc-lib';
import * as helpers from './helpers';

const plpDesktop = () => {
    // --------------------------------------------------
    // Get SKUs of all products and query against API
    // Identify each prod with sku identifier for easy querying later
    // --------------------------------------------------
    var skusOnPage = [];
    $('#products .prod').each(function() {
        var skuElm = $(this).find('.product_code'),
            sku = parseSku(skuElm.text());

        $(this).attr('data-tp21-sku', sku);

        skusOnPage.push(sku);
    });

    if(skusOnPage.length === 0) {
        // Bail out and fire an event to say that page had no skus
        return;
    }

    $.ajax({
      url: 'https://ab-test-sandbox.userconversion.com/custom-client-scripts/tp-product-orig-prices/',
      data: {
        type: helpers.isLoggedInDesktop() ? 'loggedin' : 'guest',
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
                                    'Was:',
                                '</em>',
                                '<strong>',
                                    rrpPriceFormatted,
                                '</strong>',
                            '</span>'
                        ].join(''));

                        targetProduct.find('.addForCollectButton').on('click', function() {
                            sendEvent('DidClickOnProductShowingRRP', targetProduct.find('.prod_info a:first').text().trim());
                        });
                        targetProduct.find('.add_to_cart_button').on('click', function() {
                            sendEvent('DidClickOnProductShowingRRP', targetProduct.find('.prod_info a:first').text().trim());
                        });
                        targetProduct.find('a').on('click', function() {
                            sendEvent('DidClickOnProductShowingRRP', targetProduct.find('.prod_info a:first').text().trim());
                        });

                        numProductsWithItShown++;
                    }
                }
            }
        });

        if(numProductsWithItShown > 0) {
            $('body').addClass('TP021-plp-desktop');

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
        var rawPrice = formattedPrice.replace(/[Â£,]/g, '');
        return parseFloat(rawPrice);
    }

    /**
     * Send GA event
     */
    var trackerName;
    function sendEvent(action, label) {
        var category = 'TP021c---RRP Prices---PLP---Desktop',
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
};

export default plpDesktop;
