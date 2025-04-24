import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

// ID - Experiment Title
const MP053 = (() => {

	// Experiment code
	const activate = () => {
		document.body.classList.add('MP053');
		const $ = window.jQuery;

		//add new bar to the header
		const scrollheaderBar = document.createElement('div');
		scrollheaderBar.classList.add('MP53-scrollNav');
		scrollheaderBar.innerHTML = '<ul class="MP53-innerNav"></ul>';

		const normalHeader = document.getElementById('js-header');
		normalHeader.appendChild(scrollheaderBar);


		//add the nav links
		const scrollInner = document.querySelector('.MP53-innerNav');
		const categoryLinks = [
			['Toys','/c/playtime/'],
			['Gifts','/c/gifts/'],
			['Maternity','/c/maternity/'],
			['Baby Clothing','/c/clothing/'],
			['Furniture','/c/nursery-furniture/'],
			['Prams and Pushchairs','/c/pushchairs-all/'],
		]

		categoryLinks.forEach(function(categoryLinks, i){
			const categoryName = categoryLinks[0],
				  categoryHref = categoryLinks[1];

			const newNavlink = document.createElement('div');
				  newNavlink.classList.add('MP53-innerCat'); 
				  newNavlink.innerHTML = '<a href="'+categoryHref+'">'+categoryName+'</a>';
				  scrollInner.prepend(newNavlink);
		});

		//Events
		const navLinks = $('.MP53-innerCat');
		navLinks.click(function(){
			utils.events.send('MP053', 'Category Link Click', 'MP053 category link clicked', {
				sendOnce: true
		   });
		})
	

	};

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('MP053', 'Variation 1');

		activate();
	})();

})();
