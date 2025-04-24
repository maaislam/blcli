// --------------------------------------------------------------------
// This code is based on the test TP001
// In Monetate configure a traffic split of:
//
// Control = 0%
// A = 50% - this is effectively the Control - take code from TP001 and place in here
// B = 50% - our variation, this TP027 code
// --------------------------------------------------------------------
var _TP027 = (function() {
    // --------------------------------------------------------------------
    // Setup
    // --------------------------------------------------------------------
    $('body').addClass('tp027');

    var _options = {
        freeDeliveryThreshold: 50,
        basketSubtitle: 'Stock will only be reserved when you complete the order.',
        textDeliveryInfoTitle: 'Delivery Information',
        textDeliveryInfoCopy: [
            '<p>Please note the above date is given as an estimate</p>',
            '<p>Once you have placed your order, your local branch will contact you to book a convenient date for your delivery</p>'
        ].join(''),
        textPaySecurely: 'Pay Securely',
        textSecure: 'Shopping with travisperkins.co.uk is safe and secure, and your personal details are protected',
        itemDeleteText: 'Remove',
        itemPriceHeadingText: 'Item Price',
        estimatedDeliveryText: 'Estimated',
        totalPriceHeadingText: 'Subtotal',
        imgPadlock: 'http://sb.monetate.net/img/1/581/1065414.png',
        cardLogos: [
            {
                img: 'http://sb.monetate.net/img/1/581/1065263.png',
                title: 'Visa'
            },
            {
                img: 'http://sb.monetate.net/img/1/581/1065269.png',
                title: 'Mastercard'
            },
            {
                img: 'http://sb.monetate.net/img/1/581/1065270.png',
                title: 'Maestro'
            },
            {
                img: 'http://sb.monetate.net/img/1/581/1065272.png',
                title: 'American Express'
            }
        ],
        secureLogos: [
            {
                img: 'http://sb.monetate.net/img/1/581/1065328.png',
                title: 'Secured by SSL'
            },
            {
                img: 'http://sb.monetate.net/img/1/581/1065328.png',
                title: 'Secured by SSL'
            },
            {
                img: 'http://sb.monetate.net/img/1/581/1065328.png',
                title: 'Secured by SSL'
            }
        ],
        imgDeliveryTruck: '/_ui/addons/b2bnewtpaddon/desktop/theme-travisperkins/images/cctruck.png'
    };

    // --------------------------------------------------------------------
    // UC poller
    // --------------------------------------------------------------------
    var UC={now:Date.now||function(){return(new Date).getTime()},poller:function(a,b,c){var d={wait:50,multiplier:1.1,timeout:null};c||(c=d);for(var e=c.timeout?new Date(UC.now()+c.timeout):d.timeout,f=c.wait?c.wait:d.wait,g=c.multiplier?"disable"===c.multiplier?0:c.multiplier:d.multiplier,h=[],j=function(c,d){if(e&&UC.now()>e)return!1;d=d||f,("function"==typeof c?c():window.jQuery(c).length>0)?(h.push(!0),h.length===a.length&&b()):setTimeout(function(){j(c,d*g)},d)},k=0;k<a.length;k++)j(a[k])}};

    // --------------------------------------------------------------------
    // Load when items are available
    // --------------------------------------------------------------------
    UC.poller([
        '.basket_items',
        '.baskt_items_wrap',
        '.basket_headings',
        function() {
            return typeof window.jQuery !== 'undefined';
        }
    ], run);

    // Full Story Integration
    UC.poller([
        function() {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
        }
    ], function () {
        window.FS.setUserVars({
            experiment_str: 'TP027',
            variation_str: 'Variation 1'
        });
    }, { multiplier: 1.2, timeout: 0 });

    function run() {
        var $ = window.jQuery;

        // --------------------------------------------------------------------
        // Tidy up top region
        // --------------------------------------------------------------------
        var ctasTop = $([
            '<div class="tp27_ctas-top">',
                '<a class="tp27_ctas-top__continue-link">Continue Shopping</a>',
            '</div>'
        ].join(''));

        $('#content .basket').prepend(ctasTop);

        $('#content .basket .basket_items .basket_ctas').prependTo(ctasTop);

        $('.tp27_ctas-top__continue-link').attr('href', $('.add-more-button:last a').attr('href'));

        $('#content .basket .cnt_mn_heading').after([
            '<p class="tp27_title-caption">' + _options.basketSubtitle + '</p>'
        ].join(''));

        // --------------------------------------------------------------------
        // Basket line images need to be larger - modify src to load in
        // higher res images
        // --------------------------------------------------------------------
        $('.baskt_item .itm_img img').each(function() {
          var src = $(this).attr('src'),
            newSrc = src.replace('?$thumbnail$', '');

          // 2017-04-05. DD. Image source modification 404'ing on some images
          //$(this).attr('src', newSrc);
        });

        // --------------------------------------------------------------------
        // Iterate over baskets, there may be more than one
        // (delivery / collection and order groups)
        //
        // Following applies to all baskets
        // --------------------------------------------------------------------
        $('.pickup-order-group, .delivery-order-group').each(function() {
            // Text nodes that don't have any wrapping elements
            $.each(getChildrenTextNodes($(this).find('.itm_time')), function(idx, value) {
                $(this).wrapAll('<div class="tp27_text-node" />');
            });

            // Rebuild each line markup with wrapping elms
            $(this).find('.baskt_item').each(function(idx, val) {
                $(this).addClass('clearfix');

                $(this).find('.itm_img').wrap('<div class="tp27_basket-item-image"></div>');

                $(this).find('.itm_info, .itm_optns, .itm_price, .itm_total').wrapAll(
                    '<div class="tp27_basket-item-content"></div>'
                );

                var removeLink = $(this).find('.itm_remove');
                removeLink.html('<span>' + _options.itemDeleteText + '</span>');

                var productCode = $(this).find('.itm_info .item_code');
                productCode.html(
                    '<span class="normal">' + productCode.find('span').text() + '</span>'
                );

                var itemPrice = $(this).find('.itm_price');
                itemPrice.prepend('<p class="tp27_item_price-heading">' + _options.itemPriceHeadingText + '</p>');

                var totalPrice = $(this).find('.itm_total');
                totalPrice.prepend('<p class="tp27_total_price-heading">' + _options.totalPriceHeadingText + '</p>');

                $(this).find('.collection-entry-button, .delivery-entry-button, .move-cart-entry-button').each(function() {
                    $(this).append([ '<i class="fa fa-circle"></i>' ].join(''));
                });

                // If checkbox clicked, trigger faux click on move cart entry button
                $(this).find('.move-cart-entry-button .fa-circle').click(function() {
                    $(this).find('.move-cart-entry-button a:first').trigger('click');
                });
            });
        });

        // --------------------------------------------------------------------
        // Delivery basket-specific amends (all delivery order groups)
        // --------------------------------------------------------------------
        $('.delivery-order-group').each(function() {
            $(this).find('.consignment-header').appendTo($(this).find('.delivery-entry-button'));

            $(this).find('.baskt_item').each(function(idx, val) {
                $(this).find('.tp27_text-node').prepend('<span>' + _options.estimatedDeliveryText + '</span>')
                    .appendTo($(this).find('.itm_time .delivery-entry-button'));
            });
        });

        // --------------------------------------------------------------------
        // Collection basket-specific amends (all collection order groups)
        // --------------------------------------------------------------------
        $('.pickup-order-group').each(function() {
            $(this).find('.consignment-header').prependTo($(this).find('.collection-entry-button'));

            $(this).find('.itm_time').addClass('tp27_pickup');

            $(this).find('.baskt_item').each(function(idx, val) {
                $(this).find('.collection-entry-button .collection-entry-wrap .headInfo').appendTo(
                    $(this).find('.collection-entry-button .collection-entry-wrap')
                );
            });
        });

        // --------------------------------------------------------------------
        // Wording
        // --------------------------------------------------------------------
        $('.checkoutButton[title=Checkout]').text('Continue Securely');

        $('.add-more-button a').text('Continue Shopping');
        $('.move-cart-entry-button .title').each(function() {
            if($(this).text().trim() == 'Collect?') {
                $(this).text('Change for collection');
            }
            if($(this).text().trim() == 'Deliver?') {
                $(this).text('Change to delivery');
            }
        });

        // --------------------------------------------------------------------
        // Basket Totals
        // --------------------------------------------------------------------
        $('.total_price_wrapper').append([
            '<div class="tp27_vat-toggle-container">',
                '<span class="tp27_vat-toggle-container__label">Include VAT</span>',
                '<div class="tp27_vat-toggle tp27_vat-toggle--active">',
                    '<span class="tp27_vat-toggle__rocker"></div>',
                '</div>',
            '</div>'
        ].join(''));
                $('.tp27_vat-toggle').on('click', function() {
            $(this).toggleClass('tp27_vat-toggle--active');
            if($(this).hasClass('tp27_vat-toggle--active')) {
                toggleVat(true);
            } else {
                toggleVat(false);
            }
        });

        var vatValue = parseFloat($('.basketVAT .sessioncamhidetext').text().replace(',', '').match(/\d+(\.\d+)?/g));
        var totalPriceElm = $('.total_price_wrapper .basketTotalPrice .sessioncamhidetext');
        var totalIncVat = parseFloat(totalPriceElm.text().trim().replace('£', '').replace(',', ''));
      
        var deliveryRow = $('.total_price_wrapper .basketDelivery');
        var deliveryElm = $('.total_price_wrapper .basketDelivery .sessioncamhidetext');
        var deliveryIncVat = parseFloat(deliveryElm.text().trim().replace('£', '').replace(',', ''));
        var deliveryBeforeVat = deliveryIncVat / 1.2;
      
        var totalBeforeVat = totalIncVat - vatValue;
        if(deliveryIncVat && deliveryBeforeVat) {
            totalBeforeVat = totalIncVat - vatValue - (deliveryIncVat - deliveryBeforeVat);
        }
      
        totalPriceElm.attr('data-vat-inclusive', totalIncVat);
        totalPriceElm.attr('data-vat-exclusive', totalBeforeVat.toFixed(2));

        deliveryRow.attr('data-vat-inclusive', deliveryIncVat);
        deliveryRow.attr('data-vat-exclusive', deliveryBeforeVat.toFixed(2));


        /**
         * Helper toggle vat
         */
        function toggleVat(includeVat) {
            var totalPrice = $('.total_price_wrapper .basketTotalPrice .sessioncamhidetext');
            var deliveryPrice = $('.total_price_wrapper .basketDelivery .sessioncamhidetext');
            var vatRow = $('.total_price_wrapper .basketVAT');

            if(includeVat) {
                var price = formatMoney(totalPrice.attr('data-vat-inclusive'), 2, '.', ',', true);
                totalPrice.text(price);

                var deliveryPriceValue = formatMoney(deliveryRow.attr('data-vat-inclusive'), 2, '.', ',', true);
                deliveryRow.html(
                    'Delivery (Inc. VAT): <span class="sessioncamhidetext">' + deliveryPriceValue + '</span>'
                );

                vatRow.slideDown();
            } else {
                var price = formatMoney(totalPrice.attr('data-vat-exclusive'), 2, '.', ',', true);
                totalPrice.text(price);

                var deliveryPriceValue = formatMoney(deliveryRow.attr('data-vat-exclusive'), 2, '.', ',', true);
                deliveryRow.html(
                    'Delivery (Ex. VAT): <span class="sessioncamhidetext">' + deliveryPriceValue + '</span>'
                );

                vatRow.slideUp();
            }
        }
      
        // If the VAT = £0.00, force hide the VAT toggle
        if(!vatValue) {
          $('.tp27_vat-toggle-container').hide(); 
        }

        // --------------------------------------------------------------------
        // Other considerations
        // --------------------------------------------------------------------
        $('#content .basket .basket_ctas:last').addClass('tp27_end-actions');

        // --------------------------------------------------------------------
        // TP027 specific changes...
        // --------------------------------------------------------------------
        
        // Delivery Info
        var deliveryInfo = $([
            '<div class="tp27_delivery-info-container">',
                '<h2>',
                    '<img src="' + _options.imgDeliveryTruck + '" />',
                    _options.textDeliveryInfoTitle,
                '</h2>',
                '<div class="tp27_delivery-info-container__text">',
                    _options.textDeliveryInfoCopy,
                '</div>',
            '</div>'
        ].join(''));

        $('.basket .basket_items .delivery-time').prependTo(deliveryInfo);

        // Basket bottom container
        $('.basket > .total_price_wrapper, .tp27_end-actions').wrapAll('<div class="tp27_basket-bottom">');

        // Sidebar
        $('.tp27_basket-bottom').prepend([
            '<div class="tp27_basket-bottom-sidebar">',
            '</div>'
        ].join(''));

        $('.tp27_basket-bottom-sidebar').prepend(deliveryInfo);

        // Boxed continue frame
        var paySecurelyBox = $([
            '<div class="tp27_pay-securely">',
                '<h2 class="tp27_pay-securely-title">',
                    _options.textPaySecurely,
                    '<img src="' + _options.imgPadlock + '" />',
                '</h2>',
                '<div class="tp27_pay-securely-button-wrapper">',
                '</div>',
                '<p class="tp27_pay-securely-card-logos">',
                '</p>',
            '</div>'
        ].join(''));
        $.each(_options.cardLogos, function(idx, cardLogo) {
            paySecurelyBox.find('.tp27_pay-securely-card-logos').append(
                '<img src="' + cardLogo.img + '" title="' + cardLogo.title + '" alt="' + cardLogo.title + '" />'
            );
        });

        $('.tp27_basket-bottom .basket_ctas a.checkoutButton')
            .appendTo(paySecurelyBox.find('.tp27_pay-securely-button-wrapper'))
            .removeClass('checkoutButton');

        $('.tp27_basket-bottom .total_price_wrapper').append(paySecurelyBox);

        // Secure badges
        var secureBox = $([
            '<div class="tp27_secure-box">',
                '<p>' + _options.textSecure + '</p>',
                '<div class="tp27_secure-box-logos">',
                '</div>',
            '</div>'
        ].join(''));
        $.each(_options.secureLogos, function(idx, secureLogo) {
            secureBox.find('.tp27_secure-box-logos').append(
                '<img src="' + secureLogo.img + '" title="' + secureLogo.title + '" alt="' + secureLogo.title + '" />'
            );
        });
        $('.tp27_basket-bottom-sidebar').append(secureBox);

        // Spend £xx.xx to qualify for free delivery
        // NB only apply to orders where standard delivery is applicable (i.e. non-bulky or special products)
        // condition for this is that the delivery price is £5.00
        var subtotalValue = parseFloat( $('.basketSubtotal .sessioncamhidetext').text().replace(/[£,]/, '') );

        var standardDeliveryApplies = false;
        var deliveryAmount = parseFloat( $('.basketDelivery .sessioncamhidetext').text().replace(/[£,]/, '') );
        if(deliveryAmount.toFixed(2) == 5.00) {
            standardDeliveryApplies = true;
        }

        var freeDeliveryRequiredSpend = _options.freeDeliveryThreshold - subtotalValue;
        freeDeliveryRequiredSpend = freeDeliveryRequiredSpend.toFixed(2);

        if(standardDeliveryApplies) {
            var spendBox = $([
                '<div class="tp27_free-delivery-spend">',
                    'Spend £' + freeDeliveryRequiredSpend + ' more to qualify for free delivery',
                '</div>'
            ].join(''));
            $('.basketTotalPrice').before(spendBox);
        }

        // -----------------------------------------------------------
        // Events
        // -----------------------------------------------------------
        var trackerName = ga.getAll()[0].get('name');
        $('.move-cart-entry-button').click(function() {
           var title = $(this).find('.title').text();
           if(title.indexOf('delivery') >= 0) {
             ga(trackerName + '.send', 'event', 'TP027---Basket---Change-to-delivery', 'Click', 'TP027---Basket---Change-to-delivery');
           } else if(title.indexOf('collection') >= 0) {
             ga(trackerName + '.send', 'event', 'TP027---Basket---Change-to-collection', 'Click', 'TP027---Basket---Change-to-collection', {nonInteraction: 1});
           }
        });
        $('.delivery-entry-button .change-postcode').click(function() {
            ga(trackerName + '.send', 'event', 'TP027---Basket', 'Click-Change-Postcode', '', {
                nonInteraction: true
            });
        });
        $('.tp27_vat-toggle').click(function() {
            ga(trackerName + '.send', 'event', 'TP027---Basket', 'Click-Toggle-VAT',  '', {
                nonInteraction: true
            });
        });
        $('.tp27_ctas-top__continue-link, .tp27_end-actions .add-more-button .active').click(function() {
            ga(trackerName + '.send', 'event', 'TP027---Basket', 'Click-ContinueShopping', '', {
                nonInteraction: true
            });
        });
        $('.checkoutButton.active').click(function() {
            ga(trackerName + '.send', 'event', 'TP027---Basket', 'click-checkout-button', '', {
                nonInteraction: true    
            });
        });
        $('.tp27_pay-securely-button-wrapper a').click(function() {
            ga(trackerName + '.send', 'event', 'TP027---Basket', 'click-checkout-button', 'framed', {
                nonInteraction: true    
            });
        });

        if(standardDeliveryApplies) {
            ga(trackerName + '.send', 'event', 'TP027---Basket', 'Did-Show-Spend-To-Qualify-Box', '', {
                nonInteraction: true
            });
        }
    }

    /**
     * Helper money formatting
     */
    function formatMoney(n, decimalPlaces, period, comma, withSymbol){
                var c = isNaN(decimalPlaces = Math.abs(decimalPlaces)) ? 2 : decimalPlaces,
                  d = period == undefined ? "." : period,
                  t = comma == undefined ? "" : comma,
                  s = n < 0 ? "-" : "",
                  i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
                  j = (j = i.length) > 3 ? j % 3 : 0;

                var result = s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t)
                  + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");

                if(withSymbol) {
            result = '£' + result;
                }

                return result;
    };

    /**
     * Helper for getting children text nodes
     */
    function getChildrenTextNodes(el) {
                return el.andSelf().contents().filter(function() {
                        return this.nodeType == 3
                                && el.hasClass(this.parentNode.className)
                && this.textContent.trim();
                });
        };

})();
