import shared from "../../../../../core-files/shared"

const { ID } = shared;

export default () => {

    const nav = 
    `<li class="topLevelMenuListItem ${ID}-lvl1 ${ID}-categoriesAZ">
        <a id="topLevelLink_categories" class="departmentButton" href="#" data-toggle="topLevelMenu_categories">
            <span class="menuItemLabel">Category A-Z</span>
        </a>
        <span data-icon="5" aria-hidden="true" class="globalNavArrow topLevelMenuMobileArrow"></span>
        <div id="topLevelMenu_categories" class="${ID}-level2 departmentMenu topLevelMenu">
            <ul id="departmentMenu">
            
                <li class="mobileNavBackButtons" onclick="toggle(document.getElementById(&quot;departmentMenu&quot;)),setUpMobileBurgerMenu(this,&quot;departmentMenu&quot;),deactivate(document.getElementById(&quot;topLevelMenu_categories&quot;))"> 
                    <span data-icon="4" aria-hidden="true" class="mobileBackArrow"></span> 
                    <a id="departmentLink_backButtons" class="mobileBackLink" tabindex="16"> 
                        <span class="menuItemLabel lowerLevelMenuListItem">Categories A-Z</span> 
                    </a>
                </li>
                <div class="${ID}-categoryWrapper">
                </div>
            </ul>
        </div>
    </li>
    <li class="topLevelMenuListItem ${ID}-lvl1 ${ID}-brandAZ">
        <a id="topLevelLink_brandAZ" class="departmentButton" href="#" data-toggle="topLevelMenu_brandAZ">
            <span class="menuItemLabel">Brands A-Z</span>
        </a>
        <span data-icon="5" aria-hidden="true" class="globalNavArrow topLevelMenuMobileArrow"></span>
        <div id="topLevelMenu_brandAZ" class="${ID}-level2 departmentMenu topLevelMenu">
            <ul id="departmentMenu">
                <li class="mobileNavBackButtons" onclick="toggle(document.getElementById(&quot;departmentMenu&quot;)),setUpMobileBurgerMenu(this,&quot;departmentMenu&quot;),deactivate(document.getElementById(&quot;topLevelMenu_brandAZ&quot;))"> 
                    <span data-icon="4" aria-hidden="true" class="mobileBackArrow"></span> 
                    <a id="departmentLink_backButtons" class="mobileBackLink" tabindex="16"> 
                        <span class="menuItemLabel lowerLevelMenuListItem">Brands A-Z</span> 
                    </a>
                </li>
                <div class="${ID}-allBrands"></div> 
               
        
            </ul>
        </div>
    </li>`;

    document.querySelector('.topLevelMenuListItem').insertAdjacentHTML('afterend', nav);


    // events
    const newNavLinks = document.querySelectorAll(`.${ID}-lvl1`);
    for (let index = 0; index < newNavLinks.length; index++) {
        const element = newNavLinks[index];

        element.addEventListener('click', () => {
            element.classList.add(`${ID}-active`);
        });

        if(window.innerWidth <= 600) {
            element.querySelector('#departmentMenu .mobileBackLink').addEventListener('click', () => {
                document.querySelector(`.${ID}-categoryList`).scrollTo(0,0);
                document.querySelector(`.${ID}-brandList`).scrollTo(0,0);
                document.querySelector(`.${ID}-categoryLetters`).scrollTo(0,0);
                document.querySelector(`.${ID}-brandLetters`).scrollTo(0,0);
                document.querySelector('#global_navigation').removeAttribute('style');
            });
        }
    }


}
