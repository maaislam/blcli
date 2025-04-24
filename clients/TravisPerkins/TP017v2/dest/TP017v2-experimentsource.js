var TP017v2 = (function () {

	// Cookie Setter Helper Function.
	function setCookie(c_name,value,exdays,c_domain) {
		c_domain = (typeof c_domain === "undefined") ? "" : "domain=" + c_domain + ";";
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value + ";" + c_domain + "path=/";
	}

	// Cookie Getter Helper Function.
	function getCookie(name) {
		var match = document.cookie.match(name+'=([^;]*)');
		return match ? match[1] : undefined;
	}

	$('body').addClass('TP017v2').append([
		'<div class="pop-up_modal active">',
			'<div>',
			'<a href="#" class="close_btn">X</a>',
				'<div class="overflow_fix">',
					'<h2>Hello...a quick Question</h2>',
					'<h3>Are you using Travis Perskin for...</h3>',
					'<div class="cf_wrap clearfix cookie_tgl">',
						'<div class="TP017_col_6">',
							'<h4>Trade</h4>',
							'<a href="#" class="trade_cookie"><img src="https://prod1-tp-prod02-aws-travisperkins-com-public.s3.amazonaws.com/sys-master/images/h07/h87/8849952964638" /></a>',
						'</div>',
						'<div class="TP017_col_6">',
							'<h4>DIY</h4>',
							'<a href="#" class="diy_cookie"><img src="https://prod1-tp-prod02-aws-travisperkins-com-public.s3.amazonaws.com/sys-master/images/hc6/h8a/8849952833566" /></a>',
						'</div>',
					'</div>',
					'<a href="#" class="TP_confirm_btn">Submit<a/>',
					'<span class="TP_small_print">We can show you the right VAT, your nearest branch and designated trade account area</span>',
				'</div>',
			'</div>',
		'</div>'
	].join(''));

	var slideQ = false,
		modal = $(".pop-up_modal"),
		submitBtn = $('.TP_confirm_btn'),
		tradeCookie = $('.trade_cookie'),
		diyCookie = $('.diy_cookie');

	if(getCookie('tradeType') == 'DIY' || getCookie('tradeType') == 'Trade'){
		
	}
	else{
		modal.fadeIn();
	}

	if (slideQ == false) {
		$(".pop-up_modal .close_btn").on("click", function (e) {
			slideQ = true;
			e.preventDefault();

			if (modal.hasClass("active")) {
				modal.fadeOut("slow", function () {
					modal.removeClass("active");
					slideQ = false;
				});
			} else {
				modal.fadeIn("slow", function () {
					modal.addClass("active");
					slideQ = false;
				});
			}
		});
	}

	tradeCookie.on('click', function(){
		if(diyCookie.hasClass('active')){
			diyCookie.removeClass('active');
		}

		tradeCookie.addClass('active');
	});

	diyCookie.on('click', function(){
		if(tradeCookie.hasClass('active')){
			tradeCookie.removeClass('active');
		}

		diyCookie.addClass('active');
	});

	submitBtn.on('click', function(){
		if(tradeCookie.hasClass('active')){
			setCookie('tradeType', 'Trade', null, 'www.travisperkins.co.uk');
		}

		else if(diyCookie.hasClass('active')){
			setCookie('tradeType', 'DIY', null, 'www.travisperkins.co.uk');
		}

		else{

		}

	});
	
})();