/* no_doc_ready */
/* eslint-disable */


/* 
    >>>>> IMPORTANT! PLEASE READ BEFORE CONTINUING <<<<<
    
    This experiment is more up-to-date than any version in the repository
    A quick amend was made to change the SALE nav item to #CBLOVES. The CSS was also
    changed. Please copy this code into your local repository before working on it
*/

var UCNAV = (function($) {
  $('head').append('<style id="UCNAV_hide">.nav-container{visibility:hidden}</style>');
  setTimeout(function(){
    $('#UCNAV_hide').remove();
  }, 4000);
  
  var $ = $ || window.jQuery;
  
  var UC={now:Date.now||function(){return(new Date).getTime()},poller:function(a,b,c){var d={wait:50,multiplier:1.1,timeout:null};c||(c=d);for(var e=c.timeout?new Date(UC.now()+c.timeout):d.timeout,f=c.wait?c.wait:d.wait,g=c.multiplier?"disable"===c.multiplier?0:c.multiplier:d.multiplier,h=[],j=function(c,d){if(e&&UC.now()>e)return!1;d=d||f;var i="function"==typeof c?c():$(c).length>0;i?(h.push(!0),h.length===a.length&&b()):setTimeout(function(){j(c,d*g)},d)},k=0;k<a.length;k++)j(a[k])},throttle:function(a,b,c){var d,e,f,g=null,h=0;c||(c={});var i=function(){h=c.leading===!1?0:UC.now(),g=null,f=a.apply(d,e),g||(d=e=null)};return function(){var j=UC.now();h||c.leading!==!1||(h=j);var k=b-(j-h);return d=this,e=arguments,k<=0||k>b?(g&&(clearTimeout(g),g=null),h=j,f=a.apply(d,e),g||(d=e=null)):g||c.trailing===!1||(g=setTimeout(i,k)),f}},group:function(a,b){for(var c=[],d=0;d<a.length;d+=b)c.push(a.slice(d,d+b));return c},hoverDelay:function(a,b,c){var d,e;c||(c=1e3),$(a).hover(function(){e=UC.now()},function(){if(!d){var a=UC.now(),f=a-e;f>=c&&(b(),d=!0)}})},observer:{active:[],connect:function(a,b,c){var d={throttle:1e3,config:{attributes:!0,childList:!0,subTree:!1}};c||(c=d);for(var h,e=a,f=c.throttle?"disable"===c.throttle?0:c.throttle:d.throttle,g=c.config?c.config:d.config,i=new MutationObserver(function(a){a.forEach(function(a){h||(h=!0,b(),setTimeout(function(){h=!1},f))})}),j=0;j<e.length;j++)i.observe(e[j],g),this.active.push([e[j],i])},disconnect:function(a){for(var c=this.active,d=0;d<a.length;d++)for(var e=a[d],f=0;f<c.length;f++)e===c[f][0]&&c[f][1].disconnect()}}};
  
  UC.poller([
    '.menu_a_1',
    '.links.list-inline .block-content .sb.selectbox .display .text span',
    '#page .fullwidth',
    '.sb.selectbox div.text > span.gbp',
    function() {
              if (window.jQuery) return true;
          }
      ], run, {
          timeout: 6000,
          multiplier: 'disable' 
      });
  
      function run() { 
        
  var $ = window.jQuery;
  
  $('body').addClass('UCNEWNAV');
  
    /*FACIAL CLEANSING*/
  var bestSellersFaciallink1 = $('.menu_a_1').attr('data-link'),
      bestSellersFacialimage1 = $('.menu_a_1').attr('data-img'),
      bestSellersFacialname1 = $('.menu_a_1').attr('data-name'),
      bestSellersFacialprice1,
      
      bestSellersFaciallink2 = $('.menu_a_2').attr('data-link'),
      bestSellersFacialimage2 = $('.menu_a_2').attr('data-img'),
      bestSellersFacialname2 = $('.menu_a_2').attr('data-name'),
      bestSellersFacialprice2,
    
      bestSellersFaciallink3 = $('.menu_a_3').attr('data-link'),
      bestSellersFacialimage3 = $('.menu_a_3').attr('data-img'),
      bestSellersFacialname3 = $('.menu_a_3').attr('data-name'),
      bestSellersFacialprice3,
    
    /*HAIR REMOVAL*/
      bestSellersHairRemovalink1 = $('.menu_b_1').attr('data-link'),
      bestSellersHairRemovalimage1 = $('.menu_b_1').attr('data-img'),
      bestSellersHairRemovalname1 = $('.menu_b_1').attr('data-name'),
      bestSellersHairRemovalprice1,
      
      bestSellersHairRemovalink2 = $('.menu_b_2').attr('data-link'),
      bestSellersHairRemovalimage2 = $('.menu_b_2').attr('data-img'),
      bestSellersHairRemovalname2 = $('.menu_b_2').attr('data-name'),
      bestSellersHairRemovalprice2,
    
      bestSellersHairRemovalink3 = $('.menu_b_3').attr('data-link'),
      bestSellersHairRemovalimage3 = $('.menu_b_3').attr('data-img'),
      bestSellersHairRemovalname3 = $('.menu_b_3').attr('data-name'),
      bestSellersHairRemovalprice3,
      
    /*AGEING*/
      
      bestSellersAgeinglink1 = $('.menu_c_1').attr('data-link'),
      bestSellersAgeingimage1 = $('.menu_c_1').attr('data-img'),
      bestSellersAgeingname1 = $('.menu_c_1').attr('data-name'),
      bestSellersAgeingprice1,
      
      bestSellersAgeinglink2 = $('.menu_c_2').attr('data-link'),
      bestSellersAgeingimage2 = $('.menu_c_2').attr('data-img'),
      bestSellersAgeingname2 = $('.menu_c_2').attr('data-name'),
      bestSellersAgeingprice2,
    
      bestSellersAgeinglink3 = $('.menu_c_3').attr('data-link'),
      bestSellersAgeingimage3 = $('.menu_c_3').attr('data-img'),
      bestSellersAgeingname3 = $('.menu_c_3').attr('data-name'),
      bestSellersAgeingprice3,
      
      /*ACNE*/
      
      bestSellersAcnelink1 = $('.menu_d_1').attr('data-link'),
      bestSellersAcneimage1 = $('.menu_d_1').attr('data-img'),
      bestSellersAcnename1 = $('.menu_d_1').attr('data-name'),
      bestSellersAcneprice1,
      
      bestSellersAcnelink2 = $('.menu_d_2').attr('data-link'),
      bestSellersAcneimage2 = $('.menu_d_2').attr('data-img'),
      bestSellersAcnename2 = $('.menu_d_2').attr('data-name'),
      bestSellersAcneprice2,
    
      bestSellersAcnelink3 = $('.menu_d_3').attr('data-link'),
      bestSellersAcneimage3 = $('.menu_d_3').attr('data-img'),
      bestSellersAcnename3 = $('.menu_d_3').attr('data-name'),
      bestSellersAcneprice3;
    
    
     
    
    
    var country = $('.links.list-inline .block-content .sb.selectbox .display .text span');
    var currency;
    
    if($(country).hasClass('eur')){
          currency = '€';
          bestSellersFacialprice1 = $('.menu_a_1').attr('data-price-eu'),
          bestSellersFacialprice2 = $('.menu_a_2').attr('data-price-eu'),
          bestSellersFacialprice3 = $('.menu_a_3').attr('data-price-eu'),
          bestSellersHairRemovalprice1 = $('.menu_b_1').attr('data-price-eu'),
          bestSellersHairRemovalprice2 = $('.menu_b_2').attr('data-price-eu'),
          bestSellersHairRemovalprice3 = $('.menu_b_3').attr('data-price-eu'),
          bestSellersAgeingprice1 = $('.menu_c_1').attr('data-price-eu'),
          bestSellersAgeingprice2 = $('.menu_c_2').attr('data-price-eu'),
          bestSellersAgeingprice3 = $('.menu_c_3').attr('data-price-eu'),
          bestSellersAcneprice1 = $('.menu_d_1').attr('data-price-eu'),
          bestSellersAcneprice2 = $('.menu_d_2').attr('data-price-eu'),
          bestSellersAcneprice3 = $('.menu_d_3').attr('data-price-eu');
     }
    else if($(country).hasClass('gbp')){
              currency = '£';
         bestSellersFacialprice1 = $('.menu_a_1').attr('data-price'),
          bestSellersFacialprice2 = $('.menu_a_2').attr('data-price'),
          bestSellersFacialprice3 = $('.menu_a_3').attr('data-price'),
          bestSellersHairRemovalprice1 = $('.menu_b_1').attr('data-price'),
          bestSellersHairRemovalprice2 = $('.menu_b_2').attr('data-price'),
          bestSellersHairRemovalprice3 = $('.menu_b_3').attr('data-price'),
          bestSellersAgeingprice1 = $('.menu_c_1').attr('data-price'),
          bestSellersAgeingprice2 = $('.menu_c_2').attr('data-price'),
          bestSellersAgeingprice3 = $('.menu_c_3').attr('data-price'),
          bestSellersAcneprice1 = $('.menu_d_1').attr('data-price'),
          bestSellersAcneprice2 = $('.menu_d_2').attr('data-price'),
          bestSellersAcneprice3 = $('.menu_d_3').attr('data-price');
     }
    else if($(country).hasClass('usd')){
              currency = '$';
        bestSellersFacialprice1 = $('.menu_a_1').attr('data-price-us'),
          bestSellersFacialprice2 = $('.menu_a_2').attr('data-price-us'),
          bestSellersFacialprice3 = $('.menu_a_3').attr('data-price-us'),
          bestSellersHairRemovalprice1 = $('.menu_b_1').attr('data-price-us'),
          bestSellersHairRemovalprice2 = $('.menu_b_2').attr('data-price-us'),
          bestSellersHairRemovalprice3 = $('.menu_b_3').attr('data-price-us'),
          bestSellersAgeingprice1 = $('.menu_c_1').attr('data-price-us'),
          bestSellersAgeingprice2 = $('.menu_c_2').attr('data-price-us'),
          bestSellersAgeingprice3 = $('.menu_c_3').attr('data-price-us'),
          bestSellersAcneprice1 = $('.menu_d_1').attr('data-price-us'),
          bestSellersAcneprice2 = $('.menu_d_2').attr('data-price-us'),
          bestSellersAcneprice3 = $('.menu_d_3').attr('data-price-us');
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
         'Top Brands': [
                       '<div class="ucfacial brands">',
                         '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/clarisonic">Clarisonic</a></li>',
                              '<li><a href="//www.currentbody.cn/foreo">FOREO</a></li>',
                              '<li><a href="//www.currentbody.cn/magnitone">Magnitone</a></li>',
                              '<li><a href="//www.currentbody.cn/pmd">PMD</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
          'By Category': [
                      '<div class="ucfacial cat">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/face/skin-cleansers.html">Facial Cleansers</a></li>',
                              '<li><a href="//www.currentbody.cn/face/skin-cleansers.html">Body</a></li>',
                              '<li><a href="//www.currentbody.cn/face/skin-cleansers.html">For Men</a></li>',
                              '<li><a href="//www.currentbody.cn/face/skin-cleansers/accessories.html">Accessories</a></li>',
                              '<li><a href="//www.currentbody.cn/body/exfoliation-and-skin-care.html">Gels & Creams</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
  
          'By Concern': [
                    '<div class="ucfacial con">',
                      '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/face/skin-cleansers.html">Pores/Blackheads</a></li>',
                              '<li><a href="//www.currentbody.cn/face/skin-cleansers.html">Pigmentation</a></li>',
                              '<li><a href="//www.currentbody.cn/face/skin-cleansers.html">Lines/Wrinkles</a></li>',
                              '<li><a href="//www.currentbody.cn/face/skin-cleansers.html">Oily Skin</a></li>',
                              '<li><a href="//www.currentbody.cn/face/skin-cleansers.html">Dull Skin</a></li>',
                       '</ul>',
                    '</div>'
                    ].join(''),
  
         
  
          '': [
                   '<div class="ucfacial bestseller">',
                     '<div class="ucbestselling-wrap">',
                        '<a class="ucbestsellinglink" href="'+bestSellersFaciallink1+'">',
                           '<img src="'+bestSellersFacialimage1+'"/>',
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
                        '<a class="ucbestsellinglink" href="'+bestSellersFaciallink2+'">',
                         '<img src="'+bestSellersFacialimage2+'"/>',
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
                        '<a class="ucbestsellinglink" href="'+bestSellersFaciallink3+'">',
                         '<img src="'+bestSellersFacialimage3+'"/>',
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
  
          '#YourCurrentBody': [
                       '<div class="ucfacial article">',
                        '<div class="uc-article">',
                              '7 Things You Didn’t Know About Your Clarisonic',
                              '<a href="//www.currentbody.cn/blog/7-things-didnt-know-clarisonic/">Read More</a>',
                          '</div>',
                          '<div class="uc-article">',
                              'Can Teenagers Use a Clarisonic?',
                              '<a href="//www.currentbody.cn/blog/can-teenagers-use-the-clarisonic/">Read More</a>',
                          '</div>',
                          '<div class="uc-article">',
                              'Myth or Reality? Clarisonic Purging Period',
                              '<a href="//www.currentbody.cn/blog/myth-or-reality-the-clarisonic-purging-period/">Read More</a>',
                          '</div>',
                      '</div>'
                    ].join(''),
      },
  
      'Hair Removal': {
        
          'Top Brands': [
                       '<div class="uchair brands">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/tria">Tria</a></li>',
                              '<li><a href="//www.currentbody.cn/iluminage">Iluminage</a></li>',
                              '<li><a href="//www.currentbody.cn/smoothskin">SmoothSkin</a></li>',
                              '<li><a href="//www.currentbody.cn/philips">Philips</a></li>',
                              '<li><a href="//www.currentbody.cn/silk_n">Silk\'n</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
          'By Category': [
                      '<div class="uchair cat">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/hair-and-nails/hair-removal/permanent-hair-removal.html">Permanent Hair Removal</a></li>',
                              '<li><a href="//www.currentbody.cn/hair-and-nails/hair-removal.html">IPL & Laser</a></li>',
                              '<li><a href="//www.currentbody.cn/hair-and-nails/hair-removal/men-s.html">For Men</a></li>',
                              '<li><a href="//www.currentbody.cn/hair-and-nails/hair-removal/epilators.html">Epilators</a></li>',
                              '<li><a href="//www.currentbody.cn/hair-and-nails/hair-removal/ladyshaves-trimmers.html">Lady Shavers & Trimmers</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
  
          'By Concern': [
                    '<div class="uchair con">',
                      '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/hair-and-nails/unwanted-hair-removed.html">Unwanted Facial Hair</a></li>',
                              '<li><a href="//www.currentbody.cn/hair-and-nails/unwanted-hair-removed.html">Unwanted Bikini Line Hair</a></li>',
                              '<li><a href="//www.currentbody.cn/hair-and-nails/unwanted-hair-removed.html">Unwanted Body Hair</a></li>',
                              '<li><a href="//www.currentbody.cn/hair-and-nails/unwanted-hair-removed.html">Light Body Hair</a></li>',
                              '<li><a href="//www.currentbody.cn/hair-and-nails/unwanted-hair-removed.html">Darker Skin</a></li>',   
                       '</ul>',
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
          '#YourCurrentBody': [
                       '<div class="ucfacial article">',
                        '<div class="uc-article">',
                              '5 Reasons You Should Try IPL',
                              '<a href="//www.currentbody.cn/blog/5-reasons-try-ipl/">Read More</a>',
                          '</div>',
                          '<div class="uc-article">',
                              '6 Ways to Zap Away Unwanted Facial Hair',
                              '<a href="//www.currentbody.cn/blog/six-ways-to-zap-unwanted-facial-hair/">Read More</a>',
                          '</div>',
                          '<div class="uc-article">',
                              'Before & After: iluminage Precise Touch',
                              '<a href="//www.currentbody.cn/blog/before-after-hair-removal-iluminage-precise-touch/">Read More</a>',
                          '</div>',
  
                      '</div>'
                    ].join(''),
      },
      'Anti-Ageing': {
        'Top Brands': [
                      '<div class="ucage brands">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/nuface">NuFACE</a></li>',
                              '<li><a href="//www.currentbody.cn/wellbox">Wellbox</a></li>',
                      '<li><a href="//www.currentbody.cn/tria">Tria</a></li>',
                              '<li><a href="//www.currentbody.cn/iluminage">Iluminage</a></li>',
                              '<li><a href="//www.currentbody.cn/talika">Talika</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
          'By Category': [
                      '<div class="ucage cat">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/face/anti-aging.html">Face</a></li>',
            '<li><a href="//www.currentbody.cn/face/anti-aging.html">Eyes</a></li>',
            '<li><a href="//www.currentbody.cn/face/anti-aging.html">Neck & Body</a></li>',
                              '<li><a href="//www.currentbody.cn/face/anti-aging/accessories.html">Accessories</a></li>',
            '<li><a href="//www.currentbody.cn/face/anti-aging/accessories.html">Gels & Creams</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
  
          'By Concern': [
                    '<div class="ucage con">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/face/anti-aging.html">Eye Area/Crow\'s Feet</a></li>',
                              '<li><a href="//www.currentbody.cn/face/anti-aging.html">Fine Lines/Wrinkles</a></li>',
             '<li><a href="//www.currentbody.cn/face/anti-aging.html">Sagging Neck</a></li>',
            '<li><a href="//www.currentbody.cn/face/anti-aging.html">Untoned Skin</a></li>',
            
                       '</ul>',
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
                        '<a class="ucbestsellinglink" href="'+bestSellersAgeinglink2+'">',
                         '<img src="'+bestSellersAgeingimage2+'"/>',
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
                        '<a class="ucbestsellinglink" href="'+bestSellersAgeinglink3+'">',
                         '<img src="'+bestSellersAgeingimage3+'"/>',
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
          '#YourCurrentBody': [
                           '<div class="ucfacial article">',
                        '<div class="uc-article">',
                              '7 Ways to Get Rid of Wrinkles',
                              '<a href="//www.currentbody.cn/blog/7-ways-to-get-rid-of-wrinkles/">Read More</a>',
                          '</div>',
                          '<div class="uc-article">',
                              'Before & After: NuFACE Trinity',
                              '<a href="//www.currentbody.cn/blog/nuface-customer-review/">Read More</a>',
                          '</div>',
                          '</div>'
                    ].join(''),
      },
      'Acne': {
        'Top Brands': [
                      '<div class="ucage brands">',
                          '<ul class="ucsmalllinks">',
          '<li><a href="//www.currentbody.cn/baby_quasar">Baby Quasar</a></li>',
                              '<li><a href="//www.currentbody.cn/clarisonic">Clarisonic</a></li>',
            '<li><a href="//www.currentbody.cn/pmd">PMD</a></li>',
             '<li><a href="//www.currentbody.cn/lustre">Lustre</a></li>',
            '<li><a href="//www.currentbody.cn/me_power">mē</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
          'By Category': [
                      '<div class="ucage cat">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/face/acne-spot-removal.html">Anti-Acne</a></li>',
                              '<li><a href="//www.currentbody.cn/face/acne-spot-removal.html">Spot Removal</a></li>',
                              '<li><a href="//www.currentbody.cn/face/acne-spot-removal.html">For Men</a></li>',
                               '<li><a href="//www.currentbody.cn/face/acne-spot-removal/accessories.html">Accessories</a></li>',
                              '</ul>',
                      '</div>'
                    ].join(''),
  
          'By Concern': [
                    '<div class="ucage con">',
                          '<ul class="ucsmalllinks">',
            '<li><a href="//www.currentbody.cn/face/acne-spot-removal.html">Mild Acne</a></li>', 
            '<li><a href="//www.currentbody.cn/face/acne-spot-removal.html">Moderate Acne</a></li>',
            '<li><a href="//www.currentbody.cn/face/acne-spot-removal.html">Blemishes</a></li>',
            '<li><a href="//www.currentbody.cn/face/acne-spot-removal.html">Body Acne</a></li>', 
                       '</ul>',
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
          '#YourCurrentBody': [
                       '<div class="ucfacial article">',
                        '<div class="uc-article">',
                              'Home Use vs. Salon Microdermabrasion',
                              '<a href="//www.currentbody.cn/blog/home-use-vs-salon-microdermabrasion/">Read More</a>',
                          '</div>',
                          '</div>'
                    ].join(''),
      },
  
  //changed to sale
      '<a class ="ucsale" href="/blog">#CBLOVES</a>': {
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
                              '<li><a href="//www.currentbody.cn/face/exfoliators-and-microdermabrasion.html">Facial Exfoliation</a></li>',
                              '<li><a href="//www.currentbody.cn/face/teeth-whitening.html">Teeth Whitening</a></li>',
                              '<li><a href="//www.currentbody.cn/face/teeth-cleaning.html">Teeth Cleaning</a></li>',
                              '<li><a href="//www.currentbody.cn/face/facial-toning.html">Facial Toning</a></li>',
                              '<li><a href="//www.currentbody.cn/face/acne-spot-removal.html">Acne</a></li>',
                        '<li><a href="//www.currentbody.cn/face/skin-cleansers.html">Facial Cleansing</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
  
          'Body': [
                    '<div class="ucbrand con">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/body/toning-and-sculpting.html">Toning and Sculpting</a></li>',
                              '<li><a href="//www.currentbody.cn/body/exfoliation-and-skin-care.html">Body Exfoliation</a></li>',
                              '<li><a href="//www.currentbody.cn/body/foot-care.html">Footcare</a></li>',
                              '<li><a href="//www.currentbody.cn/body/female-health.html">Female Health</a></li>',
                              '<li><a href="//www.currentbody.cn/body/toned-body.html">Toned Body</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
  
          'Hair & Nails': [
                       '<div class="ucbrand brands">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/hair-and-nails/hair-loss.html">Hair Loss</a></li>',
                              '<li><a href="//www.currentbody.cn/hair-and-nails/hair-removal.html">Hair Removal</a></li>',
                              '<li><a href="//www.currentbody.cn/hair-and-nails/hair-care.html">Hair Care</a></li>',
                              '<li><a href="//www.currentbody.cn/hair-and-nails/nail-care.html">Nail Care</a></li>',
                          '</ul>',
                       '</div>'
                    ].join(''),
                  'Health & Wellbeing': [
                      '<div class="ucbrand bestseller">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/shop-health/body-and-shape.html">Body & Shape</a></li>',
                              '<li><a href="//www.currentbody.cn/shop-health/pain-and-tension-relief.html">Pain and Rehab</a></li>',
                              '<li><a href="//www.currentbody.cn/shop-health/health-technology.html">Health Technology</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
          'Outlet': [
                      '<div class="ucbrand bestseller">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/outlet">Face</a></li>',
                              '<li><a href="//www.currentbody.cn/outlet">Body</a></li>',
                              '<li><a href="//www.currentbody.cn/outlet">Hair & Nails</a></li>',
                              '<li><a href="//www.currentbody.cn/outlet">Teeth</a></li>',
                              '<li><a href="//www.currentbody.cn/outlet">Health & Wellbeing</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
  
  
      },
    
      '': {
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
    'Brands': {
          'A': [
                      '<div class="ucbrand cat">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/alpha_stim">Alpha Stim</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
         
          'B': [
                      '<div class="ucbrand cat">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/bellecore">BelleCore</a></li>',
                              '<li><a href="//www.currentbody.cn/beurer">Beurer</a></li>',
                              '<li><a href="//www.currentbody.cn/bkr">Bkr</a></li>',
                              '<li><a href="//www.currentbody.cn/braun">Braun</a></li>',
                              '<li><a href="//www.currentbody.cn/baby_quasar">Baby Quasar</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
  
          'C': [
                    '<div class="ucbrand con">',
                      '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/caci">CACI</a></li>',
                              '<li><a href="//www.currentbody.cn/clarisonic">Clarisonic</a></li>',
                              '<li><a href="//www.currentbody.cn/crystal_clear">Crystal Clear</a></li>',
                       '</ul>',
                      '</div>'
                    ].join(''),
  
          'E': [
                       '<div class="ucbrand brands">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/elegant_touch">Elegant Touch</a></li>',
                '<li><a href="//www.currentbody.cn/elvie-personal-trainer.html">Elvie</a></li>',    
                '<li><a href="//www.currentbody.cn/eylure">Eylure</a></li>', 
                          '</ul>',
                      '</div>'
                    ].join(''),
          'F': [
                       '<div class="ucbrand brands">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/foreo">FOREO</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
          'G': [
                       '<div class="ucbrand brands">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/globus">Globus</a></li>',
                              '<li><a href="//www.currentbody.cn/glopro">GloPRO</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
          'H': [
                       '<div class="ucbrand brands">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/hairmax">HairMax</a></li>',
                              '<li><a href="//www.currentbody.cn/homedics">Homedics</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
          'I': [
                       '<div class="ucbrand brands">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/igrow">iGrow</a></li>',
                              '<li><a href="//www.currentbody.cn/iluminage">iluminage</a></li>',
                              '<li><a href="//www.currentbody.cn/instyler">InStyler</a></li>',
                              '<li><a href="//www.currentbody.cn/intimina">INTIMINA</a></li>',
                              '<li><a href="//www.currentbody.cn/iwhite">iWhite</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
          'L': [
                       '<div class="ucbrand brands">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/l_a_b_life_beauty">L(A)B</a></li>',
                              '<li><a href="//www.currentbody.cn/lightstim">LightStim</a></li>',
                              '<li><a href="//www.currentbody.cn/love_my_skin">Love My Skin</a></li>',
                              '<li><a href="//www.currentbody.cn/luster_premium_white">Luster Premium White</a></li>',
                              '<li><a href="//www.currentbody.cn/lustre">Lustre Pro</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
          'M': [
                       '<div class="ucbrand brands">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/magnitone">Magnitone</a></li>',
                              '<li><a href="//www.currentbody.cn/me_power">mē</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
          'N': [
                       '<div class="ucbrand brands">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/neurotech">Neurotech</a></li>',
            '<li><a href="//www.currentbody.cn/newa">NEWA</a>',                  
            '<li><a href="//www.currentbody.cn/nuface">NuFACE</a></li>',
                              '<li><a href="//www.currentbody.cn/oxyjet_nora_bode">NoraBode</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
          'P': [
                       '<div class="ucbrand brands">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/painmaster">PainMaster</a></li>',
                              '<li><a href="//www.currentbody.cn/philips">Philips</a></li>',
                              '<li><a href="//www.currentbody.cn/pmd">PMD</a></li>',
                              '<li><a href="//www.currentbody.cn/prai_beauty">PRAI Beauty</a></li>',
                              '<li><a href="//www.currentbody.cn/pulsaderm">Pulsaderm</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
          'R': [
                       '<div class="ucbrand brands">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/red_carpet_manicure">Red Carpet Manicure</a></li>',
            '<li><a href="//www.currentbody.cn/remington">Remington</a></li>',                  
            '<li><a href="//www.currentbody.cn/riiviva">Riiviva</a></li>',
                              '<li><a href="//www.currentbody.cn/rio">Rio</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
          'S': [
                       '<div class="ucbrand brands">',
                          '<ul class="ucsmalllinks">',
                               "<li><a href='//www.currentbody.cn/sensica'>Sensica</a></li>",
                              "<li><a href='//www.currentbody.cn/silk_n'>Silk'n</a></li>",
                              '<li><a href="//www.currentbody.cn/slendertone">Slendertone</a></li>',
                              '<li><a href="//www.currentbody.cn/smoothskin">SmoothSkin</a></li>',
                              '<li><a href="//www.currentbody.cn/sqoom">Sqoom</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
          'T': [
                       '<div class="ucbrand brands">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/t3">T3</a></li>',
                              "<li><a href='//www.currentbody.cn/talika'>Talika</a></li>",
                              '<li><a href="//www.currentbody.cn/tenscare">TensCare</a></li>',
                              '<li><a href="//www.currentbody.cn/theradome">Theradome</a></li>',
                               '<li><a href="//www.currentbody.cn/tria">Tria</a></li>',
                               '<li><a href="//www.currentbody.cn/tripollar">TriPollar</a></li>',
                               '<li><a href="//www.currentbody.cn/tweezerman">Tweezerman</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
         
        'V':[
        '<div class="ucbrand brands">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/valkee">Valkee</a></li>',
                              "<li><a href='//www.currentbody.cn/joylux'>vSculpt</a></li>",
                          '</ul>',
        ].join(''),  
        'W': [
                       '<div class="ucbrand brands">',
                          '<ul class="ucsmalllinks">',
                              '<li><a href="//www.currentbody.cn/waterpik">Waterpik</a></li>',
                              '<li><a href="//www.currentbody.cn/wellbox">Wellbox</a></li>',
                          '</ul>',
                      '</div>'
                    ].join(''),
  
      },
  };
  
  var $navContainer = cbnewnav.find('.uc-newnavlinks');
  $.each(categories, function (categoryName) {
  
      var $linkHtml = $([
          '<li class="ucnavlink">',
                  categoryName,
   '<img class="ucarrow" src="https://www.sitegainer.com/fu/up/ln7jt4rkt8g43gi.png"/>',
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
  
  //Adds active to the inner content
  
      var contentTimer;
      $linkHtml.mouseenter(function() {
      var that = this;
      contentTimer = setTimeout(function(){
          $linkHtml.find('.ucnavContent').addClass('visible');
      }, 500);
     }).mouseleave(function() {
         $linkHtml.find('.ucnavContent').removeClass('visible');
          clearTimeout(contentTimer);
     });
  
  
      
      //Adds active to the links
      var timer;
      $linkHtml.mouseenter(function() {
      var that = this;
      timer = setTimeout(function(){
          $linkHtml.addClass('active');
          $('.ucnavlink.active .ucarrow').attr('src', 'https://www.sitegainer.com/fu/up/x783iyioq5m4rg9.png');
      }, 500);
     }).mouseleave(function() {
         $linkHtml.removeClass('active');
          $('.ucnavlink .ucarrow').attr('src', 'https://www.sitegainer.com/fu/up/ln7jt4rkt8g43gi.png');
          clearTimeout(timer);
     });
  
        
      $linkHtml.appendTo($navContainer);
  
  });
  
  
  $('#page .fullwidth').hide().before(cbnewnav);
  
  /*other elements */
  
  if ($('.sb.selectbox div.text > span.gbp').length < 1) {
  
  $(".ucbestselling-productprice").css("visibility", "hidden");
    
  }
        
        
  /*titles*/
  $(['<div class="uc-toprow facial">',
      '<h2 class="uc-box-title">Facial Cleansing',
      '<a href="//www.currentbody.cn/face/skin-cleansers.html">View All  ></a></h2>',
      '<h2 class="uc-bestselling-title">Best Sellers</h2>',
    '</div>'].join('')).prependTo('.ucnavContent:eq(0)');
  
  $(['<div class="uc-toprow hair">',
      '<h2 class="uc-box-title">Hair Removal',
      '<a href="//www.currentbody.cn/hair-and-nails/hair-removal.html">View All  ></a></h2>',
      '<h2 class="uc-bestselling-title">Best Sellers</h2>',
    '</div>'].join('')).prependTo('.ucnavContent:eq(1)');
  
  $(['<div class="uc-toprow age">',
      '<h2 class="uc-box-title">Anti-Ageing',
      '<a href="//www.currentbody.cn/face/anti-aging.html">View All  ></a></h2>',
      '<h2 class="uc-bestselling-title">Best Sellers</h2>',
    '</div>'].join('')).prependTo('.ucnavContent:eq(2)');
  
  $(['<div class="uc-toprow acne">',
      '<h2 class="uc-box-title">Acne',
      '<a href="//www.currentbody.cn/face/acne-spot-removal.html">View All  ></a></h2>',
      '<h2 class="uc-bestselling-title">Best Sellers</h2>',
    '</div>'].join('')).prependTo('.ucnavContent:eq(3)');
  
  
    
  $(['<div class="uc-toprow acne">',
      '<h2 class="uc-box-title">Brands A-Z',
    '</div>'].join('')).prependTo('.ucnavContent:eq(7)');
  
  $(['<div class="uc-toprow hair">',
      '<h2 class="uc-box-title">All Beauty Technology',
    '</div>'].join('')).prependTo('.ucnavContent:eq(5)');
  
  
  
    $('.ucnavlink:eq(0) .ucnavblock:eq(3) .ucdroptitle').remove();
    $('.ucnavlink:eq(0) .ucnavblock:eq(3)').css({
        'width': '46%'
    });
    $('.ucnavlink:eq(0) .ucnavblock:eq(4)').addClass('ucarticlesection');
  
    $('.ucnavlink:eq(1) .ucnavblock:eq(3) .ucdroptitle').remove();
    $('.ucnavlink:eq(1) .ucnavblock:eq(3)').css({
        'width': '46%'
    });
    $('.ucnavlink:eq(1) .ucnavblock:eq(4)').addClass('ucarticlesection');
  
    $('.ucnavlink:eq(2) .ucnavblock:eq(3) .ucdroptitle').remove();
    $('.ucnavlink:eq(2) .ucnavblock:eq(3)').css({
        'width': '46%'
    });
    $('.ucnavlink:eq(2) .ucnavblock:eq(4)').addClass('ucarticlesection');
  
    $('.ucnavlink:eq(3) .ucnavblock:eq(3) .ucdroptitle').remove();
    $('.ucnavlink:eq(3) .ucnavblock:eq(3)').css({
        'width': '46%'
    });
    $('.ucnavlink:eq(3) .ucnavblock:eq(4)').addClass('ucarticlesection');
  
    $('.ucnavlink:eq(7)').addClass('ucbrands');
    $('.ucnavlink:eq(7) .ucnavblock').css({
        'width': '11% !important'
    });
    $('.ucnavlink:eq(4) .uc-box-title').css({
        'width': '100%'
    });
  
    //$('.ucnavlink:eq(6) .ucnavblock:eq(4) .ucdroptitle').remove();
    $('.ucnavlink:eq(5) .ucnavblock:eq(4)').css({
        'width': '18%'
    });
    $('.ucnavlink:eq(5) .ucnavblock:eq(4)').css({
        'border': 'none'
    });
    $('.ucnavlink:eq(5) .ucnavblock:eq(4)').css({
        'margin-top': '0px'
    });
    $('.ucnavlink:eq(5) .uc-box-title').css({
        'width': '100%'
    });
  
  
  
    $('.ucnavlink:eq(4) .ucarrow').remove();
    $('.ucnavlink:eq(4) .ucnavContent').remove();
     $('.ucnavlink:eq(6) .ucarrow').remove();
    $('.ucnavlink:eq(6) .ucnavContent').remove(); 
  
    $('<a href="#"></a>').prependTo('.ucnavlink:eq(5)'); 
  
    $('div.uc-newnav-wrapfullwidth > div > div > ul > li:nth-child(7)').hide();
  
    $('<a class="ucallbrandslink" href="//www.currentbody.cn/all-brands">View All Brands ></a>').appendTo('.ucnavlink:eq(6) .ucnavContent');  
  
    $('<img class="ucarticlelogo" src="https://www.sitegainer.com/fu/up/ck4tasnwg1g1zil.png"/>').insertBefore('.ucarticlesection .ucdroptitle');
     var $fadeBg = $('<div class="ucnewnavempty"></div>');
     
     //Adds the fade background
     
     var backgroundTimer;
      $('.uc-newnavlinks').mouseenter(function() {
      var that = this;
      backgroundTimer = setTimeout(function(){
          $fadeBg.addClass('ucnewnav_forceShow');
      }, 500);
     }).mouseleave(function() {
         $fadeBg.removeClass('ucnewnav_forceShow');
          clearTimeout(backgroundTimer);
     });
  
    $fadeBg.prependTo('body');
    $('.ucnavlink:eq(4)').addClass('ucoutlet');
      $('#UCNAV_hide').remove();
      $('#page > div.uc-newnav-wrapfullwidth > div > div > ul > li.ucnavlink.ucoutlet').insertAfter('#page > div.uc-newnav-wrapfullwidth > div > div > ul > li.ucnavlink.ucbrands');
  
      }
      
  })(jQuery);