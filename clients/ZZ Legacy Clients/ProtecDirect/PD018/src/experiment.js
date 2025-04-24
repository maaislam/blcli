/* eslint-disable */
// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const PD018 = (() => {
    let trackerName,
        slideQ = false,
        $;

    const UCPoller = (() => {
        // Load Poller in seperate to other plugins to save on processing 
        // and only load libraries in when they are needed
        UC.poller([
          '#content > .span-24',
          '.span-24.section1.last',
          'body.pd001',
          '#content .span-24 .span-16 .lockhart_mobile_homepage_menu_links .coll_item a',
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
    

    //Display more information if homepage read more links are clicked - PD012
		
		UC.poller([
			'#readMore', '.morecontent .morelink', '.containingCategoryTitleBar',
		], function(){
			if(window.location.search.indexOf("?PD012-ReadMore") > -1){
				$('.morecontent .morelink').click();
			};
    });
    
    //Store product information when on product page
		UC.poller([
      '.productDetailPanel > .grid_12 > h2', '.product-overlay .prod_image_main > .primaryImage', '.price-text > .productVariantSelector-price-header', '.price-text > .vat',
      '.productDetailPanel > .grid_12 > h3 > a', 
		], function(){
			let jsonArray;
			let alreadyInArray = false;
			
			if(localStorage.getItem('PD018-Products')){
				jsonArray = localStorage.getItem('PD018-Products');
				jsonArray = JSON.parse(jsonArray);
			}
			else {
				jsonArray = [];
			}

			//Push product information to local storage

			const PD018ProductBrand = document.querySelector('.productDetailPanel > .grid_12 > h2').textContent;
			const PD018ProductName = document.querySelector('.productDetailPanel > .grid_12 > h3 > a').textContent;
			const PD018ProductImageLink = document.querySelector('.product-overlay .prod_image_main > .primaryImage').getAttribute('src');
			const PD018ProductLink = window.location.pathname;
			const PD018ExVATPrice = document.querySelector('.price-text > .productVariantSelector-price-header').textContent.trim() + " " + document.querySelector('.price-text > .vat').textContent.trim();

			for(let i = 0; i < jsonArray.length; i++){
				if(jsonArray[i].href == PD018ProductLink){
					alreadyInArray = true;
				};

      };
    
			if(alreadyInArray === false){
				jsonArray.push({"name": PD018ProductName, "img": PD018ProductImageLink, "href": PD018ProductLink, "ExVATPrice": PD018ExVATPrice, "Brand": PD018ProductBrand});

				if(jsonArray.length > 10){
					jsonArray.shift();
				};

				jsonArray = JSON.stringify(jsonArray);
				localStorage.setItem('PD018-Products', jsonArray);
			};
    });
  })();

    function init(){
        utils.fullStory('PD018', 'Variation 1');

        const cacheDom = (() => {
            //Cache useful selectors for later use
            const bodyVar = document.querySelector('body');

            bodyVar.classList.add('PD018');
            const menuParent = bodyVar.querySelectorAll('#content .span-24 .span-16 .lockhart_mobile_homepage_menu_links .coll_item a');
            const homepageBannerCarousel = bodyVar.querySelector('.span-24.section1.last');
            const categoryParent = bodyVar.querySelectorAll('#content > .span-24')[1];
            let PD018Array; 

            let sliderContentParentProducts;
            let sliderContentParentBrands;

            
            //Retun the selectors we want to reference in other parts of the test
            return {
                bodyVar,
                menuParent,
                homepageBannerCarousel,
                PD018Array,
                sliderContentParentProducts,
                sliderContentParentBrands,
                categoryParent

            };
        })();


        const testBuilder = {

            setupElements(){
                //PD012

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

                //PD018

                //Assume returning user if they have been to a product page
                if(localStorage.getItem('PD018-Products')){
                  cacheDom.PD018Array = localStorage.getItem('PD018-Products');
                  cacheDom.PD018Array = JSON.parse(cacheDom.PD018Array);


                  let PD018Markup = (`
                    <div class="PD018-Wrapper">
                      <div class="PD018-Header-Wrapper">
                        <p class="PD018-Header-Text">Jump Back In</p>
                      </div>
                      <div class="PD018-Buttons-Wrapper">
                        <p class="PD018-Favourites-Button-Wrapper">
                          <a class="PD018-Favourites-Button" href="my-account/my-favourites">View My Favourites</a>
                        </p>
                        <p class="PD018-Order-History-Button-Wrapper">
                          <a class="PD018-Order-History-Button" href="/my-account/orders">View My Order History</a>
                        </p>
                      </div>
                    </div>
                  `);


                  cacheDom.homepageBannerCarousel.insertAdjacentHTML('afterend', PD018Markup);
                  functionalityBuilder.buildRecentlyViewedCarousel();	

                  //Tracking for PD018 specific elements

                  cacheDom.bodyVar.querySelector('.PD018-Favourites-Button').addEventListener('click', function(){
                    utils.events.send('PD018', 'Homepage', 'My Favourites', true);
                  });

                  cacheDom.bodyVar.querySelector('.PD018-Order-History-Button').addEventListener('click', function(){
                    utils.events.send('PD018', 'Homepage', 'My Order History', true);
                  });
                }

                functionalityBuilder.buildBrandsSlider();
                functionalityBuilder.buildEventTracking();
            
            }

        };

        
        const functionalityBuilder = {

            buildEventTracking(){

              //Tracking from PD012

              //header
      
              $('div.cmsimage').click(function(){
                utils.events.send('PD018', 'Header', 'Logo');
              });
      
              $('#cart_header').click(function(){
                utils.events.send('PD018', 'Header', 'Basket', true);
              });
      
              $('a.ui-collapsible-heading-toggle').click(function(){
                utils.events.send('PD018', 'Header', 'Menu', true);
              });
      
              $('.btn-signin').click(function(){
                utils.events.send('PD018', 'Header', 'Sign In', true);
              });
      
              $('.btn-register').click(function(){
                utils.events.send('PD018', 'Header', 'Register', true);
              });
      
              $('.searchButton').click(function(){
                utils.events.send('PD018', 'Header', 'Search', true);
              });
      
              //Category
      
              $('.lockhart_mobile_homepage_menu_links .coll_item > a.ui-link').click(function(){
                let PD018_Category_Image_Tracking = $(this).attr("title");
                utils.events.send('PD018', 'Category Image', PD018_Category_Image_Tracking, true);
              });
      
              $('.PD018_ReadMoreLink').click(function(){
                let PD018_Category_ReadMore_Tracking = $(this).siblings('.PD018_ReadMore_Header').text();
                utils.events.send('PD018', 'Category Read More', PD018_Category_ReadMore_Tracking, true);
              });
      
              //Footer
      
              $('#foot_outer .mobile_footer_vertical_links .coll_item .ui-link, #foot_outer .mobile_footer_top_links .coll_item .ui-link').click(function(){
                let PD018_Footer_Tracking = $(this).text();
                utils.events.send('PD018', 'Footer', PD018_Footer_Tracking, true);
              });


      
            },

            buildBrandsSlider(){

              //From PD012

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
      
              cacheDom.bodyVar.querySelector('.landing_wrap.PD012_Brands').className = "PD012_landing_wrap";
              cacheDom.bodyVar.querySelector('.PD012_landing_wrap').classList.add("PD012_Brands_Carousel");
              cacheDom.bodyVar.querySelector('.PD012_landing_slider_Brands').classList.remove('landing_slider');
      
              cacheDom.sliderContentParentBrands.slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: false,
                arrows: true
              });
      
              cacheDom.bodyVar.querySelector('.PD012_landing_slider_Brands > .slick-prev.slick-arrow').textContent = "";
              cacheDom.bodyVar.querySelector('.PD012_landing_slider_Brands > .slick-next.slick-arrow').textContent = "";
      
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
                utils.events.send('PD018', 'Brands Carousel', PD012_Brand_Header, true);
              });
      
              
              //Brand image
      
              $('.PD012_Brand > .PD012_Carousel_Image_Link').click(function(){
                let PD012_Brand_Image = $(this).closest('.PD012_CarouselWrapper.PD012_Brand').find('h3 > .PD012_HeaderLink').text().trim();
                utils.events.send('PD018', 'Brands Carousel', PD012_Brand_Image, true);
              });
      
              //View more brands
              $('.PD012_More_Brands_Link').click(function(){
                utils.events.send('PD018', 'Brands', 'View More Brands Link', true);
              });
      
              }
      
              if($.fn.slick){
                PD012SlickCodeBrands();
              } else {
                $.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', PD012SlickCodeBrands);
            
              }
      
            },

            //PD018 - Carousel

            buildRecentlyViewedCarousel(){

              var PD018SlickDependentCodeProducts = function(){
                let recentlyViewedSliderMarkup = (`
              <p class="PD018_RecentlyViewed_Carousel_Header">Recently Viewed</p>
                <section class="landing_wrap PD018_Recently_Viewed">
                  <div class="landing_slider">
                </div>
              </section>
              `);
      
              cacheDom.bodyVar.querySelector('.PD018-Buttons-Wrapper').insertAdjacentHTML('afterend', recentlyViewedSliderMarkup);
              cacheDom.sliderContentParentProducts = $('.PD018-Wrapper > .landing_wrap.PD018_Recently_Viewed > .landing_slider');
      
              cacheDom.PD018Array = cacheDom.PD018Array.reverse();
      
      
              for(let i = 0; i < cacheDom.PD018Array.length; i++){
            
                let PD018_CarouselMarkup = (`
                <div class="PD018_CarouselWrapper">
                    <h3 class="PD018_Carousel_Brand_Text"><a class="PD018_Brand_Link" href="`+ cacheDom.PD018Array[i].BrandLink +`">` + cacheDom.PD018Array[i].Brand + `</a></h3>
                    <a class="PD018_Carousel_Image_Link" href="`+ cacheDom.PD018Array[i].href +`">
                      <img class="PD018_Carousel_Image" src="`+ cacheDom.PD018Array[i].img +`" alt="` + cacheDom.PD018Array[i].name + `" />
                    </a>
                    <h3 class="PD018_Carousel_Product_Title"><a class="PD018_Carousel_Product_Link" href="` + cacheDom.PD018Array[i].href +`">` + cacheDom.PD018Array[i].name + `</h3>
                      <p class="PD018_Carousel_Product_ExVAT_Price">` +  cacheDom.PD018Array[i].ExVATPrice +`</p>
                      </a>
                </div>
                `);
                
                cacheDom.sliderContentParentProducts.append(PD018_CarouselMarkup);
                
              };

              cacheDom.bodyVar.querySelector('.landing_wrap.PD018_Recently_Viewed').className = "PD018_landing_wrap";
              cacheDom.bodyVar.querySelector('.landing_slider').classList.add('PD018_landing_slider');
              cacheDom.bodyVar.querySelector('.PD018_landing_slider').classList.remove('landing_slider');
              
              cacheDom.sliderContentParentProducts.slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: false,
                arrows: true
              });

              //Hide Slick's default arrows
              
              if(cacheDom.PD018Array.length > 2){
  
                cacheDom.bodyVar.querySelector('.slick-prev.slick-arrow').textContent = "";
                cacheDom.bodyVar.querySelector('.slick-next.slick-arrow').textContent = "";
      
              }
      
              //set slick slider height
              
                UC.poller([
                  '.PD018_landing_slider.slick-initialized.slick-slider', '.PD018_CarouselWrapper',
                ], function () {
                  let slickHeight = 0;
                  let PD018SlickSlides = $('.PD018_CarouselWrapper');
      
                  for (let i = 0; i < PD018SlickSlides.length; i++) {
      
                    if ($(PD018SlickSlides[i]).outerHeight() > slickHeight) {
                      slickHeight = $(PD018SlickSlides[i]).outerHeight();
                    };
      
                  };
                  $('.PD018_landing_wrap').height(slickHeight + 2);
                });	
      
              }
      
              if($.fn.slick){
                PD018SlickDependentCodeProductsProducts();
              
              } else {
                $.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', PD018SlickDependentCodeProducts);
                
              }
              
            },

        };
    
        testBuilder.setupElements();
       
    }    
})();