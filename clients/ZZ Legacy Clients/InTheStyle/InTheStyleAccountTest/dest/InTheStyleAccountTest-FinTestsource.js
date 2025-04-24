var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	
var sendEvent = (function() {
    return function (category, action, label, nonInteractionValue, dimensionValue, dimensionName) {
        var fire = function (tracker) {
            var options = {};
            options.nonInteraction = nonInteractionValue;
            if(dimensionValue && dimensionName){
                options['dimension' + dimensionValue] = dimensionName;
            }
            window.ga(tracker + '.send', 'event', category, action, label, options);
        };

        if (trackerName) {
            fire(trackerName);
        } else {
            UC.poller([
                function () {
                    return window.ga.getAll;
                }
            ], function () {
                trackerName = window.ga.getAll()[0].get('name');
                fire(trackerName);
            });
        }
    }
    //sendEvent('CB080', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
    //sendEvent('CB080', 'Closed Trade Modal', '', true);	
})();


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