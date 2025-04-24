import shared from "./shared";
import { updatePrice } from "./helpers";
import { events } from "../../../../../lib/utils";


export default () => {

    const { ID, VARIATION } = shared;
  

    const chooseFlakes = () => {
      const kitproduct = document.querySelectorAll(`.${ID}-accordionStep.${ID}-flakes .${ID}-product`);
        for (let index = 0; index < kitproduct.length; index += 1) {
        const element = kitproduct[index];
        element.addEventListener('click', (e) => {
          if(e.target === element.querySelector(`.plus`) || e.target === element.querySelector(`.minus`)) {
            updatePrice();
            if(e.target === element.querySelector(`.minus`)) {
              if(element.querySelector(`.count`).value === '1') {
                element.classList.remove(`${ID}-selected`);
                updatePrice();
              }
            }
        
          } else {
            
              const packName = element.querySelector('p').textContent;
              if(element.classList.contains(`${ID}-selected`)) {
                  element.classList.remove(`${ID}-selected`);
                  updatePrice();
              } else {
                  element.classList.add(`${ID}-selected`);
                  updatePrice();
                  events.send(`${ID} varation: ${VARIATION} - Velvetiser Journey`, 'click', `hot chocolate: ${packName}`);
              }
            }
        });
        }
    }
  

    let currentTab = 0;

    function showTab(n){
      // tab to show
      const tab = document.getElementsByClassName(`${ID}-accordionStep`);
      tab[n].classList.add(`${ID}-stepShow`);
    }

    // show the first one - colour options
    showTab(currentTab);
    
    if(currentTab === 0) {
        const colourChoice = document.querySelectorAll(`.${ID}-product.${ID}-colour`);
        
        //make one active
        const makeActive = (e) => {
            e.preventDefault();
            for (let index = 0; index < colourChoice.length; index += 1) {
              const element = colourChoice[index];
              element.classList.remove(`${ID}-selected`);
            
            }

            e.currentTarget.classList.add(`${ID}-selected`);
            
            showTab(1);
            updatePrice();
            const elName = e.currentTarget.querySelector('p').textContent;

            // show the fixed box
            const totalBox = document.querySelector(`.${ID}-summary`);
            totalBox.classList.add(`${ID}-totalShow`);
            document.body.classList.add(`${ID}-totalShowing`);
            events.send(`${ID} varation: ${VARIATION} - Velvetiser Journey`, 'click', `Colour: ${elName}`);

            const klarnaBox = document.querySelector(`.${ID}-summary klarna-placement`);
            if(klarnaBox) {
              klarnaBox.classList.add(`${ID}-klarnaShow`);
              window.KlarnaOnsiteService.push({ eventName: 'refresh-placements' });
            }
          
        }

        for (let x = 0; x < colourChoice.length; x += 1) {
          const el = colourChoice[x];
          el.addEventListener('click', makeActive);
        }
    }

    /** Build the products to show in the summary box */
    const buildSelectedProductsMarkup = () => {

      const products = document.querySelectorAll(`.${ID}-product`);
      
        for (let index = 0; index < products.length; index += 1) {
            const element = products[index];
            element.addEventListener('click', () => {
              if(document.querySelector(`.${ID}-priceBox .${ID}-choices`)) {
                document.querySelector(`.${ID}-priceBox .${ID}-choices`).innerHTML = '';
                const selectedProd = document.querySelectorAll(`.${ID}-selected`);
                for (let i = 0; i < selectedProd.length; i += 1) {
                      const selected = selectedProd[i];
                      const selectedName = selected.getAttribute('prod-name');
                      const selectedID = selected.getAttribute('prod-id');
                      const selectedImage = selected.querySelector(`.${ID}-productimage`).getAttribute('style');
                      const selectedPrice = selected.querySelector(`.${ID}-price`).innerText;
                      const selectedQty = selected.querySelector(`.count`).value;
                      
                      const selectedOption = document.createElement('div');
                      selectedOption.classList.add(`${ID}-chosenProduct`);
                      selectedOption.setAttribute('select-prod-id', selectedID);
                      selectedOption.innerHTML = 
                      `<div class="${ID}-image" style="${selectedImage}"></div>
                      <div class="${ID}-productInfo">
                        <p><span class="${ID}-qtyAmount">${selectedQty}</span> x ${selectedName}${selected.classList.contains(`${ID}-colour`) ? ` Velvetiser - with 2x limited edition pod cups`: ''}</p>
                        <span>£${parseFloat(selectedPrice.replace('£', '') * selectedQty).toFixed(2)}</span>
                      </div>`;
                    
                    document.querySelector(`.${ID}-priceBox .${ID}-choices`).appendChild(selectedOption);
                }
              }
            });
        }
    }

    const addProductToBag = () => {

      const addButton = document.querySelector(`.${ID}-summary .${ID}-add`);

      const ajaxAdd = () => {

        // get all added
        const allSelected = document.querySelectorAll(`.${ID}-priceBox .${ID}-choices .${ID}-chosenProduct`);

        let names = [];
        if(allSelected) {
          
          let storedProducts = [];
          for (let index = 0; index < allSelected.length; index += 1) {
            const element = allSelected[index];

            const elementName = element.querySelector(`.${ID}-productInfo p`).textContent;
            const productSku = element.getAttribute('select-prod-id');
            const prodQTY = element.querySelector(`.${ID}-qtyAmount`).textContent;
          
            if(productSku) {


               // push all the added products to object
              var obj = {}; 

              obj['name'] = elementName;
              storedProducts.push(obj);

            let addurl = false;

            window.jQuery.ajax({
                url: 'https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Cart-AddProduct?format=ajax',
                type: 'post',
                data: `Quantity=${prodQTY}&cartAction=add&pid=${productSku}`,
                success:function(){
                  window.scrollTo(0, 0);
                  document.querySelector(`.${ID}-add`).classList.remove(`${ID}-addingToBag`);
                  sessionStorage.setItem(`${ID}-productsAdded`, JSON.stringify(storedProducts));
                  if(addurl === false) {
                    window.location.href = `${window.location.pathname}?addtobasket=true`;
                    addurl = true;
                  }
                }
              });
              names.push(elementName);
            } 
            events.send(`${ID} varation: ${VARIATION} - Velvetiser Journey`, 'add to bag', `added: ${names}`, {sendOnce: true});
          }
        }
      }

      addButton.addEventListener('click', () => {
        addButton.classList.add(`${ID}-addingToBag`);
        addButton.textContent = 'Adding...';
        events.send(`${ID} varation: ${VARIATION} - Velvetiser Journey`, 'click', 'sticky CTA');
        ajaxAdd();
      });
    }


    chooseFlakes();
    buildSelectedProductsMarkup();
    addProductToBag();
}