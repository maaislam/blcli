/**
 * Get all the category data from the navigation and put in object 
 **/
export const getData = (functionThatParsesData) => {
    return functionThatParsesData();
}

export const getDataFromNav = () => {
    const navigationResults = {};

    const firstMenuItem = document.querySelector('#js-main-nav');
    const listItems = firstMenuItem.querySelectorAll('.main-nav__item.main-nav__item--top');

    listItems.forEach((listItem) => { // loop through first level
        const level1title = listItem.querySelector('.main-nav__link');
        const level2 = listItem.querySelectorAll('.main-nav__sub-nav.main-nav__second-level .main-nav__second-level-item');
        if(level2) {

            level2.forEach((level2Item) => {
                const level2Title = level2Item.querySelector('.main-nav__title');
                if(level2Title) {
                    const level3 = level2Item.querySelector('.main-nav__sub-nav.main-nav__third-level');

                    const department = level1title.innerText.trim();
  
                    const columnTitle = level2Title.textContent.trim();
                    const innerColumnMarkup = level3.innerHTML.trim();            

                    if(level3) {

                        if (!navigationResults[department]) {
                            navigationResults[department] = {};
                        }
                        if (!navigationResults[department][columnTitle]) {
                            navigationResults[department][columnTitle] = {};
                        }

                        navigationResults[department][columnTitle] = innerColumnMarkup;
                    }
                }
            });            
        }
    });
    return navigationResults;
}



