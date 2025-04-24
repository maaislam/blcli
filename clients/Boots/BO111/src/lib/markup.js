import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID, VARIATION } = shared; 

export default class AdContent {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-content`);
      element.innerHTML = `
        <section class="${ID}-topContent">
                <div class="${ID}-container">
                    <div class="${ID}-left">
                        <h1>Boots Advantage Card</h1>
                        <div class="${ID}-actions">
                            <a href="https://www.boots.com/AdvantageCardApply?catalogId=28501&langId=-1&storeId=11352&krypto=0wp%2B4NX0fuEr5yAnU2OOofuJqq5YJHVhBtzMgm7gqerXoDZb%2BegZXF25ikP%2F%2FNWbUtmCBbHVoPlMlnjlZqFBYg%3D%3D?cm_sp=Advantage-Card-Sign-Up" class="${ID}-button">Sign up</a>
                            <a href="https://www.boots.com/BootsLogonForm?catalogId=28501&myAcctMain=1&langId=-1&storeId=11352&krypto=zVyt8c%2FeMHl3xkCpur2RMYhi2fqFTR%2Fskvoc%2BnP1pjoqkFf1ywXQW3wX7BtpnOgp9wYj9A%2FqoHdgBIvZywRTulvwrV9bW60sA5A5PgbLMnSQhpDZQcLo9c5yc5Fg4lrCYP44BpDhmY0Xt6KyKj7vCA%3D%3D?cm_sp=Advantage-Card-Log-In" class="${ID}-textLink">Log in to manage your account</a>
                        </div>
                    </div>
                    <div class="${ID}-right"></div>
                </div>
        </section>
        
        ${VARIATION === '1' ? `<section class="${ID}-benefits">
            <div class="${ID}-container">
                <h2>Benefits</h2>
                <ul>
                    <li><b>Collect</b> 4 points for every £1 you spend in-store, online and in app</li>
                    <li><b>Save</b> on your favourites with personalised offers based on what you like</li>
                    <li><b>Spend</b> your points on anything you like in-store or online</li>
                </ul>
            </div>
        </section>` : ''}

        <section class="${ID}-signups">
            <div class="${ID}-container">
                <div class="${ID}-block ${ID}-app">
                    <div class="${ID}-bg"></div>
                    <div class="${ID}-image"><a href="https://www.boots.com/boots-shopping/app"></a></div>
                    <div class="${ID}-text">
                        <h4>Get 200 points when you download</h4>
                        <a href="https://www.boots.com/boots-shopping/app" class="${ID}-textLink">the Boots app*</a>
                    </div>
                </div>
                <div class="${ID}-block ${ID}-email">
                    <div class="${ID}-bg"></div>
                    <div class="${ID}-image"><a href="https://www.boots.com/EmailPreferenceView?catalogId=28501&langId=-1&storeId=11352"></a></div>
                    <div class="${ID}-text">
                        <h4>Recieve all the latest health & beauty content</h4>
                        <a href="https://www.boots.com/EmailPreferenceView?catalogId=28501&langId=-1&storeId=11352" class="${ID}-textLink">Sign up to boots emails</a>
                    </div>
                </div>
            </div>
        </section>

        ${VARIATION === '2' ? `<section class="${ID}-benefits">
            <div class="${ID}-container">
                <h2>Benefits</h2>
                <ul>
                    <li><b>Collect</b> 4 points for every £1 you spend in-store, online and in app</li>
                    <li><b>Save</b> on your favourites with personalised offers based on what you like</li>
                    <li><b>Spend</b> your points on anything you like in-store or online</li>
                </ul>
            </div>
        </section>` : ''}

        <section class="${ID}-adClub">
            <div class="${ID}-container">
                <div class="${ID}-heading">
                    <h4>Advantage Card Clubs</h4>
                    <p>Join one of our Advantage Card clubs for even more benefits</p>
                </div>
                <div class="${ID}-gridBlocks">
                    <div class="${ID}-block ${ID}-parent">
                        <div class="${ID}-bg"></div>
                        <div class="${ID}-image"><a href="https://www.boots.com/webapp/wcs/stores/servlet/parenting-club"></a></div>
                        <div class="${ID}-text">
                            <h4>Pregnant or a parent?</h4>
                            <p>Join the Boots Parenting Club</p>
                            <a href="https://www.boots.com/webapp/wcs/stores/servlet/parenting-club" class="${ID}-textLink">Join now</a>
                        </div>
                    </div>
    
