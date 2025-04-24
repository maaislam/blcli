var MP041 = (function() {
    var $ = window.jQuery,
        UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    UC.poller([
        function() {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
        }
    ], function () {
        window.FS.setUserVars({
            experiment_str: 'MP041',
            variation_str: 'Variation 1'
        });
    }, { multiplier: 1.2, timeout: 0 });

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

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    $('body').addClass('MP041');

    var filtersOuterWrap = $('.plp-block .facetplpelement'),
        filterCategory = $('.plp-block .facetplpelement .facet'),
        preMainBlock = $('.breadcum-plp + .plp-block.row'),
        slideQ = false;

    preMainBlock.before([
        '<section class="MP_filter_wrap">',
            '<div class="MP_filter_btn-wrap">',
                '<a href="#" class="MP_filter_btn">Filter By</a>',
            '</div>',
            '<div class="MP_filters_dd clearfix">',
                '<div class="MP_btn_inner">',
                '</div>',
                '<div class="MP_check_filter-wrap">',
                '</div>',
                '<div class="MP_apply_filters clearfix">',
                    '<span class="MP_amount_filters">',
                        '<span>0</span> filters applied:',
                    '</span>',
                    '<div class="MP_current_filters" style="width: calc(100% - 520px);"><div></div></div>',
                    '<a href="#" class="MP_clear">Clear all</a>',
                    '<a href="#" class="MP_apply">Apply filters</a>',
                '</div>',
            '</div>',
        '</section>',
    ].join(''));

     

    var filterBtnWrap = $('.MP_btn_inner'),
        checkOuter = $('.MP_check_filter-wrap'),
        currentFilter = $('.MP_current_filters'),
        counter = 1;
    
    $('.grid li .bx-wrapper li').css('width', $('.productMainLink').width());
    $('.facetValueCount').remove();

    var checkedAmount = $('form input.inputCheck:checked').length;

    $('.MP_amount_filters span').text(checkedAmount);

    filterCategory.each(function (){
        var el = $(this),
            titleText = el.find('h4 a').text(),
            titleTrimmed = titleText.replace('By ', '');

        filterBtnWrap.append('<a href="#">' + titleTrimmed + '</a>');
        
        checkOuter.append('<div class="MP_check_inner"></div>');

        el.find('ul.facet_block li.ip-check-box').each(function(){
            var el2 = $(this),
                trimString = $.trim(el2.find('.facet_block-label').text()),
                elIndex = el.index() - 1,
                inputVal = el2.find('form input[name=q]').val(),
                inputcheck = el2.find('form input.inputCheck');

            if(trimString == ''){

            }
            else{
                inputTrim = inputVal.replace(':topRated', '');

                if(checkedAmount > 0){
                    if(inputcheck.prop('checked')){
                        var urlQuery = getParameterByName('q', window.location),
                            tickedOptionQValue = inputTrim,
                            answerPre = urlQuery.replace(tickedOptionQValue, ''),
                            answer = answerPre.replace(':topRated', '');

                        $('.MP_check_inner').eq(elIndex).append([
                            '<div class="MP_input_chk checked counter_' + counter + '">',
                                '<label>' + trimString + '</label>',
                                '<input checked="checked" value="' + answer + '" type="checkbox" />',
                                '<span></span>',
                            '</div>',
                        ].join(''));
                        currentFilter.find('div').append('<span><a href="#" class="counter_' + counter + '"></a>' + trimString + '</span>');

                        counter++;
                    }
                    else{
                        var match = inputTrim.match(/:[^:]+:[^:]+$/);

                        $('.MP_check_inner').eq(elIndex).append([
                            '<div class="MP_input_chk counter_' + counter + '">',
                                '<label>' + trimString + '</label>',
                                '<input value="' + match[0] + '" type="checkbox" />',
                                '<span></span>',
                            '</div>',
                        ].join(''));
                        counter++;
                    }
                }
                else{
                    if(inputcheck.prop('checked')){
                        $('.MP_check_inner').eq(elIndex).append([
                            '<div class="MP_input_chk checked counter_' + counter + '">',
                                '<label>' + trimString + '</label>',
                                '<input checked="checked" value="' + answer + '" type="checkbox" />',
                                '<span></span>',
                            '</div>',
                        ].join(''));
                        currentFilter.find('div').append('<span><a href="#" class="counter_' + counter + '"></a>' + trimString + '</span>');
                        counter++;
                    }
                    else{
                        $('.MP_check_inner').eq(elIndex).append([
                            '<div class="MP_input_chk counter_' + counter + '">',
                                '<label>' + trimString + '</label>',
                                '<input value="' + inputTrim + '" type="checkbox" />',
                                '<span></span>',
                            '</div>',
                        ].join(''));
                        counter++;
                    }
                }
            }
        });
    });

    var filterTgl = $('.MP_filter_btn'),
        checkWrap = $('.MP_check_inner'),
        filter_dd = $('.MP_filters_dd'),
        applyFilter = $('.MP_apply');

    $('.MP_input_chk').each(function() {
        var el = $(this),
            label = $(this),
            input = el.find('input');

        input.on('change', function() {
            var chk = $(this);
            if (chk.is(':checked')) {
            if (chk.attr('type') == "radio") {
                var radioOther = $('input[name="' + chk.attr('name') + '"]');
                radioOther.closest('.MP_input_chk').removeClass('checked');
            }
            el.addClass('checked');
            } else {
            el.removeClass('checked');
            }

        }).change();
    });

    $('.MP_input_chk').click(function() {
        this.blur();
        this.focus();
        var el = $(this),
            input = el.find('input'),
            thisText = el.closest('.MP_input_chk').find('label').text(),
            thisParent = el.closest('.MP_input_chk');
        
        var checkedCounter = $(this).attr("class").match(/counter[\w-]*\b/);

        
        if (input.is('[type=radio]')) {
            var radioOther = $('input[name="' + input.attr('name') + '"]').not(input);
            radioOther.prop('checked', false);
            input.prop('checked', true);
        } else {
            input.prop('checked', el.is('.checked') ? false : true);
        }
        input.change();

        thisParent = el.closest('.MP_input_chk');

        if(applyFilter.hasClass('MP_active')){
            if(thisParent.hasClass('checked')){
                applyFilter.addClass('MP_active');
                currentFilter.find('div').append('<span><a href="#" class="' + checkedCounter + '"></a>' + thisText + '</span>');
                $('.MP_amount_filters span').text(parseInt($('.MP_amount_filters span').text()) + 1);
            }
            else{
                applyFilter.removeClass('MP_active');
                //$('.checked.' + checkedCounter).removeClass('checked');
                $('a.' + checkedCounter).closest('span').remove();
                $('.MP_amount_filters span').text(parseInt($('.MP_amount_filters span').text()) - 1);
            }
        }
        else{
            applyFilter.addClass('MP_active');
            currentFilter.find('div').append('<span><a href="#" class="' + checkedCounter + '"></a>' + thisText + '</span>');
            $('.MP_amount_filters span').text(parseInt($('.MP_amount_filters span').text()) + 1);
        } 

        
    });

    $('.MP_clear').click(function(e) {
        e.preventDefault();
        $('.MP_input_chk.checked').removeClass('checked');
        applyFilter.removeClass('MP_active');
    });

    $('.MP_apply').click(function(e) {
        e.preventDefault();
        if($(this).hasClass('MP_active')){
            var searchString = '?q=%3AtopRated';

            $('.MP_input_chk.checked').each(function(){
                encodedString = encodeURIComponent($(this).find('input').val());
                searchString = searchString + encodedString;
            });
            window.location.search = searchString;
        }
        else{
            window.location.search = '';
        }
    });

    filterTgl.on('click', function(e){
        e.preventDefault();
        var el = $(this);

        console.log(el);
        if(slideQ === false){
            slideQ = true;
            if(el.hasClass('MP_active')){
                el.removeClass('MP_active');
                filter_dd.slideUp('slow', function(){
                    slideQ = false;
                });
            }
            else{
                el.addClass('MP_active');
                filter_dd.slideDown('slow', function(){
                    slideQ = false;
                });
                sendEvent('MP041---PLP Filter', 'Filter by button clicked', 'Filters opened', true);
            }
        }
    });


    var filterBtn = $('.MP_btn_inner a');

    filterBtn.on('click', function(e){
        e.preventDefault();

        var el = $(this),
            elIndex = el.index();

        if(slideQ === false){
            slideQ = true;

            if(el.hasClass('MP_active')){
                el.removeClass('MP_active');
                checkWrap.eq(elIndex).slideUp('slow', function(){
                    slideQ = false;
                });
            }
            else{
                if(filterBtn.hasClass('MP_active')){
                    filterBtn.removeClass('MP_active');
                    checkWrap.slideUp();
                }
                el.addClass('MP_active');
                checkWrap.eq(elIndex).slideDown('slow', function(){
                    slideQ = false;
                });
            }
        }
    });

    $('.MP_current_filters div').on('click', 'a', function(e){
        e.preventDefault();
        var checkedCounter = $(this).attr("class").match(/counter[\w-]*\b/);
        $('.checked.' + checkedCounter).removeClass('checked').find('input').prop('checked', false);
        $(this).closest('span').remove();
        $('.MP_amount_filters span').text($('.MP_amount_filters span').text() - 1);
    });
    $('.MP_check_filter-wrap').css('width', 'calc(100% - 420px)');
})();