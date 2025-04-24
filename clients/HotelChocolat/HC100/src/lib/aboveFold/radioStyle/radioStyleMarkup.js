import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

export default class RadioStyleSteps {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {

      const element = document.createElement('div');
      element.classList.add(`${ID}-topContent`);
      element.innerHTML = `
        <div class="${ID}-left">
        </div>
        <div class="${ID}-right">
            <div class="${ID}-prodDetail">
              <div class="${ID}-title">
                  <span>NEW</span>
                  <h1><b>The Podster</b> Coffee System</h1>
                  <p>Barista-grade coffee, from sustainable pods, at home</p>
              </div>
              <div class="${ID}-reviews"></div>
              <span class="${ID}-prodNo">Item: 472791</span>
            </div>
            
            <div class="${ID}-radioOptions">
              <div class="${ID}-radioOption ${ID}-selected ${ID}-prod" data-id="472791" data-attr="podster" prod-name="The Podster Coffee System" data-qty="1">
                <div class="radioLabel">
                  <p><span class="${ID}-radio"></span>The Podster</p>
                  <p class="${ID}-radioPrice"><span class="${ID}-price">£149.95</span></p>
                </div>
              </div>
              <div class="${ID}-radioOption" data-attr="bundle" data-id="504045" data-qty="1">
                <div class="radioLabel">
                  <p><span class="${ID}-radio"></span>The Podster & Coffee Bundle</p>
                  <p class="${ID}-radioPrice">From <span class="${ID}-price">£159.95</span></p>
                </div>
                <div class="${ID}-save">Save £9.95</div>
                <div class="radioContent">
                  <div class="${ID}-intro">
                    <div class="${ID}-image"></div>
                    <div class="${ID}-text">
                      <h4>The tasting selection</h4>
                      <p>A selection of each of our five unique coffee blends.</p>
                    </div>
                  </div>
                  <div class="${ID}-options"></div>
                </div>
              </div>
              <div class="${ID}-radioOption" data-attr="subscription">
                <div class="radioLabel">
                  <p><span class="${ID}-radio"></span>The Podster & Coffee Subscription</p>
                  <p class="${ID}-radioPrice"><span class="${ID}-price">£74.95</span></p>
                </div>
                <div class="radioContent">
                  <h3>Buy for only £74.95 with a 6 or 12 month Rabot Estate Coffee Subscription:</h3>
                  <ul>
                    <li>Be rewarded with a £15 voucher for every tenth subscription item* received.</li>
                    <li>FREE UK standard delivery* on your subscription pods.</li>
                    <li>Amend your coffee flavours at any time.</li>
                  </ul>
                </div>
              </div>
            </div> 
        </div>
       
      `;
      this.component = element;

      // Move existing content
      const content = document.querySelector('#product-content');
      element.querySelector(`.${ID}-right`).appendChild(content);


      /*
      For fixed add to bag if needed
       <div class="${ID}-addToBagMobile">
          <div class="${ID}-container">
            <div class="${ID}-row">
              <div class="${ID}-price">Only <span>£149.95</span></div>
              <div class="${ID}-stock"><span></span>In Stock</div>
            </div>
            <div class="${ID}-row">
              <div class="${ID}-fixedCTA ${ID}-add">Add to bag</div>
            </div>
            </div>
        </div> */
      
    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;
      document.querySelector('.product-col-1').insertAdjacentElement('beforebegin', component);
      
    }
  }
