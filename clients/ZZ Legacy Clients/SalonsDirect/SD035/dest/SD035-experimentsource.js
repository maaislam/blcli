var _SD035 = (function () {

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
        '.SD035_img_wrapper',
        function () {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
        }
    ], function () {
        window.FS.setUserVars({
            experiment_str: 'SD035',
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
        ], activate
        );
    })();

    // ---------------------------------------------
    function activate() {
        var $ = window.jQuery;
        var $body = $('body');
        $body.addClass('SD035');

        // Only run on homepage
        if(!$body.hasClass('cms-home')) {
            return;
        }

        // Container for the category images
        var $imagesWrapper = $([
            '<div class="SD035_img_wrapper">',
                '<a href="/new-in"><img src="https://ab-test-sandbox.userconversion.com/experiments/SD035-NewIn.jpg" alt="New In"></a>',
                '<a href="/hair-colour"><img src="https://ab-test-sandbox.userconversion.com/experiments/SD035-HairColour.jpg" alt="Hair Colour"></a>',
                '<a href="/hair"><img src="https://ab-test-sandbox.userconversion.com/experiments/SD035-Hair.jpg" alt="Hair"></a>',
                '<a href="/beauty"><img src="https://ab-test-sandbox.userconversion.com/experiments/SD035-Beauty.jpg" alt="Beauty"></a>',
                '<a href="/nails"><img src="https://ab-test-sandbox.userconversion.com/experiments/SD035-Nails.jpg" alt="Nails"></a>',
                '<a href="/barbers"><img src="https://ab-test-sandbox.userconversion.com/experiments/SD035-Barbers.jpg" alt="Barbers"></a>',
                '<a href="/furniture"><img src="https://ab-test-sandbox.userconversion.com/experiments/SD035-Furniture.jpg" alt="Furniture"></a>',
                '<a href="/offers"><img src="https://ab-test-sandbox.userconversion.com/experiments/SD035-Offers.jpg" alt="Offers"></a>',
                '<a href="/brands"><img src="https://ab-test-sandbox.userconversion.com/experiments/SD035-Brands.jpg" alt="Brands"></a>',
                '<a href="/clearance"><img src="https://ab-test-sandbox.userconversion.com/experiments/SD035-Clearance.jpg" alt="Clearance"></a>',
            '</div>'
        ].join(''));

        $imagesWrapper.insertAfter('.slider-container');

        sendEvent('SD035', 'Page View', 'SD035---SD035 - Mobile Homepage redesign---V1', true);

        // Event with action stating when users clicked on desired category
        $('.SD035_img_wrapper a').on('click', function() {
            var $getHrefAttr = $(this).attr('href');
            sendEvent('SD035', 'Clicked on ' + $getHrefAttr.substring(1), true);
        });

        console.log("aaa");

    } // activate

}()); // SD035