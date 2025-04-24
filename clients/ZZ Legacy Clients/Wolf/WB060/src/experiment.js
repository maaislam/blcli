// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

var WB060 = (function() {
	var trackerName,
		slideQ = false,
		$;

	var UCPoller = (function(){
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'div[class="full-sitenav-wrapper"]',
			'.search-modal',
			function () {
				if (window.jQuery) {
					$ = window.jQuery
					return true;
				}
			}
		], init);
	})();

	function init(){
		utils.fullStory('WB060', 'Variation 1');
		//utils.events.send('WB060', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
		//utils.events.send('WB060', 'Click', 'Show mobile clicked', true);

		var cacheDom = (function() {
			//Cache useful selectors for later use
			var bodyVar = $('body');
			var navSelector =$('div[class="full-sitenav-wrapper"]');
			var location = "New York";
			var searchOpen =  $('.search-modal');
			var global = $('#global'),
				bannerWrap;

			bodyVar.addClass('WB060');
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar,
				navSelector,
				location,
				searchOpen,
				global,
				bannerWrap
			};
		})();

		var markUp = {
			contentBuilder(){
				var londonMarkup = $(`
					<div class="WB060-Banner">
						<span class="WB060-Desktop">In London? RSVP to our festive Christmas shopping event on Thursday 14th December. <a href="https://www.eventbrite.co.uk/e/wolf-badger-christmas-shopping-event-tickets-40779038201" target="_blank">Click to find out more</a></span>
						<span class="WB060-Mobile">In London? RSVP to our Xmas shopping event <br />on Thurs 14th Dec. <a href="https://www.eventbrite.co.uk/e/wolf-badger-christmas-shopping-event-tickets-40779038201" target="_blank">Tap to find out more</a></span>
					</div>
				`);
	
				var NYMarkup = $(`
					<div class="WB060-Banner">
						<span class="WB060-Desktop">In New York? RSVP to our festive Christmas shopping event on Thursday 14th December. <a href="https://www.eventbrite.co.uk/e/wolf-badger-christmas-shopping-event-nyc-tickets-40779165582" target="_blank">Click to find out more</a></span>
						<span class="WB060-Mobile">In New York? RSVP to our Xmas shopping event <br />on Thurs 14th Dec. <a href="https://www.eventbrite.co.uk/e/wolf-badger-christmas-shopping-event-nyc-tickets-40779165582" target="_blank">Tap to find out more</a></span>
					</div>
				`);

				//if statement to add londonMarkup or NYMarkup based on location
				if(cacheDom.location == "London"){
					cacheDom.navSelector.after(londonMarkup);
				} else if (cacheDom.location == "New York"){
					cacheDom.navSelector.after(NYMarkup);
				}; 

				cacheDom.bannerWrap = $('.WB060-Banner');
			},
			mobileCheck(){
				var globalPad;

				if($('.search-modal').is(':visible')){
					cacheDom.bannerWrap.addClass('WB060-fixed-search');
					globalPad = parseInt(cacheDom.global.css('padding-top').replace('px', ''));
					cacheDom.global.css('padding-top', globalPad + cacheDom.bannerWrap.outerHeight());
				} else {
					cacheDom.bannerWrap.removeClass('WB060-fixed-search');
					globalPad = parseInt(cacheDom.global.css('padding-top').replace('px', ''));
					cacheDom.global.css('padding-top', globalPad + cacheDom.bannerWrap.outerHeight());
				}
			}
		};

		var searchFunction = {
			click(){
				var globalPad;

				$('#close-search-model, #search-link .icon-search').on('click', function(){
					setTimeout(function(){
						if($('.search-modal').is(':visible')){
							cacheDom.bannerWrap.addClass('WB060-fixed-search');
							globalPad = parseInt(cacheDom.global.css('padding-top').replace('px', ''));
							cacheDom.global.css('padding-top', globalPad + cacheDom.bannerWrap.outerHeight());
						} else {
							cacheDom.bannerWrap.removeClass('WB060-fixed-search');
							globalPad = parseInt(cacheDom.global.css('padding-top').replace('px', ''));
							cacheDom.global.css('padding-top', globalPad + cacheDom.bannerWrap.outerHeight());
						}
					}, 5);
				});		
			}
		};

		markUp.contentBuilder();
		//markUp.mobileCheck();
		//searchFunction.click();
		
	}	
})();