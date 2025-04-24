// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------
/* eslint-disable */
import * as UCLib from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

var UC = null;
var _ID = (function() {

	/*--------------------------------------
	Experiment Code
	---------------------------------------*/
	var _activate = function() {
		// Namespace CSS
		// Script 1
(function () {
	var PD006 = {};
	window.PD006 = {};
	if (typeof UCLib == 'undefined') {
		UC = {};
	} else {
    UC = {UCLib};
  }
	UC = function (a) {
		return a.poller = function (a, b, c) {
			var d = {
					wait: 50,
					multiplier: 0,
					timeout: 7000
				},
				e = Date.now || function () {
					return (new Date).getTime()
				};
			if (c)
				for (var f in c) d[f] = c[f];
			else c = d;
			for (var g = !!d.timeout && new Date(e() + d.timeout), h = d.wait, i = d.multiplier, j = [], l = function (c, d) {
					if (g && e() > g) return !1;
					d = d || h,
						function () {
							var a = typeof c;
							return "function" === a ? c() : "string" !== a || document.querySelector(c)
						}() ? (j.push(!0), j.length === a.length && b()) : setTimeout(function () {
							l(c, d * i)
						}, d)
				}, m = 0; m < a.length; m++) l(a[m])
		}, a
	}(UC || {});

	// -----------------------------------------------
	// Full story integration
	// -----------------------------------------------
	UC.poller([
		function () {
			var fs = window.FS;
			if (fs && fs.setUserVars) return true;
		}
	], function () {
		window.FS.setUserVars({
			experiment_str: 'PD006',
			variation_str: 'Variation 1'
		});
	}, {
		multiplier: 1.2,
		timeout: 0
	});
})();

// Script 2
(function () {
	var trackerName;

	function sendEvent(action, label, nonInteractionValue) {
		var category = 'PD006---Desktop Homepage Redesign';
		label = label || '';
		nonInteractionValue = nonInteractionValue || true;

		ga('send', 'event', category, action, label, {
			nonInteraction: nonInteractionValue
		});
	}

	// Poll start
	UC.poller([
		'body',
		'#content',
		'.cms_banner_slot',
		'#header',
		'.nav_secondary',
		'#cart_header',
		'.siteLogo .cmsimage',
		'.La.sales_helpline',
		function () {
			if (window.jQuery) return true;
		},
		function () {
			if (window.ga) return true;
		}
	], PD006, {
		timeout: 7000,
		multiplier: 'disable'
	});

	function PD006() {
		var $ = window.jQuery;

		$('body').addClass('PD006');

		sendEvent('pd6-page-view');


		// -----------------------------------------------
		// Full story integration
		// -----------------------------------------------
		UC.poller([
			function () {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'PD006',
				variation_str: 'Variation 1'
			});
		}, {
			multiplier: 1.2,
			timeout: 0
		});

		/*-------------------------------
		Top Slider - page using jcarousel
		---------------------------------*/
	
		var slider = $('<div class="pd6-topCarousel"><ul class="pd6-slider"/></div>');
		slider.insertAfter('#nav_secondary');


		var slides = [
			['pd6-background1', 'https://www.protecdirect.co.uk/Site-Equipment-and-Consumables/Roadworks-and-Equipment/Cold-Weather-Essentials~c~DAI'],

		]

		$.each(slides, function () {
			var name = this[0],
				link = this[1];

			$(['<li class="pd6-slide ' + name + '"><a href="' + link + '"/></li>'].join('')).appendTo('.pd6-slider');
		});


		$.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', function () {
			$('.pd6-slider').slick({
				dots: true,
				infinite: true,
				autoplay: true,
				autoplaySpeed: 3000,
				slide: '.pd6-slide',
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false
			});
		});

	}
})();

