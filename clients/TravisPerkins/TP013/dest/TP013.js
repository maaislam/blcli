(function($){

var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
    // Triggers
    UC.poller([
        'body',
        '.tpHeaderLinks .nav'
        function() {
            if (window.jQuery) return true;
        },
        function() {
            if (window.ga) return true;
        }
    ], TP009, {
        timeout: 7000,
        multiplier: 'disable'
    });
    
    // Variation
    function TP013() {
        var $ = window.jQuery;
      
      
      UC.poller([
      function() {
          var fs = window.FS;
          if (fs && fs.setUserVars) return true;
      }
  	], function () {
      window.FS.setUserVars({
          experiment_str: 'TP013',
          variation_str: 'Variation 1'
      });
  }, { multiplier: 1.2, timeout: 0 });



		var accountArea = $([
				'<a class="tp13-tradelink"href="/login">',
				'<div class="tp13-loginbar">',
					'Trade Account Area',
					'<span class="tp13-arrow"></span>',
				'</div>',
				'</a>',
		].join(''));

		var topnavLinks = $('.tpHeaderLinks .nav:first');

		accountArea.appendTo(topnavLinks);

    }

})(jQuery);