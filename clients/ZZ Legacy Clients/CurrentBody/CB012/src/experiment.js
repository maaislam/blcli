/* eslint-disable */
/* no_doc_ready */

var _CB012 = (function($) {
  $('head').append('<style id="UCcall_hide">.header-container{visibility:hidden}</style>');
  setTimeout(function() {
    $('#UCcall_hide').remove();
  }, 4000);
  // UC Poller 
    // @version 0.2.1
    var UC=function(a){var b=$||window.jQuery;return a.poller=function(a,c,d){var e={wait:50,multiplier:0,timeout:7000},f=Date.now||function(){return(new Date).getTime()};if(d)for(var g in d)e[g]=d[g];else d=e;for(var h=!!e.timeout&&new Date(f()+e.timeout),i=e.wait,j=e.multiplier,k=[],m=function(d,e){if(h&&f()>h)return!1;e=e||i;var g=function(){var c,a=typeof d;return c="function"===a?d():"string"!==a||b(d).length}();g?(k.push(!0),k.length===a.length&&c()):setTimeout(function(){m(d,e*j)},e)},n=0;n<a.length;n++)m(a[n])},a}(UC||{});
    
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

      console.log('run');
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

}(jQuery));
$('div:nth-child(2) > .item > .product-image > .img-responsive').attr('src','https://www.sitegainer.com/fu/up/00kiu0svomruj4d.png');
