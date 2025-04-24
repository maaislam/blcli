var getPlaceholder = {
  'business': 'Leave us your message *',
  'freelance_professional': 'Leave us your message *',
  'private_individual': 'Leave us your message *'
};

var errorMsg = {
  'name': '<div class="validation-advice" id="advice-required-entry-name" style="">This is a required field.</div>',
  'last-name': '<div class="validation-advice" id="advice-required-entry-last-name" style="">This is a required field.</div>',
  'emailInvalid': '<div class="validation-advice" id="advice-validate-email-email" style="">Please enter a valid email address. For example johndoe@domain.com.</div>',
  'email': '<div class="validation-advice" id="advice-required-entry-email">This is a required field.</div>',
  'comment': '<div class="validation-advice" id="advice-required-entry-comment" style="">This is a required field.</div>',
  'telephone': '<div class="validation-advice" id="advice-required-entry-telephone" style="">This is a required field.</div>',
  'pleaseTick': '<div class="validation-advice" id="advice-required-entry-telephone" style="">Please tick this check box if you want to proceed.</div>'
};

var youLike = [
'<li class="wide select-you-like">',
'<label for="you-like" class="required">Would you like to...</label>',
'<div class=" clearer"></div>',
'<div class="option">',
'<input name="reason" id="arrangeClBack" title="Arrange a call back" value="call" class="input-radio" type="radio">',
'<label>Arrange a call back</label>',
'</div>',
'<div class="option">',
'<input name="reason" id="sendEmail" title="Send an email" value="mail" class="input-radio" type="radio">',
'<label>Send an email</label>',
'</div>',
'<div class="option">',
'<input name="reason" id="requestQuote" title="Request a quote" value="quote" class="input-radio" type="radio">',
'<label>Request a quote</label>',
'</div>',
'<a class="custom-continue">CONTINUE</a>',
'</li>'
].join('');

var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

function waitForElement(selector, callback){
    var poops = setInterval(function(){
        if(document.querySelector(selector)){
            clearInterval(poops);
            callback();
        }
    }, 100);
}

// ----------------------------------------------------------------
// Create Div for contact form
// ----------------------------------------------------------------

