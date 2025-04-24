var RC018 = (function () {


	$('body').addClass('RC018');

	//.appendTo($('.course-search-results table tbody tr:first-child > td'));

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


	var courseResult = $('.course-result-cart .course-result-cart-wrapper');

	courseResult.each(function () {
		var bookNow = $(this).find('.button-primary.button-addtocart.form-btnAutoSubmit'),
			courseAmount = $(this).find('span'),
			qty = $(this).find('.js-number');

		$(qty).wrapAll('<div class="rc18-qtyBox"/>');
		$(this).find('.rc18-qtyBox').append(courseAmount);

	});

	//count amount of courses
	//$('.course-search-results tr').not(':first').length;
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

	// For each nested table of courses, group them by 
	$('.rc18-courseListingGroup').each(function () {
		var that = this;

		// For each row, order it in the table by course name 
		var courseIdentifiersMet = [];
		$(that).find('tr').each(function () {
			var courseTitle = $(this).find('.course-result-name > span:first').text().trim();

			$(this).attr('rc18-row-identifier', courseTitle);
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
				$(courseLocation).not(this).removeClass('rc18-courseActive')
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

	var courseNames = $('.rc18-got-rowspanned');

	courseNames.each(function () {
		$(this).append('<div class="rc18-shareBar"><span class="rc18-courseUrl"></div>');
	});

	var shareIcons = [
		['//useruploads.visualwebsiteoptimizer.com/useruploads/286844/images/2d13f51d08c6a7c29d629275f69ac3e5_close-envelope.png', 'Email'],
		['//useruploads.visualwebsiteoptimizer.com/useruploads/286844/images/24b6c7353ef219dd3610c33923bc1a4a_link.png', 'Url']
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

	var shareBarwrap = $('.rc18-courseRow .rc18-shareBar');

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

	shareBarwrap.each(function () {

		$(this).find('.rc18-shareBox:last').click(function () {
			var sharebox = $(this).parent();
			sharebox.addClass('rc18shareopts-hidden');
		});

		$(this).find('.rc18-urlcopy span').click(function () {
			console.log('click');
			var exitbox = $(this).closest('.rc18-shareBar');
			exitbox.removeClass('rc18shareopts-hidden');
		});


		

	});


	$('.course-result-name').each(function () {


		var text = $(this).find('span:first').text().trim();
		var newLink;

		switch (text) { //if text = clothing new link = ''
			case 'First aid at work':
				newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/First-aid-at-work.aspx'
				break;
			case 'First aid at work (1 day a week)':
				newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/First-aid-at-work-1-day-a-week.aspx';
				break;
			case 'First aid at work requalification':
				newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/First-aid-at-work-requalification.aspx';
				break;
			case 'Emergency first aid at work':
				newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Emergency-first-aid-at-work.aspx';
				break;
			case 'First aid for appointed persons':
				newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/First-aid-for-appointed-persons.aspx';
				break;
			case 'First aid annual skills update':
				newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Annual-skills-update.aspx';
				break;
			case 'Paediatric first aid':
				newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Paediatric-first-aid.aspx';
				break;
			case 'Paediatric first aid (2 days in 2 weeks)':
				newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Paediatric-first-aid-two-weeks.aspx';
				break
			case 'Emergency paediatric first aid':
				newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Emergency-paediatric-first-aid.aspx';
				break;
			case 'Fire marshal training':
				newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Fire-marshal-training.aspx';
				break;
			case 'Automated external defibrillators (AED)':
				newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/AED-scheduled.aspx';
				break;
			case 'AED with life support':
				newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/AED-with-life-support-scheduled.aspx';
				break;
			case 'First aid for baby and child':
				newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-public-courses/First-aid-for-baby-and-child.aspx';
				break;
			case 'First aid for baby and child (evenings)':
				newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-public-courses/First-aid-for-baby-and-child.aspx';
				break;
			case 'First aid for adult':
				newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-public-courses/First-aid-for-baby-and-child.aspx';
				break;
			case 'First aid for adult (evenings)':
				newLink = 'https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-public-courses/first-aid-for-adult-evenings.aspx';
				break;
		}

		if (newLink) {
			$(this).parent().find('.rc18-urlcopy p').append('<input id ="rc18urlcopy" class="rc18-url" value="' + newLink + '"/>');
		}


		//copy to clipboard
		$('.rc18-urlcopy').each(function () {
			$('.rc18-copyButton').click(function () {
				$(this).parent().find('#rc18urlcopy').focus();
				$(this).parent().find('#rc18urlcopy').select();
				document.execCommand('copy');
			});
		});


		//email click
		$(this).parent().find('.rc18-shareBar').find('.rc18-shareBox:first').click(function(){
			window.location.href = "mailto:send@example.com?subject=Red%20Cross%20Training%20Course&body=I%20just%20found%20this%20course%20on%20Red%20Cross%20Training%20"+newLink;
		});


	});

})();