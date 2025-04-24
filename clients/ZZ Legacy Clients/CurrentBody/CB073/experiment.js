var WO002 = (function() {
/**
 * UC Library - Poller
 * @version 0.2.2
 */
var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
var _triggers = (function () {
	UC.poller([function(){ return window.ga }], function() {
		window.ga('send', 'event', 'WO002', 'Running triggers', 'WO002-Triggers', {nonInteraction: 1});
	});
	UC.poller([
			'#size_form',
			'.product_table',
			'.product_options.product_table',
			'#price_container',
			'#buy_it',
			function () { return window.jQuery; },
			function () { return window.ga; }
		], activate);
	})();
	function activate() {
		window.ga('send', 'event', 'WO002', 'Test activated', 'WO002-Activate', {nonInteraction: 1});
		UC.poller([
			function() {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'TP011',
				variation_str: 'Variation 1 Desktop'
			});
		}, { multiplier: 1.2, timeout: 0 });
		$('body').addClass('WO002');
		var countdown = $('#clock'),
			dispatch = $('#lead_time'),
			sizingChart = $('.product_right.margin-top'),
			recessSlatTable = $('.product_options.product_table'),
			sizeTableFirstRow = $('.size_head').nextAll('.product_table').first().find('tbody > tr:first-child'),
			sampleBlock = $('#sample'),
			sampleBtn = $('#sample .free_sample'),
			enterSize = $('.size_head'),
			videoBlockWrap = $('#mGuide'),
			videoBlockWrapH3 = $('#mGuide > h3'),
			videoBlock = $('#mGuide .mCta'),
			addToCartWrap = $('#price_container');
		if(countdown.length > 0){
			sizingChart
				.insertBefore(countdown)
				.removeClass('margin-top')
				.addClass('WO002_chart');
		}
		else{
			sizingChart
				.insertBefore(dispatch)
				.removeClass('margin-top')
				.addClass('WO002_chart');
		}
		
		var recessRow = $('.product_options.product_table #Option847').closest('tr');
			recessRow.insertBefore(sizeTableFirstRow);
		if($('input[name*=Slat]').length > 0){
			recessSlatTable
				.find('tbody > tr:first-child')
				.addClass('WO002_slat_row');
			recessSlatTable
				.after('<div class="image_slats"><span>All product images have 50mm slats</span></div>');
		}
		$('#lead_time + div').insertAfter(sampleBlock);
		enterSize
			.text('Configure your Made to Measure Blind');
	
		enterSize.after([
			'<div class="measuring_guide_wrap">',
				'<span class="ruler_img"><img src="https://cdn.interiorgoodsdirect.com/woodens/img/decor/madetomeasure_usp.png" /></span>',
				'<p>Not measured up yet? View our</p>',
				'<a class="measure_guide" href="#">Measuring Guide</a>',
			'</div>'
		].join(''));
		$('.compInfo').after([
			'<div class="measuring_guide_modal">',
				'<div class="cf">',
					'<a href="#" class="close_btn">X</a>',
					'<div class="overflow_fix">',
						'<div class="col_6">',
							'<h2>Recess Size</h2>',
							'<ul>',
								'<li>Take 3 measurements for the width of the window recess as shown in the picture.</li>',
								'<li>Take the samllest of these measurements.</li>',
								'<li>Do the same for the drop, again taking the smallest measurement.</li>',
								'<li>You do not need to deduct anything from the drop measurement.</li>',
								'<li>The drop includes any pelmets or valances at the top of the blind.</li>',
							'</ul>',
							'<p><strong>Please Note:</strong> For recess measurements we will deduct 7.5mm from each side for the width.</p>',
							'<div class="img_wrap">',
								'<img src="/img/decor/inside-recess-width-web.jpg" />',
								'<img src="/img/decor/inside-recess-height-web.jpg" />',
							'</div>',
						'</div>',
						'<div class="col_6">',
							'<h2>Exact Size</h2>',
							'<ul>',
								'<li>Take 3 measurements for the width of the window recess as shown in the picture.</li>',
								'<li>Take the samllest of these measurements.</li>',
								'<li>Do the same for the drop, again taking the smallest measurement.</li>',
								'<li>You do not need to deduct anything from the drop measurement.</li>',
								'<li>The drop includes any pelmets or valances at the top of the blind.</li>',
							'</ul>',
							'<div class="img_wrap">',
								'<img src="/img/decor/outer-recess-width-web.jpg" />',
								'<img src="/img/decor/outer-recess-height-web.jpg" />',
								'<img src="/img/decor/exact-blind-size-updated.jpg" />',
							'</div>',
						'</div>',
						'<div class="col_12">',
							'<a href="#">Get more information and watch video guides ></a>',
						'</div>',
					'</div>',
				'</div>',
			'</div>'
		].join(''));
		videoBlock
			.find('.fa.fa-youtube-play')
			.prependTo(videoBlock.parent());
		videoBlock	
			.find('a')
			.text('Watch Videos');
		videoBlockWrapH3
			.text('Watch our Video Guides');
		sampleBlock.insertBefore(videoBlockWrap);
		sampleBtn.prepend('<a href="#" class="image_trigger">Get FREE Sample</a>');
		sampleBlock.prepend('<i class="fa fa-envelope" aria-hidden="true"></i>');
		addToCartWrap.after('<p>All fittings & brackets are included</p>');
		var modal = $('.measuring_guide_modal'),
			slideQ = false,
			measureInputsWidth = $('.measuring_guide_wrap + .product_table .altrow:first-child + .altrow'),
			measureInputsHeight = $('.measuring_guide_wrap + .product_table .altrow:first-child + .altrow + tr'),
			measureWrap = $('.measuring_guide_wrap');
		measureInputsWidth.find('.box_th').text('Width:');
		measureInputsWidth.find('input').hide().after('<input class="width_input" type="number" autocomplete="off" placeholder="min: 35" id="width" step="0.1"><span class="measurement_type">cm</span>');
		//.attr('placeholder', 'min: 35').after('<span class="measurement_type">cm</span>');
		measureInputsHeight.find('.box_th').text('Drop:');
		measureInputsHeight.find('input').hide().after('<input class="height_input" type="number" autocomplete="off" placeholder="min: 30" id="width" step="0.1"><span class="measurement_type">cm</span>');
		measureWrap.after([
			'<div class="radio_wrap">',
				'<span>',
					'<input type="radio" id="SizeInches" autocomplete="off" name="sizingRadios" />',
					'<label for="SizeInches">inches</label>',
					'<span class="radio_tooltip">If you want your blinds to sit in the window recess. we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</span>',
				'</span>',
				'<span>',
					'<input type="radio" id="SizeCM" class="convert_class" autocomplete="off" checked="checked" name="sizingRadios" />',
					'<label for="SizeCM">cm</label>',
					'<span class="radio_tooltip">If you want your blinds to sit in the window recess. we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</span>',
				'</span>',
				'<span>',
					'<input type="radio" id="SizeMM" autocomplete="off" name="sizingRadios" />',
					'<label for="SizeMM">mm</label>',
					'<span class="radio_tooltip">If you want your blinds to sit in the window recess. we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</span>',
				'</span>',
			'</div>'
		].join(''));
		var measureType = $('.measurement_type'),
			widthInput = $('.width_input'),
			widthReal = widthInput.prev('input'),
			heightInput = $('.height_input'),
			heightReal = heightInput.prev('input'),
			convertFrom = $('.convert_class').attr('id'),
			currentConvert = $('.convert_class'),
			disabledInput = $('.price_container .submit'),
			errorHeight = $('#errmsg_drop'),
			errorWidth = $('#errmsg_width'),
			radioID = '';
			tickWidth = widthInput.parent().find('.tick'),
			tickHeight = heightInput.parent().find('.tick'),
			regExp = /^(\d\/\d|\d)$/,
			recessBtn = $('#Option847'),
			exactBtn = $('#Option846'),
			slatSevenBtn =  $('input[name*=Slat]').closest('.radio-holder').children('span:first-child'),
			slatFiveBtn =  $('input[name*=Slat]').closest('.radio-holder').children('span:first-child + span'),
			slatZeroBtn = $('input[name*=Slat]').closest('.radio-holder').children('span:first-child + span + span'),
			slatSixBtn = $('input[name*=Slat]').closest('.radio-holder').children('span:first-child + span + span + span'),
			tiltLeft = $('input[name*=Tilt]').closest('.radio-holder').children('span:first-child'),
			tiltRight = $('input[name*=Tilt]').closest('.radio-holder').children('span:first-child + span'),
			bracketsLeft = $('input[name*=Brackets]').closest('.radio-holder').children('span:first-child'),
			bracketsRight = $('input[name*=Brackets]').closest('.radio-holder').children('span:first-child + span'),
			raiseLeft = $('input[name*=Raise]').closest('.radio-holder').children('span:first-child'),
			raiseRight = $('input[name*=Raise]').closest('.radio-holder').children('span:first-child + span');
		if($('input[name*=Tilt]').length > 0){
			tiltLeft.append('<span class="radio_tooltip">Tilt Left If you want your blinds to sit in the window recess. we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</span>');
			tiltRight.append('<span class="radio_tooltip">Tilt Right If you want your blinds to sit in the window recess. we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</span>');
		}
		if($('input[name*=Raise]').length > 0){
			raiseLeft.append('<span class="radio_tooltip">Raise Left If you want your blinds to sit in the window recess. we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</span>');
			raiseRight.append('<span class="radio_tooltip">Raise Right If you want your blinds to sit in the window recess. we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</span>');
		}
		if($('input[name*=Brackets]').length > 0){
			bracketsLeft.append('<span class="radio_tooltip">Brackets Left If you want your blinds to sit in the window recess. we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</span>');
			bracketsRight.append('<span class="radio_tooltip">Brackets Right If you want your blinds to sit in the window recess. we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</span>');
		}
		if($('input[name*=Slat]').length > 0){
			slatSevenBtn.append('<span class="radio_tooltip">27 If you want your blinds to sit in the window recess. we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</span>');
			slatFiveBtn.append('<span class="radio_tooltip">35 If you want your blinds to sit in the window recess. we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</span>');
			slatZeroBtn.append('<span class="radio_tooltip">50 If you want your blinds to sit in the window recess. we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</span>');
			slatSixBtn.append('<span class="radio_tooltip">64 If you want your blinds to sit in the window recess. we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</span>');
		}
		recessBtn.after('<span class="radio_tooltip">If you want your blinds to sit in the window recess. we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</span>');
		exactBtn.after('<span class="radio_tooltip">If you want your blinds to sit in the window recess. we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</span>');
		widthInput.after([
			'<select id="fractionForWidth" style="display: none;">',
				'<option value="0" selected="selected">0</option>',
				'<option value="1">1/8</option>',
				'<option value="2">1/4</option>',
				'<option value="3">3/8</option>',
				'<option value="4">1/2</option>',
				'<option value="5">5/8</option>',
				'<option value="6">3/4</option>',
				'<option value="7">7/8</option>',
			'</select>'
		].join(''));
		heightInput.after([
			'<select id="fractionForHeight" style="display: none;">',
				'<option value="0" selected="selected">0</option>',
				'<option value="1">1/8</option>',
				'<option value="2">1/4</option>',
				'<option value="3">3/8</option>',
				'<option value="4">1/2</option>',
				'<option value="5">5/8</option>',
				'<option value="6">3/4</option>',
				'<option value="7">7/8</option>',
			'</select>'
		].join(''));
		var widthFraction = $('#fractionForWidth'),
			heightFraction = $('#fractionForHeight');
		$('.radio_wrap input').change(function(){
			var el = $(this),
				radioID = el.attr('id'),
				originalValueWidth = $('.width_input').val(),
				convertFrom = $('.convert_class').attr('id'),
				originalValueHeight = $('.height_input').val(),
				toolTip = el.parent().find('.radio_tooltip');
				
			if(slideQ == false){
				slideQ = true;
				toolTip = $(this).parent().find('.radio_tooltip');
				toolTip.fadeIn('slow', function(){
					toolTip.delay(5000).fadeOut('slow', function(){
						slideQ = false;
					});
				});
			}
			if(convertFrom == 'SizeInches'){
				if(radioID == 'SizeCM'){
					measureType.text('cm');
					widthInput.attr('placeholder', 'min: 35');
					heightInput.attr('placeholder', 'min: 30');
					if(heightInput.val()){
						originalValueHeight = originalValueHeight * 2.54;
						originalValueHeight = parseFloat(originalValueHeight).toFixed(1);
						heightReal.val(originalValueHeight);
						heightInput.val(originalValueHeight);
					}
					if(widthInput.val()){
						originalValueWidth = originalValueWidth * 2.54;
						originalValueWidth = parseFloat(originalValueWidth).toFixed(1);
						widthReal.val(originalValueWidth);
						widthInput.val(originalValueWidth);
					}
					widthFraction.hide();
					heightFraction.hide();
					if(errorWidth.is(':visible')){
						errorWidth.text('limits: 35cm - 240cm');
					}
					if(errorHeight.is(':visible')){
						errorHeight.text('limits: 35cm - 240cm');
					}
				}
				if(radioID == 'SizeMM'){
					measureType.text('mm');
					widthInput.attr('placeholder', 'min: 350');
					heightInput.attr('placeholder', 'min: 300');
					if(heightInput.val()){
						originalValueHeight = originalValueHeight * 25.4;
						originalValueHeight = parseFloat(originalValueHeight).toFixed(1);
						heightReal.val(originalValueHeight / 10);
						heightInput.val(originalValueHeight);
					}
					if(widthInput.val()){
						originalValueWidth = originalValueWidth * 25.4;
						originalValueWidth = parseFloat(originalValueWidth).toFixed(1);
						widthReal.val(originalValueWidth / 10);
						widthInput.val(originalValueWidth);
					}
					widthFraction.hide();
					heightFraction.hide();
					if(errorWidth.is(':visible')){
						errorWidth.text('limits: 350mm - 2400mm');
					}
					if(errorHeight.is(':visible')){
						errorHeight.text('limits: 300mm - 3000mm');
					}
				}
			}
			if(convertFrom == 'SizeCM'){
				if(radioID == 'SizeInches'){
					measureType.text('inches');
					widthInput.attr('placeholder', 'min: 13 7/8');
					heightInput.attr('placeholder', 'min: 11 7/8');
					if(heightInput.val()){
						originalValueHeight = parseFloat(originalValueHeight).toFixed(1);
						heightReal.val(originalValueHeight);
						originalValueHeight = originalValueHeight / 2.54;
						originalValueHeight = parseFloat(originalValueHeight).toFixed(1);
						heightInput.val(originalValueHeight);
					}
					if(widthInput.val()){
						originalValueWidth = parseFloat(originalValueWidth).toFixed(1);
						widthReal.val(originalValueWidth);
						originalValueWidth = originalValueWidth / 2.54;
						originalValueWidth = parseFloat(originalValueWidth).toFixed(1);
						widthInput.val(originalValueWidth);
					}
					
					widthFraction.show();
					heightFraction.show();
					if(errorWidth.is(':visible')){
						errorWidth.text('limits: 13 7/8 - 94 1/2');
					}
					if(errorHeight.is(':visible')){
						errorHeight.text('limits: 11 7/8 - 118 1/8');
					}
				}
				if(radioID == 'SizeMM'){
					measureType.text('mm');
					widthInput.attr('placeholder', 'min: 350');
					heightInput.attr('placeholder', 'min: 300');
					if(heightInput.val()){
						originalValueHeight = parseFloat(originalValueHeight).toFixed(1);
						heightReal.val(originalValueHeight);
						originalValueHeight = originalValueHeight * 10;
						originalValueHeight = parseFloat(originalValueHeight).toFixed(1);
						heightInput.val(originalValueHeight);
					}
					if(widthInput.val()){
						originalValueWidth = parseFloat(originalValueWidth).toFixed(1);
						widthReal.val(originalValueWidth);
						originalValueWidth = originalValueWidth * 10;
						originalValueWidth = parseFloat(originalValueWidth).toFixed(1);
						widthInput.val(originalValueWidth);
					}
					if(errorWidth.is(':visible')){
						errorWidth.text('limits: 350mm - 2400mm');
					}
					if(errorHeight.is(':visible')){
						errorHeight.text('limits: 300mm - 3000mm');
					}
				}
			}
			if(convertFrom == 'SizeMM'){
				if(radioID == 'SizeInches'){
					measureType.text('inches');
					widthInput.attr('placeholder', 'min: 13 7/8');
					heightInput.attr('placeholder', 'min: 11 7/8');
					if(heightInput.val()){
						originalValueHeight = originalValueHeight / 25.4;
						originalValueHeight = parseFloat(originalValueHeight).toFixed(1);
						heightReal.val(originalValueHeight * 2.54);
						heightInput.val(originalValueHeight);
					}
					if(widthInput.val()){
						originalValueWidth = originalValueWidth / 25.4;
						originalValueWidth = parseFloat(originalValueWidth).toFixed(1);
						widthReal.val(originalValueWidth * 2.54);
						widthInput.val(originalValueWidth);
					}
					widthFraction.show();
					heightFraction.show();
					if(errorWidth.is(':visible')){
						errorWidth.text('limits: 13 7/8 - 94 1/2');
					}
					if(errorHeight.is(':visible')){
						errorHeight.text('limits: 11 7/8 - 118 1/8');
					}
				}
				if(radioID == 'SizeCM'){
					measureType.text('cm');
					widthInput.attr('placeholder', 'min: 35');
					heightInput.attr('placeholder', 'min: 30');
					if(heightInput.val()){
						originalValueHeight = originalValueHeight / 10;
						originalValueHeight = parseFloat(originalValueHeight).toFixed(1);
						heightReal.val(originalValueHeight);
						heightInput.val(originalValueHeight);
					}
					if(widthInput.val()){
						originalValueWidth = originalValueWidth / 10;
						originalValueWidth = parseFloat(originalValueWidth).toFixed(1);
						widthReal.val(originalValueWidth);
						widthInput.val(originalValueWidth);
					}
					if(errorWidth.is(':visible')){
						errorWidth.text('limits: 35cm - 240cm');
					}
					if(errorHeight.is(':visible')){
						errorHeight.text('limits: 35cm - 240cm');
					}
				}
			}
			$('.convert_class').removeClass('convert_class');
			el.addClass('convert_class');
			convertFrom = $('.convert_class').attr('id');
		});
		widthInput.keyup(function() {
			var el = $(this),
				thisValue = el.val();
			convertFrom = $('.convert_class').attr('id');
			if(convertFrom == 'SizeMM'){
				widthReal.val(thisValue / 10);
			}
			if(convertFrom == 'SizeInches'){
				widthReal.val(thisValue * 2.54);
			}
			if(convertFrom == 'SizeCM'){
				widthReal.val(thisValue);
			}
		});
		heightInput.keyup(function() {
			var el = $(this),
				thisValue = el.val();
			convertFrom = $('.convert_class').attr('id');
			if(convertFrom == 'SizeMM'){
				heightReal.val(thisValue / 10);
			}
			if(convertFrom == 'SizeInches'){
				heightReal.val(thisValue * 2.54);
			}
			if(convertFrom == 'SizeCM'){
				heightReal.val(thisValue);
			}
		});
		heightInput.blur(function() {
			var el = $(this),
			heightParse = parseFloat(heightInput.val()),
			heightRealParse = parseFloat(heightReal.val()),
			unitCheck = $('.convert_class').attr('id'),
			widthString = heightFraction.find('option:selected').text();
			if(regExp.test(widthString) == true){
				evalFraction = eval(heightFraction.find('option:selected').text());
			}
			
			if(unitCheck == 'SizeInches'){
				heightRealParse = (evalFraction + heightParse) * 2.54;
				heightInput.val(heightParse.toFixed(0));
				heightReal.val(heightRealParse.toFixed(1));
			}
			else{
				heightInput.val(heightParse.toFixed(1));
				heightReal.val(heightRealParse.toFixed(1));
			}
			if(heightRealParse < 30){
				if(unitCheck == 'SizeInches'){
					errorHeight.text('limits: 11 7/8 - 118 1/8').show();
				}
				else if(unitCheck == 'SizeMM'){
					errorHeight.text('limits: 300mm - 3000mm').show();
				}
				else{
					errorHeight.text('limits: 30cm - 300cm').show();
				}
				disabledInput.addClass('disabled').find('input').prop("disabled", true);
				tickHeight.removeClass('tickbig tickback');	
			}
			else if (heightRealParse > 300){
				if(unitCheck == 'SizeInches'){
					errorHeight.text('limits: 11 7/8 - 118 1/8').show();
				}
				else if(unitCheck == 'SizeMM'){
					errorHeight.text('limits: 300mm - 3000mm').show();
				}
				else{
					errorHeight.text('limits: 30cm - 300cm').show();
				}
				disabledInput.addClass('disabled').find('input').prop("disabled", true);
				tickHeight.removeClass('tickbig tickback');		
			}
			else{
				errorHeight.hide();
				tickHeight.addClass('tickbig tickback');
				if(widthReal.val()){
					if($('#errmsg_width').is(':visible')){
						
					}
					else{
						disabledInput.removeClass('disabled').find('input').prop("disabled", false);
					}
				}
				if(heightReal.val()){
				}
				else{
					disabledInput.addClass('disabled').find('input').prop("disabled", true);
					tickHeight.removeClass('tickbig tickback');		
				}
			}
		});
		widthInput.blur(function() {
			var el = $(this),
			widthParse = parseFloat(widthInput.val()),
			widthRealParse = parseFloat(widthReal.val()),
			unitCheck = $('.convert_class').attr('id'),
			widthString = widthFraction.find('option:selected').text();
			if(regExp.test(widthString) == true){
				evalFraction = eval(widthFraction.find('option:selected').text());
			}
			if(unitCheck == 'SizeInches'){
				widthRealParse = (evalFraction + widthParse) * 2.54;
				widthInput.val(widthParse.toFixed(0));
				widthReal.val(widthRealParse.toFixed(1));
			}
			else{
				widthInput.val(widthParse.toFixed(1));
				widthReal.val(widthRealParse.toFixed(1));
			}
			if(widthRealParse < 35){
				if(unitCheck == 'SizeInches'){
					errorWidth.text('limits: 13 7/8 - 94 1/2').show();
				}
				else if(unitCheck == 'SizeMM'){
					errorWidth.text('limits: 350mm - 2400mm').show();
				}
				else{
					errorWidth.text('limits: 35cm - 240cm').show();
				}
				disabledInput.addClass('disabled').find('input').prop("disabled", true);		
				tickWidth.removeClass('tickbig tickback');
			}
			else if (widthRealParse > 240){
				if(unitCheck == 'SizeInches'){
					errorWidth.text('limits: 13 7/8 - 94 1/2').show();
				}
				else if(unitCheck == 'SizeMM'){
					errorWidth.text('limits: 350mm - 2400mm').show();
				}
				else{
					errorWidth.text('limits: 35cm - 240cm').show();
				}
				disabledInput.addClass('disabled').find('input').prop("disabled", true);	
				tickWidth.removeClass('tickbig tickback');
			}
			else{
				errorWidth.hide();
				tickWidth.addClass('tickbig tickback');
				if(heightReal.val()){
					if($('#errmsg_drop').is(':visible')){
						
					}
					else{
						disabledInput.removeClass('disabled').find('input').prop("disabled", false);
					}
				}
				if(widthReal.val()){
				}
				else{
					disabledInput.addClass('disabled').find('input').prop("disabled", true);
					tickHeight.removeClass('tickbig tickback');		
				}
			}
		});
		heightFraction.on('change', function(){
			var heightString = heightFraction.find('option:selected').text(),
				unitCheck = $('.convert_class').attr('id');
			if(regExp.test(heightString) == true){
				var evalFraction = eval(heightString),
					currentHeight = parseFloat(heightInput.val());
					if(isNaN(currentHeight)){
						currentHeight = 0;
					}
				totalWidth = (evalFraction + currentHeight) * 2.54;
				heightReal.val(totalWidth.toFixed(1));
				
				var parseHeight = parseFloat(heightReal.val());
				if(parseHeight < 30){
					if(unitCheck == 'SizeInches'){
						errorWidth.text('limits: 13 7/8 - 94 1/2').show();
					}
					else if(unitCheck == 'SizeMM'){
						errorWidth.text('limits: 350mm - 2400mm').show();
					}
					else{
						errorWidth.text('limits: 35cm - 240cm').show();
					}
					disabledInput.addClass('disabled').find('input').prop("disabled", true);		
					tickWidth.removeClass('tickbig tickback');
				}
				else if (parseHeight > 300){
					if(unitCheck == 'SizeInches'){
						errorWidth.text('limits: 13 7/8 - 94 1/2').show();
					}
					else if(unitCheck == 'SizeMM'){
						errorWidth.text('limits: 350mm - 2400mm').show();
					}
					else{
						errorWidth.text('limits: 35cm - 240cm').show();
					}
					disabledInput.addClass('disabled').find('input').prop("disabled", true);	
					tickWidth.removeClass('tickbig tickback');
				}
				else{
					errorWidth.hide();
					tickWidth.addClass('tickbig tickback');
					if(heightReal.val()){
						if($('#errmsg_drop').is(':visible')){
							
						}
						else{
							disabledInput.removeClass('disabled').find('input').prop("disabled", false);
						}
					}
				}
			}
		});
		widthFraction.on('change', function(){
			var widthString = widthFraction.find('option:selected').text(),
				unitCheck = $('.convert_class').attr('id');
	
			if(regExp.test(widthString) == true){
				var evalFraction = eval(widthString),
					currentWidth = parseFloat(widthInput.val());
					if(isNaN(currentWidth)){
						currentWidth = 0;
					}
				totalWidth = (evalFraction + currentWidth) * 2.54;
				//console.log(evalFraction, currentWidth, totalWidth);
				widthReal.val(totalWidth.toFixed(1));
				var parseWidth = parseFloat(widthReal.val());
				if(parseWidth < 35){
					if(unitCheck == 'SizeInches'){
						errorWidth.text('limits: 13 7/8 - 94 1/2').show();
					}
					else if(unitCheck == 'SizeMM'){
						errorWidth.text('limits: 350mm - 2400mm').show();
					}
					else{
						errorWidth.text('limits: 35cm - 240cm').show();
					}
					disabledInput.addClass('disabled').find('input').prop("disabled", true);		
					tickWidth.removeClass('tickbig tickback');
				}
				else if (parseWidth > 240){
					if(unitCheck == 'SizeInches'){
						errorWidth.text('limits: 13 7/8 - 94 1/2').show();
					}
					else if(unitCheck == 'SizeMM'){
						errorWidth.text('limits: 350mm - 2400mm').show();
					}
					else{
						errorWidth.text('limits: 35cm - 240cm').show();
					}
					disabledInput.addClass('disabled').find('input').prop("disabled", true);	
					tickWidth.removeClass('tickbig tickback');
				}
				else{
					errorWidth.hide();
					tickWidth.addClass('tickbig tickback');
					if(heightReal.val()){
						if($('#errmsg_drop').is(':visible')){
							
						}
						else{
							disabledInput.removeClass('disabled').find('input').prop("disabled", false);
						}
					}
				}
			}
		});
		$('.image_trigger').on('click', function(e){
			e.preventDefault();
			$('.free_sample input').trigger('click');
		});
		if(slideQ == false){
			$('.measure_guide, .measuring_guide_modal .close_btn').on('click', function(e){
				slideQ = true;
				e.preventDefault();
				if(modal.hasClass('active')) {
					modal.fadeOut('slow', function(){
						modal.removeClass('active');
						slideQ = false;
					});
				}
				else {
					modal.fadeIn('slow', function(){
						modal.addClass('active');
						slideQ = false;
					});
				}
			});
		}
		$('.radio-holder input').on('change', function(){
			if(slideQ == false){
				slideQ = true;
				toolTip = $(this).parent().find('.radio_tooltip');
				toolTip.fadeIn('slow', function(){
					toolTip.delay(5000).fadeOut('slow', function(){
						slideQ = false;
						if($('#errmsg_drop').is(':visible') || $('#errmsg_width').is(':visible')){
						}
						else{
							disabledInput.removeClass('disabled').find('input').prop("disabled", false);
						}
					});
				});
			}
		});
	}
})();
