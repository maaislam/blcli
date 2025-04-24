import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as content from './lib/PU004-content.js';

const PU004 = (() => {
	let $ = null;

	// ---------------------------------------------------------
	// When adding to the framework, specify PU004VARIATION = 1
	// ---------------------------------------------------------
 	let VARIATION = null;
	if(typeof PU004VARIATION != 'undefined') {
	    VARIATION = PU004VARIATION ;
    } else {
        VARIATION = 1;
    }
	

    const activate = () => {
		const $body = $('body');
		$body.addClass('PU004 PU004v'+VARIATION);

		//test based on variation
		let titleText,
		textContent,
		isnotMobile = window.innerWidth > 760;

		switch(VARIATION) {
			case 1:
				titleText = 'Get a GP appointment when you need one';
				textContent = "<p>All Push Doctor GPs are NHS-trained. It’s easy to book an appointment online at a time that suits you.</p></br><p>Our video consultations are 10 minutes long, just like with your regular GP. You can extend it if you need more time.</p>"
				break;
			case 2:
				titleText = 'Speak to a doctor <span class="PU004_time"/>';
				textContent = "<p>All Push Doctor GPs are NHS-trained. See a doctor over video call anytime between 6am - 11pm. It's easy to book an appointment online at a time that suits you.</p></br><p>Consultations are 10 minutes long, just like with your regular GP, but you can extend it if you need more time.</p>";
				break;
			case 3:
				titleText = 'Speak to a doctor <span class="PU004_time"/>';
				textContent = "<p>All Push Doctor GPs are NHS-trained. See a doctor over video call anytime between 6am - 11pm. It's easy to book an appointment online at a time that suits you.</p></br><p>Consultations are 10 minutes long, just like with your regular GP, but you can extend it if you need more time.</p>";
				break;
		}

		const URL = window.location.pathname;
		//add the new block of content
		const PU4newContent = () => {
			const moduleHtml = content.moduleContent;
			const newModule = $(`<div class="PU004-wrapper"/>`);


			//different pages with different content
			if(URL.indexOf('/ppc/private-doctor-generic-mobile') > -1) {

				newModule.insertAfter('#hs_cos_wrapper_widget_1479465312614');

			}else if (URL.indexOf('private-doctor-generic') > -1) {

				newModule.insertAfter('#hs_cos_wrapper_widget_1505149754405');

			}else if (URL.indexOf('/private-gp') > -1) {

				newModule.insertAfter('#hs_cos_wrapper_widget_1472125895818');

			}else if (URL.indexOf('/ppc/private-healthcare-mobile') > -1) {

				newModule.insertAfter('#hs_cos_wrapper_widget_1479465312614');

			}else {
				newModule.prependTo('.row-fluid-wrapper.row-depth-1.row-number-3:first');
			}
			const wrapper = $('.PU004-wrapper');
			wrapper.html(moduleHtml);
			wrapper.find('h2').html(titleText);
			$('.PU4_large_text').html(textContent);

			const lastText = content.bottomContent;
			$('.PU4-bottom_copy').html(lastText);

			//If between 6am & 10pm change the text
			const date = new Date(),
			currentHour = date.getHours();

			let CTAtext = $('.PU4-book');
			if(currentHour >= 6 && currentHour <= 22){
				CTAtext.text('Appointments available today');
			}else{
				CTAtext.text('Book an appointment');
			}

			if(isnotMobile){
				const book = $('.PU4-book');
				book.appendTo('.PU4-content');
			}
		}
		PU4newContent();

		//-------------------------
		//Add the exact minute to next appointment of V2
		//-------------------------
			
		const nextAppointment = () => {
			
			function ajaxRequest(url, successCb) {
				var request = new XMLHttpRequest();
				request.open('POST', url, true);
				request.setRequestHeader('Content-Type', 'application/json');
				request.setRequestHeader('Accept', 'application/json');
				request.onload = function() {
					if (request.status >= 200 && request.status < 400) {
						if (successCb) {
							successCb(request.responseText);
						}
					}
				};

				request.send();
			}
			const appointmentTimeEl = document.querySelector('.PU004_time');
			
			if (appointmentTimeEl) {
				ajaxRequest('https://svcs.pushsvcs.com/general.svc/generalW/GetHomeMessage', (response) => {
					var json = JSON.parse(response);
					var strTop = json.GetHomeMessageResult.strTop;
					const mins = strTop.match(/\d+/);
					let content;
					if (mins) {
						content = `in the next ${mins[0]} minutes`;
					} else {
						switch (strTop) {
							case 'Book an appointment today':
							content = 'today';
							break;
							
							case 'We’re open at 6am, book now':
							content = 'from 6am';
							break;
		
							default:
							break;
						}
					}
					
					appointmentTimeEl.innerHTML = content;
				});
			}
		}
		if(VARIATION === 2 || VARIATION === 3){
			nextAppointment();
		}

		//Social Proof
		const reviews = () => {
			const reviewWrap = $(`<div class="PU4-reviews"><div class="PU4-reviews-slider"/></div>`),
			reviewSlider = reviewWrap.find('.PU4-reviews-slider');
			reviewWrap.insertAfter('.PU4-bottom_copy');
			const allReviews = content.reviews;

			allReviews.forEach(element => {
				$(`<li class="PU4-review">${element}</li>`).appendTo(reviewSlider);	
			});

			reviewSlider.slick({
				autoplay: true,
			});

			reviewWrap.append(`
			<div class="PU4-review_link">
			<h2>Verified Trust Pilot reviews</h2>
				<p><a target="_blank"href="https://uk.trustpilot.com/review/pushdoctor.co.uk?utm_medium=trustboxes&utm_source=Grid">See all 1000+ reviews on <span></span></a></p>
			</div>`);

			if(isnotMobile){
				const review_link = $('.PU4-review_link');
				review_link.insertBefore(reviewSlider);
			}

		
		}
		if(VARIATION === 3){
			$.getScript('//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', function() {
				reviews();
			});
		}

	};

    // Audience conditions
    const triggers = ((options) => {
        UC.poller([
            'body',
            () => {
                return !!window.jQuery;
            }
            ], () => {
             $ = window.jQuery;
             utils.fullStory('PU004', 'Variation '+VARIATION);
             activate();
            });
    })();

})();