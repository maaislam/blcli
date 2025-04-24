var _CB073 = (function($) {
	/* ----------------------------------------------------------------
	FREE STANDARD DELIVERY

	Affected active experiments
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

	$('body').addClass('CB073');

	/* Basket */
	if (/currentbody\.com\/checkout\/cart\/?/.test(window.location.href)) {
		UC.poller([
			'#shipping-estimate-block .shipping-form .input-box .delivery-by .choos-block > input'
		], function() {
			// UC Library Observer
			UC=function(t){return t.observer={active:[],connect:function(t,e,n){var i={throttle:1e3,config:{attributes:!0,childList:!0,subTree:!1}};if(n)for(var o in n)i[o]=n[o];else n=i;for(var r,c=new MutationObserver(function(n){n.forEach(function(n){r||(r=!0,e(t,n),setTimeout(function(){r=!1},i.throttle))})}),f=0;f<t.length;f++)c.observe(t[f],i.config),this.active.push([t[f],c])},disconnect:function(t){for(var e=this.active,n=0;n<t.length;n++)for(var i=t[n],o=0;o<e.length;o++)i===e[o][0]&&e[o][1].disconnect()}},t}(UC||{});

			var $deliveryContainer = $('#shipping-estimate-block');

			function edit() {
				var $deliveryOptions = $('.shipping-form .input-box .delivery-by'),
					$expressDel = $deliveryOptions.filter('[for="productmatrix_Free_Express_Delivery"], [for="productmatrix_FREE_Express_Delivery"]'),
					$standardDel = $deliveryOptions.filter('[for="productmatrix_FREE_Fast_Delivery"]');
				
				if ($standardDel.length) {
					$expressDel.hide();
				}
				
				// Change default delivery option if Express Delivery is selected
				if ($expressDel.length && $expressDel.find('.choos-block > input')[0].checked) {
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