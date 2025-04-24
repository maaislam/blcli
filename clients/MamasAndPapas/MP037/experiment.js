var _MP037 = (function() {

	var $ = window.jQuery; // Remove after complete

	/*
	// Triggers
	var UV = window.universal_variable;
	var pageType = UV.page.type.toLowerCase();

	if (pageType === 'product') {
		var heavySKUs = ['CBLWC6000', 'DCLWC6000', 'SCLWC6000', 'RALWC6002', 'RALWC6001', 'SELWC6000', 'WRLWC6001', 'DCOX46800', 'CBOX46800', 'WROX46800', 'SEOX46800', 'RAOX46800', 'DCOX02700', 'CBOX02700', 'SEOX02700', 'RAOX02701', 'WROX02701', 'SEOX02701', 'RAOX02702', 'CSOX02700', 'DCOX46802', 'CBOX46801', 'WROX46801', 'CSOX02701', 'DCOX02701', 'CBOX02701', 'WROX02702', 'RAOX02703', 'SEOX02702', 'RAOX02704', 'SEOX02703', 'RAOX46801', 'SEOX46801', 'CSOX46800', 'RAOX46802', 'SEOX46802', 'SEMA46800', 'WRMA46800', 'RAMA46800', 'DCMA46800', 'SEMA02701', 'WRMA02700', 'RAMA02701', 'DCMA02700', 'SCMA02700', 'RCMA02700', 'SCMA46800', 'RCMA46800', 'SEHA02701', 'RAHA02701', 'DCHA02701', 'WRHA02701', 'WROS65100', 'DCOS65100', 'CBOS65100', 'SEAT65100', 'RAAT65100', 'CBAT65100', 'DCAT65100', 'WRAT65100', 'CBATAY600', 'DCATAY600', 'WRATAY600', 'SEATAY600', 'RAATAY600', 'BCAT65101', 'BCATAY601', 'RARI65101', 'WRRI65101', 'DCRI65100', 'SESI02700', 'RASI02701', 'WRSI02701', 'DCSI02700', 'CBFRX6600', 'DCFRX6600', 'WRFRX6600', 'RAFRX6600', 'SEFRX6600', 'CBCOU4800', 'DCCOU4800', 'WRCOU4800', 'SWCOU4800', 'RACOU4800', 'SECOU4800', 'CBBCBH700', 'DCBCBH700', 'CHBCBH700', 'SEBCBH700'];
		var SKU = UV.product.sku_code.toUpperCase();
		var inStock = UV.product.stock > 0;

		if (inStock && heavySKUs.indexOf(SKU) > -1) {
		  require('@qubit/poller')([
		    'window.ga',
		    '.qty-block'
		  ], function() {
		    if (!options.meta.isPreview) {
  			  var variation = options.meta.variationIsControl ? 'Control' : 'V1';
			    ga('send', 'event', 'MP037', 'Page View', 'MP037---Heavy Item Delivery---' + variation, {
            nonInteraction: true,
            dimension10: 'MP037---Heavy Item Delivery---' + variation
          });
			  }
			  cb();
		  });
		}
	}
	*/

	$('body').addClass('MP037');

	var $heaviesBox = $([
		'<div class="MP037_heavies-box">',
			'<div class="MP037_hb-left">',
				'<div class="MP037_stock-level">',
					'<div class="MP037_check">✔</div>',
					'<div>In Stock</div>',
				'</div>',
			'</div>',
			'<div class="MP037_hb-right">',
				'<h3>**Heavy Item - not available in store**</h3>',
				'<p>We\'ll delivery on a Nominated Day to a room of your choice - saving you from heavy lifting.</p>',
				'<p>2 man delivery just <em>£19.95</em></p>',
			'</div>',
		'</div>'
	].join(''));

	$('.qty-block').after($heaviesBox);

})();