var _CB073 = (function($) {
	/* ----------------------------------------------------------------
	FREE NEXT DAY DELIVERY

	Affected active experiments
	-- Whole site
		CB003 - Desktop Header
		CB006 - Mobile Header
		CB008 - Tablet Header

	-- Product Page
		CB007 - Product Page Clean

	-- Basket
		CB002 - Desktop Basket
		CB005 - Mobile Basket
	---------------------------------------------------------------- */

	/**
 	 * UC Library
 	 * @version 0.2.2
 	 */
	var UC = {};
	// Poller
	UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:1.2,timeout:10000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

	$('body').addClass('CB073-C');

	/* Whole Site */
	// CB003 - Desktop Header - V2
	// CB006 - Mobile Header - V1
	UC.poller([
		'.test_value_1 > span > a'
	], function() {
		$('.test_value_1 > span > a').html('<strong>Free </strong> next day delivery and returns');
	});


	/* Product Page */
	// Control
	UC.poller([
		'#ajax-update-container .free-block'
	], function() {
		$('#ajax-update-container .free-block').html('Free next day');
	});

	// CB007 Product Page Clean - V1
	UC.poller([
		'.product-options-bottom .stock-title > strong'
	], function() {
		$('.product-options-bottom .stock-title > strong').html('Free next day delivery');
	});


	/* Basket */
	if (/currentbody\.com\/checkout\/cart\/?/.test(window.location.href)) {
		UC.poller([
			'label[for="country"]',
			'#shipping-estimate-block .shipping-form .input-box .delivery-by .choos-block > input'
		], function() {
			// UC Library Observer
			UC=function(t){return t.observer={active:[],connect:function(t,e,n){var i={throttle:1e3,config:{attributes:!0,childList:!0,subTree:!1}};if(n)for(var o in n)i[o]=n[o];else n=i;for(var r,c=new MutationObserver(function(n){n.forEach(function(n){r||(r=!0,e(t,n),setTimeout(function(){r=!1},i.throttle))})}),f=0;f<t.length;f++)c.observe(t[f],i.config),this.active.push([t[f],c])},disconnect:function(t){for(var e=this.active,n=0;n<t.length;n++)for(var i=t[n],o=0;o<e.length;o++)i===e[o][0]&&e[o][1].disconnect()}},t}(UC||{});

			var $deliveryContainer = $('#shipping-estimate-block');

			function edit() {
				var $deliveryOptions = $('.shipping-form .input-box .delivery-by'),
					$expressDel = $deliveryOptions.filter('[for="productmatrix_Free_Express_Delivery"], [for="productmatrix_FREE_Express_Delivery"]'),
					$standardDel = $deliveryOptions.filter('[for="productmatrix_FREE_Fast_Delivery"]'),
					$countryLbl = $('label[for="country"]'),
					country = $countryLbl.children('strong').text();
					
				if (country === 'United Kingdom' || country === 'United Kingdom.') {
					var txtnode = $countryLbl.contents().filter(function() {
						return this.nodeType === 3; 
					})[0];
					txtnode.remove();
					$countryLbl.prepend('Delivered next day to the ');
				}
				
				if ($expressDel.length) {
					$standardDel.hide();
				}
					
				// Change default delivery option if Express Delivery is selected
				if ($standardDel.length && $standardDel.find('.choos-block > input')[0].checked) {
					$deliveryOptions
						.filter(function() {
							return $(this).css('display') !== 'none';
						})
						.first()
						.find('.choos-block > input').click();
				}
			}
			edit();

			// Run edit function on div refresh
			UC.observer.connect($deliveryContainer, edit, {
				config: { attributes: false, childList: true, characterData: false, subtree: false },
				throttle: 800
			});
		});

	}

})(jQuery);