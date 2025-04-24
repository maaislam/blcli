var _ME114 = (function ($) {

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
            experiment_str: 'ME114',
            variation_str: 'Variation 1'
        });
    }, {multiplier: 1.2, timeout: 0});

    // Triggers ------------------------------------
    // ---------------------------------------------
    var _triggers = (function () {
        UC.poller([
            '.official-licensed-product',
            function () {
                return window.jQuery
            },
            function () {
                return window.ga
            }
        ], function () {
            // Prevent script from running twice on same page
            if (window.jQuery('body').hasClass('ME114')) {
                return false;
            } else {
                activate();
            }
        });
    })();

    // ---------------------------------------------
    function activate() {
        var $ = window.jQuery;
        $('body').addClass('ME114');

        var productInfo = $('.product');

        var data = (function () {
            var obj = {};

            switch (true) {
                case productInfo.hasClass('pa_brand-nintendo-legend-of-zelda'):
                    //obj.brand = 'Zelda';
                    obj.brand = 'Nintendo';
                    obj.logo = "//cdn.optimizely.com/img/3715372115/46dff34937bf400088fe123407b6d2e8.png";
                    sendEvent('ME114', 'ME114 Fired', 'ME114 Nintendo', true);
                    break;

                case productInfo.hasClass('pa_brand-guardians-of-the-galaxy'):
                    //obj.brand = 'Guardians of the Galaxy';
                    obj.brand = 'Marvel';
                    obj.logo = "//cdn.optimizely.com/img/3715372115/41f0d82a2e0e402c96531f240ec0c3a7.png";
                    sendEvent('ME114', 'ME114 Fired', 'ME114 Marvel', true);
                    break;


                case productInfo.hasClass('pa_brand-star-wars'):
                    //obj.brand = 'Star Wars';
                    obj.brand = 'Disney';
                    obj.logo = "//cdn.optimizely.com/img/3715372115/c77cc9775b3947c995e9a49e82e2bb8e.png";
                    sendEvent('ME114', 'ME114 Fired', 'ME114 Disney', true);
                    break;

                case productInfo.hasClass('pa_brand-arrow'):
                    //obj.brand = 'Arrow';
                    obj.brand = 'DC';
                    obj.logo = "//cdn.optimizely.com/img/3715372115/66ec20ad4185451e83dc8a058b3c74f5.png";
                    sendEvent('ME114', 'ME114 Fired', 'ME114 DC', true);
                    break;

                case productInfo.hasClass('pa_brand-dc-comics-batman'):
                    //obj.brand = 'Batman';
                    obj.brand = 'DC';
                    obj.logo = "//cdn.optimizely.com/img/3715372115/66ec20ad4185451e83dc8a058b3c74f5.png";
                    sendEvent('ME114', 'ME114 Fired', 'ME114 DC', true);
                    break;

                case productInfo.hasClass('pa_brand-dc-comics-superman'):
                    //obj.brand = 'Superman';
                    obj.brand = 'DC';
                    obj.logo = "//cdn.optimizely.com/img/3715372115/66ec20ad4185451e83dc8a058b3c74f5.png";
                    sendEvent('ME114', 'ME114 Fired', 'ME114 DC', true);
                    break;

                case productInfo.hasClass('pa_brand-captain-america'):
                    //obj.brand = 'Captain America';
                    obj.brand = 'Marvel';
                    obj.logo = "//cdn.optimizely.com/img/3715372115/41f0d82a2e0e402c96531f240ec0c3a7.png";
                    sendEvent('ME114', 'ME114 Fired', 'ME114 Marvel', true);
                    break;

                case productInfo.hasClass('pa_brand-marvel'):
                    obj.brand = 'Marvel';
                    obj.logo = "//cdn.optimizely.com/img/3715372115/41f0d82a2e0e402c96531f240ec0c3a7.png";
                    sendEvent('ME114', 'ME114 Fired', 'ME114 Marvel', true);
                    break;

                case productInfo.hasClass('pa_brand-dc-comics'):
                    obj.brand = 'DC';
                    obj.logo = "//cdn.optimizely.com/img/3715372115/66ec20ad4185451e83dc8a058b3c74f5.png";
                    sendEvent('ME114', 'ME114 Fired', 'ME114 DC', true);
                    break;

                default:
                    obj = false;
                    break;
            }

            return obj;
        })();

        // Exit function if product doesn't match any brand
        if (!data) return false;

        var $pricesContainer = $('.product-info.large-6.small-12.columns.left').find('.price.large');
        var $priceAmount,
            $pricePreviousAmount,
            $priceAmountText;
        // Check if product is on sale or not
        if ($pricesContainer.find('del').length && $pricesContainer.find('ins').length) {
            $pricePreviousAmount = $pricesContainer.find('del').find('.woocommerce-Price-amount.amount');
            $priceAmount = $pricesContainer.find('ins').find('.woocommerce-Price-amount.amount');
            $priceAmountText = $priceAmount.text();
        } else {
            $priceAmount = $pricesContainer.find('.woocommerce-Price-amount.amount');
            $priceAmountText = $priceAmount.text();
        }

        $priceAmount.html('<span class="ME114_contentPriceWrapper">Now <span class="ME114_priceAmount"></span>' +
            '<br />for this genuine <span class="ME114_brandSpecific"></span> merchandise</span>');

        $('.price-extra-info').prepend('Price ');

        // In case product is on sale (show previous price)
        $('.ME114_priceAmount').text($priceAmountText);
        if ($pricePreviousAmount) {
            $pricesContainer.find('del').insertBefore($pricesContainer);
            $pricePreviousAmount.prepend('Was ');
        }

        $('.ME114_brandSpecific').html('<img src="' + data.logo + '" alt="' + data.brand + '" />');

        // Add shimmer effect
        $('.official-licensed-product span').addClass('ME114_shimmer');

    } // activate

})(); // ME114