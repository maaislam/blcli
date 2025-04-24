import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

// ID - Experiment Title
const MP052 = (() => {

	// Experiment code
	const activate = () => {
		document.body.classList.add('MP052');

		//REMOVE STICKY CLASS
		var stickyNav = document.getElementById('js-header');

		if (stickyNav.classList){
			stickyNav.classList.remove('header_sticky');
		}
		//ADD BACK TO THE TOP BUTTON
		function backToTop(){
			var backToTop = document.createElement('div');
			backToTop.className = 'MP52-back_top';
			backToTop.innerHTML = '<span><img src="//dd6zx4ibq538k.cloudfront.net/static/images/4068/49bd2b3588fb15d91afcf0f5d3e67b27_64_64.png"/>Back to top</span>'
			
			document.body.appendChild(backToTop);
			window.addEventListener("scroll", function(){
				if(document.documentElement.scrollTop > window.innerHeight / 2){
				backToTop.classList.add('MP52-backtoTop_showing');
				}

				if(document.documentElement.scrollTop === 0){
					backToTop.classList.remove('MP52-backtoTop_showing');
				}
			});
			
			backToTop.onclick = function(){
				window.scrollTo(0, 0);
			}


		}
		backToTop();

		//DETECT WHEN USER SCROLLS UP
		function detectScroll(){
			var lastScrollTop = 0; 
			window.addEventListener("scroll", function(){ //detec the scroll
			   var scrollAmount = window.pageYOffset || document.documentElement.scrollTop; 
			   if (scrollAmount > lastScrollTop && scrollAmount > 100){
				   if (stickyNav.classList){
						stickyNav.classList.add('MP52-nonStick');
				   }
			   } else {
					if (stickyNav.classList){
						stickyNav.classList.remove('MP52-nonStick');
					}
			   }
			   lastScrollTop = scrollAmount;
			}, false);
		}
		detectScroll();


		
	};

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('MP052', 'Variation 1');

		UC.poller(['body','#js-header'], activate);

	})();

})();