// Script 3
(function () {
	var trackerName;

	function sendEvent(action, label, nonInteractionValue) {
		var category = 'PD006---Desktop Homepage Redesign';
		label = label || '';
		nonInteractionValue = nonInteractionValue || true;

		ga('send', 'event', category, action, label, {
			nonInteraction: nonInteractionValue
		});
	}

	// Poll start
	UC.poller([
		'body',
		'#content',
		'.cms_banner_slot',
		'#header',
		'.nav_secondary',
		'#cart_header',
		'.siteLogo .cmsimage',
		'.La.sales_helpline',
		function () {
			if (window.jQuery) return true;
		},
		function () {
			if (window.ga) return true;
		}
	], PD006, {
		timeout: 7000,
		multiplier: 'disable'
	});

	function PD006() {
		var $ = window.jQuery;

		$('body').addClass('PD006');
		/*-------------------------------
		Special offers section
		---------------------------------*/

			var specialOffers = $('#content .span-24:first');

			specialOffers.addClass('pd6-specialoffers').prepend('<div class="pd6-sotitletext"><h3>Special Offers</h3><p>While stocks last!</p></div>');
	   }

})();
// Script 4
(function () {
	var trackerName;

	function sendEvent(action, label, nonInteractionValue) {
		var category = 'PD006---Desktop Homepage Redesign';
		label = label || '';
		nonInteractionValue = nonInteractionValue || true;

		ga('send', 'event', category, action, label, {
			nonInteraction: nonInteractionValue
		});
	}

	// Poll start
	UC.poller([
		'body',
		'#content',
		'.cms_banner_slot',
		'#header',
		'.nav_secondary',
		'#cart_header',
		'.siteLogo .cmsimage',
		'.La.sales_helpline',
		function () {
			if (window.jQuery) return true;
		},
		function () {
			if (window.ga) return true;
		}
	], PD006, {
		timeout: 7000,
		multiplier: 'disable'
	});

	function PD006() {
		var $ = window.jQuery;

		$('body').addClass('PD006');


		/*-------------------------------
		Countdown
		---------------------------------*/
		var UC = UC || {};
		// UC Library - Countdown -- @version 0.3.4
		UC.countdown = function (e) {
			function t(e) {
				var t = function () {
						return o[e.getDay()]
					},
					a = function () {
						return c.indexOf(t()) > -1
					};
				if (a())
					for (; a();) e.setDate(e.getDate() + 1);
				return e
			}
			if (!$) return !1;
			var a = {
					cutoff: null,
					element: null,
					labels: {
						d: "days",
						h: "hours",
						m: "minutes",
						s: "seconds"
					},
					delivery: {
						deliveryDays: null,
						excludeDays: null,
						deliveryDayElement: null,
						tomorrowLabel: !1
					}
				},
				r = function (e, t) {
					var a, n;
					for (var l in t) a = e[l], n = t[l], Object.keys && -1 === Object.keys(e).indexOf(l) || ("object" == typeof n ? "[object Array]" === Object.prototype.toString.call(n) ? e[l] = n : r(a, n) : e[l] = n)
				};
			r(a, e);
			var n = new Date,
				l = new Date(a.cutoff),
				o = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
				s = a.delivery,
				u = s.deliveryDays,
				c = s.excludeDays,
				d = s.deliveryDayElement,
				i = {};
			n > l && (l.setDate(l.getDate() + 1), l = t(l)), i.cutoff = l.getTime();
			var y = Math.floor((l.getTime() - n.getTime()) / 1e3),
				f = document.querySelectorAll(a.element),
				D = setInterval(function () {
					var e = Math.floor(y / 24 / 60 / 60),
						t = Math.floor(y - 86400 * e),
						r = Math.floor(t / 3600),
						n = Math.floor(t - 3600 * r),
						l = Math.floor(n / 60),
						o = y % 60;
					o < 10 && (o = "0" + o);
					for (var s = 0, u = f.length; s < u; s++) f[s].innerHTML = [e > 0 ? '<span class="UC_cd-days">' + e + "</span> " + a.labels.d + " " : "", '<span class="UC_cd-hours">' + r + "</span> " + a.labels.h + " ", '<span class="UC_cd-minutes">' + l + "</span> " + a.labels.m + " ", '<span class="UC_cd-seconds">' + o + "</span> " + a.labels.s + " "].join("");
					0 === y ? clearInterval(D) : y--
				}, 1e3);
			if (u) {
				var v = function () {
						var e = new Date;
						return e.setDate(l.getDate() + u), e = t(e)
					}(),
					g = document.querySelectorAll(d),
					m = o[v.getDay()];
				if (s.tomorrowLabel) {
					var h = new Date(n);
					h.setDate(h.getDate() + 1), h.getFullYear() == v.getFullYear() && h.getMonth() == v.getMonth() && h.getDate() == v.getDate() && (m = "tomorrow")
				}
				for (var b = 0, p = g.length; b < p; b++) g[b].innerHTML = m;
				i.deliveryDate = v.getTime(), i.deliveryDay = m
			}
			return i
		};

		var URL = window.location.href;
		
		var cutoff = new Date(); 
		cutoff.setUTCHours(17, 0, 0);
		cutoff = cutoff.getTime();

		window.PD006.cutoff = cutoff;
		
		
		var countdownWrap = $('<div class="pd6-countdown"></div>')
		countdownWrap.insertAfter('#content .span-24:first');

		$('.pd6-countdown').html([
			'<div class="pd6-countdown-inner span-18">',
				'<img src="https://ab-test-sandbox.userconversion.com/experiments/PD006-freedeliv.png"/>',
				'<h3>Place your orders in the next</h3>',
				'<div class="countdown">',
					'<div id="pd6_countdown"></div>',
					'<div id="pd6_delivery-day"></div>',
				'</div>',
				'<h3>for <span></span></h3>',
			'</div>'
		].join(''));

		var countdown = UC.countdown({
			cutoff: cutoff,
			element: '#pd6_countdown',
			delivery: {
				deliveryDays: 1, // How long an item takes to arrive
				excludeDays: ['Saturday', 'Sunday'], // Non-working days
				tomorrowLabel: false
			}
		});
		if(countdown.deliveryDay === 'Friday'){
			$('.pd6-countdown-inner span').text('delivery on Monday');
		}else if(countdown.deliveryDay === 'Saturday' || countdown.deliveryDay === 'Sunday'){
			$('.pd6-countdown-inner span').text('delivery on Tuesday');
		}else{
			$('.pd6-countdown-inner span').text('next day delivery');
		}
	}
})();

