import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
// import formSubmit from "./formSubmit";

const { ID, VARIATION } = shared;

export default () => {

    const { ID } = shared;


    document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-lightboxOverlay"></div>`);

    /*
    <div class="spinnerContainer">
            <img src="https://www.boots.com/wcsstore/eBootsStorefrontAssetStore/images/boots/boots_loader_spinner.gif" alt="">
          </div>
    */

    const createLightbox = () => {
      const emailBox = document.createElement('div');
      emailBox.classList.add(`${ID}-emailSignUp`);
      emailBox.innerHTML = 
      `<div class="${ID}-lightboxContent container">
        <div class="${ID}-close"></div>
          
          <div class="${ID}-left">
            <div class="${ID}-bootsLogo"></div>
            <div class="${ID}-voucherForm">
              <div class="lightbox_voucherContainer">
                <p>Save 10% on selected multi-vitamins using offer code <strong>MULTIVITS10</strong> at checkout</p>
              </div>
            </div>
          </div>

          <div class="${ID}-right" style="background-image: url('https://service.maxymiser.net/cm/images-eu/new-boots-com/2C2117C7E7633C1F86800D983B802284EB364786787FEE49EE9C460084D2CA12.png?meta=/Image-Upload/boots_vitamins2.png')"></div>
          
        </div>`;

        document.body.appendChild(emailBox);

        let variationVoucherContent;
        if (VARIATION == '2' && !document.querySelector(`.${ID}-voucher`)) {
          variationVoucherContent = `<div class="${ID}-voucher">
            <input type="text" readonly value="MULTIVITS10"/>
            <div class="${ID}-copyButton"></div>
          </div>`;
          document.querySelector(`.${ID}-voucherForm .lightbox_voucherContainer`).insertAdjacentHTML('beforeend', variationVoucherContent);
        } else if (VARIATION == '1' && !document.querySelector(`a.${ID}-vitaminsLink`)) {
          variationVoucherContent = `
            <a class="${ID}-vitaminsLink" href="/health-pharmacy/vitaminsandsupplements/multivitamins">
            <div class="${ID}-button">Shop Now</div>
            </a>`;
          document.querySelector(`.${ID}-voucherForm .lightbox_voucherContainer`).insertAdjacentHTML('beforeend', variationVoucherContent);
        }
    }

    const boxEvents = () => {
        const emailBox = document.querySelector(`.${ID}-emailSignUp`);
        const overlay = document.querySelector(`.${ID}-lightboxOverlay`);

        const closeBox = () => {
          emailBox.classList.remove(`${ID}-emailShow`);
          overlay.classList.remove(`${ID}-overlayShow`);
          localStorage.setItem(`${ID}-vitamins-popup`, 1);

          fireEvent('Conditions Met - Lightbox Closed');
        }

        const openBox = () => {
          emailBox.classList.add(`${ID}-emailShow`);
          overlay.classList.add(`${ID}-overlayShow`);
          fireEvent('Visible - Vitamins Lightbox Shown');
        }

        const closeIcon = document.querySelector(`.${ID}-emailSignUp .${ID}-close`);

        

        closeIcon.addEventListener('click', () => {
          closeBox();
        });

        overlay.addEventListener('click', () => {
          closeBox();
        });

        // form submit
        const form = document.querySelector(`.${ID}-emailSignUp form`);

        openBox();
    }


    createLightbox();

    boxEvents();

   


      const copyTextButton = document.querySelector(`.${ID}-copyButton`);
      const textToCopy = document.querySelector(`.${ID}-voucher input`);
      if(textToCopy && copyTextButton) {
        copyTextButton.addEventListener('click', () => {
            textToCopy.select();
            textToCopy.setSelectionRange(0, 99999); /*For mobile devices*/
          document.execCommand("copy");
        });
      }


      const continueButton = document.querySelector(`.${ID}-vitaminsLink .${ID}-button`);
        const emailBox = document.querySelector(`.${ID}-emailSignUp`);
        const overlay = document.querySelector(`.${ID}-lightboxOverlay`);
        continueButton.addEventListener('click', () => {
          if(emailBox) {
            emailBox.classList.remove(`${ID}-emailShow`);
          }
          if(overlay) {
            overlay.classList.remove(`${ID}-overlayShow`);
          }
          localStorage.setItem(`${ID}-vitamins-popup`, 1);
          document.documentElement.classList.remove(`${ID}-noScroll`);
      });

}