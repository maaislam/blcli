import * as utils from '../../../../../lib/utils';

/**
 * Build Hierarchical Categories Navigation
 *
 * Modified from TP011
 */
export function buildNav(data) {
    var $nav_HTML = $([
        '<div class="pd14_nav">',
            '<ul class="pd14_level0">',
                '<li id="pd14_az-listing" class="pd14_az-listing">',
                    '<a href="#">',
                        '<div class="pd14_hamburger">',
                            '<img class="pd14_hamburger-arrow" src="//ab-test-sandbox.userconversion.com/experiments/PD005-arrowdown.png" />',
                        '</div>',
                        '<span>A to Z Listing</span>',
                    '</a>',
                '</li>',
                '<li id="pd14_menu-listing">',
                    '<a href="#">',
                        '<div class="pd14_hamburger">',
                            '<img class="pd14_hamburger-arrow" src="//ab-test-sandbox.userconversion.com/experiments/PD005-arrowdown.png" />',
                        '</div>',
                        '<span>Categories</span>',
                    '</a>',
                    '<div class="pd14_megamenu">',
                        '<ul class="pd14_level1"></ul>',
                    '</div>',
                '</li>',
                '<li id="pd14_brands">',
                    '<a href="#">',
                        '<div class="pd14_hamburger">',
                            '<img class="pd14_hamburger-arrow" src="//ab-test-sandbox.userconversion.com/experiments/PD005-arrowdown.png" />',
                        '</div>',
                        '<span>Brands</span>',
                    '</a>',
                    '<div class="pd14_megamenu pd14_megamenu--default">',
                    '</div>',
                '</li>',
            '</ul>',
        '</div>'
    ].join(''));

    var $level0 = $nav_HTML.find('.pd14_level0');


    // Add pd14_open class to level 0 list items on hover
    var closeNavEvents = [];
    function closeAllNavs() {
        $.each(closeNavEvents, function() {
            this();
        });
    }

    var hoverTimer;

    $level0.children('li').each(function() {
        var $el = $(this);
        var name = $el.find('> a > span').text();
        var $menu = $el.find('> a > .pd14_hamburger');

        var openNav = function() {
          
         
               $menu.addClass('pd14_menu-open');
            $el.find('.pd14_open').removeClass('pd14_open');
            $el.addClass('pd14_open');

          
            //$('body').addClass('pd14_scroll-lock');

            // Set first submenu to active to avoid a blank megamenu
            // Amend 15/11/17 - Remove this for black friday link
            //var $first = $nav_HTML.find('.pd14_level1 > li:first');
            //$first.addClass('pd14_open');
       

            if (utils.isTouchDevice()) {
                $level1.find('> li.pd14_show-link-indicator:not(".pd14_single-link")').removeClass('pd14_show-link-indicator');
                $first.addClass('.pd14_show-link-indicator');
            }
        
            $nav_HTML.css('z-index', '9002');

          
            var $overlay = $('.pd14_overlay');
            $overlay.css('z-index', '9001');

            $('.pd14_overlay').stop(true, true).fadeIn(400, function() {
                $overlay.css('z-index', '9001');
            });

            
        };
                     
           
          

        var closeNav = function() {
            $menu.removeClass('pd14_menu-open');
            $el.removeClass('pd14_open');
            //$('body').removeClass('pd14_scroll-lock');

            $nav_HTML.css('z-index', '999');

            var $overlay = $('.pd14_overlay');
            $('.pd14_overlay').stop(true, true).fadeOut(400, function() {
                //$overlay.css('z-index', '998');
            });
        };

        closeNavEvents.push(closeNav);

        if (utils.isTouchDevice()) {
            // Open/Close nav on click for touch devices
            $el.children('a').on('touchstart', function() {
                $el.off('mouseenter');
                $el.off('mouseleave');

                if ($el.hasClass('pd14_open')) {
                    //closeNav();
                    closeAllNavs();
                } else {
                    closeAllNavs();
                    openNav();
                }
            });
        }

      
      
      
        $el.on({

                mouseenter: function() {

                        closeAllNavs();
                        openNav();

                       clearTimeout(hoverTimer);
                    
                },

                mouseleave: function() {
                  clearTimeout(hoverTimer);
                  hoverTimer = setTimeout(function() {
                        closeAllNavs();
              }, 500);
                    

            }
        });
      });

    // Level 1
    var $level1 = $level0.find('.pd14_level1');

    $.each(data, function(i) {
        var level1 = this;
        var $html = $([
            '<li>',
                '<a href="' + level1.url + '">',
                    level1.title,
                '</a>',
            '</li>'
        ].join(''));

        // Level 2
        if (level1.children.length) {
            var $level2 = $('<ul class="pd14_level2"></ul>');

            $.each(level1.children, function() {
                var level2 = this;
                var $html = $([
                    '<li>',
                        '<a class="pd14_level2-link" href="' + level2.url + '">',
                            'All ' + level2.title + '<em>&nbsp;&gt;</em>',
                        '</a>',
                    '</li>'
                ].join(''));

                // Level 3
                if (level2.children.length) {
                    var $level3 = $('<ul class="pd14_level3"></ul>');

                    $.each(level2.children, function() {
                        var level3 = this;
                        var $html = $([
                            '<li>',
                                '<a href="' + level3.url + '">',
                                    level3.title,
                                '</a>',
                            '</li>'
                        ].join(''));

                        // Add level 3 list item to level 3 container
                        $html.appendTo($level3);
                    });

                    // Add level 3 container to level 2 list item
                    $level3.appendTo($html);
                }

                // Add level 2 list item to level 2 container
                $html.appendTo($level2);
            });


            /* Wrap level 2 list items into columns
               The number of groups per column depends on the total number of subtree list items.
               It will include as many groups as it can in the current column until it reaches 
               the theshold, then it will move onto a new column. This prevents cols from being 
               too long vertically. */

            var $groups = $level2.children('li');
            var columnLiThreshold = 18; // Max number of list items in each column
            var columnLiCount = 0; // Number of list items in current column
            var columnSplit = []; // Will contain number of groups that can fit into each col


            $groups.each(function(i) {
                var subtreeLi = $(this).find('li');
                /* +3 to account for the group headings being a larger font taking up more space
                   About the equivalent of 3 normal links */
                var newLiCount = (subtreeLi.length+3) + columnLiCount;

                /* If this group is to be added to the column and is still within
                   the threshold limit, do stuff */
                if (newLiCount <= columnLiThreshold) {
                    // Update current counter to include new list items
                    columnLiCount = newLiCount;
                } else {
                    // Threshold exceeded, this group must go in a new column
                    columnSplit.push(i); // Record group index so we know to split the column here later
                    columnLiCount = (subtreeLi.length+3); // Reset counter
                }

                // If this is the last group, end the column here
                if ((i+1) === $groups.length) {
                    columnSplit.push($groups.length);
                    return true;
                }
            });

            // Get groups of elements based on columnSplit
            var columns = [];
            $.each(columnSplit, function(i) {
                var start = i === 0 ? 0 : columnSplit[i-1];
                var end = this;
                
                var $split = $groups.slice(start, end);
                columns.push($split);
            });


            // Wrap elements in columns
            $.each(columns, function() {
                $(this).wrapAll('<div class="pd14_col"></div>');
            });

            // Add message to the end of submenu
            //$level2.append('<span class="pd14_menu-msg">We have over 20,000 products in over 2,000 product categories ready for delivery or collection in over 680 branches</span>');
            
            // Add level 2 container to level 1 list item
            $level2.appendTo($html);
        } else {
            $html.addClass('pd14_single-link');
        }

        // Add level 1 list item to level 1 container
        $html.appendTo($level1);

    });
  
      // Manual addition of single links to level 1
      var manualLinks = [['Offers', '/All-Discounts/Special-Offers~c~special_offers']];
      $.each(manualLinks, function(idx, item) {
        var alreadyExists = false;
        $level1.children('li').each(function() {
          var link = $(this).find('> a:first');
          if(link.text().trim() === item[0]) {
            alreadyExists = true;
          }
        });
        
        if(!alreadyExists) {
          $level1.append([
            '<li class="pd14_single-link pd14_show-link-indicator' + (item[0] === 'Black Friday' ? ' pd14_black-friday' : '') + '">',
              '<a href="' + item[1] + '">',
                  item[0],
              '</a>',
            '</li>'
          ].join(''));
        }
      });
  
    // Highlight level 1 links
    var highlightLinks = ['Offers'];
      $.each(highlightLinks, function(idx, item) {
        $level1.children('li').each(function() {
          var link = $(this).find('> a:first');
          if(link.text().trim() === item) {
            link.addClass('pd14_highlight-link');
          }
        });
      });

    // Open submenus on hover over level 1 nav
    if (!utils.isTouchDevice()) {
        $level1.menuAim({
            activate: function(row) {
                var $row = $(row);
                if (!$row.hasClass('pd14_open')) {
                    $row.addClass('pd14_open');
                }
                if ($row.hasClass('pd14_single-link')) {
                    $level0.find('.pd14_megamenu').addClass('pd14_hide-subnav');
                }
            },  
            deactivate: function(row) {
                var $row = $(row);
                if ($row.hasClass('pd14_open')) {
                    $row.removeClass('pd14_open');
                }
                if (!$row.hasClass('pd14_single-link')) {
                    $level0.find('.pd14_megamenu').removeClass('pd14_hide-subnav');
                }
            },
            tolerance: 200,
            rowSelector: '> li'
        });
    } else {
        // If touch device prevent level 1 nav from going to urls and just open subnav instead
        $level1.find('> li').on('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();

            var url = $(this).children('a').attr('href');

            // If this is already active, go the the link url
            if ($(this).hasClass('pd14_open')) {   
                if (url) window.location.href = url;
            }

            $level1.find('> li.pd14_open').removeClass('pd14_open');
            $level1.find('> li.pd14_show-link-indicator:not(".pd14_single-link")').removeClass('pd14_show-link-indicator');

            $(this).addClass('pd14_open');
            $(this).addClass('pd14_show-link-indicator');

            if ($(this).hasClass('pd14_single-link')) {
                $level0.find('.pd14_megamenu').addClass('pd14_hide-subnav');
                // redirect to href url
                if (url) window.location.href = url;
            } else {
                $level0.find('.pd14_megamenu').removeClass('pd14_hide-subnav');
                $(this).addClass('pd14_show-link-indicator');
            }
        });

        // Enable default click behaviour on submenu
        $nav_HTML.find('.pd14_level2 a').on('touchstart', function(e) {
            e.stopPropagation();
            $(this).css({'color': '#f6b112', 'text-decoration': 'underline'});
            var url = $(this).attr('href');
            if (url) window.location.href = url;
        });

        // Stop clicks on blank spaces from bubbling and triggering level 1 clicks
        $nav_HTML.find('.pd14_level2').on('touchstart', function(e) {
            e.stopPropagation();
        });
    }
    
    // Add link indicators to single-links
    $level0.find('.pd14_single-link').addClass('pd14_show-link-indicator');

    // Add scroll class to submenus the exceed level 1 height
    $level1.find('.pd14_level2').filter(function() {
        return $(this).children('.pd14_col').length > 4;
    }).addClass('pd14_scroll-menu');

    return $nav_HTML;
}

