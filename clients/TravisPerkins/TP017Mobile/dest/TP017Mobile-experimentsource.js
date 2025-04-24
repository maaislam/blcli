var TP017Mobile = (function () {

	// Cookie Setter Helper Function.
	function setCookie(c_name, value, exdays, c_domain) {
		c_domain = (typeof c_domain === "undefined") ? "" : "domain=" + c_domain + ";";
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
		document.cookie = c_name + "=" + c_value + ";" + c_domain + "path=/";
	}

	// Cookie Getter Helper Function.
	function getCookie(name) {
		var match = document.cookie.match(name + '=([^;]*)');
		return match ? match[1] : undefined;
	}

	$('body').addClass('TP017Mobile').append([
		'<div class="pop-up_modal active">',
		'<div>',
		'<a href="#" class="close_btn">X</a>',
		'<div class="overflow_fix">',
		'<h2>Hello...a quick Question</h2>',
		'<h3>We can show you the right VAT, your nearest branch and designated trade account area</h3>',
		'<div class="TP017_input_wrap">',
		'<label>What profession are you in?</label>',
		'<div class="TP017_select">',
		'<span></span>',
		'<select name="boughtFrom">',
		'<option class="default">Choose and option</option>',
		'<option>Civils and Drainage</option>',
		'<option>Exterior Fit</option>',
		'<option>General Building and Construction</option>',
		'<option>Interior Fit</option>',
		'<option>Joinery and Carpentry</option>',
		'<option>Plumbing and Heating</option>',
		'<option>Other</option>',
		'</select>',
		'</div>',
		'</div>',
		'<div class="TP_diy_btn"><a href="#">None, I\'m DIY<a/></div>',
		'<a href="#" class="TP_confirm_btn">Submit</a>',
		'<span class="TP_error">Please select an option</span>',
		'</div>',
		'</div>',
		'</div>'
	].join(''));

	var slideQ = false,
		modal = $(".pop-up_modal"),
		submitBtn = $('.TP_confirm_btn'),
		tradeSelect = $('.TP017_select');

	if (getCookie('tradeType') == 'DIY' || getCookie('tradeType') == 'Trade') {

	} else {
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

	$.each(tradeSelect, function () {
		var el = $(this),
			span = el.find('span'),
			sel = el.find('select');
		span.html(sel.find('option:selected').text());

		sel.change(function () {
			span.html(sel.find('option:selected').text());
		});
	});

	submitBtn.on('click', function () {
		if (tradeSelect.find('option:selected').hasClass('default')) {
			$('.TP_error').addClass('active');
		} else {
			setCookie('tradeType', 'Trade', null, 'www.travisperkins.co.uk');
			modal.fadeOut("slow", function () {
				modal.removeClass("active");
			});
		}
	});

	$('.TP_diy_btn a').on('click', function () {
		setCookie('tradeType', 'DIY', null, 'www.travisperkins.co.uk');
		modal.fadeOut("slow", function () {
			modal.removeClass("active");
		});
	});
})();