// ----------------------------------------------------
// TP023 Mobile Timber / Doors width and lengths available
// ----------------------------------------------------
var TP023 = (function() {
    // ----------------------------------------------------
    // Vars
    // ----------------------------------------------------
    var $;
    
    // ----------------------------------------------------
    // Prevent test running twice Monetate set up issue
    // ----------------------------------------------------
    if(document.body.classList.contains('tp023')) {
        return;
    }

    // ----------------------------------------------------
    // UC library poller
    // ----------------------------------------------------
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    // ----------------------------------------------------
    // Helper send events
    // ----------------------------------------------------
    var trackerName;
    function sendEvent(action, label, dimensionValue, dimensionName) {

        var category = 'TP023---Widths-Lengths-Available';
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

    // ----------------------------------------------------
    // Full Story Integration
    // ----------------------------------------------------
    UC.poller([
     function() {
         var fs = window.FS;
         if (fs && fs.setUserVars) return true;
     }
    ], function () {
     window.FS.setUserVars({
         experiment_str: 'TP023---Widths-Lengths-Aavailable',
         variation_str: 'Variation 1'
     });
    }, { multiplier: 1.2, timeout: 0 });

    // Setup
    document.body.classList.add('tp023');

    // ------------------------------------------------------------------------
    // Poll required elements
    // ------------------------------------------------------------------------
    UC.poller([
        function() {
            if (window.jQuery) {
                return true;
            }
        },
        '.tp_prodView .product_item .ui-link'
    ], function() {
        $ = window.jQuery;

        run();
    });

    /**
     * Entry point for test
     */
    function run() {
        var title = $('.tp_infoWrapper h1').text().trim();
        var pagesToTarget = [
            'Exterior Hardwood Doors',
            'Exterior Softwood Doors',
            'Interior Fire Doors',
            'Exterior Fire Doors',
            'Interior Hardwood Doors',
            'Interior Moulded Doors',
            'Interior Softwood Doors',
            'Interior Flush Doors',
            'Interior Bi-Fold Doors'
        ];

        if(pagesToTarget.indexOf(title) == -1) {
            return;
        }

        var currentUrl = window.location.href;

        var targetDesktopUrl = addUrlParameter(currentUrl, 'uiel', 'Desktop');
        targetDesktopUrl = addUrlParameter(targetDesktopUrl, 'show', 'All');

        var targetMobileUrl = addUrlParameter(currentUrl, 'uiel', 'Mobile');

        getValuesInDesktopPageSelect(targetDesktopUrl, targetMobileUrl).then(function(optionStrings) {
            // Reset back to mobile, as requesting a desktop link would otherwise force
            // future page views to be desktop rather than mobile
            $.ajax({
              type: 'get',
              url: targetMobileUrl
            });

            // Set option strings
            for(var i = 0, ii = optionStrings.length; i < ii; i++) {
                var correspondingProduct =  $('.tp_prodView .product_item').eq(i).find('.ui-link');
                var optionStringsMapped = optionStrings[i].map(function(s) {
                    return s.replace(/\s/, '');
                });
                if(optionStringsMapped.length) {
                    correspondingProduct.append([
                        '<div class="tp23-available-units">',
                            '<span>',
                                'Available Widths: ',
                            '</span>',
                            '<em> ',
                                optionStringsMapped.join(', '),
                            '</em>',
                        '</div>'
                    ].join(''));
                }
            }

            // Send event flagging that products did show 
            sendEvent('available-widths-did-show');
        });
    }

    /**
     * Helper function retrieve values in select
     *
     * @return Promise
     */
    function getValuesInDesktopPageSelect(targetDesktopUrl, targetMobileUrl) {
        var deferred = $.Deferred();

        getCorrespondingDesktopData(targetDesktopUrl, targetMobileUrl).then(function(data) {
            var d = document.createElement('div');
            d.innerHTML = data;

            var s = $(d).find('#products .prod');
            var optionStrings = [];
            s.each(function(idx,elm ) {
                var options = $(this).find('.variant_select select option');
                var optionString = [];
                options.each(function() {
                   if($(this).val()) {
                       var t = $(this).text();
                       optionString.push( t.trim() );
                   }
                });
                optionStrings.push(optionString);
            });

            deferred.resolve(optionStrings);
        });

        return deferred.promise();
    }

    /**
     * Helper get request
     */
    function getCorrespondingDesktopData(targetDesktopUrl, targetMobileUrl) {
        var promise = $.ajax({
          type: 'get',
          url: targetDesktopUrl
        });

        return promise;
    }

    /**
     * Helper Get a text value in the breadcrumb to see if it exists
     */
    function breadcrumbSegmentExists(text) {
        var exists = false;
        $('#breadcrumb .tp_bread_link').each(function() {
            var thisText = $(this).text().trim();
            thisText = thisText.replace('&nbsp;', '');
            if(thisText === text) {
                exists = true;
                return true;
            }
        });
        return exists;
    }

    /**
     * Helper add url parameer
     */
    function addUrlParameter(url, parameterName, parameterValue, atStart/*Add param before others*/) { 
        var replaceDuplicates = true;
        var cl, urlhash;

        parameterName = encodeURIComponent(parameterName);
        parameterValue = encodeURIComponent(parameterValue);

        if (url.lastIndexOf('#') > 0) {
            cl = url.lastIndexOf('#');
            urlhash = url.substring(cl, url.length);
        } else {
            urlhash = '';
            cl = url.length;
        } 

        var sourceUrl = url.substring(0, cl);
        var urlParts = sourceUrl.split("?");
        var newQueryString = "";

        if (urlParts.length > 1) {
            var parameters = urlParts[1].split("&");
            for (var i=0; (i < parameters.length); i++) {
                var parameterParts = parameters[i].split("=");
                if (!(replaceDuplicates && parameterParts[0] === parameterName)) {
                    if (newQueryString === "") {
                        newQueryString = "?";
                    } else {
                        newQueryString += "&";
                    }
                    newQueryString += parameterParts[0] + "=" + (parameterParts[1]?parameterParts[1]:'');
                }
            }
        } 

        if (newQueryString === "") {
            newQueryString = "?";
        }

        if (atStart) {
            newQueryString = '?'+ parameterName + "=" + parameterValue + (newQueryString.length>1?'&'+newQueryString.substring(1):'');
        } else {
            if (newQueryString !== "" && newQueryString != '?') {
                newQueryString += "&";
            }
            newQueryString += parameterName + "=" + (parameterValue?parameterValue:'');
        }
        return urlParts[0] + newQueryString + urlhash;
    }

})();
