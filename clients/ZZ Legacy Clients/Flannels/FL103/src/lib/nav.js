import { getCookie } from "../../../../../lib/utils";

export const nav = () => {
    
    const activeCurrency = getCookie('FlannelsFashion_AnonymousUserCurrency');
    let currencyIcon = '£';
    let currency = 'GBP';
    let iconClass = 'glyphicon-gbp';

    // console.log('active currency ', activeCurrency);
    if (activeCurrency) {
        switch (activeCurrency.trim()) {
            case 'EUR':
                currencyIcon = '€';
                currency = 'EUR';
                iconClass = 'glyphicon-eur';
                break;
            case 'USD':
                currencyIcon = '$';
                currency = 'USD';
                iconClass = 'glyphicon-usd';
                break;
            case 'GBP':
                currencyIcon = '£';
                currency = 'GBP';
                iconClass = 'glyphicon-gbp';
                break;
        }
    }


    // Logged in status
    const loggedStatus = () => {
        if (window.dataLayer) {
            if (window.dataLayer[1]) {
                if (window.dataLayer[1].visitorLoginState === 'anonymous') {
                    return false;
                } else {
                    return true;
                }
            }
        }
    }

    return `
        <div class="FL-nav" style="display: none;">
            <div class="FL-nav--header">
                
                <div class="FL-tablinks">
                     <button class="FL-tabLink FL-activeTitle" data-tab="FL-mens">Men</button>
                     <button class="FL-tabLink" data-tab="FL-womens">Women</button>
                     <button class="FL-tabLink" data-tab="FL-kids">Kids</button>
                </div>

                <div class="FL-navClose">x</div>

            </div>
            <div class="FL-nav--tabs">
                <div class="FL-nav--tab FL-activeTab" id="FL-mens">
                <ul>
                <li class="level1 mobOnly">
                   <a href="/men/new-arrivals">New</a> 	            
                   <div class="1258556Center Center"></div>
                </li>
                <li class="columnGroup clearfix">
                   <ul>
                      <li class="mmHasChild level1 sdmColHeader colGroupStart colGroupEnd">
                         <a href="/men/clothing" class="FL-noLink">Clothing</a> 	            
                         <div class="1258504Center Center"></div>
                         <ul>
                            <li class="level2">	<a href="/men/clothing/activewear">Activewear</a> </li>
                            <li class="level2">	<a href="/men/clothing/jackets-and-coats">Jackets &amp; Coats</a> </li>
                            <li class="level2">	<a href="/men/clothing/jeans">Jeans</a> </li>
                            <li class="level2">	<a href="/men/clothing/knitwear">Knitwear</a> </li>
                            <li class="level2">	<a href="/men/clothing/loungewear">Loungewear</a> </li>
                            <li class="level2">	<a href="/men/clothing/polo-shirts">Polo Shirts</a> </li>
                            <li class="level2">	<a href="/men/clothing/shirts">Shirts</a> </li>
                            <li class="level2">	<a href="/men/clothing/shorts-and-swimwear">Shorts &amp; Swimwear</a> </li>
                            <li class="level2">	<a href="/men/clothing/socks">Socks</a> </li>
                            <li class="level2">	<a href="/men/clothing/suits">Suits</a> </li>
                            <li class="level2">	<a href="/men/clothing/sweatshirts">Sweatshirts &amp; Hoodies</a> </li>
                            <li class="level2">	<a href="/men/clothing/trousers">Trousers</a> </li>
                            <li class="level2">	<a href="/men/clothing/t-shirts">T-Shirts</a> </li>
                            <li class="level2">	<a href="/men/clothing/underwear">Underwear</a> </li>
                            <li class="level2 sdmColStrong">	<a href="/men/clothing">View All</a> </li>
                         </ul>
                      </li>
                   </ul>
                </li>
                
                <li class="columnGroup clearfix">
                   <ul>
                      <li class="mmHasChild level1 sdmColHeader colGroupStart colGroupEnd">
                         <a href="/men/accessories" class="FL-noLink">Accessories</a> 	            
                         <div class="1258520Center Center"></div>
                         <ul>
                            <li class="level2">	<a href="/men/bags">Bags</a> </li>
                            <li class="level2">	<a href="/men/accessories/belts">Belts</a> </li>
                            <li class="level2">	<a href="/men/accessories/cufflinks-and-jewellery">Cufflinks &amp; Jewellery</a> </li>
                            <li class="level2">	<a href="/men/accessories/gloves-and-scarves">Gloves &amp; Scarves</a> </li>
                            <li class="level2">	<a href="/beauty/fragrance/mens">Fragrance</a> </li>
                            <li class="level2">	<a href="/beauty/mens-grooming">Grooming</a> </li>
                            <li class="level2">	<a href="/men/accessories/hats-and-caps">Hats &amp; Caps</a> </li>
                            <li class="level2">	<a href="/men/accessories/sunglasses">Sunglasses</a> </li>
                            <li class="level2">	<a href="/men/accessories/technology">Technology</a> </li>
                            <li class="level2">	<a href="/men/accessories/ties-and-pocket-squares">Ties &amp; Pocket Squares</a> </li>
                            <li class="level2">	<a href="/men/accessories/wallets-and-card-holders">Wallets &amp; Card Holders</a> </li>
                            <li class="level2">	<a href="/men/accessories/watches">Watches</a> </li>
                            <li class="level2 sdmColStrong">	<a href="/men/accessories">View All</a> </li>
                         </ul>
                      </li>
                   </ul>
                </li>
                <li class="columnGroup clearfix">
                   <ul>
                      <li class="mmHasChild level1 sdmColHeader colGroupStart">
                         <a href="/men/shoes" class="FL-noLink">Shoes</a> 	            
                         <div class="1258534Center Center"></div>
                         <ul>
                            <li class="level2">	<a href="/men/shoes/boots">Boots</a> </li>
                            <li class="level2">	<a href="/men/shoes/dress-shoes">Dress Shoes</a> </li>
                            <li class="level2">	<a href="/men/shoes/flip-flops-and-sliders">Flip Flops &amp; Sliders</a> </li>
                            <li class="level2">	<a href="/men/shoes/slippers">Slippers</a> </li>
                            <li class="level2">	<a href="/men/shoes/trainers">Trainers</a> </li>
                            <li class="level2 sdmColStrong">	<a href="/men/shoes">View All</a> </li>
                         </ul>
                      </li>
                      
                   </ul>
                </li>
                <li class="columnGroup clearfix">
                    <ul>
                    <li class="mmHasChild level1 sdmColHeader colGroupStart colGroupEnd">
                        <a href="/designers/mensdesigners" class="FL-noLink">Brands</a> 	            
                        <div class="1258504Center Center"></div>
                        <ul>
                            <li class="level2">	<a href="/stone-island">Stone Island</a> </li>
                            <li class="level2">	<a href="/men/brands/gucci">Gucci</a> </li>
                            <li class="level2">	<a href="/balenciaga/men">Balenciaga</a> </li>
                            <li class="level2 hidden-xs hidden-sm">	<a href="/men/brands/moncler">Moncler</a> </li>
                            <li class="level2">	<a href="/cp-company/men">CP Company</a> </li>
                            <li class="level2 hidden-xs hidden-sm">	<a href="/off-white/men">Off-White</a> </li>
                            <li class="level2">	<a href="/men/brands/valentino">Valentino</a> </li>
                            <li class="level2 hidden-xs hidden-sm">	<a href="/men/brands/canada-goose">Canada Goose</a> </li>
                            <li class="level2 hidden-xs hidden-sm">	<a href="/burberry/men">Burberry</a> </li>
                            <li class="level2 hidden-xs hidden-sm">	<a href="/kenzo/men">Kenzo</a> </li>
                            <li class="level2 hidden-xs hidden-sm">	<a href="/dolce-and-gabbana/men">Dolce &amp; Gabbana</a> </li>
                            <li class="level2 hidden-xs hidden-sm">	<a href="/dsquared2/men">Dsquared2</a> </li>
                            <li class="level2 sdmColStrong">	<a href="/designers/mensdesigners">View All</a> </li>
                        </ul>
                    </ul>
                </li>
                <li class="level1 sdmColHeader colGroupEnd pinkText colTopSpace">
                    <a href="/online-exclusives">Online Exclusives</a> 	            
                    <div class="1258548Center Center"></div>
                </li>
                
                <li class="columnGroup clearfix">
                    <ul>
                       <li class="mmHasChild level1 sdmColHeader colGroupStart colGroupEnd">
                          <a href="/men/clothing" class="FL-noLink FL-saleLink">Outlet</a> 	            
                          <div class="1258504Center Center"></div>
                          <ul class="mobMenGroup" style="display: block;">
                            <li class="level2" style=""> <a class="menuitemtext MobMenChevron" href="/men/mens-clearance">View all</a> </li>
                            <li class="level2" style=""> <a class="menuitemtext MobMenChevron" href="/men/mens-clearance/clothing/t-shirts">T-Shirts</a> </li>
                            <li class="level2" style=""> <a class="menuitemtext MobMenChevron" href="/men/mens-clearance/clothing/sweatshirts">Hoods &amp; Sweats</a> </li>
                            <li class="level2" style=""> <a class="menuitemtext MobMenChevron" href="/men/mens-clearance/shoes/trainers">Trainers</a> </li>
                            <li class="level2" style=""> <a class="menuitemtext MobMenChevron" href="/men/mens-clearance/clothing/jackets-and-coats">Jackets &amp; Coats</a> </li>
                            <li class="level2" style=""> <a class="menuitemtext MobMenChevron" href="/men/mens-clearance/clothing/polo-shirts">Polo Shirts</a> </li>
                            <li class="level2 sdmColHeader menuGiftsHeader" style=""> <a class="menuitemtext MobMenChevron" href="/mens/theoutlet/designersa-z">Shop By Brand</a> </li>
                            <li class="level2" style=""> <a class="menuitemtext MobMenChevron" href="/men/mens-clearance/shop-by-price/under-100">Under £100</a> </li>
                            <li class="level2" style=""> <a class="menuitemtext MobMenChevron" href="/men/mens-clearance/shop-by-price/under-250">Under £250</a> </li>
                            <li class="level2" style=""> <a class="menuitemtext MobMenChevron" href="/men/mens-clearance/shop-by-price/over-250">Over £250</a> </li>
                            <li class="level2 menuGiftsHeader" style=""> <a class="menuitemtext MobMenChevron" href="/kids/kids-clearance/boys">Boys Sale</a> </li>
                         </ul>
                       </li>
                    </ul>
                 </li>
             </ul>
                </div>

                <div class="FL-nav--tab" id="FL-womens">
                <ul>
                <li class="level1 mobOnly">
                   <a href="/women/new-arrivals">New</a> 	            
                   <div class="1258616Center Center"></div>
                </li>
                <li class="columnGroup clearfix">
                   <ul>
                      
                      <li class="mmHasChild level1 sdmColHeader colGroupStart colGroupEnd">
                         <a href="/women/clothing" class="FL-noLink">Clothing</a> 	            
                         <div class="1258566Center Center"></div>
                         <ul>
                            <li class="level2">	<a href="/women/clothing/activewear">Activewear</a> </li>
                            <li class="level2">	<a href="/women/clothing/dresses">Dresses</a> </li>
                            <li class="level2">	<a href="/women/clothing/jackets-and-coats">Jackets &amp; Coats</a> </li>
                            <li class="level2">	<a href="/women/other/partywear-edit">Partywear</a> </li>
                            <li class="level2">	<a href="/women/clothing/jeans">Jeans</a> </li>
                            <li class="level2">	<a href="/women/clothing/jumpsuits-and-playsuits">Jumpsuits &amp; Playsuits</a> </li>
                            <li class="level2">	<a href="/women/clothing/knitwear">Knitwear</a> </li>
                            <li class="level2">	<a href="/women/clothing/lingerie">Lingerie</a> </li>
                            <li class="level2">	<a href="/women/clothing/shorts-and-skirts">Shorts &amp; Skirts</a> </li>
                            <li class="level2">	<a href="/women/clothing/sweatshirts">Sweatshirts &amp; Hoodies</a> </li>
                            <li class="level2">	<a href="/women/clothing/swimwear">Swimwear</a> </li>
                            <li class="level2">	<a href="/women/clothing/tops">Tops &amp; T-Shirts</a> </li>
                            <li class="level2">	<a href="/women/clothing/trousers">Trousers</a> </li>
                            <li class="level2 sdmColStrong">	<a href="/women/clothing">View All</a> </li>
                         </ul>
                      </li>
                   </ul>
                </li>
                
                <li class="columnGroup clearfix">
                   <ul>
                      <li class="mmHasChild level1 sdmColHeader colGroupStart colGroupEnd">
                         <a href="/women/accessories" class="FL-noLink">Accessories</a> 	            
                         <div class="1258581Center Center"></div>
                         <ul>
                            <li class="level2">	<a href="/women/bags">Bags &amp; Purses</a> </li>
                            <li class="level2">	<a href="/women/accessories/belts">Belts</a> </li>
                            <li class="level2">	<a href="/beauty/fragrance/womens">Fragrance</a> </li>
                            <li class="level2">	<a href="/women/accessories/home-fragrance">Home Fragrance</a> </li>
                            <li class="level2">	<a href="/women/accessories/gloves-and-scarves">Gloves &amp; Scarves</a> </li>
                            <li class="level2">	<a href="/women/accessories/hats">Hats</a> </li>
                            <li class="level2">	<a href="/women/accessories/jewellery">Jewellery</a> </li>
                            <li class="level2">	<a href="/beauty/makeup">Make Up</a> </li>
                            <li class="level2">	<a href="/women/accessories/skincare">Skincare</a> </li>
                            <li class="level2">	<a href="/women/accessories/sunglasses">Sunglasses</a> </li>
                            <li class="level2">	<a href="/women/accessories/technology">Technology</a> </li>
                            <li class="level2">	<a href="/women/accessories/watches">Watches</a> </li>
                            <li class="level2 sdmColStrong">	<a href="/women/accessories">View All</a> </li>
                         </ul>
                      </li>
                   </ul>
                </li>
                <li class="columnGroup clearfix">
                   <ul>
                      <li class="mmHasChild level1 sdmColHeader colGroupStart">
                         <a href="/women/shoes" class="FL-noLink">Shoes</a> 	            
                         <div class="1258596Center Center"></div>
                         <ul>
                            <li class="level2">	<a href="/women/shoes/boots">Boots</a> </li>
                            <li class="level2">	<a href="/women/shoes/flats">Flats</a> </li>
                            <li class="level2">	<a href="/women/shoes/heels">Heels</a> </li>
                            <li class="level2">	<a href="/women/shoes/sandals-and-sliders">Sandals &amp; Sliders</a> </li>
                            <li class="level2">	<a href="/women/shoes/trainers">Trainers</a> </li>
                            <li class="level2 sdmColStrong">	<a href="/women/shoes">View All</a> </li>
                         </ul>
                      </li>
                      
                   </ul>
                </li>
                <li class="columnGroup clearfix">
                    <ul>
                    <li class="mmHasChild level1 sdmColHeader colGroupStart colGroupEnd">
                        <a href="/designers/womensdesigners" class="FL-noLink">Brands</a> 	            
                        <div class="1258504Center Center"></div>
                        <ul>
                            <li class="level2">	<a href="/women/brands/gucci">Gucci</a> </li>
                            <li class="level2">	<a href="/balenciaga/women">Balenciaga</a> </li>
                            <li class="level2">	<a href="/women/brands/valentino">Valentino</a> </li>
                            <li class="level2">	<a href="/alexander-mcqueen/women">Alexander McQueen</a> </li>
                            <li class="level2 hidden-xs hidden-sm">	<a href="/jimmy-choo/women">Jimmy Choo</a> </li>
                            <li class="level2">	<a href="/burberry/women">Burberry</a> </li>
                            <li class="level2 hidden-xs hidden-sm">	<a href="/dolce-and-gabbana/women">Dolce &amp; Gabbana</a> </li>
                            <li class="level2 hidden-xs hidden-sm">	<a href="/women/brands/moncler">Moncler</a> </li>
                            <li class="level2 hidden-xs hidden-sm">	<a href="/women/brands/canada-goose">Canada Goose</a> </li>
                            <li class="level2 hidden-xs hidden-sm">	<a href="/louboutin">Christian Louboutin</a> </li>
                            <li class="level2 hidden-xs hidden-sm">	<a href="/women/brands/saint-laurent">Saint Laurent</a> </li>
                            <li class="level2 hidden-xs hidden-sm">	<a href="/kenzo/women">Kenzo</a> </li>
                            <li class="level2 sdmColStrong">	<a href="/designers/womensdesigners">View All</a> </li>
                        </ul>
                    </ul>
                </li>
                
                
                <li class="mmHasChild level1 sdmColHeader colGroupStart colGroupEnd">
                        <a href="/women/clothing" class="FL-noLink FL-saleLink">Outlet</a> 	            
                        <div class="1258566Center Center"></div>
                        <ul class="mobMenGroup" style="display: block;">
                            <li class="level2" style=""> <a class="menuitemtext MobMenChevron" href="/women/womens-clearance">View All</a> </li>
                            <li class="level2" style=""> <a class="menuitemtext MobMenChevron" href="/women/womens-clearance/shoes/trainers">Trainers</a> </li>
                            <li class="level2" style=""> <a class="menuitemtext MobMenChevron" href="/women/womens-clearance/clothing/jackets-and-coats">Jackets &amp; Coats</a> </li>
                            <li class="level2" style=""> <a class="menuitemtext MobMenChevron" href="/women/womens-clearance/bags">Bags</a> </li>
                            <li class="level2" style=""> <a class="menuitemtext MobMenChevron" href="/women/womens-clearance/clothing/dresses">Dresses</a> </li>
                            <li class="level2" style=""> <a class="menuitemtext MobMenChevron" href="/women/womens-clearance/shoes/#dcp=1&amp;dppp=100&amp;OrderBy=rank&amp;Filter=CATG%5EShoes">Shoes</a> </li>
                            <li class="level2 sdmColHeader menuGiftsHeader" style=""> <a class="menuitemtext MobMenChevron" href="/womens/theoutlet/designersa-z">Shop By Brand</a> </li>
                            <li class="level2" style=""> <a class="menuitemtext MobMenChevron" href="/women/womens-clearance/shop-by-price/under-100">Under £100</a> </li>
                            <li class="level2" style=""> <a class="menuitemtext MobMenChevron" href="/women/womens-clearance/shop-by-price/under-250">Under £250</a> </li>
                            <li class="level2" style=""> <a class="menuitemtext MobMenChevron" href="/women/womens-clearance/shop-by-price/over-250">Over £250</a> </li>
                            <li class="level2 menuGiftsHeader" style=""> <a class="menuitemtext MobMenChevron" href="/kids/kids-clearance/girls">Girls Sale</a> </li>
                         </ul>
                     </li>
             </ul>
                </div>

                <div class="FL-nav--tab" id="FL-kids">
                    <ul class="Kids">                        <li class="KidsTop Top" ><div class="1258625Top Top" style="display: none;"></div></li> <li class="KidsLeft Left" ><div class="1258625Left Left" style="display: none;"></div></li> <li class="KidsCenter Center" ><div class="1258625Center Center" style="display: none;"></div>     <ul>                                       

                    

                    <li class="columnGroup clearfix">                     <ul>                          <li class="mmHasChild level1 sdmColHeader colGroupStart colGroupEnd">                 <a href="/kids/boys" class="FL-noLink">Boys</a> 	            <div class="1258626Center Center"></div>                                      <ul>                                                                                   <li class="level2">	<a href="/kids/boys/clothing">Clothing</a> </li>                                                                                                                <li class="level2">	<a href="/kids/boys/clothing/jackets-and-coats">Jackets &amp; Coats</a> </li>                                                                                                                <li class="level2">	<a href="/kids/boys/clothing/jeans-and-trousers">Jeans &amp; Trousers</a> </li>                                                                                                                <li class="level2">	<a href="/kids/boys/clothing/knitwear">Knitwear</a> </li>                                                                                                                <li class="level2">	<a href="/kids/boys/clothing/loungewear">Loungewear</a> </li>                                                                                                                <li class="level2">	<a href="/kids/boys/clothing/polo-shirts">Polo Shirts</a> </li>                                                                                                                <li class="level2">	<a href="/kids/boys/clothing/shorts-and-swimwear">Shorts &amp; Swimwear</a> </li>                                                                                                                <li class="level2">	<a href="/kids/boys/clothing/sweatshirts">Sweatshirts</a> </li>                                                                                                                <li class="level2">	<a href="/kids/boys/clothing/t-shirts">T-Shirts</a> </li>                                                                                                                <li class="level2 sdmColStrong">	<a href="/kids/boys/clothing">View All</a> </li>                                                                                                                <li class="level2 sdmColHeader  colTopSpace">	<a href="/kids/boys/shoes">Shoes</a> </li>                                                                                                                <li class="level2 sdmColHeader  colTopSpace">	<a href="/kids/boys/accessories">Accessories</a> </li>                                                                           </ul>                              </li>                                  </ul>                 </li>                                                    <li class="columnGroup clearfix">                     <ul>                          <li class="mmHasChild level1 sdmColHeader colGroupStart colGroupEnd">                 <a href="/kids/girls" class="FL-noLink">Girls</a> 	            <div class="1258639Center Center"></div>                                      <ul>                                                                                   <li class="level2">	<a href="/kids/girls/clothing">Clothing</a> </li>                                                                                                                <li class="level2">	<a href="/kids/girls/clothing/dresses">Dresses</a> </li>                                                                                                                <li class="level2">	<a href="/kids/girls/clothing/jackets-and-coats">Jackets &amp; Coats</a> </li>                                                                                                                <li class="level2">	<a href="/kids/girls/clothing/jeans-and-leggings">Jeans &amp; Leggings</a> </li>                                                                                                                <li class="level2">	<a href="/kids/girls/clothing/shorts-and-skirts">Shorts &amp; Skirts</a> </li>                                                                                                                <li class="level2">	<a href="/kids/girls/clothing/sweatshirts">Sweatshirts</a> </li>                                                                                                                <li class="level2">	<a href="/kids/girls/clothing/tops">Tops</a> </li>                                                                                                                <li class="level2 sdmColStrong">	<a href="/kids/girls/clothing">View All</a> </li>                                                                                                                <li class="level2 sdmColHeader  colTopSpace">	<a href="/kids/girls/shoes">Shoes</a> </li>                                                                                                                <li class="level2 sdmColHeader  colTopSpace">	<a href="/kids/girls/accessories">Accessories</a> </li>                                                                           </ul>                              </li>                                  </ul>                 </li>                                                                                                    <li class="level1 mobOnly">                 <a href="/kids/new-arrivals">New</a> 	            <div class="1258654Center Center"></div>                              </li>                           </ul> </li> <li class="KidsBottom Bottom" ><div class="1258625Bottom Bottom" style="display: none;"></div></li>                     </ul>
                    <li class="columnGroup clearfix">                     <ul>                          <li class="mmHasChild level1 sdmColHeader colGroupStart colGroupEnd">                 <a href="/kids/kids-clearance" class="FL-noLink FL-saleLink">Outlet</a> 	            <div class="1258652Center Center"></div>                                      <ul>                                                                                   <li class="level2 sdmColStrong">	<a href="/kids/theoutlet/designersa-z">Designers A-Z</a> </li>                                                                           </ul>                              </li>                                  </ul>                 </li>
                </div>
            </div>

            <ul class="mobMenuGroup FL-bottomNav" style="display: block;">
                <li class="root mmHasChild has-dropdown level1 liMyAccount">
                    <a class="menuitemtext MobMenChevron">
                        <span class="MobMenIcon glyphicon glyphicon-user"></span>
                                            My Account
                                        
                    </a>
                    <div class="am-level">
                        <p class="menulevelheader" style="display: none;">
                            <a href="/accountinformation">My Account</a>
                        </p>
                        <a href="#" class="mp-back" rel="nofollow" style="display: none;">
                            <span class="mp-back-text">Back</span>
                        </a>
                        <ul class="mobMenuGroup" style="display: none;">
                            <li class="root  ">
                                <a class="menuitemtext MobMenChevron" href="/accountinformation">
                                            Account Details
                                        </a>
                            </li>
                            <li class="root  ">
                                <a class="menuitemtext MobMenChevron" href="/accountinformation/orderhistorysummary">
                                            Order History Summary
                                        </a>
                            </li>
                            <li class="root  ">
                                <a class="menuitemtext MobMenChevron" href="/accountinformation/managecards">
                                            Manage Cards
                                        </a>
                            </li>
                            <li class="root  ">
                                <a class="menuitemtext MobMenChevron" href="/accountinformation/manageaddressbook">
                                            Manage Address Book
                                        </a>
                            </li>
                            <li class="root  ">
                                <a class="menuitemtext MobMenChevron" href="/accountinformation/changepassword">
                                            Change Password
                                        </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="root  ">
                    <a class="menuitemtext MobMenChevron" href="https://help.flannels.com/support/home">
                                            Customer Services
                                        </a>
                </li>
                <li class="root  ">
                    <a class="menuitemtext MobMenChevron" href="/personal-shopping">
                                            Personal Shopping
                                        </a>
                </li>
                <li class="root mmHasChild has-dropdown level1">
                    <a class="menuitemtext MobMenChevron">
                                            Shopping Online
                                        </a>
                    <div class="am-level">
                        <p class="menulevelheader" style="display: none;">
                            <a href="/">Shopping Online</a>
                        </p>
                        <a href="#" class="mp-back" rel="nofollow" style="display: none;">
                            <span class="mp-back-text">Back</span>
                        </a>
                        <ul class="mobMenuGroup" style="display: none;">
                            <li id="mob-trackorder" class="root  ">
                                <a class="menuitemtext MobMenChevron" href="/accountinformation/orderhistorysummary">
                                            Track Order
                                        </a>
                            </li>
                            <li id="mob-delivery" class="root  ">
                                <a class="menuitemtext MobMenChevron" href="https://help.flannels.com/support/solutions/76000002770-">
                                            Delivery
                                        </a>
                            </li>
                            <li id="mob-returns" class="root  ">
                                <a class="menuitemtext MobMenChevron" href="https://help.flannels.com/support/solutions/76000002867-">
                                            Returns
                                        </a>
                            </li>
                            <li id="mob-wishlist" class="root  ">
                                <a class="menuitemtext MobMenChevron" href="/accountinformation/viewwishlist">
                                            Wishlist
                                        </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="root  ">
                    <a class="menuitemtext MobMenChevron" href="/customerservices/otherinformation/aboutus">
                                            About Us
                                        </a>
                </li>
                <li class="root  ">
                    <a class="menuitemtext MobMenChevron" href="/stores">
                                            Store Finder
                                        </a>
                </li>
                <li class="root  ">
                    <a class="menuitemtext MobMenChevron" href="/careers">
                        <span class="MobMenIcon glyphicon glyphicon-briefcase"></span>
                                            Careers
                                        
                    </a>
                </li>
            </ul>

            <ul class="FL-bottomNav FL-noPadTop">
                <li>
                    ${loggedStatus() ? `<a class="mob-login" href="/?ctl=logoff" title="Sign Out">
                    <span class="MobMenIcon loginIco glyphicon glyphicon-lock"></span>
                    Sign Out
                    <span class="MobMenIcon glyphicon glyphicon-chevron-right pull-right" style="display: none;"></span>
                    </a>` : `<a class="mob-login" href="/login?returnurl=%2f" title="Sign In">
                        <span class="MobMenIcon loginIco glyphicon glyphicon-lock"></span>
                        Sign In
                        <span class="MobMenIcon glyphicon glyphicon-chevron-right pull-right" style="display: none;"></span>
                    </a>`}
                    
                </li>
            </ul>

            <div class="FL-bottomNav" id="divCurrencyLanguageMobile" data-currency-cookie-name="FlannelsFashion_AnonymousUserCurrency">
                <ul style="display: block;">
                    <li id="liMobileCurrencySelector" class="has-dropdown level1">
                        <a>
                            <span class="MobMenIcon glyphicon ${iconClass}"></span>
                            <span class="currencyMenuItem" id="spanCurrencyMenuItem">
                                        Currency
                                    </span>
                            <span class="mobileSelectedCurrency" id="spanSelectedCurrency">
                                        (${currencyIcon} ${currency})
                                    </span>
                            <span class="MobMenIcon glyphicon glyphicon-chevron-right pull-right"></span>
                        </a>
                        <div class="am-level">
                            <a href="#" class="mp-back" rel="nofollow" style="display: none;">
                                <span class="back" id="spanCurrencyBack">
                                            Back
                                        </span>
                            </a>
                            <ul class="currencySelectorMobile" style="display: none;">
                                <li>
                                    <span class="currencyOption">
                                    <label for="F6B4DAF2-A4C4-42A8-8778-11221E2613FE">
                                                    £ GBP
                                    </label>
                                    <input id="F6B4DAF2-A4C4-42A8-8778-11221E2613FE" type="radio" name="lCurrenciesSwitcherMobile" value="GBP" ${currency === 'GBP' ? 'checked=""' : ''}>
                                    </span>
                                </li>
                                <li>
                                    <span class="currencyOption">
                                    <label for="E7383EC5-996B-4606-9A14-1CA379FC7BD2">
                                                € EUR
                                    </label>
                                    <input id="E7383EC5-996B-4606-9A14-1CA379FC7BD2" type="radio" name="lCurrenciesSwitcherMobile" value="EUR" ${currency === 'EUR' ? 'checked=""' : ''}>
                                    </span>
                                </li>
                                <li>
                                    <span class="currencyOption">
                                    <label for="72F376BD-5BAE-4F17-921F-07F9D32B8983">
                                            $ USD
                                        </label>
                                    <input id="72F376BD-5BAE-4F17-921F-07F9D32B8983" type="radio" name="lCurrenciesSwitcherMobile" value="USD" ${currency === 'USD' ? 'checked=""' : ''}>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            
           
            
        </div>
    `;
}

// Mens


// Womens


// Kids
