var _SO007 = (function() {
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    // UC Library - Countdown -- @version 0.3.4
    UC.countdown=function(e){function t(e){var t=function(){return o[e.getDay()]},a=function(){return c.indexOf(t())>-1};if(a())for(;a();)e.setDate(e.getDate()+1);return e}if(!$)return!1;var a={cutoff:null,element:null,labels:{d:"days",h:"hours",m:"minutes",s:"seconds"},delivery:{deliveryDays:null,excludeDays:null,deliveryDayElement:null,tomorrowLabel:!1}},r=function(e,t){var a,n;for(var l in t)a=e[l],n=t[l],Object.keys&&-1===Object.keys(e).indexOf(l)||("object"==typeof n?"[object Array]"===Object.prototype.toString.call(n)?e[l]=n:r(a,n):e[l]=n)};r(a,e);var n=new Date,l=new Date(a.cutoff),o=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],s=a.delivery,u=s.deliveryDays,c=s.excludeDays,d=s.deliveryDayElement,i={};n>l&&(l.setDate(l.getDate()+1),l=t(l)),i.cutoff=l.getTime();var y=Math.floor((l.getTime()-n.getTime())/1e3),f=document.querySelectorAll(a.element),D=setInterval(function(){var e=Math.floor(y/24/60/60),t=Math.floor(y-86400*e),r=Math.floor(t/3600),n=Math.floor(t-3600*r),l=Math.floor(n/60),o=y%60;o<10&&(o="0"+o);for(var s=0,u=f.length;s<u;s++)f[s].innerHTML=[e>0?'<span class="UC_cd-days">'+e+"</span> "+a.labels.d+" ":"",'<span class="UC_cd-hours">'+r+"</span> "+a.labels.h+" ",'<span class="UC_cd-minutes">'+l+"</span> "+a.labels.m+" ",'<span class="UC_cd-seconds">'+o+"</span> "+a.labels.s+" "].join("");0===y?clearInterval(D):y--},1e3);if(u){var v=function(){var e=new Date;return e.setDate(l.getDate()+u),e=t(e)}(),g=document.querySelectorAll(d),m=o[v.getDay()];if(s.tomorrowLabel){var h=new Date(n);h.setDate(h.getDate()+1),h.getFullYear()==v.getFullYear()&&h.getMonth()==v.getMonth()&&h.getDate()==v.getDate()&&(m="tomorrow")}for(var b=0,p=g.length;b<p;b++)g[b].innerHTML=m;i.deliveryDate=v.getTime(),i.deliveryDay=m}return i};

    // Triggers
    UC.poller([
        'body',
        '#cart-totals',
        '.grand.totals',
        '.page-title-wrapper',
        '.data.table.totals',
        function () {
            if (window.jQuery) return true;
        },
        function () {
            if (window.ga) return true;
        }
    ], SO007, {
        timeout: 7000,
        multiplier: 0
    });

    function SO007() {
        var $ = window.jQuery;

        $('body').addClass('SO007');
        UC.poller([
            function () {
                var fs = window.FS;
                if (fs && fs.setUserVars) return true;
            }
        ], function () {
            window.FS.setUserVars({
                experiment_str: 'SO007',
                variation_str: 'Variation 1'
            });
        }, {
            multiplier: 1.2,
            timeout: 0
        });

        /*-------------------------------
        Countdown
        ---------------------------------*/

        var countdown = $('<div class="so7-countDown">Stock is reserved and items are held in your basket for <span class="so7-countdownTimer"></div>');
        countdown.insertAfter('.page-title-wrapper');

        // UC Library - Countdown implement -------------
        // Create cutoff date and convert to ms since epoch with getTime
        var timeToCountdown = 90 * 60 * 1000;

        var numMilliseondsSinceEpoch = (new Date()).getTime();
        var targetDateMilliseconds = numMilliseondsSinceEpoch + timeToCountdown;

        if(!localStorage.getItem('so-target-time')) {
            localStorage.setItem('so-target-time', targetDateMilliseconds);
        } else {
            var storedTime = parseInt(localStorage.getItem('so-target-time'));
            if(storedTime && (storedTime - (new Date()).getTime()) > 30) {
                targetDateMilliseconds = parseInt(storedTime);
            } else {
                localStorage.setItem('so-target-time', targetDateMilliseconds);
            }
        }

        UC.countdown({
            cutoff: targetDateMilliseconds,
            element: '.so7-countdownTimer',
            labels: { // Custom labels
                d: 'days',
                h: 'hrs',
                m: 'mins',
                s: 'secs'
            }
        });

        /*-------------------------------
        Delivery Messages
        ---------------------------------*/
        var pollerOpts = {
            timeout: 8000,
            multiplier: 0
        };

        UC.poller(['.grand.totals'], function () {
            var basketPrice = $('.data.table.totals .grand.totals .amount .price').text().replace('£', '');
            var basketNumber = parseFloat(basketPrice);

            var difference = 50.00 - basketNumber;

            var under50freedeliv = $('<div class="so7-spend50">Spend <span>£' + difference + '</span> more to qualify for <strong>FREE</strong> delivery</div>'),
                deliveryAmount = $(['<span class="so7-delivery">',
                    '<h4>Delivery - £4.95</h4>',
                    '<p>(UK - Standard - 3 to 5 working days - UK Mainland. Non-UK Mainland charges may apply) </p>',
                    '</span>'
                ].join(''));

            var freeDelivery = $([
                '<tr class="so7-freedelivery">',
                '<th class="mark" scope="row">',
                '<strong>Delivery</strong>',
                '</th>',
                '<td class="so7-freedeliveryamount">',
                '<strong>',
                '<span>Free</span>',
                '</strong>',
                '</td>',
                '</tr>'
            ].join(''));
            if (basketNumber < 50.00) {
                under50freedeliv.insertAfter('#cart-totals');
                deliveryAmount.insertBefore(under50freedeliv);
            } else {
                freeDelivery.insertBefore('.grand.totals');
            }
        }, pollerOpts);

    }
})();
