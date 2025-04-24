import lightboxContent from "./components/content";
import { fireEvent } from "./services";
import shared from "./shared";


const { ID, VARIATION } = shared;

export default class PageContent {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {

        let step1;
        let step2;
        let step3;
        if(VARIATION === '1') {
            step1 = 'Currently have an NHS Repeat Prescription? Search for the item you’ve been prescribed, fill in your personal details and the details of your GP';
            step2 = `<b>Collecting from store?</b> Our expert in-store pharmacists are on hand!! From diabetes to asthma, our pharmacists are always happy to talk to you about any health conditions you want support with. We’re here to prescribe kindness.<br></br><b>Choosing home delivery?</b> Our online pharmacy team will receive your NHS prescription from your GP, dispense your prescription and send it to you via Royal Mail.* From start to finish, this can take up to 7 days, but typically takes less.`
            step3 = "Sit back and relax! You will be notified when your order is available to collect in-store or due to be delivered - it's that easy";
        } else if(VARIATION === '2'){
            step1 = 'Tell us your prescription item(s), register your personal details and your GP.';
            step2 = 'We’ll send your request to the GP. Once checked and approved they’ll send us back the electronic prescription.';
            step3 = 'Choose from Click and Collect or home delivery*. Will let you know when its ready or on the way and remind you next time when you need to reorder - its that easy.';
        }

      const element = document.createElement('div');
      element.classList.add(`${ID}-homeContent`);
      element.innerHTML = `
       <section class="${ID}-aboveFold">
            <div class="${ID}-container">
                <div class="${ID}-topContent">
                    <div class="${ID}-col-left">
                        <h1>NHS repeat prescriptions</h1>
                        <p>Order securely for yourself or others</p>
                        <a class="${ID}-cta ${ID}-blue ${ID}-orderButton">Order now</a>
                        <a class="${ID}-cta ${ID}-white ${ID}-login">Login</a>
                    </div>
                    <div class="${ID}-col-right">
                        <div class="${ID}-logo"></div>
                        <div class="${ID}-boxes">
                            <div class="${ID}-box" box-target="click-collect">
                                <div class="${ID}-banner"><span>avg. 4 days</span></div>
                                <div class="${ID}-box-content">
                                    <span></span>
                                    <p>Click and collect <br>(fastest!)</p>
                                </div>
                            </div>
                            <div class="${ID}-box" box-target="free-delivery">
                                <div class="${ID}-banner"><span>avg. 6 days</span></div>
                                <div class="${ID}-box-content">
                                    <span></span>
                                    <p>Free <br> delivery*</p>
                                </div>
                            </div>
                            <div class="${ID}-box" box-target="access-gp">
                                <div class="${ID}-box-content">
                                    <span></span>
                                    <p>Access GP <br> record</p>
                                </div>
                            </div>
                            <div class="${ID}-box" box-target="reminder">
                                <div class="${ID}-box-content">
                                    <span></span>
                                    <p>Reminders to <br> reorder</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </section>
       <section class="${ID}-howItWorks">
            <div class="${ID}-container">
                <div class="${ID}-col-center">
                    <h2>How does it work?</h2>
                    <div class="${ID}-steps">
                        <div class="${ID}-step">
                            <div class="${ID}-number"><span>1</span></div>
                            <p>${step1}</p>
                        </div>
                        <div class="${ID}-step">
                            <div class="${ID}-number"><span>2</span></div>
                            <p>
                                ${step2}
                            </p>
                        </div>
                        <div class="${ID}-step">
                            <div class="${ID}-number"><span>3</span></div>
                            <p>${step3}</p>
                        </div>
                    </div>
                </div>
            </div>
       </section>
       </section>
       <section class="${ID}-details">
            <div class="${ID}-contentBlocks">
                <div class="${ID}-content ${ID}-linkKey">
                    <div class="${ID}-col-left">
                        <h2>Everything in one place, orders, reminders, working with your GP.</h2>
                        <p>Available through participating GP surgeries, in England, you can use your GP Linkage key (sometimes known as GP passphrase). You can pick the prescription item you need straight from your records, without worrying about spelling, quantity or strength and any changes made to your repeat medication by your GP will automatically be updated. Find out more at our <a href="https://www.boots.com/floating-editorial/editorial-legal/editorial-health/frps-faqs">GP Online Services FAQs</a></p>
                    </div>
                </div>
                <div class="${ID}-content ${ID}-help">
                    <div class="${ID}-col-left">
                        <h2>Help someone you know</h2>
                        <p>Do you look after a family member or friend? With their consent you can opt to manage their prescription, ordering their items and arranging collection or delivery on their behalf. Follow the steps above, and simply select “someone else” when prompted, search for their items, register your account details and you will then be asked for the patients details. We’ll take care of the rest.</p>
                    </div>
                </div>
            </div>
            <div class="${ID}-container">
                <div class="${ID}-faq"></div>
                <div class="${ID}-order">
                    <h2>Ready to order?</h2>
                    <div class="${ID}-buttons">
                        <a class="${ID}-cta ${ID}-white ${ID}-orderButton">Order now</a>
                        <a class="${ID}-cta ${ID}-white ${ID}-login">Login</a>
                    </div>
                </div>
                <div class="${ID}-care"></div>
            </div>
       </section>
       <section class="${ID}-app">
        <div class="${ID}-container">
            <h2>Prefer to use an app?</h2>
            <p>Download the Boots Shopping app now, then select Health & Pharmacy</p>
            <div class="${ID}-appbuttons">
                <a href="https://apps.apple.com/gb/app/boots/id880993267" target="_blank" class="${ID}-appButton ${ID}-appStore"></a>
                <a href="https://play.google.com/store/apps/details?id=com.boots.flagship.android&hl=en_GB&gl=US" target="_blank" class="${ID}-appButton ${ID}-googlePlay"></a>
            </div>
        </div>
       </section>
      `;
      this.component = element;

