(function() {
'use strict';

// UC Library - Poller -- @version 0.2.2

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UC = function (a) {
    return a.poller = function (a, b, c) {
        var d = { wait: 50, multiplier: 0, timeout: 7000 },
            e = Date.now || function () {
            return new Date().getTime();
        };if (c) for (var f in c) {
            d[f] = c[f];
        } else c = d;for (var g = !!d.timeout && new Date(e() + d.timeout), h = d.wait, i = d.multiplier, j = [], l = function l(c, d) {
            if (g && e() > g) return !1;d = d || h, function () {
                var a = typeof c === "undefined" ? "undefined" : _typeof(c);return "function" === a ? c() : "string" !== a || document.querySelector(c);
            }() ? (j.push(!0), j.length === a.length && b()) : setTimeout(function () {
                l(c, d * i);
            }, d);
        }, m = 0; m < a.length; m++) {
            l(a[m]);
        }
    }, a;
}(UC || {});

var accordionHtml = "\n    <div class=\"wo17-steps\">\n        <div class=\"wo17-step clearfix\" data-step=\"measurements-known-question\" data-default-step=\"1\">\n            <div class=\"wo17-step__title\">\n                <span class=\"wo17-step__title-text\">\n                    <span class=\"wo17-step__title-prefix\">1.</span> Have you measured your blinds?\n                </span>\n            </div>\n            <div class=\"wo17-step__content\">\n                <label>\n                    <input type=\"radio\" name=\"wo17-step1\" checked=\"checked\" value=\"1\">\n                    Yes, I know my measurements\n                </label>\n                <label>\n                    <input type=\"radio\" name=\"wo17-step1\" value=\"2\">\n                    No, show me how\n                </label>\n\n                <p class=\"text-center wo17-mt15 wo17-mb0\">\n                    <button class=\"wo17-button wo17-init-next-step\">Continue</button>\n                </p>\n            </div>\n            <span class=\"wo17-step__change\">\n                <i class=\"fa fa-pencil\"></i>\n                <span>Change</span>\n            </span>\n            <div class=\"wo17-step__summary\">\n            </div>\n        </div>\n        <div class=\"wo17-step wo17-step--hidden clearfix\" data-step=\"measurements-help-recess\">\n            <div class=\"wo17-step__title\">\n                <span class=\"wo17-step__title-text\">\n                    <span class=\"wo17-step__title-prefix\">2.</span> Are your measurements recess or exact?\n                </span>\n            </div>\n            <div class=\"wo17-step__content\">\n                <p>If you want your blind to sit inside the window recess then select the <em>recess</em> measurement we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</p>\n                <p>If you want us to make the blind exactly to the size you specify select the exact size. We will not make any deductions from the size.</p>\n\n                <div class=\"row wo17-mt15\">\n                    <div class=\"col-sm-6\">\n                        <label>\n                            <img class=\"wo17-label-feature-image\" src=\"https://cdn.interiorgoodsdirect.com/woodens/img/product/options/inside-recess-width-web.jpg\" /> \n                            <input type=\"radio\" name=\"wo17-help-recess\" checked=\"checked\" \n                                data-wo17-map='[\n                                    [\"click\", \"[name=wo17-recess][value=recess]\", \"click\"]\n                                ]' \n                                value=\"recess\">\n                            Recess\n                            <span class=\"wo17-label-extra-info wo17-cgreen\">\n                                <i class=\"fa fa-thumbs-up\"></i>\n                                Most popular form of measurement\n                            </span>\n                        </label>\n                    </div>\n                    <div class=\"col-sm-6\">\n                        <label>\n                            <img class=\"wo17-label-feature-image\" src=\"https://cdn.interiorgoodsdirect.com/woodens/img/product/options/exact-blind-size.jpg\" /> \n                            <input type=\"radio\" name=\"wo17-help-recess\" \n                                data-wo17-map='[\n                                    [\"click\", \"[name=wo17-recess][value=exact]\", \"click\"]\n                                ]' \n                                value=\"exact\">\n                            Exact\n                        </label>\n                    </div>\n                </div>\n\n                <p class=\"text-center wo17-mt15 wo17-mb0\">\n                    <button class=\"wo17-button wo17-init-next-step\">Continue</button>\n                </p>\n            </div>\n            <span class=\"wo17-step__change\">\n                <i class=\"fa fa-pencil\"></i>\n                <span>Change</span>\n            </span>\n            <div class=\"wo17-step__summary\">\n            </div>\n        </div>\n        <div class=\"wo17-step wo17-step--hidden wo17-step--inactive clearfix\" data-step=\"measurements-help-add-measurements\">\n            <div class=\"wo17-step__title\">\n                <span class=\"wo17-step__title-text\">\n                    <span class=\"wo17-step__title-prefix\">3.</span> What are your measurements?\n                </span>\n            </div>\n            <div class=\"wo17-step__content\">\n                <p class=\"text-center wo17-mb15\">\n                    <a href class=\"wo17-init-2m-video\">\n                        <i class=\"fa fa-play\"></i>\n                        Watch our 2m video on how to measure your blinds\n                    </a>\n                </p>\n                <div class=\"row wo17-flex wo17-aic\">\n                    <div class=\"col-sm-6\">\n                        <p>Add SureFit protection for just \xA39.99 at the basket.</p>\n                        <p class=\"wo17-mb0\">If it turns out you made some kind of measurement error we will\n                            replace your blind absolutely free of charge.</p>\n                    </div>\n                    <div class=\"col-sm-6\">\n                        <button class=\"wo17-button wo17-init-next-step\">Add Measurements</button>\n                    </div>\n                </div>\n                <div class=\"row wo17-flex wo17-aic wo17-mt15\">\n                    <div class=\"col-sm-6\">\n                        <p class=\"wo17-mb0\">Order up to 8 FREE samples. We send over 900 free samples every single day to arrive\n                            with you in the next 3 working days.</p>\n                    </div>\n                    <div class=\"col-sm-6\">\n                        <button class=\"wo17-button wo17-free-sample-button\">Order FREE Sample</button>\n                    </div>\n                </div>\n            </div>\n            <span class=\"wo17-step__change\">\n                <i class=\"fa fa-pencil\"></i>\n                <span>Change</span>\n            </span>\n            <div class=\"wo17-step__summary\">\n            </div>\n        </div>\n        <div class=\"wo17-step wo17-step--inactive clearfix\" data-step=\"enter-measurements\">\n            <div class=\"wo17-step__title\">\n                <span class=\"wo17-step__title-text\">\n                    <span class=\"wo17-step__title-prefix\">2.</span> Enter Measurements\n                </span>\n            </div>\n            <div class=\"wo17-unit-selector clearfix\">\n                <span class=\"wo17-unit-selector-option wo17-unit-selector-option--inch\">\n                    <label>inches</label>\n                    <em></em>\n                </span>\n                <span class=\"wo17-unit-selector-option wo17-unit-selector-option--cm wo17-unit-selector-option--selected\">\n                    <em></em>\n                    <label>cm</label>\n                </span>\n            </div>\n            <div class=\"wo17-step__content\">\n                <div class=\"form-inline\">\n                    <div class=\"form-group clearfix\">\n                        <div class=\"wo17-width-wrap pull-left wo17-mr15\">\n                            <label>\n                                Width (<span class=\"wo17-data-unit-text\">cm</span>)\n                            </label>\n                            <input \n                                data-wo17-map='[\n                                    [\"keyup blur\", \"#width\", \"value\"]\n                                ]' \n                                type=\"number\" class=\"form-control wo17-small-input\" name=\"wo17-width\" />\n                            <select \n                                data-wo17-map='[\n                                    [\"change\", \"#buyFractionWidth\", \"value\"]\n                                ]' \n                                class=\"form-control wo17-inches-fraction\" name=\"wo17-width-inches-fraction\">\n                                    <option value=\"0\">0</option>\n                                    <option value=\"0.125\">1/8</option>\n                                    <option value=\"0.25\">1/4</option>\n                                    <option value=\"0.375\">3/8</option>\n                                    <option value=\"0.5\">1/2</option>\n                                    <option value=\"0.625\">5/8</option>\n                                    <option value=\"0.75\">3/4</option>\n                                    <option value=\"0.875\">7/8</option>\n                            </select>\n                            <span class=\"wo17-error-msg\"></span>\n                            <span class=\"wo17-input-desc wo17-width-desc\">\n                            </span>\n                        </div>\n\n                        <div class=\"wo17-drop-wrap pull-left\">\n                            <label>\n                                Drop (<span class=\"wo17-data-unit-text\">cm</span>)\n                            </label>\n                            <input \n                                data-wo17-map='[\n                                    [\"keyup blur\", \"#drop\", \"value\"]\n                                ]' \n                                type=\"number\" class=\"form-control wo17-small-input\" name=\"wo17-drop\" />\n                            <select \n                                data-wo17-map='[\n                                    [\"change\", \"#buyFractionDrop\", \"value\"]\n                                ]' \n                                class=\"form-control wo17-inches-fraction\" name=\"wo17-drop-inches-fraction\">\n                                    <option value=\"0\">0</option>\n                                    <option value=\"0.125\">1/8</option>\n                                    <option value=\"0.25\">1/4</option>\n                                    <option value=\"0.375\">3/8</option>\n                                    <option value=\"0.5\">1/2</option>\n                                    <option value=\"0.625\">5/8</option>\n                                    <option value=\"0.75\">3/4</option>\n                                    <option value=\"0.875\">7/8</option>\n                            </select>\n                            <span class=\"wo17-error-msg\"></span>\n                            <span class=\"wo17-input-desc wo17-drop-desc\">\n                            </span>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"form-group wo17-recess-or-exact-option\">\n                    <div class=\"row\">\n                        <div class=\"col-sm-4\">\n                            <span class=\"wo17-label-column\">Recess or Exact?</span>\n\n                            <a class=\"wo17-helper wo17-helper-recess-vs-exact\">What's the difference?</a>\n                        </div>\n                        <div class=\"col-sm-4\">\n                            <label>\n                                <img class=\"wo17-label-feature-image\" src=\"https://cdn.interiorgoodsdirect.com/woodens/img/product/options/inside-recess-width-web.jpg\" /> \n                                <input \n                                    data-wo17-map='[\n                                        [\"click\", \"#Option847\", \"click\"]\n                                    ]' \n                                    type=\"radio\" name=\"wo17-recess\" checked=\"checked\" value=\"recess\">\n                                Recess\n                            </label>\n                        </div>\n                        <div class=\"col-sm-4\">\n                            <label>\n                                <img class=\"wo17-label-feature-image\" src=\"https://cdn.interiorgoodsdirect.com/woodens/img/product/options/exact-blind-size.jpg\" /> \n                                <input \n                                    data-wo17-map='[\n                                        [\"click\", \"#Option846\", \"click\"]\n                                    ]' \n                                    type=\"radio\" name=\"wo17-recess\" value=\"exact\">\n                                Exact\n                            </label>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"wo17-additional-configuration\">\n                    <!-- Populated on a per-product basis -->\n                </div>\n\n                <p class=\"text-center wo17-mt15 wo17-mb0\">\n                    <button class=\"wo17-button wo17-init-next-step\">Continue</button>\n                </p>\n            </div>\n            <div class=\"wo17-step__surefit\">\n                <p>Add SureFit protection for just \xA39.99 at the basket.</p>\n                <p>If it turns out you made some kind of measurement error we will\n                    replace your blind absolutely free of charge.</p>\n            </div>\n            <span class=\"wo17-step__change\">\n                <i class=\"fa fa-pencil\"></i>\n                <span>Change</span>\n            </span>\n            <div class=\"wo17-step__summary\">\n            </div>\n        </div>\n        <div class=\"wo17-step wo17-step--inactive clearfix\" data-step=\"order\">\n            <div class=\"wo17-step__title\">\n                <span class=\"wo17-step__title-text\">\n                    <span class=\"wo17-step__title-prefix\">3.</span> Order\n                </span>\n            </div>\n            <div class=\"wo17-step__grand-total\">\n                <span class=\"wo17-price-prefix\">\n                    From\n                </span>\n                <span class=\"wo17-was-price\">\n\n                </span>\n                <span class=\"wo17-final-price\">\n                </span>\n                <span class=\"wo17-price-suffix\">\n                    inc. VAT\n                </span>\n            </div>\n            <div class=\"wo17-step__content\">\n                <div class=\"row wo17-flex wo17-aic\">\n                    <div class=\"col-xs-6\">\n                        <label class=\"wo17-b wo17-mb5\">Qty</label>\n                        <div class=\"wo17-qty-input-wrap form-group clearfix\">\n                            <span class=\"wo17-qty-input-wrap__action wo17-qty-input-wrap__action--minus\">-</span>\n                            <input name=\"wo17-qty\" class=\"form-control wo17-qty wo17-number-input\" \n                                data-wo17-map='[\n                                    [\"blur\", \".qty-row input.js-quantity\", \"value\"]\n                                ]' \n                                type=\"number\" min=\"1\" value=\"1\">\n                            <span class=\"wo17-qty-input-wrap__action wo17-qty-input-wrap__action--plus\">+</span>\n                        </div>\n                        <p class=\"wo17-smaller-text wo17-mb0 wo17-mt5\">Free delivery over \xA3149.99</p>\n                    </div>\n                    <div class=\"col-xs-6 text-right\">\n                        <button \n                            data-wo17-map='[\n                                [\"click\", \"#buy_it\", \"click\"]\n                            ]' \n                            class=\"wo17-button wo17-add-to-cart-button\">Add to Cart</button>\n                    </div>\n                </div>\n                <div class=\"row wo17-free-sample-info\">\n                    <div class=\"text-center wo17-mb15 wo17-rel\">\n                        <span class=\"wo17-or\">or</span>\n                        <button \n                            data-wo17-map='[\n                                [\"click\", \"#sample form.free_sample\", \"submit\"]\n                            ]' \n                            class=\"wo17-button wo17-free-sample-button\">Order FREE Sample</button>\n                    </div>\n\n                    <p class=\"text-center wo17-smaller-text wo17-mw350 wo17-mauto wo17-mb0\">\n                        Order up to 8 FREE samples. We send over 900 free samples every single day\n                        to arrive with you in the next 3 working days\n                    </p>\n                </div>\n            </div>\n        </div>\n    </div>\n";

var lightboxVideoHtml = "\n    <div class=\"pop-up_modal\" id=\"wo17-modal-video\">\n      <div>\n      <a href=\"#\" class=\"close_btn\">X</a>\n        <div class=\"overflow_fix\">\n            <style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/2q8VrqLfdMA' frameborder='0' allowfullscreen></iframe></div>\n        </div>\n      </div>\n    </div>\n";

var recessVsExactHtml = "\n    <div class=\"pop-up_modal\" id=\"wo17-modal-recess-exact\">\n      <div class=\"wo17-mw600\">\n      <a href=\"#\" class=\"close_btn\">X</a>\n        <div class=\"overflow_fix\">\n            <h2 class=\"text-center\">Recess or Exact</h2>\n            <div class=\"wo17-mb15 clearfix\">\n                <div class=\"col-sm-6 text-center\">\n                    <h3>Recess Size</h3>\n                    <img class=\"\" src=\"https://cdn.interiorgoodsdirect.com/woodens/img/product/options/inside-recess-width-web.jpg\" /> \n                </div>\n                <div class=\"col-sm-6 text-center\">\n                    <h3>Exact Size</h3>\n                    <img class=\"\" src=\"https://cdn.interiorgoodsdirect.com/woodens/img/product/options/exact-blind-size.jpg\" /> \n                </div>\n            </div>\n            <p class=\"wo17-mb15\">If you want your blind to sit inside the window recess then select the <em>recess</em> measurement we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</p>\n            <p class=\"wo17-mb15\">If you want us to make the blind exactly to the size you specify select the exact size. We will not make any deductions from the size.</p>\n        </div>\n      </div>\n    </div>\n";

var Validators = function () {
    function Validators() {
        _classCallCheck(this, Validators);

        this.stack = [];
    }

    _createClass(Validators, [{
        key: "add",
        value: function add(name, func) {
            this.stack[name] = func;
        }
    }, {
        key: "get",
        value: function get(name, func) {
            return this.stack[name];
        }
    }, {
        key: "execute",
        value: function execute(name, params) {
            var validator = this.get(name);
            if (validator) {

                var result = validator.apply(null, params);

                if (!result && typeof this.failedExecutionCallback == 'function') {
                    this.failedExecutionCallback.apply(null, params);
                }

                return result;
            }
            return true;
        }
    }, {
        key: "addFailedExecutionCallback",
        value: function addFailedExecutionCallback(fn) {
            this.failedExecutionCallback = fn;
        }
    }]);

    return Validators;
}();

var addFreeSampleToBasket = function addFreeSampleToBasket() {
    $('#sample form.free_sample').trigger('submit');
};

/**
 * GA Send Event
 */

/**
 * Do CSS Animation 
 *
 * Helper w/ removal after running
 */
var cssAnimation = function cssAnimation(element, className) {
    element.addClass(className);
    element.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        element.removeClass(className);
    });
};

