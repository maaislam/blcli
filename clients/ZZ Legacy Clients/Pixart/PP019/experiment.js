  
window._PP019 = (function($) {
    // UC Poller
    var UC=function(a){var b=$||window.jQuery;return a.poller=function(a,c,d){var e={wait:50,multiplier:0,timeout:7000},f=Date.now||function(){return(new Date).getTime()};if(d)for(var g in d)e[g]=d[g];else d=e;for(var h=!!e.timeout&&new Date(f()+e.timeout),i=e.wait,j=e.multiplier,k=[],m=function(d,e){if(h&&f()>h)return!1;e=e||i;var g=function(){var c,a=typeof d;return c="function"===a?d():"string"!==a||b(d).length}();g?(k.push(!0),k.length===a.length&&c()):setTimeout(function(){m(d,e*j)},e)},n=0;n<a.length;n++)m(a[n])},a}(UC||{});

    // ---------------------------------------------------------
    // Run Test entry point
    // ---------------------------------------------------------
    var run = function() {
        // ---------------------------------------------------------
        // Set up
        // ---------------------------------------------------------
        $('body').addClass('pp019');

        // ---------------------------------------------------------
        // Create introJS instance for later initialisation
        // ---------------------------------------------------------
        var introJsInstance = window._PP019.introJsInstance = introJs();

        introJsInstance.setOption('scrollPadding', 30);
        introJsInstance.setOption('showBullets', false);
        introJsInstance.setOption('showProgress', true);
        introJsInstance.setOption('skipLabel', 'Close');
        introJsInstance.setOption('exitOnOverlayClick', false);
        introJsInstance.setOption('overlayOpacity', 0.5);

        // ----------------------------------------------------------
        // Label and section strings
        // ----------------------------------------------------------
        var strings = {
            labels: {
                'Width (cm)': 'The horizontal dimension in centimetres',
                'Height (cm)': 'Vertical dimension of print in centimetres',
                'Material': 'Excellent quality, white acrylic stickers with a gloss coating for protection against UV and scratches. Suitable for many uses, particularly outdoors.',
                'Output direction': 'Stickers and labels can be printed in different directions as shown in these images',
            },
            priceAndDeliveryText: 'Choose a price and delivery date',
            templateInformation: 'Our templates and instruction files are useful for creating print-ready files using your chosen software. Confirm your order, proceed to payment, then upload your file',
            getQuoteArea: "Once you've filled in all the information you can add to basket. Click 'get your quote' to find out what information still needs filling in. If you have a promo code, you can enter it here.",
            getQuoteAreaCanAddToBasket: "Your quote is shown here. Once you're ready, add it to your basket. If you have a promo code, you can enter it here.",
            additionalOptions: 'To ensure the quality of your file is as good as it can be, we recommend using our file check system. If you select this option, our in-house designers will ensure your file is set up and laid out correctly.'
        };

        // Select strings are strings that map a select box option to some text that will 
        // show in the tooltip when a user chooses a particular option
        // e.g. user chooses Paper = Underwood Woodstock Birch => show appropriate text
        // Entere data in the form: 'Option TEXT': 'The text that appears in tooltip'
        var selectStrings = {
            'Underwood - Woodstock birch': 'This text pertains to Underwood woodstock birch option',
            'Classic gloss - Gloss Coated': 'This text pertains to gloss coated paper'
        };

        function getTooltipText(option) {
            if(typeof strings.labels[option] !== 'undefined') {
                return strings.labels[option];
            }

            return 'Pick your ' + option + ' as required.';
        }

        // ----------------------------------------------------------
        // **** Add introjs to other sections ****
        // 
        // Loop through each generic configuration option and add
        // data-intro attributes for intro JS to use
        //
        // NB we hide locked items
        // ----------------------------------------------------------
        $('.feature:not(".hide"), .nome_lavorazione').each(function(i) {
            if($(this).find('.info_box .fa-lock').length) {
                return true;
            }

            var label = $(this).find('.panel-heading label').text().trim();
            var tooltipText = getTooltipText(label);

            if(i == 0) {
                $(this).wrap('<div class="pp19-feature-wrapper clearfix" data-position="bottom" data-intro="' + tooltipText + '"></div>');
            } else {
                $(this).wrap('<div class="pp19-feature-wrapper clearfix" data-position="top" data-intro="' + tooltipText + '"></div>');
            }
        });

        // ----------------------------------------------------------
        // **** Add introjs to other sections ****
        //
        // Note that these sections take into account some A/b tests
        // that may be live at the time at which this goes live.
        //  - Control
        //  - UC019 (delivery matrix)
        // ----------------------------------------------------------

        // -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
        // Price / delivery grid
        // -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
        if($('.uc19_new-price-grid').length) {
            // The matrix is in a different place in this test
            $('.uc19_new-price-grid, .uc19_delivery-container').wrapAll('<div class="pp19-feature-wrapper clearfix" data-position="top" data-intro="' + strings.priceAndDeliveryText + '"></div>');
        } else {
            // This is the default Control
            $('#price_grid').wrap('<div class="pp19-feature-wrapper clearfix" data-position="top" data-intro="' + strings.priceAndDeliveryText + '"></div>');
        }

        // -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
        // Template information
        // -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
        $('#pdf_template > .row:first').wrap('<div class="pp19-feature-wrapper clearfix"  data-position="top" data-intro="'
            + strings.templateInformation + '"></div>');

        // -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
        // Get a quote
        // -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
        var tooltipText = '';
        if($('#resume_addToCart .add_carrello').text().toLowerCase() === 'get your quote') {
            tooltipText = strings.getQuoteArea;
        } else {
            tooltipText = strings.getQuoteAreaCanAddToBasket;
        }
        $('#verifica_promocode_box, #resume_addToCart').wrapAll(
            '<div class="pp19-feature-wrapper clearfix"  data-position="top" data-intro="' + tooltipText + '"></div>'
        );

        // -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
        // Additional options
        // -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
        if(!$('#opzioni_aggiuntive').hasClass('hide')) {
            $('#opzioni_aggiuntive .servizi_aggiuntivi:first').wrap('<div class="pp19-feature-wrapper clearfix" data-position="top" data-intro="' + strings.additionalOptions + '" />');
        }

        // ----------------------------------------------------------
        // Text mapping to Select box options -- if any select box
        // text matches that defined in selectStrings above, update
        // the tooltip text to match the defined text
        // ----------------------------------------------------------
        $('.feature-select select').change(function() {
          var o = this.options[this.selectedIndex];
          var txt = $(o).text().trim();
          if(typeof selectStrings[txt] !== 'undefined') {
            $('.introjs-tooltiptext').html(selectStrings[txt]);
          }
        });

        // ----------------------------------------------------------
        // Help box initialises popup
        // - activate on click
        // - activate on scrolling up and down
        // ----------------------------------------------------------
        var helpBox = $([
            '<div class="pp19-need-help">',
                '<span class="pp19-need-help__title"><i class="fa fa-question-circle"></i> Need help?</span>',
                "<p class='pp19-need-help__text'>We'll guide you through the process of configuring your product.</p>",
                '<div class="clearfix">',
                    '<div class="col-xs-6">',
                        '<span class="pp19-need-help__question pp19-need-help__question--yes">',
                            '<em>Yes please</em>',
                            '<i class="fa fa-check"></i>',
                        '</span>',
                    '</div>',
                    '<div class="col-xs-6">',
                        '<span class="pp19-need-help__question pp19-need-help__question--no">',
                            '<em>Not right now</em>',
                            '<i class="fa fa-times"></i>',
                        '</span>',
                    '</div>',
                '</div>',
                '<span title="Close" class="pp19-need-help__close">×</span>',
            '</div>'
        ].join(''));

        helpBox.appendTo('body');

        helpBox.on('click', function() {
            if(!isHelpBoxActive()) {
                ga('send', 'event', 'PP19---ProductHelp', 'Popup-Activated-By-Click');
                activateHelpBox();
            }
        });
        helpBox.find('.pp19-need-help__close').on('click', function(e) {
            e.stopPropagation();

            deactivateHelpBox();
        });

        helpBox.find('.pp19-need-help__question--no').on('click', function(e) {
            ga('send', 'event', 'PP19---ProductHelp', 'Popup-Chose-No');

            e.stopPropagation();

            deactivateHelpBox();
        });
        helpBox.find('.pp19-need-help__question--yes').on('click', function(e) {
            ga('send', 'event', 'PP19---ProductHelp', 'Popup-Chose-Yes');

            e.stopPropagation();

            deactivateHelpBox();

            introJsInstance.start();
        });

        function isHelpBoxActive() {
            return helpBox.hasClass('pp19-need-help--active');
        }

        function activateHelpBox() {
            helpBox.addClass('pp19-need-help--active');
        }

        function deactivateHelpBox() {
            helpBox.removeClass('pp19-need-help--active');
        }

        // ----------------------------------------------------------
        // Activate help box for scrolling up and down
        // - Uncertainty determined by num times a user scrolled down
        //   then back up again, with thresholds on how far they scrolled
        //   determining whether to fire help box
        // - Fire only after user has been on page a while
        // - Only fire once, set in local storage
        // ----------------------------------------------------------
        var secondsOnPage = 0;
        setInterval(function() {
            secondsOnPage += 10;
        }, 1000);

        if(!localStorage.getItem('pp19--did-activate-after-scroll')) {
            var checkTimeout = 100,
                            scrollAmountToTrigger = 200;

                        var winScrollTimeout;
                        $(window).on('scroll.pp19-activate-scroll', function() {
                                clearTimeout(winScrollTimeout);
                                winScrollTimeout = setTimeout(check, checkTimeout);
                        });

                        var cacheScrollTop = $(window).scrollTop(),
                            lastScrollTop = $(window).scrollTop(),
                            numConfusedScrolls = 0,
                            didScrollDown = true;

                        function check() {
                                var winScrollTop = $(window).scrollTop(),
                                        scrollDirection = winScrollTop > lastScrollTop ? 1 : -1,
                                        scrollDifference = cacheScrollTop - winScrollTop;

                                if(scrollDifference >= scrollAmountToTrigger && scrollDirection === -1 && didScrollDown) {
                                        // User scrolled up then back down again...
                                        cacheScrollTop = winScrollTop;

                                        didScrollDown = false;

                    numConfusedScrolls++
                                }

                if(numConfusedScrolls === 2) {
                    $(window).off('scroll.pp19-activate-scroll');

                    localStorage.setItem('pp19--did-activate-after-scroll', 1);

                    ga('send', 'event', 'PP19---ProductHelp', 'Popup-Activated-By-Scroll');

                    activateHelpBox();
                }

                                if(scrollDirection === 1) {
                                        cacheScrollTop = winScrollTop;

                                        didScrollDown = true;
                                }

                                lastScrollTop = winScrollTop;
                        }
        }

        // ----------------------------------------------------------
        // Other Event tracking
        // ----------------------------------------------------------
        var currentStep = 0;
        try {
            introJsInstance.onchange(function() {
                currentStep = this._currentStep;
            });
            introJsInstance.onafterchange(function() {
                setTimeout(function() {
                    $('.introjs-showElement').find('input,select').focus();
                }, 900);
            });
            introJsInstance.oncomplete(function() {
                ga('send', 'event', 'PP19---ProductHelp', 'Did-Complete-Walkthrough');
            });
            introJsInstance.onexit(function() {
                var numItems = this._introItems.length;
                var exitPercent = (100 * (currentStep + 1) / numItems).toFixed(0);
                ga('send', 'event', 'PP19---ProductHelp', 'Did-Exit-Walkthrough', 'Exit-Percent-' + exitPercent);
            });
        } catch(e) { }

        // ----------------------------------------------------------
        // Refresh introJS when elements dynamically appear
        // - Any changes will change the height of the #global_container div
        // - Any changes to the height of the loading element div
        // ----------------------------------------------------------
        var globalContainerHeight = $('#global_container').height();
        setInterval(function() {
                var h = $('#global_container').height();
                if(h != globalContainerHeight) {
                        globalContainerHeight = h;
                        introJsInstance.refresh();
                }
        }, 50);

       // ------
       // User pressed tab, maybe they want to go to next step
       // ------
        $('.pp19-feature-wrapper input').on('keydown', function(e) {
            if($('.introjs-overlay').length === 0) {
                return;
            }
            var code = e.keyCode || e.which;
            if (code == '9') {
                console.log('tab');
                setTimeout(function() {
                 introJsInstance.nextStep();
                }, 300);
            }
        });
    }

    // ---------------------------------------------------------
    // Run test once conditions true
    // ---------------------------------------------------------
    UC.poller([
        '.feature label',
        function() {
            return ($('.loading_element').css('visibility') === 'visible');
        }
    ], function () {
        // ---------------------------------------------------------
        // NB! IntroJS versions 2.x and some 1.x seem to have a lot of issues, especially around introjs.refresh
        // so we are using 1.0.0
        // ---------------------------------------------------------
        $.getScript('https://cdnjs.cloudflare.com/ajax/libs/intro.js/1.0.0/intro.min.js', function() {
            run();
        });
    });

    return {};

}(window.jQuery));
  
