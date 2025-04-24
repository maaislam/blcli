/* eslint-disable */
// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import { toTitleCase } from '../../../../lib/utils';

const PD012 = (() => {
    let trackerName,
        slideQ = false,
        $;

    const UCPoller = (() => {
        // Load Poller in seperate to other plugins to save on processing 
        // and only load libraries in when they are needed
        UC.poller([
      '#search',
      'body.pd001',
      '#foot_outer .mobile_footer_top_links div',
      '#foot_outer .mobile_footer_vertical_links div',
      '#content .span-24 .span-16 .lockhart_mobile_homepage_menu_links .coll_item a',
      '.span-24.section1.last', '#content > .span-24',
      'div.cmsimage',
      '#cart_header',
      'a.ui-collapsible-heading-toggle',
      '.btn-signin',
      '.btn-register',
      '.searchButton',
      '.lockhart_mobile_homepage_menu_links .coll_item > a.ui-link',
      '#foot_outer .mobile_footer_vertical_links .coll_item .ui-link, #foot_outer .mobile_footer_top_links .coll_item .ui-link',
            () => {
                if (window.jQuery) {
                    $ = window.jQuery
                    return true;
                }
            }
		], init);

		//Display more information if homepage read more links are clicked
		
		UC.poller([
			'#readMore', '.morecontent .morelink', '.containingCategoryTitleBar',
		], function(){
			if(window.location.search.indexOf("?PD012-ReadMore") > -1){
				$('.morecontent .morelink').click();
			};
		});


		//Product page, gathering quick buy information

		UC.poller([
			'button.pd2-addto__button', '.product-overlay .prod_image_main .primaryImage', '.productDetailPanel .grid_12 .link.ui-link',
		], function(){


			let addedToBag = false;
			let alreadyInArray = false;
			let jsonArray;

			if(localStorage.getItem('PD012-Products')){
				jsonArray = localStorage.getItem('PD012-Products');
				jsonArray = JSON.parse(jsonArray);
			}
			else {
				jsonArray = [];
			}

			document.querySelector('button.pd2-addto__button').addEventListener("click", function(){
				const PD012_ProductImage = document.querySelector('.product-overlay .prod_image_main .primaryImage').getAttribute('src');
				const PD012_ProductURL = document.querySelector('.productDetailPanel .grid_12 .link.ui-link').getAttribute('href');
				const PD012_ProductName = document.querySelector('.productDetailPanel .grid_12 .link.ui-link').textContent;
				
				// on click push to array

				if(addedToBag === false){

					for(let i = 0; i < jsonArray.length; i++){
						if(jsonArray[i].href == PD012_ProductURL){
							alreadyInArray = true;
						};

					};

					if(alreadyInArray === false){
						jsonArray.push({"title": PD012_ProductName, "img": PD012_ProductImage, "href": PD012_ProductURL});

						if(jsonArray.length > 10){
							jsonArray.shift();
						};

						jsonArray = JSON.stringify(jsonArray);
						localStorage.setItem('PD012-Products', jsonArray);
					};

					addedToBag = true;
				}

			});
		});


		//Category page, gathering quickbuys information

		UC.poller([
			'.positive.add-to-basket', '.primaryImage', 'h3 > .link.ui-link',
		], function(){

			$('.positive.add-to-basket').on("click", function(){

			let jsonArray;

			if(localStorage.getItem('PD012-Products')){
				jsonArray = localStorage.getItem('PD012-Products');
				jsonArray = JSON.parse(jsonArray);
			}
			else {
				jsonArray = [];
			}

			let alreadyInArray = false;

			const PD012_ProductImage = $(this).closest('.productlistItem').find('.grid_4 .primaryImage').attr('src');
			const PD012_ProductURL = $(this).closest('.productlistItem').find('h3 > .link.ui-link').attr('href');
			const PD012_ProductName = $(this).closest('.productlistItem').find('h3 > .link.ui-link').text();
				
				// on click push to array


					for(let i = 0; i < jsonArray.length; i++){
						if(jsonArray[i].href == PD012_ProductURL){
							alreadyInArray = true;
						};

					};

					if(alreadyInArray === false){
						jsonArray.push({"title": PD012_ProductName, "img": PD012_ProductImage, "href": PD012_ProductURL});

						if(jsonArray.length > 10){
							jsonArray.shift();
						};

						jsonArray = JSON.stringify(jsonArray);
						localStorage.setItem('PD012-Products', jsonArray);
					};


			});

				
		});	
    })();

    function init(){
        utils.fullStory('PD012', 'Variation 1');

        const cacheDom = (() => {
            //Cache useful selectors for later use
			const bodyVar = document.querySelector('body');
			//const searchBoxInput = document.getElementById('search');
			//const moveToFooter = document.querySelector('#foot_outer .mobile_footer_top_links div');
			//const footerParent = document.querySelector('#foot_outer .mobile_footer_vertical_links div');
			const menuParent = document.querySelectorAll('#content .span-24 .span-16 .lockhart_mobile_homepage_menu_links .coll_item a');
      const homepageBannerCarousel = document.querySelector('.span-24.section1.last');
      const categoryParent = bodyVar.querySelectorAll('#content > .span-24')[1];

			let jsonArray;
      let sliderContentParentProducts;
      let sliderContentParentBrands;


			bodyVar.classList.add('PD012');
	
            
            //Retun the selectors we want to reference in other parts of the test
            return {
				bodyVar,
				//searchBoxInput,
				//moveToFooter,
				//footerParent,
				menuParent,
        sliderContentParentProducts,
        sliderContentParentBrands,
				homepageBannerCarousel,
        jsonArray,
        categoryParent

            };
        })();


        const testBuilder = {

            setupElements(){

          //Commented code below from client amends
          
          
				//Moves existing elements

				//cacheDom.footerParent.insertBefore(cacheDom.moveToFooter.children[0], cacheDom.footerParent.children[0]);
				//cacheDom.footerParent.insertBefore(cacheDom.moveToFooter.children[0], cacheDom.footerParent.children[0]);

				//Edit existing elements

				//cacheDom.searchBoxInput.placeholder = "What are you looking for?";

				//Check session storage for basket items

                if(localStorage.getItem('PD012-Products')){
                    cacheDom.jsonArray = localStorage.getItem('PD012-Products');
                    cacheDom.jsonArray = JSON.parse(cacheDom.jsonArray);
				}
				else {
					cacheDom.jsonArray = 0;
				};

				// on load check array
                if(cacheDom.jsonArray.length >= 2){

					//build slick slider
					functionalityBuilder.buildQuickBuysSlider();
                };

				//Set up test elements

				for(let i = 0; i < cacheDom.menuParent.length; i++){
					if(cacheDom.menuParent[i].textContent.toUpperCase() == "PPE"){

						cacheDom.menuParent[i].textContent = "";

						const PPE_Image = (`
						<img src="//www.sitegainer.com/fu/up/lpgjhwlrbd6m2j5.jpg" class="PD012_Homepage_Image PD012_Homepage_Image_PPE" alt="PPE" />
						`);

						const PPEMarkUp = (`
						<span class="PD012_ReadMore_Wrapper">
							<p class="PD012_ReadMore_Header">PPE</p>
							<p class="PD012_ReadMore_Text">Effective PPE is vital to provide the protection your workforce requires in order to work safely and ensure that all employment laws are complied with.</p>
							<a class="PD012_ReadMoreLink PD012_PPE_ReadMore" href="/Personal-Protective-Equipment-PPE-~c~A?PD012-ReadMore">Read More ></a> 
						</span>
						`);

						cacheDom.menuParent[i].insertAdjacentHTML('afterbegin', PPE_Image);
						cacheDom.menuParent[i].insertAdjacentHTML('afterend', PPEMarkUp);

					} else if(cacheDom.menuParent[i].textContent.toUpperCase() == "GLOVES"){

						cacheDom.menuParent[i].textContent = "";

						const GlovesImage = (`
						<img src="//www.sitegainer.com/fu/up/a5ktk03lze928ed.jpg" class="PD012_Homepage_Image PD012_Homepage_Image_Gloves" alt="Gloves" />
						`);

						const GlovesMarkUp = (`
						<span class="PD012_ReadMore_Wrapper">
							<p class="PD012_ReadMore_Header">Hand Protection</p>
							<p class="PD012_ReadMore_Text">Hand protection gloves and sleeves can help to maximise safety, as well as ensuring you comply with international and European safety laws including EN420 (the general requirements for gloves). Find our full range of protective gloves and sleeves for a wide range of purposes below.</p>
							<a class="PD012_ReadMoreLink PD012_Gloves_ReadMore" href="/Personal-Protective-Equipment-PPE-/Hand-Protection~c~AF?PD012-ReadMore">Read More ></a>
						</span>
						`);

						cacheDom.menuParent[i].insertAdjacentHTML('afterbegin', GlovesImage);
						cacheDom.menuParent[i].insertAdjacentHTML('afterend', GlovesMarkUp);

					} else if(cacheDom.menuParent[i].textContent.toUpperCase() == "RESPIRATORS"){


						cacheDom.menuParent[i].textContent = "";

						const RespiratorsImage = (`
						<img src="//www.sitegainer.com/fu/up/j7gr87l8lensyf5.jpg" class="PD012_Homepage_Image PD012_Homepage_Image_Respirators" alt="Respirators" />
						`);

						const RespiratorsMarkUp = (`
						<span class="PD012_ReadMore_Wrapper">
							<p class="PD012_ReadMore_Header">Respiratory</p>
							<p class="PD012_ReadMore_Text">The correct selection and application of respiratory protective equipment is vital for protecting employees and meeting international safety standards.</p>
							<a class="PD012_ReadMoreLink PD012_Respirators_ReadMore" href="/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment~c~AE?PD012-ReadMore">Read More ></a>				
						</span>
						`);

						cacheDom.menuParent[i].insertAdjacentHTML('afterbegin', RespiratorsImage);
						cacheDom.menuParent[i].insertAdjacentHTML('afterend', RespiratorsMarkUp);


					} else if(cacheDom.menuParent[i].textContent.toUpperCase() == "FOOTWEAR"){

						cacheDom.menuParent[i].textContent = "";

						const FootwearImage = (`
						<img src="//www.sitegainer.com/fu/up/3givywiu7snl0gy.jpg" class="PD012_Homepage_Image PD012_Homepage_Image_Footwear" alt="Footwear" />
						`);

						const FootwearMarkUp = (`
						<span class="PD012_ReadMore_Wrapper">
							<p class="PD012_ReadMore_Header">Footwear</p>
							<p class="PD012_ReadMore_Text">We offer a range of safety boots and shoes here at Protec Direct, to provide both men and women with protection from workplace hazards.</p>
							<a class="PD012_ReadMoreLink PD012_Footwear_ReadMore" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear~c~AG?PD012-ReadMore">Read More ></a>
						</span>
						`);

						cacheDom.menuParent[i].insertAdjacentHTML('afterbegin', FootwearImage);
						cacheDom.menuParent[i].insertAdjacentHTML('afterend', FootwearMarkUp);
						
					} else if(cacheDom.menuParent[i].textContent.toUpperCase() == "WORKWEAR"){

						cacheDom.menuParent[i].textContent = "";

						const WorkwearImage = (`
						<img src="//www.sitegainer.com/fu/up/71tkm0t8m694idk.jpg" class="PD012_Homepage_Image PD012_Homepage_Image_Workwear" alt="Workwear" />
						`);

						const WorkwearMarkUp = (`
						<span class="PD012_ReadMore_Wrapper">
							<p class="PD012_ReadMore_Header">Clothing & Workwear</p>
							<p class="PD012_ReadMore_Text">At Protec Direct, we supply a wide range of workwear and protective clothing, so you can find everything you need to kit out your team.</p>
							<a class="PD012_ReadMoreLink PD012_Workwear_ReadMore" href="/Clothing-and-Workwear~c~B?PD012-ReadMore">Read More ></a>
						</span>
						`);

						cacheDom.menuParent[i].insertAdjacentHTML('afterbegin', WorkwearImage);
						cacheDom.menuParent[i].insertAdjacentHTML('afterend', WorkwearMarkUp);

					} else if(cacheDom.menuParent[i].textContent.toUpperCase() == "CONSUMABLES"){

						cacheDom.menuParent[i].textContent = "";

						const ConsumablesImage = (`
						<img src="//www.sitegainer.com/fu/up/utsldfe1y06yjr9.jpg" class="PD012_Homepage_Image PD012_Homepage_Image_Consumables" alt="Consumables" />
						`);

						const ConsumablesMarkUp = (`
						<span class="PD012_ReadMore_Wrapper">
							<p class="PD012_ReadMore_Header">Site Consumables</p>
							<p class="PD012_ReadMore_Text">Running alongside our extensive best-selling ranges of PPE & Workwear, Protec Direct also supply a comprehensive collection of Site Equipment & Consumables products.</p>
							<a class="PD012_ReadMoreLink PD012_Workwear_ReadMore" href="/Site-Equipment-and-Consumables~c~D?PD012-ReadMore">Read More ></a>
						</span>
						`);

						cacheDom.menuParent[i].insertAdjacentHTML('afterbegin', ConsumablesImage);
						cacheDom.menuParent[i].insertAdjacentHTML('afterend', ConsumablesMarkUp);
					};
				};
        functionalityBuilder.buildBrandsSlider();

            }

        };

        
        const functionalityBuilder = {
            //Builds the functions of the test

			buildEventTracking(){

				//header


				$('div.cmsimage').click(function(){
					utils.events.send('PD012', 'Header', 'Logo');
				});

				$('#cart_header').click(function(){
					utils.events.send('PD012', 'Header', 'Basket', true);
				});

				$('a.ui-collapsible-heading-toggle').click(function(){
					utils.events.send('PD012', 'Header', 'Menu', true);
				});

				$('.btn-signin').click(function(){
					utils.events.send('PD012', 'Header', 'Sign In', true);
				});

				$('.btn-register').click(function(){
					utils.events.send('PD012', 'Header', 'Register', true);
				});

				$('.searchButton').click(function(){
					utils.events.send('PD012', 'Header', 'Search', true);
				});

				//Category

				$('.lockhart_mobile_homepage_menu_links .coll_item > a.ui-link').click(function(){
					let PD012_Category_Image_Tracking = $(this).attr("title");
					utils.events.send('PD012', 'Category Image', PD012_Category_Image_Tracking, true);
				});

				$('.PD012_ReadMoreLink').click(function(){
					let PD012_Category_ReadMore_Tracking = $(this).siblings('.PD012_ReadMore_Header').text();
					utils.events.send('PD012', 'Category Read More', PD012_Category_ReadMore_Tracking, true);
				});

				//Footer

				$('#foot_outer .mobile_footer_vertical_links .coll_item .ui-link, #foot_outer .mobile_footer_top_links .coll_item .ui-link').click(function(){
					let PD012_Footer_Tracking = $(this).text();
					utils.events.send('PD012', 'Footer', PD012_Footer_Tracking, true);
        });

			},

			
			buildQuickBuysSlider(){

        //Build quick buys slider 

	      var PD012SlickCodeProducts = function(){
	
				let quickBuysSliderMarkup = (`
				<p class="PD012_QuickBuy_Top">Quick buys</p>
				<section class="landing_wrap PD012_Products">
					<div class="landing_slider PD012_landing_slider_Product">
					</div>
				</section>
				`);

				cacheDom.homepageBannerCarousel.insertAdjacentHTML('afterend', quickBuysSliderMarkup);
				cacheDom.sliderContentParentProducts = $('.landing_slider.PD012_landing_slider_Product');

				cacheDom.jsonArray = cacheDom.jsonArray.reverse();
				for(let i = 0; i < cacheDom.jsonArray.length; i++){
			
					let PD012_ProductCarouselMarkup = (`
					<div class="PD012_CarouselWrapper PD012_Product">
						<h3 class="PD012_CarouselHeader"><a class="PD012_HeaderLink" href="`+ cacheDom.jsonArray[i].href +`">` + cacheDom.jsonArray[i].title + `</a></h3>
							<a class="PD012_Carousel_Image_Link" href="`+ cacheDom.jsonArray[i].href +`">
							<img class="PD012_Carousel_Image" src="`+ cacheDom.jsonArray[i].img +`" alt="` + cacheDom.jsonArray[i].title + `" />
						</a>
					</div>
					`);
					
					cacheDom.sliderContentParentProducts.append(PD012_ProductCarouselMarkup);
					
				};

          document.querySelector('.landing_wrap.PD012_Products').className = "PD012_landing_wrap";
          document.querySelector('.PD012_landing_wrap').classList.add("PD012_Product_Carousel");
				//	document.querySelector('.landing_slider').classList.add('PD012_landing_slider');
          document.querySelector('.PD012_landing_slider_Product').classList.remove('landing_slider');

          cacheDom.sliderContentParentProducts.slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            arrows: true
          });

          if(cacheDom.jsonArray.length > 2){

            document.querySelector('.PD012_landing_slider_Product > .slick-prev.slick-arrow').textContent = "";
            document.querySelector('.PD012_landing_slider_Product > .slick-next.slick-arrow').textContent = "";

          }

          //set slick slider height

					UC.poller([
						'.PD012_landing_slider_Product.slick-initialized.slick-slider', '.PD012_CarouselWrapper.PD012_Product',
					], function(){
						let slickHeight = 0;
            let PD012SlickSlides = $('.PD012_CarouselWrapper.PD012_Product');
						for(let i = 0; i < PD012SlickSlides.length; i++){
							if($(PD012SlickSlides[i]).outerHeight() > slickHeight){
                slickHeight = $(PD012SlickSlides[i]).outerHeight();
              };
            };
          $('.PD012_landing_wrap.PD012_Product_Carousel').height(slickHeight + 2).addClass('PD012_Image_Align');
          });

        //Quick buys - tracking

        $('.PD012_Product .PD012_CarouselHeader, .PD012_Product .PD012_Carousel_Image_Link').click(function(){
          utils.events.send('PD012', 'Quick Buys', 'Product', true);
        });
        };

        if($.fn.slick){
          PD012SlickCodeProducts();
        } else {
          $.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', PD012SlickCodeProducts);
      
        }


      },


      
      buildBrandsSlider(){

        var PD012SlickCodeBrands = function(){

          let brandsMarkup = (`
            <p class="PD012_Brands_Top">Top Brands</p>
            <section class="landing_wrap PD012_Brands">
              <div class="landing_slider PD012_landing_slider_Brands">
              </div>
            </section>
            <div class="PD012_More_Brands_Wrapper">
              <a class="PD012_More_Brands_Link" href="/Brands~c~brands">View More Brands</a>
            </div>
				`);

				cacheDom.categoryParent.insertAdjacentHTML('beforebegin', brandsMarkup);
        cacheDom.sliderContentParentBrands = $('.landing_slider.PD012_landing_slider_Brands');
        
        let PD012_BrandsCarouselMarkup = (`
        <div class="PD012_CarouselWrapper PD012_Brand">
          <h3 class="PD012_CarouselHeader"><a class="PD012_HeaderLink" href="/Brands/3M~c~3M">3M</a></h3>
            <a class="PD012_Carousel_Image_Link" href="/Brands/3M~c~3M">
            <img class="PD012_Carousel_Image" src="/medias/sys_master/root/h51/h7c/8801430831134/-category-3MLOGO.jpg" alt="3M" />
          </a>
        </div>

        <div class="PD012_CarouselWrapper PD012_Brand">
          <h3 class="PD012_CarouselHeader"><a class="PD012_HeaderLink" href="/Brands/Tuf~c~TUF">TUF</a></h3>
            <a class="PD012_Carousel_Image_Link" href="/Brands/Tuf~c~TUF">
            <img class="PD012_Carousel_Image" src="/medias/sys_master/root/hdb/h79/8810000121886/-category-TUF-COLOUR.jpg" alt="TUF" />
          </a>
        </div>

        <div class="PD012_CarouselWrapper PD012_Brand">
          <h3 class="PD012_CarouselHeader"><a class="PD012_HeaderLink" href="/Brands/Deb~c~DEB">Deb</a></h3>
            <a class="PD012_Carousel_Image_Link" href="/Brands/Deb~c~DEB">
            <img class="PD012_Carousel_Image" src="/medias/sys_master/root/h7b/h7c/8801432207390/-category-DEBLOGO.jpg" alt="Deb" />
          </a>
        </div>

        <div class="PD012_CarouselWrapper PD012_Brand">
          <h3 class="PD012_CarouselHeader"><a class="PD012_HeaderLink" href="/Brands/Showa~c~SHOWA">Showa</a></h3>
            <a class="PD012_Carousel_Image_Link" href="/Brands/Showa~c~SHOWA">
            <img class="PD012_Carousel_Image" src="/medias/sys_master/root/hf2/h81/8807920500766/-category-Showa-New-Logo.jpg" alt="Showa" />
          </a>
        </div>

        <div class="PD012_CarouselWrapper PD012_Brand">
          <h3 class="PD012_CarouselHeader"><a class="PD012_HeaderLink" href="/Brands/Timberland-PRO-Series~c~TIMBERLAND">Timberland PRO Series</a></h3>
            <a class="PD012_Carousel_Image_Link" href="/Brands/Timberland-PRO-Series~c~TIMBERLAND">
            <img class="PD012_Carousel_Image" src="/medias/sys_master/root/h08/h7d/8801436827678/-category-TIMBERLAND.jpg" alt="Timberland PRO Series" />
          </a>
        </div>

        <div class="PD012_CarouselWrapper PD012_Brand">
          <h3 class="PD012_CarouselHeader"><a class="PD012_HeaderLink" href="/Brands/Helly-Hansen~c~HELLYHANSEN">Helly Hansen</a></h3>
            <a class="PD012_Carousel_Image_Link" href="/Brands/Helly-Hansen~c~HELLYHANSEN">
            <img class="PD012_Carousel_Image" src="/medias/sys_master/root/h9f/h7c/8801433387038/-category-HHLOGO.jpg" alt="Helly Hansen" />
          </a>
        </div>

        <div class="PD012_CarouselWrapper PD012_Brand">
          <h3 class="PD012_CarouselHeader"><a class="PD012_HeaderLink" href="/Brands/Rock-Fall~c~ROCKFALL">Rock Fall</a></h3>
            <a class="PD012_Carousel_Image_Link" href="/Brands/Rock-Fall~c~ROCKFALL">
            <img class="PD012_Carousel_Image" src="/medias/sys_master/root/hf0/h7c/8801436041246/-category-ROCKFALL.jpg" alt="Rock Fall" />
          </a>
        </div>

        <div class="PD012_CarouselWrapper PD012_Brand">
          <h3 class="PD012_CarouselHeader"><a class="PD012_HeaderLink" href="/Brands/Uvex~c~UVEX">Uvex</a></h3>
            <a class="PD012_Carousel_Image_Link" href="/Brands/Uvex~c~UVEX">
            <img class="PD012_Carousel_Image" src="/medias/sys_master/root/h1d/h7d/8801437515806/-category-UVEXLOGO.jpg" alt="Uvex" />
          </a>
        </div>

        <div class="PD012_CarouselWrapper PD012_Brand">
          <h3 class="PD012_CarouselHeader"><a class="PD012_HeaderLink" href="/Brands/Dr-Martens~c~DRMARTENS">Dr Martens</a></h3>
            <a class="PD012_Carousel_Image_Link" href="/Brands/Dr-Martens~c~DRMARTENS">
            <img class="PD012_Carousel_Image" src="/medias/sys_master/root/hd1/h7d/8801443414046/-category-DRMARTENSLOGO.jpg" alt="Dr Martens" />
          </a>
        </div>

        <div class="PD012_CarouselWrapper PD012_Brand">
          <h3 class="PD012_CarouselHeader"><a class="PD012_HeaderLink" href="/Brands/Regatta-Professional~c~REGATTA">Regatta Professional</a></h3>
            <a class="PD012_Carousel_Image_Link" href="/Brands/Regatta-Professional~c~REGATTA">
            <img class="PD012_Carousel_Image" src="/medias/sys_master/root/h8d/h76/8807824916510/-category-Regatta-Professional.jpg" alt="Regatta Professional" />
          </a>
        </div>

        `);
        
        cacheDom.sliderContentParentBrands.append(PD012_BrandsCarouselMarkup);

        document.querySelector('.landing_wrap.PD012_Brands').className = "PD012_landing_wrap";
        document.querySelector('.PD012_Brands_Top + .PD012_landing_wrap').classList.add("PD012_Brands_Carousel");
      //	document.querySelector('.landing_slider').classList.add('PD012_landing_slider');
        document.querySelector('.PD012_landing_slider_Brands').classList.remove('landing_slider');

        cacheDom.sliderContentParentBrands.slick({
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          arrows: true
        });

        document.querySelector('.PD012_landing_slider_Brands > .slick-prev.slick-arrow').textContent = "";
        document.querySelector('.PD012_landing_slider_Brands > .slick-next.slick-arrow').textContent = "";

        					//set slick slider height

					UC.poller([
						'.PD012_landing_slider_Brands.slick-initialized.slick-slider', '.PD012_CarouselWrapper.PD012_Brand',
					], function(){
						let slickHeight = 0;
						let PD012SlickSlides = $('.PD012_CarouselWrapper.PD012_Brand');
	
						for(let i = 0; i < PD012SlickSlides.length; i++){

							if($(PD012SlickSlides[i]).outerHeight() > slickHeight){
								slickHeight = $(PD012SlickSlides[i]).outerHeight();
							};

						};
						$('.PD012_landing_wrap.PD012_Brands_Carousel').height(slickHeight + 2).addClass('PD012_Image_Align');
					
          });
          
                  
        //Brands Carousel tracking

        //Brand Title
        $('.PD012_Brand > .PD012_CarouselHeader').click(function(){
          let PD012_Brand_Header = $(this).find('a').text().trim();
          utils.events.send('PD012', 'Brands Carousel', PD012_Brand_Header, true);
        });

        
        //Brand image

        $('.PD012_Brand > .PD012_Carousel_Image_Link').click(function(){
          let PD012_Brand_Image = $(this).closest('.PD012_CarouselWrapper.PD012_Brand').find('h3 > .PD012_HeaderLink').text().trim();
          utils.events.send('PD012', 'Brands Carousel', PD012_Brand_Image, true);
        });

        //View more brands
        $('.PD012_More_Brands_Link').click(function(){
          utils.events.send('PD012', 'Brands', 'View More Brands Link', true);
        });

        }


        if($.fn.slick){
          PD012SlickCodeBrands();
        } else {
          $.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', PD012SlickCodeBrands);
      
        }

      }
		};
		

    testBuilder.setupElements();
   
       
	}
	
})();