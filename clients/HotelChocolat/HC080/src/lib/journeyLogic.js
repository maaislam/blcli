import shared from "./shared";
import { flakePrices, kitPrices, updatePrice } from "./helpers";
import { fireEvent } from "../../../../../core-files/services";

/**
 * TO DO: Sort logic and colour select - stop number increasing on each click
 */
export default () => {

    const { ID, VARIATION } = shared;

    let currentTab = 0;

    function showTab(n){
      // tab to show
      const tab = document.getElementsByClassName(`${ID}-accordionStep`);
      tab[n].classList.add(`${ID}-stepShow`);
    }
  

    const chooseKit = () => {
      // choose starter kit

      const kitproduct = document.querySelectorAll(`.${ID}-accordionStep.${ID}-kitSlider .${ID}-product`);

      const makeActive = (e) => {
        const packName = e.currentTarget.querySelector('p').textContent;
        const price = parseFloat(e.currentTarget.querySelector(`.${ID}-price`).textContent.replace('£', ''));
          e.preventDefault();

          window.jQuery(`.${ID}-flakesSlider .${ID}-carousel`).slick('refresh');
          // remove if deselected
          if(e.currentTarget.classList.contains(`${ID}-selected`)) {
            e.currentTarget.classList.remove(`${ID}-selected`);
            kitPrices.pop();
            updatePrice();
            

            // add active, remove any other actives
          } else if(!e.currentTarget.classList.contains(`${ID}-selected`)) {

            for (let index = 0; index < kitproduct.length; index += 1) {
              const element = kitproduct[index];
              element.classList.remove(`${ID}-selected`);
              kitPrices.pop();
              updatePrice();
          }

            e.currentTarget.classList.add(`${ID}-selected`);
            fireEvent('Clicked starter kit option');
            kitPrices.push(price);
            updatePrice();
          }

      }
      
      for (let x = 0; x < kitproduct.length; x += 1) {
        const el = kitproduct[x];
        el.addEventListener('click', makeActive);
      }
    }
    const chooseFlakes = () => {
      // choose flakes
      const product = document.querySelectorAll(`.${ID}-accordionStep.${ID}-flakesSlider .${ID}-product`);
        for (let index = 0; index < product.length; index += 1) {
        const element = product[index];
        element.addEventListener('click', () => {
          const packName = element.querySelector('p').textContent;
          const price = parseFloat(element.querySelector(`.${ID}-price`).textContent.replace('£', ''));
        

            if(element.classList.contains(`${ID}-selected`)) {
                element.classList.remove(`${ID}-selected`);
                flakePrices.pop();

                updatePrice();
            } else {
                element.classList.add(`${ID}-selected`);
                flakePrices.push(price);

                updatePrice();
                fireEvent('Clicked add a little more option');
            }
        });
      }
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
            showTab(2);
            
            updatePrice();
            fireEvent('Clicked Colour option');

            const addButton = document.querySelector(`.${ID}-add`)
            addButton.classList.add(`${ID}-buttonShow`);

            const klarnaBox = document.querySelector(`.${ID}-priceBox klarna-placement`);
            if(klarnaBox) {
              klarnaBox.classList.add(`${ID}-klarnaShow`);
              window.KlarnaOnsiteService.push({ eventName: 'refresh-placements' });
            }

            // resize carousel
            window.jQuery(`.${ID}-flakesSlider .${ID}-carousel`).slick('resize');
            window.jQuery(`.${ID}-kitSlider .${ID}-carousel`).slick('resize');
        }

        for (let x = 0; x < colourChoice.length; x += 1) {
          const el = colourChoice[x];
          el.addEventListener('click', makeActive);
        }
    }


    const buildSelectedProductsMarkup = () => {
      const products = document.querySelectorAll(`.${ID}-product`);
        for (let index = 0; index < products.length; index += 1) {
            const element = products[index];
            element.addEventListener('click', () => {
              document.querySelector(`.${ID}-priceBox .${ID}-choices`).innerHTML = '';
              const selectedProd = document.querySelectorAll(`.${ID}-selected`);
              for (let i = 0; i < selectedProd.length; i += 1) {
                    const selected = selectedProd[i];
                    const selectedName = selected.getAttribute('prod-name');
                    const selectedID = selected.getAttribute('prod-id');
                    const selectedImage = selected.querySelector(`.${ID}-productimage`).getAttribute('style');
                    const selectedPrice = selected.querySelector(`.${ID}-price`).innerText;
                    
                    const selectedOption = document.createElement('div');
                    selectedOption.classList.add(`${ID}-chosenProduct`);
                    selectedOption.setAttribute('select-prod-id', selectedID);
                    selectedOption.innerHTML = 
                    `<div class="${ID}-image" style="${selectedImage}"></div>
                    <div class="${ID}-productInfo">
                      <p>1 x ${selectedName}${selected.classList.contains(`${ID}-colour`) ? ` Velvetiser - with 2x limited edition pod cups`: ''}</p>
                      <span>${selectedPrice}</span>
                    </div>`;
                  
                  document.querySelector(`.${ID}-priceBox .${ID}-choices`).appendChild(selectedOption);
              }
            });
        }
    }

    const addProductToBag = () => {

      const addButton = document.querySelector(`.${ID}-add`);

      const ajaxAdd = () => {

        const qty = document.querySelector('input[name=Quantity]').value;
  
        // get all added
        const allSelected = document.querySelectorAll(`.${ID}-product.${ID}-selected`);
        let names = [];
        if(allSelected) {
          let storedProducts = [];
          for (let index = 0; index < allSelected.length; index += 1) {
            const element = allSelected[index];
            const productSku = element.getAttribute('prod-id');
            const elName = element.textContent.trim();

            const storedName = element.innerHTML;
            const price = element.querySelector(`.${ID}-price`).textContent;
            if(productSku) {

               // push all the added products to object
            var obj = {}; 

            obj['name'] = storedName;
            obj['price'] = price;
            storedProducts.push(obj);
 
             let addurl = false;
 

              window.jQuery.ajax({
                url: 'https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Cart-AddProduct?format=ajax',
                type: 'post',
                data: `Quantity=${qty}&cartAction=add&pid=${productSku}`,
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

              names.push(elName);
            } 
            fireEvent(`Clicked add to bag with options: ${names}`);
          }
        }
      }

      addButton.addEventListener('click', () => {
        addButton.classList.add(`${ID}-addingToBag`);
        addButton.textContent = 'Adding...';
        ajaxAdd();
      });
    }


    chooseKit();
    chooseFlakes();
    addProductToBag();
}