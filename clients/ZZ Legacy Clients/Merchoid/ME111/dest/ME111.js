var _ME111 = (function () {
 
  /*for FullStory*/
  var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelectorAll(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
  
      UC.poller([
        function () {
          var fs = window.FS;
          if (fs && fs.setUserVars) return true;
        }
      ], function () {
        window.FS.setUserVars({
          experiment_str: 'ME111',
          variation_str: 'Variation 1'
        });
      }, {
        multiplier: 1.2,
        timeout: 0
      });

      $('body').addClass('ME111');

      var trustBanner = $('#brands-widget .textwidget .logo-slider-container.trust-banner');

      $('#brands-widget .row:first .small-12.columns.full-width-mobile').removeClass('small-12 columns').addClass('me111-reviewsWrapper');


      var reviewBanner = $('.review-banner');

      if ($(trustBanner).length > 0) {

        $(trustBanner).addClass('me111-asseenin');
        reviewBanner.addClass('hasAsseenin');

        var newBar = $('<div class="me111-row large-12 columns"><div class="row"><ul class="asSeeninimage-bar"><p class="me111-desktitle">As Seen In:</p></ul></div></div>');
        if ($(window).width() < 600) {
          newBar.prependTo('#brands-widget');
        } else {
          newBar.appendTo(reviewBanner);
        }
        var asSeeninimage = [
          ['//cdn.optimizely.com/img/6087172626/73a63cce8bce4d1c833a996c3e38a786.png'],
          ['//cdn.optimizely.com/img/3320600494/f50474a0d8144787835e5571901a56d4.png'],
          ['//cdn.optimizely.com/img/3320600494/7dae2d9d76914b71b695edc224d05b3e.png'],
          ['//cdn.optimizely.com/img/6087172626/b1b954b0ae474bd79d9911163f916d0a.png'],
          ['//cdn.optimizely.com/img/6087172626/b36d970319f24b2fb6821d14ab1951ba.png'],
          ['//cdn.optimizely.com/img/6087172626/5a0d97773b1f4885b3ef5eca0580ddb6.png'],
          ['//cdn.optimizely.com/img/3320600494/ec9e9c76d29344379c7a9fceed7ac0bf.png'],
        ];

        $.each(asSeeninimage, function () {
          var image = this[0];
          $([
            '<li class="me111-seenInlogo">',
            '<p>Featured in</p>',
            '<img src="' + image + '"/>',
            '</li>',
          ].join('')).appendTo('.asSeeninimage-bar');
        });

        var numToDisplay = 2;

        if ($(window).width() < 400) {
          numToDisplay = 1;
        } else if ($(window).width() < 500) {
          numToDisplay = 2;
        } else if ($(window).width() < 800) {
          numToDisplay = 2;
        } else if ($(window).width() > 900) {
          numToDisplay = 2;
        }

        var seenInLogos = $('.me111-seenInlogo'),
          visibleLogos = seenInLogos.slice(0, numToDisplay).toArray(),
          notVisibleLogos = seenInLogos.slice(numToDisplay).toArray();

        $(notVisibleLogos).remove();

        var interval = setInterval(run, 3000);

        function run() {
          var target = Math.floor(Math.random() * visibleLogos.length);
          var removedElm = $(visibleLogos[target]);
          var addedElm = $(notVisibleLogos[0]);

          notVisibleLogos.shift();
          visibleLogos.splice(target, 1, addedElm);
          notVisibleLogos.push(removedElm);



          $('.me111-seenInlogo').eq(target).fadeOut(500, function () {
            $(this).replaceWith(addedElm);
            $(addedElm).fadeIn(500);
          });

        }

      }


      /*quoteBar*/


      var quoteBar = $('<div class="me111-quoteBar"><div class="me111-quoteContent"</div>');

      quoteBar.insertAfter(reviewBanner);

      var quoteReviews = [
        ['Excellent customer service'],
        ['Great quality licensed merchandise'],
        ['They ship free worldwide!']
      ];
      $.each(quoteReviews, function () {
        var review = this[0];
        $([
          '<div class="me111-quote">',
          '<img src="//cdn.optimizely.com/img/6087172626/5b65b28df46441b5b0762d89f1ddb756.png"/>',
          '<p>' + review + '</p>',
          '</div>'
        ].join('')).appendTo('.me111-quoteContent');

      });

      //sliding reviews
      var review = $('#reviews li');

      review.each(function () {
        var stars = $(this).find('.review-star-rating');
        reviewText = $(this).find('.review-quote');

        stars.insertBefore(reviewText);
      });


      $('<img class="me111-logo" src="//cdn.optimizely.com/img/6087172626/8b048c9e691940499c7a9cbef71e3043.png"/>').prependTo('.review-banner-text');

      /*change sliding review*/
      if ($(window).width() < 767) {
        $('#reviews .review-quote:first').addClass('me11-firstreview').text('Merchoid is THE place to buy awesome official geek Merchandise');
        $('.me11-firstreview').parent().prependTo('#reviews');

      }
      if ($(window).width() > 900) {
        $('.review-buttons-bar,.review-banner-text,.review-banner-conveyor-belt,.me111-row.large-12.columns').wrapAll('<div class="me111-innerBanner"/>');
      });
      })();