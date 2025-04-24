const handleBillingAddress = () => {
    const addressDescriptionElem = document.querySelector('.complete-address .pcadescription');
    const billingAddressInputElem = document.querySelector('#dwfrm_addressy_addressFind');

    if (addressDescriptionElem && billingAddressInputElem && billingAddressInputElem.value === '') {
        const addressDescriptionHTML = addressDescriptionElem.innerHTML;
        const addressDescriptionText = addressDescriptionHTML.replace(/<br>/g, ', '); // Replace all <br> with a space
        billingAddressInputElem.value = addressDescriptionText;
    }
};
export default handleBillingAddress;
