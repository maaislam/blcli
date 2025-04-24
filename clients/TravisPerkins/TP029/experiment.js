import UC from './lib/Poller.js';
import sendEvent from './lib/sendEvent.js';

var ITSAccountTest = (function() {
	var JQ = window.jQuery,
		trackerName;

	var UCPoller = (function(){
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'body',
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
			var bodyVar = document.querySelector('body'),
				cookieTest,
				cookieMatch,
				logInCheck,
				buttonCheckout = JQ('.btn-checkout');

			bodyVar.className = 'ITSAccountTest';
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar,
				cookieTest: cookieTest,
				cookieMatch: cookieMatch,
				logInCheck: logInCheck,
				buttonCheckout: buttonCheckout
			};
		})();

		var getCookie = (function(){
			return function(name) {
				var match = document.cookie.match(name+'=([^;]*)');
				return match ? match[1] : undefined;
			}
		})();

		var redirectCheckout = {
			wrongPage: function(){
				if(window.location.pathname.indexOf('/onestepcheckout') > -1){
					window.location.href = 'https://www.inthestyle.com/checkout/onepage';
				}
			}
		}

		var checkLogin = {
			readCookie: function(){
				cacheDom.cookieTest = getCookie('UserLogIn');
				cacheDom.logInCheck = getCookie('is_logged_in');

				if(cacheDom.cookieTest.toLowerCase() == 'test1@inthestyle.com'){
					cacheDom.cookieMatch = true;
				}
				else if(cacheDom.cookieTest.toLowerCase() == 'test2@inthestyle.com'){
					cacheDom.cookieMatch = true;
				}
				else if(cacheDom.cookieTest.toLowerCase() == 'test3@inthestyle.com'){
					cacheDom.cookieMatch = true;
				}
				else if(cacheDom.cookieTest.toLowerCase() == 'test4@inthestyle.com'){
					cacheDom.cookieMatch = true;
				}
				else if(cacheDom.cookieTest.toLowerCase() == 'test5@inthestyle.com'){
					cacheDom.cookieMatch = true;
				}
				else {
					cacheDom.cookieMatch = false;
				}
			}
		}

		var replaceHrefs = {
			replaceFunction: function(){
				if(cacheDom.cookieMatch === true && cacheDom.logInCheck == '1'){
					if(cacheDom.buttonCheckout.length > 0){
						cacheDom.buttonCheckout.attr("onclick", "window.location='https://www.inthestyle.com/checkout/onepage';")
					}

					JQ('a').each(function(){
						var el = JQ(this),
							elHref = el.attr('href');

						if(elHref){
							if(elHref.indexOf('/onestepcheckout') > -1){
								elHref.replace('/onestepcheckout', '/checkout/onepage');
							}
						}
					});
				}
			}
		}
		
		redirectCheckout.wrongPage();
		checkLogin.readCookie();
		replaceHrefs.replaceFunction();
	}	
})();