/**
 * Convert inputs into +/- inputs
 * and implict validate on non-numeric or < 1 values
 */
var numberInput = function numberInput(input) {
    var prev = input.previousElementSibling,
        next = input.nextElementSibling;

    var triggerBlur = function triggerBlur() {
        input.focus();
        input.blur();
    };

    prev.addEventListener('click', function (e) {
        var val = parseInt(input.value);
        if (val > 2) {
            input.value = val - 1;
        } else {
            input.value = 1;
        }

        triggerBlur();
    });

    next.addEventListener('click', function (e) {
        var val = parseInt(input.value);
        if (val > 0) {
            input.value = val + 1;
        } else {
            input.value = 1;
        }

        triggerBlur();
    });

    input.addEventListener('blur', function (e) {
        var num = parseInt(input.value);
        if (isNaN(num) || num < 1) {
            input.value = 1;
        }
    });
};

/**
 * Full story integration
 */
var fullStory = function fullStory(experiment_str, variation_str) {
    UC.poller([function () {
        var fs = window.FS;
        if (fs && fs.setUserVars) return true;
    }], function () {
        window.FS.setUserVars({
            experiment_str: experiment_str,
            variation_str: variation_str
        });
    }, { multiplier: 1.2, timeout: 0 });
};

/**
 * Modal Lightbox
 * https://codepen.io/ScottTaylor96/pen/eRvdBR
 */
