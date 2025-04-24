/* no_doc_ready */
console.log('testtt');
var _CB003 = (function($) {
  
  // UC Poller 
  // @version 0.2.1
  var UC=function(a){var b=$||window.jQuery;return a.poller=function(a,c,d){var e={wait:50,multiplier:0,timeout:7000},f=Date.now||function(){return(new Date).getTime()};if(d)for(var g in d)e[g]=d[g];else d=e;for(var h=!!e.timeout&&new Date(f()+e.timeout),i=e.wait,j=e.multiplier,k=[],m=function(d,e){if(h&&f()>h)return!1;e=e||i;var g=function(){var c,a=typeof d;return c="function"===a?d():"string"!==a||b(d).length}();g?(k.push(!0),k.length===a.length&&c()):setTimeout(function(){m(d,e*j)},e)},n=0;n<a.length;n++)m(a[n])},a}(UC||{});
  
  // Triggers
  UC.poller([
    '#page > .fullwidth',
    '.price',
    '#cart-block-view'  
  ], CB003);
  
  
  
  // Variation
  function CB003() {
    var $ = window.jQuery;

    $('body').addClass('ab-uvp-var1 ab-uvp-var2 UC012 CB003');
    
      console.log('test');
      
       UC.poller([
      '#price-block > div.price-box > p.special-price .price',
      ], CB003b);
      
      function CB003b() {
        console.log('running B');
        
        var ucpricechecker = $('#price-block > div.price-box > p.special-price .price').text().trim()
        
        if (ucpricechecker < 60.00) {
          $('.test_value_1 a').html('<a href="https://www.currentbody.com/information" target="_blank"><strong>Free</strong> Delivery on Orders over £60</a>')
        }
      }
      
      var value_bar = '<div class="container-fluid"><div class="row CB003_top-banner top-banner">';
      
      value_bar = value_bar + '<div class="one-banner test_value test_value_1"><img alt="" src="//www.sitegainer.com/fu/up/p045ih30p90vw4x.png"> <span><a href="https://www.currentbody.com/information" target="_blank"><strong>Free</strong> UK Delivery and Hassle Free Returns</span></a></div>';
      
      value_bar = value_bar + '<div class="one-banner test_value test_value_2"><img alt="" src="//www.sitegainer.com/fu/up/36pq7wsa8sa9pyq.png"> <span>Over <strong>200,000</strong> customers served since 2010</span></div>';
      
      /*value_bar = value_bar + '<div class="one-banner test_value test_value_3"><img alt="" src="https://www.sitegainer.com/fu/up/tvx6ctnw8awukc8.png"> <span> <strong>Free</strong> 2 year warranty on all products</span></div>';*/
      
  value_bar = value_bar + '<div class="one-banner test_value test_value_3"><img alt="" src="//www.sitegainer.com/fu/up/l0xla4d4ybt3zrq.png"> <strong style=\"font-weight: bold;\">Free Gift</strong> on all orders over £50</span>';
      
      value_bar = value_bar + '</div></div>';
      
      
      $('#page > .fullwidth').after(value_bar);
      
      UC.poller([
          '#sbd902250446 > div.text > span.gbp',
      ], function() {
          $('div.one-banner.test_value.test_value_1 > span').html('<span style="line-height: 1.35; margin: 0px auto; text-align: center; display: inline-block;"><a href="https://www.currentbody.com/information" target="_blank">We deliver to over 100 countries worldwide</a></span>');
      }, {multiplier: 0, timeout: 6000});
      
      // Main CSS
      $('.test_value > img').css({
          'height': '34px'
      });
      $('.test_value > span').css({
          'line-height': '1.35',
          'margin': '0 auto',
          'textAlign': 'center',
          'display': 'inline-block'
      });
      $('.test_value > span strong').css({
          'fontWeight': 'bold',
      });
      $('.test_value:eq(0), .test_value:eq(1)').css({
          'borderRight': '1px #666 solid'
      });
      
      // Positioning Tweaks
      $('.test_value:eq(2)').addClass('hide_mobile');

    }
  
}(jQuery));