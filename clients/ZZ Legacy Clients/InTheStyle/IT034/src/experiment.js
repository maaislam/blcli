// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

let _IT034 = (function() {

	/*--------------------------------------
	Experiment Code
	---------------------------------------*/
	let _activate = function() {

	    if (location.href.indexOf('https://www.inthestyle.com/checkout/cart') === -1) {
	        return;
        } 

        var freeReturnsEnabled = utils.getCookie('its_cookied_free_returns');

		// Namespace CSS
        var $ = window.jQuery;
        $('body').addClass('IT034');
    

	    // The html for the 'Easy Peasy' dropdown
        let htmlEasyPeasy = [
            //'<tr>',
                '<div class="IT034_easyPeasyWrapper">', // <td colspan="50">
                    '<p class="IT034_header">',
                    freeReturnsEnabled ? 'FREE ' : '',
                    'Easy Peasy Returns <span class="IT034_headerColored">How Easy?<i class="IT034_arrow_down"></i></span></p>',
                    '<div class="IT034_contentWrapper">',
            // ------------------------------SLICK SLIDER----------------------------------------
            '<div class="IT034_swipe_Wrapper">',
            // ---- SWIPE LEFT
            '<div class="IT034_swipeLeftAbsoluteWrapper">',
                '<div class="IT034_swipeLeftContainer">',
                '<span class="IT034_swipeLeftMsgUnderIcon">SWIPE LEFT</span>',
                '<img class="IT034_swipeLeftIconSVG" src="https://ab-test-sandbox.userconversion.com/experiments/IT034-swipeleft.svg">',
                '</div>',
            '</div>',
            // ---------------
            '<div class="IT034_slideToSlide">',
            '<div class="IT034_img_slideWrap">',
            '<span class="IT034_slideStep">1</span>',
            '<img src="http://www.sitegainer.com/fu/up/yh1rzghy7tqwix4.png" class="IT034_img_slide IT034_img_slide1">',
            '</div>',
            '<p class="IT034_slideDesc">PEEL & STICK THE PREPAID RETURNS LABEL TO YOUR PARCEL</p>',
            '</div>',
            '<div class="IT034_slideToSlide">',
            '<div class="IT034_img_slideWrap">',
            '<span class="IT034_slideStep">2</span>',
            '<img src="http://www.sitegainer.com/fu/up/c4najy6xvtsa4qe.png" class="IT034_img_slide IT034_img_slide2">',
            '</div>',
            '<p class="IT034_slideDesc">TICK YOUR REASON FOR RETURNING THE ITEM(S)',
            '</div>',
            '<div class="IT034_slideToSlide">',
            '<div class="IT034_img_slideWrap">',
            '<span class="IT034_slideStep">3</span>',
            '<img src="http://www.sitegainer.com/fu/up/vmh39whmc1k7fpp.png" class="IT034_img_slide IT034_img_slide3">',
            '</div>',
            '<p class="IT034_slideDesc">TAKE YOUR PARCEL TO YOUR LOCAL POST OFFICE</p>',
            '</div>',
            '</div>',
             // ------------------------------------------------------------------------------------------------
             '<div class="IT034_redWrapper">',
             freeReturnsEnabled ? [
               '<div class="IT034_whiteItem">',
                   '<div class="IT034_whiteItem_right">FREE returns. Absolutely and forever.</div>',     
               '</div>',
            ].join('') : '',
             '<div class="IT034_whiteItem">',
                 '<div class="IT034_whiteItem_right">Please return your item(s) within 14 days of receiving.</div>',
             '</div>',
             '<div class="IT034_whiteItem">',
                 '<div class="IT034_whiteItem_right">Ensure items are in their original conditions & with the tags.</div>',
             '</div>',
             '<div class="IT034_whiteItem">',
                 '<div class="IT034_whiteItem_right">Refunds are processed within 7 working days*.</div>',     
             '</div>',
            '</div>',
            '<span class="IT034_handling-fee">*minus the original delivery charge if applicable. ',
            freeReturnsEnabled ?
              '' :
              'We also charge a small handling fee of £2.50 which we will deduct from your refund</span>',
            '</div>',
            '</div>' // </td>
            //'</tr>'
        ].join('');

        // Insert the html into the page
        // Bucketed out of some 100% tests?
        // $('#shopping-cart-table').find(' > tfoot > tr.first.last').before(htmlEasyPeasy);
        $('.main-container .main .col-right .cart').prepend(htmlEasyPeasy);

        // Container for the swipable images
        let swipeWrapper = $('.IT034_contentWrapper');

        
       
        let $headerDropdown = $('.IT034_header');

        var clickedReturnsEvent;

        $('.IT034_swipe_Wrapper').slick({ slide: '.IT034_slideToSlide' });
       
        $('.IT034_headerColored i').toggleClass('IT034_arrow_up_active');

        //Add loader to dropdown
        var $loader = $('<div class="it034-loader"/>');
        $loader.prependTo(swipeWrapper);



        $headerDropdown.on('click', function (e) {

            e.preventDefault();
            $('.IT034_headerColored i').toggleClass('IT034_arrow_up_active');
            
            
            
            var $loaderShown;

            if (swipeWrapper.is(':visible')) {
                swipeWrapper.slideUp(300);
                $loader.removeClass('it034-active');
            } else {
                $loader.addClass('it034-active');
                 swipeWrapper.slideDown(500,function(){                   
                    $(window).trigger('resize');
                    $('.IT034_swipe_Wrapper')[0].slick.refresh();

                    setTimeout(function(){
                        $loader.removeClass('it034-active');
                    },550);
                });
            }

            if(!clickedReturnsEvent){
                utils.events.send('IT034', 'User clicked how easy dropdown', 'IT034 - Returns Label - Basket', true);
                clickedReturnsEvent = true;
            }
        });

        // Hide 'swipe left' icon on (touchstart) - when user wants to start sliding
        $('.IT034_slideToSlide, .IT034_swipeLeftContainer').on('touchstart mousedown', function () {
            $('.IT034_swipeLeftContainer').fadeOut(1500);
        });

	};

	/*-------------------------------------- 
	Activation
	---------------------------------------*/
	let _triggers = function(options) {
        utils.fullStory('IT034', 'Variation 1 Mobile');
        
        UC.poller([
            'body',
            '.main-container .main .col-right .cart',
			function () {
				if (window.jQuery) return true;
			},
		], _activate);

	};

	// Run experiment
	_triggers();

})(); // _IT034
