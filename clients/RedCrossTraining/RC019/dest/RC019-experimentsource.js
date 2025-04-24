var _RC019 = (function () {
		var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
			// Triggers
			UC.poller([
			'body',
				function () {
					if (window.jQuery) return true;
				},
				function () {
					if (window.ga) return true;
				}
			], RC019, {
				timeout: 7000,
				multiplier: 0
		});
		function RC019() {
			var $ = window.jQuery;
					 
		$('body').addClass('RC019');
		// Full Story Integration 
		UC.poller([
			function() {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
				}
				], function () {
				window.FS.setUserVars({
				experiment_str: 'RC019',
				variation_str: 'Variation 1'
				});
		}, { multiplier: 1.2, timeout: 0 });


		/*-------------------------------
		Setting variable based on page url 
		---------------------------------*/

		var url = window.location.href,
			$pageType;

		if (url.indexOf('work') > -1) {
			$pageType = 'Workplace';
			console.log('work');
		} else if (url.indexOf('public') > -1) {
			$pageType = 'Public';
			console.log('public');
		}

		/*-------------------------------
		Change top content 
		---------------------------------*/
		var pageTitle = $('.main-content-wrap .main-content h1');

		$('.courses-page__body').html('<div class="rc18-topContent"/>');
		var newContent = $('.rc18-topContent');

		pageTitle.prependTo(newContent);
		pageTitle.text('All ' + $pageType + ' Courses');

		var courseFinder = $('<p class="rc18-coursefinder">Having difficulty finding the right course? Use our <a href="#">course finder</a></p>');
		courseFinder.appendTo(newContent);

		var topText;
		//Content based on page
		var topTextWorkplace = $([
			"<p>We are one of the UK's leading first aid training providers, with over 35 years' experience in delivering first aid at work courses. We train over 120,000 people every year and we are the chosen provider for over 100,000 UK customers, from small businesses to multinational enterprises.</p>",
			'<p>We offer scheduled first aid and health and safety courses (which can be delivered in-house for <a href="/What-we-do/Group-bookings.aspx">groups of up to 15 staff</a>), a selection of in-company only courses, and we can even provide bespoke training as part of our <a href="/What-we-do/key-account-management-service">Key Account management service</a>. Please <a href="/Contact-us">contact us</a> to discuss how we can meet your training needs.</p>',
		].join(''));

		var topTextPublic = $([
			'<p>We offer a range of first aid courses for people over the age of 16 who want to learn first aid for their everyday life, rather than as a requirement of their job.<p/>',
			'<p>They cover first aid for babies and children (from birth to puberty) and adults (puberty onwards) and are available at venues across the UK, or at a location to suit you if you have a <a href="/What-we-do/Group-bookings.aspx">group of up to 15 people.</a></p>',
			"<p>You don't need to have any previous experience; just a willingness to learn and take part in practical exercises (led by our friendly trainers) which build your confidence in dealing with emergency scenarios.</p>",
			'<span>* If you need first aid training to meet health and safety requirements, please see our <a href="/Courses/First-aid-at-work-courses-uk-mainland.aspx">workplace first aid courses.</a></span>',
		].join(''));

		if ($pageType === "Workplace") {
			topText = topTextWorkplace;
		} else if ($pageType === "Public") {
			topText = topTextPublic;
		}

		topText.appendTo(newContent);

		/*-------------------------------
		Hardcode first 6 courses - module based
		---------------------------------*/
		var popularCourseBlock = $('<div class="rc19-popular-wrap"><h3>Most Popular Courses</h3></>');
		popularCourseBlock.insertAfter('.courses-page__body');

		var popularCourse = {
			workplaceCourse: [
				{
					title: 'First Aid At Work',
					bulletPoints: '<li>bulletpoint</li><li>bulletpoint</li><li>bulletpoint</li>',
					time: 'time',
					duration: 'duration',
					findCourses: '#',
					learnMore: '#',
				},
				{
					title: 'First Aid At Work',
					bulletPoints: '<li>bulletpoint</li><li>bulletpoint</li><li>bulletpoint</li>',
					time: 'time',
					duration: 'duration',
					findCourses: '#',
					learnMore: '#',
				},
				{
					title: 'First Aid At Work',
					bulletPoints: '<li>bulletpoint</li><li>bulletpoint</li><li>bulletpoint</li>',
					time: 'time',
					duration: 'duration',
					findCourses: '#',
					learnMore: '#',
				},
				{
					title: 'First Aid At Work',
					bulletPoints: '<li>bulletpoint</li><li>bulletpoint</li><li>bulletpoint</li>',
					time: 'time',
					duration: 'duration',
					findCourses: '#',
					learnMore: '#',
				},
				{
					title: 'First Aid At Work',
					bulletPoints: '<li>bulletpoint</li><li>bulletpoint</li><li>bulletpoint</li>',
					time: 'time',
					duration: 'duration',
					findCourses: '#',
					learnMore: '#',
				},
				{
					title: 'First Aid At Work',
					bulletPoints: '<li>bulletpoint</li><li>bulletpoint</li><li>bulletpoint</li>',
					time: 'time',
					duration: 'duration',
					findCourses: '#',
					learnMore: '#',
				}
			],
			publicCourse: [
				{
					title: 'First Aid Public',
					bulletPoints: '<li>bulletpoint</li><li>bulletpoint</li><li>bulletpoint</li>',
					time: 'time',
					duration: 'duration',
					findCourses: '#',
					learnMore: '#',
				},
				{
					title: 'First Aid Public',
					bulletPoints: '<li>bulletpoint</li><li>bulletpoint</li><li>bulletpoint</li>',
					time: 'time',
					duration: 'duration',
					findCourses: '#',
					learnMore: '#',
				},
				{
					title: 'First Aid Public',
					bulletPoints: '<li>bulletpoint</li><li>bulletpoint</li><li>bulletpoint</li>',
					time: 'time',
					duration: 'duration',
					findCourses: '#',
					learnMore: '#',
				},
				{
					title: 'First Aid Public',
					bulletPoints: '<li>bulletpoint</li><li>bulletpoint</li><li>bulletpoint</li>',
					time: 'time',
					duration: 'duration',
					findCourses: '#',
					learnMore: '#',
				},
				{
					title: 'First Aid Public',
					bulletPoints: '<li>bulletpoint</li><li>bulletpoint</li><li>bulletpoint</li>',
					time: 'time',
					duration: 'duration',
					findCourses: '#',
					learnMore: '#',
				},
				{
					title: 'First Aid Public',
					bulletPoints: '<li>bulletpoint</li><li>bulletpoint</li><li>bulletpoint</li>',
					time: 'time',
					duration: 'duration',
					findCourses: '#',
					learnMore: '#'
				}
			]
		};

		var coursesObj;
		var url = window.location.href;

		if ($pageType === "Workplace") {
			coursesObj = popularCourse.workplaceCourse;
		} else if ($pageType === "Public") {
			coursesObj = popularCourse.publicCourse;
		}

		$.each(coursesObj, function () {
			var $eachSlide = $([
				'<div class="rc19-popularcourse">',
				'<h3>' + this.title + '</h3>',
				'<p class="rc19-suit">Suitable for:</p>',
				'<ul class="rc19-coursepoints">',
				this.bulletPoints,
				'<li class="rc19-time">' + this.time + '</li>',
				'<li class="rc19-duration">' + this.duration + '</li>',
				'</ul>',
				'<div class="rc19-courseLinks">',
				'<a class="rc19-courseLink" href="' + this.findCourses + '">Find Courses</a>',
				'<a class="rc19-courseLearnMore" href="' + this.learnMore + '">Learn More</a>',
				'</div>',

				'</div>'
			].join(''));

			$eachSlide.appendTo('.rc19-popular-wrap');
		});

		/*-------------------------------
		Other courses
		---------------------------------*/
		$('<h3>All other courses</h3>').prependTo('.course-search-container');

		$('.table-responsive tr').each(function () {
			var otherCourseLink = $(this).find('.course-col-price a').attr('href');
			var otherCourseLearnMore = $(this).find('.course-result-name a').attr('href');

			var otherCoursebuttons = $(['<div class="rc19-othercourse-buttons">',
				'<a class="rc19-othercourseLink" href="' + otherCourseLearnMore + '">Learn More</a>',
				'<a class="rc19-othercourseLearnmore" href="' + otherCourseLink + '">Find Courses</a>',
				'</div>'
			].join('')).appendTo(this);

			var othercourseDetails = $(this).find('td');
			$(othercourseDetails).wrapAll('<div class="rc19-othercoursedetails"/>');
		});


			}
})();
	