var _TP040 = (function() {
    // PLUGINS & HELPER FUNCTIONS
    // UC Library - Poller & Observer -- @version 0.2.2
    var UC = (function (UC) {

        var $ = $ || window.jQuery;

        /**
         * @method Poller
         * @desc   Wait for elements to exist and/or functions before running callback
         * @param  {Array}    elements           - Accepts strings (in css selector syntax) and functions
         * @param  {function} cb                 - Callback to run when all elements exist and functions return true
         * @param  {Object}   options            - (optional) Settings to modify the behaviour of the Poller
         * @param  {number}   options.wait       - Time to wait in milliseconds between polling attempts
         * @param  {number}   options.multiplier - Number to multiply the wait time by so polling takes longer each time
         * @param  {number}   options.timeout    - How long Poller should wait in milliseconds before stopping
         */
        UC.poller = function (elements, cb, options) {
            var settings = {
                wait: 50,
                multiplier: 1.1,
                timeout: 0
            };

            var now = Date.now || function() { return new Date().getTime(); };

            if (options) {
                // Overwrite defaults with values from options
                for (var option in options) {
                    settings[option] = options[option];
                }
            } else {
                options = settings;
            }

            var timeout = settings.timeout ? new Date(now() + settings.timeout) : false;
            var wait = settings.wait;
            var multiplier = settings.multiplier;

            var successful = [];
            var time;
            var pollForElement = function (condition, time) {
                if (timeout && now() > timeout) { return false; }
                time = time || wait;

                var conditionIsTrue = (function() {
                    var type = typeof condition;
                    var toReturn;

                    if (type === 'function') {
                        toReturn = condition();
                    } else if (type === 'string') {
                        toReturn = document.querySelector(condition);
                    } else {
                        toReturn = true;
                    }

                    return toReturn;
                }());

                if (conditionIsTrue) {
                    successful.push(true);
                    if (successful.length === elements.length) cb();
                } else {
                    setTimeout(function () {
                        pollForElement(condition, time * multiplier);
                    }, time);
                }
            };

            for (var i = 0; i < elements.length; i++) {
                pollForElement(elements[i]);
            }
        };

        UC.observer = {
            /*
             * Each time observer.connect is called, the relevant element and MutationObserver is pushed to active
             * When observer.disconnect is called it cross-references it's element with the matching element in active and disconnects the MutationObserver
             */
            active: [],


            /**
             * @method Observer.connect
             * @desc   Simplifies the use of MutationObservers and provides a throttle setting
             * @param  {object}   elements         - The element(s) to connect a MutationObserver to
             * @param  {function} cb               - Callback to run on mutation
             * @param  {object}   options          - (optional) Settings to modify the behaviour of Observer
             * @param  {number}   options.throttle - Minimum time to wait before callback can be fired again
             * @param  {object}   options.config   - MutationObserver config object (see: https://developer.mozilla.org/en/docs/Web/API/MutationObserver#MutationObserverInit)
             */
            connect: function (elements, cb, options) {
                var settings = {
                    throttle: 1000,
                    config: {
                        attributes: true,
                        childList: true,
                        subTree: false
                    }
                };

                if (options) {
                    // Overwrite defaults with values from options
                    for (var option in options) {
                        settings[option] = options[option];
                    }
                } else {
                    options = settings;
                }

                var blockCb;
                var observer = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        if (!blockCb) {
                            blockCb = true;
                            cb(elements, mutation);
                            setTimeout(function () {
                                blockCb = false;
                            }, settings.throttle);
                        }
                    });
                });

                for (var i = 0; i < elements.length; i++) {
                    observer.observe(elements[i], settings.config);
                    this.active.push([elements[i], observer]);
                }
            },


            /**
             * @method Observer.disconnect
             * @desc   Allows MutationObservers connected with Observer.connect to easily be removed.
             *         All MutationObservers will be removed from specified element(s).
             * @param  {object} elements - the elements to remove all MutationObservers from
             */
            disconnect: function (elements) {
                var isActive = [];
                var active = this.active;

                // For each element in argument check if the node exists in active
                // If it does, disconnect the MutationObserver
                for (var i = 0; i < elements.length; i++) {
                    var element = elements[i];

                    for (var j = 0; j < active.length; j++) {
                        if (element === active[j][0]) {
                            active[j][1].disconnect();
                        }
                    }
                }
            }
        };

        return UC;

    }(UC || {}));


    // GA Tracker Name
    var trackerName;
    function sendEvent(category, action, label, nonInteractionValue, dimensionValue, dimensionName) {
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



    UC.poller([
        '#rollover_cart_popup',
        function() {
            return window.jQuery;
        },
        function() {
            return window.ga;
        }
    ], activate);

    function activate() {
        // EXPERIMENT
        var $ = window.jQuery;

        if ($('body').hasClass('TP040')) return false;

        // Full Story Integration
        UC.poller([
            function() {
                var fs = window.FS;
                if (fs && fs.setUserVars) return true;
            }
        ], function () {
            window.FS.setUserVars({
                experiment_str: 'TP040',
                variation_str: 'Variation 1 Desktop'
            });
        }, { multiplier: 1.2, timeout: 0 });


        var $miniBasket = $('#rollover_cart_popup');

        $('body').addClass('TP040');

        var $checkout;
        // Check if user logged in or not (the checkout pathnames differ slightly)
        if ($('.sessioncamhidetext').text().indexOf('Welcome') > -1) {
            $checkout = $([
                '<a href="/checkout/delivery_details" id="TP040_button--checkout" type="button">' +
                'Go to Checkout</a>'
            ].join(''));
        } else {
            $checkout = $([
                '<a href="/checkout/guest/login" id="TP040_button--checkout" type="button">' +
                'Go to Checkout</a>'
            ].join(''));
        }

        $checkout.one('click', function() {
            sendEvent('TP040', 'click', 'User clicked checkout btn', true);
        });

        function addCheckoutBtn() {
            $checkout.prependTo($miniBasket.find('.links '));
        }

        UC.observer.connect($miniBasket, addCheckoutBtn, {
            config: {attributes: false, childList: true, subtree: false},
            throttle: 100
        });

    }
})();