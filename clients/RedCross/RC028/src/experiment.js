/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

var RC028 = (function() {
	var trackerName,
		slideQ = false,
		$;

	var UCPoller = (function(){
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'#ctl02_navcontainer',
			function () {
				if (window.jQuery) {
					$ = window.jQuery
					return true;
				}
			}
		], init);
	})();

	function init(){
		utils.fullStory('RC028', 'Variation 1');
		//utils.events.send('RC028', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
		//utils.events.send('RC028', 'Click', 'Show mobile clicked', true);

		var cacheDom = (function() {
			//Cache useful selectors for later use
			var bodyVar = $('body');
			var navSelector = $('#ctl02_navcontainer');
			var windowPathname = window.location.pathname;

			bodyVar.addClass('RC028');
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar,
				navSelector: navSelector,
				windowPathname: windowPathname
			};
		})();


		var contentBuilder1 = (function(){
			//builds the content for URL condition 1
			
			var condition1Markup = $(`
			<div class="RC028_Banner"> 
			<img src="//useruploads.visualwebsiteoptimizer.com/useruploads/286844/images/2425aebee6e00e30657f39df94e02055_mobile-app-680x268.jpg" />
				<div class="RC028_Banner_Content">
					<h2 class="RC028_C1_Desktop_Header RC028_mb-hide RC028_tb-show">Remember the skills you learn in training with free ongoing support</h2>
					<h2 class="RC028_C1_Mobile_Header RC028_tb-hide">Keep first aid skills fresh after training</h2>
					
					<p class="RC028_C1_Desktop_Content RC028_mb-hide RC028_tb-show">Red Cross Training supports ongoing learning through the Safe Hands community for workplace first aiders and via FREE apps, available for everyone on Android and Apple devices.</p>
					<p class="RC028_C1_Mobile_Content RC028_tb-hide">We support ongoing learning through the Safe Hands community and via FREE apps.</p>
					
					<a class="RC028_Button" href="https://www.redcrossfirstaidtraining.co.uk/What-we-do/ongoing-support.aspx">Learn More</a>	
				</div>
			</div>`);

			cacheDom.navSelector.after(condition1Markup);

		})

		var contentBuilder2 = (function(){
			//builds the content for URL condition 2

			var condition2Markup = $(`		
			<div class="RC028_Banner"> 
			<img src="//useruploads.visualwebsiteoptimizer.com/useruploads/286844/images/2425aebee6e00e30657f39df94e02055_mobile-app-680x268.jpg" />
				<div class="RC028_Banner_Content">
					<h2 class="RC028_C2_Desktop_Header RC028_mb-hide RC028_tb-show">Remember the skills you learn in training with free ongoing support</h2>
					<h2 class="RC028_C2_Mobile_Header RC028_tb-hide">Keep first aid skills fresh after training</h2>

					<p class="RC028_C2_Desktop_Content RC028_mb-hide RC028_tb-show">Red Cross Training supports ongoing learning via FREE apps, including a dedicated First Aid for Baby and Child app. Available for Android and Apple devices.</p>
					<p class="RC028_C2_Mobile_Content RC028_tb-hide">We provide ongoing support via FREE apps with guides for Adult and First Aid for Baby and Child</p>
					
					<a class="RC028_Button" href="https://www.redcrossfirstaidtraining.co.uk/What-we-do/ongoing-support.aspx">Learn More</a>		
				</div>
			</div>`);

			cacheDom.navSelector.after(condition2Markup);

		})

		var contentBuilder3 = (function(){
			//builds the content for URL condition 3

			var condition3Markup = $(`
			<div class="RC028_Banner RC028_Apps_Banner"> 
			<img src="//useruploads.visualwebsiteoptimizer.com/useruploads/286844/images/2425aebee6e00e30657f39df94e02055_mobile-app-680x268.jpg" />
				<div class="RC028_Banner_Content">
					<h2 class="RC028_C3_Desktop_Header RC028_mb-hide RC028_tb-show">Get continued support after training with our FREE apps</h2>
					<h2 class="RC028_C3_Mobile_Header RC028_tb-hide">Keep first aid tips handy on your phone</h2>

					<p class="RC028_C3_Desktop_Content RC028_mb-hide RC028_tb-show">Red Cross Training supports ongoing learning via FREE apps, with guides for Adult and First Aid for Baby and Child.</p>

					<div class="RC028_App_Button">
						<a href="http://simplefirstaid.org/app">Get our FREE app</a>
					</div>	

					<p class="RC028_C3_Desktop_Content_Bottom RC028_mb-hide RC028_tb-show">Anyone who completes a workplace first aid course will be invited to sign up to Safe Hands during your training.</p>
				</div>
		</div>`);

			$('.main-content-wrap .main-content + .sidebar-last').append(condition3Markup);
			cacheDom.bodyVar.addClass('RC028_success-page');
			$('.main-content').wrapInner('<div class="RC028_padding-fix"></div>');
			
		})
		
	//If statements to call contentBuilder based on URL

	if(cacheDom.windowPathname.indexOf("/Purchase/PurchaseSuccess") > -1){

		contentBuilder3();
	}
	else if(cacheDom.windowPathname == '/' || cacheDom.windowPathname.indexOf("/Purchase") > -1){
	}
	else if (
	cacheDom.windowPathname.indexOf("/Courses/First-aid-public-courses.aspx") > -1 ||
	cacheDom.windowPathname.indexOf("/Where-we-train/EventsSearch.aspx? ") > -1 ||
	cacheDom.windowPathname.indexOf("type=General%20Public") > -1 ||
	cacheDom.windowPathname.indexOf("/Courses/First-aid-public-courses/First-aid-for-baby-and-child.aspx") > -1 ||
	cacheDom.windowPathname.indexOf("/Courses/First-aid-public-courses/First-aid-for-adult.aspx") > -1 ||
	cacheDom.windowPathname.indexOf("/Courses/First-aid-public-courses/first-aid-for-adult-evenings.aspx") > -1 ||
	cacheDom.windowPathname.indexOf("/Courses/First-aid-public-courses/First-aid-for-baby-and-child-evening.aspx") > -1
) {
			contentBuilder2();

	} 
	else{
		contentBuilder1();
	}
				
	}	
})();
