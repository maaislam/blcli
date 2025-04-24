import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import productcontent from './lib/content.js';

const CB091 = (() => {

    // Experiment code
    const activate = () => {
	const $ = window.jQuery;

	$('body').addClass('CB091');
	
    //define product name, match against array
	const productName = $('.content-product-block #product-name').text().trim(),
		  productMatch = productcontent[productName];

	    if(productMatch){
		var points = $('.content-product-block .bullet-points:first');
			points.find('ul').addClass('cb91-hidden');
		var newPoints = $(`<div class="CB91-newPoints"></div>`);
			points.append(newPoints);
		
		var productPoints = [
			productMatch.point_1,
			productMatch.point_2,
			productMatch.point_3,
			productMatch.point_4,
			productMatch.point_5,
		]		  
	
		$.each(productPoints,function(){
			var pointText = this;
			const productDesc = $(`
				<li class="CB91-product_points">
					${pointText}
				</li>
			`);

			productDesc.appendTo('.CB91-newPoints');

		});
	}
 	};

    // Audience conditions
    const triggers = ((options) => {
        // FullStory tagging
		utils.fullStory('CB091', 'Variation 1');
		UC.poller(['body','.catalog-product-view'], activate);
    })();

})();
