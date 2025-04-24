import { fireEvent } from "../../../../../../../core-files/services";
import shared from "../../../../../../../core-files/shared";

export default () => {

    const { ID } = shared;

    const inGridFilterBlock = () => {
        const filterBlock = document.createElement('div');
        filterBlock.classList.add(`${ID}-priceFilter`);
        filterBlock.innerHTML = `
        <h3>Try filtering by your price range?</h3>
        <div class="${ID}-priceInput">
            <div class="${ID}-inputs">
                <div class="${ID}-inputWrap">
                    <input class="min" type="number" name="min"/>
                </div>
                <span></span>
                <div class="${ID}-inputWrap">
                    <input class="max" type="number" name="max"/>
                </div>
            </div>
            <div class="${ID}-filterBtn ${ID}-disabled">Apply</div>
        </div>`;

        document.querySelectorAll('.grid_mode.grid li')[7].insertAdjacentElement('afterend', filterBlock);


        const lowValue = document.querySelector(`.${ID}-inputWrap .min`);
        const highValue = document.querySelector(`.${ID}-inputWrap .max`);

        const inputs = document.querySelectorAll(`.${ID}-inputWrap input`);
        for (let index = 0; index < inputs.length; index += 1) {
            const element = inputs[index];
            element.addEventListener('keyup', () => {

                if(lowValue.value !== '' && highValue.value !== '') {
                    document.querySelector(`.${ID}-filterBtn`).classList.remove(`${ID}-disabled`);
                } else {
                    document.querySelector(`.${ID}-filterBtn`).classList.add(`${ID}-disabled`);
                }
            });
        }
    }

    const applyPrice = () => {
        const lowPrice = document.querySelector(`.${ID}-inputWrap .min`).value;
        const highPrice = document.querySelector(`.${ID}-inputWrap .max`).value;

        const lowInput = document.querySelector('.price_range_container.low_price_input_container #low_price_input');
        const highInput = document.querySelector('.price_range_container.high_price_input_container #high_price_input');
        
        lowInput.value = lowPrice;
        highInput.value = highPrice;
        
    }

    inGridFilterBlock();


    document.querySelector(`.${ID}-filterBtn`).addEventListener('click', () => {
        applyPrice();
        fireEvent('Clicked apply price filter');
        dojo.topic.publish('Facet_Add');
    });
    
}