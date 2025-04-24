var _WB043 = (function () {

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
        '.WB043_map_second',
        function () {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
        }
    ], function () {
        window.FS.setUserVars({
            experiment_str: 'WB043',
            variation_str: 'Variation 1 Desktop/Mobile/Tablet'
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
            if ($('body').hasClass('WB043')) {
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
        $body.addClass('WB043');

        var $productInfoContainer = $('#product-info-accordion');
        var $desiredContainer = $productInfoContainer.find('.accordion-group:eq(0)');
        $desiredContainer.find('.accordion-notoggle-heading').text('RESERVE IN STORE');


        var $buildHtml = $([
            '<div class="WB043_wrapper">',
                '<p class="WB043_message">You can reserve this item for free to try on in store</p>',
                '<span class="WB043_imageWrapper"></span>',
                '<div class="WB043_timetableLocSpecific">',
                    '<div class="WB043_firstLocWrapper">',
                        '<p class="WB043_locAndMapDisplay"><br /><a href="#" target="_blank" class="WB043_map">View Map</a></p>',
                        '<div class="WB043_firstTimetable"></div>',
                        '<div class="WB043_reserveContainer">',
                            '<button class="WB043_reserve_btn">RESERVE</button>',
                            '<span class="WB043_reserve_msg">Reserve for free to view and wear in store*</span>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>'
        ].join(''));

        // Include the structure of the test in the relevant place
        $buildHtml.prependTo($desiredContainer.find($('.accordion-inner')));

        // Find out the location where the product is available
        var $locationArray = ['/stores/notting-hill-london/', '/stores/mayfair-london/', '/stores/soho-new-york/'];
        var $spanWithLocation = $desiredContainer.find('.signs').find('span');
        var $locationName = $('.WB043_locAndMapDisplay');
        var $timetableLoader = $('.WB043_timetableLocSpecific');
        var $firstTimetable = $('.WB043_firstTimetable');

        var $secondlocAndMapDisplay = $([
            '<div class="WB043_secondLocWrapper">',
                '<p class="WB043_secondLocAndMapDisplay"><br /><a href="#" target="_blank" class="WB043_map_second">View Map</a></p>',
            '</div>'
        ].join(''));
        var $secondTimetable = $('<div class="WB043_secondTimetable"></div>');
        var $secondReserveButton = $([
            '<div class="WB043_reserveContainer">',
            '<button class="WB043_reserve_btn WB043_reserve_btnSecond">RESERVE</button>',
            '<span class="WB043_reserve_msg">Reserve for free to view and wear in store*</span>',
            '</div>'
        ].join(''));

        // Remember the stores
        var storeFirst = "",
            storeSecond = "";

        function getLocation() {
            if ($spanWithLocation.hasClass('wab-storeimage--NH') && $spanWithLocation.hasClass('wab-storeimage--M')) {
                $locationName.prepend('<span class="WB043_wolfHead">Wolf & Badger</span><br />Notting Hill ');
                $firstTimetable.insertAfter($locationName);
                storeFirst = "Notting Hill";
                $firstTimetable.load('/stores/notting-hill-london/ .bottom-left table', function () {
                    $secondlocAndMapDisplay.children(':first').prepend('<span class="WB043_wolfHead">Wolf & Badger</span><br />Mayfair ');
                    storeSecond = "Mayfair";
                    $secondlocAndMapDisplay.appendTo($timetableLoader);
                    $('.WB043_map_second').attr('href', $locationArray[1]);
                    $secondTimetable.appendTo($secondlocAndMapDisplay);
                    $secondReserveButton.appendTo($secondlocAndMapDisplay);
                });
                $secondTimetable.load('/stores/mayfair-london/ .bottom-left table');
                return $locationArray[0];
            } else if ($spanWithLocation.hasClass('wab-storeimage--NH') && $spanWithLocation.hasClass('wab-storeimage--SOHO_NY')) {
                $locationName.prepend('<span class="WB043_wolfHead">Wolf & Badger</span><br />Notting Hill ');
                $firstTimetable.insertAfter($locationName);
                storeFirst = "Notting Hill";
                $firstTimetable.load('/stores/notting-hill-london/ .bottom-left table', function () {
                    $secondlocAndMapDisplay.children(':first').prepend('<span class="WB043_wolfHead">Wolf & Badger</span><br />New York ');
                    storeSecond = "New York";
                    $secondlocAndMapDisplay.appendTo($timetableLoader);
                    $secondTimetable.appendTo($secondlocAndMapDisplay);
                    $secondReserveButton.appendTo($secondlocAndMapDisplay);
                    $('.WB043_map_second').attr('href', $locationArray[2]);
                });
                $secondTimetable.load('/stores/soho-new-york/ .bottom-left table');
                return $locationArray[0];
            } else if ($spanWithLocation.hasClass('wab-storeimage--M') && $spanWithLocation.hasClass('wab-storeimage--SOHO_NY')) {
                $locationName.prepend('<span class="WB043_wolfHead">Wolf & Badger</span><br />Mayfair ');
                $firstTimetable.insertAfter($locationName);
                storeFirst = "Mayfair";
                $firstTimetable.load('/stores/mayfair-london/ .bottom-left table', function () {
                    $secondlocAndMapDisplay.children(':first').prepend('<span class="WB043_wolfHead">Wolf & Badger</span><br />New York ');
                    storeSecond = "New York";
                    $secondlocAndMapDisplay.appendTo($timetableLoader);
                    $('.WB043_map_second').attr('href', $locationArray[2]);
                    $secondTimetable.appendTo($secondlocAndMapDisplay);
                    $secondReserveButton.appendTo($secondlocAndMapDisplay);
                });
                $secondTimetable.load('/stores/soho-new-york/ .bottom-left table');
                return $locationArray[1];
            }
            else if ($spanWithLocation.hasClass('wab-storeimage--NH')) {
                $locationName.prepend('<span class="WB043_wolfHead">Wolf & Badger</span><br />Notting Hill ');
                $firstTimetable.insertAfter($locationName);
                storeFirst = "Notting Hill";
                $firstTimetable.load('/stores/notting-hill-london/ .bottom-left table');
                return $locationArray[0];
            } else if ($spanWithLocation.hasClass('wab-storeimage--M')) {
                $locationName.prepend('<span class="WB043_wolfHead">Wolf & Badger</span><br />Mayfair ');
                $firstTimetable.insertAfter($locationName);
                storeFirst = "Mayfair";
                $firstTimetable.load('/stores/mayfair-london/ .bottom-left table');
                return $locationArray[1];
            } else if ($spanWithLocation.hasClass('wab-storeimage--SOHO_NY')) {
                $locationName.prepend('<span class="WB043_wolfHead">Wolf & Badger</span><br />New York ');
                $firstTimetable.insertAfter($locationName);
                storeFirst = "New York";
                $firstTimetable.load('/stores/soho-new-york/ .bottom-left table');
                return $locationArray[2];
            }
        }

        $('.WB043_map').attr('href', getLocation());

        $desiredContainer.find('.signs').hide();

        var $productName = $('.span5.product-details-column .product-name:first').text();
        $('.WB043_reserve_btn').on('click', function () {
            // -------
            // var href = 'mailto:support@wolfandbadger.com?subject=Item Reservation&body=I would like to reserve: ' + $productName + ' in the store located in: ' + storeSecond;
            window.location.href = 'mailto:support@wolfandbadger.com?subject=Item Reservation&body=I would like to reserve: ' + $productName + ' in the store located in: ' + storeFirst;
            $(this).click(function() {
                var t;
                var self = $(this);
                $(window).blur(function() {
                    // The browser responded so stop the timeout
                    clearTimeout(t);
                });
                t = setTimeout(function() {
                    // The browser did not respond to mailto after 500ms
                    // Presumably they have no email client installed, try opening in gmail instead
                    window.open('https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=support@wolfandbadger.com');
                }, 500);
            });
            // -------
            // window.location.href = 'mailto:support@wolfandbadger.com?subject=Item Reservation&body=I would like to reserve: ' + $productName + ' in the store located in: ' + storeFirst;
            sendEvent('WB043', 'Item reserved in store located in: ' + storeFirst, 'WB043 - Available in Store optimisation', true);
        });

        UC.poller([
            '.WB043_reserve_btnSecond'
        ], function () {
            $('.WB043_reserve_btnSecond').on('click', function () {
                // -------
               // var href = 'mailto:support@wolfandbadger.com?subject=Item Reservation&body=I would like to reserve: ' + $productName + ' in the store located in: ' + storeSecond;
                window.location.href = 'mailto:support@wolfandbadger.com?subject=Item Reservation&body=I would like to reserve: ' + $productName + ' in the store located in: ' + storeSecond;
                $(this).click(function() {
                    var t;
                    $(window).blur(function() {
                        // The browser responded so stop the timeout
                        clearTimeout(t);
                    });
                    t = setTimeout(function() {
                        // The browser did not respond to mailto after 500ms
                        // Presumably they have no email client installed, try opening in gmail instead
                        window.open('https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=support@wolfandbadger.com');
                    }, 500);
                });
                // -------
                //window.location.href = 'mailto:support@wolfandbadger.com?subject=Item Reservation&body=I would like to reserve: ' + $productName + ' in the store located in: ' + storeSecond;
                sendEvent('WB043', 'Item reserved in store located in: ' + storeSecond, 'WB043 - Available in Store optimisation', true);
            });
        });

        sendEvent('WB043', 'Page View', 'WB043 - Available in Store optimisation', true);

} // activate

})(); // _WB043
