/**
 * Create specifications
 */
import shared from "./shared";

const { ID } = shared;

export default () => {

    // loop through specs and put in object
    const getSpecs = () => {

        const allSpecs = document.querySelectorAll('.product-specification tr');
        
        
        const specifications = {
            Ring: {
            },
            Stone: {
            },
            Diamond: {
            }
        };

        allSpecs.forEach((specItem) => {
            const specTitle = specItem.querySelector('td:first-child');
            const specData = specItem.querySelector('td:last-child');
            

            if(specTitle && specData) {
                const specTitleText = specTitle.innerText.trim();
                const specDataText = specData.innerText.trim();
                if(specTitleText.match(/^Diamond/)) {
                    specifications['Diamond'][specTitleText] = specDataText;
                } else if(specTitleText.match(/^Stone/)) {
                    specifications['Stone'][specTitleText] = specDataText;
                } else {
                    specifications['Ring'][specTitleText] = specDataText;
                }
            }
        });

        return specifications;
    }

   const addSpecs = () => {
       const specs = getSpecs();
       
       Object.keys(specs).forEach((i) => {
           const data = specs[i];
           const heading = [i][0];
           
           // create the content
           
           const accordianContent = document.createElement('div');
           accordianContent.classList.add(`${ID}-accordionItem`);
           accordianContent.classList.add(`${ID}-close`);
           accordianContent.innerHTML = `<div class="${ID}-accordionHeading">${heading}</div><div class="${ID}-accordionContent"></div>`;
           document.querySelector(`.${ID}-specs .${ID}-specWrapper`).appendChild(accordianContent);
            
            // add the data
            Object.keys(data).forEach((keyword) => {
                const specData = document.createElement('div');
                specData.classList.add(`${ID}-spec`);
                specData.innerHTML = `<p class="${ID}-specName">${keyword}</p><p class="${ID}-specData">${data[keyword]}</p>`;
                accordianContent.querySelector(`.${ID}-accordionContent`).appendChild(specData);
            });
        });

        // Accordion functionality
        // add open to first one
        const accItem = document.getElementsByClassName(`${ID}-accordionItem`);
        const accHeading = document.getElementsByClassName(`${ID}-accordionHeading`);
    
        if(window.innerWidth > 767) {
            document.querySelector(`.${ID}-accordionItem`).classList.add(`${ID}-open`);
        }

        for (let index = 0; index < accHeading.length; index += 1) {
            const el = accHeading[index];
            el.addEventListener('click', toggleItem, false);
        }

        function toggleItem() {
            const itemClass = this.parentNode.className;
            for (let i = 0; i < accItem.length; i += 1) {
                const accEl = accItem[i];
                accEl.className = `${ID}-accordionItem ${ID}-close`;
            }

            if (itemClass == `${ID}-accordionItem ${ID}-close`) {
                this.parentNode.className =  `${ID}-accordionItem ${ID}-open`;
            }
        }
   }

   addSpecs();
}
  
