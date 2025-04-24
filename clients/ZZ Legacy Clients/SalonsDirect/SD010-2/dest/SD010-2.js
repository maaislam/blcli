var _SD010_2 = (function ($) {
  var UC;

  /**
   * UC Library - Poller
   * @version 0.2.2
   */
  UC=function(a){var b=b||window.jQuery;return a.poller=function(a,b,c){var d={wait:50,multiplier:1.1,timeout:0},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
  
  UC.poller([
    '.col-main .breadcrumbs ul li',
    '.cat-des.imagesection',
    '.page-header-container .logo',
    '.refine-by-block',
    function () {
      if (window.jQuery) return true;
    },
    function () {
      if (window.ga) return true;
    }
  ], SD010_2, {
    timeout: 7000,
    multiplier: 'disable'
  });

  function SD010_2() {
    var $ = window.jQuery,
        ga = window.ga;
        
    $('body').addClass('UC010');

    // Full Story Integration
    UC.poller([
      function() {
        var fs = window.FS;
        if (fs && fs.setUserVars) return true;
      }
    ], function () {
      window.FS.setUserVars({
        experiment_str: 'SD010',
        variation_str: 'Variation 2'
      });
    }, { multiplier: 1.2, timeout: 0 });

    initAlterPage();

    /**
    * UC Library - Observer
    * @version 0.2.2
    */
    UC=function(a){var b=b||window.jQuery;return a.observer={active:[],connect:function(a,b,c){var d={throttle:1e3,config:{attributes:!0,childList:!0,subTree:!1}};if(c)for(var e in c)d[e]=c[e];else c=d;for(var f,g=new MutationObserver(function(c){c.forEach(function(c){f||(f=!0,b(a,c),setTimeout(function(){f=!1},d.throttle))})}),h=0;h<a.length;h++)g.observe(a[h],d.config),this.active.push([a[h],g])},disconnect:function(a){for(var c=this.active,d=0;d<a.length;d++)for(var e=a[d],f=0;f<c.length;f++)e===c[f][0]&&c[f][1].disconnect()}},a}(UC||{});

    // Add MutationObserver to watch for changes on page
    // (Fitlers are applied via AJAX rather than a page refresh)
    
    // Get current URL
    var url = window.location.href;

    var $AJAXContent = $('.main > .col-main');
    UC.observer.connect($AJAXContent, function(element, mutation) {
      // check if URL has changed
      if (url !== window.location.href) {
        // update url var
        url = window.location.href;
        // check to see if content has been removed
        if (!$('.main > .col-main').find('.UC010_fastWrap').length) {
          // reapply changes
          initAlterPage();
        }
      }
    }, { attributes: false, childList: true, subtree: false });

    function initAlterPage() {
      var $newLinkswrap = $("<div class='UC010_fastWrap'><h2 class='uc10_title'>Fast Track</h2><p>Know what you're looking for?</p></div>");
      $newLinkswrap.insertAfter('.cat-des.imagesection');

      var pageHeading = $('.page-title.category-title:last').addClass('uc10title'),
          banner = $('.cat-des.imagesection'),
          bannerText = $('<div class="uc10-bannerLink"><p>Find out more about our range</p></div>');

      banner.before(pageHeading);

      bannerText.insertAfter(pageHeading);

      bannerText.click(function () {
        banner.toggleClass('active');
      });

      var title;
      if ($('.col-main .breadcrumbs ul li:eq(1) a').length) {
        title = $('.col-main .breadcrumbs ul li:eq(1) a').text().trim();
      } else {
        title = $('.col-main .breadcrumbs ul li:eq(1) strong').text().trim();
      }

      var fastLinks = {
        nails: [{
            name: 'Gel polish & soak off',
            link: 'http://www.salonsdirect.com/nails/gel-polish-soak-off'
          },
          {
            name: 'Gellux polish',
            link: 'http://www.salonsdirect.com/nails/gel-polish-soak-off/gellux'
          },
          {
            name: 'Nail lamps & accessories',
            link: 'http://www.salonsdirect.com/nails/nail-extensions/lamps-and-accessories'
          },
          {
            name: 'Manicure & Pedicure',
            link: 'http://www.salonsdirect.com/nails/manicure-pedicure'
          },
          {
            name: 'ibd just gel',
            link: 'http://www.salonsdirect.com/nails/gel-polish-soak-off/ibd-just-gel'
          },
          {
            name: 'nail accessories',
            link: 'http://www.salonsdirect.com/nails/nail-accessories'
          },
          {
            name: 'nail polish',
            link: 'http://www.salonsdirect.com/nails/nail-polish'
          },
          {
            name: 'nail extensions',
            link: 'http://www.salonsdirect.com/nails/nail-extensions'
          }

        ],
        hair: [{
            name: 'scissors & razors',
            link: 'http://www.salonsdirect.com/hair/scissors-and-razors'
          },
          {
            name: 'bags & cases',
            link: 'http://www.salonsdirect.com/hair/accessories/bags-holdalls-cases'
          },
          {
            name: 'Shampoo, Conditioner & Masks',
            link: 'http://www.salonsdirect.com/hair/hair-care-perming/shampoo-conditioner-and-masks'
          },
          {
            name: 'Hair Dryers & diffusers',
            link: 'http://www.salonsdirect.com/hair/electricals/hairdryers-and-diffusers'
          },
          {
            name: 'brushes',
            link: 'http://www.salonsdirect.com/hair/brushes-and-combs/brushes'
          },
          {
            name: 'Hair care & perming',
            link: 'http://www.salonsdirect.com/hair/hair-care-perming'
          },
          {
            name: 'clips, grips & elastics',
            link: 'http://www.salonsdirect.com/hair/accessories/clips-pins-elastics'
          },
          {
            name: 'hood dryers & processors',
            link: 'http://www.salonsdirect.com/hair/electricals/hood-dryers-and-processors'
          }
        ],
        beauty: [{
            name: 'heaters & kits',
            link: 'http://www.salonsdirect.com/beauty/hair-removal/heaters-kits'
          },
          {
            name: 'wax',
            link: 'http://www.salonsdirect.com/beauty/hair-removal/wax'
          },
          {
            name: 'hair removal',
            link: 'http://www.salonsdirect.com/beauty/hair-removal'
          },
          {
            name: 'eyelash & brow tinting',
            link: 'http://www.salonsdirect.com/beauty/lashes-brows/lash-brow-tinting'
          },
          {
            name: 'Couch rolls',
            link: 'http://www.salonsdirect.com/beauty/salon-consumables/couch-roll'
          },
          {
            name: 'waxing strips & spatulas',
            link: 'http://www.salonsdirect.com/beauty/hair-removal/waxing-strips-spatulas'
          },
          {
            name: 'lashes & brows',
            link: 'http://www.salonsdirect.com/beauty/lashes-brows'
          },
          {
            name: 'equipment',
            link: 'http://www.salonsdirect.com/beauty/equipment'
          }
        ],
        haircol: [{
            name: 'permanent colour',
            link: 'http://www.salonsdirect.com/hair-colour/permanent-colour'
          },
          {
            name: 'Peroxide developers',
            link: 'http://www.salonsdirect.com/hair-colour/bleach-foil/peroxide-developers'
          },
          {
            name: 'bleach foil',
            link: 'http://www.salonsdirect.com/hair-colour/bleach-foil'
          },
          {
            name: 'bleach',
            link: 'http://www.salonsdirect.com/hair-colour/bleach-foil/bleach'
          },
          {
            name: 'semi permanent colour',
            link: 'http://www.salonsdirect.com/hair-colour/semi-permanent-colour'
          },
          {
            name: 'shade charts',
            link: 'http://www.salonsdirect.com/hair-colour/permanent-colour/shade-charts'
          },
          {
            name: 'gloves',
            link: 'http://www.salonsdirect.com/hair-colour/bleach-foil/gloves'
          },
          {
            name: 'tint bowls & brushes',
            link: 'http://www.salonsdirect.com/hair-colour/bleach-foil/tint-bowls-brushes'
          }
        ]
      };
      var expObj;


      if (title === 'NAILS') {
        expObj = fastLinks.nails;
      } else if (title === 'HAIR') {
        expObj = fastLinks.hair;
      } else if (title === 'BEAUTY') {
        expObj = fastLinks.beauty;
      } else if (title === 'HAIR COLOUR') {
        expObj = fastLinks.haircol;
      }

      $.each(expObj, function () {
        var categoryName = this.name,
          categoryLink = this.link;

        var item = $([
          '<div class="uc010_linkbox">',
          '<a class="uc010_catLink" href="' + categoryLink + '">' + categoryName + '</a>',
          '</div>'
        ].join(''));

        item.appendTo($newLinkswrap);
      });

      $('.uc010_linkbox').click(function () {
        var name = $(this).find('a').text();
        ga('send', 'event', 'UC010---Sub category- Quick links', 'category link clicked', 'Clicked category link' + name + ' UC010', {
          nonInteraction: 1
        });
      });

      $('.page-header-container .logo').click(function () {
        ga('send', 'event', 'UC010---Sub category- Quick links', 'logo clicked', 'Clicked salons direct logo UC010', {
          nonInteraction: 1
        });
      });

      /* Budget Box */
      var $budget = $(['<div class="SD010_brandbox"><h3>Budget in mind?</h3></div>'].join(''));

      // Extract price filters and convert to buttons
      var $filters = $('#narrow-by-list'),
          $filters_price = $filters.find('> dt > span:contains("price"):first'),
          filterID_price,
          $priceFilters;

      if ($filters_price.length) {
        filterID_price = $filters_price.attr('id').match(/\d/)[0],
        $priceFilters = $filters.find('#showFilterBox_' + filterID_price);
      }

      if ($priceFilters) {
        $priceFilters.find('ol > li:has(".amshopby-price")').each(function () {
          var $el = $(this);
          var $link = $el.find('a');
          var hasResults = parseInt($el.find('.count').text().match(/\d./)[0]) > 0;
          if (hasResults) {
            var filter_text = $el.text().match(/([£\w\d-\s\.,+]+)/)[0].trim();
            
            var $price_btn = $([
              '<div class="SD010_price-btn">',
                '<span>' + filter_text + '</span>',
              '</div>'
            ].join(''))
            .click(function() {
              $link.trigger('click');
            });

            $price_btn.appendTo($budget);
          }
        });
        
        $budget.insertAfter('.refine-by-block');
      }

    }
  }
})(jQuery);