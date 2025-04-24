var _TG016 = (function () {

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
            experiment_str: 'TG016',
            variation_str: 'Variation 1 Mobile'
        });
    }, {multiplier: 1.2, timeout: 0});

    // Triggers ------------------------------------
    // ---------------------------------------------
    var _triggers = (function () {
        UC.poller([
            '.wide.select-profile',
            '#product-name',
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
        $body.addClass('TG016');

        if (window.location.href.indexOf('https://www.technogym.com/gb/contacts/?reason=catalogue') === -1) {
            return;
        }

        // Make sure the content isn't hidden (a few scenarios where you want to replace default func.)
        $('.icon-Arrowdown.toggle-accordion').addClass('rotated');
        $('#contact-form').find('.form-container').addClass('opened');

        // Cache vars
        var $contactFormWrapper = $('#contact-form');
        var $contactForm = $('#contactForm');

        // Hide unneeded stuff
        $('.post-title').hide();
        $('.forms .contact-details').hide();
        $contactFormWrapper.find('.block-title:first').hide();

        UC.poller([
            '.post-header'
        ], function () {
            $('.post-header').hide();
        });

        // CTA
        var $bottomButton = $('.buttons-set:first > .button > span');
        $bottomButton.text('REQUEST A CATALOGUE');

        $contactFormWrapper.prepend([
            '<div class="TG016_headerWrapper">',
            '<h3 class="TG016_headerTitle">REQUEST A CATALOGUE</h3>',
            '</div>'
        ].join(''));

        $contactForm.find('.form-list:first > li:first').hide();
        $contactForm.find('.form-list:first > .wide.comment').hide();

        // Replace terms privacy text
        $('.input-box.terms-privacy > div')
            .html('<input type="checkbox"> I consent to the processing of my personal data for the promotional communications purposes refered to point 3.d) of the ' +
                '<a href="https://www.technogym.com/gb/privacy-policy/" target="_blank">Privacy Policy</a>');

        // Profile wrapper (priv. ind., business, freelance proff.)
        var $profileWrapper = $('.wide.select-profile');
        var $profileOptions = $profileWrapper.children('.option');

        // Restyle the profile options
        var $selectNeed = $('.fields.select-need');
        $selectNeed.find('> div:not(:last)').addClass('TG016_optionSelect');
        $selectNeed.find('> div:first').appendTo($profileOptions.first());
        $selectNeed.find('> div:eq(1)').appendTo($profileOptions.eq(2));
        $selectNeed.find('> div:eq(0)').appendTo($profileOptions.eq(1));
        $selectNeed.find('> div:eq(0)').appendTo($profileOptions.eq(1));

        var $inputOptions = $profileOptions.find('input');

        $inputOptions.on('change', function () {
            var $this = $(this);
            if ($this.prop('checked', 'checked')) {
                $('.TG016_optionSelect').hide();
                $('.TG016_privateIndividualTerms').hide();
                $('.TG016_dropdownTitle').hide();
                $('.field.company').addClass('hidden');
                $profileOptions.removeClass('TG016_optionActive');
                $this.parent().addClass('TG016_optionActive');
                $profileOptions.css('height', '40px');
                var $thisOptionSelected = $('.TG016_optionActive');
                var $dropdownSelect = $thisOptionSelected.find('.TG016_optionSelect select');
                $thisOptionSelected.find('.TG016_optionSelect').show();
                $thisOptionSelected.find('.TG016_dropdownTitle').show();
                $thisOptionSelected.find('.TG016_privateIndividualTerms').show();

                if ($thisOptionSelected.find('#business').siblings('.field.company').hasClass('hidden')) {
                    $thisOptionSelected.find('#business').siblings('.field.company').removeClass('hidden');
                }

                // Just once
                if (!$thisOptionSelected.find('.TG016_dropdownTitle').length) {
                    var $dropdownSelectFirstOptionText = $dropdownSelect.find('> option:first').text();
                    $dropdownSelect.find('> option:first').text('SELECT');
                    $thisOptionSelected.find('.TG016_optionSelect').before('<p class="TG016_dropdownTitle">' + $dropdownSelectFirstOptionText + '</p>');
                    if ($dropdownSelectFirstOptionText.indexOf('Why do you exercise') > -1) {
                        $thisOptionSelected.find('.TG016_dropdownTitle').before('<div class="TG016_privateIndividualTerms">*Selecting your objectives, you consent to the creation of a profile in accordance with point 3.e) (ii) of the <a href="https://www.technogym.com/gb/privacy-policy/" target="_blank">Privacy Policy</a></div>');
                    }
                }
                $dropdownSelect.removeClass('hidden');
            } // check if.. checked
        }); // 'change' evt. list.

        // Another one
        var $wordLabels = $profileOptions.find('input').next().add($profileOptions.find('input').next().next());
        $wordLabels.on('click', function () {
            $(this).parent().find('input').trigger('click');
        });

        // Generate hardcodedImages object (which contains the needed data for all products on technogym)
        // Run the below on the 'all products' filter
        /*
        var data = {};

        $('.category-products .item-product ').each(function(){
        var $link = $(this).find('.no-std-link');
        var title = $link.attr('title');
        var link = $link.attr('href');
        var img = $link.children('img').attr('src');
        data[title] = {
            link: link,
            img: img
        };
        });

        var dataJSON = JSON.stringify(data, null, 4);
         */
        var hardcodedImages = {
            "MYRUN": {
                "link": "https://www.technogym.com/gb/treadmill-myrun.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/m/y/myrun_related_25.jpg"
            },
            "SKILLMILL™ CONNECT": {
                "link": "https://www.technogym.com/gb/skillmill-connect.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/k/skillmill_connect__related.jpg"
            },
            "UNICA": {
                "link": "https://www.technogym.com/gb/unica.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/u/n/unica_related.jpg"
            },
            "RUN PERSONAL": {
                "link": "https://www.technogym.com/gb/run-personal.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/D/9/D947EVF_run_personal_related_01.jpg"
            },
            "RECLINE PERSONAL": {
                "link": "https://www.technogym.com/gb/recline-personal.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/D/9/D9673VF_recline_personal_related_01_2.jpg"
            },
            "CROSS PERSONAL": {
                "link": "https://www.technogym.com/gb/cross-personal.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/D/9/D9573VF_cross_personal_related_01_2.jpg"
            },
            "SPAZIO FORMA": {
                "link": "https://www.technogym.com/gb/spazio-forma.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/p/spazio_forma_related_1.jpg"
            },
            "JOG FORMA": {
                "link": "https://www.technogym.com/gb/jog-excite-forma.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/j/o/jog_forma_related_3.jpg"
            },
            "SYNCHRO FORMA": {
                "link": "https://www.technogym.com/gb/synchro-excite-forma.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/y/synchro_forma_related_1.jpg"
            },
            "RECLINE FORMA": {
                "link": "https://www.technogym.com/gb/recline-excite-forma.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/r/e/recline_forma_related_2.jpg"
            },
            "BIKE FORMA": {
                "link": "https://www.technogym.com/gb/bike-excite-forma.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/b/i/bike_forma_related_1.jpg"
            },
            "Excite® Climb UNITY™": {
                "link": "https://www.technogym.com/gb/climb-excite-unity.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_climb_unity_related_2.jpg"
            },
            "WELLNESS BALL ACTIVE SITTING 55 cm": {
                "link": "https://www.technogym.com/gb/wellness-ball-55-cm.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/w/e/wellness_ball_active_sitting_related_5_3.jpg"
            },
            "GROUP CYCLE™ CONNECT": {
                "link": "https://www.technogym.com/gb/group-cycle-connect.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/g/r/group_cycle_connect_related_2.jpg"
            },
            "MYCYCLING": {
                "link": "https://www.technogym.com/gb/mycycling.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/m/y/mycycling_related_1_2.jpg"
            },
            "GROUP CYCLE™ RIDE": {
                "link": "https://www.technogym.com/gb/group-cycle-ride.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/g/r/group_cycle_ride_related_2.jpg"
            },
            "Kinesis PERSONAL VISION": {
                "link": "https://www.technogym.com/gb/vision-kinesis-personal.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/D/MD052_kinesis_personal_vision_related_1.jpg"
            },
            "Kinesis PERSONAL HERITAGE LEATHER": {
                "link": "https://www.technogym.com/gb/leather-kinesis-personal.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/D/MD053_kinesis_personal_leather_related_1.jpg"
            },
            "Kinesis PERSONAL HERITAGE BLACK": {
                "link": "https://www.technogym.com/gb/heritage-kinesis-personal-black.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/D/MD051_kinesispersonal_personal_related_01_2.jpg"
            },
            "ARTIS® - CLIMB": {
                "link": "https://www.technogym.com/gb/climb-artis.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_climb_artis_related.jpg"
            },
            "ARTIS® RUN": {
                "link": "https://www.technogym.com/gb/treadmill-artis-run-standard.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/r/u/run_artis_related_9.jpg"
            },
            "ARTIS® - VARIO": {
                "link": "https://www.technogym.com/gb/artis-vario-standard.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/v/a/vario_artis_related_9.jpg"
            },
            "EXCITE TOP MED": {
                "link": "https://www.technogym.com/gb/excite-top-med.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/t/o/top_excite_medical_related_1.jpg"
            },
            "PURE STRENGTH – STANDING LEG CURL ": {
                "link": "https://www.technogym.com/gb/standing-leg-curl-purestrength-13.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG7000_purestrength_standinglegcurl_related_01_1.jpg"
            },
            "PURE STRENGTH – LEG EXTENSION": {
                "link": "https://www.technogym.com/gb/leg-extension-purestrength-11.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG6500_purestrength_legextension_related_01_1.jpg"
            },
            "PURE STRENGTH - REAR KICK": {
                "link": "https://www.technogym.com/gb/rear-kick-purestrength-7.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG4000_purestrength_rearkick_related_01_20.jpg"
            },
            "PURE STRENGTH - LEG PRESS": {
                "link": "https://www.technogym.com/gb/leg-press-purestrength-9.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG5000_legpress_purestrenght_related_01_9.jpg"
            },
            "PURE STRENGTH - CHEST PRESS": {
                "link": "https://www.technogym.com/gb/chest-press-purestrength.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG0500_purestrength_widechestpress_related_01_18.jpg"
            },
            "PURE STRENGTH - INCLINE CHEST PRESS": {
                "link": "https://www.technogym.com/gb/chest-press-incline-purestrength-8.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG1500_purestrength_inclinechestpress_related_01_22.jpg"
            },
            "PURE STRENGTH - ADJUSTABLE BENCH": {
                "link": "https://www.technogym.com/gb/adjustable-bench-pure-benches-2.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/G/PG04_purestrength_adjustablebench_related_01_6.jpg"
            },
            "PURE STRENGTH - SCOTT BENCH": {
                "link": "https://www.technogym.com/gb/scott-bench-pure-benches-1.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/G/PG06_purestrength_scottbench_related_01_4.jpg"
            },
            "PURE STRENGTH – BICEPS": {
                "link": "https://www.technogym.com/gb/biceps-purestrength-11.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG6000_purestrength_biceps_related_01_1.jpg"
            },
            "PURE STRENGTH - FLAT BENCH": {
                "link": "https://www.technogym.com/gb/flat-bench-pure-benches-2.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/G/PG14_purestrength_flatbench_related_01_2.jpg"
            },
            "PURE STRENGTH - LOWER BACK BENCH": {
                "link": "https://www.technogym.com/gb/lower-back-bench-pure-benches-1.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/G/PG05_purestrength_lowerbackbench_related_01_5.jpg"
            },
            "PURE STRENGTH - ADJUSTABLE DECLINE/AB CRUNCH": {
                "link": "https://www.technogym.com/gb/adjust-decline-abdominal-crunch-pure-benches-1.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/G/PG03_purestrength_adjustabledeclineabcrunch_related_01_5.jpg"
            },
            "PURE STRENGTH - CALF": {
                "link": "https://www.technogym.com/gb/calf-purestrength-9.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG4500_purestrength_calf_related_01_22.jpg"
            },
            "PURE STRENGTH - PULLDOWN": {
                "link": "https://www.technogym.com/gb/pulldown-purestrength-9.html",
                "img": "https://www.technogym.com/skin/frontend/technogym/default/images/loading.gif"
            },
            "PURE STRENGTH - ROW": {
                "link": "https://www.technogym.com/gb/row-purestrength-5.html",
                "img": "https://www.technogym.com/skin/frontend/technogym/default/images/loading.gif"
            },
            "PURE STRENGTH - OLYMPIC INCLINE BENCH": {
                "link": "https://www.technogym.com/gb/olympic-incline-bench-pure-benches-1.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/G/PG01_purestrength_olympicinclinebench_related_01_5.jpg"
            },
            "OLYMPIC POWER RACK": {
                "link": "https://www.technogym.com/gb/olympic-power-rack.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/o/l/olympic_power_rack_pure_benches_related.jpg"
            },
            "PURE STRENGTH - OLYMPIC HALF RACK": {
                "link": "https://www.technogym.com/gb/olympic-half-rack-pure-benches.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/G/PG10_purestrength_olympichalfrack_related_01_3.jpg"
            },
            "PURE STRENGTH - OLYMPIC DECLINE BENCH": {
                "link": "https://www.technogym.com/gb/olympic-decline-bench-pure-benches-2.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/G/PG23_purestrength_olympicdeclinebench_related_01_5.jpg"
            },
            "PURE STRENGTH - WIDE CHEST PRESS": {
                "link": "https://www.technogym.com/gb/wide-chest-press-purestrength-5.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG1000_purestrength_widechestpress_related_01_19.jpg"
            },
            "PURE STRENGTH - SHOULDER PRESS": {
                "link": "https://www.technogym.com/gb/shoulder-press-purestrength-11.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG3500_purestrength_shoulderpress_related_01_26.jpg"
            },
            "PURE STRENGTH - OLYMPIC MILITARY BENCH": {
                "link": "https://www.technogym.com/gb/olympic-military-bench-pure-benches-1.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/G/PG08_purestrength_olympicmilitarybench_related_01_4.jpg"
            },
            "PURE STRENGTH - LOW ROW": {
                "link": "https://www.technogym.com/gb/low-row-purestrength-4.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG2500_purestrength_lowrow_related_01_18.jpg"
            },
            "PURE STRENGTH - OLYMPIC FLAT BENCH": {
                "link": "https://www.technogym.com/gb/olympic-flat-bench-pure-benches.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/G/PG07_purestrength_olympicflatbench_related_01_4.jpg"
            },
            "SELECTION - LEG PRESS MED": {
                "link": "https://www.technogym.com/gb/leg-press-selection-med.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C994_legpressmed_selectionmed_related_01.jpg"
            },
            "SELECTION - LEG EXTENSION MED": {
                "link": "https://www.technogym.com/gb/leg-extension-selection-med.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C996_legextension_selectionmed_related_01_2.jpg"
            },
            "SELECTION - LEG CURL MED": {
                "link": "https://www.technogym.com/gb/leg-curl-selection-med.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C995_legcurlmed_selectionmed_related_01.jpg"
            },
            "SKILLMILL™ CONSOLE": {
                "link": "https://www.technogym.com/gb/skillmill-console-1.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/c/o/console_related_1.jpg"
            },
            "ARKE™": {
                "link": "https://www.technogym.com/gb/arke-station.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/A/0/A0000598_arkesetholderwall_accessories_related_01_1.jpg"
            },
            "LEG RAISE DIP": {
                "link": "https://www.technogym.com/gb/leg-raise-dip.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/l/e/leg_raise_benches_related_1.jpg"
            },
            "ARKE™ - FOAM MAT": {
                "link": "https://www.technogym.com/gb/arke-foam-mat.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/f/o/foam_mat_related_1.jpg"
            },
            "ARKE™ - FOAM ROLLER": {
                "link": "https://www.technogym.com/gb/arke-foam-roller.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/f/o/foam_roller_related_1.jpg"
            },
            "SELECTION PRO - VERTICAL TRACTION": {
                "link": "https://www.technogym.com/gb/vertical-traction-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_vertical_traction_related_2.jpg"
            },
            "Kinesis® - CORE STATION": {
                "link": "https://www.technogym.com/gb/core-station-kinesis-station-89.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/H/MH65E_core_kinesisstations_related_01_1.jpg"
            },
            "Kinesis®  - STEP-SQUAT STATION": {
                "link": "https://www.technogym.com/gb/step-squat-kinesis-station-11.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/H/MH67E_stepsquat_kinesisstations_related_01_1.jpg"
            },
            "Kinesis® - PRESS STATION": {
                "link": "https://www.technogym.com/gb/press-kinesis-station-12.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/H/MH20E_press_kinesisstations_related_01.jpg"
            },
            "Kinesis® - LOW PULL STATION": {
                "link": "https://www.technogym.com/gb/low-pull-kinesis-station-26.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/H/MH95E_lowpull_kinesisstations_related_01.jpg"
            },
            "Kinesis® - OVERHEAD PRESS STATION": {
                "link": "https://www.technogym.com/gb/overhead-press-kinesis-station-85.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/H/MH15E_overheadpress_kinesisstations_related_01.jpg"
            },
            "Kinesis® - HIGH PULL STATION": {
                "link": "https://www.technogym.com/gb/high-pull-kinesis-station-60.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/H/MH30E_highpull_kinesisstations_related_01.jpg"
            },
            "OLYMPIC POWER BAR": {
                "link": "https://www.technogym.com/gb/olympic-power-bar.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/o/l/olympic_power_bar_related_1.jpg"
            },
            "OLYMPIC TRAINING PLATES SET": {
                "link": "https://www.technogym.com/gb/olympic-training-plates-set.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/p/l/plates_kit_related_2.jpg"
            },
            "SELECTION PRO - LOW ROW": {
                "link": "https://www.technogym.com/gb/low-row-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_low_row_related_1_1.jpg"
            },
            "SELECTION PRO - TOTAL ABDOMINAL": {
                "link": "https://www.technogym.com/gb/total-abdominal-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_total_abdominal_related_2.jpg"
            },
            "SELECTION PRO - PRONE LEG CURL": {
                "link": "https://www.technogym.com/gb/prone-leg-curl-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_prone_leg_curl_related_2.jpg"
            },
            "SELECTION PRO - REVERSE FLY": {
                "link": "https://www.technogym.com/gb/reverse-fly-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_reverse_fly_related_2.jpg"
            },
            "ELEMENT+ CRUNCH BENCH": {
                "link": "https://www.technogym.com/gb/crunch-bench-benches-2.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/A/PA03_crunchbench_element_related_01_7.jpg"
            },
            "CHROMED DUMBBELLS": {
                "link": "https://www.technogym.com/gb/chromed-dumbbell-1kg.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/K/A/KA01_related_01_2.jpg"
            },
            "CHROMED DUMBBELL RACK": {
                "link": "https://www.technogym.com/gb/chromed-dumbbell-rack.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/c/h/chromed_dumbbell_rack_related_1.jpg"
            },
            "UNIVERSAL STORAGE": {
                "link": "https://www.technogym.com/gb/universal-storage.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/u/n/universal_storage_related_1.jpg"
            },
            "DUMBBELL RACK": {
                "link": "https://www.technogym.com/gb/dumbbell-rack.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/d/u/dumbbell_rack_related.jpg"
            },
            "PLURIMA MULTISTATION - WALL": {
                "link": "https://www.technogym.com/gb/wall-plurima.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/F/MF30_wall_plurimamultistation_related_01_1.jpg"
            },
            "ELEMENT+ LOWER BACK BENCH": {
                "link": "https://www.technogym.com/gb/lower-back-bench-benches-2.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/A/PA05_lowerbackbench_element_related_01_1.jpg"
            },
            "SELECTION – UPPER BACK MED": {
                "link": "https://www.technogym.com/gb/upper-back-selection-med.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C946_upperbackmed_selectionmed_related_01.jpg"
            },
            "SELECTION – LAT MACHINE MED": {
                "link": "https://www.technogym.com/gb/lat-machine-selection-med.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C912_latmachinemed_selectionmed_related_01.jpg"
            },
            "SELECTION - ABDUCTOR MED": {
                "link": "https://www.technogym.com/gb/abductor-selection-med.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C918_abductormed_selectionmed_related_01.jpg"
            },
            "SELECTION – LOW ROW MED": {
                "link": "https://www.technogym.com/gb/low-row-selection-med.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C980_lowrowmed_selectionmed_related_01.jpg"
            },
            "ELEMENT+ LEG EXTENSION INCLUSIVE": {
                "link": "https://www.technogym.com/gb/leg-extension-element-inclusive.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/B/CB30_legextensioninclusive_elementinclusive_related_01.jpg"
            },
            "ELEMENT+ LEG CURL INCLUSIVE": {
                "link": "https://www.technogym.com/gb/leg-curl-element-inclusive.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/B/CB35_legcurlinclusive_elementinclusive_related_01.jpg"
            },
            "SELECTION - MULTI HIP MED": {
                "link": "https://www.technogym.com/gb/multi-hip-selection-med.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C967_multihipmed_selectionmed_related_01.jpg"
            },
            "SELECTION - ROTARY TORSO MED": {
                "link": "https://www.technogym.com/gb/rotary-torso-selection-med-1.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C950_rotarytorsomed_selectionmed_related_01.jpg"
            },
            "SELECTION - ADDUCTOR MED": {
                "link": "https://www.technogym.com/gb/adductor-selection-med.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C917_adductormed_selectionmed_related_01.jpg"
            },
            "ELEMENT+ ABDOMINAL CRUNCH": {
                "link": "https://www.technogym.com/gb/abdominal-crunch-element.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB65_abdominalcrunch_element_related_01.jpg"
            },
            "ELEMENT+ VERTICAL TRACTION": {
                "link": "https://www.technogym.com/gb/vertical-traction-element.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB25_verticaltraction_element_related_01.jpg"
            },
            "SELECTION - LOWER BACK MED": {
                "link": "https://www.technogym.com/gb/lower-back-selection-med-1.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C958_lowerbackmed_selectionmed_related_01.jpg"
            },
            "SELECTION – ABDOMINAL CRUNCH MED": {
                "link": "https://www.technogym.com/gb/abdominal-crunch-selection-med.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C957_abdominalcrunchmed_selectionmed_related_01.jpg"
            },
            "SELECTION – SHOULDER PRESS MED": {
                "link": "https://www.technogym.com/gb/shoulder-press-selection-med.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C969_shoulderpressmed_selectionmed_related_01.jpg"
            },
            "SELECTION - CHEST PRESS MED": {
                "link": "https://www.technogym.com/gb/chest-press-selection-med.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C970_chestpressmed_selectionmed_related_01.jpg"
            },
            "EXCITE® STEP": {
                "link": "https://www.technogym.com/gb/step-excite-1000.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_step_related_2.jpg"
            },
            "ELEMENT+ GLUTE": {
                "link": "https://www.technogym.com/gb/glute-element.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB75_glute_element_related_01.jpg"
            },
            "ELEMENT+ LOWER BACK": {
                "link": "https://www.technogym.com/gb/lower-back-element.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB45_lowerback_element_related_01_2.jpg"
            },
            "ELEMENT+ VERTICAL BENCH": {
                "link": "https://www.technogym.com/gb/vertical-bench-benches-4.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/A/PA02_verticalbench_element_related_01_1.jpg"
            },
            "PLURIMA MULTISTATION - SOLO": {
                "link": "https://www.technogym.com/gb/solo-leg-press-calf-plurima.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/F/MF20_solo_plurimamultistation_related_01_1.jpg"
            },
            "PLURIMA MULTISTATION - TOWER": {
                "link": "https://www.technogym.com/gb/tower-plurima.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/p/l/plurimatower_related.jpg"
            },
            "ELEMENT+ SCOTT BENCH": {
                "link": "https://www.technogym.com/gb/scott-bench-benches-5.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/A/PA06_scottbench_element_related_01_7.jpg"
            },
            "ELEMENT+ HORIZONTAL BENCH": {
                "link": "https://www.technogym.com/gb/horizontal-bench-benches-4.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/h/o/horizontal_bench_related_1.jpg"
            },
            "ELEMENT+ ADJUSTABLE BENCH": {
                "link": "https://www.technogym.com/gb/adjustable-bench-benches-6.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/A/PA04_adjustablebench_element_related_01_1.jpg"
            },
            "ELEMENT+ INCLINED BENCH": {
                "link": "https://www.technogym.com/gb/incline-bench-benches-4.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/A/PA01_inclinedbench_element_related_01_2.jpg"
            },
            "ELEMENT+ AB CRUNCH BENCH": {
                "link": "https://www.technogym.com/gb/abdominal-bench-benches-2.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/A/PA10_abcrunchbench_element_related_01_1.jpg"
            },
            "ELEMENT+ LOW ROW": {
                "link": "https://www.technogym.com/gb/low-row-element.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB95_lowrow_element_related_01.jpg"
            },
            "PLURIMA MULTISTATION - TWIN": {
                "link": "https://www.technogym.com/gb/twin-press-overhead-core-plurima.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/F/MF65_pressoverheadcore_plurimamultistation_related_01_1.jpg"
            },
            "ELEMENT+ CHEST PRESS INCLUSIVE": {
                "link": "https://www.technogym.com/gb/chest-press-element-inclusive.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/B/CB20_chestpressinclusive_elementinclusive_related_01.jpg"
            },
            "ELEMENT+ LEG PRESS INCLUSIVE": {
                "link": "https://www.technogym.com/gb/leg-press-element-inclusive.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/B/CB50_legpress_element_related_01.jpg"
            },
            "ELEMENT+ LOW ROW INCLUSIVE": {
                "link": "https://www.technogym.com/gb/low-row-element-inclusive.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/B/CB95_lowrowinclusive_elementinclusive_related_01.jpg"
            },
            "ELEMENT+ SHOULDER PRESS INCLUSIVE": {
                "link": "https://www.technogym.com/gb/shoulder-press-element-inclusive.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/B/CB15_shoulderpressinclusive_elementinclusive_related_01.jpg"
            },
            "FLEXABILITY™ ANTERIOR - WOOD VERSION": {
                "link": "https://www.technogym.com/gb/anterior-wood-flexability.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/E/ME15_flexability-woodant_antrancite-black_related_1.jpg"
            },
            "PLURIMA MULTISTATION - TWIN WITH LEG PRESS": {
                "link": "https://www.technogym.com/gb/twin-high-low-pull-leg-press-plurima.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/F/MF70_wallwithlegpress_plurimamultistation_related_01_1.jpg"
            },
            "FLEXABILITY™ POSTERIOR - WOOD VERSION": {
                "link": "https://www.technogym.com/gb/posterior-wood-flexability.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/E/ME20_flexability-woodpost_antrancite-black_related_1.jpg"
            },
            "WELLNESS BAG": {
                "link": "https://www.technogym.com/gb/wellness-bag.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/w/e/wellnessbag_wellnesstools_related_1_1.jpg"
            },
            "SELECTION PRO - ARM CURL": {
                "link": "https://www.technogym.com/gb/arm-curl-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_arm_curl_related_1_1.jpg"
            },
            "BENCH PERSONAL ": {
                "link": "https://www.technogym.com/gb/bench-home-personal.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/p/o/power_personal_bench_related_1.jpg"
            },
            "RACK PERSONAL ": {
                "link": "https://www.technogym.com/gb/rack-home-personal.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/p/o/power_personal_rack_related_1.jpg"
            },
            "POWER PERSONAL EXCELLENCE": {
                "link": "https://www.technogym.com/gb/power-personal-excellence-kit.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/p/o/power_personal_kit_excellence_related_1.jpg"
            },
            "POWER PERSONAL SUPERIOR": {
                "link": "https://www.technogym.com/gb/power-personal-superior-kit.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/p/o/power_personal_kit_superior_related_1.jpg"
            },
            "SELECTION PRO - DELTS MACHINE": {
                "link": "https://www.technogym.com/gb/delts-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_delts_machine_related_1_1.jpg"
            },
            "SELECTION PRO - LEG EXTENSION": {
                "link": "https://www.technogym.com/gb/leg-extension-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_leg_extension_related_1_1.jpg"
            },
            "Excite® Climb LED": {
                "link": "https://www.technogym.com/gb/climb-excite-led.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_climb_advanced_led_related_2.jpg"
            },
            "Excite® Climb TV": {
                "link": "https://www.technogym.com/gb/climb-excite-tv.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_climb_tv_related_3.jpg"
            },
            "WELLNESS WEIGHTS": {
                "link": "https://www.technogym.com/gb/wellness-weights.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/w/e/wellness_weights_related_2.jpg"
            },
            "FREE WEIGHTS - KETTLEBELLS": {
                "link": "https://www.technogym.com/gb/kettlebell.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/v/i/vinyl_coated_kettlebell_related_1.jpg"
            },
            "Kinesis® - ONE": {
                "link": "https://www.technogym.com/gb/one-kinesis.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/5/M5800_kinesisone_kinesis_related_01_1.jpg"
            },
            "WELLNESS BALL™ TRAINING": {
                "link": "https://www.technogym.com/gb/wellness-ball-training.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/f/i/fitness_ball_related_2.jpg"
            },
            "POWER PERSONAL ESSENTIAL": {
                "link": "https://www.technogym.com/gb/power-personal-essential-kit.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/p/o/power_personal_kit_essential_related_1.jpg"
            },
            "Kinesis Class": {
                "link": "https://www.technogym.com/gb/kinesis-class.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/k/i/kinesis_class_related.jpg"
            },
            "WELLNESS PAD": {
                "link": "https://www.technogym.com/gb/wellness-pad.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/A/0/A0000163AA_wellnesspad_wellnesstools_related_01_3_1.jpg"
            },
            "WELLNESS RACK": {
                "link": "https://www.technogym.com/gb/wellness-rack.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/A/0/A0000125AA_wellnessrack_wellnesstools_related_01_1.jpg"
            },
            "SELECTION PRO - LEG CURL": {
                "link": "https://www.technogym.com/gb/leg-curl-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_leg_curl_related_1_1.jpg"
            },
            "ELEMENT+ LEG EXTENSION": {
                "link": "https://www.technogym.com/gb/leg-extension-element.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB30_legextension_element_related_01.jpg"
            },
            "FREE WEIGHTS - URETHANE DUMBBELLS": {
                "link": "https://www.technogym.com/gb/urethane-dumbbell.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/d/u/dumbbellsracks_freeweights_related_01.jpg"
            },
            "SELECTION - VERTICAL TRACTION MED": {
                "link": "https://www.technogym.com/gb/vertical-traction-selection-med.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C971_verticaltractionmed_selectionmed_related_01.jpg"
            },
            "SELECTION PRO - ADDUCTOR": {
                "link": "https://www.technogym.com/gb/adductor-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_adductor_related_1_1.jpg"
            },
            "SELECTION PRO - PULLEY": {
                "link": "https://www.technogym.com/gb/pulley-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_pulley_related_1_1.jpg"
            },
            "SELECTION PRO - PULLDOWN": {
                "link": "https://www.technogym.com/gb/pulldown-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_pulldown_related_2.jpg"
            },
            "SELECTION PRO - UPPER BACK": {
                "link": "https://www.technogym.com/gb/upper-back-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_upper_back_related_1_1.jpg"
            },
            "SELECTION PRO - ARM EXTENSION": {
                "link": "https://www.technogym.com/gb/arm-extension-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_arm_extention_related_1.jpg"
            },
            "SELECTION PRO - ABDUCTOR": {
                "link": "https://www.technogym.com/gb/abductor-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_abductor_related_1_1.jpg"
            },
            "SELECTION PRO - PECTORAL": {
                "link": "https://www.technogym.com/gb/pectoral-machine-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_pectoral_related_2.jpg"
            },
            "EXCITE VARIO MED": {
                "link": "https://www.technogym.com/gb/excite-vario-med.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/v/a/vario_excite_medical_related_1.jpg"
            },
            "SELECTION PRO - LAT MACHINE": {
                "link": "https://www.technogym.com/gb/lat-machine-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_lat_machine_related_2.jpg"
            },
            "SELECTION PRO - MULTIPOWER": {
                "link": "https://www.technogym.com/gb/multipower-selection-1.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_multipower_related_2.jpg"
            },
            "EXCITE® RUN 1000": {
                "link": "https://www.technogym.com/gb/treadmill-excite-1000.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_run_1000_related_2.jpg"
            },
            "EXCITE® VARIO": {
                "link": "https://www.technogym.com/gb/vario-excite-1000.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_vario_related_2.jpg"
            },
            "EXCITE® RUN 600": {
                "link": "https://www.technogym.com/gb/treadmill-excite-600.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_run_600_related_2.jpg"
            },
            "EXCITE RUN 600 MED": {
                "link": "https://www.technogym.com/gb/excite-treadmill-run-600-med.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/t/r/treadmill_excite_600_medical_related_1.jpg"
            },
            "SELECTION PRO - ROTARY TORSO": {
                "link": "https://www.technogym.com/gb/rotary-torso-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_rotary_torso_related_2.jpg"
            },
            "EXCITE RECLINE MED": {
                "link": "https://www.technogym.com/gb/excite-recline-med.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/r/e/recline_excite_medical_related_1.jpg"
            },
            "ELEMENT+ ADDUCTOR": {
                "link": "https://www.technogym.com/gb/adductor-element.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/a/d/adductor_element_related_01.jpg"
            },
            "EXCITE BIKE MED": {
                "link": "https://www.technogym.com/gb/excite-bike-med.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/b/i/bike_excite_medical_related_1.jpg"
            },
            "SELECTION PRO - LOWER BACK": {
                "link": "https://www.technogym.com/gb/lower-back-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_lower_back_related_1_1.jpg"
            },
            "SELECTION PRO - ABDOMINAL CRUNCH": {
                "link": "https://www.technogym.com/gb/abdominal-crunch-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_abdominal_crunch_related_2.jpg"
            },
            "SELECTION PRO - LEG PRESS": {
                "link": "https://www.technogym.com/gb/leg-press-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_leg_press_related_1_1.jpg"
            },
            "SELECTION PRO - MULTI HIP": {
                "link": "https://www.technogym.com/gb/multi-hip-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_multi_hip_related_1_1.jpg"
            },
            "ARTIS® - LOW ROW": {
                "link": "https://www.technogym.com/gb/artis-low-row.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/l/o/lowrow_artis_related_9.jpg"
            },
            "ARTIS® - TOTAL ABDOMINAL": {
                "link": "https://www.technogym.com/gb/artis-total-abdominal.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/t/o/totalabdominal_artis_related_9.jpg"
            },
            "ARTIS® - LEG CURL": {
                "link": "https://www.technogym.com/gb/artis-leg-curl.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/l/e/leg_curl_artis_related_9.jpg"
            },
            "ARTIS® - LEG EXTENSION": {
                "link": "https://www.technogym.com/gb/artis-leg-extension.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/l/e/leg_ext_artis_related_9.jpg"
            },
            "ARTIS® - VERTICAL TRACTION": {
                "link": "https://www.technogym.com/gb/artis-vertical.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/v/e/vertical_artis_related_9.jpg"
            },
            "ARTIS® - CHEST PRESS": {
                "link": "https://www.technogym.com/gb/artis-chest.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/c/h/chest_artis_related_9.jpg"
            },
            "ARTIS® - LEG PRESS": {
                "link": "https://www.technogym.com/gb/artis-leg-press.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/l/e/legpress_artis_related_9.jpg"
            },
            "ARTIS® - LOWER BACK": {
                "link": "https://www.technogym.com/gb/artis-lower-back.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/l/o/lowerback_artis_related_9.jpg"
            },
            "ARTIS® - MULTI HIP": {
                "link": "https://www.technogym.com/gb/artis-multi-hip.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/m/u/multihip_artis_related_9.jpg"
            },
            "ARTIS® - SHOULDER PRESS": {
                "link": "https://www.technogym.com/gb/artis-shoulder.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/h/shoulder_artis_related_9.jpg"
            },
            "ARTIS® - ARM CURL": {
                "link": "https://www.technogym.com/gb/artis-arm-curl.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/a/r/arm_curl_artis_related_9.jpg"
            },
            "EXCITE® SYNCHRO": {
                "link": "https://www.technogym.com/gb/synchro-excite-1000.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_synchro_related_2.jpg"
            },
            "UNITY™ SELF - GROUP CYCLE APP": {
                "link": "https://www.technogym.com/gb/unity-self.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/u/n/unity-self-intero-gc-ok2_hero_ok.jpg"
            },
            "PURE STRENGTH – LINEAR LEG PRESS ": {
                "link": "https://www.technogym.com/gb/linear-leg-press-purestrength-1.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG7500_purestrength_linearlegpress_related_01_1.jpg"
            },
            "EXCITE® RECLINE": {
                "link": "https://www.technogym.com/gb/recline-excite-1000.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_recline_related_2.jpg"
            },
            "EXCITE® TOP": {
                "link": "https://www.technogym.com/gb/top-excite-1000.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_top_related_2.jpg"
            },
            "EXCITE® BIKE": {
                "link": "https://www.technogym.com/gb/bike-excite-1000.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_bike_related_2.jpg"
            },
            "ARTIS® - ROTARY TORSO": {
                "link": "https://www.technogym.com/gb/artis-rotary-torso.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/r/o/rotary_artis_related_9.jpg"
            },
            "ARTIS® - REAR DELT ROW": {
                "link": "https://www.technogym.com/gb/artis-rear-delt-row.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/r/e/reardeltrow_artis_related_9.jpg"
            },
            "ARTIS® - SQUAT": {
                "link": "https://www.technogym.com/gb/artis-squat.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/q/squat_artis_related_9.jpg"
            },
            "ARTIS® - ADDUCTOR": {
                "link": "https://www.technogym.com/gb/artis-adductor.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/a/d/adductor_artis_related_1.jpg"
            },
            "ARTIS® - ABDUCTOR": {
                "link": "https://www.technogym.com/gb/artis-abductor.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/a/b/abductor_artis_related_9.jpg"
            },
            "ARTIS® - ARM EXTENSION": {
                "link": "https://www.technogym.com/gb/artis-arm-extension.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/a/r/arm_ext_artis_related_9.jpg"
            },
            "ARTIS® - PECTORAL": {
                "link": "https://www.technogym.com/gb/artis-pectoral-machine.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/p/e/pectoral_artis_related_9.jpg"
            },
            "ARTIS® LAT MACHINE": {
                "link": "https://www.technogym.com/gb/artis-lat-machine.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/l/a/latmachine_artis_related_9.jpg"
            },
            "ELEMENT+ ABDUCTOR": {
                "link": "https://www.technogym.com/gb/abductor-element.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/a/b/abductor_element_related_01_1.jpg"
            },
            "ELEMENT+ PECTORAL": {
                "link": "https://www.technogym.com/gb/pectoral-machine-element.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB70_pectoral_element_related_01.jpg"
            },
            "CABLE STATIONS - DUAL ADJUSTABLE PULLEY": {
                "link": "https://www.technogym.com/gb/cable-stations-dual-adjustable-pulley.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB430_dualadjustablepulley_cablestation_related_01_3.jpg"
            },
            "ELEMENT+ LEG PRESS": {
                "link": "https://www.technogym.com/gb/leg-press-element.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB50_legpress_element_related_01.jpg"
            },
            "ELEMENT+ ARM CURL": {
                "link": "https://www.technogym.com/gb/arm-curl-element.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB55_armcurl_element_related_01.jpg"
            },
            "ELEMENT+ LEG CURL": {
                "link": "https://www.technogym.com/gb/leg-curl-element.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB35_legcurl_element_related_01.jpg"
            },
            "ELEMENT+ SHOULDER PRESS": {
                "link": "https://www.technogym.com/gb/shoulder-press-element.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB15_shoulderpress_element_related_01.jpg"
            },
            "ELEMENT+ CHEST PRESS": {
                "link": "https://www.technogym.com/gb/chest-press-element.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB20_chestpress_element_related_01.jpg"
            },
            "ELEMENT+ ARM EXTENSION": {
                "link": "https://www.technogym.com/gb/arm-extension-element.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB60_armextension_element_related_01.jpg"
            },
            "CABLE STATIONS – ERCOLINA  ": {
                "link": "https://www.technogym.com/gb/cable-stations-ercolina.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB80_ercolina_element_related_01_3.jpg"
            },
            "CABLE STATIONS - ERCOLINA REHAB": {
                "link": "https://www.technogym.com/gb/cable-stations-ercolina-rehab.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB90_ercolinarehab_element_related_01.jpg"
            },
            "PURE STRENGTH – SEATED DIP": {
                "link": "https://www.technogym.com/gb/seated-dip-purestrength-12.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG5500_purestrength_seateddip_related_01_1.jpg"
            },
            "ELEMENT+ LAT MACHINE": {
                "link": "https://www.technogym.com/gb/lat-machine-element-19.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB40_latmachine_element_related_01.jpg"
            },
            "ELEMENT+ MULTIPOWER": {
                "link": "https://www.technogym.com/gb/multipower-element-1.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB83_multipower_element_related_01_2.jpg"
            },
            "SELECTION PRO - CHEST PRESS": {
                "link": "https://www.technogym.com/gb/chest-press-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_chest_press_related_2.jpg"
            },
            "SELECTION PRO - SHOULDER PRESS": {
                "link": "https://www.technogym.com/gb/shoulder-press-selection-pro.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_shoulder_press_related_2.jpg"
            },
            "EXCITE SYNCHRO MED": {
                "link": "https://www.technogym.com/gb/excite-synchro-med.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/y/synchro_excite_medical_related_1.jpg"
            },
            "SKILLMILL™ GO": {
                "link": "https://www.technogym.com/gb/skillmill-go-1.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/g/o/go_related_1.jpg"
            },
            "FLEXABILITY™ POSTERIOR": {
                "link": "https://www.technogym.com/gb/posterior-flexability.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/f/l/flexability_posterior_black_related.jpg"
            },
            "EXCITE RUN 1000 MED": {
                "link": "https://www.technogym.com/gb/excite-treadmill-run-1000-med.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/t/r/treadmill_excite_1000_medical_related_1.jpg"
            },
            "FLEXABILITY™ ANTERIOR": {
                "link": "https://www.technogym.com/gb/anterior-flexability.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/f/l/flexability_anterior_black_related.jpg"
            },
            "ARTIS® - RECLINE": {
                "link": "https://www.technogym.com/gb/artis-recline-standard.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/r/e/recline_artis_related_9.jpg"
            },
            "ARTIS® - SYNCHRO": {
                "link": "https://www.technogym.com/gb/artis-synchro-standard.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/y/synchro_artis_related_9.jpg"
            },
            "OMNIA™ - OMNIA⁸": {
                "link": "https://www.technogym.com/gb/omnia-8-omnia-1.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/J/MJ05E_omnia8_omnia_related_1.jpg"
            },
            "OMNIA™ - OMNIA³ STRAIGHT PULL UP BAR": {
                "link": "https://www.technogym.com/gb/omnia-3-straight-pull-up-bar-omnia.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/J/MJ15E_artis_omnia_an.440_related_1.jpg"
            },
            "OMNIA™ - OMNIA³ DUAL LIFT BAR": {
                "link": "https://www.technogym.com/gb/omnia-3-dual-lift-omnia-1.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/J/MJ20E_artis_omnia_an.442_related_1.jpg"
            },
            "OMNIA™ - OMNIA³ MULTIANGLE PULL UP BAR": {
                "link": "https://www.technogym.com/gb/omnia-3-multiangle-pull-up-bar-omnia.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/J/MJ10E_omnia3_omnia_multiang_related_1.jpg"
            },
            "UNITY™ SELF - SKILLMILL™ APP": {
                "link": "https://www.technogym.com/gb/unity-self-skillmill.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/u/n/unity_related_ok.jpg"
            },
            "SKILLROW™": {
                "link": "https://www.technogym.com/gb/skillrow.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/k/skillrow_related_8.jpg"
            },
            "SKILLROW™ Professional App": {
                "link": "https://www.technogym.com/gb/skillrow-professional-app.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/u/n/unity_self_skillrow_related_1.jpg"
            },
            "ARTIS® - BIKE": {
                "link": "https://www.technogym.com/gb/artis-bike-standard.html",
                "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/b/i/bike_artis_related_9.jpg"
            }
        };

        var prodNameInputValue = $('#product-name').val();
        if (prodNameInputValue) {
            $('.TG016_headerWrapper').append([
                '<p class="TG016_productTitle"></p>',
                '<div class="TG016_img_container"><img src="#"></div>'
            ].join(''));
            var $productTitle = $('.TG016_productTitle');
            $productTitle.text(prodNameInputValue);
            // If basically previous page was a product page (which is going to happen at least 99% of the time anyway?)
            // Insert the hardcoded image for the product with the name in the 'PRODUCT NAME' input (which needs to match a property with the same value in the hardcodedImages object)
            if (hardcodedImages.hasOwnProperty(prodNameInputValue)) {
                var $imgContainer = $('.TG016_img_container > img');
                $imgContainer.prop('src', hardcodedImages[prodNameInputValue].img);
            } else {
                $('.TG016_img_container').remove();
            }
        }

        sendEvent('TG016', 'Page View', 'TG016 - Mobile Contact Form Redesign');

    } // activate

})(); // _TG016