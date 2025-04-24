import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const MP077 = (() => {
	let $ = null;

	const activate = () => {
		const $body = $('body');
		$body.addClass('MP077');

		const productDesc = $('.productDetail .pb-2'),
		slideOutDesc = $('.productDetail_panelContent.col-xs-12.p-md-0').html();
		productDesc.html(slideOutDesc);

		const readmoreLink = $('<div class="MP077-readmore">Read more</div>');
		readmoreLink.appendTo(productDesc);

		readmoreLink.on('click', () => { 
			if(readmoreLink.text() === 'Read more'){
				readmoreLink.text('Read less');
				productDesc.addClass('MP077-showall');
			}else{
				readmoreLink.text('Read more');
				productDesc.removeClass('MP077-showall');
			}
		});
		$('#PDP-Information .productDetail_panelHeading.m-0.py-4').text('Delivery options explained');

		//move stock message
		const stock = $('.productDetail .py-3');
		stock.insertAfter('.productDetail .productDetail_price');
	}

	// Audience conditions
	const triggers = ((options) => {
		UC.poller([
			() => {
				return !!window.jQuery;
			}
		], () => {
			$ = window.jQuery;
			utils.fullStory('MP077', 'Variation 1');
			activate();
		});
	})();

})();
