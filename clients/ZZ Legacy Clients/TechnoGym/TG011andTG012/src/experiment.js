import translations from './lib/translations';

/* no_doc_ready */
var _TG012 = (function () {
    
        var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
            
         
    const getLanguage = () => {
        return window.location.pathname.substring(1).match(/^it|gb|fr|de|es/) + '';
    };

    /**
     * Translator
     */
    function _t(str) {
        if(translations[str]) {
            var t = translations[str][getLanguage()]
            if(t) {
                return t;
            }
        }

        return str;
    }

     // -----------------------------------------------
         // Full story integration
         // -----------------------------------------------
         UC.poller([
            function () {
                var fs = window.FS;
                if (fs && fs.setUserVars) return true;
            }
         ], function () {
            window.FS.setUserVars({
                experiment_str: 'TG012',
                variation_str: 'Variation 1'
            });
         }, {
            multiplier: 1.2,
            timeout: 0
         });

         // Poll start
         UC.poller([
            'body',
      '.homepage-products-bar',
      '.swiper-slide',
       '.level-1.swiper-wrapper',
       '.homepage-products-bar .menu-item.level-2',
            function () {
                if (window.jQuery) return true;
            },
            function () {
                if (window.ga) return true;
            }
         ], TG012, {
            timeout: 10000,
            multiplier: 'disable'
         });
         // Variation
         function TG012() {


            var $ = window.jQuery;
             $('body').addClass('TG012');
             

             // Lang

            /*-------------------------------
            Create tab labels
            ---------------------------------*/

            var productTabs = $('<div class="tg12-tabs-wrapper"></div>');
            productTabs.insertAfter('.container.visible-xs.boxed-row');

            productTabs.html(['<div id="tg12-tab1" class="tg12-tab"><span>' + _t('Product Categories') + '</span></div>',
                '<div id="tg12-tab2" class="tg12-tab"><span>' + _t('Product Ranges') + '</span></div>'
            ].join(''));

            /*-------------------------------
            Tab wrapper content
            ---------------------------------*/
            var productContent = $('<div class="tg12-tabs-content"/></div>');
            productContent.insertAfter(productTabs);

            productContent.html('<div class="tg12-tab-content"/><div class="tg12-tab-content"><ul class="tg12-PR swiper-wrapper"/></div>');

            /*-------------------------------
            Pull category from navigation as its in the correct ordercarousel to tab - 
            ---------------------------------*/
      var pollerOpts = { timeout: 7000, multiplier: 0 };

            UC.poller(['#navbar-bottom .menu-item.menu-position-0.first .children .level-0 .level-1.icons .menu-item.level-2.menu-type-custom'], function() { 

                var navCategories = $('#navbar-bottom .menu-item.menu-position-0.first .children .level-0 .level-1.icons .menu-item.level-2.menu-type-custom');

        var swipeCategories = $('.row.shortcode-row.full-row .homepage-products-bar');

         swipeCategories.find('.level-1.swiper-wrapper li').hide();

        productContent.find('.tg12-tab-content:first').append(swipeCategories);
        // swipeCat.empty();

        var slider = swipeCategories.find('.level-1.swiper-wrapper');
        navCategories.clone().appendTo(slider);
  
      }, pollerOpts); 

            /*-------------------------------
            get product ranges
            ---------------------------------*/
            var productRanges = $('.inside .menu-position-0 .children .level-0 .menu-item.level-1.menu-position-2 .level-1 li');

            productRanges.clone().appendTo('.tg12-tab-content:last .tg12-PR');

            $('.tg12-PR li').each(function () {
                $(this).addClass('swiper-slide swiper-slide-visible swiper-slide-active');
            });
      
    
            /*-------------------------------
            Hide/Show tabs
            ---------------------------------*/

            var tab1label = $('#tg12-tab1'),
                tab2label = $('#tg12-tab2'),
                tab1content = $('.tg12-tab-content:first'),
                tab2content = $('.tg12-tab-content:last');


            tab1label.addClass('tg12-tabactive');
            tab1content.addClass('tg12-tabcontent-active');


            tab1label.click(function () {
                if (!$(this).hasClass('tg12-tabactive')) {
                    $(this).addClass('tg12-tabactive');
                    tab2label.removeClass('tg12-tabactive');
                }

                tab1content.addClass('tg12-tabcontent-active');
                tab2content.removeClass('tg12-tabcontent-active');
            });
            tab2label.click(function () {
                if (!$(this).hasClass('tg12-tabactive')) {
                    $(this).addClass('tg12-tabactive');
                    tab1label.removeClass('tg12-tabactive');
                }
                tab2content.addClass('tg12-tabcontent-active');
                tab1content.removeClass('tg12-tabcontent-active');


            });

            /*-------------------------------
            Add all products button
            ---------------------------------*/
             productContent.after('<a class="tg12-all button btn-default btn-cta" href="/products.html">' + _t('View all Products') + '</a>');
             
       /*Wrap icons in a tags*/
       var iconTabs = $('.post-container .tg12-tabs-content .homepage-products-bar .menu-item.level-2');
       
            iconTabs.each(function(){
                var icons = $(this);
        
        icons.click(function(){
                    //icons.find('span').click();
        });
    
                var url = icons.find('a').attr('href');
                icons.wrap('<a class="tg12-iconLinks" href="'+url+'"/>');
    
            });
       

             /*-------------------------------
                Events
             ---------------------------------*/


             function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}
             var trackerName;

             var categoryClick,
                 productRangeclick;


             tab1content.find('li').click(function(){
        var categoryName = $(this).text().trim(); 
                if(!categoryClick){
                    sendEvent('TG012 user clicked on category', 'Category Icon click', 'TG012 User clicked on category  '+categoryName, true);
                    categoryClick = true;
                }
            });

            tab2content.find('li').click(function(){
        var rangeName = $(this).text().trim();
                if(!productRangeclick){
                    sendEvent('TG012 user clicked on product range', 'Product range click', 'TG012 User clicked on product range '+rangeName, true);
                    productRangeclick = true;
                }
            });
       
        


    }
})();
