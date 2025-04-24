import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

// ID - Experiment Title
const MP064 = (() => {

	// Experiment code
	const activate = () => {
		document.body.classList.add('MP064');
		const $ = jQuery;

		const productImages = $('#js-desktopImageContainer');

		//remove blank unused elements rather than hide so they are not used in the slider when slicked
		productImages.find('.anchor').remove();
		productImages.find('.d-flex.justify-content-center.mt-3').remove();

		//slick the images
		productImages.slick({
			arrows: true,
			dots: true,
			arrows: true,
			slidesToShow: 1,
			customPaging : function(slider, i) {
				var thumb = $(slider.$slides[i]).attr('src');
				return '<a class="MP64-thumb" style="background-image:url('+thumb+')"></a>';
			},
		});

		//desktop arrows
		const arrowLeft = $('<i class="ico ico-chevronLeft"/>'),
			  arrowRight = $('<i class="ico ico-chevronRight"/>');
		productImages.find('.slick-prev.slick-arrow').text('').prepend(arrowLeft);
		productImages.find('.slick-next.slick-arrow').text('').prepend(arrowRight);


	};

	// Audience conditions
	const triggers = ((options) => {
		utils.fullStory('MP064', 'Variation 1');

		activate();
	})();

})();
