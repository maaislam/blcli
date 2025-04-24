var _WABUC024 = (function() {

	$('body').addClass('UC024');

	$('.ajax-submit.button').on('click', function(e) {

		$('body').addClass('loading');

		if($('.size-variant').hasClass('selected')) {
			setTimeout(function() {
				window.location.href = '/uk/checkout/welcome/'; 
			}, 2000);
		} 

		

		return true;

	})

})();