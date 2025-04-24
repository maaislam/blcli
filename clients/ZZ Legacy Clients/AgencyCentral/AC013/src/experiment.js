
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const AC013 = (() => {

	// Experiment code
	const activate = () => {
		document.body.classList.add('AC013');
		var $ = window.jQuery;

		var clickedEmailEvent;

		//Loop through each result and move the favourites bar to the top
		var result = document.querySelectorAll(".agency-result");
		for(var i = 0; i < result.length; i++){
			var thisResult = result[i];
			var addTofavourites = thisResult.querySelector(".add-to-favourites-link"),
			
				courseTitle = thisResult.querySelector('.hidden-xs.hidden-sm.col-sm-4'),
				contactOption = thisResult.querySelector(".contact-option-container");

				courseTitle.appendChild(addTofavourites);

				//add class to the email button
				var emailList = thisResult.querySelector("[data-action='email']");

				if(emailList){
					emailList.classList.add('AC013-emailButton');
				
					emailList.addEventListener("click", function(e){
						if(!clickedEmailEvent){
							utils.events.send('AC013 — Call To Action prominence','email button click','AC013 user clicked email CTA');
							clickedEmailEvent = true;
						}
					});
				}else{
					var noemail = thisResult.querySelector('.contact-link');
					noemail.parentNode.classList.add('AC013-noemail');
				}
			}

	};

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('AC013', 'Variation 1');
		UC.poller([
			'body',
			'.agency-result'
			], activate);

	})();

})();
