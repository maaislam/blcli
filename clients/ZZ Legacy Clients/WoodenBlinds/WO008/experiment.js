/* no_doc_ready */
var _WO008 = (function () {
	
	 // PLUGINS ------------------------------------
	// UC Library - Poller -- @version 0.2.2
	// ---------------------------------------------
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
		// Send GA Events With Tracker Name ------------
		// ---------------------------------------------
		function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}var trackerName;
		
			
	        // -----------------------------------------------
			// Full story integration
			// -----------------------------------------------
			UC.poller([
				function () {
					var fs = window.FS;
					if (fs && fs.setUserVars) return true;
				}
			], function () {
				window.FS.setUserVars({
					experiment_str: 'WO008',
					variation_str: 'Variation 1'
				});
			}, {
				multiplier: 1.2,
				timeout: 0
			});

			// Poll start
			UC.poller([
				'body',
				'#content .tab_container',
				'#content .tabs',
				'#content .tabs li',
				'#content .col-md-5',
				function () {
					if (window.jQuery) return true;
				},
				function () {
					if (window.ga) return true;
				}
			], WO008, {
				timeout: 7000,
				multiplier: 'disable'
			});
			// Variation
			function WO008() {

				var $ = window.jQuery;
				$('body').addClass('WO008');


				sendEvent('WO008', 'Page View', 'WO008 - Product Page sections', true);

				function underTheFold() {
					var pollerOpts = {
						timeout: 7000,
						multiplier: 0
					};
					/*-------------------------------
					Create new under-fold container
					---------------------------------*/
					var newContent = $('<div class="wo08-content_wrapper"/>');

					var productPagecontainer = $('#content .row .col-md-5.col-sm-5:last'),
						accessoriesContainer = $('#content .col-md-5.margin-bottom.clearfix');

					if (productPagecontainer.length > 0) {
						newContent.insertAfter(productPagecontainer);

					} else { //if product pages is accessories or doesnt have much content
						newContent.insertAfter(accessoriesContainer);
						$('#content .col-md-7 .tabs, #content .col-md-7 .tab_container').insertAfter(newContent);
					}

					/*-------------------------------
					Remove active on now hidden tab and open new ones by click on page load
					---------------------------------*/
					var tabContainer = $('#content .tabs')
					tabContainer.find('li:first').removeClass('active');
					tabContainer.find('li:eq(1)').click();

					/*-------------------------------
					Grab the description pull out into own section. 
					---------------------------------*/
					var tabBlocks = $('.tab_container');
					var newDescBlock = $('<div class="wo08-description_wrapper wo08-underfold_block"><h3>Details</h3><div class="wo08-desc"/></div>');
					newDescBlock.prependTo(newContent);

					var productDescription = tabBlocks.find('.tab_content:first-of-type');
					productDescription.removeClass('tab_content').attr('id', 'wo08-productDesc');

					newDescBlock.find('.wo08-desc').html(productDescription);


					/*-------------------------------
					Add how to measure guide - includes embeded video
					---------------------------------*/
					var measureGuide = $([
						'<div class="wo08-measure_wrapper wo08-underfold_block">',
						'<h3>How to measure blinds</h3>',
						'<div class="wo08-measureText">',
						'<p>Measuring your windows to decide which size of wooden blind to order is easy. Just follow these simple steps on how to measure your window for your blinds. With this measurement guide you will be able to get the correct size. <b>Please Note.</b></p>',
						'<ul><li>Please use a metal tape measure to take measurements and use centimetres to the nearest 0.1cm.</li><li>Please be aware our blinds are made to a 5mm manufacturing tolerance.</li></ul>',
						'</div>',
						'<div class="wo8-measure_video">',
						'<iframe width="100%" height="230" src="https://www.youtube.com/embed/2q8VrqLfdMA?rel=0" frameborder="0" allowfullscreen></iframe>',
						'</div>',
						'</div>'
					].join(''));

					measureGuide.appendTo(newContent);


					/*-------------------------------
					Add real wood block if it exists
					---------------------------------*/
					var realWoodTab = $('.col-md-12 .tabs li.real-wood');
					if (realWoodTab.length > 0) {
						var woodBlock = $('<div class="wo08-underfold_block wo08-realWood_block"><h3>100% Genuine Real Wood</h3><div class="wo08-realwood"/></div>');
						woodBlock.appendTo(newContent);

						var woodTabcontent = tabBlocks.find('#tab6').removeClass('tab_content').attr('id', 'wo08-realwood').addClass('wo08-realWood');
						woodBlock.find('.wo08-realwood').html(woodTabcontent);

					}
					/*-------------------------------
					Trustpilot reviews
					---------------------------------*/
					//wait for trustpilot before moving it
					UC.poller(['.trustpilot-widget'], function () {
						//Review li exists - add class to hide it
						$('.tabs li:last').addClass('wo08-reviewTab');
						var reviewBlock = $('<div class="wo08-underfold_block wo08-reviews_block"><h3>Reviews</h3><div class="wo08-reviews"/></div>');
						reviewBlock.appendTo(newContent);

						var reviewsContent = $('.trustpilot-widget');
						reviewsContent.appendTo(reviewBlock.find('.wo08-reviews'));

					}, pollerOpts);


					/*-------------------------------
					Add images to each content Block
					---------------------------------*/

					var blockImages = $(['<div class="wo8-detailsImage">',
						'<img src="#"/>',
						'</div>',
					].join(''));

					blockImages.appendTo('.wo08-description_wrapper, .wo08-realWood_block');



					/*-------------------------------
					Use main image as first content block image
					---------------------------------*/
					var productImage,
						slickImage = $('#product .slick-slider .slick-slide img#default'),
						normalImage = $('#product .product .img-responsive');

					//check if the image is the slider image or just one image - get the src
					if (slickImage.length > 0) {
						productImage = slickImage.attr('src');
					} else if (normalImage.length > 0) {
						productImage = normalImage.attr('src');
					}
					$('.wo08-description_wrapper img').attr('src', productImage);
					$('.wo08-realWood_block img').attr('src', 'https://ab-test-sandbox.userconversion.com/experiments/WO008-realwood.png');
				};
				underTheFold();
			}
	
})();
		