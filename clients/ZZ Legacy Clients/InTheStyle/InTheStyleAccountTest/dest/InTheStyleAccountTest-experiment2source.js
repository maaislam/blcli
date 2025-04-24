import UC from './lib/Poller.js';
import sendEvent from './lib/sendEvent.js';

var ITSAccountTest = (function() {
	var JQ = window.jQuery,
		trackerName;

	var UCPoller = (function(){
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'input#email',
			'input#pass',
			'button#send2',
			'#login-form',
			function () {
				if (window.jQuery) {
					return true;
				}
			}
		], init);
	})();
	
    function init(){
		var cacheDom = (function() {
			//Cache useful selectors for later use
			var bodyVar = JQ('body'),
				loginWrap = JQ('#login-form'),			
				emailInput = loginWrap.find('input#email'),
				submitButton = loginWrap.find('button#send2');

			bodyVar.addClass('ITSAccountTest');
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar,
				emailInput: emailInput,
				submitButton: submitButton
			};
		})();

		var setCookie = (function(){
			return function(c_name,value,exdays,c_domain) {
				c_domain = (typeof c_domain === "undefined") ? "" : "domain=" + c_domain + ";";
				var exdate=new Date();
				exdate.setDate(exdate.getDate() + exdays);
				var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
				document.cookie=c_name + "=" + c_value + ";" + c_domain + "path=/";
			}
		})();

		var elementBindings = {
			// Click function for the mobile tab variation to show the hidden options
			loginClick: function(){
				cacheDom.submitButton.on('click', function(){
					setCookie('UserLogIn', cacheDom.emailInput.val(), 999999, 'www.inthestyle.com');
				});
			}
		};

		elementBindings.loginClick();
	}	
})();