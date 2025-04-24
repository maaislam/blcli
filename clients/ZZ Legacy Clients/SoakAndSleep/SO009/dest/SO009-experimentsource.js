var _SO009 = (function () {

    // PLUGINS ------------------------------------

    // UC Library - Poller -- @version 0.2.2
    // ---------------------------------------------
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    // Send GA Events With Tracker Name -----------
    // ---------------------------------------------
    function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}var trackerName;

    // Full Story Tagging --------------------------
    // ---------------------------------------------
    UC.poller([
        function () {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
        }
    ], function () {
        window.FS.setUserVars({
            experiment_str: 'SO009',
            variation_str: 'Variation 1 All'
        });
    }, {multiplier: 1.2, timeout: 0});

    // Triggers ------------------------------------
    // ---------------------------------------------
    var _triggers = (function () {
        UC.poller([
            function () {
                return window.jQuery
            },
            function () {
                return window.ga
            }
        ], activate)
    })();

    // ---------------------------------------------
    function activate() {
        var $ = window.jQuery;
        var $body = $('body');

        // Only show to shoppers in the UK
        var countryCode = window.sg_api.lib.lsGetdata('Website', 'geoData').countryCode;
        if (countryCode !== 'GB') {
            return;
        }

        $body.addClass('SO009');

        if (location.href.indexOf('checkout/cart') > - 1) {
            var $basketValue;
            UC.poller([
                '#block-upsell-heading',
                '#cart-totals',
                '#cart-totals .grand.totals > .amount .price'
            ], function () {
                // Only show to users who's basket value is under £50
                var $cartTotalsWrapper = $('#cart-totals');
                $basketValue = $cartTotalsWrapper.find('.grand.totals > .amount .price').text().trim().substring(1);
                if ($basketValue > 50) {
                    return;
                }
                basketPage();
            });
        } else if (location.href.indexOf('checkout') > -1) {
            var $totalValue;
            UC.poller([
                '.price-including-tax .cart-price .price',
                '.back-to-cart',
                '.checkout-index-index'
            ], function () {
                // Only show to users who's basket value is under £50
                $totalValue = $('.price-including-tax .cart-price .price').text().trim().substring(1);
                if ($totalValue > 50) {
                    return;
                }
                checkoutPage();
            });
        }

        function basketPage() {
            $('#maincontent').find('.column.main')
                .append('<p class="SO009_dontLike">Don\'t see anything you like?</p>' +
                    '<p class="SO009_checkThis">See <a href="https://www.soakandsleep.com/clearance">Clearance</a> items</p>');

            var $moneyAway = (50 - $basketValue).toFixed(2);
            var $textHeader = "You're £" + $moneyAway + " away from qualifying for free delivery. Why not add one of these Soak & Sleep favourites and pay nothing for delivery:<br \><span>(UK mainland delivery starts at £4.95)</span>";

            $('#block-upsell-heading').html($textHeader);

            $('.product-image-wrapper, .product-item-link').on('click', function () {
                sendEvent('SO009', 'User clicked cross sell element in the basket', 'SO009 - FREE delivery cross sell', true);
            });
        }

        function checkoutPage() {
            var $awayMoney = (50 - $totalValue).toFixed(2);
            var $returnToBasketText = "You're £" + $awayMoney + " away from qualifying for free delivery. To see offers tailored to you, <a class='SO009_checkoutBack' href='cart'>go back to basket -></a>";
            $('.back-to-cart').hide().before('<p class="SO009_checkoutBackContainer">' + $returnToBasketText + '</p>');

            $('.SO009_checkoutBack').on('click', function () {
                sendEvent('SO009', 'User clicked back to basket button', 'SO009 - FREE delivery cross sell', true);
            });
        }

        sendEvent('SO009', 'Page View', 'SO009 - FREE delivery cross sell', true);

    } // activate

}()); // _SO009