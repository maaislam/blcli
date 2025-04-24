import { fireEvent } from "../../../../../../core-files/services";
import { pollerLite } from "../../../../../../lib/utils";
import { cancelSVG, lockSVG, refundSVG } from "../assets/svg";
import calcRateDifference from "../helpers/calcRateDifference";

export const experiment324 = () => {
    const ID = 'TRAV-324';
    const VARIATION = '1';
    document.documentElement.classList.add(ID);
    document.documentElement.classList.add(`${ID}-${VARIATION}`);
    const style = document.createElement('style');
    style.innerHTML = `.TRAV-324.TRAV-325-v2 #extraModelContent {display: block !important;}.TRAV-324 .TRAV-324-fix-background{overflow:hidden!important;position:relative!important;height:100%!important;touch-action:none;-ms-touch-action:none}.TRAV-324 .pgHotel .main .c-section .fixedButton-wrapper .bookNow{display:none!important}.TRAV-324 .TRAV-324-bookNow{background:#0395ce;font-size:18px;color:#fff;padding-top:3px;padding-bottom:3px;border-radius:4px;font-family:"FS Albert Bold",arial,sans-serif;border:0;padding:0 20px;min-height:48px;width:100%}.TRAV-324 .TRAV-324-flexi-container-overlay{background:rgba(0,0,0,.33);position:fixed;top:0;left:0;width:100%;height:100%;z-index:2}.TRAV-324 .TRAV-324-flexi-container{position:fixed;z-index:2;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:100%;max-width:800px;background:#fff}@media screen and (max-width:768px){.TRAV-324 .TRAV-324-flexi-container{top:2%;width:95%;-webkit-transform:translate(-50%,0);transform:translate(-50%,0)}}@media screen and (max-width:480px){.TRAV-324 .TRAV-324-flexi-container{height:calc(100vh - 150px);overflow-y:auto}}.TRAV-324 .TRAV-324-flexi-container-head{padding:8px 16px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center}@media screen and (max-width:767px){.TRAV-324 .TRAV-324-flexi-container-head{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}}.TRAV-324 .TRAV-324-flexi-container-head h2{font-family:"FS Albert Bold",arial,sans-serif;color:#dc1323;text-align:center;font-size:18px;font-style:normal;font-weight:700;line-height:normal}.TRAV-324 .TRAV-324-flexi-container-head-skip{display:-webkit-box;display:-ms-flexbox;display:flex;max-width:160px;padding:0;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;gap:10px;-webkit-box-flex:1;-ms-flex:1 0 0px;flex:1 0 0;border-radius:5px;background:#fff;color:#008cc6;text-align:center;font-family:"FS Albert Bold",arial,sans-serif;font-size:18px;font-style:normal;font-weight:700;line-height:34px;border:2px solid #008cc6}@media screen and (max-width:767px){.TRAV-324 .TRAV-324-flexi-container-head-skip{margin-top:5px;max-width:300px;width:100%}}.TRAV-324 .TRAV-324-flexi-container-body{margin:0 16px 16px 16px;padding:16px 18px;border:2px solid #dd1325;display:-webkit-box;display:-ms-flexbox;display:flex;gap:16px}@media screen and (max-width:768px){.TRAV-324 .TRAV-324-flexi-container-body{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}}@media screen and (max-width:768px){.TRAV-324 .TRAV-324-flexi-container-body h3{text-align:center}}.TRAV-324 .TRAV-324-flexi-container-body-section{-webkit-box-flex:1;-ms-flex:1 1 0px;flex:1 1 0}.TRAV-324 .TRAV-324-flexi-container-body-left{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;gap:23px;-webkit-box-flex:1;-ms-flex:1 0 0px;flex:1 0 0}.TRAV-324 .TRAV-324-flexi-container-body-left h3{color:var(--Text-grey,#464646);font-family:"FS Albert Bold",arial,sans-serif;font-size:18px;font-style:normal;font-weight:700;line-height:normal}.TRAV-324 .TRAV-324-flexi-container-body-left p{color:var(--Text-grey,#464646);font-family:"FS Albert Light",arial,sans-serif;font-size:16px;font-style:normal;font-weight:400;line-height:normal;margin:0;display:-webkit-box;display:-ms-flexbox;display:flex;gap:12px;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.TRAV-324 .TRAV-324-flexi-container-body-left p:nth-child(2){gap:4px}.TRAV-324 .TRAV-324-flexi-container-body-left p:nth-child(2) svg{margin-left:-9px}.TRAV-324 .TRAV-324-flexi-container-body-left button{display:-webkit-box;display:-ms-flexbox;display:flex;max-width:350px;padding:8px 16px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;gap:4px;-ms-flex-item-align:stretch;align-self:stretch;border-radius:5px;background:#dc1323;color:#fff;border:0;font-family:"FS Albert Bold",arial,sans-serif;font-size:18px}.TRAV-324 .TRAV-324-flexi-container-body-right img{width:100%;height:240px}.TRAV-324 .TRAV-324-flexi-container-footer{display:-webkit-box;display:-ms-flexbox;display:flex;padding:8px 24px;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center;gap:16px;-ms-flex-item-align:stretch;align-self:stretch;background:#fff;-webkit-box-shadow:0 0 10px 0 rgba(0,0,0,.15);box-shadow:0 0 10px 0 rgba(0,0,0,.15)}@media screen and (max-width:768px){.TRAV-324 .TRAV-324-flexi-container-footer{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}}.TRAV-324 .TRAV-324-flexi-container-footer-left{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.TRAV-324 .TRAV-324-flexi-container-footer-left p{color:#464646;font-family:"FS Albert Light",arial,sans-serif;font-size:16px;font-style:normal;font-weight:400;line-height:normal;margin:0}.TRAV-324 .TRAV-324-flexi-container-footer-left p span{font-family:"FS Albert Bold",arial,sans-serif}.TRAV-324 .TRAV-324-flexi-container-footer-right{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}@media screen and (max-width:768px){.TRAV-324 .TRAV-324-flexi-container-footer-right{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}}.TRAV-324 .TRAV-324-flexi-container-footer-right button{display:-webkit-box;display:-ms-flexbox;display:flex;max-width:350px;padding:4px 16px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;gap:10px;-webkit-box-flex:1;-ms-flex:1 0 0px;flex:1 0 0;border-radius:5px;background:#008cc6;color:#fff;text-align:center;font-family:"FS Albert Bold",arial,sans-serif;font-size:18px;font-style:normal;font-weight:700;line-height:42px;border:0}.TRAV-324 .TRAV-324-flexi-container-footer-section{-webkit-box-flex:1;-ms-flex:1 1 0px;flex:1 1 0}@media screen and (max-width:768px){.TRAV-324 .TRAV-324-flexi-container-footer-section{width:100%}}`;
    document.head.appendChild(style);


    pollerLite(['.pgHotel .main .c-section .bookNow'], () => {
        const originalBookNow = document.querySelector('.pgHotel .main .c-section .db-view .bookNow');
        const originalBookNowMobile = document.querySelector('.pgHotel .main .c-section .fixedButton-wrapper .bookNow');

        //Desktop
        const newBookNowHtml = `
      <button class="${ID}-bookNow">Proceed to Extras</button>`;
        if (!document.querySelector(`.${ID}-bookNow`)) {
            originalBookNow.insertAdjacentHTML('afterend', newBookNowHtml);
        }
        //originalBookNow.insertAdjacentHTML('afterend', newBookNowHtml);
        const newBookNowDOM = document.querySelector(`.db-view  .${ID}-bookNow`);

        originalBookNow.style.display = 'none';

        //Mobile
        const newBookNowMobileHtml = `
      <button class="${ID}-bookNow">Proceed to Extras</button>`;
        if (!document.querySelector(`.${ID}-bookNow`)) {
            originalBookNowMobile.insertAdjacentHTML('afterend', newBookNowMobileHtml);
        }
        const newBookNowMobileDOM = document.querySelector(`.fixedButton-wrapper .${ID}-bookNow`);

        originalBookNowMobile.style.display = 'none';

        

        const flexiHtml = (rateDifference) => {
            // let flexiDifference = 18;
            // const currTotalDummy = 100;

            return `
        <div class="${ID}-flexi-container-overlay">
        </div>
        <div class="${ID}-flexi-container">
          <div class="${ID}-flexi-container-head">
            <h2>Before you move on, did you know we offer flexible rates?</h2>
            <button class="${ID}-flexi-container-head-skip">Skip</button>
          </div>
          <div class="${ID}-flexi-container-body">
            <div class="${ID}-flexi-container-body-left ${ID}-flexi-container-body-section">
              <h3>Don’t risk losing money if plans change!</h3>
              <p>${cancelSVG} Cancel until 12pm on arrival day</p>
              <p>${refundSVG} Get a total refund or amend for FREE</p>
              <p>${lockSVG} Rates fluctuate daily - lock them in now</p>
              <button class="${ID}-add-flexi">Continue with flexible rate | + £${rateDifference}</button>
            </div>
            <div class="${ID}-flexi-container-body-right ${ID}-flexi-container-body-section">
              <img src="https://media.travelodge.co.uk/image/upload/Testing/travelodge-flexi-rate.png" alt="Travelodge flexible rate">
            </div>
          </div>
        </div>
      `;
        };

        const clickAllNearestFlexi = () => {
            console.log('clickAllNearestFlexi');
            const allSelectedRates = document.querySelectorAll('.roomRates .card-pad button.selected');
            allSelectedRates.forEach((rate) => {
                console.log(rate.closest('.card-pad'), 'nearest card pad');
                rate.closest('.card-pad').querySelector('button[data-ratename="Flexible rate"]').click();
            });
        };

        newBookNowDOM.addEventListener('click', (e) => {
            e.preventDefault();
            fireEvent('Book Now Clicked');

            const allFlexiButtons = document.querySelectorAll('.roomRates .card-pad button[data-ratename="Flexible rate"]');
            console.log(allFlexiButtons);
            let flexiRateSelected = false;

            allFlexiButtons.forEach((button) => {
                if (button.classList.contains('selected')) {
                    flexiRateSelected = true;
                }
            });

            if (flexiRateSelected) {
                originalBookNow.click();
            } else {
                const rateDifference = calcRateDifference();
                const currTotal = document.querySelector('.rebaseFixedButton .js-room-total-amount').innerText.trim();

                const flexRate = flexiHtml(rateDifference, currTotal);

                const body = document.querySelector('body');
                body.classList.add(`${ID}-fix-background`);
                const html = document.querySelector('html');
                html.classList.add(`${ID}-fix-background`);

                const target = document.querySelector('.pgHotel');
                const overlay = document.querySelector(`.${ID}-flexi-container-overlay`);
                const flexiContainer = document.querySelector(`.${ID}-flexi-container`);

                if (!overlay && !flexiContainer) {
                    target.insertAdjacentHTML('beforeend', flexRate);
                    // const proceedButton = document.querySelector(`.${ID}-proceed-button`);
                    const addFlexiButton = document.querySelector(`.${ID}-add-flexi`);
                    const skipButton = document.querySelector(`.${ID}-flexi-container-head-skip`);

                    addFlexiButton.addEventListener('click', () => {
                        // allFlexiButtons.forEach((button) => {
                        //   button.click();
                        // });
                        clickAllNearestFlexi();
                        originalBookNow.click();

                        // addFlexiButton.innerText = 'Flexible rate added';
                        // addFlexiButton.disabled = true;
                        // // addFlexiButton.style.backgroundColor = '#61bc40';

                        // // document.querySelector(`.${ID}-flexi-container-body`).style.border = `2px solid #61bc40`;

                        // const newTotal = document.querySelector('.rebaseFixedButton .js-room-total-amount').innerText;
                        // document.querySelector(`.${ID}-flexi-container-footer-left p span`).innerText = `£${newTotal}`;
                    });

                    // proceedButton.addEventListener('click', (e) => {
                    //   e.preventDefault();
                    //   fireEvent('Proceed to Extras Clicked');
                    //   originalBookNow.click();
                    // });

                    skipButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        fireEvent('Skip Flexi Rate Clicked');
                        originalBookNow.click();
                    });
                }
            }
        });

        newBookNowMobileDOM.addEventListener('click', (e) => {
            e.preventDefault();
            //hide mbl order summary
            document.querySelector('.fixedButton-wrapper .sticky-summary-container').style.display = 'none';
            fireEvent('Book Now Clicked');

            const allFlexiButtons = document.querySelectorAll('.roomRates .card-pad button[data-ratename="Flexible rate"]');
            console.log(allFlexiButtons);
            let flexiRateSelected = false;

            allFlexiButtons.forEach((button) => {
                if (button.classList.contains('selected')) {
                    flexiRateSelected = true;
                }
            });

            if (flexiRateSelected) {
                originalBookNow.click();
            } else {
                const rateDifference = calcRateDifference();
                const currTotal = document.querySelector('.rebaseFixedButton .js-room-total-amount').innerText.trim();

                const flexRate = flexiHtml(rateDifference, currTotal);

                const body = document.querySelector('body');
                body.classList.add(`${ID}-fix-background`);
                const html = document.querySelector('html');
                html.classList.add(`${ID}-fix-background`);

                const target = document.querySelector('.pgHotel');
                const overlay = document.querySelector(`.${ID}-flexi-container-overlay`);
                const flexiContainer = document.querySelector(`.${ID}-flexi-container`);

                if (!overlay && !flexiContainer) {
                    target.insertAdjacentHTML('beforeend', flexRate);
                    // const proceedButton = document.querySelector(`.${ID}-proceed-button`);
                    const addFlexiButton = document.querySelector(`.${ID}-add-flexi`);
                    const skipButton = document.querySelector(`.${ID}-flexi-container-head-skip`);

                    addFlexiButton.addEventListener('click', () => {
                        // allFlexiButtons.forEach((button) => {
                        //   button.click();
                        // });
                        clickAllNearestFlexi();
                        originalBookNow.click();

                        // addFlexiButton.innerText = 'Flexible rate added';
                        // addFlexiButton.disabled = true;
                        // // addFlexiButton.style.backgroundColor = '#61bc40';

                        // // document.querySelector(`.${ID}-flexi-container-body`).style.border = `2px solid #61bc40`;

                        // const newTotal = document.querySelector('.rebaseFixedButton .js-room-total-amount').innerText;
                        // document.querySelector(`.${ID}-flexi-container-footer-left p span`).innerText = `£${newTotal}`;
                    });

                    // proceedButton.addEventListener('click', (e) => {
                    //   e.preventDefault();
                    //   fireEvent('Proceed to Extras Clicked');
                    //   originalBookNow.click();
                    // });

                    skipButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        fireEvent('Skip Flexi Rate Clicked');
                        originalBookNow.click();
                    });
                }
            }
        });
    });
};