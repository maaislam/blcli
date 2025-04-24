var _RC019 = (function () {
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
		// Triggers
		UC.poller([
		'body',
		'.course-col-price',
		'.main-content-wrap .main-content h1',
		'.courses-page__body',
		'.course-search-container',
		'.table-responsive',
		'.course-search-results',
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
		  var trackerName;
function sendEvent(category, action, label, nonInteractionValue, dimensionValue, dimensionName) {
	var fire = function (tracker) {
		var options = {};
		options.nonInteraction = nonInteractionValue;
		if (dimensionValue && dimensionName) {
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
	  
	$('body').addClass('RC019v2');
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
		//console.log('work');
	} else if (url.indexOf('public') > -1) {
		$pageType = 'Public';
	}
	/*-------------------------------
	Change top content 
	---------------------------------*/
	var pageTitle = $('.main-content-wrap .main-content h1');
	$('.courses-page__body').html('<div class="rc18-topContent"></div>');
	var newContent = $('.rc18-topContent');
	pageTitle.prependTo(newContent);
	pageTitle.text('All ' + $pageType + ' Courses');
	var topText;
	//Content based on page
	var topTextWorkplace = $([
		"<p>Over 100,000 UK businesses trust us with their first aid training needs. For more than 35 years we have worked with companies of all types to reduce risks and save lives in the workplace.</p>",
		'<ul class="rc19-allbullets">',
			'<li>35 years’ experience of providing quality first aid at work training.</li>',
			'<li>Recognised by the Health and Safety Executive as a leading training provider.</li>',
			'<li>Save money and time with <a href="https://www.redcrossfirstaidtraining.co.uk/What-we-do/Group-bookings.aspx">group training</a> on your premises.</li>',
			'<li>Explore bespoke training options with our account management service.</li>',
			'<li>Ongoing support for delegates via our Safe Hands online community.</li>',
		'</ul>'	
	].join(''));
	var topTextPublic = $([
	 '<p>Your help in an emergency could save a life. First aid training will give you the confidence to help your child, friends, family or even a stranger when they need it.</p>',
	  '<p class="rc19-why">Why choose Red Cross Training</p>',
		'<ul class="rc19-allbullets">',
			'<li>Courses available at venues across the UK, including in the evening and at weekends.</li>',
			'<li>Learn in an open, friendly environment with qualified, externally accredited trainers.</li>',
			'<li>You don’t need to have any previous experience, just a willingness to take part.</li>',
			'<li>No written exam, just practical exercises to help you practice and remember the skills.</li>',
			'<li>Discounts for group bookings of up to 15 people at a location of your choice.</li>',
		'</ul>',
	  '<p>*If you need first aid training to meet health and safety requirements, please see our <a href="https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland.aspx">workplace first aid courses.</a></p>'
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
	var popularCourseBlock = $('<div class="rc19-popular-wrap"><h3>Most popular courses</h3></>');
	popularCourseBlock.insertAfter('.courses-page__body');
	var popularCourse = {
		workplaceCourse: [
			{
				courseId: 'workcourse1',
				title: 'First aid at work',
				mainpoint1: '<span class="rc19-positive"></span>Train at our venues, in-house or at a location of your choice',
				mainpoint2: '<span class="rc19-positive"></span>Certified for professional use ',
				bulletPoints: '<li>Become a qualified first aider (<a href="https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-legal-requirements.aspx">aimed at high risk workplaces</a>)</li><li>Covers accidents and emergencies which could happen in the workplace</li><li>Includes a training pack of materials to help learners practice their skills</li>',
				time: '09:00 - 17:00',
				  price: '£279 ex VAT',
				duration: '3 days',
				findCourses: '/Where-we-train/EventsSearch.aspx?courseSCId=6c5cc743-d456-4faf-8694-5bb87c8556e5&productId=306-ct&type=Workplace&fromdate=',
				learnMore: '/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/First-aid-at-work.aspx'
			},
			{
			  courseId: 'workcourse2',
				title: 'Emergency first aid at work',
				mainpoint1: '<span class="rc19-positive"></span>Train at our venues, in-house or at a location of your choice',
				mainpoint2: '<span class="rc19-positive"></span>Certified for professional use ',
				bulletPoints: '<li>Become a qualified first aider (<a href="https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-legal-requirements.aspx">aimed at low risk workplaces</a>)</li><li>Covers accidents and emergencies which could happen in the workplace</li><li>Includes a training pack of materials to help learners practice their skills</li>',
				time: '09:00 - 17:00',
				  price: '£126 ex VAT',
				duration: '1 day',
				findCourses: '/Where-we-train/EventsSearch.aspx?courseSCId=536928a6-fe53-44f3-aaa7-6ba10d73b44a&productId=305-ct&type=Workplace&fromdate=',
				learnMore: '/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Emergency-first-aid-at-work.aspx'
			},
		  {
			courseId: 'workcourse4',
				title: 'First aid at work requalification',
				mainpoint1: '<span class="rc19-positive"></span>Train at our venues, in-house or at a location of your choice',
				mainpoint2: '<span class="rc19-positive"></span>Certified for professional use ',
				bulletPoints: '<li>Refresher course for existing workplace first aiders</li><li>Must have previously attended a first aid at work course.</li>',
				time: '09:00 - 17:00',
				  price: '£199 ex VAT',
				duration: '2 days',
				findCourses: '/Where-we-train/EventsSearch.aspx?courseSCId=bc197a39-01f9-45ad-a46d-dc27690d0043&productId=307-ct&type=Workplace&fromdate=',
				learnMore: '/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/First-aid-at-work-requalification.aspx'
			},
			{
				courseId: 'workcourse3',
				title: 'Paediatric first aid',
				mainpoint1: '<span class="rc19-positive"></span>Train at our venues, in-house or at a location of your choice',
				mainpoint2: '<span class="rc19-positive"></span>Certified for professional use ',
				bulletPoints: '<li>For child carers in any professional setting.</li><li>Recommended for the Early Years Foundation Stage (EYFS).</li><li>Meets Childcare Registration requirements.</li>',
				time: '09:00 - 17:00',
				  price: '£126 ex VAT',
				duration: '2 days',
				findCourses: '/Where-we-train/EventsSearch.aspx?courseSCId=01235a45-e7a7-4377-a284-c5f92048136a&productId=540-ct&type=Workplace&fromdate=',
				learnMore: '/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Paediatric-first-aid.aspx'
		  }
		],
		publicCourse: [
			{
				courseId: 'publiccourse1',
				title: 'First aid for baby and child',
				mainpoint1: '<span class="rc19-positive"></span>Available at our venues or as a <a href="https://www.redcrossfirstaidtraining.co.uk/What-we-do/Group-bookings.aspx">group booking</a> at a location of your choice',
				mainpoint2: '<span class="rc19-negative"></span>Not certified for professional use',
				bulletPoints: '<li>Learn first aid for babies and children aged from birth to puberty.</li><li>Covers a range of childhood emergency situations.</li><li>You don’t need any previous experience, just a willingness to learn.</li>',
				time: '10:00 - 14:30',
				  price: '£45',
				duration: '4 hours',
				findCourses: '/Where-we-train/EventsSearch.aspx?courseSCId=03e3bf08-7d24-4fda-a3ae-fae0254a84b5&productId=358-ct&type=General%20Public&fromdate=',
				learnMore: '/Courses/First-aid-public-courses/First-aid-for-baby-and-child.aspx'
			},
			{
				courseId: 'publiccourse2',
				title: 'First aid for adult',
				mainpoint1: '<span class="rc19-positive"></span>Available at our venues or as a <a href="https://www.redcrossfirstaidtraining.co.uk/What-we-do/Group-bookings.aspx">group booking</a> at a location of your choice',
				mainpoint2: '<span class="rc19-negative"></span>Not certified for professional use',
				bulletPoints: '<li>Learn first aid for adults aged from puberty upwards.</li><li>Covers a range of emergency situations, from illnesses to injuries.</li><li>You don’t need any previous experience, just a willingness to learn.</li>',
				time: '10:00 - 14:30',
				  price: '£45',
				duration: '4 hours',
				findCourses: '/Where-we-train/EventsSearch.aspx?courseSCId=5ae41926-0d16-4509-a417-5ee27c8aa8a7&productId=382-ct&type=General%20Public&fromdate=',
				learnMore: '/Courses/First-aid-public-courses/First-aid-for-adult.aspx'
			},
			{
				courseId: 'publiccourse3',
				title: 'First aid for baby and child (evenings)',
				mainpoint1: '<span class="rc19-positive"></span>Available at our venues or as a <a href="https://www.redcrossfirstaidtraining.co.uk/What-we-do/Group-bookings.aspx">group booking</a> at a location of your choice',
				mainpoint2: '<span class="rc19-negative"></span>Not certified for professional use',
				bulletPoints: '<li>Designed with parents in mind to fit around your busy life.</li><li>Covers a range of childhood emergency situations.</li>',
				time: '19:00 - 21:00',
				  price: '£45',
				duration: '4 hours over 2 days',
				findCourses: '/Where-we-train/EventsSearch.aspx?courseSCId=5ede371a-eb4d-4c8d-bb84-fe9d3b2758dc&productId=359-ct&type=General%20Public&fromdate=',
				learnMore: '/Courses/First-aid-public-courses/First-aid-for-baby-and-child-evening.aspx'
			},
			{
				courseId: 'publiccourse4',
				title: 'First aid for adult (evenings)',
				mainpoint1: '<span class="rc19-positive"></span>Available at our venues or as a <a href="https://www.redcrossfirstaidtraining.co.uk/What-we-do/Group-bookings.aspx">group booking</a> at a location of your choice',
				mainpoint2: '<span class="rc19-negative"></span>Not certified for professional use',
				bulletPoints: '<li>For anyone who finds it difficult to attend a course during the day.</li><li>Covers a range of emergency situations, from illnesses to injuries</li>',
				time: '19:00 - 21:00',
				  price: '£45',
				duration: '4 hours over 2 days',
				findCourses: '/Where-we-train/EventsSearch.aspx?courseSCId=272f96fc-d7d0-4499-8b7e-d7af23bbaa2b&productId=383-ct&type=General%20Public&fromdate=',
				learnMore: '/Courses/First-aid-public-courses/first-aid-for-adult-evenings.aspx'
			}
		],
	};
	var coursesObj;
	var url = window.location.href;
	if ($pageType === "Workplace") {
		coursesObj = popularCourse.workplaceCourse;
	} else if ($pageType === "Public") {
		coursesObj = popularCourse.publicCourse;
	}
	$.each(coursesObj, function () {
		var $eachCourse = $([
			'<div class="rc19-popularcourse" id="'+this.courseId+'">',
				'<h3>' + this.title + '</h3>',
			  '<div class="rc19-popImageheader"></div>',
				'<div class="rc19-popcontent">',
				'<div class="rc19-infobar">',
					  '<li class="rc19-duration">'+this.duration + '</li>',
					 '<li class="rc19-time">'+ this.time + '</li>',
					'<li class="rc19-price">From '+ this.price + '</li>',
				  '</div>',
				  '<div class="rc19-mainpoints">',
				  '<span class="rc19-main-bulletpoint">',
					  this.mainpoint1,
				  '</span>',
				  '<span class="rc19-main-bulletpoint">',
					  this.mainpoint2,
				  '</span>',
				  '</div>',
				  '<ul class="rc19-coursepoints">'+this.bulletPoints+'</ul>',
				'<div class="rc19-courseLinks">',
				  '<a class="rc19-courseLink" href="' + this.findCourses + '">BOOK</a>',
				  '<a class="rc19-courseLearnMore" href="' + this.learnMore + '">More information</a>',
			  '</div>',
			  '<div class="rc19-smallpriceText">*Prices quoted for UK mainland</div>',
			'</div>',
			'</div>'
		].join(''));
		$eachCourse.appendTo('.rc19-popular-wrap');
	});
	  
	/*-------------------------------
	Other courses
	---------------------------------*/
	var otherCourseTitle;
	  
   var otherCourseTitle = $('.main-container .table-responsive:first thead tr:first .course-col-name');
	  
   if ($pageType === "Workplace") {
		otherCourseTitle.text('Scheduled courses');
   } else if ($pageType === "Public") {
		otherCourseTitle.text('Related courses');
	}
	  
	
	$('.main-container .table-responsive tr').each(function () {
		var otherCourseLink = $(this).find('.course-col-price a').attr('href');
		var otherCourseLearnMore = $(this).find('.course-result-name a').attr('href');
		var otherCoursebuttons = $(['<div class="rc19-othercourse-buttons">',
			'<a class="rc19-othercourseLink" href="' + otherCourseLink + '">BOOK</a>',
			'<a class="rc19-othercourseLearnmore" href="' + otherCourseLearnMore + '">More information</a>',
			'</div>'
		].join('')).appendTo(this);
		var othercourseDetails = $(this).find('td');
		$(othercourseDetails).wrapAll('<div class="rc19-othercoursedetails"></div>');
	  
	});
	  
	  
	 /*-------------------------------
	Change related courses on public to the same as RC010
	---------------------------------*/
	if ($pageType === "Public") {
	  
	  var $newRelatedcourse = $([
		 '<div class="rc19-relatedCourses">',
			'<h2>Related courses</h2>',
		 '</div>'
	   ].join(''));
	  
	  $('.course-search-container').replaceWith($newRelatedcourse);
	  
	  var relatedCourses = [
		['Emergency paediatric first aid','https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Emergency-paediatric-first-aid.aspx','Designed for newly qualified level 2 / 3 childcare staff.'],
		['Paediatric first aid','https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Paediatric-first-aid.aspx','This course covers first aid for babies and children for people who care for children professionally.'],
	  ];
	  
	  $.each(relatedCourses,function(){
		var relatedTitle = this[0],
			relatedLink = this[1],
			relatedDesc = this[2];
		$(['<div class="rc19-relatedcourse">',
			   '<a href="'+relatedLink+'">',
				   relatedTitle,
				'</a>',
			 '<div class="rc19-relateddescription">',
				  '<p>'+relatedDesc+'</p>',
			 '</div>',
		   '</div>'].join('')).appendTo('.rc19-relatedCourses');
	  });
	}
	  
	  
	  /*----------
   Change all workplace in company course button text to enquire
	---------------------------------*/
	if ($pageType === "Workplace") { 
	  var courseNameText = $('.table-responsive:last');
	  courseNameText.each(function(){  
		$(this).find('.rc19-othercourseLink').text('ENQUIRE');
	  });
	}
	  
	 /*-------------------------------
	Add trustpilot
	---------------------------------*/ 
		var revTitle,
		  revReview,
		  trustPilotreviews = 'https://www.trustpilot.com/review/redcrossfirstaidtraining.co.uk',
		  trustPilotlogo = '//useruploads.visualwebsiteoptimizer.com/useruploads/286844/images/73d3257da45ea5ef6e6d997d5296d3f3_trustpilot-logo-design_(1).png';
	  
	 if ($pageType === "Workplace") {
		revTitle = 'Amazing teacher';
		  revReview = '"The teacher was amazing, the course was fun, easy to understand, a lot of useful information which you can use at work and outside work."';
	 } else if ($pageType === "Public") {
		revTitle = 'Superb Trainer and Excellent Course';
		revReview = '"Recommend this course without hesitation. Totally practical and wonderfully delivered."';
	}
		  
	   var trustPilot = $(['<div class="rc19-trustPilot">',
							  '<h3>'+revTitle+'</h3>',
							'<span class="rc19-revText">'+revReview+'</span>',
							  '<a href="'+trustPilotreviews+'"><img src="'+trustPilotlogo+'"/>See All Reviews</a>',
						  '</div>'
						 ].join(''));
	  
	  trustPilot.appendTo('.rc18-topContent');
	  
	/*-------------------------------
	Move Tabs on all courses page & change all course title
	---------------------------------*/
	  var tabs = $('#main_0_contentmain_0_WpPublicChooser');
	  if(tabs.length > 0){
		tabs.insertAfter('.course-search-container h3');
	  }
	 
	  if ($pageType === "Workplace") {
		$('.rc18-topContent h1').text('All workplace courses');
	  }
	  if ($pageType === "Public") {
		$('.rc18-topContent h1').text('All public courses');
	  }
	  
	  
	  
	 /*-------------------------------
	Events
	---------------------------------*/ 
	/*Popular course event*/
	  var popularCourseFindevent,
		  popularCourseLearnmore;
	  
	  var pollerOpts = { timeout: 7000, multiplier: 0 };
		UC.poller(['.rc19-popularcourse'], function() { 
		$('.rc19-popularcourse').each(function(){
		  $(this).find('.rc19-courseLink').click(function(){
			if(!popularCourseFindevent){
			   sendEvent('RC019', 'click', 'RC019 - All courses redesign - User clicked find courses on popular course', true);
				  popularCourseFindevent = true;
			   } 
		  });
		  $(this).find('.rc19-courseLearnMore').click(function(){
			if(!popularCourseLearnmore){
			  sendEvent('RC019', 'click', 'RC019 - All courses redesign - User clicked learn more on popular course', true);
			  popularCourseLearnmore = true;
			} 
		  });
	   });
	}, pollerOpts);
	  
	/*Other courses event*/
	  var otherCoursefindevent,
		  othercourseLearnevent;
	  UC.poller(['.table-responsive'], function() { 
		$('.table-responsive tr').each(function(){
		  $(this).find('.rc19-othercourseLink').click(function(){
			if(!otherCoursefindevent){
			  sendEvent('RC019 V2', 'click', 'RC019 - All courses redesign - User clicked find courses on all courses', true);
			  otherCoursefindevent = true;
			} 
		  });
		  $(this).find('.rc19-othercourseLearnmore').click(function(){
			if(!othercourseLearnevent){
			  sendEvent('RC019 V2', 'click', 'RC019 - All courses redesign - User clicked learn more on all courses', true);
			  othercourseLearnevent = true;
			} 
		  });
		});
	  }, pollerOpts);
	  
	  /*-------------------------------------
	  - Course finder from RC017
	  --------------------------------------*/
	  'use strict';
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		// ------------------------------------------
		// IMPORTANT!!!!
		// _____________________________________
		//
		// DO NOT EDIT THIS TEST DIRECTLY IN VWO
		// _____________________________________
		//
		// Modify the source in the ab-test-sandbox repo
		// since it uses ES6 and is easier to work with there.
		// ------------------------------------------
		var $ = window.jQuery;
		/**
		 * General Settings
		 */
		var settings = {
			'preloader': 'data:image/gif;base64,R0lGODlhZAANAOMAAHx+fNTS1JyenOzq7IyOjPz6/ISChKSipPz+/P///wAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCQAJACwAAAAAZAANAAAEyzDJSau9OOvNu/9gKI5kaZ7ohBQFYq3ty7oVTFO2HNezfqs93k4VEAgCP0TxmFwicc6m8UmcSplQaxZb5UoGBACAMKCAxWRzeFyenNlqdPu7Trvr88TbTpfH4RMBBgAGBgEUAYSEh4GKhoiOjBKJhI+NlZIJlIWZm5aTYpyQmH98enileXuqqHd+roB9saevsqZKWhMFURS7uRK+Xgm4wsRUEsZXx8O8XcvDLAUW0dIV1NPR2Cza1b3Z1t/e2+DjKebn6Onq6+zt7hYRACH5BAkJABYALAAAAABkAA0AhAQCBISChMzOzExKTOzq7BweHKSipNza3Hx6fPT29CwuLLSytPz+/AwODIyOjNTW1ExOTNze3Hx+fPz6/DQyNLS2tP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAX+oCWOZGmeaKqubMsyScK4dG3fLvMglBJEM5xwSEwdFIAkgPIgMSaToBMqHT2jpmtVpM1SvdhSV/wVTQZK5WDCfRgMj6ruHXe64fJ73arP0/14dn+CgRYCBWlJBQIiBA4SEg4EJI6QkpSPkZMjlZqYlpuNmZeco6EWnaSioCIVDYkADQsiDwEBEgFNIwe2uLoivLe5JLy4w7vCx8DJvxbFts3Pys7MIoewi6sBqqimn56lrOHgq+Td4uXcqZsTELADCW2DfPPyhfZ7+ID5FnP3/X0I5TuSRkGzK2zIhJmy0AqUhAwhOoQCRiKXhxXtIFCgAAG/IiBD3pgQw6LIkygGU6pcaSMEACH5BAkJAB0ALAAAAABkAA0AhAQCBISChNTS1ERCROzu7CQiJKSipGxubNza3Pz6/CwuLLSytHx6fAwODJSSlExOTAQGBISGhNTW1ERGRPT29CwqLKSmpHRydNze3Pz+/DQyNLS2tHx+fP///wAAAAAAAAX+YCeOZGmeaKqubOuiGUVlb23feIZZBkaLGUlAown4cMikMmNQQCAKww9RAVgBGgkpk0j8tt3viOs1kcXAsFldOq/LI0HjCmgIOpQH3fpIACUWFhJiQYGDW4CChImHY4yLhpCKiJEjF3sAFx0CBZgFdx0EDhwBDgQkoqSmqA4Mpacjoq6rsa2vrLOwIrK3tbkjA5gTHRtzew0LIggBHKQIJMscrs8j0dPQzNfV2QHUytzeHdbd2NLkIgeYB5ude5+7oxy08AzyuqHx8/jN+qn2rPzu+euXT5ccOnbw6NkzwU+HDAJ4NPpTaUQCQAYmPoyYkRBHjRAlehS55eOXBAY6KkAAEMWhhCpXFIRzU6JLlzdoHrIBA4dnTpo+22AwYADBlyAMFCjgYFSJ06dQE8hwCLWq1atYs9YIAQAh+QQJCQAjACwAAAAAZAANAIUEAgSEgoTU0tREQkQkIiTs7uykoqQUEhTc3tx0cnQsLiy0trT8+vwMDgyUkpTc2txMTkysqqwcGhzk5uR8fnw0NjQEBgSEhoTU1tRERkQsKiz09vSkpqQUFhTk4uR0dnQ0MjS8urz8/vz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/sCRcEgsGo/IpHLJbDqfQ9FmI4Jar9ijqFoUITgcBHckwgRAlYtnnG27jxvOYMDZDBkGkMUCMnAfGgCCACAPRCIMDGxCiIpGjYtkiZGQj5OWjncXFoMXDEICDYMADQIjGxCjghCfZBgRHA9sIg8cERiztbe5triHur5RwLy7QxMSoxIeQh+qAB8jAgTOBKYjBQ4UFA4FRNja3N7Z291D3+Ti4OVC5+Hm4+4jD86GIwPOGSMhoqoNC0IPLmi7UA9gAG0BCsoTSCEhkYAIFUJsKJGhwyETL47w0GHUgQlCEjhLMALDNFXV2MFbdy1bgHgtG8L89pIlzZkuccpcx4DCaCgKrQRwGlTqVCpVEOy4imBA1i8DHIIxegBVKhmqUXNV1WrAahkOXdlsMDDHgFIyBhTsUWCgFYZAgxQoTETFSKJEmFodupsXU6S7kSQ9+tJ0TBkKCkBQEPOmsWM3DKbofUy5suXLl4MAACH5BAkJACMALAAAAABkAA0AhQQCBISChNTS1ERCRCQiJOzu7KSipBQSFNze3HRydCwuLLS2tPz6/AwODJSSlNza3ExOTKyqrBwaHOTm5Hx+fDQ2NAQGBISGhNTW1ERGRCwqLPT29KSmpBQWFOTi5HR2dDQyNLy6vPz+/P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb+wJFwSCwaj8ikcslsOp9N0WYjglqv2KOoWhQhOBwEdyTCBECVi2ecbWdFDAZ7tOEMBpzNkGEAWSwgBlwPGgCGACAPRHByRoxzZHGQj46SlY2LDxwRGGMMFxaHFwxCAg2HAA0CdBCohhCkZBgRHA9sIpqct7mdmZu9Q7i/u8NEBQ4UFA4FQxMSqBIeQh+uAB8jAgTVBKsjx8nLxsjKzEPf5OLg5ULn4ebj7kIPF8kBivLV9wPVGSMhp64aLJBHj4I9IvPq3SOoEGHBg0MSGlw4QiJEdsgCxPPQAdWBCUISVEswAoM2V9wwqkuncZ23jPFeGoz5rSXLmLgMcAA2ggFlBVQUYgkIdUgVq2oQ9MiKYIAnmQcGmu7S6TTnzqlSF2HgkHVRnFhDNhi4Y0ApGQMK/igwEAtDoUMKKH6FNNdI3SJ3ieTdYwkKHEdfDNgKhoGCAhAUxLhZzLgxgylgG0ueTLly4yAAIfkECQkAIwAsAAAAAGQADQCFBAIEhIKE1NLUREJEJCIk7O7spKKkFBIU3N7cdHJ0LC4stLa0/Pr8DA4MlJKU3NrcTE5MrKqsHBoc5ObkfH58NDY0BAYEhIaE1NbUREZELCos9Pb0pKakFBYU5OLkdHZ0NDI0vLq8/P78////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv7AkXBILBqPyKRyyWw6n9CjaLMRRa/Y7FBkLYoQHA6iOxJhAqDKxUPWupEiBqMtjM+LG85gwNkMGQYgFhYgBl0PGgCKACAPRHZ0ZXKRkEaVXpNeDxwRGG0im51kDBcWixcMQgINiwANAiMbEK2KEKllGBEcD5+hno++vZy/W8FEBQ4UFA4Fx8nLzUITEq0SHkIftAAfIwIE2gSwI8jKzM7l0ULk0OfsQ+vmQw8XygGO8vQB9vLa9wPaGUaEYEWrwQIh8+rdQ0iPwj58CokkdLhwxMSH6pIFiJcR3RAPHVodmCAkgbYEIzB8oxWuo7uOG9ON08hxpsOa5GICM8CBWGidBzx9MqDQisItAaYWvYo1ixYEP7giGPBZBujUXkGxXn2EgcPWR3Jugb1DZIOBPQagljGgYJACA7cwJFqkoGLYSHeN5C2yl0jfN5IsgTHAawsGCgpAUBgDuLFjLAyoiH1MubLly0WCAAAh+QQJCQAjACwAAAAAZAANAIUEAgSEgoTU0tREQkQkIiTs7uykoqQUEhTc3tx0cnQsLiy0trT8+vwMDgyUkpTc2txMTkysqqwcGhzk5uR8fnw0NjQEBgSEhoTU1tRERkQsKiz09vSkpqQUFhTk4uR0dnQ0MjS8urz8/vz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/sCRcEgsGo/IpHLJbDqf0KhosxFFr9jsUGQtihAcDqI7EmECoMrFQ9ZmRQxGWwiXG+vzDWcw4GyGDAYgFhYgBl0PGgCLACAPRHh3cXNlk5J2kA8cERhtIpqcnqCdgBcWjBcMQgINjAANAiMbEK6LEKplGBEcD6KbpFujvqFEBQ4UFA4FxcfJy0PGyMpDExKuEh5CH7UAHyMCBNwEsSPRzszSz0Lm09DN7UIPF8gBj0PyFAH1RPj69iMPuNkbwC3DiBCtajVYEG9evn8AHe67JxEivofoAsAr904dx3RDPHRwdWCCkATcEozAEK7WuHUdM26MptEjzY2fDHAARueBZ06eZXzuJMOAgisKuAScYgRLFq1aEP7kimAAaM6qogxghYSBw1ZIcXCBxUQkbB4DfAxILWNAASEFBnBhUMRIAUSzRvAW0VvWkhsncO6AMdBrCwYKCkBQGPO3sWM3DKiIfUy5suXLQQAAIfkECQkAIwAsAAAAAGQADQCFBAIEhIKE1NLUREJEJCIk7O7spKKkFBIU3N7cdHJ0LC4stLa0/Pr8DA4MlJKU3NrcTE5MrKqsHBoc5ObkfH58NDY0BAYEhIaE1NbUREZELCos9Pb0pKakFBYU5OLkdHZ0NDI0vLq8/P78////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv7AkXBILBqPyKRyyWw6n9CoUrTZiKTYbFbEMIoQHA7iKhRhAqDKxUPWLrmM9hAuLzPi3nt9wxkMOBtzBiAWFiAGZA8aAIwAIA9EdHl4RZKRDxwRGHIimJqcnpuXmaJCDBcWjRddIwINjQANAiMbELCMEKxmERwPoKS/n0QFDhQUDgXDxcfJQ8TGyMrQzSMTErASHkIftwAfrQTdBLMjz8zS587L0UMPF8YBkO3vAfFE7hT18kL4+u3d8gZ0yzAixKtbDRbwe5dv3wh8De8xtKcuHzsh5i6WW0dt47QhHjrAOjBBSIJuCUZgCHdrHEaO0gJofCazYycDHEqVeYBT52eImzlB9WzDgAIsCqwEpGoki5atWxAC/cQQwYDPm1Y5YeCQtdIdVpH0GPlaZwTZIhsM+DEg9acBBYUUGGCFYVEjBQ7PFtFLhK8bN1y8gDHgaw4GCgpAUBjzt7FjNwyqgH1MubLlLEEAACH5BAkJACMALAAAAABkAA0AhQQCBISChNTS1ERCRCQiJOzu7KSipBQSFNze3HRydCwuLLS2tPz6/AwODJSSlNza3ExOTKyqrBwaHOTm5Hx+fDQ2NAQGBISGhNTW1ERGRCwqLPT29KSmpBQWFOTi5HR2dDQyNLy6vPz+/P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb+wJFwSCwaj8ikcslsOp/QqFQo2mxE06w2KmIYRQgOB4GlYgKgysVT3nYZ7eE7TmXAv3b6aF7ccAYDHBtyBiAWFiAGZQ8aAI4AIA9EfEWUcg8cERhxIpianJ6bk6GgmaJCDBcWjxdeIwINjwANAiMbELKOEK4iGBEcD6WfRAUOFBQOBcTGyMpDxcfJy9HOQtDNQx4SshIeQh+5AB+vBOEEtSPX0s/M60IPF8cBkkPwFAHzRPb49O/x/Pri3ev3IBy9AeEyjAgRK1eDBf7k9RvxIIDEaQHcpWtXbSO1adjY3XPnoYOsAxOEJAiXYASGcrnOWeOIUWMnAxxOUXmAU+djHp45QfUUGnQIAwqyKLgSsOoRLVu4ckEYtMeXAZ83i06y42rrnSJc9YQ1MpbIBgOADFDdY0DBIQUGXGFo9EjBxLJE8G7Zm6TLlzAGgsnBQEEBCApk+CpePIWBla6MI0uebCQIACH5BAkJACMALAAAAABkAA0AhQQCBISChNTS1ERCRCQiJOzu7KSipBQSFNze3HRydCwuLLS2tPz6/AwODJSSlNza3ExOTKyqrBwaHOTm5Hx+fDQ2NAQGBISGhNTW1ERGRCwqLPT29KSmpBQWFOTi5HR2dDQyNLy6vPz+/P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb+wJFwSCwaj8ikcslsOp/QqJQp2mxE06w2KmIYRQgOB4EVijABUOXiKVMZDPewG//C5ea7vV6k4zccAwMcG3MGIBYWIAZlDxoAkAAgD0R+fQ8cERhyIpianJ6blaGgmaJzpEMMFxaRF14jAg2RAA0CIxsQtJAQsGcRHA9yBQ4UFA4FRMTGyMrFx8lDy9DOzNFC081CHhK0Eh5CH7sAH7EE4wS3I9nXIw8XxgGUQ+8UAfJE9ffzQvr49PDs8XMX8J+7cfMGjMswIsSsXQ0W9Cs4cFkAbdieYVynsR27ahc9Fgs5xEMHWgcmCEkwLsEIDOd2pctobZQBDqfMPLiZc0RiJ56ggNrEGZSoKgq0KMAS0CqSLVy6dkEo5BNDBAM9fcKBVUlPka14RoA1Mvar1yEbDAgyQNWnAQWJFBiAheFRJAUDy27Zm6XLlzAGhM3BQEEBCApk+CpePIWBFa6MI0teHAQAIfkECQkAIwAsAAAAAGQADQCFBAIEhIKE1NLUREJEJCIk7O7spKKkFBIU3N7cdHJ0LC4stLa0/Pr8DA4MlJKU3NrcTE5MrKqsHBoc5ObkfH58NDY0BAYEhIaE1NbUREZELCos9Pb0pKakFBYU5OLkdHZ0NDI0vLq8/P78////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv7AkXBILBqPyKRyyWw6n9CodDoUbTYiqnbrFDGMIgSHg8gKRZgAqHLxmM8Mxrsan8Pl4HoeX/TyiX52GxwDAxwbVQYgFhYgBmYPGgCTACAPVQ8cERhzIpmbnZ+cgKKhmqOYp6agQwwXFpQXXyMCDZQADQIjGxC3kxCzBQ4UFA4FRMLExsjDxcdDyc7Mys9C0cvQzdgjHhK3Eh5CH74AH7QE5AS6Iw8XxAGXQ+0UAfBE8/XxQvj28u70+tj967dvoL4H5OINIJdhRAhbvhossDYswLYR16ph1KYx4zSLHSteTAZyiIcOtw5MEJKAXIIRGND5UnfmgQEOqGrezDnC02DOUD9JBcU0VCfONwwo3KIwSwAsSrl29fIFAdGdWYD0FInzp5VWIlztjAhrhCyRDQYKGbDa04ACRgoMzMIgiZKCgFzy5vUCRoyBB2/QUFAAgkIZvYgTQ2FwBavix5CbBAEAIfkECQkAGgAsAAAAAGQADQCEBAIEhIKE1NLUREJE7O7s3N7cbG5sLC4spKKkDA4M/Pr8fHp8jI6M3Nrc5ObkBAYEhIaE1NbUREZE9Pb05OLkdHJ0pKakFBYU/P78fH58////AAAAAAAAAAAAAAAAAAAABf6gJo5kaZ5oqq5s675wLM90bd8opphYgSAFTEmnEA4VRR7SSCIyR05l8jhtLksTxGCAmEARh8fjgGBiIhZL5HlOr5toNTv+htLnbrwcnh8pAg8AggE7GgIJgoIJAiMEDAELDAQkjpCSlI+Rk42Zl5wLGZ4ijqCiGqShm6MMpaoUF4kAFw4iBrGCBiMNARkZEA0ku6C/wZC+wLrGxMm8Acgiu83PGtEZzsXSurcAyAPbEpyWqqePqZi8ppXmnNbpDO3jjvCY8yKvsRcUtdu5IhgCP+r4A4hAoIZ/AdkQNIgQgQCFPx42ISgRCkUmCioEErSgkICNihhBuUKlkBUkUilMjqyy8ok/kiddZtmCQBUGMADGIFCJo6dPEwq8DGmQ8KfRo0iTKu0ZAgAh+QQJCQATACwAAAAAZAANAIQEAgSEgoTU0tTs6uxEQkScnpzk4uT09vR0dnQUFhTc2tz8/vx8fnwEBgSMjozU1tSkoqT8+vx8enz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF9+AkjmRpnmiqrmzrvnAsz3Rt3/ISnfqxmL1fKQiM+IrHoVFIIiqTzWXpACEQCoemAAIRMCeLbfcb5nq1ZrL4PCqP0e/2Wp0eRRiAPICxEw0cDAwOAyR/gYOFgIKEI4aLiYeMfoqIjZSSE46Vk5EjBgl6AAkGIwIBgQECJKaoqqWnDKmrsLKvrbO3trGuIqy7uL8iCqF5D5adxwGbmYDKmIbOkI/H05zVzMjWm5+ho3J1cgVxImHibOQC5nTjYHNw5+3g6PIHCKEIfeQHUG1G+f0H/pHzB2SfQDAGCwZUeHBBQhIHCljBgqOixRoRDl7cyLGjx481QgAAOw==',
			'text_sidebar': 'Need help choosing a course?',
			'text_instructions': 'Learn first aid skills you can confidently use in an emergency situation, either at work or in your day-to-day life',
			'text_thankyou': '<strong>Thank you</strong> <br>Loading courses...'
		};
		/**
		 * Map sequence of answers to end URL
		 */
		var answersMap = {
			'personal/adults': '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-cover-first-aid-for/Adults-result.aspx',
			'personal/babies-and-children': '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-cover-first-aid-for/Baby-and-child-result.aspx',
			'personal/both': '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-cover-first-aid-for/Both-result.aspx',
			'work/yes/children_only': '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-need-to-know/Paediatric%20result.aspx',
			'work/yes/adults_and_children/1_to_24/0': '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-need-to-know/4-number-employees/5-work-risk-s/6-need-training-no-risk/Paediatric%20and%20Appointed%20result.aspx',
			'work/yes/adults_and_children/1_to_24/1+': '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-need-to-know/4-number-employees/5-work-risk-s/6-need-training-risk-a/Paediatric%20and%20Emergency%20result.aspx',
			'work/yes/adults_and_children/25_to_49/0': '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-need-to-know/4-number-employees/5-work-risk-l/6-need-tr-no-r/Pa-Efa.aspx',
			'work/yes/adults_and_children/25_to_49/1+': '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-need-to-know/4-number-employees/5-work-risk-l/6-need-tr-r-b/Pa-Faw.aspx',
			'work/yes/adults_and_children/50_plus': '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-need-to-know/4-number-employees/5-need-tr/Pa-Faw.aspx',
			'work/no/low_risk/1_to_24/0': '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-workplace-risk/4-num-employees-lr/5-work-risk-s/6-need-tr-nr/Appointed-result.aspx',
			'work/no/low_risk/1_to_24/1+': '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-workplace-risk/4-num-employees-lr/5-work-risk-s/6-need-tr-r-b/FAW-result.aspx',
			'work/no/low_risk/25_to_49/0': '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-workplace-risk/4-num-employees-lr/5-work-risk-l/6-need-tr-nr/EFA-result.aspx',
			'work/no/low_risk/25_to_49/1+': '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-workplace-risk/4-num-employees-lr/5-work-risk-l/6-need-tr-r-b/FAW-result.aspx',
			'work/no/low_risk/50_plus': '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-workplace-risk/4-num-employees-lr/5-need-tr/Faw.aspx',
			'work/no/high_risk/1_to_4/0': '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-workplace-risk/4-num-employees-hr/5-work-risk-s/6-need-tr-nr/Appointed-result.aspx',
			'work/no/high_risk/1_to_4/1+': '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-workplace-risk/4-num-employees-hr/5-work-risk-s/6-need-tr-r-b/FAW-result.aspx',
			'work/no/high_risk/5_to_49/0': '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-workplace-risk/4-num-employees-hr/5-work-risk-l/6-need-tr-nr/EFA-result.aspx',
			'work/no/high_risk/5_to_49/1+': '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-workplace-risk/4-num-employees-hr/5-work-risk-l/6-need-tr-r-b/FAW-result.aspx',
			'work/no/high_risk/50_plus': '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-workplace-risk/4-num-employees-hr/5-need-tr/Faw.aspx'
		   
		};
	
		/**
		 * Experiment context - question container
		 *
		 * Has 'state' corresponding to active question
		 */
		var Context = function () {
			/**
			 * Constructor
			 *
			 * @param {Question} state    The Question state
			 */
			function Context(state) {
				_classCallCheck(this, Context);
				this.recordedAnswers = [];
				this.state = state;
				this.loadUi();
			}
			/**
			 * Helper create the user interface for this test and render the current state
			 */
			_createClass(Context, [{
				key: 'loadUi',
				value: function loadUi() {
					var lightbox = this.lightbox = $('\n            <div class="rc17-lightbox">\n                <a title="Close" class="rc17-lightbox__close">&#x2715;</a>\n                <div class="rc17-lightbox__sidebar">\n                    <h2 class="rc17-lightbox__title"><img \n                        src="//www.redcrossfirstaidtraining.co.uk/images/svg/logo-redcross.svg" /></h2>\n                    <p class="rc17-lightbox__instructions">\n                        ' + settings.text_instructions + '\n                    </p>\n                    <div class="rc17-steps-tracker"></div>\n                </div>\n                <div class="rc17-lightbox__main">\n                </div>\n            </div>\n        ');
					var lightboxInit = $('\n            <div class="rc17-lightbox-init rc17-lightbox-init--active">\n                <i class="fa fa-question-circle"></i>\n                ' + settings.text_sidebar + '\n            </div>\n        ');
					var lightboxBackground = $('<div class="rc17-lightbox-page-overlay">');
					$('body').append(lightboxBackground);
					$('body').append(lightbox);
					$('body').append(lightboxInit);
					lightboxInit.on('click', function () {
						showLightbox();
					});
					$('.rc17-lightbox').on('click', '.rc17-lightbox__close', function () {
						hideLightbox();
					});
					$(document).on('keydown', function (e) {
						var keyCode = e.keyCode || e.which;
						if (keyCode == 27) {
							hideLightbox();
						}
					});
					var that = this;
					$('.rc17-steps-tracker').on('click', '.rc17-steps-tracker__step .rc17-step-edit', function () {
						var id = $(this).parents('.rc17-steps-tracker__step').attr('data-id');
						sendEvent('went-back-to-arbitrary-question', parseInt(id) + 1);
						that.goToQuestion(id);
					});
					function showLightbox() {
						lightbox.addClass('rc17-lightbox--active');
						$('body').addClass('rc17-lightbox-active');
						lightboxInit.removeClass('rc17-lightbox-init--active');
						lightboxBackground.addClass('rc17-lightbox-page-overlay--active');
						sendEvent('did-show-lightbox');
					}
					function hideLightbox() {
						lightbox.removeClass('rc17-lightbox--active');
						$('body').removeClass('rc17-lightbox-active');
						lightboxInit.addClass('rc17-lightbox-init--active');
						lightboxBackground.removeClass('rc17-lightbox-page-overlay--active');
						sendEvent('did-hide-lightbox', that.state.id);
					}
					this.renderState();
				}
				/**
				 * Update the steps tracker based on recorded answers
				 */
			}, {
				key: 'updateStepsTracker',
				value: function updateStepsTracker() {
					$('.rc17-steps-tracker').empty();
					this.recordedAnswers.forEach(function (item, index) {
						var title = item.state.title,
							stepNumber = index + 1,
							stateAnswers = item.state.getAvailableAnswers(),
							answerGiven = item.answer;
						var friendlyAnswer = '';
						if (item.state.answersType === 'checkbox') {
							friendlyAnswer = item.answer + ' specified';
						} else if (stateAnswers) {
							stateAnswers.answers.forEach(function (item) {
								if (item.value === answerGiven) {
									friendlyAnswer = item.friendlyName;
								}
							});
						}
						if (typeof item.state.getStepsTitle != 'undefined') {
							$('.rc17-steps-tracker').append('\n                    <div class="rc17-steps-tracker__step" data-id="' + index + '">\n                        <span class="rc17-steps-tracker__title">\n                            <em>' + stepNumber + '.</em>\n                            <strong>' + item.state.getStepsTitle(answerGiven) + '</strong>\n                        </span>\n                        <a title="Edit" class="rc17-step-edit"><i class="fa fa-pencil"></i></a>\n                        <i class="fa fa-check"></i>\n                    </div>    \n                ');
						} else {
							$('.rc17-steps-tracker').append('\n                    <div class="rc17-steps-tracker__step" data-id="' + index + '">\n                        <span class="rc17-steps-tracker__title"><em>' + stepNumber + '.</em><strong>' + title + '</strong></span>\n                        <span class="rc17-steps-tracker__answer">' + friendlyAnswer + '</span>\n                        <a title="Edit" class="rc17-step-edit"><i class="fa fa-pencil"></i></a>\n                        <i class="fa fa-check"></i>\n                    </div>    \n                ');
						}
					});
				}
				/**
				 * All answers given, match given answers to answers map and redirect to resultant URL
				 *
				 * @param {string} urlAppend
				 */
			}, {
				key: 'redirectComplete',
				value: function redirectComplete(urlAppend) {
					var key = this.recordedAnswers.map(function (item) {
						return item.answer;
					}).join('/');
					if ((answersMap || {})[key]) {
						$('.rc17-lightbox').html('\n                <div class="rc17-completed">\n                    <p class="rc17-completed__text">' + settings.text_thankyou + '</p>\n                    <p><img src="' + settings.preloader + '"></p>\n                </div>\n            ');
						setTimeout(function () {
							var target = answersMap[key];
							if (urlAppend) {
								target = answersMap[key] + urlAppend;
								sendEvent('did-complete', target);
								window.location = target;
							} else {
								sendEvent('did-complete', target);
								window.location = target;
							}
						}, 1000);
					} else {
						throw "No URL matches the given answers map key. Key is: " + key;
					}
				}
				/**
				 * Record an answer given in this context
				 */
			}, {
				key: 'recordAnswer',
				value: function recordAnswer(answer) {
					this.recordedAnswers.push({
						state: this.state,
						answer: answer
					});
				}
				/**
				 * Validate given state and if valid, move onto the next question and render given state
				 */
			}, {
				key: 'nextQuestion',
				value: function nextQuestion() {
					if (this.state.validationRequired && !this.state.validate()) {
						return;
					}
					if (this.state.getNextQuestion(this)) {
						this.renderState();
					}
				}
				/**
				 * Go back to previous question
				 */
			}, {
				key: 'previousQuestion',
				value: function previousQuestion() {
					if (this.recordedAnswers.length === 0) {
						throw "No previous questions exist.";
					}
					this.goToQuestion(this.recordedAnswers.length - 1);
				}
				/**
				 * Draw the state and associated steps
				 */
			}, {
				key: 'renderState',
				value: function renderState() {
					this.state.draw();
					$('.rc17-question--active').append('<div class="rc17-buttons-wrapper"></div>');
					if (this.recordedAnswers.length > 0) {
						$('.rc17-question--active .rc17-buttons-wrapper').append('\n                <input class="rc17-question__button rc17-question__back" type="submit" value="Back" />\n            ');
					}
					$('.rc17-question--active .rc17-buttons-wrapper').append('\n            <input class="rc17-question__button rc17-question__submit" type="submit" value="Next" />\n        ');
					var additionalText = this.state.getAdditionalText();
					if (additionalText) {
						$('.rc17-question--active').append('<div class="rc17-additional-text">' + additionalText + '</div>');
						$('.rc17-question--active').addClass('rc17-question--has-additional-text');
					}
					$('.rc17-question--active').append('<div class="rc17-invalid-message">Please select a valid answer</div>');
					this.updateStepsTracker();
				}
				/**
				 * @param {int} id  Step number, 0-based index from answers given
				 */
			}, {
				key: 'goToQuestion',
				value: function goToQuestion(id) {
					var targetState = (this.recordedAnswers[id] || {}).state ? this.recordedAnswers[id].state : null;
					if (!targetState) {
						throw "State does not exist in goToQuestion";
					}
					for (var i = this.recordedAnswers.length; i > id; i--) {
						this.recordedAnswers.pop();
					}
					this.state = targetState;
					this.renderState();
				}
			}]);
			return Context;
		}();
		/**
		 * Answer container - create answers groupings of different types (radio, checkbox, ...)
		 */
		var Answers = function () {
			function Answers() {
				_classCallCheck(this, Answers);
				this.groups = [];
			}
			_createClass(Answers, [{
				key: 'addAnswers',
				value: function addAnswers(type, name, answers) {
					switch (type) {
						case 'radio':
							this.groups.push({
								type: 'radio',
								name: name,
								answers: answers
							});
							break;
						case 'checkbox':
							this.groups.push({
								type: 'checkbox',
								name: name,
								answers: answers
							});
							break;
						default:
							throw "Answers type msut be specified in addAnswers()";
					}
					return this;
				}
			}, {
				key: 'getHtml',
				value: function getHtml() {
					var _this = this;
					var html = '';
					this.groups.forEach(function (item) {
						html += '<div class="rc17-question__answers-group clearfix">';
						if (item.type == 'radio') {
							html += _this.getRadioHtml(item.answers, item.name);
						} else if (item.type == 'checkbox') {
							html += _this.getCheckboxHtml(item.answers, item.name);
						}
						html += '</div>';
					});
					return html;
				}
			}, {
				key: 'getRadioHtml',
				value: function getRadioHtml(answers, name) {
					var html = '<div class="rc17-question__answers rc17-question__answers--radio">';
					answers.forEach(function (item) {
						html += '\n                <label class="rc17-question__answer">\n                    <input class="rc17-question__answer-radio" \n                        type="radio" \n                        name="' + name + '" \n                        value="' + item.value + '" />\n                    ' + item.friendlyName + '\n                </label>\n            ';
					});
					html += '</div>';
					return html;
				}
			}, {
				key: 'getCheckboxHtml',
				value: function getCheckboxHtml(answers, name) {
					var html = '<div class="rc17-question__answers rc17-question__answers--checkbox">';
					answers.forEach(function (item) {
						html += '\n                <label class="rc17-question__answer clearfix">\n                    <input class="rc17-question__answer-checkbox" \n                        type="checkbox" \n                        name="' + name + '" \n                        value="' + item.value + '" />\n                    <span class="rc17-question__answer-text">\n                    ' + item.friendlyName + '\n                    </span>\n                </label>\n            ';
					});
					html += '</div>';
					return html;
				}
			}]);
			return Answers;
		}();
		/**
		 * Question class
		 */
		var Question = function () {
			function Question(title, answersType, id, answers, validationRequired) {
				var _this2 = this;
				_classCallCheck(this, Question);
				this.title = title;
				this.id = id;
				this.answers = [];
				this.answersType = answersType;
				if (validationRequired === undefined) {
					this.validationRequired = true;
				} else {
					this.validationRequired = validationRequired;
				}
				answers.forEach(function (item) {
					_this2.answers.push(new Answers().addAnswers(answersType, id, item));
				});
			}
			_createClass(Question, [{
				key: 'getAvailableAnswers',
				value: function getAvailableAnswers() {
					if ((this.answers || {})[0]) {
						return this.answers[0]['groups'].length === 1 ? this.answers[0]['groups'][0] : this.answers[0]['groups'];
					}
					return [];
				}
			}, {
				key: 'draw',
				value: function draw() {
					$('.rc17-question').remove();
					var template = '\n            <form class="rc17-question rc17-question--active rc17-question--id-' + this.id + '">\n                <h2>' + this.title + '</h2>\n            </form>\n        ';
					$('.rc17-lightbox__main').append(template);
					this.drawAnswers();
				}
			}, {
				key: 'drawAnswers',
				value: function drawAnswers() {
					var answersHtml = '';
					this.answers.forEach(function (item) {
						answersHtml += item.getHtml();
					});
					$('.rc17-question--active').append(answersHtml);
				}
				/**
				 * Get all answers given for a group of questions
				 */
			}, {
				key: 'getAnswersGiven',
				value: function getAnswersGiven() {
					var formAnswers = $('.rc17-question').serializeArray(),
						groupedAnswers = {};
					if (formAnswers.length === 0) {
						return false;
					}
					if (formAnswers.length === 1) {
						var name = formAnswers[0].name,
							value = formAnswers[0].value;
						groupedAnswers[name] = value;
					} else {
						formAnswers.forEach(function (item) {
							var name = item.name,
								value = item.value;
							if (!groupedAnswers[name]) {
								groupedAnswers[name] = [];
							}
							groupedAnswers[name].push(value);
						});
					}
					return groupedAnswers;
				}
				/**
				 * For a single question
				 */
			}, {
				key: 'getAnswer',
				value: function getAnswer() {
					var answersGiven = this.getAnswersGiven(),
						ans = answersGiven[this.id];
					return ans;
				}
			}, {
				key: 'validate',
				value: function validate() {
					if (this.getAnswersGiven() !== false) {
						return true;
					} else {
						$('.rc17-question--active .rc17-invalid-message').addClass('rc17-invalid-message--active');
						return false;
					}
				}
			}, {
				key: 'getNextQuestion',
				value: function getNextQuestion(context) {}
			}, {
				key: 'getAdditionalText',
				value: function getAdditionalText() {}
			}]);
			return Question;
		}();
		/**
		 * Question Additional Training
		 */
		var QuestionAdditionalTraining = function (_Question) {
			_inherits(QuestionAdditionalTraining, _Question);
			function QuestionAdditionalTraining() {
				_classCallCheck(this, QuestionAdditionalTraining);
				return _possibleConstructorReturn(this, (QuestionAdditionalTraining.__proto__ || Object.getPrototypeOf(QuestionAdditionalTraining)).apply(this, arguments));
			}
			_createClass(QuestionAdditionalTraining, [{
				key: 'getNextQuestion',
				value: function getNextQuestion(context) {
					var answersGiven = this.getAnswersGiven(context),
						ans = answersGiven[this.id];
					// Parse answers - question requires us to bind params to URL for final answer
					var urlAppend = '',
						answerString = '';
					if (Array.isArray(answersGiven)) {
						answerString = answersGiven.join(',');
					} else {
						answerString = ans;
					}
					if (answerString) {
						urlAppend = '?uc=' + answerString;
					}
					context.redirectComplete(urlAppend);
					return false;
				}
			}, {
				key: 'getAdditionalText',
				value: function getAdditionalText() {
					return '\n            <p>If unsure, you may want to complete a \n            <a target="_blank" href="https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-legal-requirements.aspx#needs">needs assessment</a>\n        ';
				}
			}]);
			return QuestionAdditionalTraining;
		}(Question);
		var AdditionalTraining = new QuestionAdditionalTraining('Do you need training in', 'checkbox', 'rc17_additional_training', [[{
			value: '7791e104-0335-47be-905c-83153ea754f6',
			friendlyName: 'How to use an automated external defibrillator'
		}, {
			value: 'db01b7bf-c944-4c30-8de7-6d337a07d0a9',
			friendlyName: 'Fire safety (fire marshal training)'
		}, {
			value: '2284dabb-b5e9-4534-bbe6-31d3aaa0a1b6',
			friendlyName: 'How to give oxygen'
		}, {
			value: '7e9d0c92-d385-4e33-a1be-49028949d147',
			friendlyName: 'Moving and handling'
		}]], false);
		/**
		 * Question Anyone at Risk Of
		 */
		var QuestionRiskConditions = function (_Question2) {
			_inherits(QuestionRiskConditions, _Question2);
			function QuestionRiskConditions() {
				_classCallCheck(this, QuestionRiskConditions);
				return _possibleConstructorReturn(this, (QuestionRiskConditions.__proto__ || Object.getPrototypeOf(QuestionRiskConditions)).apply(this, arguments));
			}
			_createClass(QuestionRiskConditions, [{
				key: 'getNextQuestion',
				value: function getNextQuestion(context) {
					var answersGiven = this.getAnswersGiven(context),
						ans = answersGiven[this.id];
					// Risk conditions only affect the outcome as: 0 chosen or 1 or more chosen
					var finalAnswer = '';
					if (!ans || ans.length === 0) {
						finalAnswer += '0';
					} else {
						finalAnswer += '1+';
					}
					context.recordAnswer(finalAnswer);
					context.state = AdditionalTraining;
					return true;
				}
			}, {
				key: 'getStepsTitle',
				value: function getStepsTitle(answer) {
					return answer == '0' ? 'No specific health or injury risks' : '1+ specific health or injury risks';
				}
			}, {
				key: 'getAdditionalText',
				value: function getAdditionalText() {
					return '\n            <p>If unsure, you may want to complete a \n            <a target="_blank" href="http://www.redcrossfirstaidtraining.co.uk/~/media/3A77703E101247C29B1417A9162A7548.pdf">needs assessment</a>\n        ';
				}
			}]);
			return QuestionRiskConditions;
		}(Question);
		var RiskConditions = new QuestionRiskConditions('Is anyone at your workplace at risk of:', 'checkbox', 'rc17_risk_conditions', [[{
			value: 'bleeding',
			friendlyName: 'Bleeding'
		}, {
			value: 'burns',
			friendlyName: 'Burns'
		}, {
			value: 'electric_shock',
			friendlyName: 'Electric shock'
		}, {
			value: 'angina',
			friendlyName: 'Angina'
		}, {
			value: 'asthma',
			friendlyName: 'Asthma'
		}, {
			value: 'broken_bones',
			friendlyName: 'Broken bones'
		}, {
			value: 'head_injuries',
			friendlyName: 'Head injuries'
		}, {
			value: 'heart_attack',
			friendlyName: 'Heart attack'
		}, {
			value: 'heat_exhaustion',
			friendlyName: 'Heat exhaustion'
		}, {
			value: 'heat_strokes',
			friendlyName: 'Heat strokes'
		}, {
			value: 'hypothermia',
			friendlyName: 'Hypothermia'
		}, {
			value: 'low_bloow_sugar',
			friendlyName: 'Low blood sugar'
		}, {
			value: 'severe_allergic_reaction',
			friendlyName: 'Severe allergic reaction'
		}, {
			value: 'spinal_injuries',
			friendlyName: 'Spinal injuries'
		}, {
			value: 'sprains_and_strains',
			friendlyName: 'Sprains and strains'
		}, {
			value: 'stroke',
			friendlyName: 'Stroke'
		}]], false);
		/**
		 * Question: num employees 1-4,5-49,50+
		 */
		var QuestionNumEmployeesSmallerGroups = function (_Question3) {
			_inherits(QuestionNumEmployeesSmallerGroups, _Question3);
			function QuestionNumEmployeesSmallerGroups() {
				_classCallCheck(this, QuestionNumEmployeesSmallerGroups);
				return _possibleConstructorReturn(this, (QuestionNumEmployeesSmallerGroups.__proto__ || Object.getPrototypeOf(QuestionNumEmployeesSmallerGroups)).apply(this, arguments));
			}
			_createClass(QuestionNumEmployeesSmallerGroups, [{
				key: 'getNextQuestion',
				value: function getNextQuestion(context) {
					var answersGiven = this.getAnswersGiven(context),
						ans = answersGiven[this.id];
					context.recordAnswer(ans);
					if (ans === '1_to_4' || ans === '5_to_49') {
						context.state = RiskConditions;
					} else if (ans === '50_plus') {
						context.state = AdditionalTraining;
					} else {
						throw "Invalid answer given";
					}
					return true;
				}
			}, {
				key: 'getStepsTitle',
				value: function getStepsTitle(answer) {
					return answer.replace(/_/g, ' ', answer) + ' employees';
				}
			}]);
			return QuestionNumEmployeesSmallerGroups;
		}(Question);
		var NumEmployeesSmallerGroups = new QuestionNumEmployeesSmallerGroups('How many people are there in your workplace?', 'radio', 'rc17_num_employees_smaller_groups', [[{
			value: '1_to_4',
			friendlyName: '1 to 4'
		}, {
			value: '5_to_49',
			friendlyName: '5 to 49'
		}, {
			value: '50_plus',
			friendlyName: '50+'
		}]]);
		/**
		 * Question: num employees 1-24,25-49,50+
		 */
		var QuestionNumEmployeesLargerGroups = function (_Question4) {
			_inherits(QuestionNumEmployeesLargerGroups, _Question4);
			function QuestionNumEmployeesLargerGroups() {
				_classCallCheck(this, QuestionNumEmployeesLargerGroups);
				return _possibleConstructorReturn(this, (QuestionNumEmployeesLargerGroups.__proto__ || Object.getPrototypeOf(QuestionNumEmployeesLargerGroups)).apply(this, arguments));
			}
			_createClass(QuestionNumEmployeesLargerGroups, [{
				key: 'getNextQuestion',
				value: function getNextQuestion(context) {
					var answersGiven = this.getAnswersGiven(context),
						ans = answersGiven[this.id];
					context.recordAnswer(ans);
					if (ans === '1_to_24' || ans === '25_to_49') {
						context.state = RiskConditions;
					} else if (ans === '50_plus') {
						context.state = AdditionalTraining;
					} else {
						throw "Invalid answer given";
					}
					return true;
				}
			}, {
				key: 'getStepsTitle',
				value: function getStepsTitle(answer) {
					return answer.replace(/_/g, ' ', answer) + ' employees';
				}
			}]);
			return QuestionNumEmployeesLargerGroups;
		}(Question);
		var NumEmployeesLargerGroups = new QuestionNumEmployeesLargerGroups('How many people are there in your workplace?', 'radio', 'rc17_num_employees_larger_groups', [[{
			value: '1_to_24',
			friendlyName: '1 to 24'
		}, {
			value: '25_to_49',
			friendlyName: '25 to 49'
		}, {
			value: '50_plus',
			friendlyName: '50+'
		}]]);
		/**
		 * Question: describe workplace as high or low risk
		 */
		var QuestionWorkplaceRisk = function (_Question5) {
			_inherits(QuestionWorkplaceRisk, _Question5);
			function QuestionWorkplaceRisk() {
				_classCallCheck(this, QuestionWorkplaceRisk);
				return _possibleConstructorReturn(this, (QuestionWorkplaceRisk.__proto__ || Object.getPrototypeOf(QuestionWorkplaceRisk)).apply(this, arguments));
			}
			_createClass(QuestionWorkplaceRisk, [{
				key: 'getNextQuestion',
				value: function getNextQuestion(context) {
					var answersGiven = this.getAnswersGiven(context),
						ans = answersGiven[this.id];
					context.recordAnswer(ans);
					if (ans === 'low_risk') {
						context.state = NumEmployeesLargerGroups;
					} else if (ans === 'high_risk') {
						context.state = NumEmployeesSmallerGroups;
					} else {
						throw "Invalid answer given";
					}
					return true;
				}
			}, {
				key: 'getStepsTitle',
				value: function getStepsTitle(answer) {
					if (answer == 'low_risk') {
						return 'Low risk workplace';
					} else {
						return 'High risk workplace';
					}
				}
			}]);
			return QuestionWorkplaceRisk;
		}(Question);
		var WorkplaceRisk = new QuestionWorkplaceRisk('Would you describe your workplace as:', 'radio', 'rc17_workplace_risk', [[{
			value: 'low_risk',
			friendlyName: 'Low risk e.g. small office, retail shop'
		}, {
			value: 'high_risk',
			friendlyName: 'High risk e.g. construction, manufacturing'
		}]]);
		/**
		 * Question: do you need to know first aid for adults and children
		 */
		var QuestionEmergencyFirstAidTarget = function (_Question6) {
			_inherits(QuestionEmergencyFirstAidTarget, _Question6);
			function QuestionEmergencyFirstAidTarget() {
				_classCallCheck(this, QuestionEmergencyFirstAidTarget);
				return _possibleConstructorReturn(this, (QuestionEmergencyFirstAidTarget.__proto__ || Object.getPrototypeOf(QuestionEmergencyFirstAidTarget)).apply(this, arguments));
			}
			_createClass(QuestionEmergencyFirstAidTarget, [{
				key: 'getNextQuestion',
				value: function getNextQuestion(context) {
					var answersGiven = this.getAnswersGiven(context),
						ans = answersGiven[this.id];
					context.recordAnswer(ans);
					if (ans === 'adults_and_children') {
						context.state = NumEmployeesLargerGroups;
						return true;
					} else if (ans === 'children_only') {
						context.redirectComplete();
						return false;
					} else {
						throw "Invalid answer given";
					}
				}
			}, {
				key: 'getStepsTitle',
				value: function getStepsTitle(answer) {
					if (answer == 'adults_and_children') {
						return 'First aid for adults and children';
					} else {
						return 'First aid for children';
					}
				}
			}]);
			return QuestionEmergencyFirstAidTarget;
		}(Question);
		var EmergencyFirstAidTarget = new QuestionEmergencyFirstAidTarget('In a first aid emergency, would you need to know first aid for adults as well as children?', 'radio', 'rc17_emergency_first_aid_target', [[{
			value: 'adults_and_children',
			friendlyName: 'Adults and children'
		}, {
			value: 'children_only',
			friendlyName: 'Children only'
		}]]);
		/**
		 * Question: Do you have responsibility for children?
		 */
		var QuestionChildrenResponsibility = function (_Question7) {
			_inherits(QuestionChildrenResponsibility, _Question7);
			function QuestionChildrenResponsibility() {
				_classCallCheck(this, QuestionChildrenResponsibility);
				return _possibleConstructorReturn(this, (QuestionChildrenResponsibility.__proto__ || Object.getPrototypeOf(QuestionChildrenResponsibility)).apply(this, arguments));
			}
			_createClass(QuestionChildrenResponsibility, [{
				key: 'getNextQuestion',
				value: function getNextQuestion(context) {
					var answersGiven = this.getAnswersGiven(context),
						ans = answersGiven[this.id];
					context.recordAnswer(ans);
					if (ans === 'yes') {
						context.state = EmergencyFirstAidTarget;
					} else if (ans === 'no') {
						context.state = WorkplaceRisk;
					} else {
						throw "Invalid answer given";
					}
					return true;
				}
			}, {
				key: 'getStepsTitle',
				value: function getStepsTitle(answer) {
					if (answer == 'yes') {
						return 'Responsible for children';
					} else {
						return 'Not responsible for children';
					}
				}
			}]);
			return QuestionChildrenResponsibility;
		}(Question);
		var ChildrenResponsibility = new QuestionChildrenResponsibility('At work, are you / your colleagues ever responsible for looking after children?', 'radio', 'rc17_children_responsibility', [[{
			value: 'yes',
			friendlyName: 'Yes'
		}, {
			value: 'no',
			friendlyName: 'No'
		}]]);
		/**
		 * Question: Who For
		 */
		var QuestionWhoFor = function (_Question8) {
			_inherits(QuestionWhoFor, _Question8);
			function QuestionWhoFor() {
				_classCallCheck(this, QuestionWhoFor);
				return _possibleConstructorReturn(this, (QuestionWhoFor.__proto__ || Object.getPrototypeOf(QuestionWhoFor)).apply(this, arguments));
			}
			_createClass(QuestionWhoFor, [{
				key: 'getNextQuestion',
				value: function getNextQuestion(context) {
					var answersGiven = this.getAnswersGiven(),
						ans = answersGiven[this.id];
					context.recordAnswer(ans);
					context.redirectComplete();
					return false;
				}
			}, {
				key: 'getStepsTitle',
				value: function getStepsTitle(answer) {
					return answer;
				}
			}]);
			return QuestionWhoFor;
		}(Question);
		var WhoFor = new QuestionWhoFor('Specifically, I want first aid for', 'radio', 'rc17_who_for', [[{
			value: 'adults',
			friendlyName: 'Adults'
		}, {
			value: 'babies-and-children',
			friendlyName: 'Babies and children'
		}, {
			value: 'both',
			friendlyName: 'Both'
		}]]);
		/**
		 * Question: course type
		 */
		var QuestionCourseType = function (_Question9) {
			_inherits(QuestionCourseType, _Question9);
			function QuestionCourseType() {
				_classCallCheck(this, QuestionCourseType);
				return _possibleConstructorReturn(this, (QuestionCourseType.__proto__ || Object.getPrototypeOf(QuestionCourseType)).apply(this, arguments));
			}
			_createClass(QuestionCourseType, [{
				key: 'getNextQuestion',
				value: function getNextQuestion(context) {
					var ans = this.getAnswer();
					context.recordAnswer(ans);
					if (ans === 'personal') {
						context.state = WhoFor;
					} else if (ans === 'work') {
						context.state = ChildrenResponsibility;
					} else {
						throw "Invalid answer given";
					}
					return true;
				}
			}, {
				key: 'getStepsTitle',
				value: function getStepsTitle(answer) {
					if (answer === 'personal') {
						return 'Personal reasons';
					} else {
						return 'Work reasons';
					}
				}
			}]);
			return QuestionCourseType;
		}(Question);
		var CourseType = new QuestionCourseType('I want a course for', 'radio', 'rc17_course_type', [[{
			value: 'personal',
			friendlyName: 'Personal reasons, to use in my everyday life'
		}, {
			value: 'work',
			friendlyName: 'Professional reasons, to use at my workplace'
		}]]);
	  
	  // -----------------------------------------------
		// Create context and event listening
		// -----------------------------------------------
	 
			var c = new Context(CourseType);
			$('.rc17-lightbox').on('click', '.rc17-question__button', function (e) {
				e.preventDefault();
				if ($(this).hasClass('rc17-question__back')) {
					sendEvent('clicked-back-to-previous-question');
					c.previousQuestion();
				} else {
					c.nextQuestion();
				}
			});
			// -----------------------------------------------
			// Remove any js-radio classes which mess 
			// with the dislay of radio inputs
			// -----------------------------------------------
			UC.poller(['.rc17-lightbox .js-radio'], function () {
				$('.rc17-lightbox .js-radio').removeClass('js-radio');
			});
	  
	  // -----------------------------------------------
		//When course finder clicked on RC019 click RC017 course finder tab
	  // -----------------------------------------------
	  $('.rc19-courseTrigger').click(function(){
		$('.rc17-lightbox-init').click();
	  });
	}
})();
