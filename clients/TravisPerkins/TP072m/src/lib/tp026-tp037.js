export default function tp026037() {
  /* eslint-disable */
    // ----------------------------------------------------
    // Test has 2 variations
    // Both variations in this codebase to maintain one codebase
    //
    // TP037 MOBILE PRODUCT PAGE
    //
    // This test runs after TP027 has ran...
    // Below tp027 code is brought in, run tp37 after tp026 ends
    // ----------------------------------------------------

    var TP037 = function() {
        if(document.body.classList.contains('TP037')) {
            return;
        }

        // Set variation
        var VARIATION = 2;

        // UC library poller
        var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

        // Helper send events
        var trackerName;
        function sendEvent(action, label, dimensionValue, dimensionName) {

            var category = 'TP037---Mobile-Landscaping-Per-m';
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

        // Full Story Integration
        UC.poller([
         function() {
             var fs = window.FS;
             if (fs && fs.setUserVars) return true;
         }
        ], function () {
         window.FS.setUserVars({
             experiment_str: 'TP037',
             variation_str: 'Variation 2'
         });
        }, { multiplier: 1.2, timeout: 0 });

        // Setup
        document.body.classList.add('tp037');
        if(VARIATION == 2) {
            document.body.classList.add('tp037--v2');
        }

        // ------------------------------------------------------------------------
        // Poll required elements
        // ------------------------------------------------------------------------
        UC.poller([
            function () {
                if (window.jQuery) {
                    return true;
                }
            }
        ], function() {
            // Grab tech attributes
            var attributesOfInterest = [
                'Width', 'Length', 'Pack Coverage', 'Coverage', 'Size', 'Type', 'Pack Quantity'
            ];
            var techAttributes = {};

            $('.tp_specificationTable tr').each(function() {
                var attribElm = $(this).find('td.attrib');
                var attrib = attribElm.text().trim();

                if(attributesOfInterest.indexOf(attrib) > -1) {
                    var value = attribElm.next('td').text().trim();
                    techAttributes[attrib] = value;
                }
            });

            // Get prices ex vat / inc vat
            var priceExVat = $('.tpInfoWrapper .productPrice .product_price_section .price_value').text().trim()
                .replace('£', '');
            priceExVat = parseFloat(priceExVat);

            var priceIncVat = $('.tpInfoWrapper .productPrice .price_inc_vat_section .includedVAT').text().trim()
                .replace('£', '');
            priceIncVat = parseFloat(priceIncVat);

            // -------------------------------------------
            // DECKING
            // Conditions:
            // - Breadcrumb contains 'Composite Decking' or 'Timber Decking'
            // - Tech attribute Width exists
            // - Either (a) tech attribute length exists or (b) #variantList dropdown has length (uses minimum)
            //
            // Sample with 'From' prices:
            // https://www.travisperkins.co.uk/Treated-Green-Redwood-Decking-Board-38mm-x-148mm/p/9000050434
            //
            // Sample with length given:
            // https://www.travisperkins.co.uk/Treated-Green-Redwood-Decking-Board-38mm-x-148mm-x-3-0m/p/885815
            // -------------------------------------------
            var width = techAttributes['Width'],
                length = techAttributes['Length'];
            if(!length) {
                length = getMinimumValueFromSelect();
            }

            width = parseInt(width, 10);
            length = parseInt(length, 10);

            if((breadcrumbSegmentExists('Timber Decking') || breadcrumbSegmentExists('Composite Decking')) && width && length) {
                var sqm = calculateSquareMetres(width, length);

                var priceExVatText = [
                    '<span class="tp37-price-text tp37-price-text--ex-vat">',
                        '<strong>£' + (priceExVat / sqm).toFixed(2) + '</strong> ',
                        'per m<sup>2</sup> ',
                        '<em>(Ex VAT)</em>',
                    '</span>'
                ].join('');

                var priceIncVatText = [
                    '<span class="tp37-price-text tp37-price-text--inc-vat">',
                        '<strong>£' + (priceIncVat / sqm).toFixed(2) + '</strong> ',
                        'per m<sup>2</sup> ',
                        '<em>(Inc VAT)</em>',
                    '</span>'
                ].join('');

                var att1 = {
                   label: 'Coverage',
                   value: sqm.toFixed(2) + 'm<sup>2</sup>' 
                };
                var att2 = {
                   label: 'Length',
                   value: length.toFixed(0) + 'mm'
                };

                sendEvent('pageview', 'decking');

                updateUi(priceIncVatText, priceExVatText, att1, att2);
            }
            
            // -------------------------------------------
            // PAVING SLABS
            // Conditions:
            // - Breadcrumb contains 'Decorative Paving Slabs'
            // - Tech attribute Width exists
            // - Tech attribute Length exists
            //
            // Sample pack
            // https://www.travisperkins.co.uk/Marshalls-Heritage-Yorkstone-Paving-600mm-x-450mm-x-38mm---Pack-of-22/p/752960
            //
            // Sample single product
            // https://www.travisperkins.co.uk/Marshalls-Pendle-Natural-Paving-Slab-450mm-x-450mm-x-32mm/p/794294
            // -------------------------------------------
            var width = techAttributes['Width'],
                length = techAttributes['Length'];

            width = parseInt(width, 10);
            length = parseInt(length, 10);

            if(breadcrumbSegmentExists('Decorative Paving Slabs') && width && length) {
                if(techAttributes['Pack Quantity'] > 1) {
                    sendEvent('pavingslabs-pack');
                } else {
                    sendEvent('pavingslabs-non-pack');
                }

                var sqm = calculateSquareMetres(width, length);
                if(techAttributes['Pack Quantity'] > 1) {
                    sqm *= techAttributes['Pack Quantity'];
                }

                var priceExVatText = [
                    '<span class="tp37-price-text tp37-price-text--ex-vat">',
                        '<strong>£' + (priceExVat / sqm).toFixed(2) + '</strong> ',
                        'per m<sup>2</sup> ',
                        '(Ex VAT)',
                    '</span>'
                ].join('');

                var priceIncVatText = [
                    '<span class="tp37-price-text tp37-price-text--inc-vat">',
                        '<strong>£' + (priceIncVat / sqm).toFixed(2) + '</strong> ',
                        'per m<sup>2</sup> ',
                        '(Inc VAT)',
                    '</span>'
                ].join('');

                var att1 = {
                   label: 'Coverage',
                   value: sqm.toFixed(2) + 'm<sup>2</sup>' 
                };
                var att2 = null;
                if(techAttributes['Pack Quantity'] > 1) {
                    att2 = {
                       label: 'Pack Quantity',
                       value: techAttributes['Pack Quantity']
                    };
                }

                sendEvent('pageview', 'pavingslabs');

                updateUi(priceIncVatText, priceExVatText, att1, att2);
            }
            
            // -------------------------------------------
            // SOIL
            // Conditions:
            // - Breadcrumb contains 'Soil Compose & Bark'
            // - Tech attribute Size exists
            //
            // Tonne of top soil:
            // https://www.travisperkins.co.uk/Rolawn-Blended-Loam-Top-Soil-Bulk-Bag-1m%C2%B3/p/992985
            //
            // Consumer bag of top soil
            // https://www.travisperkins.co.uk/Westland-Garden-Top-Soil-35L/p/549769
            // -------------------------------------------
            var size = techAttributes['Size'],
                coverage = techAttributes['Coverage'];

            size = parseInt(size, 10); // litres
            coverage = parseInt(coverage, 10); // cubic metres

            if(breadcrumbSegmentExists('Soil Compost & Bark') && size) {

                var priceExVatText = [
                    '<span class="tp37-price-text tp37-price-text--ex-vat">',
                        '<strong>£' + (priceExVat / size).toFixed(3) + '</strong> ',
                        'per litre</sup> ',
                        '(Ex VAT)',
                    '</span>'
                ].join('');

                var priceIncVatText = [
                    '<span class="tp37-price-text tp37-price-text--inc-vat">',
                        '<strong>£' + (priceIncVat / size).toFixed(2) + '</strong> ',
                        'per litre</sup> ',
                        '(Inc VAT)',
                    '</span>'
                ].join('');

                var att1 = {
                   label: 'Size',
                   value: size + 'L' 
                };
                var att2 = null;
                    
                if(coverage) {
                    // Coverage at a depth of 50mm based on cubic metre coverage
                    var layCoverage = calculateCoverageFromVolumeBlock(coverage);

                    att2 = {
                       label: 'Coverage',
                       value: layCoverage + 'm<sup>2</sup>'
                    };
                }

                sendEvent('pageview', 'soil');

                updateUi(priceIncVatText, priceExVatText, att1, att2);
            }

            /**
             * Update UI now that we've calculated everything
             *
             * NB consider that we may have other tests conflicting with this one
             */
            function updateUi(priceIncVatText, priceExVatText, attribute1, attribute2) {
                $('.tpInfoWrapper .productPrice').wrap('<div class="tp37-price-wrapper">');

                if(priceIncVatText) {
                    if(VARIATION == 1) {
                        $('.tp37-price-wrapper .productPrice .price_inc_vat_section').append(priceIncVatText);
                    } else if(VARIATION == 2) {
                        $('.tp37-price-wrapper .productPrice .price_inc_vat_section').prepend(priceIncVatText);
                    }
                }
                if(priceExVatText) {
                    if(VARIATION == 1) {
                        $('.tp37-price-wrapper .productPrice .product_price_section').append(priceExVatText);
                    } else if(VARIATION == 2) {
                        $('.tp37-price-wrapper .productPrice .product_price_section').prepend(priceExVatText);
                    }
                }

                if(attribute1 || attribute2) {
                    var attributesContainer = $('<div class="tp37-attributes-container">');

                    if(attribute1) {
                        var elm = $([
                            '<span class="tp37-attribute">',
                                attribute1.label,
                                ': ',
                                '<em>',
                                attribute1.value,
                                '</em>',
                            '</span>'
                        ].join(''));
                        attributesContainer.append(elm);
                    }
                    if(attribute2) {
                        var elm = $([
                            '<span class="tp37-attribute">',
                                attribute2.label,
                                ': ',
                                '<em>',
                                attribute2.value,
                                '</em>',
                            '</span>'
                        ].join(''));
                        attributesContainer.append(elm);
                    }

                    // Price wrapper
                    $('.tp37-price-wrapper').append(attributesContainer);

                    // Toggle
                    $('.tp2-toggle').insertAfter(attributesContainer);

                    // Additional UI amends
                    $('.price_inc_vat_section .includedVAT, .price_inc_vat_section .price_info_holder').wrapAll(
                        '<div class="tp37-price-inner-wrapper"></div>'
                    );
                    $('.product_price_section .price_value, .product_price_section .price_info_holder').wrapAll(
                        '<div class="tp37-price-inner-wrapper"></div>'
                    );

                    var priceUom = $('.prices_holder .price_info_holder.uom_value .price_UOM');
                    priceUom.insertBefore('.prices_holder .tp37-price-inner-wrapper .price_info_holder');
                }
            }

            /**
             * Calculate coverage from sale volume
             */
            function calculateCoverageFromVolumeBlock(volumeCubicMetres, targetDepth) {
                if(!targetDepth) {
                    targetDepth = 0.05; // 50mm is average lay depth
                }

                return volumeCubicMetres / targetDepth;
            }

            /**
             * Calculate square metres from mm widths and lengths
             */
            function calculateSquareMetres(length, width) {
                var lengthMetres = length / 1000;
                var widthMetres = width / 1000;

                return lengthMetres * widthMetres;
            }

            /**
             * Helper go through options and parse numeric values, get minimum value
             */
            function getMinimumValueFromSelect() {
                var min;
                $('#variantList option').each(function() {
                    var text = $(this).text().trim();
                    var numericValue = parseInt(text, 10);

                    min = !min || numericValue < min ? numericValue : min;
                });

                return min;
            }

            /**
             * Get a text value in the breadcrumb to see if it exists
             */
            function breadcrumbSegmentExists(text) {
                var exists = false;
                $('#breadcrumb .tp_bread_link').each(function() {
                    var thisText = $(this).text().trim();
                    thisText = thisText.replace('&nbsp;', '');
                    if(thisText === text) {
                        exists = true;
                        return true;
                    }
                });
                return exists;
            }
            
        });

    };

    // ------------------------------------------------------------------------
    // TP026 PRODUCT PAGE MOBILE
    // ------------------------------------------------------------------------
    (function () {

        /**
         * UC Library - Poller
         * @version 0.2.2
         */
        var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

        // Triggers
        UC.poller([
            '#s7ProductDetailsImage_container',
            '.tpInfoWrapper .tp_prodPrice .product_price_section',
            '.featureClass li',
            '#addToCartForm',
            function () {
                if (window.jQuery) return true;
            },
            function () {
                if (window.ga) return true;
            }
        ], TP026, {
            timeout: 7000,
            multiplier: 0
        });

        // Variation
        function TP026() {
            var $ = window.jQuery;

            if($('body').hasClass('TP026')) {
                TP037();

                return;
            }

            var trackerName = window.ga.getAll()[0].get('name'); // GA tracker name
          
            window.ga(trackerName + '.send', 'event', 'TP026 - Travis Perkins - Product Page V2 Mobile', 'Page View', 'TP026 - Travis Perkins - Product Page V2 Mobile', {nonInteraction: 1});
          
            // Full Story Integration
            UC.poller([
            function() {
                var fs = window.FS;
                if (fs && fs.setUserVars) return true;
                }
            ], function () {
              FS.setUserVars({
                  experiment_str: 'TP026',
                  variation_str: 'Variation 1 Mobile'
              });
            }, { multiplier: 1.2, timeout: 0 });
            
            var $loader = $('<div id="UC_page-overlay"><div class="UC_loading-dots"><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span></div></div>');
    $('body').prepend($loader);
            
            setTimeout(function(){
                  $loader.hide();
            }, 6000);
            

            $('body').addClass('TP026');


            var loginLink = $('.yCmsComponent.logInForTradePricesLink'),
                productPrice = $('.tpInfoWrapper .tp_prodPrice'),
                priceexVAT = productPrice.find('.product_price_section'),
                priceincVAT = productPrice.find('.price_inc_vat_section');


            /*Price Toggle*/
          
          var loggedIn = $('.nav-user-header .logout-m');

          if (!loggedIn.length > 0){

             priceexVAT.removeClass('tp26-loggedIn');
            /*Price Toggle*/
          
            var toggle = $('<div class="tp26-toggle"><label class="toggle"><span class="ex-vat">ex VAT</span><input id="tp26-togglecheckbox" type="checkbox"><div class="slide-toggle"></div><span>inc VAT</span></label></div>');productPrice.find('.prices_holder').append(toggle);


            $('#tp26-togglecheckbox').prop('checked', true);

            $('#tp26-togglecheckbox').change(function () {
                if ($(this).is(':checked') == false) {
                    priceexVAT.addClass('visible');
                    priceincVAT.addClass('hidden');

                } else {
                    priceexVAT.removeClass('visible');
                    priceincVAT.removeClass('hidden');
      
                }
            });
            
              }else{
            priceexVAT.addClass('tp26-loggedIn');
          }



            /*product desc*/
            $('<div class="tp26-description"><ul class="tp26-list"></ul</div>').insertAfter(productPrice);

            $('.featureClass li:lt(3)').addClass('tp26-product-li').clone().prependTo('.tp26-list');

            var descLinks = $(['<div class="tp26-descLinks">',
                                    '<div class="tp26-moreLink">',
                                        '<a href="#tp26_overview">Read More</a>',
                                    '</div>',
                               '</div>'].join(''));

            descLinks.appendTo('.tp26-description');


            $('<p class="tpimageText">Double Tap to Zoom</p>').appendTo('#s7ProductDetailsImage_container');

            if ($('#s7ProductDetailsImage_swatches').is(":visible")) {
                $('#s7ProductDetailsImage_flyout').addClass('tp26-nothumb');
            }

            loginLink.prependTo('.tp26-description');

            /*Buttons*/
            $('#tpPdpRightPanelComponent .ccButton').insertAfter('.add_to_cart_form');
          
            $('<p class="tp26-cost"><strong>Tell us your delivery address</strong></p>').appendTo('#addToCartForm');
            $('#stockCheckerButton').text('Check stock at your local branch');
          
             if($('#changePostCode').is(':visible')){
                $('.tp26-cost').hide();
            }

            $('.tp26-cost').click(function () {
                $('#addToCartButton').click();
            });


            var overviewContent = $('.tp_detOverview .ui-collapsible-content'),
                specificationsContent = $('.tp_detSpec .ui-collapsible-content');


            //NEW TABS

            var newTabs = $(['<div id="tp26_overview" class="tp26tabcontainer">',
                              '<ul class="tabs">',
                                    '<li class="tp26_tab-link current" data-tab="tab-1"><div class="tp26tabicon"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhBBoKIThy4lsXAAAD4UlEQVRo3t3Zf2iVVRgH8I+blBWC4pQwLAslK2tkf7RAy8wfOVAaJYstIpOalUYFVhQUmGFKmFREJKQg5c/IkGpDmH+MSCFWzYpCM4aYtI0mqMxG8+0Pb2O7u+s+9+5eF37PP/c953ue8z3P+5znfe77kg+utEunpE/r9Imr87KVFz7rt/i/7UeXXpjlJ+txyhzX9GnznJaYe2EEPC7RMKC3QaIud2Mjw8xSD3jQZZiEcwPGEzytCl22262n0Puu7ne/tw4Y39pvvDpqdkRYwKfu87Em8Je9OtLGyyxKBeEsNfaoipkd/BaMUmGGCb3X5Wjy/qD8Dpt7f9co90bvVZtmB5zNwduY6XCGg7Y8NHd5hpmHzczFAzPsN1K7Ju29fZUm5bCBY77o/T3eLFPsd7vm2OQRDkk0GNOvtz4nD9T36xmjQeJQpogryWBgqum61DqZw47/GyfV6jLd1JiAW9EyIMqHhg4tKctpyBQDY8mw+wTjTA4sNi7FTvfCecsBAZnR6F5rrAmzgyiJEm2yJXiWz9piU9Rs3AMnLbU0zA4j7oEi4aIWcIl3vDCcAt6zInuJUjwBT1km8Vw2WuQULLQ4a93Qap1zmKDOR466y0a8bk8+2tMfJj9lrIHT2y1gpcQJ87VJfN7Pv4M8zCIeqFMZ8MAhsM0TbtCAI2ozVI55CWhKFWIRdJit0U3OqIo9TQsfhG3u9q4FfojR46k4jnYr4+TiZsLRRg2ngJu1OjB8AsbaY6zfh0tAie2uczz7AzwiYEsgDbUaD+Y47hmsNV+3+/2RzXjkFFwV4JSlwq3MRG+pUI0VDmafGBGwwKSsmbDdGbBTuZdU44NYWRYRcE5rxFQKL/vbK76K5oJiBOGrys3WHSMXIxPSEqcWNxMuUzk8HjiPVdY7lu3lXfE8MM9avF0ID0xxT1bOUfvAKPPsd9q1tiu105v5aE8vyVpCJdmN4EmJb0z0vUSLK/pYGUJJttGSQEl2BOzT6TaHXa5TVSo5DdkDuWGGPyV6LEzrH8QDhQ/CZnMdVOfLGL0Yx7BZRZx8Uf85LfO1bdlIxcuEI+1SMZxF6QazdXm0EB541sNZ88CvHtKFadbbqNEjVuIx3+ajPT0PfBfKhNNAnUSX552V2NDP6hAy4UJ3ZuX85mewWaXF1qHRqshuIwJO2BH2XrcldlmsVXXsm0nhg7DbEsvcEX3VW4xj2O3DOPl/mQl7iiKsJGU5IOAXUoeqkJiWshzAaN0StQVdvlai2+iBA5mC8JTVXrPZ9fb2+WaUP8Zb5EWsdio6pdSOUPbLpe1QmpvuGvXaCrJ0m3o1gy3zD/cHtFfrzUnxAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTI2VDEwOjMzOjU2KzAyOjAwH4Za7wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0yNlQxMDozMzo1NiswMjowMG7b4lMAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC"/"/></div><p>Product Overview</p></li><li class="tp26_tab-link" data-tab="tab-2"><div class="tp26tabicon"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhBBoMAQdVjS46AAAEpUlEQVRo3s3Zy2tVVxQG8J/mYoKPJC2iNZCigoIT0ZKJbdRUHGakCE7tPyA4E8WgE5GKE6UgQtGpTivoIFa0ooiUooIgOFFji6KtQWpijKuDu+/tSc+5r6i9fmdyztrr8e2zX2vvTevosNcD8Z/ngb06ZuFtFjiUC155DrXubE7LFnP9qdsvfvRuhvQ7g8Z9NkP6UdAvhK05+VYh9Lden1ZRbue3OfnbTOkHIrDEgJ6c9MsG/+e/6DFgScvV1OWkECbsqcpKthtN3W0oZzGUSkZty/yHPSaEcFJXa+EvZPr2YSxzwOP0PeGiVTmbVS6mYOGR/Zbi+4yXC81TqIQ/Zb1LQrjujRBeOWunRTUtF9nprFdCmHRDCJesd6oVCpXwP5iD+S6nGow7qLupCnQ7aDxZXTYfc/zQLIWZ4WGBK147anErbWixo167YkH6bpJCPjwstLKl4BWstDDz1RSFUwXhPxwqFE7VUuhLxR8nfJlCuYp9xcVfC2H9RwsP64XwdZbTv+j1h04/G/Z3E67WWa1PH5544r7fmrCZ7yffmvSFv4oV9qShs6Cumw2Oe5hbih86bkNduwVpSO+pp1Seu67M6L9ZrHU+E/S5u+56npGct7aG5UJXqvNqXdwQXhcOvA7HTAthzAlbdFZLOm1xwpgQph0rXBNXei1cbxR+qUnhaEFJT5ojntltXqHtPLs9S2O9p6D8qPDGsvoE9gvjBbNejztCOFd1vcIOR4wadcQOK6p654Rwp4DCYuPCgXrhOzwSDhbILwjv7Evfw4WdcDiV7vNOuFDQEAeFx0q1CWwTXhUsOceESOF7nUkhp9x22mm3TSXJGb2JQgjHcn66vRK21yYwKpzNSdeaFs6BwdTVbhrMzOldBt1M3XMQnBOmC0bEWWE0H3iufsttFMLOXOl54Zke9BoTpowU/MaSEVPCmF70eCacz2ntFMImy/VX0sEOh7ystuRELt3YIITd4IwwZWPNP7jRlHAG7BYiNzUtqmZN4aVDOtg7oytdzDk9LoyZh2EhjKiHESEMY54x4XhO4+KMeHt5IFy11WabbS7I9R4KJ6pvN+v1YZTcFB6CE9W3LFYZMmTIVleFB4Swq6bDdULYghVCpC5WD4NCWIEtQlhXU3OXEOWOEDWVVoNrGMBbtxoSuOVt0r6W8VCEoPHOqA8vTCaX90w0JDDhXtKe9CJ5qINmCPxOcvlrw/CS1gDJ8j0JfHQ0IvCEtH7dwldN+fwqaZctn7w/gc91JpdrmtjbdFmTtDt93iyB2nnwffBNcllKbVsPA0pJ+5uMhyKkqG2fiNo+Fbd9MaKyHG9qz3KcRdsSkgq2tzslK3nc3qSUA+1Ny1nmTXs3Jlxv79bscHs3p23Ynn9SBxRtOaLJou2HVG0/pvsEDirbflSbp/C/H1ZnKfx7XH/DpFaP69+4blbH9VkK5ed7LLXfo2rW1OjC4rEDlqnMqy1fWJQp5K9sOmxr6spme2bBneWVTRnFl1Yb6xLYlJM3uLSqlxw89bRA+qgu6Xwa/rL+jrr1veF0DeKlTGkLKLVqYMy4biP6c1e3jBtr2d8s8EEvr2eDD3p9/w+WW1C9x1w+OQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wNC0yNlQxMjowMTowNyswMjowMAxaXEgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDQtMjZUMTI6MDE6MDcrMDI6MDB9B+T0AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="/></div><p>Technical Specs</p></li>','<li class="tp26_tab-link data" data-tab="tab-3"><div class="tp26tabicon"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhBB4SBwwN30kZAAADoUlEQVRo3uWZS0gVYRTHfzdvSbUwocgiI0oiokUhVJRQEVZolj0WQSFBFBEECQXtCqRoUy2KbCFREVIRPczAnhS97EVRm94oWQo97KHo9XGnhbfrnO/OfDP3zsxd5H82c+ac+b5z/ufMN98jhB6b2MwggoLBxZCDyXsmBdY9QG/YwSAMlPM6kM6zqSYjTDnLsOchByjjd8qdRKmiWtM20IUR6PVWE5yBEWYwsJlfgZCcRwVDnIwMjH9k+I7ZGDToGQjuE3MJp6/AO4azxiQZ1NMoDYJOgXo1xLWxIgwaEepFuDVSrTowknycRkc9ojygzSS3MF9nrjrwiImeY77FQvfGqgMnWOGZgTNCzmafSTK4zVX5QrqL8HNcm6Yi/E2lwoBA8A60slOnHgAjYY4g3aCGg9Lgvx8Jv7FVhFsv1aoD61nseRyoptYkt3NaZ646UME4zzHnCgccoDpQxBzPDNwQ8nh+miSD82zQOfCKV54ZkAiRJeQZegb8xxfxazL4qHdgPyuTSME7llLCHjJNz6Ic5oBJ7tavKhJrYEIS0Y0lm7lMVp4WCgfCokWDJnrNxiEMYAwtMXk405JgoJFmQkxXGHhBV+x+Ng8T3nnMrNhdDs2JDLTzKAkG+mJ67mAREdbvpDKxCLMsGYjQAQwVsVojqizkGp2SKv8F120WWBGWU0ynq8VYVby1FBYmnTbGvXTTLcvHFh1CGkYJI+yN1RSUkGmZgh56gCwX40Y0XoJ9GEUNlyh164AsGWs3kkOE+5xyz4D/aNFP0gfAlExdF9zgpjRI95SsKa5N05TsD8dEuNekWnUgn4KEz7CFs0SZSqGrDg3qxL7QD7Y5vWBOQZPl2FYAPHW9LXVPpKDBtmfLFOxgkQUDz4DdrHLJgJyEjqZOaC9zRMeAv7Aqwv4NmjQV4Xe2i3AfSLXqwDqKXUxIfrCLryyhzGIgi3JSkN7GcX1jMgWfXBbaWuCWje6uSEGDbc+WKShhngtaWzkHbKTYkoErQs6NT/f6wr3AFh0D/sKqCF/qGfAfzRSJcN9IterAXh82qSo5ZJK7eKF/QabgjQ8b9P27YCkU4Uyme2bgSTLmqgO/uOOp+6SRWISZLhlIZX5oCVkDta4z3cFqx7ZTWBc4HrDEkeHPdE5tZJHN0iwREWUB4pMD+H58JU9MzIjtnKR7KJZXV7pPTCQMavocWEBrIJ1PwfHEJEQPGYEy8IE8nTpMBaUeB18dohzVG/wFJvEOV3JUb8UAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDQtMzBUMTg6MDc6MTIrMDI6MDBxvse3AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA0LTMwVDE4OjA3OjEyKzAyOjAwAON/CwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="/></div><p>Data Sheets</p></li>',
                                    '</ul>',
                                    '<div id="tab-1" class="tab-content current"></div>',
                                    '<div id="tab-2" class="tab-content"></div>',
                                    '<div id="tab-3" class="tab-content"></div>',

                        '</div>'
                        ].join(''));

            newTabs.insertAfter('.tpAddToQuoteList');

            overviewContent.prependTo('#tab-1');
            specificationsContent.prependTo('#tab-2');
            
            
           $('ul.tabs li').click(function () {
                var tab_id = $(this).attr('data-tab');

                $('ul.tabs li').removeClass('current');
                $('.tab-content').removeClass('current');

                $(this).addClass('current');
                $("#" + tab_id).addClass('current');
            });
            
            if($('.dataSheetClass').length){
                $('.dataSheetClass').prependTo('#tab-3');
                $('.tp26tabcontainer').addClass('tp26-threetabs');

            }
            else{
                $('#tab-3').hide();
                $('.tp26_tab-link.data').hide();
            }
          
            // Above the fold content done
            // hide loader
            $loader.hide();
          
            // Hide VAT toggle on 'Footwear' category
            var category = $('.tp_bread_link.ui-link').text().trim().toLowerCase();
            if (category === 'footwear') {
                toggle.hide();
            }


            /*BUNDLES*/
            var pollerOpts = {
                timeout: 10000,
                multiplier: 0
            };

            //VIDEOS

            UC.poller(['#goodvidio-product-videos'], function () {
                if ($('#inc_frequently_bought').length) {
                    $('#goodvidio-product-videos').insertAfter('#inc_frequently_bought');
                } else {
                    $('#goodvidio-product-videos').insertAfter('#ProductDetail');
                }
            }, pollerOpts);


            //Bundles
            UC.poller(['#inc_frequently_bought_product'], function () {

                var bundles = $('#inc_frequently_bought_product');
                bundles.insertBefore('#tp26_overview');

                var title = bundles.find('.increasingly_element.col-increasingly-catalog .title').attr('id', 'tp26_title');
                title.text('Available Bundles');

                title.prepend('<div class="tp26-tabbundleicon"><img src="data:image/png;base64,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"/></div>');


                var bundleTabs = $('.tab-content.content').find('.product-bundle.tab-pane');

                bundleTabs.each(function () {

                    $(this).find('.social_validation').insertAfter($(this).find('.bundles-price-info'));

                    $(this).find('.social_validation .social_prominance_img').attr('src', 'data:image/png;base64,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');

                    $(this).find('.products-view-right h3').addClass('tp26-bundlePrice').insertBefore($(this).find('.products-view-right'));

                });
                   


                $('<div class="tp26-bundlesLink"><img src="data:image/png;base64,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"/><a href="#tp26_title">View Bundles</a></div>').appendTo('.tpInfoWrapper .tp_prodPrice');

                $('.tp26-bundlesLink').on('click', function (e) {
                    e.preventDefault();
                    var thisTarget = $(this).find('a').attr('href');
                    var targetOffset = $(thisTarget).offset().top;

                    $('body,html').animate({
                        scrollTop: targetOffset
                    }, 600);
                });


            }, pollerOpts);

          
          
          if($('#addToCartButton').val() === 'Not eligible for Delivery'){
             $('.tp26-cost').hide();
          }
        

            /*Read More Scroll*/
            $('.tp26-moreLink').on('click', function (e) {
                e.preventDefault();
                var thisTarget = $(this).find('a').attr('href');
                var targetOffset = $(thisTarget).offset().top;

                $('body,html').animate({
                    scrollTop: targetOffset
                }, 600);
            });
          
          
          /*DELIVERY MESSAGING*/


            var deliveryMessage = {
                freeDeliv: {
                    heading: 'Free UK Delivery on this product',
                    smallText: 'All our products can be delivered safely and securely to your chosen destination from one of our many branches nationwide'
                },
                over50: {
                    heading: 'Free Delivery over £30',
                    smallText: "For all orders over £30 we offer free delivery as standard. Any orders under £30 are charged a standard £5 fee. If you don't want to pay for delivery, you can always collect from store.",
                },
                bulkdelivery: {
                    heading: 'Only £5 Delivery Charge on Bulk Items <span> - Cheaper than our competitors!</span>',
                    smallText: 'We deliver our bulk products on one of our 680 crane lorries, meaning we can deliver your products safer & to more convenient locations',
                }
            }

            var expObj;
            var bulkItem = $('.yCmsContentSlot.BigAndBulkyProductIcon');

            var priceincVatno = priceincVAT.text().replace('£', ''),
                priceincVatnumber = parseInt(priceincVatno);
                //basketPrice = $('.cart_popup .total_price p:last').text().trim().replace('£', ''),
                //basketTotal = parseInt(basketPrice);

            var bulkItemevent,
                 freedeliveryevent,
                 getfreedeliveryevent;
          
          
          
          
             if (bulkItem.length > 0 && priceincVatnumber > 30) {
                expObj = deliveryMessage.bulkdelivery;
                if(!bulkItemevent){
                  window.ga(trackerName + '.send', 'event','TP026 - Travis Perkins - Product Page V2 Mobile', 'Bulk Delivery Message', 'TP026 User shown bulk delivery message', {nonInteraction:true});
                  bulkItemevent = true;
                }
              
            } else if (priceincVatnumber > 50) {
                expObj = deliveryMessage.freeDeliv;
              
              if(!freedeliveryevent){
                window.ga(trackerName + '.send', 'event', 'TP026 - Travis Perkins - Product Page V2 Mobile','Free Delivery Message', 'TP026 User shown free delivery message', {nonInteraction:true});
                 freedeliveryevent = true;
              }
              
            } else if (priceincVatnumber < 50) {
                expObj = deliveryMessage.over50;
               if(!getfreedeliveryevent){
                window.ga(trackerName + '.send', 'event', 'TP026 - Travis Perkins - Product Page v2','Free Delivery over 50 Message', 'TP026 User shown free delivery over 50 message', {nonInteraction:true});
                    getfreedeliveryevent = true;
               }
              
            } else if (bulkItem.length > 0) {
              expObj = deliveryMessage.bulkdelivery;
              if(!bulkItemevent){
                window.ga(trackerName + '.send', 'event','TP026 - Travis Perkins - Product Page V2 Mobile', 'Bulk Delivery Message', 'TP026 User shown bulk delivery message', {nonInteraction:true});
                bulkItemevent = true;
              }
            }

          if(expObj) {
            var deliveryBox = $([
                '<div class="tp026-deliveryMessage">',
                '<img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCIgdmlld0JveD0iMCAwIDYxMiA2MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDYxMiA2MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMjI2Ljc2NCwzNzUuMzVjLTI4LjI0OSwwLTUxLjA3OCwyMi45MS01MS4wNzgsNTEuMTZjMCwyOC4xNjYsMjIuODI5LDUxLjA3OCw1MS4wNzgsNTEuMDc4czUxLjA3OC0yMi45MTIsNTEuMDc4LTUxLjA3OCAgICBDMjc3Ljg0MSwzOTguMjYsMjU1LjAxMywzNzUuMzUsMjI2Ljc2NCwzNzUuMzV6IE0yMjYuNzY0LDQ1Mi4wNDljLTE0LjEyNSwwLTI1LjU0LTExLjQ5OC0yNS41NC0yNS41NDEgICAgYzAtMTQuMTIzLDExLjQxNS0yNS41MzksMjUuNTQtMjUuNTM5YzE0LjEyNCwwLDI1LjUzOSwxMS40MTYsMjUuNTM5LDI1LjUzOUMyNTIuMzAyLDQ0MC41NTEsMjQwLjg4OCw0NTIuMDQ5LDIyNi43NjQsNDUyLjA0OXogICAgIE02MTIsMzM3LjU2MXY1NC41NDFjMCwxMy42MDUtMTEuMDI5LDI0LjYzNS0yNC42MzYsMjQuNjM1aC0yNi4zNmMtNC43NjMtMzIuNjg0LTMyLjkyOS01Ny44MTItNjYuOTI3LTU3LjgxMiAgICBjLTMzLjkxNCwwLTYyLjA4MiwyNS4xMjktNjYuODQ1LDU3LjgxMkgyOTMuNjI1Yy00Ljc2My0zMi42ODQtMzIuOTMtNTcuODEyLTY2Ljg0NS01Ny44MTJjLTMzLjkxNSwwLTYyLjA4MiwyNS4xMjktNjYuODQ0LDU3LjgxMiAgICBoLTMzLjAxMmMtMTMuNjA2LDAtMjQuNjM1LTExLjAyOS0yNC42MzUtMjQuNjM1di01NC41NDFINjEyTDYxMiwzMzcuNTYxeiBNNDk0LjE0MywzNzUuMzVjLTI4LjI0OSwwLTUxLjE2LDIyLjkxLTUxLjE2LDUxLjE2ICAgIGMwLDI4LjE2NiwyMi45MTIsNTEuMDc4LDUxLjE2LDUxLjA3OGMyOC4xNjYsMCw1MS4wNzctMjIuOTEyLDUxLjA3Ny01MS4wNzhDNTQ1LjIyLDM5OC4yNiw1MjIuMzA5LDM3NS4zNSw0OTQuMTQzLDM3NS4zNXogICAgIE00OTQuMTQzLDQ1Mi4wNDljLTE0LjEyNSwwLTI1LjUzOS0xMS40OTgtMjUuNTM5LTI1LjU0MWMwLTE0LjEyMywxMS40MTQtMjUuNTM5LDI1LjUzOS0yNS41MzkgICAgYzE0LjA0MiwwLDI1LjUzOSwxMS40MTYsMjUuNTM5LDI1LjUzOUM1MTkuNjgyLDQ0MC41NTEsNTA4LjE4NSw0NTIuMDQ5LDQ5NC4xNDMsNDUyLjA0OXogTTYwMi4yOTMsMjgyLjYzN2wtOTYuODE3LTk1Ljc1MSAgICBjLTYuMTU5LTYuMDc3LTE0LjQ1My05LjUyNi0yMy4wNzYtOS41MjZoLTQ4Ljg2di0xOC4zMTNjMC0xMy42MzEtMTEuMDA0LTI0LjYzNS0yNC42MzUtMjQuNjM1SDEyNi45MDcgICAgYy0xMy41NSwwLTI0LjYzNSwxMS4wMDUtMjQuNjM1LDI0LjYzNXYzLjg2TDIuMywxNzQuNDI5bDE3Ny4xNDYsMjMuMDY4TDAsMjE1LjMyM2wxNzguODE0LDI1LjQyM0wwLDI1Ni4yNWwxMDIuMjc4LDE5LjI5ICAgIGwtMC4wMDcsNDguNDAzaDUwOS43MTJ2LTE3Ljk4NUM2MTEuOTgzLDI5Ny4xNzEsNjA4LjQ1MiwyODguNzk2LDYwMi4yOTMsMjgyLjYzN3ogTTU2MC4wODQsMjg1LjgzOWgtOTMuNjk3ICAgIGMtMi4xMzUsMC0zLjg2LTEuNzI0LTMuODYtMy44NTl2LTcyLjM0N2MwLTIuMTM1LDEuNzI1LTMuODYsMy44Ni0zLjg2aDE3LjgyYzAuOTg1LDAsMS45NzEsMC40MTEsMi43MSwxLjA2OGw3NS43OTYsNzIuMzQ3ICAgIEM1NjUuMjU3LDI4MS41NjksNTYzLjUzMiwyODUuODM5LDU2MC4wODQsMjg1LjgzOXoiIGZpbGw9IiMwMjQ5MzIiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />',
                '<h3 class="tp026Deliveryheading">' + expObj.heading + '</h3>',
                '<p>' + expObj.smallText + '</p>',
                '</div>'
            ].join(''));
            deliveryBox.insertAfter('.tp_prodQuoteProcess #addToCartForm');
          }

            // -----------------------------------------------------
            // RUN TP037 NOW THAT WE'RE DONE...
            // -----------------------------------------------------
            TP037();
        }
    })();
}