// Script 5
(function() {
	var trackerName;
	function sendEvent(action, label, nonInteractionValue) {
		var category = 'PD006---Desktop Homepage Redesign';
		label = label || '';
		nonInteractionValue = nonInteractionValue || true;

		ga('send', 'event', category, action, label, {nonInteraction: nonInteractionValue});
	}
	
	// Poll start
	UC.poller([
		'body',
		'#header',
		'.nav_secondary',
		'#cart_header',
		'#content',
		'.siteLogo .cmsimage',
		'.La.sales_helpline',
		function() {
			if (window.jQuery) return true;
		},
		function() {
			if (window.ga) return true;
		}
	], PD006, {
		timeout: 7000,
		multiplier: 'disable'
	});


	function PD006() {
		var $ = window.jQuery;

		$('body').addClass('PD006');

		/*-------------------------------
		//Category Blocks
		---------------------------------*/
		
		
			var blocks = $('<div class="pd6-cat-blocks"><div class="pd6-blocks"/>');
			blocks.appendTo('#content');

			var category = [
				['//www.protecdirect.co.uk/Personal-Protective-Equipment-PPE-~c~A', 'Over 100 different items to suit your needs', '//ab-test-sandbox.userconversion.com/experiments/PD006-ppenew.png'],
				['//www.protecdirect.co.uk/Personal-Protective-Equipment-PPE-/Hand-Protection~c~AF', 'Free delivery on all items', '//ab-test-sandbox.userconversion.com/experiments/PD006-HANDS.png'],
				['//www.protecdirect.co.uk/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment~c~AE', 'Over 100 different items to suit your needs', '//ab-test-sandbox.userconversion.com/experiments/PD006-RESPI.png'],
				['//www.protecdirect.co.uk/Personal-Protective-Equipment-PPE-/Safety-Footwear~c~AG', 'Free delivery on all items', '//ab-test-sandbox.userconversion.com/experiments/PD006-footwear.png'],
				['//www.protecdirect.co.uk/Clothing-and-Workwear~c~B', 'Over 100 different items to suit your needs', '//ab-test-sandbox.userconversion.com/experiments/PD006-clothing.png'],
				['//www.protecdirect.co.uk/Site-Equipment-and-Consumables~c~D', 'Free delivery on all items', '//ab-test-sandbox.userconversion.com/experiments/PD006-cones.png']
			]

			$.each(category, function () {
				var catlink = this[0],
					cattext = this[1],
					catimage = this[2];
				$(['<div class="pd6-block">',
					'<a href="' + catlink + '">',
					'<img src="' + catimage + '"/>',
					'</a>',
					'<div class="pd6-underblocktext">' + cattext + '</div>',
					'</div>'
				].join('')).appendTo('.pd6-blocks');
			});
		
    }

})();