var lightbox = function lightbox(modal) {
    var slideQ = false;

    function toggle(e) {
        if (slideQ === false) {
            slideQ = true;
            e.preventDefault();

            if (modal.hasClass("active")) {
                modal.fadeOut("slow", function () {
                    modal.removeClass("active");
                    slideQ = false;
                });

                modal.find('iframe').each(function () {
                    $(this).attr('src', '');
                });
            } else {
                var iframes = modal.find('iframe');
                iframes.each(function () {
                    if (!$(this).attr('src')) {
                        var d = $(this).data('original-src');
                        if (d) {
                            $(this).attr('src', d);
                        }
                    }
                });

                modal.fadeIn("slow", function () {
                    modal.addClass("active");
                    slideQ = false;
                });
            }
        }
    }

    modal.find('iframe').each(function () {
        $(this).data('original-src', $(this).attr('src'));
    });

    $(document).on("mousedown", function (e) {
        if (!$(e.target).closest(".pop-up_modal > div").length) {
            if (modal.hasClass("active")) {
                toggle(e);
            }
        }
    });

    $(document).on('keyup', function (e) {
        if (e.which === 27) {
            if (modal.hasClass("active")) {
                toggle(e);
            }
        }
    });

    modal.find('.close_btn').on('click', toggle);

    return {
        toggle: toggle
    };
};