/**
 * Build the A-Z nav (relies on nav already have been built
 *
 * Modified from TP011
 */
export function buildAtoZNav(data) {
    // Nav content JSON (613 objects)
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // Outer containers
    var $container = $('<div class="pd14_megamenu"></div>');
    var $quickLinks = $('<ul id="pd14_az-quick-links" class="pd14_az-quick-links"></ul>');
    var $allGroups = $('<ul class="pd14_az-all-groups"></ul>');

    // Function to extract the categories that start with a certain letter
    var getCategories = function(letter) {
        var matchesLetter = [];

        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            var categoryName = category.categoryName;
            var firstLetter = categoryName.charAt(0).toUpperCase();

            if (firstLetter === letter) {
                matchesLetter.push(category);
            }
        }
        return matchesLetter.length ? matchesLetter : false;
    };

    // Loop through every letter in the alphabet and segment into groups by letter
    for (var i = 0; i < alphabet.length; i++) {
        var letter = alphabet[i];
        var letterCategories = getCategories(letter);
        var $quickLink = $('<li class="pd14_az-quick-link" data-letter="' + letter + '">' + letter + '</li>');

        /* If no categories for this letter, add inactive class to quick link
           and jump to next iteration */
        if (!letterCategories) {
            $quickLink
                .addClass('pd14_az-quick-link-inactive')
                .appendTo($quickLinks);
            continue;
        }

        // Build the HTML for every inner link
        var linksHTML = '';
        for (var j = 0; j < letterCategories.length; j++) {
            var category = letterCategories[j];
            var categoryName = category.categoryName;
            var url = category.url;

            // Add to the links HTML
            linksHTML += '<li><a href="' + url + '">' + categoryName + '</a></li>';
        }

        /* Build the outer container for the inner links and add functionality
           to the quick link to automatically scroll to that section */
        var $letterGroup = $([
            '<li class="pd14_az-group">',
                '<div class="pd14_az-group-heading" data-letter="' + letter + '">' + letter + '</div>',
                '<ul class="pd14_az-group-link">' + linksHTML + '</ul>',
            '</li>'
        ].join(''));
        
        $quickLink.on('click', function() {
            var letter = $(this).data('letter');
            var scrollPoint = $('.pd14_az-group-heading[data-letter="' + letter + '"]')[0].offsetTop - 80;
            if (!scrollPoint) return false;

            $allGroups.animate({
                scrollTop: scrollPoint
            }, 500);
        });

        // Split the links into 5 columns
        var $links = $letterGroup.find('.pd14_az-group-link > li');
        var columnsNum = 5;

        // Divide by number of columns to work out how many links go in each one
        var linksPerCol = Math.ceil($links.length / columnsNum);
        var columnGroups = [];
        var start = 0;
        for (var k = 0; k < columnsNum; k++) {
            var end = start + linksPerCol;
            
            // Slice the links into columns
            var $columnGroup = $links.slice(start, end);
            columnGroups.push($columnGroup);

            // Update the starting index for the next group
            start = end;
        }


        // Loop through each column group and wrap it in a column div
        for (var l = 0; l < columnGroups.length; l++) {
            var $group = columnGroups[l];
            $group.wrapAll('<div class="pd14_col"></div>');
        }


        // Append to outer containers
        $quickLink.appendTo($quickLinks);
        $letterGroup.appendTo($allGroups);
    }

    // Append to outer most HTML
    $container.append($quickLinks, $allGroups);

    return $container;
};

 /**
  * Build a search box into the search nav
  *
  * Modified from TP011
  */
