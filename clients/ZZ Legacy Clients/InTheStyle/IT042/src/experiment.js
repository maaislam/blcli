import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

// ID - Experiment Title
const IT042 = (() => {

	// Experiment code
	const activate = () => {
		document.body.classList.add('IT042');
		let $ = jQuery;
	
		//move the add to bag above add to wishlist

		let wishlist = document.querySelector('.add-to-links'),
			parentWishlist = document.querySelector('.add-to-box'),
			shopLook = document.querySelector('.block-related.block-product-grid');

			parentWishlist.insertBefore(shopLook, wishlist);
	};

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('IT042', 'Variation 1');

		UC.poller(['.add-to-links','.add-to-box','.block-related.block-product-grid'], activate);
	})();

})();
