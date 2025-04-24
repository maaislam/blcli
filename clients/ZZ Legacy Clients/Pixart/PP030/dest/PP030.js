(function() {
    // Text options
    var _opts = {
        text1: 'One moment...',
        text2: "We're getting your order ready"
    };

    $('body').addClass('PP030');

    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    // Initialise test
    UC.poller([
        '#login-button',
        '.login_registrazione',
        '.avanza',
        function() {
            return window.ga;
        },
        function() {
            return window.jQuery;
        },
        function() {
            var amount = (tc_vars || {}).order_amount_tf_with_sf;
            return amount != 'undefined' && amount > 0;
        }
    ], function() {
        $('body').addClass('PP030--did-poll');

        run();
    });

    // Full Story Integration
    UC.poller([
        function() {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
        }
    ], function () {
        window.FS.setUserVars({
            experiment_str: 'PP030',
            variation_str: 'Variation 1 Desktop'
        });
    }, { multiplier: 1.2, timeout: 0 });

    /**
     * Entry point for running test after polling
     */
    function run() {
        var $ = window.jQuery;

        var loginButton = $('#login-button'),
            registerButton = $('.login_registrazione'),
            proceedButtons = $('.avanza');

        // Logic:
        // 1. User is not logged in
        // 2. User clicks on 'proceed to checkout'
        // 3. In local storage flag that non-logged-in user is about to register / sign-in
        // 4. On page refresh, if local storage flag set, redirect to checkout
        // 4b. Flag tracks basket value at the point they signed in / registered, if this has changed we won't redirect
        
        if(!isUserLoggedIn()) {
            // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
            // Set local storage flag for non logged in users
            // who try to proceed
            // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
            proceedButtons.on('click', function() {
                localStorage.setItem('pp30-proceed-amount-determiner', tc_vars.order_amount_tf_with_sf);
            });
        } else {
            // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
            // If a user was previously not logged in and tried
            // to proceed, and their basket totals are the same,
            // then redirect to checkout
            // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
            var didPreviouslyProceedAsAnonymousUserAmount = localStorage.getItem('pp30-proceed-amount-determiner');

            if(
                didPreviouslyProceedAsAnonymousUserAmount
                    && didPreviouslyProceedAsAnonymousUserAmount == tc_vars.order_amount_tf_with_sf
            ) {
                // Show a loading screen to hide basket
                var overlay = $([
                    '<div class="pp30-basket-overlay">',
                        '<div class="pp30-basket-overlay__content">',
                            '<h2 class="pp30-basket-overlay__title">' + _opts.text1 + '</h2>',
                            '<p class="pp30-basket-overlay__identifier">' + _opts.text2 + '</p>',
                            '<p class="pp30-basket-overlay__preloader"><i class="fa fa-spinner fa-pulse"></i></p>',
                        '</div>',
                    '</div>'
                ].join(''));

                $('#global_container > .row:first').hide();

                $('#global_container').prepend(overlay);
                
                // Track in GA
                sendEvent('DidRedirect');

                // Unset local storage determiner
                localStorage.removeItem('pp30-proceed-amount-determiner');

                // Proceed to checkout calls globally available function
                avanzaCarrello(msg_avanza_carrello);
                
                // In case of failure, hide overlay
                setTimeout(function() {
                    overlay.remove();
                    $('#global_container > .row:first').show();
                }, 6000);
            }
        }

        /**
         * Is user logged in?
         */
        function isUserLoggedIn() {
            return !$('#login_toggle').length;
        }

        /**
         * Send GA Event
         */
        function sendEvent(action, label) {
            ga('send', 'event', 'PP30---BasketRedirect', action, label || '', {
                nonInteraction: true    
            });
        }
    }
})();
