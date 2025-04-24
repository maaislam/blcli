import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import courseFinder from './lib/RC024-rc017.js';

var _RC024 = (function() {

	/*--------------------------------------
	Experiment Code
	---------------------------------------*/
	var _activate = function() {
		var $ = jQuery;
		var $body = $('body');
		$body.addClass('RC024');


		/*--------------------------------------
		Top block:
		---------------------------------------*/
		function topBlock(){
			var topBlockWrapper = $('<div class="RC24-topBlock"/>');
			
			var venuInfo = $('.venue-top');
			topBlockWrapper.insertBefore(venuInfo);
			var venuAddress = venuInfo.find('.venue-summary-info p:first').html(),
				venuNumber = venuInfo.find('.venue-summary-info p:eq(1)').html(),
				venuAnchorLink = venuInfo.find('.venue-summary-info p:last').html();

			//create columns
			var columns = [
				['RC24-col1',venuAddress],['RC24-col2',venuNumber],['RC24-col3','<div class="RC24-trustpilot"/>']
			]
			$.each(columns,function(){
				var columnType = this[0],
					columnText = this[1];
				
				var columnBlock = $('<div class="RC24-topcol '+columnType+'">'+columnText+'</div>');
				topBlockWrapper.append(columnBlock);
			});

			var trustpilot = $('.RC24-trustpilot');
			trustpilot.html(['<h3>"Well run, practical course"</h3>',
							'<span>"Staff were friendly, helpful & happy to spend as long as needed on each aspect of the course."</span>',
							'<div class="RC24-trustpilot-stars"/>',
							'<div class="RC24-trustpilot-logo"/>'].join(''));
		
			$('.RC24-topcol.RC24-col1').append(venuAnchorLink);
			//remove the dots
			var column2Text = $('.RC24-topcol.RC24-col2 strong');
			column2Text.each(function(){
				var phoneNo = $(this);
				var newphoneNo = phoneNo.text().replace(/\./g, "");
				phoneNo.text(newphoneNo);
			});

			$('.venue-further-info').attr('id','rc24venue-further-info');

			//add smooth scrolling
			var moreInfoAnchorLink = $('.RC24-topcol.RC24-col1').find('a');
				moreInfoAnchorLink.attr('href','#rc24venue-further-info');

			moreInfoAnchorLink.click(function(e){
				utils.events.send('RC024 - Venue Page Redesign','More info click','More venue info clicked',{
					sendOnce: true
				});
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				 if (target.length) {
					 $('html,body').animate({
						 scrollTop: target.offset().top
					}, 1000);
					return false;
				}

			});
						
		}
		topBlock();
		whereWeAre();


		/*--------------------------------------
		Add Venue page title
		---------------------------------------*/
		function venuTitle(){

			//get course location for the search
			var $courseLocation = $('.main-content h1').text().trim();
			var $locationName = $courseLocation.substr(0, $courseLocation.indexOf('-')); 
			var $courseName = $('#main_0_contentmain_0_refineSearch_DropDownList_CourseNames-button').text();

			$('.venue-course-results h2').html('<h2>Showing <span>'+$courseName+'</span> in <span>'+$locationName+'</span></h2>');
		
			//change html of small text in title to link
			$('.course-search-head-txt').html('<div class="RC024-searchAgain">Search other courses or venues ></div>');

			var search = $('.RC024-searchAgain'),
				searchAgainButton = $('.course-refinement__controls #main_0_contentmain_0_refineSearch_Button_DoSearch');
				search.click(function(){
					searchAgainButton.click();
					utils.events.send('RC024 - Venue Page Redesign','Search again click','Search Again clicked',{
						sendOnce: true
					});
				});

			var switchLink = $('<span class="rc24-smallText">(switch to <span>Public</span> for Adult and Baby courses)</span>');
			switchLink.appendTo('.course-search-head');

			if($('#main_0_contentmain_0_WorkplaceTraining').hasClass('tab-current')){
				switchLink.addClass('rc24-onWorkplace');
			}else{
				switchLink.removeClass('rc24-onWorkplace');
			}

		}
		venuTitle();

		/*--------------------------------------
		Map
		---------------------------------------*/
		function whereWeAre(){
			var whereText = {
				title:'where we are',
				topText:'Zoom in to see where we are. We\'ve provided detailed directions and information about this venue below',
				bottomText:'We\'ve marked your closest alternative venues on this map in black. Click a marker to visit a different venue'
			}
			var courseMap = $('.venue-location-map'),
				whereContent = $('<div class="RC24-where"/>');
				whereContent.insertAfter('.venue-course-results');

			whereContent.html('<div class="RC24-where-column"/><div class="RC24-where-column"/>');

			var mapContainer = $('.RC24-where-column:first'),
				whereTextWrap = $('.RC24-where-column:last');
			courseMap.prependTo(mapContainer);

			whereTextWrap.html('<h3>'+whereText.title+'</h3><p>'+whereText.topText+'</p><p>'+whereText.bottomText+'</p>');
		}

		/*--------------------------------------
		Course Listings
		---------------------------------------*/
		function courseListing(){

			var courseRow = $('.course-search-results table tbody tr .course-venue-distance');
			//Looping through each course row
			courseRow.each(function () {
				var el = $(this),
					elTarget = el.closest('td');
				if (elTarget.parent().is(':first-child')) {
					el
						.prepend('<p>This is your nearest centre</p>')
						.appendTo(elTarget);
				} else {
					el.addClass('RC_align_row').appendTo(elTarget);
				}
				el.append(' away');
			});
			$('.course-show-venue-results').each(function () {
				var el = $(this),
					elTarget = el.closest('td').find('.course-venue-name');
				el.appendTo(elTarget);
			});
			$('th.course-col-name').text('Course/Location');
			$('th.course-col-date').text('Length');
			$('.course-result-cart').each(function () {
				var courseAmount = $(this).find('.course-result-cart-wrapper span'),
					courseResult = $(this).find('.course-result-cart-wrapper');
				courseAmount.appendTo(courseResult);
			});
			//count amount of courses
			var courseAmount = $('.course-search-sorts .course-search-summary span').text();
			courseAmount.replace(/[^0-9]/gi, '');
			var courseamountNumber = parseInt(courseAmount);
			$('.table-responsive tr').not('.course-search-location').addClass('rc24-courseRow');
			var courseLocation = $('.course-search-location');
			if (courseamountNumber > 3) {
				$('.course-search-location:first').addClass('rc24-firstResult');
				courseLocation.not(':first').addClass('rc24-moreThan3');
				courseLocation.not(':first').find('td').append('<span class="rc24-morethan">View all courses<img src="//useruploads.visualwebsiteoptimizer.com/useruploads/286844/images/1a159ebe1427bd982a0ea8f3ba9327bc_angle-arrow-down_(1).png"/></span>');
			}
			courseLocation.each(function () {
				$(this).nextUntil(courseLocation).wrapAll('<tr class="rc24-wrapper"><td colspan="4"><table class="rc24-courseListingGroup" width="100%"></table></td></tr>');
			});

			// For each nested table of courses, group them by 
		   $('.rc24-courseListingGroup').each(function () {
			var that = this;
			// For each row, order it in the table by course name 
			var courseIdentifiersMet = [];
			$(that).find('tr').each(function () {
				var courseTitle = $(this).find('.course-result-name > span[id*=CourseName]').text().trim();
				$(this).attr('rc24-row-identifier', courseTitle);
				$(this).addClass('rc24-coursetableName');
				if (courseIdentifiersMet.indexOf(courseTitle) > -1) {
					// Move the course to after already existing row of this type 
					$('tr[rc24-row-identifier="' + courseTitle + '"]').not(this).filter(':last').after($(this));
				} else {
					courseIdentifiersMet.push(courseTitle);
				}
			});
			// Now that we've got them in order, use rowspan on course title td to tidy up
			$.each(courseIdentifiersMet, function (idx, courseIdentifier) {
				var group = $(that).find('tr[rc24-row-identifier="' + courseIdentifier + '"]');
				if (group.length > 1) {
					group.eq(0).find('td:first').attr('rowspan', group.length).addClass('rc24-got-rowspanned');
					group.not(':first').each(function () {
						$(this).find('td:first').hide();
					});
				}
			});

		});

		shareWrap();
		labelBarRC023();

		function shareWrap(){
			//adding email Bar
			var courseNames = $('.rc24-wrapper .rc24-courseListingGroup tr > td:nth-child(1)');
			courseNames.each(function () {
				$(this).append('<div class="rc24-shareBar"><span class="rc24-courseUrl"></div>');
			});
			var shareIcons = [
				['//useruploads.visualwebsiteoptimizer.com/useruploads/286844/images/2d13f51d08c6a7c29d629275f69ac3e5_close-envelope.png', 'Email'],
				['//useruploads.visualwebsiteoptimizer.com/useruploads/286844/images/24b6c7353ef219dd3610c33923bc1a4a_link.png', 'URL']
			];
			$.each(shareIcons, function () {
				var icon = this[0],
					name = this[1];
				$('.rc24-shareBar').each(function () {
					$(this).append([
						'<div class="rc24-shareBox">',
						'<img src="' + icon + '"/>',
						'<span>Share by ' + name + '</span>',
						'</div>'
					].join(''));
				});
			});


			//create & open the share url box
			var shareBarwrap = $('.rc24-shareBar');
			var openUrl = $([
				'<div class="rc24-urlcopy">',
					'<img src="//useruploads.visualwebsiteoptimizer.com/useruploads/286844/images/24b6c7353ef219dd3610c33923bc1a4a_link.png"/>',
					'<p></p>',
					'<div class="rc24-copyButton">Copy</div>',
					'<span class="rc24-exitshare">X</span>',
				'</div>'
			].join(''));
			$(openUrl).appendTo(shareBarwrap);

			shareBarwrap.each(function () {
				$(this).find('.rc24-shareBox:last').click(function () {
					var sharebox = $(this).parent();
					sharebox.addClass('rc24shareopts-hidden');
				});
				$(this).find('.rc24-urlcopy span').click(function () {
					var exitbox = $(this).closest('.rc24-shareBar');
					exitbox.removeClass('rc24shareopts-hidden');
				});
			});

		function courseLinks (){
			//get course location for the search
			var courseLocation = $('.main-content h1').text().trim();
			var locationName = courseLocation.substr(0, courseLocation.indexOf('-')); 


			//GROUP ALL BY data attr
			$('.rc24-courseRow.rc24-coursetableName').each(function () {
				var courseAttr = $(this).attr('rc24-row-identifier');
				if (!$(this).parent().hasClass("rc24-courseRowWrap")) {
					$(".rc24-courseRow.rc24-coursetableName[rc24-row-identifier='" + courseAttr + "']").wrapAll('<tbody class="rc24-courseRowWrap"/>');
				}
			});

			$('.course-result-name').each(function () {
				var courseresultName = $(this);
				//adding links to each course result
				var text = courseresultName.find('span:eq(1)').text().trim();
				var newLink,
					courseID,
					productId;
				switch (text) {
					case 'First aid at work':
						newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/First-aid-at-work.aspx';
						productId = '306-ct';
						courseID = '6c5cc743-d456-4faf-8694-5bb87c8556e5';
						break;
					case 'First aid at work (1 day a week)':
						newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/First-aid-at-work-1-day-a-week.aspx';
						productId = '308-ct';
						courseID = '456fb14f-68e8-484d-889a-a413b126b3e6';
						break;
					case 'First aid at work requalification':
						newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/First-aid-at-work-requalification.aspx';
						productId = '307-ct';
						courseID = 'bc197a39-01f9-45ad-a46d-dc27690d0043';
						break;
					case 'Emergency first aid at work':
						newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Emergency-first-aid-at-work.aspx';
						productId = '305-ct';
						courseID = '536928a6-fe53-44f3-aaa7-6ba10d73b44a';
						break;
					case 'First aid for appointed persons':
						newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/First-aid-for-appointed-persons.aspx';
						productId = '594-ct';
						courseID = '648a58a0-4afe-4892-afa4-e8876cbcb520';
						break;
					case 'First aid annual skills update':
						newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Annual-skills-update.aspx';
						productId = '327-ct';
						courseID ='e1fa21c7-80ec-471d-b52b-c753dc183f8d';
						break;
					case 'Paediatric first aid':
						newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Paediatric-first-aid.aspx';
						productId = '540-ct';
						courseID ='01235a45-e7a7-4377-a284-c5f92048136a';
						break;
					case 'Paediatric first aid (2 days in 2 weeks)':
						newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Paediatric-first-aid-two-weeks.aspx';
						productId = '539-ct';
						courseID ='4064cd0c-5a85-4558-b4ad-944e80191711';
						break;
					case 'Emergency paediatric first aid':
						newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Emergency-paediatric-first-aid.aspx';
						productId = '607-ct';
						courseID = '032d9c79-a89a-4d60-a103-4d22b08fc6d0';
						break;
					case 'Fire marshal training':
						newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Fire-marshal-training.aspx';
						productId = '591-ct';
						courseID = 'db01b7bf-c944-4c30-8de7-6d337a07d0a9';
						break;
					case 'Automated external defibrillators (AED)':
						newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/AED-scheduled.aspx';
						productId = 'CT-AE2';
						courseID = '083e35fc-9739-4f37-a3a5-586b9a455bc3';
						break;
					case 'AED with life support':
						newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/AED-with-life-support-scheduled.aspx';
						productId = '226-ct';
						courseID = '433b1212-c682-4b9a-8e7e-f996e9d170da';
						break;
					case 'First aid for baby and child':
						newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-public-courses/First-aid-for-baby-and-child.aspx';
						productId = '358-ct';
						courseID = '03e3bf08-7d24-4fda-a3ae-fae0254a84b5';
						break;
					case 'First aid for baby and child (evenings)':
						newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-public-courses/First-aid-for-baby-and-child.aspx';
						productId = '359-ct';
						courseID = '5ede371a-eb4d-4c8d-bb84-fe9d3b2758dc';
						break;
					case 'First aid for adult':
						newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-public-courses/First-aid-for-baby-and-child.aspx';
						productId = '382-ct';
						courseID = '5ae41926-0d16-4509-a417-5ee27c8aa8a7';
						break;
					case 'First aid for adult (evenings)':
						newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-public-courses/first-aid-for-adult-evenings.aspx';
						productId = '383-ct';
						courseID = '272f96fc-d7d0-4499-8b7e-d7af23bbaa2b';
						break;
				}
	
				//Wrap each course title with the course link
				courseresultName.wrapAll('<a href="'+newLink+'"/>');


				//Create URL to be added on share bar
				var courseProductID = productId;
				var searchURLone = 'https://www.redcrossfirstaidtraining.co.uk/Where-we-train/EventsSearch.aspx?courseSCId=',
					Id = '&productId='+productId,
					location = '&location='+locationName;


				var courseURL = searchURLone +courseID + Id + location;
	
	
				courseresultName.closest('.rc24-courseRowWrap').find('.rc24-shareBar').find('.rc24-shareBox:first').click(function () {
					window.location.href = "mailto:send@example.com?subject=Red%20Cross%20Training%20Course&body=I%20just%20found%20this%20course%20on%20Red%20Cross%20Training%20%0D%0A%0D%0A" + encodeURIComponent(courseURL);

					utils.events.send('RC024 - Venue Page Redesign','Share email click','Clicked share by email',{
						sendOnce: true
					});
					
				});
				if (newLink) {
					courseresultName.parent().parent().find('.rc24-urlcopy p').append('<input id ="rc24urlcopy" class="rc24-url" value="' + courseURL + '"/>');
				}
	
				//copy to clipboard
				courseresultName.parent().parent().find('.rc24-copyButton').click(function () {
					
					var urlCopy = $(this).parent().find('#rc24urlcopy');
					urlCopy.focus();
					urlCopy.find('#rc24urlcopy').select();
					document.execCommand('selectAll', false, null);
					document.execCommand('copy');

					var rc24urlshareevent;
						utils.events.send('RC024 - Venue Page Redesign','Copy URL click','Copied course url on share by URL',{
							sendOnce: true
						});
				});
			});

				//if group has more than 3 then hide the rest behind a show more dates link
				var groups = $('.rc24-courseRowWrap').each(function(){ 
					var courseGroup = $(this),
					courseGroupDates = courseGroup.find('.rc24-courseRow.rc24-coursetableName');
					var showMoredates = $('<div class="rc24-showMoredates">Show more dates for this course<span></span></div>');
					var courseDesc = courseGroup.find('.rc24-got-rowspanned .course-result-description');
					showMoredates.insertAfter(courseDesc);

					if(courseGroupDates.length > 3){
						courseGroupDates.filter(':gt(2)').addClass('rc24-courseRowhidden');
					}

					showMoredates.click(function(){

						var $this = $(this);
						$this.closest('.rc24-courseRowWrap').find('.rc24-courseRow.rc24-coursetableName').filter(':gt(2)').toggleClass('rc24-courseRowhidden');

						if($(courseGroupDates).hasClass('rc24-courseRowhidden')){
							$this.addClass('rc24-showmore-showing');
							$this.removeClass('rc24-showless-showing');
							showMoredates.html('Show more dates for this course<span></span>');
							
						}else{
							$this.removeClass('rc24-showmore-showing');
							$this.addClass('rc24-showless-showing');
							showMoredates.html('Show fewer dates for this course<span></span>');
						}
					});
				});
			}
			courseLinks ();
		}

			//Label bar form RC023
			function labelBarRC023(){
				var labelBar = $([
					'<div class="rc24-labelbar">',
					'<div class="rc24-labels"><div class="rc24-datetime">Date/Time</div><div class="rc24-price">Price</div></div>',
					'</div>'].join(''));
				labelBar.prependTo('.rc24-wrapper > td');

				//wrap all the times & dates in divs to add the icons
				var courseDate = $('.course-col-date');
				courseDate.each(function(){
					var date = $(this);
						var dates = this.childNodes;
						for (var i=0,len=dates.length;i<len;i++){
							if (dates[i].nodeName == '#text'){
								$(dates[i]).wrap('<div class="rc24-resulttimes"/>');
							}
						}
					date.find('.rc24-resulttimes:last').prepend('<img src="https://d30y9cdsu7xlg0.cloudfront.net/png/17392-200.png"/>');
					date.find('.rc24-resulttimes:first').prepend('<img src="https://d30y9cdsu7xlg0.cloudfront.net/png/404-200.png"/>');
				});


				//Move price into new column with CTA
				$('.rc24-courseListingGroup .rc24-coursetableName').each(function(){
					var tableName = $(this);
					var price = tableName.find('.course-col-price'),
						booking = tableName.find('.course-result-cart');
					price.prependTo(booking);
				});
			}
		}
		courseListing();


		/*--------------------------------------
		If more than 5 results add show more link and only show first 5
		---------------------------------------*/
		function showMore(){
			var $showMoreButton = $('<div class="rc24-morebutton">Show more courses<span></span></div>');
			$showMoreButton.appendTo('.course-search-container');
			
			var $courseGroup = $('.rc24-courseRowWrap');
			var $courseGroupRows = $courseGroup.find('.rc24-courseRow.rc24-coursetableName');

			if($courseGroupRows.length > 5){
				moreLink();
			}else{
				return;
			}
			
			$showMoreButton.click(function(){
				utils.events.send('RC024 - Venue Page Redesign','Show more click','Show more courses clicked',{
					sendOnce: true
				});
			});
				
			//Show more button
			function moreLink(){
				$showMoreButton.addClass('rc24-more-showing');
				
				$courseGroup.not(':first').not(':eq(1)').addClass('rc24-courserow-hidden');
		
				$showMoreButton.click(function(){
					var button = $(this);
					$courseGroup.not(':first').not(':eq(1)').toggleClass('rc24-courserow-hidden');
					if($courseGroup.hasClass('rc24-courserow-hidden')){
						button.text('Show more courses');
					}else{
						button.text('Show fewer courses');
					}
				});
			}
		}
		showMore();
		/*--------------------------------------
		Course finder from RC017
		---------------------------------------*/
		courseFinder();
		};
		

		

	/*-------------------------------------- 
	Activation
	---------------------------------------*/
	var _triggers = function(options) {
		utils.fullStory('RC024', 'Variation 1');
		UC.poller([
			'body',
			'.venue-top',
			'.venue-summary-info',
			'.course-search-results',
			'.venue-location-map',
			'#title_over_venue_search',
			'.course-search-head-txt',
			'#main_0_contentmain_0_refineSearch_DropDownList_CourseNames-button',
			], _activate);
	};
	_triggers();

})();