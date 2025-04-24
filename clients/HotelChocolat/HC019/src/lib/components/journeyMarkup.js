import shared from "../shared";

/**
* Rebuild the product page
*/
const { ID } = shared;

export default class JourneyMarkup {
    constructor() {
        this.create();
        this.bindEvents();
        this.render();
    }
    
    create() {    
        const element = document.createElement('div');
        element.classList.add(`${ID}-journeyContent`);
        element.innerHTML = 
        `<div class="${ID}-container">
            <div class="${ID}-title">
                <h1>Build your Velvetiser</h1>
                <p>In-home hot chocolate machine. Imagined by Hotel Chocolat, engineered by Dualit. Select your colour, choose your starter kit - Velvetise your world!</p>
            </div>
            <div class="${ID}-productSection">
                <div class="${ID}-left">
                    <div class="${ID}-accordionSteps">
                        <div class="${ID}-accordionStep ${ID}-colours"> 
                            <div class="${ID}-stepTitle">1. Choose your Velvetiser Colour</div>
                            <p>(Includes 2 FREE Limited Edition Pod Cups worth £20)</p>
                            <div class="${ID}-stepContent"></div>
                        </div>
                        <div class="${ID}-accordionStep ${ID}-flakesSlider">
                            <div class="${ID}-stepTitle">2. Choose your starter kit*</div>
                            <div class="${ID}-stepContent">
                                <div class="${ID}-carousel"></div>
                            </div>
                        </div>
                        <div class="${ID}-accordionStep ${ID}-accessories">
                            <div class="${ID}-stepTitle">3. Add a little more?</div>
                            <div class="${ID}-stepContent">
                                <div class="${ID}-carousel"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="${ID}-right">
                    <div class="${ID}-priceBox">
                        <h2>Your Velvetiser kit:</h2>
                        <div class="${ID}-choices"></div>
                        <div class="${ID}-total">
                            <h2>Items Total:</h2><span></span>
                        </div>
                        <div class="${ID}-add">Add to bag</div>
                    </div>
                </div>
            </div>
        </div>`

         
        this.component = element;
    }
    
    bindEvents() {
        const { component } = this;
    }
    
    render() {
        const { component } = this;
        document.querySelector(`#main`).insertAdjacentElement('afterbegin', component);
    }
}
      
 