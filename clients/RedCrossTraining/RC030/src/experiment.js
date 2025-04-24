/* eslint-disable */
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import rc019vtwo from './lib/RC030-RC019v2.js';
import * as rc030Content from './lib/RC030-content.js';

const RC030 = (() => {

	const activate = () => {
		document.body.classList.add('RC030');
		let $ = window.jQuery,
			$body = $('body');

	// all courses page function
		function allCoursesPage() {
			let $topPagecontent = $('.courses-page__body');

			//change the top text of the page
			function topContent() {
				const allCourseText = rc030Content.topHtml;
				$topPagecontent.html('<div class="RC030-topcontent"/>');
				$topPagecontent.find('.RC030-topcontent').html(allCourseText);

				//add popular courses wrapper
				const allPopularCourses = $(`<div class="RC030-popular"><h3>Most popular courses</h3></div>`);
				allPopularCourses.insertAfter($topPagecontent);
			}
			topContent();

			function trustPilotReview() {
				//add the trustpilot review
				const trustPilot = $('<div class="RC030-allReview"/>');
				$('.RC030-toptext').after(trustPilot);
				const trustpilotHTML = rc030Content.trustPilotMarkup;
				trustPilot.html(trustpilotHTML);
			}
			trustPilotReview();

			function popularCoursesContent() {
				//add the content
				var allCourseObj = rc030Content.popularCourse.allCourses;
				$.each(allCourseObj, function () {
					let popularCourses = $([`
						<div class="rc19-popularcourse" id="${this.courseId}">
							<h3>${this.title}</h3>
							<div class="rc19-popImageheader"></div>
						   	<div class="rc19-popcontent">
							<div class="rc19-infobar">
								<li class="rc19-duration">${this.duration}</li>
								<li class="rc19-time">${this.time}</li>
								<li class="rc19-price">From ${this.price}</li>
							</div>
							<span class="rc19-main-bulletpoint">${this.mainpoint1}</span>
							<span class="rc19-main-bulletpoint">${this.mainpoint2}</span>
							<div class="rc30-perfect">
								<h3>It's perfect for</h3>
								<div class="rc30-bullets">
									<ul>${this.bulletPoints}</ul>
								</div>
							<div>
							<div class="rc19-courseLinks">
				  				<a class="rc19-courseLink" href="${this.findCourses}">Find courses near me</a>
				  				<a class="rc19-courseLearnMore" href="${this.learnMore}">More information</a>
			 				 </div>
						</div>
					`].join(''));
					popularCourses.appendTo('.RC030-popular');
				}); 

			}
			popularCoursesContent();

			function moveText() {
				let topText = $('.RC030-toptext');
				topText.insertAfter('.course-search-container');
				$('.RC030-allReview').insertAfter(topText);
			}
			//if device is mobile move the text
			if ($(window).width() < 700) {
				moveText();
			}

			//add the buttons to the bottom courses
			function changeRelatedCourses() {
				$('.course-search-container .table-responsive tr').each(function () {
					let $this = $(this);
					var otherCourseLink = $this.find('.course-col-price a').attr('href');
					var otherCourseLearnMore = $this.find('.course-result-name a').attr('href');
					var otherCoursebuttons = $([
						`<div class="rc19-othercourse-buttons">
							<a class="rc19-othercourseLink" href="${otherCourseLink}">Find courses near me</a>
							<a class="rc19-othercourseLearnmore" href="${otherCourseLearnMore}">More information</a>
						</div>`].join('')).appendTo($this);
					var othercourseDetails = $(this).find('td');
					$(othercourseDetails).wrapAll('<div class="rc19-othercoursedetails"></div>');
				});
			}
			changeRelatedCourses();

		}
	
	//set which page to run the functions
	let pathname = window.location.pathname;

	if(pathname.indexOf('Courses.aspx') > -1){
		$body.addClass('RC030all');
		allCoursesPage();

		$('.rc19-courseLink').click(function(){
			utils.events.send('RC030', 'book course click', 'RC030 user clicked book now on all courses', {
				sendOnce: true
			});
		}); 
		$('.rc19-courseLearnMore').click(function(){
			utils.events.send('RC030', 'book course click', 'RC030 user clicked more information on all courses', {
				sendOnce: true
			});
		});


	}else{
		rc019vtwo();
		$body.removeClass('RC030all');
		$('.rc19-courseLink').click(function(){
			utils.events.send('RC030', 'book course click', 'RC030 user clicked book now on workplace/public courses', {
				sendOnce: true
			});
		}); 
		$('.rc19-courseLearnMore').click(function(){
			utils.events.send('RC030', 'book course click', 'RC030 user clicked more information on workplace/public courses', {
				sendOnce: true
			});
		});
	}

	

	};

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('RC030', 'Variation 1');

		activate();
	})();

})();
