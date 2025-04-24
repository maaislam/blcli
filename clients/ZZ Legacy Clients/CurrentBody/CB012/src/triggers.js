/* eslint-disable */
/* no_doc_ready */

var _CB012 = (function($) { 
  $('head').append('<style id="UCcall_hide">.header-container{visibility:hidden}</style>');
  setTimeout(function() {
    $('#UCcall_hide').remove();
  }, 4000);
  // UC Poller 
  // @version 0.2.1
  var UC={now:Date.now||function(){return(new Date).getTime()},poller:function(a,b,c){var d={wait:50,multiplier:1.1,timeout:null};c||(c=d);for(var e=c.timeout?new Date(UC.now()+c.timeout):d.timeout,f=c.wait?c.wait:d.wait,g=c.multiplier?"disable"===c.multiplier?0:c.multiplier:d.multiplier,h=[],j=function(c,d){if(e&&UC.now()>e)return!1;d=d||f;var i="function"==typeof c?c():$(c).length>0;i?(h.push(!0),h.length===a.length&&b()):setTimeout(function(){j(c,d*g)},d)},k=0;k<a.length;k++)j(a[k])},throttle:function(a,b,c){var d,e,f,g=null,h=0;c||(c={});var i=function(){h=c.leading===!1?0:UC.now(),g=null,f=a.apply(d,e),g||(d=e=null)};return function(){var j=UC.now();h||c.leading!==!1||(h=j);var k=b-(j-h);return d=this,e=arguments,k<=0||k>b?(g&&(clearTimeout(g),g=null),h=j,f=a.apply(d,e),g||(d=e=null)):g||c.trailing===!1||(g=setTimeout(i,k)),f}},group:function(a,b){for(var c=[],d=0;d<a.length;d+=b)c.push(a.slice(d,d+b));return c},hoverDelay:function(a,b,c){var d,e;c||(c=1e3),$(a).hover(function(){e=UC.now()},function(){if(!d){var a=UC.now(),f=a-e;f>=c&&(b(),d=!0)}})},observer:{active:[],connect:function(a,b,c){var d={throttle:1e3,config:{attributes:!0,childList:!0,subTree:!1}};c||(c=d);for(var h,e=a,f=c.throttle?"disable"===c.throttle?0:c.throttle:d.throttle,g=c.config?c.config:d.config,i=new MutationObserver(function(a){a.forEach(function(a){h||(h=!0,b(),setTimeout(function(){h=!1},f))})}),j=0;j<e.length;j++)i.observe(e[j],g),this.active.push([e[j],i])},disconnect:function(a){for(var c=this.active,d=0;d<a.length;d++)for(var e=a[d],f=0;f<c.length;f++)e===c[f][0]&&c[f][1].disconnect()}}};
    
    // Triggers
    UC.poller([
       '#page .fullwidth',
       '.quick-access.container-fluid', 
       'header .container-fluid .logo',
       '.quick-access ul.links li',
       '#cart-block-content',
       '.cart-icon',
       '#search_mini_form > div > span > button',
       '#count-items'
    ], CB012);
    
    // Variation
    function CB012() {
      console.log('running');
      
        $('body').addClass('ab-mobileheader-var1');

        $(".links li:contains('My Account')").remove();
        $('#page .fullwidth:first').insertBefore('.quick-access.container-fluid').addClass('topbar-wrap').find('.container-fluid:first').contents().unwrap();
        $('.topbar-wrap').prepend('<ul class="topbar-contents"></div>');
        $('<div id="search-btn" class="icon"><div></div><span>Search<span></div>').prependTo('.topbar-contents').wrap('<li></li>');
        $('header .container-fluid .logo').prependTo('.topbar-contents').wrapAll('<li></li>');
        $('header').hide();

        $('#search-btn').click(function(){
            $('header').slideToggle(function(){
                $('input#search').focus();
            });
        });

        $('.quick-access ul.links li:first').siblings().appendTo('.topbar-contents');

        //get current currency
        var currency = $('.topbar-wrap .topbar-contents li:eq(2)').find('.text:first > span').text();
        //remove currency text
        $('.topbar-wrap .topbar-contents li:eq(2)').find('.text:first > span').text('');
        //add new currency text in same format as other list items
        $('<span>'+currency+'</span>').insertAfter('.topbar-wrap .topbar-contents li:eq(2) .block-content');

        $('.topbar-wrap .topbar-contents li:eq(2) .block-content select').remove();
        $('.topbar-wrap .topbar-contents #cart-block > a').contents().appendTo('.topbar-wrap .topbar-contents #cart-block').wrapAll('<span></span>');

        /*//make currency dropdown visible on iOS
        $('.quick-access .block-content > .selectbox').click(function(e){
          $('body > ul.selectbox.items[role="menu"]').toggle();
          e.preventDefault();
        	if ($(this).hasClass('open')){
          	$('body > ul.selectbox.items[role="menu"]').attr({"style":"display: block !important"});
          } else {
          	$('body > ul.selectbox.items[role="menu"]').attr({"style":"display: none !important"});
          }
        });*/
        
        $('#cart-block-content').remove();
        
        //if basket has items remove 'basket' text
        var basketItemsText = $('#cart-block #count-items').text();
        var numOfBasketItems = parseInt(basketItemsText.match(/\((.*)\)/)[1]);
        if (numOfBasketItems > 0) {
        	var basketText = $('#cart-block > span:first');
            basketText.find('span#count-items').insertBefore(basketText);
            basketText.remove(); 
        }
        
        //check if scrolling-header test is positioned in the right place
        UC.poller([
            'body.UC_MobileHeader .header-container .topbar-wrap > .site-header-trust-wrap',    
        ], function() {
            $('body.UC_MobileHeader .header-container .topbar-wrap > .site-header-trust-wrap').insertAfter('.UC_MobileHeader .header-container');
        }, { timeout: 10000 });
        
        $('<a href="tel:+44161 333 4447." style="text-decoration:none; color:black"><div id="call-btn" class="icon"><div></div><span>Call Us<span></div></a>').insertAfter('.topbar-contents li:first').wrap('<li></li>');
        $('.fullwidth.topbar-wrap > ul > li:nth-child(4)').remove();
        $('div.fullwidth.topbar-wrap > ul > script').remove();
        $('#count-items').insertBefore('.cart-icon');
        $('#UCcall_hide').remove();
    }

    $('div:nth-child(2) > .item > .product-image > .img-responsive').attr('src','https://www.sitegainer.com/fu/up/00kiu0svomruj4d.png');
}(jQuery));
