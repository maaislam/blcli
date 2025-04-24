var UC070 = (function ($) {
    var UC = {

        now: Date.now || function () {
            return new Date().getTime();
        },

        poller: function (elements, cb, options) {
            var defaults = {
                wait: 50,
                multiplier: 1.1,
                timeout: null
            };

            if (!options) options = defaults;

            var timeout = options.timeout ? new Date(UC.now() + options.timeout) : defaults.timeout;
            var wait = options.wait ? options.wait : defaults.wait;
            var multiplier = options.multiplier ? options.multiplier === 'disable' ? 0 : options.multiplier : defaults.multiplier;
            var successful = [];
            var time;
            var pollForElement = function (selector, time) {
                if (timeout && UC.now() > timeout) {
                    return false;
                }
                time = time || wait;
                var condition = typeof selector === 'function' ? selector() : window.jQuery(selector).length > 0;

                if (condition) {
                    successful.push(true);
                    if (successful.length === elements.length) cb();
                } else {
                    setTimeout(function () {
                        pollForElement(selector, time * multiplier);
                    }, time);
                }
            };

            for (var i = 0; i < elements.length; i++) {
                pollForElement(elements[i]);
            }
        }
    };

    UC.poller([
    '.brand-grid.grid-section-products.row',
    function () {
            if (window.jQuery) return true;
        }
    ], run, {
        timeout: 6000,
        multiplier: 'disable'
    });

    function run() {

        $('body').addClass('UC070');


        var brand,
            image,
            productsSold,
            topImagetext,
            tab1,
            tab2,
            underImagetext;

    ///=======ADD ALL PRODUCT CONTENT HERE========///   

        if (/http.\/\/.*(\/)(clarisonic).*/.test(document.URL)) {
            image = '//cdn.optimizely.com/img/3320600494/17620e01f68949d3bb4d793550659d0e.png';
            brand = 'Clarisonic';
            productsSold = '500,000 ';
            topImagetext = ' devices are clinically proven to lift and tone the face';
            tab1 = 'Devices';
            tab2 = 'Accessories';
            underImagetext = 'Lorem ipsum dolor sit amet, ut homero docendi vel, harum nostrum corrumpit ut mea. Cu vis maiorum appetere. Nam eu elitr zril nostrum, ex has aliquam verterem. Te vim wisi nonumy ceteros, vitae semper omnesque et cum.';



        } else if (/http.\/\/.*(\/)(nuface).*/.test(document.URL)) {
            brand = 'nuFace';
            image = '//cdn.optimizely.com/img/3320600494/f54031fde0814b12b1f521c20b0ab82d.png';
            productsSold = '500,000 ';
            topImagetext = ' devices are clinically proven to lift and tone the face';
            tab1 = 'Devices';
            tab2 = 'Accessories';
            underImagetext = 'Lorem ipsum dolor sit amet, ut homero docendi vel, harum nostrum corrumpit ut mea. Cu vis maiorum appetere. Nam eu elitr zril nostrum, ex has aliquam verterem. Te vim wisi nonumy ceteros, vitae semper omnesque et cum.';

        } else if (/http.\/\/.*(\/)(tria).$/.test(document.URL)) {
            brand = 'nuFace';
            image = '//cdn.optimizely.com/img/3320600494/17620e01f68949d3bb4d793550659d0e.png';
            productsSold = '500,000 ';
            topImagetext = ' devices are clinically proven to lift and tone the face';
            tab1 = 'Devices';
            tab2 = 'Accessories';
            underImagetext = 'Lorem ipsum dolor sit amet, ut homero docendi vel, harum nostrum corrumpit ut mea. Cu vis maiorum appetere. Nam eu elitr zril nostrum, ex has aliquam verterem. Te vim wisi nonumy ceteros, vitae semper omnesque et cum.';
        } else if (/http.\/\/.*(\/)(foreo).$/.test(document.URL)) {
            brand = 'nuFace';
            image = '//cdn.optimizely.com/img/3320600494/17620e01f68949d3bb4d793550659d0e.png';
            productsSold = '500,000 ';
            topImagetext = ' devices are clinically proven to lift and tone the face';
            tab1 = 'Devices';
            tab2 = 'Accessories';
            underImagetext = 'Lorem ipsum dolor sit amet, ut homero docendi vel, harum nostrum corrumpit ut mea. Cu vis maiorum appetere. Nam eu elitr zril nostrum, ex has aliquam verterem. Te vim wisi nonumy ceteros, vitae semper omnesque et cum.';
        } else if (/http.\/\/.*(\/)(silk_n).$/.test(document.URL)) {
            brand = 'nuFace';
            image = '//cdn.optimizely.com/img/3320600494/17620e01f68949d3bb4d793550659d0e.png';
            productsSold = '500,000 ';
            topImagetext = ' devices are clinically proven to lift and tone the face';
            tab1 = 'Devices';
            tab2 = 'Accessories';
            underImagetext = 'Lorem ipsum dolor sit amet, ut homero docendi vel, harum nostrum corrumpit ut mea. Cu vis maiorum appetere. Nam eu elitr zril nostrum, ex has aliquam verterem. Te vim wisi nonumy ceteros, vitae semper omnesque et cum.';
        } else if (/http.\/\/.*(\/)(talika).$/.test(document.URL)) {
            brand = 'nuFace';
            image = '//cdn.optimizely.com/img/3320600494/17620e01f68949d3bb4d793550659d0e.png';
            productsSold = '500,000 ';
            topImagetext = ' devices are clinically proven to lift and tone the face';
            tab1 = 'Devices';
            tab2 = 'Accessories';
            underImagetext = 'Lorem ipsum dolor sit amet, ut homero docendi vel, harum nostrum corrumpit ut mea. Cu vis maiorum appetere. Nam eu elitr zril nostrum, ex has aliquam verterem. Te vim wisi nonumy ceteros, vitae semper omnesque et cum.';
        } else if (/http.\/\/.*(\/)(berurer).$/.test(document.URL)) {

            brand = 'clarisonic';
        } else if (/http.\/\/.*(\/)(iluminage).$/.test(document.URL)) {

            brand = 'clarisonic';
        } else if (/http.\/\/.*(\/)(smoothskin).$/.test(document.URL)) {
            brand = 'clarisonic';
        }

        
         var $product = $('.grid-section-products li');

        ///=======ADD ALL PRODUCT DESCRIPTIONS/LABELS HERE========///        
        function getProductDesc(productName) {
            switch (productName) {
            case 'Clarisonic Mia Fit Facial Cleanser':

                return {
                    description: 'description1',
                    label: 'label1'
                };

                break;

            case 'Clarisonic Brush Heads':
                return {
                    description: 'description1',
                    label: 'label1'
                };

                break;

            case 'Clarisonic Aria Facial Cleanser':
                return {
                    description: 'description1',
                    label: 'label1'
                };

                break;
            case 'Clarisonic Aria Facial Cleanser':
                return {
                    description: 'description1',
                    label: 'label1'
                };

                break;

            case 'Clarisonic Aria Facial Cleanser':
                return {
                    description: 'description1',
                    label: 'label1'
                };

                break;

            case 'Clarisonic Aria Facial Cleanser':
                return {
                    description: 'description1',
                    label: 'label1'
                };

                break;

            case 'Clarisonic Aria Facial Cleanser':
                return {
                    description: 'description1',
                    label: 'label1'
                };

                break;
            }
        }

        ///=====End of products=====///

        $product.each(function () {
            var name = $(this).find('h3 a').text().trim();
            var productInfo = getProductDesc(name);


            var link = $(this).find('h3 a').attr('href');
            var productButton = $('<div class="uc7-button"><a href="' + link + '">More Info</a></div>');
            $(this).find('.price-box').after(productButton);


            if (productInfo) {
                if (productInfo.description) {

                    var descwrap = $('<div class="uc7-desc">' + productInfo.description + '</div>');

                    var productButton = $('<div class="uc7-button"><a href="' + link + '">More Info</a></div>');

                    $(this).find('h3').after(descwrap);

                    if (productInfo.label) {
                        var prodlabel = $('<div class="uc7_label"><span>' + productInfo.label + '</span></div>');
                        $(this).find('.product-image').before(prodlabel);


                    }
                }
            }

        });


        var originalBrand = $('.brand-two-col-description.row'),
            productsContainer = $('.brand-grid.grid-section-products.row');

        //------top header markup------//    
        var markupHtml = $(['<div class="uc070_wrap clearfix">',
                        '<div class="uc070_toprow col-xs-12">',
                            '<div class="uc070_brandImage col-md-8">',
                             '<img src="' + image + '"/>',
                                '<div class="uc70_title">',
                                    '<h3>' + brand + ' Devices & Accessories</h3>',
                                    '<p>' + brand + topImagetext + '</p>',
                                '</div>',
                            '</div>',
                            '<div class="uc070_brandPoints col-xs-12 col-md-4"></div>',
                        '</div>',
                        '<div class="uc070_underImagetext col-xs-12">' + underImagetext + '</div>',
                    '</div>'].join(''));

        originalBrand.hide();
        markupHtml.insertBefore(productsContainer);

        //------usp points------//    

        var brandPoints = [
    ['http://www.currentbody.com/skin/frontend/bootstrap/currentbody/images/official.png', 'Official <span>' + brand + '</span> retailer'],
    ['http://www.currentbody.com/skin/frontend/bootstrap/currentbody/images/overX.png', 'Over ' + productsSold + brand + ' products sold worldwide']
];
        $.each(brandPoints, function () {
            var icon = this[0],
                text = this[1];

            $([
        '<div class="uc70_usp">',
            '<img src="' + icon + '"/>',
            '<div class="uc70_pointtext">' + text + '</div>',
        '</div>'
      ].join('')).appendTo('.uc070_brandPoints');

        });


        //*------Tabs------ *//  
        var firstTabcontainer = $('.brand-grid.grid-section-products.row'),
            secondTabcontainer = $('.grid-section-products.row:last');

        firstTabcontainer.addClass('col-md-6 clearfix col-sm-6').find('li').addClass('col-md-12 col-sm-12 col-xs-12').removeClass('col-md-3 col-sm-6 col-xs-6');

        secondTabcontainer.addClass('uc7bottom-products col-md-6 col-sm-6 clearfix').find('li').addClass('col-md-12 col-sm-12 col-xs-12').removeClass('col-md-3 col-sm-6 col-xs-6');



        $('<div class="uc7_tab first">' + tab1 + '</div>').prependTo(firstTabcontainer);
        $('<div class="uc7_tab second">' + tab2 + '</div>').prependTo(secondTabcontainer);


       
        /*Filter*/

        var filter = $('.brand-grid .header.col-md-12');
        filter.insertBefore('.brand-grid');

        $('.sort-by label').remove();
        $('<p>Sort By:</p>').insertBefore('.toolbar-sorting-box');


    }

})(window.jQuery);