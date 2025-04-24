import mainProduct from "../components/mainProduct";
import productCards from "../components/productCards";
import clothingData from "../data/data";

const dropdownHandler = (id) => {
    const genderDropdown = document.querySelector(`.${id}__genderDropdown #gender`);

    genderDropdown.addEventListener('change', function() {
        const headerTitleElem = document.querySelector(`.${id}__headerTitle`);
        const productDetails = document.querySelector(`.${id}__categoryDetails`);
        productDetails.innerHTML = '';
    
        const selectedOption = genderDropdown.value;
        const data = clothingData[selectedOption];

        headerTitleElem.textContent = `Shop for Your Little ${data?.categoryByGender}`
        
        productDetails.innerHTML = `
            ${mainProduct(id, data)}
            ${productCards(id, data)}
        `;
    });
};

export default dropdownHandler;