var scrollToFirstInstanceOf = function scrollToFirstInstanceOf(element) {
    var yPos = (element.eq(0).offset() || {}).top;
    if (yPos) {
        $('body,html').animate({
            scrollTop: yPos - 30
        }, 300);
    }
};

var Accordion = function () {
    /**
     * Constructor
     */
    function Accordion(validators) {
        _classCallCheck(this, Accordion);

        this.path = [];

        if (!validators) {
            throw "Missing validators.";
        }

        this.validators = validators;

        this.currentStep = $('.wo17-step[data-default-step=1]');
    }

    /**
     * Reference to active measurement type
     */


    _createClass(Accordion, [{
        key: "setUnit",
        value: function setUnit(unitName) {
            this.unit = unitName;
        }

        /**
         * Get current step data-step attribute string identifier
         */

    }, {
        key: "getCurrentStepName",
        value: function getCurrentStepName() {
            return this.currentStep.attr('data-step');
        }

        /**
         * Entry point for running accordion
         */

    }, {
        key: "run",
        value: function run() {
            this.bindEventHandlers();
        }

        /**
         * Helper bind listeners
         */

    }, {
        key: "bindEventHandlers",
        value: function bindEventHandlers() {
            var _this = this;

            $('.wo17-init-next-step').on('click', function (e) {
                _this.decision();
            });

            $('.wo17-add-to-cart-button').on('click', function (e) {
                return _this.decision();
            });

            $('.wo17-step__change').on('click', function (e) {
                var targetStep = $(e.currentTarget).parent('.wo17-step').attr('data-step');
                _this.goToStep(targetStep);
            });
        }

        /**
         * Update summary against step
         */

    }, {
        key: "updateSummary",
        value: function updateSummary(content) {
            this.currentStep.find('.wo17-step__summary').append(['<span class="wo17-step__summary-tick">', '<i class="fa fa-check"></i>', ' ', content, '</span>'].join(''));
        }

        /**
         * Decide how we should proceed to a step based on current
         * step and sometimes the answer given dictates how we proceed
         */

    }, {
        key: "decision",
        value: function decision() {
            if (!this.validators.execute(this.getCurrentStepName(), [this.currentStep])) {
                return false;
            }

            var answerGiven = '';

            switch (this.getCurrentStepName()) {
                case 'measurements-known-question':
                    // ----------------------------------------------------------------
                    // Question 1
                    // ----------------------------------------------------------------
                    answerGiven = this.currentStep.find('[name=wo17-step1]:checked').val();

                    this.path = [answerGiven];

                    if (answerGiven == 1) {
                        $(['[data-step=measurements-help-recess]', '[data-step=measurements-help-add-measurements]'].join(',')).addClass('wo17-step--hidden');

                        $(['[data-step=enter-measurements]', '[data-step=order]'].join(',')).removeClass('wo17-step--hidden');

                        $('[data-step=enter-measurements]').find('.wo17-step__title-prefix').text('2.');
                        $('[data-step=order]').find('.wo17-step__title-prefix').text('3.');

                        this.updateSummary('Yes I have measured up');

                        this.goToStep('enter-measurements');
                    } else if (answerGiven == 2) {
                        $(['[data-step=measurements-help-recess]', '[data-step=measurements-help-add-measurements]'].join(',')).removeClass('wo17-step--hidden');

                        $(['[data-step=enter-measurements]', '[data-step=order]'].join(',')).addClass('wo17-step--hidden');

                        $('[data-step=enter-measurements]').find('.wo17-step__title-prefix').text('4.');
                        $('[data-step=order]').find('.wo17-step__title-prefix').text('5.');

                        this.updateSummary('No, show me');

                        this.goToStep('measurements-help-recess');
                    }

                    return true;
                case 'enter-measurements':
                    // ----------------------------------------------------------------
                    // Question 2a
                    // ----------------------------------------------------------------
                    var widthGiven = $('[name=wo17-width]').val(),
                        widthGivenFraction = $('[name=wo17-width-inches-fraction]').val() || 0,
                        dropGiven = $('[name=wo17-drop]').val(),
                        dropGivenFraction = $('[name=wo17-drop-inches-fraction]').val() || 0;

                    var recessGiven = $('[name=wo17-recess]:checked').val();
                    recessGiven = recessGiven.charAt(0).toUpperCase() + recessGiven.substring(1);

                    widthGiven = parseFloat(widthGiven);
                    dropGiven = parseFloat(dropGiven);

                    if (widthGivenFraction) {
                        widthGiven += parseFloat(widthGivenFraction);
                    }
                    if (dropGivenFraction) {
                        dropGiven += parseFloat(dropGivenFraction);
                    }

                    this.updateSummary("Width: " + widthGiven + " " + this.unit);
                    this.updateSummary("Drop: " + dropGiven + " " + this.unit);
                    this.updateSummary("Measurement: " + recessGiven);

                    this.goToStep('order');

                    return true;
                case 'measurements-help-recess':
                    // ----------------------------------------------------------------
                    // Question 2b
                    // ----------------------------------------------------------------
                    answerGiven = this.currentStep.find('[name=wo17-help-recess]:checked').val();

                    switch (answerGiven) {
                        case 'recess':
                            this.updateSummary('Recess');
                            break;
                        case 'exact':
                            this.updateSummary('Exact');
                            break;
                    }

                    this.goToStep('measurements-help-add-measurements');

                    return true;
                case 'measurements-help-add-measurements':
                    // ----------------------------------------------------------------
                    // Question 3b
                    // ----------------------------------------------------------------
                    $(['[data-step=enter-measurements]', '[data-step=order]'].join(',')).removeClass('wo17-step--hidden');

                    this.updateSummary('Add Measurements');

                    this.goToStep('enter-measurements');

                    return true;
                case 'order':
                    return true;
            }
        }

        /**
         * Helper go to question given identifier
         */

    }, {
        key: "goToStep",
        value: function goToStep(step) {
            var targetStep = $('.wo17-step[data-step=' + step + ']');

            // Unmark complete steps
            $('.wo17-step').removeClass('wo17-step--complete');
            targetStep.prevAll('.wo17-step').addClass('wo17-step--complete');

            // Clear summaries
            targetStep.find('.wo17-step__summary-tick').remove();
            targetStep.nextAll('.wo17-step').each(function () {
                $(this).find('.wo17-step__summary-tick').remove();
            });

            // Animation
            cssAnimation(targetStep.find('.wo17-step__content'), 'wo17-anim-translateOutThenIn');
            cssAnimation(targetStep.find('.wo17-step__title'), 'wo17-anim-translateOutThenInReverse');

            // Mark all steps inactive
            $('.wo17-step').addClass('wo17-step--inactive');
            targetStep.removeClass('wo17-step--inactive');

            this.currentStep = targetStep;
        }
    }]);

    return Accordion;
}();

