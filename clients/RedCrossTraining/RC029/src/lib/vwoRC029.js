const RC029 = (function () {
  var ctaSectionHTML = '<div class="custom-button-box"> <div class="custom-buttons"> <a href="https://www.redcrossfirstaidtraining.co.uk/Basket.aspx" class="custom-viewbasketbutton">VIEW BASKET</a>';
  ctaSectionHTML += '<span>or</span><a href="https://www.redcrossfirstaidtraining.co.uk/Basket.aspx" class="custom-booknowbutton">BOOK NOW</a> </div>';
  ctaSectionHTML += '<div class="custom-closeBtn" style="display:none;"> <a><span>Close</span> X</a> </div> </div>';
  jQuery('.cart-mini-dropdown.touch-dropdown').prepend('<h3 class="customBasketHead">When you’re ready, continue with your booking here</h3>');
  jQuery('span.cart-mini-highlighted').closest('tr').hide();
  jQuery('.cart-mini-dropdown .table-responsive td.basket-item > div').each(function(){
    jQuery(this).addClass('custom-itembox');
    jQuery(this).closest('tr').addClass('custom-basketItemboxGroup');
  });
  jQuery('.custom-itembox > div').addClass('custom-dateAndprice');
  jQuery('.custom-dateAndprice').each(function(){ 
      jQuery(this).contents().get(11).replaceWith('');
      jQuery(this).contents().get(13).replaceWith('');
  });
  jQuery('.custom-basketItemboxGroup').each(function(){ 
    jQuery(this).append('<td class="customPriceBox">£<span></span></td>');
  });
  jQuery('.customPriceBox').prev().addClass('custom-qtyBox'); 
  jQuery('tr.cart-mini-summary-info').append('<td class="customSubTotal"><div class="withOutvattotal"></div><div class="withVatTotal"></div><td>');
  jQuery('td.customSubTotal').prev().addClass('totalTitle');
  jQuery('td.totalTitle strong').eq(1).appendTo('.withOutvattotal');
  jQuery('td.totalTitle strong').eq(1).appendTo('.withVatTotal');
  jQuery('.cart-mini-dropdown-button').after(ctaSectionHTML);
  if(document.referrer.indexOf('/Purchase/')!==-1){
    setTimeout(function(){
      jQuery('.cart-mini-dropdown').addClass('open');
    },1000);
  }


  jQuery('td.totalTitle').html('Sub-total <br> <span>Total<br>(inc. VAT)</span>');
  
  jQuery('.custom-dateAndprice strong.basket-item-price').each(function(){
    var price = parseFloat(jQuery(this).text().replace('£', '')); 
    var qty = jQuery(this).closest('tr').find('.custom-qtyBox').text();
    var totalP = price * qty ;
    var totalP = totalP.toFixed(2);
    jQuery(this).closest('tr').find('.customPriceBox span').html(totalP);
  });


  jQuery('.nav-container').append('<div class="custom-mobile-basket" style="display:none;"> <h3 class="customBasketHead">When you’re ready, continue with your booking here</h3><div class="custom-button-box"> <div class="custom-buttons"> <a href="https://www.redcrossfirstaidtraining.co.uk/Basket.aspx" class="custom-viewbasketbutton">VIEW BASKET</a><span>or</span><a href="https://www.redcrossfirstaidtraining.co.uk/Purchase/YourDetails.aspx " class="custom-booknowbutton">BOOK NOW</a> </div> <div class="custom-closeBtn"> <a><span>Close</span> X</a> </div> </div> </div>');
  
  jQuery('.custom-qtyBox').each(function(){
  if(jQuery(this).text()!="1"){
  jQuery(this).text(jQuery(this).text()+' places');
  }
  else{
  jQuery(this).text(jQuery(this).text()+' place');
  }
  });

  jQuery('.custom-closeBtn a').click(function(){
    jQuery('.cart-mini-dropdown,.custom-mobile-basket').removeClass('open');
  });

    if(document.URL.indexOf('Purchase/YourDetails.aspx')==-1 && localStorage.getItem('show_basket')=="1"){
    localStorage.setItem('show_basket','0');
    setTimeout(function(){
  jQuery('.cart-mini-dropdown').addClass('open');
    jQuery('.custom-mobile-basket').addClass('open');
    jQuery('.custom-closeBtn').show();
      
      jQuery('.custom-closeBtn > a').click(function () {
  jQuery('.cart-mini-dropdown,.custom-mobile-basket').css('display', 'none');
  setTimeout(function() {
    jQuery('.cart-mini-dropdown').removeAttr('style');
  }, 100);
  });
  },1000);
  }

}) ;

export default RC029;
