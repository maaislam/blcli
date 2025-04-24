var _ME112 = (function () {

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
            experiment_str: 'ME112',
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
            if ($('body').hasClass('ME112')) {
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
        $body.addClass('ME112');

        if(!$('.shippingDate').length) {
            $('.merchoid-mailchimp-product-subscription-wrapper').hide();
            return;
        }

        // Whole content modfications will be performed on
        var $wholeContent = $('.product-info.large-6.small-12.columns.left');

        // Wrap part of the whole content into ME112_wrapper
        // (do not include .product-details and .fb-like) -- are still part of $wholeContent
        $wholeContent.wrapInner('<div class="ME112_wrapper">');
        $wholeContent.find('.product-details.tabs-style').contents().unwrap().insertAfter('.ME112_wrapper');
        $wholeContent.find('.fb-like.merchoid-facebook-embed.fb_iframe_widget').contents().unwrap().appendTo($wholeContent);

        // The content of the header
        var $headerContentWrapper = $([
            '<div class="ME112_headerWrapper">',
                '<h1 class="ME112_headerContent">YOU\'VE FOUND THE NEW <span class="ME112_merchProducer upper"></span> MERCHANDISE.</h1>',
                '<p class="ME112_headerMessage">Join all the hardcore fans and preorder today</p>',
            '</div>'
        ].join(''));

        $headerContentWrapper.prependTo('.ME112_wrapper');

        // Find name of the merchandise producer
        var $textMerchHeader = $('.product-summary-title').text();
        var $indexOfMerch = $textMerchHeader.indexOf(':');
        var $merchandiseProducer = $textMerchHeader.substring(0, $indexOfMerch);

        // Welcome message + time left for when product becomes available for shipping
        $messageAndShipContainer = $([
            '<div class="ME112_messageAndShipInfo">',
                '<hr>',
                '<p class="ME112_message_welcome">Welcome <span class="ME112_merchProducer"></span> Fan. You\'ve found some of ' +
                'Merchoid\'s latest merchandise. We\'re always working hard to bring you the latest and greatest ' +
                'merch, so you can show your true love for <span class="ME112_merchProducer"></span>. Preorder today to have ' +
                'your product dispatched as soon as we receive our first delivery</p>',
                '<p class="ME112_ship_time">READY TO SHIP IN<span id="ME112_atMost"></span>:<br /> ' +
                '<span class="ME112_daysLeft"></span> Days <span class="ME112_hoursLeft"></span> Hours</p>',
                '<a href="#" class="ME112_learnMore">Learn more about merchoid preorders</a>',
                '<hr>',
                '<p class="ME112_orderNow">ORDER NOW AND BE ONE OF THE FIRST TO OWN!</p>',
                '<p class="ME112_orderNow_text">This product is on preorder because the licensers haven\'t released it yet</p>',
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
            $('#ME112_atMost').text(' AT MOST');
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

        $('.ME112_daysLeft').text($daysRemaining);
        $('.ME112_hoursLeft').text($hoursRemaining);

        // -----------------------------------------------------------------------------------

        // Insert merchandise producer name where required
        $('.ME112_merchProducer').text($merchandiseProducer);
        $('.ME112_merchProducer.upper').css('text-transform', 'uppercase');

        $('.cart').appendTo('.ME112_messageAndShipInfo'); // .variations_form.cart || .cart (depends on pages)

        // Wrapper to style the buttons
        $buttonsWrapper = $([
            '<div class="ME112_buttonsWrapper">',
            '<p class="ME112_smallText">OR</p>',
            '<button class="ME112_secondButton open_modal">I WANT IT, BUT NOT TODAY</button>',
            '</div>'
        ].join(''));

        // --------------------------------------------------------------------------------------------------------
        if ($('.woocommerce-variation-add-to-cart').length) {  // FOR PRODUCTS WITH SIZES (SUCH AS T-SHIRTS) ------
            $('.shippingExplanation').appendTo('.woocommerce-variation-add-to-cart');
            $('#shippingDateP').hide();

            $('.size-guide-wrapper').appendTo('.radical-variations-wrapper'); // on page with size for products

            $('.woocommerce-variation-add-to-cart').insertAfter('.radical-variations-wrapper-container');

            $('.woocommerce-variation-add-to-cart').wrap($buttonsWrapper);
            $('.woocommerce-variation-add-to-cart').prependTo('.ME112_buttonsWrapper');
        } else { // FOR PRODUCTS WITHOUT SIZES (e.g Nintendo)
            var $woocommerce = $('<div class="woocommerce-variation-add-to-cart">');

            $woocommerce.insertAfter('.radical-variations-wrapper-container');

            $('.single_add_to_cart_button').prependTo('.woocommerce-variation-add-to-cart');

            $('.shippingExplanation').appendTo('.woocommerce-variation-add-to-cart');

            $('.woocommerce-variation-add-to-cart').wrap($buttonsWrapper);
            $('.woocommerce-variation-add-to-cart').prependTo('.ME112_buttonsWrapper');
        }
        // --------------------------------------------------------------------------------------------------------

        $('.ME112_secondButton').append('<i class="arrow_right"></i>');
        $('a.reset_variations').hide();

        // --------------------------------------------------------------------------------------------------------
        // -------------------------------------CREATE EMAIL POPUP-------------------------------------------------
        // --------------------------------------------------------------------------------------------------------
        var $popUpModal = $([
            '<div class="ME112_pop-up_modal">',
                '<div>',
                    '<a href="#" class="close_btn">X</a>',
                    '<div class="overflow_fix">',
                        //'<p class="ME112_pop-up_modal_description">Please enter your email here and we will keep you updated ' +
                        //'on the availability of this product</p>',
                    '</div>',
                '</div>',
            '</div>'
        ].join(''));

        $popUpModal.prependTo('body');
        $('.merchoid-mailchimp-product-subscription-wrapper').prependTo($popUpModal.find('.overflow_fix'));

        // Create mail form
        var $mailForm = $([
            '<form method="post" name="preorder_form" id="preorderLaterForm">',
                '<input type="text" name="name" placeholder="First Name">',
                '<input type="text" name="email" placeholder="Email address">',
                '<input type="submit" value="Submit" class="ME112_pop-up_modal_button">',
            '</form>'
        ].join(''));

        $mailForm.insertAfter('.ME112_pop-up_modal .ME112_pop-up_modal_description');

        var slideQ = false,
            modal = $(".ME112_pop-up_modal");

        if (slideQ == false) {
            $(".open_modal,.ME112_pop-up_modal .close_btn").on("click", function(e) {
                slideQ = true;
                e.preventDefault();

                if (modal.hasClass("active")) {
                    modal.fadeOut("slow", function() {
                        modal.removeClass("active");
                        slideQ = false;
                    });
                } else {
                    modal.fadeIn("slow", function() {
                        modal.addClass("active");
                        slideQ = false;
                    });
                }
            });
            $(document).on("click", function(e) {
                if (!$(e.target).closest(".ME112_pop-up_modal > div").length) {
                    if (modal.hasClass("active")) {
                        modal.fadeOut("slow", function() {
                            modal.removeClass("active");
                            slideQ = false;
                        });
                    }
                }
            });
        }

        // --------------------------------------------------------------------------------------------------------

        // Contains information about availabilty date (use it to compute days and hours left)
        $('.shippingDate').hide();

        // Count current existing tabs
        var $tabsLength = $('.tabs-with-scrolling__tabs li').length;
        // Insert 'Preorders' tab along with its content
        $preordersInfoTab = $('<li data-target="#tab-tab4" class="tabs-with-scrolling__tab ME112_myTab">Preorders</li>');
        $preordersInfoTab.appendTo('.tabs-with-scrolling__tabs');

        //
        var $tabsWrap = $('.tabs-with-scrolling__tab-content-wrap');
        var $preordersContentTab = $([
            '<div id="tab-tab4" class="tabs-with-scrolling__content ME112_myTab">',
                '<h3 class="ME112_myTab_Header">WHY PREORDER WITH MERCHOID?</h3>',
                '<p class="ME112_myTab_Content">When you place a preorder, your payment will be taken immediately and ' +
                'you will receive email confirmation of your order.<br /><br />When the item arrives in stock, your preorder ' +
                'will ship and you will receive a shipping notification. Please note, supplier dates can change; ' +
                'check the product listing for the most up to date information.</p>',
                '<h3 class="ME112_myTab_Header">CAN I CANCEL A PREORDER?</h3>',
                '<p class="ME112_myTab_Content">When you place a preorder, your payment will be taken immediately and ' +
                'you will receive email confirmation of your order.<br /><br />When the item arrives in stock, your preorder ' +
                'will ship and you will receive a shipping notification. Please note, supplier dates can change; ' +
                'check the product listing for the most up to date information.</p>',
            '</div>'
        ].join(''));
        $preordersContentTab.appendTo($tabsWrap);

        // DESKTOP VERSION - for tabs
        $('.tabs-with-scrolling__tab.ME112_myTab').on('click', function() {
            if (!$('.tabs-with-scrolling__tab.ME112_myTab').hasClass('tab-active')) {
                $('.tabs-with-scrolling__tab.ME112_myTab').addClass('tab-active');
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

                $('.tabs-with-scrolling__content.ME112_myTab').addClass('tab-active');
            }
        });
            $('.tabs-with-scrolling__tabs li:eq(0), .tabs-with-scrolling__tabs li:eq(1)').on('click', function() {
            if ($('.tabs-with-scrolling__tab.ME112_myTab').hasClass('tab-active')) {
                $('.tabs-with-scrolling__tab.ME112_myTab').removeClass('tab-active');
                $('#tab-tab4.tabs-with-scrolling__content.ME112_myTab').removeClass('tab-active');
            }
        });

        // -------------------------------------------------------------------------------------------------------
        // ---------------- Add preorders tab to mobile version -------------------------------------------------
        // -------------------------------------------------------------------------------------------------------
        var $preordersContentMobileTab = $([
            '<div class="uc-accordion-section ME112_accordion_section">',
                '<div class="uc-accordion-nav" id="ME112_linkLearnMore">',
                    '<div class="uc-accordion-nav__inner">Preorders</div>',
                '</div>',

                '<div class="uc-accordion-content columns small-12">',
                    '<div class="uc-accordion-content__inner">',
                        '<h3 class="ME112_myTab_Header">WHY PREORDER WITH MERCHOID?</h3>',
                        '<p class="ME112_myTab_Content">When you place a preorder, your payment will be taken immediately and ' +
                        'you will receive email confirmation of your order.<br /><br />When the item arrives in stock, your preorder ' +
                        'will ship and you will receive a shipping notification. Please note, supplier dates can change; ' +
                        'check the product listing for the most up to date information.</p>',
                        '<h3 class="ME112_myTab_Header">CAN I CANCEL A PREORDER?</h3>',
                        '<p class="ME112_myTab_Content">When you place a preorder, your payment will be taken immediately and ' +
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
        $('.ME112_learnMore').on('click', function () {
            if ($('.ME112_myTab').is(':visible')) {
                  $('.tabs-with-scrolling__tab').removeClass('tab-active');
                  $('.ME112_myTab').addClass('tab-active');
                  $('.ME112_learnMore').attr('href', '#tab-tab4');
              } else {
                $('.uc-accordion-content.columns.small-12').last().addClass('uc-accordion--active');
                $('.uc-accordion-nav').last().addClass('uc-accordion--active');
                $('.uc-accordion-content.columns.small-12.uc-accordion--active').last().slideDown();
                $('.ME112_learnMore').attr('href', '#ME112_linkLearnMore');
            }
        });

        // Add another icon to the bottom of the content wrapper
        var $liIcon = $([
            '<li>',
                '<span class="product-usps-icon">',
                  '<img src="https://ab-test-sandbox.userconversion.com/experiments/ME112-briefcase.png" style="height: 18px; width: 18px;">',
               '</span>',
               '<span>Be one of the first to own!</span>',
            '</li>'
        ].join(''));

        $liIcon.appendTo('.product-usps');

        $('.stockinfo.product-info-stockinfo').css('text-align', 'center').insertAfter('.ME112_messageAndShipInfo');

        // Amend
        // Change error on validation text
        $('#chimpy_shortcode_submit').on('click', function () {
            $('#chimpy_shortcode_2, #chimpy_shortcode_1').find('.chimpy_status_underlay .state-error').next('em').text('Please enter a valid email address');
        });

    } // activate

}()); // _ME112