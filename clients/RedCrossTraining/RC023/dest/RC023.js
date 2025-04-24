var _RC023 = (function() {
	// Plugins and Helpers
	/**
	 * UC Library - Poller
	 * @version 0.2.2
 	 */
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	// Triggers
	var _triggers = (function() {
		UC.poller([
          	'td',
            '.course-venue-name',
            '.course-result-name',
            '.course-search-results table tbody tr .course-venue-distance',
             '.course-result-cart',
          	 //'.RC002',
			function() { return window.jQuery; },
			function() { return window.ga; }
		], activate);
	})();
	
	function activate() {
	var $ = window.jQuery;
      
	// Full Story Integration
	UC.poller([
		function () {
			var fs = window.FS;
			if (fs && fs.setUserVars) return true;
		}
	], function () {
		window.FS.setUserVars({
			experiment_str: 'RC023',
			variation_str: 'Variation 1'
		});
	}, {
		multiplier: 1.2,
		timeout: 0
	});
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
	$('body').addClass('RC023');
	  
	  // -----------------------------------------------
      // ALL TAKEN FROM RC018
      // -----------------------------------------------

	function rc018() {

		if($('body').hasClass('RC018')){
			return false;
		}
		if (navigator.userAgent.match(/Trident.*rv:11\./)) {
			$('body').addClass('rc23-ie11');
		}

		//Looping through each course row
		$('.course-search-results table tbody tr .course-venue-distance').each(function () {
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
		$('.table-responsive tr').not('.course-search-location').addClass('rc18-courseRow');
		var courseLocation = $('.course-search-location');
		if (courseamountNumber > 3) {
			$('.course-search-location:first').addClass('rc18-firstResult');
			courseLocation.not(':first').addClass('rc18-moreThan3');
			courseLocation.not(':first').find('td').append('<span class="rc18-morethan">View all courses<img src="//useruploads.visualwebsiteoptimizer.com/useruploads/286844/images/1a159ebe1427bd982a0ea8f3ba9327bc_angle-arrow-down_(1).png"/></span>');
		}
		courseLocation.each(function () {
			$(this).nextUntil(courseLocation).wrapAll('<tr class="rc18-wrapper"><td colspan="4"><table class="rc18-courseListingGroup" width="100%"></table></td></tr>');
		});

		//change add to basket text to book now
		$('.button-primary.button-addtocart.form-btnAutoSubmit').each(function () {
			$(this).val('BOOK NOW');
		});

		// For each nested table of courses, group them by 
		$('.rc18-courseListingGroup').each(function () {
			var that = this;
			// For each row, order it in the table by course name 
			var courseIdentifiersMet = [];
			$(that).find('tr').each(function () {
				var courseTitle = $(this).find('.course-result-name > span[id*=CourseName]').text().trim();
				$(this).attr('rc18-row-identifier', courseTitle);
				$(this).addClass('rc18-coursetableName');
				if (courseIdentifiersMet.indexOf(courseTitle) > -1) {
					// Move the course to after already existing row of this type 
					$('tr[rc18-row-identifier="' + courseTitle + '"]').not(this).filter(':last').after($(this));
				} else {
					courseIdentifiersMet.push(courseTitle);
				}
			});
			// Now that we've got them in order, use rowspan on course title td to tidy up
			$.each(courseIdentifiersMet, function (idx, courseIdentifier) {
				var group = $(that).find('tr[rc18-row-identifier="' + courseIdentifier + '"]');
				if (group.length > 1) {
					group.eq(0).find('td:first').attr('rowspan', group.length).addClass('rc18-got-rowspanned');
					group.not(':first').each(function () {
						$(this).find('td:first').hide();
					});
				}
			});
		});
		//Collapsing locations
		$('.rc18-wrapper:first').addClass('rc18-firstresultWrap');
		courseLocation.not(':first').click(function () {
			if (!$(this).hasClass('rc18-courseActive')) {
				$(this).addClass('rc18-courseActive');
				$(this).next('.rc18-wrapper').addClass('rc18-courseVisible');
				if ($(courseLocation).not(this).hasClass('rc18-courseActive')) {
					$(courseLocation).not(this).removeClass('rc18-courseActive');
					$(courseLocation).not(this).next('.rc18-wrapper').removeClass('rc18-courseVisible');
				}
			} else {
				if ($(this).hasClass('rc18-courseActive')) {
					$(this).removeClass('rc18-courseActive');
					$(this).next('.rc18-wrapper').removeClass('rc18-courseVisible');
				}
			}
		});
		//adding email Bar
		var courseNames = $('.rc18-wrapper .rc18-courseListingGroup tr > td:nth-child(1)');
		courseNames.each(function () {
			$(this).append('<div class="rc18-shareBar"><span class="rc18-courseUrl"></div>');
		});
		var shareIcons = [
			['//useruploads.visualwebsiteoptimizer.com/useruploads/286844/images/2d13f51d08c6a7c29d629275f69ac3e5_close-envelope.png', 'Email'],
			['//useruploads.visualwebsiteoptimizer.com/useruploads/286844/images/24b6c7353ef219dd3610c33923bc1a4a_link.png', 'URL']
		];
		$.each(shareIcons, function () {
			var icon = this[0],
				name = this[1];
			$('.rc18-shareBar').each(function () {
				$(this).append([
					'<div class="rc18-shareBox">',
					'<img src="' + icon + '"/>',
					'<span>Share by ' + name + '</span>',
					'</div>'
				].join(''));
			});
		});
		var shareBarwrap = $('.rc18-shareBar');
		//open url box
		var openUrl = $([
			'<div class="rc18-urlcopy">',
			'<img src="//useruploads.visualwebsiteoptimizer.com/useruploads/286844/images/24b6c7353ef219dd3610c33923bc1a4a_link.png"/>',
			'<p></p>',
			'<div class="rc18-copyButton">Copy</div>',
			'<span class="rc18-exitshare">X</span>',
			'</div>'
		].join(''));
		$(openUrl).appendTo(shareBarwrap);
		var sharelinkevent;
		shareBarwrap.each(function () {
			$(this).find('.rc18-shareBox:last').click(function () {
				var sharebox = $(this).parent();
				sharebox.addClass('rc18shareopts-hidden');
				if (!sharelinkevent) {
					sendEvent('RC023', 'click', 'Red Cross Training — Search Results Iteration - User clicked share url link', true);
					sharelinkevent = true;
				}
			});
			$(this).find('.rc18-urlcopy span').click(function () {
				var exitbox = $(this).closest('.rc18-shareBar');
				exitbox.removeClass('rc18shareopts-hidden');
			});
		});

		//Create approved logos


		$('.course-result-name').each(function () {

			//adding links to each course result
			var text = $(this).find('span:first').text().trim();
			var newLink,
				courselogo,
				productId;
			switch (text) {
				case 'First aid at work':
					newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/First-aid-at-work.aspx';
					courselogo = 'HSE recognised';
					productId = '306-ct';
					break;
				case 'First aid at work (1 day a week)':
					newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/First-aid-at-work-1-day-a-week.aspx';

					productId = '308-ct';
					break;
				case 'First aid at work requalification':
					newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/First-aid-at-work-requalification.aspx';
					courselogo = 'HSE recognised';
					productId = '307-ct';
					break;
				case 'Emergency first aid at work':
					newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Emergency-first-aid-at-work.aspx';
					courselogo = 'HSE recognised';
					productId = '305-ct';
					break;
				case 'First aid for appointed persons':
					newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/First-aid-for-appointed-persons.aspx';

					productId = '594-ct';
					break;
				case 'First aid annual skills update':
					newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Annual-skills-update.aspx';

					productId = '327-ct';
					break;
				case 'Paediatric first aid':
					newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Paediatric-first-aid.aspx';

					productId = '540-ct';
					break;
				case 'Paediatric first aid (2 days in 2 weeks)':
					newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Paediatric-first-aid-two-weeks.aspx';

					productId = '539-ct';
					break;
				case 'Emergency paediatric first aid':
					newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Emergency-paediatric-first-aid.aspx';

					productId = '607-ct';
					break;
				case 'Fire marshal training':
					newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Fire-marshal-training.aspx';

					productId = '591-ct';
					break;
				case 'Automated external defibrillators (AED)':
					newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/AED-scheduled.aspx';
					productId = 'CT-AE2';
					break;
				case 'AED with life support':
					newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/AED-with-life-support-scheduled.aspx';

					productId = '226-ct';
					break;
				case 'First aid for baby and child':
					newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-public-courses/First-aid-for-baby-and-child.aspx';
					productId = '358-ct';
					break;
				case 'First aid for baby and child (evenings)':
					newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-public-courses/First-aid-for-baby-and-child.aspx';
					productId = '359-ct';
					break;
				case 'First aid for adult':
					newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-public-courses/First-aid-for-baby-and-child.aspx';
					productId = '382-ct';
					break;
				case 'First aid for adult (evenings)':
					newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-public-courses/first-aid-for-adult-evenings.aspx';
					productId = '383-ct';
					break;
			}

			/*adding recognised logos*/

			if (courselogo) {
				var logosBar = $('<div class="rc18-logoBar"><p>' + courselogo + '</p></div>');
				var courseNameLogo = $(this).parent().find('.course-result-name');
				courseNameLogo.after(logosBar);
			}

			//email click

			//creating email URL
			var newLink = window.location.href;
			var courseProductID = productId;
			var RegExone = new RegExp(/.*(productId)/g);
			var RegExthree = new RegExp(/(\&type).*/g);
			var URLstep1 = newLink.match(RegExone);
			var URLstep3 = newLink.match(RegExthree);
			var newEmailURL = URLstep1 + courseProductID + URLstep3;


			$(this).parent().find('.rc18-shareBar').find('.rc18-shareBox:first').click(function () {
				window.location.href = "mailto:send@example.com?subject=Red%20Cross%20Training%20Course&body=I%20just%20found%20this%20course%20on%20Red%20Cross%20Training%20%0D%0A%0D%0A" + encodeURIComponent(newEmailURL);
				var emailclickevent;
				if (!emailclickevent) {
					sendEvent('RC023', 'click', 'RC023 - User clicked share by email', true);
					emailclickevent = true;
				}
			});
			if (newLink) {
				$(this).parent().find('.rc18-urlcopy p').append('<input id ="rc18urlcopy" class="rc18-url" value="' + newEmailURL + '"/>');
			}


			//copy to clipboard
			$('.rc18-urlcopy').each(function () {
				$(this).find('.rc18-copyButton').click(function () {
					var urlCopy = $(this).parent().find('#rc18urlcopy');
					urlCopy.focus();
					urlCopy.find('#rc18urlcopy').select();
					document.execCommand('copy');

					var URLclickevent;
					if (!URLclickevent) {
						sendEvent('RC023', 'click', 'RC023 User clicked share by URL, URL is '+newEmailURL, true);
						URLclickevent = true;
					}
				});
			});
		});

	}
	// -----------------------------------------------
      // RC023 TEST CODE
      // -----------------------------------------------
	function rc023(){
		var labelBar = $([
				'<div class="rc23-labelbar">',
				 '<div class="rc23-labels"><div class="rc23-datetime">Date/Time</div><div class="rc23-price">Price</div></div>',
				'</div>'].join(''));
		labelBar.prependTo('.rc18-wrapper .table-responsive');

		//wrap all the times & dates in divs to add the icons
		$('.course-col-date').each(function(){
				var dates = this.childNodes;
				for (var i=0,len=dates.length;i<len;i++){
					if (dates[i].nodeName == '#text'){
						$(dates[i]).wrap('<div class="rc23-resulttimes"/>');
					}
				}

				$(this).find('.rc23-resulttimes:last').prepend('<img src="https://d30y9cdsu7xlg0.cloudfront.net/png/17392-200.png"/>');
				$(this).find('.rc23-resulttimes:first').prepend('<img src="https://d30y9cdsu7xlg0.cloudfront.net/png/404-200.png"/>');
			});


		//Move price into new column with CTA
		$('.rc18-courseListingGroup .rc18-coursetableName').each(function(){
			var price = $(this).find('.course-col-price'),
				booking = $(this).find('.course-result-cart');

				price.prependTo(booking);
		});
	}
	rc018(); // can be turned off if not needed
	rc023();
}
})();