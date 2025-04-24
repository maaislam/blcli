// ------------------------------------------------------------------------
// Redesign of specific product pages
//
// NB. 
// Images are lazy-loaded using data-src attributes - post-load the data-src
// attribute is emptied. There's a race between the test loading and data-src
// attributes existing - check if(data-src) else use (src). 
// ------------------------------------------------------------------------
var TG002 = (function() {
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    // Helper send events
    var trackerName;
    function sendEvent(action, label, dimensionValue, dimensionName) {

        var category = 'TG002---ProductPage';
        var nonInteractionValue = true;

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

    // ------------------------------------------------------------------------
    // Poll main
    // ------------------------------------------------------------------------
    UC.poller([
        'body',
        '#product-recommendations .slider-grouped-wrapper .product-name .no-std-link',
        function () {
            if (window.jQuery) {
                return true;
            }
        }
    ], learnMore);

    // ------------------------------------------------------------------------
    // Poll main
    // ------------------------------------------------------------------------
    UC.poller([
        'body',
        '#collateral-tabs li',
        '#feature-primary .swiper-container .swiper-slide',
        '.product-shop',
        '#product-info',
        function() {
            if(/skillrow.html/.test(window.location.href)) {
                return true;
            }

            var test = 
                document.querySelector('.product-essential .product-gallery .swiper-slide') !== null
                && document.querySelector('.product-essential .product-gallery .swiper-slide img.gallery-image') !== null;

            return test;
        },
        function () {
            if (window.jQuery) {
                return true;
            }
        }
    ], function() {
       run();
    });

    // ------------------------------------------------------------------------
    // Entry point for learn more
    // ------------------------------------------------------------------------
    function learnMore(){
        var $ = window.jQuery;
        $('#product-recommendations .slider-grouped-wrapper .product-name .no-std-link').each(function(){
            $(this).append('<br /><span class="TG_learn-more">Learn more</span>');
        });
    }

    // ------------------------------------------------------------------------
    // Entry point for main
    // ------------------------------------------------------------------------
    function run(){
        var $ = window.jQuery,
            url = window.location.href,
            slideArray = [],
            destSliderImg = [],
            destSliderTitle = [],
            destSliderContent = [],
            pageTitle = $('.product-view .product-shop .product-name h1').text();

        // 'tabs': these define the toggle functionality that shows / hides when business/home chosen
        // 'sections': these define the copy that should be shown in given sections when toggling
        var _copy = {
            'skillrow.html': {
                'tabs': {
                    'businessTabTitle': 'Skillrow for Business',
                    'businessTabText': [
                        '<p>Add SKILLROW’S advanced fitness technology to your gym. Your members and guests will benefit from the most true-to-life water resistance training.  With the flexibility to switch modes and set challenges, training remains engaging for trainers and users. Tailor workouts for solo and group classes with a synchronised option.',
                        '<p>2 year warranty as standard.</p>'
                    ].join(''),
                    'homeTabTitle': 'Skillrow for Home',
                    'homeTabText': [
                        '<p>Accelerate your training with gym-quality equipment conveniently at home. SKILLROW is the only indoor rower that offers true-to-life, total body water resistance training. Connect to the SKILLROW APP to track your progress, and set yourself challenges.</p>', 
                        "<p>SKILLROW’s safe and sturdy build ensures it won’t shift during use. It's easy to dismantle and store between sessions too."
                    ].join('')
                }
            },
            'treadmill-myrun.html': {
            },
            'skillmill-connect.html': {
                'sections': {
                    'business': {
                        'multidrivetechnologypatentpending': 'The innovative MULTIDRIVE TECHNOLOGY enables users to experience the full speed resistance spectrum on SKILLMILL™. By shifting the MULTIDRIVE, resistance will vary from zero to maximum, so you can switch to any level between resistance-free running and an all-out sled push.',
                        'nonmotorisedtraining': 'SKILLMILL™ is operated and controlled by whoever is using the equipment, accelerating quickly from a cold start and moving at the same pace according to whether users walk, run or sprint. Moving to the front of the deck speeds up the pace, moving to the back slows you down. And no motor means much lower running costs and carbon footprint.',
                        'performancemonitoringandtracking': 'With full connectivity through an intuitive console enabling data monitoring, users can track and also store their workout parameters and achievements via the cloud-based mywellness® open platform, making training on SKILLMILL™ a motivating experience keeping users in line with their fitness goals.',
                        'dualhandlebar': 'Correct positioning for high and low pushes is simple thanks to the DUAL HANDLEBAR catering for users of different heights and body sizes.'
                    },
                    'home': {
                        'multidrivetechnologypatentpending': 'The innovative MULTIDRIVE TECHNOLOGY enables you to experience the full speed resistance spectrum on SKILLMILL™. By shifting the MULTIDRIVE, resistance will vary from zero to maximum, so you can switch to any level between resistance-free running and an all-out sled push.',
                        'nonmotorisedtraining': 'SKILLMILL™ is operated and controlled by whoever is using the equipment, accelerating quickly from a cold start and moving at the same pace according to whether you walk, run or sprint. Moving to the front of the deck speeds up the pace, moving to the back slows you down. And no motor means much lower running costs and carbon footprint.',
                        'performancemonitoringandtracking': 'With full connectivity through an intuitive console enabling data monitoring, you can track and also store your workout parameters and achievements via the cloud-based mywellness® open platform, making training on SKILLMILL™ a motivating experience in line with your fitness goals.',
                        'dualhandlebar': 'Correct positioning for high and low pushes is simple thanks to the DUAL HANDLEBAR catering for different heights and body sizes.'
                    }
                }
            },
            'mycycling.html': {
            },
            'climb-artis.html': {
                'sections': {
                    'business': {
                        'ascendbeyondyourlimits': [
                            '<p>What makes ARTIS® Climb so unique is the SPLIT STEP TECHNOLOGY (patent pending). Developed by Technogym’s R&D Department, this groundbreaking innovation transforms this stair climber into one of the most sought-after pieces of cardio equipment on the gym floor, thanks to its welcoming design, ease of use and effectiveness.</p>'
                        ].join(''),
                        'trainwithconfidence': [
                            '<p>Traditional stair climbers can intimidate less confident members. Thanks to its lowest height in the market, ARTIS® Climb allows users to step on and off easily.</p>'
                        ].join(''),
                        'smallestfootprint': [
                            'ARTIS® Climb offers the widest climbing space within the smallest footprint — only 1 sqm/10 sq ft — making room for more happy users.'
                        ].join('')
                    },
                    'home': {
                        'ascendbeyondyourlimits': [
                            '<p>What makes ARTIS® Climb so unique is the SPLIT STEP TECHNOLOGY (patent pending). Developed by Technogym’s R&D Department, this groundbreaking innovation transforms this stair climber into one of the most sought-after pieces of cardio equipment for your home, thanks to its welcoming design, ease of use and effectiveness.</p>'
                        ].join(''),
                        'trainwithconfidence': [
                            '<p>Traditional stair climbers can intimidate less confident users. Thanks to its lowest height in the market, ARTIS® Climb makes it easy to step on and off.</p>'
                        ].join(''),
                        'smallestfootprint': [
                            'ARTIS® Climb offers the widest climbing space within the smallest footprint — only 1 sqm/10 sq ft – leaving more room for other equipment.'
                        ].join('')
                    }
                }
            }
        };

        var pathIdentifier = (window.location.pathname.match(/[^\/]+$/g) || [])[0];
        if(pathIdentifier === 'undefined' || !_copy[pathIdentifier]) {
            return;
        }
        var _pageCopy = _copy[pathIdentifier];

        $('body').addClass('tg002-page--' + pathIdentifier.replace('.html', ''));
        
        // ------------------------------------------------------------------------
        // Load remote, we'll use them later
        // ------------------------------------------------------------------------
        $.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', function() {
        });

        // ------------------------------------------------------------------------
        // Setup
        // ------------------------------------------------------------------------
        $('body').addClass('TG002');

        // ------------------------------------------------------------------------
        // Full Story Integration
        // ------------------------------------------------------------------------
        UC.poller([
         function() {
             var fs = window.FS;
             if (fs && fs.setUserVars) return true;
         }
        ], function () {
         window.FS.setUserVars({
             experiment_str: 'TG002',
             variation_str: 'Variation 1'
         });
        }, { multiplier: 1.2, timeout: 0 });

        // ------------------------------------------------------------------------
        // Product description tabs
        // ------------------------------------------------------------------------
        if (/skillrow.html/.test(url)) {
            $('#extended-top-title h3').hide();
            $('#collateral-tabs-content li:first-child .tab-content').text($('#extended-top-title').text());
            $('#extended-top-title').hide();
        }

        if($('#collateral-tabs li').length < 2){
            $('#collateral-tabs').hide();
        }

        if (/treadmill-myrun.html/.test(url)) {
            $('#collateral-tabs').addClass('TG_li-fix');
        }
        
        // ------------------------------------------------------------------------
        // Product Main Features
        // ------------------------------------------------------------------------

        if(/climb-artis.html/.test(url)) {
            // Artis has an extra info row
            var el = $('.post-type-b2b #b2b');
            var imgSrc = el.find('.post-image img').attr('data-src');
            if(typeof imgSrc === 'undefined') {
                imgSrc = el.find('.post-image img').attr('src');
            }
            if(imgSrc) {
              var ulHtml = '<ul>';
              el.find('.post-content ul').each(function() {
                ulHtml += $(this).html();
              });
              ulHtml += '</ul>';

                destSliderImg.push(imgSrc);
                destSliderTitle.push(el.find('.post-content h3').text());
                destSliderContent.push('<p>' + el.find('.post-content p').html() + '</p>' + ulHtml);
            }
        }
        if(/skillmill-connect.html/.test(url)) {
            // Skillmill has an extra info row
            var el = $('.post-type-b2b #b2b');
            var imgSrc = el.find('.post-image img').attr('data-src');
            if(typeof imgSrc === 'undefined') {
                imgSrc = el.find('.post-image img').attr('src');
            }
            if(imgSrc) {
              var ulHtml = '<ul>';
              el.find('.post-content ul').each(function() {
                ulHtml += $(this).html();
              });
              ulHtml += '</ul>';

                destSliderImg.push(imgSrc);
                destSliderTitle.push(el.find('.post-content h3').text());
                destSliderContent.push('<p>' + el.find('.post-content p').html() + '</p>' + ulHtml);
            }
        }

        $('#feature-primary .swiper-container .swiper-slide').each(function(){
            var el = $(this);
          
          var ulHtml = '<ul>';
              el.find('.post-content ul').each(function() {
                ulHtml += $(this).html();
              });
          ulHtml += '</ul>';

            if(el.hasClass('swiper-slide-duplicate')){
            }
            else if(el.find('img').is("[data-src]")){
                destSliderImg.push(el.find('.background img').attr('data-src'));
                destSliderTitle.push(el.find('.post-content h3').text());
                destSliderContent.push('<p>' + el.find('.post-content p').html() + '</p>' + ulHtml);
            }
            else{
                destSliderImg.push(el.find('.background img').attr('src'));
                destSliderTitle.push(el.find('.post-content h3').text());
                destSliderContent.push('<p>' + el.find('.post-content p').html() + '</p>' + ulHtml);
            }
        });

        $('.product-shop').before('<div class="TG_main_slider-wrap"><div class="TG_main_slider"></div></div>');
        $('.product-main-info .regular-price').insertAfter('.product-collateral');
        $('.product-view .product-shop .line-page-link a').wrap('<div class="TG_line-wrap"></div>');
        $('.TG_line-wrap').insertAfter('.product-other-social a.button.btn-default');
        $('.TG_line-wrap a').text('View all ' + $('.TG_line-wrap a').text() + ' Line');

        // ------------------------------------------------------------------------
        // For business & home tabs (top)
        //
        // Hardcoded copy
        // ------------------------------------------------------------------------
        if(_pageCopy['tabs']) {
            // 1. use the toggle tabs copy
            $('#product-info').after([
                '<div class="TG_tgl_set">',
                    '<div class="TG_tgl-btns clearfix">',
                        '<a href="#" class="TG_business-btn TG_active">' + pageTitle + ' for business</a>',
                        '<a href="#" class="TG_home-btn">' + pageTitle + ' for home</a>',
                    '</div>',
                    '<div class="TG_content-wrap">',
                        '<div class="TG_business-tgl TG_active">',
                            '<h2>' + _pageCopy['tabs']['businessTabTitle'] + '</h2>',
                            '<div>' + _pageCopy['tabs']['businessTabText'] + '</div>',
                        '</div>',
                        '<div class="TG_home-tgl">',
                            '<h2>' + _pageCopy['tabs']['homeTabTitle'] + '</h2>',
                            '<div>' + _pageCopy['tabs']['homeTabText'] + '</div>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join(''));
        } 

        if(!_pageCopy['tabs'] && _pageCopy['sections']) {
            // 2. Show toggle but without the business content
            $('#product-info').after([
                '<div class="TG_tgl_set">',
                    '<div class="TG_tgl-btns clearfix">',
                        '<a href="#" class="TG_business-btn TG_active">' + pageTitle + ' for business</a>',
                        '<a href="#" class="TG_home-btn">' + pageTitle + ' for home</a>',
                    '</div>',
                '</div>'
            ].join(''));
        } 

        if(_pageCopy['sections'] || _pageCopy['tabs']) {
            $('.TG_tgl_set').after('<div class="TG_dest_wrap"><div class="TG_dest-inner"></div></div>');
        } else {
            $('#product-info').after('<div class="TG_dest_wrap"><div class="TG_dest-inner"></div></div>');
        }

        // Bind event handlers to toggle
        var busBtn = $('.TG_business-btn'),
            busContent = $('.TG_business-tgl'),
            homeBtn = $('.TG_home-btn'),
            homeContent = $('.TG_home-tgl');

        busBtn.on('click', function(e) {
            e.preventDefault();

            if(busBtn.hasClass('TG_active')){
            } else {
                if(homeBtn.hasClass('TG_active')){
                    homeBtn.removeClass('TG_active');
                    busBtn.addClass('TG_active');
                    homeContent.slideUp();
                    busContent.slideDown();
                }
                else{
                    busBtn.addClass('TG_active');
                    busContent.slideDown();
                }
            }

            updateCopyToBusiness();

        });

        function updateCopyToBusiness() {
            // ----------------------------------------------------------
            // If page copy sections exist for business, update those
            // ----------------------------------------------------------
            if(_pageCopy['sections']) {
                for(var k in _pageCopy['sections']['business']) {
                    var content = _pageCopy['sections']['business'][k];
                    var targetDiv = $('[data-tg-block-identifier=' + k + ']');

                    targetDiv.find('.TG_details-wrap__content, .tg-feature-content').html(content);
                }
            }
        }

        homeBtn.on('click', function(e){
            e.preventDefault();

            if(homeBtn.hasClass('TG_active')){
            }
            else {
                if(busBtn.hasClass('TG_active')){
                    busBtn.removeClass('TG_active');
                    homeBtn.addClass('TG_active');
                    busContent.slideUp();
                    homeContent.slideDown();
                }
                else{
                    homeBtn.addClass('TG_active');
                    homeContent.slideDown();
                }
            }

            updateCopyToHome();
        });

        function updateCopyToHome() {
            // ----------------------------------------------------------
            // If page copy sections exist for home, update those
            // ----------------------------------------------------------
            if(_pageCopy['sections']) {
                for(var k in _pageCopy['sections']['home']) {
                    var content = _pageCopy['sections']['home'][k];
                    var targetDiv = $('[data-tg-block-identifier=' + k + ']');

                    targetDiv.find('.TG_details-wrap__content, .tg-feature-content').html(content);
                }
            }
        }

        // ------------------------------------------------------------------------
        // Set spec type on specification attribute elements
        // ------------------------------------------------------------------------
        function specCheck(divText, divParent){
            switch (true){
                case divText.indexOf('Resistance Technology') !== -1:
                    divParent.addClass('TG_tech-type');
                    break;

                case divText.indexOf('Surface width') !== -1:
                    divParent.addClass('TG_measure-type');
                    break;

                case divText.indexOf('Surface length') !== -1:
                    divParent.addClass('TG_measure-type');
                    break;
                case divText.indexOf('Surface Trajectory Control') !== -1:
                    divParent.addClass('TG_tech-type');
                    break;

                case divText.indexOf('Equipment Weight') !== -1:
                    divParent.addClass('TG_measure-type');
                    break;

                case divText.indexOf('Interface') !== -1:
                    divParent.addClass('TG_tech-type');
                    break;

                case divText.indexOf('Network connectivity') !== -1:
                    divParent.addClass('TG_tech-type');
                    break;

                case divText.indexOf('Max speed') !== -1:
                    divParent.addClass('TG_tech-type');
                    break;

                case divText.indexOf('Length (') !== -1:
                    divParent.addClass('TG_measure-type');
                    break;

                case divText.indexOf('Width (') !== -1:
                    divParent.addClass('TG_measure-type');
                    break;

                case divText.indexOf('Height (') !== -1:
                    divParent.addClass('TG_measure-type');
                    break;

                case divText.indexOf('Running Surface') !== -1:
                    divParent.addClass('TG_measure-type');
                    break;

                case divText.indexOf('Motor power continuous duty') !== -1:
                    divParent.addClass('TG_tech-type');
                    break;

                case divText.indexOf('Material') !== -1:
                    divParent.addClass('TG_tech-type');
                    break;

                case divText.indexOf('Max. power') !== -1:
                    divParent.addClass('TG_tech-type');
                    break;

                case divText.indexOf('Measuring power') !== -1:
                    divParent.addClass('TG_tech-type');
                    break;

                case divText.indexOf('Transmission') !== -1:
                    divParent.addClass('TG_tech-type');
                    break;

                case divText.indexOf('Min Speed') !== -1:
                    divParent.addClass('TG_measure-type');
                    break;

                case divText.indexOf('Flywheel') !== -1:
                    divParent.addClass('TG_measure-type');
                    break;

                case divText.indexOf('Incline') !== -1:
                    divParent.addClass('TG_measure-type');
                    break;

                case divText.indexOf('Dimension') !== -1:
                    divParent.addClass('TG_measure-type');
                    break;

                case divText.indexOf('Speed range') !== -1:
                    divParent.addClass('TG_measure-type');
                    break;

                case divText.indexOf('Max user weight') !== -1:
                    divParent.addClass('TG_measure-type');
                    break;

                case divText.indexOf('WATT readability') !== -1:
                    divParent.addClass('TG_tech-type');
                    break;

                case divText.indexOf('Power requirement') !== -1:
                    divParent.addClass('TG_tech-type');
                    break;

                case divText.indexOf('Heart rate monitoring') !== -1:
                    divParent.addClass('TG_tech-type');
                    break;

                case divText.indexOf('Runner Detection System') !== -1:
                    divParent.addClass('TG_tech-type');
                    break;

                case divText.indexOf('mywellness® platform connectivity') !== -1:
                    divParent.addClass('TG_tech-type');
                    break;

                case divText.indexOf('Data transmmission') !== -1:
                    divParent.addClass('TG_tech-type');
                    break;
            }
        }

        $('.specification-list .attribute-box').each(function(){
            var el = $(this),
                specTitle = el.find('.list-label').text();

            specCheck(specTitle, el);
        });

        if ($('.TG_tech-type').length) {
            $('.feature-secondary-container').after([
                '<div class="TG_spec-wrap">',
                    '<div class="TG_spec-inner">',
                    '<h3>Specification</h3>',
                    '<div class="TG_measurements-wrap clearfix">',
                        '<h3>Measurements</h3>',
                        '<div class="TG_tech-flex"></div>',
                    '</div>',
                    '<div class="TG_technical-wrap clearfix">',
                        '<h3>Technical</h3>',
                        '<div class="TG_measure-flex"></div>',
                    '</div>',
                '</div>'
            ].join(''));
        }

        $('.TG_measure-type').appendTo('.TG_measure-flex');
        $('.TG_tech-type').appendTo('.TG_tech-flex');

        // ---------------------------------------------------------
        // Contact form
        // ---------------------------------------------------------
        if ($('.TG_tech-type').length) {
            if ($('#product-recommendations .box-up-sell').length) {
                $('#product-recommendations .box-up-sell').after([
                    '<div class="TG_contact-block">',
                    '<div class="TG_contact-header">',
                    '<h3>Contact</h3>',
                    '<p>Have a question? Simply fill out this form and we will get <br /> back to you as soon as possible</p>',
                    '</div>',
                    '</div>'
                ].join(''));
            } else {
                $('.TG_spec-wrap').addClass('TG_padd-override').append([
                    '<div class="TG_contact-block">',
                    '<div class="TG_contact-header">',
                    '<h3>Contact</h3>',
                    '<p>Have a question? Simply fill out this form and we will get <br /> back to you as soon as possible</p>',
                    '</div>',
                    '</div>'
                ].join(''));
            }
        } else if (/skillrow.html/.test(url)) {
            $('#feature-secondary').after([
                '<div class="TG_contact-block">',
                '<div class="TG_contact-header">',
                '<h3>Contact</h3>',
                '<p>Have a question? Simply fill out this form and we will get <br /> back to you as soon as possible</p>',
                '</div>',
                '</div>'
            ].join(''));
        } else if ($('#product-recommendations .box-up-sell').length) {
            $('#product-recommendations .box-up-sell').after([
                '<div class="TG_contact-block">',
                '<div class="TG_contact-header">',
                '<h3>Contact</h3>',
                '<p>Have a question? Simply fill out this form and we will get <br /> back to you as soon as possible</p>',
                '</div>',
                '</div>'
            ].join(''));
        }

        $.ajax({
            url: 'https://www.technogym.com/gb/contacts/?reason=catalogue&sku=DBE03UT#contact-form',
            type: 'GET',
            dataType: 'html',
            success: function (data) {
                var $data = $(data);
                var $contactForm = $data.find('#contactForm');
                if ($contactForm.length) {
                    $contactForm.appendTo($('.TG_contact-block'));
                    $('.TG_contact-block').find('.buttons-set .button').text('Contact');
                    $('#product-name, #product').val(pageTitle);
                }

                // Select profile functionality...
                (function() {
                    var requiredNeeds = $('select.validate-select', '.select-need').clone();
                    $('input.input-radio', '.select-profile').click(function() {
                        var company, currentSelect, currentSelectId, id;
                        id = $(this).attr("id");
                        $('.select-need').find('.validation-advice').fadeOut();
                        company = $('.field.company');
                        if (id === "business") {
                            if (!company.find('input').hasClass("required-entry")) {
                                company.find('input').addClass("required-entry");
                            }
                            if (company.hasClass("hidden")) {
                                company.removeClass("hidden");
                            }
                            if ($('.store-it_it').length > 0 && $('li.privacy').find('div:nth-child(2)').length > 0) {
                                $('li.privacy').find('div:nth-child(2)').fadeOut();
                            }
                        } else {
                            if (!company.hasClass("hidden")) {
                                company.addClass("hidden");
                            }
                            if (company.find('input').hasClass("required-entry")) {
                                company.find('input').removeClass("required-entry");
                            }
                            if (id === 'private') {
                                if ($('.store-it_it').length > 0 && $('li.privacy').find('div:nth-child(2)').length > 0) {
                                    $('li.privacy').find('div:nth-child(2)').fadeIn();
                                }
                            } else {
                                if ($('.store-it_it').length > 0 && $('li.privacy').find('div:nth-child(2)').length > 0) {
                                    $('li.privacy').find('div:nth-child(2)').fadeOut();
                                }
                            }
                        }
                        if ($('.select-need').hasClass("hidden")) {
                            $('.select-need').removeClass("hidden");
                        }
                        $('.select-need .show-hide').each(function() {
                            if ($(this).hasClass(id)) {
                                if ($(this).hasClass("hidden")) {
                                    return $(this).removeClass("hidden");
                                }
                            } else {
                                if (!$(this).hasClass("hidden")) {
                                    return $(this).addClass("hidden");
                                }
                            }
                        });
                        currentSelectId = $(this).attr('id');
                        currentSelect = $('select.' + currentSelectId);
                        return requiredNeeds.each(function() {
                            var className, otherSelect, otherSelectName;
                            className = this.className;
                            if (className.indexOf(currentSelectId) >= 0) {
                                if (className.indexOf('validate-select') >= 0) {
                                    if (!currentSelect.hasClass('validate-select')) {
                                        return currentSelect.addClass('validate-select');
                                    }
                                }
                            } else {
                                otherSelectName = this.name.replace('need-', '');
                                otherSelect = $('select.' + otherSelectName);
                                if (otherSelect.hasClass('validate-select')) {
                                    return otherSelect.removeClass('validate-select');
                                }
                            }
                        });
                    });
                    $('input[type="checkbox"]', '.private').click(function() {
                        if (!$('.warn', '.private').is(':visible')) {
                            return $('.warn', '.private').fadeIn();
                        }
                    });
                    $('#contactForm button[type="submit"]').click(function(e) {
                        var id, select;
                        id = $('#contactForm').find('.input-radio.validation-passed').attr("id");
                        select = $('.select-need').find('.' + id);
                        if (select.val() === "") {
                            if (!select.hasClass("validation-failed")) {
                                return select.addClass("validation-failed");
                            }
                        }
                    });
                    $('input', '#contact-form').mouseout(function() {
                        if ($(this).val() !== "") {
                            return $(this).parent().find('.validation-advice:not(#advice-validate-email-email)').fadeOut();
                        }
                    });
                })();

                // Force validation of checkbox i agree to terms and conditions
                $('#contactForm').find('.terms-privacy input[type=checkbox]').addClass('validate-one-required');

                // Form initialisation / covers validation
                new VarienForm('contactForm', false);
            }
        });

        // ---------------------------------------------------------
        // Main Slider
        // ---------------------------------------------------------
        $('.product-essential .product-gallery .swiper-slide').each(function(){
            var el = $(this);

            if(el.hasClass('swiper-slide-duplicate')){
            }
            else if(el.hasClass('swiper-slide-360')){
                slideArray.push({
                    type: '360',
                    element: el
                });
            }
            else if(el.hasClass('swiper-slide-video')){
                slideArray.push({
                    type: 'video',
                    element: el
                });
            }
            else if(el.find('img').attr('data-src')){
                slideArray.push({
                    type: 'image',
                    element: el.find('img')
                });
            } else if(el.find('img.gallery-image').length){
                slideArray.push({
                    type: 'image',
                    element: el.find('img')
                });
            }
        });

        var mainSlider = $('.TG_main_slider'),
            ajaxPromiseArray = [];

        for (i = 0; i < destSliderTitle.length; i++) {
            var destTitle = destSliderTitle[i],
                destContent = destSliderContent[i],
                destImg = destSliderImg[i];

            var detailBlock = $([
                '<div class="TG_detail_block">',
                '<div class="TG_img-wrap">',
                '<div style="background-image: url(' + destImg + ')"></div>',
                '</div>',
                '<div class="TG_details-wrap">',
                '<h2>' + destTitle + '</h2>',
                '<div class="TG_details-wrap__content">' + destContent + '</div>',
                '</div>',
                '</div>',
            ].join(''));

            $('.TG_dest-inner').append(detailBlock);

            // -------------------------------------------------------
            // Identify the detail block so we can match copy
            // -------------------------------------------------------
            var destIdentifier = destTitle.replace(/[^A-Z]/ig, '').toLowerCase();
            detailBlock.attr('data-tg-block-identifier', destIdentifier);
        }

        // Add data-tg-block-identifier to feature secondary blocks and wrap content
        $('.feature-secondary-single').each(function(idx, item) {
            var title = $(this).find('h3').text().trim(); 
            var destIdentifier = title.replace(/[^A-Z]/ig, '').toLowerCase();
            $(this).attr('data-tg-block-identifier', destIdentifier);

            $(this).find('h3').nextAll().wrapAll('<div class="tg-feature-content">');
        });

        // Configurator
        $('.start-configuration').on('click', function(){
            $('.product-collateral + .regular-price').hide();
        });

        $('.close-configurator').on('click', function(){
            $('.product-collateral + .regular-price').show();
        });

        // Remove product-img-container we have our own slider by now...
        $('.product-img-box').hide();

        // Get Vimeo videos and hold promises for later 
        for (i = 0; i < slideArray.length; i++) {
            if (slideArray[i] !== null && typeof slideArray[i] !== 'undefined') {
                if(slideArray[i].type === 'video') {
                    (function(elm) {
                        function defer() {
                            var df = $.Deferred();

                            UC.poller([
                                function() {
                                    return !!elm.find('iframe').length;
                                }
                            ], function() {
                                var slideSrc = elm.find('iframe').attr('src');
                                var spliceVimeoID = slideSrc.match(/player\.vimeo\.com\/video\/([0-9]*)/);

                                if (spliceVimeoID && spliceVimeoID[1]) {
                                    var ajaxCall = $.ajax({
                                        type: 'GET',
                                        url: '//vimeo.com/api/v2/video/' + spliceVimeoID[1] + '.json',
                                        jsonp: 'callback',
                                        dataType: 'jsonp',
                                        success: function (data) {
                                            var thumbnail_src = data[0].thumbnail_large;
                                            mainSlider.append([
                                                '<div class="TG_main_slide">',
                                                '<div class="TG_video_block">',
                                                '<div class="TG_video_thumbnail" style="background-image: url(' + thumbnail_src + ');"></div>',
                                                '<div class="TG_video">',
                                                '<iframe src="' + slideSrc + '" frameborder="0" allowfullscreen>',
                                                '</iframe>',
                                                    '</div>',
                                                    '<a href="#" class="TG_video_play"></a>',
                                                '</div>',
                                                '</div>',
                                            ].join(''));

                                            df.resolve();
                                        }
                                    });
                                }
                            });

                            return df.promise();
                        }

                        ajaxPromiseArray.push(defer());
                    })(slideArray[i].element);
                } else if(slideArray[i].type === '360') {
                    var newSlide = $('<div class="TG_main_slide">');
                    newSlide.append([
                        '<div class="TG_m360">',
                            '<a class="Magic360" data-magic360-options="' + slideArray[i].element.find('.Magic360').attr('data-magic360-options') + '">',
                                slideArray[i].element.find('.Magic360').html(),
                            '</a>',
                            '<p class="TG_m360__instruct">Press the arrows <i class="TG_m360-arrows"></i> to view in 360 drag/zoom mode</p>',
                        '</div>'
                    ].join(''));
                    mainSlider.append(newSlide);

                    slideArray[i].element.remove();

                    if(window.Magic360) {
                        window.Magic360.start();
                    }

                    // Refresh m360
                    //$.getScript('https://www.technogym.com/skin/frontend/base/default/js/magic360.js');
                } else if(slideArray[i].type === 'image') {
                    var imageElm = slideArray[i].element;
                    var src = imageElm.attr('data-src');
                    if(!src) {
                        src = imageElm.attr('src');
                    }

                    mainSlider.append([
                        '<div class="TG_main_slide" style="background-image: url(' + src + ');">',
                        '</div>',
                    ].join(''));
                }
            }
        }

        if (/skillrow.html/.test(url)) {
            function defer() {
                var df = $.Deferred();
              
                UC.poller([
                  '#extended-top iframe'
                ], function() {
                  var extendVid = $('#extended-top iframe').attr('src'),
                    spliceExtID = extendVid.match(/player\.vimeo\.com\/video\/([0-9]*)/);

                  var ajaxCall = $.ajax({
                      type:'GET',
                      //url: '//vimeo.com/api/v2/video/' + spliceExtID[1] + '.json',
                      url: '//vimeo.com/api/v2/video/207777723.json',
                      jsonp: 'callback',
                      dataType: 'jsonp',
                      success: function(data){
                          var thumbnail_src = data[0].thumbnail_large;
                          mainSlider.append([
                              '<div class="TG_main_slide">',
                                  '<div class="TG_video_block">',
                                      '<div class="TG_video_thumbnail" style="background-image: url(' + thumbnail_src + ');"></div>',
                                      '<div class="TG_video">',
                                          '<iframe src="' + extendVid + '" frameborder="0" allowfullscreen>',
                                          '</iframe>',
                                      '</div>',
                                      '<a href="#" class="TG_video_play"></a>',
                                  '</div>',
                              '</div>',
                          ].join(''));

                          df.resolve();
                      }
                  });
                });

                return df.promise();
            }

            ajaxPromiseArray.push(defer());
          
            // Remove nano scroll
            $('#collateral-tabs-content .nano').removeClass('nano');
          
            // Move video now at bottom up to just before specification
            $('#extended-bottom').insertBefore('.TG_spec-wrap');
        }

        // Vimeo video retrieval promises..
        $.when.apply(undefined, ajaxPromiseArray).then(function() {
            UC.poller([
                function () {
                    if (window.jQuery.fn.slick) {
                        return true;
                    }
                }
            ], slickFN);

            function slickFN(){
                $(".TG_main_slider").slick({
                    dots: true,
                    slidesToShow: 1,
                    swipe: true,
                    slidesToScroll: 1,
                    autoplaySpeed: 3000,
                });
                var didFireUsedSliderEvent = false;
                $(".TG_main_slider").on('afterChange', function(slick, currentSlide) {
                    if(!didFireUsedSliderEvent) {
                        sendEvent('did-use-main-slider');

                        didFireUsedSliderEvent = true;
                    }
                });

                $(".TG_video_play").on('click', function (e) {
                    e.preventDefault();
                     var vidWrap = $(this).parent(),
                        iframe = vidWrap.find('.TG_video iframe'),
                        iframeSrc = iframe.attr('src'),
                        iframePlay = iframeSrc.replace('&autoplay=0', '&autoplay=1');
                    
                    /* on click, find the parent
                        find the iframe inside the parent
                        store the src of the iframe in the variable iframeSrc
                        change the autoplay string to true/1
                    */

                    vidWrap.children('.TG_video_thumbnail').fadeOut();
                    vidWrap.children('.TG_video_play').fadeOut();
                    vidWrap.find('.TG_video iframe').attr('src', iframePlay);
                    
                    /* Fade the thumbnail and play button out
                        change the iframe src to the autoplay version to start the video
                    */
                });
            }
        });
        
        // ------------------------------------------------------------------------
        // Other changes
        // ------------------------------------------------------------------------
        $('.product-view .product-shop .request-quote a').addClass('button btn-cart');
      
        $('.feature-secondary-container').addClass(
              $('.TG_detail_block').length % 2 === 0 ? 'tg2-start-right' : 'tg2-start-left'
        );

        // ------------------------------------------------------------------------
        // Page-specific changes
        // ------------------------------------------------------------------------
        if(/mycycling.html/.test(url)) {
            $('.TG_contact-block').addClass('TG_bg-lightgrey');
        }
        if(/skillrow.html/.test(url)) {
            $('#collateral-tabs').remove();
        }
        
        // ------------------------------------------------------------------------
        // Send events
        // ------------------------------------------------------------------------
        $('.TG_business-btn').on('click', function() {
            sendEvent('clicked-for-business-button', '');
        });
        $('.TG_home-btn').on('click', function() {
            sendEvent('clicked-for-home-button', '');
        });

        // ------------------------------------------------------------------------
        // Refresh nano scroller scrollbars
        // ------------------------------------------------------------------------
        UC.poller([
            function() {
                return !!window.jQuery.fn.nanoScroller;
            }
        ], function() {
            setTimeout(function() {
                $('.nano').nanoScroller();
            }, 500);
        });

        updateCopyToBusiness();
    }
})();
