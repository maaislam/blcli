// ----------------------------------------------------
// Test has 2 variations
// Both variations in this codebase to maintain one codebase
//
// This test runs after TP002 has ran...
// Below tp2 code brought in, run tp36 once tp02 ends
// ----------------------------------------------------

// TP036, called once TP002 has finished (below)
var TP036 = function() {
    // Set variation
    var VARIATION = 1;

    // UC library poller
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    // Helper send events
    var trackerName;
    function sendEvent(action, label, dimensionValue, dimensionName) {

        var category = 'TP036---Desktop-Landscaping-Per-m';
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
         experiment_str: 'SO006',
         variation_str: 'Variation 1'
     });
    }, { multiplier: 1.2, timeout: 0 });

    // Setup
    if(jQuery('body').hasClass('tp036')) {
        return;
    }
    document.body.classList.add('tp036');
    if(VARIATION == 2) {
        document.body.classList.add('tp036--v2');
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

        $('#tab-techspecs tr').each(function() {
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
        // - Breadcrumb contains 'Decking'
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

        if(breadcrumbSegmentExists('Decking') && width && length) {
            var sqm = calculateSquareMetres(width, length);

            var priceExVatText = [
                '<span class="tp36-price-text tp36-price-text--ex-vat">',
                    '<strong>£' + (priceExVat / sqm).toFixed(2) + '</strong>',
                    'per m<sup>2</sup> ',
                    '(Ex VAT)',
                '</span>'
            ].join('');

            var priceIncVatText = [
                '<span class="tp36-price-text tp36-price-text--inc-vat">',
                    '<strong>£' + (priceIncVat / sqm).toFixed(2) + '</strong> ',
                    'per m<sup>2</sup> ',
                    '(Inc VAT)',
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
                width *= techAttributes['Pack Quantity'];
                length *= techAttributes['Pack Quantity'];

                sendEvent('pavingslabs-pack');
            } else {
                sendEvent('pavingslabs-non-pack');
            }

            var sqm = calculateSquareMetres(width, length);

            var priceExVatText = [
                '<span class="tp36-price-text tp36-price-text--ex-vat">',
                    '<strong>£' + (priceExVat / sqm).toFixed(2) + '</strong>',
                    'per m<sup>2</sup> ',
                    '(Ex VAT)',
                '</span>'
            ].join('');

            var priceIncVatText = [
                '<span class="tp36-price-text tp36-price-text--inc-vat">',
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
                '<span class="tp36-price-text tp36-price-text--ex-vat">',
                    '<strong>£' + (priceExVat / size).toFixed(3) + '</strong>',
                    'per litre</sup> ',
                    '(Ex VAT)',
                '</span>'
            ].join('');

            var priceIncVatText = [
                '<span class="tp36-price-text tp36-price-text--inc-vat">',
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
            $('.tpInfoWrapper .productPrice').wrap('<div class="tp36-price-wrapper">');

            if(priceIncVatText) {
                if(VARIATION == 1) {
                    $('.tp36-price-wrapper .productPrice .price_inc_vat_section').append(priceIncVatText);
                } else if(VARIATION == 2) {
                    $('.tp36-price-wrapper .productPrice .price_inc_vat_section').prepend(priceIncVatText);
                }
            }
            if(priceExVatText) {
                if(VARIATION == 1) {
                    $('.tp36-price-wrapper .productPrice .product_price_section').append(priceExVatText);
                } else if(VARIATION == 2) {
                    $('.tp36-price-wrapper .productPrice .product_price_section').prepend(priceExVatText);
                }
            }

            if(attribute1 || attribute2) {
                var attributesContainer = $('<div class="tp36-attributes-container">');

                if(attribute1) {
                    var elm = $([
                        '<span class="tp36-attribute">',
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
                        '<span class="tp36-attribute">',
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
                $('.tp36-price-wrapper').append(attributesContainer);

                // Toggle
                $('.tp2-toggle').insertAfter(attributesContainer);

                // Additional UI amends
                if(VARIATION == 2) {
                    $('.price_inc_vat_section .includedVAT, .price_inc_vat_section .price_info_holder').wrapAll(
                        '<div class="tp36-price-inner-wrapper"></div>'
                    );
                    $('.product_price_section .price_value, .product_price_section .price_info_holder').wrapAll(
                        '<div class="tp36-price-inner-wrapper"></div>'
                    );

                    var priceUom = $('.prices_holder .price_info_holder.uom_value .price_UOM');
                    priceUom.appendTo('.prices_holder .tp36-price-inner-wrapper');
                }
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
            $('#breadcrumb li a').each(function() {
                var thisText = $(this).text().trim();
                if(thisText === text) {
                    exists = true;
                    return true;
                }
            });
            return exists;
        }
        
    });

};

(function() {
    if (!document.querySelector) return false;
    
    /**
     * UC Library - Poller
     * @version 0.2.2
     */
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:1.1,timeout:0},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
  
    // Triggers
    UC.poller([
        function () {
            if (window.jQuery) return true;
        },
        '#s7ProductDetailsImage_container',
        '#breadcrumb',
        '#content .tpProductInfo',
        '.tpActionWrapper',
        '#tpPdpRightPanelComponent .tpInfoWrapper .product_price_section',
        '.ccButton',
        '.add_to_cart_form',
        '#addToCartForm',
        '.tab_strip.ui-tabs-nav.ui-helper-reset #tab_01 h2',
        '#tab-overview',
        '#tab-techspecs',
        function () {
            if (window.ga) return true;
        }
    ], TP002, {
        timeout: 8000,
        multiplier: 0
    });

    // Variation
    function TP002() {
        var $ = window.jQuery;
      
      if($('body').hasClass('TP002')) {
        // Call tp036
        TP036();

        // Prevent running twice
        return;
      }
      
        var $loader = $('<div id="UC_page-overlay"><div class="UC_loading-dots"><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span></div></div>');
        $('body').prepend($loader);
        
        setTimeout(function() {
          $loader.hide();
        }, 6000);

        $('body').addClass('TP002');
      
        // Full Story Integration
        /*
        UC.poller([
          function() {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
          }
        ], function () {
          window.FS.setUserVars({
            experiment_str: 'TP002',
            variation_str: 'Variation 1 Desktop'
          });
        }, { multiplier: 1.2, timeout: 0 });
        */

        var breadCrumbs = $('#breadcrumb'),
            productDesc = $('#content .tpProductInfo'),
            topLinks = $('<div class="tp2-topLinks"/>'),
            quoteList = $('.tpActionWrapper:last'),
            custLogin = $('.tpInfoWrapper .yCmsComponent'),
            productPrice = $('#tpPdpRightPanelComponent .tpInfoWrapper:first'),
            priceexVAT = productPrice.find('.product_price_section'),
            priceincVAT = productPrice.find('.price_inc_vat_section');

        /*Top level links*/
        productDesc.prepend(topLinks);
        topLinks.prepend(quoteList);
        topLinks.append(custLogin);
      
      
     var loggedIn = $('.nav .yCmsComponent .button_text .sessioncamhidetext');

      if (!loggedIn.length > 0){

        $('.tpInfoWrapper .product_price_section').removeClass('tp2-loggedIn');
        /*Price Toggle*/
        var toggle = $('<div class="tp2-toggle"><label class="toggle"><span class="ex-vat">ex VAT</span><input id="tp2-togglecheckbox" type="checkbox"><div class="slide-toggle"></div><span>inc VAT</span></label></div>');
        productPrice.append(toggle);

      
        $('#tp2-togglecheckbox').prop('checked', true);

        $('#tp2-togglecheckbox').change(function () {
            if ($(this).is(':checked') == false) {
                priceexVAT.addClass('visible');
                priceincVAT.addClass('hidden');

            } else {
               priceexVAT.removeClass('visible');
               priceincVAT.removeClass('hidden');
             
            }
        });
      }else{
         $('.tpInfoWrapper .product_price_section').addClass('tp2-loggedIn');
      }

        /*product desc*/
        $('<div class="tp2-description"><ul class="tp2-list"></ul</div>').insertAfter(productPrice);

        $('.featureClass li:lt(3)').addClass('tp2-product-li').clone().prependTo('.tp2-list');

        var descLinks = $([
          '<div class="tp2-descLinks">',
            '<div class="tp2-moreLink">',
              '<a href="#tab_01">Read More</a>',
            '</div>',
          '</div>'
        ].join(''));

        descLinks.appendTo('.tp2-description');

        $('.tp2-descLinks a').on('click', function (e) {
            e.preventDefault();
            var thisTarget = $(this).attr('href');
            var targetOffset = $(thisTarget).offset().top;

            $('body').animate({
                scrollTop: targetOffset
            }, 600);
        });


        $('<p class="tpimageText">Hover over image to zoom</p>').appendTo('#s7ProductDetailsImage_container');
      
      

        /*Buttons*/
        $('#tpPdpRightPanelComponent .ccButton').insertAfter('.add_to_cart_form');

        $('<p class="tp2-cost"><strong>Tell us your delivery address</strong></p>').appendTo('#addToCartForm');
        $('#stockCheckerButton strong').text('Check stock at your local branch');
      
        if($('.change-postcode.cboxElement').is(':visible')){
        $('.tp2-cost').hide();
        }

        $('.tp2-cost').click(function () {
            $('#addToCartButton').click();
        });
      

        /*TABS*/
        var tabHeadings = $('#prod_tabs > .tab_strip.ui-tabs-nav.ui-helper-reset'),
            tabOverview = $('#tab-overview'),
            tabSpecs = $('#tab-techspecs');


        tabHeadings.find('#tab_01 h2').prepend('<div class="tp2-tabicon"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhBBoKIThy4lsXAAAD4UlEQVRo3t3Zf2iVVRgH8I+blBWC4pQwLAslK2tkf7RAy8wfOVAaJYstIpOalUYFVhQUmGFKmFREJKQg5c/IkGpDmH+MSCFWzYpCM4aYtI0mqMxG8+0Pb2O7u+s+9+5eF37PP/c953ue8z3P+5znfe77kg+utEunpE/r9Imr87KVFz7rt/i/7UeXXpjlJ+txyhzX9GnznJaYe2EEPC7RMKC3QaIud2Mjw8xSD3jQZZiEcwPGEzytCl22262n0Puu7ne/tw4Y39pvvDpqdkRYwKfu87Em8Je9OtLGyyxKBeEsNfaoipkd/BaMUmGGCb3X5Wjy/qD8Dpt7f9co90bvVZtmB5zNwduY6XCGg7Y8NHd5hpmHzczFAzPsN1K7Ju29fZUm5bCBY77o/T3eLFPsd7vm2OQRDkk0GNOvtz4nD9T36xmjQeJQpogryWBgqum61DqZw47/GyfV6jLd1JiAW9EyIMqHhg4tKctpyBQDY8mw+wTjTA4sNi7FTvfCecsBAZnR6F5rrAmzgyiJEm2yJXiWz9piU9Rs3AMnLbU0zA4j7oEi4aIWcIl3vDCcAt6zInuJUjwBT1km8Vw2WuQULLQ4a93Qap1zmKDOR466y0a8bk8+2tMfJj9lrIHT2y1gpcQJ87VJfN7Pv4M8zCIeqFMZ8MAhsM0TbtCAI2ozVI55CWhKFWIRdJit0U3OqIo9TQsfhG3u9q4FfojR46k4jnYr4+TiZsLRRg2ngJu1OjB8AsbaY6zfh0tAie2uczz7AzwiYEsgDbUaD+Y47hmsNV+3+/2RzXjkFFwV4JSlwq3MRG+pUI0VDmafGBGwwKSsmbDdGbBTuZdU44NYWRYRcE5rxFQKL/vbK76K5oJiBOGrys3WHSMXIxPSEqcWNxMuUzk8HjiPVdY7lu3lXfE8MM9avF0ID0xxT1bOUfvAKPPsd9q1tiu105v5aE8vyVpCJdmN4EmJb0z0vUSLK/pYGUJJttGSQEl2BOzT6TaHXa5TVSo5DdkDuWGGPyV6LEzrH8QDhQ/CZnMdVOfLGL0Yx7BZRZx8Uf85LfO1bdlIxcuEI+1SMZxF6QazdXm0EB541sNZ88CvHtKFadbbqNEjVuIx3+ajPT0PfBfKhNNAnUSX552V2NDP6hAy4UJ3ZuX85mewWaXF1qHRqshuIwJO2BH2XrcldlmsVXXsm0nhg7DbEsvcEX3VW4xj2O3DOPl/mQl7iiKsJGU5IOAXUoeqkJiWshzAaN0StQVdvlai2+iBA5mC8JTVXrPZ9fb2+WaUP8Zb5EWsdio6pdSOUPbLpe1QmpvuGvXaCrJ0m3o1gy3zD/cHtFfrzUnxAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTI2VDEwOjMzOjU2KzAyOjAwH4Za7wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0yNlQxMDozMzo1NiswMjowMG7b4lMAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC"/></div>');
        tabHeadings.find('#tab_02 h2').prepend('<div class="tp2-tabicon"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhBBoMAQdVjS46AAAEpUlEQVRo3s3Zy2tVVxQG8J/mYoKPJC2iNZCigoIT0ZKJbdRUHGakCE7tPyA4E8WgE5GKE6UgQtGpTivoIFa0ooiUooIgOFFji6KtQWpijKuDu+/tSc+5r6i9fmdyztrr8e2zX2vvTevosNcD8Z/ngb06ZuFtFjiUC155DrXubE7LFnP9qdsvfvRuhvQ7g8Z9NkP6UdAvhK05+VYh9Lden1ZRbue3OfnbTOkHIrDEgJ6c9MsG/+e/6DFgScvV1OWkECbsqcpKthtN3W0oZzGUSkZty/yHPSaEcFJXa+EvZPr2YSxzwOP0PeGiVTmbVS6mYOGR/Zbi+4yXC81TqIQ/Zb1LQrjujRBeOWunRTUtF9nprFdCmHRDCJesd6oVCpXwP5iD+S6nGow7qLupCnQ7aDxZXTYfc/zQLIWZ4WGBK147anErbWixo167YkH6bpJCPjwstLKl4BWstDDz1RSFUwXhPxwqFE7VUuhLxR8nfJlCuYp9xcVfC2H9RwsP64XwdZbTv+j1h04/G/Z3E67WWa1PH5544r7fmrCZ7yffmvSFv4oV9qShs6Cumw2Oe5hbih86bkNduwVpSO+pp1Seu67M6L9ZrHU+E/S5u+56npGct7aG5UJXqvNqXdwQXhcOvA7HTAthzAlbdFZLOm1xwpgQph0rXBNXei1cbxR+qUnhaEFJT5ojntltXqHtPLs9S2O9p6D8qPDGsvoE9gvjBbNejztCOFd1vcIOR4wadcQOK6p654Rwp4DCYuPCgXrhOzwSDhbILwjv7Evfw4WdcDiV7vNOuFDQEAeFx0q1CWwTXhUsOceESOF7nUkhp9x22mm3TSXJGb2JQgjHcn66vRK21yYwKpzNSdeaFs6BwdTVbhrMzOldBt1M3XMQnBOmC0bEWWE0H3iufsttFMLOXOl54Zke9BoTpowU/MaSEVPCmF70eCacz2ntFMImy/VX0sEOh7ystuRELt3YIITd4IwwZWPNP7jRlHAG7BYiNzUtqmZN4aVDOtg7oytdzDk9LoyZh2EhjKiHESEMY54x4XhO4+KMeHt5IFy11WabbS7I9R4KJ6pvN+v1YZTcFB6CE9W3LFYZMmTIVleFB4Swq6bDdULYghVCpC5WD4NCWIEtQlhXU3OXEOWOEDWVVoNrGMBbtxoSuOVt0r6W8VCEoPHOqA8vTCaX90w0JDDhXtKe9CJ5qINmCPxOcvlrw/CS1gDJ8j0JfHQ0IvCEtH7dwldN+fwqaZctn7w/gc91JpdrmtjbdFmTtDt93iyB2nnwffBNcllKbVsPA0pJ+5uMhyKkqG2fiNo+Fbd9MaKyHG9qz3KcRdsSkgq2tzslK3nc3qSUA+1Ny1nmTXs3Jlxv79bscHs3p23Ynn9SBxRtOaLJou2HVG0/pvsEDirbflSbp/C/H1ZnKfx7XH/DpFaP69+4blbH9VkK5ed7LLXfo2rW1OjC4rEDlqnMqy1fWJQp5K9sOmxr6spme2bBneWVTRnFl1Yb6xLYlJM3uLSqlxw89bRA+qgu6Xwa/rL+jrr1veF0DeKlTGkLKLVqYMy4biP6c1e3jBtr2d8s8EEvr2eDD3p9/w+WW1C9x1w+OQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wNC0yNlQxMjowMTowNyswMjowMAxaXEgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDQtMjZUMTI6MDE6MDcrMDI6MDB9B+T0AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="/></div>');
   
        // Make whole tabs clickable
        tabHeadings.children('li').click(function() {
            var $link = $(this).find('a');
            if ($link.length) {
              $link.trigger('click');
            }
        });
      
        $loader.hide();
      
        // Hide VAT toggle on 'Footwear' category
        var category = $('.tpBreadcrumb > li:not(".active"):last').text().trim().toLowerCase();
        if (category === 'footwear') {
            toggle.hide();
        }
      
        //$('#goodvidio-product-videos').insertAfter('#ProductDetail');
      
        /*Polling*/
        var pollerOpts = {
            timeout: 12000,
            multiplier: 0
        };
      
        /*Data sheets tab*/
        UC.poller(['#tab_03'], function () {
          tabHeadings.find('#tab_03 h2').prepend('<div class="tp2-tabicon"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhBBwUAydri8FkAAACv0lEQVRo3u2ZX4hMURjAfyM7ZtAwSLRPIu2DBy/ChqJNCrExa9unLUlT9sGfpN2whtqmxQPZ9WBlS+IBm5aiJQ8ij9oXElaUsvugbGsaMh5m3GbGnXu/c87dOfvgOy+375zzfb/zfd+55/4BmRwjZ9BGWVnJ8DQhgJks4AmrbAJAnCHq3TqmK5n5zD4N1zcAiPGIbTzVXUG+Bl5rzFxUVAsTbNaNwHseAp90+QsS5R67GSxWhSoOrmG+gatfjDkR+FLS85MmBiQm1hhtvN+0OQDlfSXu1YpQLiEuEKEbGCftaLeyQm7CLAL5drzM5jWdCGzgu/L6H7AYgBQROryH+gMM800ZIOtctTODI3oAo/SXGdOTw0RoI2doRVFGymqht6D3rYFm6gzcvuJuhZ5GkpUmlQPsMADIcYAeAFLECrp6Et6TgrwPhLhElHPAVUeX0QEY452y8zjLAThLlDMqE90A7tOqDLDTyf9pon57v1gm44GknfN2AeAgPR7nbBUAIMl+uwAwt7oAA4Sc9kZlYrWeiv8DTF0A77Oglz1CxB+knEM3MIAwe6kR2plDa/AAWZLsEkfgoo57vxT00adnVi7Wi9A6gHcKEjSKa+AyL4MGCHOdsNhSHWt1ALzWl+W2+Hk+wx0d934paKFFz2wwEaiKWAfwTkEnTeJdkOZm0ABhOhReXA4FD5DlBAlxBLp13PuloIsuPbNysV6E1gG8U7CR7eIa6Pf5jjqbIZaqAYQZZKZ4KetZ57PU1W5q77NAfr7leCYeK44AbGKhMAUZ329pGU4VrkpS5Xej+aq3LleATjf1lN4FMY6yTGjnLWnGgwZoVvnUwkeu/KN7XPln1V/xSsELRsTuP/DcRVvLPJMIDLNEIQKaMln/C/JykjgAE7YAbvkPsb4NrQO4paCWLUY2Z5kCNNBQvQhYT4F1gD+cQe0CJZXZSwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wNC0yOFQyMDowMzozOSswMjowMOqglvAAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDQtMjhUMjA6MDM6MzkrMDI6MDCb/S5MAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="/></div>');
        }, pollerOpts);
       
      
        //VIDEOS (from Addition of Goodvidio to product page - 100%)
        UC.poller(['#goodvidio-product-videos'], function () {
            if ($('#inc_frequently_bought').length) {
                $('#goodvidio-product-videos').insertAfter('#inc_frequently_bought');
            } else {
                $('#goodvidio-product-videos').insertAfter('#ProductDetail');
            }
        }, pollerOpts);
      
      
        //Bundles
        UC.poller(['#inc_frequently_bought .tab-content.content .product-bundle.tab-pane'], function () {
          
            var bundles = $('#inc_frequently_bought');
            bundles.insertAfter('#ProductDetail');

            var title = bundles.find('.increasingly_element.col-increasingly-catalog .title');
            title.text('Available Bundles');

            title.prepend('<div class="tp2-tabbundleicon"><img src="data:image/png;base64,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"/></div>');


            var bundleTabs = $('.tab-content.content').find('.product-bundle.tab-pane');

            bundleTabs.each(function () {

                $(this).find('.social_validation').insertAfter($(this).find('.bundles-price-info'));

                $(this).find('.social_validation .social_prominance_img').attr('src', 'data:image/png;base64,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');

                //$(this).find('.products-view-right h3').addClass('tp2-bundlePrice').insertBefore($(this).find('.products-view-right'));

            });

            $('<div class="tp2-bundlesLink"><a href="#inc_frequently_bought">View Bundles</a></div>').appendTo('.tp2-descLinks');
          
          
          
          
          
       }, pollerOpts);
      
      
      
      if($('#addToCartButton').val() === 'Not eligible for Delivery'){
        $('.tp2-cost').hide();
     }
      
      
        // -----------------------------------------------------
        // RUN TP036 NOW THAT WE'RE DONE
        // -----------------------------------------------------
        TP036();
    }
})();

