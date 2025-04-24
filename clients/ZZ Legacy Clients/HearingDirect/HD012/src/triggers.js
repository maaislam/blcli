// Only run on PPC landing pages.
if (window.location.href.match(/\?gclid=/)) {
  window.sessionStorage.setItem('from PPC', 'true');
}
if (!window.location.href.match(/\?gclid=/) && !window.sessionStorage.getItem('from PPC')) {
  _gaq.push(['Inactive', 'HD012', 'Inactive', 'HD012 is NOT active', null, true]);
  return;
}

document.body.classList.add('HD012');

function waitForElement(selector, callback){
  var poops = setInterval(function(){
      if(document.querySelector(selector)){
          clearInterval(poops);
          callback();
      }
  }, 100);
}
/* For US */
waitForElement('.user-nav__contact', function () {
  // US
// jQuery('.user-nav__contact b').text('1-800-216-2331');
  // UK
  jQuery('.user-nav__contact b').text('0800 032 1301');
});
waitForElement('.category-description.std > p:nth-child(1)', function () {
  _gaq.push(['_trackEvent', 'HD012', 'Active', 'HD012 is active', null, true]);

  var storeCatText = jQuery('.category-description.std > p:nth-child(1)').text() + ' ' + jQuery('.category-description.std > p:nth-child(2)').text();
  storeCatText = storeCatText.substr(0, 150) + '.. <a class="customReadMore">Read More</a>';
  waitForElement('.product-info__name.product-info__name--center', function () {
    if(jQuery('.customTopText').length == 0){
      jQuery('.product-info__name.product-info__name--center').after('<p class="customTopText">' + storeCatText + '</p>');
      jQuery('.customReadMore').click(function () {
          jQuery('html, body').animate({
              scrollTop: jQuery(".category-description.std").offset().top
          }, 2000);
      });
    }
  });
});
waitForElement('section.wrapper .toolbar.toolbar--controls', function () {
  if(jQuery('.custom-30day-guarantee').length == 0){
    jQuery('section.wrapper .toolbar.toolbar--controls').before('<div class="custom-30day-guarantee"><div class="container"> <img src="https://www.hearingdirect.com/skin/frontend/jh/hearingdirect/images/category-page/icon_30day.svg"> <span> All our products come with a 30 Day Money Back guarantee and free returns</span></div></div>');
  }
});
waitForElement('section.user-nav', function () {
  //for US
// jQuery('section.user-nav').before('<div class="custom-help-bottom-sticky"> <div class="need-help-cta"><a class="Need-advice"> Need advice? </a></div> <div class="stickybar"> <img src="//cdn-3.convertexperiments.com/uf/1002628/10021290/1528269653Untitled-2.jpg"> <span>Chat to us now on our 24hr live chat support or call us on 1-800-216-2331 (Monday to Friday 9 until 5)</span> <div class="chatIconClick"><img src="//useruploads.visualwebsiteoptimizer.com/useruploads/332107/images/b8945282bc8a48a9ea03bb9a08a90df2_untitled-3.png"></div></div> </div>');
// for UK
  jQuery('section.user-nav').before('<div class="custom-help-bottom-sticky"> <div class="need-help-cta"><a class="Need-advice"> Need advice? </a></div> <div class="stickybar"> <img src="//cdn-3.convertexperiments.com/uf/1002628/10021290/1528269653Untitled-2.jpg"> <span>Chat to us now on our 24hr live chat support or call us on 0800 032 1301 (Monday to Friday 9 until 5)</span> <div class="chatIconClick"><img src="//useruploads.visualwebsiteoptimizer.com/useruploads/332107/images/b8945282bc8a48a9ea03bb9a08a90df2_untitled-3.png"></div></div> </div>');
  jQuery('.chatIconClick').click(function () {
    if(typeof Tawk_API == "object"){
        Tawk_API.maximize();
    }
});
});
waitForElement('#tawkchat-container > iframe:nth-child(1)', function () {
jQuery('#tawkchat-container > iframe:nth-child(1)').wrap('<div class="tawkChatDisplayNone"></div>');
});
