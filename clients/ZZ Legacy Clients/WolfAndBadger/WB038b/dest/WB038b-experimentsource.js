var WB038b = (function($) {
	$('body').addClass('WB038b');

	var $content = $('#content'),
  		$ogForm = $content.find('form'),
		$ogCtrls = $ogForm.find('.controls');

	// Remove input placeholders
	$ogForm.find('input[placeholder]').removeAttr('placeholder');

	// Change text
	$ogForm.find('label[for="id_email"]').text('Email');
	
	var $ctrlLabel = $ogForm.find('label:contains("Do you have a wolfandbadger.com account?")');
	$ctrlLabel.text('Do you have a password?');
	$ctrlLabel.after('<span class="WB038b_light-text">If you sign in, it will be quicker to complete your order</span>');
	
	var $radioYes = $ogCtrls.find('.radio:has("#id_is_guest_1")');
	$radioYes.contents().filter(function() {
    	return this.nodeType === 3;
	}).remove();
	$radioYes.append('Yes<span class="WB038b_hidden-text">, my password is</span>');
	
	$ogCtrls.find('.radio').click(function() {
		// if yes is checked, show hidden text
		if ($radioYes.find('input')[0].checked) {
			$radioYes.find('.WB038b_hidden-text').css('display', 'inline');
		} else {
			$radioYes.find('.WB038b_hidden-text').css('display', 'none');
		}
	});

	$ogForm.find('.button[type="submit"]').text('Continue Securely');
	
}(window.jQuery));