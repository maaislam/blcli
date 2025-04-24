/* no_doc_ready */
var _SD045 = (function () {
	
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
					function() {
						var fs = window.FS;
						if (fs && fs.setUserVars) return true;
					}
				], function () {
					window.FS.setUserVars({
						experiment_str: 'SD045',
						variation_str: 'Variation 1'
					});
				}, { multiplier: 1.2, timeout: 0 });
			
				// Poll start
				UC.poller([
					'body',
					'.main-container',
					function() {
						if (window.jQuery) return true;
					},
					function() {
						if (window.ga) return true;
					}
				], SD045, {
					timeout: 7000,
					multiplier: 'disable'
				});
					// Variation
					function SD045() {
	
				   var $ = window.jQuery;
					$('body').addClass('SD045');
	
	
		sendEvent('SD045', 'Page View', 'SD045 - Product - View more from brand Page View', true);

		/*-------------------------------
		Get brand names from brand page
		---------------------------------*/
		var brandObj = {"Academy":"https://www.salonsdirect.com/brands/academy","Acclaim":"https://www.salonsdirect.com/brands/acclaim","Acrobat":"https://www.salonsdirect.com/brands/acrobat","Affinity":"https://www.salonsdirect.com/brands/affinity","Agenda":"https://www.salonsdirect.com/brands/agenda","AMA":"https://www.salonsdirect.com/brands/ama","American Crew":"https://www.salonsdirect.com/brands/american-crew","Andis":"https://www.salonsdirect.com/brands/andis","Apraise":"https://www.salonsdirect.com/brands/apraise","Ardell":"https://www.salonsdirect.com/brands/ardell","Artistic":"https://www.salonsdirect.com/brands/artistic","Aztec":"https://www.salonsdirect.com/brands/aztec","Babyliss PRO":"https://www.salonsdirect.com/brands/babyliss-pro","Ballet":"https://www.salonsdirect.com/brands/ballet","Balmain":"https://www.salonsdirect.com/brands/balmain","Barber PRO":"https://www.salonsdirect.com/brands/barber-pro","Barbicide":"https://www.salonsdirect.com/brands/barbicide","Beauty Tools":"https://www.salonsdirect.com/brands/beauty-tools","BeautyPro":"https://www.salonsdirect.com/brands/beautypro","Belava":"https://www.salonsdirect.com/brands/belava","Biosun":"https://www.salonsdirect.com/brands/biosun","Black + White":"https://www.salonsdirect.com/brands/black-white","Black Touch":"https://www.salonsdirect.com/brands/black-touch","Bob Tuo":"https://www.salonsdirect.com/brands/bob-tuo","Brush Delite":"https://www.salonsdirect.com/brands/brush-delite","Caflon":"https://www.salonsdirect.com/brands/caflon","Caress":"https://www.salonsdirect.com/brands/caress","Carlton":"https://www.salonsdirect.com/brands/carlton","Carter and Bond":"https://www.salonsdirect.com/brands/carter-and-bond","Ceriotti":"https://www.salonsdirect.com/brands/ceriotti","Chenice":"https://www.salonsdirect.com/brands/chenice","China Glaze":"https://www.salonsdirect.com/brands/china-glaze","Clean + Easy":"https://www.salonsdirect.com/brands/clean-easy","Clippercide":"https://www.salonsdirect.com/brands/clippercide","Clynol":"https://www.salonsdirect.com/brands/clynol","Coats":"https://www.salonsdirect.com/brands/coats","Collexia":"https://www.salonsdirect.com/brands/collexia","ColorpHlex":"https://www.salonsdirect.com/brands/colorphlex","Colour Touch":"https://www.salonsdirect.com/brands/wella-colour-touch","Combinal":"https://www.salonsdirect.com/brands/combinal","Comby":"https://www.salonsdirect.com/brands/comby","Corioliss":"https://www.salonsdirect.com/brands/corioliss","Cotton Soft":"https://www.salonsdirect.com/brands/cotton-soft","Crazy Angel":"https://www.salonsdirect.com/brands/crazy-angel","Crazy Color":"https://www.salonsdirect.com/brands/crazy-color","Cricket":"https://www.salonsdirect.com/brands/cricket","Crown Brush":"https://www.salonsdirect.com/brands/crown-brush","Cuccio":"https://www.salonsdirect.com/brands/cuccio","Curlformers":"https://www.salonsdirect.com/brands/curlformers","D:FI":"https://www.salonsdirect.com/brands/d-fi","DAX":"https://www.salonsdirect.com/brands/dax","Daylight":"https://www.salonsdirect.com/brands/daylight","Denman":"https://www.salonsdirect.com/brands/denman","Deo":"https://www.salonsdirect.com/brands/deo","Dia Richesse":"https://www.salonsdirect.com/brands/dia-richesse","Diva PRO Styling":"https://www.salonsdirect.com/brands/diva-pro-styling","DMI":"https://www.salonsdirect.com/brands/dmi","Drumm":"https://www.salonsdirect.com/brands/drumm","DUO":"https://www.salonsdirect.com/brands/duo","Dy-Zoff":"https://www.salonsdirect.com/brands/dy-zoff","Ebe":"https://www.salonsdirect.com/brands/ebe","Elchim":"https://www.salonsdirect.com/brands/elchim","Emerald Bay":"https://www.salonsdirect.com/brands/emerald-bay","ETI":"https://www.salonsdirect.com/brands/eti","EzFlow":"https://www.salonsdirect.com/brands/ezflow","Feather":"https://www.salonsdirect.com/brands/feather","Fiesta Sun":"https://www.salonsdirect.com/brands/fiesta-sun","Florence Roby":"https://www.salonsdirect.com/brands/florence-roby","Focus":"https://www.salonsdirect.com/brands/focus","Footsie Bath":"https://www.salonsdirect.com/brands/footsie-bath","Framar":"https://www.salonsdirect.com/brands/framar","Fransen":"https://www.salonsdirect.com/brands/fransen","Gear UK":"https://www.salonsdirect.com/brands/gear-uk","Gelluv":"https://www.salonsdirect.com/brands/gelluv","Gellux":"https://www.salonsdirect.com/brands/gellux","GiGi":"https://www.salonsdirect.com/brands/gigi","Glamtech":"https://www.salonsdirect.com/brands/glamtech","Goldwell Professional":"https://www.salonsdirect.com/brands/goldwell-professional","Gotta":"https://www.salonsdirect.com/brands/gotta","Gripeze":"https://www.salonsdirect.com/brands/gripeze","Hair Sculptor":"https://www.salonsdirect.com/brands/hair-sculptor","Hair Tools":"https://www.salonsdirect.com/brands/hair-tools","Hairbond":"https://www.salonsdirect.com/brands/hairbond","Haito":"https://www.salonsdirect.com/brands/haito","Handirest":"https://www.salonsdirect.com/brands/handirest","Head Jog":"https://www.salonsdirect.com/brands/head-jog","Hive":"https://www.salonsdirect.com/brands/hive","Hypnot-Eyes":"https://www.salonsdirect.com/brands/hypnot-eyes","ibd":"https://www.salonsdirect.com/brands/ibd","Indola":"https://www.salonsdirect.com/brands/indola","INNOluxe":"https://www.salonsdirect.com/brands/innoluxe","INOA":"https://www.salonsdirect.com/brands/loreal-inoa","Jack Dean":"https://www.salonsdirect.com/brands/jack-dean","Jaguar":"https://www.salonsdirect.com/brands/jaguar","Jay2":"https://www.salonsdirect.com/brands/jay2","Joewell":"https://www.salonsdirect.com/brands/joewell","Kaeso":"https://www.salonsdirect.com/brands/kaeso","Kasho":"https://www.salonsdirect.com/brands/kasho","Kebelo":"https://www.salonsdirect.com/brands/kebelo","Kiehl":"https://www.salonsdirect.com/brands/kiehl","Kiepe":"https://www.salonsdirect.com/brands/kiepe","Kodo":"https://www.salonsdirect.com/brands/kodo","Koleston Perfect":"https://www.salonsdirect.com/brands/wella-koleston-perfect","Kyoto":"https://www.salonsdirect.com/brands/kyoto","L'Aroma":"https://www.salonsdirect.com/brands/l-aroma","L'Oreal Professionnel":"https://www.salonsdirect.com/brands/l-oreal-professionnel","Lash FX":"https://www.salonsdirect.com/brands/lash-fx","London Beard Company":"https://www.salonsdirect.com/brands/london-beard-company","Lotus":"https://www.salonsdirect.com/brands/lotus","Lotus Essentials":"https://www.salonsdirect.com/brands/lotus-essentials","Louise Galvin":"https://www.salonsdirect.com/brands/louise-galvin","Magicap":"https://www.salonsdirect.com/brands/magicap","Magis":"https://www.salonsdirect.com/brands/magis","Majirel":"https://www.salonsdirect.com/brands/loreal-majirel","Marvel Brow":"https://www.salonsdirect.com/brands/marvel-brow","Matador":"https://www.salonsdirect.com/brands/matador","Matty":"https://www.salonsdirect.com/brands/matty","Medic":"https://www.salonsdirect.com/brands/medic","Millennium":"https://www.salonsdirect.com/brands/millennium","MineTan":"https://www.salonsdirect.com/brands/minetan","Module":"https://www.salonsdirect.com/brands/module","Mundo":"https://www.salonsdirect.com/brands/mundo","NailFX":"https://www.salonsdirect.com/brands/nailfx","NailLux":"https://www.salonsdirect.com/brands/naillux","Nails Inc":"https://www.salonsdirect.com/brands/nails-inc","NanoKeratin":"https://www.salonsdirect.com/brands/nanokeratin","Nekeze":"https://www.salonsdirect.com/brands/nekeze","Nioxin":"https://www.salonsdirect.com/brands/nioxin","Novasonic":"https://www.salonsdirect.com/brands/novasonic","NSI":"https://www.salonsdirect.com/brands/nsi","Olivia Garden":"https://www.salonsdirect.com/brands/olivia-garden","Options Essence":"https://www.salonsdirect.com/brands/options-essence","Original Slimming":"https://www.salonsdirect.com/brands/original-slimming","Orly":"https://www.salonsdirect.com/brands/orly","Orly EPIX":"https://www.salonsdirect.com/brands/orly-epix","Orly Gel FX":"https://www.salonsdirect.com/brands/orly-gel-fx","Orofluido":"https://www.salonsdirect.com/brands/orofluido","Osaka":"https://www.salonsdirect.com/brands/osaka","Osmo":"https://www.salonsdirect.com/brands/osmo","Oster":"https://www.salonsdirect.com/brands/oster","Parlux":"https://www.salonsdirect.com/brands/parlux","Pashana":"https://www.salonsdirect.com/brands/pashana","Passion":"https://www.salonsdirect.com/brands/passion","Patrick Cameron":"https://www.salonsdirect.com/brands/patrick-cameron","Pedi Sation":"https://www.salonsdirect.com/brands/pedi-sation","Peggy Sage":"https://www.salonsdirect.com/brands/peggy-sage","Permalash":"https://www.salonsdirect.com/brands/permalash","Personna":"https://www.salonsdirect.com/brands/personna","Pivot Point":"https://www.salonsdirect.com/brands/pivot-point","Pop Shots":"https://www.salonsdirect.com/brands/pop-shots","Pro":"https://www.salonsdirect.com/brands/pro","Pro Blo":"https://www.salonsdirect.com/brands/pro-blo","Pro Impressions":"https://www.salonsdirect.com/brands/pro-impressions","Pro Tan":"https://www.salonsdirect.com/brands/pro-tan","Pro Tip":"https://www.salonsdirect.com/brands/pro-tip","Procare":"https://www.salonsdirect.com/brands/procare","Proclere":"https://www.salonsdirect.com/brands/proclere","Proraso":"https://www.salonsdirect.com/brands/proraso","Purple Flame":"https://www.salonsdirect.com/brands/purple-flame","Quick + Easy":"https://www.salonsdirect.com/brands/quick-easy","Redliners":"https://www.salonsdirect.com/brands/redliners","Refectocil":"https://www.salonsdirect.com/brands/refectocil","Rejuvacote":"https://www.salonsdirect.com/brands/rejuvacote","REM":"https://www.salonsdirect.com/brands/rem","Renbow":"https://www.salonsdirect.com/brands/renbow","Retinol":"https://www.salonsdirect.com/brands/retinol","Revitalise":"https://www.salonsdirect.com/brands/revitalise","Revlon Professional":"https://www.salonsdirect.com/brands/revlon-professional","Riley":"https://www.salonsdirect.com/brands/riley","Robbo":"https://www.salonsdirect.com/brands/robbo","Rubbernex":"https://www.salonsdirect.com/brands/rubbernex","Salon Angel":"https://www.salonsdirect.com/brands/salon-angel","Salon System":"https://www.salonsdirect.com/brands/salon-system","Satin Smooth":"https://www.salonsdirect.com/brands/satin-smooth","SBC":"https://www.salonsdirect.com/brands/sbc","Schwarzkopf Professional":"https://www.salonsdirect.com/brands/schwarzkopf-professional","Scrun":"https://www.salonsdirect.com/brands/scrun","Seche":"https://www.salonsdirect.com/brands/seche","Sensor":"https://www.salonsdirect.com/brands/sensor","Sibel":"https://www.salonsdirect.com/brands/sibel","Sienna X":"https://www.salonsdirect.com/brands/sienna-x","Simply THE":"https://www.salonsdirect.com/brands/simply-the","Skin Doctors":"https://www.salonsdirect.com/brands/skin-doctors","Skin Republic":"https://www.salonsdirect.com/brands/skin-republic","SkinMate":"https://www.salonsdirect.com/brands/skinmate","Slika":"https://www.salonsdirect.com/brands/slika","Soffio":"https://www.salonsdirect.com/brands/soffio","Solar Clean":"https://www.salonsdirect.com/brands/solar-clean","Solida":"https://www.salonsdirect.com/brands/solida","Soluclean":"https://www.salonsdirect.com/brands/soluclean","Spa Essentials":"https://www.salonsdirect.com/brands/spa-essentials","Starflite":"https://www.salonsdirect.com/brands/starflite","Stargazer":"https://www.salonsdirect.com/brands/stargazer","Sterex":"https://www.salonsdirect.com/brands/sterex","Stohr":"https://www.salonsdirect.com/brands/stohr","STR":"https://www.salonsdirect.com/brands/str","Streaker":"https://www.salonsdirect.com/brands/streaker","Strictly Professional":"https://www.salonsdirect.com/brands/strictly-professional","Stylpro":"https://www.salonsdirect.com/brands/stylpro","Su-Do":"https://www.salonsdirect.com/brands/su-do","SumUp":"https://www.salonsdirect.com/brands/sumup","Super Million":"https://www.salonsdirect.com/brands/super-million","Sweet Georgia Brown":"https://www.salonsdirect.com/brands/sweet-georgia-brown","Synergy Tan":"https://www.salonsdirect.com/brands/synergy-tan","Tanning Essentials":"https://www.salonsdirect.com/brands/tanning-essentials","The Edge":"https://www.salonsdirect.com/brands/the-edge","The Original Tansie":"https://www.salonsdirect.com/brands/the-original-tansie","The Smoother":"https://www.salonsdirect.com/brands/the-smoother","The Wet Brush":"https://www.salonsdirect.com/brands/the-wet-brush","Tie Towel":"https://www.salonsdirect.com/brands/tie-towel","TIGI":"https://www.salonsdirect.com/brands/tigi","Timeless Truth":"https://www.salonsdirect.com/brands/timeless-truth","Tondeo":"https://www.salonsdirect.com/brands/tondeo","Topchic":"https://www.salonsdirect.com/brands/topchic","Triton":"https://www.salonsdirect.com/brands/triton","Trucare":"https://www.salonsdirect.com/brands/trucare","Truzone":"https://www.salonsdirect.com/brands/truzone","Tweezerman":"https://www.salonsdirect.com/brands/tweezerman","UniqOne":"https://www.salonsdirect.com/brands/uniqone","Universal":"https://www.salonsdirect.com/brands/universal","Uppercut Deluxe":"https://www.salonsdirect.com/brands/uppercut-deluxe","Vanity":"https://www.salonsdirect.com/brands/vanity","Vines":"https://www.salonsdirect.com/brands/vines","Vines Biocrin":"https://www.salonsdirect.com/brands/vines-biocrin","Vines Vintage":"https://www.salonsdirect.com/brands/vines-vintage","Vitale":"https://www.salonsdirect.com/brands/vitale","Volupturest":"https://www.salonsdirect.com/brands/volupturest","Vulsini":"https://www.salonsdirect.com/brands/vulsini","Wahl":"https://www.salonsdirect.com/brands/wahl","Wasabi":"https://www.salonsdirect.com/brands/wasabi","Washi":"https://www.salonsdirect.com/brands/washi","Wella Professionals":"https://www.salonsdirect.com/brands/wella-professionals","Wow Brows":"https://www.salonsdirect.com/brands/wow-brows","Xen-Tan":"https://www.salonsdirect.com/brands/xen-tan","Yasaka":"https://www.salonsdirect.com/brands/yasaka","YS Park":"https://www.salonsdirect.com/brands/ys-park","Zalon":"https://www.salonsdirect.com/brands/zalon","Zeosoft":"https://www.salonsdirect.com/brands/zeosoft","Zotos":"https://www.salonsdirect.com/brands/zotos"}

		var results = Object.keys(brandObj);
		var brandName = $('.product-shop .product-name h1.h1').text().trim().split(' ');

		var url = '';
		// match 3 words of the product title and check against brand object to get the brand URL
		var brandWord = (brandName[0] + ' ' + brandName[1] + ' ' + brandName[2]).trim();
		var didMatch = results.indexOf(brandWord);
		if(didMatch > -1) {
		  // lookup the brand object
		  url = brandObj[brandWord]
		} else {
			// if didnt match 3 words but matches first 2
		  brandWord = (brandName[0] + ' ' + brandName[1]).trim();
		  didMatch = results.indexOf(brandWord);
		  if(didMatch > -1) {
			
			url = brandObj[brandWord];
		  } else {
			  // if only matches first word
			brandWord = (brandName[0]).trim();
			didMatch = results.indexOf(brandWord);
			if(didMatch > -1) {
			 url = brandObj[brandWord];
			}
		  }
		}
		
		if(url) {
			/*-------------------------------
			If product name matches & the pop up is being shown on the page refresh add all brands button
			---------------------------------*/
			var windowURL = window.location.href;
				if(windowURL.indexOf('addedprod=') > -1){
					var allBrandsLinks = $('<div class="sd45-brandButtons"><a href="'+url+'">Shop all '+brandWord+' Products</a><div>');
					if($('.main .breadcrumbs').length > 0){
						allBrandsLinks.insertAfter('.main .breadcrumbs');
					}else{
						allBrandsLinks.prependTo('.main-container .main');
					}
				}
        }
	}
	
})();
		