      // move faq
      const informationSection = document.querySelector('[class*="styles__informations"]');
      element.querySelector(`.${ID}-faq`).appendChild(informationSection);

      // move care text
      const careText = document.querySelector('[class*="styles__description"]');
      element.querySelector(`.${ID}-care`).appendChild(careText);
    }

    bindEvents() {
        const { component } = this;
        const orderButton = document.querySelector('[class*="styles-module__primary"]');
        const loginButton = document.querySelector('[class*="styles-module__secondary"]');
        const allOrderCTAs = component.querySelectorAll(`.${ID}-cta.${ID}-orderButton`);
        const allLoginCTAs = component.querySelectorAll(`.${ID}-cta.${ID}-login`);

        for (let index = 0; index < allOrderCTAs.length; index += 1) {
            const element = allOrderCTAs[index];
            element.addEventListener('click', () => {
                orderButton.click();
                fireEvent('Click order now')
            });
        }

        for (let i = 0; i < allLoginCTAs.length; i += 1) {
            const element = allLoginCTAs[i];
            element.addEventListener('click', () => {
                loginButton.click();
                fireEvent('Click login')
            });
        }

        // lightbox
        const lightbox = document.querySelector(`.${ID}-lightboxModal`);

        const showBox = () => {
            if(document.querySelector(`.${ID}-lightboxModal`)) {
                lightbox.classList.add(`${ID}-modalShow`);
                document.documentElement.classList.add(`${ID}-noScroll`);
                document.querySelector(`.${ID}-overlay`).classList.add(`${ID}-overlayShow`);
            }
        }

        // on click of boxes
        const allBoxes = component.querySelectorAll(`.${ID}-box`);
        for (let x = 0; x < allBoxes.length; x += 1) {
            const boxEl = allBoxes[x];
            boxEl.addEventListener('click', () => {
                const boxTarget = boxEl.getAttribute('box-target');
                const matchingContent = lightboxContent[boxTarget];

                lightbox.querySelector(`.${ID}-modalInner`).innerHTML = 
                `<h2>${matchingContent.title}</h2><p>${matchingContent.text}</p>`;
                showBox();
            });
        }

        // app link clicks
        const appleButton = component.querySelector(`.${ID}-appButton.${ID}-appStore`);
        const googleButton = component.querySelector(`.${ID}-appButton.${ID}-googlePlay`);

        if(appleButton) {
            appleButton.addEventListener('click', () => {
                fireEvent('Click App store button');
            });
        }

        if(googleButton) {
            googleButton.addEventListener('click', () => {
                fireEvent('Click Google Play button');
            });
        }
    }
  
    render() {
      const { component } = this;
      document.querySelector('header').insertAdjacentElement('afterend', component);
    }
  }
