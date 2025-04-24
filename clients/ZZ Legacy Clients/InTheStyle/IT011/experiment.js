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
        var $allAttributesToFilter = $('#narrow-by-list ol li'); // Amend (4)

        // Add filters to the uncollapsed sidebar to give a clearer view of a user's desired viewed products
        var $currently = $('.col-left.sidebar .block-content .currently');
        if ($currently.length) {
            // On page load get the checked inputs and display them more compactly in the 'filter by' header
            var $getCheckedInputs = $allAttributesToFilter.find('input[type="checkbox"]').filter(function () {
                return this.checked === true;
            });

            // Get price from currently filters
            var priceValue = null;
            $currently.find('li').each((idx, item) => {
                var labelElm = $(item).find('.label'),
                    label = labelElm.text().trim();
                if(label.toLowerCase() == 'price:') {
                    priceValue = labelElm.next('.value').text().trim();
                }
            });

            $currently.insertAfter('.block-title.block-title-buttons > strong');
            $currently.empty();

            // Show price
            if(priceValue) {
                $('<p class="IT011_price_display">Price: ' + priceValue + '</p>').appendTo($currently);
            }

            // Show other attributes based on checked inputs
            var colours = [], sizes = [], shoeSizes = [];
            $getCheckedInputs.each(function (i) {
                var $this = $(this);
                if (this.id.indexOf('colour') > -1) {
                    var $currentColour = $this.next().children('span').text().toLowerCase();
                    if(colours.indexOf($currentColour) == -1) {
                        colours.push($currentColour);
                    }
                } else if (this.id.indexOf('shoe_size') > -1) {
                    var $currentShoeSize = $this.next().children('span').text().toLowerCase();
                    if(shoeSizes.indexOf($currentShoeSize) == -1) {
                        shoeSizes.push($currentShoeSize);
                    }
                } else if (this.id.indexOf('size') > -1) {
                    var $currentSize = $this.next().children('span').text().toLowerCase();
                    if(sizes.indexOf($currentSize) == -1) {
                        sizes.push($currentSize);
                    }
                }
            });

            if(colours.length) {
                $('<p class="IT011_colour_display">Colour(s): </p>').append(colours.join(', '))
                    .appendTo($currently);
            }
            if(sizes.length) {
                $('<p class="IT011_size_display">Size(s): </p>').append(sizes.sort().join(', '))
                    .appendTo($currently);
            }
            if(shoeSizes.length) {
                $('<p class="IT011_shoe_size_display">Shoe size(s): </p>').append(shoeSizes.sort().join(', '))
                    .appendTo($currently);
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

        $applyFiltersFunc.appendTo('.block-collapsable');

        // Display filteres chosen when sidebar not collapsed and hide it otherwise
        var $collapsableBlock = $('.sidebar .block-collapsable');
        $collapsableBlock.on('click', function () {
            if ($(this).hasClass('block-expanded')) {
                $(this).find('.currently').hide();
                $(this).find('.currently + a').hide();
            } else {
                $(this).find('.currently').show();
                $(this).find('.currently + a').show();
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
            var $keepText = $(this).text();
            $('<span>' + $keepText + '</span>').insertBefore($(this));
            $(this).remove();
        });

        $allAttributesToFilter.find('label').on('click', function(e) {
            e.stopPropagation();
            var targetCheckbox = $(this).prev('.checkbox-filter');
            if(!targetCheckbox.length) {
                targetCheckbox = $(this).next('.checkbox-filter');
            }

            if (!targetCheckbox.hasClass('IT011_selected')) {
                targetCheckbox[0].checked = true;
                targetCheckbox.addClass('IT011_selected');
            } else {
                targetCheckbox[0].checked = false;
                targetCheckbox.removeClass('IT011_selected');
            }
            targetCheckbox.trigger('click');
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
                    var label = $(this).next('label');
                    if(!label.length) {
                        label = $(this).prev('label');
                    }

                    var $thisFilterName = label.find('span').text();
                    $thisFilterName = $thisFilterName.replace(/\(\d+\)/, ''); // Fix replace numbers
                    $thisFilterName = $thisFilterName.trim().toLowerCase();

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

        // ================================================
        // Fix hide duplicate filters
        // ================================================
        var filterIds = [];
        $allAttributesToFilter.each(function(idx, item) {
            var inputId = $(item).find('input.checkbox-filter').attr('id');
            if(inputId && filterIds.indexOf(inputId) == -1) {
                filterIds.push(inputId);
            } else if(inputId && filterIds.indexOf(inputId) > -1) {
                $(item).addClass('it11-hide-duplicate');
            }
        });
        
        // ================================================
        // Fix when de-selecting a filter handle the
        // duplicate too
        // ================================================
        $allAttributesToFilter.each(function(idx, item) {
            var input = $(item).find('input.checkbox-filter');
            input.on('click', function() {
                var sameElms = $(document.querySelectorAll('#' + this.id)).not(this);
                if(!$(this).is(':checked')) {
                    // Find all elements with same ID and uncheck
                    sameElms.attr('checked', false);
                    sameElms.removeClass('IT011_selected');
                }
            });
        });

        /**
         * Move total number of products below the filter.
         */
        var productTotal = document.querySelector('p.toolbar__amount-mobile');
        var filterRef = document.querySelector('aside.col-left.sidebar > .block.block-layered-nav');
        if (productTotal && filterRef) {
          filterRef.insertAdjacentElement('afterend', productTotal);
        }

    } // activate

}()); // _IT011
