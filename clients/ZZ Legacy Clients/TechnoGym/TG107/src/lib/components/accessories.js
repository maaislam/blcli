/**
 * On click of any accessories
 */
import shared from "../shared"



    const { ID } = shared;

/* When the add accessories button is clicked, show the right group of accessories based on the class picked */

export const showRightAccessories = () => {
    const showAccessoriesButton = document.querySelector(`.${ID}_button[option-target="accessories"]`);
    
    if(showAccessoriesButton) {
        const rebelClass = document.querySelector(`.${ID}_box[box-target="rebel-full"]`);
        const revolutionClass = document.querySelector(`.${ID}_box[box-target="revolution-full"]`);
        const combinedClass = document.querySelector(`.${ID}_box[box-target="combinedClass-full"]`);

        const accGroup1 = document.querySelector(`.${ID}-accessoriesItems .path-a.single-path .wrapper-products[rel="a_1"]`);
        const accGroup2 = document.querySelector(`.${ID}-accessoriesItems .path-a.single-path .wrapper-products[rel="a_2"]`);
        const accGroup3 = document.querySelector(`.${ID}-accessoriesItems .path-a.single-path .wrapper-products[rel="a_3"]`);

        if(rebelClass.classList.contains(`${ID}-box_active`)) {
            accGroup1.classList.add('shown');
            accGroup2.classList.remove('shown');
            accGroup3.classList.remove('shown');

        } else if (revolutionClass.classList.contains(`${ID}-box_active`)) {
            accGroup2.classList.add(`shown`);

            accGroup1.classList.remove('shown');
            accGroup3.classList.remove('shown');

        } else if (combinedClass.classList.contains(`${ID}-box_active`)) {
            accGroup3.classList.add(`shown`);

            accGroup1.classList.remove('shown');
            accGroup2.classList.remove('shown');
        }
    }
}

/**
 * Whe the add to cart button exists after adding any click hidden add to cart button
 */
export const addAccessories = () => {
    const accessories = document.querySelector(`#${ID}-accessories`);
    const accessoriesButton = accessories.querySelector(`.${ID}_CTA`);
    const accessoriesItems = accessories.querySelectorAll(`.${ID}-accessoriesItems .single-product`);
    const addToCart = document.querySelector('#group_3 .submit.button.btn-default');

    accessoriesButton.addEventListener('click', () => {
        for (let index = 0; index < accessoriesItems.length; index += 1) {
            const element = accessoriesItems[index];

            // if any accessories are selected but the select boxes aren't selected show error
            if(element.querySelector('select')) {
                if(element.classList.contains('selected')) {
                    if(element.querySelector('select').value === '') {
                        accessories.querySelector(`.${ID}-error_message`).classList.add(`${ID}_errorshow`);
                    } else {
                        addToCart.click();
                    }
                } else {
                    addToCart.click();
                }
            }
            else {
                addToCart.click();
            }
        }
    });
}   
