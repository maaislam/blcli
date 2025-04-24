// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

var WB053 = (function() {
	var trackerName,
		slideQ = false,
		$;

	var UCPoller = (function(){
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed

		UC.poller([
			'body',
			function () {
				if (window.jQuery) {
					$ = window.jQuery
					return true;
				}
			}
		], init);
	})();

	function init(){
		utils.fullStory('WB053', 'Variation 1');
		//utils.events.send('WB053', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
		//utils.events.send('WB053', 'Click', 'Show mobile clicked', true);

		var cacheDom = (function() {
			//Cache useful selectors for later use
			var bodyVar = $('body');
			
			bodyVar.addClass('WB053');
			var addToBag = $('#product-add-form').closest('.row'),
				delButton = $('#product-info-accordion .accordion-toggle[href="#deliveriesPanel"]')
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar, 
				addToBag: addToBag,
				delButton: delButton
			};
		})();

		var slider = {
			// Hide some content thats no longer used
			contentBuilder: function(){
				var sliderMarkup = $(`
					<div class="WB053_sliderWrap clearfix"> 
						<div class="WB053_slide">
							<div class="WB053_slide-image" style="background-image:url('https://dd6zx4ibq538k.cloudfront.net/static/images/4347/b94345c23b2e6ed06cf6113e739430e7_700_539.png');"></div>
							<div class="WB053_slide-content">
								<h3>Free returns<br /> worldwide</h3>
							</div>
						</div>
						<div class="WB053_slide">
						<div class="WB053_slide-image" style="background-image:url('https://dd6zx4ibq538k.cloudfront.net/static/images/4347/634f547deb0705774005ece09aa05dbd_500_416.png');"></div>
							<div class="WB053_slide-content">
								<h3>Direct from<br /> the Studio*</h3>
							</div>
						</div>
						<div class="WB053_slide">
						<div class="WB053_slide-image" style="background-image:url('https://dd6zx4ibq538k.cloudfront.net/static/images/4347/7d52f0a3a10363fe7df0017acd1e5352_500_307.png');"></div>
							<div class="WB053_slide-content">
								<h3>No Import<br /> Duties/Tax</h3>
							</div>
						</div>
					</div>
					<div class="WB053_delivery-information">
						More information: <a>Delivery & Returns</a>
					</div>	 
				`);
				cacheDom.delButton.addClass('collapsed');
				cacheDom.addToBag.after(sliderMarkup);
				$('.WB053_delivery-information a').on('click', function(){
					var time = 0;
					if(cacheDom.delButton.hasClass('collapsed')){
						cacheDom.delButton.click();
						time = 250;
					}
					setTimeout(function(){
						$('html, body').animate({
							scrollTop: cacheDom.delButton.closest('.accordion-group').offset().top - 85
						}, 1000);
					}, time);
					utils.events.send('WB053', 'Click', 'Delivery Returns Information', true);	
				});


			}
		};

		slider.contentBuilder();
	}	
})();