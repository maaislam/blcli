import { events } from '../../../../lib/utils.js';

var SD026 = {
	id: 'SD026',
	jQ: window.jQuery,

	initPlugins: function() {
		this.plugins = {};

		// UC Library (Poller) @version 0.2.2
		var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(this.plugins.UC||{});
		this.plugins.UC = UC;

		// Menu aim
		if (!this.jQ.menuAim) {
			!function(a){function b(b){var c=a(this),d=null,e=[],f=null,g=null,h=a.extend({rowSelector:"> li",submenuSelector:"*",submenuDirection:"right",tolerance:500,enter:a.noop,exit:a.noop,activate:a.noop,deactivate:a.noop,exitMenu:a.noop},b),i=3,j=300,k=function(a){e.push({x:a.pageX,y:a.pageY}),e.length>i&&e.shift()},l=function(){g&&clearTimeout(g),h.exitMenu(this)&&(d&&h.deactivate(d),d=null)},m=function(){g&&clearTimeout(g),h.enter(this),q(this)},n=function(){h.exit(this)},o=function(){p(this)},p=function(a){a!=d&&(d&&h.deactivate(d),h.activate(a),d=a)},q=function(a){var b=r();b?g=setTimeout(function(){q(a)},b):p(a)},r=function(){function o(a,b){return(b.y-a.y)/(b.x-a.x)}if(!d||!a(d).is(h.submenuSelector))return 0;var b=c.offset(),g={x:b.left,y:b.top-h.tolerance},i={x:b.left+c.outerWidth(),y:g.y},k={x:b.left,y:b.top+c.outerHeight()+h.tolerance},l={x:b.left+c.outerWidth(),y:k.y},m=e[e.length-1],n=e[0];if(!m)return 0;if(n||(n=m),n.x<b.left||n.x>l.x||n.y<b.top||n.y>l.y)return 0;if(f&&m.x==f.x&&m.y==f.y)return 0;var p=i,q=l;"left"==h.submenuDirection?(p=k,q=g):"below"==h.submenuDirection?(p=l,q=k):"above"==h.submenuDirection&&(p=g,q=i);var r=o(m,p),s=o(m,q),t=o(n,p),u=o(n,q);return r<t&&s>u?(f=m,j):(f=null,0)};c.mouseleave(l).find(h.rowSelector).mouseenter(m).mouseleave(n).click(o),a(document).mousemove(k)}a.fn.menuAim=function(a){return this.each(function(){b.call(this,a)}),this}}(this.jQ);
		} 

		String.prototype.toProperCase = function () {
			return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		};
	},

	menuModule: {
		_cacheDom: function() {
			this._elements = {};
			this._elements.oldMenu = document.getElementById('custommenu');
			this._elements.body = document.getElementsByTagName('body')[0];
		},

		//--- Scrape page for category data and return JSON ---
		_getCategoryData: function() {
			var menu = this._elements.oldMenu,
				listItems = [].slice.call(menu.children[0].children), // Convert from HTMLCollection to array
				filterIds = ['2','3','4','5','6','7'],
				json = {'name': 'Shop by category', 'sub': [] },
				category;
			
			// Filter LIs with subcategories
			listItems = listItems.filter(function(el) {
				return filterIds.indexOf(el.id) > -1;
			});
			
			// Iterate over each category and convert relevant data to JSON format
			for (var i = 0; i < listItems.length; i++) {
				category = listItems[i];
				json.sub.push({
					'name': _getTitle(category),
					'link': _getLink(category),
					'sub': _getSubCategories(category)
				});
			}

			function _getLink(category) {
				var href = [].slice.call(category.children).filter(function(el) {
					return el.tagName.toUpperCase() === 'A';
				})[0].href;

				return href ? href : undefined;
			}

			function _getName(category) {
				var name = [].slice.call(category.children).filter(function(el) {
					return el.tagName.toUpperCase() === 'A';
				})[0].children[0].innerText;//.toProperCase();

				return name ? name : undefined;
			}

			function _getTitle(category) {
				return category.children[1].children[0].innerText;//.toProperCase();
			}

			function _getSubCategories(category) {
				var formattedSubcategories = [], 
					formattedSubcategory,
					subcategory, 
					title, 
					links;

				var subcategories = category.children[2].children[0].children;
				for (var j = 0; j < subcategories.length; j++) {
					subcategory = subcategories[j];
					title = subcategory.children[1].children[0].innerText;//.toProperCase();

					formattedSubcategory = {
						'name': _getName(subcategory),
						'link': _getLink(subcategory),
						'sub': []
					};

					var subsubcategories = subcategory.children[2].children[0].children;
					for (var k = 0; k < subsubcategories.length; k++) {
						subcategory = subsubcategories[k];
						// Do nothing if link is hidden
						if (!subcategory.classList.contains('mblview')) {
							formattedSubcategory.sub.push({
								'name': _getName(subcategory),
								'link': _getLink(subcategory)
							});
						}
					}

					formattedSubcategories.push(formattedSubcategory);
				}

				return formattedSubcategories;
			}

			return json;
		},

		//--- Scrape page for brands data and return JSON ---
		_getBrandsData: function() {
			var menu = this._elements.oldMenu,
				listItems = [].slice.call(menu.children[0].children), // Convert from HTMLCollection to array
				filterIds = ['9'],
				json = {'name': 'Brands', 'sub': [] },
				brand;

			// Filter LIs
			listItems = listItems.filter(function(el) {
				return filterIds.indexOf(el.id) > -1;
			});

			// Iterate over each brand LI and convert relevant data to JSON format
			var brands = listItems[0].children[2].children[0].children;
			for (var j = 0; j < brands.length; j++) {
				brand = brands[j];

				json.sub.push({
					'name': _getName(brand),
					'link': _getLink(brand)
				});
			}

			function _getLink(brand) {
				var href = [].slice.call(brand.children).filter(function(el) {
					return el.tagName.toUpperCase() === 'A';
				})[0].href;

				return href ? href : undefined;
			}

			function _getName(brand) {
				var name = [].slice.call(brand.children).filter(function(el) {
					return el.tagName.toUpperCase() === 'A';
				})[0].children[0].innerText;//.toProperCase();

				return name ? name : undefined;
			}

			return json;
		},

		//--- JSON data for A-Z listing ---
		_getAZData: function() {
      return {"name": "Products A to Z", "data": [{"name":"Acetone","link":"https://www.salonsdirect.com/nails/nail-polish/acetone"},{"name":"Aprons","link":"https://www.salonsdirect.com/hair/salon-wear-and-towels/aprons"},{"name":"Aromatherapy & Holistic","link":"https://www.salonsdirect.com/beauty/face-and-body/aromatherapy-holistic"},{"name":"Back Mirrors","link":"https://www.salonsdirect.com/hair/accessories/back-mirrors"},{"name":"Bags, Holdalls, Cases","link":"https://www.salonsdirect.com/beauty/salon-extras/bags-holdalls-cases"},{"name":"Barber Poles","link":"https://www.salonsdirect.com/barbering/furniture/barber-poles"},{"name":"Barber Storage Units","link":"https://www.salonsdirect.com/barbering/furniture/storage-units"},{"name":"Barber Styling Units","link":"https://www.salonsdirect.com/barbering/furniture/styling-units"},{"name":"Barber's Chairs","link":"https://www.salonsdirect.com/furniture/barbers/barbers-chairs"},{"name":"Barbicide & Hygiene","link":"https://www.salonsdirect.com/beauty/salon-essentials/barbicide-hygiene"},{"name":"Barrier Creams","link":"https://www.salonsdirect.com/hair-colour/bleach-foil/barrier-creams"},{"name":"Basins & Plumbing","link":"https://www.salonsdirect.com/furniture/hair-salon/basins-plumbing"},{"name":"Beauty Couches","link":"https://www.salonsdirect.com/furniture/beauty-salon/beauty-couches"},{"name":"Beauty Stools","link":"https://www.salonsdirect.com/furniture/beauty-salon/beauty-stools"},{"name":"Beauty Trolleys","link":"https://www.salonsdirect.com/furniture/beauty-salon/beauty-trolleys"},{"name":"Blades","link":"https://www.salonsdirect.com/hair/scissors-and-razors/blades"},{"name":"Bleach","link":"https://www.salonsdirect.com/hair-colour/bleach-foil/bleach"},{"name":"Body Lotions","link":"https://www.salonsdirect.com/beauty/face-and-body/body-lotions"},{"name":"Brows","link":"https://www.salonsdirect.com/beauty/lashes-brows/brows"},{"name":"Brush & Comb Cleaner","link":"https://www.salonsdirect.com/offers/hair-offers/brush-comb-cleaner-black"},{"name":"BRUSHES & COMBS","link":"https://www.salonsdirect.com/hair/brushes-and-combs"},{"name":"Bun Rings & Hair Padding","link":"https://www.salonsdirect.com/hair/accessories/bun-rings-hair-padding"},{"name":"Capes & Gowns","link":"https://www.salonsdirect.com/barbering/accessories/capes-gowns"},{"name":"Chairs","link":"https://www.salonsdirect.com/furniture/hair-salon/salon-chairs?stock=1"},{"name":"Chip & Pin Devices","link":"https://www.salonsdirect.com/hair/salon-essentials/chip-and-pin-readers-1"},{"name":"Clippers & Trimmers","link":"https://www.salonsdirect.com/hair/electricals/clippers-trimmers"},{"name":"Clips, Grips, Elastics","link":"https://www.salonsdirect.com/hair/accessories/clips-pins-elastics"},{"name":"Coat Racks","link":"https://www.salonsdirect.com/furniture/reception-accessories/coat-racks"},{"name":"Conditioner","link":"https://www.salonsdirect.com/barbering/grooming-styling/conditioner"},{"name":"Cotton Wool & Tissues","link":"https://www.salonsdirect.com/beauty/salon-consumables/cotton-wool-tissues"},{"name":"Couch Covers","link":"https://www.salonsdirect.com/beauty/salon-essentials/couch-covers"},{"name":"Couch Roll","link":"https://www.salonsdirect.com/beauty/salon-consumables/couch-roll"},{"name":"Curling Tools","link":"https://www.salonsdirect.com/hair/electricals/curling-tools"},{"name":"Cuticle Removers","link":"https://www.salonsdirect.com/nails/nail-accessories/cuticle-remover"},{"name":"Cuticle Treatments","link":"https://www.salonsdirect.com/nails/nail-accessories/cuticle-treatments"},{"name":"Cutting Collars","link":"https://www.salonsdirect.com/hair/salon-wear-and-towels/cutting-collars"},{"name":"Display Stands","link":"https://www.salonsdirect.com/hair/brushes-and-combs/display-stands"},{"name":"Disposable Gloves","link":"https://www.salonsdirect.com/beauty/bestsellers/disposable-gloves"},{"name":"Disposable Make Up Accessories","link":"https://www.salonsdirect.com/beauty/salon-consumables/disposable-make-up-accessories"},{"name":"Disposable Salon Wear","link":"https://www.salonsdirect.com/beauty/salon-consumables/disposable-salon-wear"},{"name":"Ear Candles","link":"https://www.salonsdirect.com/offers/beauty-offers/ear-candles-1-off"},{"name":"Ear Piercing","link":"https://www.salonsdirect.com/beauty/salon-extras/ear-piercing"},{"name":"Electrolysis","link":"https://www.salonsdirect.com/beauty/hair-removal/electrolysis"},{"name":"EXTENSIONS & HAIR PIECES","link":"https://www.salonsdirect.com/hair/extensions-and-hair-pieces"},{"name":"Facial Steamers","link":"https://www.salonsdirect.com/beauty/equipment/facial-steamers"},{"name":"Files & Buffers","link":"https://www.salonsdirect.com/nails/nail-accessories/files-and-buffers"},{"name":"Foil","link":"https://www.salonsdirect.com/hair-colour/bleach-foil/foil"},{"name":"Foil Dispensers","link":"https://www.salonsdirect.com/hair-colour/bleach-foil/foil-dispensers"},{"name":"Foot Spas and Pedi Bowls","link":"https://www.salonsdirect.com/nails/manicure-pedicure/foot-spas-and-pedi-bowls"},{"name":"GEL POLISH & SOAK OFF","link":"https://www.salonsdirect.com/nails/gel-polish-soak-off"},{"name":"HAIR COLOUR","link":"https://www.salonsdirect.com/hair-colour"},{"name":"Hair Loss","link":"https://www.salonsdirect.com/hair/hair-care-perming/hair-loss"},{"name":"HAIR REMOVAL","link":"https://www.salonsdirect.com/beauty/hair-removal"},{"name":"Hair Rollers","link":"https://www.salonsdirect.com/hair/accessories/hair-rollers"}, {"name":"Hairspray","link":"https://www.salonsdirect.com/hair/hair-care-perming/styling-products"}, {"name":"Hairdressing Trolleys","link":"https://www.salonsdirect.com/furniture/hair-salon/hairdressing-trolleys"},{"name":"Hairdryers & Diffusers","link":"https://www.salonsdirect.com/hair/electricals/hairdryers-and-diffusers"},{"name":"Health & Safety","link":"https://www.salonsdirect.com/hair/salon-essentials/health-and-safety"},{"name":"Heated Blankets","link":"https://www.salonsdirect.com/beauty/equipment/heated-blankets"},{"name":"Heated Mitts & Boots","link":"https://www.salonsdirect.com/beauty/manicure-pedicure/heated-mitts-boots"},{"name":"Heated Rollers","link":"https://www.salonsdirect.com/hair/electricals/heated-rollers"},{"name":"Heaters & Kits","link":"https://www.salonsdirect.com/beauty/hair-removal/heaters-kits"},{"name":"Highlighting Caps","link":"https://www.salonsdirect.com/hair-colour/bleach-foil/highlighting-caps"},{"name":"Hood Dryers & Processors","link":"https://www.salonsdirect.com/hair/electricals/hood-dryers-and-processors"},{"name":"Hot Stone Heaters","link":"https://www.salonsdirect.com/beauty/equipment/hot-stone-heaters"},{"name":"Hot Towel Cabinets","link":"https://www.salonsdirect.com/beauty/equipment/hot-towel-cabinets"},{"name":"Hot Towel Steamers","link":"https://www.salonsdirect.com/barbering/shaving-razors/hot-towel-steamers"},{"name":"Nail Implements & Tools","link":"https://www.salonsdirect.com/nails/nail-accessories/implements-and-tools"},{"name":"Individual Lashes","link":"https://www.salonsdirect.com/beauty/lashes-brows/individual-lashes"},{"name":"Lamps & Bulbs","link":"https://www.salonsdirect.com/beauty/equipment/lamps-bulbs"},{"name":"Lash Perming","link":"https://www.salonsdirect.com/beauty/lashes-brows/lash-perming"},{"name":"Left Handed Scissors","link":"https://www.salonsdirect.com/barbering/scissors/left-handed-scissors"},{"name":"Lotus","link":"https://www.salonsdirect.com/brands/lotus"},{"name":"Magazine Racks","link":"https://www.salonsdirect.com/furniture/reception-accessories/magazine-racks"},{"name":"Make Up","link":"https://www.salonsdirect.com/beauty/face-and-body/make-up"},{"name":"Manicure Kits","link":"https://www.salonsdirect.com/nails/manicure-pedicure/manicure-kits"},{"name":"Manicure Stools","link":"https://www.salonsdirect.com/furniture/nail-salon/manicure-stools"},{"name":"Manicure Tables","link":"https://www.salonsdirect.com/furniture/nail-salon/manicure-tables"},{"name":"Massage Oils","link":"https://www.salonsdirect.com/beauty/face-and-body/massage-oils"},{"name":"Massage Tables","link":"https://www.salonsdirect.com/furniture/beauty-salon/massage-tables"},{"name":"Meche","link":"https://www.salonsdirect.com/hair-colour/bleach-foil/meche"},{"name":"Moustache & Beard Care","link":"https://www.salonsdirect.com/barbering/grooming-styling/moustache-beard-care"},{"name":"Nail Art","link":"https://www.salonsdirect.com/nails/nail-accessories/nail-art"},{"name":"NAIL EXTENSIONS","link":"https://www.salonsdirect.com/nails/nail-extensions"},{"name":"NAIL POLISH","link":"https://www.salonsdirect.com/nails/nail-polish"},{"name":"Nail Tips","link":"https://www.salonsdirect.com/nails/nail-extensions/nail-tips"},{"name":"Nail Treatments","link":"https://www.salonsdirect.com/nails/nail-accessories/nail-treatments"},{"name":"Neck Brushes & Combs","link":"https://www.salonsdirect.com/barbering/accessories/neck-brushes-combs"},{"name":"Hair Oils & Treatments","link":"https://www.salonsdirect.com/hair/hair-care-perming/oils-and-treatments"},{"name":"Paraffin Wax","link":"https://www.salonsdirect.com/beauty/manicure-pedicure/paraffin-wax"},{"name":"Pedicure Chairs","link":"https://www.salonsdirect.com/furniture/nail-salon/pedicure-chairs"},{"name":"Pedicure Kits","link":"https://www.salonsdirect.com/nails/manicure-pedicure/pedicure-kits"},{"name":"Pedicure Stools","link":"https://www.salonsdirect.com/furniture/beauty-salon/pedicure-stools"},{"name":"PERMANENT COLOUR","link":"https://www.salonsdirect.com/hair-colour/permanent-colour"},{"name":"Permanent Shade Charts","link":"https://www.salonsdirect.com/hair-colour/permanent-colour/shade-charts"},{"name":"Perming","link":"https://www.salonsdirect.com/hair/hair-care-perming/perming"},{"name":"Peroxide & Developers","link":"https://www.salonsdirect.com/hair-colour/bleach-foil/peroxide-developers"},{"name":"Portable Nail Tables","link":"https://www.salonsdirect.com/furniture/nail-salon/portable-manicure-tables"},{"name":"Post Shave","link":"https://www.salonsdirect.com/barbering/shaving-razors/post-shave"},{"name":"Pouches & Accessories","link":"https://www.salonsdirect.com/hair/scissors-and-razors/pouches-and-accessories"},{"name":"Hair Removal Pre & After Care","link":"https://www.salonsdirect.com/beauty/hair-removal/pre-after-care"},{"name":"Pre Shave","link":"https://www.salonsdirect.com/barbering/shaving-razors/pre-shave"},{"name":"Razors","link":"https://www.salonsdirect.com/hair/scissors-and-razors/razors"},{"name":"Reception Chairs","link":"https://www.salonsdirect.com/furniture/reception-accessories/reception-chairs"},{"name":"Retail Ranges","link":"https://www.salonsdirect.com/hair/salon-essentials/retail-ranges"},{"name":"Robes & Slippers","link":"https://www.salonsdirect.com/beauty/salon-extras/robes-slippers"},{"name":"Salon Backwash Units","link":"https://www.salonsdirect.com/furniture/hair-salon/salon-backwash-units"},{"name":"Salon Chairs","link":"https://www.salonsdirect.com/furniture/hair-salon/salon-chairs"},{"name":"Salon Hygiene","link":"https://www.salonsdirect.com/hair/salon-essentials/salon-hygiene"},{"name":"Reception Desks","link":"https://www.salonsdirect.com/furniture/reception-accessories/reception-desks"},{"name":"Salon Retail Stands","link":"https://www.salonsdirect.com/furniture/reception-accessories/salon-retail-stands"},{"name":"Uniform","link":"https://www.salonsdirect.com/beauty/salon-extras/salon-uniform"},{"name":"Scissor Sets","link":"https://www.salonsdirect.com/hair/scissors-and-razors/scissor-sets"},{"name":"Semi Permanent Lashes","link":"https://www.salonsdirect.com/beauty/lashes-brows/semi-permanent-lashes"},{"name":"SEMI-PERMANENT COLOUR","link":"https://www.salonsdirect.com/hair-colour/semi-permanent-colour"},{"name":"Semi-Permanent Shade Charts","link":"https://www.salonsdirect.com/hair-colour/semi-permanent-colour/shade-charts"},{"name":"Shampoo","link":"https://www.salonsdirect.com/barbering/grooming-styling/shampoo"},{"name":"SHAVING & RAZORS","link":"https://www.salonsdirect.com/barbering/shaving-razors"},{"name":"Shaving Accessories","link":"https://www.salonsdirect.com/barbering/shaving-razors/shaving-accessories"},{"name":"Shaving Brushes","link":"https://www.salonsdirect.com/barbering/shaving-razors/shaving-brushes"},{"name":"Silver Shampoo","link":"https://www.salonsdirect.com/hair/hair-care-perming/toners?stock=1"},{"name":"Skincare","link":"https://www.salonsdirect.com/beauty/face-and-body/skincare"},{"name":"Slimming & Body Wraps","link":"https://www.salonsdirect.com/beauty/face-and-body/slimming-body-wraps"},{"name":"Specialist Machines","link":"https://www.salonsdirect.com/beauty/equipment/specialist-machines"},{"name":"Sponges & Mitts","link":"https://www.salonsdirect.com/beauty/salon-consumables/sponges-and-mitts"},{"name":"Spray Tan Machines & Tents","link":"https://www.salonsdirect.com/beauty/tanning/spray-tan-machines-tents"},{"name":"Spray Tanning Kits","link":"https://www.salonsdirect.com/beauty/tanning/kits"},{"name":"Stain Removers","link":"https://www.salonsdirect.com/hair-colour/bleach-foil/stain-removers"},{"name":"Stationery","link":"https://www.salonsdirect.com/beauty/salon-extras/stationery"},{"name":"Sterilisers","link":"https://www.salonsdirect.com/beauty/equipment/sterilisers"},{"name":"Storage Units","link":"https://www.salonsdirect.com/furniture/reception-accessories/storage-units"},{"name":"Straighteners","link":"https://www.salonsdirect.com/hair/electricals/straighteners"},{"name":"Strip Lashes","link":"https://www.salonsdirect.com/beauty/lashes-brows/strip-lashes"},{"name":"Styling Products","link":"https://www.salonsdirect.com/hair/hair-care-perming/styling-products"},{"name":"Mens Styling Products","link":"https://www.salonsdirect.com/barbering/grooming-styling/styling-products"},{"name":"Tan Accelerators","link":"https://www.salonsdirect.com/beauty/tanning/tan-accelerators"},{"name":"Thinning Scissors","link":"https://www.salonsdirect.com/hair/scissors-and-razors/thinning-scissors"},{"name":"Threading","link":"https://www.salonsdirect.com/beauty/hair-removal/threading"},{"name":"Tint Bowls & Brushes","link":"https://www.salonsdirect.com/hair-colour/bleach-foil/tint-bowls-brushes"},{"name":"Tint Stands","link":"https://www.salonsdirect.com/furniture/hair-salon/tint-stands"},{"name":"Tonics","link":"https://www.salonsdirect.com/barbering/grooming-styling/tonics"},{"name":"Beauty Tools & Implements","link":"https://www.salonsdirect.com/beauty/salon-essentials/tools-implements"},{"name":"Topcoats & Basecoats","link":"https://www.salonsdirect.com/nails/nail-polish/topcoats-basecoats-primers"},{"name":"Towel Storage","link":"https://www.salonsdirect.com/furniture/hair-salon/towel-storage"},{"name":"Towels","link":"https://www.salonsdirect.com/barbering/accessories/towels"},{"name":"Training Heads","link":"https://www.salonsdirect.com/hair/bestsellers/training-heads"},{"name":"Tweezers","link":"https://www.salonsdirect.com/beauty/salon-essentials/tools-implements"},{"name":"UV & LED Lamps","link":"https://www.salonsdirect.com/nails/gel-polish-soak-off/uv-and-led-lamps"},{"name":"Watersprays","link":"https://www.salonsdirect.com/hair/accessories/watersprays"},{"name":"Wax","link":"https://www.salonsdirect.com/beauty/hair-removal/wax"},{"name":"Spatulas","link":"https://www.salonsdirect.com/beauty/bestsellers/waxing-spatulas"},{"name":"Waxing Strips & Spatulas","link":"https://www.salonsdirect.com/beauty/hair-removal/waxing-strips-spatulas"}]};
		},
		
		//--- Convert JSON into nested HTML ---
		_generateSubcategories: function(data, isSub) {
			var level = 1; // Will increment and decrement as necessary to keep track of the menu depth

			// Recursively build sub navigations
			var _buildLevel = function(data, isSub) {
				var html = (isSub) ? '<div>' : ''; // Wrap with div if submenu
				html += '<ul class="SD026_level SD026_level' + level + '">';

				for (var i = 0; i < data.length; i++) {
					html += '<li class="SD026_level' + level + '-link">';

					if (typeof(data[i].sub) === 'object') {
						if (isSub) {
							html += '<a href="' + data[i].link + '">' + data[i].name + '</a>';
						}
						level++; // Next level deep - increment level number
						html += _buildLevel(data[i].sub, true); // Submenu found. Calling recursively same method
						level--; // Back to previous level - decrement level number
					} else {
						html += '<a href="' + data[i].link + '">' + data[i].name + '</a>';
					}

					html += '</li>';
				}

				html += '</ul>';
				html += (isSub) ? '</div>' : '';
				return html;
			};

			return _buildLevel(data, isSub);
		},

		//--- Convert JSON to HTML ---
		_generateAlphabeticalListing: function(data) {
			var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

			// Extracts the categories that start with the letter passed as param
			var _getLetterCategory = function(letter) {
				var matchesLetter = [];

				for (var i = 0; i < data.length; i++) {
					var category = data[i];
					var name = category.name;
					var firstLetter = name.charAt(0).toUpperCase();

					if (firstLetter === letter) {
						matchesLetter.push(category);
					}
				}

				return matchesLetter.length ? matchesLetter : false;
			};


			var _generateHTML = function() {
				// Start inner html string
				var html = '<div><ul class="SD026_level SD026_level1">';

				// Loop through every letter in the alphabet and segment into groups by letter
				for (var i = 0; i < alphabet.length; i++) {				
					var letter = alphabet[i];
					var letterCategories = _getLetterCategory(letter);
					
					// If no categories for this letter, add inactive class to li and jump to next iteration
					if (!letterCategories) {
						// Start and end letter list
						html += '<li class="SD026_level1-link SD026_level1-link--empty" data-letter="' + letter + '">';
						html += '<a href="javascript:void(0)">' + letter + '</a>';
						html += '</li>';
						continue;
					}

					// Start letter list
					html += '<li class="SD026_level1-link" data-letter="' + letter + '">';
					html += '<a href="javascript:void(0)">' + letter + '</a>';
					html += '<div><ul class="SD026_level SD026_level2">';

					// Add the HTML for every inner link
					for (var j = 0; j < letterCategories.length; j++) {
						var category = letterCategories[j];
						html += '<li class="SD026_level2-link"><a href="' + category.link + '">' + category.name + '</a></li>';
					}

					// Close letter list
					html += '</ul></div></li>';
					
				}

				// close inner html string
				html += '</ul></div>';

				return html;
			};

			var html = _generateHTML();
			
			return html;
		},

		//--- Wrap child LIs into groups of 'n' ---
		_splitIntoCols: function(parent, itemsPerCol) {
			var listItems = [].slice.call(parent.children),
				itemsPerColumn = itemsPerCol,
				groupClass = 'SD026_level-group',
				groups = [],
				group, item, start, end, i;

			for (i = 0; i < listItems.length; i++) {
				item = listItems[i];

				if ((i+1) % itemsPerColumn == 0) {
					start = ((i+1)-itemsPerColumn);
					end = (i+1);
					
					group = listItems.slice(start, end);
					groups.push(group);
				}

				// If last item and not a complete number for column
				// Use last end point as a starting point and put 
				// remaining items in a group
				else if (i+1 === listItems.length) {
					start = end;
					end = listItems.length;

					group = listItems.slice(start, end);
					groups.push(group);
				}
			}

			// Wrap each group in a separate div
			for (i = 0; i < groups.length; i++) {
				wrap(groups[i]);
			}

			function wrap(group) {
				var container = document.createElement('div');
				container.className = groupClass;
				parent.appendChild(container);

				// Append all items in group to container div
				for (var i = 0; i < group.length; i++) {
					var li = group[i];
					container.appendChild(li);
				}
			}
		},

		//--- Method to add a link to the nav ---
		createLink: function(linkType, data) {
			/*
				Link types: 1) Category, 2) A-Z Listing, 3) Single Link, 4) Long List

				e.g. 

				createLink(3, { 'name': 'Link Name', 'url': 'https:/' });
				
				------ or ------

				createLink(1, {
					'name': 'Link Name',
					'subcategories': [
						{ 
							'title': 'Hair Colour Brands', 
							links: [
								{'text': 'Wella Professionals', 'url': 'https:/'},
								{'text': 'L'Oréal', 'url': 'https:/'},
							]
						}
					]
				});
			*/

			// Create new primary level li
			var li = document.createElement('LI');
			li.className = 'SD026_level0-link';
			
			var a = document.createElement('A');
			a.href = data.link ? data.link : '#';
			a.innerText = data.name;

			li.appendChild(a);

			var innerHTML, customClass, itemsPerColumn;

			// Set the inner HTML and/or custom class depending on the type of link
			switch (linkType) {
				case 1:
				// Category Listing --------------
				innerHTML = this._generateSubcategories(data.sub, true);
				customClass = 'SD026_categories';
				break;

				case 2:
				// A-Z Listing ------------------
				innerHTML = this._generateAlphabeticalListing(data.data);
				customClass = 'SD026_az-listing';
				itemsPerColumn = 6;
				break;

				case 3:
				// Single Link ------------------
				customClass = 'SD026_single-link';
				break;

				case 4:
				// Long List --------------------
				innerHTML = this._generateSubcategories(data.sub, true);
				customClass = 'SD026_long-list';
				break;

				default:
				return false;
			}

			if (customClass) li.className += ' ' + customClass;
			if (innerHTML) li.innerHTML += innerHTML;
			if (itemsPerColumn) {
				var subcategories = li.querySelectorAll('.SD026_level2');
				for (var i = 0; i < subcategories.length; i++) {
					this._splitIntoCols(subcategories[i], itemsPerColumn);
				}
			}

			this._elements.level0.appendChild(li);

		},

		//--- Create container elements for the nav ---
		_createMenu: function() {
			var container = document.createElement('div');
			container.id = 'SD026_menu';
			container.innerHTML = '<nav><div class="nav-container"></div></nav>';

			var level0 = document.createElement('ul');
			level0.className = 'SD026_level SD026_level0';

			container.children[0].children[0].appendChild(level0);

			var overlay = document.createElement('div');
			overlay.id = 'SD026_overlay';

			this._elements.menu = container;
			this._elements.level0 = level0;
			this._elements.overlay = overlay;
		},

		//--- Event handling ---
		_bindEvents: function() {
			var menu = this._elements.menu;
			var overlay = this._elements.overlay;
			if (!menu) return false;

			// jQuery
			var $ = SD026.jQ;
			var $menu = $(menu);

			// Primary level
			var $levels = $menu.find('.SD026_level');

			// Use menuAim plugin for activating submenus
			function activateMenu(li) {
				var $li = $(li);
				// Remove active class from siblings
				var $activeSiblings = $li.siblings().filter('.SD026_level--active');
				if ($activeSiblings.length) {
					$activeSiblings.removeClass('SD026_level--active');
				}
				// Make this active
				$li.addClass('SD026_level--active');
			}

			function deactivateMenu(li) {
				var $li = $(li);
				// Make this inactive
				$li.removeClass('SD026_level--active');
			}

			if ($.fn.menuAim) {
				$levels.not('SD026_level0').each(function() {
					var $level = $(this);

					$level.menuAim({
						activate: activateMenu,
						deactivate: deactivateMenu,
						rowSelector: '> li'
					});
				});
			} else {
				$levels.not('SD026_level0').children('li').each(function() {
					var $el = $(this);
					$el.hover(
						function() {
							activateMenu(this);
						},
						function() {
							deactivateMenu(this)
						}
					);
				});
			}

			$levels.filter('.SD026_level0').children('li').each(function() {
				var $el = $(this);
				$el.hover(
					function() {
						activateMenu(this);
					},
					function() {
						deactivateMenu(this)
					}
				);
			});
		

			$levels.filter('.SD026_level0').children('li').each(function() {
				var $el = $(this);
				var $level1Li = $el.find('.SD026_level1 > li');
				var activeLi = $level1Li.filter('.SD026_level--active').length > 0;

				$el.hover(function() {
					$('body').addClass('SD026_scroll-lock');
					var activeLi = $level1Li.filter('.SD026_level--active').length > 0;
					if (!activeLi) {
						$level1Li.first().addClass('SD026_level--active');
					}
					overlay.classList.add('SD026_force-show'); // Show overlay
				}, function() {
					$('body').removeClass('SD026_scroll-lock');
					overlay.classList.remove('SD026_force-show'); // Hide overlay
				});
			
			});
		},

		//--- GA Events ---
		_bindGAEvents: function() {
			var $ = SD026.jQ;
			$('.SD026_az-listing > div').one('mouseenter', function() {
				events.send('SD026', 'Hover', 'User hovered over A-Z listing', { sendOnce: true });
			});
			$('.SD026_az-listing > div').click(function(){
				events.send('SD026', 'Click', 'User clicked in A-Z listing', { sendOnce: true });
			});

			$('.SD026_categories > div').one('mouseenter', function() {
				events.send('SD026', 'Hover', 'User hovered over shop by category listing', { sendOnce: true });
			});

			$('.SD026_categories > div').click(function(){
				events.send('SD026', 'Click', 'User clicked in category listing', { sendOnce: true });
			});

			$('.SD026_level0-link:has(> a:contains("Brands")) > div').one('mouseenter', function() {
				events.send('SD026', 'Hover', 'User hovered over brands listing', { sendOnce: true });
			});
		},

		//--- Insert nav into DOM ---
		_render: function() {
			// Remove old markup if it exists
			(function() {
				var elements = [], element;
				elements.push(document.getElementById('SD026_menu'));
				elements.push(document.getElementById('SD026_overlay'));

				for (var i = 0; i < elements.length; i++) {
					element = elements[i];

					if (element) {
						element.outerHTML = "";
						//delete element;
					}
				}
			})();
			
			// Hide control menu if not already hidden
			var nav = document.getElementById('header-nav');
			if (!nav.classList.contains('SD026_force-hide')) {
				nav.classList.add('SD026_force-hide');
			}

			// Render new menu and overlay
			nav.parentElement.insertBefore(this._elements.menu, nav);
			this._elements.body.insertBefore(this._elements.overlay, this._elements.body.children[0]);

		},
		
		//--- Run menu module ---
		init: function() {
			this._cacheDom();
			this._createMenu();
			this.createLink(2, this._getAZData());
			this.createLink(1, this._getCategoryData());
			this.createLink(3, { 'name': 'New In', 'link': 'https://www.salonsdirect.com/new-in' });
			this.createLink(3, { 'name': 'Offers', 'link': 'https://www.salonsdirect.com/salons-direct-offers' });
			this.createLink(4, this._getBrandsData());
			this.createLink(3, { 'name': 'Blog', 'link': 'https://www.salonsdirect.com/blog/' });
			this.createLink(3, { 'name': 'Clearance', 'link': 'https://www.salonsdirect.com/clearance' });
			this._bindEvents();
			this._render();

			this._bindGAEvents();

			return {
				createLink: this.createLink
			};
		}
	},

	//--- Run experiment ---
	init: function() {
		// Plugins
		this.initPlugins();
		var UC = this.plugins.UC;

		// Full Story Tagging
		UC.poller([function(){var t=window.FS;if(t&&t.setUserVars)return!0}],function(){window.FS.setUserVars({experiment_str:"SD026",variation_str:"Variation 1"})},{multiplier:1.2,timeout:0});
		
		// Namespace CSS
		var body = document.getElementsByTagName('body')[0];
		body.className += ' ' + this.id;

		// Init navigation
		var menu = this.menuModule.init();

		//AMEND
		var brandLinks = document.getElementsByClassName("SD026_long-list")[0];
		var brandFirstLink = brandLinks.querySelectorAll('a')[0];
		brandFirstLink.setAttribute("href", "https://www.salonsdirect.com/brands");
	}
};


SD026.init();