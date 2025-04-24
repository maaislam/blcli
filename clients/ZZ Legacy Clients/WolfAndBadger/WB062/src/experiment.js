import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

// ID - Experiment Title
const WB062 = (() => {

	// Experiment code
	const activate = () => {
		document.body.classList.add('WB062');
		let $ = jQuery;


		let banner = $(`<div class="WB62-saleBanner"><div class="WB62-bannerInner"><div class="WB62-bannerlinks"/></div></div>`);
		banner.prependTo('#content');


		let bannerLinks = [
			['kids','https://www.wolfandbadger.com/uk/category/kids/?onsale=true'],
			['home','https://www.wolfandbadger.com/uk/category/homewares/?onsale=true'],
			['men','https://www.wolfandbadger.com/uk/category/men/?onsale=true'],	
			['women','https://www.wolfandbadger.com/uk/category/women/?onsale=true'],		
		]
		$.each(bannerLinks,function(){
			let bannerLinktitle = this[0],
				bannerLink = this[1];

			banner.find('.WB62-bannerlinks').prepend(`<div class="WB62-saleLink"><a href="${bannerLink}">${bannerLinktitle}</a></div>`);	
		});

		const bannerBackground = $('.WB62-bannerInner');

		//change banner on certain date
		let date = new Date(),
			targetDate = new Date('2018-01-12 07:00');
		let dateDiff = date - targetDate;

		if(dateDiff > 0){
			if($(window).width() > 700){
				bannerBackground.css({'background-image':'url("//dd6zx4ibq538k.cloudfront.net/static/images/4347/caf203d55f0880c9568f5495d3524a8c_1200_209.png")'}); 
			}else{
				bannerBackground.css({'background-image':'url("//dd6zx4ibq538k.cloudfront.net/static/images/4347/b188963bafe459fcd8c8a7456cda07b2_600_557.png")'}); 
			}

		}
	}

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('WB062', 'Variation 1');

		activate();
	})();

})();
