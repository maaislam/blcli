var WO002 = (function () {
    /**
     * UC Library - Poller
     * @version 0.2.2
     */
    var UC = function (a) {
        return a.poller = function (a, b, c) {
            var d = {
                    wait: 50,
                    multiplier: 0,
                    timeout: 6000
                },
                e = Date.now || function () {
                    return (new Date).getTime()
                };
            if (c)
                for (var f in c) d[f] = c[f];
            else c = d;
            for (var g = !!d.timeout && new Date(e() + d.timeout), h = d.wait, i = d.multiplier, j = [], l = function (c, d) {
                    if (g && e() > g) return !1;
                    d = d || h,
                        function () {
                            var a = typeof c;
                            return "function" === a ? c() : "string" !== a || document.querySelector(c)
                        }() ? (j.push(!0), j.length === a.length && b()) : setTimeout(function () {
                            l(c, d * i)
                        }, d)
                }, m = 0; m < a.length; m++) l(a[m])
        }, a
    }(UC || {});
    var _triggers = (function () {
        UC.poller([
            '#size_form',
            '.product_table',
            '.product_options.product_table',
            '#price_container',
            '#buy_it',
            function () {
                return window.jQuery;
            },
            function () {
                return window.ga;
            }
        ], activate);
    })();
    function activate() {
        window.ga('send', 'event', 'WO002', 'Test activated', 'WO002-Activate', {
            nonInteraction: 1
        });
      
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
        UC.poller([
            function () {
                var fs = window.FS;
                if (fs && fs.setUserVars) return true;
            }
        ], function () {
            window.FS.setUserVars({
                experiment_str: 'WO002',
                variation_str: 'Variation 1 Desktop'
            });
        }, {
            multiplier: 1.2,
            timeout: 0
        });
        function submit_form() {
            //disable ajax submit until I 
            //return true;
            var url = "/stores/ajax_price/"; // the script where you handle the form input.
            $.ajax({
                type: "POST",
                url: url,
                data: $("#size_form").serialize(), // serializes the form's elements.
                success: function (data) {
                    var price = $('#price');
                    price.empty().html(data);
                    if (price) {
                        valid_price = 1;
                    }
                    var getNewPrice = $('#newPrice').html();
                    var newPrice = Number(getNewPrice.replace(/[^0-9\.]+/g, ""));
                    var getOldPrice = newPrice * (10 / 9);
                    var oldPrice = getOldPrice.toFixed(2);
                    $('#before10price').html('&pound;' + oldPrice);
                }
            });
            $('#price').css('margin-bottom', '13px');
            return false; // avoid to execute the actual submit of the form.
        }
        var countDecimals = function (value) {
            if(Math.floor(value) === value) return 0;
            return value.toString().split(".")[1].length || 0; 
        };
        function fractionToDecimal(fraction) {
            var fractionParts = fraction.split('-');
            if (fractionParts.length === 1) {
                fractionParts = fraction.split(' ');
            }
            if (fractionParts.length > 1 && fraction.indexOf('/') !== -1) {
                var integer = parseInt(fractionParts[0]);
                var decimalParts = fractionParts[1].split('/');
                var decimal = parseInt(decimalParts[0]) / parseInt(decimalParts[1]);
                return integer + decimal;
            } else if (fraction.indexOf('/') !== -1) {
                var decimalParts = fraction.split('/');
                var decimal = parseInt(decimalParts[0]) / parseInt(decimalParts[1]);
                return decimal;
            } else {
                return parseInt(fraction);
            }
        }
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
            addToCartWrap = $('#price_container'),
            quantityInput = $('#quantity'),

            minWidthNumBase = $('#width').attr('placeholder').replace('min: ', ''),
            minWidthNum = minWidthNumBase.replace('cm', ''),
            maxWidthNumBase = $('.tab_container .attributes tr th:contains("Available Widths")').next().text().replace(minWidthNumBase + ' to ' , ''),
            maxWidthNum = maxWidthNumBase.replace('cm' , ''),
            
            minHeightNumBase = $('#drop').attr('placeholder').replace('min: ', ''),
            minHeightNum = minHeightNumBase.replace('cm', ''),
            maxHeightNumBase = $('.tab_container .attributes tr th:contains("Available Drops/Length")').next().text().replace(minHeightNumBase + ' to ' , ''),
            maxHeightNum = maxHeightNumBase.replace('cm' , ''),
            
            minHeightParse = parseInt(minHeightNum),
            maxHeightParse = parseInt(maxHeightNum),
            minWidthParse = parseInt(minWidthNum),
            maxWidthParse = parseInt(maxWidthNum),

            minHeightInch = Math.ceil(minHeightParse / 2.54),
            maxHeightInch = Math.floor(maxHeightParse / 2.54),
            minWidthInch = Math.ceil(minWidthParse / 2.54),
            maxWidthInch = Math.floor(maxWidthParse / 2.54),

            minHeightMM = minHeightParse * 10,
            maxHeightMM = maxHeightParse * 10,
            minWidthMM = minWidthParse * 10,
            maxWidthMM = maxWidthParse * 10;


        if (countdown.length > 0) {
            sizingChart
                .insertBefore(countdown)
                .removeClass('margin-top')
                .addClass('WO002_chart');
        } else {
            sizingChart
                .insertBefore(dispatch)
                .removeClass('margin-top')
                .addClass('WO002_chart');
        }
        var recessRow = $('.product_options.product_table #Option847').closest('tr');
        recessRow.insertBefore(sizeTableFirstRow);
        if ($('input[name*=Slat]').length > 0) {
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
            '<a href="/guides">Get more information and watch video guides ></a>',
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
        measureInputsWidth.find('input').hide().after('<input class="width_input" step="any" type="number" autocomplete="off" placeholder="min: ' + minWidthNum + '" id="width"><span class="measurement_type">cm</span>');
        //.attr('placeholder', 'min: 35').after('<span class="measurement_type">cm</span>');
        measureInputsHeight.find('.box_th').text('Drop:');
        measureInputsHeight.find('input').hide().after('<input class="height_input" step="any" type="number" autocomplete="off" placeholder="min: ' + minHeightNum + '" id="width"><span class="measurement_type">cm</span>');
        measureWrap.after([
            '<div class="radio_wrap">',
            '<span>',
            '<input type="radio" id="SizeInches" autocomplete="off" name="sizingRadios" />',
            '<label for="SizeInches">inches</label>',
            '</span>',
            '<span>',
            '<input type="radio" id="SizeCM" class="convert_class" autocomplete="off" checked="checked" name="sizingRadios" />',
            '<label for="SizeCM">cm</label>',
            '</span>',
            '<span>',
            '<input type="radio" id="SizeMM" autocomplete="off" name="sizingRadios" />',
            '<label for="SizeMM">mm</label>',
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
            radioID = '',
            tickWidth = widthInput.parent().find('.tick'),
            tickHeight = heightInput.parent().find('.tick'),
            regExp = /^(\d\/\d|\d)$/,
            recessBtn = $('#Option847'),
            exactBtn = $('#Option846'),
            positionOne = $('input[name*=Slat]').closest('.radio-holder').children('span:first-child'),
            positionTwo = $('input[name*=Slat]').closest('.radio-holder').children('span:first-child + span'),
            positionThree = $('input[name*=Slat]').closest('.radio-holder').children('span:first-child + span + span'),
            positionFour = $('input[name*=Slat]').closest('.radio-holder').children('span:first-child + span + span + span'),
            tiltLeft = $('input[name*=Tilt]').closest('.radio-holder').children('span:first-child'),
            tiltRight = $('input[name*=Tilt]').closest('.radio-holder').children('span:first-child + span'),
            bracketsLeft = $('input[name*=Brackets]').closest('.radio-holder').children('span:first-child'),
            bracketsRight = $('input[name*=Brackets]').closest('.radio-holder').children('span:first-child + span'),
            raiseLeft = $('input[name*=Raise]').closest('.radio-holder').children('span:first-child'),
            raiseRight = $('input[name*=Raise]').closest('.radio-holder').children('span:first-child + span');
      
      	widthReal.attr('step', 'any');
      	heightReal.attr('step', 'any');
        /*if ($('input[name*=Tilt]').length > 0) {
            tiltLeft.append('<span class="radio_tooltip"><a href="#">X</a>Tilt Left If you want your blinds to sit in the window recess. we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</span>');
            tiltRight.append('<span class="radio_tooltip"><a href="#">X</a>Tilt Right If you want your blinds to sit in the window recess. we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</span>');
        }
        if ($('input[name*=Raise]').length > 0) {
            raiseLeft.append('<span class="radio_tooltip"><a href="#">X</a>Raise Left If you want your blinds to sit in the window recess. we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</span>');
            raiseRight.append('<span class="radio_tooltip"><a href="#">X</a>Raise Right If you want your blinds to sit in the window recess. we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</span>');
        }
        if ($('input[name*=Brackets]').length > 0) {
            bracketsLeft.append('<span class="radio_tooltip"><a href="#">X</a>Brackets Left If you want your blinds to sit in the window recess. we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</span>');
            bracketsRight.append('<span class="radio_tooltip"><a href="#">X</a>Brackets Right If you want your blinds to sit in the window recess. we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</span>');
        }*/
        if ($('input[name*=Slat]').length > 0) {
          	if(positionOne.find('label').text() == '27mm'){
            	positionOne.append('<span class="radio_tooltip"><a href="#">X</a>Great look for smaller windows and less likely to interfere with handles</span>');
            }
          	if(positionOne.find('label').text() == '35mm'){
            	positionOne.append('<span class="radio_tooltip"><a href="#">X</a>A fantastic middle ground between the smaller and larger slat sizes.</span>');
            }
          	if(positionOne.find('label').text() == '50mm'){
            	positionOne.append('<span class="radio_tooltip"><a href="#">X</a>Our most popular option - let\'s in more light when the blinds are fully open and provides greater privacy when fully closed.</span>');
            }
          
          	if(positionTwo.find('label').text() == '27mm'){
            	positionTwo.append('<span class="radio_tooltip"><a href="#">X</a>Great look for smaller windows and less likely to interfere with handles</span>');
            }
          	if(positionTwo.find('label').text() == '35mm'){
            	positionTwo.append('<span class="radio_tooltip"><a href="#">X</a>A fantastic middle ground between the smaller and larger slat sizes.</span>');
            }
          	if(positionTwo.find('label').text() == '50mm'){
            	positionTwo.append('<span class="radio_tooltip"><a href="#">X</a>Our most popular option - let\'s in more light when the blinds are fully open and provides greater privacy when fully closed.</span>');
            }
          
          	if(positionThree.find('label').text() == '27mm'){
            	positionThree.append('<span class="radio_tooltip"><a href="#">X</a>Great look for smaller windows and less likely to interfere with handles</span>');
            }
          	if(positionThree.find('label').text() == '35mm'){
            	positionThree.append('<span class="radio_tooltip"><a href="#">X</a>A fantastic middle ground between the smaller and larger slat sizes.</span>');
            }
          	if(positionThree.find('label').text() == '50mm'){
            	positionThree.append('<span class="radio_tooltip"><a href="#">X</a>Our most popular option - let\'s in more light when the blinds are fully open and provides greater privacy when fully closed.</span>');
            }
          	//if(slatSevenBtn.find('label').text() == '50mm'){
            //	slatSevenBtn.append('<span class="radio_tooltip"><a href="#">X</a>Our most popular option - let\'s in more light when the blinds are fully open and provides greater privacy when fully closed.</span>');
            //}
            //slatSixBtn.append('<span class="radio_tooltip"><a href="#">X</a>64 If you want your blinds to sit in the window recess. we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</span>');
        }
        recessBtn.after('<span class="radio_tooltip"><a href="#">X</a>When recess is selected we will deduct 1.5cm from your width measurement to ensure it fits neatly inside your recess</span>');
        exactBtn.after('<span class="radio_tooltip"><a href="#">X</a>When exact is selected we will produce your blind to the exact width you specify</span>');
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
        $('.radio_wrap input').change(function () {
            var el = $(this),
                radioID = el.attr('id'),
                originalValueWidth = $('.width_input').val(),
                convertFrom = $('.convert_class').attr('id'),
                originalValueHeight = $('.height_input').val(),
                toolTip = el.parent().find('.radio_tooltip');
            if (slideQ == false) {
                slideQ = true;
                toolTip = $(this).parent().find('.radio_tooltip');
                toolTip.fadeIn('slow', function () {
                    toolTip.delay(3000).fadeOut('slow', function () {
                        slideQ = false;
                    });
                });
            }
          	
			tickWidth.removeClass('tickbig tickback');
            tickHeight.removeClass('tickbig tickback');
			disabledInput.addClass('disabled').find('input').prop("disabled", true);
			widthFraction.find('option:first-child').attr('selected','selected');
            heightFraction.find('option:first-child').attr('selected','selected');
			if (convertFrom == 'SizeInches') {
                if (radioID == 'SizeCM') {
                    measureType.text('cm');
                    widthInput.attr('placeholder', 'min: ' + minWidthNum);
                    heightInput.attr('placeholder', 'min: ' + minHeightNum);
                    widthFraction.hide();
                    heightFraction.hide();
  					if (errorWidth.is(':visible')) {
                        errorWidth.text('limits: ' + minHeightNum + 'cm - ' + maxHeightNum + 'cm').hide();
                    }
                    if (errorHeight.is(':visible')) {
                        errorWidth.text('limits: ' + minWidthNum + 'cm - ' + maxWidthNum + 'cm').hide();
                    }
                }
                if (radioID == 'SizeMM') {
                    measureType.text('mm');
                    widthInput.attr('placeholder', 'min: ' + minWidthMM);
                    heightInput.attr('placeholder', 'min: ' + minHeightMM);
                    widthFraction.hide();
                    heightFraction.hide();
					if (errorWidth.is(':visible')) {
                        errorWidth.text('limits: ' + minHeightMM + 'mm - ' + maxHeightMM + 'mm').hide();
                    }
                    if (errorHeight.is(':visible')) {
                        errorWidth.text('limits: ' + minWidthMM + 'mm - ' + maxWidthMM + 'mm').hide();
                    }
                }
            }
            if (convertFrom == 'SizeCM') {
                if (radioID == 'SizeInches') {
                    measureType.text('inches');
                    widthInput.attr('placeholder', 'min: ' + minWidthInch);
                    heightInput.attr('placeholder', 'min: ' + minHeightInch);
                    widthFraction.show();
                    heightFraction.show();
                    if (errorWidth.is(':visible')) {
                        errorWidth.text('limits: ' + minHeightInch + '" - ' + maxHeightInch + '"').hide();
                    }
                    if (errorHeight.is(':visible')) {
                        errorWidth.text('limits: ' + minWidthInch + '" - ' + maxWidthInch + '"').hide();
                    }
                }
                if (radioID == 'SizeMM') {
                    measureType.text('mm');
                    widthInput.attr('placeholder', 'min: ' + minWidthMM);
                    heightInput.attr('placeholder', 'min: ' + minHeightMM);
                    if (errorWidth.is(':visible')) {
                        errorWidth.text('limits: ' + minHeightMM + 'mm - ' + maxHeightMM + 'mm').hide();
                    }
                    if (errorHeight.is(':visible')) {
                        errorWidth.text('limits: ' + minWidthMM + 'mm - ' + maxWidthMM + 'mm').hide();
                    }
                }
            }
            if (convertFrom == 'SizeMM') {
                if (radioID == 'SizeInches') {
                    measureType.text('inches');
                    widthInput.attr('placeholder', 'min: ' + minWidthInch);
                    heightInput.attr('placeholder', 'min: ' + minHeightInch);
                    widthFraction.show();
                    heightFraction.show();
                    if (errorWidth.is(':visible')) {
                        errorWidth.text('limits: ' + minHeightInch + '" - ' + maxHeightInch + '"').hide();
                    }
                    if (errorHeight.is(':visible')) {
                        errorWidth.text('limits: ' + minWidthInch + '" - ' + maxWidthInch + '"').hide();
                    }
                }
                if (radioID == 'SizeCM') {
                    measureType.text('cm');
                    widthInput.attr('placeholder', 'min: ' + minWidthNum);
                    heightInput.attr('placeholder', 'min: ' + minHeightNum);
                    if (errorWidth.is(':visible')) {
                        errorWidth.text('limits: ' + minHeightNum + 'cm - ' + maxHeightNum + 'cm').hide();
                    }
                    if (errorHeight.is(':visible')) {
                        errorWidth.text('limits: ' + minWidthNum + 'cm - ' + maxWidthNum + 'cm').hide();
                    }
                }
            }
            $('.convert_class').removeClass('convert_class');
            el.addClass('convert_class');
            convertFrom = $('.convert_class').attr('id');
			$('#price').hide();
         
          	var heightReEval = heightInput.val(),
            widthReEval = widthInput.val();
          
          	if (convertFrom == 'SizeMM') {
                heightReal.val(heightReEval / 10);
                widthReal.val(widthReEval / 10);
            }
            if (convertFrom == 'SizeInches') {
                heightReal.val(heightReEval * 2.54);
                widthReal.val(widthReEval * 2.54);
            }
            if (convertFrom == 'SizeCM') {
                heightReal.val(heightReEval);
                widthReal.val(widthReEval);
            }
          
          	var heightParse = parseFloat(heightInput.val()),
                heightRealParse = parseFloat(heightReal.val()),
                widthParse = parseFloat(widthInput.val()),
                widthRealParse = parseFloat(widthReal.val());
          	
            if (widthRealParse >= minWidthParse && widthRealParse <= maxWidthParse) {
                errorWidth.hide();
                tickWidth.addClass('tickbig tickback');
                if (heightReal.val()) {
                    if ($('#errmsg_drop').is(':visible')) {
                    } 
                    else if(quantityInput.val() == '0' || quantityInput.val() == ''){
                        
                    }
                    else {
                        disabledInput.removeClass('disabled').find('input').prop("disabled", false);
                        submit_form();
						$('#price').show();
                    }
                }
                if (widthReal.val()) {} else {
                    disabledInput.addClass('disabled').find('input').prop("disabled", true);
                    tickHeight.removeClass('tickbig tickback');
                }
            }
          	else {
                if (radioID == 'SizeInches') {
                    errorWidth.text('limits: ' + minWidthInch + '" - ' + maxWidthInch + '"').show();
                } else if (radioID == 'SizeMM') {
                    errorWidth.text('limits: ' + minWidthMM + 'mm - ' + maxWidthMM + 'mm').show();
                } else {
                    errorWidth.text('limits: ' + minWidthParse + 'cm - ' + maxWidthParse + 'cm').show();
                }
                disabledInput.addClass('disabled').find('input').prop("disabled", true);
                tickWidth.removeClass('tickbig tickback');
            }
          
          
          	if (heightRealParse >= minHeightParse && heightRealParse <= maxHeightParse) {
                errorHeight.hide();
                tickHeight.addClass('tickbig tickback');
                if (widthReal.val()) {
                    if ($('#errmsg_width').is(':visible')) {
                    } 
                    else if(quantityInput.val() == '0' || quantityInput.val() == ''){
                        
                    }
                    else {
                        disabledInput.removeClass('disabled').find('input').prop("disabled", false);
                        
                        submit_form();
						$('#price').show();
                    }
                }
                if (heightReal.val()) {} else {
                    disabledInput.addClass('disabled').find('input').prop("disabled", true);
                    tickHeight.removeClass('tickbig tickback');
                }
            }
          	else {
                if (radioID == 'SizeInches') {
                    errorHeight.text('limits: ' + minHeightInch + '" - ' + maxHeightInch + '"').show();
                } else if (radioID == 'SizeMM') {
                    errorHeight.text('limits: ' + minHeightMM + 'mm - ' + maxHeightMM + 'mm').show();
                } else {
                    errorHeight.text('limits: ' + minHeightParse + 'cm - ' + maxHeightParse + 'cm').show();
                }
                disabledInput.addClass('disabled').find('input').prop("disabled", true);
                tickHeight.removeClass('tickbig tickback');
            }
        });
        widthInput.keyup(function () {
            var el = $(this),
                thisValue = el.val();
            convertFrom = $('.convert_class').attr('id');
            if (convertFrom == 'SizeMM') {
                widthReal.val(thisValue / 10);
            }
            if (convertFrom == 'SizeInches') {
                widthReal.val(thisValue * 2.54);
            }
            if (convertFrom == 'SizeCM') {
                widthReal.val(thisValue);
            }
        });
        heightInput.keyup(function () {
            var el = $(this),
                thisValue = el.val();
            convertFrom = $('.convert_class').attr('id');
            if (convertFrom == 'SizeMM') {
                heightReal.val(thisValue / 10);
            }
            if (convertFrom == 'SizeInches') {
                heightReal.val(thisValue * 2.54);
            }
            if (convertFrom == 'SizeCM') {
                heightReal.val(thisValue);
            }
        });

        quantityInput.blur(function () {
            var el = $(this),
                heightParse = parseFloat(heightInput.val()),
                heightRealParse = parseFloat(heightReal.val()),
                unitCheck = $('.convert_class').attr('id'),
                decCheck = countDecimals(heightParse);
          
          	if(decCheck >= 2){
              	errorHeight.text('Only one decimal place is allowed').show();
                disabledInput.addClass('disabled').find('input').prop("disabled", true);
                tickHeight.removeClass('tickbig tickback');
            }
            else if (heightRealParse >= 30 && heightRealParse <= 300) {
                errorHeight.hide();
                tickHeight.addClass('tickbig tickback');
                if (widthReal.val()) {
                    if ($('#errmsg_width').is(':visible')) {
                    } 
                    else if(quantityInput.val() == '0' || quantityInput.val() == ''){
                        
                    }
                    else {
                        disabledInput.removeClass('disabled').find('input').prop("disabled", false);
                        submit_form();
						$('#price').show();
                    }
                }
                if (heightReal.val()) {} else {
                    disabledInput.addClass('disabled').find('input').prop("disabled", true);
                    tickHeight.removeClass('tickbig tickback');
                }
            }
          	else {
                if (unitCheck == 'SizeInches') {
                    errorHeight.text('limits: ' + minHeightInch + '" - ' + maxHeightInch + '"').show();
                } else if (unitCheck == 'SizeMM') {
                    errorHeight.text('limits: ' + minHeightMM + 'mm - ' + maxHeightMM + 'mm').show();
                } else {
                    errorHeight.text('limits: ' + minHeightParse + 'cm - ' + maxHeightParse + 'cm').show();
                }
                disabledInput.addClass('disabled').find('input').prop("disabled", true);
                tickHeight.removeClass('tickbig tickback');
            }
        });

        quantityInput.keyup(function () {
             var el = $(this),
                heightParse = parseFloat(heightInput.val()),
                heightRealParse = parseFloat(heightReal.val()),
                unitCheck = $('.convert_class').attr('id'),
                decCheck = countDecimals(heightParse);
          
          	if(decCheck >= 2){
              	errorHeight.text('Only one decimal place is allowed').show();
                disabledInput.addClass('disabled').find('input').prop("disabled", true);
                tickHeight.removeClass('tickbig tickback');
            }
            else if (heightRealParse >= 30 && heightRealParse <= 300) {
                errorHeight.hide();
                tickHeight.addClass('tickbig tickback');
                if (widthReal.val()) {
                    if ($('#errmsg_width').is(':visible')) {
                    } 
                    else if(quantityInput.val() == '0' || quantityInput.val() == ''){
                        
                    }
                    else {
                        disabledInput.removeClass('disabled').find('input').prop("disabled", false);
                        submit_form();
						$('#price').show();
                    }
                }
                if (heightReal.val()) {} else {
                    disabledInput.addClass('disabled').find('input').prop("disabled", true);
                    tickHeight.removeClass('tickbig tickback');
                }
            }
          	else {
                if (unitCheck == 'SizeInches') {
                    errorHeight.text('limits: ' + minHeightInch + '" - ' + maxHeightInch + '"').show();
                } else if (unitCheck == 'SizeMM') {
                    errorHeight.text('limits: ' + minHeightMM + 'mm - ' + maxHeightMM + 'mm').show();
                } else {
                    errorHeight.text('limits: ' + minHeightParse + 'cm - ' + maxHeightParse + 'cm').show();
                }
                disabledInput.addClass('disabled').find('input').prop("disabled", true);
                tickHeight.removeClass('tickbig tickback');
            }
        });

        heightInput.keyup(function () {
            var el = $(this),
                heightParse = parseFloat(heightInput.val()),
                heightRealParse = parseFloat(heightReal.val()),
                unitCheck = $('.convert_class').attr('id'),
                decCheck = countDecimals(heightParse);
          
          	if(decCheck >= 2){
              	errorHeight.text('Only one decimal place is allowed').show();
                disabledInput.addClass('disabled').find('input').prop("disabled", true);
                tickHeight.removeClass('tickbig tickback');
            }
            else if (heightRealParse >= minHeightParse && heightRealParse <= maxHeightParse) {
                errorHeight.hide();
                tickHeight.addClass('tickbig tickback');
                if (widthReal.val()) {
                    if ($('#errmsg_width').is(':visible')) {
                    } 
                    else if(quantityInput.val() == '0' || quantityInput.val() == ''){
                        
                    }
                    else {
                        disabledInput.removeClass('disabled').find('input').prop("disabled", false);
                        submit_form();
						$('#price').show();
                    }
                }
                if (heightReal.val()) {} else {
                    disabledInput.addClass('disabled').find('input').prop("disabled", true);
                    tickHeight.removeClass('tickbig tickback');
                }
            }
          	else {
                if (unitCheck == 'SizeInches') {
                    errorHeight.text('limits: ' + minHeightInch + '" - ' + maxHeightInch + '"').show();
                } else if (unitCheck == 'SizeMM') {
                    errorHeight.text('limits: ' + minHeightMM + 'mm - ' + maxHeightMM + 'mm').show();
                } else {
                    errorHeight.text('limits: ' + minHeightParse + 'cm - ' + maxHeightParse + 'cm').show();
                }
                disabledInput.addClass('disabled').find('input').prop("disabled", true);
                tickHeight.removeClass('tickbig tickback');
            }
        });

        widthInput.keyup(function () {
            var el = $(this),
                widthParse = parseFloat(widthInput.val()),
                widthRealParse = parseFloat(widthReal.val()),
                unitCheck = $('.convert_class').attr('id'),
                decCheck = countDecimals(widthParse);
    
          
          	if(decCheck >= 2){
              	errorWidth.text('Only one decimal place is allowed').show();
                disabledInput.addClass('disabled').find('input').prop("disabled", true);
                tickWidth.removeClass('tickbig tickback');
            }
            else if (widthRealParse >= minWidthParse && widthRealParse <= maxWidthParse) {
                errorWidth.hide();
                tickWidth.addClass('tickbig tickback');
                if (heightReal.val()) {
                    if ($('#errmsg_drop').is(':visible')) {
                    } 
                    else if(quantityInput.val() == '0' || quantityInput.val() == ''){
                        
                    }
                    else {
                        disabledInput.removeClass('disabled').find('input').prop("disabled", false);
                        submit_form();
						$('#price').show();
                    }
                }
                if (widthReal.val()) {} else {
                    disabledInput.addClass('disabled').find('input').prop("disabled", true);
                    tickHeight.removeClass('tickbig tickback');
                }
            }
          	else {
                if (unitCheck == 'SizeInches') {
                    errorWidth.text('limits: ' + minWidthInch + '" - ' + maxWidthInch + '"').show();
                } else if (unitCheck == 'SizeMM') {
                    errorWidth.text('limits: ' + minWidthMM + 'mm - ' + maxWidthMM + 'mm').show();
                } else {
                    errorWidth.text('limits: ' + minWidthParse + 'cm - ' + maxWidthParse + 'cm').show();
                }
                disabledInput.addClass('disabled').find('input').prop("disabled", true);
                tickWidth.removeClass('tickbig tickback');
            }
        });
        heightFraction.on('change', function () {
            var heightString = heightFraction.find('option:selected').text(),
                unitCheck = $('.convert_class').attr('id');
            if (regExp.test(heightString) == true) {
                var evalFraction = fractionToDecimal(heightString),
                    currentHeight = parseFloat(heightInput.val());
                if (isNaN(currentHeight)) {
                    currentHeight = 0;
                }
                totalWidth = (evalFraction + currentHeight) * 2.54;
                heightReal.val(totalWidth.toFixed(1));
                var parseHeight = parseFloat(heightReal.val());
                if (parseHeight < minHeightParse) {
                    if (unitCheck == 'SizeInches') {
                        errorHeight.text('limits: ' + minHeightInch + '" - ' + maxHeightInch + '"').show();
                    } else if (unitCheck == 'SizeMM') {
                        errorHeight.text('limits: ' + minHeightMM + 'mm - ' + maxHeightMM + 'mm').show();
                    } else {
                        errorHeight.text('limits: ' + minHeightParse + 'cm - ' + maxHeightParse + 'cm').show();
                    }
                    disabledInput.addClass('disabled').find('input').prop("disabled", true);
                    tickHeight.removeClass('tickbig tickback');
                } else if (parseHeight > maxHeightParse) {
                    if (unitCheck == 'SizeInches') {
                        errorHeight.text('limits: ' + minHeightInch + '" - ' + maxHeightInch + '"').show();
                    } else if (unitCheck == 'SizeMM') {
                        errorHeight.text('limits: ' + minHeightMM + 'mm - ' + maxHeightMM + 'mm').show();
                    } else {
                        errorHeight.text('limits: ' + minHeightParse + 'cm - ' + maxHeightParse + 'cm').show();
                    }
                    disabledInput.addClass('disabled').find('input').prop("disabled", true);
                    tickHeight.removeClass('tickbig tickback');
                } else {
                    errorHeight.hide();
                    tickHeight.addClass('tickbig tickback');
                    if (widthReal.val()) {
                        if ($('#errmsg_drop').is(':visible')) {
                        } 
                        else if(quantityInput.val() == '0' || quantityInput.val() == ''){
                        
                    }
                        else {
                            disabledInput.removeClass('disabled').find('input').prop("disabled", false);
                            $('#price').show();
                            submit_form();
                        }
                    }
                }
            }
        });
        widthFraction.on('change', function () {
            var widthString = widthFraction.find('option:selected').text(),
                unitCheck = $('.convert_class').attr('id');
            if (regExp.test(widthString) == true) {
                var evalFraction = fractionToDecimal(widthString),
                    currentWidth = parseFloat(widthInput.val());
                if (isNaN(currentWidth)) {
                    currentWidth = 0;
                }
                totalWidth = (evalFraction + currentWidth) * 2.54;
                widthReal.val(totalWidth.toFixed(1));
                var parseWidth = parseFloat(widthReal.val());
                if (parseWidth < minWidthParse) {
                    if (unitCheck == 'SizeInches') {
                        errorWidth.text('limits: ' + minWidthInch + '" - ' + maxWidthInch + '"').show();
                    } else if (unitCheck == 'SizeMM') {
                        errorWidth.text('limits: ' + minWidthMM + 'mm - ' + maxWidthMM + 'mm').show();
                    } else {
                        errorWidth.text('limits: ' + minWidthParse + 'cm - ' + maxWidthParse + 'cm').show();
                    }
                    disabledInput.addClass('disabled').find('input').prop("disabled", true);
                    tickWidth.removeClass('tickbig tickback');
                } else if (parseWidth > maxWidthParse) {
                    if (unitCheck == 'SizeInches') {
                        errorWidth.text('limits: ' + minWidthInch + '" - ' + maxWidthInch + '"').show();
                    } else if (unitCheck == 'SizeMM') {
                        errorWidth.text('limits: ' + minWidthMM + 'mm - ' + maxWidthMM + 'mm').show();
                    } else {
                        errorWidth.text('limits: ' + minWidthParse + 'cm - ' + maxWidthParse + 'cm').show();
                    }
                    disabledInput.addClass('disabled').find('input').prop("disabled", true);
                    tickWidth.removeClass('tickbig tickback');
                } else {
                    errorWidth.hide();
                    tickWidth.addClass('tickbig tickback');
                    if (heightReal.val()) {
                        if ($('#errmsg_drop').is(':visible')) {
                        } 
                        else if(quantityInput.val() == '0' || quantityInput.val() == ''){
                            
                        }
                        else {
                            disabledInput.removeClass('disabled').find('input').prop("disabled", false);
                            submit_form();
							$('#price').show();
                        }
                    }
                }
            }
        });
        $('.image_trigger').on('click', function (e) {
            e.preventDefault();
            $('.free_sample input').trigger('click');
        });
        if (slideQ == false) {
            $('.measure_guide, .measuring_guide_modal .close_btn').on('click', function (e) {
                slideQ = true;
                e.preventDefault();
                if (modal.hasClass('active')) {
                    $('body').removeClass('overflow_off');
                  	sendEvent('WO002', 'Measuring Guide Closed', '', true);
                    modal.fadeOut('slow', function () {
                        modal.removeClass('active');
                        slideQ = false;
                    });
                } else {
                    $('body').addClass('overflow_off');
                  	sendEvent('WO002', 'Measuring Guide Opened', '', true);
                    modal.fadeIn('slow', function () {
                        modal.addClass('active');
                        slideQ = false;
                    });
                }
            });
        }
      var windowSize = false;
      
      
      if ($(".container").css("width") < "900px" ){
        	windowSize = true;
      }
      
      $('.radio-holder input').on('change', function () {
        if (windowSize === true){
          toolTip = $(this).parent().find('.radio_tooltip'),
            activeTip = $('.active_tooltip'),
            allTips = $('.radio_tooltip');
          allTips.dequeue().fadeOut('slow');
          toolTip.addClass('active_tooltip');
          toolTip.fadeIn('slow', function () {
            toolTip.delay(3000).fadeOut('slow');
          });
        }
        if ($('#errmsg_drop').is(':visible') || $('#errmsg_width').is(':visible')) {}
            else if(!widthInput.val() || !heightInput.val()){}
            else if(quantityInput.val() == '0' || quantityInput.val() == ''){
                
            }
            else {
              disabledInput.removeClass('disabled').find('input').prop("disabled", false);
              submit_form();
              $('#price').show();
            }
      });
      
      $('#size_form select').on('change', function () {
        if ($('#errmsg_drop').is(':visible') || $('#errmsg_width').is(':visible')) {}
            else if(!widthInput.val() || !heightInput.val()){}
            else if(quantityInput.val() == '0' || quantityInput.val() == ''){
                
            }
            else {
              disabledInput.removeClass('disabled').find('input').prop("disabled", false);
              submit_form();
              $('#price').show();
            }
      });
      
      $('.radio_tooltip a').on('click', function(e){
        e.preventDefault();
        $(this).parent().dequeue().fadeOut('slow');
      });
      
      if ($(".container").width() < 900 ){
          windowSize = true;
        }
        else{
          windowSize = false;
        }
        
      $(window).resize(function() {
        if ($(".container").width() < 900 ){
          windowSize = true;
        }
        else{
          windowSize = false;
        }
    });
    }
})();
