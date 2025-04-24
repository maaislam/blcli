import shared from "../../../../../../core-files/shared";
import { qualification, updateAllvalues } from "./helpers";

const { ID } = shared;

export default () => {

   /**
     * Get total input value
     */
    const getTotalValue = () => {
        const totalValueEl = document.querySelector(`.${ID}-maxSpend span`).textContent.trim().replace(`£`, '');
        if(totalValueEl.indexOf('-') === -1) {
            const totalValueAmount = parseFloat(totalValueEl);
            return totalValueAmount;
        }
    }

    /**
     * Check amount entered qualifies for discount
     */
    const hasQualified = () => {
        const qualifiedMessage = document.querySelector(`.${ID}-qualified`);
        const qualificationAmount = qualification(getTotalValue());

        if(qualificationAmount.bandPercent !== '0%') {
            qualifiedMessage.classList.add(`${ID}-visible`);
            qualifiedMessage.querySelector('span').textContent = qualificationAmount.bandPercent;
        } else {
            qualifiedMessage.classList.remove(`${ID}-visible`);
        }  
    }

    /**
     * Show next discount with difference
     */
    const nextQualification = () => {
        const spendMoreMsg = document.querySelector(`.${ID}-spendMore`);
        const qualificationAmount = qualification(getTotalValue());

        if(qualificationAmount.nextBandPercent !== undefined) {
            spendMoreMsg.classList.add(`${ID}-visible`);
            spendMoreMsg.querySelector(`.nextPercent`).textContent = `${qualificationAmount.nextBandPercent} off`;
            spendMoreMsg.querySelector(`.difference`).textContent = `£${qualificationAmount.difference}`;
        } else {
            spendMoreMsg.classList.remove(`${ID}-visible`);
        }

    }

    // on keyup of all values
    const allInputs = document.querySelectorAll(`.${ID}-field input`);
    
    for (let index = 0; index < allInputs.length; index += 1) {
        const element = allInputs[index];
        element.addEventListener('keyup', () => {

            const activeTab = document.querySelector(`.${ID}-tab.${ID}-activeTab`);
            if(activeTab) {
                const tabType = activeTab.getAttribute('data-target');
                updateAllvalues(tabType);

                const totalValueEl = document.querySelector(`.${ID}-maxSpend span`).textContent.trim().replace(`£`, '');
                if(totalValueEl.indexOf('-') === -1) {
                    hasQualified();
                    nextQualification();
                }
            }
        });
    }
}

