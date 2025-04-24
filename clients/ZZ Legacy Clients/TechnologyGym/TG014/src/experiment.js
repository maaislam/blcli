/* eslint-disable */
import { __, getTranslationsCsv } from './lib/translations';

window.TG014 = {
  getTranslationsCsv: getTranslationsCsv 
};

var _TG014 = (function () {

    // PLUGINS
    // UC Library - Poller -- @version 0.2.2
    var UC=function(t){var n=n||window.jQuery;return t.poller=function(t,n,e){var o={wait:50,multiplier:1.1,timeout:0},r=Date.now||function(){return(new Date).getTime()};if(e)for(var a in e)o[a]=e[a];else e=o;for(var i=!!o.timeout&&new Date(r()+o.timeout),s=o.wait,f=o.multiplier,l=[],c=function(e,o){if(i&&r()>i)return!1;o=o||s,function(){var t=typeof e;return"function"===t?e():"string"!==t||document.querySelector(e)}()?(l.push(!0),l.length===t.length&&n()):setTimeout(function(){c(e,o*f)},o)},m=0;m<t.length;m++)c(t[m])},t.throttle=function(t,n){var e,o,r,a=null,i=0;return function(){var s=Date.now||function(){return(new Date).getTime()};s=s(),i||(i=s);var f=n-(s-i);return e=this,o=arguments,(f<=0||f>n)&&(a&&(clearTimeout(a),a=null),i=s,r=t.apply(e,o),a||(e=o=null)),r}},t.group=function(t,n){for(var e=[],o=0;o<t.length;o+=n)e.push(t.slice(o,o+n));return e},t.hoverDelay=function(t,e,o){if(!n)return!1;var r,a,i=Date.now||function(){return(new Date).getTime()};return o||(o=1e3),n(t).hover(function(){a=i()},function(){r||i()-a>=o&&(e(),r=!0)}),t},t.observer={active:[],connect:function(t,n,e){var o={throttle:1e3,config:{attributes:!0,childList:!0,subTree:!1}};if(e)for(var r in e)o[r]=e[r];else e=o;for(var a,i=new MutationObserver(function(e){e.forEach(function(e){a||(a=!0,n(t,e),setTimeout(function(){a=!1},o.throttle))})}),s=0;s<t.length;s++)i.observe(t[s],o.config),this.active.push([t[s],i])},disconnect:function(t){for(var n=this.active,e=0;e<t.length;e++)for(var o=t[e],r=0;r<n.length;r++)o===n[r][0]&&n[r][1].disconnect()}},t.feedbackTab=function(){if(!n)return!1;var t,e,o,r,a,i,s,f=function(n){var e=t||{label:!1,content:!1,position:"left",customClass:!1,sessionClose:!0,tabDimensions:{height:"auto",width:"350px"},contentDimensions:{height:"350px",width:"600px"},mobileBreakpoint:768,animationSpeed:600,dimBackground:!1,zIndex:99999};if(n)for(var o in n)e[o]=n[o];else n=e;return e},l=function(){var e=n(['<div class="UC_fb-tab-container">','<div class="UC_fb-tab">','<span class="UC_fb-tab__inner"></span>','<span class="UC_fb-tab__close">&#215;</span>',"</div>",'<div class="UC_fb-content">','<div class="UC_fb-content__inner"></div>',"</div>","</div>"].join("")),r=e.find(".UC_fb-tab"),a=e.find(".UC_fb-content");return t.label&&r.find(".UC_fb-tab__inner").html(t.label),t.content&&a.find(".UC_fb-content__inner").html(t.content),t.customClass&&e.addClass(t.customClass),t.dimBackground&&(o=n('<div class="UC_fb-tab-bg"></div>')),r.css({height:t.tabDimensions.height,width:t.tabDimensions.width}),a.css({height:t.contentDimensions.height,width:t.contentDimensions.width}),e},c=function(){e&&e.remove(),o&&o.remove()},m=function(){var n,e;switch(t.position){case"left":n="-webkit-transform:rotate(-90deg) translateX(-50%);-moz-transform:rotate(-90deg) translateX(-50%);-ms-transform:rotate(-90deg) translateX(-50%);-o-transform:rotate(-90deg) translateX(-50%);transform:rotate(-90deg) translateX(-50%);transform-origin:top left;top:50%;left:100%;",e="top:50%;-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);-o-transform:translateY(-50%);transform:translateY(-50%);left:-100%;",s="width";break;case"right":n="-webkit-transform:rotate(-90deg) translateY(-100%);-moz-transform:rotate(-90deg) translateY(-100%);-ms-transform:rotate(-90deg) translateY(-100%);-o-transform:rotate(-90deg) translateY(-100%);transform:rotate(-90deg) translateY(-100%);transform-origin:top right;right:100%;",e="top:50%;-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);-o-transform:translateY(-50%);transform:translateY(-50%);right:-100%;",s="width";break;case"bottom":n="-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);bottom:100%;left:50%;",e="left:50%;-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);bottom:-100%;",s="height";break;case"top":n="-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);top:100%;left:50%;",e="left:50%;-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);top:-100%;",s="height";break;default:n="",e="",s="width"}var o=document.createElement("style");o.type="text/css";var r=".UC_fb-tab,.UC_fb-tab__close{display:inline-block;cursor:pointer}.UC_fb-content,.UC_fb-tab{max-width:100%;max-height:100%;box-sizing:border-box;background:#fff}.UC_fb-tab-container{position:fixed;z-index:"+t.zIndex+";"+e+"}.UC_fb-tab{position:absolute;margin:0 auto;text-align:center;z-index:"+t.zIndex+";color:#333;font-size:15px;padding:10px 10px 10px 20px;"+n+"}.UC_fb-tab__inner{display:inline-block;margin:0 auto}.UC_fb-tab__close{position:absolute;right:10px;font-family:sans-serif}.UC_fb-content{padding:20px;text-align:left;position:relative;}.UC_fb-tab-bg{display:none;background:#000;opacity:0.7;position:fixed;top:0;right:0;bottom:0;left:0;z-index:"+(t.zIndex-1)+";}";return o.styleSheet?o.styleSheet.cssText=r:o.appendChild(document.createTextNode(r)),o},d=function(){r&&r.parentElement.removeChild(r)},u=function(){var t=n(".UC_fb-tab-container"),e=t.children(".UC_fb-tab"),o=t.children(".UC_fb-content"),r=n(window);return{window:{width:r.innerWidth(),height:r.innerHeight()},tab:{width:e.outerWidth(),height:e.outerHeight()},content:{width:o.outerWidth(),height:o.outerHeight()}}},b=function(n){n||(n=u()),t||(t=f());var e={remove:{},open:{},close:{}};return e.remove[t.position]="-100%",e.open[t.position]="0",e.close[t.position]="-"+n.content[s]+"px",e},h=function(n){if(!n)return!1;var e=n.find(".UC_fb-tab"),r=n.find(".UC_fb-content"),s="closed";e.click(function(){var e,f,l;i=u(),a=b(i),e=i.window.width-i.tab.height-5,f=i.window.height-i.tab.height-5,r.css({"max-width":e,"max-height":f}),i.content.width>e&&(i.content.width=e),i.content.height>f&&(i.content.height=f),"open"===s?(l=a.close,o&&o.fadeOut()):(l=a.open,o&&o.fadeIn()),n.animate(l,t.animationSpeed,function(){s="open"===s?"closed":"open"})}),e.find(".UC_fb-tab__close").click(function(e){e.stopPropagation(),o&&o.fadeOut(),n.animate(a.remove,t.animationSpeed),t.sessionClose&&window.sessionStorage.setItem("ucfbtab-closed",1)})};return{init:function(n){var c=f(n);t!==c&&(t=c),t.sessionClose&&window.sessionStorage.getItem("ucfbtab-closed")||(e=l(),r=m(),e.prependTo("body"),document.body.insertBefore(r,e[0]),t.dimBackground&&e.before(o),i=u(),a=b(i),h(e),e.css(t.position,"-"+i.content[s]+"px"))},destroy:{component:c,css:d,all:function(){c(),d()}},refresh:function(t){this.destroy.all(),this.init(t)}}}(),t}(UC||{});

    // Send GA Events With Tracker Name ------------
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
            experiment_str: 'TG014',
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

    // Experiment -----------------------------------
    // ----------------------------------------------
    function activate() {
        var $ = window.jQuery;
        var $body = $('body');
        $body.addClass('TG014');

        UC.observer.connect($('#main > .layout > div[role="main"] #product-info .btn-cart'), function() {
            // Callback to invoke on mutation
            if (!$('.TG014_PRODUCTS').length) {
                wholeExperiment();
            }
        }, {
            // Options
            config: {attributes: true, childList: false, subtree: false},
            throttle: 1000
        });

        wholeExperiment();

        function wholeExperiment() {

            // AMENDS
            $('#mobilemenu-contacts-link').before($('#navbar-top').find('.tool-search'));
            $('#navtop-menu').insertAfter('#ct-menu-top_menu');

            // check for 'it' or 'gb'
            if (window.location.href.indexOf('technogym.com/it/') > -1) { // italy version

                var $productCategoryListItems = $('#ct-menu-top_menu').find('.inside > ul > li');
                // Array containing the text links
                var textLinks = ['PRODOTTI', 'CASA PRIVATA', 'FITNESS CENTER', 'HOTEL', 'RESIDENCE',
                    'MEDICAL', 'CORPORATE', 'PERFORMANCE'];

                // Function to remove the big blocks of navigation and replace them for text links
                function textBlocksOfNavigation() {
                    $productCategoryListItems.each(function (i) {
                        var $thisProductCategory = $(this);
                        var $thisProductImage = $(this).children('a');

                        $thisProductImage.hide();
                        $('<span class="TG014_productCategory">' + textLinks[i] + '</span>').insertBefore($thisProductImage);

                        var $recreatedProductCategoryWrap = $thisProductCategory.children('.TG014_productCategory');
                        $recreatedProductCategoryWrap.on('click', function () {
                            $thisProductImage.trigger('click');
                            $(this).toggleClass('TG014_open');
                        });
                    });
                } // textBlocksOfNavigation

                // Replace the 'image' categories with text
                textBlocksOfNavigation();

                // Redesign the 'products' category
                $('.TG014_productCategory:first').addClass('TG014_PRODUCTS');
                var $childrenOfProductCategory = $('.TG014_PRODUCTS').siblings('.children');
                $childrenOfProductCategory.addClass('TG014_children_PRODUCTS');

                var $menuItemsProduct = $childrenOfProductCategory.children('.tab-content').children('li').children('.children');

                // Add 3 inline tabs on the product category (not stacked)
                function productsSubCategories(index, textSubCategory) {
                    $childrenOfProductCategory.prepend('<span class="TG014_category TG014_category' + index + ' " style="visibility: visible;">' + textSubCategory + '</span>');

                    var $menuItem = $childrenOfProductCategory.children('.tab-content').children('li:eq(' + index + ')').children('.children');

                    $('.TG014_category' + index).on('click', function () {
                        $('.TG014_category').removeClass('TG014_opened_product_subcategory');
                        if ($menuItem.is(':visible')) {
                            $menuItemsProduct.hide();
                        } else {
                            $menuItemsProduct.hide();
                            $menuItem.show();
                            $(this).addClass('TG014_opened_product_subcategory');
                        }
                    });
                } // productsSubCategories

                productsSubCategories(2, 'LINEE DI PRODOTTO');
                productsSubCategories(1, 'ALLENAMENTO');
                productsSubCategories(0, 'CATEGORIE');

                $('.TG014_category2').css({"padding": "21px 0", "font-size": "10px"});

                // Default open of the 'products' section to the 'categories' subsection
                $('.TG014_productCategory.TG014_PRODUCTS').on('click', function () {
                    var $menuItem = $childrenOfProductCategory.children('.tab-content').children('li:eq(0)').children('.children');
                    $menuItemsProduct.hide();
                    $menuItem.show();
                    $('.TG014_category').removeClass('TG014_opened_product_subcategory');
                    $('.TG014_category0').addClass('TG014_opened_product_subcategory');
                });

                // Add a 'view all' button to the (products -> categories subsection)
                var $viewAllButton = $('<div class="TG014_viewAll_wrapper"><a href="https://www.technogym.com/it/products.html"><button class="TG014_viewAll">TUTTI I PRODOTTI</button></a></div>');
                $viewAllButton.appendTo('.TG014_children_PRODUCTS .level-0.tab-content li:eq(0) > .children');

                // Modify 'PRODUCTS -> WORKOUT' subsection to display text links rather than image links
                // Array containing the workout text links
                var workoutTextLinks = ['CARDIO', 'FORZA', 'FUNZIONALE E FLESSIBILITA\'', 'ATTIVITA\' DI GRUPPO'];
                var $workoutSection = $('.TG014_children_PRODUCTS .level-0.tab-content > li:eq(1)');
                var $itemsWorkoutSection = $workoutSection.find('.children > .level-1 > li');
                $itemsWorkoutSection.each(function (i) {
                    var $thisWorkoutItem = $(this);
                    var $thisWorkoutImage = $(this).children('a');
                    var $thisHref = $thisWorkoutImage.prop('href');

                    $thisWorkoutImage.hide();
                    $('<span class="TG014_workoutCategory">' + workoutTextLinks[i] + '</span>')
                        .insertBefore($thisWorkoutImage);

                    $thisWorkoutItem.children('.TG014_workoutCategory').on('click', function () {
                        window.location.href = $thisHref;
                    });
                });

                // Modify 'FITNESS FACILITIES' section to display text links rather than image links
                var solutionTextLinks = ['PREMIUM SOLUTION', 'PRESTIGE SOLUTION'];
                // var $solutionSection = $('.TG014_children_PRODUCTS .level-0.tab-content > li:eq(1)');
                var $itemsSolutionSection = $('#ct-menu-top_menu').find('.inside > ul > li:eq(2) > .children > .level-0.tab-content .level-1 > li:not(:eq(1))');
                //  var $itemsSolutionSection = $solutionSection.find('.children > .level-1 > li');
                $itemsSolutionSection.each(function (i) {
                    var $thisSolutionItem = $(this);
                    var $thisSolutionImage = $(this).children('a');
                    var $thisHref = $thisSolutionImage.prop('href');

                    $thisSolutionImage.hide();
                    $('<span class="TG014_solutionCategory">' + solutionTextLinks[i] + '</span>')
                        .insertBefore($thisSolutionImage);

                    $thisSolutionItem.children('.TG014_solutionCategory').on('click', function () {
                        window.location.href = $thisHref;
                    });
                });

                // ---------------------------------------------------------------------------------------------------------
                // Fix some things with the 'FITNESS FACILITIES' tab section
                var $solutionsContainer = $('#ct-menu-top_menu').find('.inside > ul > li:eq(2) > span:eq(0)');
                var $solutionsBUGGYRemoved = $('#ct-menu-top_menu').find('.inside > ul > li:eq(2) > a:eq(0)');
                $solutionsBUGGYRemoved.remove();
                var $solutionsTab = $('#ct-menu-top_menu').find('.inside > ul > li:eq(2) .TG014_productCategory');
                $solutionsTab.text('SOLUZIONI');

                // try to prev default
                $solutionsContainer.on('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $(this).next().show();
                    $(this).next().find('.children:eq(0)').slideToggle(500);
                });
                // ---------------------------------------------------------------------------------------------------------
                // ---------------------------------------------------------------------------------------------------------
                // Put the rest of the categories into one (Business Sectors)
                // ---------------------------------------------------------------------------------------------------------
                // ---------------------------------------------------------------------------------------------------------

                var $solutionsSection = $('#ct-menu-top_menu').find('.inside > ul > li:eq(2)');

                $solutionsSection.after([
                    '<li class="TG014_business_sectors"><span class="TG014_business_outter_header" style="text-transform: uppercase;">settori di attività</span>',
                    '<ul class="TG014_business_sectors_inside">',
                    '<li class="TG014_insideSector TG014_hospitality_sector"><span class="TG014_business_inner_header">HOTEL</span>',
                    '<div class="TG014_subsector_children">',
                    '<a href="https://www.technogym.com/it/business-solution/hotel-e-navi-da-crociera/" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">Hotel</p></a>',
                    '<a href="https://www.technogym.com/it/business-solution/hotel-e-navi-da-crociera/" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">Crociere</p></a>',
                    '</div>',
                    '</li>',
                    '<li class="TG014_insideSector TG014_residential_sector"><span class="TG014_business_inner_header">RESIDENCE</span>',
                    '<div class="TG014_subsector_children">',
                    '<a href="https://www.technogym.com/it/business-solution/complessi-residenziali/"><p class="TG014_subsector_child">Centri Wellness</p></a>',
                    '<a href="https://www.technogym.com/it/business-solution/complessi-residenziali/" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">Aree Wellness</p></a>',
                    '<a href="https://www.technogym.com/it/business-solution/complessi-residenziali/" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">Residential</p></a>',
                    '</div>',
                    '</li>',
                    '<li class="TG014_insideSector TG014_health_sector"><span class="TG014_business_inner_header">MEDICAL</span>',
                    '<div class="TG014_subsector_children">',
                    '<a href="https://www.technogym.com/it/business-solution/patologie-metaboliche/" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">Trattamento delle disfunzioni metaboliche</p></a>',
                    '<a href="https://www.technogym.com/it/business-solution/patologie-cardiorespiratorie/" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">Riabilitazione cardio-respiratoria</p></a>',
                    '<a href="https://www.technogym.com/it/business-solution/patologie-ortopediche/" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">Rieducazione funzionale</p></a>',
                    '<a href="https://www.technogym.com/it/business-solution/medicina-sportiva/" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">Medicina sportiva</p></a>',
                    '<a href="https://www.technogym.com/it/business-solution/soluzioni-per-linvecchiamento/" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">Qualità dell\'invecchiamento</p></a>',
                    '</div>',
                    '</li>',
                    '<li class="TG014_insideSector TG014_corporate_sector"><span class="TG014_business_inner_header">CORPORATE</span>',
                    '<div class="TG014_subsector_children">',
                    '<a href="https://www.technogym.com/it/business-solution/piccoli-spazi/" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">Spazi Ridotti</p></a>',
                    '<a href="https://www.technogym.com/it/business-solution/grandi-spazi/" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">Grandi Spazi</p></a>',
                    '</div>',
                    '</li>',
                    '<li class="TG014_insideSector TG014_performance_sector"><span class="TG014_business_inner_header">PERFORMANCE</span>',
                    '<div class="TG014_subsector_children">',
                    '<a href="https://www.technogym.com/it/who-we-are/partnership/#sports" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">Team sportivi</p></a>',
                    '<a href="https://www.technogym.com/it/business-solution/scuole-e-universita/" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">Scuole e Università</p></a>',
                    '<a href="https://www.technogym.com/it/business-solution/caserme/" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">Forze armate</p></a>',
                    '</div>',
                    '</li>',
                  
                      //Add solutions
                    '<li class="TG014_insideSector TG014_solutions_sector"><span class="TG014_business_inner_header">SOLUZIONI</span>',
                    '<div class="TG014_subsector_children">',
                    '<a href="https://www.technogym.com/it/business-solution/centri-fitness/" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">PREMIUM SOLUTIONS</p></a>',
                    '<a href="https://www.technogym.com/it/business-solution/centri-fitness/" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">PRESTIGE SOLUTIONS</p></a>',
                    '</div>',
                    '</li>',
                  
                  
                  
                  
                    '</ul>',
                    '</li>'
                ].join(''));

                // Cache vars
                var $businessSectorsWrapper = $('.TG014_business_sectors');
                var $businessSectorsInside = $('.TG014_business_sectors_inside');
                var $eachSectorWrapper = $('.TG014_insideSector');
                var $eachSectorContents = $('.TG014_subsector_children');
                var $businessSectorsHeader = $('.TG014_business_outter_header');

                // Evt listner for the business sectors (main section)
                $businessSectorsHeader.on('click', function () {
                    $(this).toggleClass('TG014_open');
                });
                $('.TG014_business_inner_header').on('click', function () {
                    $(this).toggleClass('TG014_open');
                });

                // -----------
                // On page load the subcategories (e.g 'hospitality section') to the business sectors category are hidden by default
                $businessSectorsInside.hide();
                $eachSectorContents.hide();
                // Toggle slide outter sector
                $businessSectorsWrapper.on('click', function () {
                    $businessSectorsInside.slideToggle(500);
                });
                // Toggle slide should only work for the parent (so stop propagating when clicking on children)
                $businessSectorsWrapper.children(':not(span:eq(0))').on('click', function (e) {
                    e.stopPropagation();
                });

                // Toggle slide inside sectors
                $eachSectorWrapper.on('click', function () {
                    $(this).children('.TG014_subsector_children').slideToggle(500);
                });
                // Toggle slide should only work for the parent (so stop propagating when clicking on children)
                $eachSectorWrapper.children('.TG014_subsector_children').on('click', function (e) {
                    e.stopPropagation();
                });
                // -----------

                // Hide the unnecessary sections (the last 5 original ones as they were recreated to appear into a single section (Business Sectors) as subsections)
                var $sectionsToRemove = $('#ct-menu-top_menu').find('.inside > ul').children('li:eq(4), li:eq(5), li:eq(6), li:eq(7), li:eq(8)');
                $sectionsToRemove.hide();

                // Some translations
                $('a[href="https://www.technogym.com/it/products/shopby/product_type-attrezzi_per_l_allenamento_funzionale.html"] > span').text('Allenamento funzionale');
                $('a[href="https://www.technogym.com/it/products/forza.html"] > span').text('Allenamento forza');

                sendEvent('TG014', 'pageview', 'TG014 - Navigation Redesign (Mobile)');
            } else { // uk / default version
                // ---------------------------------------------------------------------------------------------------
                // ---------------------------------------------------------------------------------------------------
                // ---------------------------------------------------------------------------------------------------
                // ---------------------------------------------------------------------------------------------------
                // ---------------------------------------------------------------------------------------------------
                // ---------------------------------------------------------------------------------------------------
                // ----------------------------------------UK VERSION-------------------------------------------------
                // ---------------------------------------------------------------------------------------------------
                // ---------------------------------------------------------------------------------------------------
                // ---------------------------------------------------------------------------------------------------
                // ---------------------------------------------------------------------------------------------------
                // ---------------------------------------------------------------------------------------------------
                // ---------------------------------------------------------------------------------------------------
                //
                // 2018-04-04
                // The Italian translations have already been provided above and so we're leaving that
                // functionality intact. However, we now have new translsations to be added. So we're running
                // those through the translations function __ in translations.js
                // --> The functionality below then remains the same, and the string names are the same, except
                // --> that they are passed to a function - that function simply returns the string passed to it
                // --> unless the language parameter passed differs
                // ---------------------------------------------------------------------------------------------------
                var lang = window.location.pathname.substring(1).match(/^it|gb|fr|de|es|us/) + ''; 
                
                var $productCategoryListItems = $('#ct-menu-top_menu').find('.inside > ul > li');
                // Array containing the text links
                var textLinks = [
                  __('PRODUCTS'), 
                  __('PRIVATE HOME'), 
                  __('FITNESS FACILITIES'), 
                  __('HOSPITALITY'), 
                  __('RESIDENTIAL'),
                  __('HEALTH'),
                  __('CORPORATE'),
                  __('PERFORMANCE')
                ];

                // Function to remove the big blocks of navigation and replace them for text links
                function textBlocksOfNavigation() {
                    $productCategoryListItems.each(function (i) {
                        var $thisProductCategory = $(this);
                        var $thisProductImage = $(this).children('a');

                        $thisProductImage.hide();
                        $('<span class="TG014_productCategory">' + textLinks[i] + '</span>').insertBefore($thisProductImage);

                        var $recreatedProductCategoryWrap = $thisProductCategory.children('.TG014_productCategory');
                        $recreatedProductCategoryWrap.on('click', function () {
                            $thisProductImage.trigger('click');
                            $(this).toggleClass('TG014_open');
                        });
                    });
                } // textBlocksOfNavigation

                // Replace the 'image' categories with text
                textBlocksOfNavigation();

                // Redesign the 'products' category
                $('.TG014_productCategory:first').addClass('TG014_PRODUCTS');
                var $childrenOfProductCategory = $('.TG014_PRODUCTS').siblings('.children');
                $childrenOfProductCategory.addClass('TG014_children_PRODUCTS');

                var $menuItemsProduct = $childrenOfProductCategory.children('.tab-content').children('li').children('.children');

                // Add 3 inline tabs on the product category (not stacked)
                function productsSubCategories(index, textSubCategory) {
                    $childrenOfProductCategory.prepend('<span class="TG014_category TG014_category' + index + ' " style="visibility: visible;">' + textSubCategory + '</span>');

                    var $menuItem = $childrenOfProductCategory.children('.tab-content').children('li:eq(' + index + ')').children('.children');

                    $('.TG014_category' + index).on('click', function () {
                        $('.TG014_category').removeClass('TG014_opened_product_subcategory');
                        if ($menuItem.is(':visible')) {
                            $menuItemsProduct.hide();
                        } else {
                            $menuItemsProduct.hide();
                            $menuItem.show();
                            $(this).addClass('TG014_opened_product_subcategory');
                        }
                    });
                } // productsSubCategories

                productsSubCategories(2, __('PRODUCT LINE'));
                productsSubCategories(1, __('WORKOUT'));
                productsSubCategories(0, __('CATEGORIES'));

                // Default open of the 'products' section to the 'categories' subsection
                $('.TG014_productCategory.TG014_PRODUCTS').on('click', function () {
                    var $menuItem = $childrenOfProductCategory.children('.tab-content').children('li:eq(0)').children('.children');
                    $menuItemsProduct.hide();
                    $menuItem.show();
                    $('.TG014_category').removeClass('TG014_opened_product_subcategory');
                    $('.TG014_category0').addClass('TG014_opened_product_subcategory');
                });

                // Add a 'view all' button to the (products -> categories subsection)
                var $viewAllButton = $('<div class="TG014_viewAll_wrapper"><a href="'
                  + __('https://www.technogym.com/gb/products.html')
                  + '"><button class="TG014_viewAll">' + __('VIEW ALL') + '</button></a></div>');
                $viewAllButton.appendTo('.TG014_children_PRODUCTS .level-0.tab-content li:eq(0) > .children');

                // Modify 'PRODUCTS -> WORKOUT' subsection to display text links rather than image links
                // Array containing the workout text links
                var workoutTextLinks = [
                  __('CARDIO'),
                  __('STRENGTH'),
                  __('FUNCTIONAL & FLEXIBILITY'),
                  __('GROUP ACTIVITIES')
                ];

                var $workoutSection = $('.TG014_children_PRODUCTS .level-0.tab-content > li:eq(1)');
                var $itemsWorkoutSection = $workoutSection.find('.children > .level-1 > li');
                $itemsWorkoutSection.each(function (i) {
                    var $thisWorkoutItem = $(this);
                    var $thisWorkoutImage = $(this).children('a');
                    var $thisHref = $thisWorkoutImage.prop('href');

                    $thisWorkoutImage.hide();
                    $('<span class="TG014_workoutCategory">' + workoutTextLinks[i] + '</span>')
                        .insertBefore($thisWorkoutImage);

                    $thisWorkoutItem.children('.TG014_workoutCategory').on('click', function () {
                        window.location.href = $thisHref;
                    });
                });

                // Modify 'FITNESS FACILITIES' section to display text links rather than image links
                var solutionTextLinks = [
                  __('PREMIUM SOLUTIONS'),
                  __('PRESTIGE SOLUTIONS')
                ];

                // var $solutionSection = $('.TG014_children_PRODUCTS .level-0.tab-content > li:eq(1)');
                var $itemsSolutionSection = $('#ct-menu-top_menu').find('.inside > ul > li:eq(2) > .children > .level-0.tab-content .level-1 > li:not(:eq(1))');
                //  var $itemsSolutionSection = $solutionSection.find('.children > .level-1 > li');
                $itemsSolutionSection.each(function (i) {
                    var $thisSolutionItem = $(this);
                    var $thisSolutionImage = $(this).children('a');
                    var $thisHref = $thisSolutionImage.prop('href');

                    $thisSolutionImage.hide();
                    $('<span class="TG014_solutionCategory">' + solutionTextLinks[i] + '</span>')
                        .insertBefore($thisSolutionImage);

                    $thisSolutionItem.children('.TG014_solutionCategory').on('click', function () {
                        window.location.href = $thisHref;
                    });
                });

                // ---------------------------------------------------------------------------------------------------------
                // Fix some things with the 'FITNESS FACILITIES' tab section
                var $solutionsContainer = $('#ct-menu-top_menu').find('.inside > ul > li:eq(2) > span:eq(0)');
                var $solutionsBUGGYRemoved = $('#ct-menu-top_menu').find('.inside > ul > li:eq(2) > a:eq(0)');
                $solutionsBUGGYRemoved.remove();
                var $solutionsTab = $('#ct-menu-top_menu').find('.inside > ul > li:eq(2) .TG014_productCategory');

                $solutionsTab.text(
                  __('FITNESS FACILITIES')
                );

                // try to prev default
                $solutionsContainer.on('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $(this).next().show();
                    $(this).next().find('.children:eq(0)').slideToggle(500);
                });
                // ---------------------------------------------------------------------------------------------------------
                // ---------------------------------------------------------------------------------------------------------
                // Put the rest of the categories into one (Business Sectors)
                // ---------------------------------------------------------------------------------------------------------
                // ---------------------------------------------------------------------------------------------------------

                var $solutionsSection = $('#ct-menu-top_menu').find('.inside > ul > li:eq(2)');

                $solutionsSection.after([
                    `<li class="TG014_business_sectors"><span class="TG014_business_outter_header">${__('BUSINESS SECTORS')}</span>`,
                    `<ul class="TG014_business_sectors_inside">`,
                    //Add solutions
                    `<li class="TG014_insideSector TG014_solutions_sector"><span class="TG014_business_inner_header">${__('FITNESS FACILITIES')}</span>`,
                    `<div class="TG014_subsector_children">`,
                    `<a href="${__('https://www.technogym.com/gb/business-solution/commercial-gym-equipment/')}" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">${__('PREMIUM SOLUTIONS')}</p></a>`,
                    `<a href="${__('https://www.technogym.com/gb/business-solution/commercial-gym-equipment/')}" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">${__('PRESTIGE SOLUTIONS')}</p></a>`,
                    `</div>`,
                    `</li>`,
                    `<li class="TG014_insideSector TG014_hospitality_sector"><span class="TG014_business_inner_header">${__('HOSPITALITY')}</span>`,
                    `<div class="TG014_subsector_children">`,
                    `<a href="${__('https://www.technogym.com/gb/business-solution/hotels-cruise-liners/')}" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">${__('Hotel')}</p></a>`,
                    `<a href="${__('https://www.technogym.com/gb/business-solution/hotels-cruise-liners/')}" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">${__('Cruises')}</p></a>`,
                    `</div>`,
                    `</li>`,
                    `<li class="TG014_insideSector TG014_residential_sector"><span class="TG014_business_inner_header">${__('RESIDENTIAL')}</span>`,
                    `<div class="TG014_subsector_children">`,
                    `<a href="${__('https://www.technogym.com/gb/business-solution/residential/')}" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">${__('Wellness Facilities')}</p></a>`,
                    `<a href="${__('https://www.technogym.com/gb/business-solution/residential/')}" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">${__('Wellness Spaces')}</p></a>`,
                    `<a href="${__('https://www.technogym.com/gb/business-solution/residential/')}" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">${__('In-home Wellness')}</p></a>`,
                    `</div>`,
                    `</li>`,
                    `<li class="TG014_insideSector TG014_health_sector"><span class="TG014_business_inner_header">${__('HEALTH')}</span>`,
                    `<div class="TG014_subsector_children">`,
                    `<a href="${__('https://www.technogym.com/gb/business-solution/metabolic-disorders/')}" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">${__('Treatment of metabolic disorders')}</p></a>`,
                    `<a href="${__('https://www.technogym.com/gb/business-solution/cardio-respiratory-disorders/')}" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">${__('Cardio - respiratory rehabilitation')}</p></a>`,
                    `<a href="${__('https://www.technogym.com/gb/business-solution/orthopedic-disorders/')}" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">${__('Functional assessment')}</p></a>`,
                    `<a href="${__('https://www.technogym.com/gb/business-solution/sports-medicine/')}" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">${__('Sports Medicine')}</p></a>`,
                    `<a href="${__('https://www.technogym.com/gb/business-solution/aging/')}" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">${__('Quality ageing')}</p></a>`,
                    `</div>`,
                    `</li>`,
                    `<li class="TG014_insideSector TG014_corporate_sector"><span class="TG014_business_inner_header">${__('CORPORATE')}</span>`,
                    `<div class="TG014_subsector_children">`,
                    `<a href="${__('https://www.technogym.com/gb/business-solution/no-space/')}" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">${__('No Space Solution')}</p></a>`,
                    `<a href="${__('https://www.technogym.com/gb/business-solution/space/')}" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">${__('Space Solution')}</p></a>`,
                    `</div>`,
                    `</li>`,
                    `<li class="TG014_insideSector TG014_performance_sector"><span class="TG014_business_inner_header">${__('PERFORMANCE')}</span>`,
                    `<div class="TG014_subsector_children">`,
                    `<a href="${__('https://www.technogym.com/gb/who-we-are/partnership/#sports')}" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">${__('Sport Teams')}</p></a>`,
                    `<a href="${__('https://www.technogym.com/gb/business-solution/universities/')}" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">${__('Schools and Universities')}</p></a>`,
                    `<a href="${__('https://www.technogym.com/gb/business-solution/military/')}" class="TG014_subsector_linkChild"><p class="TG014_subsector_child">${__('Armed Forces')}</p></a>`,
                    `</div>`,
                    `</li>`,
                  
                    `</ul>`,
                    `</li>`
                ].join(''));

                // Cache vars
                var $businessSectorsWrapper = $('.TG014_business_sectors');
                var $businessSectorsInside = $('.TG014_business_sectors_inside');
                var $eachSectorWrapper = $('.TG014_insideSector');
                var $eachSectorContents = $('.TG014_subsector_children');
                var $businessSectorsHeader = $('.TG014_business_outter_header');

                // Evt listner for the business sectors (main section)
                $businessSectorsHeader.on('click', function () {
                    $(this).toggleClass('TG014_open');
                });
                $('.TG014_business_inner_header').on('click', function () {
                    $(this).toggleClass('TG014_open');
                });

                // -----------
                // On page load the subcategories (e.g 'hospitality section') to the business sectors category are hidden by default
                $businessSectorsInside.hide();
                $eachSectorContents.hide();
                // Toggle slide outter sector
                $businessSectorsWrapper.on('click', function () {
                    $businessSectorsInside.slideToggle(500);
                });
                // Toggle slide should only work for the parent (so stop propagating when clicking on children)
                $businessSectorsWrapper.children(':not(span:eq(0))').on('click', function (e) {
                    e.stopPropagation();
                });

                // Toggle slide inside sectors
                $eachSectorWrapper.on('click', function () {
                    $(this).children('.TG014_subsector_children').slideToggle(500);
                });
                // Toggle slide should only work for the parent (so stop propagating when clicking on children)
                $eachSectorWrapper.children('.TG014_subsector_children').on('click', function (e) {
                    e.stopPropagation();
                });
                // -----------

                // Hide the unnecessary sections (the last 5 original ones as they were recreated to appear into a single section (Business Sectors) as subsections)
                var $sectionsToRemove = $('#ct-menu-top_menu').find('.inside > ul').children('li:eq(4), li:eq(5), li:eq(6), li:eq(7), li:eq(8)');
                $sectionsToRemove.hide();

                // Add the 'newsroom' section to the navbar menu (only on uk since it already exists on 'it' version)
                const newsroomAnchor = document.querySelector('#navtop-menu li.menu-item.last a');
                let newsroomHref = null;
                if (newsroomAnchor) {}
                  newsroomHref = newsroomAnchor.getAttribute('href');
                if (!newsroomHref === 'https://www.technogym.com/gb/newsroom-home') {
                  $('#navtop-menu li:eq(0)').after(`<li class="TG014_newsroom"><a href="${__('https://www.technogym.com/gb/newsroom-home')}"><span>${__('NEWSROOM')}</span></a></li>`);
                }

                sendEvent('TG014', 'pageview', 'TG014 - Navigation Redesign (Mobile)');
            } // else (UK version)

            // Amend
            $('.TG014_productCategory:eq(0), .TG014_productCategory:eq(1)').on('click', function (e) {
                if (window.matchMedia('(min-width: 1000px)').matches) {
                    console.warn('clicked');
                    var $thisChildSibling = $(this).siblings('.children');
                    $thisChildSibling.slideToggle(500);
                }
            });

            // var trackerName = ga.getAll()[0].get('name');

            $('#ct-menu-top_menu div[class="inside"] > ul > li > span').click(function () {
                var topLevelNav = $(this).text().trim();
                // ga(trackerName + '.send', 'event', 'Mobile Navigation', 'Mobile Navigation: ' + topLevelNav, {nonInteraction: 1});
                sendEvent('TG014', 'Mobile Navigation: ' + topLevelNav);
            });

            $('div[class="children TG014_children_PRODUCTS"] .level-0.tab-content li div ul > li').click(function () {
                var productCategories = $(this).find('span:first').text().trim();
                var productCategoriesHeader = $(this).closest('.children.TG014_children_PRODUCTS').find('.TG014_opened_product_subcategory').text().trim();
                var productHeader = $(this).closest('.menu-item.level-0.tab-parent').find('span:first').text().trim();
                // ga(trackerName + '.send', 'event', 'Mobile Mobile Navigation', 'Mobile Navigation: ' + productHeader, 'Mobile Navigation: ' + productHeader + ' : ' + productCategoriesHeader + ' : ' + productCategories, {nonInteraction: 1});
                sendEvent('TG014', 'Mobile Navigation: ' + productHeader + ' : ' + productCategoriesHeader + ' : ' + productCategories);
            });

            $('#menu-item-1727 ul > li, #menu-item-1502 ul > li').click(function () {
                var homeSelect = $(this).find('a span:first').text().trim();
                var homeHeader = $(this).closest('.menu-item.level-0.tab-parent').find('span:first').text().trim();
                // ga(trackerName + '.send', 'event', 'Mobile Navigation', 'Mobile Navigation: ' + homeHeader, 'Mobile Navigation: ' + homeHeader + ' : ' + homeSelect, {nonInteraction: 1});
                sendEvent('TG014', 'Mobile Navigation: ' + homeHeader + ' : ' + homeSelect);
            });

            $('#menu-item-1744, #menu-item-1742, #menu-item-1591, #menu-item-1592').click(function () {
                var solutionsSelect = $(this).find('span:first').text().trim();
                var solutionsHeader = $(this).closest('.menu-item.level-0.tab-parent').find('span:first').text().trim();
                // ga(trackerName + '.send', 'event', 'Mobile Navigation', 'Mobile Navigation: ' + solutionsHeader, 'Mobile Navigation: ' + solutionsHeader + ' : ' + solutionsSelect, {nonInteraction: 1});
                sendEvent('TG014', 'Mobile Navigation: ' + solutionsHeader + ' : ' + solutionsSelect);
            });

            $('ul[class="TG014_business_sectors_inside"] > li > span').click(function () {
                var businessDropdown = $(this).text().trim();
                var businessHeader = $(this).closest('.TG014_business_sectors').find('span:first').text().trim();
                // ga(trackerName + '.send', 'event', 'Mobile Navigation', 'Mobile Navigation: ' + businessHeader, 'Mobile Navigation: ' + businessHeader + ' : ' + businessDropdown, {nonInteraction: 1});
                sendEvent('TG014', 'Mobile Navigation: ' + businessHeader + ' : ' + businessDropdown);
            });

            $('ul[class="TG014_business_sectors_inside"] li div a > p').click(function () {
                var businessSubsection = $(this).text().trim();
                var businessDropdown2 = $(this).closest('.TG014_subsector_children').siblings('.TG014_business_inner_header.TG014_open').text().trim();
                var businessHeader2 = $(this).closest('.TG014_business_sectors').find('span:first').text().trim();
                // ga(trackerName + '.send', 'event', 'Mobile Navigation', 'Mobile Navigation: ' + businessHeader2, 'Mobile Navigation: ' + businessHeader2 + ' : ' + businessDropdown2 + ' : ' + businessSubsection, {nonInteraction: 1});
                sendEvent('TG014', 'Mobile Navigation: ' + businessHeader2 + ' : ' + businessDropdown2 + ' : ' + businessSubsection);
            });

            $('button[class="TG014_viewAll"]').click(function(){
                var viewAll = $(this).text();
                var productCategoriesHeader2 = $(this).closest('.children.TG014_children_PRODUCTS').find('.TG014_opened_product_subcategory').text().trim();
                var productHeader2 = $(this).closest('.menu-item.level-0.tab-parent').find('span:first').text().trim();
                sendEvent('TG014', 'Mobile Navigation: ' + productHeader2 + ' : ' + productCategoriesHeader2 + ' : ' + viewAll);
            });

        } // wholeExperiment

    } // activate

})(); // _TG014
