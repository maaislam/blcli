var _IT026 = (function () {

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
        '#pd-0',
        function () {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
        }
    ], function () {
        window.FS.setUserVars({
            experiment_str: 'IT026',
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
        $body.addClass('IT026');

        // Only works on product pages
        if (!$('.catalog-product-view').length) {
            return;
        }

        // Get the listed texted in the description (and check if it contains a 'Model is'). If not, nothing happens.
        var $descriptionTextContainer = $('#product-view-details').find('.accordion-navigation').find('#pd-0')
            .children('ul').children('li');

        // Loop through the list in the description and fine if the required info exists
        $descriptionTextContainer.each(function (i) {
            var $this = $(this);
            var $textIndividual = $this.text();
            if ($textIndividual.indexOf('Model is ') > -1) {
                $('<p class="IT026_model">' + $textIndividual + '</p>').appendTo('.product-thumbnails-item');
            }
        });

    } // activate

}()); // _IT026