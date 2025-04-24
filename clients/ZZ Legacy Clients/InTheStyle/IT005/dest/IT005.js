var IT005v2 = (function() {
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	
	UC.poller([
		function () {
			if (window.jQuery) {
				return true;
			}
		}
	], run);

	UC.poller([
		'.slick-slider.slick-initialized',
		'.home-cta-wrapper ul > li',
		'.home-products-grid ul li a',
		function () {
			if (window.jQuery) {
				return true;
			}
		}
	], homePage);

	function run(){
		var $ = window.jQuery,
			url = window.location.href,
			urlTest = /((\/)(dresses|clothing|new|shoes|accessories|curve|trends|sale-2017|charlotte-crosby|binky-felstead|billie-faiers|sarah|billiefaiers|sarahswim)|(\/)(dresses|clothing|new|shoes|accessories|curve|trends|sale-2017|charlotte-crosby|binky-felstead|billie-faiers|sarah|billiefaiers|sarahswim)(\/)[\w\d-+]+|(\/)(dresses|clothing|new|shoes|accessories|curve|trends|sale-2017|charlotte-crosby|binky-felstead|billie-faiers|sarah|billiefaiers|sarahswim)(\?).+|(\/)(dresses|clothing|new|shoes|accessories|curve|trends|sale-2017|charlotte-crosby|binky-felstead|billie-faiers|sarah|billiefaiers|sarahswim)(\/)[\w\d-+]+?(\?).+|(\/)(sarah)(\?).+|(\/)(sarah|dresses)(\/)[\w\d-+]+?(\?).+|(\/)(sarah|dresses)(\/)|(\/)(sarah|dresses)(\/)[\w\d-+]+)(\/)?(\?.*)?(\#.*)?$/;

		if(urlTest.test(url)){
			if(/[?&]/.test(url)){
			}
			else{
				window.location.search = '?dir=desc&order=news_from_date';
			}
		}

		UC.poller([
			function() {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'IT005',
				variation_str: 'Variation 2'
			});
		}, { multiplier: 1.2, timeout: 0 });
		
		$('a').each(function(){
			var el = $(this),
				elHref = el.attr('href');

			if(elHref == '#' || elHref === ''){
			}
			else if(urlTest.test(elHref)){
				el.attr('href', elHref + '?dir=desc&order=news_from_date');
			}
		});
	}

	function homePage(){
		$('.slick-slide').each(function(){
			var el = $(this),
				thisAttr = el.attr('onclick');
				newAttr = thisAttr.replace("');", "?dir=desc&order=news_from_date');");

			el.attr('onclick', newAttr);
		});

		$('.home-cta-wrapper ul > li').each(function(){
			var el = $(this),
				thisAttr = el.attr('onclick');
				newAttr = thisAttr.replace("');", "?dir=desc&order=news_from_date');");

			el.attr('onclick', newAttr);
		});
	}
})();