function applyChanges() {

  document.body.classList.add('TG044');
  
  jQuery(".footer-container .footer-bottom-bg").prepend('<div class="custom-footer-contact-form"><div class="container"></div></div>');


  // ----------------------------------------------------------------
  // Load form to footer from contact page
  // ----------------------------------------------------------------

  jQuery(".footer-container .custom-footer-contact-form .container").load( "https://www.technogym.com/gb/contacts/ #contact-form", function() {

    
    // -----------Move Select profiles to top --------------

    jQuery('#contact-form li.wide.select-profile').prependTo('#contact-form ul.form-list');

    // -----------Change Form Header text--------------

    jQuery('#contact-form h3.block-title').html('SPEAK TO OUR TEAM <p>Fill in the fields below to receive the right support by our team</p>');

    // -----------Insert would you like to section --------------

    jQuery('#contact-form li.wide.select-profile').after(youLike);

    //Remove Similar Select

    jQuery('.custom-footer-contact-form #reason').remove();

    // -----------Wrap all text fields --------------

    jQuery('.custom-footer-contact-form .form-list li.fields, .custom-footer-contact-form .form-list li.wide.comment').wrapAll('<div class="customAllTxtField"></div>');

    // ----------- Create Placeholder for input fields --------------

    jQuery('.customAllTxtField .field').each(function(){
      var em = jQuery(this).find('label');
      jQuery(this).find('label em').appendTo(em);
      var placeHolder = jQuery(this).find('label').text();
      jQuery(this).find('.input-text').attr('placeholder', placeHolder);
    }); 

    // --------------Change Placeholder Text for comment -------------

    jQuery('.custom-footer-contact-form textarea#comment').attr('placeholder',getPlaceholder['private_individual']);
    jQuery('.custom-footer-contact-form textarea#comment').addClass('required-entry');

    /*
    jQuery('.custom-footer-contact-form .select-profile input').change(function () {
      var selectedInput = jQuery('.custom-footer-contact-form .select-profile input:checked').val();
      jQuery('.custom-footer-contact-form #comment').attr('placeholder', getPlaceholder[selectedInput]);
    });
    */

    // ---------------------Placeholder Extended Logic ---------------------- /

    jQuery('.custom-footer-contact-form .select-you-like input').change(function () {
      var selectedInput = jQuery('.custom-footer-contact-form .select-you-like input:checked').val();
      
      if(selectedInput == "mail"){
        jQuery('.custom-footer-contact-form #comment').attr('placeholder', 'Leave us your message *');
        jQuery('.custom-footer-contact-form #comment').addClass('required-entry');
        jQuery('.custom-footer-contact-form #telephone').attr('placeholder', 'Phone Number');
        jQuery('.custom-footer-contact-form #telephone').removeClass('required-entry');
        if(jQuery('.custom-footer-contact-form #telephone').parent().find('.validation-advice').length){
          jQuery('.custom-footer-contact-form #telephone').parent().find('.validation-advice').remove();
        }
      }
      else if(selectedInput == "call") {
        jQuery('.custom-footer-contact-form #telephone').attr('placeholder', 'Phone Number *');
        jQuery('.custom-footer-contact-form #telephone').addClass('required-entry');
        jQuery('.custom-footer-contact-form #comment').attr('placeholder', 'Leave us your message');
        jQuery('.custom-footer-contact-form #comment').removeClass('required-entry');
        if(jQuery('.custom-footer-contact-form #comment').parent().find('.validation-advice').length){
          jQuery('.custom-footer-contact-form #comment').parent().find('.validation-advice').remove();
        }
      } 
      else{
        jQuery('.custom-footer-contact-form #comment').attr('placeholder', 'Leave us your message');
        jQuery('.custom-footer-contact-form #comment').removeClass('required-entry');
        jQuery('.custom-footer-contact-form #telephone').attr('placeholder', 'Phone Number *');
        jQuery('.custom-footer-contact-form #telephone').addClass('required-entry');
        if(jQuery('.custom-footer-contact-form #telephone').parent().find('.validation-advice').length){
          jQuery('.custom-footer-contact-form #telephone').parent().find('.validation-advice').remove();
        }
        if(jQuery('.custom-footer-contact-form #comment').parent().find('.validation-advice').length){
          jQuery('.custom-footer-contact-form #comment').parent().find('.validation-advice').remove();
        }
      }
    });
    
    // -------------- For Radio Buttons----------------------------------
    jQuery('.custom-footer-contact-form input[type="radio"]').each(function(){
      var prep = jQuery(this).next();
      jQuery(this).prependTo(prep);
    });

    jQuery('.custom-footer-contact-form input[type="radio"]').after('<span class="checkmark"></span>');

    // -------------- Change CTA Text----------------------------------

    jQuery('.custom-footer-contact-form #contactForm button > span').html('SUBMIT');

    // -------------------Set Default Options ------------------------

    jQuery('.custom-footer-contact-form #private').click();
    jQuery('.custom-footer-contact-form #sendEmail').click();
    //jQuery('.custom-footer-contact-form .terms-privacy input').click();

    // ----------- Create dots for mobile slide --------------
    jQuery('.custom-footer-contact-form').append('<ul class="customSlideDots"><li class="active one"></li><li class="two"></li></ul>');

    // ----------- Slide change in mobile--------------
    jQuery('a.custom-continue, .customSlideDots .two').click(function(){
      jQuery('.custom-footer-contact-form li.wide.select-profile, .custom-footer-contact-form li.wide.select-you-like').hide();
      jQuery('.custom-footer-contact-form .customAllTxtField, .custom-footer-contact-form li.wide.privacy, .custom-footer-contact-form .buttons-set').fadeIn();
      jQuery('.customSlideDots .two').addClass('active');
      jQuery('.customSlideDots .one').removeClass('active');
    });

    jQuery('.customSlideDots .one').click(function(){
      jQuery('.custom-footer-contact-form .customAllTxtField, .custom-footer-contact-form li.wide.privacy, .custom-footer-contact-form .buttons-set').hide();
      jQuery('.custom-footer-contact-form li.wide.select-profile, .custom-footer-contact-form li.wide.select-you-like').fadeIn(); 
    });

    jQuery('.customSlideDots li').click(function(){
      jQuery(this).siblings().removeClass('active');
      jQuery(this).addClass('active');
    });

    jQuery('.custom-footer-contact-form input.input-text, .custom-footer-contact-form #comment').keyup(function () {
      if(jQuery(this).parent().find('.validation-advice').length){
        jQuery(this).parent().find('.validation-advice').remove();
      }
    });

    jQuery('.custom-footer-contact-form .terms-privacy input').change(function () {
      jQuery('.custom-footer-contact-form .terms-privacy .validation-advice').remove();
    })

    jQuery('.custom-footer-contact-form #contactForm button').click(function (e) {
      e.preventDefault();
      e.stopPropagation();
      jQuery('.custom-footer-contact-form .required-entry').each(function () {
        var getId = jQuery(this).attr('name');
        if(jQuery(this).val() == ''){
          jQuery(this).after(errorMsg[getId]);
        }
      });
      var getEmail = jQuery('.custom-footer-contact-form #email').val();

      if(getEmail.length){
        if(!getEmail.match(emailRegex)){
          jQuery('.custom-footer-contact-form #email').after(errorMsg['emailInvalid']);
        }
      }

      if(!jQuery('.custom-footer-contact-form .terms-privacy input:checked').length){
        jQuery('.custom-footer-contact-form .terms-privacy').append(errorMsg['pleaseTick']);
      }

      if(jQuery('.custom-footer-contact-form .validation-advice').length == 0){
        jQuery('.custom-footer-contact-form #contactForm').submit();
      }
    });

  //Place holder change
    
    jQuery('.custom-footer-contact-form #email').attr('placeholder','Email Address*');
    jQuery('.custom-footer-contact-form #telephone').attr('placeholder','Phone Number');
    jQuery('.custom-footer-contact-form .form-container').append('<span class="custom-required">* Required Fields</span>');
    
  });
}

waitForElement('.footer-container .footer-bottom', function () {
  applyChanges();
});
