/**
 * Create specifications
 */
import shared from "../../shared";

const { ID } = shared;

export default () => {

    // loop through specs and put in object
    const getSpecs = () => {
        const allSpecs = document.querySelectorAll('.product-specification .product-specification__item');

        const specifications = {
            Ring: {
            },
            Stone: {
            },
            Diamond: {
            }
        };

        allSpecs.forEach((specItem) => {
            const specTitle = specItem.querySelector('.product-specification__info');
            const specData = specItem.querySelector('.product-specification__detail');
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
           accordianContent.classList.add(`${ID}__accordionItem`);
           accordianContent.classList.add(`${ID}__close`);
           accordianContent.innerHTML = `<div class="${ID}__accordionHeading">${heading}</div><div class="${ID}__accordionContent"></div>`;
           document.querySelector(`.${ID}__specs .${ID}__specification_wrapper`).appendChild(accordianContent);
            
            // add the data
            Object.keys(data).forEach((keyword) => {
                const specData = document.createElement('div');
                specData.classList.add(`${ID}__spec`);
                specData.innerHTML = `<p class="${ID}__specName">${keyword}</p><p class="${ID}__specData">${data[keyword]}</p>`;
                accordianContent.querySelector(`.${ID}__accordionContent`).appendChild(specData);
            });
        });

        // Accordion functionality
        // add open to first one
        const accItem = document.getElementsByClassName(`${ID}__accordionItem`);
        const accHeading = document.getElementsByClassName(`${ID}__accordionHeading`);
    

        for (let index = 0; index < accHeading.length; index += 1) {
            const el = accHeading[index];
            el.addEventListener('click', toggleItem, false);
        }

        function toggleItem() {
            const itemClass = this.parentNode.className;
            for (let i = 0; i < accItem.length; i += 1) {
                const accEl = accItem[i];
                accEl.className = `${ID}__accordionItem ${ID}__close`;
            }

            if (itemClass == `${ID}__accordionItem ${ID}__close`) {
                this.parentNode.className =  `${ID}__accordionItem ${ID}__open`;
            }
        }
   }

   addSpecs();

   document.querySelector('.HS074__accordionItem:nth-child(4) > div.HS074__accordionContent > div:nth-child(1) > p.HS074__specName').innerHTML="Total Diamond Weight";

    
}
  
