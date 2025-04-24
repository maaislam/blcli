var _SD046 = (function () {

    // Plugins & Helpers ---------------------------
    // ---------------------------------------------

    // UC Library @version 0.2.4
    var UC = {};
    UC.poller=function(t,e,n){var i={wait:50,multiplier:1.1,timeout:0},r=Date.now||function(){return(new Date).getTime()};if(n)for(var u in n)i[u]=n[u];else n=i;for(var o=!!i.timeout&&new Date(r()+i.timeout),f=i.wait,l=i.multiplier,a=[],c=function(n,i){if(o&&r()>o)return!1;i=i||f,function(){var t=typeof n;return"function"===t?n():"string"!==t||document.querySelector(n)}()?(a.push(!0),a.length===t.length&&e()):setTimeout(function(){c(n,i*l)},i)},m=0;m<t.length;m++)c(t[m])};

    // Full Story Tagging
    UC.poller([function(){var t=window.FS;if(t&&t.setUserVars)return!0}],function(){window.FS.setUserVars({experiment_str:"SD046",variation_str:"Variation 1 Mobile"})},{multiplier:1.2,timeout:0});



    // Event Tracking ------------------------------
    // ---------------------------------------------
    var events = {
        category: 'SD046',
        status: {
            clickedAddToBag: false,
            clickedViewBasket: false
        },
        send: {
            clickedAddToBag: function () {
                if (!events.status.clickedAddToBag) {
                    window.ga('send', 'event', 'SD046', 'click', 'User added item(s) to sticky basket', {nonInteraction: true});
                    events.status.clickedAddToBag = true;
                }
            },
            clickedViewBasket: function () {
                if (!events.status.clickedViewBasket) {
                    window.ga('send', 'event', 'SD046', 'click', 'User clicked view basket', {nonInteraction: true});
                    events.status.clickedViewBasket = true;
                }
            }
        }
    };



    // Triggers ------------------------------------
    // ---------------------------------------------

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



    // Experience ----------------------------------
    // ---------------------------------------------

    function activate() {
        var $ = window.jQuery;
        var $body = $('body');
        $body.addClass('SD046');

        var $stickyBasketContainer = $([
            '<div id="SD046_wrapper">',
            '<div id="SD046_sticky_basket">',
            '<p id="SD046_sticky_basket__deliveryQualification">You\'ve qualified for <b>FREE</b> delivery</p>',
            '<div class="SD046_right_wrapper">',
            '<p id="SD046_sticky_basket__totalCost"><span></span> ex VAT <button id="SD046_sticky_basket__viewBasket">View Basket</button></p>',
            '</div>',
            '</div>',
            '</div>'
        ].join(''));

        // Prevent the sticky basket container from displaying multiple times.
        var $findSkipLinks = $('.SD046').find('.skip-links');
        var $findStickyBasket = (function() {
            if (!$('.SD046').find('#SD046_wrapper').length) {
                $stickyBasketContainer.insertAfter($findSkipLinks);
            }
        }());

        // Find the current purchase value in basket.
        var $currentValueString = $('.skip-links .header-cart-price .itemcount .count').text();

        // Find the number value for further calculations (e.g £21.30(3) ---> 21.30)
        // var $currentValueNumber;
        if ($currentValueString) {
            $('#SD046_wrapper').show();
            var $currentValueNumber = (function() {
                return $currentValueString.replace(/ ?\(\d+\)/, '').replace(/[£$€]/, '');
            }());
            $('#SD046_sticky_basket__totalCost').find('span').html("£" + $currentValueNumber);
            $('#SD046_sticky_basket__totalCost').find('span').css("font-weight", "bold");
        } else if (!$currentValueString) {
            $('#SD046_wrapper').hide();
        }

        // Check for when the basket is under 30 or over 30 pounds.
        // If under 30 show a progress bar displaying how much the user has left until obtaining the free delivery.
        // Otherwise the user has qualified for free delivery.
        $freeDeliveryProgress = $([
            '<div id="SD046_sticky_basket__freeDeliveryProgress">',
            '<div id="SD046_progress">',
            '<div id="SD046_progress__bar"></div>',
            '</div>',
            '<div id="SD046_sticky_basket__freeDeliveryProgress__text">You are £<span></span> away from <b>FREE</b> delivery</div>',
            '</div>'
        ].join(''));
        var $viewBasketButton = $('#SD046_sticky_basket__viewBasket');

        var $checkDisplayFunction = (function () {
            if (!$currentValueString) {
                $('#SD046_sticky_basket').hide();
            }
            else if ($currentValueNumber >= 30) {
                $('#SD046_sticky_basket__deliveryQualification').show();
                $freeDeliveryProgress.hide();
            } // if
            else if ($currentValueNumber < 30) {
                var $moneyAwayFromFreeDelivery = 30 - $currentValueNumber;
                var $progressPercentage = $currentValueNumber * 100 / 30;
                if (!$('.SD046').find('#SD046_sticky_basket__freeDeliveryProgress').length) {
                    $freeDeliveryProgress.prependTo('#SD046_sticky_basket');
                } // if
                $freeDeliveryProgress.find('span').html($moneyAwayFromFreeDelivery.toFixed(2));
                $freeDeliveryProgress.find('#SD046_progress__bar').css('width', $progressPercentage + "%");
                $freeDeliveryProgress.show();
                $('#SD046_sticky_basket__deliveryQualification').hide();
            } // else if
        }());

        // Take user to basket
        $viewBasketButton.on('click', function () {
            events.send.clickedViewBasket();
            location.href = "/checkout/cart";
        });

        // Track when user adds to basket on the sticky header
        var $buttonToAddToBasket = $body.find('button.button.btn-cart');
        $buttonToAddToBasket.on('click', events.send.clickedAddToBag);

        // Move some elements in order for the 'search bar' to show (was hidden behind this exp banner)
        $('a[href="#header-search"]').on('click', function () {
            var $this = $(this);
            if ($this.hasClass('skip-active')) {
                $('#SD046_wrapper').addClass('SD046_marginHeightFixMyWrapper');
                $('.top-cat-section.home-top-deli-banner').addClass('SD046_marginHeightFixBanner');
            } else {
                $('#SD046_wrapper').removeClass('SD046_marginHeightFixMyWrapper');
                $('.top-cat-section.home-top-deli-banner').removeClass('SD046_marginHeightFixBanner');
            }
        });

    } // activate

}());