// Script 6
(function() {
	var trackerName;
	function sendEvent(action, label, nonInteractionValue) {
		var category = 'PD006---Desktop Homepage Redesign';
		label = label || '';
		nonInteractionValue = nonInteractionValue || true;

		ga('send', 'event', category, action, label, {nonInteraction: nonInteractionValue});
	}
	
	// Poll start
	UC.poller([
		'body',
		'#header',
		'.nav_secondary',
		'#cart_header',
		'.siteLogo .cmsimage',
		'.La.sales_helpline',
		function() {
			if (window.jQuery) return true;
		},
		function() {
			if (window.ga) return true;
		}
	], PD006, {
		timeout: 7000,
		multiplier: 'disable'
	});

	function PD006() {
		var $ = window.jQuery;

		$('body').addClass('PD006');
	/*-------------------------------
	Move header elements
	---------------------------------*/
	$('.manage_users.search').prependTo('.nav_secondary');
	$('.brands').prependTo('.nav_secondary');

	var headerTopelements = $('#header .nav');
		headerTopelements.insertBefore('#cart_header');
	/*-------------------------------
	Change register/signin
	---------------------------------*/
	var login = headerTopelements.find('.login'),
		register = headerTopelements.find('.register');

		register.html('<a href="/login">Sign In</a>'),
		login.html('<a href="/register">Register</a>');
	
	$('.La.sales_helpline').html('<span><b>Sales Helpline: </b>0870 333 3081</span>').prependTo(headerTopelements);
	/*-------------------------------
	Replace site logo
	---------------------------------*/
	$('.siteLogo .cmsimage img').attr('src','https://ab-test-sandbox.userconversion.com/experiments/PD006-proteclogonew.png');

	/*-------------------------------
	Navigation arrow
	---------------------------------*/
	$('.nav_main .La > a').each(function(){
		$(this).append('<img class="pd5-arrow" src="https://ab-test-sandbox.userconversion.com/experiments/PD006-arrowdown.png"/>')
	});

  }
})();


// Script 7
(function() {
	var trackerName;
	function sendEvent(action, label, nonInteractionValue) {
		var category = 'PD006---Mobile Product Page';
		label = label || '';
		nonInteractionValue = nonInteractionValue || true;

		ga('send', 'event', category, action, label, {nonInteraction: nonInteractionValue});
	}
	
	// Poll start
	UC.poller([
		'body',
		'#header',
		'.nav_secondary',
		'#cart_header',
		'.siteLogo .cmsimage',
		'.La.sales_helpline',
		function() {
			if (window.jQuery) return true;
		},
		function() {
			if (window.ga) return true;
		}
	], PD006, {
		timeout: 7000,
		multiplier: 'disable'
	});

	function PD006() {
		var $ = window.jQuery;

		$('body').addClass('PD006');


	/*-------------------------------
	Add Clearance & USP bars
	---------------------------------*/
	var uspBar = $('<div class="pd5-uspwrapper"></div>');
		uspBar.insertAfter('#nav_main');

	var uspHTML = [
		['<p class="pd5-countdownMessage"></p>','<span id="pd5-countdown">Order within</span>','https://ab-test-sandbox.userconversion.com/experiments/PD005-freedeliv.png'],
		['<b>Free</b> Delivery over £25','Free next day delivery as well! get it tomorrow','https://ab-test-sandbox.userconversion.com/experiments/PD005-freewordtruck.png'],
		['Contact us on <b>0870 333 3081</b>','Monday to friday between 8:30am & 5:30pm','https://ab-test-sandbox.userconversion.com/experiments/PD005-phone.png']
	]

	$.each(uspHTML, function(){
		var mainText = this[0],
			subText = this[1],
			icon = this[2];

		$(['<div class="pd5-usp">',
			'<img src="'+icon+'"/>',
				'<div class="pd5-usptext">',
				   '<h3>'+mainText+'</h3>',
				   '<p>'+subText+'</p>',
			 '</div>',
		   '</div>'].join('')).appendTo('.pd5-uspwrapper');
	});
		

	var clearanceBar = $('<div class="pd5-clearancewrapper"><a href="//https://www.protecdirect.co.uk/Site-Equipment-and-Consumables/Roadworks-and-Equipment/Cold-Weather-Essentials~c~DAI">Clearance <img src="https://ab-test-sandbox.userconversion.com/experiments/PD005-rightarrow.png"/></a></div>');
		clearanceBar.insertAfter(uspBar);

	}
	
})();




