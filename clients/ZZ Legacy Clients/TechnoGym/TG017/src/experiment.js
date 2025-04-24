import translate from './lib/translations';

var _TG017 = (function () {

            var UC = function (a) {
                return a.poller = function (a, b, c) {
                    var d = {
                            wait: 50,
                            multiplier: 0,
                            timeout: 7000
                        },
                        e = Date.now || function () {
                            return (new Date).getTime()
                        };
                    if (c)
                        for (var f in c) d[f] = c[f];
                    else c = d;
                    for (var g = !!d.timeout && new Date(e() + d.timeout), h = d.wait, i = d.multiplier, j = [], l = function (c, d) {
                            if (g && e() > g) return !1;
                            d = d || h,
                                function () {
                                    var a = typeof c;
                                    return "function" === a ? c() : "string" !== a || document.querySelector(c)
                                }() ? (j.push(!0), j.length === a.length && b()) : setTimeout(function () {
                                    l(c, d * i)
                                }, d)
                        }, m = 0; m < a.length; m++) l(a[m])
                }, a
            }(UC || {});
            // Send GA Events With Tracker Name ------------
            // ---------------------------------------------
            function sendEvent(e, n, a, r, t, o) {
                var c = function (c) {
                    var i = {};
                    i.nonInteraction = r, t && o && (i["dimension" + t] = o), window.ga(c + ".send", "event", e, n, a, i)
                };
                trackerName ? c(trackerName) : UC.poller([function () {
                    return window.ga.getAll
                }], function () {
                    trackerName = window.ga.getAll()[0].get("name"), c(trackerName)
                })
            }
            var trackerName;

            // -----------------------------------------------
            // Full story integration
            // -----------------------------------------------
            UC.poller([
                function () {
                    var fs = window.FS;
                    if (fs && fs.setUserVars) return true;
                }
            ], function () {
                window.FS.setUserVars({
                    experiment_str: 'TG017',
                    variation_str: 'Variation 1'
                });
            }, {
                multiplier: 1.2,
                timeout: 0
            });

            // Poll start
            UC.poller([
                'body',
                '.block-subscribe',
                '.modal-body',
                '.actions .button.btn-default',
                function () {
                    if (window.jQuery) return true;
                },
                function () {
                    if (window.ga) return true;
                }
            ], TG017, {
                timeout: 7000,
                multiplier: 'disable'
            });
            // Variation
            function TG017() {

                var $ = window.jQuery;
                var $body = $('body');
                $body.addClass('TG017');


                sendEvent('TG017 - Newsletter Signup', 'Page View', 'TG017 Page view', true);

                // Prevent welcome modal showing
                if(window.jQuery && window.jQuery.fn.modal) {
                  window.jQuery('#newsletter-welcome-modal').on('show.bs.modal', (e) => {
                    e.preventDefault();
                  });
                }

                /*-------------------------------------------------------------------
                Italian/English content
                ---------------------------------------------------------------------*/
                var URL = window.location.href;
                var path  = window.location.pathname;
                var matches = path.match(/^\/(\w+)\//i);
                var countryCode = matches && matches[1] ? matches[1] : 'gb';

                var homepageTitle = translate('homepageTitle', countryCode),
                    emailTitle = translate('emailTitle', countryCode),
                    formBulletPoint1 = translate('formBulletPoint1', countryCode),
                    formBulletPoint2 = translate('formBulletPoint2', countryCode),
                    formBulletPoint3 = translate('formBulletPoint3', countryCode),
                    sideTabsubtext = translate('sideTabsubtext', countryCode),
                    lightboxText = translate('lightboxText', countryCode),
                    exitText = translate('exitText', countryCode),
                    placeholder = translate('placeholder', countryCode),
                    subscribeText = translate('subscribeText', countryCode),
                    nameLabel = translate('nameLabel', countryCode),
                    lastNameLabel = translate('lastNameLabel', countryCode),
                    exitSignup = translate('exitSignup', countryCode),
                    privacyRequired = translate('privacyRequired', countryCode);


                /*Add fade to body, will be used across each section*/
                var fadeBox = $('<div class="tg17-fade"/>');
                fadeBox.prependTo($body);

                /*-------------------------------------------------------------------
                1. Bottom of the page form 
                ---------------------------------------------------------------------*/
                function bottomForm() {
                    var pollerOpts = {
                        timeout: 30000,
                        multiplier: 0
                    };

                    /*-------------------------------
                        Add Email newsletter signup form to the Homepage
                        ---------------------------------*/
                    var newsletterLink = $('<div class="tg17-newsletterLink col-sm-4"><i class="icon-Mail"></i><a href="#tg17-join">' + homepageTitle + '</a></div>');
                    $('.row.shortcode-row.fast_contacts.boxed-row:first .horizontal_proposition').find('.text_me').after(newsletterLink);


                    /*-------------------------------
                    create bottom newsletter block
                    ---------------------------------*/
                    var bottomEmailform = $('<div id="tg17-join" class="tg17-newsletterpage-form"/>');


                    /*-------------------------------------------------------------------
                    if the form is on the newsroom page place it at the top otherwise place it at the bottom
                    ---------------------------------------------------------------------*/

                    var pollerOpts = {
                        timeout: 20000,
                        multiplier: 0
                    };
                    if (URL.match('/newsroom-home')) {
                        UC.poller(['.post-container.page-container.default'], function () {
                            bottomEmailform.prependTo('.post-container.page-container.default');
                        }, pollerOpts);
                    } else {
                        UC.poller(['.post-container.page-container.default'], function () {
                            bottomEmailform.insertAfter('.post-container.page-container.default .container:last');
                        }, pollerOpts);
                    }


                    bottomEmailform.html(['<div class="tg17-bottomForm">',
                        '<h3><i class="icon-Mail"></i>' + homepageTitle + '</h3>',

                        '<div class="tg17-emailForm">',
                        '<p class="tg17-email-text">' + emailTitle + '</p>',
                        '<input type="text" class="tg17-input" placeholder="' + placeholder + '"/>',
                        '<div class="tg17-submitbutton">' + subscribeText + '</div>',
                        '<div class="tg17-emailBulletpoints">',
                        '<div class="tg17-usp"><img src="https://ab-test-sandbox.userconversion.com/experiments/TG017-tick.png"/><p>' + formBulletPoint1 + '</p></div>',
                        '<div class="tg17-usp"><img src="https://ab-test-sandbox.userconversion.com/experiments/TG017-tick.png"/><p>' + formBulletPoint2 + '</p></div>',
                        '<div class="tg17-usp"><img src="https://ab-test-sandbox.userconversion.com/experiments/TG017-tick.png"/><p>' + formBulletPoint3 + '</p></div>',
                        '</div>',
                        '</div>',
                        '</div>'
                    ].join(''));

                    /*-------------------------------
                    Smooth anchor link to new form area
                    ---------------------------------*/
                    var topLinkevent;

                    $('.tg17-newsletterLink a').click(function () {

                        if (!topLinkevent) {
                            sendEvent('TG017 - Newsletter Signup', 'Page View', 'TG017 user clicked join link under main banner"', true);
                            topLinkevent = true;
                        }
                        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

                            var target = $(this.hash);
                            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                            if (target.length) {
                                $('html,body').animate({
                                    scrollTop: target.offset().top
                                }, 1000);
                                return false;
                            }
                        }
                    });

                }
                bottomForm();

                function fakeClick() {
                    var pollerOpts = {
                        timeout: 30000,
                        multiplier: 0
                    };
                    var URL = window.location.href;
                    /*-------------------------------
                        when the "fake" form is filled, mirror this in the actual form
                        ---------------------------------*/
                    UC.poller(['.footer-bottom.container .block-subscribe'], function () {
                        var $footerForm = $('.footer-bottom.container .block-subscribe');

                        $('.tg17-input').on('keyup keypress blur', function () {
                            $footerForm.find('input[type=email]').val($(this).val());
                        });

                        /*-------------------------------
                        when the "fake" subscribe clicked, click actual submit bottom to open "father" form
                        ---------------------------------*/
                        var submitEvent;

                        $('.tg17-submitbutton').click(function () {
                            $footerForm.find('.actions .button.btn-default').click();

                            if (URL.match('/newsroom-home')) {

                                if (!submitEvent) {
                                    sendEvent('TG017', 'subscribe form opened, TG017 User clicked new subscribe button on newsroom', true);
                                    submitEvent = true;
                                }
                            } else {
                                if (!submitEvent) {
                                    sendEvent('TG017', 'subscribe form opened, TG017 User opened form on homepage', '', true);
                                    submitEvent = true;
                                }

                            }

                        });


                    }, pollerOpts);
                }
                fakeClick();


                /*-------------------------------------------------------------------
                3. SLIDE OUT TAB ON CATEGORY PAGES
                ---------------------------------------------------------------------*/
                function slideoutTab() {
                    var pollerOpts = {
                        timeout: 20000,
                        multiplier: 0
                    };
                    UC.poller(['.block-subscribe > form'], function () {

                        var body = $('body');
                        var newTab = $('<div class="tg17-fixedform-tab"/>'),
                            categoryForm = $('<div class="tg17-catForm"/>');
                        newTab.prependTo(body);
                        categoryForm.insertAfter('.tg17-fade');


                        newTab.html(['<i class="icon-Mail"></i><p>' + homepageTitle + '</p><p class="tg17-sidetext">' + sideTabsubtext + '</p>']);

                        var newsletterForm = $('.block-subscribe > form');
                        newsletterForm.appendTo('.tg17-catForm');

                        /*text at the top of form*/
                        categoryForm.find('.modal-body').prepend('<div class="tg17-catform-toptext"/>');

                        $('.tg17-catform-toptext').html('<div class="tg17-exitform">&times;</div><i class="icon-Mail"></i><h3>' + homepageTitle + '</h3><p>' + lightboxText + '</p>');

                        /*move privacy policy within form*/
                        var URL = window.location.href;
                        if (URL.indexOf("/it/") > -1) {
                            $('.tg17-catForm').addClass('tg17-italian');
                            $('.tg17-catForm .modal-body .input-box .interest label:first').html(
                                translate('newslettersLikeReceive', countryCode)
                                + ' <span class="tg17-required">*</span>'
                            );
                            $('.modal-body .input-box .interest li:eq(4) label').text('Per centri medici');
                        } else {
                            $('.tg17-catForm .modal-body .privacy-link').insertAfter('.tg17-catForm .input-box .interest > label');
                            $('.tg17-catForm').removeClass('tg17-italian');
                            var mandatoryText = $('<div class="tg17-required_text"><span class="tg17-required">*</span> ' + translate('mandatoryField', countryCode) + '</div>');
                            $('.tg17-catform-toptext').append(mandatoryText);
                        }

                        /*remove placeholders*/
                        $('.tg17-catForm .modal-body input').each(function () {
                            $(this).attr('placeholder', '');
                        });
                        categoryForm.find('.modal .modal-footer .btn span').text(subscribeText);

                        /*change label names*/
                        categoryForm.find('.modal-body .input-box:first label').html(emailTitle + '<span class="tg17-required">*</span>');
                        categoryForm.find('.modal-body .input-box:eq(1)').addClass('tg17-firstName').next().addClass('tg17-lastName');
                        categoryForm.find('.tg17-lastName > label').html(lastNameLabel + '<span class="tg17-required">*</span>');
                        categoryForm.find('.tg17-firstName > label').html(nameLabel + '<span class="tg17-required">*</span>');

                        var tabEvent;
                        /*slide out form on click*/
                        newTab.click(function () {
                            categoryForm.addClass('tg17-open');
                            if (!tabEvent) {
                                sendEvent('TG017', 'Side tab opened, TG017 User clicked on slide out tab on category page', '', true);
                                tabEvent = true;
                            }
                        });

                        $('.tg17-exitform').click(function () {
                            categoryForm.removeClass('tg17-open');
                        });
                        $('.tg17-fade.tg17-fadeActive').click(function () {
                            $('.tg17-fade').removeClass('tg17-fadeActive');
                        });


                        //FORM VALIDATION

                        $('.tg17-catForm .interest #interest_1_newsletter').prop('checked', true);

                        //Add fake button to check for validation
                        var validationButton = $('<div class="tg17-formValid btn btn-default">' + subscribeText + '</div>');
                        validationButton.appendTo('.tg17-catForm .modal-footer');

                        var formFields = $('.tg17-catForm');
                        if (!formFields.hasClass('tg17-lightbox')) {
                            formFields.find('.interest li.first').before('<p class="tg17-options_validation tg17-check_error">' + translate('pleaseSelectOption', countryCode) + '</p>');
                        } else {
                            formFields.find('.tg17-catform-toptext').after('<p class="tg17-options_validation tg17-check_error">' + translate('pleaseSelectOption', countryCode) + '</p>');
                        }
                        formFields.find('.tg17-catform-toptext').after('<p class="tg17-fields_validation tg17-check_error">' + translate('fillInAllFields', countryCode) + '</p>');


                        var $optionsRequired = $('.tg17-catForm .tg17-options_validation'),
                            $formValidation = $('.tg17-catForm .tg17-fields_validation'),
                            $submitButton = $('.tg17-catForm .modal-footer .btn.btn-default:first'),
                            $fakeButton = $('.tg17-catForm .modal-footer .tg17-formValid');

                        $optionsRequired.hide();
                        $formValidation.hide();
                        $fakeButton.show();
                        $submitButton.hide();


                        function formValidation() {

                            var formFields = $('.tg17-catForm .modal-body');
                            if ($('.tg17-catForm .input-box input[type=checkbox]:checked').length === 0) {
                                $optionsRequired.show();
                            } else if ($(formFields).find('input').val() === '') {
                                $formValidation.show();
                            } else {
                                $submitButton.click();
                            }
                        }

                        $fakeButton.click(function () {
                            formValidation();
                        });


                    }, pollerOpts);

                }

                /*-------------------------------------------------------------------
                4. EXIT INTENT FORM
                ---------------------------------------------------------------------*/
                function exitForm() {

                    var pollerOpts = {
                        timeout: 20000,
                        multiplier: 0
                    };

                    UC.poller(['.block-subscribe > form'], function () {

                            var modal = {
                                // Append modal to the body
                                contentBuilder: function () {
                                    var lightbox = $('.tg17-fade').after([
                                        '<div class="tg17-lightbox tg17-catForm">',
                                        '<div class="tg17lightbox-exit">x</div>',
                                        '<div class="tg17-leftside"/>',
                                        '<div class="tg17-rightside"/>',
                                        '</div>'
                                    ].join(''));


                                    var exitBox = $('.tg17-lightbox');
                                    var newsletterForm = $('.block-subscribe > form');
                                    newsletterForm.appendTo('.tg17-lightbox .tg17-leftside');

                  var $loader = $('<div class="tg17-loader"/>');
                  $loader.prependTo('.tg17-lightbox.tg17-catForm .tg17-leftside');
                  $loader.removeClass('tg17-loadershowing');
                  
                                    exitBox.find('.modal-body').prepend('<div class="tg17-catform-toptext"/div>');

                                    exitBox.find('.tg17-catform-toptext').html('<i class="icon-Mail"></i><h3>' + exitText + '</h3><p>' + lightboxText + '</p>');

                                    //Add new tickbox

                                    var newCheckbox = $('<div class="TG17-checkbox"><input type="checkbox" class="TG17-wellness checkbox"/><span>' + exitSignup + '</span></div>');

                                    newCheckbox.insertAfter('.tg17-lightbox .tg17-catform-toptext');

                                    newCheckbox.find('input').prop('checked', true);


                                    //If new checkbox is ticked, tick the hidden one
                                    var wellnessCheckbox = $('.tg17-lightbox.tg17-catForm .interest #interest_1_newsletter');
                                    wellnessCheckbox.prop('checked', true);


                                    newCheckbox.find('input').on('change', function () {
                                        wellnessCheckbox.prop('checked', this.checked);
                                    });


    


                                    /*move privacy policy within form - different on italian version*/
                                    var URL = window.location.href;

                                    exitBox.find('.modal-body .input-box:first label').html(emailTitle + '<span class="tg17-required">*</span>');
                                    exitBox.find('.modal-body .input-box:eq(1)').addClass('tg17-firstName').next().addClass('tg17-lastName');
                                    exitBox.find('.tg17-lastName > label').html(lastNameLabel + '<span class="tg17-required">*</span>');
                                    exitBox.find('.tg17-firstName > label').html(nameLabel + '<span class="tg17-required">*</span>');

                                    if (URL.indexOf("/gb/") > -1) {
                                        exitBox.addClass('tg17-italian');
                                        $('.tg17-lightbox .modal-body .input-box .interest label:first').html(
                                            translate('newslettersLikeReceive', countryCode) 
                                            + ' <span class="tg17-required">*</span>'
                                        );
                                        $('.tg17-lightbox .input-box.terms-privacy').prependTo('.tg17-lightbox .modal-footer');
                                        $('<span class="tg17-required_label">* ' + 
                                          translate('mandatoryField', countryCode)
                                        + '</span>').prependTo('.tg17-lightbox .modal-footer');
                                    } else {
                                        exitBox.find('.modal-body .privacy-link').insertAfter('.tg17-lightbox .input-box .interest > label');
                                        exitBox.removeClass('tg17-italian');

                                        var mandatoryText = $('<div class="tg17-required_text"><span class="tg17-required">*</span> ' + 
                                        translate('mandatoryField', countryCode) 
                                        + '</div>');

                                        $('.tg17-lightbox .input-box:last .interest').prepend(mandatoryText);
                                    }

                                    /*remove placeholders*/
                                    $('.tg17-lightbox .modal-body input').each(function () {
                                        $(this).attr('placeholder', '');
                                    });

                                    $('.tg17lightbox-exit').click(function () {
                                        $('.tg17-fade').removeClass('tg17-fadeActive');
                                        exitBox.removeClass('tg17-active').hide();
                                    });
                                    $('.tg17-fade.tg17-fadeActive').click(function () {
                                        exitBox.removeClass('tg17-active').hide();
                                        $('.tg17-fade').removeClass('tg17-fadeActive');
                                    });


                                    $body.modal = $(".tg17-lightbox");

                                    //Add fake button to check for validation
                                    var validationButton = $('<div class="tg17-formValid btn btn-default">' + subscribeText + '</div>');
                                    validationButton.appendTo('.tg17-lightbox.tg17-catForm .modal-footer');

                                    var formFields = $('.tg17-lightbox.tg17-catForm');
                                    formFields.find('.interest li.first').before('<p class="tg17-options_validation tg17-check_error">' + translate('pleaseSelectOption', countryCode) + '</p>');
                                    formFields.find('.tg17-catform-toptext').after('<p class="tg17-fields_validation tg17-check_error">' + translate('fillInAllFields', countryCode) + '</p>');

                                    formFields.find('.input-box.terms-privacy').prepend('<p class="tg17-fields_validation tg17-check_error">' + privacyRequired + '</div>');

                                    var $exitoptionsRequired = $('.tg17-lightbox.tg17-catForm .tg17-options_validation'),
                                        $exitformValidation = $('.tg17-lightbox.tg17-catForm .tg17-fields_validation'),
                                        $exitsubmitButton = $('.tg17-lightbox.tg17-catForm .modal-footer .btn.btn-default:first'),
                                        $exitfakeButton = $('.tg17-lightbox.tg17-catForm .modal-footer .tg17-formValid'),
                                        $privacyChecked = $('.tg17-lightbox.tg17-italian.tg17-catForm .input-box.terms-privacy .tg17-fields_validation');

                                    $privacyChecked.hide();
                                    $exitoptionsRequired.hide();
                                    $exitformValidation.hide();
                                    $exitfakeButton.show();
                                    $exitsubmitButton.hide();

                                    var $emailvalid,
                      $nameValid,
                      $surnameValid;



                                    if (URL.indexOf("/it/") === -1) {
             
                   
                    
                                        $exitfakeButton.click(function () {


                                                var emailInput = $('.tg17-lightbox .modal-body .input-box:first input'),
                                                        nameInput = $('.tg17-lightbox .input-box.tg17-firstName input'),
                                                        lastNameInput = $('.tg17-lightbox .input-box.tg17-lastName input');

                                                if (emailInput.val() === ''){
                          $(emailInput).addClass('tg17-boxrequired');
                                                    $exitformValidation.show();
                          $emailvalid = false;
                        }else{
                             $emailvalid = true;
                            $(emailInput).removeClass('tg17-boxrequired');
                        }
                        
                        if (nameInput.val() === ''){
                          $(nameInput).addClass('tg17-boxrequired');
                          $nameValid = false;
                        }else{
                            $nameValid = true;
                            $(nameInput).removeClass('tg17-boxrequired');
                        }
                        if (lastNameInput.val() === ''){
                          $(lastNameInput).addClass('tg17-boxrequired');
                          $surnameValid = false;
                        }else{
                             $surnameValid = true;
                            $(lastNameInput).removeClass('tg17-boxrequired');
                        }
                        
                        if($surnameValid && $emailvalid && $nameValid){
                          $loader.addClass('tg17-loadershowing');
                           $exitsubmitButton.click();
                        }else{
                          $exitformValidation.show();
                        }
                                            
                                        });

                                    } else {
                    //change privacy policy text
                 $('.tg17-lightbox .input-box.terms-privacy > div').html('<input name="policyagreement" class="checkbox" type="checkbox">' + translate('agreeTermsOfUse', countryCode));
                    
                    
                                        $exitfakeButton.click(function () {

                                            if ($('.tg17-lightbox.tg17-catForm .input-box.terms-privacy input[type=checkbox]:checked').length === 0) {
                                                $privacyChecked.show();
                                            } else {
                        $loader.addClass('tg17-loadershowing');
                                                $exitsubmitButton.click();
                                            }
                                        });
                                    }

                                }
                                }
                                    var exitIntent = {
                                        // OuiBounce plugin
                                        ouiPlugin: function () {
                                            (function (root, factory) {
                                                if (typeof define === 'function' && define.amd) {
                                                    define(factory);
                                                } else if (typeof exports === 'object') {
                                                    module.exports = factory(require, exports, module);
                                                } else {
                                                    root.ouibounce = factory();
                                                }
                                            }(this, function (require, exports, module) {

                                                return function ouibounce(el, custom_config) {
                                                    "use strict";

                                                    var config = custom_config || {},
                                                        aggressive = config.aggressive || false,
                                                        sensitivity = setDefault(config.sensitivity, 20),
                                                        timer = setDefault(config.timer, 1000),
                                                        delay = setDefault(config.delay, 0),
                                                        callback = config.callback || function () {},
                                                        cookieExpire = setDefaultCookieExpire(config.cookieExpire) || '',
                                                        cookieDomain = config.cookieDomain ? ';domain=' + config.cookieDomain : '',
                                                        cookieName = config.cookieName ? config.cookieName : 'viewedOuibounceModal',
                                                        sitewide = config.sitewide === true ? ';path=/' : '',
                                                        _delayTimer = null,
                                                        _html = document.documentElement;

                                                    function setDefault(_property, _default) {
                                                        return typeof _property === 'undefined' ? _default : _property;
                                                    }

                                                    function setDefaultCookieExpire(days) {
                                                        // transform days to milliseconds
                                                        var ms = days * 24 * 60 * 60 * 1000;

                                                        var date = new Date();
                                                        date.setTime(date.getTime() + ms);

                                                        return "; expires=" + date.toUTCString();
                                                    }

                                                    setTimeout(attachOuiBounce, timer);

                                                    function attachOuiBounce() {
                                                        if (isDisabled()) {
                                                            return;
                                                        }

                                                        _html.addEventListener('mouseleave', handleMouseleave);
                                                        _html.addEventListener('mouseenter', handleMouseenter);
                                                        _html.addEventListener('keydown', handleKeydown);
                                                    }

                                                    function handleMouseleave(e) {
                                                        if (e.clientY > sensitivity) {
                                                            return;
                                                        }

                                                        _delayTimer = setTimeout(fire, delay);
                                                    }

                                                    function handleMouseenter() {
                                                        if (_delayTimer) {
                                                            clearTimeout(_delayTimer);
                                                            _delayTimer = null;
                                                        }
                                                    }

                                                    var disableKeydown = false;

                                                    function handleKeydown(e) {
                                                        if (disableKeydown) {
                                                            return;
                                                        } else if (!e.metaKey || e.keyCode !== 76) {
                                                            return;
                                                        }

                                                        disableKeydown = true;
                                                        _delayTimer = setTimeout(fire, delay);
                                                    }

                                                    function checkCookieValue(cookieName, value) {
                                                        return parseCookies()[cookieName] === value;
                                                    }

                                                    function parseCookies() {
                                                        // cookies are separated by '; '
                                                        var cookies = document.cookie.split('; ');

                                                        var ret = {};
                                                        for (var i = cookies.length - 1; i >= 0; i--) {
                                                            var el = cookies[i].split('=');
                                                            ret[el[0]] = el[1];
                                                        }
                                                        return ret;
                                                    }

                                                    function isDisabled() {
                                                        return checkCookieValue(cookieName, 'true') && !aggressive;
                                                    }

                                                    // You can use ouibounce without passing an element
                                                    // https://github.com/carlsednaoui/ouibounce/issues/30
                                                    function fire() {
                                                        if (isDisabled()) {
                                                            return;
                                                        }

                                                        if (el) {
                                                            $(el).fadeIn();
                                                        }

                                                        callback();
                                                        disable();
                                                    }

                                                    function disable(custom_options) {
                                                        var options = custom_options || {};

                                                        // you can pass a specific cookie expiration when using the OuiBounce API
                                                        // ex: _ouiBounce.disable({ cookieExpire: 5 });
                                                        if (typeof options.cookieExpire !== 'undefined') {
                                                            cookieExpire = setDefaultCookieExpire(options.cookieExpire);
                                                        }

                                                        // you can pass use sitewide cookies too
                                                        // ex: _ouiBounce.disable({ cookieExpire: 5, sitewide: true });
                                                        if (options.sitewide === true) {
                                                            sitewide = ';path=/';
                                                        }

                                                        // you can pass a domain string when the cookie should be read subdomain-wise
                                                        // ex: _ouiBounce.disable({ cookieDomain: '.example.com' });
                                                        if (typeof options.cookieDomain !== 'undefined') {
                                                            cookieDomain = ';domain=' + options.cookieDomain;
                                                        }

                                                        if (typeof options.cookieName !== 'undefined') {
                                                            cookieName = options.cookieName;
                                                        }

                                                        document.cookie = cookieName + '=true' + cookieExpire + cookieDomain + sitewide;

                                                        // remove listeners
                                                        _html.removeEventListener('mouseleave', handleMouseleave);
                                                        _html.removeEventListener('mouseenter', handleMouseenter);
                                                        _html.removeEventListener('keydown', handleKeydown);
                                                    }

                                                    return {
                                                        fire: fire,
                                                        disable: disable,
                                                        isDisabled: isDisabled
                                                    };
                                                };
                                            }));
                                        },
                                        // OUIBounce trigger
                                        exitTrigger: function () {
                                            this.ouibounce($body.modal[0], {
                                                cookieName: 'TG017exit',
                                                cookieDomain: 'technogym.com',
                                                /*aggressive: true, Testing property, if the cookie exists ignore it and show it everytime on exit */
                                                callback: function () {
                                                    $body.modal.fadeIn().addClass('tg17-active');
                                                    $('.tg17-fade').addClass('tg17-fadeActive');
                                                    var exitEvent;
                                                    if (!exitEvent) {
                                                        sendEvent('TG017', 'Exit Intent has fired, form shown', '', true);
                                                        exitEvent = true;
                                                    }
                                                }
                                            });
                                        }
                                    }
                            
                                    // Build new DOM Elements
                                    modal.contentBuilder();

                                    // OUIBounce trigger
                                    exitIntent.ouiPlugin();
                                    exitIntent.exitTrigger();

                                },pollerOpts);


                        }


                    if ($body.hasClass('catalog-category-view')) {
                        slideoutTab();
                    }
                    if ($body.hasClass('catalog-product-view')) {
                        exitForm();
                    }
        
        var pollerOpts = {
                        timeout: 20000,
                        multiplier: 0
                    };

                    UC.poller(['.catalog-product-view.modal-open'], function () {
          if ($body.hasClass('modal-open')) {
            $body.removeClass('modal-open');
          }
          },pollerOpts);
       
                }

            })();
