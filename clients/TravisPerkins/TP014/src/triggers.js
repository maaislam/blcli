/* eslint-disable */
var _TP014 = (function () {
    
    // Prerequisites -------------------------------
    // ---------------------------------------------
    if (!window.MutationObserver) return false;

    
    
    // Plugins & Helpers ---------------------------
    // ---------------------------------------------

    // UC Library @version 0.2.4
    var UC = {};
    UC.poller=function(t,e,n){var i={wait:50,multiplier:1.1,timeout:0},r=Date.now||function(){return(new Date).getTime()};if(n)for(var u in n)i[u]=n[u];else n=i;for(var o=!!i.timeout&&new Date(r()+i.timeout),f=i.wait,l=i.multiplier,a=[],c=function(n,i){if(o&&r()>o)return!1;i=i||f,function(){var t=typeof n;return"function"===t?n():"string"!==t||document.querySelector(n)}()?(a.push(!0),a.length===t.length&&e()):setTimeout(function(){c(n,i*l)},i)},m=0;m<t.length;m++)c(t[m])};
    UC.observer={active:[],connect:function(t,e,n){var i={throttle:1e3,config:{attributes:!0,childList:!0,subTree:!1}};if(n)for(var o in n)i[o]=n[o];else n=i;for(var r,c=new MutationObserver(function(n){n.forEach(function(n){r||(r=!0,e(t,n),setTimeout(function(){r=!1},i.throttle))})}),f=0;f<t.length;f++)c.observe(t[f],i.config),this.active.push([t[f],c])},disconnect:function(t){for(var e=this.active,n=0;n<t.length;n++)for(var i=t[n],o=0;o<e.length;o++)i===e[o][0]&&e[o][1].disconnect()}};

    // Send GA events
    function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}var trackerName;

    // Full Story Tagging
    UC.poller([function(){var t=window.FS;if(t&&t.setUserVars)return!0}],function(){window.FS.setUserVars({experiment_str:"TP014",variation_str:"Variation 1 Desktop"})},{multiplier:1.2,timeout:0});



    // Event Tracking ------------------------------
    // ---------------------------------------------

    var events = {
        category: 'TP014---Basket Total',
        status: {
            basketValueOver0: false,
            changedQty: false
        },
        send: {
            basketValueOver0: function() {
                if (!events.status.basketValueOver0) {
                    sendEvent(events.category, 'mini basket amount', 'TP014 Mini basket amount more than 0', true);
                    events.status.basketValueOver0 = true;
                }
            },
            changedQty: function() {
                if (!events.status.changedQty) {
                    sendEvent(events.category, 'quantity click', 'TP014 User clicked quantity button on product page', true);
                    events.status.changedQty = true;
                }
            }
        }
    };



    // Triggers ------------------------------------
    // ---------------------------------------------

    var _triggers = (function () {
        UC.poller([
            '#rollover_cart_popup',
            '.tpMiniCart #rollover_cart_popup',
            '#minicart_data',
            '#miniCart_items_count',
            function () {
                return window.jQuery;
            },
            function () {
                return window.ga;
            }
        ], function() {
            // Stop test from triggering twice on hover of minibasket
            if (window.jQuery('body').hasClass('TP014')) return false;
          
            activate();
        });
    })();



    // Experience ----------------------------------
    // ---------------------------------------------

    function activate() {
        var $ = window.jQuery;

        $('body').addClass('TP014');

        function checkPriceAndUpdate(delay) {
            if (delay == true) {
                setTimeout(updateBasketPrice, 500);
            } else {
                updateBasketPrice();
            }
        }

        function calcIncVat(val) {
            var vat = val / 100 * 20;
            return (Math.round((val + vat) * 100) / 100).toFixed(2);
        }

        // Populate minibasket with html from global var rolloverPopupUrl
        function updateMiniBasket() {
            $.ajax({
                url: window.rolloverPopupUrl,
                type: 'GET',
                dataType: 'html',
                success: function (data) {
                    var $html = $(data);
                    $('#rollover_cart_popup').html($html);
                    updateBasketPrice();
                },
                error: function () {
                    if (console && console.error) console.error('TP014 ajax error');
                }
            });
        }
        updateMiniBasket();

        // Make ajax request again when new product is added to basket
        $(document).on('click', '.TP014 .addForCollectionButton, .TP014 #addToCartButton', function() {
            setTimeout(updateMiniBasket, 1000);
        });

        function updateBasketPrice() {
            var bsktQty = $('#miniCart_items_count').text().trim();
            // If basket is empty do nothing
            if (bsktQty == '0') return false;
          
            var $bskt = $('#rollover_cart_popup');
            var $price = $bskt.find('.total_price');
            var totalExVat = parseFloat($bskt.find('.total_price > p:last:not(".total_price_title")').text().trim().replace(/[£,]/g, ''));
            var totalIncVat = parseFloat(calcIncVat(totalExVat)).toFixed(2);
            totalIncVat = totalIncVat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            var $priceIncVatEl = $bskt.find('.total-price-minibasket');
            if (!$priceIncVatEl.length) {
                $price.append([
                    '<div class="total-price-minibasket">',
                        '<p class="total_price_title">Total price excl delivery (Inc VAT):</p>',
                        '<p>£' + totalIncVat + '</p>',
                    '</div>'
                ].join(''));
            } else {
                $priceIncVatEl.find('.total-price-minibasket > p:last').html('£' + totalIncVat);
            }
          
            // Change ex VAT text to include 'incl delivery'
            $price.children('.total_price_title').text('Total price excl delivery (Ex VAT):');

            var $bsktData = $('#minicart_data');
            var $priceIncVatDisplayed = $bsktData.children('.total-price-display');
            
            if (!$priceIncVatDisplayed.length) {
                $bsktData.append([
                    '<span class="total-price-display">',
                        '£' + totalExVat.toFixed(2) + ' <br />(Ex VAT)',
                    '</span>'
                ].join(''));
            } else {
                $priceIncVatDisplayed.html('£' + totalExVat.toFixed(2) + ' <br />(Ex VAT)');
            }

            var products = $bskt.find('.cart_modal_popup .prod_price');

            products.each(function () {
              var thisText = $(this).text();
              if (thisText.indexOf('Ex VAT') === -1) {
                // $(this).text(thisText + ' (Ex VAT)'); 
                $(this).html(thisText + '<br />(Ex VAT)');
              }
            });

            events.send.basketValueOver0();
        }
        
        // Re-add total with VAT every time the minibasket refreshes
        var $popupEls = $('.tpMiniCart, #rollover_cart_popup');
        UC.observer.connect($popupEls, updateBasketPrice, {
            config: {attributes: true, childList: true, subtree: true},
            throttle: 10
        });

        /* Quantity change stuff */
        function checkQuantity() {
            if (!$('body').hasClass('pageType-CategoryPage') && !$('body').hasClass('pageType-ContentPage')) {
                if ($('.TP014 .tpQ_input').length >= 0 && $('.TP014 .dropdown-opener').html() !== "Please select") {
                    $('.TP014 .tpQ_input').addClass('totalPrice');
                    $('.TP014 .tpQ_totalPrice').remove();
                    $('<div class="tpQ_totalPrice"> Total Price (Ex VAT): <span class="total-price-holder"></span></div>').insertAfter('.TP014 .tpQ_input');
                    $('.TP014 .tpQ_input, .TP014 .tpQ_totalPrice').wrapAll('<div class="tpQ_size_holder"></div>');
                    updatePrice();
                }
            }
        }
        function updatePrice() {
            // var currentPrice = parseFloat($('.TP014 .tpQ_input input').val()) * parseFloat($('.TP014 .tpInfoWrapper .price_value').text().replace('£', ''));
            var inputCurrentPrice = parseFloat($('.TP014 .tpQ_input input').val());
            var priceValue = $('.TP014 .tpInfoWrapper .productPrice .price_value').text();

            if (priceValue) {
              priceValue = priceValue.replace('£', '');
              if (priceValue.match(/\,/g, '')) {
                priceValue = priceValue.replace(',', '');
              }
            }
            var currentPrice = inputCurrentPrice * priceValue;  
            currentPrice = "£" + parseFloat(currentPrice).toFixed(2);
            $('.TP014 .total-price-holder').html(currentPrice);
        }

        checkQuantity();

        var qtychangeEvent;

        $(document).on('change', '.TP014 #addToCartForm .tpQ_input input', function () {
            updatePrice();
            events.send.changedQty();
        });

        $(document).on('click', '.TP014 .dropdown', checkQuantity);

    }

})();