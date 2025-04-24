import * as UC from '../../../../../lib/uc-lib';
import * as helpers from './helpers';

const pdpMobile = () => {
    
    var sku = $('meta[itemprop="sku"]').attr('content');
    var vat = 20;
    
    if (sku && sku.length) {
        var targetUrl = 'https://ab-test-sandbox.userconversion.com/custom-client-scripts/tp-product-orig-prices/?type=guest&sku=' + sku;
        if(helpers.isLoggedInMobile()) {
          targetUrl = 'https://ab-test-sandbox.userconversion.com/custom-client-scripts/tp-product-orig-prices/?type=loggedin&sku=' + sku;
        }
      
        $.ajax({
            url: targetUrl,
            success: function(data) {
                $('body').addClass('TP021-pdp-mobile');

                var response = JSON.parse(data);
                if (response && response.length) {
                    var rrpExVat = parseFloat(response[0].rrp);
                    var rrpIncVat = (rrpExVat + ((rrpExVat / 100) * vat)).toFixed(2);
                    rrpExVat = rrpExVat.toFixed(2);
  
                    var $prices = $('.productPrice');
                    var $priceExVatEl = $prices.find('.product_price_section');
                    var $priceIncVatEl = $prices.find('.price_inc_vat_section');
                    var $rrpExVatEl = $('<span class="TP021_rrp">Was: £' + rrpExVat + '</span>');
                    var $rrpIncVatEl = $('<span class="TP021_rrp">Was: £' + rrpIncVat + '</span>');
                    
                    var priceExVat = parseFloat($priceExVatEl.find('> .price_value').text().replace(/£/g, '').replace(/,/, ''));
                    var priceIncVat = parseFloat($priceIncVatEl.find('> .includedVAT').text().replace(/£/g, '').replace(/,/, ''));
                    
                    var GAEventSent;                  
  
                    // Only show if RRP is greater than the currently shown price
                    if (rrpExVat > priceExVat) {
                        $priceExVatEl.prepend($rrpExVatEl);
                      $('.TP021 .price_value').css("color", "red");
                        if (!GAEventSent) {
                            GAEventSent = true;
                            sendGAEvent();
                        }
                    }
                    
                    if (rrpIncVat > priceIncVat) {
                        $priceIncVatEl.prepend($rrpIncVatEl);
                      $('.TP021 .includedVAT').css("color", "red");
                        if (!GAEventSent) {
                            GAEventSent = true;
                            sendGAEvent();
                        }
                    }
                        
                    function sendGAEvent() {
                        UC.poller([
                            function() { return window.ga.getAll }
                        ], function() {
                            var trackerName = window.ga.getAll()[0].get('name');
                            window.ga(trackerName + '.send', 'event', 'TP021---RRP', 'Page View', helpers.isLoggedInMobile() ? 'logged-in' : 'guest', {nonInteraction: 1})
                        });
                    }
                }
            }
        });
    }
};

export default pdpMobile;
