import shared from "./shared";

const categoriesObj = {
    'Clothing': {
        background: '//cdn.optimizely.com/img/6087172626/371c618293b44b9d896ba3dfcadebdb8.jpg',
        target: 'clothing',
    },
    'Home & Office': {
        background: '//cdn.optimizely.com/img/6087172626/c04fb59fc76e4e28a4528e1a8c869f19.jpg',
        target: 'home',
    },
    'Toys, Gadgets & Plushies': {
        background: '//cdn.optimizely.com/img/6087172626/517eb6ea7715425394f932adffe7993a.jpg',
        target: 'toys',
    },
}


export default  () => {

    const { ID, VARIATION } = shared;
    const createCategories = () => {
        Object.keys(categoriesObj).forEach((i) => {
            const data = categoriesObj[i];

            const categoryBlock = document.createElement('div');
            categoryBlock.classList.add(`${ID}-categoryBlock`);
            categoryBlock.setAttribute('cat-target', data.target);
            categoryBlock.style = `background-image: url("${data.background}")`;
            categoryBlock.innerHTML = `
            <div class="${ID}-title">
                ${[i][0]}
            </div>`;

            document.querySelector(`.${ID}-categories .${ID}-container`).appendChild(categoryBlock);
        });

    }

    createCategories();

    const scrollToElement = (element) => {
         window.scroll({
            behavior: 'smooth',
            left: 0,
            top: element.getBoundingClientRect().top + window.scrollY - 20,
        });
    }

    const activeProducts = () => {
        /*if(VARIATION === '1') {
            const allProducts = document.querySelectorAll(`.${ID}-productGrid .item.product`);
                
            //show only the matching products
            for (let index = 0; index < allProducts.length; index += 1) {
                const productEl = allProducts[index];
                productEl.classList.remove(`${ID}-productActive`);
            }

         // check if any categories are active or not then show/hide product
            const allCategories = document.querySelectorAll(`.${ID}-categoryBlock.${ID}-active`);
            
            for (let index = 0; index < allCategories.length; index += 1) {
                const activecatEl = allCategories[index];
                const activeTarget = activecatEl.getAttribute('cat-target');

                
                const allProducts = document.querySelectorAll(`.${ID}-productGrid .item.product`);
                
                //show only the matching products
                for (let index = 0; index < allProducts.length; index += 1) {
                    const productEl = allProducts[index];
                    if(productEl.getAttribute('cat-data') === activeTarget) { 
                        productEl.classList.add(`${ID}-productActive`);
                    } 
                }
            }
        }

        if(VARIATION === '2') {
            const allCategoryBlocks = document.querySelectorAll(`.${ID}-productGrid .${ID}-categoryList`);
                
            //show only the matching products
            for (let index = 0; index < allCategoryBlocks.length; index += 1) {
                const catEl = allCategoryBlocks[index];
                catEl.classList.remove(`${ID}-catActive`);
            }

         // check if any categories are active or not then show/hide product
            const allCategories = document.querySelectorAll(`.${ID}-categoryBlock.${ID}-active`);
            for (let index = 0; index < allCategories.length; index += 1) {
                const activecatEl = allCategories[index];
                const activeTarget = activecatEl.getAttribute('cat-target');

                
                const allCategoryBlocks = document.querySelectorAll(`.${ID}-productGrid .${ID}-categoryList`);
                
                //show only the matching products
                for (let index = 0; index < allCategoryBlocks.length; index += 1) {
                    const catElBlock = allCategoryBlocks[index];
                    if(catElBlock.getAttribute('list-data') === activeTarget) { 
                        catElBlock.classList.add(`${ID}-catActive`);
                    } 
                }
            }    
        }*/
    }

    const activeCategories = () => {
        const categories = document.querySelectorAll(`.${ID}-categoryBlock`);
        for (let index = 0; index < categories.length; index += 1) {
            const element = categories[index];

            const productList = document.querySelector(`.${ID}-productGrid .${ID}-container`);

            element.addEventListener('click', (e) => {
                    const matchingCat = e.currentTarget.getAttribute('cat-target');
        
                    [].forEach.call(categories, (cat, idx) => {
                        if(cat != e.currentTarget) {
                          cat.classList.remove(`${ID}-active`);
                        }
                    });

                    // make current category active
                    if(e.currentTarget.classList.contains(`${ID}-active`)) {
                        e.currentTarget.classList.remove(`${ID}-active`);
                    } else {
                        e.currentTarget.classList.add(`${ID}-active`);
                    }
    
                    // check if any categories are active or not
                    if(document.querySelector(`.${ID}-categoryBlock.${ID}-active`)) {
                        productList.classList.add(`${ID}-filtered`);
                        scrollToElement(productList);
                    } else {
                        productList.classList.remove(`${ID}-filtered`);
                    }

                    if(VARIATION === '1') {
                        // make any that match show
                        const matchingProducts = document.querySelectorAll(`.${ID}-filtered .item.product`);
                        //show only the matching products
                        if(matchingProducts) {
                            for (let index = 0; index < matchingProducts.length; index += 1) {
                                const matchEl = matchingProducts[index];
                                if(matchEl.getAttribute('cat-data') === matchingCat) {
                                    matchEl.style.display = 'flex';
                                } else {
                                    matchEl.removeAttribute('style');
                                }
                            }
                        }
                    }
            
                    if(VARIATION === '2') {
                        const matchingLists = document.querySelectorAll(`.${ID}-categoryList`);
                        if(matchingLists) {
                            for (let index = 0; index < matchingLists.length; index += 1) {
                                const matchList = matchingLists[index];
                                if(matchList.getAttribute('list-data') === matchingCat) {
                                    matchList.style.display = 'block';
                                } else {
                                    matchList.removeAttribute('style');
                                }
                            }
                        }
                    }
        
                   

                //activeProducts();


               
            });
        }
    }

    activeCategories();
   
}