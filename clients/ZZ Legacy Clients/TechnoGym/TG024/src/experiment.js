import _strings from './lib/strings.js';
import _defaults from './lib/defaults.js';

// ------------------------------------------------------------------------
// TG024 - Product page redesign V2 -- Iteration
// As this builds on TG005 there are references to tg5 classes on elms
// ------------------------------------------------------------------------
var TG024 = (function() {
    // ------------------------------------------------------------------------
    // Configuration options
    //
    // - product-options: attribute and option IDs matching those in markup
    // with custom images and titles against each option ID
    // - gallery slider identify thumbs and associated elements
    // ------------------------------------------------------------------------
    var pathMatch = window.location.pathname;
    if(!pathMatch) {
        return;
    }

    var _settings = _defaults[pathMatch];
  
    if(!_settings) {
        return; 
    }

    var _language = _settings['lang'];
    

    // UC Poller
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    // Helper send events
    var trackerName;
    function sendEvent(action, label, dimensionValue, dimensionName) {

        var category = 'TG024---ProductPage';
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

    // Assign to jQuery in scope
    var $ = null;

    // ------------------------------------------------------------------------
    // Poll main
    // ------------------------------------------------------------------------
    UC.poller([
        'body', 
        '#feature-primary .swiper-container .swiper-slide',
        '.footer-top',
        '.product-shop',
        '#product-info',
        function() {
            // Test for gallery existing on pages where it ought to
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
       $ = window.jQuery;
       
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
            experiment_str: 'TG024',
            variation_str: 'Variation 1'
        });
       }, { multiplier: 1.2, timeout: 0 });

       run();
    });
    
    // ------------------------------------------------------------------------
    // Entry point for running test
    // ------------------------------------------------------------------------
    function run() {
        setup();
        updateProductInfo();
        addSticky();
        updateProductImageBox();
        createCTARegion1();
        createCTARegion2();
        createContactForm();
        createCTARegion3();
        createSpecsSection();
        layoutOtherSections();
        initialiseContactsPopout();
        redesignUpsellLightbox();
        maxHeightOnSpecs();
    }

    // ------------------------------------------------------------------------
    // Setup
    // ------------------------------------------------------------------------
    function setup() {
       $('body').addClass('tg024');

       var pathIdentifier = (window.location.pathname.match(/[^\/]+$/g) || [])[0];
       $('body').addClass('tg024-page--' + pathIdentifier.replace('.html', ''));
    }
    
    // ------------------------------------------------------------------------
    // Update product info area
    // ------------------------------------------------------------------------
    function updateProductInfo() {
        var container = $('.product-shop');

        // Title
        container.find('.product-name').prepend([
            '<p class="tg5-ps-prefix">',
                _strings['technogym_presents'][_language],
            '</p>'
        ].join(''));

        // Create custom product selection swatches corresponding to options
        // if the product is a configurable product
        if(_settings['product-options']) {
            createCustomAddToCart(_settings['product-options']);
        
        } else {
            // Handle Simple product
            createCustomAddToCartSimpleProduct();    
        }
        
        // Move price
        container.find('.price-box:first').insertBefore('.tg5-addtocart');

        // Download free brochure
        if(_settings.brochure) {
            $('.tg5-ps-addtocart').append([
                '<span class="tg5-or-sep">- ' + _strings['or'][_language] + ' -</span>',
                '<a class="tg5-brochure-link button btn-block tg5-green-button" target="_blank" href="' + _settings.brochure.url + '">',
                    '<span>' + _settings.brochure.text + '</span>',
                '</a>',
            ].join(''));
        }

        // Replace description
        $('.product-description-wrapper:first').replaceWith([
            '<div class="tg5-product-description">',
                _settings['description']['short'],
                ' <a class="tg5-product-description-readmore">(' + _strings['read_more'][_language] + ')</a>',
            '</div>'
        ].join(''));
        $('.tg5-product-description-readmore').on('click', function() {
            $('.tg5-product-description').html(_settings['description']['full']);
        });

        // Amend text 'flexible payment plans' and other info below CTA
        $('.tg5-ps-addtocart').append([
            '<div class="tg5-extra-info">',
            '</div>'
        ].join(''));

        // After main copy bullet points
        container.find('.tg5-extra-info').append([
            '<ul class="tg5-ps-list">',
            '</ul>'
        ].join(''));

        if(_settings['bullet-points']) {
            $.each(_settings['bullet-points'], function(idx, item) {
                $('.tg5-ps-list').append([
                    '<li>' + item + '</li>'
                ].join(''));
            });
        }

    }

    // ------------------------------------------------------------------------
    // Sticky on scroll
    // ------------------------------------------------------------------------
    function addSticky() {
        const productTitle = $('.product-name h1').text().trim();

        const stickyHtml = `
            <div class="tg5-sticky">
                <div class="tg5-sticky__inner clearfix">
                    <div class="tg5-sticky__desc">
                        ${_strings['technogym_presents'][_language]}
                        <strong>${productTitle}</strong>
                    </div>
                    <div class="tg5-sticky__buttons">
                        <span>
                            <a data-target=".tg5-brochure-link" href="${_settings.brochure.url}" 
                                class="button btn-block tg5-green-button"
                            >
                                ${_strings['download_brochure'][_language]}
                            </a>
                            <em>${_strings['to_learn_more'][_language]}</em>
                        </span>
                        <span class="tg5-sticky__or">
                            - ${_strings['or'][_language]} -
                        </span>
                        <span>
                            <a data-target=".tg5-addtocart" class="button btn-block tg5-green-button">
                                ${_strings['add_to_basket'][_language]}
                            </a>
                            <em>${_strings['to_buy_now'][_language]}</em>
                        </span>
                    </div>
                </div>
            </div> 
        `;
        const stickyElm = $(stickyHtml);

        stickyElm.prependTo('body');

        const brochureLinkTop = ($('.tg5-brochure-link').offset() || {}).top;

        let winScrollTimeout = null;
        $(window).on('scroll', function() {
            clearTimeout(winScrollTimeout);
            winScrollTimeout = setTimeout(function() {
                if($(window).scrollTop() > brochureLinkTop + 100) {
                    stickyElm.addClass('tg5-sticky--active');
                } else {
                    stickyElm.removeClass('tg5-sticky--active');
                }
            }, 50);
        });

        stickyElm.on('click', 'a', function() {
            const target = $(this).attr('data-target');
            if(target == '.tg5-addtocart') {
                $(target).trigger('click');

                $('body,html').animate({
                    scrollTop: 200
                }, 200);

                return false;
            }
        });
    }
    
    // ------------------------------------------------------------------------
    // Create custom add to cart for variant products
    // ------------------------------------------------------------------------
    function createCustomAddToCartSimpleProduct() {
        var isRequestQuote = $('.product-view .product-shop .request-quote:not(:hidden)').length > 0;

        // Create add to cart container
        $('.product-shop .product-main-info .product-description-wrapper:first').after($([
            '<div class="tg5-ps-addtocart">',
                '<button title="Add to Basket" class="button tg5-addtocart btn-block">',
                    isRequestQuote ? _strings['request_quote'][_language] : _strings['add_to_basket'][_language],
                '</button>',
            '</div>'
        ].join('')));
    
        // Handle add to basket when button copy clicked
        $('.tg5-ps-addtocart .tg5-addtocart').on('click', function() {
            if(isRequestQuote) {
                $('.request-quote a')[0].click();
            } else {
                productAddtocartForm.submit();
            }

            return false;
        });
    }
    
    // ------------------------------------------------------------------------
    // Create custom add to cart for variant products
    // ------------------------------------------------------------------------
    function createCustomAddToCart(productOptions) {
        // Create add to cart container
        $('.product-shop .product-main-info .product-description-wrapper:first').after($([
            '<div class="tg5-ps-addtocart">',
                '<button title="Add to Basket" class="button tg5-addtocart btn-block">',
                    _strings['add_to_basket'][_language],
                '</button>',
            '</div>'
        ].join('')));

        // Create product optoins swatches
        $.each(productOptions, function(attributeId, item) {
            var label = item.label,
                swatches = item.swatches;

            // Add label and swatches to add to cart
            $('.tg5-ps-addtocart').prepend([
                '<div class="tg5-ps-addtocart__label">',
                    label,
                '</div>',
                '<div class="tg5-ps-addtocart__options">',
                '</div>'
            ].join(''));

            $.each(swatches, function(optionId, item) {
                var name = item.name,
                    imageUrl = item['image-url'];

                var swatchObject = $([
                    '<div class="tg5-ps-addtocart__option" data-optionid="' + optionId + '">',
                        '<img src="' + imageUrl + '" />',
                    '</div>'
                ].join(''));

                $('.tg5-ps-addtocart__options').append(swatchObject);

                // Update super attribute on swatch click
                swatchObject.on('click', function() {
                    $('.tg5-ps-addtocart__option').removeClass('tg5-ps-addtocart__option--selected');
                    $(this).addClass('tg5-ps-addtocart__option--selected');

                    var superAttributeSelect = $('[name="super_attribute[' + attributeId + ']"]');
                    superAttributeSelect.val($(this).attr('data-optionid'));
                });
            });
        });

        // Handle add to basket when button copy clicked
        $('.tg5-ps-addtocart .tg5-addtocart').on('click', function() {
            $('.tg5-ps-addtocart__invalid').remove();

            var valid = true;
            $.each(productOptions, function(attributeId, item) {
                var superAttributeSelect = $('[name="super_attribute[' + attributeId + ']"]');
                if(!superAttributeSelect.val()) {
                    valid = false;

                    return false;
                }
            });

            if(!valid) {
                $('.tg5-ps-addtocart__options').prepend([
                    '<div class="tg5-ps-addtocart__invalid">',
                        _strings['ensure_option_chosen'][_language],
                    '</div>'
                ].join(''));
            } else {
                productAddtocartForm.submit();
            }

            return false;
        });
    }

    // ------------------------------------------------------------------------
    // Helper create slide
    // ------------------------------------------------------------------------
    function createSlide(data) {
        var slide = $([
            '<div class="tg5-gallery__slide">',
            '</div>'
        ].join(''));

        var identifier = 'tg5-id-' + (new Date()).getTime() + parseInt((Math.random() * 1000000));

        slide.attr('id', identifier);

        switch(data.type) {
            case 'video':
                var videoSlide = $('<div class="tg5-embed-container">');
                videoSlide.append($(data.target));
                slide.append(videoSlide);
                break;
            case '360':
                var slideElm = $(data.target);

                slide.append([
                    '<a class="Magic360" data-magic360-options="' + slideElm.find('.Magic360').attr('data-magic360-options') + '">',
                        slideElm.find('.Magic360').html(),
                    '</a>',
                ].join(''));

                slide.addClass('tg5-is-360');

                slideElm.remove();
                break;
            case 'image':
                slide.append('<img src="' + data.target + '" />');
                break;
        }

        $('.tg5-gallery__slides').append(slide);

        // Add a thumb to thumbs area
        if(data.thumb) {
            var thumb = $([
                '<div class="tg5-gallery__thumb">',
                    '<img src="' + data.thumb + '" />',
                '</div>'
            ].join(''));

            thumb.attr('target-id', identifier);

            thumb.appendTo('.tg5-gallery__thumbs');
        }
    }
    
    // ------------------------------------------------------------------------
    // Update product image box area
    // ------------------------------------------------------------------------
    function updateProductImageBox() {
        // show loader until our plugins are ready
        $('.product-essential .product-img-box').append([
            '<div class="tg5-imgbox-loader">',
                '<img src="https://www.technogym.com/skin/frontend/technogym/default/images/loading.gif" />',
            '</div>'
        ].join(''));

        // Load slick and then build the slidser
        $.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', function() {
            // Build main images
            $('.tg5-imgbox-loader').remove();

            var tgGallery = $([
                '<div class="tg5-gallery clearfix">',
                    '<div class="tg5-gallery__thumbs">',
                    '</div>',
                    '<div class="tg5-gallery__slides">',
                    '</div>',
                '</div>'
            ].join(''));
            $('.product-essential .product-img-box').prepend(tgGallery);

            $.each(_settings.gallery, function(idx, item) {
                createSlide(item);
            });

            // Initialise Slick slider
            $(".tg5-gallery__slides").slick({
                dots: false,
                slidesToShow: 1,
                swipe: false,
                arrows: false,
                slidesToScroll: 1,
                autoplay: false
            });

            var didFireUsedSliderEvent = false;
            var didStartMagic360 = false;
            $(".tg5-gallery").on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                if(!didFireUsedSliderEvent) {
                    sendEvent('did-use-main-slider');

                    didFireUsedSliderEvent = true;
                }

                var nextSlide = $('[data-slick-index=' + nextSlide + ']');

                if(!didStartMagic360 && nextSlide.hasClass('tg5-is-360')) {
                    window.Magic360.start();
                    didStartMagic360 = true;

                    // Once m360 loader hits 100%, remove all other loaders
                    UC.poller([
                        function() {
                            var numComplete = $('.m360-loader[data-progress="100%"]').length;
                            if(numComplete) {
                                return true;
                            }
                            return false;
                        }
                    ], function() {
                        $('.m360-loader').removeClass('shown');    
                    });
                }

                var targetThumb = $('.tg5-gallery__thumb[target-id=' + nextSlide.attr('id') + ']');

                $('.tg5-gallery__thumb').removeClass('tg5-gallery__thumb--active');
                targetThumb.addClass('tg5-gallery__thumb--active');
            });

            // Handle thumb click change slide
            $('.tg5-gallery__thumb').on('click', function() {
                var targetId = $(this).attr('target-id');
                var targetSlide = $('#' + targetId);
                var slickIndex = targetSlide.attr('data-slick-index');

                $('.tg5-gallery__slides').slick('slickGoTo', slickIndex);
            });
        });
    }
    
    // ------------------------------------------------------------------------
    // Create CTA region 1
    // - Selection of CTAs based on current 'features' area
    // - Uses custom copy
    // ------------------------------------------------------------------------
    function createCTARegion1() {
        var section = $([
            '<div class="tg5-cta1 tg5-section">',
                '<div class="tg5-inner">',
                    '<h2></h2>',
                    '<div class="tg5-row clearfix">',
                    '</div>',
                '</div>',
            '</div>'
        ].join(''));

        section.find('h2').html(_settings.cta1.title);

        $.each(_settings.cta1.boxes, function(idx, item) {
            var row = section.find('.tg5-row');
            row.append([
                '<div class="tg5-cta1__box">',
                    '<img src="' + item.image + '" />',
                    '<p>',
                        item.text,
                        item.link ? 
                            ' <a href="' + item.link + '">' + _strings['learn_more'][_language] + '</a>' : '',
                    '</p>',
                    typeof item.extra != 'undefined' ? item.extra : '',
                '</div>'
            ].join(''));
        });

        section.insertAfter('#product-info');
    }
    
    // ------------------------------------------------------------------------
    // Create CTA region 2
    // - Additional video and copy
    // - For MyRun, this video is taken from Vimeo (shown on page via link) or Youtube
    // (https://www.youtube.com/watch?v=JRhUsYFqI78)
    // ------------------------------------------------------------------------
    function createCTARegion2() {
        var section = $([
            '<div class="tg5-cta2 tg5-section clearfix">',
                '<div class="tg5-inner">',
                    '<div class="tg5-cta2__col1">',
                        '<h2>' + _settings.cta2.title + '</h2>',
                        _settings.cta2.text,
                    '</div>',
                    '<div class="tg5-cta2__col2">',
                    '</div>',
                '</div>',
            '</div>'
        ].join(''));

        section.insertAfter('.tg5-cta1');

        if((_settings.cta2 || {}).content) {
            $('.tg5-cta2__col2').html(_settings.cta2.content);
        } else {
            // Video already embedded in page
            UC.poller([
                '#videoModal-2'
            ], function() {
                $('#videoModal-2').appendTo('.tg5-cta2');

                var videoInitLink = $('[data-target="#videoModal-2"]').appendTo('.tg5-cta2__col2');
                videoInitLink.html('<img src="' + _settings.cta2.image + '" />');
            }, {
                timeout: 10000000
            });
        }
    }

    // ------------------------------------------------------------------------
    // Create contact form 
    // - Shortened version of current contact form
    // - Hardcode pre-select the 'your profile'
    // ------------------------------------------------------------------------
    function createContactForm() {
        var section = $([
            '<div class="tg5-contact-form tg5-section">',
                '<div class="tg5-inner">',
                    '<h2>' + _settings.contact.title + '</h2>',
                    '<div class="tg5-contact-form__form-container">',
                    '</div>',
                '</div>',
            '</div>'
        ].join(''));

        section.insertAfter('.tg5-cta2');

        var pageTitle = $('.product-view .product-shop .product-name h1').text();

        var contactUrl = 'https://www.technogym.com/gb/contacts/?reason=call&sku=DBE03UT#contact-form';
        if(_language == 'it') {
            contactUrl = 'https://www.technogym.com/it/contacts/?reason=call&sku=DBE03UT#contact-form';
        }

        $.ajax({
            url: contactUrl,
            type: 'GET',
            dataType: 'html',
            success: function (data) {
                var $data = $(data);
                var $contactForm = $data.find('#contactForm');

                if ($contactForm.length) {
                    $contactForm.appendTo($('.tg5-contact-form__form-container'));
                    $('.tg5-contact-form__form-container').find('.buttons-set .button').text('Send');
                    $('#product-name, #product').val(pageTitle);

                    $contactForm.find('.form-list li.fields:first').addClass('tg5-first');

                    setTimeout(function() {
                        $contactForm.find('.select-profile .option:first input[type=radio]').trigger('click');
                        $contactForm.find('.select-need select').val('tone_body');
                    }, 500);
                } else {
                    return;
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
    }

    // ------------------------------------------------------------------------
    // Create CTA region 3
    // - more reasons to love 
    // ------------------------------------------------------------------------
    function createCTARegion3() {
        var section = $([
            '<div class="tg5-cta3 tg5-section">',
                '<div class="tg5-inner">',
                    '<h2>' + _settings.cta3.title + '</h2>',
                    '<div class="tg5-row">',
                    '</div>',
                '</div>',
            '</div>'
        ].join(''));

        $.each(_settings.cta3.boxes, function(idx, item) {
            var row = section.find('.tg5-row');
            if(idx % 2 === 0) {
                row.append([
                    '<div class="tg5-cta3__box clearfix tg5-cta3__box--right">',
                        '<div class="tg5-cta3__box-col tg5-cta3__box-col--text">',
                            '<h3>',
                                item.title,
                            '</h3>',
                            '<div>',
                                item.text,
                            '</div>',
                        '</div>',
                        '<div class="tg5-cta3__box-col tg5-cta3__box-col--imaged">',
                            '<img src="' + item.image + '" />',
                        '</div>',
                    '</div>'
                ].join(''));
            } else {
                row.append([
                    '<div class="tg5-cta3__box clearfix tg5-cta3__box--left">',
                        '<div class="tg5-cta3__box-col tg5-cta3__box-col--imaged">',
                            '<img src="' + item.image + '" />',
                        '</div>',
                        '<div class="tg5-cta3__box-col tg5-cta3__box-col--text">',
                            '<h3>',
                                item.title,
                            '</h3>',
                            '<div>',
                                item.text,
                            '</div>',
                        '</div>',
                    '</div>'
                ].join(''));
            }
        });

        section.insertAfter('.tg5-contact-form');
    }

    // ------------------------------------------------------------------------
    // Update specs
    // - minor amends and relayout of specifications / FAQs and additional
    // ------------------------------------------------------------------------
    function createSpecsSection() {
        var section = $([
            '<div class="tg5-specs tg5-section">',
                '<div class="tg5-inner">',
                    '<div class="tg5-specs__col tg5-specs__col1">',
                    '</div>',
                    '<div class="tg5-specs__col tg5-specs__col2">',
                        '<h2>',
                            _settings.faqs.title,
                        '</h2>',
                        '<div>',
                            _settings.faqs.text,
                        '</div>',
                        '<a class="tg5-newsroom" href="' + _settings.newsroom.link + '">',
                            '<img src="' + _settings.newsroom.image + '" />',
                        '</a>',
                    '</div>',
                '</div>',
            '</div>'
        ].join(''));

        section.insertAfter('.tg5-cta3');

        // Add specs
        $('.post-type-specification').appendTo('.tg5-specs__col1');
        $('.post-type-specification .container').removeClass('container');
        $('.post-type-specification .col-xs-3').removeClass('col-xs-3').addClass('col-sm-4 col-xs-6');
    }
    
    // ------------------------------------------------------------------------
    // Layout other sections
    // - other sections relayout and considerations, mainly bottom sections
    // ------------------------------------------------------------------------
    function layoutOtherSections() {
        $('.product-recommendations').addClass('tg5-section');
        $('.product-recommendations h2').removeClass('block-title').text(_strings['related_products'][_language]);
        $('.product-recommendations h3').hide();

        var boxUpsell = $('.box-up-sell'),
            boxRelated = $('.box-related');

        if(boxUpsell.length && boxRelated.length) {
            boxUpsell.insertAfter(boxRelated);
        }

        $('.footer-top').addClass('tg5-section tg5-contacts');
        $('.footer-top h4:first').replaceWith('<h2>' + _strings['contact_us'][_language] + '</h2>');

        if($('.product-recommendations').length) {
            $('.tg5-contacts').insertBefore($('.product-recommendations')).wrap('<div class="footer-container">');
        }

        if(_language == 'it') {
            $('<div class="tg5-section container"><p class="tg5-disclaimer">*Esempio rappresentativo di finanziamento: Prezzo €3.250, anticipo €300; importo totale del credito €2.950, da restituire in 36 rate mensili ognuna di €84,41 importo totale dovuto dal consumatore €3.110,36. TAN 0,01% (tasso fisso) – TAEG 3,45% (tasso fisso). Spese comprese nel costo totale del credito: interessi €0,26, istruttoria €88,50, incasso rata €1,5 cad. a mezzo SDD, produzione e invio lettera conferma contratto € 1; comunicazione periodica annuale €1 cad.; imposta sostitutiva: €7,60. Eventuali contratti relativi a uno o più servizi accessori (es. polizza assicurativa) sono facoltativi. Offerta valida dal 01/02/2017 al 31/12/2017. Condizioni contrattuali ed economiche nelle “Informazioni europee di base sul credito ai consumatori” presso i concessionari. Salvo approvazione di Santander Consumer Bank</p></div>').insertBefore('.footer-container:last');
        }

        // Videos
        UC.poller([ 
            '#videoModal-1',
            '.tg5-cta1'
        ], function() {
            $('a[data-target="#videoModal-1"]').addClass('video-modal-trigger--custom-loaded'); 
            $('#videoModal-1').appendTo('.tg5-cta1');
        }, {
            timeout: 10000000
        });

        UC.poller([
            '#videoModal-0',
            '.tg5-cta3'
        ], function() {
            $('a[data-target="#videoModal-0"]').addClass('video-modal-trigger--custom-loaded'); 
            $('#videoModal-0').appendTo('.tg5-cta3');
        }, {
            timeout: 10000000
        });

        $('.video-modal-trigger--custom').on('click', function() {
            var target = $(this).attr('data-target');
            var sameLinkAlreadyInPage = $('a[data-target="' + target + '"]');
            sameLinkAlreadyInPage.trigger('click');
            return false;
        });
    }
    
    // ------------------------------------------------------------------------
    // Helper initialise contact us popout on given elements
    // ------------------------------------------------------------------------
    function initialiseContactsPopout() {
        $('.tg5-init-contacts-popout').on('click', function() {
            $('#contacts-us-fixed').trigger('click');
        });
    }
    
    // ------------------------------------------------------------------------
    // Redesign upsell popup
    // ------------------------------------------------------------------------
    function redesignUpsellLightbox() {
        UC.poller([
            function() {
                var visible = $('#aw-afptc-popup').is(':visible');
                return visible;
            }
        ], function() {
            $('#aw-afptc-popup form').prepend([
              '<div class="tg5-upsell-container">',
              '<h2>' + _strings['successfully_add_to_cart'][_language] + '</h2>',
              '<p class="tg5-upsell-heading">',
                _strings['enhance_recommended'][_language],
              '</p>',
              '<div class="tg5-upsell-cols clearfix;">',
                '<div class="tg5-upsell-col1">',
                '</div>',
                '<div class="tg5-upsell-col2">',
                '</div>',
              '</div>',
              '</div>'
            ].join(''));

            $('#aw-afptc-popup .product-image').appendTo('.tg5-upsell-col1');
            $('#aw-afptc-popup .product-details').appendTo('.tg5-upsell-col2');
            $('#aw-afptc-popup button').appendTo('.tg5-upsell-col2');
            $('#aw-afptc-popup label[for=aw-afptc-decline-rule]').hide();
            $('#aw-afptc-popup #aw-afptc-decline-rule').hide();
            $('#aw-afptc-popup .block-title').hide();

            $('#aw-afptc-popup #aw-afptc-decline-rule').click();

            $('#aw-afptc-decline span span').html(_strings['no_thanks'][_language]);
            $('button[title=Accept] span span').html(_strings['add_to_basket'][_language]);
        }, {
            timeout: 10000000
        });
    }
    
    // ------------------------------------------------------------------------
    // Max height on specs
    // ------------------------------------------------------------------------
    function maxHeightOnSpecs() {
        var list = $('.specification-list');
        if(list.outerHeight() > 500) {
            list.addClass('tg24-scroll-max');
        }
    }
})();
