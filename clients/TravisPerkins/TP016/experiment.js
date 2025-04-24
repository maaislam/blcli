var TP016 = (function () {

	/**
	 * UC Library - Poller
	 * @version 0.2.2
	 */
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	
	var trackerName;

	function sendEvent(category, action, label, nonInteractionValue) {
		var fire = function(tracker) {
			window.ga(tracker + '.send', 'event', category, action, label, {nonInteraction: nonInteractionValue});
		};

		if (trackerName) {
			fire(trackerName);
		} else {
			UC.poller([
				function() { return window.ga.getAll; }
			], function() {
				trackerName = window.ga.getAll()[0].get('name');
				fire(trackerName);
			});
		}
	}

	var _triggers = (function () {
		UC.poller([
			'#tpFilterSearch-popup',
			'.tpApplyFilter',
			'.tp_prodViewWrapper',
			'.tp_sortWrapper',
			function () { return window.jQuery; },
			function () { return window.ga; }
		], activate);
	})();

function activate() {

		UC.poller([
			function() {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'TP016',
				variation_str: 'Variation 1 Mobile'
			});
		}, { multiplier: 1.2, timeout: 0 });

		$('body').addClass('TP016');

		var filterPopup = $('#tpFilterSearch-popup'),
			filterLiWrap = filterPopup.find('.ui-collapsible-set'),
			filterCategory = filterLiWrap.children('li:nth-child(1)'),
			filterType = filterLiWrap.children('li:nth-child(2)'),
			filterLength = filterLiWrap.children('li:nth-child(3)'),
			filterWidth = filterLiWrap.children('li:nth-child(4)'),
			filterThickness = filterLiWrap.children('li:nth-child(5)'),
			mainWrap = filterPopup.find('.ui-content');


		filterLength.find('> h2 > a').prepend('<img src="http://sb.monetate.net/img/1/581/1053218.png" />');
		filterWidth.find('> h2 > a').prepend('<img src="http://sb.monetate.net/img/1/581/1053219.png" />');
		filterThickness.find('> h2 > a').prepend('<img src="http://sb.monetate.net/img/1/581/1053220.png" />');

		filterPopup
			.removeClass('ui-popup-hidden ui-popup-truncate')
			.addClass('ui-popup-active');

		$('.tp_filtersWrapper')
			.before(filterPopup);

		$('.tp_filterSearchBtnWrapper').hide();

		filterThickness
			.after('<a href="#" class="more_options-dd"><img src="http://sb.monetate.net/img/1/581/1053221.png" />More...</a>');

		mainWrap
			.after('<div class="TP-dd_wrap"><div class="more_dd ui-collapsible-content"></div></div>');

		var ddWrap = $('.TP-dd_wrap'),
			moreDD = $('.more_dd');

		moreDD.append(filterCategory);
		moreDD.append(filterType);
		filterLength.children('.ui-collapsible-content').addClass('length_dd');
		filterWidth.children('.ui-collapsible-content').addClass('width_dd');
		filterThickness.children('.ui-collapsible-content').addClass('thickness_dd');
		$('.showMoreLinkWrapper').prepend('<span class="more_less-arrow"></span>');

		var lengthDD = $('.length_dd'),
			widthDD = $('.width_dd'),
			thicknessDD = $('.thickness_dd'),
			dropDown = $('.more_dd');

		ddWrap.append(lengthDD, widthDD, thicknessDD);

		$('.ui-collapsible-set .ui-collapsible-heading-toggle').on('click', function () {
			var el = $(this);

			if (el.hasClass('active')) {
				el.removeClass('active');
			} 
			else {
				if($('.ui-collapsible-set .ui-collapsible-heading-toggle.active').length > 0){
					$('.ui-collapsible-set .ui-collapsible-heading-toggle.active').removeClass('active');
					el.addClass('active');
				}
				else if ($('.more_options-dd').hasClass('active')){
					$('.more_options-dd').removeClass('active');
					dropDown.removeClass('active');
					el.addClass('active');
				}
				else{
					el.addClass('active');
				}
			}
		});
		$('.more_options-dd').on('click', function(){
			var el = $(this),
				otherBtn = $('.ui-collapsible-set .ui-collapsible-heading-toggle.active')

			
			sendEvent('TP016---TimberRefineMobile', 'Filter button clicked', 'More filter', true);

			if (el.hasClass('active')) {
				el.removeClass('active');
				dropDown.removeClass('active');
			} 
			else {
				if($('.ui-collapsible-set .ui-collapsible-heading-toggle.active').length > 0){
					$('.ui-collapsible-set .ui-collapsible-heading-toggle.active').closest('li.notTreeFacet').addClass('ui-collapsible-collapsed');
					$('.ui-collapsible-set .ui-collapsible-heading-toggle.active').closest('h2.ui-collapsible-heading').addClass('ui-collapsible-heading-collapsed');
					$('.ui-collapsible-set .ui-collapsible-heading-toggle.active').addClass('ui-icon-minus').removeClass('.ui-icon-plus active');
					$('.length_dd, .width_dd, .thickness_dd').addClass('ui-collapsible-content-collapsed').attr('aria-hidden', 'true');
					el.addClass('active');
					dropDown.addClass('active');				
				}

				else{
					el.addClass('active');
					dropDown.addClass('active');
				}
			}
		});

		$('.TP016 #tpFilterSearch-popup .ui-collapsible-set>li h2>a').on('click', function(){
			sendEvent('TP016---TimberRefineMobile', 'Filter button clicked', $(this).find('label').text() + 'filter', true);
		});

		$('.TP016 #tpFilterSearch-popup .ui-footer .tpApplyFilter').on('click', function(){
			sendEvent('TP016---TimberRefineMobile', 'Apply filter clicked', '', true);
		});
	}
})();