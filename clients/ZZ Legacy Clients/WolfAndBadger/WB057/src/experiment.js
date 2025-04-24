import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

var _WB057 = (function() {

	/*--------------------------------------
	Experiment Code
	---------------------------------------*/
	var _activate = function() {
		var $ = jQuery
		var body = $('body'),
			faceBookrow,
			checkoutButton,
			clickedCheckoutEvent;

			body.addClass('WB057');	
			
        if(body.hasClass('WB038a')){
			faceBookrow = $('.row.WB038a_login'),
			checkoutButton = $('#WB038a_btn--checkout');
			faceBookrow.siblings().addClass('WB057-facebook');
		}else{
			body.addClass('WB057-notrunningwith38');	
			faceBookrow = $('.row.checkout-welcome .fb-bottom'),
			checkoutButton = $('.block.wide-form button.button.wide');
		}
		
	    checkoutButton.click(function(){
			if(!clickedCheckoutEvent){
				utils.events.send('WB057 - Removing Facebook logo','checkout click','user clicked checkout button',true);
				clickedCheckoutEvent = true;
			}
		});
	};


	/*-------------------------------------- 
	Activation
	---------------------------------------*/
	var _triggers = function(options) {
		utils.fullStory('WB057', 'Variation 1');

		_activate();
	};


	// Run experiment
	_triggers();

})();