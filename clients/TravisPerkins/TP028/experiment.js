// ----------------------------------------------------
// TP028 Category Best sellers
// ----------------------------------------------------
var TP028 = (function() {
    if(document.body.classList && document.body.classList.contains('TP028')) {
        return;
    }

    // UC library poller
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    // Helper send events
    var trackerName;
    function sendEvent(action, label, dimensionValue, dimensionName) {

        var category = 'TP028---Category-Bestsellers-Dekstop';
        var nonInteractionValue = true;

        var fire = function (tracker) {
            var options = {};
            options.nonInteraction = nonInteractionValue;
            if(dimensionValue && dimensionName){
                options['dimension' + dimensionValue] = dimensionName;
            }
            window.ga(tracker + '.send', 'event', category, action, label, options);
        };

        if (trackerName) {
            fire(trackerName);
        } else {
            UC.poller([
                function () {
                    return window.ga.getAll;
                }
            ], function () {
                trackerName = window.ga.getAll()[0].get('name');
                fire(trackerName);
            });
        }
    }

    // Full Story Integration
    UC.poller([
     function() {
         var fs = window.FS;
         if (fs && fs.setUserVars) return true;
     }
    ], function () {
     window.FS.setUserVars({
         experiment_str: 'TP028',
         variation_str: 'Variation 1'
     });
    }, { multiplier: 1.2, timeout: 0 });

    // Setup
    document.body.classList.add('tp028');

    // ------------------------------------------------------------------------
    // Poll required elements
    //
    // Conditions:
    // - matching elements as usual
    // - we are on page 1 (?page=0)
    // - we are not filtering by any specific refinements
    // - there are at least 4 products
    // ------------------------------------------------------------------------
    UC.poller([
        '#products',
        function() {
            return !(getUrlParameter('page') !== null && getUrlParameter('page') >= 1);
        },
        function() {
            return !getUrlParameter('q');
        },
        function() {
            return document.querySelectorAll('#products .prod').length >= 4;
        },
        function () {
            if (window.jQuery) {
                return true;
            }
        }
    ], run);

    // ------------------------------------------------------------------------
    // Entry point for test
    // ------------------------------------------------------------------------
    function run() {
        // Setup
        $('body').addClass('tp28-showing-bestsellers');
        
        // Flag that test met conditions
        sendEvent('test-did-run', window.location.pathname);

        // Get Products
        // In the case where there are less than 6 products on the page, just use
        // the first 3 for bestsellers
        var products = $('#products .prod');
        var bestsellingProducts;

        if(products.length <= 6) {
            bestsellingProducts = products.slice(0,3);
            sendEvent('num-bestsellers-shown', 3);
        } else {
            bestsellingProducts = products.slice(0,6);
            sendEvent('num-bestsellers-shown', 6);
        }

        var catTitle = $('#breadcrumb li:last').text().trim();

        // Create a bestsellers container
        $('#products').before([
            '<div class="tp28-bestsellers-container clearfix">',
                '<div class="tp28-bestsellers-container__heading">',
                    '<h2>Best sellers for ' + catTitle + ' this week</h2>',
                '</div>',
                '<div class="tp28-bestsellers-container__products">',
                '</div>',
            '</div>'
        ].join(''));

        // Add products to container
        bestsellingProducts.appendTo('.tp28-bestsellers-container__products');

        // Layout amends
        $('.tp28-bestsellers-container .prod').each(function() {
            // Trade login link
            var tradeLoginLink = $(this).find('.logInForTradePricesLink');
            tradeLoginLink.prependTo($(this));

            // Bestseller label
            $(this).prepend([
                '<div class="tp28-bestsellers-label">',
                    'Bestseller',
                '</div>'
            ].join(''));

            // Click Event
            $(this).find('h4 a, .prod_img a').on('click', function() {
                sendEvent('clicked-bestsellers-product', '');
            });
        });

        // Big and bulky marker
        $('.tp28-bestsellers-container__products .prod').each(function() {
            var bb = $(this).find('.BigAndBulkyProductIcon'),
                prodImg = $(this).find('.prod_img:first');

            bb.css({
                'left': 'auto !important',
                'right': '0',
            });

            bb.appendTo(prodImg);
        });

        // Rating after price
        $('.tp28-bestsellers-container__products .prod').each(function() {
            var stars = $(this).find('.stars-block');
            stars.insertAfter($(this).find('.product_price_holder'));
        });
    }

    /**
     * Helper get url parameter
     */
    function getUrlParameter( name, url ) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( url );
        return results == null ? null : results[1];
    }
})();
