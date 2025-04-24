var _CB083 = (function () {

    // PLUGINS
    // UC Library - Poller -- @version 0.2.2
    // -------------------------------------
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    // Send GA Events With Tracker Name ----
    // -------------------------------------
    function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}var trackerName;


    // TRIGGERS
    var _triggers = (function () {
        UC.poller([
                function () {
                    return !!window.jQuery;
                },
                function () {
                    return !!window.ga;
                }
            ], activate
        );
    })();


    // EXPERIMENT
    function activate() {
        // Full Story Tagging 
        UC.poller([
            function () {
                var fs = window.FS;
                if (fs && fs.setUserVars) return true;
            }
        ], function () {
            window.FS.setUserVars({
                experiment_str: 'CB083',
                variation_str: 'Variation 1 Desktop'
            });
        }, {multiplier: 1.2, timeout: 0});

        var $ = window.jQuery;

        var $body = $('body');
        $body.addClass('CB083');

        // Get the country code
        var countryCode = window.sg_api.lib.lsGetdata('Website', 'geoData').countryCode;

        // Define a 'countries' object literal which stores the necessary data based on the country the user is based
        // Easily change data here
        // The spans store the name of the country (move those as required)
        // TODO: Remove images - use classes img.flag.flag-{{country code}} instead
        var countries = {
            'GB': {
                name: 'UK',
                code: 'GB',
                countryDeliveryTime: '1', // 0 in the table provided (they subtract one for some reason)
                countryDeliveryCost: '0' // FREE delivery
            },
            'US': {
                name: 'USA',
                code: 'US',
                countryDeliveryTime: '5',
                countryDeliveryCost: '0'
            },
            'AU': {
                name: 'Australia',
                code: 'AU',
                countryDeliveryTime: '5',
                countryDeliveryCost: '£14'
            },
            'IN': {
                name: 'India',
                code: 'IN',
                countryDeliveryTime: '7',
                countryDeliveryCost: '£14'
            },
            'IE': {
                name: 'Ireland',
                code: 'IE',
                countryDeliveryTime: '2',
                countryDeliveryCost: '£6.95'
            },
            'HK': {
                name: 'Hong Kong',
                code: 'HK',
                countryDeliveryTime: '5',
                countryDeliveryCost: '0'
            },
            'IT': {
                name: 'Italy',
                code: 'IT',
                countryDeliveryTime: '3',
                countryDeliveryCost: '£7.95'
            },
            'FR': {
                name: 'France',
                code: 'FR',
                countryDeliveryTime: '2',
                countryDeliveryCost: '£7.95'
            },
            'ES': {
                name: 'Spain',
                code: 'ES',
                countryDeliveryTime: '3',
                countryDeliveryCost: '£7.95'
            },
            'CA': {
                name: 'Canada',
                code: 'CA',
                countryDeliveryTime: '7',
                countryDeliveryCost: '0'
            },
            'CN': {
                name: 'China',
                code: 'CN',
                countryDeliveryTime: '5',
                countryDeliveryCost: '£9.95'
            },
            'DE': {
                name: 'Germany',
                code: 'DE',
                countryDeliveryTime: '2',
                countryDeliveryCost: '£7.95'
            },
            'NL': {
                name: 'Netherlands',
                code: 'NL',
                countryDeliveryTime: '3',
                countryDeliveryCost: '£7.95'
            },
            'PT': {
                name: 'Portugal',
                code: 'PT',
                countryDeliveryTime: '3',
                countryDeliveryCost: '£7.95'
            },
            'BR': {
                name: 'Brazil',
                code: 'BR',
                countryDeliveryTime: '7',
                countryDeliveryCost: '£14'
            },
            'SG': {
                name: 'Singapore',
                code: 'SG',
                countryDeliveryTime: '7',
                countryDeliveryCost: '£14'
            },
            'SE': {
                name: 'Sweden',
                code: 'SE',
                countryDeliveryTime: '3',
                countryDeliveryCost: '£7.95'
            },
            'GR': {
                name: 'Greece',
                code: 'GR',
                countryDeliveryTime: '5',
                countryDeliveryCost: '£11'
            },
            'TW': {
                name: 'Taiwan',
                code: 'TW',
                countryDeliveryTime: '7',
                countryDeliveryCost: '£14'
            },
            'CH': {
                name: 'Switzerland',
                code: 'CH',
                countryDeliveryTime: '7',
                countryDeliveryCost: '£14'
            }
        };

        // Get the country the user is currently in
        var country = (function() {
            if (sessionStorage.getItem('remCountryCode')) {
                return countries[sessionStorage.getItem('remCountryCode')];
            } else {
                return countries[countryCode];
            }
        }());

        // Add to data object
        // Amended - delivery cost is specific to each country (FREE or.. not)
        country.shippingMsg = (function() {
            if (country.countryDeliveryCost === '0') { // FREE
                return '<strong>FREE</strong> ' + country.name + ' delivery';
            } else { // NOT FREE
                return 'Delivery to ' + country.name + ' - from ' + country.countryDeliveryCost;
            }
        }());
        country.message = 'We Can Deliver to' + (country.prefix ? ' the' : '') + ' <span class="CB083_name"></span> in as little as <span class=CB083_countryDeliveryTime></span> day' + (country.countryDeliveryTime > 1 ? 's' : '');
        country.happyCustomers = 'Over <span style="font-weight: bold;">200,000</span> Happy Customers in ' + (country.prefix ? 'the ' : '') + country.name;

        // Update the second banner to display the specific country.
        $('.one-banner.test_value.test_value_1').find('a').html('<strong style="font-weight: bold;">Free</strong> ' + country.name + ' Delivery and Hassle Free Returns');

        var iconDaysDeliveryText = (country.countryDeliveryTime === '1') ? (country.countryDeliveryTime  + ' DAY') : (country.countryDeliveryTime + ' DAYS');

        // The html for the banner that will be included at the top of the page
        var $html = $([
            '<div class="CB083_banner_wrapper">',
                '<div class="CB083_banner__countryMesssage CB083_column"><span class="CB083_icon" data-content="' + iconDaysDeliveryText + '"></span>' + country.message + '</div>',
                '<div class="CB083__uspBlock CB083_column">',
                    '<div class="CB083__usp--1">',
                        '<span class="CB083_icon"></span>',
                        country.shippingMsg,
                    '</div>',
                    '<div class="CB083__usp--2">',
                        '<span>We accept: </span>',
                        '<img src="https://ab-test-sandbox.userconversion.com/experiments/CB083-visa.png">',
                        '<img src="https://ab-test-sandbox.userconversion.com/experiments/CB083-paypal.png">',
                        '<img src="https://ab-test-sandbox.userconversion.com/experiments/CB083-sage.png">',
                        '<img src="https://ab-test-sandbox.userconversion.com/experiments/CB083-mastercard.png">',
                        '<img src="https://ab-test-sandbox.userconversion.com/experiments/CB083-mastercard%20(1).png">',
                    '</div>',
                '</div>',
                '<div class="CB083__changeCurrencyBasedOnCountry CB083_column">',
                    '<span>Change: </span>',
                '</div>',
                '<span class="CB083_closeBanner">×</span>',
            '</div>'
        ].join(''));

        // Cache them vars
        var $headerContainer = $('#page').find('.header-container');

        // --------------------------------------------------------------------------------------------------------
        // Hide their currency_chooser
        $('.topheader ul.links.list-inline li:eq(2)').hide();

        // And cache it as will use some of its functionality
        var $getCurrencySelectContainer = $headerContainer.find('.topheader ul.links.list-inline li:eq(2) > .block-content')
            .find('#currency_chooser');
        var $selectedOption = $getCurrencySelectContainer.children('option[selected]').text().trim();
        hrefCurrencyRemember = $getCurrencySelectContainer.children('option[selected]').attr('value');
        $html.insertBefore($headerContainer);
        $('.CB083_name').text(country.name);

        // Amended - delivery time is specific to each country
        $('.CB083_countryDeliveryTime').text(country.countryDeliveryTime);


        // Just a small change, at this point replace country code for UK (returns 'GB') with 'UK'
        if (countryCode === 'GB') {
            countryCode = 'UK';
        }

        $htmlCurrencySelect = $([
            '<div class="CB083_currency_SELECT">',
                '<img class="CB083_specificFlag flag flag-' + country.code + '" />',
                '<span class="CB083_codeInMain">' + country.code + ' (' + $selectedOption + ')' + '</span>',
                '<i class="CB083_arrow_down"></i>',
            '</div>',
            '<div class="CB083_preferences">',
                '<div class="CB083_select" id="CB083_select--country">',
                    '<div class="CB083_label">Country:</div>',
                    '<select></select>',
                '</div>',
                '<div class="CB083_select" id="CB083_select--currency">',
                    '<div class="CB083_label">Currency:</div>',
                    '<select>',
                        '<option>GBP</option>',
                        '<option>EUR</option>',
                        '<option>USD</option>',
                    '</select>',
                '</div>',
                '<div class="CB083_confirmWrapper"><button>Confirm</button></div>',
            '</div>',
        '</div>'
        ].join(''));

        $htmlCurrencySelect.appendTo('.CB083__changeCurrencyBasedOnCountry');

        var $specificFlag = $('.CB083_specificFlag');
        //$specificFlag.prop('src', country.countryImage);

        var $currencySELECT = $('.CB083_currency_SELECT');
        var $preferences = $('.CB083_preferences');
        var $currencySelect = $('#CB083_select--currency select');
        var $countrySelect = $('#CB083_select--country select');

        // Fill in the country selector with all the countries
        $.each(countries, function (i) {
            $countrySelect.append('<option class="CB083_country_option" data-countrycode="' + this.code + '">' + this.name + '</option>');
        });

        // Fade toggle the container for the currency and country selectors
        $currencySELECT.on('click', function() {
            $preferences.fadeToggle('slow');
        });
        
        var changeCountry = function(countryCode) {
            var now = new Date();
            now.setTime(now.getTime());

            /** cookie with country selected expires in 10 days **/
            var expireAt = new Date(now.getTime() + (10 * 1000 * 60 * 60 * 24));

            Mage.Cookies.set('country_user_selected', countryCode, expireAt);
        };

        $countrySelect.on('click', '.CB083_country_option', function () {
            $specificFlag.prop('src', countries[$(this).data('countrycode')].countryImage);
            var codeShort = countries[$(this).data('countrycode')].code;
            if (codeShort === 'GB') {
                codeShort = 'UK';
            }
            $('.CB083_codeInMain').text(codeShort);

            // On selecting a country option update the cookies according to the country selected
            changeCountry($(this).data('countrycode'));
            updateCountryToSelected($(this).data('countrycode'));

            sessionStorage.setItem('remCountryCode', $(this).data('countrycode'));
        });

        function updateCountryToSelected (countryCode) {
            // Ajax request
            // Get the delivery info for a certain product to a certain country, make an ajax request using the template below to prevent a full page reload
            // http://www.currentbody.com/spb/product/estimate/id/{{PRODUCT ID}}/country/{{COUNTRY CODE}}
            var currProductID = $('#product_id').text().trim();
            var currCountryCode = countryCode;
            $.ajax({
                'url': 'http://www.currentbody.com/spb/product/estimate/id/' + currProductID + '/country/' + currCountryCode,
                success: function (data) {
                    console.log('success?');

                }
            });
        }

        $('.CB083_confirmWrapper button').on('click', function () {
            window.location.href = hrefCurrencyRemember;
        });

        // --------------------------------------------------------------------------------------------------------

        // Close the banner when clicking on the 'X' button (once closed it remains closed, no func. added to re-display the banner again))
        $('.CB083_closeBanner').on('click', function () {
            $('.CB083_banner_wrapper').hide();
        });

        // Replace content in the second banner (middle section -- over xyx happy customers...)
        var $topBannerValue_2 = $('.CB003_top-banner .one-banner.test_value.test_value_2');
        $topBannerValue_2.children('span').html(country.happyCustomers);

        var $usp1 = $html.find('.CB083__usp--1');
        var $usp2 = $html.find('.CB083__usp--2');

        var toFadeOut = $usp1;
        var toFadeIn = $usp2;

        setInterval(function() {
           toFadeOut.fadeOut(300);
           toFadeIn.delay(400).fadeIn(300, function() {
               toFadeIn = toFadeOut;
               toFadeOut = $(this);
           });
        }, 3000);

        // Amend - add this class to this specific container to fix some issues for users with large screen sizes
        //$('#page > .container-fluid:first').addClass('CB083_container_fluid');

    } // activate

}()); // _CB083