export function buildAtoZSearch() {
    $('<div class="pd14-navSearch"><img src="//www.sitegainer.com/fu/up/wqr1rd7c41k2ycs.png"/><input id = "pd14-searchBox" type ="text" placeholder = "Search A-Z..."/></div>').appendTo(' #pd14_az-quick-links');
    $(".pd14_az-all-groups").append('<li class="pd14-no-results-found">No results found.</li>');
    $('.pd14-no-results-found').hide();

    $('#pd14-searchBox').on('keyup',function(){
        var valThis = $(this).val().toLowerCase();  
        var $search = $('#pd14_az-listing');
          
        $search.find('.pd14_col > li').show();
        $search.find('.pd14_col').show();

        if(valThis === ""){
            $search.find('.pd14_col > li').show();
            $search.find('.pd14_col').show();
          
            $('.pd14-no-results-found').hide();
        } else {
            $search.find('.pd14_col > li').each(function(){
                var text = $(this).text().toLowerCase();
                var match = text.indexOf(valThis);
                if (match >= 0) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }



        $('.pd14_az-group-link').each(function(){
        if($(this).find('li').is(':visible')){
              $(this).parent().find('.pd14_az-group-heading').show();
            }else{
              $(this).parent().find('.pd14_az-group-heading').hide();
            }
        });

        $search.find('.pd14_col').each(function () {
           if ($(this).find('li').is(':visible')) {
              $(this).show();
              } else {
              $(this).hide();
          }
        });

        if($search.find('.pd14_col:visible').length == 0) {
            $('.pd14-no-results-found').show();
        }else{
            $('.pd14-no-results-found').hide();
        }

    });
}

/**
 * Build brands menu
 */
export function buildBrandsMenu(data) {
    var menu = $('<ul>');
    $.each(data, (idx, item) => {
        const link = `
            <li>
                <a href="${item.url}">${item.brandName}</a>
            </li>
        `;
        menu.append(link);
    });

    $('#pd14_brands .pd14_megamenu').append(menu);
}
