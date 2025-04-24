var _UC007 = (function($) {
  
  	$('body').addClass('UC007');
  	// ~~~~~ Lightbox v2
  	// ~~~~~ Changes: Click outside of lightbox to close it
  	function loadScript(location, callback) {
        var fileRef = document.createElement('script');
        fileRef.setAttribute('type', 'text/javascript');
        if (callback) {
            if (fileRef.readyState) { // IE
                fileRef.onreadystatechange = function() {
                    if (fileRef.readyState == 'loaded' || fileRef.readyState == 'complete') {
                        fileRef.onreadystatechange = null;
                        callback();
                    }
                };
            } else { // Non-IE
                fileRef.onload = function() {
                    callback();
                };
            }
        }
        fileRef.setAttribute('src', location);
        document.head.appendChild(fileRef);
    }
  
  	$(window).load(function() {
      startQuickView();
    });
  
  	function startQuickView() {
        
		$('<link href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css" rel="stylesheet" />').prependTo('body.UC007');
    	loadScript('https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js');
        $('<a href="#" class="quick-view"> Quick View </a>').prependTo('.UC007 .product-image .inner');
      	
      
        $('.UC007 .quick-view').on('click', function(e) {
            e.preventDefault();
            var $this = $(this);
			      
      		ga('send', 'event', 'User Clicked Quick View button','user clicked quick view', {nonInteraction: 1});
              var mainItem = $this.parents('.item');
              var image = mainItem.find('.product-image a.product-image').clone();
              var productPageURL = image.attr('href');

             $.ajax({
              url: productPageURL,
              type: "GET",
              timeout: 5000,
              datattype: "html",
              success: function(data) {
                  var result = $(data);
                  var fullImageSection = result.find('.product-img-box');
                  
                  var theProductThumbs = [];
                  var theProductImages = [];

                  fullImageSection.find('.main-product-image-lightbox').each(function(index) {
                      var $this = $(this);
                      $this.attr('data-id', 22);
                      theProductImages.push($this);
                  });

                  fullImageSection.find('.product-thumbs .product-thumb').each(function(index) {
                      var $this = $(this);
                      var thumb = $this;
                      thumb.attr('data-id', index);
                      theProductThumbs.push(thumb);
                  });

                  var thumbshtml = "";
                  var imageshtml = "";

                  var len = 0;
                  for (var i = 0, len = theProductThumbs.length; i < len; i++) {
                    thumbshtml += theProductThumbs[i].html();
                  }

                  var jlen = 0;
                  for (var j = 0, jlen = theProductImages.length; j < jlen; j++) {
                    imageshtml += theProductImages[j].attr('data-id', j).html();
                  }

                  var content = mainItem.find('.product-info').clone();
                  var actions = mainItem.find('.actions').clone();
                  var productLink = image.attr('href');
                  $('<div class="mfp-hide quick-view-popup" style="display: none; opacity: 0;"><div class="row generic-row"><div class="col-lg-12"><h2 class="qv-header"> Quick View </h2></div><div class="col-sm-7 col-xs-12 image-col"><div class="product-thumbs">'+thumbshtml+'</div><div class="product-images">'+imageshtml+'</div></div><div class="col-sm-5 col-xs-12 details-col"><div class="details"><div class="content">'+content.html()+'</div><div class="buttons">'+actions.html()+' <a href="'+productLink+'"> View Product Details </a> </div><div class="reasons"><div class="reason-item"><img src="https://www.houseofwatches.co.uk/skin/frontend/rwd/how/images/product/shop_free-delivery.png" data-pin-nopin="true"><h4>Free delivery</h4><p>Royal Mail 1st Class</p></div><div class="reason-item"><img src="https://www.houseofwatches.co.uk/skin/frontend/rwd/how/images/product/shop_nextday-delivery.png" data-pin-nopin="true"><h4>Next day delivery</h4><p>Free on orders of £100+</p></div><div class="reason-item"><img src="https://www.houseofwatches.co.uk/skin/frontend/rwd/how/images/product/shop_returns.png"><h4>Hassle free returns</h4><p>Great customer service if you change your mind</p></div></div></div></div></div></div></div>').prependTo('.UC007');
                  $('.UC007 .quick-view-popup').removeAttr('style');
                  
                  $('.product-images img').each(function(index) {
                      var $this = $(this);
                      $this.attr('data-id',index);
                  });

                  $('.product-images img:eq(0)').addClass('active');

                  $.magnificPopup.open({
                    mainClass: "qv-popup-holder",
                    items: {
                      src: '.UC007 .quick-view-popup', // can be a HTML string, jQuery object, or CSS selector
                      type: 'inline'
                    },
                    callbacks: {
                      close: function() {
                        $('.UC007 .quick-view-popup').remove();
                      }
                    }
                  });
                
              
                  $(document).on('click', '.product-thumbs img', function() {
                      var $this = $(this);
                      var currentIndex = $this.index();
  
                      $('.product-images .gallery-image').removeClass('active');
                      $('.product-images .gallery-image:eq('+currentIndex+')').addClass('active');
                  });

              }
            });
      	});	
      
      	$('.UC007 .mfp-close').on('click', function(e) {
          e.preventDefault();
          $.magnificPopup.close();
        });


      
    }
  
  	
  
})(jQuery);
