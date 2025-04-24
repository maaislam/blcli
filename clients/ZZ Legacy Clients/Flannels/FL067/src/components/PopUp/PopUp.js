import settings from '../../lib/settings';
const {
    ID
} = settings;
//Get basic assets before returning the block
const prodImage = document.querySelector('#pnlMainProductImage #zoomMainImage img').src.trim(); 
const prodBrand = document.querySelector('#lblProductBrand').textContent.trim();
const prodDesc = document.querySelector('#lblProductName').textContent.trim().toLowerCase();
const prodPrice = document.querySelector('.pdpPrice span').textContent.trim();
//Return part-populated block with no events on it
function PopUp(){
    return `
    <div class="${ID}_cartPopUpWrap">
        <div class="${ID}_cartPopUp">
            <div class="${ID}_cartPopUp__imageWrap">
                <img src="${prodImage}" alt="" class="${ID}_cartPopUp__image">
            </div>
            <!--End img-->
            <div class="${ID}_cartPopUp__infoWrap">
                <div class="${ID}_cartPopUp__info">
                <h4 class="${ID}_cartPopUp__infoTitle" data-icon="check">Successfully added to bag</h3>
                <ul class="${ID}_cartPopUp__list">
                    <li class="${ID}_cartPopUp__listItem">
                        <span class="${ID}_carousel__brand">${prodBrand}</span>
                    </li>
                    <!--End Item-->
                    <li class="${ID}_cartPopUp__listItem">
                        <span class="${ID}_carousel__desc">${prodDesc}</span>
                    </li>
                    <!--End Item-->
                    <li class="${ID}_cartPopUp__listItem">
                        <span class="${ID}_carousel__price">${prodPrice}</span>
                    </li>
                    <!--End Item-->
                </ul>
                </div>
            </div>
            <!--End info-->
            <div class="${ID}_buttonWrap">
                <button class="${ID}_button ${ID}_button--black" id="viewBag"><span>View bag</span></button>
            </div>
            <!--End button-->
            <div class="${ID}_buttonWrap">
                <button class="${ID}_button ${ID}_button--black" id="checkout"><span>${window.innerWidth <= 768 ? 'Secure checkout' : 'Proceed to checkout'}</span></button>
            </div>
            <!--End button-->
        </div>
    </div>
    <!--End popUp-->
    `;
}

export default PopUp;