var MP034 = (function () {
	var UV = window.universal_variable,
		pageType = UV.page.type.toLowerCase();
		furnitureCheck = UV.page.breadcrumb,
		IDCheck = UV.product.id;

	// Plugins and Helpers
	/**
	 * UC Library - Poller
	 * @version 0.2.2
 	 */
	var UC = function (a) { return a.poller = function (a, b, c) { var d = { wait: 50, multiplier: 0, timeout: 6000 }, e = Date.now || function () { return (new Date).getTime() }; if (c) for (var f in c) d[f] = c[f]; else c = d; for (var g = !!d.timeout && new Date(e() + d.timeout), h = d.wait, i = d.multiplier, j = [], l = function (c, d) { if (g && e() > g) return !1; d = d || h, function () { var a = typeof c; return "function" === a ? c() : "string" !== a || document.querySelector(c) }() ? (j.push(!0), j.length === a.length && b()) : setTimeout(function () { l(c, d * i) }, d) }, m = 0; m < a.length; m++)l(a[m]) }, a }(UC || {});

	// Triggers
	var _triggers = (function () {
		if($.inArray('Furniture', furnitureCheck) >= 0 && pageType == 'product'){
			UC.poller([
				'.productImagePrimary',
				'.productImageGallery',
				'.pdp-information-title',
				function () { return window.jQuery; },
				function () { return window.ga; }
			], activate);
		}
	})();

	function activate() {
		$('body').addClass('MP034');

		var productData = [],
			optionSelector = $('.variant-selector'),
			header = $('.productDetailsPanel .product-description h1'),
			//headerText = header.text(),
			data = {
			"product": [
				{
					ID: "secou4800",
					thisBundle: {
						title: '2 Piece Dresser',
						range: 'Cooper'
					},
					options: [
						{
							name: '2 Piece Dresser',
							title: '2 Piece',
							desc: 'Cot bed With Dresser - White/Oak',
							link: 'https://www.mamasandpapas.com/en-gb/cooper-2-piece-cotbed-set-with-dresser-whiteoakbrbrbr/p/secou4800/',
						},
						{
							name: '2 Piece Wardrobe',
							title: '2 Piece',
							desc: 'Cot bed With Wardrobe - White/Oak',
							link: 'https://www.mamasandpapas.com/en-gb/cooper-2-piece-cotbed-set-with-wardrobe-whiteoakbrbrbr/p/swcou4800/',
						},
						{
							title: '3 Piece',
							name: '3 Piece',
							desc: 'Cot bed With Wardrobe and Dresser - White/Oak',
							link: 'https://www.mamasandpapas.com/en-gb/cooper-3-piece-cotbed-set-whiteoak/p/racou4800/',
						}
					]
				},
				{
					ID: "swcou4800",
					thisBundle: {
						title: '2 Piece Wardrobe',  
						range: 'Cooper'
					},
					options: [
						{
							name: '2 Piece Dresser',
							title: '2 Piece',
							desc: 'Cot bed With Dresser - White/Oak',
							link: 'https://www.mamasandpapas.com/en-gb/cooper-2-piece-cotbed-set-with-dresser-whiteoakbrbrbr/p/secou4800/',
						},
						{
							name: '2 Piece Wardrobe',
							title: '2 Piece',
							desc: 'Cot bed With Wardrobe - White/Oak',
							link: 'https://www.mamasandpapas.com/en-gb/cooper-2-piece-cotbed-set-with-wardrobe-whiteoakbrbrbr/p/swcou4800/',
						},
						{
							title: '3 Piece',
							name: '3 Piece',
							desc: 'Cot bed With Wardrobe and Dresser - White/Oak',
							link: 'https://www.mamasandpapas.com/en-gb/cooper-3-piece-cotbed-set-whiteoak/p/racou4800/',
						}
					]
				},
				{
					ID: "racou4800",
					thisBundle: {
						title: '3 Piece',  
						range: 'Cooper'
					},
					options: [
						{
							name: '2 Piece Dresser',
							title: '2 Piece',
							desc: 'Cot bed With Dresser - White/Oak',
							link: 'https://www.mamasandpapas.com/en-gb/cooper-2-piece-cotbed-set-with-dresser-whiteoakbrbrbr/p/secou4800/',
						},
						{
							name: '2 Piece Wardrobe',
							title: '2 Piece',
							desc: 'Cot bed With Wardrobe - White/Oak',
							link: 'https://www.mamasandpapas.com/en-gb/cooper-2-piece-cotbed-set-with-wardrobe-whiteoakbrbrbr/p/swcou4800/',
						},
						{
							title: '3 Piece',
							name: '3 Piece',
							desc: 'Cot bed With Wardrobe and Dresser - White/Oak',
							link: 'https://www.mamasandpapas.com/en-gb/cooper-3-piece-cotbed-set-whiteoak/p/racou4800/',
						}
					]
				},
			]
		};

		$.each(data.product, function(){
			if(this.ID == IDCheck){
				productData.push(this);
			}
		});

		if(productData.length > 0){
			optionSelector.before([
				'<div class="MP034_options">',
					'<h3>Options</h3>',
				'</div>'
			].join(''));

			var optionsWrap = $('.MP034_options');

			$.each(productData[0].options, function(i){
				var el = this;
				
				if(el.name == productData[0].thisBundle.title){
					optionsWrap.append([
						'<div class="MP034_options_row">',
							'<a class="MP034_active" href="#">' + el.title + '</a>',
							'<span>' + el.desc + '</span>',
						'</div>'
					].join(''));
				}
				else{
					optionsWrap.append([
						'<div class="MP034_options_row">',
							'<a href="' + el.link + '">' + el.title + '</a>',
							'<span>' + el.desc + '</span>',
						'</div>'
					].join(''));
				}
			});

			header.after('<a href="#" class="MP034_range">View all ' + productData[0].thisBundle.range + ' collection</a>');
		}
	}
})();