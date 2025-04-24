import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as products from './lib/ME118-products.js'
import * as productHtml from './lib/ME118-html.js'


const ME118 = (() => {
	const activate = () => {
		const $ = window.jQuery,
			  $body = $('body');
		
		$body.addClass('ME118v2');

		function missedProducts(){
			let $products = products.ME118Products,
				$url = window.location.pathname,
				$productObj,
				$productGrid = $('.products-listing .products.large-block-grid-4 li:nth-child(3)');

			//add badge to the product before this
			const $productBefore =  $('.products-listing .products.large-block-grid-4 li:eq(2)');
			$productBefore.find('.info.style-grid3').prepend('<div class="ME118-product_message-two"><span class="ME118-title">2nd Most Popular</span></div>');

			//determine which product to use based on url
			if($url.indexOf('/stuff/hoodies-and-sweatshirts/') > -1){
				$productObj = $products.hoodies;

			}else if($url.indexOf('/stuff/home-and-office/') > -1){
				$productObj = $products.homeOffice;

			}else if($url.indexOf('/stuff/t-shirts-and-tops/') > -1){
				$productObj = $products.tshirtsTops;

			}else if($url.indexOf('/stuff/toys-figures-and-plushies/') > -1){
				$productObj = $products.toysPlushies;
			}
			
			const missedProduct = productHtml.productMarkup;
			missedProduct.insertAfter($productGrid);

			//change images and title
			missedProduct.find('.ME118-productTitle').text($productObj.title);
			missedProduct.find('img').attr('src',$productObj.image);
			missedProduct.find('.ME118-category').attr('src',$productObj.category);

			missedProduct.click(function(){
				utils.events.send('ME118 V2', 'Grey Product Click', 'Greyed out product clicked', {
					sendOnce: true
				});
			});
		}
		missedProducts();

		//create the tooltips
		function toolTip(){
			const toolTips = [
				['ME11-message1','We have relationships directly with the makers. DC. Marvel. Nintendo. We buy limited amount of styles to keep things fresh - so once they`re gone, they`re gone!'],
				['ME11-message2','Our fans are from all around the world. Australia. UK. Kenya. China. We have some of the biggest and best fans in the world with over 200,000 facebook likes. Join them']

			]
			const toolTipWrap = $(`<div class="ME118-tooltip_wrap"/>`);
			toolTipWrap.prependTo($body);

			$.each(toolTips,function(){
				const messageId = $(this)[0],
					  messageText = $(this)[1];

				const toolTipMessage = $(`
				<div class="ME118-tooltip" id="${messageId}">
					<h3>Did you know?</h3><span>${messageText}</span>
				</div>`);
				toolTipMessage.appendTo('.ME118-tooltip_wrap');
			});

			//function to show each one
			function showTooltips(){
				let counter = 0,
					divs = $('#ME11-message1, #ME11-message2');

				//count the tooltips and add the class to hide/show each one
				function showTooltips () {
					divs.removeClass('ME118-active') // hide all divs
						.filter(function (index) { 
							return index == counter % 3; 
						})
						.addClass('ME118-active');
						setTimeout(function(){
							divs.removeClass('ME118-active');
						},6000);

					counter++;
				}; 

				showTooltips(); // show first div   

				let startTime = new Date().getTime();
				let interval = setInterval(function () {
					showTooltips(); 

					//if the all 3 divs have shown stop showing them
					if(new Date().getTime() - startTime > 60000){
						clearInterval(interval);
						$('.ME118-tooltip').removeClass('ME118-active')
						return;
					}
				}, 20000); 
			} 		
			
			//Show the tooltips every 20 seconds
			setTimeout(function(){
				showTooltips();
			}, 20000);
			

		}
		toolTip();
	};

	// Audience conditions
	const triggers = ((options) => {
		UC.poller([
			'.products-listing .products.large-block-grid-4 li',
			() => {
				return !!window.jQuery;
			},
			() => {
				return !!window.ga;
			}
			], () => {
			 $ = window.jQuery;
			 utils.fullStory('ME118', 'Variation 2'); 
			 activate();
			});
	})();

})();
