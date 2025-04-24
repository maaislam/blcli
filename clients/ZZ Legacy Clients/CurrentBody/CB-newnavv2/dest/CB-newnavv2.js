
var UCNAV = (function($) {
  
var UC={now:Date.now||function(){return(new Date).getTime()},poller:function(a,b,c){var d={wait:50,multiplier:1.1,timeout:null};c||(c=d);for(var e=c.timeout?new Date(UC.now()+c.timeout):d.timeout,f=c.wait?c.wait:d.wait,g=c.multiplier?"disable"===c.multiplier?0:c.multiplier:d.multiplier,h=[],j=function(c,d){if(e&&UC.now()>e)return!1;d=d||f;var i="function"==typeof c?c():window.jQuery(c).length>0;i?(h.push(!0),h.length===a.length&&b()):setTimeout(function(){j(c,d*g)},d)},k=0;k<a.length;k++)j(a[k])},throttle:function(a,b,c){var d,e,f,g=null,h=0;c||(c={});var i=function(){h=c.leading===!1?0:UC.now(),g=null,f=a.apply(d,e),g||(d=e=null)};return function(){var j=UC.now();h||c.leading!==!1||(h=j);var k=b-(j-h);return d=this,e=arguments,k<=0||k>b?(g&&(clearTimeout(g),g=null),h=j,f=a.apply(d,e),g||(d=e=null)):g||c.trailing===!1||(g=setTimeout(i,k)),f}},group:function(a,b){for(var c=[],d=0;d<a.length;d+=b)c.push(a.slice(d,d+b));return c},hoverDelay:function(a,b,c){var d,e;c||(c=1e3),window.jQuery(a).hover(function(){e=UC.now()},function(){if(!d){var a=UC.now(),f=a-e;f>=c&&(b(),d=!0)}})},observer:{active:[],connect:function(a,b,c){var d={throttle:1e3,config:{attributes:!0,childList:!0,subTree:!1}};c||(c=d);for(var h,e=a,f=c.throttle?"disable"===c.throttle?0:c.throttle:d.throttle,g=c.config?c.config:d.config,i=new MutationObserver(function(a){a.forEach(function(a){h||(h=!0,b(),setTimeout(function(){h=!1},f))})}),j=0;j<e.length;j++)i.observe(e[j],g),this.active.push([e[j],i])},disconnect:function(a){for(var c=this.active,d=0;d<a.length;d++)for(var e=a[d],f=0;f<c.length;f++)e===c[f][0]&&c[f][1].disconnect()}}};

UC.poller([
  'body > div',
  
  
  function() {
            if (window.jQuery) return true;
        }
    ], run, {
        timeout: 6000,
        multiplier: 'disable' 
    });

    function run() { 
      


$('body').addClass('CBNAV2');
  
        console.log('running test');

  /*FACIAL CLEANSING*/
var bestSellersFaciallink1 = $('.menu_a_1').attr('data-link'),
    bestSellersFacialimage1 = $('.menu_a_1').attr('data-img'),
    bestSellersFacialname1 = $('.menu_a_1').attr('data-name'),
    bestSellersFacialprice1 = $('.menu_a_1').attr('data-price'),
    
    bestSellersFaciallink2 = $('.menu_a_2').attr('data-link'),
    bestSellersFacialimage2 = $('.menu_a_2').attr('data-img'),
    bestSellersFacialname2 = $('.menu_a_2').attr('data-name'),
    bestSellersFacialprice2 = $('.menu_a_2').attr('data-price'),
  
    bestSellersFaciallink3 = $('.menu_a_3').attr('data-link'),
    bestSellersFacialimage3 = $('.menu_a_3').attr('data-img'),
    bestSellersFacialname3 = $('.menu_a_3').attr('data-name'),
    bestSellersFacialprice3 = $('.menu_a_3').attr('data-price'),
  
  /*HAIR REMOVAL*/
    bestSellersHairRemovalink1 = $('.menu_b_1').attr('data-link'),
    bestSellersHairRemovalimage1 = $('.menu_b_1').attr('data-img'),
    bestSellersHairRemovalname1 = $('.menu_b_1').attr('data-name'),
    bestSellersHairRemovalprice1 = $('.menu_b_1').attr('data-price'),
    
    bestSellersHairRemovalink2 = $('.menu_b_2').attr('data-link'),
    bestSellersHairRemovalimage2 = $('.menu_b_2').attr('data-img'),
    bestSellersHairRemovalname2 = $('.menu_b_2').attr('data-name'),
    bestSellersHairRemovalprice2 = $('.menu_b_2').attr('data-price'),
  
    bestSellersHairRemovalink3 = $('.menu_b_3').attr('data-link'),
    bestSellersHairRemovalimage3 = $('.menu_b_3').attr('data-img'),
    bestSellersHairRemovalname3 = $('.menu_b_3').attr('data-name'),
    bestSellersHairRemovalprice3 = $('.menu_b_3').attr('data-price'),
    
  /*AGEING*/
    
  	bestSellersAgeinglink1 = $('.menu_c_1').attr('data-link'),
    bestSellersAgeingimage1 = $('.menu_c_1').attr('data-img'),
    bestSellersAgeingname1 = $('.menu_c_1').attr('data-name'),
    bestSellersAgeingprice1 = $('.menu_c_1').attr('data-price'),
    
    bestSellersAgeinglink2 = $('.menu_c_2').attr('data-link'),
    bestSellersAgeingimage2 = $('.menu_c_2').attr('data-img'),
    bestSellersAgeingname2 = $('.menu_c_2').attr('data-name'),
    bestSellersAgeingprice2 = $('.menu_c_2').attr('data-price'),
  
    bestSellersAgeinglink3 = $('.menu_c_3').attr('data-link'),
    bestSellersAgeingimage3 = $('.menu_c_3').attr('data-img'),
    bestSellersAgeingname3 = $('.menu_c_3').attr('data-name'),
    bestSellersAgeingprice3 = $('.menu_c_3').attr('data-price'),
    
    /*ACNE*/
    
    bestSellersAcnelink1 = $('.menu_d_1').attr('data-link'),
    bestSellersAcneimage1 = $('.menu_d_1').attr('data-img'),
    bestSellersAcnename1 = $('.menu_d_1').attr('data-name'),
    bestSellersAcneprice1 = $('.menu_d_1').attr('data-price'),
    
    bestSellersAcnelink2 = $('.menu_d_2').attr('data-link'),
    bestSellersAcneimage2 = $('.menu_d_2').attr('data-img'),
    bestSellersAcnename2 = $('.menu_d_2').attr('data-name'),
    bestSellersAcneprice2 = $('.menu_d_2').attr('data-price'),
  
    bestSellersAcnelink3 = $('.menu_d_3').attr('data-link'),
    bestSellersAcneimage3 = $('.menu_d_3').attr('data-img'),
    bestSellersAcnename3 = $('.menu_d_3').attr('data-name'),
    bestSellersAcneprice3 = $('.menu_d_3').attr('data-price');
  
  
   
  
  
  var country = $('.links.list-inline .block-content .sb.selectbox .display .text span');
  var currency;
  
  if($(country).hasClass('eur')){
     	 currency = '€';
   }
  else if($(country).hasClass('gbp')){
    				currency = '£';
   }
  else if($(country).hasClass('usd')){
    				currency = '$';
   }

  

var cbnewnav = $([
    '<div class="uc-newnav-wrapfullwidth">',
         '<div class="container-fluid">',
            '<div class="uc-newnav-bar container">',
                '<ul class="uc-newnavlinks">',
                '</ul>',
            '</div>',
        '</div>',
    '</div>'
    ].join(''));

var categories = {
     
    'Facial Cleansing': {
        
           'By Category': [
                    '<div class="ucfacial cat">',
                        '<ul class="ucsmalllinks">',
                            '<li><a href="http://www.currentbody.com/face/skin-cleansers.html">Facial Cleansers</a></li>',
                            '<li><a href="http://www.currentbody.com/face/skin-cleansers.html">Body</a></li>',
                            '<li><a href="http://www.currentbody.com/face/skin-cleansers.html">For Men</a></li>',
                            '<li><a href="http://www.currentbody.com/face/skin-cleansers/accessories.html">Accessories</a></li>',
                            '<li><a href="http://www.currentbody.com/body/exfoliation-and-skin-care.html">Gels & Creams</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),
       'Top Brands': [
                     '<div class="ucfacial brands">',
                       '<ul class="ucsmalllinks">',
                            '<li><img src="//cdn.optimizely.com/img/3320600494/25fb8c0b11264c639eb5447de2526430.png"/><a href="http://www.currentbody.com/clarisonic">Clarisonic</a></li>',
                            '<li><img src="//cdn.optimizely.com/img/3320600494/e511518b78a5426ca563001d95dd1fdd.jpg"/><a href="http://www.currentbody.com/foreo">FOREO</a></li>',
                            '<li><img src="//cdn.optimizely.com/img/3320600494/0a0601ef40274ed49589389fef58104f.png"/><a href="http://www.currentbody.com/magnitone">Magnitone</a></li>',
                            '<li><img src="//cdn.optimizely.com/img/3320600494/61b6e265972245f6b143289c6e5c3468.jpg"/><a href="http://www.currentbody.com/pmd">PMD</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),
     
        '#YourCurrentBody': [
                     '<div class="ucfacial article">',
                      '<div class="uc-article">',
                            '7 Things You Didn’t Know About Your Clarisonic',
                            '<a href="http://www.currentbody.com/blog/7-things-didnt-know-clarisonic/">Read More</a>',
                        '</div>',
                        '<div class="uc-article">',
                            'Can Teenagers Use a Clarisonic?',
                            '<a href="http://www.currentbody.com/blog/can-teenagers-use-the-clarisonic/">Read More</a>',
                        '</div>',
                        '<div class="uc-article">',
                            'Myth or Reality? Clarisonic Purging Period',
                            '<a href="http://www.currentbody.com/blog/myth-or-reality-the-clarisonic-purging-period/">Read More</a>',
                        '</div>',
                    '</div>'
                  ].join(''),
    

        '': [
                 '<div class="ucfacial bestseller">',
                   '<div class="ucbestselling-wrap">',
                    	'<img src="'+bestSellersFacialimage1+'"/>',
          						'<a class="ucbestsellinglink" href="'+bestSellersFaciallink1+'">',
                       	
                        '<div id ="wrapper" class="ucbestselling-producttitle">',
                            bestSellersFacialname1,
                        '</div>',
                        '<div class="ucbestselling-productprice">',
                            'Now: '+currency+bestSellersFacialprice1,
                        '</div>',
                      	'<a class="ucbestselling-button" href="'+bestSellersFaciallink1+'">View Product</a>',
          						'</a>',
                    '</div>',
                    '<div class="ucbestselling-wrap">',
                            '<img src="'+bestSellersFacialimage2+'"/>',
          						'<a class="ucbestsellinglink" href="'+bestSellersFaciallink2+'">',
                       
                        '<div id ="wrapper" class="ucbestselling-producttitle">',
                            bestSellersFacialname2,
                        '</div>',
                        '<div class="ucbestselling-productprice">',
                            'Now: '+currency+bestSellersFacialprice2,
                        '</div>',
                      '<a class="ucbestselling-button" href="'+bestSellersFaciallink2+'">View Product</a>',
          				     '</a>',
                   '</div>',
                    '<div class="ucbestselling-wrap">',
                        '<img src="'+bestSellersFacialimage3+'"/>',
          						'<a class="ucbestsellinglink" href="'+bestSellersFaciallink3+'">',
                       
                        '<div id ="wrapper" class="ucbestselling-producttitle">',
                            bestSellersFacialname3,
                        '</div>',
                        '<div class="ucbestselling-productprice">',
                            'Now: '+currency+bestSellersFacialprice3,
                        '</div>',
                      '<a class="ucbestselling-button" href="'+bestSellersFaciallink3+'">View Product</a>',
          						'</a>',
                   '</div>',
                '</div>'
                  ].join(''),

       
    },

    'Hair Removal': {
        'By Category': [
                    '<div class="uchair cat">',
                        '<ul class="ucsmalllinks">',
                            '<li><a href="http://www.currentbody.com/hair-and-nails/hair-removal/permanent-hair-removal.html">Permanent Hair Removal</a></li>',
                            '<li><a href="http://www.currentbody.com/hair-and-nails/hair-removal.html">IPL & Laser</a></li>',
                            '<li><a href="http://www.currentbody.com/hair-and-nails/hair-removal/men-s.html">For Men</a></li>',
                            '<li><a href="http://www.currentbody.com/hair-and-nails/hair-removal/epilators.html">Epilators</a></li>',
                            '<li><a href="http://www.currentbody.com/hair-and-nails/hair-removal/ladyshaves-trimmers.html">Lady Shavers & Trimmers</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),
      
        'Top Brands': [
                     '<div class="uchair brands">',
                        '<ul class="ucsmalllinks">',
          									'<li><a href="http://www.currentbody.com/tria">Tria</a></li>',
                            '<li><a href="http://www.currentbody.com/iluminage">Iluminage</a></li>',
                            '<li><a href="http://www.currentbody.com/smoothskin">SmoothSkin</a></li>',
                            '<li><a href="http://www.currentbody.com/philips">Phillips</a></li>',
          									'<li><a href="http://www.currentbody.com/silk_n">Silk\'n</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),
        
          '#YourCurrentBody': [
                     '<div class="ucfacial article">',
                      '<div class="uc-article">',
                            '5 Reasons You Should Try IPL',
                            '<a href="http://www.currentbody.com/blog/5-reasons-try-ipl/">Read More</a>',
                        '</div>',
                        '<div class="uc-article">',
                            '6 Ways to Zap Away Unwanted Facial Hair',
                            '<a href="http://www.currentbody.com/blog/six-ways-to-zap-unwanted-facial-hair/">Read More</a>',
                        '</div>',
                        '<div class="uc-article">',
                            'Before & After: iluminage Precise Touch',
                            '<a href="http://www.currentbody.com/blog/before-after-hair-removal-iluminage-precise-touch/">Read More</a>',
                        '</div>',

                    '</div>'
                  ].join(''),

        '': [
                '<div class="uchair bestseller">',
                    '<div class="ucbestselling-wrap">',
          					'<a class="ucbestsellinglink" href="'+bestSellersHairRemovalink1+'">',
                       '<img src="'+bestSellersHairRemovalimage1+'"/>',
                        '<div id ="wrapper" class="ucbestselling-producttitle">',
                            bestSellersHairRemovalname1,
                        '</div>',
                        '<div class="ucbestselling-productprice">',
                            'Now: '+currency+bestSellersHairRemovalprice1,
                        '</div>',
                      '<a class="ucbestselling-button" href="'+bestSellersHairRemovalink1+'">View Product</a>',
          					'</a>',
                   '</div>',
                 '<div class="ucbestselling-wrap">',
          					'<a class="ucbestsellinglink" href="'+bestSellersHairRemovalink2+'">',
                       '<img src="'+bestSellersHairRemovalimage2+'"/>',
                        '<div id ="wrapper" class="ucbestselling-producttitle">',
                            bestSellersHairRemovalname2,
                        '</div>',
                        '<div class="ucbestselling-productprice">',
                            'Now: '+currency+bestSellersHairRemovalprice2,
                        '</div>',
                      '<a class="ucbestselling-button" href="'+bestSellersHairRemovalink2+'">View Product</a>',
          						'</a>',
                   '</div>',        
            '<div class="ucbestselling-wrap">',
          					'<a class="ucbestsellinglink" href="'+bestSellersHairRemovalink3+'">',
                       '<img src="'+bestSellersHairRemovalimage3+'"/>',
                        '<div id ="wrapper" class="ucbestselling-producttitle">',
                            bestSellersHairRemovalname3,
                        '</div>',
                        '<div class="ucbestselling-productprice">',
                            'Now: '+currency+bestSellersHairRemovalprice3,
                        '</div>',
                      '<a class="ucbestselling-button" href="'+bestSellersHairRemovalink3+'">View Product</a>',
          						'</a>',
                   '</div>',
               
                    '</div>'
                  ].join(''),
      
    },
    'Anti-Ageing': {
        'By Category': [
                    '<div class="ucage cat">',
                        '<ul class="ucsmalllinks">',
                            '<li><a href="http://www.currentbody.com/face/anti-aging.html">Face</a></li>',
          '<li><a href="http://www.currentbody.com/face/anti-aging.html">Eyes</a></li>',
          '<li><a href="http://www.currentbody.com/face/anti-aging.html">Neck & Body</a></li>',
                            '<li><a href="http://www.currentbody.com/face/anti-aging/accessories.html">Accessories</a></li>',
          '<li><a href="http://www.currentbody.com/face/anti-aging/accessories.html">Gels & Creams</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),
        
      'Top Brands': [
                    '<div class="ucage brands">',
                        '<ul class="ucsmalllinks">',
          									'<li><a href="http://www.currentbody.com/wellbox">Wellbox</a></li>',
                            '<li><a href="http://www.currentbody.com/nuface">NuFACE</a></li>',
          									'<li><a href="http://www.currentbody.com/tria">Tria</a></li>',
                            '<li><a href="http://www.currentbody.com/iluminage">Iluminage</a></li>',
                            '<li><a href="http://www.currentbody.com/talika">Talika</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),
          '#YourCurrentBody': [
                         '<div class="ucfacial article">',
                      '<div class="uc-article">',
                            '7 Ways to Get Rid of Wrinkles',
                            '<a href="http://www.currentbody.com/blog/7-ways-to-get-rid-of-wrinkles/">Read More</a>',
                        '</div>',
                        '<div class="uc-article">',
                            'Before & After: NuFACE Trinity',
                            '<a href="http://www.currentbody.com/blog/nuface-customer-review/">Read More</a>',
                        '</div>',
                        '</div>'
                  ].join(''),
       
        '': [
                '<div class="uchair bestseller">',
                   '<div class="ucbestselling-wrap">',
          					 '<a class="ucbestsellinglink" href="'+bestSellersAgeinglink1+'">',
                       '<img src="'+bestSellersAgeingimage1+'"/>',
                        '<div id ="wrapper" class="ucbestselling-producttitle">',
                            bestSellersAgeingname1,
                        '</div>',
                        '<div class="ucbestselling-productprice">',
                            'Now: '+currency+bestSellersAgeingprice1,
                        '</div>',
                      '<a class="ucbestselling-button" href="'+bestSellersAgeinglink1+'">View Product</a>',
          						'</a>',
                   '</div>',
                  '<div class="ucbestselling-wrap">',
                         '<img src="'+bestSellersAgeingimage2+'"/>',
          						'<a class="ucbestsellinglink" href="'+bestSellersAgeinglink2+'">',
                      
                        '<div id ="wrapper" class="ucbestselling-producttitle">',
                            bestSellersAgeingname2,
                        '</div>',
                        '<div class="ucbestselling-productprice">',
                            'Now: '+currency+bestSellersAgeingprice2,
                        '</div>',
                      '<a class="ucbestselling-button" href="'+bestSellersAgeinglink2+'">View Product</a>',
          						'</a>',
                   '</div>',
                   '<div class="ucbestselling-wrap">',
                      '<img src="'+bestSellersAgeingimage3+'"/>',
          						'<a class="ucbestsellinglink" href="'+bestSellersAgeinglink3+'">',
                     
                        '<div id ="wrapper" class="ucbestselling-producttitle">',
                            bestSellersAgeingname3,
                        '</div>',
                        '<div class="ucbestselling-productprice">',
                            'Now: '+currency+bestSellersAgeingprice3,
                        '</div>',
                      '<a class="ucbestselling-button" href="'+bestSellersAgeinglink3+'">View Product</a>',
          						'</a>',
                      '</div>',
                    '</div>'
                  ].join(''),
      
    },
    'Acne': {
    'By Category': [
                    '<div class="ucage cat">',
                        '<ul class="ucsmalllinks">',
                            '<li><a href="http://www.currentbody.com/face/acne-spot-removal.html">Anti-Acne</a></li>',
                            '<li><a href="http://www.currentbody.com/face/acne-spot-removal.html">Spot Removal</a></li>',
                            '<li><a href="http://www.currentbody.com/face/acne-spot-removal.html">For Men</a></li>',
          									 '<li><a href="http://www.currentbody.com/face/acne-spot-removal/accessories.html">Accessories</a></li>',
                            '</ul>',
                    '</div>'
                  ].join(''),

        'Top Brands': [
                    '<div class="ucage brands">',
                        '<ul class="ucsmalllinks">',
        '<li><a href="http://www.currentbody.com/baby_quasar">Baby Quasar</a></li>',
                            '<li><a href="http://www.currentbody.com/clarisonic">Clarisonic</a></li>',
          '<li><a href="http://www.currentbody.com/pmd">PMD</a></li>',
           '<li><a href="http://www.currentbody.com/lustre">Lustre</a></li>',
          '<li><a href="http://www.currentbody.com/me_power">mē</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),
        
         '#YourCurrentBody': [
                     '<div class="ucfacial article">',
                      '<div class="uc-article">',
                            'Home Use vs. Salon Microdermabrasion',
                            '<a href="http://www.currentbody.com/blog/home-use-vs-salon-microdermabrasion/">Read More</a>',
                        '</div>',
                        '</div>'
          ].join(''),

        '': [
                '<div class="uchair bestseller">',
                   '<div class="ucbestselling-wrap">',
                     '<a class="ucbestsellinglink" href="'+bestSellersAcnelink1+'">',
                       '<img src="'+bestSellersAcneimage1+'"/>',
                        '<div id ="wrapper" class="ucbestselling-producttitle">',
                            bestSellersAcnename1,
                        '</div>',
                        '<div class="ucbestselling-productprice">',
                            'Now: '+currency+bestSellersAcneprice1,
                        '</div>',
                      '<a class="ucbestselling-button" href="'+bestSellersAcnelink1+'">View Product</a>',
          					'</a>',
                   '</div>',
                    '<div class="ucbestselling-wrap">',
          							'<a class="ucbestsellinglink" href="'+bestSellersAcnelink2+'">',
                       '<img src="'+bestSellersAcneimage2+'"/>',
                        '<div id ="wrapper" class="ucbestselling-producttitle">',
                            bestSellersAcnename2,
                        '</div>',
                        '<div class="ucbestselling-productprice">',
                            'Now: '+currency+bestSellersAcneprice2,
                        '</div>',
                      '<a class="ucbestselling-button" href="'+bestSellersAcnelink2+'">View Product</a>',
          					'</a>',
                  	 '</div>',
                    '<div class="ucbestselling-wrap">',
          							 '<a class="ucbestsellinglink" href="'+bestSellersAcnelink3+'">',
                       '<img src="'+bestSellersAcneimage3+'"/>',
                        '<div id ="wrapper" class="ucbestselling-producttitle">',
                            bestSellersAcnename3,
                        '</div>',
                        '<div class="ucbestselling-productprice">',
                            'Now: '+currency+bestSellersAcneprice3,
                        '</div>',
                      '<a class="ucbestselling-button" href="'+bestSellersAcnelink3+'">View Product</a>',
          					'</a>',
                   '</div>',
                    '</div>'
                  ].join(''),
       
    },


    'Outlet': {
        'By Category': [
                    '<div class="ucbrand cat">',
                    '</div>'
                  ].join(''),

        'By Concern': [
                  '<div class="ucbrand con">',
                    '</div>'
                  ].join(''),

        'Top Brands': [
                     '<div class="ucbrand brands">',
                     '</div>'
                  ].join(''),

        '': [
                    '<div class="ucbrand bestseller">',
                    '</div>'
                  ].join('')
    },
    'All Beauty Technology': {
        'Face': [
                    '<div class="ucbrand cat">',
                        '<ul class="ucsmalllinks">',
                            '<li><a href="http://www.currentbody.com/face/exfoliators-and-microdermabrasion.html">Facial Exfoliation</a></li>',
                            '<li><a href="http://www.currentbody.com/face/teeth-whitening.html">Teeth Whitening</a></li>',
                            '<li><a href="http://www.currentbody.com/face/teeth-cleaning.html">Teeth Cleaning</a></li>',
                            '<li><a href="http://www.currentbody.com/face/facial-toning.html">Facial Toning</a></li>',
                            '<li><a href="http://www.currentbody.com/face/acne-spot-removal.html">Acne</a></li>',
          									'<li><a href="http://www.currentbody.com/face/skin-cleansers.html">Facial Cleansing</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),

        'Body': [
                  '<div class="ucbrand con">',
                        '<ul class="ucsmalllinks">',
                            '<li><a href="http://www.currentbody.com/body/toning-and-sculpting.html">Toning and Sculpting</a></li>',
                            '<li><a href="http://www.currentbody.com/body/exfoliation-and-skin-care.html">Body Exfoliation</a></li>',
                            '<li><a href="http://www.currentbody.com/body/foot-care.html">Footcare</a></li>',
                            '<li><a href="http://www.currentbody.com/body/toned-body.html">Toned Body</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),

        'Hair & Nails': [
                     '<div class="ucbrand brands">',
                        '<ul class="ucsmalllinks">',
                            '<li><a href="http://www.currentbody.com/hair-and-nails/hair-loss.html">Hair Loss</a></li>',
                            '<li><a href="http://www.currentbody.com/hair-and-nails/hair-removal.html">Hair Removal</a></li>',
                            '<li><a href="http://www.currentbody.com/hair-and-nails/hair-care.html">Hair Care</a></li>',
                            '<li><a href="http://www.currentbody.com/hair-and-nails/nail-care.html">Nail Care</a></li>',
                        '</ul>',
                     '</div>'
                  ].join(''),

        'Teeth': [
                    '<div class="ucbrand bestseller">',
                        '<ul class="ucsmalllinks">',
                            '<li><a href="http://www.currentbody.com/face/teeth-whitening.html">Teeth Whitening</a></li>',
                            '<li><a href="http://www.currentbody.com/face/teeth-cleaning.html">Teeth Cleaning</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),
        'Health & Wellbeing': [
                    '<div class="ucbrand bestseller">',
                        '<ul class="ucsmalllinks">',
                            '<li><a href="http://www.currentbody.com/shop-health/body-and-shape.html">Body & Shape</a></li>',
                            '<li><a href="http://www.currentbody.com/shop-health/pain-and-tension-relief.html">Pain and Rehab</a></li>',
                            '<li><a href="http://www.currentbody.com/shop-health/health-technology.html">Health Technology</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),

    },
  'Brands': {
        'B': [
                    '<div class="ucbrand cat">',
                        '<ul class="ucsmalllinks">',
                            '<li><a href="http://www.currentbody.com/bellecore">BelleCore</a></li>',
                            '<li><a href="http://www.currentbody.com/beurer">Beurer</a></li>',
                            '<li><a href="http://www.currentbody.com/bkr">Bkr</a></li>',
                            '<li><a href="http://www.currentbody.com/braun">Braun</a></li>',
          					'<li><a href="http://www.currentbody.com/baby_quasar">Baby Quasar</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),

        'C': [
                  '<div class="ucbrand con">',
                    '<ul class="ucsmalllinks">',
                            '<li><a href="http://www.currentbody.com/caci">CACI</a></li>',
                            '<li><a href="http://www.currentbody.com/cefar">CefarCompex</a></li>',
                            '<li><a href="http://www.currentbody.com/clarisonic">Clarisonic</a></li>',
                            '<li><a href="http://www.currentbody.com/compex">Compex</a></li>',
                     '</ul>',
                    '</div>'
                  ].join(''),

        'E': [
                     '<div class="ucbrand brands">',
                        '<ul class="ucsmalllinks">',
                            '<li><a href="http://www.currentbody.com/elegant_touch">Elegant Touch</a></li>',
							'<li><a href="http://www.currentbody.com/elvie-personal-trainer.html">Elvie</a></li>',        
                        '</ul>',
                    '</div>'
                  ].join(''),
        'F': [
                     '<div class="ucbrand brands">',
                        '<ul class="ucsmalllinks">',
                            '<li><a href="http://www.currentbody.com/foreo">FOREO</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),
        'G': [
                     '<div class="ucbrand brands">',
                        '<ul class="ucsmalllinks">',
                            '<li><a href="http://www.currentbody.com/globus">Globus</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),
        'H': [
                     '<div class="ucbrand brands">',
                        '<ul class="ucsmalllinks">',
                            '<li><a href="http://www.currentbody.com/hairmax">HairMax</a></li>',
                            '<li><a href="http://www.currentbody.com/homedics">Homedics</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),
        'I': [
                     '<div class="ucbrand brands">',
                        '<ul class="ucsmalllinks">',
                            '<li><a href="http://www.currentbody.com/igrow">iGrow</a></li>',
                            '<li><a href="http://www.currentbody.com/iluminage">iluminage</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),
        'L': [
                     '<div class="ucbrand brands">',
                        '<ul class="ucsmalllinks">',
                            '<li><a href="http://www.currentbody.com/l_a_b_life_beauty">L(A)B</a></li>',
                            '<li><a href="http://www.currentbody.com/lightstim">LightStim</a></li>',
                            '<li><a href="http://www.currentbody.com/luster_premium_white">Luster Premium White</a></li>',
          									'<li><a href="http://www.currentbody.com/lustre">Lustre Pro</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),
        'M': [
                     '<div class="ucbrand brands">',
                        '<ul class="ucsmalllinks">',
                            '<li><a href="http://www.currentbody.com/magnitone">Magnitone</a></li>',
                            '<li><a href="http://www.currentbody.com/me_power">mē</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),
        'N': [
                     '<div class="ucbrand brands">',
                        '<ul class="ucsmalllinks">',
                            '<li><a href="http://www.currentbody.com/neurotech">Neurotech</a></li>',
          '<li><a href="http://www.currentbody.com/newa">NEWA</a>',                  
          '<li><a href="http://www.currentbody.com/nuface">NuFACE</a></li>',
                            '<li><a href="http://www.currentbody.com/oxyjet_nora_bode">NoraBode</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),
        'P': [
                     '<div class="ucbrand brands">',
                        '<ul class="ucsmalllinks">',
                            '<li><a href="http://www.currentbody.com/painmaster">PainMaster</a></li>',
                            '<li><a href="http://www.currentbody.com/philips">Philips</a></li>',
                            '<li><a href="http://www.currentbody.com/pmd">PMD</a></li>',
                            '<li><a href="http://www.currentbody.com/pulsaderm">Pulsaderm</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),
        'R': [
                     '<div class="ucbrand brands">',
                        '<ul class="ucsmalllinks">',
                            '<li><a href="http://www.currentbody.com/red_carpet_manicure">Red Carpet Manicure</a></li>',
          '<li><a href="http://www.currentbody.com/remington">Remington</a></li>',                  
          '<li><a href="http://www.currentbody.com/riiviva">Riiviva</a></li>',
                            '<li><a href="http://www.currentbody.com/rio">Rio</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),
        'S': [
                     '<div class="ucbrand brands">',
                        '<ul class="ucsmalllinks">',
                            "<li><a href='http://www.currentbody.com/silk_n'>Silk'n</a></li>",
                            '<li><a href="http://www.currentbody.com/slendertone">Slendertone</a></li>',
                            '<li><a href="http://www.currentbody.com/smoothskin">SmoothSkin</a></li>',
          									'<li><a href="http://www.currentbody.com/sqoom-anti-ageing-c4-start-kit.html">Sqoom</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),
        'T': [
                     '<div class="ucbrand brands">',
                        '<ul class="ucsmalllinks">',
                            '<li><a href="http://www.currentbody.com/t3">T3</a></li>',
                            "<li><a href='http://www.currentbody.com/talika'>Talika</a></li>",
                            '<li><a href="http://www.currentbody.com/tenscare">TensCare</a></li>',
                            '<li><a href="http://www.currentbody.com/theradome">Theradome</a></li>',
                             '<li><a href="http://www.currentbody.com/tria">Tria</a></li>',
                             '<li><a href="http://www.currentbody.com/tripollar">TriPollar</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),
       
        'W': [
                     '<div class="ucbrand brands">',
                        '<ul class="ucsmalllinks">',
                            '<li><a href="http://www.currentbody.com/waterpik">Waterpik</a></li>',
                            '<li><a href="http://www.currentbody.com/wellbox">Wellbox</a></li>',
                        '</ul>',
                    '</div>'
                  ].join(''),

    },
};

var $navContainer = cbnewnav.find('.uc-newnavlinks');
$.each(categories, function (categoryName) {

    var $linkHtml = $([
        '<li class="ucnavlink '+categoryName+'">',
            categoryName,
            '<div class="ucnavContent">',
            '</div>',
        '</li>'
        ].join(''));

    $.each(this, function (columnName) {
        var columnHTML = $([
                '<div class="ucnavblock">',
                   '<h2 class="ucdroptitle">',
                        columnName,
                 '</h2>',
                     this,
                 '</div>'
               ].join(''));
        columnHTML.appendTo($linkHtml.find('.ucnavContent'));
    });

    var hovertimeout;
    $linkHtml.hover(function () {
        clearTimeout(hovertimeout);
        $linkHtml.find('.ucnavContent').addClass('visible');

    }, function () {
        hovertimeout = setTimeout(function () {
            $linkHtml.find('.ucnavContent').removeClass('visible');

        }, 500);

    });
    $linkHtml.hover(function () {

        $linkHtml.addClass('active');
       

    }, function () {

        $linkHtml.removeClass('active');

    });
      
    $linkHtml.appendTo($navContainer);

});
$('#page .fullwidth').hide().before(cbnewnav);

/*other elements */

if ($('.sb.selectbox div.text > span.gbp').length < 1) {

$(".ucbestselling-productprice").css("visibility", "hidden");
  
}
        
        
var topText = $('.ucnavContent');
var title;
        
    topText.each(function(){
        
        $(this).find('.ucnavblock:eq(0), .ucnavblock:eq(1),.ucnavblock:eq(2)').wrapAll('<div class="uccategory">');
        
        $(this).find('.ucnavblock:eq(3)').wrapAll('<div class="ucbestselling">');
        
        
        
        var title = $(this).parent(),
            titleText;
        
        if(title.hasClass('Facial')){
            titleText = 'Facial Cleansing';
        }
        else if(title.hasClass('Hair')){
            titleText = 'Hair Removal';
        }
        else if(title.hasClass('Anti-Ageing')){
            titleText = 'Anti-Ageing';
        }
        else if(title.hasClass('Acne')){
            titleText = 'Anti-Ageing';
        }
        else if(title.hasClass('Beauty')){
            titleText = 'All Beauty Technology';
        }
         else if(title.hasClass('Brands')){
            titleText = 'All Brands A-Z';
        }
        
        $(['<div class="uc-toprow">',
            '<h2 class="uc-box-title">',
                titleText,
                 '<a href="#">View All  ></a>',
            '</h2>',
            '<h2 class="uc-bestselling-title">Best Sellers</h2>',
            '</div>'].join('')).prependTo(this);
    });

        
$('.Brands .ucnavContent .ucnavblock:eq(3)').unwrap();
 //$('.Brands .ucnavContent .ucnavblock:eq(3)').unwrap();
 $('.Beauty .ucnavContent .ucnavblock:eq(0), .Brands .ucnavblock:eq(1),.Brands .ucnavblock:eq(2)').unwrap();
 $('.Beauty .ucnavblock:eq(3)').unwrap();
 
 
        
        

  $('.ucnavlink:eq(4) .ucnavContent').remove();
 $('<a href="http://www.currentbody.com/outlet"></a>').prependTo('.ucnavlink:eq(4)'); 



  //$('<a class="ucallbrandslink" href="http://www.currentbody.com/all-brands">View All Brands ></a>').appendTo('.ucnavlink:eq(6) .ucnavContent');  

  $('<img class="ucarticlelogo" src="//cdn.optimizely.com/img/3320600494/7e535c9ebfc640e6a21e95bba748cc3b.png"/>').insertBefore('.ucarticlesection .ucdroptitle');

   var $fadeBg = $('<div class="ucnewnavempty"></div>');
  
   var hoverbacktimeout;   
    $('.uc-newnavlinks').hover(function(){
      clearTimeout(hoverbacktimeout);
         $fadeBg.addClass('ucnewnav_forceShow');
    }, function(){
      	 hoverbacktimeout = setTimeout(function () {
        		$fadeBg.removeClass('ucnewnav_forceShow');
       }, 500);
    });
  
  
  $fadeBg.prependTo('body');
  
  
  $('.ucnavlink:eq(4)').wrap('<a href="www.currentbody.com/outlet"></a>');
  
  //$loader.hide();
      
   }


  })(window.jQuery);


