import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import changeLinks from './lib/navlinks.js';
import * as markup from './lib/navhtml.js';


const MP054 = (() => {

	const activate = () => {
		document.body.classList.add('MP054');
		var $ = window.jQuery;

		//add new nav link
		const mainNav = $('.nav_group.list-unstyled'),
		mainNavcategoriesLast = $('.nav_category:last'),
		lastLink = $('.yCmsComponent.nav_groupLink:last');

 		//Add new link & catgory with the same functionality as the existing nav
		 const addLastLink = $(`
		  <li data-goto-category="nav_CMSLinkComponentModel(bedding)" class="yCmsComponent nav_groupLink font-weight-light js-navSwitchCategory MP54-beddingMain">
		 	 <a href="/en-gb/c/quilt-coverlet-bumpers" title="Bedding">
		  		Bedding
		  	</a>
		  </li>
			 `);
		 const addLastlinkcat = $(`
		 <div class="nav_category bg-white pb-3 MP54-beddingMaincat" data-category="nav_CMSLinkComponentModel(bedding)">
		 	<div data-goto-category="nav_primary" class="nav_categoryTitle nav_backArrow cursor-pointer p-3 pl-5 js-navSwitchCategory">
			 <a href="/en-gb/c/quilt-coverlet-bumpers" title="bedding"> Bedding </a>
			</div>
		 <ul class="nav_group list-unstyled m-0 px-3">
		 </ul>
		 </div>`);
		 
		 addLastLink.insertAfter(lastLink);
		 addLastlinkcat.insertAfter(mainNavcategoriesLast);


		//change main nav links
		changeLinks();

		//loop through each cateogry and match html in other file to each category using the attr
		let navBlocks = $('.nav_category.bg-white.pb-3');
		navBlocks.each(function(){
			var $this = $(this),
				categories = $this.attr('data-category');

			if(categories === 'nav_CMSLinkComponentModel(8800949699644@3)'){ //christmas
				$this.addClass('MP054-christmas');
				$this.find('ul').prepend(markup.christmas);
			}
			else if(categories === 'nav_CMSLinkComponentModel(8800960218172@3)'){
				$this.addClass('MP054-bathing');
			}
			else if(categories === 'nav_CMSLinkComponentModel(8800848774204@0)'){
				$this.addClass('MP054-babyClothing');
				$this.find('ul').prepend(markup.babyClothing);
			}
			else if(categories === 'nav_CMSLinkComponentModel(8800848839740@2)'){
				$this.addClass('MP054-furniture');
				$this.find('ul').prepend(markup.nurseryFurniture);
			}
			else if(categories === 'nav_CMSLinkComponentModel(8800848806972@2)'){
				$this.addClass('MP054-toys');
				$this.find('ul').prepend(markup.toysGifts);
			}
			
			else if(categories === 'nav_CMSLinkComponentModel(bedding)'){
				$this.addClass('MP054-bedding');
				$this.find('ul').prepend(markup.bedding);
			}
			else if(categories === 'nav_CMSNavigationNodeModel(8797403939904@8)'||categories==='nav_CMSNavigationNodeModel(8797403874368@8)'|| categories==='nav_CMSNavigationNodeModel(8797403907136@6)'){
				$this.addClass('MP054-beddingInterior');
			}
			else if(categories === 'nav_CMSLinkComponentModel(toys)'){
				$this.addClass('MP054-toys');
				$this.find('ul').prepend(markup.toysInner);
			}
			else if(categories === 'nav_CMSLinkComponentModel(gifts)'){
				$this.addClass('MP054-gifts');
				$this.find('ul').prepend(markup.giftsInner);
			}else if(categories === 'nav_CMSNavigationNodeModel(8797305635904@1)' || categories === 'nav_CMSNavigationNodeModel(8797305668672@4)' ||categories === 'nav_CMSNavigationNodeModel(8797305766976@4)') {
				$this.addClass('MP054-clothinginner');
			}

		});
		//Change the links of the main titles so they dont go back to the main nav
		var beddingLink = $('.MP054-beddingInterior');
		beddingLink.find('.nav_categoryTitle').attr('data-goto-category','nav_CMSLinkComponentModel(bedding)');
		$('.MP054-toys:last').find('.nav_categoryTitle').attr('data-goto-category','nav_CMSLinkComponentModel(8800848806972@2)');

		//add outdoor wear to boys clothing
		$('.MP054-clothinginner:first .nav_group').append(`<li class="yCmsComponent MP54-outer"><a href="/c/outerwear-boys/" title="Outdoor Wear">Outdoor Wear<span>(Warm Clothing, Pramsuits, Jackets, ...)</span></a></li>`);
	
		//Events
		var backArrow = $('.nav_categoryTitle.nav_backArrow'),
			navExit = $('.ico.ico-cross');
		backArrow.click(function(){
			utils.events.send('MP054 - Mobile Navigation Iteration v2.0','Back Click','MP054 back button clicked on nav');

		});
		navExit.click(function(){
			utils.events.send('MP054 - Mobile Navigation Iteration v2.0','Close Nav Click','MP054 nav exit click',{
				sendOnce: true
			});
		});


		//change the text of outdoor wear
		$('.yCmsComponent a[title ="Outerwear"]').html('Outdoor Wear <span>(Warm Clothing, Pramsuits, Jackets, ...)</span>');

		

	};


	// Audience conditions
	const triggers = ((options) => {
		utils.fullStory('MP054', 'Variation 1');
		UC.poller(['body','.nav_categoryTitle','.nav_group','.nav_category'], activate);
	})();

})();