                    <div class="${ID}-block ${ID}-over60">
                        <div class="${ID}-bg"></div>
                        <div class="${ID}-image"> <a href="https://www.boots.com/webapp/wcs/stores/servlet/over60s"></a></div>
                        <div class="${ID}-text">
                            <h4>Are you 60 or over?</h4>
                            <p>Join Over 60s Rewards</p>
                            <a href="https://www.boots.com/webapp/wcs/stores/servlet/over60s" class="${ID}-textLink">Join now</a>
                        </div>
                    </div>

                    <div class="${ID}-block ${ID}-beauty">
                        <div class="${ID}-bg"></div>
                        <div class="${ID}-image"><a href="https://www.boots.com/CategoryDisplay?urlRequestType=Base&catalogId=28501&categoryId=2227179&pageView=&urlLangId=&beginIndex=0&langId=-1&top_category=1743691&storeId=11352"></a></div>
                        <div class="${ID}-text">
                            <h4>Love beauty? Yes!</h4>
                            <p>Join the Boots X tribe</p>
                            <a href="https://www.boots.com/CategoryDisplay?urlRequestType=Base&catalogId=28501&categoryId=2227179&pageView=&urlLangId=&beginIndex=0&langId=-1&top_category=1743691&storeId=11352" class="${ID}-textLink">Join now</a>
                        </div>
                    </div>

                    <div class="${ID}-block ${ID}-student">
                        <div class="${ID}-bg"></div>
                        <div class="${ID}-image"><a href="https://www.boots.com/CategoryDisplay?urlRequestType=Base&catalogId=28501&categoryId=2071182&pageView=&urlLangId=&beginIndex=0&langId=-1&top_category=1743691&storeId=11352"></a></div>
                        <div class="${ID}-text">
                            <h4>Are you a student?</h4>
                            <p>Get 10% off the brands you love</p>
                            <a href="https://www.boots.com/CategoryDisplay?urlRequestType=Base&catalogId=28501&categoryId=2071182&pageView=&urlLangId=&beginIndex=0&langId=-1&top_category=1743691&storeId=11352" class="${ID}-textLink">Find out more</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="${ID}-container ${ID}-smallPrint">
            <p class="${ID}-small">*when you download the app for the first time & make a transaction (no minimum spend)</p>
        </div>

        <section class="${ID}-faq">
            <div class="${ID}-container">
                <h3>Help with Boots Advantage Card</h3>
                <p>If you’d like to find out more, please see our&nbsp;<a href="https://www.boots.com/advantage-card/advantage-card-help" target="_blank">frequently asked questions</a> or <a href="https://www.boots.com/terms-conditions/advantage-card-terms-and-conditions" target="_blank">terms &amp; conditions</a>.
                </p>
                <p>*Parenting Club t&amp;cs apply</p> 
            </div>
        </section>
      `;
      this.component = element;


    const breadcrumb = document.querySelector('.oct-breadcrumb');
    if(breadcrumb) {
        element.insertAdjacentElement('beforebegin', breadcrumb);
    }

      

    }
  
    bindEvents() {
      const { component } = this;

      component.querySelector(`.${ID}-topContent .${ID}-button`).addEventListener('click', () => {
          fireEvent('Click Sign up');
      })
      component.querySelector(`.${ID}-topContent .${ID}-textLink`).addEventListener('click', () => {
        fireEvent('Click Log in');
        });

        const allBlockLinks = component.querySelectorAll(`.${ID}-block`);

        for (let index = 0; index < allBlockLinks.length; index += 1) {
            const element = allBlockLinks[index];

            element.querySelector(`.${ID}-textLink`).addEventListener('click', () => {
                const elName = element.querySelector('h4');
                if(elName) {
                    fireEvent('Clicked content panel ' + elName.textContent);
                }
            });

            element.querySelector(`.${ID}-image a`).addEventListener('click', () => {
                const elName = element.querySelector('h4');
                if(elName) {
                    fireEvent('Clicked content panel ' + elName.textContent);
                }
            });
            
            
        }
    }
  
    render() {
      const { component } = this;
      if(document.querySelector('#main') && document.querySelector('.oct-template')) {
        document.querySelector('#main').insertAdjacentElement('afterbegin', component);
      } else {
        document.querySelector('#content').insertAdjacentElement('afterbegin', component);
      }
      
    }
  }