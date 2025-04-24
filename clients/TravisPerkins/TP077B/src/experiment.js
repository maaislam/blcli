/* eslint-disable */
import { fullStory } from '../../../../lib/utils';
import { events } from '../../../../lib/utils'; 
/**
 * {{ID}} - {{Experiment Title}}
 */

const Run = ()=>{ 
const $ = window.jQuery;
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'TP077B',
    VARIATION: '1',
  },

  init: function init() {
    // Setup
    const { settings } = Experiment;
    const { services } = Experiment;
    const { components } = Experiment;
    services.tracking();
    components.setupElements();
    components.setupFunctions();
  },

  cache: (() => {
    const bodyVar = document.body;
    const clickAndCollectButton = $('#addForCollectButton');
    const TP077BcloseModal = $('#cboxClose');
    const postcodeInputBox = bodyVar.querySelector('.postcode-input');
    const TP077BMarkup = (`
      <div class="TP077B_CheckStock_Wrapper">
        <p class="TP077B_CheckStock_Header">Check stock</p>
        <p class="TP077B_CheckStock_Content">Check stock at your local branch</p>
        <div class="TP077B_SearchBox_Wrapper">
              <div class="TP077B_SearchBox">
                <input type="text" id="TP077B_PostcodeSearch" placeholder="Enter your postcode">
                <span class="TP077B_SearchButton">Search</span>
              </div>
        </div>
     </div>
    `);

    const productInfo = bodyVar.querySelector('.tpProductInfo');
    const searchBox = bodyVar.querySelector('.search-box > .postcode-input');
    const searchButton = bodyVar.querySelector('#collectionBranchLocatorButton');
    let newSearchButton;
    let newPostcodeInput;
 

    return {
      bodyVar,
      clickAndCollectButton,
      TP077BcloseModal,
      TP077BMarkup,
      postcodeInputBox,
      productInfo,
      searchBox,
      searchButton,
      newPostcodeInput,
      newSearchButton
      
    };
  })(),

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
  },

  components: {

    setupElements: () => {
      Experiment.cache.bodyVar.classList.add(Experiment.settings.ID);
      Experiment.cache.bodyVar.classList.add('TP077B_Loading');

      setTimeout(function(){	
				//Click the Click and Collect button to call required elements

					Experiment.cache.clickAndCollectButton.click();

					
					setTimeout(function(){	
            Experiment.cache.TP077BcloseModal.click();
            
						setTimeout(function(){	
						//Remove class to resume normal website functionality
						
							Experiment.cache.bodyVar.classList.remove('TP077B_Loading');	
						}, 400);
					}, 400);
        }, 1000);
        
        Experiment.cache.productInfo.insertAdjacentHTML('beforeend', Experiment.cache.TP077BMarkup);
        Experiment.cache.newSearchButton = Experiment.cache.bodyVar.querySelector('.TP077B_SearchButton');
        Experiment.cache.newPostcodeInput = Experiment.cache.bodyVar.querySelector('#TP077B_PostcodeSearch');

        //Assign new postcode input a postcode if one already exists, takes postcode from existing forms

        if(Experiment.cache.searchBox.value){
          Experiment.cache.newPostcodeInput.value = Experiment.cache.searchBox.value; 
        }
    },

    setupFunctions: () => {

      //Take new postcode input value, insert into form and click search

      Experiment.cache.newSearchButton.addEventListener("click", function(){
        //Assign existing form new postcode input
        events.send('TP077B', 'Click', 'Search', {sendOnce: true});
        Experiment.cache.searchBox.value = Experiment.cache.newPostcodeInput.value;
        Experiment.cache.clickAndCollectButton.click();
        $(Experiment.cache.searchButton).click();
  
      });

      //If postcode changes on click and collect, update new postcode input

      Experiment.cache.searchButton.addEventListener('click', function(){
        if(Experiment.cache.searchBox.value != Experiment.cache.newPostcodeInput.value){
          Experiment.cache.newPostcodeInput.value = Experiment.cache.searchBox.value;
        }
      });
    
    }
  }
  }

  // Prevents test duplication
  if (!document.querySelector('.TP077B_CheckStock_Wrapper')){
    Experiment.init();
  }
};

export default Run;
