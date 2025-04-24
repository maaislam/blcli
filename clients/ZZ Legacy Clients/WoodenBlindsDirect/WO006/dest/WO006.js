var _WO006 = (function () {

    // PLUGINS ------------------------------------

    // UC Library - Poller -- @version 0.2.2
    // ---------------------------------------------
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    // Send GA Events With Tracker Name -----------
    // ---------------------------------------------
    function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}var trackerName;

    // Full Story Tagging --------------------------
    // ---------------------------------------------
    UC.poller([
        '.WO006_overlay',
        function () {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
        }
    ], function () {
        window.FS.setUserVars({
            experiment_str: 'WO006',
            variation_str: 'Variation 1 Desktop'
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
        ], function () {
            // Prevent script from running twice on same page
            if ($('body').hasClass('WO006')) {
                return false;
            } else {
                activate();
            }
        });
    })();

    // ---------------------------------------------
    function activate() {
        var $ = window.jQuery;
        var $body = $('body');
        $body.addClass('WO006');

        // -----------------------------(min-width: 992px) for starters---------------------------------------
        var $headerContainer = $('header .headerBottom');

        // Change according to screen width (here for min-width: 992px)
        // $bootstrapRowCurrent used to avoid mistakes when selecting inner elements
        var $bootstrapRowCurrent;
        if ($headerContainer.find('.row.hidden-sm.hidden-xs').is(':visible')) {
            $bootstrapRowCurrent = $headerContainer.find('.row.hidden-sm.hidden-xs');
        } else if ($headerContainer.find('.row.hidden-lg.hidden-md.hidden-xs').is(':visible')) {
            $bootstrapRowCurrent = $headerContainer.find('.row.hidden-lg.hidden-md.hidden-xs');
        }
        var $navBarContainer = $bootstrapRowCurrent.find('nav.navbar.navbar-default');
        var $navBarCollapse = $navBarContainer.find('.navbar-collapse'); // .collapse navbar-collapse js-navbar-collapse
        var $navSections = $navBarCollapse.children('ul:not(:first)'); // Contains the navbar sections (except the first one -> home icon)

        var $shopByColourSection = $([
            '<ul class="WO006_colour_nav nav navbar-nav">',
            '<li class="dropdown mega-dropdown">',
            '<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">COLOUR </a>',
            '<ul class="dropdown-menu mega-dropdown-menu row WO006_color_nav_content">',
            '</ul>',
            '</li>',
            '</ul>'
        ].join(''));

        $shopByColourSection.insertBefore($navSections[0]);
        var $newNavSections = $navBarCollapse.children('ul:not(:first)'); // include the added section too into the list of sections
        $newNavSections.each(function (i) {
            var $this = $(this);
            // Find sections that contain content (can dropdown)
            if ($this.find('li').first().find('a').hasClass('dropdown-toggle')) {
                $this.addClass('WO006__nav_dropdown');
                $this.find('a.dropdown-toggle').prepend('<span>Shop by</span><br />');
            } else {
                $this.addClass('WO006__nav_noDropDown');
                $this.find('a').prepend(' <br />');
            }
        });

        // Remove the shop by color section contained by the main 'WOODEN BLINDS' section and place it in the new
        // section (shop by colour)
        var $colourSection = $newNavSections.filter(':eq(1)').find('ul:eq(0) li:eq(0)');
        $colourSection.clone().prependTo('.WO006_color_nav_content');

        // Remove the 'SHOP BY' text within the content of the main sections
        var $shopByTextRemove = $newNavSections.find('.dropdown-header');
        var $rangesList = [];
        $shopByTextRemove.each(function (i) {
            var $this = $(this);
            var $stringReplace = $this.text().replace('Shop by ', '');
            if ($stringReplace.indexOf('Range') > -1) {
                $this.text($stringReplace + 's');
            } else {
                $this.text($stringReplace);
            }
            if ($this.text().indexOf('Ranges') > -1) {
                $rangesList.push($this);
            }
        });

        var $singleAccordionWrapper = $([
            '<ul class="nav nav-stacked">',
            '</ul>'
        ].join(''));

        // Turn ranges into accordion
        if ($rangesList.length) {
            for (var i = 0; i < $rangesList.length; i++) {
                var $rangeItem = $rangesList[i];
                var $rangeSiblings = $rangeItem.siblings();
                $rangeSiblings.addClass('WO006_panel panel');

                var $sectionRangeIndex = i;

                var $clonedWrapper = $singleAccordionWrapper.clone();
                $clonedWrapper.attr('id', 'WO006_accordion' + $sectionRangeIndex);
                $rangeSiblings.wrapAll($clonedWrapper);

                $rangeSiblings.each(function (i) {
                    var $this = $(this);
                    $('<ul class="collapse WO006_collapsable"><li><a class="WO006_linkRef">Read more...</a></li></ul>').appendTo($this); //id="firstLink"
                    var $linkHref = $this.children('a').attr('href');
                    $this.find('.WO006_collapsable').attr('id', 'firstLink' + $sectionRangeIndex + i);

                    $this.children('a').attr({
                        "data-toggle": "collapse",
                        "data-parent": "#WO006_accordion" + $sectionRangeIndex,
                        "href": "#firstLink" + $sectionRangeIndex + i
                    });

                    $this.find('.WO006_linkRef').attr('href', $linkHref);
                });
            }
        }

        var $overlayDiv =  $('<div class="WO006_overlay">');
       $overlayDiv.prependTo($('.WO006'));

        // Hover instead of clicking on the sections in the navigation bar
        $newNavSections.find(".dropdown").hover(
            function () {
                // $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideDown("400");
                $('.dropdown-menu', this).not('.in .dropdown-menu').show();
                $(this).toggleClass('open');
                    $overlayDiv.show();
            },
            function () {
                //$('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideUp("400");
                $('.dropdown-menu', this).not('.in .dropdown-menu').hide();
                $(this).toggleClass('open');
                    $overlayDiv.hide();
            }
        );

        // Add 'best sellers' to 'Shop by Colour' section too
        $('<li class="col-md-6" style="margin-left: 200px;">').appendTo($bootstrapRowCurrent.find('.WO006_color_nav_content'));
        $('.col-md-4.hidden-xs:eq(0)').clone().children('ul').appendTo($bootstrapRowCurrent.find('.WO006_color_nav_content .col-md-6'));

        // Send event when users click within the navigation (on links)
        var $linksWithinNav = $('.dropdown-menu.mega-dropdown-menu.row').find('a');
        $linksWithinNav.on('click', function () {
            sendEvent('WO006', 'Clicked within navigation', true);
        });

    } // activate

}()); // _WO006