var RC016 = (function () {
	// UC Library - Poller -- @version 0.2.2
	var UC = function (a) {
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

	var _triggers = (function () {
		UC.poller([
			'.course-search-container .course-search-form-main',
			'.course-search-head',
			'.course-search-head-txt',
			'.form-btnAutoSubmit',
			function () {
				return window.jQuery;
			},
			function () {
				return window.ga;
			}
		], activate);
	})();

	function activate() {
		$('body').addClass('RC016');

		var trackerName;
		function sendEvent(category, action, label, nonInteractionValue) {
			var fire = function(tracker) {
				window.ga(tracker + '.send', 'event', category, action, label, {nonInteraction: nonInteractionValue});
			};

			if (trackerName) {
				fire(trackerName);
			} else {
				UC.poller([
					function() { return window.ga.getAll; }
				], function() {
					trackerName = window.ga.getAll()[0].get('name');
					fire(trackerName);
				});
			}
		}

		UC.poller([
			function() {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'RC016',
				variation_str: 'Variation 1'
			});
		}, { multiplier: 1.2, timeout: 0 });

		function getGetOrdinal(n) {
			var s = ["th", "st", "nd", "rd"],
				v = n % 100;
			return n + (s[(v - 20) % 10] || s[v] || s[0]);
		}

		var nonCurrentTab = $(".course-search-head .tab-buttons > li:not(.tab-current)"),
			nonCurrentTabText = nonCurrentTab.text(),
			currentTab = $(".course-search-head .tab-buttons > li.tab-current a"),
			currentTabText = currentTab.text(),
			courseTypeWrap = $('.course-search-head'),
			courseCalc = $('.course-search-head-txt'),
			filterWrap = $('.course-search-form-main'),
			courseSearchSummary = $('.course-search-summary'),
			searchResults = courseSearchSummary.find('span').text(),
			courseDateRange = $('.course-search-form-main .form-daterange'),
			courseLocationSearch = $('.course-search-form-main .form-daterange + .form-item.col-md-4'),
			courseSelectBox = $('.course-search-form-main .form-item.col-md-4:first-child'),
			dateFromVal = courseDateRange.find('.sr-only + .form-item-date input').val().split("/"),
			dateToVal = courseDateRange.find('.form-item-date.form-date-to input').val().split("/"),
			searchVal = courseLocationSearch.find('input.js-location').val(),
			dateFromDay = dateFromVal[0],
			dateToDay = dateToVal[0],
			dateFromMonth = dateFromVal[1],
			dateToMonth = dateToVal[1],
			dateFromYear = 20 + dateFromVal[2],
			dateToYear = 20 + dateToVal[2],
			dateFromOut = new Date(dateFromYear, dateFromMonth - 1, dateFromDay),
			dateToOut = new Date(dateToYear, dateToMonth - 1, dateToDay),
			locale = "en-us",
			NewMonthFrom = dateFromOut.toLocaleString(locale, {
				month: "short"
			}),
			NewMonthTo = dateToOut.toLocaleString(locale, {
				month: "short"
			}),
			submitFormBtn = $('.form-btnAutoSubmit'),
			timeDiff = Math.abs(dateToOut.getTime() - dateFromOut.getTime());
			diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)),
			searchResultsNumber = searchResults.match(/\d+/);

		currentTab
			.text('All ' + currentTabText + ' Courses')
			.after('<a href="#" class="RC016_course_tgl">Change Course</a>');

		courseCalc
			.appendTo(filterWrap);

		nonCurrentTab
			.addClass('RC016_not_current')
			.find('a')
			.text('View All ' + nonCurrentTabText + ' Courses Instead');

		if($('.tab-buttons li.tab-current a').text().indexOf("Public") !== -1){
			courseTypeWrap.after('<div class="RC016_safety_msg">These courses are designed for people who want to learn first aid for their everyday life, rather than as a requirement of their job</div>');

		}
		else if ($('.tab-buttons li.tab-current a').text().indexOf("Workplace") !== -1){
			courseTypeWrap.after('<div class="RC016_safety_msg">These courses are designed to meet health and safety legal requirements and are recognised by the Health and Safety Executive (HSE)</div>');
		}

	
		courseSelectBox
			.find('label + div')
			.addClass('RC_select');

		courseSelectBox
			.prepend('<div class="RC_course_name clearfix"><span>' + courseSelectBox.find('option:selected').text() + '</span><a href="#" class="RC016_change_type">Change course</a></div>');

		courseDateRange
			.prepend('<div class="RC_course_date clearfix"><span>Between</span><span class="RC_start_date"> ' + getGetOrdinal(dateFromDay) + ' ' + NewMonthFrom + ' ' + dateFromYear + '</span> <span>and</span> <span class="RC_end_date"> ' + getGetOrdinal(dateToDay) + ' ' + NewMonthTo + ' ' + dateToYear + '</span><a href="#" class="RC016_change_dates">Change dates</a></div>');

		courseLocationSearch
			.prepend('<div class="clearfix"><span>near to</span> <span class="RC016_course_search clearfix">' + searchVal + '</span><a href="#" class="RC016_change_location">Change location</a></div>');

		courseSearchSummary.html('There are ' + searchResultsNumber + ' course options nearest to <strong>' + searchVal + '</strong>, over a <strong>' + diffDays + ' day</strong> period. Expand your date range for more options');

		var courseBtn = $('.RC016_change_type'),
			courseDateBtn = $('.RC016_change_dates'),
			courseLocationBtn = $('.RC016_change_location'),
			selectWrap = $('.RC_select'),
			dateWrap = $('.form-item.form-item-date'),
			submitWrap = $('.course-search-container div.form-autoSubmit'),
			formMain = $('.course-search-form-main');


		$('.RC016_course_tgl').on('click', function (e) {
			e.preventDefault();
			sendEvent('RC016---Course Listing Usability', 'Change course button clicked', 'Button to the right of main header', true);
			if (formMain.hasClass('RC_reveal')) {
				selectWrap.slideUp();
				dateWrap.slideUp();
				submitWrap.slideUp();
				formMain.removeClass('RC_reveal');
			} 
			
			else {
				formMain.addClass('RC_reveal');
				selectWrap.slideDown();
				dateWrap.slideDown();
				submitWrap.slideDown();
			}
		});

		courseBtn.on('click', function (e) {
			e.preventDefault();
			sendEvent('RC016---Course Listing Usability', 'Change course button clicked', 'Button above Can\'t decide line', true);
			if (formMain.hasClass('RC_reveal')) {
				selectWrap.slideUp();
				dateWrap.slideUp();
				submitWrap.slideUp();
				formMain.removeClass('RC_reveal');
			} 
			
			else {
				formMain.addClass('RC_reveal');
				selectWrap.slideDown();
				dateWrap.slideDown();
				submitWrap.slideDown();
			}
		});

		courseDateBtn.on('click', function (e) {
			e.preventDefault();
			sendEvent('RC016---Course Listing Usability', 'Change dates button clicked', '', true);
			if (formMain.hasClass('RC_reveal')) {
				selectWrap.slideUp();
				dateWrap.slideUp();
				submitWrap.slideUp();
				formMain.removeClass('RC_reveal');
			} 
			
			else {
				formMain.addClass('RC_reveal');
				selectWrap.slideDown();
				dateWrap.slideDown();
				submitWrap.slideDown();
			}
		});

		courseLocationBtn.on('click', function (e) {
			e.preventDefault();
			sendEvent('RC016---Course Listing Usability', 'Change location button clicked', '', true);
			if (formMain.hasClass('RC_reveal')) {
				selectWrap.slideUp();
				dateWrap.slideUp();
				submitWrap.slideUp();
				formMain.removeClass('RC_reveal');
			} 
			
			else {
				formMain.addClass('RC_reveal');
				selectWrap.slideDown();
				dateWrap.slideDown();
				submitWrap.slideDown();
			}
		});

		$('.datepicker-icon').on('click', function(){
			$(this).closest('.form-item').css('overflow', '');
		});

		$('.form-btnAutoSubmit.button-primary.js-location-submit').on('click', function(){
			sendEvent('RC016---Course Listing Usability', 'Location Submit Clicked', '', true);
		});
	};
})();