//SCRIPT 8
(function() {
	var trackerName;
	function sendEvent(action, label, nonInteractionValue) {
		var category = 'PD006---Desktop Homepage Redesign';
		label = label || '';
		nonInteractionValue = nonInteractionValue || true;

		ga('send', 'event', category, action, label, {nonInteraction: nonInteractionValue});
	}
	
	// Poll start
	UC.poller([
		'body',
		'#header',
		'.nav_secondary',
		'#cart_header',
		'.siteLogo .cmsimage',
		'.La.sales_helpline',
		function() {
			if (window.jQuery) return true;
		},
		function() {
			if (window.ga) return true;
		}
	], PD006, {
		timeout: 7000,
		multiplier: 'disable'
	});

	function PD006() {
		var $ = window.jQuery;

		$('body').addClass('PD006');

/*-------------------------------
FEEFO REVIEW
---------------------------------*/

var feefoBlock = $('<div class="pd5-feefo">feefo</div>');
feefoBlock.insertAfter('.siteLogo');

var reviewRating = '4.5',
reviewNumber = '214';

feefoBlock.html(['<img src="https://ab-test-sandbox.userconversion.com/experiments/PD006-feefo.png"/>',
				'<div class="feefoReviews">',
					'<h4>'+reviewRating+' / 5</h4>',
					'<p>based on '+reviewNumber+' reviews</p>',
				'</div>'
			].join(''));

}

    /*-------------------------------
    LOGGED IN AMEND
    ---------------------------------*/
    var loggedIn = $('.nav .logged_in');
        if(loggedIn.length){
            $('.nav').addClass('pd5-loggedin');
            $('.logged_in, .my_account, .logout').wrapAll('<div class="pd5-loggedinlinks"/>');
        }else{
            $('.nav').removeClass('pd5-loggedin');
        }
    })();


/*SCRIPT 9*/


