(function($) {
    if (!document.querySelector) return false;
    
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:1.1,timeout:0},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
  
    // Triggers
    UC.poller([
    	function () {
            if (window.jQuery) return true;
        },
        'body',
        '.tp_prodView .product_item',
    	function () {
    		if (window.ga) return true;
    	}
    ], TP018, {
    	timeout: 8000,
    	multiplier: 0
    });
  
      // Full Story Integration
    UC.poller([
        function() {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
        }
    ], function () {
        window.FS.setUserVars({
            experiment_str: 'TP018',
            variation_str: 'Variation 1 Mobile'
        });
    }, { multiplier: 1.2, timeout: 0 });

    // Variation
    function TP018() {
    	var $ = window.jQuery;
      	var trackerName = window.ga.getAll()[0].get('name'); 
      
      
       UC.poller([
            function() {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
            }
        ], function () {
            window.FS.setUserVars({
                experiment_str: 'TP018',
                variation_str: 'Variation 1 Mobile'
            });
        }, { multiplier: 1.2, timeout: 0 });

      
    
      
    $('body').addClass('TP018mobile');
    var tradeBox = $(['<div class="tp18-tradeBox">',
                        '<h3>Do you have an existing trade account?</h3>',
                            '<a class="tp18-login" href="/login">Already registered? Log in</a>',
                            '<p>Did you know you can register your account to use online?</p>',
                            '<ul class="tp18-points">',
                                '<li><img src="http://sb.monetate.net/img/1/581/1042749.png"/>Online prices will reflect your trade pricing terms as agreed with your branch</li>',
                                '<li><img src="http://sb.monetate.net/img/1/581/1042749.png"/>Access to our trade only account management features</li>',
                            '</ul>',
                            '<a class="tp18-cta" href="https://www.travisperkins.co.uk/register">Register Online</a>',
                            '<span>It takes just 2 minutes!</span>',
                    '</div>'].join(''));
      
      
	if(!$('#slide_menu .your-account').length){
   	 tradeBox.insertAfter('.tp_prodView .product_item:eq(5)');
	}


   var eventSent;

   $('.tp18-cta').click(function(){
        if(!eventSent){
            window.ga(trackerName + '.send', 'event','TP018 - Category Grid Trade promotion Mobile','register link click', 'TP018 User clicked link accounts ', {nonInteraction:true});
        }
    });
   $('.tp18-login').click(function(){
        if(!eventSent){
            window.ga(trackerName + '.send', 'event','TP018 - Category Grid Trade promotion Mobile','login link click', 'TP018 User clicked link login ', {nonInteraction:true});
        	eventSent = true;
	   }
    });
  
  }
    
 })(window.jQuery);
