// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib'; 
import * as utils from '../../../../lib/utils';
import * as html from '../html/html.js';

let _PD008 = (function() {

    /*--------------------------------------
    Experiment Code
    ---------------------------------------*/
    let _activate = function() {

        var $ = window.jQuery;
        // Namespace CSS
        $('body').addClass('PD008');

        let $bannerContent = $('.catBanner');
        let $productDetailWrapper = $('#productDetailUpdateable');
        let $mainImgHolder = $productDetailWrapper.find('.mainImageHolder');
        let $mainContentHolder = $productDetailWrapper.find(' > .span-9:eq(1)');
        let $lastContentHolder = $productDetailWrapper.find(' > .span-6.last');

        // Namespace some more
        $mainImgHolder.addClass('PD008_mainImgHolder');
        $mainContentHolder.addClass('PD008_mainContentHolder');
        $lastContentHolder.addClass('PD008_lastContentHolder');

        $bannerContent.find(' > p > img:first').css('top', '-20px');
        // Hide the red banner at the top (with the product name)
        $bannerContent.find(' > h2:first').hide();
        // Hide producer name
        $mainContentHolder.find(' > .prod > h3:first > a:first').hide();

        // Buynow wrapper
        $('.prod.buynow').addClass('PD008_prodBuynow_Wrapper').insertAfter($productDetailWrapper.find('.prod:first > p:first'));
        // Cache it
        let $buynowWrapper = $('.PD008_prodBuynow_Wrapper');
        let $ctaStuffWrapper = $buynowWrapper.find('.prod_add_to_cart');
        let $addToCartForm = $ctaStuffWrapper.find('#addToCartForm');
        $('a[href="/Terms-And-Conditions"]').hide();

        // Insert product code after the 'product name' header
        $mainContentHolder.find(' > .prod > h3:first').after($mainContentHolder.find(' > .prod > p.code'));

        // Show the logo in the last coloumn
        $('.prod_review.brandlogo_datasheets').prependTo('.PD008_lastContentHolder');

        // variant-quant_disc (on some pages with disc - need to consider)

        // Cache the select (#variant) which will be hidden and replaced with a styled dropdown select
        // The select contains server side info (in the 'value' attr)
        let $variantWrapper = $buynowWrapper.find('.variant_options');
        // Will extract text from here/and relevant info from the 'value' attr
        let $selectVariant = $variantWrapper.find('select#variant'); // will hide
        $selectVariant.hide();

        $variantWrapper.before(html.htmlSelect);
        // Cache custom select
        let $customMainSelect = $('.PD008_selectMain');
        let $customOptions = $('.PD008_selectOptionsWrapper');

        // Loop through the original select and get the relevant info
        // Text and backend stuff
        // Insert the text into the custom select

        $selectVariant.find('option').each(function () {

            let valueCode = this.value;
            let valueCodeSubstring = valueCode.substring(valueCode.indexOf(';'), valueCode.length);
            valueCode = valueCode.replace('code=', '').replace(valueCodeSubstring, '');

            $('<div class="PD008_selectOption" data-valuecode="' + valueCode +'">' + this.textContent.trim() + '</div>').appendTo($customOptions);
        });

        // Insert 'buying guide' links, etc. after the buynow wrapper
        $('.prod_review.brandlogo_datasheets label').addClass('PD008_linksBottom').insertAfter('.PD008_prodBuynow_Wrapper');
        $('.PD008_linksBottom a').append(' >');

        // Small css change
        $('.PD008_selectOption:last').addClass('PD008_selectOptionLast');

        // Style
        $mainContentHolder.find(' > .prod > h3:first > label').css({
            'text-decoration': 'none',
            'color': 'black',
            'font-weight': '700',
            'width': '360px'
        });

        $mainContentHolder.find(' > .prod > p.code').css('color', 'black');
        $mainContentHolder.find(' > .prod > p.code').next().css('color', 'black');

        // Set first product selected by default (as on the original)
        $customMainSelect.find(' > .PD008_selectMainContent').text($('.PD008_selectOption:first').text());

        // Reformat CTA section
        $addToCartForm.find('.qty > label').text('Qty');
        // Hide +/- qty buttons
        $addToCartForm.find('.qty > a').hide();
        // If 'branding' div empty just hide it
        $addToCartForm.find('.branding').text().trim() === "" ? $addToCartForm.find('.branding').hide() : "";

        $('#freeDelivery-RT45').is(':empty') ? $('#freeDelivery-RT45').hide() : '';

        // Evt listner for the custom select
        $customMainSelect.on('click', () => {
            $customOptions.slideToggle(500);
            $('.PD008_arrowDown').toggleClass('PD008_arrowSwitch');

            $customOptions.on('click', '.PD008_selectOption', function () {
                $customOptions.slideUp(350);
                $('.PD008_arrowDown').removeClass('PD008_arrowSwitch');
                $customMainSelect.find(' > .PD008_selectMainContent').text(this.textContent);

                // Update the hidden input
                $addToCartForm.find(' > input').val($(this).data('valuecode'));

            }); // $customOptions (onclick)
        }); // $customMainSelect (onclick)

        let imagesHtml = ``;
        // Grab all the images and turm them into thumbnails
        $('#carousel_alternate > li.jcarousel-item > span.thumb > img').each(function () {
            imagesHtml += `<img class="PD008_this_thumbnail" src="${$(this).prop('src')}" alt="${$(this).prop('alt')}">`
        });

        // Place thumbnails underneath main image (if there's more than the original to show)
        $('.mainImageHolder > .span-5:first')
            .append(`<div class="span-5 PD008_thumbnails">
                        ${imagesHtml}
                    </div>`);

        // Show the user the thumb image that was clicked on
        $('.PD008_this_thumbnail').on('click', function () {
            var imgSrc = $(this).attr('src');
            var MainImage = $('#primary_image').find('img');

            MainImage.attr('src',imgSrc);
        });

        utils.events.send('PD008', 'Page View', 'PD008 - Product Page Update', true);

    };

    /*--------------------------------------
    Activation
    ---------------------------------------*/
    let _triggers = function _triggers(options) {
        UC.poller([
            'body',
            '.catBanner',
            '#productDetailUpdateable',
            '.prod.buynow',
            'a[href="/Terms-And-Conditions"]',
            function () {
                return window.jQuery
            },
            function () {
                return window.ga
            }
        ], _activate);

        utils.fullStory('PD008', 'Variation 1 Desktop');
    };

    // Run experiment
    _triggers();

})(); // _PD008