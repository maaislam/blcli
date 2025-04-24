import shared from "../../../../../core-files/shared";

const categoriesObj = {
    'Clothing': {
        icon: 'https://editor-assets.abtasty.com/49254/60cca4e63a48a1624024294.png',
        target: 'clothing',
    },
    'Home & Office': {
        icon: 'https://editor-assets.abtasty.com/49254/60cca49d606f41624024221.png',
        target: 'home',
    },
    'Toys, Gadgets & Plushies': {
        icon: 'https://editor-assets.abtasty.com/49254/60ccab55d24141624025941.png',
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
            categoryBlock.innerHTML = `
            <div class="${ID}-title">
                <span style="background-image: url(${data.icon})"></span>
                <p>${[i][0]}</p>
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

                   
            
                    const matchingLists = document.querySelectorAll(`.${ID}-categoryList`);
                    if(matchingLists) {
                        for (let index = 0; index < matchingLists.length; index += 1) {
                            const matchList = matchingLists[index];
                            if(matchList.getAttribute('list-data') === matchingCat) {
                                matchList.style.display = 'block';
                                //matchList.classList.add(`${ID}-listActive`);
                            } else {
                                matchList.removeAttribute('style');
                            }
                        }
                    }
               
            });
        }
    }

    activeCategories();
   
}