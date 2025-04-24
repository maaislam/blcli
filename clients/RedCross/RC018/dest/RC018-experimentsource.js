var RC018 = (function() {

	$('body').addClass('RC018');
	
		//.appendTo($('.course-search-results table tbody tr:first-child > td'));

	$('.course-search-results table tbody tr .course-venue-distance').each(function(){
		var el = $(this),
			elTarget = el.closest('td');

		if(elTarget.parent().is(':first-child')){
			el	
				.prepend('<p>This is your nearest centre</p>')
				.appendTo(elTarget);
		}
		else{
			el.addClass('RC_align_row').appendTo(elTarget);
		}

		el.append(' away');
	});

	$('.course-show-venue-results').each(function(){
		var el = $(this),
			elTarget = el.closest('td').find('.course-venue-name');

		el.appendTo(elTarget);
	});


	$('th.course-col-name').text('Course/Location');
	$('th.course-col-date').text('Length');

	/*
		Go through each location course row
			go through and count each with same name and add class

		Go back through each variation of the class
			pull time, price, and add to basket code and make new design with this

	 */

	var tableRow = $('.course-search-results table tbody tr'),
		i = 0,
		obj = [];

	tableRow.each(function(){
		var el = $(this);

		if(el.hasClass('course-search-location')){

		}
		else{
			var titleText = el.find('.course-result-name input + span').text();
			
			obj.push(titleText);

			
		}
	});

	$.unique(obj);

	var num;
	for (num = 0; num < obj.length; ++num) {
		var findText = tableRow.find(".course-result-name input + span:contains('" + obj[num] + "')");

		findText.closest('tr').addClass('RC_matching_course_' + i);
		i++;
	}

	for (num = 0; num < i; ++num) {
		var findText = tableRow.find(".course-result-name input + span:contains('" + obj[num] + "')");

		findText.closest('tr').addClass('RC_matching_course_' + i);
		i++;
	}
})();