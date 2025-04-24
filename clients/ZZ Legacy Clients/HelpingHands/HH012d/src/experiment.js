import { setup } from './services';

const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const homeCareArea = bodyVar.querySelector('#menu-item-728 > .dropdown-menu');
      const allHomeCareLinks = bodyVar.querySelectorAll('#menu-item-728 > .dropdown-menu > li');

      return {
        docVar,
        bodyVar,
        homeCareArea,
        allHomeCareLinks,
      };
    })(),
    init: () => {
      // Setup
      setup();
      Exp.components.setupElements();
    },
    components: {
      setupElements() {
        Exp.render.renderController();
      },
    },
    render: {
      renderController() {
        this.navArea();
        // Assign selectors
        const tSContainer = Exp.cache.bodyVar.querySelector('.HH012d_TCare_Container > .HH012d_Link_Container');
        const cSContainer = Exp.cache.bodyVar.querySelector('.HH012d_CCare_Container > .HH012d_Link_Container');
        // Node element is the index for retrieveing the relevant links from the DOM
        const tsElements = [
          { nodeElement: 9, navText: 'Receive support within as little as 24 hours' },
          { nodeElement: 10, navText: 'Nightly care from one of our trained carers' },
          { nodeElement: 3, navText: 'Care for a loved one whilst you take a break' },
          { nodeElement: 1, navText: 'Specialist support for terminal conditions' }];
        const csElements = [
          { nodeElement: 6, navText: 'Clinical support by registered nurses' },
          { nodeElement: 4, navText: 'At home care by dementia specialist carers' },
          { nodeElement: 5, navText: 'Support for a variety of other health conditions' },
          { nodeElement: 8, navText: 'Support to help you study, work or play' }];
        this.moveNavElements(tSContainer, tsElements);
        this.moveNavElements(cSContainer, csElements);
      },
      // Containing markup to move elements to
      navArea() {
        Exp.cache.homeCareArea.insertAdjacentHTML('afterend', `
          <div class="HH012d_Container">
            <div class="HH012d_Sub_Container HH012d_Our_Services_Container">
              <span class="HH012d_Sub_Container_Header">Our Services</span>
              <div class="HH012d_Services_Container">
              <a class="HH012d_Service_Link" href="/live-in-care/">
                <div class="HH012d_Service_Block">
                  <span class="HH012d_Service_Header">Live-in care</span>
                  <span class="HH012d_Service_Text">Fully trained individuals who live with you in your own home</span>
                </div>
                </a>
              <a class="HH012d_Service_Link" href="/visiting-care/">
                <div class="HH012d_Service_Block">
                  <span class="HH012d_Service_Header">Visiting care</span>
                  <span class="HH012d_Service_Text">Flexible visits from a regular carer, from half an hour a day</span>
                </div>
              </a>
              <a class="HH012d_Service_Link" href="/costs-funding/">
                <div class="HH012d_Service_Block">
                  <span class="HH012d_Service_Header">Care costs</span>
                  <span class="HH012d_Service_Text">Understand your home care funding options</span>
                </div>
              </a>
              </div>
            </div>
            <div class="HH012d_Sub_Container HH012d_TCare_Container">
              <span class="HH012d_Sub_Container_Header">Time specific care</span>
              <ul class="HH012d_Link_Container"></ul>
            </div>
            <div class="HH012d_Sub_Container HH012d_CCare_Container">
              <span class="HH012d_Sub_Container_Header">Condition specific care</span>
              <ul class="HH012d_Link_Container"></ul>
            </div>
          </div>
        `);
      },
      moveNavElements(containingElement, navData) {
        // Move nav element
        for (let i = 0, n = navData.length; i < n; i += 1) {
          containingElement.insertAdjacentElement('beforeend', Exp.cache.allHomeCareLinks[navData[i].nodeElement]);
        }
        // Store a reference to all nav links in the current container
        const textRenderArea = containingElement.querySelectorAll('li > a');
        // Render text underneath moved element
        for (let i = 0, n = navData.length; i < n; i += 1) {
          textRenderArea[i].insertAdjacentHTML('beforeend', `
            <span class="HH012d_Nav_Link_Text">${navData[i].navText}</span>
          `);
        }
      },
    },
  };

  Exp.init();
};

export default Run;
