/* eslint-disable */
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as translations from './lib/translations.js';

var _TG022 = (function () {
	
	/*--------------------------------------
	Experiment Code
	---------------------------------------*/
	var _activate = function () {

		var $ = jQuery;

		var $body = $('body');
		$body.addClass('TG022');

		//Italian/English Content
		var pathName = window.location.pathname;

        //Change contact box text
		$('#contacts-us-fixed div').text(translations.textConfig.contactMessageText);

		function innerEmailbox(){
			//Get the email wrapper in the 'contact us and replace it with each block'
			var $emailWrapper = $('#sap-blocks .sap-blocks-wrapper .sap-block:last');
			$emailWrapper.html(`<div class="TG022-block1"/><div class="TG022-block2"/><div class="TG022-success_message"/>`);

			var $block1 = $('.TG022-block1'),
				$block2 = $('.TG022-block2'),
				$successBlock = $('.TG022-success_message');

			//rebuild first part of the form
			$block1.html(['<div class="TG022_adviceForm">',
							'<h3>'+translations.textConfig.contactMessageText+'...</h3>',
							'<div class="TG022-blockOne-error">'+translations.textConfig.errorBlock1+'</div>',
							'<input name="profile" id="business" title="Business" value="business" class="TG022-input-radio-business" type="radio">',
							'<input name="profile" id="private" value="private_individual" class="TG022-input-radio-personal" type="radio">',
							'<div class="TG022-option TG022-business"><span>'+translations.textConfig.businessText+'</span></div>',
							'<div class="TG022-option TG022-personal"><span>'+translations.textConfig.personalText+'</span></div>',
							'<div class="TG022-privateWhy">',
								'<select class="show-hide private" name="need-private"> <option value="">Why do you exercise? *</option> <option selected="selected" value="tone_body">To tone your body</option> <option value="stay_young">To stay young</option> <option value="improve_performance">To help improve sport performance</option> <option value="help_back">To help your back</option> <option value="get_stronger">To get stronger</option> <option value="start_moving">To start moving</option> <option value="reduce_stress">To reduce stress</option> <option value="lose_weight">To help with losing weight</option> </select>',
							'</div>',
							'<div class="TG022-businessWhy">',
								'<select class="show-hide business" name="need-business"> <option value="">Market *</option> <option value="military">Military</option> <option selected="selected" value="community">Community</option> <option value="medical_rehab">Medical Rehab</option> <option value="education">Education</option> <option value="sports">Sports</option> <option value="residential">Residential</option> <option value="corporate">Corporate</option> <option value="hotels_spas">Hotels and Spas</option> <option value="fitness_club">Fitness Club</option></select>',
                '<div class="TG022-business-free-text">',
                  translations.textConfig.BusinessFreeText,
                '</div>',
								'<input name="company" id="company" title="Company" value="" class="input-text" type="text" placeholder="' + translations.textConfig.BusinessPlaceholder + '">',
							'</div>',
							'<div class="TG022-radioOptions"/>',
							'<div class="TG022-next">'+translations.textConfig.continueMessage+'</div>',
						  '</div>'].join(''));

			//Rebuild form from contacts page
			$block2.html([
				'<div class="TG022_contentForm">',
				'<div class="TG022-loader"/>',
				'<div class="TG022-back">Back</div>',
				'<div class="TG022-blockTwo-error">'+translations.textConfig.errorBlock2+'</div>',
				'<div class="TG022-form-row">',
					'<div class="TG022-inputbox">',
						'<label>'+translations.textConfig.nameLabel+'<span>*</span></label>',
						'<input name="name" id="name" title="First Name" value="" class="TG022-input input-text required-entry" type="text">',
					'</div>',
					'<div class="TG022-inputbox">',
						'<label>'+translations.textConfig.lastLabel+'<span>*</span></label>',
						'<input name="last-name" id="last-name" title="Last Name" value="" class="TG022-input input-text required-entry" type="text">',
					'</div>',
				'</div>',
				'<div class="TG022-form-row">',
					'<div class="TG022-inputbox">',
						'<label>'+translations.textConfig.phoneLabel+'<span>*</span></label>',
						'<input name="telephone" id="telephone" title="Phone" value="" class="TG022-input input-text required-entry" type="text">',
					'</div>',
					'<div class="TG022-inputbox">',
						'<label>'+translations.textConfig.email+'<span>*</span></label>',
						'<input name="email" id="email" title="Email" value="" class="input-text required-entry validate-email" type="text">',
					'</div>',
				'</div>',
					'<div class="TG022-inputbox TG022-message">',
					    '<label>'+translations.textConfig.message+'</label>',
						'<textarea name="comment" id="comment" title="Message"></textarea>',
					'</div>',	
					'<div class="TG022-validation-check button">'+translations.textConfig.sendMessage+'</div>',
					'<button type="submit" title="Send" class="button TG022-submit"><span><span>Send</span></span></button>',
				'</div>'].join(''));

				$successBlock.html('<div class="TG022-text"><h3>'+translations.textConfig.ThanksMessage+'...</h3><span>...'+translations.textConfig.ThanksSubmessage+'</span></div>');

			var newForm = $('<form id="TG022-form">');
			newForm.appendTo($emailWrapper);

			var tg22Form = $('#TG022-form');
			tg22Form.append($block1).append($block2).append($successBlock);

			//Add radio buttons
			var radioInputs = [['quote',translations.textConfig.radio1Text],['mail',translations.textConfig.radio2Text],['mail',translations.textConfig.radio3Text]]

				$.each(radioInputs,function(){
					var inputVal = this[0],
						inputText = this[1];
					var radioButtons = $('<div class="TG022-radio-option"><input name="reason" type="radio" value="'+inputVal+'" class="TG022-radioButton"/><span>'+inputText+'</span></div>');
					$block1.find('.TG022-radioOptions').append(radioButtons);
				});

				//on button select- check the hidden inputs and select one
				var radioPersonal = $('.TG022-input-radio-personal'),
					radioBusiness = $('.TG022-input-radio-business');

				var $buttons = $('.TG022-option');
				$buttons.each(function(){
					var $elm = $(this);
					$elm.click(function(){
						$elm.addClass('TG022-optionSelected');
						$elm.siblings().removeClass('TG022-optionSelected');
						var privateWhy = $('.TG022-privateWhy'),
							businessWhy = $('.TG022-businessWhy');

						if($elm.hasClass('TG022-business')){
							radioBusiness.prop('checked',true);
							radioPersonal.prop('checked',false);
							privateWhy.removeClass('TG022-whyShowing');
							businessWhy.addClass('TG022-whyShowing');
							
						}else if($elm.hasClass('TG022-personal')){
							radioPersonal.prop('checked',true);
							radioBusiness.prop('checked',false);
							privateWhy.addClass('TG022-whyShowing');
							businessWhy.removeClass('TG022-whyShowing');
						}
					});
				});

				//on radio select
				$('.TG022-radio-option:first input').prop('checked',true);
				var radio = $('.TG022-radio-option');
				radio.each(function() {
					var $radioWrap = $(this);
					$radioWrap.click(function(){
						$radioWrap.find('input').prop('checked',true);
					});
				});

                //on continue click, check validation then show rest of form
				$block1.find('.TG022-next').click(function(){
					nextValidation();
				});

				function nextValidation(){
					var errorMessage = $('.TG022-blockOne-error');
					var businessBlock = $('.TG022-businessWhy'),
						personalBlock = $('.TG022-privateWhy');

				
					if(!$buttons.hasClass('TG022-optionSelected')){
						errorMessage.addClass('TG022-blockOneError_showing');
					}else if($buttons.hasClass('TG022-optionSelected')){
						errorMessage.removeClass('TG022-blockOneError_showing');

						var $businessselectFilled,
							$businessfieldFilled,
							$privateFilled;

						//if business is selected but options arent filled show error
						if(businessBlock.hasClass('TG022-whyShowing')){
							var select = businessBlock.find('select'),
								company = businessBlock.find('input');
							if(select.val() === ""){
								select.addClass('TG022-required');
								$businessselectFilled = false;
							}else{
								select.removeClass('TG022-required');
								$businessselectFilled = true;

							}
							if(company.val()===""){
								company.addClass('TG022-required');
								$businessfieldFilled = false;
							}else{
								company.removeClass('TG022-required');
								$businessfieldFilled = true;
							}
						}
						//if personal is selected but options arent filled show error
						if(personalBlock.hasClass('TG022-whyShowing')){
								var select = personalBlock.find('select');
					
								if(select.val() === ""){
									select.addClass('TG022-required');
									$privateFilled = false;
									
								}else{
									select.removeClass('TG022-required');
									$privateFilled = true;
								}
						}

						//if all validation is fine then show next box
						if($privateFilled){
							$block1.addClass('TG022-block1hidden');
							$block2.addClass('TG022-block2showing');
						} else if($businessfieldFilled && $businessselectFilled){
							$block1.addClass('TG022-block1hidden');
							$block2.addClass('TG022-block2showing');
						}
		
					 	}
					}
				

				var contactUrl = 'https://www.technogym.com/gb/contacts/';
				if(pathName.indexOf('/it/')> -1) {
					contactUrl = 'https://www.technogym.com/it/contacts/';
					$('.sap-blocks-wrapper').addClass('TG022-italian');
				}

				//get the form key
				$.ajax({
					url: contactUrl,
					success: function (data) {
						var d = document.createElement('div');
            d.innerHTML = data;
						var formKey = $(d).find('#contactForm > input:first');
						formKey.appendTo($block2);
					}
				});
					
				var $form = $('#TG022-form'),
					$submit = $form.find('.button:last');

				var validationButton = $('.TG022-validation-check');
					validationButton.click(function(){
					submitValidation();
				});

				//check if all the fields have been filled
				function submitValidation(){
					var errorMessage = $('.TG022-blockTwo-error');
					var inputs = $('.TG022-inputbox input');
					var allFilled;
					inputs.each(function(index, element) {
						var inputBox = $(this);
						if (element.value === '') {
							allFilled = false;
							inputBox.addClass('TG22-notvalid');
						}else{
							allFilled = true;
							inputBox.removeClass('TG22-notvalid');
						}
					});
					

					
					//if any empty inputs show error message, if not click the hidden submit button
					if(!allFilled){
						errorMessage.addClass('TG022-blockTwoError_showing');
					}else{
						errorMessage.removeClass('TG022-blockTwoError_showing');
						$submit.click();

						
							utils.events.send('TG022', 'Form Submit', 'User filled in all the form and submitted',{
								sendOnce: true
							});
						
					}
				}

				//back clicked
				var $backButton = $('.TG022-back');
				$backButton.click(function(){
					backClick();
				});

				function backClick(){
					$block1.removeClass('TG022-block1hidden');
					$block2.removeClass('TG022-block2showing');
				}

				//if the form is closed
				var $exit = $('#sap-blocks .close.icon-Cross');
				//Close box event
				
				$exit.click(function(){
					exitForm();
				});

				//Add loader while form is submitting
				function loader(){
					var $loader = $('.TG022-loader');
						$loader.addClass('TG022-loadershowing');
				}

				function exitForm(){
			

						var closedBoxafterSubmitevent;
						if($successBlock.hasClass('TG022-successshowing')){
					
								utils.events.send('TG022', 'Form close', 'User closed the box after submitting the form',{
									sendOnce: true
								});
							
					    }else{
							utils.events.send('TG022', 'Form close', 'User closed the box without sending form',{
								sendOnce: true
							});
						}
			
						$("#TG022-form")[0].reset();
						$block1.removeClass('TG022-block1hidden');
						$block2.removeClass('TG022-block2showing');
						$successBlock.removeClass('TG022-successshowing');
						$('.TG022-option').removeClass('TG022-optionSelected');
				}

				var AJXURL;
				if(pathName.indexOf('/it/') > -1){
					AJXURL = 'https://www.technogym.com/it/contacts/index/post/';
				}else{
					AJXURL = 'https://www.technogym.com/gb/contacts/index/post/';
				}
						
				//submit the form
				$form.on('submit',function(e){
					loader();
                    e.preventDefault();
					//Ajax form
					jQuery.ajax({
						url: AJXURL,
						type: 'post',
						data: $form.serialize(),
						success: function(data) {
              var div = document.createElement('div').innerHTML = data;
							$('.TG022-loader').removeClass('TG022-loadershowing');
							$block2.removeClass('TG022-block2showing');
							$successBlock.addClass('TG022-successshowing');
						}
					});

				});

        toggleChat();

        /**
         * Amend 20/06/18
         * If the live chat doesn't work show one message. Else show another.
         */
        const addChatMessage = () => {
          // console.log(typeof window.liveagent);
          const openChat = document.querySelector('#contacts-us-fixed');
          let alreadyAdded = false;
          if (openChat) {
            openChat.addEventListener('click', () => {
              if (alreadyAdded === false) {
                let html = null;
                if (typeof window.liveagent === 'object') {
                  html = `
                    <div class="TG22-chat-active">
                      <h4><span></span> Online now</h4>
                    </div>
                  `;
                } else if (typeof window.liveagent === 'undefined') {
                  html = `
                    <div class="TG22-chat-disabled">
                      <h4><span></span> Offline now</h4>
        
                      <p>Please try again between 9am - 5pm <br />or<br />fill out the contact form and we will get back to you as soon as possible.</p>
                    </div>
                  `;
                }
                const ref = document.querySelector('#sap-blocks .contact-live-chat');
                ref.insertAdjacentHTML('beforeend', html);
                alreadyAdded = true;
              }
            });
          }
        };
        addChatMessage();
		}

    innerEmailbox();
    
    function hideCallback() {
      if ($('#click-to-call-footer').length == 0 || $('#click-to-call-footer').is(':hidden')) {
        $('.TG022-italian > .sap-block:last-of-type').addClass('tg022-full-width');
      }
    }
    hideCallback();

    /**
     * Amend 15/06/18
     * Show the 'Live Chat' element between the hours of 9-5 in the UK
     * and 8:30 - 6:30 in IT.
     */
    function toggleChat() {
      let country = null;
      if (pathName) {
        country = pathName.split('/')[1];
      }
      function getCurrentTime() {
        return new Date().getHours();
      }
      const time = getCurrentTime();
      const elemToToggle = document.querySelector('.footer-container .footer-top #contacts-fixed #sap-blocks .sap-block.chat-now-box');
      if (country === 'gb') {
        // Between 9 - 5:30
        if (time > 9 && time < 17) {
          elemToToggle.classList.add('tg22-show-chat');
        }
      } else if (country === 'it') {
        if (time > 9 && time < 18) {
          elemToToggle.classList.add('tg22-show-chat');
        } else {
          elemToToggle.classList.remove('tg22-show-chat');
        }
      }
    }

	};
	/*-------------------------------------- 
	Activation
	---------------------------------------*/
	var _triggers = function (options) {
		utils.fullStory('TG022', 'Variation 1');

		UC.poller([
			'#sap-blocks .sap-blocks-wrapper .sap-block',
			'.catalog-category-view',

            function () {
                return window.jQuery
            },
            function () {
                return window.ga
            }
        ], _activate);
	};
    // Run experiment
	_triggers();

})();
