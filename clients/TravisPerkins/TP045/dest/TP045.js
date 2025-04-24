var _TP045 = (function () {

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
        function () {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
        }
    ], function () {
        window.FS.setUserVars({
            experiment_str: 'TP045',
            variation_str: 'Variation 1 Desktop'
        });
    }, {multiplier: 1.2, timeout: 0});

    // Triggers ------------------------------------
    // ---------------------------------------------
    var _triggers = (function () {
        UC.poller([
            '.change-postcode.cboxElement',
            function () {
                return window.jQuery
            },
            function () {
                return window.ga
            }
        ], function () {
            // Prevent script from running twice on same page
            if ($('body').hasClass('TP045')) {
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
        $body.addClass('TP045');

        if ($('.empty_basket_title').is(":visible")) {
            return;
        }

        var $allDeliveryWrapper = $('.baskt_items_wrap .all-delivery .delivery-order-groups .delivery-order-group').children();

        // Date stuff - static (today and tomorrow) -
        var $todayDate = new Date();
        var $tomorrowDate = new Date();
        $tomorrowDate.setDate($todayDate.getDate()+1); // 1
        $tomorrowDateFix = $tomorrowDate.setHours(0,0,0,0);
        var nextDayInBasket = false;

        $allDeliveryWrapper.each(function(i) {
            var $this = $(this);
            var $thisDeliveryWrapper = $this.find('.itm_time');

            $('<div class="TP045_thisDeliveryWrapper"></div>').prependTo($thisDeliveryWrapper);
            $('<div class="TP045_freeDeliveryMessage"></div>').insertBefore($thisDeliveryWrapper.find('.TP045_thisDeliveryWrapper'));

            var $deliveryDateString = $thisDeliveryWrapper.find('.delivery-date').text();

            $('.all-delivery .consignment-header .delivery-type-wrapper')
                .clone()
                .prependTo($thisDeliveryWrapper.find('.TP045_thisDeliveryWrapper'));

            $('.all-delivery .consignment-header .change-postcode.cboxElement')
                .clone()
                .insertAfter($thisDeliveryWrapper.find('.delivery-type-wrapper'));

            var $deliveryDateFormat = new Date($deliveryDateString);
            var $deliveryDateFormatFix = $deliveryDateFormat.setHours(0,0,0,0);

            if ($deliveryDateFormatFix === $tomorrowDateFix) {
                $thisDeliveryWrapper.find('.delivery-date')
                    .prepend('<i>Estimated tomorrow</i> (')
                    .append(') if you order in the next <span class="TP045_timer"></span>')
                    .appendTo($thisDeliveryWrapper.find('.TP045_thisDeliveryWrapper'));
                $thisDeliveryWrapper.find('.TP045_freeDeliveryMessage').prepend('<i class="fa fa-check"></i><i class="fa fa-check"></i> FREE next day delivery');

                nextDayInBasket = true;

                // Time left till next day delivery
                //var timeDiff = Math.abs($deliveryDateFormat.getTime() - $todayDate.getTime());
                //var diffHours = Math.floor(timeDiff / (1000 * 3600));
                //$thisDeliveryWrapper.find('.delivery-date').find('.TP045_timer').text(diffHours + 15 + " hours"); // 5PM est
            } else {
                $thisDeliveryWrapper.find('.delivery-date')
                    .prepend('<i>Estimated</i> ')
                    .appendTo($thisDeliveryWrapper.find('.TP045_thisDeliveryWrapper'));
                $thisDeliveryWrapper.find('.TP045_freeDeliveryMessage').prepend('<i class="fa fa-check"></i> FREE standard delivery');
            }

        });


        // If there's an item with next day delivery in the basket, set a countdown timer to run on all .TP045_timer elements
        if (nextDayInBasket) {
            var UC = UC || {};
            // UC Library - Countdown -- @version 0.3.4
            UC.countdown=function(e){function t(e){var t=function(){return o[e.getDay()]},a=function(){return c.indexOf(t())>-1};if(a())for(;a();)e.setDate(e.getDate()+1);return e}if(!$)return!1;var a={cutoff:null,element:null,labels:{d:"days",h:"hours",m:"minutes",s:"seconds"},delivery:{deliveryDays:null,excludeDays:null,deliveryDayElement:null,tomorrowLabel:!1}},r=function(e,t){var a,n;for(var l in t)a=e[l],n=t[l],Object.keys&&-1===Object.keys(e).indexOf(l)||("object"==typeof n?"[object Array]"===Object.prototype.toString.call(n)?e[l]=n:r(a,n):e[l]=n)};r(a,e);var n=new Date,l=new Date(a.cutoff),o=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],s=a.delivery,u=s.deliveryDays,c=s.excludeDays,d=s.deliveryDayElement,i={};n>l&&(l.setDate(l.getDate()+1),l=t(l)),i.cutoff=l.getTime();var y=Math.floor((l.getTime()-n.getTime())/1e3),f=document.querySelectorAll(a.element),D=setInterval(function(){var e=Math.floor(y/24/60/60),t=Math.floor(y-86400*e),r=Math.floor(t/3600),n=Math.floor(t-3600*r),l=Math.floor(n/60),o=y%60;o<10&&(o="0"+o);for(var s=0,u=f.length;s<u;s++)f[s].innerHTML=[e>0?'<span class="UC_cd-days">'+e+"</span> "+a.labels.d+" ":"",'<span class="UC_cd-hours">'+r+"</span> "+a.labels.h+" ",'<span class="UC_cd-minutes">'+l+"</span> "+a.labels.m+" ",'<span class="UC_cd-seconds">'+o+"</span> "+a.labels.s+" "].join("");0===y?clearInterval(D):y--},1e3);if(u){var v=function(){var e=new Date;return e.setDate(l.getDate()+u),e=t(e)}(),g=document.querySelectorAll(d),m=o[v.getDay()];if(s.tomorrowLabel){var h=new Date(n);h.setDate(h.getDate()+1),h.getFullYear()==v.getFullYear()&&h.getMonth()==v.getMonth()&&h.getDate()==v.getDate()&&(m="tomorrow")}for(var b=0,p=g.length;b<p;b++)g[b].innerHTML=m;i.deliveryDate=v.getTime(),i.deliveryDay=m}return i};

            // Create cutoff date and convert to ms since epoch with getTime
            var cutoff = new Date();
            cutoff.setUTCHours(17, 0, 0); // 5PM UTC / 6PM BST
            cutoff = cutoff.getTime();

            var countdown = UC.countdown({
                cutoff: cutoff,
                element: '.TP045_timer'
            });
        }



        $('<i class="fa fa-circle"></i>').appendTo('.TP045_thisDeliveryWrapper');

        $('.TP045_thisDeliveryWrapper .change-postcode').click(function(e){
            e.preventDefault();
            $('.consignment-header > .change-postcode').trigger('click');
        });

        sendEvent('TP045', 'Page View', 'TP045 - Next Day Delivery at Basket', true);

    } // activate

}()); // _TP045