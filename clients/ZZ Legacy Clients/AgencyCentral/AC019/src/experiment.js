/* eslint-disable */
// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const AC019 = (() => {
    let trackerName,
        slideQ = false,
        $;

    const UCPoller = (() => {
        // Load Poller in seperate to other plugins to save on processing 
        // and only load libraries in when they are needed
        UC.poller([
            '.navbar-header',
            () => {
                if (window.jQuery) {
                    $ = window.jQuery
                    return true;
                }
            }
        ], init);
    })();

    function init(){
        utils.fullStory('AC019', 'Variation 1');

        const cacheDom = (() => {
            //Cache useful selectors for later use
			const bodyVar = document.querySelector('body');
			const header = bodyVar.querySelector('.navbar-header');

			const USP3Cand = (`
				<div class="AC019-USP-Content AC019-USP-3-Cand-Wrapper">
					<p class="AC019-USP-Text AC019-USP-Text-3-Cand">We connect <span class="AC019-USP-Number">5000+</span> candidates with their ideal agency every day.</p>
				</div> 
			`);

			const USP3Emp = (`
			<div class="AC019-USP-Content AC019-USP-3-Emp-Wrapper">
				<p class="AC019-USP-Text AC019-USP-Text-3-Emp">We connect <span class="AC019-USP-Number">400+</span> employers with their ideal agency every day.</p>
			</div> 
			`);

			bodyVar.classList.add('AC019');

			let profileCookie = utils.getCookie('empOrCand');
			let USPWrapper;
			let AC019SliderContentParent;
            
            //Retun the selectors/content needed throughout the test
            return {
				bodyVar,
				header,
				profileCookie,
				USPWrapper,
				USP3Emp,
				USP3Cand,
				AC019SliderContentParent
            };
        })();


        const testBuilder = {

            setupElements(){
				

				//Store USP's in a carousel, needed for mobile

				$.getScript('//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', function(){

					let USPSliderMarkup = (`
					<section class="landing_wrap">
						<div class="AC019-USP-Wrapper">
							<div class="AC019-USP-Content AC019-USP-1-Wrapper">
								<p class="AC019-USP-Text AC019-USP-Text-1">Search for specialist recruitment agencies in over <span class="AC019-USP-Number">6,000</span> job roles.</p>
							</div> 
							<div class="AC019-USP-Content AC019-USP-2-Wrapper">
								<p class="AC019-USP-Text AC019-USP-Text-2">Search through over <span class="AC019-USP-Number">6000</span> recruitment agencies</p>
							</div> 
						</div>
					</section>
					`);

				//Insert USP Bars

				cacheDom.header.insertAdjacentHTML('beforeend', USPSliderMarkup);
				cacheDom.USPWrapper = cacheDom.bodyVar.querySelector('.AC019-USP-Wrapper');

				//Check cookie value and ammend USP bars

				if(cacheDom.profileCookie == null){
					//If device has a mobile screensize add both employer and candidate USP3

					if(window.innerWidth <= 767){

						cacheDom.USPWrapper.insertAdjacentHTML('beforeend', cacheDom.USP3Emp);
						cacheDom.USPWrapper.insertAdjacentHTML('beforeend', cacheDom.USP3Cand);


					} else {
						//If device has desktop/tablet screensize cycle through employer and candidate USP3
	
						//Add employer USP by default
	
						cacheDom.USPWrapper.insertAdjacentHTML('beforeend', cacheDom.USP3Emp);
	
						//Cycle through each USP3 for candidate and employer, every 5 seconds
						
						setInterval(function(){
							//Check which USP is visible
	
							if($('.AC019-USP-3-Emp-Wrapper').is(':visible')){
								//Employer USP visible, fade out and replace with candidate USP
								$('.AC019-USP-3-Emp-Wrapper').fadeOut("slow", function(){
									$('.AC019-USP-3-Emp-Wrapper').replaceWith(cacheDom.USP3Cand);
									$('.AC019-USP-3-Cand-Wrapper').fadeIn(1000);
								});
	
								
								//Fade in candidate USP
	
							} else if($('.AC019-USP-3-Cand-Wrapper').is(':visible')){
								//Candidate USP visible, fade out and replace with emplyer USP 
								$('.AC019-USP-3-Cand-Wrapper').fadeOut("slow", function(){
									$('.AC019-USP-3-Cand-Wrapper').replaceWith(cacheDom.USP3Emp);
									$('.AC019-USP-3-Emp-Wrapper').fadeIn(1000);
								});
	
							}
	
						}, 5000);

					}


				}  else if(cacheDom.profileCookie.toUpperCase() == "EMP"){
					//Insert employer USP3
					cacheDom.USPWrapper.insertAdjacentHTML('beforeend', cacheDom.USP3Emp);
				} else if(cacheDom.profileCookie.toUpperCase() == "CND" ){
					//Insert Candidate USP3
					cacheDom.USPWrapper.insertAdjacentHTML('beforeend', cacheDom.USP3Cand);
				}

				cacheDom.AC019SliderContentParent = $('.AC019-USP-Wrapper');
				cacheDom.bodyVar.querySelector('.landing_wrap').className = "AC019_landing_wrap";
				cacheDom.bodyVar.querySelector('.AC019-USP-Wrapper').classList.add('AC019_landing_slider');
				cacheDom.bodyVar.querySelector('.AC019_landing_slider').classList.remove('landing_slider');

				cacheDom.AC019SliderContentParent.slick({
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: false,
					arrows: false,
					dots: false,
					responsive: [
						{
						  breakpoint: 768,
						  settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							autoplay: true
						  }
						}
					] 
					});
				
				});
				
            }

        };

    
	 testBuilder.setupElements();
	   
    }    
})();