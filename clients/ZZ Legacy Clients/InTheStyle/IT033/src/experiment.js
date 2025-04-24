import UC from './lib/UC.js';
import * as helpers from './lib/helpers.js';
import * as utils from '../../../../lib/utils.js';

let _IT033 = (function () {

    // Full story tagging
    helpers.fullStory('IT033', 'Variation 1 Mobile');

    // Triggers ------------------------------------
    // ---------------------------------------------
    let _triggers = (function () {
        UC.poller([
            '#product-options-wrapper dd.swatch-attr',
            '#product-view-details > .accordion-navigation .content.std',
            'a[href="#pd-2"]',
            function () {
                return !!window.jQuery.fn.slick;
            },
            function () {
                return !!window.jQuery;
            },
            function () {
                return !!window.ga;
            }
        ], activate);
    })();

    // ---------------------------------------------
    function activate() {
        let $ = window.jQuery;
        let $body = $('body');

        $body.addClass('IT033');

        // Free returns cookie set elsewhere
        var freeReturnsEnabled = utils.getCookie('its_cookied_free_returns');

        // Add text under the 'size' with link to the 'return details' accordion tab
        $('#product-options-wrapper dd.swatch-attr.last')
            .append('<p class="IT033_returnsCTA">'
            + (freeReturnsEnabled ? 'FREE ' : '')
            + 'Easy Peasy Returns <a class="IT033_howEasy">How Easy?</a></p>'); //  href="#pd-2" -> bcs its=great

        // Cache 'return details' accordion tab
        let $returnDetailsTab = $('#product-view-details > .accordion-navigation:last');
        $returnDetailsTab.find('a[href="#pd-2"]').attr('aria-expanded', 'false');

        // Open accordion 'return' tab if not open -> when open anchor down to '#pd-2'
        $('.IT033_howEasy').on('click', function () {
                $returnDetailsTab.addClass('active');
                $returnDetailsTab.find('a[href="#pd-2"]').attr('aria-expanded', 'true');
                $returnDetailsTab.find('.content.std').addClass('active');
                
                let target = $('a[href="#pd-2"]');
                $('html, body').animate({
                        scrollTop:target.offset().top
                }, 1500);

                // Fix (wokraround) for anchoring down to #pd-2
                // window.scrollTo(0, $('a[href="#pd-2"]').offset().top);
        }); 

        // 'return' accordion content
        // First hide old content
        let $returnContent = $returnDetailsTab.find('.content.std');
        $returnContent.find(' > div:first').hide();

        // Create html for new content
        let contentHtml = [
            '<div class="IT033_contentWrapper">',
                '<h3 class="IT033_contentHeader">SHIPPING & RETURNS</h3>',
                '<p class="IT033_innerHeader">DELIVERY</p>',
                '<p class="IT033_innerContent">We currently offer worldwide delivery.</p>',
                '<p class="IT033_innerContent">The prices listed below are per order, not per item.</p>',
                '<p class="IT033_innerContent">All orders that contain pre order items will be shipped as a whole order when the pre ordered items are ready to be dispatched.</p>',
                '<p class="IT033_innerHeader">RETURNS</p>',
                // ------------------------------SLICK SLIDER----------------------------------------
                '<div class="IT033_swipe_Wrapper">',
                    // ---- SWIPE LEFT
                    '<div class="IT033_swipeLeftAbsoluteWrapper">',
                        '<div class="IT033_swipeLeftContainer">',
                            '<span class="IT033_swipeLeftMsgUnderIcon">SWIPE LEFT</span>',
                            '<img class="IT033_swipeLeftIconSVG" src="http://www.sitegainer.com/fu/up/3r1d6hi7cjc8pq1.png">',
                        '</div>',
                    '</div>',
                    // ---------------
                    '<div class="IT033_slideToSlide">',
                    '<div class="IT033_img_slideWrap">',
                        '<span class="IT033_slideStep">1</span>',
                        '<img src="http://www.sitegainer.com/fu/up/yh1rzghy7tqwix4.png" class="IT033_img_slide IT033_img_slide1">',
                    '</div>',
                    '<p class="IT033_slideDesc">PEEL & STICK THE PREPAID RETURNS LABEL TO YOUR PARCEL</p>',
                    '</div>',
                    '<div class="IT033_slideToSlide">',
                    '<div class="IT033_img_slideWrap">',
                        '<span class="IT033_slideStep">2</span>',
                        '<img src="http://www.sitegainer.com/fu/up/c4najy6xvtsa4qe.png" class="IT033_img_slide IT033_img_slide2">',
                    '</div>',
                    '<p class="IT033_slideDesc">TICK YOUR REASON FOR RETURNING THE ITEM(S)',
                    '</div>',
                    '<div class="IT033_slideToSlide">',
                    '<div class="IT033_img_slideWrap">',
                        '<span class="IT033_slideStep">3</span>',
                        '<img src="http://www.sitegainer.com/fu/up/vmh39whmc1k7fpp.png" class="IT033_img_slide IT033_img_slide3">',
                    '</div>',
                    '<p class="IT033_slideDesc">TAKE YOUR PARCEL TO YOUR LOCAL POST OFFICE</p>',
                    '</div>',
                '</div>',
                // ------------------------------------------------------------------------------------------------
                '<div class="IT033_redWrapper">',
                    (freeReturnsEnabled ? [
                       '<div class="IT033_whiteItem">',
                           '<div class="IT033_whiteItem_right">FREE returns. Absolutely and forever.</div>',     
                       '</div>'
                    ].join('') : ''),
                    '<div class="IT033_whiteItem">',
                        '<div class="IT033_whiteItem_right">Please return your item(s) within 14 days of receiving.</div>',
                    '</div>',
                    '<div class="IT033_whiteItem">',
                        '<div class="IT033_whiteItem_right">Ensure items are in their original conditions & with the tags.</div>',
                    '</div>',
                    '<div class="IT033_whiteItem">',
                        '<div class="IT033_whiteItem_right">Refunds are processed within 7 working days*.</div>',
                    '</div>',
                '</div>',
                '<span class="IT033_handling-fee">*minus the original delivery charge if applicable. ',
                freeReturnsEnabled ?
                  '' :
                  'We also charge a small handling fee of £2.50 which we will deduct from your refund</span>',
            '</div>'
        ].join(''); 

        // Add the content to the content of the accordion
        $returnContent.prepend(contentHtml);

        // Slick slider
        $('.IT033_swipe_Wrapper').slick({ slide: '.IT033_slideToSlide' });

        // Event for users opening the 'returns' accordion
        var openedAccordionEvent,
            returnsEvent;

        $('.IT033_howEasy').on('click', function () {
            if(!openedAccordionEvent){
                helpers.sendEvent('IT033', 'User clicked how easy link', 'IT033 - Returns Label - Product', true);
                openedAccordionEvent = true;
            }
        });

        // Hide 'swipe left' icon on (touchstart) - when user wants to start sliding
        $('.IT033_slideToSlide, .IT033_swipeLeftContainer').on('touchstart mousedown', function () {
            $('.IT033_swipeLeftContainer').fadeOut(1500);
        });


        $('a[href="#pd-2"]').on('click', function () {
            if(!returnsEvent){
                if ($returnDetailsTab.find('a:first').attr('aria-expanded') === 'false') {
                    helpers.sendEvent('IT033', 'User clicked returns accordian tab', 'IT033 - Returns Label - Product', true);
                    returnsEvent = true;
                }
            }
        });

    } // activate

}()); // _IT033
