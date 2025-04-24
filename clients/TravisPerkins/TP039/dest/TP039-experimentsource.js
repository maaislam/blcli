var _TP039 = (function () {

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
            experiment_str: 'TP039',
            variation_str: 'Variation 2 Mobile'
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
            if ($('body').hasClass('TP039')) {
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
        $body.addClass('TP039');

        var $calculatorContainer = $([
            '<div class="TP039_calculatorWrapper">',
            '<a href="#" class="open_modal"><button class="TP039_calculator_button"><span class="TP039_calculator_button__option"></span> Calculator</button></a>',
            '<p class="TP039_calculator_message">Find out how much you need by using our <b>new</b>' +
            ' <span class="TP039_calculator_message_option">decking</span> calculator today</p>',
            '</div>'
        ].join(''));

        // Find out if it's a decking/paving calculator
        var $filteredLISTDecking = 0;
        if ($('#breadcrumb .tp_bread_link').text().indexOf('Composite Decking') > -1
            || $('#breadcrumb .tp_bread_link').text().indexOf('Timber Decking') > -1) {
            $filteredLISTDecking = 1;
        }

        var $filteredLISTPaving = $("#breadcrumb .tp_bread_link:contains('Paving')");
        if($filteredLISTDecking) {
            $('.TP039_calculator_button__option').text('Decking');
        } else if($filteredLISTPaving.length) {
            $('.TP039_calculator_button__option').text('Paving');
        }
        else {
            return;
        }

        sendEvent("TP039", "Experiment started");

        $calculatorContainer.insertAfter('#addToCartForm .tp_quoteFormsWrapper:eq(0)');

        if($filteredLISTDecking) {
            $('.TP039_calculator_button__option').text('Decking');
            $('.TP039_calculator_message_option').text('decking');
        } else if($filteredLISTPaving.length) {
            $('.TP039_calculator_button__option').text('Paving');
            $('.TP039_calculator_message_option').text('paving');
        }

        // Inject the html after the body in case no access to DOM
        var $popUpModal = $([
            '<div class="TP039_pop-up_modal">',
            '<div>',
            '<a href="#" class="close_btn">X</a>',
            '<div class="overflow_fix">',
            '<div class="TP039_pop-up_modal__contentWrapper">',
            '<h1 class="TP039_pop-up_modal_header">This feature isn\'t quite available yet</h1>',
            '<p class="TP039_pop-up_modal_description">We\'re sorry this feature isn\'t available yet,' +
            ' but we\'re working on it. If you need help ' +
            'working out the size or quantity of a project, your local branch manager would be more ' +
            'than happy to help out</p>',
            '<a href="#"><button class="TP039_pop-up_modal_button">Find your store</button></a>',
            '</div>',
            '</div>',
            '</div>',
            '</div>'
        ].join(''));

        $popUpModal.prependTo('body');
        // --------------------------------------------MODAL POPUP----------------------------------------------------
        var slideQ = false,
            modal = $(".TP039_pop-up_modal");

        if (slideQ == false) {
            $(".open_modal,.TP039_pop-up_modal .close_btn").on("click", function(e) {
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
                if (!$(e.target).closest(".TP039_pop-up_modal > div").length) {
                    if (modal.hasClass("active")) {
                        modal.fadeOut("slow", function() {
                            modal.removeClass("active");
                            slideQ = false;
                        });
                    }
                }
            });
        }
        // --------------------------------------------MODAL POPUP----------------------------------------------------
        $('.TP039_pop-up_modal_button').on('click', function () {
            $('#stockCheckerButton').trigger('click');
            $('#tp_CheckStockPopup').find('.tp_stockCheck').text('Find your store');
        });

        $('#stockCheckerButton').on('click', function() {
            $(window).scrollTop(0);
            $('#tp_CheckStockPopup').find('.tp_stockCheck').text('Check Stock');
        });

        // send event to ga
        $('.TP039_calculator_button').on('click', function() {
            sendEvent('TP039', 'Clicked calculator button', 'TP039---Decking Calculator', true);
        });

    } // activate

})(); // _TP039