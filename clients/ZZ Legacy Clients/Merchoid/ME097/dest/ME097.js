var ME097 = (function () {

    // PLUGINS
    // UC Library - Poller -- @version 0.2.2
    var UC = function (a) {
        return a.poller = function (a, b, c) {
            var d = {wait: 50, multiplier: 0, timeout: 7000}, e = Date.now || function () {
                return (new Date).getTime()
            };
            if (c) for (var f in c) d[f] = c[f]; else c = d;
            for (var g = !!d.timeout && new Date(e() + d.timeout), h = d.wait, i = d.multiplier, j = [], l = function (c, d) {
                if (g && e() > g) return !1;
                d = d || h, function () {
                    var a = typeof c;
                    return "function" === a ? c() : "string" !== a || document.querySelector(c)
                }() ? (j.push(!0), j.length === a.length && b()) : setTimeout(function () {
                    l(c, d * i)
                }, d)
            }, m = 0; m < a.length; m++) l(a[m])
        }, a
    }(UC || {});

    // Send GA Events With Tracker Name
    var trackerName;

    function sendEvent(category, action, label, nonInteractionValue, dimensionValue, dimensionName) {
        var fire = function (tracker) {
            var options = {};
            options.nonInteraction = nonInteractionValue;
            if (dimensionValue && dimensionName) {
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

    // Full Story Tagging
    UC.poller([
        function() {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
        }
    ], function () {
        window.FS.setUserVars({
            experiment_str: 'ME097',
            variation_str: 'Variation 1 Desktop'
        });
    }, { multiplier: 1.2, timeout: 0 });

    // ----------------------------------------

    var _triggers = (function () {
        UC.poller([
            function () {
                return window.jQuery;
            },
            function () {
                return window.ga;
            }
        ], activate);
    })();

    function activate() {
        var $ = window.jQuery;
        var $body = $('body');
        $body.addClass('ME097');

        // Static banner template
        var $staticBanner = $([
            '<div class ="ME097_wrapper">',
                '<div class="ME097_left_side"></div>',
                '<div class="ME097_right_side ME097_right_side_uk">',
                    '<p class="ME097_header"></p>',
                    '<p class="ME097_content"></p>',
                '</div>',
            '</div>'
        ].join(''));

        // Insert the banner into the page
        $staticBanner.insertAfter($body.find('.page-wrapper'));

        // Display different banners to the users based on location (US/GB)
        var $message = 'GB';
        // window.optimizely.data.visitor.location === 'US'
        // window.optimizely.data.visitor.location === 'GB'
        if ($message === 'US') {
            $('.ME097').find('.ME097_left_side').css("background-image", "url(https://ab-test-sandbox.userconversion.com/experiments/ME097-us_flag.png)");
            $('.ME097').find('.ME097_header').html('Now Shipping from our US warehouse');
            $('.ME097').find('.ME097_content').html('Get your order in just 2 - 3 days*');
        } else if ($message === 'GB') {
            $('.ME097').find('.ME097_left_side').css("background-image", "url(https://ab-test-sandbox.userconversion.com/experiments/ME097-uk_flag.png)");
            $('.ME097').find('.ME097_header').html('Merchoid are UK through and through');
            $('.ME097').find('.ME097_content').html('Collected, delivered in the UK. Inspired by the US.');
        }

    } // activate

}());