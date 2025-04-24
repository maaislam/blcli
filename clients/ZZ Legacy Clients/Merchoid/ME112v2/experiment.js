var _ME112v2 = (function () {

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
            experiment_str: 'ME112v2',
            variation_str: 'Variation 1 All'
        });
    }, {multiplier: 1.2, timeout: 0});

    // Triggers ------------------------------------
    // ---------------------------------------------
    var _triggers = (function () {
        UC.poller([
            'body',
            '.product-info.large-6.small-12.columns.left',
            '.fb-like.merchoid-facebook-embed.fb_iframe_widget',
            function () {
                return window.jQuery
            },
            function () {
                return window.ga
            }
        ], function () {
            // Prevent script from running twice on same page
            if ($('body').hasClass('ME112v2')) {
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
        $body.addClass('ME112v2');

        if(!$('.shippingDate').length) {
            return;
        }

        if($('#merchoid-mailchimp-out-of-stock-form').is(':visible')) {
            return;
        }

        // Whole content modfications will be performed on
        var $wholeContent = $('.product-info.large-6.small-12.columns.left');

        // Wrap part of the whole content into ME112v2_wrapper
        // (do not include .product-details and .fb-like) -- are still part of $wholeContent
        $wholeContent.wrapInner('<div class="ME112v2_wrapper">');
        $wholeContent.find('.product-details.tabs-style').contents().unwrap().insertAfter('.ME112v2_wrapper');
        $wholeContent.find('.fb-like.merchoid-facebook-embed.fb_iframe_widget').contents().unwrap().appendTo($wholeContent);

        // The content of the header
        var $headerContentWrapper = $([
            '<div class="ME112v2_headerWrapper">',
            '<h1 class="ME112v2_headerContent">PREORDER TODAY</h1>',
            '</div>'
        ].join(''));

        $headerContentWrapper.prependTo('.ME112v2_wrapper');

        // Find name of the merchandise producer
        var $textMerchHeader = $('.product-summary-title').text();
        var $indexOfMerch = $textMerchHeader.indexOf(':');
        var $merchandiseProducer = $textMerchHeader.substring(0, $indexOfMerch);

        // Welcome message + time left for when product becomes available for shipping
        $messageAndShipContainer = $([
            '<div class="ME112v2_messageAndShipInfo">',
            '<hr>',
            '<p class="ME112v2_message_welcome">Welcome <span class="ME112v2_merchProducer"></span> Fan. You\'ve found some of ' +
            'Merchoid\'s latest merchandise. We\'re always working hard to bring you the latest and greatest ' +
            'merch, so you can show your true love for <span class="ME112v2_merchProducer"></span>. Preorder today to have ' +
            'your product dispatched as soon as we receive our first delivery</p>',
            '<p class="ME112v2_ship_time">READY TO SHIP IN<span id="ME112v2_atMost"></span>:<br /> ' +
            '<span class="ME112v2_daysLeft"></span> Days <span class="ME112v2_hoursLeft"></span> Hours</p>',
            '<a href="#" class="ME112v2_learnMore">Learn more about merchoid preorders</a>',
            '<hr>',
            '<p class="ME112v2_orderNow">ORDER NOW AND BE ONE OF THE FIRST TO OWN!</p>',
            '<p class="ME112v2_orderNow_text">This product is on preorder because the licensers haven\'t released it yet</p>',
            '</div>'
        ].join(''));

        $messageAndShipContainer.insertBefore('.cart'); // .variations_form.cart || .cart (depends on pages)

        // Compute ship time remaining and display it
        // --------------------------------------------------------------------------------
        var $shippingDate = $('.shippingDate').text();
        var $dateToship = $shippingDate.substring(13, $shippingDate.length);
        // Check if date contains either 1. day month year or 2. month year
        if(!$.isNumeric($dateToship[0])) {
            $dateToship = '31st ' + $dateToship;
            $('#ME112v2_atMost').text(' AT MOST');
        }

        if ($.isNumeric($dateToship[1])) {
            $dateToship = $dateToship.replace($dateToship.substring(2, 4), '');
        } else {
            $dateToship = $dateToship.replace($dateToship.substring(1, 3), '');
        }
        var $dateSplit = $dateToship.split(' ');
        var $targetDate = new Date($dateSplit[1] + ' ' + $dateSplit[0] + ', ' + $dateSplit[2]);
        var $currentDate = new Date();

        var $daysRemainingInMs = Math.abs($targetDate - $currentDate);
        var $daysRemainingInSeconds = $daysRemainingInMs / 1000;
        var $daysRemaining = Math.floor($daysRemainingInSeconds / 86400); // 86400 = 24 hours * 60 minutes * 60 seconds per day
        var $hoursRemaining = Math.floor(($daysRemainingInSeconds % 86400) / 3600); // 3600 = 60 minutes * 60 seconds per day

        $('.ME112v2_daysLeft').text($daysRemaining);
        $('.ME112v2_hoursLeft').text($hoursRemaining);

        // -----------------------------------------------------------------------------------

        // Insert merchandise producer name where required
        $('.ME112v2_merchProducer').text($merchandiseProducer);
        $('.ME112v2_merchProducer.upper').css('text-transform', 'uppercase');

        $('.cart').appendTo('.ME112v2_messageAndShipInfo'); // .variations_form.cart || .cart (depends on pages)

        $('a.reset_variations').hide();

        // Contains information about availabilty date (use it to compute days and hours left)
        $('.shippingDate').hide();

        // Count current existing tabs
        var $tabsLength = $('.tabs-with-scrolling__tabs li').length;
        // Insert 'Preorders' tab along with its content
        $preordersInfoTab = $('<li data-target="#tab-tab4" class="tabs-with-scrolling__tab ME112v2_myTab">Preorders</li>');
        $preordersInfoTab.appendTo('.tabs-with-scrolling__tabs');

        //
        var $tabsWrap = $('.tabs-with-scrolling__tab-content-wrap');
        var $preordersContentTab = $([
            '<div id="tab-tab4" class="tabs-with-scrolling__content ME112v2_myTab">',
            '<h3 class="ME112v2_myTab_Header">WHY PREORDER WITH MERCHOID?</h3>',
            '<p class="ME112v2_myTab_Content">When you place a preorder, your payment will be taken immediately and ' +
            'you will receive email confirmation of your order.<br /><br />When the item arrives in stock, your preorder ' +
            'will ship and you will receive a shipping notification. Please note, supplier dates can change; ' +
            'check the product listing for the most up to date information.</p>',
            '<h3 class="ME112v2_myTab_Header">CAN I CANCEL A PREORDER?</h3>',
            '<p class="ME112v2_myTab_Content">When you place a preorder, your payment will be taken immediately and ' +
            'you will receive email confirmation of your order.<br /><br />When the item arrives in stock, your preorder ' +
            'will ship and you will receive a shipping notification. Please note, supplier dates can change; ' +
            'check the product listing for the most up to date information.</p>',
            '</div>'
        ].join(''));
        $preordersContentTab.appendTo($tabsWrap);

        // DESKTOP VERSION - for tabs
        $('.tabs-with-scrolling__tab.ME112v2_myTab').on('click', function() {
            if (!$('.tabs-with-scrolling__tab.ME112v2_myTab').hasClass('tab-active')) {
                $('.tabs-with-scrolling__tab.ME112v2_myTab').addClass('tab-active');
                if ($('.tabs-with-scrolling__tabs li:eq(0)').hasClass('tab-active')) {
                    $('.tabs-with-scrolling__tabs li:eq(0)').removeClass('tab-active');
                    $('.tabs-with-scrolling__tab-content-wrap .tabs-with-scrolling__content:eq(0)').removeClass('tab-active');
                } else if ($('.tabs-with-scrolling__tabs li:eq(1)').hasClass('tab-active')) {
                    $('.tabs-with-scrolling__tabs li:eq(1)').removeClass('tab-active');
                    $('.tabs-with-scrolling__tab-content-wrap .tabs-with-scrolling__content:eq(1)').removeClass('tab-active');
                } else if ($('.tabs-with-scrolling__tabs li:eq(2)').hasClass('tab-active') && $tabsLength > 2) {
                    $('.tabs-with-scrolling__tabs li:eq(2)').removeClass('tab-active');
                    $('.tabs-with-scrolling__tab-content-wrap .tabs-with-scrolling__content:eq(2)').removeClass('tab-active');
                }

                $('.tabs-with-scrolling__content.ME112v2_myTab').addClass('tab-active');
            }
        });
        $('.tabs-with-scrolling__tabs li:eq(0), .tabs-with-scrolling__tabs li:eq(1)').on('click', function() {
            if ($('.tabs-with-scrolling__tab.ME112v2_myTab').hasClass('tab-active')) {
                $('.tabs-with-scrolling__tab.ME112v2_myTab').removeClass('tab-active');
                $('#tab-tab4.tabs-with-scrolling__content.ME112v2_myTab').removeClass('tab-active');
            }
        });

        // -------------------------------------------------------------------------------------------------------
        // ---------------- Add preorders tab to mobile version -------------------------------------------------
        // -------------------------------------------------------------------------------------------------------
        var $preordersContentMobileTab = $([
            '<div class="uc-accordion-section ME112v2_accordion_section">',
            '<div class="uc-accordion-nav" id="ME112v2_linkLearnMore">',
            '<div class="uc-accordion-nav__inner">Preorders</div>',
            '</div>',

            '<div class="uc-accordion-content columns small-12">',
            '<div class="uc-accordion-content__inner">',
            '<h3 class="ME112v2_myTab_Header">WHY PREORDER WITH MERCHOID?</h3>',
            '<p class="ME112v2_myTab_Content">When you place a preorder, your payment will be taken immediately and ' +
            'you will receive email confirmation of your order.<br /><br />When the item arrives in stock, your preorder ' +
            'will ship and you will receive a shipping notification. Please note, supplier dates can change; ' +
            'check the product listing for the most up to date information.</p>',
            '<h3 class="ME112v2_myTab_Header">CAN I CANCEL A PREORDER?</h3>',
            '<p class="ME112v2_myTab_Content">When you place a preorder, your payment will be taken immediately and ' +
            'you will receive email confirmation of your order.<br /><br />When the item arrives in stock, your preorder ' +
            'will ship and you will receive a shipping notification. Please note, supplier dates can change; ' +
            'check the product listing for the most up to date information.</p>',
            '</div>',
            '</div>',
            '</div>'
        ].join(''));

        $preordersContentMobileTab.appendTo('.row.max-width.mobile-only-768 .uc-accordion');

        // .uc-accordion--active
        $('.uc-accordion-section').last().on('click', function() {
            $('.uc-accordion-content.columns.small-12').last().addClass('uc-accordion--active');
            $('.uc-accordion-nav').last().toggleClass('uc-accordion--active');
            $('.uc-accordion-content.columns.small-12.uc-accordion--active').last().slideToggle();

        });
        // -------------------------------------------------------------------------------------------------------

        // If users click on the 'learn more' link lead users to preorders tab info (modify this according to desktop/mobile)
        $('.ME112v2_learnMore').on('click', function () {
            if ($('.ME112v2_myTab').is(':visible')) {
                $('.tabs-with-scrolling__tab').removeClass('tab-active');
                $('.ME112v2_myTab').addClass('tab-active');
                $('.ME112v2_learnMore').attr('href', '#tab-tab4');
            } else {
                $('.uc-accordion-content.columns.small-12').last().addClass('uc-accordion--active');
                $('.uc-accordion-nav').last().addClass('uc-accordion--active');
                $('.uc-accordion-content.columns.small-12.uc-accordion--active').last().slideDown();
                $('.ME112v2_learnMore').attr('href', '#ME112v2_linkLearnMore');
            }
        });

        // Add another icon to the bottom of the content wrapper
        var $liIcon = $([
            '<li>',
            '<span class="product-usps-icon">',
            '<img src="https://ab-test-sandbox.userconversion.com/experiments/ME112v2-briefcase.png" style="height: 18px; width: 18px;">',
            '</span>',
            '<span>Be one of the first to own!</span>',
            '</li>'
        ].join(''));

        $liIcon.appendTo('.product-usps');

        $('.stockinfo.product-info-stockinfo').css('text-align', 'center').insertAfter('.ME112v2_messageAndShipInfo');

        // Add the scarcity bar
        var $scarcityBar = $([
            '<div class="ME112v2_scarcityBar_wrapper">',
                '<hr />',
                '<p class="ME112v2_scarcityBar_header">PREORDER TODAY AND BE IN THE FIRST DELIVERY RUN ON RELEASE DAY</p>',
                '<div class="ME112v2_scarcityBar_content">',
                    '<i class="ME112v2_arrow_up"></i>',
                    '<div class="ME112v2_scarcityBar_content_part1"></div>',
                    '<div class="ME112v2_scarcityBar_content_part2"></div>',
                    '<div class="ME112v2_scarcityBar_content_part3"></div>',
                '</div>',
                '<p class="ME112v2_scarcityBar_availabilityMsg">FIRST BATCH NEARLY <span class="ME112v2_scarcityBar_availabilityMsg_important">SOLD OUT!</span></p>',
            '</div>'
        ].join(''));

        $scarcityBar.insertAfter('.product-usps');

        $shippingExp = $('.shippingExplanation');
        $shippingExp.appendTo('.woocommerce-variation-add-to-cart');
        $('.size-guide-wrapper').appendTo('.radical-variations-wrapper');

        // Set scarcity bar (based on order numbers --> ???)
        $arrowUP = $('.ME112v2_arrow_up');
        $arrowUP.hide();
        function scarcityBarArrow () {
            setTimeout(function () {
                if ($('#pa_size').find('option:eq(0)').is(':selected')) {
                    $arrowUP.hide();
                    $('.ME112v2_scarcityBar_availabilityMsg').hide();
                } else if ($('.ME106_scarcity.popoutAnim').is(':visible')) {
                    $arrowUP.show();
                    $arrowUP.css('left', '90%');
                    $('.ME112v2_scarcityBar_availabilityMsg').show();
                } else if (!($('.ME106_scarcity.popoutAnim').is(':visible'))) {
                    $arrowUP.show();
                    $arrowUP.css('left', '80%');
                    $('.ME112v2_scarcityBar_availabilityMsg').show();
                }
            }, 600);
        }

        if ($('#pa_size').length) {
            scarcityBarArrow();
            $('#pa_size').on('change', function () {
                scarcityBarArrow();
            });
        } else {
            if ($('.stockinfo.product-info-stockinfo').length) {
                $arrowUP.show();
                $arrowUP.css('left', '90%');
                $('.ME112v2_scarcityBar_availabilityMsg').show();
            } else {
                $arrowUP.hide();
                $('.ME112v2_scarcityBar_availabilityMsg').hide();
            }
        }

        $('.merchoid-mailchimp-product-subscription-wrapper').hide();

    } // activate

}()); // _ME112v2