import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import {setCookie,getCookie} from '../../../../lib/utils';

var _BI001 = (function () {

	/*--------------------------------------
	Experiment Code
	---------------------------------------*/
	var _activate = function () {

		var $ = window.JQSG;

		var $body = $('body');
		$body.addClass('BI001');

		if (!getCookie('BI001-close')) {
			function lightBox() {
				var $lightBox = $('<div class="BI001_lightbox-wrapper"/>'),
					$lightBoxFade = $('<div class="BI001_lightbox-fade"/>');
				$body.prepend($lightBox).prepend($lightBoxFade);

				$lightBox.html([
					'<div class="BI001_lightbox-content">',
						'<div class="BI001_lightbox-leftside">',
						'</div>',
						'<div class="BI001_lightbox-rightside">',
							'<h2>Welcome to Biscuiteers</h2>',
							'<span>I am...</span>',
							'<div class="BI001_lightbox-error">Please select an option</div>',
							'<div class="BI001_lightbox-options">',
								'<div class="BI001_lightbox-option" data-user-type="BI001_personal"><div class="BI001_optionText"><p>buying for myself/friend/family member</p></div></div>',
								'<div class="BI001_lightbox-option" data-user-type="BI001_business"><div class="BI001_optionText"><p>buying for a colleague/people at work/client</p></div></div>',
							'</div>',
							'<div class="BI001_exit">CLOSE [x] </div>',
						'</div>',
					'</div>'
				].join(''));

				$lightBox.find('.BI001_lightbox-option').on('click', function () {
					var $el = $(this);
					
						// remove any active selected boxes and select this one
						$lightBox.find('.BI001_lightbox-option.BI001_option-selected').removeClass('BI001_option-selected');
						$el.addClass('BI001_option-selected');
						closeLightbox();
					
				});

				//if exit clicked close the lightbox
				$lightBox.find('.BI001_exit').click(function () {
					closeLightbox();

				});
				$lightBoxFade.click(function () {
					closeLightbox();
				});

			}
			lightBox();
			showLightbox();

			function showLightbox() {
				var $lightBox = $('.BI001_lightbox-wrapper'),
					$lightBoxFade = $('.BI001_lightbox-fade');

				setTimeout(function () {
					$lightBox.addClass('BI001_lightbox_active');
					$lightBoxFade.addClass('BI001_lightboxFade_active');
				}, 1000);
			}


			function closeLightbox() {

				var $lightBox = $('.BI001_lightbox-wrapper'),
					$lightBoxFade = $('.BI001_lightbox-fade');
					
					if($lightBox.find('.BI001_lightbox-option').hasClass('BI001_option-selected')){
						utils.events.send('BI001-Segmentation','click','User answered and closed lightbox');
						var $userType = $lightBox.find('.BI001_lightbox-option.BI001_option-selected').attr('data-user-type');
						setCookie('BI001', $userType);

						utils.events.send('BI001-Segmentation','click','User clicked '+$userType);

					}else{
						utils.events.send('BI001-Segmentation','click','User didnt answer and closed lightbox');
					}

					// close lightbox
					//setTimeout(function() {
						$lightBox.removeClass('BI001_lightbox_active');
						$lightBoxFade.removeClass('BI001_lightboxFade_active');
					//}, 500);

					//cookie to not see it again
					setCookie('BI001-close', true);
				}
			}

		function newUsercookie(){
			var isNewUser = getCookie('BI001-visited');
			var newUserEvent;
			
				if(!isNewUser) {
					setCookie('BI001-visited', true);
					if(!newUserEvent){
						utils.events.send('BI001-Segmentation','Page View','New user');
						newUserEvent = true;
					}
				}
		}
		newUsercookie();
	}

	/*-------------------------------------- 
	Activation
	---------------------------------------*/
	var _triggers = function (options) {
		utils.fullStory('BI001', 'Variation 1');

		UC.poller([
			'body',
			function () {
				if (window.JQSG) return true;
			},
		], _activate);
	};
    // Run experiment
	_triggers();

})();