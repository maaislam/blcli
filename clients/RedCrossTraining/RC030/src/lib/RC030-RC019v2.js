export default function rc019variationtwo(){
    const $ = window.jQuery;
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
	pageTitle.insertBefore('.courses-page__body');
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
	if($(window).width() > 700){
		popularCourseBlock.insertAfter('.courses-page__body');
	}else{
		popularCourseBlock.insertBefore('.courses-page__body');
	}
	
	var popularCourse = {
		workplaceCourse: [
			{
				courseId: 'workcourse1',
				title: 'First aid at work',
				mainpoint1: '<span class="rc19-positive"></span>Train at our venues, in-house or at a location of your choice',
				mainpoint2: '<span class="rc19-positive"></span>Certified for professional use ',
				bulletPoints: '<li><div class="rc30-icon rc30-firstaidwork_icon"/><span>People aged 16+ who need to provide first aid to someone who is injured or becomes ill while at work.</span></li><li><div class="rc30-icon rc30-firstaidwork2_icon"/><span>Organisations whose needs assessment identifies a requirement for additional first aid training (e.g. due to having employees with a medical condition).</span></li>',
				time: '09:00 - 17:00',
				price: '£279 ex VAT',
				duration: '3 days',
				findCourses: '/Where-we-train/EventsSearch.aspx?courseSCId=456fb14f-68e8-484d-889a-a413b126b3e6&productId=308-ct&type=Workplace&fromdate=',
				learnMore: '/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/First-aid-at-work.aspx'
			},
			{
			  courseId: 'workcourse2',
				title: 'Emergency first aid at work',
				mainpoint1: '<span class="rc19-positive"></span>Train at our venues, in-house or at a location of your choice',
				mainpoint2: '<span class="rc19-positive"></span>Certified for professional use ',
				bulletPoints: '<li><div class="rc30-icon rc30-firstaidwork_icon"/><span>People aged 16+ who need to provide first aid to someone who is injured or becomes ill while at work.</span></li><li><div class="rc30-icon rc30-firstaidwork2_icon"/><span>Organisations whose first aid needs assessment identifies the need for somebody trained in emergency first aid.</span></li>',
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
				bulletPoints: '<li><div class="rc30-icon rc30-firstaidrefresh_icon"/><span>Refresher course for existing workplace first aiders</span></li><li><div class="rc30-icon rc30-firstaidcertificate_icon"/><span>Must have previously attended a first aid at work course.</span></li>',
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
				bulletPoints: '<li><div class="rc30-icon rc30-paediatric_icon"/><span>People aged 16+ who care for babies and children in any professional setting, including nannies, child-minders, nursery workers and au pairs</span></li>',
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
				bulletPoints: '<div class="rc30-icon rc30-babyChild_icon"/><li>Parents of children of all ages (from birth to puberty)</li><li>Expectant parents, as part of preparing for parenthood</li><li>Grandparents</li><li>Family members</li><li>Babysitters</li>',
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
				bulletPoints: '<div class="rc30-icon rc30-firstaidadult_icon"/><li>People who want to be first aid trained, especially to help family, friends or neighbours.</li><li>Anyone who is involved with local community groups or takes part in sports.</li><li>Young people preparing for university or working abroad during a gap year.</li><li>People who have experienced a real life emergency.</li>',
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
				bulletPoints: '<div class="rc30-icon rc30-babyChild_icon"/><li>Parents of children of all ages (from birth to puberty)</li><li>Expectant parents, as part of preparing for parenthood</li><li>Grandparents</li><li>Family members</li><li>Babysitters</li>',
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
				bulletPoints: '<div class="rc30-icon rc30-firstaidadult_icon"/><li>People who want to be first aid trained, especially to help family, friends or neighbours.</li><li>Anyone who is involved with local community groups or takes part in sports.</li><li>Young people preparing for university or working abroad during a gap year.</li><li>People who have experienced a real life emergency.</li>',
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
					'<h3>It\'s perfect for</h3>',
				  '<ul class="rc19-coursepoints">'+this.bulletPoints+'</ul>',
				'<div class="rc19-courseLinks">',
				  '<a class="rc19-courseLink" href="' + this.findCourses + '">Find courses near me</a>',
				  '<a class="rc19-courseLearnMore" href="' + this.learnMore + '">More information</a>',
			  '</div>',
			'</div>',
			'</div>'
		].join(''));
		$eachCourse.appendTo('.rc19-popular-wrap');
	});



	  
	/*-------------------------------
	Other courses
	---------------------------------*/
	var otherCourseTitle;
	  
   var otherCourseTitle = $('.course-search-container .table-responsive:first thead tr:first .course-col-name');
	  
   if ($pageType === "Workplace") {
		otherCourseTitle.text('Scheduled courses');
   } else if ($pageType === "Public") {
		otherCourseTitle.text('Related courses');
	}else{
		otherCourseTitle.text('Related courses');
	}
	  
	
	$('.course-search-container .table-responsive tr').each(function () {
		var otherCourseLink = $(this).find('.course-col-price a').attr('href');
		var otherCourseLearnMore = $(this).find('.course-result-name a').attr('href');
		var otherCoursebuttons = $(['<div class="rc19-othercourse-buttons">',
			'<a class="rc19-othercourseLink" href="' + otherCourseLink + '">Find courses near me</a>',
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
		
		 if($(window).width()> 700){
			$newRelatedcourse.insertAfter('.course-search-container');
		 }else{
			$newRelatedcourse.prependTo('.courses-page__body');
		 }

	 // $('.course-search-container').replaceWith($newRelatedcourse); this hides all the courses
	  
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
		
		$('.main-content .course-search-container').addClass('RC030-publicCoursesHidden');

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
	  
	  
}