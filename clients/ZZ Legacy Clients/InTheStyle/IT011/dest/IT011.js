var _IT011 = (function () {

    // PLUGINS ------------------------------------

    // UC Library - Poller -- @version 0.2.2
    // ---------------------------------------------
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    // UC Library - Observer
    // ---------------------------------------------
    UC.observer={active:[],connect:function(t,e,n){var i={throttle:1e3,config:{attributes:!0,childList:!0,subTree:!1}};if(n)for(var o in n)i[o]=n[o];else n=i;for(var r,c=new MutationObserver(function(n){n.forEach(function(n){r||(r=!0,e(t,n),setTimeout(function(){r=!1},i.throttle))})}),f=0;f<t.length;f++)c.observe(t[f],i.config),this.active.push([t[f],c])},disconnect:function(t){for(var e=this.active,n=0;n<t.length;n++)for(var i=t[n],o=0;o<e.length;o++)i===e[o][0]&&e[o][1].disconnect()}};

    // Send GA Events With Tracker Name -----------
    // ---------------------------------------------
    function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}var trackerName;

    // Full Story Tagging --------------------------
    // ---------------------------------------------
    UC.poller([
        function () {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
        }
    ], function () {
        window.FS.setUserVars({
            experiment_str: 'IT011',
            variation_str: 'Variation 1 Mobile'
        });
    }, {multiplier: 1.2, timeout: 0});

    // Triggers ------------------------------------
    // ---------------------------------------------
    var _triggers = (function () {
        UC.poller([
            function () {
                return window.jQuery
            },
            function () {
                return window.ga
            }
        ], activate);
    })();

    // ---------------------------------------------
    function activate() {
        var $ = window.jQuery;
        var $body = $('body');
        $body.addClass('IT011');

        // Check to see if pages contains filters
        if (!$('#narrow-by-list').length) {
            return;
        }

        // ---------------------------------------------------------------------------------------------------------
        // eq(2) --> colours category /// eq(3) --> sizes category
        var $allAttributesToFilter = $('#narrow-by-list > dd:eq(2) ol li, #narrow-by-list > dd:eq(3) ol li, #narrow-by-list > dd:eq(4) ol li'); // Amend (4)

        // Add filters to the uncollapsed sidebar to give a clearer view of a user's desired viewed products
        var $currently = $('.col-left.sidebar .block-content .currently');
        if ($currently.length) {
            $currently.insertAfter('.block-title.block-title-buttons > strong');
            $currently.empty();
            // On page load get the checked inputs and display them more compactly in the 'filter by' header
            var $getCheckedInputs = $allAttributesToFilter.find('input[type="checkbox"]').filter(function () {
                return this.checked === true;
            });

            $getCheckedInputs.each(function (i) {
                var $this = $(this);
                if (this.id.indexOf('colour') > -1) {
                    if (i === 0) {
                        $('<p class="IT011_colour_display">Colour(s): </p>').appendTo($currently);
                    }
                    var $currentColour = $this.next().children('span').text().toLowerCase();
                        $('.IT011_colour_display').append($currentColour + ", ");
                } else if (this.id.indexOf('shoe_size') > -1) {
                    if (!$('.IT011_shoe_size_display').length) {
                        $('<p class="IT011_shoe_size_display">Shoe size(s): </p>').appendTo($currently);
                    }
                    var $currentShoeSize = $this.next().children('span').text().toLowerCase();
                    $('.IT011_shoe_size_display').append($currentShoeSize + ", ");
                } else if (this.id.indexOf('size') > -1) {
                    if (!$('.IT011_size_display').length) {
                        $('<p class="IT011_size_display">Size(s): </p>').appendTo($currently);
                    }
                    var $currentSize = $this.next().children('span').text().toLowerCase();
                    $('.IT011_size_display').append($currentSize + ", ");
                }
            });
            if ($('.IT011_colour_display').length) {
                $('.IT011_colour_display').text($('.IT011_colour_display').text().slice(0, -2));
            }
            if ($('.IT011_size_display').length) {
                $('.IT011_size_display').text($('.IT011_size_display').text().slice(0, -2));
            }
            if ($('.IT011_shoe_size_display').length) {
                $('.IT011_shoe_size_display').text($('.IT011_shoe_size_display').text().slice(0, -2));
            }
        }
        // -----------
        // When the relevant filter categories are clicked anchor them up to improve visibility
        $('#narrow-by-list dt:eq(2)').on('click', function() {
            $('.block-content:eq(0)').animate({ scrollTop: 100 }, 400);
        });
        $('#narrow-by-list dt:eq(3)').on('click', function() {
            $('#narrow-by-list dt:eq(2)').removeClass('open').addClass('closed');
            $('.block-content:eq(0)').animate({ scrollTop: 140 }, 400);
        });
        $('#narrow-by-list dt:eq(4)').on('click', function() {
            $('#narrow-by-list dt:eq(2)').removeClass('open').addClass('closed');
            $('#narrow-by-list dt:eq(3)').removeClass('open').addClass('closed');
            $('.block-content:eq(0)').animate({ scrollTop: 180 }, 400);
        });

        // Append button to the collapsed sidebar that applies the checked filters
        var $applyFiltersFunc = $([
            '<div class="IT011_applyFiltersWrapper">',
            '<a type="button" class="IT011_applyFiltersButton"><button>APPLY FILTERS</button></a>',
            '</div>'
        ].join(''));

        $applyFiltersFunc.hide().appendTo('.block-collapsable');

        // Display filteres chosen when sidebar not collapsed and hide it otherwise
        var $collapsableBlock = $('.sidebar .block-collapsable');
        $collapsableBlock.on('click', function () {
            if ($(this).hasClass('block-expanded')) {
                $(this).find('.currently').hide();
                $(this).find('.currently + a').hide();
                $('.IT011_applyFiltersWrapper').show();
            } else {
                $(this).find('.currently').show();
                $(this).find('.currently + a').show();
                $('.IT011_applyFiltersWrapper').hide();
            }
        });

        // On page load re-add custom class 'IT011_selected' to the checked inputs
        $allAttributesToFilter.find('input').each(function () {
            if ($(this).prop('checked') === true) {
            $(this).addClass('IT011_selected');
            }
        });

        // Remove the links provided onto the labels - fixes some issues...
        var $linksToRemove = $allAttributesToFilter.find('label a');
        $linksToRemove.each(function () {
            $keepText = $(this).text();
            $('<span>' + $keepText + '</span>').insertBefore($(this));
            $(this).remove();
        });

        $allAttributesToFilter.find('label').on('click', function(e) {
            e.stopPropagation();
            if (!$(this).prev().hasClass('IT011_selected')) {
                $(this).prev()[0].checked = true;
                $(this).prev().addClass('IT011_selected');
            } else {
                $(this).prev()[0].checked = false;
                $(this).prev().removeClass('IT011_selected');
            }
            $(this).prev().trigger('click');
        });

        $allAttributesToFilter.find('input[type="checkbox"]').click(function(e) {
            e.stopPropagation();
            if (!$(this).hasClass('IT011_selected')) {
                $(this).addClass('IT011_selected');
            } else {
                $(this).removeClass('IT011_selected');
            }

        });

        $('.IT011_applyFiltersButton').on('click', function () {
            // place the checked inputs into their corresponding categories (this case ---> colour and size <--- only)
            var $coloursArray = [];
            var $shoeSizesArray = []; //
            var $sizesArray = [];
            $allAttributesToFilter.find('input').each(function() {
                if ($(this).hasClass('IT011_selected')) {
                    var $thisFilterName = $(this).next('label').find('span').text().trim().toLowerCase();
                    console.log($thisFilterName);
                    if ($(this).prop('id').indexOf('colour') > -1) {
                        $coloursArray.push($thisFilterName);
                    } else if ($(this).prop('id').indexOf('shoe_size') > -1) { //
                        $shoeSizesArray.push($thisFilterName); //
                    } else if ($(this).prop('id').indexOf('size') > -1) {
                        $sizesArray.push($thisFilterName);
                    }
                }
            });

            // Check if the arrays aren't empty and act accordingly
            if (!$coloursArray.length && !$sizesArray.length && !$shoeSizesArray.length) {
                $(this).attr('href', window.location.pathname);
            } else if($coloursArray.length && !$sizesArray.length && !$shoeSizesArray.length) {
                $(this).attr('href', window.location.pathname + "?colour=" + $coloursArray);
            } else if (!$coloursArray.length && $sizesArray.length && !$shoeSizesArray.length) {
                $(this).attr('href', window.location.pathname + "?size=" + $sizesArray);
            } else if (!$coloursArray.length && !$sizesArray.length && $shoeSizesArray.length) {
                $(this).attr('href', window.location.pathname + "?shoe_size=" + $shoeSizesArray);
            } else if ($coloursArray.length && $sizesArray.length && !$shoeSizesArray.length) { //
                $(this).attr('href', window.location.pathname + "?colour=" + $coloursArray + "&size=" + $sizesArray);
            } else if ($coloursArray.length && !$sizesArray.length && $shoeSizesArray.length) { //
                $(this).attr('href', window.location.pathname + "?colour=" + $coloursArray + "&shoe_size=" + $shoeSizesArray);
            } else if (!$coloursArray.length && $sizesArray.length && $shoeSizesArray.length) { //
                $(this).attr('href', window.location.pathname + "?shoe_size=" + $shoeSizesArray + "&size=" + $sizesArray);
            } else {
                $(this).attr('href', window.location.pathname + "?colour=" + $coloursArray + "&shoe_size=" + $shoeSizesArray + "&size=" + $sizesArray);
            }

            // GA event
            sendEvent('IT011', 'Filter Button Clicked', true);
        });

    } // activate

}()); // _IT011