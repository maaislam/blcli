var TP009 = (function() {

	$('body').addClass('TP009');



	var products = $('#products .row .prod'),
		deliveryButton,
		collectionButton,
		lengthBox,
		qtyBox;

	products.each(function(){
		 deliveryButton = $(this).find('.plp_add_to_cart_form .tpQ_button'),
		 collectionButton  = $(this).find('.plp_add_to_cart_form .ccButton');

		 collectionButton.find('input').val('+ Add for Collection');
	
		 lengthBox = $(this).find('.variant_select');
		 
		 if(lengthBox.length > 0){
		 	$(this).find(lengthBox).next('.plp_add_to_cart_form').find('.tpQ_input').addClass('tp9-qty');
			 
		 }
	       var price = $(this).find('.product_price_holder .price_value').text().replace('£','');
			parseInt(price);
			
			if(price > 50){
				$(this).append('<p class="tp9-deliveryMessage">Free Delivery over £50</p>');
				console.log('is higher');
			}
		
		
	});

})();