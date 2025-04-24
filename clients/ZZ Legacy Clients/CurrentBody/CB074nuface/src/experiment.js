/*eslint-disable */
(function($){

  var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
  
      // Triggers
      UC.poller([ 
          'body',
          function() {
              if (window.jQuery) return true;
          },
      ], CB074, {
          timeout: 7000,
          multiplier: 0
      });
      
      function CB074() {
         var $ = window.jQuery;
         
         UC.poller([
          function() {
          var fs = window.FS;
              if (fs && fs.setUserVars) return true;
              }
          ], function () {
              window.FS.setUserVars({
                  experiment_str: 'CB074',
                  variation_str: 'Variation 1'
              });
          }, { multiplier: 1.2, timeout: 0 });
         
         var body = $('body');
         console.log('running');
         
         body.addClass('CB074');
         
         if ($(window).width() < 600){
             body.addClass('CB074mobile');
         }else{
             body.removeClass('CB074mobile');
         }
         
         var basketItems = $('#checkout_update_form .product-name a').text().trim(),
             productTitle = $('.content-product-block h1').text().trim(),
             mobileProductTitle = $('.top-product-view.row h1').text().trim();
             page = window.location.pathname;
             
              /*-----------------
        German URL
        -------------------*/
        var germanWebsite = '.de';
             
             var mobileBannerHeading,
                 mobileBannerText,
                 desktopText,
                 lightBoxtitle,
                 lightBoxtext;
             
             if (page.indexOf(germanWebsite) > -1) {
                 mobileBannerHeading = 'NUFACE 90 TAGE GELD-ZURÜCK-GARANTIE';
                 mobileBannerText = "Exklusiv für CurrentBody.com, kaufen Sie irgendein NuFACE-Gerät und wir geben Ihnen 90 Tage, um sicherzugehen, dass das Produkt richtig für Sie ist.";
                 desktopText = "Exklusiv für CurrentBody.com, kaufen Sie irgendein NuFACE-Gerät und wir geben Ihnen 90 Tage, um sicherzugehen, dass das Produkt richtig für Sie ist. Wenn nicht, können Sie es uns bei voller Rückerstattung zurückgeben.";
                 lightBoxtitle = 'CURRENTBODY.COM EXKLUSIV';
                 lightBoxtext = 'Wir sind so sicher, dass Sie mit Ihrem NuFACE Ergebnisse erhalten werden, die Sie lieben, dass wir eine 90 Tage Geld-Zurück-Garantie anbieten.Wir bitten Sie, dass Sie das Gerät für mindestens 60 Tage, 5 Mal pro Woche für fünf Minuten benutzt haben. Dies stellt sicher, dass Sie dem Gerät eine angemessene Chance gegeben haben, anzufangen, für Sie zu arbeiten.Wenn Sie es zurückgeben möchten, dann kontaktieren Sie uns einfach, um es zurückzuschicken. Wir bieten kostenlose Rückgaben im Vereinigten Königreich bei NuFace und wir erstatten auch bis zu 15 £ bei internationalen Rückgaben. Sobald wir es erhalten haben, erhalten Sie eine volle Rückerstattung abzüglich einer Bearbeitungsgebühr von 10%, um die Rückgabeverwaltung abzudecken.';
                 
                 
             }else{
                 mobileBannerHeading = 'NuFace 90 DAY MONEY BACK GUARANTEE';
                 mobileBannerText = "Buy any NuFACE device and we'll give you 90 days to make sure the product is right. If not you can return it for a refund";
                 desktopText = "Exclusive to CurrentBody.com, we\'re offering a 90 day money back guarantee with every NuFACE device. If you\'re not happy with it after this time, you can return it to us for a refund (minus a restocking fee).";
                 lightBoxtitle = 'CurrentBody.com Exclusive';
                 lightBoxtext = 'We are so confident that you will get results you\'ll love with your NuFACE that we offer a 90 day money back guarantee. We ask that you have used the device for at least 60 days, 5 times per week for 5 minutes each time. This ensures that you have given the device a proper chance to start working for you. We also advise that 4 weeks is the typical time to see results from the device. If you want to return it then just contact us and we’ll arrange for a free return. You will be refunded in full minus a 10% restocking fee to cover return admin.';
                 
             }
        
        
          if(productTitle + ':contains("NuFACE")' || mobileProductTitle + ':contains("NuFACE")' || basketItems + ':contains("NuFACE")'  || page === '/nuface'){
             var bannerMarkup = 
             $([
              '<div class="cb74-banner">',
                  '<div class="cb74-boxLogo">',
                      '<div class="cb74-exclusiveText">AVAILABLE FROM</div>',
                      '<img src="https://www.sitegainer.com/fu/up/z2i30f1793pqrnc.jpg"/>',
                  '</div>',
                  '<div class="cb74-Text">',
                      '<div class="cb74-heading">'+mobileBannerHeading+'</div>',
                          '<div class="cb74-link">Terms & Conditions ></div>',
                      '</div>',
              '</div>'].join(''));
              
              var mobileLayout = $('#top-UVP-slider');
              
              
              var lightboxTerms = $([
                                  '<div id = "cb74-overlay"></div>',
                                      '<div class="cb74-lightbox">',
                                          '<div class="cb74-lightbox-content">',
                                            '<div class="cb74-lightbox-exit">x</div>',
                                              '<h2><b>'+lightBoxtitle+'</b></h2>',
                                              "<p><br>"+lightBoxtext+"</p>",
                                          '</div>',
                                     '</div>'].join(''));
              
              
              
                if ($(body).hasClass('CB074bmobile')) {
  
            if (page === '/checkout/cart/' || page === '/checkout/cart/') {
              bannerMarkup.prependTo('#page .container-fluid:last');
              $("<span>"+mobileBannerText+"</span>").insertAfter('.cb74-heading'); 
  
            } else {
              bannerMarkup.insertAfter('#top-UVP-slider');
              $("<span>"+mobileBannerText+"</span>").insertAfter('.cb74-heading'); 
  
            }
          } else {
  
            if (page === '/checkout/cart/' || page === '/checkout/cart/') {
              bannerMarkup.prependTo('#page .container-fluid:last');
              $("<span>"+desktopText+"</span>").insertAfter('.cb74-heading'); 
  
  
            } else if (body.hasClass('catalog-brand-view')) {
              bannerMarkup.prependTo('.brand-two-col-description.row');
              $("<span>"+desktopText+"</span>").insertAfter('.cb74-heading'); 
  
              $('#brand-image').insertAfter('.cb74-banner');
            } else if (body.hasClass('catalog-product-view')) {
              bannerMarkup.insertBefore('.breadcrumbs');
              $("<span>"+desktopText+"</span>").insertAfter('.cb74-heading'); 
  
            } else {
              bannerMarkup.insertAfter('.CB003_top-banner');
              $("<span>"+desktopText+"</span>").insertAfter('.cb74-heading'); 
            }
          }
              /*
              if ($(body).hasClass('CB074mobile')){
                  
                  if(page === 'http://www.currentbody.com/checkout/cart/' || page === 'http://www.currentbody.de/checkout/cart/'){
                      bannerMarkup.prependTo('#page .container-fluid:last');
                      $("<span>"+mobileBannerText+"</span>").insertAfter('.cb74-heading'); 
                  }else{
                      bannerMarkup.insertAfter('#top-UVP-slider');
                      $("<span>"+mobileBannerText+"</span>").insertAfter('.cb74-heading'); 
                  }
              }else{
                  
                  if(page === 'http://www.currentbody.com/checkout/cart/' || page === 'http://www.currentbody.de/checkout/cart/'){
                      bannerMarkup.prependTo('#page .container-fluid:last');
                      $("<span>"+desktopText+"</span>").insertAfter('.cb74-heading');
                  }else{
                      bannerMarkup.insertAfter('#nav'); 
                      $("<span>"+desktopText+"</span>").insertAfter('.cb74-heading');
                  }
              }
              */
              lightboxTerms.prependTo(body);
              
              var lightBoxtrigger = $('.cb74-link');
              
              
              
              var $lightbox = lightboxTerms.filter('#cb74-overlay, .cb74-lightbox');
                  lightboxTerms.find(".cb74-lightbox-exit").add($lightbox.filter('#cb74-overlay')).click(function () {
                      $lightbox.fadeOut(200);
                  });
                  
              lightBoxtrigger.click(function(){
                  $lightbox.fadeIn(200);
              });
              
               
          }else{
              $('.cb74-banner').hide();
          }

          console.log('finished');
       }
       
  })(jQuery);
  
  
  