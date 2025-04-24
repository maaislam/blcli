import shared from "../../../../../core-files/shared";
import { AllOOSProducts } from "./data";

export default () => {

    const { ID, VARIATION } = shared;
    const allProducts = AllOOSProducts;

    /**
     * Helpers
     */
    const createOutOfStockElement = (catDataAttribute, imageUrl, productName, price) => {
        const outOfStock = document.createElement('li');
        outOfStock.classList.add(`${ID}-out_of_stock`);
        outOfStock.classList.add('product-item');
        outOfStock.setAttribute('cat-data', catDataAttribute);
        outOfStock.innerHTML = `
        <div class="${ID}-outOfStock_inner">
            <span></span>
            <h4>${VARIATION === '1' ? 'Out of stock' : 'Sold Out'}</h4>
            <p>Sorry! You missed out on this product. Don’t miss out on another, secure your merch today.</p>
        </div>
        <div class="${ID}-product_info product-item-info">
            <a class="product-item-photo">
                <span class="product-image-container" style="width:240px;">
                    <span class="product-image-wrapper" style="padding-bottom: 125%;">
                        <img class="product-image-photo" src="${imageUrl}" width="240" height="300">
                    </span>
                </span>
            </a>
            <div class="product details product-item-details">
                <strong class="product-item-name product name">
                    <a class="product-item-link">${productName}</a>
                </strong>
                <div class="price-box price-final_price">
                    <span class="normal-price">
                        <span class="price-container price-final_price">
                            <span class="price">${price}</span>
                        </span>
                    </span>
                </div>
            </div>
        </div>`;  
        return outOfStock;
    }
    const addProductsToPage = (allProducts, arr, minNum) => {
        const allProds = allProducts.length;
        
        var numProds = allProds; 

        var numToInsert = Math.min(minNum, allProducts.length, numProds)
        var range = Array.from(Array(numProds).keys())
        var randomResult = [];
        while(randomResult.length < numToInsert) {
            var index = Math.floor(Math.random() * numProds);
            if(range[index] >= 0) {
                randomResult.push(range[index]);
                range.splice(index, 1)
            }
        }
        randomResult.forEach(index => {
            if(arr[0]) {
                allProducts[index].insertAdjacentElement('beforebegin', arr[0]);
                arr.shift();
            } 
        });
        
    }
      

    const addOOSprods = () => {

        const regexHats = ['Snapback','Hat','Cap','Beanie'];
        const regexGadgets = ['Charger','Controller','Speaker','Watch','Smartwatch'];
        const regexBags = ['Bag','Satchel','Backpack','Handbag'];
        const regexAccessories = ['Scarf','Gloves','Necktie','Charm','Choker','Cuffs','Necklace','Wallet','Purse','Earrings','Socks','Umbrella','Badge','Mask','Keyring'];
        const regexJackets = ['Jacket','Cape'];
        const regexNightWear = ['Slippers','Pyjamas','Bathrobe'];
        const regexHomeOffice = ['Home','Office','Soundtrack','Cutter','Magnets','Baubles','Pad','Mirror','Den','Opener','Mat','Guzzler','Safe','Candle','Mitt','Tumbler','Tray','Jar','Stein','Decanter','Opener','Flask','Waterball','Stocking','Can','Coasters','Stationery','Glasses','Cup','Coaster','Mug','Throw','Lamp','Blanket','Kitchen','Light','Computer','Tablet','Mobile','Poster','Wall','Decoration','Boxes','Tankard','Clock','Ornament','Dish','Globe','Glass','Chest','Towel','Calendar','Doormat','Holder','Cable','Goblet','Bottle','Shakers','Set','Waterbottle','Decoration','Cushion','Pillow','Flag','Poster','Artwork','Journal','Apron','Bookends','Bank','Picture','Art','Tin','Crate','Print'];
        const regexToysFiguresPlush = ['Wand','Droid','Replica','Gun','Banner','Bobblehead','Ball','Game','Plushes','Puzzle','Quiz','Card','Ingot','Ticket','Helmet','Plush','Heliball','Figure','Coin','Viewer','Statue','Chess Set','Puppet','Ludo','Plaque','Tamagotchi','Operation','Kit','Nendoroid'];

        
        const allClothing = ['Jacket','Cape', 'Scarf','Gloves','Necktie','Charm','Choker','Cuffs','Necklace','Wallet','Purse','Earrings','Socks','Umbrella','Badge','Mask','Keyring', 'Slippers','Pyjamas','Bathrobe'];
        const toysandGadgets = ['Wand','Droid','Replica','Gun','Banner','Bobblehead','Ball','Game','Plushes','Puzzle','Quiz','Card','Ingot','Ticket','Helmet','Plush','Heliball','Figure','Coin','Viewer','Statue','Chess Set','Puppet','Ludo','Plaque','Tamagotchi','Operation','Kit','Nendoroid', 'Charger','Controller','Speaker','Watch','Smartwatch'];


        const allMatchedProducts = [];
        const allClothingProducts = [];
        const allHomeProducts = [];
        const allToysProducts = [];
        

        Object.keys(allProducts).forEach((i) => {
            const data = allProducts[i];
            const productName = data.productname;
            const productBrand = data.brand;

            let matchProducts = '';
            let matchClothingProducts = '';
            let matchHomeProducts = '';
            let matchToysProducts = '';

            
            if(window.location.href.indexOf('/brand/') > -1) {
                let brandName;
                if(document.querySelector('.brand-banner-image picture source') && document.querySelector('.brand-banner-image picture source').getAttribute('title').replace('Merchandise','').trim() !== productBrand) {
                     // get brand name
                     const url = window.location.pathname
                     const parts = url.split('/');

                     if (parts.length > 1) {
                         brandName = parts[parts.length-2].replace(/-/g, ' ');
                     }
                    
                } else {
                    brandName = document.querySelector('.brand-banner-image picture source').getAttribute('title').replace('Merchandise','').trim().replace('Merchandise and Gifts', '');
                       
                }
                if(productBrand.toLowerCase().indexOf(brandName.toLowerCase()) > -1 || productBrand === brandName) {
                    if(new RegExp(regexHomeOffice.join("|")).test(productName.split(" ").splice(-1))) {
                        matchHomeProducts = data;
                    } 
                    else if(new RegExp(allClothing.join("|")).test(productName.split(" ").splice(-1))) {
                       matchClothingProducts = data;
                    } 
                    else if(new RegExp(toysandGadgets.join("|")).test(productName.split(" ").splice(-1))) {
                        matchToysProducts = data;
                    } 
                }
            } else {
                const pageTitle = document.querySelector('.page-title span');

                if(pageTitle.textContent.indexOf('Gadgets') > -1 && new RegExp(regexGadgets.join("|")).test(productName.split(" ").splice(-1))) {
                    matchProducts = data;
                } 
                else if (pageTitle.textContent.indexOf('Props, Figures and Plushies') > -1 && new RegExp(regexToysFiguresPlush.join("|")).test(productName.split(" ").splice(-1))) {
                    matchProducts = data;
                }
                else if (pageTitle.textContent.indexOf('Bags') > -1 && new RegExp(regexBags.join("|")).test(productName.split(" ").splice(-1))) {
                    matchProducts = data;
                }
                else if (pageTitle.textContent.indexOf('Accessories') > -1 && new RegExp(regexAccessories.join("|")).test(productName.split(" ").splice(-1))) {
                    matchProducts = data;
                }
                else if (pageTitle.textContent.indexOf('Hats') > -1 && new RegExp(regexHats.join("|")).test(productName.split(" ").splice(-1))) {
                    matchProducts = data;
                }
                else if (pageTitle.textContent.indexOf('Jackets and Outerwear') > -1 && new RegExp(regexJackets.join("|")).test(productName.split(" ").splice(-1))) {
                    matchProducts = data;
                }
                else if (pageTitle.textContent.indexOf('Nightwear and Pyjamas') > -1 && new RegExp(regexNightWear.join("|")).test(productName.split(" ").splice(-1))) {
                    matchProducts = data;
                }
                else if (pageTitle.textContent.indexOf('Home and Office') > -1 && new RegExp(regexHomeOffice.join("|")).test(productName.split(" ").splice(-1))) {
                    matchProducts = data;
                }
            }
            
            if(window.location.href.indexOf('/brand/') > -1) {
                // create OOS for toys
                if(matchToysProducts != '') {
                    let price;
                    if(window.location.href.indexOf('/uk/') > -1) {
                        price = `£${matchToysProducts.ukprice}`;
                    } else if (window.location.href.indexOf('/us/') > -1) {
                        price = `$${matchToysProducts.usprice}`;
                    } else if (window.location.href.indexOf('/eu/') > -1) {
                        price = `€${matchToysProducts.euprice}`;
                    } else {
                        price = `$${matchToysProducts.rowprice}`;
                    }
    
                    allToysProducts.push(createOutOfStockElement('toys', matchToysProducts.image, matchToysProducts.productname, price));                    
                } 
               
                // create OOS for clothing
                if(matchClothingProducts != '') {
                   
                    let price;
                    if(window.location.href.indexOf('/uk/') > -1) {
                        price = `£${matchClothingProducts.ukprice}`;
                    } else if (window.location.href.indexOf('/us/') > -1) {
                        price = `$${matchClothingProducts.usprice}`;
                    } else if (window.location.href.indexOf('/eu/') > -1) {
                        price = `€${matchClothingProducts.euprice}`;
                    } else {
                        price = `$${matchClothingProducts.rowprice}`;
                        
                    }

                    allClothingProducts.push(createOutOfStockElement('clothing', matchClothingProducts.image, matchClothingProducts.productname, price));

                } 

                // create OOS for home
                if(matchHomeProducts != '') {
                    let price;
                    if(window.location.href.indexOf('/uk/') > -1) {
                        price = `£${matchHomeProducts.ukprice}`;
                    } else if (window.location.href.indexOf('/us/') > -1) {
                        price = `$${matchHomeProducts.usprice}`;
                    } else if (window.location.href.indexOf('/eu/') > -1) {
                        price = `€${matchHomeProducts.euprice}`;
                    } else {
                        price = `$${matchHomeProducts.rowprice}`;
                    }
    
                    allHomeProducts.push(createOutOfStockElement('home', matchHomeProducts.image, matchHomeProducts.productname, price));   
                } 


            } else {
                if(matchProducts !== '') {
                    // currency
                    let price;
                    if(window.location.href.indexOf('/uk/') > -1) {
                        price = `£${matchProducts.ukprice}`;
                    } else if (window.location.href.indexOf('/us/') > -1) {
                        price = `$${matchProducts.usprice}`;
                    } else if (window.location.href.indexOf('/eu/') > -1) {
                        price = `€${matchProducts.euprice}`;
                    } else {
                        price = `$${matchProducts.rowprice}`;
                    }  

                    allMatchedProducts.push(createOutOfStockElement('all', matchProducts.image, matchProducts.productname, price));
                }
            }
        }); 

        // if matched products found on PLP, add them to the grid
        if(window.location.href.indexOf('/brand/') > -1) {
            if(allClothingProducts) {
                const allClothingEls = document.querySelectorAll(`.${ID}-categoryList.${ID}-clothingList .item.product.product-item`);
                if(allClothingEls) {
                    addProductsToPage(allClothingEls, allClothingProducts, 1);
                }
            }
            if(allHomeProducts) {
                const allHomeEls = document.querySelectorAll(`.${ID}-categoryList.${ID}-homeList .item.product.product-item`);
                if(allHomeEls) {
                    addProductsToPage(allHomeEls, allHomeProducts, 1);
                }
            }
            if(allToysProducts) {
                const allToyEls = document.querySelectorAll(`.${ID}-categoryList.${ID}-toysList .item.product.product-item`);
                if(allToyEls) {
                    addProductsToPage(allToyEls, allToysProducts, 1);
                }
            }
        } else {
            if(allMatchedProducts) {
                const allEls = document.querySelectorAll('.item.product.product-item');
                addProductsToPage(allEls, allMatchedProducts, 5);
            }
        }
       
    }

    addOOSprods();


    const onScrollOfEachResult = () => {
        const allOutStockProducts = document.querySelectorAll(`.${ID}-out_of_stock`);
        for (let index = 0; index < allOutStockProducts.length; index += 1) {
          const element = allOutStockProducts[index];
          if(element){
            const productHeight = element.clientHeight;
            // check when each element comes in to view
            const inView = () => {
              const windowHeight = window.innerHeight;
              const scrollY = window.scrollY || window.pageYOffset;
      
              const scrollPosition = scrollY + windowHeight;
              const bannerPosition = element.getBoundingClientRect().top + scrollY + productHeight - 100;
      
              if (scrollPosition > bannerPosition) {
                return true;
              }
              return false;
            }
      
            // animate element when it is in view
            if (!element.classList.contains(`${ID}-inView`) && inView()) {
                element.classList.add(`${ID}-inView`);
                element.classList.add(`${ID}-show_stock`);
              }
            } 
          }
        }
        // trigger the scroll event
        document.addEventListener('scroll', onScrollOfEachResult); 

      
}