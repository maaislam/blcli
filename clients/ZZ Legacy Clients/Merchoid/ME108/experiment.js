var _ME108 = (function () {

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
            experiment_str: 'ME108',
            variation_str: 'Variation 1 Mobile'
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
        ], function () {
            // Prevent script from running twice on same page
            if ($('body').hasClass('ME108')) {
                return false;
            } else {
                activate();
            }
        });
    })();

// ---------------------------------------------
    function activate() {
        var $ = window.jQuery;
        var $body = $('body');
        $body.addClass('ME108');

        if ($('.cart-empty').is(':visible')) {
            return;
        }

        $('<div class="ME108_revealOrder">Your order: <span></span></div>').prependTo('.ME108');
        var $orderTotal = $('.order-review.woocommerce-checkout-review-order.hide-for-small')
            .find('.shop_table.woocommerce-checkout-review-order-table .order-total .woocommerce-Price-amount.amount:eq(0)').text();
        $('.ME108_revealOrder span').text($orderTotal);

        $orderInfo = $('.order-review.woocommerce-checkout-review-order.hide-for-small');
        $('.ME108_revealOrder').on('click', function() {
            $orderInfo.toggleClass('ME108_active');
            $('.ME108_revealOrder').toggleClass('ME108_arrow_down');
            if ($('.ME108_active').is(':visible')) {
                $('.ME108').css('overflow', 'hidden');
                $('.ME108_active').slideDown('slow');
                sendEvent('ME108', 'Clicked on basket');
            }
            else  {
                $('.ME108').css('overflow', 'scroll');
                $('.ME108_active').slideUp('slow');
            }
        });

    } // activate

}()); // _ME108