(function() {
	var trackerName;
	function sendEvent(action, label, nonInteractionValue) {
		var category = 'PD006---Desktop Homepage Redesign';
		label = label || '';
		nonInteractionValue = nonInteractionValue || true;

		ga('send', 'event', category, action, label, {nonInteraction: nonInteractionValue});
	}
	
	// Poll start
	UC.poller([
		'body',
		'#header',
		'.nav_secondary',
		'#cart_header',
		'.siteLogo .cmsimage',
		'.La.sales_helpline',
		function() {
			if (window.jQuery) return true;
		},
		function() {
			if (window.ga) return true;
		}
	], PD006, {
		timeout: 7000,
		multiplier: 'disable'
	});

	function PD006() {
		var $ = window.jQuery;

		$('body').addClass('PD006');

	/*-------------------------------
	Countdown
	---------------------------------*/

	var UC = UC || {};
	// UC Library - Countdown -- @version 0.3.4
	UC.countdown=function(e){function t(e){var t=function(){return o[e.getDay()]},a=function(){return c.indexOf(t())>-1};if(a())for(;a();)e.setDate(e.getDate()+1);return e}if(!$)return!1;var a={cutoff:null,element:null,labels:{d:"days",h:"hours",m:"minutes",s:"seconds"},delivery:{deliveryDays:null,excludeDays:null,deliveryDayElement:null,tomorrowLabel:!1}},r=function(e,t){var a,n;for(var l in t)a=e[l],n=t[l],Object.keys&&-1===Object.keys(e).indexOf(l)||("object"==typeof n?"[object Array]"===Object.prototype.toString.call(n)?e[l]=n:r(a,n):e[l]=n)};r(a,e);var n=new Date,l=new Date(a.cutoff),o=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],s=a.delivery,u=s.deliveryDays,c=s.excludeDays,d=s.deliveryDayElement,i={};n>l&&(l.setDate(l.getDate()+1),l=t(l)),i.cutoff=l.getTime();var y=Math.floor((l.getTime()-n.getTime())/1e3),f=document.querySelectorAll(a.element),D=setInterval(function(){var e=Math.floor(y/24/60/60),t=Math.floor(y-86400*e),r=Math.floor(t/3600),n=Math.floor(t-3600*r),l=Math.floor(n/60),o=y%60;o<10&&(o="0"+o);for(var s=0,u=f.length;s<u;s++)f[s].innerHTML=[e>0?'<span class="UC_cd-days">'+e+"</span> "+a.labels.d+" ":"",'<span class="UC_cd-hours">'+r+"</span> "+a.labels.h+" ",'<span class="UC_cd-minutes">'+l+"</span> "+a.labels.m+" ",'<span class="UC_cd-seconds">'+o+"</span> "+a.labels.s+" "].join("");0===y?clearInterval(D):y--},1e3);if(u){var v=function(){var e=new Date;return e.setDate(l.getDate()+u),e=t(e)}(),g=document.querySelectorAll(d),m=o[v.getDay()];if(s.tomorrowLabel){var h=new Date(n);h.setDate(h.getDate()+1),h.getFullYear()==v.getFullYear()&&h.getMonth()==v.getMonth()&&h.getDate()==v.getDate()&&(m="tomorrow")}for(var b=0,p=g.length;b<p;b++)g[b].innerHTML=m;i.deliveryDate=v.getTime(),i.deliveryDay=m}return i};

	// Create cutoff date and convert to ms since epoch with getTime
	//var cutoff = new Date();

	// var cutoff = new Date(); 
	// cutoff.setUTCHours(16, 0, 0);
	// cutoff = cutoff.getTime();
	var cutoff = new Date(); 
		cutoff.setUTCHours(17, 0, 0);
		cutoff = cutoff.getTime();
	
	
	// Put your containers somewhere
	$('#pd5-countdown').append([
		'<div class="countdown">',
			'<div id="pd5_countdown"></div>',
			'<div id="pd5_delivery-day"></div>',
		'</div>',
	].join(''));
	
	var countdown = UC.countdown({
		cutoff: cutoff,
		element: '#pd5_countdown',
		delivery: {
			deliveryDays: 2, // How long an item takes to arrive
			excludeDays: ['Saturday', 'Sunday'], // Non-working days
			tomorrowLabel: false
		}
	});
	

	if(countdown.deliveryDay === 'Friday'){
		$('.pd5-countdownMessage').html('Get it by <b>Monday</b>');
	}else if(countdown.deliveryDay === 'Saturday' || countdown.deliveryDay === 'Sunday'){
		$('.pd5-countdownMessage').html('Get it by <b>Tuesday</b>');
	}else{
		$('.pd5-countdownMessage').html('<b>Next Day</b> Delivery');
	}
	
	$('.manage_users.search .button').attr('src','//www.sitegainer.com/fu/up/x0i4dhcnbheljdy.png')
	

  } 
})();



	};


	/*-------------------------------------- 
	Activation
	---------------------------------------*/
	var _triggers = function(options) {
		utils.fullStory('ID', 'Variation 1');

		_activate();
	};


	// Run experiment
	_triggers();

})();