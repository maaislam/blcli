import { fullStory, events } from '../../../../lib/utils';

var settings = {
	ID: '{{ID}}',
	VARIATION: '{{VARIATION}}'
};

function waitForElement(selector, callback){
  var poops = setInterval(function(){
      if(document.querySelector(selector)){
          clearInterval(poops);
          callback();
      }
  }, 100);
}

waitForElement('.NH015.V2', function () {
    fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    events.setTrackerName('tracker2');

    document.body.classList.add(settings.ID);

    $('.nh15-new-results> a.nh15-new-filter-btn.l-blue-btn').append(' by');
		$('#ctl00_ctl00_pnlAdultPriceFilters h3').prepend('<img src="//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/f34778c18b8add3da8e27b369c1de6ea_price-orange.png" class="orangeImage"><img src="//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/0f2651a8410e8231e5a8d6d32ab5730b_price-white.png" class="whiteImage">');
  
    $('#ctl00_ctl00_pnlDeparturePointFilters h3').prepend('<img src="//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/d73f4d02845c1c3e51861d13dd11da2d_departure-orange.png" class="orangeImage"><img src="//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/404fa331ff34b8e84aab9374a96e9d54_departure-white.png" class="whiteImage">');
    $('#ctl00_ctl00_pnlDurationFilters h3').prepend('<img src="//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/89dcf4a1a9646dba9f9f186f7bc50fe0_duration-orange.png" class="orangeImage"><img src="//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/ccefd33a9039d45d573a32caf433613b_duration-white.png" class="whiteImage">');
    $('#ctl00_ctl00_pnlCategory1Filters h3').prepend('<img src="//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/e5cb9f56f724ffdc3e864a22ea134312_destination-orange.png" class="orangeImage"><img src="//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/356cbd1a38c9afd3ab89b5cd62f983c0_destination-white.png" class="whiteImage">');
    $('#ctl00_ctl00_pnlWebareaFilters h3').prepend('<img src="//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/ffb2d2cbb2f4fac083652afd0ab0c54c_holiday-type-orange.png" class="orangeImage"><img src="//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/55f4ac7f1784df36da236df800259efe_holiday-type-white.png" class="whiteImage">');
  
    // Fire event 
    events.send(settings.ID, 'did-show-experiment-filter-mods', '', { sendOnce: true  });

    $('.NH015 aside.nh15-new-filter .filters .filter-category h3').off('click').click(function(){
        // Fire event 
        events.send(settings.ID, 'did-click-filter-heading-link', '', { sendOnce: true  });

        //e.stopPropagation();
        $(this).closest('.filter-category').siblings().find('ul').removeClass('visible');
        $(this).closest('.filter-category').siblings().removeClass('active');
        $(this).closest('.filter-category').toggleClass('active');
        if($('.nh15-new-filter .filters .filter-category > ul.visible').length){
          var tempH =  $('.nh15-new-filter .filters .filter-category > ul.visible').height() + 46;
          $('.result-item').closest('.two-columns').css('padding-top', tempH + 'px');
        }
        else{
          $('.result-item').closest('.two-columns').removeAttr('style');
        }
       // $(this).next().slideToggle();
    });

    $('.nh15-new-filter .filter-option').click(function() {
      // Fire event 
      events.send(settings.ID, 'did-click-filter-option-link', '', { sendOnce: true  });
    });

    $('.nh15-new-filter .filter-category > ul').each(function () {
          $(this).removeAttr('style');
          $(this).find('li:not(.inactive )').each(function (index, item){
            if((index+1)%4 == 0) {
                $(item).addClass("noPipe");
            }
        });
    });

    $('.NH015 .nh15-new-results h4').click(function() {
      // Fire event 
      events.send(settings.ID, 'did-remove-filter--next-to-filterby', '', { sendOnce: true  });
    });

    $('.NH015 .filter-option-remove').click(function() {
      // Fire event 
      events.send(settings.ID, 'did-remove-filter--by-name', '', { sendOnce: true  });
    });
});

