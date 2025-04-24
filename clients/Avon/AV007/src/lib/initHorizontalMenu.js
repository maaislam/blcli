import settings from '../lib/settings';
const {ID} = settings;
function initHorizontalMenu(){
    let categoryLink;
    let categoryName;
    let htmlBlock = '';
    const categoriesList = document.querySelectorAll('#HamburgerCategories li.ng-scope');
    const userLocation = window.location.href;
    [].forEach.call(categoriesList, function(category, i){
        categoryLink = category.querySelector('#HamburgerMenuNew li[menulevel="0"] div a').href;
        categoryName = category.querySelector('#HamburgerMenuNew li[menulevel="0"] div a span').textContent.trim();
        htmlBlock += `
            <li class="${ID}_horizontalMenu__listItem" ${userLocation.indexOf(categoryLink) > -1 ? `aria-selected="true" data-scrollmodifier="${i + 1}"` : ''}>
                <a href="${categoryLink}" class="${ID}_horizontalMenu__link">${categoryName}</a>
            </li>
            <!--End Item-->
        `;
    });
    document.querySelector(`.${ID}_horizontalMenu__list`).innerHTML = htmlBlock;
}
export default initHorizontalMenu;