// ------------------------------------------
// IMPORTANT!!!!
// _____________________________________
//
// DO NOT EDIT THIS TEST DIRECTLY IN VWO
// _____________________________________
//
// Modify the source in the ab-test-sandbox repo
// ------------------------------------------

var run = function run() {

    if (document.body.classList.contains('wo17')) {
        // Ensure test isn't already running
        return;
    }

    // ----------------------------------------------------------------
    // Vars
    // ----------------------------------------------------------------
    var imageContainer = $('#content > .row > .col-md-7:first'),
        productRightContainer = $('#content > .row > .col-md-5:first'),
        productRight = $('#product_right'),
        imageViewer = imageContainer.find('.image-viewer:first'),
        addToForm = productRightContainer.find('form:first');

    // ----------------------------------------------------------------
    // Setup
    // ----------------------------------------------------------------
    document.body.classList.add('wo17');

    fullStory('WO017---PDP-Measurement', 'V1');

    // ----------------------------------------------------------------
    // Build product  configuration area
    // ----------------------------------------------------------------
    imageContainer.removeClass('col-md-7').addClass('col-md-6');
    productRightContainer.removeClass('col-md-5').addClass('col-md-6');

    if (imageViewer && imageViewer[0] && imageViewer[0].slick) {
        // Refreshes the product image slider since we've 
        // just resized its containing div
        imageViewer[0].slick.refresh();
    }

    var accordionElm = $(accordionHtml);
    accordionElm.prependTo(productRightContainer);

    // ----------------------------------------------------------------
    // Start 'from' price
    // ----------------------------------------------------------------
    var fromPrice = $('#product_title .from-price');
    if (fromPrice.length) {
        var fromPriceClone = fromPrice.clone();

        var nowPrice = fromPriceClone.find('strike').remove().end().text().trim().replace('From', '').trim();
        fromPriceClone = null;

        var thenPrice = fromPrice.find('strike').text().trim();

        $('.wo17-final-price').text(nowPrice);
        $('.wo17-was-price').text(thenPrice);
    }

    // ----------------------------------------------------------------
    // Additional product options
    //
    // These options vary per product and so need to be added
    // to the measurements step dynamically
    // ----------------------------------------------------------------
    $('table.product_options tr').each(function (idx, item) {
        var name = $(item).find('th').text().trim(),
            helpIcon = $(item).find('.help'),
            options = $(item).find('[name^="data[Product][Option]"]');

        name = name.replace(/:$/, '');

        if (name == 'Recess or Exact') {
            // We've already dealt with this in accordionHtml
            return true;
        }

        var uniqueName = name.replace(/[^\d\w]/i, '').toLowerCase() + new Date().getTime();

        var optionContent = '';
        $.each(options, function (idx, item) {
            var elementId = $(item).attr('id');

            if ($(item).attr('type') == 'radio') {
                var label = $(item).parent().find('label'),
                    labelText = label.text();

                var checkedHtml = '';
                if ($(item).attr('checked')) {
                    checkedHtml = 'checked';
                }

                optionContent += "\n                    <label>\n                        <input \n                            type=\"radio\"\n                            name=\"" + uniqueName + "\"\n                            " + checkedHtml + "\n                            data-wo17-map='[\n                                [\"click\", \"#" + elementId + "\", \"click\"]\n                            ]'\n                        />\n                        " + labelText + "\n                    </label>\n                ";
            } else if (item.nodeName.toLowerCase() == 'select') {
                var selectOptionsHtml = item.innerHTML;

                optionContent += "\n                    <select\n                        class=\"form-control\"\n                        name=\"" + uniqueName + "\"\n                        data-wo17-map='[\n                            [\"change\", \"#" + elementId + "\", \"value\"]\n                        ]'\n                    >\n                        " + selectOptionsHtml + "\n                    </select>\n                ";
            }
        });

        var whatsThis = '';
        if (helpIcon.length) {
            var randomId = 'wo17-rand-' + new Date().getTime() + Math.ceil(1000000 * Math.random());
            helpIcon.attr('data-wo17-help-id', randomId);

            whatsThis = "\n                <a class=\"wo17-helper\"\n                    data-wo17-map='[\n                        [\"click\", \"[data-wo17-help-id=" + randomId + "]\", \"click\"]\n                    ]'\n                >What's this?</a>\n            ";
        }

        var newHtml = $("\n            <div class=\"row wo17-extra-option\">\n                <div class=\"col-sm-4 wo17-option-name\">\n                    <span class=\"wo17-label-column\">\n                        " + name + "\n                    </span>\n                    " + whatsThis + "\n                </div>\n                <div class=\"col-sm-8 wo17-option-content\">\n                    <div class=\"form-inline\">\n                        <div class=\"form-group\">\n                            " + optionContent + "\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ");

        newHtml.find('option').attr('selected', false);

        $('[data-step="enter-measurements"] .wo17-additional-configuration').append(newHtml);
    });

    // ----------------------------------------------------------------
    // Steps functionality
    //
    // Accordion with validation at steps
    // ----------------------------------------------------------------
    var validators = new Validators();

    validators.addFailedExecutionCallback(function () {
        scrollToFirstInstanceOf($('.wo17-steps .has-error'));
    });

    // Validate width and height measurements entered
    validators.add('enter-measurements', function (currentStep) {
        currentStep.find('.wo17-error-msg').removeClass('wo17-error-msg--visible');
        currentStep.find('.has-error').removeClass('has-error');

        var widthWrap = $('.wo17-width-wrap'),
            dropWrap = $('.wo17-drop-wrap');

        var valid = true;

        if (!currentStep.find('[name=wo17-width]').val().trim()) {
            widthWrap.addClass('has-error');
            valid = false;
        }
        if (!currentStep.find('[name=wo17-drop]').val().trim()) {
            dropWrap.addClass('has-error');
            valid = false;
        }

        if ($('#errmsg_width')[0].style.display != 'none') {
            var errorText = $('#errmsg_width').text(),
                errorMsg = widthWrap.find('.wo17-error-msg');

            widthWrap.addClass('has-error');
            errorMsg.addClass('wo17-error-msg--visible');
            errorMsg.text(errorText);

            valid = false;
        }
        if ($('#errmsg_drop')[0].style.display != 'none') {
            var _errorText = $('#errmsg_drop').text(),
                _errorMsg = dropWrap.find('.wo17-error-msg');

            dropWrap.addClass('has-error');
            _errorMsg.addClass('wo17-error-msg--visible');
            _errorMsg.text(_errorText);

            valid = false;
        }

        // Validate select boxes that we built dynamically
        $('.wo17-extra-option').each(function (idx, item) {
            var select = $(item).find('select');
            if (select.length && !parseInt(select.val(), 10)) {
                select.parent().addClass('has-error');
                valid = false;

                return false;
            }
        });

        return valid;
    });

    // Validate add to order step
    validators.add('order', function (currentStep) {
        var qtyInputWrap = currentStep.find('.wo17-qty-input-wrap'),
            qty = parseInt(currentStep.find('.wo17-qty').val(), 10);

        qtyInputWrap.removeClass('has-error');

        if (!qty || qty < 0) {
            qtyInputWrap.addClass('has-error');
            return false;
        }

        return true;
    });

    var accordion = new Accordion(validators);
    accordion.run();

    // ----------------------------------------------------------------
    // Lightbox 2m video
    // ----------------------------------------------------------------
    var videoLightbox = $(lightboxVideoHtml);
    videoLightbox.prependTo('body');

    var lightbox$$1 = lightbox(videoLightbox);
    $('.wo17-init-2m-video').on('click', function (e) {
        lightbox$$1.toggle(e);
    });

    // ----------------------------------------------------------------
    // Recess vs exact - what's the difference
    // ----------------------------------------------------------------
    var recessVsExactLightbox = $(recessVsExactHtml);
    recessVsExactLightbox.prependTo('body');

    var lightbox2 = lightbox(recessVsExactLightbox);
    $('.wo17-helper-recess-vs-exact').on('click', function (e) {
        lightbox2.toggle(e);
    });

    // ----------------------------------------------------------------
    // When free sample button clicked, add sample straight to basket
    // ----------------------------------------------------------------
    $('.wo17-free-sample-button').on('click', addFreeSampleToBasket);

    // ----------------------------------------------------------------
    // Inputs with number increment/decrement siblings
    // ----------------------------------------------------------------
    [].forEach.call(document.querySelectorAll('.wo17-number-input'), function (item) {
        return numberInput(item);
    });

    // ----------------------------------------------------------------
    // Price listener
    //
    // Continuously poll for changes to the price
    // Price container doesn't exist to begin with, but thereafter it
    // remains in the DOM and is updated after changes to chosen options
    // ----------------------------------------------------------------
    var pollPrice = function pollPrice() {
        var priceContainer = $('#price'),
            beforePrice = priceContainer.find('.sale-message strike').text().trim(),
            totalPriceClone = $('#newPrice').clone();

        totalPriceClone.find('span').remove();

        var totalPrice = totalPriceClone.text().trim();

        $('.wo17-final-price').text(totalPrice);
        $('.wo17-was-price').text(beforePrice);

        setTimeout(function () {
            pollPrice();
        }, 250);
    };

    UC.poller(['.price_container #newPrice'], function () {
        $('.wo17-price-prefix').hide();
        $('.wo17-price-suffix').show();

        pollPrice();
    }, {
        multiplier: 1,
        timeout: 1000000
    });

    // ----------------------------------------------------------------
    // Mapping elements
    // e.g. when one of our custom elements is clicked, trigger click
    // on corresponding target element 
    //
    // event-handler|target-element|trigger-event
    // ----------------------------------------------------------------
    $('[data-wo17-map]').each(function (idx, mapElm) {
        var mappingString = $(this).attr('data-wo17-map');
        var mapping = [];

        try {
            mapping = JSON.parse(mappingString);
        } catch (e) {
            return;
        }

        $.each(mapping, function (j, item) {
            var handler = item[0] || null,
                target = item[1] || null,
                trigger = item[2] || null;

            if (handler && target && trigger) {
                switch (trigger) {
                    case 'value':
                        $(mapElm).on(handler, function (e) {
                            $(target).val(mapElm.value);
                            $(target).trigger('keyup'); // Event on target 'original' element
                            $(target).trigger('change'); // Event on target 'original' element
                        });
                        break;
                    default:
                        $(mapElm).on(handler, function (e) {
                            $(target).trigger(trigger);
                        });
                }
            }
        });
    });

    // ----------------------------------------------------------------
    // Product right region is hidden so move modal outside of it
    // ----------------------------------------------------------------
    $('.product_right .modal').prependTo($('#product_right'));

    // ----------------------------------------------------------------
    // Unit selector
    // 
    // NB On page load a value of mm, inches or cm will be selected
    // This unit selector only uses cm and inches so always do 
    // corresponding faux click on given unit
    // ----------------------------------------------------------------
    var changeUnits = function changeUnits(unitsTo) {
        $('.wo17-data-unit-text').text(unitsTo);
    };

    var mapToRealUnitChanger = function mapToRealUnitChanger(unitsTo) {
        switch (unitsTo) {
            case 'inch':
                $('#MeasurementTypeInch')[0].click();
                $('.wo17-inches-fraction').show();
                break;
            case 'cm':
                $('#MeasurementTypeCm')[0].click();
                $('.wo17-inches-fraction').val(0).trigger('change').hide();
                break;
        }
    };

    // On page load
    var chosenUnitsByDefault = $('[name="data[Product][measurement_type]"]:checked').val();
    if (chosenUnitsByDefault == 'mm') {
        chosenUnitsByDefault = 'cm';
    }
    changeUnits(chosenUnitsByDefault);
    mapToRealUnitChanger(chosenUnitsByDefault);

    accordion.setUnit(chosenUnitsByDefault);

    $('.wo17-unit-selector-option').removeClass('wo17-unit-selector-option--selected');
    $('.wo17-unit-selector-option--' + chosenUnitsByDefault).addClass('wo17-unit-selector-option--selected');

    // When unit selector changed
    $('.wo17-unit-selector-option').on('click', function (e) {
        var chosen = $(e.currentTarget),
            chosenType = chosen.hasClass('wo17-unit-selector-option--inch') ? 'inch' : 'cm';

        accordion.setUnit(chosenType);

        $('.wo17-unit-selector-option').removeClass('wo17-unit-selector-option--selected');
        chosen.addClass('wo17-unit-selector-option--selected');

        changeUnits(chosenType);
        mapToRealUnitChanger(chosenType);
    });
};

// ----------------------------------------------------------------
// Poll required elements
// ----------------------------------------------------------------
UC.poller([function () {
    return !!window.jQuery;
}], run);
})();